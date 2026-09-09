// Operating Model regression relocation; historical source/results preserved.
import assert from 'node:assert/strict';
import {probe,finish} from './host-harness.mjs';
await probe(['UX-15','UX-20'],'journey-camera-escape-focus',async h=>{
 await h.click('close');const scroll=h.page.locator('.journey-scroll');await scroll.scrollIntoViewIfNeeded();
 await scroll.evaluate(e=>{e.scrollLeft=Math.min(e.scrollWidth-e.clientWidth,500);e.dispatchEvent(new Event('scroll'));});
 const trigger=scroll.locator('[data-action="scene"][data-value="SCN-GAP"]').first();await trigger.click();
 const position=await scroll.evaluate(e=>e.scrollLeft);assert.ok(position>0,'Exercise a horizontally displaced journey');
 await h.click('rc-compare');await h.click('rc-references');await h.page.keyboard.press('Escape');
 assert.equal((await h.state()).navigation.reconstruction.panel,'comparison');assert.equal((await h.state()).navigation.modal,true);
 await h.page.keyboard.press('Escape');assert.equal((await h.state()).navigation.modal,false);
 assert.ok(Math.abs(await scroll.evaluate(e=>e.scrollLeft)-position)<2);
 const focus=await h.page.evaluate(()=>({value:document.activeElement?.dataset.value,scene:document.activeElement?.dataset.scene}));assert.ok(focus.value==='SCN-GAP'||focus.scene==='SCN-GAP',JSON.stringify(focus));
 assert.deepEqual((await h.state()).data,h.before.data);
},{scene:'SCN-GAP'});
await probe(['UX-18'],'removed-node-safe-fallback',async h=>{
 await h.click('rc-compare');const before=await h.state();
 await h.page.evaluate(()=>{const s=JSON.parse(sessionStorage.getItem('ctt-round-a-v1'));s.navigation.reconstruction.nodeId='OLD-REPLACED-NODE';s.navigation.reconstruction.revision='prior-design-revision';sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s));});
 // Queryless reload exercises persisted semantic state rather than a deliberate scene reset.
 await h.page.goto('http://127.0.0.1:8765/prototype/');await h.page.waitForSelector('[data-revision-notice]');
 const s=await h.state();assert.equal(s.navigation.reconstruction.branchId,'BR-03');assert.equal(s.navigation.reconstruction.nodeId,null);assert.equal(s.navigation.reconstruction.mappingId,null);assert.equal(s.navigation.reconstruction.view,'overview');
 assert.match(await h.page.locator('[data-revision-notice]').innerText(),/OLD-REPLACED-NODE/);assert.deepEqual(s.data,before.data);
});
for(const role of ['ROLE-RM','ROLE-CLIENT'])await probe(['UX-24'],role+'.safe-reader-print',async h=>{
 await h.click('close');await h.page.locator('#role').selectOption(role);await h.click('scene','SCN-GAP');
 let html=await h.page.locator('#scenario-dialog').innerHTML();assert.ok(await h.page.locator('[data-reconstruction-unavailable]').count());
 assert.doesNotMatch(html,/PPT-S[12]-SH|D3-ISS|Internal:|ITEM-OWNERSHIP|provider_snapshot|restricted_reason/);
 // Native print preparation must also select the safe authored projection.
 await h.page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
 html=await h.page.locator('#app').innerHTML();assert.doesNotMatch(html,/PPT-S[12]-SH|D3-ISS|Internal:|ITEM-OWNERSHIP|provider_snapshot|restricted_reason/);
 await h.page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));assert.deepEqual((await h.state()).data,h.before.data);
},{scene:'SCN-GAP'});
await probe(['UX-24'],'client-product-return-safe-reader',async h=>{
 await h.click('collab-open');await h.click('collab-init','snapshot');await h.page.locator('#collab-audience').selectOption('client');
 const before=(await h.state()).data;await h.click('return','scenario');
 assert.ok(await h.page.locator('[data-reconstruction-unavailable]').count());assert.doesNotMatch(await h.page.locator('#scenario-dialog').innerHTML(),/PPT-S[12]-SH|D3-ISS|ITEM-OWNERSHIP|restricted_reason/);assert.deepEqual((await h.state()).data,before);
},{scene:'SCN-GAP'});
await probe(['UX-25','UX-28'],'index-and-story-readonly',async h=>{
 await h.click('rc-compare');await h.click('rc-index');assert.equal(await h.page.locator('[data-branch-index-item]').count(),12);
 assert.match(await h.page.locator('#scenario-dialog').innerText(),/T04/);await h.click('close');
 const before=await h.state();for(let i=0;i<5;i++){await h.click('continue');await h.click('close');}
 assert.deepEqual((await h.state()).data,before.data);assert.deepEqual((await h.state()).collabCtx,before.collabCtx);
});
await finish();
