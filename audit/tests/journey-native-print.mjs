import {chromium} from '../tooling/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const red=process.argv.includes('--red'),results=[],errors=[];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
page.on('pageerror',e=>errors.push(e.message));
const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
const dispatch=event=>page.evaluate(event=>window.dispatchEvent(new Event(event)),event);
async function check(name,fn){try{await fn();results.push({name,status:'passed'});}catch(e){results.push({name,status:'failed',error:e.message});throw e;}}
try{
 await page.goto('http://127.0.0.1:8765/prototype/?studio=journey');
 await page.locator('#journey-role').selectOption('ROLE-CLIENT');
 await page.locator('.journey-scroll [data-value="client-respond"]').click();await page.keyboard.press('Escape');
 const before=await state();const left=await page.locator('.journey-scroll').evaluate(el=>el.scrollLeft);
 await check('Native beforeprint from Journey includes all 30 activities, not the last scene',async()=>{
  await dispatch('beforeprint');
  assert.equal(await page.locator('.journey-print-activity').count(),30);
  assert.deepEqual((await state()).data,before.data);
  await dispatch('afterprint');
  await page.waitForSelector('.journey-scroll');
  assert.equal((await state()).navigation.journeyRole,'ROLE-CLIENT');
  assert.ok(Math.abs(await page.locator('.journey-scroll').evaluate(el=>el.scrollLeft)-left)<3);
 });
 if(!red){
  await check('Native print of a role activity is scoped and restores the activity modal',async()=>{
   await page.locator('.journey-scroll [data-value="client-respond"]').click();
   await dispatch('beforeprint');assert.equal(await page.locator('main.journey-print .journey-activity-reader').count(),1);
   await dispatch('afterprint');await page.waitForSelector('#scenario-dialog[open]');
   assert.equal((await state()).navigation.journeyActivity,'client-respond');
   assert.deepEqual((await state()).data,before.data);await page.keyboard.press('Escape');
  });
  await check('Explicit activity Print entry remains scoped',async()=>{
   await page.locator('.journey-scroll [data-value="client-respond"]').click();
   await page.locator('[data-action="journey-activity-print"]').click();
   assert.equal(await page.locator('main.journey-print .journey-activity-reader').count(),1);
   await page.locator('[data-action="exit-print"]').click();await page.waitForSelector('#scenario-dialog[open]');
   assert.deepEqual((await state()).data,before.data);
  });
  // Explicit reviewed fixture entry in this isolated browser, never the user's tab.
  await page.goto('http://127.0.0.1:8765/prototype/?scene=SCN-QA');
  await page.locator('[data-e-action="entry-review"]').first().click();
  await page.locator('[data-e-action="entry-reviewed"]').first().click();
  await page.waitForFunction(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data.demoConfig.batchE);
  await page.keyboard.press('Escape');await page.waitForSelector('.journey-scroll');
  const eBefore=(await state()).data;
  await check('E session Cmd-P from Journey uses complete Journey scope',async()=>{
   await page.keyboard.press('Meta+p');
   assert.equal(await page.locator('.journey-print-activity').count(),30);
   assert.deepEqual((await state()).data,eBefore);
   await page.locator('[data-action="exit-print"]').click();await page.waitForSelector('.journey-scroll');
  });
  await check('E Product Cmd-P retains the specialized clearance print',async()=>{
   await page.goto('http://127.0.0.1:8765/prototype/?scene=SCN-QA');
   await page.locator('#scenario-dialog [data-action="product"][data-value="clearance"]').first().click();
   await page.keyboard.press('Meta+p');
   assert.equal(await page.locator('.journey-print-activity').count(),0);
   assert.ok((await page.locator('#main').innerText()).length>1000);
   assert.deepEqual((await state()).data,eBefore);
  });
 }
}catch(e){if(!results.some(r=>r.status==='failed'))results.push({name:'Harness setup',status:'failed',error:e.message});process.exitCode=1;}
finally{
 const result={at:new Date().toISOString(),results,errors,passed:results.filter(r=>r.status==='passed').length,failed:results.filter(r=>r.status==='failed')};
 writeFileSync(`audit/journey-source-realignment/native-print-${red?'red':'results'}.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));await browser.close();
}
