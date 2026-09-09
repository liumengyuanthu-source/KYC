/** Candidate contracts only. Mechanical JSON generation follows the existing Batch D build workflow. */
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createBatchE,clearanceProjection,clearanceAction,E_IDS,E_APPROVED_PACKAGE,E_ACTION_ROLES,E_ALIAS_CHAIN} from '../../prototype/clearance-engine.mjs';
const here=new URL('./',import.meta.url),status='additive_candidate_v0.1_not_production_schema';
const model=(collection,fields,aliases={},owner='ROLE-CASEMGR')=>({collection,fields:fields.split(' '),aliases,owner});
const decisionBindingFields={screening_coverage:['reviewed_screening_bindings','historical_finding_exclusions'],legal_execution:['executed_document_ref','executed_document_revision','executed_evidence_revision','executed_content_revision','executed_document_fingerprint','agreement_ref','agreement_revision','agreement_fingerprint']};
const models={
 ReviewedDecision:model('decisions','id case_scope_ref decision_type record_status package_ref event_ref demo_role_ref input_revisions'),
 QACheck:model('qaChecks','qa_check_id case_scope_ref check_type requirement_refs evidence_use_refs condition_refs check_status finding_refs reviewed_by_ref reviewed_at revision',{qa_check_id:'id'},'ROLE-QA'),
 Remediation:model('workItems','remediation_id source_check_ref affected_object_refs reason_code required_action owner_role_ref status resolution_refs re_review_required revision',{remediation_id:'id'},'ROLE-KYCOPS'),
 ClearancePrerequisite:model('clearancePrerequisites','prerequisite_id case_scope_ref prerequisite_type applicability condition_refs dependency_refs status blocking_reason_refs owner_role_ref last_evaluated_at',{prerequisite_id:'id'}),
 ReadinessSnapshot:model('readinessSnapshots','readiness_snapshot_id case_scope_ref scope_revision decision_scope evaluated_at prerequisite_snapshot_refs blocking_condition_refs unknown_condition_refs readiness_state basis_refs supersedes_ref',{readiness_snapshot_id:'id'}),
 ClearanceDecision:model('clearanceDecisions','clearance_decision_id readiness_snapshot_ref case_scope_ref decision decision_scope confirmed_by_ref authority_ref confirmed_at rationale revision',{clearance_decision_id:'id'},'ROLE-CLEARANCE-REVIEWER'),
 PublicationEvent:model('publicationEvents','publication_event_id clearance_decision_ref published_scope target_system_refs publication_status published_at failure_refs',{publication_event_id:'id'}),
 DependencyEdge:model('dependencies','dependency_id from_object_ref from_revision to_object_ref to_revision dependency_type impact_scope status source_aliases validation_status',{dependency_id:'id'}),
 EvidenceUseAssessment:model('evidenceUseAssessments','id evidence_id evidence_revision evidence_record_revision subject_id purpose_code sufficiency basis_refs assessed_by_ref revision',{},'ROLE-KYCOPS')
};
const include=(name,x)=>x.source_refs?.includes('SRC-020')&&(name!=='Remediation'||x.work_type==='qa_remediation');
export const literalOracle={source_ref:'SRC-020:13',status:'independently_authored_literal_expectations',expected:{
 'E-entry':{readiness:'NOT_READY',qa:'not_final',publication:'not_requested',scope_revision:3},
 'E-gap':{readiness:'NOT_READY',qa:'gap_open',remediation:'open'},
 'E-remediation-completed':{readiness:'NOT_READY',qa:'re_review_required',remediation:'completed'},
 'E-qa-signed-alone':{readiness:'NOT_READY',qa:'signed_off'},
 'E-ready':{readiness:'READY_FOR_AUTHORISED_CONFIRMATION',qa:'signed_off',prerequisites:['satisfied','satisfied','satisfied'],edd:'not_required',publication:'not_requested'},
 'E-cleared':{readiness:'CLEARED_TO_TRADE',publication:'not_requested'},
 'E-publication-failed':{readiness:'CLEARED_TO_TRADE',publication:'failed'},
 'E-published':{readiness:'CLEARED_TO_TRADE',publication:'succeeded'},
 'E-evidence-changed':{readiness:'NOT_READY',qa:'re_review_required'},
 'E-scope-changed':{readiness:'NOT_READY',scope_revision:4}},
 boundaries:{bank_booking_ref:null,bank_policy_ref:null,bank_authority_ref:null,trade_execution:'NOT_PART_OF_PROTOTYPE',population_members:5,required_runs:4,raw_C_unresolved_decision_retained:true,changed_screening_result_is_ready:false,changed_executed_document_is_ready:false,additional_unknown_dependency_is_ready:false,changed_decision_scope_is_current:false,save_draft_can_launder_changed_inputs:false,remediation_does_not_sign_qa:true,publication_does_not_change_clearance_decision:true},
 red_team:Array.from({length:20},(_,i)=>({id:`RT-E${String(i+1).padStart(2,'0')}`,state_test_file:'prototype/tests/clearance-engine.test.mjs',ui_status:i>=17?'NOT_RUN_TASK_2':'not_applicable'}))};
export function validateCandidate(s){const errors=[];
 for(const [name,m]of Object.entries(models)){
  if(!Array.isArray(s[m.collection])){errors.push(`${m.collection}: array required`);continue;}
  for(const x of s[m.collection].filter(x=>include(name,x))){for(const field of [...m.fields,...(name==='ReviewedDecision'?decisionBindingFields[x.decision_type]||[]:[])]){const physical=m.aliases[field]||field;if(!Object.hasOwn(x,physical))errors.push(`${name}:${x.id}.${physical}: required`);}
   if(x.case_id!=='DEMO-CTT-001'||x.case_scope_id!=='DEMO-CTT-001/scope/institutional')errors.push(`${x.id}: case/scope mismatch`);
   if(!Number.isSafeInteger(x.revision)||x.revision<1)errors.push(`${x.id}: invalid revision`);
   if(x.bank_authority_ref!==undefined&&x.bank_authority_ref!==null)errors.push(`${x.id}: bank authority must stay null`);
  }
 }
 return {status,valid:errors.length===0,errors};
}
export function buildArtifacts(){
 const d=JSON.parse(readFileSync(new URL('../batch-d/specialist-snapshots.json',here),'utf8')).snapshots['D-entry'];
 const snapshots={},actions=[];let s=createBatchE(d);snapshots['E-entry']=s;
 const perform=(type,extra={})=>{const p=clearanceProjection(s,{role:'ROLE-QA'}),command={type,role:E_ACTION_ROLES[type][0],caseId:s.case.id,scopeId:s.scopes[0].id,expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:p.inputRevisions,key:`E-CONTRACT-${type}-${s.case.revision}`,rationale:'Review the named E-approved synthetic package for the stated action and current scope',at:'2026-09-08T09:00:00Z',packageRef:E_IDS.package,...extra};s=clearanceAction(s,command);actions.push({adapter:'clearanceAction',command,event_ref:s.auditEvents.at(-1).id});return s;};
 snapshots['E-gap']=perform('open_qa_gap');perform('submit_remediation');snapshots['E-remediation-completed']=perform('complete_remediation');
 perform('qa_rereview');snapshots['E-qa-signed-alone']=perform('qa_signoff');
 for(const type of ['record_demo_context','review_kyc_evidence','resolve_conflicts','confirm_screening_coverage','record_edd_applicability','establish_signatory_authority','execute_legal'])perform(type);
 snapshots['E-ready']=s;
 snapshots['E-cleared']=perform('confirm_clearance',{authorityRef:E_IDS.authority,snapshotFingerprint:clearanceProjection(s,{role:'ROLE-QA'}).readiness.fingerprint});
 snapshots['E-publication-failed']=perform('publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'failed'});
 snapshots['E-published']=perform('publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'succeeded'});
 snapshots['E-evidence-changed']=perform('revise_evidence');s=snapshots['E-published'];snapshots['E-scope-changed']=perform('revise_scope');
 const fields=[];
 for(const [name,m]of Object.entries(models)){const records=Object.values(snapshots).flatMap(x=>x[m.collection]).filter(x=>include(name,x)),keys=new Set([...m.fields,...records.flatMap(Object.keys)]);
  for(const field of keys){const physical=m.aliases[field]||field,values=records.filter(x=>Object.hasOwn(x,physical)).map(x=>x[physical]);
   fields.push({object:name,collection:m.collection,field,physical_field:physical,type:[...new Set(values.map(v=>v===null?'null':Array.isArray(v)?'array':Number.isInteger(v)?'integer':typeof v))].join('|'),nullable:values.includes(null),required:m.fields.includes(field),owner_role_ref:m.owner,provenance:'SRC-020 §7; authored synthetic E review events',source_refs:['SRC-020:7'],revision_behavior:'Append version; never mutate historical decisions/evidence/snapshots. Current clearanceConditions cache uses conditionHistory.',ui_mapping:['QACheck','Remediation','EvidenceUseAssessment'].includes(name)?'qa-remediation':'clearance',visibility:name==='ClearanceDecision'?'Internal rationale; RM/client safe summary only':'Allowlisted projection; raw records internal',definition:`${name} ${field.replaceAll('_',' ')}`,example:values.find(v=>v!==null)??null});
  }
 }
 const schema={$schema:'https://json-schema.org/draft/2020-12/schema',title:'Batch E additive candidate v0.1',status,type:'object',required:[...new Set(Object.values(models).map(m=>m.collection))],additionalProperties:true,properties:Object.fromEntries(Object.entries(models).map(([name,m])=>[m.collection,{type:'array',items:{type:'object',if:{required:['source_refs',...(name==='Remediation'?['work_type']:[])],properties:{source_refs:{contains:{const:'SRC-020'}},...(name==='Remediation'?{work_type:{const:'qa_remediation'}}:{})}},then:{required:[...new Set(['id','case_id','case_scope_id','revision',...m.fields.map(f=>m.aliases[f]||f)])],...(name==='ReviewedDecision'?{allOf:Object.entries(decisionBindingFields).map(([type,required])=>({if:{required:['decision_type'],properties:{decision_type:{const:type}}},then:{required}}))}:{}),properties:{id:{type:'string'},case_id:{const:'DEMO-CTT-001'},case_scope_id:{const:'DEMO-CTT-001/scope/institutional'},revision:{type:'integer',minimum:1},bank_authority_ref:{type:'null'}},additionalProperties:true}}}]))};
 const actionContract={source_ref:'SRC-020',status,api:{createBatchE:'Explicit additive D-entry continuation; returns input unchanged on valid E re-entry',clearanceProjection:'Single safe projection for role; unavailable or malformed context is NOT_READY',clearanceLenses:'outcome/work/assurance clones of same projection, readOnly=true',clearanceAction:'Returns new immutable state; same identical command key replays input; errors throw Error with stable .code'},
  review_provenance:{event:'Existing auditEvents gain output_bindings: [{id, revision, fingerprint}]. Expected configured human actor, action, current case/scope and matching scope alias, named synthetic package, referenced output and reviewed version are required; bank_authority_ref remains null.',assessments:'Sufficient E purpose assessments gain review_event_ref; configured KYC assessor and existing purpose permission are required. Signatory assessment uses ROLE-LEGAL and the establishment event.',qa:'QA rereview_ref/rereview_revision retain the exact passed review version; signed QA also requires its bound signoff event and ROLE-QA reviewer.',edd:'Independent EDD applicability requires its scoped decision_ref event, ROLE-FINCRIME and SYNTHETIC-E-EDD-REVIEW-v1 permission.',legacy:'No automatic migration or provenance fabrication. Existing unbound E sessions remain readable but NOT_READY/current review required. Use explicit reviewed archive/load entry for a fresh authored path; historical records are retained.'},
  reviewed_input_integrity:{screening:'Coverage review binds exact current run/result/subject/finding records, identities, categories, result dispositions and content fingerprints; changed/new inputs require review',legal:'Execution decision binds current document revision/evidence/content revision, content fingerprint, purpose and released intake plus the executed agreement',dependencies:'All current additional applicable edges are checked; eight exact historical legacy/D contribution records have source-qualified exclusions; changed or copied records do not inherit exclusion',clearance_scope:'Decision and referenced ready snapshot must match current entity/product/scope revision and configured authority. Publication consumes only validated current decision'},
  host_guard:'Use clearanceAction exclusively in E sessions. Do not invoke legacy A/B/C/D writers, candidate_ready, or infer readiness in UI. Navigation/story/printing/Lab call projections only.',
  required_fields:['type','role','caseId','scopeId','expectedRevision','expectedScopeRevision','expectedInputRevisions','key','rationale','at'],package_action_field:{packageRef:E_IDS.package},
  supported_writers:Object.keys(E_ACTION_ROLES),action_roles:E_ACTION_ROLES,actions:Object.fromEntries(Object.entries(E_ACTION_ROLES).map(([type,roles])=>[type,{roles,extra_fields:type==='confirm_clearance'?['authorityRef','snapshotFingerprint']:type==='publish_outcome'?['targetSystemRefs','outcome']:type==='save_draft'?['draftAction','draftRationale']:['packageRef']} ])),
  confirm:{authorityRef:E_IDS.authority,role:'ROLE-CLEARANCE-REVIEWER',role_label:'Authorised Clearance Reviewer',snapshotFingerprint:'projection.readiness.fingerprint; must also match latest READY snapshot',bank_authority:'TO_VALIDATE'},
  publication:{permitted_target_refs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcomes:['succeeded','failed'],failure_preserves_decision:true,trade_execution:'NOT_PART_OF_PROTOTYPE'},
  draft:{store:'workItems, work_type=e_action_draft, one versioned logical id per role',projection:'projection.draft',draftAction:'An action configured for the saving role; save_draft itself forbidden',draftRationale:'String, 0..2000 characters',effects:'New draft and audit/readiness snapshot only. No condition, dependency, submission, confirmation or publication changes. Not included in business fingerprint.'},
  prerequisites:'Nonempty literal expected requirements, source-qualified expected dependencies, actual purpose/current evidence, scope, coverage, EDD and specialist outputs. Unknown fails closed.',
  source_alias_chain:E_ALIAS_CHAIN,history:'Versioned records append in existing stores; conditions retain before-images in conditionHistory. Original B/C decisions and findings remain intact.',
  ui_state_portions:'RT18–20 core reads verified by native suite; browser/UI portions NOT_RUN until Task 2',
  availability:'projection.actionEligibility[type] gives allowed and reasons; permissions are checked again by writer, never inferred from enabled UI',
  projection_fields:['available','caseId','scopeId','revision','scopeRevision','scope','conditions','prerequisites','readiness','qa','clearance','publication','draft','snapshot_ref','activity','inputRevisions','actionEligibility','bank_authority_status','trade_execution']};
 const validations=Object.entries(snapshots).map(([name,state])=>{const base=validateCandidate(state),expected=literalOracle.expected[name],p=clearanceProjection(state,{role:'ROLE-QA'}),errors=[...base.errors];
  if(p.readiness.readiness_state!==expected.readiness)errors.push(`literal readiness expected ${expected.readiness}, got ${p.readiness.readiness_state}`);
  if(expected.qa&&p.qa.check.check_status!==expected.qa)errors.push('literal QA mismatch');if(expected.remediation&&p.qa.remediation?.status!==expected.remediation)errors.push('literal remediation mismatch');
  if(expected.publication&&p.publication.status!==expected.publication)errors.push('literal publication mismatch');if(expected.scope_revision&&p.scopeRevision!==expected.scope_revision)errors.push('literal scope mismatch');
  if(expected.prerequisites&&JSON.stringify(p.prerequisites.map(x=>x.status))!==JSON.stringify(expected.prerequisites))errors.push('literal prerequisites mismatch');
  return {snapshot:name,valid:errors.length===0,errors};});
 return {snapshots,actions,fields,schema,actionContract,oracle:literalOracle,package:E_APPROVED_PACKAGE,
  crosswalk:{source_ref:'SRC-020',object_aliases:E_ALIAS_CHAIN,historical_dependency_exclusions:snapshots['E-ready'].demoConfig.batchE.historical_dependency_exclusions,dependencies:snapshots['E-ready'].dependencies.filter(x=>x.source_refs.includes('SRC-020')),upstream:'SRC-009:DEP-07 Credit→Legal is not SRC-010:DEP-07 Screening→Review',derived_prerequisites:'clearancePrerequisites are evaluated snapshots, not a second truth store; clearanceConditions remain canonical conditions'},
  validation:{status,valid:validations.every(x=>x.valid),snapshots:validations},contract:{status,source_ref:'SRC-020',models:Object.fromEntries(Object.entries(models).map(([k,v])=>[k,v.collection])),bank_policy_ref:null,bank_authority_ref:null,physical_aliases:'logical *_id fields map to existing physical id'}};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const a=buildArtifacts();if(!a.validation.valid)throw Error(JSON.stringify(a.validation));
 // Same justified mechanical generation as batch-d/build-contract.mjs; source edits use apply_patch.
 for(const [name,value]of Object.entries({'clearance-snapshots.json':{source_ref:'SRC-020',snapshots:a.snapshots,actions:a.actions},'field-dictionary.json':a.fields,'candidate-schema.json':a.schema,'literal-oracle.json':a.oracle,'source-alias-crosswalk.json':a.crosswalk,'action-contract.json':a.actionContract,'approved-synthetic-package.json':a.package,'clearance-contract.json':a.contract,'validation.json':a.validation}))writeFileSync(new URL(name,here),JSON.stringify(value,null,2)+'\n');
 console.log(JSON.stringify({valid:a.validation.valid,snapshots:Object.keys(a.snapshots).length,fields:a.fields.length,actions:a.actions.length}));
}
