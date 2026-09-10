import {id} from './case-engine.mjs';

const POPULATION = id('population','screening-c');
const PERSON = id('person','person-t');
const IDENTITY_ITEM = id('request-item','identity-c');
const IDENTITY_REQUEST = id('request','identity-c');
const EDD_ANCHOR = id('edd-applicability','batch-c');
export const screeningRuleIds = Object.freeze({
  preliminary:'SRC-016:POP-C04', comprehensive:'SRC-016:POP-C08', review:'SRC-016:M03',
  identity:'SRC-016:M04', request:'SRC-016:M05', referral:'SRC-016:M10',
  disposition:'SRC-016:M08', resume:'SRC-016:19.4', coverage:'SRC-016:POP-C09',
  edd:'SRC-016:E02', eddPack:'SRC-016:E07', unresolved:'SRC-016:M07'
});
export const screeningActionPredicates = Object.freeze({
  prepare_preliminary:'preliminary',request_preliminary:'preliminary',receive_result:'result',
  prepare_comprehensive:'comprehensive',request_comprehensive:'comprehensive',confirm_population:'comprehensive',
  save_review_draft:'review',request_identity:'request',assess_identity:'identity',refer:'referral',
  record_unresolved:'unresolved',record_disposition:'disposition',resume_branch:'resume',
  reassess_coverage:'coverage',record_edd_applicability:'edd',prepare_edd_pack:'eddPack'
});

export function currentPopulation(s) {
  return s.screeningPopulations?.find(x=>x.id===POPULATION);
}
export function currentFinding(s) {
  const runId=currentPopulation(s)?.latest_run_ref;
  return s.screeningFindings?.find(x=>x.source_refs?.includes('SRC-016')&&x.run_ref===runId)||null;
}

export function screeningQueryInputFingerprint(s) {
  const cfg=s.demoConfig.batchC,population=currentPopulation(s);
  const inputs={scope:s.scopes[0],population_revision:population.population_revision,
    subjects:s.naturalPersons.filter(x=>cfg.query_subject_refs.includes(x.id)),memberships:s.screeningMemberships,
    policy:cfg.policy_profile_ref,policy_revision:cfg.policy_revision,query_scope_ref:cfg.query_scope_ref,
    category_scope:cfg.category_scope,dataset:cfg.dataset,query_permission_ref:cfg.query_permission_ref};
  const canonical=value=>{
    if(Array.isArray(value))return value.map(canonical);
    if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,canonical(value[key])]));
    return value;
  };
  return JSON.stringify(canonical(inputs));
}
export function screeningInputRevisions(s) {
  const names=['screeningPopulations','screeningMemberships','screeningQueryPlans','screeningRuns',
    'runSubjectSnapshots','providerRecordSnapshots','screeningReviewDecisions','screeningReviewDrafts',
    'eddApplicabilityAssessments','eddAssessments','holds'];
  const records=[s.scopes[0],...s.entities,...s.naturalPersons];
  for(const name of names)records.push(...(s[name]||[]));
  records.push(...s.screeningFindings.filter(x=>x.source_refs?.includes('SRC-016')));
  records.push(...s.evidence.filter(x=>x.request_item_refs?.includes(IDENTITY_ITEM)));
  records.push(...s.evidenceUseAssessments.filter(x=>x.purpose_code==='screening_identity'));
  records.push(...(s.requestItems||[]),...(s.requestRecipients||[]),...(s.accessGrants||[]));
  records.push(...(s.workItems||[]).filter(x=>x.source_refs?.includes('SRC-016')));
  records.push(...(s.informationRequests||[]).filter(x=>x.source_refs?.includes('SRC-016')));
  records.push(...(s.auditEvents||[]).filter(x=>x.source_refs?.includes('SRC-016')).map(x=>({
    id:x.id,revision:x.revision,event_type:x.event_type,object_refs:x.object_refs,actor_ref:x.actor_ref,
    case_id:x.case_id,case_scope_id:x.case_scope_id,to_revision:x.to_revision,expected_scope_revision:x.expected_scope_revision
  })));
  const versions=Object.fromEntries(records.map(x=>[x.id,x.revision]));
  // A caller cannot silently change policy, permissions, holds or claims without invalidating its prepared command.
  versions['SRC-016:configuration']=JSON.stringify(s.demoConfig.batchC);
  versions['SRC-016:upstream-holds']=JSON.stringify(s.demoConfig.batchA?.holds||[]);
  // Bounded non-cryptographic content fingerprint; revision checks and action permissions remain authoritative.
  const content=JSON.stringify(records);
  let left=2166136261,right=5381;
  for(let i=0;i<content.length;i++) {
    left=Math.imul(left^content.charCodeAt(i),16777619);
    right=Math.imul(right,33)^content.charCodeAt(i);
  }
  versions['SRC-016:input-content']=`${content.length}:${left>>>0}:${right>>>0}`;
  return versions;
}
export function applicableScreeningHolds(s,{action,branchId,findingId,objectRefs=[]}={}) {
  const targets=new Set([s.case.id,s.scopes[0].id,POPULATION,PERSON,findingId||currentFinding(s)?.id,branchId,...objectRefs].filter(Boolean));
  return [...(s.holds||[]),...(s.demoConfig.batchC?.holds||[]),...(s.demoConfig.batchA?.holds||[])].filter(hold=>{
    if(!['active','unknown'].includes(hold.status))return false;
    if(hold.action_scope?.length&&action&&!hold.action_scope.includes(action)&&!hold.action_scope.includes('*'))return false;
    if(hold.object_scope_refs?.length)return hold.object_scope_refs.some(ref=>targets.has(ref));
    if(hold.scope==='case'||hold.hold_scope==='case')return true;
    if(hold.task||hold.branch)return [action,branchId,'screening', 'screening-review'].includes(hold.task||hold.branch);
    return true; // Unresolved hold scope has no supported release boundary.
  });
}
export function effectiveEdd(s) {
  const assessment=s.eddApplicabilityAssessments?.at(-1);
  if(!assessment)return {applicability:'unknown',owner_ref:'Unassigned',question_ref:'C-Q-EDD-APPLICABILITY'};
  const reason=s.demoConfig.batchC?.reviewed_edd_reasons?.[assessment.trigger_reason_refs?.[0]];
  const current=assessment.scope_revision===s.scopes[0].revision&&reason?.scope_revision===s.scopes[0].revision
    &&reason?.review_status==='reviewed_for_demo'&&reason?.permission_ref===assessment.permission_ref;
  return {...structuredClone(assessment),applicability:current?assessment.applicability:'unknown',currency_status:current?'current':'needs_review'};
}
export function deriveScreeningCoverage(s) {
  const population=currentPopulation(s), cfg=s.demoConfig.batchC;
  return (s.screeningCoverageItems||[]).filter(x=>x.population_ref===population?.id).map(item=>{
    const run=s.screeningRuns.find(x=>x.id===item.supporting_run_refs.at(-1));
    const subject=[...s.entities,...s.naturalPersons].find(x=>x.id===item.subject_ref);
    const current=run&&run.scope_revision===s.scopes[0].revision&&run.population_revision===population.population_revision
      &&item.subject_revision===subject?.revision&&run.query_scope_ref===cfg.query_scope_ref;
    const findings=s.screeningFindings.filter(x=>x.run_ref===run?.id);
    const execution=run?.run_status==='completed'?'complete':['partial','failed'].includes(run?.run_status)?run.run_status:'pending';
    const currency=!current?'needs_review':run.data_version_status==='unknown'?'unknown':'current';
    const review=run?.result_count===0&&execution==='complete'?'complete':findings.length?'pending':'not_started';
    const reasons=[];
    if(execution!=='complete')reasons.push(`query_${execution}`);
    if(currency!=='current')reasons.push(`currency_${currency}`);
    if(review!=='complete')reasons.push('finding_review_required');
    return {...structuredClone(item),execution_status:execution,currency_status:currency,review_status:review,
      finding_refs:findings.map(x=>x.id),blocking_reason_refs:reasons,
      outcome_status:findings.some(x=>x.triage_status==='referred')?'concern_escalated':reasons.length?'unresolved':'no_unresolved_findings_for_scope'};
  });
}
export function screeningDecisionFacts(s) {
  const population=currentPopulation(s),finding=currentFinding(s);
  const run=s.screeningRuns.find(x=>x.id===population?.latest_run_ref);
  const use=s.evidenceUseAssessments.filter(x=>x.purpose_code==='screening_identity'&&x.finding_ref===finding?.id).at(-1);
  const artifact=s.evidence.find(x=>x.id===use?.evidence_id);
  const person=s.naturalPersons.find(x=>x.id===PERSON);
  const currentUse=use&&artifact&&artifact.intake_security_status==='released'&&use.evidence_record_revision===artifact.revision
    &&use.scope_revision===s.scopes[0].revision&&use.subject_revision===person.revision;
  const edd=effectiveEdd(s);
  return {
    result_status:run?.run_status||'not_started',result_count:run?.result_count??null,
    inventory_status:population?.scope_revision===s.scopes[0].revision?population.inventory_status:'unknown',
    membership_decision:s.screeningMemberships.find(x=>x.party_ref===PERSON)?.membership_decision||'unresolved',
    identity_sufficiency:currentUse?use.sufficiency:use?'unknown':'not_assessed',
    identity_intake_status:artifact?.intake_security_status||'missing',finding_status:finding?.triage_status||'not_received',
    coverage_status:'incomplete',edd_applicability:edd.applicability,
    edd_evidence_status:s.eddAssessments.at(-1)?.status||'not_assessed',edd_approval_status:s.eddAssessments.at(-1)?.approval_status||'unknown'
  };
}

function reviewInputReasons(s,finding) {
  if(!finding)return ['FINDING_REQUIRED'];
  const population=currentPopulation(s),scope=s.scopes[0];
  const run=s.screeningRuns.find(x=>x.id===finding.run_ref);
  const snapshot=s.runSubjectSnapshots.find(x=>x.id===finding.subject_snapshot_ref);
  const provider=s.providerRecordSnapshots.find(x=>x.id===finding.provider_snapshot_ref);
  const subject=[...s.entities,...s.naturalPersons].find(x=>x.id===finding.subject_ref);
  const own=record=>record&&record.case_id===s.case.id&&record.case_scope_id===scope.id;
  if(!own(finding)||!own(run)||!own(snapshot)||!own(provider)||!subject
    ||snapshot.party_ref!==subject.id||!run.subject_snapshot_refs.includes(snapshot.id))return ['BRANCH_ANCHOR_MISMATCH'];
  if(finding.scope_revision!==scope.revision||run.scope_revision!==scope.revision
    ||run.population_revision!==population.population_revision||snapshot.party_revision!==subject.revision)return ['REVIEW_INPUTS_STALE'];
  return [];
}

function recordedEvent(s,record,eventType) {
  return s.auditEvents.find(event=>event.event_type===eventType&&event.object_refs?.includes(record?.id)
    &&event.case_id===s.case.id&&event.case_scope_id===s.scopes[0].id
    &&event.expected_scope_revision===s.scopes[0].revision);
}

function expandDecisionBasisRefs(s,initialRefs) {
  const records=[...(s.evidenceUseAssessments||[]),...(s.screeningReviewDecisions||[]),
    ...(s.eddApplicabilityAssessments||[]),...(s.eddAssessments||[]),...(s.decisions||[])];
  const byId=new Map(records.map(record=>[record.id,record]));
  const refs=new Set(initialRefs.filter(Boolean)),pending=[...refs];
  while(pending.length) {
    const record=byId.get(pending.pop());
    if(!record)continue;
    const linked=[record.evidence_id,...(record.basis_refs||[]),...(record.evidence_use_assessment_refs||[]),...(record.evidence_refs||[])];
    for(const ref of linked.filter(Boolean))if(!refs.has(ref)) { refs.add(ref);pending.push(ref); }
  }
  return [...refs];
}

export function screeningDecisionBasis(s,context={}) {
  const finding=currentFinding(s),type=context.type||context.action;
  if(type==='record_edd_applicability') {
    const reason=s.demoConfig.batchC.reviewed_edd_reasons?.[context.reasonRef];
    return {basis_mode:'reviewed_policy_reason',basis_refs:expandDecisionBasisRefs(s,[context.reasonRef,...(reason?.basis_refs||[])]),
      evidence_use_assessment_refs:[],policy_ref:reason?.permission_ref||null,reason_codes:[]};
  }
  const mode=context.basisMode||'finding_evidence',policy=s.demoConfig.batchC.referral_basis_policy;
  const reasons=[];
  if(mode==='finding_only') {
    const configured=type==='refer'&&context.urgent===true&&policy?.review_status==='reviewed_for_demo'
      &&policy.id&&policy.permission_ref&&policy.case_id===s.case.id&&policy.scope_revision===s.scopes[0].revision
      &&policy.allowed_roles?.includes(context.role)&&policy.allowed_basis_modes?.includes(mode)&&policy.action_scope?.includes('refer');
    if(!configured)reasons.push('REFERRAL_BASIS_NOT_CONFIGURED');
  } else if(mode!=='finding_evidence')reasons.push('DECISION_BASIS_MODE_NOT_CONFIGURED');
  const uses=mode==='finding_evidence'?s.evidenceUseAssessments.filter(x=>x.finding_ref===finding?.id):[];
  const refs=[finding?.id,finding?.provider_snapshot_ref,finding?.subject_snapshot_ref,finding?.run_ref,...uses.map(x=>x.id)];
  return {basis_mode:mode,basis_refs:expandDecisionBasisRefs(s,refs),evidence_use_assessment_refs:uses.map(x=>x.id),
    policy_ref:mode==='finding_only'?policy?.id||null:s.demoConfig.batchC.policy_profile_ref,reason_codes:reasons};
}

function branchResumeContext(s,context) {
  const branch=s.workItems.find(x=>x.id===context.branchId&&x.branch_type);
  if(!branch)return {branch:null,finding:null,reason_codes:['BRANCH_REQUIRED'],object_refs:[],basis_event_refs:[]};
  const scope=s.scopes[0],cfg=s.demoConfig.batchC,role=context.role||'ROLE-KYCOPS';
  const finding=s.screeningFindings.find(x=>x.id===branch.finding_ref)||null;
  const origin=s.workItems.find(x=>x.id===branch.origin_task_ref);
  const active=s.workItems.find(x=>x.id===branch.active_task_ref);
  const trigger=s.auditEvents.find(x=>x.id===branch.trigger_event_ref);
  const reasons=[],basisEvents=[];
  const refs=[branch.id,branch.finding_ref,branch.population_ref,branch.request_ref,branch.request_item_ref,
    branch.origin_task_ref,branch.active_task_ref,branch.edd_applicability_ref,branch.edd_assessment_ref];
  if(branch.case_id!==s.case.id||branch.case_scope_id!==scope.id||branch.case_ref!==s.case.id
    ||branch.scope_revision!==scope.revision||!active||active.case_id!==s.case.id
    ||active.case_scope_id!==scope.id||!trigger||trigger.case_id!==s.case.id||trigger.case_scope_id!==scope.id
    ||trigger.expected_scope_revision!==scope.revision)reasons.push('BRANCH_ANCHOR_MISMATCH');
  if(!['awaiting_input','awaiting_review','referred','ready_to_resume'].includes(branch.status))reasons.push('BRANCH_NOT_WAITING');
  if(branch.branch_type!=='conditional_edd') {
    reasons.push(...reviewInputReasons(s,finding));
    if(!origin||origin.finding_ref!==branch.finding_ref||branch.fixed_return_target?.finding_ref!==branch.finding_ref
      ||branch.fixed_return_target?.review_task_ref!==origin.id)reasons.push('BRANCH_ANCHOR_MISMATCH');
  }
  const afterTrigger=event=>event&&trigger&&event.to_revision>trigger.to_revision;
  if(branch.branch_type==='information_gap') {
    const item=s.requestItems.find(x=>x.id===branch.request_item_ref);
    const request=s.informationRequests.find(x=>x.id===branch.request_ref);
    const artifact=s.evidence.filter(x=>x.request_item_refs?.includes(item?.id)&&x.finding_ref===finding?.id).at(-1);
    const use=s.evidenceUseAssessments.filter(x=>x.evidence_id===artifact?.id&&x.finding_ref===finding?.id&&x.purpose_code==='screening_identity').at(-1);
    const event=recordedEvent(s,use,'screening_evidence_use_assessed');
    refs.push(artifact?.id,use?.id);
    if(!item||!request||item.request_id!==request.id||item.finding_ref!==finding?.id||request.finding_ref!==finding?.id
      ||item.scope_revision!==scope.revision||request.scope_revision!==scope.revision
      ||!request.item_refs.includes(item.id)||!artifact||artifact.case_scope_id!==scope.id
      ||artifact.scope_revision!==scope.revision||artifact.subject_id!==finding?.subject_ref
      ||artifact.intake_security_status!=='released'||!artifact.linked_item_refs?.includes(item.id)
      ||item.linked_evidence_revisions?.[artifact.id]!==artifact.revision||!use
      ||use.scope_revision!==scope.revision||use.evidence_record_revision!==artifact.revision
      ||use.subject_revision!==s.naturalPersons.find(x=>x.id===finding?.subject_ref)?.revision
      ||!use.assessment_permission_ref||!cfg.permissions?.[role]?.includes('assess_identity')
      ||!cfg.permissions?.[use.assessed_by_ref]?.includes('assess_identity')||!afterTrigger(event))reasons.push('IDENTITY_ASSESSMENT_REQUIRED');
    else basisEvents.push(event.id);
  } else if(branch.branch_type==='referral') {
    if(!branch.owner_ref||branch.owner_ref==='Unassigned'||branch.owner_ref!==role
      ||cfg.referral_owner_ref!==branch.owner_ref)reasons.push('BRANCH_OWNER_REQUIRED');
    const provider=s.providerRecordSnapshots.find(x=>x.id===finding?.provider_snapshot_ref);
    const subject=s.naturalPersons.find(x=>x.id===finding?.subject_ref);
    const decision=s.screeningReviewDecisions.filter(x=>x.finding_ref===branch.finding_ref&&x.decision_status==='recorded'
      &&x.disposition==='unresolved'&&x.currency_status==='current').at(-1);
    const event=recordedEvent(s,decision,'screening_disposition_recorded');
    refs.push(decision?.id,provider?.id);
    if(!decision||decision.scope_revision!==scope.revision||decision.population_revision!==currentPopulation(s).population_revision
      ||decision.subject_revision!==subject?.revision||decision.provider_revision!==provider?.revision
      ||!decision.permission_basis_ref||!cfg.permissions?.[decision.authorised_by_ref]?.includes('record_unresolved')
      ||!cfg.permissions?.[role]?.includes('record_unresolved')||!afterTrigger(event))reasons.push('REFERRAL_REVIEW_REQUIRED');
    else basisEvents.push(event.id);
  } else if(branch.branch_type==='conditional_edd') {
    const edd=effectiveEdd(s),applicabilityRef=branch.edd_applicability_ref||branch.edd_assessment_ref;
    const pack=s.eddAssessments.filter(x=>x.applicability_ref===applicabilityRef).at(-1);
    const event=recordedEvent(s,pack,'edd_pack_prepared');
    refs.push(EDD_ANCHOR,edd.id,pack?.id,...(pack?.evidence_refs||[]),...(pack?.condition_refs||[]),...(pack?.approval_refs||[]));
    if(!branch.owner_ref||branch.owner_ref==='Unassigned'||branch.owner_ref!==role
      ||cfg.referral_owner_ref!==branch.owner_ref)reasons.push('BRANCH_OWNER_REQUIRED');
    if(edd.applicability!=='required'||edd.currency_status!=='current'||edd.id!==applicabilityRef)reasons.push('EDD_REQUIRED_APPLICABILITY_MISSING');
    if(!pack||pack.case_id!==s.case.id||pack.case_scope_id!==scope.id||pack.scope_revision!==scope.revision||!afterTrigger(event))reasons.push('EDD_PACK_REQUIRED');
    else {
      const evidenceCurrent=pack.evidence_refs.length>0&&pack.evidence_refs.every(ref=>s.evidence.some(x=>x.id===ref
        &&x.case_id===s.case.id&&x.case_scope_id===scope.id&&x.scope_revision===scope.revision&&x.intake_security_status==='released'
        &&pack.evidence_revisions?.[ref]===x.revision));
      const approvalsCurrent=pack.approval_refs.length>0&&pack.approval_refs.every(ref=>s.decisions.some(x=>x.id===ref
        &&x.decision_type==='edd_approval'&&x.record_status==='recorded'&&x.case_scope_id===scope.id
        &&x.input_revisions?.[pack.id]===pack.revision&&x.currency==='current'));
      if(pack.status!=='recorded'||pack.open_issue_refs.length||!evidenceCurrent||pack.approval_status!=='approved'
        ||!approvalsCurrent||!cfg.edd_resume_permission_ref||!cfg.permissions?.[role]?.includes('review_edd_assessment'))reasons.push('EDD_ASSESSMENT_APPROVAL_REQUIRED');
      else basisEvents.push(event.id);
    }
  } else reasons.push('BRANCH_TYPE_UNSUPPORTED');
  return {branch,finding,reason_codes:[...new Set(reasons)],object_refs:refs.filter(Boolean),basis_event_refs:basisEvents};
}

export function screeningPredicates(s,context={}) {
  const {role='ROLE-KYCOPS',action,branchId}=context;
  const cfg=s.demoConfig.batchC||{},population=currentPopulation(s),finding=currentFinding(s);
  const person=s.naturalPersons.find(x=>x.id===PERSON);
  const membership=s.screeningMemberships?.find(x=>x.party_ref===PERSON&&x.population_ref===population?.id);
  const inputRefs=Object.keys(screeningInputRevisions(s));
  const permitted=type=>cfg.permissions?.[role]?.includes(type);
  const resume=branchResumeContext(s,context);
  const objectTargets=type=>{
    const refs=[];
    if(type==='receive_result')refs.push(context.runId);
    if(type==='prepare_edd_pack')refs.push(...(context.evidenceRefs||[]));
    if(['request_identity','assess_identity'].includes(type)) {
      refs.push(IDENTITY_REQUEST,IDENTITY_ITEM);
      const evidence=s.evidence.filter(x=>x.request_item_refs?.includes(IDENTITY_ITEM));
      refs.push((evidence.find(x=>x.id===context.evidenceId)||evidence.at(-1))?.id);
    }
    if(type==='resume_branch')refs.push(...resume.object_refs);
    if(['record_unresolved','refer','record_disposition','record_edd_applicability'].includes(type)) {
      refs.push(...screeningDecisionBasis(s,{...context,type,role}).basis_refs);
      if(type==='refer')refs.push(...s.workItems.filter(x=>x.branch_type==='referral'&&x.finding_ref===finding?.id).map(x=>x.id));
    }
    if(['record_edd_applicability','prepare_edd_pack'].includes(type)) {
      const edd=effectiveEdd(s),pack=s.eddAssessments.filter(x=>x.applicability_ref===edd.id).at(-1);
      refs.push(EDD_ANCHOR,edd.id,pack?.id,...(pack?.evidence_refs||[]));
      refs.push(...s.workItems.filter(x=>x.branch_type==='conditional_edd'&&(x.edd_applicability_ref||x.edd_assessment_ref)===edd.id).map(x=>x.id));
    }
    return expandDecisionBasisRefs(s,refs);
  };
  const held=type=>applicableScreeningHolds(s,{action:type,branchId,
    findingId:type==='resume_branch'?resume.finding?.id:finding?.id,objectRefs:objectTargets(type)}).length>0;
  const make=(key,type,reasons,extra={})=>{
    const reason_codes=[...(!permitted(type)?['PERMISSION_REQUIRED']:[]),...(held(type)?['HOLD_REQUIRES_REVIEW']:[]),...reasons];
    return {rule_id:screeningRuleIds[key]||'SRC-016:POP-C06',allowed:reason_codes.length===0,
      outcome:reason_codes.length?'unknown':'allowed',reason_codes,input_refs:inputRefs,object_refs:objectTargets(type),...extra};
  };
  const queryReady=cfg.inclusion_criterion_ref&&cfg.query_permission_ref&&cfg.query_scope_ref&&cfg.data_access_ref
    &&cfg.query_subject_refs?.includes(PERSON)&&cfg.category_scope?.includes('sanctions_name_match')
    &&membership?.membership_decision==='included'&&membership.party_revision===person?.revision
    &&membership.query_input_status==='ready'&&population?.scope_revision===s.scopes[0].revision;
  const preliminaryReasons=queryReady?[]:['QUERY_CONFIGURATION_REQUIRED'];
  if(action==='request_preliminary') {
    const plan=s.screeningQueryPlans.at(-1);
    if(!plan||!queryReady||plan.input_fingerprint!==screeningQueryInputFingerprint(s))preliminaryReasons.push('CURRENT_QUERY_PLAN_REQUIRED');
  }
  const complete=population?.inventory_status==='complete_for_scope'&&population.population_review_status==='confirmed'
    &&population.scope_revision===s.scopes[0].revision&&population.completeness_basis_refs.length>0
    &&population.confirmation_permission_ref&&population.confirmed_by_ref;
  const reviewReasons=reviewInputReasons(s,finding);
  const evidence=s.evidence.filter(x=>x.request_item_refs?.includes(IDENTITY_ITEM));
  const item=s.requestItems?.find(x=>x.id===IDENTITY_ITEM);
  const artifact=evidence.find(x=>x.id===context.evidenceId)||evidence.at(-1);
  const identityReady=artifact&&artifact.intake_security_status==='released'&&artifact.scope_revision===s.scopes[0].revision
    &&artifact.linked_item_refs?.includes(IDENTITY_ITEM)&&item?.linked_evidence_revisions?.[artifact.id]===artifact.revision;
  const edd=effectiveEdd(s), coverage=deriveScreeningCoverage(s);
  const referralBasis=screeningDecisionBasis(s,{...context,type:'refer',role});
  const unresolvedBasis=screeningDecisionBasis(s,{...context,type:'record_unresolved',role});
  const eddBasis=screeningDecisionBasis(s,{...context,type:'record_edd_applicability',role});
  return {
    preliminary:make('preliminary',action?.includes('preliminary')?action:'prepare_preliminary',preliminaryReasons),
    comprehensive:make('comprehensive',action?.includes('comprehensive')?action:'prepare_comprehensive',complete?['UPSTREAM_CONFIRMED_INVENTORY_INTERFACE_NOT_CONFIGURED']:['POPULATION_NOT_CONFIRMED']),
    result:make('result','receive_result',[]),
    review:make('review','save_review_draft',reviewReasons),
    request:make('request','request_identity',reviewReasons),
    identity:make('identity','assess_identity',[...reviewReasons,...(!identityReady?['RELEASED_LINKED_IDENTITY_EVIDENCE_REQUIRED']:[])]),
    referral:make('referral','refer',[...(!finding?['FINDING_REQUIRED']:[]),...referralBasis.reason_codes],{decision_basis:referralBasis}),
    unresolved:make('unresolved','record_unresolved',[...reviewReasons,...unresolvedBasis.reason_codes],{decision_basis:unresolvedBasis}),
    disposition:make('disposition','record_disposition',['EXCLUSION_DISABLED_PENDING_FIXTURE_REVIEW']),
    resume:make('resume','resume_branch',resume.reason_codes,{finding_ref:resume.finding?.id||null,
      branch_ref:resume.branch?.id||null,object_refs:resume.object_refs,basis_event_refs:resume.basis_event_refs}),
    coverage:make('coverage','reassess_coverage',[],{coverage_complete:!!complete&&coverage.length>0&&coverage.every(x=>!x.blocking_reason_refs.length)}),
    edd:make('edd','record_edd_applicability',[],{applicability:edd.applicability,decision_basis:eddBasis}),
    eddPack:make('eddPack','prepare_edd_pack',edd.applicability==='required'?[]:['EDD_REQUIRED_APPLICABILITY_MISSING'])
  };
}
