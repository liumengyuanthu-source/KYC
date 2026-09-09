import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const sourceBytes=fs.readFileSync('00_sources/d4/Clear_to_Trade_D4_Action_Assessments_v0.1.json');
const source=JSON.parse(sourceBytes);source.sha256=crypto.createHash('sha256').update(sourceBytes).digest('hex');
const file='00_sources/d5/Clear_to_Trade_D5_Product_Experience_Bindings_v0.2.json';
const binding=JSON.parse(fs.readFileSync(file));
assert.equal(binding.metadata.source_sha256,source.sha256);
assert.deepEqual(binding.action_presentations.map(x=>x.action_ref).sort(),source.atomic_actions.map(x=>x.action_id).sort());
const crosswalk=binding.action_presentations.map(x=>{
 const action=source.atomic_actions.find(a=>a.action_id===x.action_ref),parent=source.parent_work_assessments.find(a=>a.change_id===x.parent_change_ref);
 assert.ok(parent);assert.equal(x.source_primary_executor,action.primary_executor);assert.deepEqual(x.source_skill_refs,action.skill_refs);
 assert.equal(x.scenario_ref,action.scenario_id);assert.equal(x.workflow_ref,action.workflow_id);
 assert.deepEqual(x.current_ppt_source_refs,parent.source_change.current_source_refs);assert.deepEqual(x.target_ppt_source_refs,parent.source_change.target_source_refs);
 return {action_ref:x.action_ref,parent_work_ref:x.parent_change_ref,scenario_ref:x.scenario_ref,workflow_ref:x.workflow_ref,surface_ref:x.primary_surface_ref,pilot:x.scenario_ref==='SCN-MATCH',source_reads:x.source_reads,source_outputs:x.source_outputs,current_ppt_refs:x.current_ppt_source_refs,target_ppt_refs:x.target_ppt_source_refs,source_issue_refs:parent.source_issue_refs,source_status:'D5 author presentation over D4 design decomposition; not bank-approved policy or deployed action',implementation_claim:'Pilot bindings require actual host evidence; remaining scenarios not rolled out'};
});
fs.writeFileSync('00_governance/d5/source-crosswalk.json',JSON.stringify({source_sha256:source.sha256,binding_sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),actions:crosswalk.length,parents:new Set(crosswalk.map(x=>x.parent_work_ref)).size,scenes:new Set(crosswalk.map(x=>x.scenario_ref)).size,crosswalk},null,2));
fs.writeFileSync('00_governance/d5/acceptance-catalogue.json',JSON.stringify(binding.test_catalogue,null,2));
console.log({actions:crosswalk.length,parents:new Set(crosswalk.map(x=>x.parent_work_ref)).size,scenes:new Set(crosswalk.map(x=>x.scenario_ref)).size,match:crosswalk.filter(x=>x.pilot).length,tests:binding.test_catalogue.length});
