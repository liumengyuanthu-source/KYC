import {id,readiness} from './case-engine.mjs';
import {C_IDS} from './screening-engine.mjs';

export const D_IDS=Object.freeze({
  conflictReview:id('conflict-review','d-01'),conflictFinding:id('conflict-finding','d-01'),
  creditAssessment:id('credit-assessment','d-01'),creditDecision:id('decision','d-credit-01'),
  creditCondition:id('credit-condition','d-01'),agreementInput:id('agreement-input','d-01'),
  agreement:id('agreement','d-01'),legalApproval:id('decision','d-legal-01'),
  conflictsCondition:id('condition','conflicts'),creditConditionResult:id('condition','credit'),
  legalCondition:id('condition','legal'),conflictHold:id('hold','d-conflicts')
});
const SOURCE='SRC-019', VERSION='D2-D-Final-1.0', STAMP='2026-09-07T12:00:00Z';
const CONDITION_IDS=[D_IDS.conflictsCondition,D_IDS.creditConditionResult,D_IDS.legalCondition];
const INTERNAL=['ROLE-FACILITATOR','ROLE-KYCOPS','ROLE-REVIEWER','ROLE-FINCRIME','ROLE-CONFLICTS','ROLE-CREDIT','ROLE-LEGAL','ROLE-CASEMGR','ROLE-QA'];
const READERS=[...INTERNAL,'ROLE-RM','ROLE-CLIENT'];
const DETAIL=['ROLE-FACILITATOR','ROLE-CONFLICTS'];
const ACTIVITIES=['conflicts_start','conflict_clearance','credit_applicability','credit_assessment','legal_intake','legal_drafting','incorporate_credit','legal_execution','readiness_contribution','revise_credit'];
const TEXT='Applicable product documentation must incorporate the approved credit condition before execution.';
const fail=code=>{const error=new Error(code);error.code=code;throw error;};
const latest=(s,name,ref)=>s[name]?.filter(x=>!ref||x.id===ref).at(-1);
const record=(s,ref,fields={})=>({id:ref,case_id:s.case.id,case_scope_id:s.scopes[0].id,
  scope_revision:s.scopes[0].revision,revision:1,source_refs:[SOURCE],source_status:'SYNTHETIC',synthetic:true,
  simulation_flag:true,provenance:'authored_demo_fixture',bank_authority_ref:null,authority_status:'unknown',
  created_at:STAMP,updated_at:STAMP,...fields});
const allRecords=s=>Object.values(s).flatMap(v=>Array.isArray(v)?v:[]).filter(x=>x&&typeof x==='object');
function contextValid(s){
  const scope=s?.scopes?.[0], finding=s?.screeningFindings?.find(x=>x.id===C_IDS.finding);
  return s?.case?.id==='DEMO-CTT-001'&&s?.demoConfig?.batchC?.version==='D2-C-Final-1.0'
    &&scope?.id===id('scope','institutional')&&scope.case_id===s.case.id
    &&scope.entity_ids?.length===1&&scope.entity_ids[0]===C_IDS.entityA&&scope.product_scope_ids?.length>0
    &&s.entities?.some(x=>x.id===C_IDS.entityB)&&s.naturalPersons?.some(x=>x.id===C_IDS.personT)
    &&finding?.subject_ref===C_IDS.personT&&finding.case_scope_id===scope.id
    &&s.screeningReviewDecisions?.some(x=>x.finding_ref===finding.id&&x.decision_status==='recorded'
      &&['unresolved','refer_specialist'].includes(x.disposition)&&x.scope_revision===scope.revision)
    &&CONDITION_IDS.every(ref=>s.clearanceConditions?.some(x=>x.id===ref&&x.case_scope_id===scope.id));
}
function dValid(s){
  return contextValid(s)&&s.demoConfig.batchD?.version===VERSION&&s.demoConfig.batchD.entry_scope_revision===s.scopes[0].revision
    &&['conflictReviews','conflictFindings','creditAssessments','creditConditions','agreementInputs','legalAgreements'].every(name=>s[name]?.length)
    &&allRecords(s).filter(x=>x.source_refs?.includes(SOURCE)).every(x=>x.case_id===s.case.id&&x.case_scope_id===s.scopes[0].id&&Number.isSafeInteger(x.revision)&&x.revision>0);
}
function saveCondition(s,ref,fields,at=STAMP){
  const c=s.clearanceConditions.find(x=>x.id===ref);
  s.conditionHistory.push(structuredClone(c));
  Object.assign(c,fields,{revision:c.revision+1,scope_revision:s.scopes[0].revision,updated_at:at,
    source_refs:[...new Set([...c.source_refs,SOURCE])],provenance:'authored_demo_fixture',authority_status:'unknown',bank_authority_ref:null});
}
function edge(s,slug,from,fromRevision,to,toRevision,type,aliases,status='satisfied'){
  return record(s,id('dependency',`d-${slug}`),{from_ref:from,to_ref:to,from_object_ref:from,from_revision:fromRevision,
    to_object_ref:to,to_revision:toRevision,dependency_type:type,dependency_condition:type==='credit_to_legal'?'Consumer must use current Credit input revision':'Scoped minimum inputs or single condition contribution',
    impact_scope:type==='start_condition'?'task':'branch',status,created_from_ref:'SRC-019:5',validation_status:'reviewed_for_demo',
    source_aliases:aliases,required_input_revision:fromRevision});
}

/** Explicit authored continuation. This function does not replay, approve or finish A–C work. */
export function createBatchD(input){
  if(input?.demoConfig?.batchD?.version===VERSION){if(!dValid(input))fail('D_C_CONTEXT_REQUIRED');return input;}
  if(!contextValid(input))fail('D_C_CONTEXT_REQUIRED');
  const s=structuredClone(input), scope=s.scopes[0];
  for(const name of ['conflictReviews','conflictFindings','creditAssessments','creditConditions','agreementInputs','legalAgreements','conditionHistory','holds'])s[name]||=[];
  s.demoConfig.batchD={version:VERSION,source_refs:[SOURCE],entry:'D-ENTRY',entry_scope_revision:scope.revision,
    fixture_status:'explicit_authored_synthetic_extension',entry_case_revision:input.case.revision,
    bank_policy_ref:null,bank_approval_roles:null,bank_authority_ref:null,
    preparation_basis_ref:'SRC-019:3:approved-synthetic-starting-state',
    // This is an authored sufficient-context statement for the demo, not a booking/policy conclusion.
    minimum_context:{party_relationship:'sufficient_for_demo',credit_context:'sufficient_for_demo',financial_exposure:'sufficient_for_demo',agreement_context:'sufficient_for_demo'},
    read_roles:[...READERS],conflict_detail_roles:[...DETAIL],simulation_permissions:{'ROLE-FACILITATOR':['revise_credit']},
    execution_permission_ref:null,clearance_permission_ref:null,approval_permission_ref:null};
  s.conflictReviews.push(record(s,D_IDS.conflictReview,{case_scope_ref:scope.id,party_refs:[C_IDS.entityA,C_IDS.entityB,C_IDS.personT],
    trigger_basis_ref:'SRC-019:3:D2',search_scope_ref:'SRC-019:3:synthetic-relationship-search',finding_refs:[D_IDS.conflictFinding],
    search_status:'complete',review_status:'specialist_review_pending',decision_ref:null,clearance_status:'pending',hold_refs:[D_IDS.conflictHold]}));
  s.conflictFindings.push(record(s,D_IDS.conflictFinding,{conflict_review_ref:D_IDS.conflictReview,
    finding_type:'potential_relationship_conflict',source_ref:'SRC-019:3:D2',summary:'Potential relationship conflict requiring specialist review',
    materiality_status:'unknown',assigned_role_ref:'ROLE-CONFLICTS',resolution_status:'open',decision_ref:null,
    restricted_detail_ref:'synthetic:conflict-detail:d-01',restricted_detail:'Synthetic relationship context reserved for the configured conflict reviewer; no misconduct finding.'}));
  s.decisions.push(record(s,D_IDS.creditDecision,{alias:'CD-01',decision_type:'SRC-019:synthetic_credit_condition_approval',
    outcome:'approved_subject_to_condition',record_status:'authored_for_demo',approval_role_ref:null,
    demo_role_ref:'ROLE-CREDIT',basis_refs:[D_IDS.creditAssessment],input_revisions:{[D_IDS.creditAssessment]:1},rationale:'Approved synthetic starting state in Batch D Final; no bank approval performed.'}));
  s.creditAssessments.push(record(s,D_IDS.creditAssessment,{case_scope_ref:scope.id,counterparty_ref:C_IDS.entityA,
    product_scope_ref:scope.product_scope_ids[0],applicability:'required',financial_data_refs:['SRC-019:3:synthetic-credit-context'],
    exposure_data_refs:['SRC-019:3:synthetic-credit-context'],assessment_status:'complete',decision_ref:D_IDS.creditDecision,
    condition_refs:[D_IDS.creditCondition],approval_ref:D_IDS.creditDecision,approval_status:'approved_subject_to_condition'}));
  s.creditConditions.push(record(s,D_IDS.creditCondition,{alias:'CC-01',credit_assessment_ref:D_IDS.creditAssessment,credit_assessment_revision:1,
    condition_type:'documentation_before_execution',condition_text:TEXT,applicability:'required',status:'approved',
    effective_scope:scope.id,agreement_input_required:true,satisfied_by_refs:[],decision_ref:D_IDS.creditDecision}));
  s.agreementInputs.push(record(s,D_IDS.agreementInput,{alias:'AI-01',credit_decision_ref:D_IDS.creditDecision,credit_decision_revision:1,
    credit_condition_ref:D_IDS.creditCondition,credit_condition_revision:1,condition_text:TEXT,agreement_ref:D_IDS.agreement,status:'available'}));
  s.decisions.push(record(s,D_IDS.legalApproval,{decision_type:'SRC-019:synthetic_legal_internal_approval',outcome:'internally_approved',
    record_status:'authored_for_demo',approval_role_ref:null,demo_role_ref:'ROLE-LEGAL',basis_refs:[D_IDS.agreement],
    input_revisions:{[D_IDS.agreement]:3,[D_IDS.agreementInput]:1}}));
  s.legalAgreements.push(record(s,D_IDS.agreement,{alias:'AGR-01',case_scope_ref:scope.id,agreement_type:'synthetic_applicable_product_documentation',
    party_refs:[C_IDS.entityA],product_scope_refs:[...scope.product_scope_ids],revision:3,agreement_revision:3,
    agreement_input_ref:D_IDS.agreementInput,credit_input_revision:1,draft_status:'complete',review_status:'complete',
    approval_status:'internally_approved',approval_ref:D_IDS.legalApproval,execution_status:'pending',
    signatory_authority_refs:[],executed_document_ref:null,history_note:'Revision 03 is the authored entry; revisions 01–02 are not supplied and are not fabricated.'}));
  s.holds.push(record(s,D_IDS.conflictHold,{case_scope_ref:scope.id,target_object_ref:D_IDS.conflictReview,
    hold_scope:'task',scope:'task',object_scope_refs:[D_IDS.conflictReview],action_scope:['conflict_clearance'],
    reason_code:'specialist_review_pending',trigger_ref:D_IDS.conflictFinding,basis_ref:'SRC-019:3:D2',owner_role_ref:'ROLE-CONFLICTS',
    applied_at:STAMP,status:'active',release_condition:'Configured specialist decision required',release_condition_ref:'SRC-019:4:conflicts',
    released_at:null,release_decision_ref:null}));
  saveCondition(s,D_IDS.conflictsCondition,{applicability:'required',status:'pending',status_reason:'Specialist review outstanding',
    blocking_scope:'branch',owner_role:'ROLE-CONFLICTS',basis_refs:[D_IDS.conflictReview],decision_refs:[],evidence_refs:['SRC-019:3:D2'],next_action:'Specialist review'});
  saveCondition(s,D_IDS.creditConditionResult,{applicability:'required',status:'satisfied',status_reason:'Credit condition approved; documentation fulfilment remains outstanding',
    blocking_scope:'branch',owner_role:'ROLE-CREDIT',basis_refs:[D_IDS.creditDecision,D_IDS.creditCondition],decision_refs:[D_IDS.creditDecision],evidence_refs:['SRC-019:3:D3'],next_action:'Track Legal incorporation and execution'});
  saveCondition(s,D_IDS.legalCondition,{applicability:'required',status:'pending',status_reason:'Internally approved; execution and signatory authority remain outstanding',
    blocking_scope:'branch',owner_role:'ROLE-LEGAL',basis_refs:[D_IDS.agreement],decision_refs:[D_IDS.legalApproval],evidence_refs:['SRC-019:3:D4'],next_action:'Review execution prerequisites'});
  s.dependencies.push(
    edge(s,'conflicts-start',scope.id,scope.revision,D_IDS.conflictReview,1,'start_condition',['SRC-009:DEP-01','SRC-010:DEP-01']),
    edge(s,'credit-start',scope.id,scope.revision,D_IDS.creditAssessment,1,'start_condition',['SRC-009:DEP-06','SRC-010:DEP-10']),
    edge(s,'legal-start',scope.id,scope.revision,D_IDS.agreement,3,'start_condition',['SRC-009:DEP-05','SRC-010:DEP-09']),
    edge(s,'assessment-decision-1',D_IDS.creditAssessment,1,D_IDS.creditDecision,1,'decision_input',['SRC-009:DEP-07']),
    edge(s,'decision-condition-1',D_IDS.creditDecision,1,D_IDS.creditCondition,1,'decision_input',['SRC-009:DEP-07']),
    edge(s,'condition-input-1',D_IDS.creditCondition,1,D_IDS.agreementInput,1,'data_input',['SRC-009:DEP-07']),
    edge(s,'credit-legal-1',D_IDS.agreementInput,1,D_IDS.agreement,3,'credit_to_legal',['SRC-009:DEP-07']),
    ...CONDITION_IDS.map(ref=>edge(s,`readiness-${ref.split('/').at(-1)}`,ref,2,s.case.id,s.case.revision+1,'readiness_contribution',['SRC-009:DEP-11','SRC-010:DEP-12'],ref===D_IDS.creditConditionResult?'satisfied':'pending'))
  );
  for(const c of s.clearanceConditions.filter(c=>CONDITION_IDS.includes(c.id)))c.dependency_refs=s.dependencies.filter(d=>d.from_ref===c.id||d.to_ref===c.basis_refs[0]).map(d=>d.id);
  s.case.revision+=1;s.case.updated_at=STAMP;
  // Authored fixture provenance is intentionally separate from runtime business/audit events.
  s.demoConfig.batchD.authored_fixture_ref='SRC-019:3:D-ENTRY';
  return s;
}

function fingerprint(value){
  const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
  const text=JSON.stringify(canonical(value));let a=2166136261,b=5381;
  for(let i=0;i<text.length;i++){a=Math.imul(a^text.charCodeAt(i),16777619);b=Math.imul(b,33)^text.charCodeAt(i);}
  return `${text.length}:${a>>>0}:${b>>>0}`;
}
function inputs(s){
  const records=[s.case,...s.scopes,...allRecords(s).filter(x=>x.source_refs?.includes(SOURCE))];
  return {...Object.fromEntries(records.map(x=>[x.id,x.revision])),
    'SRC-019:content':fingerprint({records,config:s.demoConfig.batchD,upstreamHolds:[s.holds,s.demoConfig.batchA?.holds,s.demoConfig.batchC?.holds]})};
}
const targetFor=activity=>activity.startsWith('conflict')?D_IDS.conflictReview:activity.startsWith('credit')||activity==='revise_credit'?D_IDS.creditAssessment:D_IDS.agreement;
function holdsFor(s,activity,objectRef){
  const refs=new Set([objectRef||targetFor(activity),activity==='revise_credit'?D_IDS.creditCondition:null]);
  return [...(s.holds||[]),...(s.demoConfig.batchA?.holds||[]),...(s.demoConfig.batchC?.holds||[])].filter(h=>{
    if(!['active','unknown'].includes(h.status))return false;
    if(h.action_scope?.length&&!h.action_scope.includes('*')&&!h.action_scope.includes(activity))return false;
    if(h.hold_scope==='case'||h.scope==='case')return true;
    if(h.object_scope_refs?.length)return h.object_scope_refs.some(ref=>refs.has(ref));
    if(h.target_object_ref)return refs.has(h.target_object_ref);
    if(h.task||h.branch)return [activity,objectRef,targetFor(activity)].includes(h.task||h.branch);
    return true;
  });
}
function currency(s){
  const agreement=latest(s,'legalAgreements',D_IDS.agreement), input=latest(s,'agreementInputs',D_IDS.agreementInput);
  if(!agreement||!input||agreement.agreement_input_ref!==input.id||!s.agreementInputs.some(x=>x.id===agreement.agreement_input_ref&&x.revision===agreement.credit_input_revision))return 'unknown';
  return agreement.credit_input_revision===input.revision?'current':'superseded';
}
function creditInputValid(s){
  const scope=s.scopes[0],credit=latest(s,'creditAssessments',D_IDS.creditAssessment),condition=latest(s,'creditConditions',D_IDS.creditCondition),
    input=latest(s,'agreementInputs',D_IDS.agreementInput),decision=latest(s,'decisions',credit?.decision_ref);
  const scoped=x=>x&&x.case_id===s.case.id&&x.case_scope_id===scope.id&&x.scope_revision===scope.revision;
  return [credit,condition,input,decision].every(scoped)&&credit.applicability==='required'&&credit.assessment_status==='complete'
    &&credit.counterparty_ref===C_IDS.entityA&&scope.product_scope_ids.includes(credit.product_scope_ref)
    &&credit.approval_ref===decision.id&&decision.outcome==='approved_subject_to_condition'
    &&decision.input_revisions?.[credit.id]===credit.revision&&credit.condition_refs.includes(condition.id)
    &&condition.credit_assessment_ref===credit.id&&condition.credit_assessment_revision===credit.revision
    &&condition.decision_ref===decision.id&&condition.applicability==='required'&&condition.status==='approved'&&condition.effective_scope===scope.id
    &&typeof condition.condition_text==='string'&&condition.condition_text.trim().length>0
    &&input.credit_decision_ref===decision.id&&input.credit_decision_revision===decision.revision
    &&input.credit_condition_ref===condition.id&&input.credit_condition_revision===condition.revision
    &&input.agreement_ref===D_IDS.agreement&&input.status==='available'
    &&typeof input.condition_text==='string'&&input.condition_text.trim().length>0&&input.condition_text===condition.condition_text;
}
function prerequisiteDependencies(s,activity){
  const target=targetFor(activity), includeCredit=['incorporate_credit','legal_execution'].includes(activity),
    credit=latest(s,'creditAssessments',D_IDS.creditAssessment),condition=latest(s,'creditConditions',D_IDS.creditCondition),input=latest(s,'agreementInputs',D_IDS.agreementInput);
  const currentInputs=new Map(includeCredit?[[credit.decision_ref,1],[condition.id,condition.revision],[input.id,input.revision]]:[]);
  return s.dependencies.filter(d=>d.source_refs?.includes(SOURCE)&&(
    d.to_object_ref===target&&(d.dependency_type==='start_condition'||activity==='legal_execution'&&d.dependency_type==='credit_to_legal')
    ||includeCredit&&currentInputs.get(d.to_object_ref)===d.to_revision)).map(d=>({
      id:d.id,status:d.dependency_type==='credit_to_legal'&&currency(s)!=='current'?'stale':d.status,
      impact_scope:d.impact_scope,unknown:d.status==='unknown'||!['task','branch','case'].includes(d.impact_scope)||d.validation_status!=='reviewed_for_demo'
    }));
}

/** Eligibility explanation only. Approval, clearance and execution have no writer. */
export function specialistPredicates(s,{role,activity,objectRef}={}){
  const reasons=[], known=ACTIVITIES.includes(activity), valid=dValid(s), config=s?.demoConfig?.batchD;
  if(!valid)reasons.push('D_CONTEXT_REQUIRED');
  if(!known)reasons.push('D_ACTIVITY_UNKNOWN');
  const permission=activity==='revise_credit'?role==='ROLE-FACILITATOR'&&config?.simulation_permissions?.[role]?.includes(activity)
    :INTERNAL.includes(role)&&config?.read_roles?.includes(role);
  if(!permission)reasons.push('D_PERMISSION_REQUIRED');
  if(objectRef&&objectRef!==targetFor(activity))reasons.push('D_OBJECT_SCOPE_MISMATCH');
  const holds=valid?holdsFor(s,activity,objectRef):[];
  const dependencies=valid?prerequisiteDependencies(s,activity):[];
  if(holds.length)reasons.push('D_ACTIVITY_HELD');
  if(dependencies.some(d=>d.unknown))reasons.push('D_DEPENDENCY_IMPACT_UNKNOWN');
  if(dependencies.some(d=>d.status!=='satisfied'))reasons.push('D_DEPENDENCY_UNRESOLVED');
  if(valid){
    const minimum=config.minimum_context, credit=latest(s,'creditAssessments',D_IDS.creditAssessment), agreement=latest(s,'legalAgreements',D_IDS.agreement);
    const contextKey=activity.startsWith('conflict')?'party_relationship':activity.startsWith('credit')?'credit_context':'agreement_context';
    if(minimum?.[contextKey]!=='sufficient_for_demo')reasons.push('D_MINIMUM_CONTEXT_UNKNOWN');
    if(activity.startsWith('credit')&&(credit.counterparty_ref!==C_IDS.entityA||!s.scopes[0].product_scope_ids.includes(credit.product_scope_ref)))reasons.push('D_CREDIT_SCOPE_MISMATCH');
    if((activity.startsWith('legal')||activity==='incorporate_credit')&&(!agreement.agreement_type||!agreement.party_refs?.length||agreement.party_refs.some(ref=>!s.scopes[0].entity_ids.includes(ref))
      ||!agreement.product_scope_refs?.length||agreement.product_scope_refs.some(ref=>!s.scopes[0].product_scope_ids.includes(ref))))reasons.push('D_AGREEMENT_CONTEXT_REQUIRED');
    if(activity==='credit_assessment'&&(credit.applicability!=='required'||minimum?.financial_exposure!=='sufficient_for_demo'||!credit.financial_data_refs?.length||!credit.exposure_data_refs?.length))reasons.push('D_CREDIT_INPUT_REQUIRED');
    if(activity==='conflict_clearance')reasons.push('D_CLEARANCE_PERMISSION_UNCONFIGURED');
    if(activity==='incorporate_credit'&&!creditInputValid(s))reasons.push('D_CREDIT_INPUT_REQUIRED');
    if(activity==='legal_execution'){
      reasons.push('D_EXECUTION_PERMISSION_UNCONFIGURED');
      if(!agreement.signatory_authority_refs.length)reasons.push('D_SIGNATORY_AUTHORITY_UNKNOWN');
      if(currency(s)!=='current')reasons.push('D_CREDIT_INPUT_SUPERSEDED');
      if(agreement.draft_status!=='complete'||agreement.approval_status!=='internally_approved')reasons.push('D_FINAL_AGREEMENT_REQUIRED');
      if(s.clearanceConditions.some(c=>c.id===D_IDS.conflictsCondition&&c.status!=='satisfied'))reasons.push('D_CONFLICT_REVIEW_PENDING');
    }
  }
  return {activity,objectRef:objectRef||targetFor(activity),allowed:reasons.length===0,readOnly:activity!=='revise_credit',reasons,
    impact:holds.some(h=>h.status==='unknown'||(h.hold_scope||h.scope)==='unknown')||dependencies.some(d=>d.unknown)?'unknown':holds.length||dependencies.some(d=>d.status!=='satisfied')?'affected':'unaffected',
    dependencies:dependencies.map(d=>({id:d.id,status:d.status,impact_scope:d.unknown?'unknown':d.impact_scope})),
    holds:holds.map(h=>({id:h.id,hold_scope:h.hold_scope||h.scope||'unknown',status:h.status}))};
}

export function specialistProjection(s,{role}={}){
  if(!dValid(s)||!READERS.includes(role)||!s.demoConfig.batchD.read_roles.includes(role))return {available:false,reason:'D_CONTEXT_OR_PERMISSION_REQUIRED',conditions:[],actionEligibility:{}};
  const review=latest(s,'conflictReviews',D_IDS.conflictReview), finding=latest(s,'conflictFindings',D_IDS.conflictFinding),
    credit=latest(s,'creditAssessments',D_IDS.creditAssessment), cc=latest(s,'creditConditions',D_IDS.creditCondition),
    agreement=latest(s,'legalAgreements',D_IDS.agreement), ai=latest(s,'agreementInputs',D_IDS.agreementInput);
  const restricted=DETAIL.includes(role)&&s.demoConfig.batchD.conflict_detail_roles.includes(role), internal=INTERNAL.includes(role),
    creditApproved=credit.applicability==='required'&&credit.approval_status==='approved_subject_to_condition', inputCurrency=currency(s);
  const dependencies=(s.dependencies||[]).filter(x=>x.source_refs?.includes(SOURCE)).map(x=>({
    id:x.id,dependency_id:x.id,from_object_ref:x.from_object_ref,from_revision:x.from_revision,to_object_ref:x.to_object_ref,to_revision:x.to_revision,
    dependency_type:x.dependency_type,dependency_condition:x.dependency_type==='credit_to_legal'?'Consumer must use current Credit input revision':'Scoped minimum inputs or single condition contribution',impact_scope:x.impact_scope,
    status:x.dependency_type==='credit_to_legal'&&inputCurrency==='superseded'?'stale':x.status,
    source_aliases:[...x.source_aliases],validation_status:x.validation_status,created_from_ref:x.created_from_ref}));
  const conditions=s.clearanceConditions.filter(c=>CONDITION_IDS.includes(c.id)).map(c=>({
    id:c.id,condition_id:c.id,domain:c.domain,case_scope_ref:c.case_scope_id,applicability:c.domain==='credit'?credit.applicability:c.applicability,
    status:c.domain==='credit'&&credit.applicability!=='required'?credit.applicability:c.status,
    condition_status:c.domain==='credit'&&credit.applicability!=='required'?credit.applicability:c.status,
    blocking_scope:c.blocking_scope,owner_role_ref:c.owner_role,owner:c.owner_role,revision:c.revision,
    why:c.domain==='conflicts'?'Specialist review outstanding':c.domain==='credit'?'Credit condition approved; documentation fulfilment tracked separately':inputCurrency==='superseded'?'Current agreement uses superseded Credit input':'Internally approved; execution pending',
    waitingFor:c.domain==='conflicts'?['Specialist review']:c.domain==='credit'?['Documentation incorporation before execution']:['Execution','Validated signatory authority',...(inputCurrency==='superseded'?['Current Credit input']:[])],
    dependency_refs:[...(c.dependency_refs||[])],dependencies:dependencies.filter(d=>d.from_object_ref===c.id||d.to_object_ref===c.basis_refs[0]),
    decision_refs:[...(c.decision_refs||[])],evidence_refs:[...(c.evidence_refs||[])],last_changed_at:c.updated_at,
    activity:c.domain==='conflicts'?'Specialist review':c.domain==='credit'?'Track Legal incorporation and execution':'Review execution prerequisites'}));
  const result={available:true,source_ref:SOURCE,synthetic:true,caseId:s.case.id,scopeId:s.scopes[0].id,revision:s.case.revision,scopeRevision:s.scopes[0].revision,
    conditionRevisions:Object.fromEntries(conditions.map(c=>[c.id,c.revision])),conditions,
    conflict:{id:review.id,search_status:review.search_status,finding_status:finding.resolution_status,review_status:review.review_status,clearance_status:review.clearance_status,
      summary:'Potential relationship conflict requiring specialist review',...(restricted?{detail:{summary:finding.summary,restricted_detail_ref:finding.restricted_detail_ref,restricted_detail:finding.restricted_detail,materiality_status:finding.materiality_status}}:{})},
    credit:{id:credit.id,revision:credit.revision,applicability:credit.applicability,assessment_status:credit.assessment_status,
      approval_status:credit.applicability==='required'?credit.approval_status:credit.applicability,approved:creditApproved,condition_status:cc.status,
      condition_text:cc.condition_text,documentation_status:inputCurrency==='current'?'incorporated_not_executed':'superseded_input_requires_review',decision_ref:credit.decision_ref},
    legal:{id:agreement.id,agreement_revision:agreement.agreement_revision,credit_input_revision:agreement.credit_input_revision,current_credit_input_revision:ai.revision,
      draft_status:agreement.draft_status,review_status:agreement.review_status,approval_status:agreement.approval_status,execution_status:agreement.execution_status,
      signatory_authority_status:'unknown',input_currency:inputCurrency,approval_ref:agreement.approval_ref},
    versionChain:[{id:credit.id,alias:'Credit Assessment',revision:credit.revision,status:'current'},
      {id:credit.decision_ref,alias:latest(s,'decisions',credit.decision_ref)?.alias||'CD-01',revision:1,status:'current'},
      {id:cc.id,alias:'CC-01',revision:cc.revision,status:'current'},{id:ai.id,alias:'AI-01',revision:ai.revision,status:'current'},
      {id:agreement.id,alias:'AGR-01',revision:agreement.agreement_revision,status:inputCurrency,consumed_input_revision:agreement.credit_input_revision}],
    versionHistory:[...s.creditAssessments,...s.decisions.filter(x=>x.source_refs?.includes(SOURCE)),...s.creditConditions,...s.agreementInputs,...s.legalAgreements].map(x=>({
      id:x.id,revision:x.revision,alias:x.alias||null,
      status:x.id===D_IDS.agreement?inputCurrency:x.id===D_IDS.legalApproval?'authored_approval':
        x.decision_type?x.id===credit.decision_ref?'current':'superseded':
        Math.max(...allRecords(s).filter(r=>r.id===x.id).map(r=>r.revision))===x.revision?'current':'superseded',
      upstream:dependencies.filter(d=>d.to_object_ref===x.id&&d.to_revision===x.revision).map(d=>({id:d.from_object_ref,revision:d.from_revision})),
      downstream:dependencies.filter(d=>d.from_object_ref===x.id&&d.from_revision===x.revision).map(d=>({id:d.to_object_ref,revision:d.to_revision}))})),
    dependencies,holds:s.holds.map(h=>({id:h.id,hold_scope:h.hold_scope||h.scope||'unknown',status:h.status,target_object_ref:h.target_object_ref||null,
      reason_code:h.reason_code==='specialist_review_pending'?'specialist_review_pending':'review_required'})),
    readiness:readiness(s),inputRevisions:internal?inputs(s):{},
    actionEligibility:Object.fromEntries(ACTIVITIES.map(activity=>[activity,specialistPredicates(s,{role,activity})])),
    audit:s.auditEvents.filter(e=>e.source_refs?.includes(SOURCE)).map(e=>({id:e.id,event_type:e.event_type==='revise_credit'?'revise_credit':'specialist_activity',occurred_at:e.occurred_at,from_revision:e.from_revision,to_revision:e.to_revision})),
    bank_authority_status:'unknown',fixture_origin:s.demoConfig.batchD.authored_fixture_ref};
  return structuredClone(result);
}

export function specialistLenses(s,options={}){
  const p=specialistProjection(s,options);
  return Object.fromEntries(['outcome','work','assurance'].map(lens=>[lens,{...structuredClone(p),lens,readOnly:true}]));
}

/** Sole D writer: facilitator simulation of revised source input, never a bank decision writer. */
export function specialistAction(input,command={}){
  if(command.type!=='revise_credit')fail('D_ACTION_NOT_SUPPORTED');
  if(!dValid(input))fail('D_CONTEXT_REQUIRED');
  if(command.role!=='ROLE-FACILITATOR'||!input.demoConfig.batchD.simulation_permissions?.[command.role]?.includes('revise_credit'))fail('D_PERMISSION_REQUIRED');
  const allowedFields=['type','role','expectedRevision','expectedScopeRevision','expectedInputRevisions','key','rationale','at'];
  if(Object.keys(command).some(k=>!allowedFields.includes(k)))fail('D_COMMAND_FIELD_NOT_ALLOWED');
  if(typeof command.key!=='string'||!command.key.trim()||command.key.length>200)fail('D_KEY_REQUIRED');
  if(typeof command.rationale!=='string'||!command.rationale.trim()||command.rationale.length>2000)fail('D_RATIONALE_REQUIRED');
  const commandFingerprint=fingerprint(command), prior=input.auditEvents.find(e=>e.correlation_id===command.key);
  if(prior){if(prior.command_fingerprint!==commandFingerprint)fail('D_IDEMPOTENCY_CONFLICT');return input;}
  if(command.expectedRevision!==input.case.revision)fail('D_STALE_CASE');
  if(command.expectedScopeRevision!==input.scopes[0].revision)fail('D_STALE_SCOPE');
  if(fingerprint(command.expectedInputRevisions||{})!==fingerprint(inputs(input)))fail('D_STALE_INPUT');
  const eligibility=specialistPredicates(input,{role:command.role,activity:command.type});
  if(!eligibility.allowed)fail(eligibility.reasons[0]);
  const s=structuredClone(input),at=command.at||new Date().toISOString();
  if(!Number.isFinite(Date.parse(at)))fail('D_INVALID_TIMESTAMP');
  const previousCredit=latest(s,'creditAssessments',D_IDS.creditAssessment), previousCondition=latest(s,'creditConditions',D_IDS.creditCondition), previousInput=latest(s,'agreementInputs',D_IDS.agreementInput);
  const revision=previousCredit.revision+1,decisionRef=id('decision',`d-credit-${String(revision).padStart(2,'0')}`);
  const append=(name,prior,fields)=>s[name].push({...structuredClone(prior),...fields,revision:prior.revision+1,updated_at:at,
    provenance:'facilitator_simulation',supersedes_revision:prior.revision});
  s.decisions.push(record(s,decisionRef,{alias:`CD-${String(revision).padStart(2,'0')}`,decision_type:'SRC-019:synthetic_credit_input_revision',outcome:'approved_subject_to_condition',
    record_status:'simulated_revision_of_authored_fixture',approval_role_ref:null,demo_role_ref:'ROLE-FACILITATOR',basis_refs:[D_IDS.creditAssessment],
    input_revisions:{[D_IDS.creditAssessment]:revision},supersedes_decision_ref:previousCredit.decision_ref,created_at:at,updated_at:at,provenance:'facilitator_simulation'}));
  append('creditAssessments',previousCredit,{decision_ref:decisionRef,approval_ref:decisionRef});
  append('creditConditions',previousCondition,{decision_ref:decisionRef,credit_assessment_revision:revision});
  append('agreementInputs',previousInput,{credit_decision_ref:decisionRef,credit_condition_revision:revision});
  saveCondition(s,D_IDS.creditConditionResult,{decision_refs:[decisionRef],basis_refs:[decisionRef,D_IDS.creditCondition]},at);
  saveCondition(s,D_IDS.legalCondition,{status:'pending',status_reason:'Existing agreement uses superseded Credit input; reassessment required'},at);
  s.dependencies.push(edge(s,`assessment-decision-${revision}`,D_IDS.creditAssessment,revision,decisionRef,1,'decision_input',['SRC-009:DEP-07']),
    edge(s,`decision-condition-${revision}`,decisionRef,1,D_IDS.creditCondition,revision,'decision_input',['SRC-009:DEP-07']),
    edge(s,`condition-input-${revision}`,D_IDS.creditCondition,revision,D_IDS.agreementInput,revision,'data_input',['SRC-009:DEP-07']));
  s.case.revision+=1;s.case.updated_at=at;
  s.auditEvents.push(record(s,id('event',`d-credit-${s.case.revision}`),{event_type:'revise_credit',actor_ref:command.role,object_ref:D_IDS.creditAssessment,
    from_revision:input.case.revision,to_revision:s.case.revision,occurred_at:at,created_at:at,updated_at:at,correlation_id:command.key,
    command_fingerprint:commandFingerprint,rationale:command.rationale.trim(),provenance:'facilitator_simulation',input_revisions:inputs(input)}));
  return s;
}
