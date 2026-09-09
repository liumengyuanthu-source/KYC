import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createBatchA,batchAction,preparation,projectLenses,mediaIntent,selectMedia} from '../batch-a-engine.mjs';
import {readiness,act} from '../case-engine.mjs';
const base=JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/synthetic-case-fixture.json',import.meta.url)));
const seed=()=>createBatchA(base), hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const run=(s,type,extra={})=>batchAction(s,{type,role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,key:`${type}:${s.case.revision}`,rationale:'Synthetic purpose review',...extra});
const scoped=()=>run(run(seed(),'clarify_counterparty'),'record_working_scope');
test('RT-A01 / A17: A0 separates the group and parties; registry arrives only by event',()=>{
 let s=seed();assert.equal(s.scopes[0].counterparty_entity_id,null);assert.equal(s.entities.length,2);
 assert.deepEqual(s.evidence.filter(e=>e.receipt_status!=='missing').map(e=>e.alias).sort(),['EV-A01','EV-A02','EV-A03']);
 s=run(s,'receive_registry');assert.equal(s.evidence.find(e=>e.alias==='EV-A04')?.receipt_status,'received');assert.ok(s.auditEvents.some(e=>e.event_type==='source_result_received'));assert.ok(!s.evidence.some(e=>e.alias==='EV-A05'));
});
test('RT-A02 / A03: employment evidence never creates principal authority',()=>{
 const s=run(seed(),'assess_authority');const a=s.authorities.filter(x=>x.action_type);assert.equal(a.length,4);assert.equal(a.find(x=>x.action_type==='coordinate_information').status,'evidence_required');assert.equal(a.find(x=>x.action_type==='execute_agreement').status,'not_established');assert.equal(a.find(x=>x.action_type==='issue_trade_instruction').status,'not_assessed');assert.equal(s.naturalPersons[0].employer_entity_id,s.entities[1].id);
});
test('RT-A04 / A06 / A07: scope can be recorded with unresolved booking, not CDD or clearance',()=>{
 let s=run(seed(),'save_scope_draft',{fields:{business_purpose:'USD procurement risk'}});assert.equal(s.scopes[0].business_purpose,'USD procurement risk');s=run(run(s,'clarify_counterparty'),'record_working_scope');assert.equal(s.scopes[0].scope_status,'working_scope_recorded');assert.equal(s.scopes[0].booking_entity_ref,null);assert.equal(s.scopes[0].dd_level,null);assert.equal(s.entities[0].verification_status,'not_started');assert.equal(readiness(s).result,'not_ready');assert.equal(preparation(s).find(x=>x.id==='legal').status,'awaiting_input');
});
test('RT-A11 / A20: purpose gap and request are idempotent and artifacts immutable',()=>{
 const s=run(scoped(),'assess_authority'), original=hash(s.evidence);const a=run(s,'open_authority_gap'),b=run(a,'open_authority_gap');assert.equal(hash(a),hash(b));assert.equal(b.informationRequests.length,1);assert.equal(b.workItems.filter(x=>x.work_type==='authority_gap').length,1);assert.equal(hash(b.evidence),original);assert.equal(b.informationRequests[0].status,'draft');
});
test('RT-A12: source unavailable does not populate registry content',()=>{
 const s=seed();s.demoConfig.batchA.source_available=false;assert.throws(()=>run(s,'receive_registry'),/source/i);assert.equal(s.evidence.find(e=>e.alias==='EV-A04')?.receipt_status,'missing');assert.equal(s.entities[0].registration_number,null);
});
test('RT-A13: action layer rejects missing demo permission and authority',()=>{
 assert.throws(()=>run(seed(),'assess_authority',{role:'ROLE-CASEMGR'}),/permission/i);
 const s=seed();s.demoConfig.batchA.permissions['ROLE-KYCOPS']=[];assert.throws(()=>run(s,'record_working_scope'),/permission/i);
});
test('RT-A14 / A19: stale writes reject and context edits invalidate dependent currency',()=>{
 let s=scoped();const old=s.scopes[0].revision;s.decisions.push({id:'historical-decision',revision:1,currency:'current',input_revisions:{[s.scopes[0].id]:old}});s=run(s,'save_scope_draft',{fields:{business_purpose:'Revised procurement context'}});assert.equal(s.decisions.at(-1).currency,'needs_review');assert.throws(()=>run(s,'record_working_scope',{expectedScopeRevision:old}),/revision/i);assert.equal(s.scopes[0].business_purpose,'Revised procurement context');
});
test('RT-A08 / A18: unknown applicability and holds fail closed per task',()=>{
 let s=scoped();assert.equal(preparation(s).find(x=>x.id==='requirements').status,'ready_for_preparation');assert.equal(preparation(s).find(x=>x.id==='credit').status,'awaiting_input');s.demoConfig.batchA.holds=[{scope:'case',status:'unknown'}];assert.ok(preparation(s).every(x=>x.status==='awaiting_input'));s.clearanceConditions=[];assert.equal(readiness(s).result,'not_ready');
});
test('RT-A15: Three Lens projections share one snapshot; shadow cannot mutate mainline',()=>{
 const s=scoped(), before=hash(s),p=projectLenses(s);assert.equal(p.outcome.snapshot_ref,p.work.snapshot_ref);assert.equal(p.work.snapshot_ref,p.assurance.snapshot_ref);const shadow=structuredClone(s);shadow.scopes[0].business_purpose='Shadow';projectLenses(shadow);assert.equal(hash(s),before);
});
test('RT-A10 / A21: Next and media signals are presentation-only, unauthorized intent ignored',()=>{
 const s=scoped(), before=hash(s);let nav={beat:0};for(const type of ['media_started','next','next','media_finished','approve_client'])nav=mediaIntent(nav,{type},'SCN-SCOPE');assert.equal(hash(s),before);assert.equal(nav.approved,undefined);assert.ok(nav.beat>0);
});
test('RT-A27: candidate revision never overrides specifically approved asset revision',()=>{
 const approved={asset_id:'DMO-A01',asset_revision:1,promotion_status:'approved_for_mainline',review_ref:'review-1',preview_file:'approved.html'};const candidate={...approved,asset_revision:2,promotion_status:'candidate',review_ref:null,preview_file:'candidate.html'};assert.equal(selectMedia([approved,candidate],'DMO-A01')?.asset_revision,1);assert.equal(selectMedia([candidate],'DMO-A01'),null);
});
test('Earlier A0 cannot reuse a registry that has not arrived or confirm an unresolved scope',()=>{
 let s=seed();assert.throws(()=>act(s,{type:'confirm_requirements',role:'ROLE-KYCOPS',expectedRevision:1,key:'early'}),/scope/i);
 s=scoped();s=act(s,{type:'confirm_requirements',role:'ROLE-KYCOPS',expectedRevision:s.case.revision,key:'requirements'});assert.throws(()=>act(s,{type:'reuse_identity',role:'ROLE-KYCOPS',rationale:'review',expectedRevision:s.case.revision,key:'early-reuse'}),/received/i);
});
test('RT-A08: completed preparation does not satisfy conflicts or another case condition',()=>{
 const s=scoped();s.workItems.push({id:'synthetic-conflicts-prep',revision:1,status:'completed',scenario_id:'SCN-CONFLICTS'});assert.equal(readiness(s).result,'not_ready');assert.notEqual(s.clearanceConditions.find(c=>c.domain==='conflicts').status,'satisfied');assert.equal(s.demoConfig.batchA.credit_applicability,'unknown');
});
test('RT-A14: entity review invalidates a decision bound to the prior entity revision',()=>{
 let s=run(scoped(),'receive_registry');s.decisions.push({id:'entity-dependent',revision:1,currency:'current',input_revisions:{[s.entities[0].id]:s.entities[0].revision}});s=run(s,'review_entity');assert.equal(s.decisions.at(-1).currency,'needs_review');
});
