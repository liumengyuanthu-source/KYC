import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBatchB} from '../collaboration-engine.mjs';

const module = await import('../screening-engine.mjs').catch(() => ({}));
const snapshots = JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/batch-a-story-snapshots.json', import.meta.url)));
const base = () => createBatchB(snapshots.snapshots['SNAP-A3']);

test('RT-C01/03/04/66: additive C entry preserves B and has no identity evidence or C finding', () => {
  assert.equal(typeof module.createBatchC, 'function', 'Batch C additive entry must exist');
  const input = base(), original = structuredClone(input), s = module.createBatchC(input);
  assert.deepEqual(input, original);
  for (const key of ['requestItems','accessGrants','authorities','screeningFindings','scopes','evidence','clearanceConditions']) assert.deepEqual(s[key], input[key]);
  assert.equal(s.screeningPopulations[0].inventory_status, 'incomplete');
  assert.equal(s.screeningMemberships.find(x => x.party_ref.endsWith('/entity/entity-b')).membership_decision, 'unresolved');
  assert.equal(s.evidence.some(x => x.alias === 'EV-ID-C01'), false);
  assert.equal(s.demoConfig.batchC.exclusion_status, 'disabled_pending_fixture_review');
  assert.equal(module.createBatchC(s), s);
  assert.throws(() => module.createBatchC(snapshots.snapshots['SNAP-A3']), e => e.code === 'B_CONTEXT_REQUIRED');
});

const seed = () => module.createBatchC(base());
function action(s, type, extra = {}) {
  assert.equal(typeof module.screeningAction, 'function', 'Guarded screening actions must exist');
  return module.screeningAction(s, {type, role:'ROLE-KYCOPS', expectedRevision:s.case.revision,
    expectedScopeRevision:s.scopes[0].revision, expectedInputRevisions:module.screeningProjection(s,{role:'ROLE-KYCOPS'}).inputRevisions,
    key:`C:${type}:${s.case.revision}`, rationale:'Reviewed synthetic input context', at:'2026-09-07T11:01:00Z', ...extra});
}
const requested = () => action(action(seed(),'prepare_preliminary'),'request_preliminary');
const result = (outcome='completed') => { const s=requested(); return action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome}); };
const errorCode = code => error => error.code === code;

test('RT-C37/38: partial entry permits defined preliminary only, comprehensive requires confirmed inventory', () => {
  const s=requested(), run=s.screeningRuns[0];
  assert.equal(run.run_kind,'preliminary'); assert.equal(run.run_status,'pending'); assert.equal(run.result_count,null);
  assert.equal(s.screeningPopulations[0].inventory_status,'incomplete');
  assert.equal(s.runSubjectSnapshots[0].party_ref,'DEMO-CTT-001/person/person-t');
  assert.throws(()=>action(s,'request_comprehensive'),errorCode('POPULATION_NOT_CONFIRMED'));
  const unknown=seed(); unknown.demoConfig.batchC.query_permission_ref=null;
  assert.throws(()=>action(unknown,'prepare_preliminary'),errorCode('QUERY_CONFIGURATION_REQUIRED'));
});

test('RT-C02/05/06/20/26: named zero, failure, partial and unknown dataset never imply complete coverage', () => {
  for (const [outcome,status,count] of [['zero','completed',0],['failed','failed',null],['partial','partial',1],['pending','pending',null]]) {
    const s=result(outcome), p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
    assert.equal(s.screeningRuns[0].run_status,status); assert.equal(s.screeningRuns[0].result_count,count);
    assert.equal(p.coverageSummary.status,'incomplete'); assert.equal(p.readiness.result,'not_ready');
  }
  let s=seed(); s.demoConfig.batchC.dataset={ref:null,version_status:'unknown',as_of:null};
  s=action(action(s,'prepare_preliminary'),'request_preliminary');
  s=action(s,'receive_result',{runId:s.screeningRuns[0].id,outcome:'zero'});
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).coverage[0].currency_status,'unknown');
  s.screeningCoverageItems=[];
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).coverageSummary.status,'incomplete');
});

test('RT-C07/08/09/34: possible match uses Person T immutable snapshots and honest comparison', () => {
  const s=result(), p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.finding.id,'DEMO-CTT-001/finding/person-t-c01');
  assert.equal(p.finding.subject_ref,'DEMO-CTT-001/person/person-t');
  assert.equal(s.screeningFindings.find(x=>x.id.endsWith('/finding/possible-match')).subject_id,'DEMO-CTT-001/entity/harbour');
  assert.equal(p.comparisons.find(x=>x.attribute_code==='name').comparison_result,'similar');
  const dob=p.comparisons.find(x=>x.attribute_code==='date_of_birth');
  assert.equal(dob.comparison_result,'inconclusive'); assert.deepEqual(dob.provider_value,[{value:'1970',precision:'year'},{value:'1971',precision:'year'}]);
  assert.equal(s.providerRecordSnapshots[0].provider_record_ref,'SYN-PROVIDER-RECORD-C01');
  assert.deepEqual(s.providerRecordSnapshots[0].alias_refs,['SYN-PROVIDER-RECORD-C01:primary','SYN-PROVIDER-RECORD-C01:alias']);
  assert.equal(s.screeningFindings.filter(x=>x.source_refs?.includes('SRC-016')).length,1);
  assert.equal(p.finding.decision_ref,null);
});

test('RT-C14/15/16/17/66: permissions, rationale, stale inputs and idempotency protect writes', () => {
  let s=result();
  assert.throws(()=>action(s,'record_unresolved'),errorCode('PERMISSION_REQUIRED'));
  assert.throws(()=>action(s,'record_unresolved',{role:'ROLE-REVIEWER',rationale:''}),errorCode('RATIONALE_REQUIRED'));
  assert.throws(()=>action(s,'record_unresolved',{role:'ROLE-REVIEWER',expectedInputRevisions:{}}),errorCode('INPUT_VERSION_CONFLICT'));
  assert.throws(()=>action(s,'record_disposition',{role:'ROLE-REVIEWER'}),errorCode('EXCLUSION_DISABLED_PENDING_FIXTURE_REVIEW'));
  s=action(s,'save_review_draft',{text:'Keep this exact draft'});
  const saved=structuredClone(s);
  assert.throws(()=>action(s,'record_unresolved',{role:'ROLE-REVIEWER',expectedRevision:s.case.revision-1}),errorCode('CASE_VERSION_CONFLICT'));
  assert.deepEqual(s,saved);
  const key='unique-reviewed-outcome';
  const command={type:'record_unresolved',role:'ROLE-REVIEWER',key,rationale:'Identity remains unresolved',expectedRevision:s.case.revision,
    expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:module.screeningProjection(s,{role:'ROLE-REVIEWER'}).inputRevisions};
  const next=module.screeningAction(s,command);
  assert.equal(module.screeningAction(next,command),next);
  assert.throws(()=>module.screeningAction(next,{...command,rationale:'Changed intent'}),errorCode('IDEMPOTENCY_COLLISION'));
  assert.equal(next.screeningReviewDecisions.at(-1).disposition,'unresolved');
});

test('RT-C19/45: late responses are historical and never replace current run', () => {
  let s=requested(); const old=s.screeningRuns[0].id, oldSnapshot=structuredClone(s.runSubjectSnapshots[0]);
  s=action(s,'request_preliminary'); const current=s.screeningRuns.at(-1).id;
  s=action(s,'receive_result',{runId:current,outcome:'zero'});
  s=action(s,'receive_result',{runId:old,outcome:'completed'});
  const p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.population.latest_run_ref,current); assert.equal(p.finding,null);
  assert.equal(s.screeningResultSnapshots.at(-1).historical,true);
  assert.deepEqual(s.runSubjectSnapshots[0],oldSnapshot);
  assert.equal(s.screeningFindings.filter(x=>x.source_refs?.includes('SRC-016')).length,1);
});

test('RT-C21/23/24/36/41/42/43/65: gaps and urgent referral coexist without manufactured release', () => {
  let s=result(), before=structuredClone(s.clearanceConditions);
  s=action(s,'request_identity',{gap:'Identity context for Person T needed'});
  const first=s.workItems.find(x=>x.branch_type==='information_gap');
  s=action(s,'request_identity',{gap:'Identity context remains missing'});
  assert.equal(s.workItems.find(x=>x.id===first.id).attempt_count,2);
  assert.equal(s.workItems.filter(x=>x.branch_type==='information_gap').length,1);
  s=action(s,'refer',{urgent:true,rationale:'Material concern needs immediate specialist review'});
  const p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.branches.length,2); assert.equal(p.branches.find(x=>x.branch_type==='referral').owner_ref,'Unassigned');
  assert.ok(p.branches.every(x=>x.finding_ref===module.C_IDS.finding&&x.fixed_return_target.finding_ref===module.C_IDS.finding));
  assert.equal(p.finding.triage_status,'referred'); assert.equal(p.edd.applicability,'unknown');
  assert.deepEqual(s.clearanceConditions,before); assert.equal(p.readiness.result,'not_ready');
  s.demoConfig.batchC.holds.push({id:'unknown-case-hold',status:'unknown',action_scope:['resume_branch'],object_scope_refs:[s.case.id]});
  assert.throws(()=>action(s,'resume_branch',{branchId:first.id}),errorCode('HOLD_REQUIRES_REVIEW'));
  assert.equal(module.screeningPredicates(s,{role:'ROLE-KYCOPS',action:'resume_branch',branchId:first.id}).resume.allowed,false);
});

test('RT-C13/47/68: projections are allowlists and lenses share one revision, shadow inject disabled', () => {
  const s=result(), before=structuredClone(s);
  const p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.actions.request_identity.allowed,p.predicates.request.allowed);
  assert.equal(p.actions.record_disposition.allowed,false);
  assert.deepEqual(Object.values(p.lenses).map(x=>x.revision),[s.case.revision,s.case.revision,s.case.revision]);
  for(const role of ['ROLE-RM','ROLE-CLIENT','UNCONFIGURED']) {
    const safe=module.screeningProjection(s,{role});
    assert.equal(JSON.stringify(safe).includes('SYN-PROVIDER'),false);
    assert.equal('comparisons' in safe,false); assert.equal('evidence' in safe,false);
  }
  assert.equal(p.shadowInject.enabled,false); assert.equal(p.shadowInject.mainline_required,false);
  assert.deepEqual(s,before);
});

test('RT-C22/39/40: EDD remains independent; only reviewed current reason can record applicability', () => {
  let s=result();
  assert.throws(()=>action(s,'record_edd_applicability',{role:'ROLE-REVIEWER',applicability:'not_required',reasonRef:'missing'}),errorCode('EDD_REASON_NOT_REVIEWED'));
  const before=structuredClone(s.screeningFindings);
  s.demoConfig.batchC.reviewed_edd_reasons['SYN-EDD-NR']={applicability:'not_required',review_status:'reviewed_for_demo',scope_revision:s.scopes[0].revision,permission_ref:'SYN-EDD-REVIEWER',basis_refs:['SRC-016:7.2']};
  s=action(s,'record_edd_applicability',{role:'ROLE-REVIEWER',applicability:'not_required',reasonRef:'SYN-EDD-NR'});
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).edd.applicability,'not_required');
  assert.deepEqual(s.screeningFindings,before); assert.equal(s.case.publication_status,'not_requested');
  s.scopes[0].revision++;
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).edd.applicability,'unknown');
});

test('RT-C22: required EDD creates bounded linked work and pack with explicit open issues', () => {
  let s=seed();
  s.demoConfig.batchC.reviewed_edd_reasons['SYN-EDD-R']={applicability:'required',review_status:'reviewed_for_demo',scope_revision:s.scopes[0].revision,permission_ref:'SYN-EDD-REVIEWER',basis_refs:['SRC-016:7.2']};
  s=action(s,'record_edd_applicability',{role:'ROLE-REVIEWER',applicability:'required',reasonRef:'SYN-EDD-R'});
  s=action(s,'prepare_edd_pack',{questions:['Explain the reviewed risk context'],issueRefs:['Unresolved context'],evidenceRefs:[]});
  const p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.branches[0].branch_type,'conditional_edd'); assert.equal(p.branches[0].owner_ref,'Unassigned');
  assert.equal(p.eddAssessment.status,'awaiting_evidence'); assert.equal(p.eddAssessment.approval_status,'unknown');
  assert.deepEqual(p.eddAssessment.measures,[]); assert.deepEqual(p.eddAssessment.open_issue_refs,['Unresolved context']);
  assert.equal(p.readiness.result,'not_ready');
});

test('client projection context cannot override its role with an ops audience',()=>{
  const s=action(result(),'request_identity',{gap:'Restricted provider concern detail'});
  const p=module.screeningProjection(s,{role:'ROLE-CLIENT',audience:'ops'});
  assert.equal(JSON.stringify(p).includes('Restricted provider concern detail'),false);
  assert.equal(p.collaboration.allowed,false);
});

test('RT-C16/19/46: subject changes, revoked permission and scope changes block resumed substantive work',()=>{
  let s=action(result(),'refer');
  const branch=s.workItems.find(x=>x.branch_type==='referral');
  s.demoConfig.batchC.permissions['ROLE-KYCOPS']=s.demoConfig.batchC.permissions['ROLE-KYCOPS'].filter(x=>x!=='resume_branch');
  assert.throws(()=>action(s,'resume_branch',{branchId:branch.id}),errorCode('PERMISSION_REQUIRED'));
  s.demoConfig.batchC.permissions['ROLE-KYCOPS'].push('resume_branch');
  s.naturalPersons.find(x=>x.id===module.C_IDS.personT).revision++;
  assert.throws(()=>action(s,'resume_branch',{branchId:branch.id}),errorCode('REVIEW_INPUTS_STALE'));
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).coverage[0].currency_status,'needs_review');
  s=seed(); s.naturalPersons[0].revision=0;
  assert.throws(()=>action(s,'prepare_preliminary'),errorCode('INVALID_INPUT_REVISION'));
});

test('RT-C47/48: unconfigured comprehensive adapter is not presented as executable even with supplied population confirmation',()=>{
  const s=seed(),population=s.screeningPopulations[0];
  Object.assign(population,{inventory_status:'complete_for_scope',population_review_status:'confirmed',completeness_basis_refs:['UPSTREAM-EVENT'],confirmation_permission_ref:'UPSTREAM-PERMISSION',confirmed_by_ref:'REVIEWER'});
  const p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.actions.prepare_comprehensive.allowed,false);
  assert.equal(p.actions.prepare_comprehensive.reason_codes[0],'UPSTREAM_CONFIRMED_INVENTORY_INTERFACE_NOT_CONFIGURED');
});

test('C candidate contract has complete field metadata and literal independent outcomes, and rejects malformed content',async()=>{
  const contract=await import('../../04_operating_model/batch-c/build-contract.mjs').catch(()=>({}));
  assert.equal(typeof contract.buildArtifacts,'function','Additive candidate contract builder must exist');
  const artifacts=contract.buildArtifacts();
  assert.equal(artifacts.schema.status,'additive_candidate_not_production_merged_schema');
  assert.deepEqual(artifacts.schema.properties.screeningFindings.items.if.properties.source_refs.contains,{const:'SRC-016'});
  assert.equal(artifacts.validation.valid,true);
  assert.equal(artifacts.oracle.exclusion_positive.status,'not_run_disabled_pending_fixture_review');
  assert.equal(artifacts.oracle.expected.entry.inventory_status,'incomplete');
  for(const field of artifacts.fields)for(const name of ['object','field','definition','type_format','enum','nullable','required_when','origin_provenance','editable_by','authority_basis','revision_behavior','dependencies','ui_binding','visibility_sensitivity','localisation_labels','synthetic_example'])assert.ok(Object.hasOwn(field,name),`${field.object}.${field.field} needs ${name}`);
  const bad=structuredClone(artifacts.snapshots['C-result']);
  bad.screeningRuns[0].result_count=-1;
  assert.equal(contract.validateCandidate(bad).valid,false);
  const wrongSubject=structuredClone(artifacts.snapshots['C-result']);
  wrongSubject.screeningFindings.find(x=>x.source_refs.includes('SRC-016')).subject_ref='wrong-case/person';
  assert.equal(contract.validateCandidate(wrongSubject).valid,false);
});

test('branch provenance resolves to actual events and existing evidence is reviewed before targeted collection',()=>{
  const s=action(result(),'request_identity',{gap:'Relevant distinguishing identity context remains missing'});
  const branch=s.workItems.find(x=>x.branch_type==='information_gap');
  assert.ok(s.auditEvents.some(x=>x.id===branch.trigger_event_ref));
  assert.deepEqual(branch.work_item_refs,[branch.id]);
  assert.deepEqual(branch.request_item_refs,[module.C_IDS.identityItem]);
  assert.equal(branch.existing_evidence_review.quality_status,'not_assessed');
  assert.ok(branch.existing_evidence_review.basis_refs.includes('DEMO-CTT-001/evidence/appointment-t'));
  assert.equal(branch.resolution_event_ref,null);
});

test('graph facts distinguish returned result and evidence sufficiency from permission to write an assessment',()=>{
  const p=module.screeningProjection(result('failed'),{role:'ROLE-KYCOPS'});
  assert.equal(p.facts.result_status,'failed');
  assert.equal(p.facts.identity_sufficiency,'not_assessed');
  assert.equal(p.facts.inventory_status,'incomplete');
  assert.equal(p.facts.edd_applicability,'unknown');
  assert.equal(p.facts.coverage_status,'incomplete');
});

test('review fix: immediate Unassigned referral cannot resume without owner or a new authorised review',()=>{
  let s=action(result(),'save_review_draft',{text:'Keep the unresolved review draft'});
  s=action(s,'refer'); const branchId=s.workItems.find(x=>x.branch_type==='referral').id;
  const before=structuredClone(s),p=module.screeningProjection(s,{role:'ROLE-REVIEWER',branchId});
  assert.equal(p.actions.resume_branch.allowed,false);
  assert.ok(p.actions.resume_branch.reason_codes.includes('BRANCH_OWNER_REQUIRED'));
  assert.ok(p.actions.resume_branch.reason_codes.includes('REFERRAL_REVIEW_REQUIRED'));
  assert.throws(()=>action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId}),errorCode('BRANCH_OWNER_REQUIRED'));
  assert.deepEqual(s,before);
});

test('review fix: a newer finding decision cannot justify resuming an older referral',()=>{
  let s=result(); s.demoConfig.batchC.referral_owner_ref='ROLE-REVIEWER';
  s=action(s,'refer');const branch=s.workItems.find(x=>x.branch_type==='referral');
  s=action(s,'request_preliminary');
  s=action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome:'completed'});
  s=action(s,'record_unresolved',{role:'ROLE-REVIEWER'});
  const before=structuredClone(s);
  assert.throws(()=>action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId:branch.id}),errorCode('REFERRAL_REVIEW_REQUIRED'));
  assert.deepEqual(s,before);
});

test('review fix: EDD resume needs its own current pack and approval prerequisites, not a screening finding',()=>{
  let s=result();
  s.demoConfig.batchC.referral_owner_ref='ROLE-REVIEWER';
  s.demoConfig.batchC.reviewed_edd_reasons['SYN-EDD-RESUME']={applicability:'required',review_status:'reviewed_for_demo',scope_revision:s.scopes[0].revision,permission_ref:'SYN-EDD-REVIEWER',basis_refs:['SRC-016:7.2']};
  s=action(s,'record_edd_applicability',{role:'ROLE-REVIEWER',applicability:'required',reasonRef:'SYN-EDD-RESUME'});
  const branchId=s.workItems.find(x=>x.branch_type==='conditional_edd').id,before=structuredClone(s);
  assert.throws(()=>action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId}),errorCode('EDD_PACK_REQUIRED'));
  assert.deepEqual(s,before);
  s=action(s,'prepare_edd_pack',{questions:['Current scoped context'],issueRefs:[],evidenceRefs:[]});
  assert.throws(()=>action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId}),errorCode('EDD_ASSESSMENT_APPROVAL_REQUIRED'));
  s.demoConfig.batchC.holds.push({id:'EDD-PACK-HOLD',status:'unknown',action_scope:['resume_branch'],object_scope_refs:[s.eddAssessments.at(-1).id]});
  assert.throws(()=>action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId}),errorCode('HOLD_REQUIRES_REVIEW'));
});

test('review fix: request and EDD applicability object holds participate in named write guards',()=>{
  let s=result();
  s.demoConfig.batchC.holds.push({id:'REQUEST-HOLD',status:'unknown',object_scope_refs:[module.C_IDS.request],action_scope:['request_identity']});
  assert.throws(()=>action(s,'request_identity',{gap:'Identity context'}),errorCode('HOLD_REQUIRES_REVIEW'));
  s=seed();
  s.demoConfig.batchC.holds.push({id:'EDD-APPLICABILITY-HOLD',status:'unknown',object_scope_refs:[module.C_IDS.edd],action_scope:['record_edd_applicability']});
  assert.equal(module.screeningProjection(s,{role:'ROLE-REVIEWER'}).actions.record_edd_applicability.allowed,false);
});

test('review fix: supported referral resume retains its fixed finding and records the actual later review event',()=>{
  let s=result();s.demoConfig.batchC.referral_owner_ref='ROLE-REVIEWER';
  s=action(s,'refer');const branchId=s.workItems.find(x=>x.branch_type==='referral').id;
  s=action(s,'record_unresolved',{role:'ROLE-REVIEWER'});
  const basisEventId=s.auditEvents.at(-1).id;
  s=action(s,'request_preliminary');
  s=action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome:'completed'});
  const newerFinding=structuredClone(module.screeningProjection(s,{role:'ROLE-REVIEWER'}).finding);
  s=action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId});
  const branch=s.workItems.find(x=>x.id===branchId);
  assert.equal(branch.status,'in_review');
  assert.deepEqual(branch.resume_basis_event_refs,[basisEventId]);
  assert.equal(branch.finding_ref,module.C_IDS.finding);
  assert.equal(branch.review_history.at(-1).event_ref,s.auditEvents.at(-1).id);
  assert.deepEqual(module.screeningProjection(s,{role:'ROLE-REVIEWER'}).finding,newerFinding);
});

test('review fix: later finding referrals anchor their own review task rather than the first finding task',()=>{
  let s=result();s.demoConfig.batchC.referral_owner_ref='ROLE-REVIEWER';
  s=action(s,'request_preliminary');
  s=action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome:'completed'});
  s=action(s,'refer');
  const branch=s.workItems.find(x=>x.branch_type==='referral');
  assert.equal(s.workItems.find(x=>x.id===branch.origin_task_ref).finding_ref,branch.finding_ref);
  s=action(s,'record_unresolved',{role:'ROLE-REVIEWER'});
  s=action(s,'resume_branch',{role:'ROLE-REVIEWER',branchId:branch.id});
  assert.equal(s.workItems.find(x=>x.id===branch.id).status,'in_review');
});

test('review round2: preliminary request eligibility requires the same current plan as the reducer',()=>{
  let s=seed(),p=module.screeningProjection(s,{role:'ROLE-KYCOPS'});
  assert.equal(p.actions.prepare_preliminary.allowed,true);
  assert.equal(p.actions.request_preliminary.allowed,false);
  assert.ok(p.actions.request_preliminary.reason_codes.includes('CURRENT_QUERY_PLAN_REQUIRED'));
  assert.throws(()=>action(s,'request_preliminary'),errorCode('CURRENT_QUERY_PLAN_REQUIRED'));
  s=action(s,'prepare_preliminary');
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).actions.request_preliminary.allowed,true);
  s.demoConfig.batchC.query_scope_ref='SYNTHETIC-C-CHANGED-QUERY-v2';
  assert.equal(module.screeningProjection(s,{role:'ROLE-KYCOPS'}).actions.request_preliminary.allowed,false);
  assert.throws(()=>action(s,'request_preliminary'),errorCode('CURRENT_QUERY_PLAN_REQUIRED'));
});
