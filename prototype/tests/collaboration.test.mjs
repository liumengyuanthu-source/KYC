import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {
  COLLAB_IDS,
  createBatchB,
  collaborationAction,
  collaborationProjection
} from '../collaboration-engine.mjs';

const snapshots=JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/batch-a-story-snapshots.json',import.meta.url)));
const base=()=>structuredClone(snapshots.snapshots['SNAP-A3']);
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const requestOf=s=>s.informationRequests.find(x=>x.id===COLLAB_IDS.request);
const itemOf=(s,itemId=COLLAB_IDS.authorityItem)=>s.requestItems.find(x=>x.id===itemId);
const act=(s,type,extra={})=>collaborationAction(s,{
  type,
  role:'ROLE-KYCOPS',
  expectedRevision:s.case.revision,
  expectedRequestRevision:requestOf(s).revision,
  expectedItemRevision:itemOf(s,extra.itemId)?.revision,
  itemId:extra.itemId,
  key:`${type}:${s.case.revision}:${extra.itemId||'request'}`,
  now:'2026-09-07T10:00:00Z',
  rationale:'Reviewed synthetic purpose and current revisions.',
  ...extra
});
const seed=()=>createBatchB(base());
const approved=()=>act(act(seed(),'save_request',{text:'Please provide the two scoped synthetic responses.'}),'review_request');
const session=(s,userId=COLLAB_IDS.personT,sessionId=`SESSION-${userId.split('/').at(-1)}`)=>act(s,'start_session',{
  role:'ROLE-CLIENT',userId,sessionId,reference:requestOf(s).reference,key:`session:${sessionId}`
});
const client=(s,userId=COLLAB_IDS.personT,sessionId=`SESSION-${userId.split('/').at(-1)}`,now='2026-09-07T10:05:00Z')=>collaborationProjection(s,{audience:'client',userId,sessionId,now});

test('CH-01/02/07/27: Batch B extends the same case/request without clearing unknowns or establishing authority',()=>{
  const input=base(),before=hash(input),s=createBatchB(input);
  assert.equal(hash(input),before);
  assert.equal(s.case.id,input.case.id);
  assert.equal(s.case.revision,input.case.revision);
  assert.equal(requestOf(s).id,'DEMO-CTT-001/request/authority_gap');
  assert.deepEqual(requestOf(s).item_refs,[COLLAB_IDS.authorityItem,COLLAB_IDS.ownershipItem]);
  assert.equal(s.requestItems.length,2);
  assert.equal(itemOf(s,COLLAB_IDS.ownershipItem).requirement_applicability,'unknown');
  assert.equal(s.requirements.find(x=>x.id===COLLAB_IDS.ownershipRequirement).applicability,'unknown');
  assert.equal(s.authorities.find(x=>x.action_type==='coordinate_information').status,'evidence_required');
  assert.equal(s.authorities.find(x=>x.action_type==='execute_agreement').status,'not_established');
  assert.equal(s.case.publication_status,'not_requested');
  assert.equal(s.clearanceConditions.find(x=>x.domain==='legal').status,'unknown');
  assert.ok(collaborationProjection(s,{audience:'ops',userId:'OPS'}).assessments.some(x=>x.id.endsWith('/assessment/authority-coordinate')&&x.sufficiency==='insufficient'));
  assert.equal(createBatchB(s),s);
});

test('createBatchB refuses a case before working scope or Entity A identity resolution',()=>{
  const noScope=base();noScope.scopes[0].scope_status='draft';
  assert.throws(()=>createBatchB(noScope),/working scope/i);
  const noIdentity=base();noIdentity.entities[0].identity_resolution_status='unresolved';
  assert.throws(()=>createBatchB(noIdentity),/identity/i);
});

test('CH-03/04/12/28: reference authentication and grants remain separate and projections fail closed',()=>{
  let s=seed();
  s=session(s);
  const noGrant=client(s);
  assert.equal(noGrant.allowed,false);assert.equal('items' in noGrant,false);assert.equal('artifacts' in noGrant,false);
  s=approved();s=session(s);
  const own=client(s);
  assert.equal(own.allowed,true);assert.deepEqual(own.items.map(x=>x.id),[COLLAB_IDS.authorityItem]);
  assert.equal(JSON.stringify(own).includes('Internal:'),false);
  const forwarded=collaborationProjection(s,{audience:'client',userId:COLLAB_IDS.secondContributor,sessionId:'SESSION-person-t',now:'2026-09-07T10:05:00Z'});
  assert.equal(forwarded.allowed,false);assert.equal('items' in forwarded,false);
  assert.equal(s.contributorSessions.at(-1).implementation_fidelity,'local_simulation');
  assert.equal(s.contributorSessions.at(-1).production_authentication_validated,false);
});

test('two separately assigned recipients never see one another\'s task or receipt',()=>{
  let s=approved();s=session(s,COLLAB_IDS.personT);s=session(s,COLLAB_IDS.secondContributor);
  assert.equal(s.demoConfig.batchB.grant_expires_at,'2026-09-08T23:59:59Z');
  assert.ok(s.accessGrants.every(x=>x.expires_at===s.demoConfig.batchB.grant_expires_at));
  const t=client(s,COLLAB_IDS.personT),other=client(s,COLLAB_IDS.secondContributor);
  assert.deepEqual(t.items.map(x=>x.alias),['ITEM-AUTHORITY']);
  assert.deepEqual(other.items.map(x=>x.alias),['ITEM-OWNERSHIP']);
  assert.notDeepEqual(t.items.map(x=>x.id),other.items.map(x=>x.id));
});

test('CH-09/10/18/19/26: review is not send; dispatch is channel/version bound and idempotent',()=>{
  let s=approved();
  assert.equal(requestOf(s).review_status,'approved');assert.equal(s.notifications.length,0);
  assert.throws(()=>act(s,'dispatch',{channel:'whatsapp'}),/channel/i);
  const sent=act(s,'dispatch',{channel:'official_site_reference',key:'dispatch-once'});
  assert.equal(sent.notifications.length,2);
  assert.ok(sent.notifications.every(x=>x.dispatch_status==='sent'&&x.delivery_status==='unknown'));
  assert.ok(sent.notifications.every(x=>x.request_revision===requestOf(s).revision&&x.sent_item_snapshot.length===1));
  assert.equal(collaborationAction(sent,{type:'dispatch',role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedRequestRevision:requestOf(s).revision,key:'dispatch-once',channel:'official_site_reference',now:'2026-09-07T10:01:00Z',rationale:'Reviewed synthetic purpose and current revisions.'}),sent);
  const changed=act(sent,'save_request',{text:'Revised client-safe wording.'});
  assert.equal(changed.notifications.length,2);assert.equal(requestOf(changed).review_status,'pending_review');
  assert.throws(()=>act(changed,'dispatch',{channel:'official_site_reference'}),/review/i);
  assert.equal(changed.demoConfig.batchB.adapters.email.status,'disabled_not_run');
});

test('RM projection receives safe item progress and reviewed notes, never restricted reasons or artifacts',()=>{
  let s=seed();s=act(s,'record_note',{role:'ROLE-RM',text:'Synthetic call summary; reviewed for RM display.',channel:'phone',key:'rm-note'});
  const p=collaborationProjection(s,{audience:'rm',userId:'RM-LOCAL',now:'2026-09-07T10:05:00Z'}),wire=JSON.stringify(p);
  assert.equal(p.allowed,true);assert.equal(p.interactionRecords.length,1);assert.equal(p.items.length,2);
  assert.equal('evidence' in p,false);assert.equal(wire.includes('Internal:'),false);assert.equal(wire.includes('restricted_reason'),false);
});

test('stale case/request/item revisions reject without mutating current state',()=>{
  const s=approved(),before=hash(s);
  assert.throws(()=>act(s,'save_request',{expectedRevision:s.case.revision-1,text:'stale'}),/revision/i);
  assert.throws(()=>act(s,'save_request',{expectedRequestRevision:requestOf(s).revision-1,text:'stale'}),/revision/i);
  assert.throws(()=>act(s,'request_more',{itemId:COLLAB_IDS.authorityItem,expectedItemRevision:itemOf(s).revision-1}),/revision/i);
  assert.equal(hash(s),before);
});

test('CH-08/16/19: one client submission is partial, received only, and duplicate safe',()=>{
  let s=approved();s=session(s);
  s=act(s,'save_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'I coordinate onboarding information for Entity A.',key:'draft-auth'});
  const beforeSubmit=s;
  s=act(s,'submit_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'I coordinate onboarding information for Entity A.',key:'submit-auth'});
  assert.equal(hash(beforeSubmit.evidence),hash(seed().evidence));
  assert.equal(itemOf(s).response_status,'under_review');
  assert.equal(itemOf(s,COLLAB_IDS.ownershipItem).response_status,'open');
  assert.equal(s.submissions.length,1);assert.equal(s.evidence.find(x=>x.alias==='EV-A05').intake_security_status,'received');
  assert.notEqual(s.requirements.find(x=>x.id===COLLAB_IDS.authorityRequirement).status,'satisfied');
  const duplicate=collaborationAction(s,{type:'submit_response',role:'ROLE-CLIENT',expectedRevision:beforeSubmit.case.revision,expectedRequestRevision:requestOf(beforeSubmit).revision,expectedItemRevision:itemOf(beforeSubmit).revision,itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',key:'submit-auth',text:'I coordinate onboarding information for Entity A.',rationale:'Reviewed synthetic purpose and current revisions.',now:'2026-09-07T10:00:00Z'});
  assert.equal(duplicate,s);assert.equal(duplicate.submissions.length,1);
  assert.equal(client(s).submissions[0].response_text,'I coordinate onboarding information for Entity A.');
  assert.equal(client(s).submissions[0].intake_security_status,'received');
});

test('CH-05: expired or revoked grant blocks every read/write while saved draft persists',()=>{
  let s=approved();s=session(s);s=act(s,'save_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'Keep this draft.',key:'keep-draft'});
  const draft=itemOf(s).response_draft;
  assert.equal(client(s,COLLAB_IDS.personT,'SESSION-person-t','2026-09-09T10:05:00Z').allowed,false);
  assert.throws(()=>act(s,'submit_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,key:'expired-submit',now:'2026-09-09T10:05:00Z'}),/grant/i);
  s=act(s,'revoke_grant',{recipientId:COLLAB_IDS.recipientT,key:'revoke-t'});
  assert.equal(client(s).allowed,false);assert.equal(itemOf(s).response_draft,draft);
});

test('CH-13/14: staff-assisted duplicate candidates preserve origin, principal and uploader',()=>{
  let s=approved();
  s=act(s,'staff_submit',{itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,text:'Same synthetic authority response.',key:'staff-one'});
  s=act(s,'staff_submit',{itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,text:'Same synthetic authority response.',key:'staff-two'});
  assert.equal(s.submissions.length,2);assert.ok(s.submissions.every(x=>x.submitted_by===COLLAB_IDS.personT&&x.on_behalf_of===COLLAB_IDS.personT&&x.staff_uploader_ref==='ROLE-KYCOPS'&&x.source_channel==='staff_assisted'));
  assert.ok(s.submissions.every(x=>x.duplicate_candidate_refs.length===1));
  assert.equal(s.evidence.filter(x=>x.alias?.startsWith('EV-A')).at(-1).original_submitter_ref,COLLAB_IDS.personT);
});

test('CH-15/16/17/27: intake, purpose link and assessment gates are independent',()=>{
  let s=approved();s=act(s,'staff_submit',{itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,text:'Synthetic authority basis.',key:'staff-evidence'});
  const artifact=s.evidence.at(-1),oldAssessment=s.evidenceUseAssessments.find(x=>x.id.endsWith('authority-coordinate'));
  s=act(s,'release_artifact',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,intakeStatus:'quarantined',key:'quarantine'});
  assert.throws(()=>act(s,'record_assessment',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,key:'assess-quarantine'}),/released/i);
  s=act(s,'release_artifact',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,intakeStatus:'released',key:'release'});
  assert.notEqual(s.requirements.find(x=>x.id===COLLAB_IDS.authorityRequirement).status,'satisfied');
  assert.throws(()=>act(s,'record_assessment',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,key:'assess-unlinked'}),/link/i);
  s=act(s,'link_evidence',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,key:'link'});
  s=act(s,'record_assessment',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,key:'assess'});
  const latest=s.evidenceUseAssessments.at(-1),coord=s.authorities.find(x=>x.action_type==='coordinate_information');
  assert.equal(oldAssessment.sufficiency,'insufficient');assert.equal(latest.sufficiency,'sufficient');
  assert.equal(coord.status,'established_for_demo');
  assert.equal(s.authorities.find(x=>x.action_type==='execute_agreement').status,'not_established');
  assert.equal(s.authorities.find(x=>x.action_type==='issue_trade_instruction').status,'not_assessed');
  assert.ok(s.dependencies.filter(x=>x.status==='unknown').length===0);
  assert.equal(s.case.publication_status,'not_requested');
  assert.equal(collaborationProjection(s,{audience:'ops',userId:'OPS',now:'2026-09-07T10:05:00Z'}).readiness.result,'not_ready');
});

test('CH-11: replacing a recipient revokes old access and creates only a controlled item grant',()=>{
  let s=approved();s=session(s);
  s=act(s,'replace_recipient',{recipientId:COLLAB_IDS.recipientT,userId:COLLAB_IDS.secondContributor,itemId:COLLAB_IDS.authorityItem,key:'replace-t'});
  assert.equal(client(s).allowed,false);
  const replacement=s.accessGrants.at(-1);
  assert.equal(replacement.user_ref,COLLAB_IDS.secondContributor);
  assert.deepEqual(replacement.resource_scope.item_refs,[COLLAB_IDS.authorityItem]);
  assert.equal(replacement.permitted_actions.includes('replace_recipient'),false);
});

test('CH-20: scope changes invalidate access/current assessments without deleting saved records',()=>{
  let s=approved();s=session(s);const grants=s.accessGrants.length;
  s.scopes[0]={...s.scopes[0],revision:s.scopes[0].revision+1,scope_revision:s.scopes[0].revision+1};
  assert.equal(client(s).allowed,false);assert.equal(s.accessGrants.length,grants);
  const ops=collaborationProjection(s,{audience:'ops',userId:'OPS',now:'2026-09-07T10:05:00Z'});
  assert.ok(ops.assessments.every(x=>x.currency!=='current'));
});

test('request feedback and referrals affect only the selected item and preserve whole-case readiness',()=>{
  let s=approved();s=act(s,'request_more',{itemId:COLLAB_IDS.authorityItem});
  assert.equal(itemOf(s).response_status,'needs_more_information');assert.equal(itemOf(s,COLLAB_IDS.ownershipItem).response_status,'open');
  s=act(s,'refer_review',{itemId:COLLAB_IDS.authorityItem,key:'refer-item'});
  assert.ok(s.workItems.some(x=>x.work_type==='collaboration_review'&&x.request_item_ref===COLLAB_IDS.authorityItem));
  assert.equal(collaborationProjection(s,{audience:'ops',userId:'OPS'}).readiness.result,'not_ready');
});

test('client questions repeat session, principal, scope and item-grant checks',()=>{
  let s=approved();
  assert.throws(()=>act(s,'refer_question',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'missing',itemId:COLLAB_IDS.authorityItem,text:'Please clarify this task.',key:'question-denied'}),/grant/i);
  s=session(s);
  s=act(s,'refer_question',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'Please clarify this task.',key:'question-allowed'});
  assert.ok(s.workItems.some(x=>x.work_type==='collaboration_question'&&x.request_item_ref===COLLAB_IDS.authorityItem));
  assert.throws(()=>act(s,'refer_question',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.ownershipItem,text:'Can I see the other task?',key:'question-other'}),/grant/i);
});

test('a scope revision change blocks dispatch until request scope and review are refreshed',()=>{
  const s=approved();s.scopes[0]={...s.scopes[0],revision:s.scopes[0].revision+1,scope_revision:s.scopes[0].revision+1};
  assert.throws(()=>act(s,'dispatch',{channel:'official_site_reference',key:'stale-scope-dispatch'}),/scope/i);
});

test('an existing purpose-specific requirement is reused by physical ID',()=>{
  const input=base(),existing={...input.requirements[0],id:'DEMO-CTT-001/requirement/existing-authority',subject_id:COLLAB_IDS.personT,principal_entity_id:'DEMO-CTT-001/entity/harbour',purpose_code:'coordinate_information'};
  input.requirements.push(existing);
  const s=createBatchB(input);
  assert.equal(itemOf(s).requirement_id,existing.id);
  assert.equal(s.requirements.filter(x=>x.purpose_code==='coordinate_information'&&x.subject_id===COLLAB_IDS.personT).length,1);
  assert.ok(collaborationProjection(s,{audience:'ops',userId:'OPS'}).requirements.some(x=>x.id===existing.id));
});

test('a grant is unusable when its recipient is no longer current or no longer assigns the item',()=>{
  let s=approved();s=session(s);
  s.requestRecipients.find(x=>x.id===COLLAB_IDS.recipientT).status='replaced';
  assert.equal(client(s).allowed,false);
  s=approved();s=session(s);s.requestRecipients.find(x=>x.id===COLLAB_IDS.recipientT).permitted_item_refs=[];
  assert.equal(client(s).allowed,false);
});

test('assessment binds the exact evidence revision linked to the item',()=>{
  let s=approved();s=act(s,'staff_submit',{itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,text:'Versioned synthetic basis.',key:'versioned'});
  const artifactId=s.evidence.at(-1).id;
  s=act(s,'release_artifact',{itemId:COLLAB_IDS.authorityItem,reference:artifactId,intakeStatus:'released',key:'version-release'});
  s=act(s,'link_evidence',{itemId:COLLAB_IDS.authorityItem,reference:artifactId,key:'version-link'});
  s=act(s,'release_artifact',{itemId:COLLAB_IDS.authorityItem,reference:artifactId,intakeStatus:'released',key:'version-change'});
  assert.throws(()=>act(s,'record_assessment',{itemId:COLLAB_IDS.authorityItem,reference:artifactId,key:'stale-evidence-assessment'}),/revision/i);
});

test('each accepted action appends a readiness snapshot without rewriting history',()=>{
  const s=seed(),prior=structuredClone(s.readinessSnapshots),next=act(s,'save_request',{text:'Snapshot continuity.'});
  assert.deepEqual(s.readinessSnapshots,prior);
  assert.equal(next.readinessSnapshots.length,prior.length+1);
  assert.equal(next.readinessSnapshots.at(-1).revision,next.case.revision);
  assert.equal(next.readinessSnapshots.at(-1).scope_revision,next.scopes[0].revision);
  assert.deepEqual(next.readinessSnapshots.at(-1).basis_event_refs,[next.auditEvents.at(-1).id]);
});

test('client projection validates every grant before including each item or receipt',()=>{
  let s=approved();s=session(s);
  const invalid={...structuredClone(s.accessGrants.find(x=>x.recipient_ref===COLLAB_IDS.recipientOther)),id:'forged-mixed-grant',user_ref:COLLAB_IDS.personT,status:'limited_active'};
  s.accessGrants.push(invalid);
  assert.deepEqual(client(s).items.map(x=>x.id),[COLLAB_IDS.authorityItem]);
});

test('recipient replacement requires current review/config and an item owned by the old recipient',()=>{
  let s=approved();s=session(s,COLLAB_IDS.secondContributor);
  assert.throws(()=>act(s,'replace_recipient',{recipientId:COLLAB_IDS.recipientT,userId:COLLAB_IDS.secondContributor,itemId:COLLAB_IDS.ownershipItem,key:'replace-wrong-item'}),/recipient|item/i);
  const invalidConfig=structuredClone(s);invalidConfig.demoConfig.batchB.reviews.disclosure=false;
  assert.throws(()=>act(invalidConfig,'replace_recipient',{recipientId:COLLAB_IDS.recipientT,userId:COLLAB_IDS.secondContributor,itemId:COLLAB_IDS.authorityItem,key:'replace-no-review'}),/review/i);
  const forged={...structuredClone(s.accessGrants.find(x=>x.recipient_ref===COLLAB_IDS.recipientT)),id:'mixed-invalid-old-recipient',user_ref:COLLAB_IDS.secondContributor,resource_scope:{request_id:COLLAB_IDS.request,item_refs:[COLLAB_IDS.authorityItem]}};
  s.accessGrants.push(forged);
  assert.deepEqual(client(s,COLLAB_IDS.secondContributor).items.map(x=>x.id),[COLLAB_IDS.ownershipItem]);
  s=act(s,'replace_recipient',{recipientId:COLLAB_IDS.recipientT,userId:COLLAB_IDS.secondContributor,itemId:COLLAB_IDS.authorityItem,key:'replace-current'});
  assert.equal(s.requestRecipients.find(x=>x.id===COLLAB_IDS.recipientT).status,'replaced');
  assert.deepEqual(client(s,COLLAB_IDS.secondContributor).items.map(x=>x.id).sort(),[COLLAB_IDS.authorityItem,COLLAB_IDS.ownershipItem].sort());
});

test('old-scope evidence cannot be linked after request scope is saved and reviewed again',()=>{
  let s=approved();s=act(s,'staff_submit',{itemId:COLLAB_IDS.authorityItem,userId:COLLAB_IDS.personT,text:'Old scope evidence.',key:'old-scope-submit'});
  const artifact=s.evidence.at(-1);assert.equal(artifact.scope_revision,s.scopes[0].revision);
  s.scopes[0]={...s.scopes[0],revision:s.scopes[0].revision+1,scope_revision:s.scopes[0].revision+1};
  s=act(s,'save_request',{text:'Rebased request.',key:'rebase-request'});s=act(s,'review_request',{key:'review-rebased'});
  assert.equal(itemOf(s).scope_revision,s.scopes[0].revision);
  assert.throws(()=>act(s,'link_evidence',{itemId:COLLAB_IDS.authorityItem,reference:artifact.id,key:'link-old-scope'}),/scope/i);
});

test('idempotency permits exact logical replay but rejects key collisions before permissions',()=>{
  const s=seed(),action={type:'save_request',role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedRequestRevision:requestOf(s).revision,key:'fingerprint-key',text:'Exact payload.',rationale:'Reviewed synthetic purpose and current revisions.',now:'2026-09-07T10:00:00Z'};
  const changed=collaborationAction(s,action);
  assert.equal(collaborationAction(changed,{...action,expectedRevision:changed.case.revision,expectedRequestRevision:requestOf(changed).revision,now:'2026-09-07T11:00:00Z'}),changed);
  assert.throws(()=>collaborationAction(changed,{...action,text:'Different payload.',expectedRevision:changed.case.revision,expectedRequestRevision:requestOf(changed).revision}),/collision/i);
  assert.throws(()=>collaborationAction(changed,{...action,type:'start_session',role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'collision-session',reference:requestOf(changed).reference,expectedRevision:changed.case.revision,expectedRequestRevision:requestOf(changed).revision}),/collision/i);
});

test('submit_response uses current text directly and never substitutes an older saved draft',()=>{
  let direct=approved();direct=session(direct);
  direct=act(direct,'submit_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'Direct current response.',key:'direct-submit'});
  assert.equal(direct.submissions.at(-1).response_text,'Direct current response.');
  let edited=approved();edited=session(edited);edited=act(edited,'save_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'Saved response A.',key:'save-a'});
  edited=act(edited,'submit_response',{role:'ROLE-CLIENT',userId:COLLAB_IDS.personT,sessionId:'SESSION-person-t',itemId:COLLAB_IDS.authorityItem,text:'Typed response B.',key:'submit-b'});
  assert.equal(edited.submissions.at(-1).response_text,'Typed response B.');
  assert.equal(itemOf(edited).response_draft,'Typed response B.');
});
