import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/batch-d/',results=[],browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const kind of ['delayed-double-start','failed-load-retry']){
 const context=await browser.newContext(),page=await context.newPage();page.setDefaultTimeout(7000);let count=0,release;
 const gate=new Promise(r=>release=r),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.route('**/specialist-snapshots.json',async route=>{count++;if(kind==='delayed-double-start')await gate;if(kind==='failed-load-retry'&&count===1)await route.fulfill({status:503,body:'Synthetic QA unavailable'});else await route.continue();});
 const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 const start=()=>page.locator('#scenario-dialog [data-action="d-start"]').click();
 try{
  await page.goto('http://127.0.0.1:8765/prototype/?scene=SCN-CONFLICTS&locale=en-AU');await page.waitForSelector('#scenario-dialog[open]');const before=await state();
  await start();await page.waitForTimeout(100);
  if(kind==='delayed-double-start'){
   await page.evaluate(()=>{for(const [a,v]of [['d-start',''],['batch-action','clarify_counterparty'],['case-action','confirm_requirements']]){const b=document.createElement('button');b.dataset.action=a;b.dataset.value=v;document.body.append(b);b.click();b.remove();}});
   await page.waitForTimeout(100);assert.equal(count,1,'Only one D fixture request may be in flight');assert.deepEqual((await state()).data,before.data,'Legacy writes must be blocked during D load');release();
  }else{
   await page.waitForTimeout(100);assert.deepEqual((await state()).data,before.data);assert.equal((await state()).archives.filter(a=>a.kind==='pre-batch-d').length,0);assert.match(await page.locator('#scenario-dialog [role="alert"]').innerText(),/could not be loaded|无法载入/);await start();
  }
  await page.waitForFunction(()=>!!JSON.parse(sessionStorage.getItem('ctt-round-a-v1'))?.data?.demoConfig?.batchD);const loaded=await state(),archives=loaded.archives.filter(a=>a.kind==='pre-batch-d');assert.equal(archives.length,1);assert.deepEqual(archives[0].data,before.data);
  const loadedRequests=count;await page.evaluate(()=>{const b=document.createElement('button');b.dataset.action='d-start';document.body.append(b);b.click();b.remove();});await page.waitForTimeout(100);assert.equal(count,loadedRequests,'A late activation cannot load D onto active D');assert.equal((await state()).archives.filter(a=>a.kind==='pre-batch-d').length,1);
  await page.locator('#scenario-dialog [data-action="d-restore"]').click();await page.waitForTimeout(100);assert.deepEqual((await state()).data,before.data);assert.deepEqual(errors,[]);results.push({ids:['RT-D14','RT-D15'],name:kind,status:'passed',fixtureRequests:count});
 }catch(e){release();results.push({ids:['RT-D14','RT-D15'],name:kind,status:'failed',error:e.message});await page.screenshot({path:dir+kind+'.failure.png'});}finally{release();await context.close();}
}}finally{await browser.close();}
fs.writeFileSync(dir+'load-race-results.json',JSON.stringify({results},null,2)+'\n');console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
