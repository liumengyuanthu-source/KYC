import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/d3/pilot/';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
const base='http://127.0.0.1:8765/prototype/';
async function probe(name,scene,locale,run,{mobile=false,missing=false}={}){
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:1000},reducedMotion:mobile?'reduce':'no-preference'}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 if(missing)await page.route('**/diagrams/**',r=>r.request().resourceType()==='image'?r.abort():r.continue());
 const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 const click=async(action,value)=>{const selector=`[data-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`;const modal=page.locator('dialog[open]').locator(selector).filter({visible:true});await (await modal.count()?modal:page.locator(selector).filter({visible:true})).first().click();};
 const language=async(value)=>{const modal=page.locator('#scene-locale').filter({visible:true});await(await modal.count()?modal:page.locator('#locale')).selectOption(value);};
 try{
  await page.goto(base+`?scene=${scene}&locale=${locale}`);await page.waitForSelector('#scenario-dialog[open] .transformation-panel');
  await run({page,state,click,language});assert.deepEqual(errors,[]);
  await page.screenshot({path:dir+name+'.png'});results.push({name,scene,locale,status:'passed',screenshot:dir+name+'.png',errors});
 }catch(e){results.push({name,scene,locale,status:'failed',error:e.message,errors});await page.screenshot({path:dir+name+'.failure.png'});}finally{await context.close();fs.writeFileSync(dir+'results.json',JSON.stringify({at:new Date().toISOString(),results},null,2)+'\n');}
}
try{
 for(const locale of ['en-AU','en-US','zh-CN'])for(const [scene,count]of [['SCN-GAP',6],['SCN-MATCH',7]]){
  await probe(`${scene}.${locale}.comparison`,scene,locale,async({page,state,click,language})=>{
   const before=(await state()).data,panel=page.locator('#scenario-dialog .transformation-panel');
   assert.equal(await panel.locator('[data-change-id]').count(),count);
   assert.equal((await state()).navigation.transformation.compare,false,'Single-side view is the default');
   await click('compare','current');await click('transformation-compare');
   assert.equal((await state()).navigation.comparison,'current');assert.equal((await state()).navigation.transformation.compare,true);
   const row=panel.locator('[data-change-id]').first(),id=await row.getAttribute('data-change-id');await row.locator('summary').first().click();
   await page.waitForFunction(id=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).navigation.transformation.openChanges.includes(id),id);
   assert.ok((await state()).navigation.transformation.openChanges.includes(id));
   await click('transformation-focus',id);
   const selected=structuredClone((await state()).navigation.transformation);
   await language(locale==='zh-CN'?'en-AU':'zh-CN');
   assert.deepEqual((await state()).navigation.transformation,selected);
   await click('compare','target');assert.deepEqual((await state()).data,before);
   assert.equal(await panel.locator('[data-change-id]').count(),count);
  });
 }
 await probe('references-return','SCN-GAP','en-AU',async({page,state,click,language})=>{
  await click('compare','current');await click('transformation-compare');
  const row=page.locator('[data-change-id="D3-GAP-02"]');await row.locator('summary').first().click();await click('transformation-focus','D3-GAP-02');
  await row.locator('.trace-details>summary').first().click();
  await row.locator('[data-action="transformation-reference"]').first().click();await page.waitForSelector('[data-action="reference-close"]');
  const referenceState=await state(),origin=referenceState.navigation.reference.origin,before=referenceState.data;
  await language('zh-CN');await click('reference-close');
  const n=(await state()).navigation;assert.equal(n.scenario,'SCN-GAP');assert.equal(n.comparison,'current');assert.equal(n.locale,'zh-CN');assert.deepEqual(n.transformation,origin.transformation);assert.deepEqual((await state()).data,before);
 });
 await probe('gap-product-return','SCN-GAP','en-AU',async({page,state,click,language})=>{
  await click('compare','current');await click('transformation-compare');
  await page.locator('[data-change-id="D3-GAP-03"] summary').first().click();await click('transformation-focus','D3-GAP-03');
  const origin=(await state()).navigation,before=(await state()).data;
  await click('collab-open');assert.equal((await state()).navigation.page,'product');assert.equal((await state()).navigation.comparison,'target');
  await language('en-US');await click('return','scenario');
  let n=(await state()).navigation;assert.equal(n.comparison,'current');assert.equal(n.locale,'en-US');assert.deepEqual(n.transformation,origin.transformation);assert.deepEqual((await state()).data,before);
  await click('collab-open');await click('return','journey');n=(await state()).navigation;assert.equal(n.modal,false);assert.deepEqual(n.camera,origin.camera);assert.deepEqual(n.transformation,origin.transformation);assert.deepEqual((await state()).data,before);
 });
 await probe('match-reference-cross-scene','SCN-MATCH','en-AU',async({page,state,click,language})=>{
  await click('compare','current');const row=page.locator('[data-change-id="D3-MATCH-03"]');await row.locator('summary').first().click();await row.locator('.trace-details>summary').click();
  const before=(await state()).data;await row.locator('[data-action="transformation-reference"][data-value="REFSRC-3f0c51e665c8"]').click();
  assert.ok(await page.locator('#scenario-dialog .reference-card').count(),'Cross-scene canonical ANZ source is readable');assert.match(await page.locator('#scenario-dialog').innerText(),/ANZ/);
  await language('zh-CN');await click('reference-close');assert.equal((await state()).navigation.scenario,'SCN-MATCH');assert.equal((await state()).navigation.comparison,'current');assert.equal((await state()).navigation.locale,'zh-CN');assert.deepEqual((await state()).data,before);
 });
 for(const scene of ['SCN-GAP','SCN-MATCH'])await probe(scene+'.mobile-fallback',scene,'zh-CN',async({page,state,click})=>{
  const before=(await state()).data;await click('transformation-compare');
  const row=page.locator('.transformation-panel [data-change-id]').first();await row.locator('summary').first().click();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await page.locator('#scenario-dialog').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
  const focus=await row.locator('summary').first();await focus.focus();assert.equal(await focus.evaluate(e=>document.activeElement===e),true);
  assert.deepEqual((await state()).data,before);
 },{mobile:true,missing:true});
}finally{await browser.close();}
console.log({checks:results.length,passed:results.filter(r=>r.status==='passed').length,failed:results.filter(r=>r.status==='failed')});if(results.some(r=>r.status==='failed'))process.exitCode=1;
