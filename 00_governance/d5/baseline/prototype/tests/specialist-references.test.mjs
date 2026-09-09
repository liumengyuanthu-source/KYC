import test from 'node:test';
import assert from 'node:assert/strict';
import {selectReferences,registry} from '../references.mjs';
test('Credit version node returns inherited NIST and counterparty-credit records without duplicating observations',()=>{
 const refs=selectReferences({scene:'SCN-CREDIT',node:'D02-CONDITION'});
 assert.ok(refs.some(x=>x.observation.observation_id==='SRC-017:R19'));
 assert.ok(refs.some(x=>x.observation.observation_id==='SRC-017:R29'));
 assert.equal(new Set(registry.observations.map(x=>x.observation_id)).size,registry.observations.length);
 assert.equal(registry.observations.find(x=>x.observation_id==='SRC-017:R19').verification_origin,'inherited_research');
});
test('Parallel and hold nodes retain original process context and A-CDM as inspiration',()=>{
 const parallel=selectReferences({scene:'SCN-CONFLICTS',node:'D01-CONFLICTS'});
 assert.ok(parallel.some(x=>x.source.source_id==='SRC-007'));
 assert.ok(selectReferences({scene:'SCN-LEGAL',node:'D02-REVISION'}).some(x=>x.observation.observation_id==='SRC-017:R16'));
 assert.ok(selectReferences({scene:'SCN-LEGAL',node:'D03-UNKNOWN'}).some(x=>x.observation.observation_id==='SRC-017:R19'));
});
test('Scoped-hold interpretation does not imply process-map or A-CDM policy provenance',()=>{
 const refs=selectReferences({scene:'SCN-LEGAL',node:'D03-CASE'});
 assert.ok(!refs.some(x=>x.source.source_id==='SRC-007'));
 assert.ok(!refs.some(x=>x.observation.observation_id==='SRC-017:R16'));
});
