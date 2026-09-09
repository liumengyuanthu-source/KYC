import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {transformationBinding} from '../transformations/diagram-bindings.mjs';
import model from '../diagrams/batch-c/model.mjs';
// Break: an alias is attached to a nonexistent or wrong family node and cannot be focused.
test('D3 pilot changes resolve to the existing Archify and semantic graph nodes',()=>{
 const gap=JSON.parse(fs.readFileSync('prototype/diagrams/batch-b/client-collaboration.en-AU.v1.1.json'));
 const match=JSON.parse(fs.readFileSync('prototype/diagrams/batch-c/DG-C-MATCH.Target.en-AU.r02.json'));
 const semantic=model.families.find(x=>x.scene==='SCN-MATCH').nodes;
 for(let i=1;i<=6;i++){const b=transformationBinding(`D3-GAP-0${i}`);assert.equal(b.scene,'SCN-GAP');assert.ok(b.archifyNodes.every(id=>gap.nodes.some(n=>n.id===id)));}
 for(let i=1;i<=7;i++){const b=transformationBinding(`D3-MATCH-0${i}`);assert.equal(b.scene,'SCN-MATCH');assert.ok(b.archifyNodes.every(id=>match.nodes.some(n=>n.id===id)));assert.ok(b.semanticNodes.every(id=>semantic.some(n=>n.id===id)));}
 assert.deepEqual(transformationBinding('D3-MATCH-06').semanticNodes,['M08','M09','M10']);
 assert.deepEqual(transformationBinding('D3-MATCH-06').archifyNodes,['decision','referral']);
 assert.deepEqual(transformationBinding('D3-GAP-03').archifyNodes,['grant']);
 assert.equal(transformationBinding('D3-UNKNOWN'),null);
 for(const id of ['D3-GAP-01','D3-MATCH-01'])assert.ok(fs.existsSync('prototype/'+transformationBinding(id).asset.replace(/^\.\//,'')),`Missing embedded asset for ${id}`);
});
