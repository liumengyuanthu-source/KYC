import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const outputDir=fileURLToPath(new URL('./media-mainline/',import.meta.url));
const outputPath=outputDir+'scroll-race-results.json';
const base='http://127.0.0.1:8765/prototype/';
const results=[];
mkdirSync(outputDir,{recursive:true});

const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
async function check(id,name,run){
 try{const evidence=await run();results.push({id,name,status:'passed',evidence});console.log(`PASS ${id} ${name}`);}
 catch(error){results.push({id,name,status:'failed',error:error.message});console.log(`FAIL ${id} ${error.message}`);}
}
async function withPage(routeLocale,run){
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();page.setDefaultTimeout(6000);
 await page.route('**/media/d2-batch-a/r01/locales/*.json',routeLocale);
 try{return await run(page);}finally{await context.close();}
}

try{
 await check('MSR-01','user scroll during a delayed current media mount is preserved',()=>withPage(async route=>{
  await new Promise(resolve=>setTimeout(resolve,1600));await route.continue();
 },async page=>{
  await page.goto(base+'?scene=SCN-SCOPE&locale=en-AU',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('[data-media-scene]');
  const before=await page.locator('#scenario-dialog').evaluate(modal=>{modal.scrollTop=600;return {top:modal.scrollTop,max:modal.scrollHeight-modal.clientHeight};});
  assert.equal(before.top,600,`fixture must allow a 600px pre-load scroll (max ${before.max})`);
  await page.waitForSelector('[data-media-status="ready"]');
  const after=await page.locator('#scenario-dialog').evaluate(modal=>({top:modal.scrollTop,max:modal.scrollHeight-modal.clientHeight}));
  assert.equal(after.top,before.top,`media completion reset scrollTop ${before.top} → ${after.top}`);
  return {before,after};
 }));

 await check('MSR-02','an aborted same-scene render cannot restore over its replacement',()=>withPage((()=>{let request=0;return async route=>{
  request++;if(request>1)await new Promise(resolve=>setTimeout(resolve,1200));await route.continue();
 };})(),async page=>{
  await page.goto(base+'?scene=SCN-SCOPE&locale=en-AU');
  await page.waitForSelector('[data-media-status="ready"]');
  const staged=await page.evaluate(()=>{
   const modal=document.querySelector('#scenario-dialog');modal.scrollTop=40;
   document.querySelector('#scenario-dialog [data-action="compare"][data-value="target"]').click();
   modal.scrollTop=80;
   document.querySelector('#scenario-dialog [data-action="compare"][data-value="current"]').click();
   modal.scrollTop=120;
   return {top:modal.scrollTop,max:modal.scrollHeight-modal.clientHeight};
  });
  assert.equal(staged.top,120,`fixture must allow a 120px pending-render scroll (max ${staged.max})`);
  await page.waitForTimeout(100);
  const afterStale=await page.locator('#scenario-dialog').evaluate(modal=>modal.scrollTop);
  assert.equal(afterStale,staged.top,`stale render restored an obsolete position: ${staged.top} → ${afterStale}`);
  await page.waitForSelector('[data-media-status="ready"]');
  const afterReady=await page.locator('#scenario-dialog').evaluate(modal=>modal.scrollTop);
  assert.equal(afterReady,staged.top,`current render restored over the user's position: ${staged.top} → ${afterReady}`);
  return {staged,afterStale,afterReady};
 }));
}finally{
 writeFileSync(outputPath,JSON.stringify({at:new Date().toISOString(),browser:await browser.version(),results},null,2)+'\n');
 await browser.close();
}

const failed=results.filter(result=>result.status==='failed').length;
console.log(JSON.stringify({passed:results.length-failed,failed,output:outputPath}));
if(failed)process.exitCode=1;
