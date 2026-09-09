import test from 'node:test';import assert from 'node:assert/strict';
import model from '../diagrams/batch-c/model.mjs';
import {graphProjection,screeningGraphHtml} from '../screening-graph.mjs';
import {readFileSync} from 'node:fs';
test('RT-C48 all approved node and edge contracts retained, grouped without losing guards',()=>{
 assert.equal(model.families.length,3);
 assert.deepEqual(model.families.map(f=>f.nodes.length),[12,12,12]);
 assert.deepEqual(model.families.map(f=>f.edges.length),[16,21,17]);
 for(const f of model.families){assert.equal(new Set(f.groups.flatMap(g=>g.semantic_nodes)).size,12);for(const n of f.nodes){assert.ok(n.predicate_ref&&n.contract&&n.source_document==='SRC-016');assert.equal(n.forbidden_writes,'All business writes: presentation only');}}
});
test('RT-C47 graph reads exact predicate objects and never infers permissions from captions',()=>{
 const p={preliminary:{allowed:false,outcome:'unknown',reason_codes:['hold_unknown']}};
 const input=JSON.stringify(p),g=graphProjection('DG-C-POPULATION',p);
 assert.deepEqual(g.nodes.find(n=>n.id==='P03').guard,p.preliminary);
 assert.equal(JSON.stringify(p),input);
 assert.equal(g.nodes.find(n=>n.id==='P07').guard.allowed,false);
});
test('bilingual node titles preserve English internal slashes and Chinese labels',()=>{
 const n=model.families.find(f=>f.id==='DG-C-MATCH').nodes.find(n=>n.id==='M10');
 assert.equal(n.title_en,'Refer / maintain unresolved');assert.equal(n.title_zh,'移交或保留未决');
});
test('RT-C47 graph binds preparation and dispatch to their distinct actual action predicates',()=>{
 const actions={prepare_preliminary:{allowed:true,outcome:'allowed'},request_preliminary:{allowed:false,outcome:'blocked',reason_codes:['CURRENT_QUERY_PLAN_REQUIRED']},receive_result:{allowed:false,outcome:'blocked'}};
 const g=graphProjection('DG-C-POPULATION',{preliminary:actions.prepare_preliminary}, {},actions);
 assert.deepEqual(g.nodes.find(n=>n.id==='P03').guard,actions.prepare_preliminary);
 assert.deepEqual(g.nodes.find(n=>n.id==='P04').guard,actions.request_preliminary);
 assert.deepEqual(g.nodes.find(n=>n.id==='P05').guard,actions.receive_result);
});
test('RT-C32/63 print includes every semantic node despite active focus',()=>{
 const html=screeningGraphHtml({scene:'SCN-MATCH',focus:'M04',print:true});
 assert.equal((html.match(/data-semantic-node=/g)||[]).length,12);
 assert.match(html,/M12/);assert.doesNotMatch(html,/data-c-node=/);
});
test('RT-C50/60 canonical intrinsic image dimensions reserve space before locale assets load',()=>{
 const assets=JSON.parse(readFileSync(new URL('../diagrams/batch-c/active-manifest.json',import.meta.url)));
 assert.equal(assets.length,18);
 for(const a of assets){
  const svg=readFileSync(new URL('../diagrams/batch-c/'+a.svg,import.meta.url),'utf8').split('>')[0];
  const width=svg.match(/\bwidth="(\d+)"/)[1],height=svg.match(/\bheight="(\d+)"/)[1];
  const scene=model.families.find(f=>f.id===a.family).scene;
  const img=screeningGraphHtml({scene,mode:a.mode,locale:a.locale}).match(/<img\b[^>]+>/)[0];
  assert.ok(img.includes(`width="${width}"`),a.svg+' width reserves canonical geometry');
  assert.ok(img.includes(`height="${height}"`),a.svg+' height reserves canonical geometry');
 }
});
