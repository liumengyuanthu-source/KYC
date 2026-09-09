import assert from 'node:assert/strict';import fs from 'node:fs';
import {probe,finish,results,dir} from './host-harness.mjs';
async function initialize(h){await h.click('collab-open');await h.click('collab-init','snapshot');await h.page.waitForSelector('.collab-tabs');await h.click('return','scenario');await h.click('rc-compare');}
await probe(['UX-11','UX-12','UX-16'],'saved-product-return',async h=>{
 await initialize(h);await h.click('rc-mode','current');await h.click('rc-mapping','MAP-D3-REQUIREMENTS-03');
 const origin=(await h.state()).navigation.reconstruction,caseBefore=(await h.state()).data;await h.click('rc-product');
 assert.equal((await h.state()).navigation.page,'product');assert.equal((await h.state()).navigation.step,'collaboration');assert.equal((await h.state()).collabCtx.tab,'requirements');assert.equal((await h.state()).navigation.comparison,'target');
 await h.click('collab-tab','requests');await h.page.locator('#collab-text').fill('D3A actual-host saved request: coordination only, ownership remains open.');await h.click('collab-action','save_request');
 const saved=(await h.state()).data;assert.notDeepEqual(saved,caseBefore);await h.language('zh-CN');await h.click('return','scenario');
 let s=await h.state();assert.deepEqual(s.data,saved);assert.equal(s.navigation.locale,'zh-CN');assert.equal(s.navigation.reconstruction.mode,'current');assert.equal(s.navigation.reconstruction.mappingId,origin.mappingId);assert.equal(s.navigation.reconstruction.panel,'comparison');
 await h.click('rc-product');await h.click('return','journey');s=await h.state();assert.equal(s.navigation.modal,false);assert.deepEqual(s.data,saved);
});
await probe(['UX-13'],'failed-save-stay-discard',async h=>{
 await initialize(h);await h.click('rc-product');await h.click('collab-tab','requests');const before=(await h.state()).data,text='X'.repeat(10001);
 await h.page.locator('#collab-text').fill(text);await h.click('return','scenario');await h.click('guard','save');
 assert.equal((await h.state()).navigation.page,'product');assert.equal(await h.page.locator('#collab-text').inputValue(),text);assert.ok(await h.page.locator('#dirty-dialog [role="alert"]').isVisible());assert.deepEqual((await h.state()).data,before);
 await h.click('guard','stay');assert.equal(await h.page.locator('#collab-text').inputValue(),text);await h.click('return','scenario');await h.click('guard','discard');assert.equal((await h.state()).navigation.reconstruction.panel,'comparison');assert.deepEqual((await h.state()).data,before);
},{scene:'SCN-GAP'});
await probe(['UX-11'],'purpose-specific-evidence-target',async h=>{
 await initialize(h);await h.click('rc-mode','compare');await h.click('rc-node','TOBE-D3-VALIDATE-04-USE-ASSESSMENT');const before=await h.state();
 await h.click('rc-product');let s=await h.state();assert.equal(s.navigation.step,'collaboration');assert.equal(s.collabCtx.tab,'evidence');
 const item=s.data.requestItems.find(i=>i.id===s.collabCtx.itemId);assert.equal(item.alias,'ITEM-AUTHORITY');assert.equal(item.scope_revision,s.data.scopes[0].revision);
 await h.click('return','scenario');s=await h.state();assert.equal(s.navigation.reconstruction.nodeId,before.navigation.reconstruction.nodeId);assert.equal(s.navigation.reconstruction.mappingId,before.navigation.reconstruction.mappingId);assert.deepEqual(s.data,before.data);
},{scene:'SCN-VALIDATE'});
// Save separately from the principal host-reader run; never replace that receipt.
fs.writeFileSync(dir+'product-results.json',JSON.stringify({at:new Date().toISOString(),results},null,2));
await finish();
