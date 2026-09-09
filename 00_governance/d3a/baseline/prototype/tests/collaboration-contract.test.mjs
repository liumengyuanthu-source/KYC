import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readiness} from '../case-engine.mjs';
import {collaborationAction} from '../collaboration-engine.mjs';
const read=name=>JSON.parse(readFileSync(new URL('../../04_operating_model/batch-b/'+name,import.meta.url)));
test('Batch B field contract and snapshots preserve one case and resolve item requirements',()=>{
 const contract=read('collaboration-contract.json'),snapshots=read('collaboration-snapshots.json');
 assert.equal(contract.status,'prototype_field_contract_not_production_schema');
 for(const s of Object.values(snapshots.snapshots)){
  assert.equal(s.case.id,'DEMO-CTT-001');
  for(const [collection,definition] of Object.entries(contract.collections)){
   assert.ok(Array.isArray(s[collection]),collection);
   for(const r of s[collection])for(const required of definition.required)assert.ok(Object.hasOwn(r,required),collection+'.'+required);
  }
  for(const item of s.requestItems)assert.ok(s.requirements.some(x=>x.id===item.requirement_id));
  assert.equal(s.scopes[0].booking_entity_ref,null);
  assert.equal(s.readinessSnapshots.at(-1).result,'not_ready');
 }
});
test('Field dictionary includes types, sensitivity, edit ownership, provenance and UI binding',()=>{
 const fields=read('field-dictionary.json');assert.ok(fields.length>100);
 for(const f of fields)for(const key of ['type','nullable','required_when','editable_by','validation','revision','sensitivity','provenance','ui_binding'])assert.ok(Object.hasOwn(f,key),f.field+'.'+key);
});
test('CH-27: adversarial all-local-items-complete fixture still cannot clear unresolved case conditions',()=>{
 const s=read('collaboration-snapshots.json').snapshots['B-coordination-assessed'];
 for(const item of s.requestItems)item.response_status='closed';
 for(const task of s.workItems)task.status='completed';
 assert.equal(readiness(s).result,'not_ready');
 assert.equal(s.scopes[0].booking_entity_ref,null);
 assert.ok(s.clearanceConditions.some(x=>x.status!=='satisfied'));
});
test('Recorded Batch B actions replay to the exact final shared-case snapshot',()=>{
 const fixture=read('collaboration-snapshots.json');
 const final=fixture.actions.reduce((state,action)=>collaborationAction(state,action),fixture.snapshots['B-entry']);
 assert.deepEqual(final,fixture.snapshots['B-coordination-assessed']);
});
