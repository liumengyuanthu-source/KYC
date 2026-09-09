// All active scenario routes: DOM/read-only/layout checks, not a visual certification.
import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {scenes,skeleton} from '../../content.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const results=[],dir='prototype/qa/d3/scenarios/';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const scene of [...scenes,...skeleton.map(([id])=>({id}))]){
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8765/prototype/?locale=zh-CN');await page.waitForSelector('.storyrail');
  const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
  if(scene.id==='SCN-PUBLISH'&&!await page.locator(`[data-action="scene"][data-value="${scene.id}"]`).count()){
   results.push({scene:scene.id,status:'not-run',reason:'Existing publication structural placeholder has no clickable mainline entry; no E/F publication route created by D3.',visualInspection:'not_run'});continue;
  }
  await page.locator(`[data-action="scene"][data-value="${scene.id}"]`).filter({visible:true}).first().click();await page.waitForSelector('#scenario-dialog[open]');
  const metrics=await page.locator('#scenario-dialog').evaluate(el=>({title:el.querySelector('h2')?.textContent,overflow:el.scrollWidth>el.clientWidth+1,headings:[...el.querySelectorAll('h1,h2,h3')].map(x=>x.textContent),metadata:[...el.querySelectorAll('.trace-meta')].map(x=>({text:x.textContent.slice(0,100),font:getComputedStyle(x).fontSize}))}));
  const after=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
  assert.deepEqual(after,before,'Opening a scenario must not change business data');assert.equal(metrics.overflow,false);assert.deepEqual(errors,[]);
  await page.screenshot({path:dir+scene.id+'.png'});
  results.push({scene:scene.id,status:'passed',checks:['route','modal overflow','read-only','JS exceptions'],metrics,screenshot:dir+scene.id+'.png',visualInspection:'not_run'});
 }catch(e){results.push({scene:scene.id,status:'failed',error:e.message,errors});}finally{await context.close();}
}}finally{await browser.close();}
fs.writeFileSync(dir+'results.json',JSON.stringify({at:new Date().toISOString(),results},null,2)+'\n');console.log(results.map(({scene,status,error})=>({scene,status,error})));if(results.some(r=>r.status==='failed'))process.exitCode=1;
