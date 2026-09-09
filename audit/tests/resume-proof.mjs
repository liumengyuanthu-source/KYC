import assert from 'node:assert/strict';import fs from 'node:fs';
import {probe,finish} from './harness.mjs';
import {screeningProjection} from '../../prototype/screening-engine.mjs';
import {productProgress} from '../../prototype/product-experience/projection.mjs';
const seed=JSON.parse(fs.readFileSync('prototype/qa/d5/regression/c-regression/host-saved-session.json'));
seed.navigation={...seed.navigation,page:'product',step:'screening-evidence',role:'ROLE-KYCOPS',locale:'en-AU',modal:false,mode:'explore',d5:{}};
await probe(['D5-08','D5-23','D5-25','D5U-06','D5U-07','D5U-16'],'assessed-identity-resumes-native-review',async h=>{
 const s=h.before.data,b=s.workItems.find(w=>w.branch_type==='information_gap'),e=s.evidence.find(x=>x.alias==='EV-ID-C01');assert.equal(screeningProjection(s,{role:'ROLE-KYCOPS',branchId:b.id,evidenceId:e.id}).actions.resume_branch.allowed,true);
 const button=h.page.locator('[data-action="c-action"][data-value="resume_branch"]');assert.equal(await button.isDisabled(),false,'D5 host must retain the native eligible resume action');
 await h.page.locator('#screening-rationale').fill('Resume review of the insufficient identity evidence; no exclusion or clearance.');await button.click();
 const next=(await h.state()).data;assert.equal(next.workItems.find(x=>x.id===b.id).status,'in_review');assert.equal(next.screeningReviewDecisions.length,s.screeningReviewDecisions.length);assert.deepEqual(next.clearanceConditions,s.clearanceConditions);
 const p=productProgress(next,{role:'ROLE-KYCOPS',asOf:new Date().toISOString()}),step=p.steps.find(x=>x.id==='MATCH-03');assert.notEqual(step.state,'waiting');assert.ok(!step.waiting_on_refs.includes('purpose_assessment'));
 for(const type of ['notification_dispatched','screening_identity_evidence_received','screening_evidence_use_assessed','screening_review_resumed'])assert.ok(p.events.some(x=>x.type===type),type);
 assert.equal(p.clearance,'not_ready');
},{seed});
await finish();
