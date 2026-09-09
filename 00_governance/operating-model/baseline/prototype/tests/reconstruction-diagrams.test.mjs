import test from 'node:test';import assert from 'node:assert/strict';
const module=await import('../reconstruction/diagram-specs.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
test('taxonomy diagram preserves group members and source node aliases without creating execution edges',()=>{
 assert.equal(typeof module.taxonomySpec,'function','D3A needs a real Archify taxonomy specification builder');
 const nodes=[{node_id:'CURRENT-BR03-M2.1-RULE',label:'Applicable requirements'},{node_id:'CURRENT-BR03-M2.3-SET',label:'Consolidate requirements'}];
 const {spec,aliases}=module.taxonomySpec({branch:'BR-03',title:'Requirements',side:'current',locale:'en-AU',nodes});
 assert.deepEqual(aliases,[{nodeId:'CURRENT-BR03-M2.1-RULE',graphNodeId:'CURRENT-BR03-M2-1-RULE'},{nodeId:'CURRENT-BR03-M2.3-SET',graphNodeId:'CURRENT-BR03-M2-3-SET'}]);
 assert.equal(spec.meta.animation,'none');assert.equal(spec.meta.quality_profile,'showcase');assert.equal(spec.components.length,3);
 assert.deepEqual(spec.connections.map(e=>e.label),['Contains work','Contains work']);assert.ok(spec.connections.every(e=>e.from==='ROOT-BR-03-current'&&e.variant==='default'));
});
test('graph alias collisions fail instead of merging different source nodes',()=>{
 assert.equal(typeof module.taxonomySpec,'function');
 assert.throws(()=>module.taxonomySpec({branch:'BR-03',title:'Requirements',side:'current',locale:'en-AU',nodes:[{node_id:'A.B',label:'One'},{node_id:'A-B',label:'Two'}]}),/collision/);
});
