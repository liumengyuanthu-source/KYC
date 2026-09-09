import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
export const dir='prototype/qa/d3a/host/';fs.mkdirSync(dir,{recursive:true});
export const base='http://127.0.0.1:8765/prototype/';
export const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
export const results=[];
export function record(){const name=path.basename(process.argv[1],'.mjs');fs.writeFileSync(dir+name+'.results.json',JSON.stringify({at:new Date().toISOString(),browser:browser.version(),results},null,2));}
export async function probe(ids,name,run,{scene='SCN-REQUIREMENTS',locale='en-AU',mobile=false,missing=false,seed=null}={}){
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:mobile?844:1000},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));
 if(missing)await page.route('**/reconstruction/diagrams/**',r=>r.abort());
 if(seed)await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
 const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 const click=async(action,value)=>{const selector=`[data-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`;const local=page.locator('dialog[open]').locator(selector),targets=await local.count()?local:page.locator(selector);
  // Reveal compact reader controls through the same explicit disclosure click a user uses.
  if(!await targets.filter({visible:true}).count()){
   const ancestors=targets.first().locator('xpath=ancestor::details[not(@open)]');
   for(let i=0;i<3&&await ancestors.count();i++)await ancestors.first().locator(':scope > summary').click();
  }
  await targets.filter({visible:true}).first().click();};
 const language=async value=>{const local=page.locator('#scene-locale').filter({visible:true});await(await local.count()?local:page.locator('#locale')).selectOption(value);};
 try{
  await page.goto(base+`?scene=${scene}&locale=${locale}`);await page.waitForSelector('#scenario-dialog[open]');
  const before=await state();await run({page,state,click,language,before,context});assert.deepEqual(errors,[]);
  const screenshot=dir+name+'.png';await page.screenshot({path:screenshot});results.push({ids,name,status:'passed',screenshot,errors});
 }catch(e){results.push({ids,name,status:'failed',error:e.message,errors});await page.screenshot({path:dir+name+'.failure.png'}).catch(()=>{});}finally{record();await context.close();}
}
export async function finish(){await browser.close();console.log({checks:results.length,passed:results.filter(r=>r.status==='passed').length,failed:results.filter(r=>r.status==='failed')});if(results.some(r=>r.status==='failed'))process.exitCode=1;}
