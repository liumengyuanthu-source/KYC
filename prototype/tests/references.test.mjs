import test from 'node:test';
import assert from 'node:assert/strict';
import { registry, selectReferences, referenceProjection } from '../references.mjs';
import { referenceHtml } from '../reference-ui.mjs';
test('RT-C52/55 imported qualified aliases retain observations and inherited status',()=>{
 assert.equal(registry.aliases.filter(x=>x.source_document==='SRC-017').length,36);
 assert.equal(registry.aliases.filter(x=>x.source_document==='SRC-016').length,5);
 assert.ok(registry.observations.every(x=>x.supported_statement&&x.verification_origin==='inherited_research'&&x.verified_at===null));
 assert.ok(registry.assets.length===19&&registry.assets.every(x=>x.local_path===null&&x.captured_at===null));
});
test('RT-C53/54 deduplication keeps observation identity and distinct versions/artifacts',()=>{
 const alias=(doc,id)=>registry.aliases.find(x=>x.source_document===doc&&x.local_ref_id===id);
 assert.equal(alias('SRC-017','R28').canonical_source_ref,alias('SRC-016','R-C03').canonical_source_ref);
 assert.notEqual(alias('SRC-017','R20').canonical_source_ref,alias('SRC-016','R-C05').canonical_source_ref);
 assert.notEqual(alias('SRC-017','R31').canonical_source_ref,alias('SRC-016','R-C01').canonical_source_ref);
});
test('RT-C56/57/58 source renderer is safe, scoped and never implies acquired media',()=>{
 const cards=selectReferences({scene:'SCN-MATCH'});
 assert.ok(cards.length>0&&cards.length<36);
 const html=referenceHtml({locale:'en-AU',scene:'SCN-MATCH'});
 assert.match(html,/noopener noreferrer/);assert.match(html,/no-referrer/);
 assert.doesNotMatch(html,/<iframe|<video|<script|<img|DEMO-CTT|Person T/);
 assert.match(html,/Not captured/);
 assert.deepEqual(referenceProjection({role:'Client'}),[]);
 assert.deepEqual(referenceProjection({role:'RM'}),[]);
});
test('RT-C59/60 filters and locale retain canonical title, alias and interpretation boundary',()=>{
 const en=referenceHtml({locale:'en-US',selected:'SRC-016:R-C05'});
 const zh=referenceHtml({locale:'zh-CN',selected:'SRC-016:R-C05'});
 for(const h of [en,zh]){assert.match(h,/HL7 FHIR R5/);assert.match(h,/SRC-016:R-C05/);assert.match(h,/inherited_research/);}
 assert.ok(selectReferences({kind:'cross_industry_pattern'}).every(x=>x.source.source_kind==='cross_industry_pattern'));
});
test('RT-C63 English print exposes inherited source status without opening a disclosure',()=>{
 const html=referenceHtml({locale:'en-AU',selected:'SRC-017:R18',print:true});
 assert.match(html,/<details open>/);
 assert.match(html,/官方搜索结果已核验；主站直接抓取受限/);
});
test('RT-C48/58 project-only node cards expose source gaps without bundling internal originals',()=>{
 const html=referenceHtml({locale:'en-AU',node:'M12',scene:'SCN-MATCH',print:true});
 assert.match(html,/SRC-016:S-C06/);assert.match(html,/Original P0\/P1 document not found/);
 assert.match(html,/approved_final_summary_only/);assert.doesNotMatch(html,/href=|\/Users\/|transcript|\.pptx/);
 assert.equal(selectReferences({kind:'project_source'}).length,4); // Three earlier summaries plus the source-qualified E M6/M8 observation.
});
