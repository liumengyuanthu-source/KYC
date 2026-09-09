import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/batch-d/',seed=JSON.parse(fs.readFileSync(dir+'host-saved-session.json')),results=[];
seed.navigation={...seed.navigation,page:'studio',mode:'explore',comparison:'current',scenario:'SCN-LEGAL',stage:'S4',locale:'en-AU',modal:true,reference:null,dependency:null,role:'ROLE-FACILITATOR',camera:{anchor:'SCN-LEGAL',offset:83},zoom:'focus',specialistBeat:'D4'};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(7000);
await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
const click=async(a,v)=>{const sel=`[data-action="${a}"]${v?`[data-value="${v}"]`:''}`;await page.locator(sel).filter({visible:true}).first().click();};
async function check(name,fn){try{await fn();results.push({ids:['RT-D14'],name,status:'passed'});}catch(e){results.push({ids:['RT-D14'],name,status:'failed',error:e.message});await page.screenshot({path:dir+'return-failure.png'});throw e;}finally{fs.writeFileSync(dir+'return-results.json',JSON.stringify({results},null,2)+'\n');}}
try{
 await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('#scenario-dialog[open]');
 await click('product','condition');const origin=structuredClone((await state()).navigation.returnToken);await page.locator('[data-d-condition="legal"]').click();
 await check('Node References return preserves dependency focus and selected agreement revision',async()=>{
  const before=(await state()).data;await click('d-dependency','DG-D02');await page.locator('[data-d-node="D02-INPUT"]').click();
  await page.locator('[data-d-ref="D02-INPUT"]').click();await page.waitForSelector('#scenario-dialog[open]');assert.match(await page.locator('#scenario-dialog').innerText(),/SRC-017:R19/);
  await page.locator('#scene-locale').selectOption('zh-CN');await click('reference-close');const n=(await state()).navigation;assert.equal(n.dependency.graph,'DG-D02');assert.equal(n.dGraph.focus,'D02-INPUT');assert.equal(n.locale,'zh-CN');assert.equal(n.agreementRevision,3);assert.deepEqual((await state()).data,before);await click('d-dependency-back');
 });
 await check('Dirty rationale Stay retains input; Discard returns without a business write',async()=>{
  const before=(await state()).data;await page.locator('#d-rationale').fill('UNSAVED_D_RETURN_PROBE');await click('return','scenario');await page.waitForSelector('#dirty-dialog[open]');await click('guard','stay');assert.equal(await page.locator('#d-rationale').inputValue(),'UNSAVED_D_RETURN_PROBE');
  await click('return','scenario');await click('guard','discard');await page.waitForSelector('#scenario-dialog[open]');assert.deepEqual((await state()).data,before);assert.equal((await state()).navigation.comparison,'current');
 });
 await click('product','condition');
 await check('Dirty rationale Save stores a draft without revising Credit; Journey return preserves origin camera and zoom',async()=>{
  const before=(await state()).data;await page.locator('#d-rationale').fill('SAVED_D_RETURN_PROBE');await click('return','journey');await page.waitForSelector('#dirty-dialog[open]');await click('guard','save');
  const s=await state();assert.equal(s.navigation.page,'studio');assert.equal(s.navigation.modal,false);assert.equal(s.navigation.comparison,'current');assert.equal(s.navigation.zoom,origin.zoom);assert.deepEqual(s.navigation.camera,origin.camera);assert.equal(s.navigation.locale,'zh-CN');assert.deepEqual(s.data,before);
  await click('scene','SCN-LEGAL');await click('product','condition');assert.equal(await page.locator('#d-rationale').inputValue(),'SAVED_D_RETURN_PROBE');
 });
 await page.screenshot({path:dir+'return-guard.zh-CN.png'});
}finally{await browser.close();}
console.log(results);
