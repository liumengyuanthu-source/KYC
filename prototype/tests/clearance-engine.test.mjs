import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as api from '../clearance-engine.mjs';
const dEntry=JSON.parse(readFileSync(new URL('../../04_operating_model/batch-d/specialist-snapshots.json',import.meta.url))).snapshots['D-entry'];
const seed=()=>api.createBatchE(structuredClone(dEntry));
const p=(s,role='ROLE-QA')=>api.clearanceProjection(s,{role});
const roleFor={open_qa_gap:'ROLE-QA',submit_remediation:'ROLE-KYCOPS',complete_remediation:'ROLE-KYCOPS',qa_rereview:'ROLE-QA',qa_signoff:'ROLE-QA',record_demo_context:'ROLE-CASEMGR',review_kyc_evidence:'ROLE-KYCOPS',resolve_conflicts:'ROLE-CONFLICTS',confirm_screening_coverage:'ROLE-FINCRIME',record_edd_applicability:'ROLE-FINCRIME',establish_signatory_authority:'ROLE-LEGAL',execute_legal:'ROLE-LEGAL',confirm_clearance:'ROLE-CLEARANCE-REVIEWER',publish_outcome:'ROLE-CASEMGR',revise_evidence:'ROLE-FACILITATOR',revise_scope:'ROLE-FACILITATOR'};
const cmd=(s,type,extra={})=>({type,role:roleFor[type],caseId:'DEMO-CTT-001',scopeId:'DEMO-CTT-001/scope/institutional',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:p(s).inputRevisions,key:`E-test-${type}-${s.case.revision}`,rationale:'Reviewed synthetic scenario only',at:'2026-09-08T09:00:00Z',packageRef:'SYNTHETIC-E-CLOSURE-v1',...extra});
const act=(s,type,extra={})=>api.clearanceAction(s,cmd(s,type,extra));
const run=(s,steps)=>steps.reduce((x,t)=>act(x,t),s);
const remediation=['open_qa_gap','submit_remediation','complete_remediation'];
const closures=['record_demo_context','review_kyc_evidence','resolve_conflicts','confirm_screening_coverage','record_edd_applicability','establish_signatory_authority','execute_legal'];
const ready=()=>run(seed(),[...remediation,...closures,'qa_rereview','qa_signoff']);
const confirmed=()=>{const s=ready();return act(s,'confirm_clearance',{authorityRef:'DEMO-CTT-001/authority/e-clearance-reviewer',snapshotFingerprint:p(s).readiness.fingerprint});};
const err=code=>e=>e.code===code;
const finalCurrent=(s,collection,ref)=>s[collection].filter(x=>x.id===ref).at(-1);
const reviewTargets=[
 ['context','decisions',api.E_IDS.context,'event_ref'],
 ['KYC','decisions',api.E_IDS.kyc,'event_ref'],
 ['Conflicts','decisions',api.E_IDS.conflictDecision,'event_ref'],
 ['coverage','decisions',api.E_IDS.coverageDecision,'event_ref'],
 ['Legal','decisions','DEMO-CTT-001/decision/e-legal-execution','event_ref'],
 ['EDD','eddApplicabilityAssessments',api.E_IDS.edd,'decision_ref'],
 ['QA','qaChecks',api.E_IDS.check,'signoff_ref'],
 ['signatory','authorities',api.E_IDS.signatory,'decision_ref']
];
for(const [name,collection,ref,eventField] of reviewTargets)for(const fault of ['missing event','wrong action','unknown actor','foreign case','foreign scope alias','wrong package','missing output','changed reviewed version'])test(`Final fix provenance: ${name} ${fault} cannot become ready through draft save`,()=>{
 let s=ready();const record=finalCurrent(s,collection,ref),event=s.auditEvents.find(x=>x.id===record[eventField]);assert.ok(event);
 if(fault==='missing event')s.auditEvents=s.auditEvents.filter(x=>x.id!==event.id);
 if(fault==='wrong action')event.event_type='save_draft';
 if(fault==='unknown actor')event.actor_ref='ROLE-UNKNOWN';
 if(fault==='foreign case')event.case_id='OTHER';
 if(fault==='foreign scope alias')event.case_scope_ref='OTHER';
 if(fault==='wrong package')event.package_ref='OTHER';
 if(fault==='missing output')event.object_refs=event.object_refs.filter(x=>x!==ref);
 if(fault==='changed reviewed version')record.revision++;
 assert.equal(p(s).readiness.readiness_state,'NOT_READY');const history=structuredClone(s.clearanceDecisions);
 s=act(s,'save_draft',{role:'ROLE-CLEARANCE-REVIEWER',draftAction:'confirm_clearance',draftRationale:'Fresh reviewer draft cannot supply missing provenance'});
 assert.equal(p(s).readiness.readiness_state,'NOT_READY');
 assert.throws(()=>act(s,'confirm_clearance',{authorityRef:api.E_IDS.authority,snapshotFingerprint:p(s).readiness.fingerprint}));
 assert.deepEqual(s.clearanceDecisions,history);
});
for(const [name,mutate] of [
 ['EDD permission',s=>delete finalCurrent(s,'eddApplicabilityAssessments',api.E_IDS.edd).permission_ref],
 ['EDD reviewer',s=>finalCurrent(s,'eddApplicabilityAssessments',api.E_IDS.edd).decided_by_ref='ROLE-UNKNOWN'],
 ['QA reviewer',s=>finalCurrent(s,'qaChecks',api.E_IDS.check).reviewed_by_ref='ROLE-UNKNOWN'],
 ['QA rereview event',s=>s.auditEvents=s.auditEvents.filter(x=>x.event_type!=='qa_rereview')],
 ['signatory assessor',s=>finalCurrent(s,'evidenceUseAssessments','DEMO-CTT-001/assessment/e-signatory').assessed_by_ref='ROLE-UNKNOWN'],
 ['KYC assessor',s=>finalCurrent(s,'evidenceUseAssessments','DEMO-CTT-001/assessment/e-kyc-identity').assessed_by_ref='ROLE-UNKNOWN'],
 ['KYC assessment event',s=>delete finalCurrent(s,'evidenceUseAssessments','DEMO-CTT-001/assessment/e-kyc-identity').review_event_ref],
 ['coverage reviewer negative control',s=>finalCurrent(s,'screeningPopulations',api.E_IDS.population).confirmed_by_ref='ROLE-UNKNOWN'],
 ['coverage permission negative control',s=>delete finalCurrent(s,'screeningPopulations',api.E_IDS.population).confirmation_permission_ref],
 ['legacy binding absence',s=>s.auditEvents.forEach(x=>delete x.output_bindings)]
])test(`Final fix provenance: ${name} is required independently`,()=>{const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');});
test('E entry is explicit, immutable, same-case and NOT_READY with unknown bank context',()=>{
 const base=structuredClone(dEntry),s=api.createBatchE(base);
 assert.equal(p(s).readiness.readiness_state,'NOT_READY');assert.deepEqual(base,dEntry);
 assert.deepEqual(s.scopes,dEntry.scopes);assert.equal(s.scopes[0].booking_entity_ref,null);
 for(const name of ['screeningReviewDecisions','legalAgreements','creditAssessments','authorities'])assert.deepEqual(s[name].slice(0,dEntry[name].length),dEntry[name]);
 assert.equal(s.requirements.filter(x=>x.purpose_code==='ownership_control').length,1);
 assert.equal(p(s).qa.chain.requirement_ref,'DEMO-CTT-001/requirement/ownership-control');
 assert.throws(()=>api.createBatchE({...base,case:{...base.case,id:'OTHER'}}),err('E_D_CONTEXT_REQUIRED'));
});
test('RT-E01/E16: completion reopens only exact purpose and never passes QA or changes Legal/Credit',()=>{
 const s=seed(),next=run(s,remediation);
 assert.equal(p(next).qa.remediation.status,'completed');assert.equal(p(next).qa.check.check_status,'re_review_required');
 assert.equal(p(next).readiness.readiness_state,'NOT_READY');
 for(const n of ['legalAgreements','creditAssessments','creditConditions','agreementInputs'])assert.deepEqual(next[n],s[n]);
 assert.equal(p(next).qa.remediation.affected_object_refs.includes('DEMO-CTT-001/requirement/ownership-control'),true);
});
test('RT-E02/E04/E05: QA signoff alone leaves conflicts and coverage blocking',()=>{
 const s=run(seed(),[...remediation,'qa_rereview','qa_signoff']);
 assert.equal(p(s).qa.check.check_status,'signed_off');assert.equal(p(s).readiness.readiness_state,'NOT_READY');
 assert.equal(p(s).conditions.find(c=>c.domain==='conflicts').status,'pending');assert.equal(p(s).conditions.find(c=>c.domain==='screening').status,'pending');
});
test('Literal positive path has three layers, current versions, independent EDD and separate human decision',()=>{
 const s=ready(),x=p(s);assert.equal(x.readiness.readiness_state,'READY_FOR_AUTHORISED_CONFIRMATION');
 assert.deepEqual(x.prerequisites.map(c=>[c.alias,c.status]),[['PREREQ-01','satisfied'],['PREREQ-02','satisfied'],['PREREQ-03','satisfied']]);
 assert.equal(x.readiness.scope_revision,3);assert.equal(x.bank_authority_status,'TO_VALIDATE');assert.equal(s.scopes[0].booking_entity_ref,null);
 assert.deepEqual(s.screeningReviewDecisions.slice(0,dEntry.screeningReviewDecisions.length),dEntry.screeningReviewDecisions);
 assert.equal(s.clearanceDecisions.length,0);assert.equal(s.publicationEvents.length,0);
});
test('RT-E03: current Credit change or missing expected dependency prevents readiness and execution',()=>{
 for(const mutate of [s=>s.agreementInputs.at(-1).revision++,s=>s.dependencies=s.dependencies.filter(d=>d.id!=='DEMO-CTT-001/dependency/d-credit-legal-1'),s=>s.creditConditions.at(-1).condition_text='Changed']){
 const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');}
});
test('RT-E06/E07: unknown applicability fails closed and not-required EDD is not approved',()=>{
 const s=ready();assert.equal(p(s).conditions.find(c=>c.domain==='edd').status,'not_required');
 s.eddApplicabilityAssessments.at(-1).applicability='unknown';assert.equal(p(s).readiness.readiness_state,'NOT_READY');
});
test('RT-E08/E09: scope change preserves historical decision and invalidates current clearance',()=>{
 const s=confirmed(),historical=structuredClone(s.clearanceDecisions);const next=act(s,'revise_scope');
 assert.equal(p(next).readiness.readiness_state,'NOT_READY');assert.deepEqual(next.clearanceDecisions,historical);
 assert.equal(p(next).readiness.scope_revision,4);assert.equal(p(next).clearance.current,null);
 assert.equal(next.readinessSnapshots.at(-1).supersedes_ref,s.readinessSnapshots.at(-1).id);
});
test('RT-E10/E11: real command guard rejects unconfigured, tampered and wrong-scope authority',()=>{
 const s=ready(),extras={authorityRef:'DEMO-CTT-001/authority/e-clearance-reviewer',snapshotFingerprint:p(s).readiness.fingerprint};
 for(const role of ['ROLE-QA','ROLE-FACILITATOR','ROLE-RM','ROLE-UNKNOWN'])assert.throws(()=>act(s,'confirm_clearance',{...extras,role}),err('E_PERMISSION_REQUIRED'));
 for(const mutate of [x=>x.authorities.find(a=>a.id==='DEMO-CTT-001/authority/e-clearance-reviewer').bank_authority_ref='BANK',x=>x.demoConfig.batchE.authority.role='ROLE-QA']){
 const bad=structuredClone(s);mutate(bad);assert.throws(()=>act(bad,'confirm_clearance',extras),err('E_AUTHORITY_INVALID'));}
 assert.throws(()=>act(s,'confirm_clearance',{...extras,scopeId:'OTHER'}),err('E_SCOPE_MISMATCH'));
});
test('RT-E12/E13/E14: failure and success publication preserve decision, no trade is executed',()=>{
 const s=confirmed();assert.equal(p(s).readiness.readiness_state,'CLEARED_TO_TRADE');assert.equal(p(s).publication.status,'not_requested');
 const failed=act(s,'publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'failed'});
 assert.equal(p(failed).publication.status,'failed');assert.deepEqual(failed.clearanceDecisions,s.clearanceDecisions);
 const published=act(failed,'publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'succeeded'});
 assert.equal(p(published).publication.status,'succeeded');assert.equal(p(published).trade_execution,'NOT_PART_OF_PROTOTYPE');
 assert.equal(p(published).readiness.readiness_state,'CLEARED_TO_TRADE');
});
test('RT-E15: RM/client projections omit all internal rationale and input hashes',()=>{
 const s=confirmed();s.clearanceDecisions[0].rationale='RESTRICTED-SENTINEL';s.auditEvents.at(-1).rationale='RESTRICTED-SENTINEL';
 for(const role of ['ROLE-RM','ROLE-CLIENT']){assert.equal(JSON.stringify(p(s,role)).includes('SENTINEL'),false);assert.deepEqual(p(s,role).inputRevisions,{});}
});
test('RT-E17: relevant evidence change invalidates QA, readiness and decision, retains evidence history',()=>{
 const s=confirmed(),next=act(s,'revise_evidence');assert.equal(p(next).readiness.readiness_state,'NOT_READY');
 assert.equal(p(next).qa.check.check_status,'re_review_required');assert.deepEqual(next.clearanceDecisions,s.clearanceDecisions);
 assert.deepEqual(next.evidence.slice(0,s.evidence.length),s.evidence);
});
test('RT-E18/E19/E20 state portions: every read-only lens uses same revision and snapshot and never writes',()=>{
 const s=confirmed(),before=structuredClone(s),x=p(s),lenses=api.clearanceLenses(s,{role:'ROLE-QA'});
 for(const lens of Object.values(lenses)){assert.equal(lens.revision,x.revision);assert.deepEqual(lens.readiness,x.readiness);assert.equal(lens.readOnly,true);}
 assert.deepEqual(s,before);assert.equal(Object.keys(lenses).length,3);
});
test('Missing/tampered named package and changed input disable closure',()=>{
 const s=seed();assert.throws(()=>act(s,'resolve_conflicts',{packageRef:null}),err('E_PACKAGE_REQUIRED'));
 delete s.demoConfig.batchE.closure_package;assert.equal(p(s).actionEligibility.resolve_conflicts.allowed,false);
 assert.throws(()=>act(s,'resolve_conflicts'),err('E_PACKAGE_INVALID'));
});
test('Malformed/empty conditions and scope, expected unknown dependencies and unknown holds fail closed',()=>{
 for(const mutate of [s=>s.clearanceConditions=[],s=>s.scopes=[],s=>s.requirements=[],s=>s.screeningCoverageItems=[],s=>s.dependencies=[],s=>s.holds.push({id:'unknown',status:'unknown',hold_scope:'unknown'})]){
 const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');}
});
test('Stale tokens, duplicate ids, arbitrary command fields and mutations have guarded errors',()=>{
 const s=seed(),before=structuredClone(s),a=cmd(s,'open_qa_gap'),next=api.clearanceAction(s,a);
 assert.deepEqual(s,before);assert.equal(api.clearanceAction(next,a),next);
 assert.throws(()=>api.clearanceAction(next,{...a,rationale:'Different'}),err('E_IDEMPOTENCY_CONFLICT'));
 for(const [extra,code] of [[{expectedRevision:0},'E_STALE_CASE'],[{expectedScopeRevision:0},'E_STALE_SCOPE'],[{expectedInputRevisions:{}},'E_STALE_INPUT'],[{key:''},'E_KEY_REQUIRED'],[{rationale:''},'E_RATIONALE_REQUIRED'],[{at:'bad'},'E_INVALID_TIMESTAMP'],[{caseId:'OTHER'},'E_CASE_MISMATCH'],[{force:true},'E_COMMAND_FIELD_NOT_ALLOWED']])assert.throws(()=>api.clearanceAction(s,{...a,...extra}),err(code));
 const bad=structuredClone(s);bad.evidence[0].content_ref='changed';assert.throws(()=>api.clearanceAction(bad,a),err('E_STALE_INPUT'));
 const view=p(next);view.qa.check.check_status='signed_off';assert.equal(p(next).qa.check.check_status,'gap_open');
});
test('Draft save changes no readiness, condition, clearance or publication and does not submit the intended action',()=>{
 const s=ready(),before=p(s),next=act(s,'save_draft',{role:'ROLE-QA',draftAction:'qa_signoff',draftRationale:'Unsubmitted draft'});
 assert.equal(p(next).draft.rationale,'Unsubmitted draft');assert.deepEqual(p(next).readiness,before.readiness);
 assert.deepEqual(next.clearanceConditions,s.clearanceConditions);assert.deepEqual(next.clearanceDecisions,s.clearanceDecisions);assert.deepEqual(next.publicationEvents,s.publicationEvents);
 assert.throws(()=>act(s,'save_draft',{role:'ROLE-QA',draftAction:'confirm_clearance',draftRationale:'Attempt escalation'}),err('E_DRAFT_ACTION_FORBIDDEN'));
});
test('Self-review: unknown stored applicability, unversioned evidence edits and forged decisions never manufacture readiness/clearance',()=>{
 for(const mutate of [s=>s.clearanceConditions.find(x=>x.domain==='credit').applicability='unknown',s=>s.evidence.find(x=>x.id==='DEMO-CTT-001/evidence/e-ownership').content_ref='unversioned-edit',s=>s.authorities.find(x=>x.id==='DEMO-CTT-001/authority/e-signatory').evidence_use_refs=['MISSING']]){
  const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');}
 const s=confirmed();s.clearanceDecisions[0].readiness_snapshot_ref='MISSING';assert.notEqual(p(s).readiness.readiness_state,'CLEARED_TO_TRADE');
});
test('Self-review: independent signer is present in exact full inventory and every required run has subject snapshot',()=>{
 const s=ready(),pop=s.screeningPopulations.at(-1),members=s.screeningMemberships.filter(m=>m.population_ref===pop.id);
 assert.equal(members.some(m=>m.party_ref==='DEMO-CTT-001/person/e-signatory-s'&&m.membership_decision==='included'),true);
 for(const run of s.screeningRuns.filter(r=>r.source_refs.includes('SRC-020')))assert.equal(run.subject_snapshot_refs.length,1);
 s.naturalPersons.push({...s.naturalPersons[0],id:'DEMO-CTT-001/person/extra'});assert.equal(p(s).readiness.readiness_state,'NOT_READY');
});
test('Scoped holds block their affected prerequisite; explicitly non-business draft holds do not become case holds',()=>{
 const s=ready();s.holds.push({id:'LEGAL-HOLD',status:'active',hold_scope:'task',object_scope_refs:['DEMO-CTT-001/agreement/d-01'],action_scope:['execute_legal']});
 const x=p(s);assert.equal(x.prerequisites[2].status,'pending');assert.equal(x.prerequisites[0].status,'satisfied');assert.equal(x.prerequisites[1].status,'satisfied');
 const d=act(ready(),'save_draft',{role:'ROLE-QA',draftAction:'qa_signoff',draftRationale:'Draft'});
 d.holds.push({id:'DRAFT-HOLD',status:'active',hold_scope:'task',object_scope_refs:['DEMO-CTT-001/work/e-draft-role-qa'],action_scope:['save_draft']});
 assert.equal(p(d).readiness.readiness_state,'READY_FOR_AUTHORISED_CONFIRMATION');
 d.holds.push({id:'UNKNOWN-TASK-HOLD',status:'active',hold_scope:'task',object_scope_refs:['MISSING'],action_scope:[]});assert.equal(p(d).readiness.readiness_state,'NOT_READY');
});
test('Missing E purpose/remediation dependency fails closed',()=>{
 const s=ready();s.dependencies=s.dependencies.filter(d=>d.id!=='DEMO-CTT-001/dependency/e-use-qa');assert.equal(p(s).readiness.readiness_state,'NOT_READY');
});
test('Named package closure disabled on freshly reviewed changed conflict inputs; save draft cannot repair missing dependencies',()=>{
 const s=seed();s.conflictFindings.at(-1).resolution_status='changed';assert.equal(p(s,'ROLE-CONFLICTS').actionEligibility.resolve_conflicts.allowed,false);
 assert.throws(()=>act(s,'resolve_conflicts'),err('E_PACKAGE_INPUT_CHANGED'));
 const r=ready();r.dependencies=r.dependencies.filter(d=>d.id!=='DEMO-CTT-001/dependency/e-use-qa');
 const next=act(r,'save_draft',{role:'ROLE-QA',draftAction:'qa_signoff',draftRationale:'Keep incomplete case'});
 assert.deepEqual(next.dependencies,r.dependencies);assert.deepEqual(next.clearanceConditions,r.clearanceConditions);assert.equal(p(next).readiness.readiness_state,'NOT_READY');
});
test('Unmodelled not-required conditions or requirements cannot use dangling or cross-scope exclusions',()=>{
 for(const ref of ['MISSING','DEMO-CTT-001/decision/e-context','OTHER/decision/exclusion'])for(const collection of ['requirements','clearanceConditions']){
  const s=ready();s[collection].push({...s[collection][0],id:'DEMO-CTT-001/extra/unmodelled',domain:'unmodelled',applicability:'not_required',status:'not_required',applicability_decision_ref:ref});
  assert.equal(p(s).readiness.readiness_state,'NOT_READY');}
});
test('Current party content and independent signing mandate changes invalidate applicable readiness',()=>{
 for(const mutate of [s=>s.naturalPersons.find(x=>x.id==='DEMO-CTT-001/person/person-t').display_name='Changed',s=>s.evidence.find(x=>x.id==='DEMO-CTT-001/evidence/e-signatory-mandate').content_ref='Changed']){
  const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');}
});
test('Candidate contract includes logical minimum fields, independent oracle, action/draft contract and ten validated snapshots',async()=>{
 const contract=await import('../../04_operating_model/batch-e/build-contract.mjs'),built=contract.buildArtifacts();
 assert.equal(built.validation.valid,true);assert.equal(Object.keys(built.snapshots).length,10);
 assert.equal(built.oracle.expected['E-remediation-completed'].qa,'re_review_required');assert.equal(built.oracle.expected['E-ready'].readiness,'READY_FOR_AUTHORISED_CONFIRMATION');
 assert.equal(built.actionContract.supported_writers.includes('save_draft'),true);assert.equal(built.actionContract.confirm.role,'ROLE-CLEARANCE-REVIEWER');
 for(const [object,field] of [['QACheck','qa_check_id'],['Remediation','remediation_id'],['ClearancePrerequisite','prerequisite_id'],['ReadinessSnapshot','readiness_snapshot_id'],['ClearanceDecision','clearance_decision_id'],['PublicationEvent','publication_event_id']]){
  const f=built.fields.find(x=>x.object===object&&x.field===field);assert.equal(f.physical_field,'id');assert.ok(f.type);assert.ok(f.owner_role_ref);assert.ok(f.provenance);assert.ok(f.revision_behavior);assert.ok(f.ui_mapping);}
 const broken=structuredClone(built.snapshots['E-cleared']);delete broken.clearanceDecisions[0].authority_ref;assert.equal(contract.validateCandidate(broken).valid,false);
});
test('Confirmation requires current ready snapshot and publication rejects arbitrary targets, unsupported trade and premature attempts',()=>{
 const s=ready();assert.throws(()=>act(s,'confirm_clearance',{authorityRef:'DEMO-CTT-001/authority/e-clearance-reviewer',snapshotFingerprint:'STALE'}),err('E_READY_SNAPSHOT_REQUIRED'));
 assert.throws(()=>act(s,'publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'succeeded'}),err('E_ACTION_PREREQUISITE_REQUIRED'));
 const done=confirmed();assert.throws(()=>act(done,'publish_outcome',{targetSystemRefs:['BANK-PROD'],outcome:'succeeded'}),err('E_PUBLICATION_TARGET_OR_OUTCOME_INVALID'));
 assert.throws(()=>api.clearanceAction(done,cmd(done,'execute_trade')),err('E_ACTION_NOT_SUPPORTED'));
});
test('Explicit E entry rejects changed D Credit outside the named E input package',()=>{
 const changed=JSON.parse(readFileSync(new URL('../../04_operating_model/batch-d/specialist-snapshots.json',import.meta.url))).snapshots['D-credit-changed'];
 assert.throws(()=>api.createBatchE(changed),err('E_D_CONTEXT_REQUIRED'));
});
const reviewFixMutations={
 'R1 changed result with unhandled match':s=>{const r=s.screeningResultSnapshots.find(x=>x.id==='DEMO-CTT-001/screening-result/e-harbour');r.revision++;r.result_count=1;r.disposition_ref=null;},
 'R1 run revision without current result linkage':s=>{s.screeningRuns.find(x=>x.id==='DEMO-CTT-001/screening-run/e-harbour').revision++;},
 'R1 wrong subject identity':s=>{s.runSubjectSnapshots.find(x=>x.id==='DEMO-CTT-001/run-subject/e-harbour').party_ref='OTHER';},
 'R1 wrong subject category':s=>{s.runSubjectSnapshots.find(x=>x.id==='DEMO-CTT-001/run-subject/e-harbour').category='OTHER';},
 'R1 new unresolved current finding':s=>{s.screeningFindings.push({...s.screeningFindings.at(-1),id:'DEMO-CTT-001/finding/e-new',run_ref:'DEMO-CTT-001/screening-run/e-harbour',subject_ref:'DEMO-CTT-001/entity/harbour',decision_ref:null,review_status:'unresolved'});},
 'R1 revised previously handled C finding':s=>{s.screeningFindings.at(-1).revision++;},
 'R2 changed executed Legal document':s=>{const d=s.evidence.find(x=>x.id==='DEMO-CTT-001/evidence/e-executed-agreement');d.content_ref='changed';d.evidence_revision++;d.revision++;},
 'R2 incorrect Legal evidence purpose':s=>{s.evidence.find(x=>x.id==='DEMO-CTT-001/evidence/e-executed-agreement').purpose_code='coordinate_information';},
 'R2 unreleased Legal document':s=>{s.evidence.find(x=>x.id==='DEMO-CTT-001/evidence/e-executed-agreement').intake_security_status='quarantined';},
 'R3 additional current unknown dependency':s=>{s.dependencies.push({...s.dependencies.at(-1),id:'DEMO-CTT-001/dependency/e-new-unknown',from_ref:'DEMO-CTT-001/evidence/e-ownership',from_object_ref:'DEMO-CTT-001/evidence/e-ownership',from_revision:1,to_ref:'DEMO-CTT-001/qa-check/e-04',to_object_ref:'DEMO-CTT-001/qa-check/e-04',to_revision:s.qaChecks.at(-1).revision,status:'unknown',validation_status:'TO_VALIDATE'});}
};
for(const [name,mutate] of Object.entries(reviewFixMutations))test(`Review fix 1 ${name} prevents readiness`,()=>{
 const s=ready();mutate(s);assert.equal(p(s).readiness.readiness_state,'NOT_READY');
});
for(const name of ['R1 changed result with unhandled match','R2 changed executed Legal document','R3 additional current unknown dependency'])test(`Review fix 1 save_draft cannot launder ${name}`,()=>{
 const s=ready();reviewFixMutations[name](s);
 const next=act(s,'save_draft',{role:'ROLE-CLEARANCE-REVIEWER',draftAction:'confirm_clearance',draftRationale:'Review draft only'});
 assert.throws(()=>act(next,'confirm_clearance',{authorityRef:'DEMO-CTT-001/authority/e-clearance-reviewer',snapshotFingerprint:p(next).readiness.fingerprint}),err('E_ACTION_PREREQUISITE_REQUIRED'));
 assert.equal(next.readinessSnapshots.at(-1).readiness_state,'NOT_READY');assert.equal(next.clearanceDecisions.length,0);
});
test('Review fix 1 R4 altered decision scope cannot remain current or publish',()=>{
 const s=confirmed();s.clearanceDecisions.at(-1).decision_scope={entity_refs:['OTHER'],product_refs:['OTHER'],scope_revision:999};
 assert.equal(p(s).clearance.current,null);
 assert.throws(()=>act(s,'publish_outcome',{targetSystemRefs:['SYNTHETIC-E-OUTCOME-REGISTER'],outcome:'succeeded'}),err('E_ACTION_PREREQUISITE_REQUIRED'));
 assert.equal(s.publicationEvents.length,0);
});
test('Review fix 1 R4 altered ready-snapshot scope cannot confer current clearance',()=>{
 const s=confirmed(),d=s.clearanceDecisions.at(-1);s.readinessSnapshots.find(x=>x.id===d.readiness_snapshot_ref).decision_scope={entity_refs:['OTHER'],product_refs:['OTHER'],scope_revision:999};
 assert.equal(p(s).clearance.current,null);
});
test('Review fix 1 R4 confirmation rejects a ready snapshot whose recorded scope was altered',()=>{
 const s=ready();s.readinessSnapshots.at(-1).decision_scope={entity_refs:['OTHER'],product_refs:['FX_FORWARD'],scope_revision:3};
 assert.throws(()=>act(s,'confirm_clearance',{authorityRef:'DEMO-CTT-001/authority/e-clearance-reviewer',snapshotFingerprint:p(s).readiness.fingerprint}),err('E_READY_SNAPSHOT_REQUIRED'));
});
test('Review fix 1 R3 historical exclusions are exact, source-qualified and cannot hide changed or copied unknown edges',()=>{
 const s=ready(),history=s.demoConfig.batchE.historical_dependency_exclusions;
 assert.equal(history.length,8);assert.equal(history.every(x=>x.basis_ref.startsWith('SRC-020:')&&x.binding.fingerprint),true);
 assert.equal(s.dependencies.find(x=>x.id==='DEMO-CTT-001/dependency/d-readiness-legal').status,'pending');
 for(const ref of ['DEMO-CTT-001/dependency/d2-04-1','DEMO-CTT-001/dependency/d-readiness-legal']){
  const bad=structuredClone(s);bad.dependencies.find(x=>x.id===ref).status='unknown';assert.equal(p(bad).readiness.readiness_state,'NOT_READY');}
 const copied=structuredClone(s);copied.dependencies.push({...copied.dependencies.find(x=>x.id==='DEMO-CTT-001/dependency/d2-04-1'),id:'DEMO-CTT-001/dependency/fake-historical',historical:true});
 assert.equal(p(copied).readiness.readiness_state,'NOT_READY');
});
test('Review fix 1 R3 additional QA dependency remains scoped and only explicitly non-business draft edges are excluded',()=>{
 const s=ready();reviewFixMutations['R3 additional current unknown dependency'](s);assert.deepEqual(p(s).prerequisites.map(x=>x.status),['pending','satisfied','satisfied']);
 const draft=act(ready(),'save_draft',{role:'ROLE-QA',draftAction:'qa_signoff',draftRationale:'Draft only'}),ref=p(draft).draft.id;
 draft.dependencies.push({...draft.dependencies.at(-1),id:'DEMO-CTT-001/dependency/draft-only',from_ref:ref,from_object_ref:ref,to_ref:ref,to_object_ref:ref,status:'unknown',impact_scope:'task'});
 assert.equal(p(draft).readiness.readiness_state,'READY_FOR_AUTHORISED_CONFIRMATION');
});
test('Review fix 1 generated contracts require reviewed binding fields and snapshot scope',async()=>{
 const contract=await import('../../04_operating_model/batch-e/build-contract.mjs'),a=contract.buildArtifacts();assert.equal(a.validation.valid,true);
 for(const field of ['executed_document_fingerprint','reviewed_screening_bindings'])assert.equal(a.fields.some(x=>x.object==='ReviewedDecision'&&x.field===field),true);
 assert.equal(a.fields.some(x=>x.object==='ReadinessSnapshot'&&x.field==='decision_scope'&&x.required),true);
 assert.equal(a.crosswalk.historical_dependency_exclusions.length,8);
 const broken=structuredClone(a.snapshots['E-ready']);delete broken.decisions.find(x=>x.decision_type==='legal_execution').executed_document_fingerprint;assert.equal(contract.validateCandidate(broken).valid,false);
});
test('Review fix 2 schema applicators are nonempty and absent when no binding rules apply',async()=>{
 const {buildArtifacts}=await import('../../04_operating_model/batch-e/build-contract.mjs');
 const schema=buildArtifacts().schema,invalid=[];
 // Targeted Draft 2020-12 applicator validity check, not full meta-schema validation.
 const visit=(node,path='$')=>{if(!node||typeof node!=='object')return;
  for(const [key,value] of Object.entries(node)){
   if(['allOf','anyOf','oneOf'].includes(key)&&(!Array.isArray(value)||value.length===0))invalid.push(`${path}.${key}: nonempty schema array required`);
   if(Array.isArray(value))value.forEach((x,i)=>visit(x,`${path}.${key}[${i}]`));else visit(value,`${path}.${key}`);
  }};
 visit(schema);assert.deepEqual(invalid,[]);
 for(const [collection,definition]of Object.entries(schema.properties)){
  if(collection==='decisions')assert.equal(definition.items.then.allOf.length,2);
  else assert.equal(Object.hasOwn(definition.items.then,'allOf'),false,collection);
 }
});
