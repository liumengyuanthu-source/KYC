// Operating Model regression relocation; historical source/results preserved.
import assert from 'node:assert/strict';import fs from 'node:fs';
import {comparisonFor,mappings} from '../../../reconstruction/registry.mjs';
import {probe,finish,dir} from './host-harness.mjs';
const scenes=['SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE'];
const compare=async({click})=>click('rc-compare');
for(const scene of scenes)await probe(['UX-01','UX-02','UX-26'],scene+'.entry',async h=>{
 const {page,state,before}=h,summary=page.locator('#scenario-dialog');
 assert.equal(await summary.locator('[data-action="rc-compare"]').count(),1);
 assert.equal((await state()).navigation.reconstruction.panel,'scenario');
 await compare(h);const model=comparisonFor(scene),s=await state();
 assert.equal(s.navigation.reconstruction.branchId,model.branch.branch_id);assert.equal(s.navigation.reconstruction.mappingId,model.defaultMappingId);
 const body=await summary.innerText();for(const text of ['Entity A','Entity B','Person T','FX forward'])assert.ok(body.includes(text),text);
 assert.deepEqual(s.data,before.data);assert.equal(s.data.case.id,'DEMO-CTT-001');
},{scene});

for(const [scene,id] of [['SCN-REQUIREMENTS','MAP-D3-REQUIREMENTS-01'],['SCN-GAP','MAP-D3-GAP-05']])await probe([scene==='SCN-GAP'?'UX-04':'UX-03','UX-25'],id+'.members',async h=>{
 await compare(h);await h.click('rc-mode','compare');await h.click('rc-mapping',id);
 const m=mappings.find(m=>m.mapping_id===id),refs=[...m.before_node_refs,...m.after_node_refs];
 for(const ref of refs){const member=h.page.locator(`#scenario-dialog [data-node-id="${ref}"][data-mapping-member="true"]`);assert.ok(await member.count(),ref+' must be a highlighted group member');}
 assert.deepEqual((await h.state()).data,h.before.data);
},{scene});

for(const scene of ['SCN-SOURCE','SCN-GAP'])await probe(scene==='SCN-SOURCE'?['UX-05','UX-30']:['UX-05'],scene+'.proposal',async h=>{
 await compare(h);await h.click('rc-mode','compare');const id=scene==='SCN-SOURCE'?'MAP-D3-SOURCE-03':'MAP-D3-GAP-03';await h.click('rc-mapping',id);
 const model=mappings.find(m=>m.mapping_id===id);assert.deepEqual(model.before_node_refs,[]);
 const text=await h.page.locator('#scenario-dialog').innerText();assert.match(text,/no direct Current|no direct predecessor|no Current predecessor|context only|没有直接|无直接|上下文/i);
 if(scene==='SCN-SOURCE')assert.ok(await h.page.locator('[data-target-included="false"]').count(),'No candidate-claim editor target must be explicit');
 assert.deepEqual((await h.state()).data,h.before.data);
},{scene});

await probe(['UX-07','UX-08'],'control-and-hypothesis',async h=>{
 await compare(h);await h.click('rc-mode','compare');await h.click('rc-node','TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY');await h.click('rc-details');
 const text=await h.page.locator('#reconstruction-detail').innerText();assert.match(text,/no specific pain|no particular pain|no pain hypothesis|未记录特定痛点|未记录具体痛点|未为此节点指定痛点/i);
 assert.match(await h.page.locator('#scenario-dialog').innerText(),/hypothesis|假设/i);assert.deepEqual((await h.state()).data,h.before.data);
},{scene:'SCN-VALIDATE'});

await probe(['UX-09'],'filter-empty',async h=>{
 await compare(h);await h.page.locator('.rc-reader-options>summary').click();const filter=h.page.locator('#reconstruction-filter');
 if(await filter.evaluate(e=>e.tagName)==='SELECT'){
  const choices=await filter.locator('option').evaluateAll(es=>es.map(e=>({value:e.value,label:e.textContent})));
  const option=choices.find(c=>/proposed|新增/i.test(c.value+' '+c.label));assert.ok(option,'Expose a source change-type filter');await filter.selectOption(option.value);
 }else await filter.fill('NO_SUCH_D3A_WORK');
 await h.click('rc-filter');assert.match(await h.page.locator('#scenario-dialog').innerText(),/no matching|no mappings match|no changes|no work|没有匹配|无匹配/i);await h.click('rc-clear');
 assert.equal((await h.state()).navigation.reconstruction.branchId,'BR-03');assert.deepEqual((await h.state()).data,h.before.data);
});

await probe(['UX-10','UX-14','UX-16','UX-17','UX-25'],'references-history-locale',async h=>{
 await compare(h);await h.click('rc-mode','current');await h.click('rc-mapping','MAP-D3-REQUIREMENTS-03');await h.click('rc-view','focus');
 const origin=structuredClone((await h.state()).navigation.reconstruction);await h.click('rc-references');assert.equal((await h.state()).navigation.reconstruction.panel,'references');
 await h.language('zh-CN');await h.page.goBack();await h.page.waitForFunction(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).navigation.reconstruction.panel==='comparison');
 let s=await h.state();assert.equal(s.navigation.reconstruction.mappingId,origin.mappingId);assert.equal(s.navigation.reconstruction.mode,'current');assert.equal(s.navigation.locale,'zh-CN');assert.deepEqual(s.data,h.before.data);
 await h.page.goForward();await h.page.waitForFunction(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).navigation.reconstruction.panel==='references');
 await h.page.keyboard.press('Escape');await h.page.waitForFunction(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).navigation.reconstruction.panel==='comparison');
 assert.deepEqual((await h.state()).data,h.before.data);
});

await probe(['UX-14','UX-20','UX-25'],'selection-history-and-detail-scroll',async h=>{
 await compare(h);const count=await h.page.evaluate(()=>history.length),dialog=h.page.locator('#scenario-dialog');
 await h.click('rc-mode','compare');await h.click('rc-mapping','MAP-D3-REQUIREMENTS-03');await h.click('rc-view','overview');await h.click('rc-view','read');await h.click('rc-reset');
 assert.equal(await h.page.evaluate(()=>history.length),count,'Reader controls must replace history');
 const button=dialog.locator('[data-action="rc-node"]').first();await button.focus();await h.page.keyboard.press('Enter');assert.ok((await h.state()).navigation.reconstruction.nodeId);
 assert.deepEqual((await h.state()).data,h.before.data);
});

for(const locale of ['zh-CN','en-AU','en-US'])await probe(['UX-16','UX-17','UX-21'],locale+'.mobile',async h=>{
 await compare(h);await h.click('rc-mode','compare');
 assert.ok(await h.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 assert.ok(await h.page.locator('#scenario-dialog').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
 const texts=h.page.locator('#scenario-dialog p');assert.ok(await texts.count());
 const sizes=await texts.evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().height&&e.textContent.length>70&&!e.closest('.trace-meta,.rc-meta,.small')).map(e=>Number.parseFloat(getComputedStyle(e).fontSize)));
 assert.ok(sizes.every(n=>n>=15.5),`Body size ${sizes}`);assert.deepEqual((await h.state()).data,h.before.data);
},{scene:'SCN-GAP',locale,mobile:true});

await probe(['UX-22'],'missing-static-diagrams',async h=>{
 await compare(h);await h.click('rc-mode','compare');
 for(const mapping of comparisonFor('SCN-GAP').mappings)assert.ok(await h.page.locator(`[data-mapping-id="${mapping.mapping_id}"]`).count());
 assert.ok(await h.page.locator('[data-action="rc-node"]').count());assert.deepEqual((await h.state()).data,h.before.data);
},{scene:'SCN-GAP',missing:true});

await finish();
