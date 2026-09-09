import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {productProgress} from '../product-experience/projection.mjs';
import {screeningAction,screeningProjection,C_IDS} from '../screening-engine.mjs';
import {collaborationAction} from '../collaboration-engine.mjs';
import {productWorkspaceHtml} from '../product-experience/ui.mjs';

const journey=name=>JSON.parse(readFileSync(new URL(`../../audit/screenshots/actual/journey/${name}.en-AU.state.json`,import.meta.url))).data;
const render=(data,role='ROLE-KYCOPS',locale='en-AU')=>productWorkspaceHtml({progress:productProgress(data,{role}),role,locale,preference:{enabled:[],order:[],collapsed:[]}});
const primaryCount=html=>(html.match(/class="primary"/g)||[]).length;
const hero=html=>html.match(/<div class="d5-issue">[\s\S]*?<\/div>/)?.[0]||'';
const quarantine=(data,evidenceId,at,key)=>collaborationAction(data,{type:'release_artifact',role:'ROLE-KYCOPS',requestId:C_IDS.request,itemId:C_IDS.identityItem,reference:evidenceId,intakeStatus:'quarantined',expectedRevision:data.case.revision,expectedRequestRevision:data.informationRequests.find(x=>x.id===C_IDS.request).revision,expectedItemRevision:data.requestItems.find(x=>x.id===C_IDS.identityItem).revision,key,rationale:'Recheck intake against the changed artifact',now:at});

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

test('D5 focus and selection styles use the declared blue token',()=>{
 const css=readFileSync(new URL('../product-experience/product-experience.css',import.meta.url),'utf8');
 assert.doesNotMatch(css,/var\(--accent\)/);
 assert.match(css,/focus-visible\{outline:2px solid var\(--blue\)/);
 assert.match(css,/button\[aria-pressed=true\]\{border-color:var\(--blue\);box-shadow:inset 0 -2px var\(--blue\)/);
});

test('purpose assessment is entered through the explicit evidence panel rather than a generic write command',()=>{
 const html=render(journey('identity.assessed'));
 assert.doesNotMatch(html,/data-action="c-action" data-value="assess_identity"/);
 assert.match(html,/data-action="c-back-review" data-value="screening-evidence"/);
});

test('quarantined evidence invalidates the old assessment in the rendered hero',()=>{
 const data=journey('identity.assessed'),evidenceId=data.evidence.at(-1).id,stale=quarantine(data,evidenceId,'2026-09-08T11:30:00Z','GUIDANCE-STALE-BEFORE'),html=render(stale);
 assert.match(html,/Current problem: identity evidence inputs changed after the last assessment/);
 assert.match(html,/Next actor: KYC Operations/);assert.match(html,/Recheck intake release, evidence linking and reassess for this purpose/);
 assert.doesNotMatch(html,/current purpose assessment is insufficient|Await an authorised reviewer/);assert.equal(primaryCount(html),0);
 assert.match(render(stale,'ROLE-KYCOPS','zh-CN'),/上次评估后身份资料输入已变更/);
});

test('quarantine after resume supersedes reviewer outcome guidance in the rendered hero',()=>{
 const data=journey('identity.assessed'),evidenceId=data.evidence.at(-1).id,branchId=data.workItems.find(x=>x.branch_type==='information_gap').id;
 const resumed=screeningAction(data,{type:'resume_branch',role:'ROLE-KYCOPS',branchId,key:'GUIDANCE-RESUME-BEFORE-STALE',expectedRevision:data.case.revision,expectedScopeRevision:data.scopes[0].revision,expectedInputRevisions:screeningProjection(data,{role:'ROLE-KYCOPS'}).inputRevisions,rationale:'Resume against current assessed input',at:'2026-09-08T12:00:00Z'});
 const stale=quarantine(resumed,evidenceId,'2026-09-08T12:30:00Z','GUIDANCE-STALE-AFTER'),html=render(stale,'ROLE-FINCRIME'),guidance=hero(html);
 assert.match(guidance,/identity evidence inputs changed after the last assessment/);assert.match(guidance,/Next actor: KYC Operations/);
 assert.doesNotMatch(guidance,/identity remains inconclusive after the current assessment|Refer to specialist|Resume review/);assert.equal(primaryCount(html),0);
});

test('current explicit Unknown assessment retains native Resume guidance',()=>{
 const data=journey('identity.assessed'),evidenceId=data.evidence.at(-1).id,branchId=data.workItems.find(x=>x.branch_type==='information_gap').id;
 const unknown=screeningAction(data,{type:'assess_identity',role:'ROLE-KYCOPS',branchId,evidenceId,sufficiency:'unknown',key:'GUIDANCE-CURRENT-UNKNOWN',expectedRevision:data.case.revision,expectedScopeRevision:data.scopes[0].revision,expectedInputRevisions:screeningProjection(data,{role:'ROLE-KYCOPS'}).inputRevisions,rationale:'Record the explicit current Unknown outcome for this purpose',at:'2026-09-08T11:30:00Z'}),html=render(unknown);
 assert.equal(screeningProjection(unknown,{role:'ROLE-KYCOPS',branchId,evidenceId}).actions.resume_branch.allowed,true);
 assert.match(html,/Current problem: the current purpose assessment records an Unknown outcome/);assert.match(html,/data-value="resume_branch"[^>]*class="primary"/);
 assert.doesNotMatch(html,/needs a current purpose assessment/);assert.equal(primaryCount(html),1);
 assert.match(render(unknown,'ROLE-KYCOPS','zh-CN'),/当前用途评估记录为未知结果/);
 const progress=productProgress(unknown,{role:'ROLE-KYCOPS'});progress.projection.actions.resume_branch={...progress.projection.actions.resume_branch,allowed:false,outcome:'denied',reason_codes:['ROLE_NOT_ALLOWED']};
 const denied=productWorkspaceHtml({progress,role:'ROLE-REVIEWER',locale:'en-AU',preference:{enabled:[],order:[],collapsed:[]}});
 assert.match(hero(denied),/current purpose assessment records an Unknown outcome/);assert.match(hero(denied),/Await a configured operations reviewer/);assert.doesNotMatch(hero(denied),/needs a current purpose assessment/);assert.equal(primaryCount(denied),0);
});
