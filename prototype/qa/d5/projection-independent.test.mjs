import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {productProgress,semanticStatus} from '../../product-experience/projection.mjs';
import {collaborationAction} from '../../collaboration-engine.mjs';
import {C_IDS,screeningProjection} from '../../screening-engine.mjs';
const seed=()=>JSON.parse(fs.readFileSync('prototype/qa/operating-model/host/c-live-session.json')).data;
test('D5U-07 never-started local result does not borrow finding queue timestamp',()=>{
 const p=productProgress(seed(),{role:'ROLE-KYCOPS',asOf:'2026-09-08T00:00:00Z'});
 assert.equal(p.steps.find(s=>s.id==='MATCH-06').timing.entered_at,null);
 assert.equal(p.steps.find(s=>s.id==='MATCH-06').timing.started_at,null);
});
test('D5U-13 a basis string without confirmed target kind cannot certify overdue',()=>{
 assert.equal(semanticStatus('overdue',{basis:'unqualified-reference'}).key,'unknown');
 assert.equal(semanticStatus('overdue',{basis:'estimated-window',baselineType:'estimate'}).key,'unknown');
});
test('D5U-37 reading every group never writes business state',()=>{
 const data=seed(),before=structuredClone(data);
 for(const viewingStep of ['MATCH-01','MATCH-02','MATCH-03','MATCH-04','MATCH-05','MATCH-06'])productProgress(data,{viewingStep,role:'ROLE-KYCOPS',asOf:'2026-09-08T00:00:00Z'});
 assert.deepEqual(data,before);
});
test('D5U-16 later intake quarantine invalidates current-assessment next action',()=>{
 const data=JSON.parse(fs.readFileSync('prototype/qa/d5/regression/c-regression/host-saved-session.json')).data,evidence=data.evidence.find(x=>x.alias==='EV-ID-C01'),branch=data.workItems.find(x=>x.branch_type==='information_gap');
 const changed=collaborationAction(data,{type:'release_artifact',role:'ROLE-KYCOPS',requestId:C_IDS.request,itemId:C_IDS.identityItem,expectedRevision:data.case.revision,expectedRequestRevision:data.informationRequests.find(x=>x.id===C_IDS.request).revision,expectedItemRevision:data.requestItems.find(x=>x.id===C_IDS.identityItem).revision,reference:evidence.id,intakeStatus:'quarantined',rationale:'Independent re-intake quarantine check; not a business approval.',key:'D5-QA-QUARANTINE',now:'2026-09-08T01:00:00Z'});
 assert.equal(screeningProjection(changed,{role:'ROLE-KYCOPS',branchId:branch.id,evidenceId:evidence.id}).actions.resume_branch.allowed,false);
 const p=productProgress(changed,{role:'ROLE-KYCOPS',asOf:'2026-09-08T02:00:00Z'}),step=p.steps[2];assert.equal(step.waiting_on_refs.includes('resume_current_review'),false);assert.doesNotMatch(step.next_action.label,/Resume review using the current purpose assessment/);assert.equal(p.clearance,'not_ready');
});
