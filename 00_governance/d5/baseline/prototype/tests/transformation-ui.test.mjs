import test from 'node:test';
import assert from 'node:assert/strict';
import {initialNavigation,navigate} from '../navigation.mjs';
import {screeningGraphHtml} from '../screening-graph.mjs';
import {specialistConditionHtml} from '../specialist-ui.mjs';
import {renderCollaboration} from '../collaboration-ui.mjs';
import {referenceHtml} from '../reference-ui.mjs';
import {transformationFor} from '../content.mjs';
import {registry} from '../references.mjs';
const renderer=await import('../transformation-ui.mjs').catch(()=>({}));
test('pilot output keeps six or seven work titles visible and comparison opt-in',()=>{
 assert.equal(typeof renderer.transformationHtml,'function');
 const single=renderer.transformationHtml({scene:'SCN-GAP'});
 assert.equal((single.match(/data-change-id=/g)||[]).length,6);
 assert.match(single,/data-view="target"/); assert.doesNotMatch(single,/data-view="current"/);
 const both=renderer.transformationHtml({scene:'SCN-MATCH',compare:true});
 assert.equal((both.match(/data-change-id=/g)||[]).length,7);
 assert.match(both,/data-view="current"/);assert.match(both,/data-view="target"/);
 assert.doesNotMatch(both,/<h[234][^>]*>D3-/);
});
test('renderer escapes input context, localises prose and prints all trace details',()=>{
 assert.equal(typeof renderer.transformationHtml,'function');
 const html=renderer.transformationHtml({scene:'SCN-GAP',locale:'zh-CN',print:true,context:{caseId:'<script>bad()</script>',scopeRevision:'"x'}});
 assert.match(html,/&lt;script&gt;bad\(\)&lt;\/script&gt;/);assert.doesNotMatch(html,/<script>/);
 assert.match(html,/同一输入/); assert.match(html,/data-provenance="current"/);assert.match(html,/data-provenance="target"/);assert.match(html,/data-provenance="reference"/);assert.match(html,/data-provenance="interpretation"/);
 assert.equal((html.match(/data-change-id=/g)||[]).length,6);
 assert.doesNotMatch(html,/<details(?![^>]* open)/);
 assert.match(html,/PPT-S1-SH/);assert.match(html,/trace-meta/);
 assert.match(html,/Capture &amp; validate evidence/);
 assert.doesNotMatch(html,/href="(?:file:|\/Users)/);
});
test('comparison and disclosures survive locale, references and product return without mutating input',()=>{
 const original=initialNavigation();let n=navigate(original,{type:'SCENE',id:'SCN-GAP'});
 n=navigate(n,{type:'TRANSFORMATION_COMPARE'});assert.equal(n.transformation.compare,true);
 n=navigate(n,{type:'TRANSFORMATION_DISCLOSURE',id:'D3-GAP-02',open:true});
 n=navigate(n,{type:'TRANSFORMATION_FOCUS',id:'D3-GAP-02'});
 n=navigate(n,{type:'COMPARE',value:'current'});
 const selected=structuredClone(n.transformation);
 n=navigate(n,{type:'REFERENCE',selected:'REFSRC-c87950d327fe'});n=navigate(n,{type:'LOCALE',value:'zh-CN'});n=navigate(n,{type:'REFERENCE_CLOSE'});
 n=navigate(n,{type:'PRODUCT',step:'gaps'});n=navigate(n,{type:'RETURN',destination:'scenario'});
 assert.deepEqual(n.transformation,selected);assert.equal(n.comparison,'current');assert.equal(n.locale,'zh-CN');assert.equal(n.modal,true);
 assert.equal(original.modal,false);assert.equal(original.transformation.compare,false);
 assert.equal(n.page,'studio');assert.equal(n.scenario,'SCN-GAP');
});
test('screening focus controls lead with real business names while retaining stable node selectors',()=>{
 const html=screeningGraphHtml({scene:'SCN-MATCH'});
 assert.doesNotMatch(html,/<button data-c-node="M01"[^>]*>M01<\/button>/);
 assert.match(html,/<button data-c-node="M01"[^>]*>[^<]+<small class="trace-meta">M01<\/small>/);
 assert.doesNotMatch(html,/<h4>M01 ·/);
});
test('canonical pilot aliases open registry records rather than an empty reference filter',()=>{
 const html=referenceHtml({scene:'SCN-GAP',selected:'REFSRC-c87950d327fe'});
 assert.match(html,/class="reference-card"/);assert.match(html,/ING/);assert.doesNotMatch(html,/No records match/);
});
test('every mapped pilot reference opens its source even when the registry binds another scene',()=>{
 let checked=0;
 for(const scene of ['SCN-GAP','SCN-MATCH'])for(const change of transformationFor(scene).changes)for(const ref of change.references){
  if(!ref.canonicalRef)continue;
  const before=navigate(initialNavigation(),{type:'SCENE',id:scene});
  const reference=navigate(before,{type:'REFERENCE',scene,node:null,selected:ref.canonicalRef});
  const html=referenceHtml({...reference.reference,locale:reference.locale});
  assert.match(html,/class="reference-card"/,`${change.id} / ${ref.alias} must open its globally mapped source`);
  const source=registry.sources.find(source=>source.source_id===ref.canonicalRef);
  assert.ok(source,`${ref.alias} maps to a registry source`);
  const renderedTitle=html.match(/<h3>(.*?)<\/h3>/)?.[1]?.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
  assert.equal(renderedTitle,source.title,`${ref.alias} opens the selected source, not another available card`);
  assert.doesNotMatch(html,/No records match this filter/,`${change.id} / ${ref.alias}`);
  assert.doesNotMatch(html,/href="(?:file:|\/Users)/);
  const back=navigate(reference,{type:'REFERENCE_CLOSE'});
  assert.equal(back.scenario,scene);assert.equal(back.locale,before.locale);assert.equal(back.modal,true);
  checked++;
 }
 assert.ok(checked>=13,'All repeated mapped uses across both pilots are exercised');
});
test('condition and denied client views keep business explanations ahead of diagnostic identifiers',()=>{
 const html=specialistConditionHtml({projection:{available:true,caseId:'CASE-X',scopeId:'CASE-X/scope',readiness:{result:'not_ready'},conditions:[{domain:'conflicts',owner_role_ref:'ROLE-CONFLICTS',blocking_scope:'branch',status:'pending'}]},domain:'conflicts'});
 assert.match(html,/<dt>Owner<\/dt><dd>Conflicts/);assert.match(html,/This specialist branch/);
 assert.doesNotMatch(html,/<dd>ROLE-CONFLICTS<\/dd>/);assert.match(html,/trace-meta[^>]*>CASE-X/);
 const denied=renderCollaboration({projection:{allowed:false,reason:'authenticated_session_required'},audience:'client'});
 assert.match(denied,/Access unavailable/);assert.match(denied,/<code class="trace-meta">authenticated_session_required/);
});
test('nested provenance disclosure remains open on locale rerender',()=>{
 let n=navigate(initialNavigation(),{type:'TRANSFORMATION_TRACE',id:'D3-GAP-02',open:true});
 n=navigate(n,{type:'LOCALE',value:'zh-CN'});
 const html=renderer.transformationHtml({scene:'SCN-GAP',locale:n.locale,...n.transformation});
 assert.match(html,/<details class="trace-details" data-trace-id="D3-GAP-02" open>/);
});
