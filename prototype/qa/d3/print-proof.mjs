import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {transformationFor} from '../../transformations/content.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const dir='prototype/qa/d3/print/';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
try{for(const scene of ['SCN-GAP','SCN-MATCH'])for(const locale of ['en-AU','en-US','zh-CN']){
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(7000);
 try{
  await page.goto(`http://127.0.0.1:8765/prototype/?scene=${scene}&locale=${locale}`);await page.waitForSelector('#scenario-dialog[open] .transformation-panel');
  const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
  // Deliberately do not expand any row. Real selected-scene Print must still contain every row.
  await page.locator('#scenario-dialog [data-action="transformation-print"], #scenario-dialog [data-action="c-scene-print"]').first().click();await page.waitForSelector('.print-sheet .transformation-panel');
  await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete));await page.emulateMedia({media:'print'});
  const panel=page.locator('.print-sheet .transformation-panel'),text=await panel.innerText(),model=transformationFor(scene,locale);
  assert.equal(await panel.locator('[data-change-id]').count(),model.changes.length);
  for(const change of model.changes){
   assert.ok(text.includes(change.title),change.id+' title');assert.ok(text.includes(change.current),change.id+' current');assert.ok(text.includes(change.target),change.id+' proposal');assert.ok(text.includes(change.boundary),change.id+' boundary');
   for(const source of [...change.currentSources,...change.targetSources])assert.ok(text.includes(source.source_id),source.source_id+' locator');
  }
  assert.ok(text.includes(model.checkpoint),'same input checkpoint');assert.ok(text.includes(model.validationQuestion),'validation question');
  assert.doesNotMatch(text,/\/Users\/|file:\/\//);
  const after=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));assert.deepEqual(after.data,before.data);
  await page.pdf({path:dir+scene+'.'+locale+'.pdf',format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});
  await page.screenshot({path:dir+scene+'.'+locale+'.png'});
  await page.emulateMedia({media:'screen'});
  // Chromium's afterprint event may already restore the actual host origin.
  const exit=page.locator('[data-action="exit-print"]');if(await exit.isVisible())await exit.click();
  const restored=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));assert.equal(restored.navigation.scenario,scene);assert.equal(restored.navigation.locale,locale);assert.deepEqual(restored.navigation.transformation,before.navigation.transformation);
  assert.notEqual(restored.navigation.mode,'print');assert.equal(restored.navigation.modal,true);
  results.push({scene,locale,status:'passed',changes:model.changes.length,pdf:dir+scene+'.'+locale+'.pdf',businessStateUnchanged:true,visualInspection:'pending'});
 }catch(e){results.push({scene,locale,status:'failed',error:e.message});await page.screenshot({path:dir+scene+'.'+locale+'.failure.png'});}finally{await context.close();fs.writeFileSync(dir+'results.json',JSON.stringify({at:new Date().toISOString(),results},null,2)+'\n');}
}}finally{await browser.close();}
console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
