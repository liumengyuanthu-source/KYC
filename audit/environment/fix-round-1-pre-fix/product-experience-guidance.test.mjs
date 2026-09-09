import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {productProgress} from '../product-experience/projection.mjs';
import {screeningAction,screeningProjection} from '../screening-engine.mjs';
import {productWorkspaceHtml} from '../product-experience/ui.mjs';

const journey=name=>JSON.parse(readFileSync(new URL(`../../audit/screenshots/actual/journey/${name}.en-AU.state.json`,import.meta.url))).data;
const render=(data,role='ROLE-KYCOPS',locale='en-AU')=>productWorkspaceHtml({progress:productProgress(data,{role}),role,locale,preference:{enabled:[],order:[],collapsed:[]}});
const primaryCount=html=>(html.match(/class="primary"/g)||[]).length;

test('guidance requests the precise gap only before an identity branch exists',()=>{
 const data=journey('match.scene'),before=structuredClone(data),html=render(data);
 assert.match(html,/FX forward for future USD procurement payments/);
 assert.match(html,/Current problem: identity remains inconclusive/);
 assert.match(html,/Next actor: KYC Operations/);
 assert.match(html,/data-value="request_identity"[^>]*class="primary"/);
 assert.equal(primaryCount(html),1);assert.deepEqual(data,before);
});

test('guidance waits on the client after dispatch without asking again',()=>{
 const data=journey('identity.request'),before=structuredClone(data),html=render(data);
 assert.match(html,/Current problem: the identity request is awaiting the client response/);
 assert.match(html,/Next actor: Client contributor/);
 assert.doesNotMatch(html,/Next: prepare the exact gap, request information or refer/);
 assert.doesNotMatch(html,/data-value="request_identity"[^>]*class="primary"/);
 assert.equal(primaryCount(html),0);assert.deepEqual(data,before);
});

test('guidance sends received but unassessed evidence to current intake and purpose review',()=>{
 const data=journey('identity.received'),before=structuredClone(data),html=render(data);
 assert.match(html,/Current problem: received identity evidence is not yet ready for a current purpose assessment/);
 assert.match(html,/Next actor: KYC Operations/);
 assert.doesNotMatch(html,/request again/i);assert.doesNotMatch(html,/data-value="request_identity"[^>]*class="primary"/);
 assert.equal(primaryCount(html),0);assert.deepEqual(data,before);
});

test('guidance makes Resume the sole primary task after a current insufficient assessment',()=>{
 const data=journey('identity.assessed'),before=structuredClone(data),html=render(data);
 assert.match(html,/Current problem: the current purpose assessment is insufficient/);
 assert.match(html,/data-value="resume_branch"[^>]*class="primary"/);
 assert.doesNotMatch(html,/data-value="request_identity"[^>]*class="primary"/);
 assert.equal(primaryCount(html),1);assert.deepEqual(data,before);
});

test('resumed inconclusive identity recommends only an allowed reviewer action',()=>{
 const data=journey('identity.assessed'),branchId=data.workItems.find(x=>x.branch_type==='information_gap').id;
 const resumed=screeningAction(data,{type:'resume_branch',role:'ROLE-FINCRIME',branchId,key:'GUIDANCE-RESUME',expectedRevision:data.case.revision,expectedScopeRevision:data.scopes[0].revision,expectedInputRevisions:screeningProjection(data,{role:'ROLE-FINCRIME'}).inputRevisions,rationale:'Resume against the current insufficient identity assessment; no clearance.',at:'2026-09-08T12:00:00Z'}),before=structuredClone(resumed),html=render(resumed,'ROLE-FINCRIME');
 assert.match(html,/Current problem: identity remains inconclusive after the current assessment/);
 assert.match(html,/data-value="record_unresolved"[^>]*class="primary"/);
 assert.match(html,/configured reviewer may record unresolved or referral only; this does not clear the case/);
 assert.equal(primaryCount(html),1);assert.deepEqual(resumed,before);
});

test('recorded unresolved result has no repeated-decision primary',()=>{
 const data=journey('review.unresolved'),before=structuredClone(data),html=render(data,'ROLE-FINCRIME');
 assert.match(html,/Current problem: an unresolved local identity result is recorded/);
 assert.match(html,/Next actor: Unassigned/);
 assert.doesNotMatch(html,/data-value="record_unresolved"[^>]*class="primary"/);
 assert.doesNotMatch(html,/data-value="refer"[^>]*class="primary"/);
 assert.equal(primaryCount(html),0);assert.deepEqual(data,before);
});

test('RM and Client projections remain safe and do not expose internal guidance',()=>{
 for(const role of ['ROLE-RM','ROLE-CLIENT']){const data=journey('review.unresolved'),before=structuredClone(data),html=render(data,role,'en-US');assert.doesNotMatch(html,/Current problem:|configured reviewer|record_unresolved|request_identity/);assert.match(html,/Email/);assert.equal(primaryCount(html),0);assert.deepEqual(data,before);}
});

test('guidance is localised for zh-CN and en-US',()=>{
 assert.match(render(journey('identity.assessed'),'ROLE-KYCOPS','zh-CN'),/当前问题: 当前用途评估仍不充分/);
 assert.match(render(journey('identity.assessed'),'ROLE-KYCOPS','en-US'),/Recommended next action: Resume review/);
});

test('SCN-READINESS bridges current C state to readonly clearance and retains active D condition routing',()=>{
 const source=readFileSync(new URL('../app.mjs',import.meta.url),'utf8');
 assert.match(source,/const currentCReadiness=scene\.id==='SCN-READINESS'&&!!data\.demoConfig\.batchC&&!active/);
 assert.match(source,/currentCReadiness\?'clearance':'condition'/);
 assert.match(source,/currentCReadiness\?L\('Open current readiness'/);
});

test('D5 focus and selection styles use the declared blue token',()=>{
 const css=readFileSync(new URL('../product-experience/product-experience.css',import.meta.url),'utf8');
 assert.doesNotMatch(css,/var\(--accent\)/);
 assert.match(css,/focus-visible\{outline:2px solid var\(--blue\)/);
 assert.match(css,/button\[aria-pressed=true\]\{border-color:var\(--blue\);box-shadow:inset 0 -2px var\(--blue\)/);
});
