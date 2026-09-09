import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBatchB, collaborationAction, collaborationProjection, COLLAB_IDS} from '../collaboration-engine.mjs';
import {createBatchC,screeningAction,screeningProjection,C_IDS} from '../screening-engine.mjs';

const snapshots = JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/batch-a-story-snapshots.json', import.meta.url)));
const SECOND = 'DEMO-CTT-001/request/identity-c';
function seed() {
  const s = createBatchB(snapshots.snapshots['SNAP-A3']);
  const original = s.informationRequests.find(x => x.id === COLLAB_IDS.request);
  s.informationRequests.push({...structuredClone(original), id: SECOND, reference: 'C-IDENTITY', item_refs: ['C-ITEM'], client_summary: 'Identity task'});
  s.requestItems.push({...structuredClone(s.requestItems[0]), id: 'C-ITEM', request_id: SECOND, purpose_code: 'screening_identity', response_draft: 'PRIVATE IDENTITY RESPONSE'});
  s.requestRecipients.push({...structuredClone(s.requestRecipients[0]), id: 'C-RECIPIENT', request_id: SECOND, permitted_item_refs: ['C-ITEM']});
  return s;
}
function action(s, type, extra = {}) {
  const requestId = extra.requestId || COLLAB_IDS.request;
  return collaborationAction(s, {type, role: 'ROLE-KYCOPS', key: `${type}-${s.case.revision}`, expectedRevision: s.case.revision,
    expectedRequestRevision: s.informationRequests.find(x => x.id === requestId).revision, now: '2026-09-07T10:00:00Z', rationale: 'Reviewed current request only', ...extra});
}

test('B request projection excludes another request and RM excludes response drafts', () => {
  const s = seed();
  const rm = collaborationProjection(s, {audience: 'rm'});
  assert.equal(rm.items.length, 2);
  assert.equal(JSON.stringify(rm).includes('PRIVATE IDENTITY RESPONSE'), false);
  assert.equal('response_draft' in rm.items[0], false);
  const ops = collaborationProjection(s, {audience: 'ops', requestId: SECOND});
  assert.deepEqual(ops.items.map(x => x.id), ['C-ITEM']);
  assert.equal(ops.request.id, SECOND);
});

test('cross-request item and recipient actions are rejected without writes', () => {
  const s = seed();
  assert.throws(() => action(s, 'request_more', {itemId: 'C-ITEM', expectedItemRevision: 1}), /request membership/i);
  assert.throws(() => action(s, 'revoke_grant', {recipientId: 'C-RECIPIENT'}), /request membership/i);
});

test('review and dispatch do not grant or notify recipients from another request', () => {
  let s = action(seed(), 'save_request', {text: 'Two B items only'});
  s = action(s, 'review_request');
  assert.equal(s.accessGrants.length, 2);
  assert.ok(s.accessGrants.every(x => x.request_id === COLLAB_IDS.request && !x.resource_scope.item_refs.includes('C-ITEM')));
  s = action(s, 'dispatch', {channel: 'official_site_reference'});
  assert.equal(s.notifications.length, 2);
});

test('dispatch policy purposes must include every selected request item', () => {
  let s = action(seed(), 'save_request', {requestId: SECOND, text: 'Identity task'});
  s = action(s, 'review_request', {requestId: SECOND});
  assert.throws(() => action(s, 'dispatch', {requestId: SECOND, channel: 'official_site_reference'}), /purpose/i);
});

function cAction(s,type,extra={}) {
  return screeningAction(s,{type,role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,
    expectedInputRevisions:screeningProjection(s,{role:'ROLE-KYCOPS'}).inputRevisions,key:`C-${type}-${s.case.revision}`,
    rationale:'Reviewed current synthetic identity context',at:'2026-09-07T11:00:00Z',...extra});
}
function cSeed() {
  let s=createBatchC(createBatchB(snapshots.snapshots['SNAP-A3']));
  s=cAction(cAction(s,'prepare_preliminary'),'request_preliminary');
  s=cAction(s,'receive_result',{runId:s.screeningRuns[0].id,outcome:'completed'});
  return cAction(s,'request_identity',{gap:'Identity context is not established'});
}
function cCollab(s,type,extra={}) {
  return action(s,type,{requestId:C_IDS.request,itemId:C_IDS.identityItem,expectedItemRevision:s.requestItems.find(x=>x.id===C_IDS.identityItem).revision,...extra});
}

test('RT-C10/11/12/13/67: new identity intake reuses B with separate purpose, grant, provenance and insufficient outcome', () => {
  let s=cSeed(); const bItems=structuredClone(s.requestItems.filter(x=>x.request_id===COLLAB_IDS.request));
  const bGrants=structuredClone(s.accessGrants.filter(x=>x.request_id===COLLAB_IDS.request));
  assert.equal(s.evidence.some(x=>x.alias==='EV-ID-C01'),false);
  assert.equal(collaborationProjection(s,{audience:'client',requestId:C_IDS.request,userId:C_IDS.personT,sessionId:'C-SESSION'}).allowed,false);
  s=cCollab(s,'save_request',{text:s.demoConfig.batchC.collaboration.client_text});
  s=cCollab(s,'review_request'); s=cCollab(s,'dispatch',{channel:'identity_secure_task'});
  const grant=s.accessGrants.find(x=>x.request_id===C_IDS.request);
  assert.deepEqual(grant.resource_scope.item_refs,[C_IDS.identityItem]);
  s=cCollab(s,'start_session',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'C-SESSION',reference:'CTT-DEMO-ID-C01'});
  s=cCollab(s,'submit_response',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'C-SESSION',text:'SYNTHETIC PRIVATE IDENTITY RESPONSE'});
  const artifact=s.evidence.at(-1);
  assert.equal(artifact.alias,'EV-ID-C01'); assert.deepEqual(artifact.source_refs,['SRC-016']);
  assert.equal(artifact.original_submitter_ref,C_IDS.personT); assert.equal(artifact.intake_security_status,'received');
  assert.equal(s.auditEvents.at(-1).event_type,'screening_identity_evidence_received');
  assert.throws(()=>cAction(s,'assess_identity',{evidenceId:artifact.id,sufficiency:'insufficient'}),e=>e.code==='RELEASED_LINKED_IDENTITY_EVIDENCE_REQUIRED');
  s=cCollab(s,'release_artifact',{reference:artifact.id,intakeStatus:'quarantined'});
  s=cCollab(s,'link_evidence',{reference:artifact.id});
  assert.throws(()=>cAction(s,'assess_identity',{evidenceId:artifact.id,sufficiency:'unknown'}),e=>e.code==='RELEASED_LINKED_IDENTITY_EVIDENCE_REQUIRED');
  s=cCollab(s,'release_artifact',{reference:artifact.id,intakeStatus:'released'});
  s=cCollab(s,'link_evidence',{reference:artifact.id});
  assert.throws(()=>cCollab(s,'record_assessment',{reference:artifact.id}),/coordination/i);
  s=cAction(s,'assess_identity',{evidenceId:artifact.id,sufficiency:'insufficient'});
  assert.equal(s.evidenceUseAssessments.at(-1).sufficiency,'insufficient');
  assert.equal(s.evidenceUseAssessments.at(-1).purpose_code,'screening_identity');
  s=cAction(s,'resume_branch',{branchId:s.workItems.find(x=>x.branch_type==='information_gap').id});
  s=cAction(s,'record_unresolved',{role:'ROLE-REVIEWER'});
  assert.equal(s.screeningReviewDecisions.at(-1).disposition,'unresolved');
  assert.deepEqual(s.requestItems.filter(x=>x.request_id===COLLAB_IDS.request),bItems);
  assert.deepEqual(s.accessGrants.filter(x=>x.request_id===COLLAB_IDS.request),bGrants);
  const rm=screeningProjection(s,{role:'ROLE-RM'});
  assert.equal(JSON.stringify(rm).includes('SYNTHETIC PRIVATE IDENTITY RESPONSE'),false);
  assert.equal(JSON.stringify(rm).includes('SYN-PROVIDER'),false);
  const bView=collaborationProjection(s,{audience:'ops'});
  assert.equal(bView.evidence.some(x=>x.alias==='EV-ID-C01'),false);
});

test('request membership is rechecked before granting or dispatching corrupted recipient item lists', () => {
  let s=action(seed(),'save_request',{text:'B items'});
  s.requestRecipients[0].permitted_item_refs.push('C-ITEM');
  assert.throws(()=>action(s,'review_request'),/request membership/i);
});

test('identity client text cannot be replaced with restricted provider text and holds are checked by reused actions', () => {
  let s=cSeed();
  assert.throws(()=>cCollab(s,'save_request',{text:'Restricted SYN-PROVIDER C01 concern'}),/reviewed client text/i);
  s.demoConfig.batchC.holds.push({id:'C-DISPATCH-HOLD',status:'unknown',object_scope_refs:[C_IDS.request],action_scope:['dispatch']});
  s=cCollab(s,'save_request',{text:s.demoConfig.batchC.collaboration.client_text});
  s=cCollab(s,'review_request');
  assert.throws(()=>cCollab(s,'dispatch',{channel:'identity_secure_task'}),/hold/i);
});

test('C client sessions cannot reuse a B session or another request grant', () => {
  let s=cSeed();
  s=action(s,'save_request',{text:'B request'}); s=action(s,'review_request');
  s=action(s,'start_session',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'B-SESSION',reference:s.demoConfig.batchB.reference});
  s=cCollab(s,'save_request',{text:s.demoConfig.batchC.collaboration.client_text}); s=cCollab(s,'review_request');
  assert.equal(collaborationProjection(s,{audience:'client',requestId:C_IDS.request,userId:C_IDS.personT,sessionId:'B-SESSION',now:'2026-09-07T10:00:00Z'}).allowed,false);
  assert.throws(()=>cCollab(s,'submit_response',{role:'ROLE-CLIENT',userId:C_IDS.personT,sessionId:'B-SESSION',text:'Synthetic context'}),/session/i);
});

test('staff-assisted identity submission must name a contributor assigned to that item',()=>{
  const s=cSeed();
  assert.throws(()=>cCollab(s,'staff_submit',{userId:COLLAB_IDS.secondContributor,text:'Synthetic identity response from unrelated contributor'}),/request membership/i);
});

test('review fix: unknown evidence-scoped hold blocks identity assessment in predicate and action without writes',()=>{
  let s=cSeed();
  s=cCollab(s,'staff_submit',{userId:C_IDS.personT,text:'Synthetic identity context awaiting assessment'});
  const evidenceId=s.evidence.at(-1).id;
  s=cCollab(s,'release_artifact',{reference:evidenceId,intakeStatus:'released'});
  s=cCollab(s,'link_evidence',{reference:evidenceId});
  s.demoConfig.batchC.holds.push({id:'C-EVIDENCE-HOLD',status:'unknown',object_scope_refs:[evidenceId],action_scope:['assess_identity']});
  const before=structuredClone(s);
  const p=screeningProjection(s,{role:'ROLE-KYCOPS',evidenceId});
  assert.equal(p.actions.assess_identity.allowed,false);
  assert.equal(p.actions.assess_identity.reason_codes[0],'HOLD_REQUIRES_REVIEW');
  assert.throws(()=>cAction(s,'assess_identity',{evidenceId,sufficiency:'insufficient'}),e=>e.code==='HOLD_REQUIRES_REVIEW');
  assert.deepEqual(s,before);
});

test('review fix: resume rechecks the identity request item hold after a current assessment',()=>{
  let s=cSeed();
  s=cCollab(s,'staff_submit',{userId:C_IDS.personT,text:'Synthetic identity context for review'});
  const evidenceId=s.evidence.at(-1).id;
  s=cCollab(s,'release_artifact',{reference:evidenceId,intakeStatus:'released'});
  s=cCollab(s,'link_evidence',{reference:evidenceId});
  s=cAction(s,'assess_identity',{evidenceId,sufficiency:'unknown'});
  const branchId=s.workItems.find(x=>x.branch_type==='information_gap').id;
  s.demoConfig.batchC.holds.push({id:'C-ITEM-RESUME-HOLD',status:'unknown',object_scope_refs:[C_IDS.identityItem],action_scope:['resume_branch']});
  assert.throws(()=>cAction(s,'resume_branch',{branchId}),e=>e.code==='HOLD_REQUIRES_REVIEW');
});

function assessedIdentity() {
  let s=cSeed();
  s=cCollab(s,'staff_submit',{userId:C_IDS.personT,text:'Synthetic identity context with unresolved distinguishing details'});
  const evidenceId=s.evidence.at(-1).id;
  s=cCollab(s,'release_artifact',{reference:evidenceId,intakeStatus:'released'});
  s=cCollab(s,'link_evidence',{reference:evidenceId});
  return cAction(s,'assess_identity',{evidenceId,sufficiency:'insufficient'});
}

for(const targetKind of ['artifact','assessment']) {
  test(`review round2: a held ${targetKind} cannot be cited by unresolved or referral decisions`,()=>{
    for(const type of ['record_unresolved','refer']) {
      const s=assessedIdentity(),use=s.evidenceUseAssessments.at(-1);
      const targetRef=targetKind==='artifact'?use.evidence_id:use.id;
      s.demoConfig.batchC.holds.push({id:`C-DECISION-${targetKind}`,status:'unknown',object_scope_refs:[targetRef],action_scope:[type]});
      const before=structuredClone(s),p=screeningProjection(s,{role:'ROLE-REVIEWER'});
      assert.equal(p.actions[type].allowed,false);
      assert.equal(p.actions[type].reason_codes[0],'HOLD_REQUIRES_REVIEW');
      assert.throws(()=>cAction(s,type,{role:'ROLE-REVIEWER'}),e=>e.code==='HOLD_REQUIRES_REVIEW');
      assert.deepEqual(s,before);
    }
  });
}

test('review round2: explicit emergency finding-only referral does not cite held evidence and preserves narrower work scopes',()=>{
  let s=assessedIdentity(); const use=s.evidenceUseAssessments.at(-1);
  s.demoConfig.batchC.referral_basis_policy={id:'SYN-C-URGENT-FINDING-ONLY-v1',review_status:'reviewed_for_demo',
    case_id:s.case.id,scope_revision:s.scopes[0].revision,permission_ref:'SYN-C-URGENT-REFERRAL-TEST-PERMISSION',
    allowed_roles:['ROLE-KYCOPS'],allowed_basis_modes:['finding_only'],action_scope:['refer']};
  s.demoConfig.batchC.holds.push({id:'C-HELD-IDENTITY',status:'unknown',object_scope_refs:[use.evidence_id,use.id],action_scope:['record_unresolved','refer']});
  const p=screeningProjection(s,{role:'ROLE-KYCOPS',urgent:true,basisMode:'finding_only'});
  assert.equal(p.actions.refer.allowed,true);
  assert.equal(screeningProjection(s,{role:'ROLE-KYCOPS',urgent:true,basisMode:'finding_only',evidenceId:use.evidence_id}).actions.refer.allowed,true);
  assert.equal(p.actions.prepare_preliminary.allowed,true);
  s=cAction(s,'refer',{urgent:true,basisMode:'finding_only',rationale:'Route the current possible finding for urgent specialist review without using held identity evidence'});
  const decision=s.screeningReviewDecisions.at(-1);
  assert.deepEqual(decision.evidence_use_assessment_refs,[]);
  assert.equal(decision.basis_mode,'finding_only');
  assert.equal(decision.basis_refs.includes(use.id),false);
  assert.equal(decision.basis_refs.includes(use.evidence_id),false);
  assert.ok(decision.basis_refs.includes(C_IDS.finding));
  assert.equal(s.workItems.find(x=>x.branch_type==='referral').decision_basis_mode,'finding_only');
  s.demoConfig.batchC.holds.push({id:'C-FINDING-HOLD',status:'unknown',object_scope_refs:[C_IDS.finding],action_scope:['refer']});
  assert.throws(()=>cAction(s,'refer',{urgent:true,basisMode:'finding_only'}),e=>e.code==='HOLD_REQUIRES_REVIEW');
});

test('review round2: emergency basis exclusion is unavailable without its explicit scoped policy',()=>{
  const s=assessedIdentity();
  delete s.demoConfig.batchC.referral_basis_policy;
  assert.throws(()=>cAction(s,'refer',{urgent:true,basisMode:'finding_only'}),e=>e.code==='REFERRAL_BASIS_NOT_CONFIGURED');
});

test('review round2: unrelated artifact holds do not block a decision whose actual basis excludes that artifact',()=>{
  let s=assessedIdentity();
  const unrelated=s.evidence.find(x=>x.alias==='EV-A02').id;
  s.demoConfig.batchC.holds.push({id:'C-UNRELATED-EVIDENCE-HOLD',status:'unknown',object_scope_refs:[unrelated],action_scope:['record_unresolved','refer']});
  assert.equal(screeningProjection(s,{role:'ROLE-REVIEWER'}).actions.record_unresolved.allowed,true);
  s=cAction(s,'record_unresolved',{role:'ROLE-REVIEWER'});
  assert.equal(s.screeningReviewDecisions.at(-1).basis_refs.includes(unrelated),false);
});

test('review round2: EDD applicability decision cannot cite a held evidence-use basis',()=>{
  const s=assessedIdentity(),use=s.evidenceUseAssessments.at(-1);
  s.demoConfig.batchC.reviewed_edd_reasons['SYN-EDD-HELD-BASIS']={applicability:'required',review_status:'reviewed_for_demo',scope_revision:s.scopes[0].revision,permission_ref:'SYN-EDD-REVIEWER',basis_refs:[use.id]};
  s.demoConfig.batchC.holds.push({id:'C-EDD-HELD-BASIS',status:'unknown',object_scope_refs:[use.evidence_id],action_scope:['record_edd_applicability']});
  assert.throws(()=>cAction(s,'record_edd_applicability',{role:'ROLE-REVIEWER',reasonRef:'SYN-EDD-HELD-BASIS',applicability:'required'}),e=>e.code==='HOLD_REQUIRES_REVIEW');
});
