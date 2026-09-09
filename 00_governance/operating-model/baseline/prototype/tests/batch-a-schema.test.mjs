import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate} from '../../04_operating_model/round-a/validate-spine.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/'+p,import.meta.url)));
const schema=read('batch-a-spine.schema.json'),snapshots=read('batch-a-story-snapshots.json').snapshots;
for(const [name,s] of Object.entries(snapshots))test(name+' conforms to additive prototype schema',()=>validate(s,schema,'$',schema));
test('RT-A26: qualified DEP-05 resolves to distinct meanings',()=>{const rows=read('batch-a-dependency-crosswalk.json');assert.equal(rows.find(r=>r.source_ref==='SRC-009'&&r.raw_id==='DEP-05').canonical_dependency_id,'SRC-010:DEP-09');assert.equal(rows.find(r=>r.source_ref==='SRC-010'&&r.raw_id==='DEP-05').canonical_dependency_id,'SRC-010:DEP-05');});
test('Schema rejects arbitrary action status and non-synthetic records',()=>{const s=structuredClone(snapshots['SNAP-A0']);s.authorities.find(a=>a.action_type).status='approved';assert.throws(()=>validate(s,schema,'$',schema),/enum/);s.authorities.find(a=>a.action_type).status='not_established';s.evidence[0].simulation_flag=false;assert.throws(()=>validate(s,schema,'$',schema),/const/);});
test('Batch A object links resolve in the same case, including the retained readiness output ID',()=>{
 const keys=['case_scope_id','entity_id','person_id','principal_entity_id','employer_entity_id','from_entity_id','to_entity_id','evidence_id','authority_ref','subject_ref','input_refs','output_refs','evidence_use_refs'];
 for(const s of Object.values(snapshots)){const records=[s.case,...Object.values(s).filter(Array.isArray).flat()],map=new Map(records.map(r=>[r.id,r]));assert.equal(map.size,records.length);for(const r of records){assert.equal(r.case_id,'DEMO-CTT-001');for(const k of keys)if(r[k])for(const ref of Array.isArray(r[k])?r[k]:[r[k]])assert.ok(map.has(ref),`${r.id}.${k} unresolved ${ref}`);}}
});
