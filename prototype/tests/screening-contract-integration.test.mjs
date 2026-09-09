import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBatchC,screeningAction,screeningProjection,C_IDS} from '../screening-engine.mjs';
import {graphProjection} from '../screening-graph.mjs';
import model from '../diagrams/batch-c/model.mjs';
import {selectReferences} from '../references.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const b=read('../../04_operating_model/batch-b/collaboration-snapshots.json');
const seed=()=>createBatchC(structuredClone(b.snapshots?.['B-coordination-assessed']??b['B-coordination-assessed']));
const action=(s,type,extra={})=>screeningAction(s,{type,role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:screeningProjection(s,{role:'ROLE-KYCOPS'}).inputRevisions,key:'controller-proof:'+type+':'+s.case.revision,rationale:'Synthetic review for source-qualified regression',at:'2026-09-07T12:00:00Z',...extra});
const result=()=>{let s=action(action(seed(),'prepare_preliminary'),'request_preliminary');return action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome:'completed'});};
test('RT-C03 confirmed coordination remains distinct from identity and trade/signing authority',()=>{
 const s=seed(),p=screeningProjection(s,{role:'ROLE-KYCOPS'});
 assert.ok(s.authorities.some(a=>a.action_type==='coordinate_information'&&a.status==='established_for_demo'));
 assert.ok(s.authorities.some(a=>a.action_type==='execute_agreement'&&a.status==='not_established'));
 assert.equal(p.facts.identity_sufficiency,'not_assessed');
 assert.equal(p.readiness.result,'not_ready');
});
test('RT-C19 population revision change preserves old results but invalidates reuse',()=>{
 const s=result(),historical=structuredClone(s.screeningResultSnapshots);
 s.screeningPopulations[0].population_revision++;
 const p=screeningProjection(s,{role:'ROLE-KYCOPS'});
 assert.deepEqual(s.screeningResultSnapshots,historical);
 assert.equal(p.coverageSummary.status,'incomplete');
 assert.ok(p.coverage.every(c=>c.currency_status!=='current'));
});
test('RT-C35 source-qualified dependency meanings and evidence aliases do not collide',()=>{
 const x=read('../../04_operating_model/batch-c/source-alias-crosswalk.json');
 assert.match(x.semantic_qualification['SRC-009:DEP-07'],/Credit→Legal/);
 assert.match(x.semantic_qualification['SRC-009:DEP-08'],/SRC-010:DEP-07 screening review.*SRC-010:DEP-08 independent EDD/);
 assert.notEqual(x.aliases['EV-ID-C01'],x.preserved['EV-A05']);
 assert.notEqual(C_IDS.finding,x.preserved['Entity A legacy finding']);
});
test('RT-C42 referral followed by identity collection retains two branches on one finding',()=>{
 let s=action(result(),'refer',{urgent:true});
 s=action(s,'request_identity',{gap:'Distinguishing identity evidence remains missing'});
 const p=screeningProjection(s,{role:'ROLE-KYCOPS'});
 assert.deepEqual(p.branches.map(x=>x.branch_type).sort(),['information_gap','referral']);
 assert.ok(p.branches.every(x=>x.finding_ref===C_IDS.finding));
 assert.equal(s.case.id,'DEMO-CTT-001');assert.equal(p.readiness.result,'not_ready');
});
test('RT-C47 actual graph action bindings match current role-specific predicates across entry and result',()=>{
 for(const s of [seed(),result()])for(const role of ['ROLE-KYCOPS','ROLE-REVIEWER','ROLE-FINCRIME']){
  const before=structuredClone(s),p=screeningProjection(s,{role});
  for(const family of model.families){const g=graphProjection(family.id,p.predicates,p.facts,p.actions);for(const n of g.nodes)if(n.action_ref){assert.ok(p.actions[n.action_ref],n.action_ref);assert.deepEqual(n.guard,p.actions[n.action_ref]);}}
  assert.deepEqual(s,before);
 }
});
test('RT-C48 every semantic node reference resolves to a scoped source or labelled interpretation',()=>{
 for(const f of model.families)for(const n of f.nodes){
  const refs=selectReferences({scene:f.scene,node:n.id});assert.ok(refs.length,n.id);
  for(const alias of n.reference_aliases)assert.ok(refs.some(r=>r.observation.observation_id.endsWith(':'+alias)||r.observation.observation_id===alias),n.id+':'+alias);
 }
});
