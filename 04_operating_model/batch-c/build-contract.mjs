/** Additive, reviewable synthetic contract. No production or combined A/B schema claim. */
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createBatchC,screeningAction,screeningProjection,C_IDS} from '../../prototype/screening-engine.mjs';
import {collaborationAction,COLLAB_IDS} from '../../prototype/collaboration-engine.mjs';
import {screeningRuleIds,screeningActionPredicates} from '../../prototype/screening-predicates.mjs';

const here=new URL('./',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,here),'utf8'));
const status='additive_candidate_not_production_merged_schema';
const mappings={
  screeningPopulations:'ScreeningPopulation',screeningMemberships:'ScreeningMembership',screeningRuns:'ScreeningRun',
  runSubjectSnapshots:'RunSubjectSnapshot',screeningQueryPlans:'ScreeningQueryPlan',screeningResultSnapshots:'ScreeningResultSnapshot',
  screeningCoverageItems:'ScreeningCoverageItem',providerRecordSnapshots:'ProviderRecordSnapshot',screeningFindings:'ScreeningFinding',
  attributeComparisons:'AttributeComparison',screeningReviewDecisions:'ScreeningReviewDecision',screeningReviewDrafts:'ScreeningReviewDraft',
  eddApplicabilityAssessments:'EDDApplicabilityAssessment',eddAssessments:'EDDAssessment',holds:'Hold',
  evidenceUseAssessments:'EvidenceUseAssessment',workItems:'WorkItem / BranchInstance',informationRequests:'InformationRequest',
  requestItems:'RequestItem',requestRecipients:'RequestRecipient',submissions:'Submission',evidence:'EvidenceArtifact',
  accessGrants:'AccessGrant',auditEvents:'AuditEvent'
};
const enums={
  inventory_status:['incomplete','complete_for_scope','unknown'],population_review_status:['draft','in_review','confirmed','superseded'],
  membership_decision:['included','excluded','unresolved'],query_input_status:['ready','insufficient','conflicted','unknown'],
  run_kind:['preliminary','comprehensive'],run_status:['not_started','pending','completed','partial','failed','cancelled'],
  data_version_status:['known','unknown'],applicability:['required','not_required','unknown'],
  sufficiency:['not_assessed','sufficient','insufficient','unknown'],execution_status:['pending','complete','partial','failed','not_required'],
  currency_status:['current','needs_review','unknown','superseded'],outcome_status:['unresolved','no_unresolved_findings_for_scope','concern_escalated','unknown'],
  record_completeness:['partial','complete_as_supplied','unknown'],triage_status:['new','prepared','assigned','awaiting_information','under_review','referred','resolved'],
  comparison_result:['similar','different','inconclusive','not_comparable'],reviewer_status:['unreviewed','reviewed','disputed'],
  disposition:['not_same_party_for_inputs','unresolved','refer_specialist'],decision_status:['draft','awaiting_authorisation','recorded','superseded'],
  branch_type:['information_gap','referral','conditional_edd']
};
const required={
  screeningPopulations:['population_revision','scope_revision','membership_refs','inventory_status','inventory_gap_refs','population_review_status','policy_profile_ref','completeness_basis_refs','confirmed_by_ref','confirmation_permission_ref','confirmed_at'],
  screeningMemberships:['party_ref','party_revision','screening_category','membership_decision','criterion_ref','basis_refs','query_input_status'],
  screeningRuns:['run_kind','population_ref','population_revision','subject_snapshot_refs','category_scope','query_plan_ref','query_plan_revision','run_status','result_count','data_version_status','input_fingerprint'],
  runSubjectSnapshots:['party_ref','party_revision','name_claims','attribute_claim_refs','provenance_refs','permitted_query_scope_refs'],
  screeningQueryPlans:['population_ref','population_revision','subject_refs','query_scope_ref','input_fingerprint'],
  screeningResultSnapshots:['run_ref','result_count','result_status','historical','provider_snapshot_refs'],
  screeningCoverageItems:['population_ref','population_revision','subject_ref','subject_revision','category','query_scope_ref','applicability','supporting_run_refs'],
  providerRecordSnapshots:['provider_record_ref','category','identifier_claim_refs','record_completeness','claims'],
  screeningFindings:['subject_ref','run_ref','subject_snapshot_ref','provider_snapshot_ref','triage_status','comparison_refs','decision_ref'],
  attributeComparisons:['attribute_code','subject_claim_refs','provider_claim_refs','subject_value','provider_value','comparison_result','comparison_basis','reviewer_status'],
  screeningReviewDecisions:['finding_ref','decision_type','disposition','decision_status','rationale','scope_revision','population_revision','subject_revision','provider_revision','permission_basis_ref','expected_input_revision_refs'],
  screeningReviewDrafts:['finding_ref','text','actor_ref','expected_input_revision_refs'],
  eddApplicabilityAssessments:['scope_revision','trigger_reason_refs','policy_basis_ref','applicability','review_status','permission_ref','owner_ref','question_ref'],
  eddAssessments:['applicability_ref','risk_question_refs','evidence_pack_revision','open_issue_refs','measures','condition_refs','approval_refs','approval_status','status'],
  holds:['object_scope_refs','action_scope','basis_ref','status','release_condition_ref','release_decision_ref']
};
// Literal expected outcomes copied from Final semantics; never calculated from the implementation being checked.
export const literalOracle={
  source_ref:'SRC-016',status:'independent_literal_demo_expectations',
  expected:{entry:{inventory_status:'incomplete',identity_artifact_count:0,c_finding_count:0,edd_applicability:'unknown'},
    query_failed:{run_status:'failed',result_count:null,coverage_status:'incomplete'},
    query_zero:{run_status:'completed',result_count:0,coverage_status:'incomplete'},
    query_partial:{run_status:'partial',result_count:1,coverage_status:'incomplete'},
    identity_received:{alias:'EV-ID-C01',intake_security_status:'received',sufficiency:'not_assessed'},
    unresolved:{disposition:'unresolved',review_status:'unresolved',inventory_status:'incomplete',edd_applicability:'unknown',readiness:'not_ready'},
    referred:{disposition:'refer_specialist',owner_ref:'Unassigned',finding_resolved:false},
    b_isolation:{original_items_overwritten:false,original_grants_expanded:false},
    permission_unknown:{action_allowed:false},scope_stale:{record_allowed:false},empty_coverage:{complete:false}},
  exclusion_positive:{status:'not_run_disabled_pending_fixture_review',reason:'No reviewed identity exclusion package or independent sufficiency oracle supplied'},
  comprehensive_positive:{status:'not_run_interface_not_configured',reason:'No source-linked upstream inventory confirmation event supplied'},
  edd_approval_positive:{status:'not_run_interface_not_configured',reason:'No reviewed EDD approval contract supplied'}
};

export function validateCandidate(s) {
  const errors=[];
  for(const [collection,fields] of Object.entries(required)) {
    if(!Array.isArray(s[collection])) { errors.push(`${collection}: expected array`); continue; }
    for(const item of s[collection].filter(x=>x.source_refs?.includes('SRC-016'))) {
      for(const field of ['id','case_id','case_scope_id','revision',...fields])if(!Object.hasOwn(item,field))errors.push(`${item.id}.${field}: required`);
      if(!Number.isSafeInteger(item.revision)||item.revision<1)errors.push(`${item.id}.revision: positive integer required`);
      if(item.case_id!==s.case.id||item.case_scope_id!==s.scopes[0].id)errors.push(`${item.id}: case/scope mismatch`);
      for(const [field,values] of Object.entries(enums))if(Object.hasOwn(item,field)&&!values.includes(item[field]))errors.push(`${item.id}.${field}: invalid enum`);
    }
  }
  const parties=new Set([...s.entities,...s.naturalPersons].map(x=>x.id));
  const runIds=new Set(s.screeningRuns.map(x=>x.id)),providerIds=new Set(s.providerRecordSnapshots.map(x=>x.id));
  for(const run of s.screeningRuns) {
    if(run.result_count!==null&&(!Number.isInteger(run.result_count)||run.result_count<0))errors.push(`${run.id}: invalid result count`);
    if(run.run_status==='failed'&&run.result_count!==null)errors.push(`${run.id}: failure cannot be zero success`);
    if(!s.screeningQueryPlans.some(x=>x.id===run.query_plan_ref))errors.push(`${run.id}: missing plan`);
  }
  for(const finding of s.screeningFindings.filter(x=>x.source_refs?.includes('SRC-016'))) {
    if(!parties.has(finding.subject_ref)||!runIds.has(finding.run_ref)||!providerIds.has(finding.provider_snapshot_ref))errors.push(`${finding.id}: invalid subject/run/provider binding`);
  }
  if(s.demoConfig.batchC.exclusion_status!=='disabled_pending_fixture_review')errors.push('Shipped exclusion profile must remain disabled');
  return {status,valid:errors.length===0,errors};
}

function fieldDictionary(snapshots) {
  const fields=[];
  for(const [collection,object] of Object.entries(mappings)) {
    const records=Object.values(snapshots).flatMap(s=>s[collection]||[]).filter(x=>x.source_refs?.includes('SRC-016'));
    const fieldNames=new Set([...records.flatMap(Object.keys),...(required[collection]||[])]);
    for(const field of [...fieldNames].sort()) {
      const values=records.filter(x=>Object.hasOwn(x,field)).map(x=>x[field]);
      const example=values.find(x=>x!==null)??null;
      const types=[...new Set(values.map(x=>x===null?'null':Array.isArray(x)?'array':Number.isInteger(x)?'integer':typeof x))];
      const reference=field.endsWith('_ref')||field.endsWith('_refs')||field.endsWith('_id');
      const nullable=values.includes(null)||!values.length;
      const immutable=['runSubjectSnapshots','providerRecordSnapshots','screeningResultSnapshots','screeningReviewDecisions','submissions','auditEvents'].includes(collection);
      fields.push({object,collection,field,definition:field==='result_count'?'Number actually returned by the named synthetic outcome; null for unknown or failure':
        field==='sufficiency'?'Purpose-specific evidence-use conclusion; receipt and intake release do not establish sufficiency':
        field==='applicability'?'Independent three-value applicability conclusion for the referenced scope':
        field==='revision'?'Record version used for action-time compare-and-swap':`${object}: ${field.replaceAll('_',' ')} for this scoped synthetic record`,
        type_format:types.length?types.join('|'):reference?'reference|null':'logical field; nullable until corresponding event',
        enum:enums[field]||null,nullable,required_when:(required[collection]||[]).includes(field)?`Every ${object} record in this candidate collection`:'Only when created by the corresponding named lifecycle action',
        origin_provenance:'SRC-016 §§10/19; synthetic implementation interpretation, not bank policy',
        editable_by:immutable?'Engine appends immutable snapshot after authorised event':'Configured demo actor through named guarded action; no direct status toggle',
        authority_basis:field.includes('permission')||field.includes('authoris')||field.includes('decision')?'Explicit role/action/case scope demo permission; bank authority remains unconfirmed':'Applicable action permission; no business authority inferred',
        revision_behavior:immutable?'Append new record; prior record retained':'Increment object revision; all actions compare current case/scope/input versions',
        dependencies:reference?[`Referenced ${field} record/version must exist or have explicit synthetic-policy origin`]:['Current case/scope','Applicable permission','Scoped hold policy'],
        ui_binding:collection.includes('edd')?'SCN-EDD / applicability and scoped pack':collection.includes('Population')||collection.includes('Membership')||collection.includes('Coverage')?'SCN-POPULATION':'SCN-MATCH / review, evidence or activity',
        visibility_sensitivity:['client_reason','client_summary'].includes(field)?'Reviewed client-safe only within assigned request projection':'Internal synthetic-restricted; excluded from client/RM unless separately allowlisted',
        localisation_labels:{'en-AU':field.replaceAll('_',' '),'en-US':field.replaceAll('_',' '),'zh-CN':`合成字段：${field}`},
        synthetic_example:example,example_status:values.length?'Observed synthetic event fixture':'Interface only; no shipped event supplies a value'});
    }
  }
  return fields;
}

export function buildArtifacts() {
  const upstream=read('../batch-b/collaboration-snapshots.json').snapshots['B-coordination-assessed'];
  let s=createBatchC(upstream);
  const snapshots={'C-entry':structuredClone(s)},actions=[];
  function c(type,extra={}) {
    const command={type,role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,
      expectedInputRevisions:screeningProjection(s,{role:'ROLE-KYCOPS'}).inputRevisions,key:`C-CONTRACT:${type}:${s.case.revision}`,
      rationale:'Synthetic identity context remains unresolved for the current review',at:'2026-09-07T11:00:00Z',...extra};
    s=screeningAction(s,command); actions.push({adapter:'screeningAction',command});
  }
  function b(type,extra={}) {
    const request=s.informationRequests.find(x=>x.id===C_IDS.request),item=s.requestItems.find(x=>x.id===C_IDS.identityItem);
    const command={type,role:'ROLE-KYCOPS',requestId:request.id,itemId:item.id,expectedRevision:s.case.revision,
      expectedRequestRevision:request.revision,expectedItemRevision:item.revision,key:`C-COLLAB:${type}:${s.case.revision}`,
      rationale:'Synthetic identity response limited to the current task',now:'2026-09-07T11:00:00Z',...extra};
    s=collaborationAction(s,command);actions.push({adapter:'collaborationAction',command});
  }
  c('prepare_preliminary');c('request_preliminary');snapshots['C-pending']=structuredClone(s);
  c('receive_result',{runId:s.screeningRuns[0].id,outcome:'completed'});snapshots['C-result']=structuredClone(s);
  c('save_review_draft',{text:'Identity remains unresolved. Request targeted information and specialist review.'});
  c('request_identity',{gap:'Identity context for Person T is not established by current role/coordination evidence'});
  snapshots['C-gap']=structuredClone(s);
  b('save_request',{text:s.demoConfig.batchC.collaboration.client_text});b('review_request');b('dispatch',{channel:'identity_secure_task'});
  b('start_session',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'SESSION-C-CONTRACT',reference:'CTT-DEMO-ID-C01'});
  b('submit_response',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'SESSION-C-CONTRACT',text:'Synthetic identity context supplied for review; independent verification remains unknown.'});
  snapshots['C-identity-received']=structuredClone(s);
  const artifact=s.evidence.at(-1);
  b('release_artifact',{reference:artifact.id,intakeStatus:'released'});b('link_evidence',{reference:artifact.id});
  c('assess_identity',{evidenceId:artifact.id,sufficiency:'insufficient'});
  c('resume_branch',{branchId:s.workItems.find(x=>x.branch_type==='information_gap').id});
  c('record_unresolved',{role:'ROLE-REVIEWER'});snapshots['C-unresolved']=structuredClone(s);
  c('refer',{urgent:true,rationale:'Unresolved identity and concern require specialist review; destination not configured'});
  c('reassess_coverage');snapshots['C-referred']=structuredClone(s);
  const fields=fieldDictionary(snapshots),validations=Object.entries(snapshots).map(([name,value])=>({snapshot:name,...validateCandidate(value)}));
  const schema={$schema:'https://json-schema.org/draft/2020-12/schema',title:'Batch C additive candidate collections',status,type:'object',additionalProperties:true,
    required:Object.keys(required),properties:Object.fromEntries(Object.entries(required).map(([collection,keys])=>[collection,{type:'array',items:{type:'object',
      if:{required:['source_refs'],properties:{source_refs:{type:'array',contains:{const:'SRC-016'}}}},
      then:{required:['id','case_id','case_scope_id','revision',...keys],additionalProperties:true,
        properties:{id:{type:'string'},case_id:{const:'DEMO-CTT-001'},revision:{type:'integer',minimum:1},...Object.fromEntries(keys.filter(key=>enums[key]).map(key=>[key,{enum:enums[key]}]))}}}}]))};
  return {snapshots,actions,fields,schema,oracle:literalOracle,validation:{status,valid:validations.every(x=>x.valid),snapshots:validations},
    contract:{status,source_ref:'SRC-016',collections:mappings,rule_ids:screeningRuleIds,action_predicates:screeningActionPredicates,
      entry_fixture:'Explicit authored B-coordination-assessed snapshot; createBatchC in the host consumes actual current B state',
      limitations:['No production schema certification','No reviewed exclusion fixture','No comprehensive inventory confirmation adapter','No EDD approval writer']},
    aliases:{source_ref:'SRC-016',aliases:{'EV-ID-C01':artifact.id,'Person T':C_IDS.personT,'SYN-PROVIDER-RECORD-C01':s.providerRecordSnapshots[0].id},
      preserved:{'EV-A05':upstream.evidence.find(x=>x.alias==='EV-A05')?.id,'B request':COLLAB_IDS.request,'Entity A legacy finding':'DEMO-CTT-001/finding/possible-match'},
      semantic_qualification:{'SRC-009:DEP-08':'Split to SRC-010:DEP-07 screening review and SRC-010:DEP-08 independent EDD','SRC-009:DEP-07':'Credit→Legal, not SRC-010:DEP-07 screening'}}};
}

if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const artifacts=buildArtifacts();
  if(!artifacts.validation.valid)throw Error(JSON.stringify(artifacts.validation));
  const output=(name,value)=>writeFileSync(new URL(name,here),JSON.stringify(value,null,2)+'\n');
  output('screening-snapshots.json',{source_ref:'SRC-016',snapshots:artifacts.snapshots,actions:artifacts.actions});
  output('field-dictionary.json',artifacts.fields);output('candidate-schema.json',artifacts.schema);
  output('screening-contract.json',artifacts.contract);output('literal-oracle.json',artifacts.oracle);
  output('validation.json',artifacts.validation);output('source-alias-crosswalk.json',artifacts.aliases);
  output('action-contract.json',{source_ref:'SRC-016',actions:screeningActionPredicates,rules:screeningRuleIds,
    command_fields:['type','role','expectedRevision','expectedScopeRevision','expectedInputRevisions','key','rationale'],
    error_contract:'Error.code is a stable locale key; input and saved draft remain unchanged on failure'});
  console.log(JSON.stringify({valid:true,snapshots:Object.keys(artifacts.snapshots).length,fields:artifacts.fields.length,
    actions:artifacts.actions.length,snapshot_sha256:createHash('sha256').update(JSON.stringify(artifacts.snapshots)).digest('hex')}));
}
