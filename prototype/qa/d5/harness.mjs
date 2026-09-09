import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
export const dir='prototype/qa/d5/host/',base='http://127.0.0.1:8765/prototype/';fs.mkdirSync(dir,{recursive:true});
export const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
export const results=[];
export function liveSeed(){const s=JSON.parse(fs.readFileSync('prototype/qa/operating-model/host/c-live-session.json'));s.navigation={...s.navigation,page:'product',step:'screening',modal:false,studioPage:null,locale:'en-AU',mode:'explore'};return s;}
export function record(){fs.writeFileSync(dir+path.basename(process.argv[1],'.mjs')+'.results.json',JSON.stringify({at:new Date().toISOString(),browser:browser.version(),results},null,2));}
export async function probe(ids,name,fn,{url='',seed=liveSeed(),width=1440,height=1000,touch=false,reduced=true,missing=false}={}){
 const context=await browser.newContext({viewport:{width,height},hasTouch:touch,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[],remote=[];
 page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:8765/'))remote.push(r.url());});
 if(seed)await context.addInitScript(s=>{if(!sessionStorage.getItem('ctt-round-a-v1'))sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s));},seed);
 // Static-media outage, not loss of executable model modules stored in the same folder.
 if(missing)await page.route('**/diagrams/**',r=>r.request().resourceType()==='image'?r.abort():r.continue());
 const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 const click=async(action,value)=>{const selector=`[data-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`,modal=page.locator('dialog[open]').locator(selector),targets=await modal.count()?modal:page.locator(selector);if(!await targets.filter({visible:true}).count()){for(let i=0;i<5;i++){const d=targets.first().locator('xpath=ancestor::details[not(@open)]');if(!await d.count())break;await d.first().locator(':scope > summary').click();}}await targets.filter({visible:true}).first().click();};
 const language=async v=>{const local=page.locator('#scene-locale').filter({visible:true});await(await local.count()?local:page.locator('#locale')).selectOption(v);};
 try{await page.goto(base+url);await page.waitForSelector('#main');const before=await state();await fn({page,context,state,click,language,before});assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);await page.screenshot({path:dir+name+'.png'});results.push({ids,name,status:'passed',screenshot:dir+name+'.png',errors,remote});}
 catch(e){results.push({ids,name,status:'failed',error:e.message,stack:e.stack,errors,remote});await page.screenshot({path:dir+name+'.failure.png'}).catch(()=>{});}
 finally{record();await context.close();}
}
export async function finish(){await browser.close();console.log({checks:results.length,passed:results.filter(x=>x.status==='passed').length,failed:results.filter(x=>x.status==='failed')});if(results.some(x=>x.status==='failed'))process.exitCode=1;}
