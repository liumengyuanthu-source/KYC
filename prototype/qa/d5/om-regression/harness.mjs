// D5 rerun of D4 contract; historical receipts preserved.
import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
export const base='http://127.0.0.1:8765/prototype/',dir='prototype/qa/d5/om-regression/host/';fs.mkdirSync(dir,{recursive:true});
export const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
export const results=[];const runName=path.basename(process.argv[1],'.mjs');
export function record(){fs.writeFileSync(dir+runName+'.results.json',JSON.stringify({at:new Date().toISOString(),command:'node '+process.argv[1],browser:browser.version(),results},null,2));}
export async function probe(ids,name,fn,{url='?studio=operating-model&scene=SCN-MATCH&locale=en-AU',width=1440,height=1000,reduced=true,missing=false,seed=null,touch=false}={}){
 const context=await browser.newContext({viewport:{width,height},hasTouch:touch,reducedMotion:reduced?'reduce':'no-preference',colorScheme:'light'}),page=await context.newPage(),errors=[],remote=[];page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:8765/'))remote.push(r.url());});
 if(missing)await page.route('**/diagrams/operating-model/**',r=>r.abort());if(seed)await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
 const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 const click=async(action,value)=>{const selector=`[data-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`;const dialog=page.locator('dialog[open]').locator(selector),targets=await dialog.count()?dialog:page.locator(selector);if(!await targets.filter({visible:true}).count()){const ancestors=targets.first().locator('xpath=ancestor::details[not(@open)]');for(let i=0;i<4&&await ancestors.count();i++)await ancestors.first().locator(':scope > summary').click();}await targets.filter({visible:true}).first().click();};
 const language=async value=>{const local=page.locator('#scene-locale').filter({visible:true});await(await local.count()?local:page.locator('#locale')).selectOption(value);};
 try{await page.goto(base+url);await page.waitForSelector('#main');const before=await state();await fn({page,context,state,click,language,before,remote});assert.deepEqual(errors,[],'No page script errors');assert.deepEqual(remote,[],'No model/bank/remote requests');const shot=dir+name+'.png';await page.screenshot({path:shot});results.push({ids,name,status:'passed',screenshot:shot,errors,remote});}
 catch(e){results.push({ids,name,status:'failed',error:e.message,stack:e.stack,errors,remote});await page.screenshot({path:dir+name+'.failure.png'}).catch(()=>{});}finally{record();await context.close();}
}
export async function finish(){await browser.close();console.log({checks:results.length,passed:results.filter(x=>x.status==='passed').length,failed:results.filter(x=>x.status==='failed')});if(results.some(x=>x.status==='failed'))process.exitCode=1;}
