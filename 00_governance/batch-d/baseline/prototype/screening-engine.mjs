import {id, readiness} from './case-engine.mjs';
import {COLLAB_IDS, collaborationProjection} from './collaboration-engine.mjs';
import {screeningPredicates, screeningActionPredicates, screeningInputRevisions, currentPopulation,
  currentFinding, deriveScreeningCoverage, effectiveEdd, screeningDecisionFacts, screeningQueryInputFingerprint} from './screening-predicates.mjs';
export {screeningPredicates} from './screening-predicates.mjs';

export const C_IDS = Object.freeze({
  population: id('population', 'screening-c'), personT: COLLAB_IDS.personT,
  finding: id('finding', 'person-t-c01'), entityA: id('entity', 'harbour'), entityB: id('entity', 'entity-b'),
  request: id('request', 'identity-c'), identityItem: id('request-item', 'identity-c'),
  recipientT: id('recipient', 'identity-c-person-t'), identityRequirement: id('requirement', 'screening-identity-c'),
  edd: id('edd-applicability', 'batch-c'), condition: id('condition', 'screening-c'),
  reviewTask: id('work', 'screening-review-c'), policy: 'SYNTHETIC-C-POLICY-v1',
  identityPolicy: id('channel-policy', 'identity-c'), queryPlan: id('query-plan', 'preliminary-c')
});
const STAMP = '2026-09-07T11:00:00Z';
const C_ACTIONS = ['prepare_preliminary','request_preliminary','receive_result','save_review_draft','request_identity','assess_identity','refer','resume_branch','reassess_coverage','confirm_population','prepare_comprehensive','request_comprehensive','prepare_edd_pack'];
export function screeningError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}
const record = (s, kind, slug, fields = {}) => ({
  id: id(kind, slug), case_id: s.case.id, case_scope_id: s.scopes[0].id, revision: 1,
  scope_revision: s.scopes[0].revision, source_refs: ['SRC-016'], source_status: 'SYNTHETIC',
  synthetic: true, simulation_flag: true, provenance: 'synthetic',
  business_validation_status: 'user_confirmed_for_demo', implementation_fidelity: 'local_simulation',
  sensitivity: 'synthetic-restricted', created_at: STAMP, updated_at: STAMP, ...fields
});

export function createBatchC(input) {
  if (input?.demoConfig?.batchC?.version === 'D2-C-Final-1.0') return input;
  if (!input?.demoConfig?.batchB || !input.informationRequests?.some(x => x.id === COLLAB_IDS.request)
      || !input.requestItems?.some(x => x.id === COLLAB_IDS.ownershipItem)) throw screeningError('B_CONTEXT_REQUIRED');
  const s = structuredClone(input);
  const collections = ['screeningPopulations','screeningMemberships','screeningRuns','runSubjectSnapshots',
    'screeningQueryPlans','screeningResultSnapshots','providerRecordSnapshots','attributeComparisons',
    'screeningReviewDecisions','screeningReviewDrafts','screeningCoverageItems','eddApplicabilityAssessments','eddAssessments','holds'];
  for (const name of collections) s[name] ||= [];
  const memberships = [C_IDS.entityA, C_IDS.entityB, C_IDS.personT].map(party => {
    const entity = [...s.entities, ...s.naturalPersons].find(x => x.id === party);
    const included = party !== C_IDS.entityB;
    return record(s, 'membership', `c-${party.split('/').at(-1)}`, {
      population_ref: C_IDS.population, party_ref: party, party_revision: entity.revision,
      relationship_role_refs: party === C_IDS.personT ? [id('representative','person-t')] : [],
      screening_category: 'sanctions_name_match', membership_decision: included ? 'included' : 'unresolved',
      criterion_ref: included ? `${C_IDS.policy}:known-subject-preliminary` : null,
      basis_refs: included ? ['SRC-016:2.3','SRC-016:C-D01',entity.id] : [entity.id],
      assessment_ref: null, query_input_status: included ? 'ready' : 'unknown', missing_attribute_refs: []
    });
  });
  s.screeningMemberships.push(...memberships);
  s.screeningPopulations.push(record(s,'population','screening-c',{
    case_scope_ref: s.scopes[0].id, population_revision: 1, membership_refs: memberships.map(x=>x.id),
    inventory_status: 'incomplete', inventory_gap_refs: [COLLAB_IDS.ownershipItem], population_review_status: 'draft',
    policy_profile_ref: C_IDS.policy, completeness_basis_refs: [], confirmed_by_ref: null,
    confirmation_permission_ref: null, confirmed_at: null, latest_run_ref: null
  }));
  s.eddApplicabilityAssessments.push(record(s,'edd-applicability','batch-c',{
    trigger_reason_refs: [], policy_basis_ref: null, applicability: 'unknown', review_status: 'pending_review',
    decided_by_ref: null, permission_ref: null, decision_ref: null, owner_ref: 'Unassigned', question_ref: 'C-Q-EDD-APPLICABILITY'
  }));
  s.demoConfig.batchC = {
    version: 'D2-C-Final-1.0', source_refs: ['SRC-016'], entry: 'C-ENTRY-PARTIAL',
    policy_profile_ref: C_IDS.policy, policy_revision: 1, permission_revision: 1, hold_policy_revision: 1,
    bank_authority_ref: null, exclusion_status: 'disabled_pending_fixture_review',
    inclusion_criterion_ref: `${C_IDS.policy}:known-subject-preliminary`, query_scope_ref: 'SYNTHETIC-C-QUERY-v1',
    query_permission_ref: 'SYNTHETIC-C-PRELIMINARY-PERMISSION-v1', data_access_ref: 'synthetic_fixture_only',
    query_subject_refs: [C_IDS.personT], category_scope: ['sanctions_name_match'],
    dataset: {ref: 'SYNTHETIC-C-DATASET-v1', version_status: 'known', as_of: '2026-09-07T00:00:00Z'},
    referral_owner_ref: null, referral_basis_policy:null, holds: [], reviewed_edd_reasons: {},
    permissions: {'ROLE-KYCOPS': [...C_ACTIONS], 'ROLE-REVIEWER': [...C_ACTIONS,'record_unresolved','record_disposition','record_edd_applicability'],
      'ROLE-FINCRIME': [...C_ACTIONS,'record_unresolved','record_disposition','record_edd_applicability']},
    collaboration: {
      authentication_policy_ref: 'mock-fixed-identity-v1', grant_expires_at: input.demoConfig.batchB.grant_expires_at,
      reviews: {contact: true, disclosure: true, access: true, reviewer_permission_ref: 'SYNTHETIC-C-IDENTITY-REQUEST-REVIEW-v1'},
      accepted_fields: ['identity_context'], allowed_sufficiency: ['insufficient','unknown'],
      client_text: 'Please provide the identity information specified in this request for Person T through the secure task.'
    },
    shadow_inject: {id:'evidence-use-adequacy', enabled:false, status:'disabled_not_reviewed', mainline_required:false}
  };
  return s;
}

function touch(object, fields, at) {
  Object.assign(object, fields, {revision: object.revision + 1, updated_at: at});
}
function textRequired(value, code='RATIONALE_REQUIRED') {
  if(typeof value!=='string'||!value.trim()||value.length>2000)throw screeningError(code);
  return value.trim();
}
function stable(value) {
  if(Array.isArray(value))return value.map(stable);
  if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])]));
  return value;
}
const fingerprint = value => JSON.stringify(stable(value));
function appendBranch(s,{type,finding,at,rationale,key,gap,urgent=false}) {
  const eventRef=id('event',`screening-c-${s.case.revision+1}`);
  const existing=type==='information_gap'&&s.workItems.find(x=>x.branch_type===type&&x.finding_ref===finding?.id);
  if(existing) {
    touch(existing,{attempt_count:existing.attempt_count+1,status:'awaiting_input',wait_reason:gap,
      review_history:[...existing.review_history,{attempt:existing.attempt_count+1,at,rationale,event_ref:eventRef}]},at);
    return existing;
  }
  const population=currentPopulation(s);
  const reviewTask=finding?s.workItems.find(x=>x.work_type==='screening_review'&&x.finding_ref===finding.id):null;
  const branch=record(s,'work',`c-${type}-${s.workItems.length+1}`,{
    branch_instance_id:null,branch_type:type,work_type:type,origin_scene_ref:type==='conditional_edd'?'SCN-EDD':'SCN-MATCH',
    case_ref:s.case.id,finding_ref:finding?.id||null,population_ref:population.id,
    edd_assessment_ref:type==='conditional_edd'?s.eddApplicabilityAssessments.at(-1).id:null,
    parent_branch_ref:null,origin_task_ref:finding?reviewTask?.id:C_IDS.edd,active_task_ref:null,
    trigger_event_ref:eventRef,trigger_basis_refs:[finding?.id||C_IDS.edd],
    owner_ref:s.demoConfig.batchC.referral_owner_ref||'Unassigned',owner_role:'Unassigned',assignee_ref:null,
    status:type==='referral'?'referred':'awaiting_input',waiting_for:type==='information_gap'?C_IDS.identityItem:type==='referral'?'authorised_review':'targeted_edd_pack',
    wait_reason:gap||rationale,hold_scope:'task',blocked_action_refs:type==='conditional_edd'?['edd_outcome']:['record_disposition'],
    request_ref:type==='information_gap'?C_IDS.request:null,request_item_ref:type==='information_gap'?C_IDS.identityItem:null,
    input_refs:[finding?.id||C_IDS.edd],output_refs:[],attempt_count:1,
    review_history:[{attempt:1,at,rationale,event_ref:eventRef}],urgent,
    work_item_refs:[],request_item_refs:type==='information_gap'?[C_IDS.identityItem]:[],
    hold_refs:[],hold_scope_status:'known',resume_condition_ref:'SRC-016:19.4',
    return_scene_ref:type==='conditional_edd'?'SCN-EDD':'SCN-MATCH',return_object_ref:finding?.id||C_IDS.edd,
    return_task_selection_rule_ref:'SRC-016:19.3:current-permitted-task-or-safe-summary',resolution_event_ref:null,
    resume_predicate_ref:'SRC-016:19.4',fixed_return_target:{scene_ref:type==='conditional_edd'?'SCN-EDD':'SCN-MATCH',finding_ref:finding?.id||null,population_ref:population.id,review_task_ref:reviewTask?.id||null,edd_ref:C_IDS.edd},
    created_at:at,updated_at:at
  });
  branch.branch_instance_id=branch.id; branch.active_task_ref=branch.id;branch.work_item_refs=[branch.id];
  s.workItems.push(branch);
  return branch;
}
function openIdentityRequest(s,a,finding,at) {
  const gap=textRequired(a.gap,'IDENTITY_GAP_REQUIRED');
  const branch=appendBranch(s,{type:'information_gap',finding,at,rationale:a.rationale,key:a.key,gap});
  branch.existing_evidence_review={
    basis_refs:s.evidence.filter(x=>['EV-A03','EV-A05'].includes(x.alias)&&x.receipt_status==='received').map(x=>x.id),
    access_status:'permitted_synthetic_context',relevance:'role_and_coordination_context_only',quality_status:'not_assessed',
    identity_use_status:'not_established',gap,rationale:a.rationale,reviewed_by_ref:a.role
  };
  let request=s.informationRequests.find(x=>x.id===C_IDS.request);
  if(request)return branch;
  const config=s.demoConfig.batchC.collaboration;
  if(!config?.reviews?.contact||!config.reviews.disclosure||!config.reviews.access)throw screeningError('IDENTITY_REQUEST_REVIEW_CONFIGURATION_REQUIRED');
  s.requirements.push(record(s,'requirement','screening-identity-c',{
    subject_id:C_IDS.personT,principal_entity_id:C_IDS.entityA,purpose_code:'screening_identity',
    applicability:'required',applicability_review:'decided',status:'review_required',status_reason:'Identity information required for this finding'
  }));
  s.requestItems.push(record(s,'request-item','identity-c',{
    alias:'ITEM-IDENTITY-C',request_id:C_IDS.request,subject_id:C_IDS.personT,principal_entity_id:C_IDS.entityA,
    purpose_code:'screening_identity',requirement_id:C_IDS.identityRequirement,requirement_applicability:'required',
    finding_ref:finding.id,subject_revision:s.naturalPersons.find(x=>x.id===C_IDS.personT).revision,
    response_status:'open',response_draft:'',client_reason:config.client_text,restricted_reason:gap,
    requested_fields:[...config.accepted_fields],linked_evidence_refs:[],linked_evidence_revisions:{}
  }));
  s.requestRecipients.push(record(s,'recipient','identity-c-person-t',{
    request_id:C_IDS.request,person_ref:C_IDS.personT,permitted_item_refs:[C_IDS.identityItem],
    contact_review_ref:id('review','contact-person-t'),contributor_type:'limited_contributor',status:'active'
  }));
  s.channelPolicies.push(record(s,'channel-policy','identity-c',{
    region_context:'explicit_demo_policy',channel:'identity_secure_task',allowed_purposes:['screening_identity'],
    disclosure_classes:['client_safe'],capture_method:'case_audit_event',approval_status:'configured_for_demo',simulation_adapter_ref:'local_simulation'
  }));
  request=record(s,'request','identity-c',{
    task_ref:branch.id,principal_entity_id:C_IDS.entityA,purpose_code:'screening_identity',item_refs:[C_IDS.identityItem],
    finding_ref:finding.id,owner_ref:'Unassigned',review_ref:null,review_status:'draft',dispatch_policy_ref:C_IDS.identityPolicy,
    dispatch_status:'not_requested',delivery_status:'unknown',reference:'CTT-DEMO-ID-C01',
    client_summary:config.client_text,sent_revision_refs:[],status:'draft'
  });
  s.informationRequests.push(request);
  branch.output_refs.push(request.id,C_IDS.identityItem);
  return branch;
}
function resultFor(s,a,run,at) {
  if(!['completed','zero','partial','failed','pending'].includes(a.outcome))throw screeningError('NAMED_RESULT_REQUIRED');
  if(['completed','partial','failed'].includes(run.run_status)) {
    if(run.named_outcome===a.outcome)return false;
    throw screeningError('RUN_RESULT_ALREADY_RECORDED');
  }
  const population=currentPopulation(s), subjectSnapshot=s.runSubjectSnapshots.find(x=>x.id===run.subject_snapshot_refs[0]);
  const person=s.naturalPersons.find(x=>x.id===subjectSnapshot.party_ref);
  const historical=population.latest_run_ref!==run.id||run.scope_revision!==s.scopes[0].revision
    ||run.population_revision!==population.population_revision||person.revision!==subjectSnapshot.party_revision;
  const count=['completed','partial'].includes(a.outcome)?1:a.outcome==='zero'?0:null;
  const status=a.outcome==='zero'?'completed':a.outcome;
  const result=record(s,'screening-result',`c-${s.screeningResultSnapshots.length+1}`,{
    run_ref:run.id,run_revision:run.revision,run_input_fingerprint:run.input_fingerprint,
    named_outcome:a.outcome,result_count:count,result_status:status,historical,
    data_snapshot_ref:run.data_snapshot_ref,data_as_of:run.data_as_of,data_version_status:run.data_version_status,
    source_retrieved_at:at,provider_snapshot_refs:[],created_at:at,updated_at:at
  });
  if(count===1) {
    const provider=record(s,'provider-snapshot',`c-${s.providerRecordSnapshots.length+1}`,{
      provider_record_ref:'SYN-PROVIDER-RECORD-C01',category:'sanctions_name_match',programme_refs:['SYNTHETIC-C-QUERY-v1'],
      source_retrieved_at:at,data_as_of:run.data_as_of,record_completeness:'partial',
      alias_refs:['SYN-PROVIDER-RECORD-C01:primary','SYN-PROVIDER-RECORD-C01:alias'],
      identifier_claim_refs:['SYN-C-NAME','SYN-C-DOB-YEARS'],
      claims:{name:'Person T',date_of_birth:[{value:'1970',precision:'year'},{value:'1971',precision:'year'}],place_of_birth:null,nationality:null},
      narrative:'Synthetic possible-name record. Identity remains unresolved.',created_at:at,updated_at:at
    });
    s.providerRecordSnapshots.push(provider); result.provider_snapshot_refs.push(provider.id);
    const ordinal=s.screeningFindings.filter(x=>x.source_refs?.includes('SRC-016')).length;
    const finding=record(s,'finding',ordinal?`person-t-c01-${ordinal+1}`:'person-t-c01',{
      subject_ref:C_IDS.personT,subject_id:C_IDS.personT,run_ref:run.id,subject_snapshot_ref:subjectSnapshot.id,
      provider_snapshot_ref:provider.id,category:'sanctions_name_match',triage_status:'prepared',review_status:'awaiting_evidence',
      comparison_refs:[],related_finding_refs:s.screeningFindings.filter(x=>x.provider_record_ref===provider.provider_record_ref).map(x=>x.id),
      provider_record_ref:provider.provider_record_ref,decision_ref:null,assigned_role_ref:null,assignee_ref:null,
      restricted_detail_ref:provider.id,hold_refs:[],historical,created_at:at,updated_at:at
    });
    for(const attribute of ['name','date_of_birth','place_of_birth','nationality']) {
      const comparison=record(s,'comparison',`c-${ordinal+1}-${attribute}`,{
        finding_ref:finding.id,attribute_code:attribute,subject_claim_refs:attribute==='name'?[subjectSnapshot.id]:[],
        provider_claim_refs:[provider.id],subject_value:attribute==='name'?'Person T':null,provider_value:provider.claims[attribute],
        date_precision:{subject:'unknown',provider:attribute==='date_of_birth'?'year':'not_applicable'},
        comparison_result:attribute==='name'?'similar':'inconclusive',
        comparison_basis:attribute==='name'?'Synthetic name similarity; no identity conclusion':'Available subject evidence does not support a precise comparison',
        reviewer_status:'unreviewed',unresolved_issue_refs:attribute==='name'?[]:['C-IDENTITY-CONTEXT'],created_at:at,updated_at:at
      });
      s.attributeComparisons.push(comparison); finding.comparison_refs.push(comparison.id);
    }
    s.screeningFindings.push(finding);
    s.workItems.push(record(s,'work',ordinal?`screening-review-c-${ordinal+1}`:'screening-review-c',{
      work_type:'screening_review',finding_ref:finding.id,status:'awaiting_input',owner_role:'Unassigned',
      input_refs:[subjectSnapshot.id,provider.id],output_refs:[],waiting_for:'identity_evidence'
    }));
  }
  s.screeningResultSnapshots.push(result);
  touch(run,{run_status:status,named_outcome:a.outcome,result_count:count,result_snapshot_refs:[...run.result_snapshot_refs,result.id],
    failure_code:a.outcome==='failed'?'SYNTHETIC_PROVIDER_FAILURE':null,completed_at:a.outcome==='pending'?null:at},at);
  return true;
}

export function screeningAction(input,a) {
  if(!input?.demoConfig?.batchC)throw screeningError('C_CONTEXT_REQUIRED');
  if(!a?.key)throw screeningError('IDEMPOTENCY_KEY_REQUIRED');
  const intent={...a}; delete intent.at; delete intent.now;
  const intentFingerprint=fingerprint(intent), previous=input.auditEvents.find(x=>x.correlation_id===a.key);
  if(previous) {
    if(previous.idempotency_fingerprint===intentFingerprint)return input;
    throw screeningError('IDEMPOTENCY_COLLISION');
  }
  if(a.expectedRevision!==input.case.revision)throw screeningError('CASE_VERSION_CONFLICT');
  if(a.expectedScopeRevision!==input.scopes[0].revision)throw screeningError('SCOPE_VERSION_CONFLICT');
  const records=Object.values(input).flatMap(value=>Array.isArray(value)?value:[]).filter(value=>value&&Object.hasOwn(value,'revision'));
  if(records.some(value=>!Number.isSafeInteger(value.revision)||value.revision<1))throw screeningError('INVALID_INPUT_REVISION');
  if(fingerprint(a.expectedInputRevisions)!==fingerprint(screeningInputRevisions(input)))throw screeningError('INPUT_VERSION_CONFLICT');
  const key=screeningActionPredicates[a.type];
  if(!key)throw screeningError('UNSUPPORTED_SCREENING_ACTION');
  const predicate=screeningPredicates(input,{...a,action:a.type})[key];
  if(!predicate.allowed)throw screeningError(predicate.reason_codes[0]);
  textRequired(a.rationale);
  const at=a.at||a.now||new Date().toISOString();
  if(Number.isNaN(Date.parse(at)))throw screeningError('INVALID_EVENT_TIME');
  const s=structuredClone(input),cfg=s.demoConfig.batchC,population=currentPopulation(s),finding=currentFinding(s),outputs=[];
  let eventType=a.type;
  switch(a.type) {
    case 'prepare_preliminary': {
      const plan=record(s,'query-plan',s.screeningQueryPlans.length?`preliminary-c-${s.screeningQueryPlans.length+1}`:'preliminary-c',{
        run_kind:'preliminary',population_ref:population.id,population_revision:population.population_revision,
        subject_refs:[C_IDS.personT],category_scope:[...cfg.category_scope],query_scope_ref:cfg.query_scope_ref,
        policy_profile_ref:cfg.policy_profile_ref,query_permission_ref:cfg.query_permission_ref,plan_status:'prepared',
        input_fingerprint:screeningQueryInputFingerprint(s),created_at:at,updated_at:at
      });
      s.screeningQueryPlans.push(plan); outputs.push(plan.id); eventType='screening_query_prepared'; break;
    }
    case 'request_preliminary': {
      const plan=s.screeningQueryPlans.at(-1);
      if(!plan||plan.input_fingerprint!==screeningQueryInputFingerprint(s))throw screeningError('CURRENT_QUERY_PLAN_REQUIRED');
      const subject=s.naturalPersons.find(x=>x.id===C_IDS.personT),number=s.screeningRuns.length+1;
      const snapshot=record(s,'run-subject',`c-${number}`,{
        party_ref:subject.id,party_revision:subject.revision,name_claims:[{value:'Person T',source_ref:subject.id,value_status:'synthetic_reported'}],
        original_script_context:null,attribute_claim_refs:[],provenance_refs:[subject.id],permitted_query_scope_refs:[cfg.query_scope_ref],
        created_at:at,updated_at:at
      });
      s.runSubjectSnapshots.push(snapshot);
      const run=record(s,'screening-run',`c-${number}`,{
        run_kind:'preliminary',population_ref:population.id,population_revision:population.population_revision,
        subject_snapshot_refs:[snapshot.id],category_scope:[...cfg.category_scope],query_plan_ref:plan.id,query_plan_revision:plan.revision,
        query_scope_ref:cfg.query_scope_ref,provider_adapter_ref:'synthetic_screening_adapter',data_snapshot_ref:cfg.dataset.ref,
        data_version_status:cfg.dataset.version_status,data_as_of:cfg.dataset.as_of,requested_at:at,completed_at:null,
        run_status:'pending',result_snapshot_refs:[],result_count:null,failure_code:null,idempotency_ref:a.key,
        input_fingerprint:fingerprint({snapshot,plan}),created_at:at,updated_at:at
      });
      s.screeningRuns.push(run); touch(population,{latest_run_ref:run.id},at);
      s.screeningCoverageItems.push(record(s,'coverage',`c-${number}`,{
        population_ref:population.id,population_revision:population.population_revision,subject_ref:subject.id,subject_revision:subject.revision,
        category:'sanctions_name_match',query_scope_ref:cfg.query_scope_ref,applicability:'required',applicability_basis_ref:cfg.inclusion_criterion_ref,
        supporting_run_refs:[run.id],execution_status:'pending',finding_refs:[],review_status:'not_started',currency_status:'current',
        currency_basis_refs:[snapshot.id,plan.id],outcome_status:'unknown',blocking_reason_refs:['query_pending']
      }));
      outputs.push(run.id,snapshot.id); eventType='preliminary_screening_requested'; break;
    }
    case 'receive_result': {
      const run=s.screeningRuns.find(x=>x.id===a.runId);
      if(!run)throw screeningError('RUN_NOT_FOUND');
      if(!resultFor(s,a,run,at))return input;
      outputs.push(run.id,s.screeningResultSnapshots.at(-1).id); eventType='screening_result_received'; break;
    }
    case 'save_review_draft': {
      const text=textRequired(a.text,'DRAFT_TEXT_REQUIRED'),prior=s.screeningReviewDrafts.filter(x=>x.finding_ref===finding.id).at(-1);
      const draft=record(s,'review-draft',`c-${s.screeningReviewDrafts.length+1}`,{
        finding_ref:finding.id,text,rationale:a.rationale,actor_ref:a.role,expected_input_revision_refs:structuredClone(a.expectedInputRevisions),
        supersedes_ref:prior?.id||null,created_at:at,updated_at:at
      });
      s.screeningReviewDrafts.push(draft); outputs.push(draft.id); eventType='screening_review_prepared'; break;
    }
    case 'request_identity': {
      const branch=openIdentityRequest(s,a,finding,at);
      touch(finding,{triage_status:finding.triage_status==='referred'?'referred':'awaiting_information'},at);
      outputs.push(branch.id,C_IDS.request,C_IDS.identityItem); eventType='screening_evidence_gap_opened'; break;
    }
    case 'assess_identity': {
      if(!['insufficient','unknown'].includes(a.sufficiency))throw screeningError('IDENTITY_SUFFICIENCY_NOT_REVIEWED');
      const artifact=s.evidence.find(x=>x.id===a.evidenceId&&x.request_item_refs?.includes(C_IDS.identityItem));
      if(!artifact)throw screeningError('IDENTITY_EVIDENCE_NOT_FOUND');
      const assessment=record(s,'assessment',`identity-c-${s.evidenceUseAssessments.length+1}`,{
        evidence_id:artifact.id,evidence_record_revision:artifact.revision,evidence_revision:artifact.evidence_revision,
        content_revision:artifact.content_revision,requirement_id:C_IDS.identityRequirement,request_item_ref:C_IDS.identityItem,
        subject_id:C_IDS.personT,subject_revision:s.naturalPersons.find(x=>x.id===C_IDS.personT).revision,principal_entity_id:C_IDS.entityA,
        finding_ref:finding.id,purpose_code:'screening_identity',sufficiency:a.sufficiency,reason_code:a.reasonCode||'identity_context_unresolved',
        basis_refs:[artifact.id],assessed_by_ref:a.role,assessment_permission_ref:cfg.collaboration.reviews.reviewer_permission_ref,
        assessed_at:at,rationale:a.rationale,currency:'current',created_at:at,updated_at:at
      });
      s.evidenceUseAssessments.push(assessment); outputs.push(assessment.id); eventType='screening_evidence_use_assessed'; break;
    }
    case 'refer': case 'record_unresolved': {
      let branch=null;
      if(a.type==='refer')branch=appendBranch(s,{type:'referral',finding,at,rationale:a.rationale,key:a.key,urgent:!!a.urgent});
      const basis=predicate.decision_basis;
      if(branch)Object.assign(branch,{decision_basis_mode:basis.basis_mode,decision_basis_refs:[...basis.basis_refs],
        decision_basis_policy_ref:basis.policy_ref,evaluated_action_scope:[a.type]});
      const provider=s.providerRecordSnapshots.find(x=>x.id===finding.provider_snapshot_ref);
      const decision=record(s,'screening-decision',`c-${s.screeningReviewDecisions.length+1}`,{
        finding_ref:finding.id,decision_type:'screening_disposition',disposition:a.type==='refer'?'refer_specialist':'unresolved',
        decision_status:'recorded',rationale:a.rationale,rationale_code:a.urgent?'urgent_specialist_review':'identity_unresolved',
        evidence_use_assessment_refs:[...basis.evidence_use_assessment_refs],basis_refs:[...basis.basis_refs],
        basis_mode:basis.basis_mode,basis_policy_ref:basis.policy_ref,evaluated_action_scope:[a.type],
        hold_evaluation_object_refs:[...predicate.object_refs],
        subject_revision:s.naturalPersons.find(x=>x.id===C_IDS.personT).revision,provider_revision:provider.revision,
        population_revision:population.population_revision,authorised_by_ref:a.role,permission_basis_ref:`${C_IDS.policy}:${a.role}:${a.type}`,
        additional_approval_ref:null,recorded_at:at,currency_status:'current',supersedes_decision_ref:finding.decision_ref,
        expected_input_revision_refs:structuredClone(a.expectedInputRevisions),created_at:at,updated_at:at
      });
      s.screeningReviewDecisions.push(decision);
      touch(finding,{decision_ref:decision.id,triage_status:a.type==='refer'?'referred':'under_review',review_status:'unresolved'},at);
      outputs.push(decision.id,finding.id,...(branch?[branch.id]:[])); eventType='screening_disposition_recorded'; break;
    }
    case 'resume_branch': {
      const branch=s.workItems.find(x=>x.id===a.branchId);
      const eventRef=id('event',`screening-c-${s.case.revision+1}`);
      touch(branch,{status:'in_review',waiting_for:null,resume_basis_event_refs:[...predicate.basis_event_refs],
        review_history:[...branch.review_history,{at,rationale:a.rationale,event_ref:eventRef,resume:true,basis_event_refs:[...predicate.basis_event_refs]}]},at);
      outputs.push(branch.id); eventType='screening_review_resumed'; break;
    }
    case 'reassess_coverage': {
      for(const projection of deriveScreeningCoverage(s)) {
        const current=s.screeningCoverageItems.find(x=>x.id===projection.id);
        touch(current,projection,at); outputs.push(current.id);
      }
      eventType='screening_coverage_reassessed'; break;
    }
    case 'record_edd_applicability': {
      const reason=cfg.reviewed_edd_reasons[a.reasonRef];
      if(!reason||reason.review_status!=='reviewed_for_demo'||reason.scope_revision!==s.scopes[0].revision||!reason.permission_ref
        ||!reason.basis_refs?.length||reason.applicability!==a.applicability||!['required','not_required','unknown'].includes(a.applicability))throw screeningError('EDD_REASON_NOT_REVIEWED');
      const previous=s.eddApplicabilityAssessments.at(-1);
      const assessment=record(s,'edd-applicability',`batch-c-${s.eddApplicabilityAssessments.length+1}`,{
        trigger_reason_refs:[a.reasonRef],policy_basis_ref:C_IDS.policy,applicability:a.applicability,review_status:'decided',
        decided_by_ref:a.role,permission_ref:reason.permission_ref,decision_ref:a.key,revision:previous.revision+1,
        supersedes_ref:previous.id,rationale:a.rationale,basis_refs:[...predicate.decision_basis.basis_refs],
        evaluated_action_scope:[a.type],hold_evaluation_object_refs:[...predicate.object_refs],
        owner_ref:'Unassigned',question_ref:'C-Q-EDD-APPLICABILITY',created_at:at,updated_at:at
      });
      s.eddApplicabilityAssessments.push(assessment);
      if(a.applicability==='required')appendBranch(s,{type:'conditional_edd',at,rationale:a.rationale,key:a.key});
      outputs.push(assessment.id); eventType='edd_applicability_recorded'; break;
    }
    case 'prepare_edd_pack': {
      if(!a.questions?.length||!a.issueRefs||!a.evidenceRefs)throw screeningError('TARGETED_EDD_QUESTIONS_REQUIRED');
      if(a.evidenceRefs.some(ref=>!s.evidence.some(x=>x.id===ref&&x.intake_security_status==='released'&&x.scope_revision===s.scopes[0].revision)))throw screeningError('EDD_EVIDENCE_NOT_CURRENT');
      const assessment=record(s,'edd-assessment',`c-${s.eddAssessments.length+1}`,{
        applicability_ref:s.eddApplicabilityAssessments.at(-1).id,risk_question_refs:[...a.questions],evidence_pack_revision:s.eddAssessments.length+1,
        evidence_refs:[...a.evidenceRefs],open_issue_refs:[...a.issueRefs],measures:[],condition_refs:[],assessed_by_ref:null,approval_refs:[],
        approval_status:'unknown',status:'awaiting_evidence',owner_ref:'Unassigned',created_at:at,updated_at:at
      });
      s.eddAssessments.push(assessment); outputs.push(assessment.id); eventType='edd_pack_prepared'; break;
    }
    default: throw screeningError('UPSTREAM_CONFIRMED_INVENTORY_INTERFACE_NOT_CONFIGURED');
  }
  touch(s.case,{},at);
  const event=record(s,'event',`screening-c-${s.case.revision}`,{
    event_type:eventType,actor_ref:a.role,actor_type:'human_demo',object_ref:outputs[0]||population.id,object_refs:outputs,
    from_revision:input.case.revision,to_revision:s.case.revision,expected_revision:a.expectedRevision,expected_scope_revision:a.expectedScopeRevision,
    expected_input_revisions:structuredClone(a.expectedInputRevisions),correlation_id:a.key,idempotency_fingerprint:intentFingerprint,
    causation_ref:input.auditEvents.at(-1)?.id||null,rationale:a.rationale,occurred_at:at,created_at:at,updated_at:at
  });
  s.auditEvents.push(event);
  s.readinessSnapshots.push(record(s,'snapshot',`screening-c-${s.case.revision}`,{
    revision:s.case.revision,...readiness(s),result:'not_ready',screening_coverage_status:'incomplete',
    supersedes_ref:input.readinessSnapshots.at(-1)?.id||null,basis_event_refs:[event.id],evaluated_at:at,
    condition_revisions:Object.fromEntries(s.clearanceConditions.map(x=>[x.id,x.revision])),created_at:at,updated_at:at
  }));
  return s;
}

export function screeningProjection(s,{role='ROLE-KYCOPS',...context}={}) {
  const common={allowed:true,case_id:s.case.id,revision:s.case.revision,scopeRevision:s.scopes[0].revision};
  if(role==='ROLE-CLIENT'||role==='ROLE-RM') {
    const collaboration=s.informationRequests.some(x=>x.id===C_IDS.request)
      ?collaborationProjection(s,{...context,audience:role==='ROLE-CLIENT'?'client':'rm',requestId:C_IDS.request}):null;
    return {...common,progress:'review_in_progress',next_owner:'Unassigned',collaboration};
  }
  if(!s.demoConfig.batchC.permissions[role])return {...common,allowed:false,reason:'PERMISSION_REQUIRED'};
  const population=currentPopulation(s),finding=currentFinding(s),coverage=deriveScreeningCoverage(s);
  const predicates=screeningPredicates(s,{role,...context});
  const blockers=[...population.inventory_gap_refs,...coverage.flatMap(x=>x.blocking_reason_refs)];
  if(!coverage.length)blockers.push('coverage_not_established');
  if(population.inventory_status!=='complete_for_scope')blockers.push('population_incomplete');
  const edd=effectiveEdd(s),branches=s.workItems.filter(x=>x.branch_type);
  const caseReadiness={...readiness(s),result:'not_ready'};
  const actions=Object.fromEntries(Object.entries(screeningActionPredicates).map(([type,key])=>[type,screeningPredicates(s,{...context,role,action:type})[key]]));
  return {...common,population:structuredClone(population),memberships:structuredClone(s.screeningMemberships),runs:structuredClone(s.screeningRuns),
    coverage,coverageSummary:{status:'incomplete',blocking_reason_refs:[...new Set(blockers)]},finding:structuredClone(finding),
    provider:finding?structuredClone(s.providerRecordSnapshots.find(x=>x.id===finding.provider_snapshot_ref)):null,
    comparisons:structuredClone(s.attributeComparisons.filter(x=>x.finding_ref===finding?.id)),
    evidence:structuredClone(s.evidence.filter(x=>x.request_item_refs?.includes(C_IDS.identityItem))),
    assessments:structuredClone(s.evidenceUseAssessments.filter(x=>x.purpose_code==='screening_identity')),
    decisions:structuredClone(s.screeningReviewDecisions),draft:structuredClone(s.screeningReviewDrafts.filter(x=>x.finding_ref===finding?.id).at(-1)||null),
    branches:structuredClone(branches),edd,eddAssessment:structuredClone(s.eddAssessments.at(-1)||null),actions,predicates,
    inputRevisions:screeningInputRevisions(s),facts:screeningDecisionFacts(s),readiness:caseReadiness,shadowInject:structuredClone(s.demoConfig.batchC.shadow_inject),
    activity:structuredClone(s.auditEvents.filter(x=>x.source_refs?.includes('SRC-016'))),
    lenses:{outcome:{revision:s.case.revision,readiness:caseReadiness,coverage_status:'incomplete',edd_applicability:edd.applicability},
      work:{revision:s.case.revision,tasks:structuredClone(branches)},assurance:{revision:s.case.revision,event_refs:s.auditEvents.map(x=>x.id)}}
  };
}
