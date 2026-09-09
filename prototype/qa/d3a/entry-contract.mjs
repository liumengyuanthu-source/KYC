import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const phase=process.argv[2]||'green',dir='prototype/qa/d3a';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[];
try{for(const scene of ['SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE']){
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});try{
 await page.goto('http://127.0.0.1:8765/prototype/?locale=zh-CN');await page.locator(`[data-action="scene"][data-value="${scene}"]`).first().click();
 const dialog=page.locator('#scenario-dialog[open]');await dialog.waitFor();const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
 const compare=dialog.getByRole('button',{name:'对照流程',exact:true});assert.equal(await compare.count(),1,'Scenario summary must offer one explicit Compare process CTA');
 await compare.click();assert.match(await dialog.innerText(),/Current/);assert.match(await dialog.innerText(),/To-be/);
 const after=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);assert.deepEqual(after,before,'Comparison must not change the case');
 results.push({scene,status:'passed'});
 }catch(e){results.push({scene,status:'failed',error:e.message});}finally{await page.close();}
}}finally{await browser.close();fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/entry-${phase}.json`,JSON.stringify({at:new Date().toISOString(),results},null,2));}
console.log(results);if(results.some(x=>x.status==='failed'))process.exitCode=1;
