import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {collaborationProjection} from '../collaboration-engine.mjs';import {renderCollaboration} from '../collaboration-ui.mjs';
const module=await import('../product-experience/request-context.mjs').catch(()=>({}));
const seed=()=>JSON.parse(readFileSync(new URL('../qa/operating-model/host/c-live-session.json',import.meta.url))).data;
test('D5 safe request bridge retains current role, principal and session and creates no grant',()=>{
 assert.equal(typeof module.productRequestContext,'function');const s=seed(),before=structuredClone(s);
 const client=module.productRequestContext(s,{role:'ROLE-CLIENT',current:{audience:'ops',userId:'DEMO-CTT-001/person/person-t',sessionId:'SESSION-CONTRACT-T'}});
 assert.equal(client.audience,'client');assert.equal(client.userId,'DEMO-CTT-001/person/person-t');assert.equal(client.sessionId,'SESSION-CONTRACT-T');assert.equal(client.roleBound,true);
 const p=collaborationProjection(s,{...client,now:'2026-09-07T11:00:00Z'});assert.equal(p.allowed,true);assert.equal(p.items.length,1);assert.equal(p.grants,undefined);assert.equal(p.evidence,undefined);
 const html=renderCollaboration({projection:p,audience:client.audience,tab:client.tab});assert.doesNotMatch(html,/review_request|dispatch|record_assessment|ownership-control/);assert.deepEqual(s,before);
});
test('D5 RM request bridge cannot emit Ops projection or write controls; client missing/revoked session stays denied',()=>{
 assert.equal(typeof module.productRequestContext,'function');const s=seed();
 const rm=module.productRequestContext(s,{role:'ROLE-RM',current:{audience:'ops',sessionId:'SESSION-CONTRACT-T'}}),rp=collaborationProjection(s,rm);assert.equal(rm.audience,'rm');assert.equal(rp.grants,undefined);assert.equal(rp.evidence,undefined);assert.doesNotMatch(renderCollaboration({projection:rp,audience:'rm'}),/review_request|dispatch|record_assessment/);
 const missing=module.productRequestContext(s,{role:'ROLE-CLIENT',current:{audience:'ops',sessionId:null,userId:null}});assert.equal(missing.userId,null);assert.equal(missing.sessionId,null);assert.equal(collaborationProjection(s,{...missing,now:'2026-09-07T11:00:00Z'}).allowed,false);
 const existing=module.productRequestContext(s,{role:'ROLE-CLIENT',current:{userId:'DEMO-CTT-001/person/person-t',sessionId:'SESSION-CONTRACT-T'}});s.accessGrants.forEach(g=>g.status='revoked');assert.equal(collaborationProjection(s,{...existing,now:'2026-09-07T11:00:00Z'}).allowed,false);
});
test('D5 role-bound context revalidation ignores stale Ops audience while preserving request/receipt context',()=>{
 assert.equal(typeof module.enforceProductRequestRole,'function');const x=module.enforceProductRequestRole({roleBound:true,audience:'ops',tab:'evidence',userId:'principal',sessionId:'session',requestId:'request'},'ROLE-CLIENT');assert.equal(x.audience,'client');assert.equal(x.tab,'tasks');assert.equal(x.userId,'principal');assert.equal(x.sessionId,'session');assert.equal(x.requestId,'request');
});
