import assert from 'node:assert/strict';import {probe,finish} from './harness.mjs';
const d=(page,a,v)=>page.locator(`[data-d5-action="${a}"]${v?`[data-value="${v}"]`:''}`).filter({visible:true}).first().click();
await probe(['D5U-19','D5U-20','D5U-23','D5U-37'],'layout-preview-cancel-move-collapse',async h=>{
 const storage=()=>h.page.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([k])=>k.startsWith('ctt-d5-layout:'))));const initial=await storage();
 await d(h.page,'customize');await d(h.page,'add','OPT-NOTES');await d(h.page,'up','OPT-NOTES');await d(h.page,'preview');assert.equal(await h.page.locator('[data-d5-module="OPT-NOTES"]').count(),1);assert.deepEqual(await storage(),initial);await d(h.page,'cancel-layout');assert.equal(await h.page.locator('[data-d5-module="OPT-NOTES"]').count(),0);
 await d(h.page,'customize');await d(h.page,'add','OPT-NOTES');await d(h.page,'up','OPT-NOTES');await d(h.page,'collapse','OPT-NOTES');await d(h.page,'save-layout');const layouts=await storage(),p=JSON.parse(Object.values(layouts)[0]);assert.deepEqual(p.order,['OPT-TIMELINE','OPT-DEPENDENCIES','OPT-NOTES','OPT-EVIDENCE']);assert.ok(p.collapsed.includes('OPT-NOTES'));assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5U-20','D5U-39'],'layout-storage-error-keeps-task-input',async h=>{
 await h.page.locator('#screening-rationale').fill('Retain this rationale when layout storage is unavailable.');await d(h.page,'customize');await h.page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('ctt-d5-layout:'))throw new DOMException('Quota full','QuotaExceededError');return original.call(this,k,v);};});await d(h.page,'save-layout');assert.ok(await h.page.locator('[role="alert"]').isVisible());assert.equal(await h.page.locator('#screening-rationale').inputValue(),'Retain this rationale when layout storage is unavailable.');assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5-43','D5U-37','D5U-39'],'static-dependency-missing-readable-fallback',async h=>{
 await h.page.locator('[data-d5-module="OPT-DEPENDENCIES"] > summary').click();const text=await h.page.locator('[data-d5-module="OPT-DEPENDENCIES"]').innerText();assert.match(text,/read.only|static|dependency|dependencies|information|evidence/i);assert.ok(await h.page.locator('#screening-rationale').isVisible());assert.deepEqual((await h.state()).data,h.before.data);
},{missing:true});
await probe(['D5U-20','D5U-37'],'layout-collapse-overrides-prior-reading-but-cancel-restores',async h=>{
 const timeline=h.page.locator('[data-d5-module="OPT-TIMELINE"]');await timeline.locator(':scope > summary').click();assert.equal(await timeline.getAttribute('open'),'');
 await d(h.page,'customize');await d(h.page,'collapse','OPT-TIMELINE');await d(h.page,'collapse','OPT-TIMELINE');await d(h.page,'preview');assert.equal(await timeline.getAttribute('open'),null,'Layout preview must honor the explicit collapsed preference');
 await d(h.page,'cancel-layout');assert.equal(await timeline.getAttribute('open'),'','Cancel restores ordinary reading state');
 await d(h.page,'customize');await d(h.page,'save-layout');assert.equal(await timeline.getAttribute('open'),null);await timeline.locator(':scope > summary').click();
 await d(h.page,'customize');await d(h.page,'reset-layout');assert.equal(await timeline.getAttribute('open'),null);await timeline.locator(':scope > summary').click();await h.page.locator('#d5-persona').selectOption('demo-operator-2');assert.equal(await timeline.getAttribute('open'),null,'Prior persona reading cannot override the new persona collapsed defaults');assert.deepEqual((await h.state()).data,h.before.data);
});
await finish();
