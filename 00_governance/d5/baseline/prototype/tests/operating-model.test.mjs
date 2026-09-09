import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const source=JSON.parse(await readFile(new URL('../../00_sources/d4/Clear_to_Trade_D4_Action_Assessments_v0.1.json',import.meta.url)).catch(()=>readFile('/Users/christinaliu/Downloads/Clear_to_Trade_D4_Action_Assessments_v0.1.json')));
const module=await import('../operating-model/model.mjs').catch(()=>null);
test('projection keeps a human gate despite high adaptive need and derives scores without replacing missing values',()=>{
 assert.ok(module,'Read-only projection is available');
 const p=module.projectOperating(source);assert.equal(p.actions.length,17);
 const human=p.actions.find(a=>a.action_id==='D4A-MATCH-05-02');assert.equal(human.adaptive_need,11);assert.equal(human.test_boundary,4);assert.equal(human.execution,'HUMAN');
 assert.equal(p.actions.find(a=>a.action_id==='D4A-MATCH-04-01').execution,'SEMANTIC_SKILL');
 const changed=structuredClone(source);delete changed.atomic_actions.find(a=>a.action_id==='D4A-MATCH-04-01').score_values.C;
 const missing=module.projectOperating(changed).actions.find(a=>a.action_id==='D4A-MATCH-04-01');assert.equal(missing.score_values.C,null);assert.equal(missing.adaptive_need,null);
 assert.throws(()=>p.actions.push({}),TypeError);
});
test('full source reuse distinguishes supporting human judgment and executable uses and retains every exact source',()=>{
 assert.ok(module,'Read-only projection is available');const p=module.projectOperating(source);
 assert.equal(p.reuse.filter(x=>x.action_ref==='D4A-MATCH-05-02')[0].relation,'supports');
 assert.equal(p.reuse.filter(x=>x.action_ref==='D4A-MATCH-04-01')[0].relation,'executes');
 assert.equal(p.reuse.length,source.atomic_actions.flatMap(a=>a.skill_refs).length);
 for(const a of p.actions){assert.deepEqual(a.current_source_refs,source.atomic_actions.find(x=>x.action_id===a.action_id).current_source_refs);assert.ok(a.currentSources.every(x=>x.source_id&&x.shape_id));}
 assert.equal(p.groups.flatMap(g=>g.actions).length,17);assert.equal(new Set(p.groups.flatMap(g=>g.actions)).size,17);
});
test('unknown or denied role cannot obtain author projection',()=>{assert.ok(module);for(const role of ['ROLE-RM','ROLE-CLIENT','nonsense',null])assert.equal(module.operatingProjection({role}),null);assert.ok(module.operatingProjection({role:'ROLE-KYCOPS'}));});
test('D3 materiality and attribute-comparison nodes open their exact substantive action, not a preceding preparation step',()=>{assert.ok(module);assert.equal(module.actionFromChange('D3-MATCH-05'),'D4A-MATCH-05-02');assert.equal(module.actionFromChange('D3-MATCH-02'),'D4A-MATCH-02-02');assert.equal(module.actionFromChange('D3-MATCH-OLD'),null);});
