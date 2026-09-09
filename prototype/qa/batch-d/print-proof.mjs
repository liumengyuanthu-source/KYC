import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/batch-d/',session=JSON.parse(fs.readFileSync(dir+'host-saved-session.json')),results=[];fs.mkdirSync('output/pdf',{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const [name,locale,role,pageType]of [['batch-d-credit.en-AU','en-AU','ROLE-FACILITATOR','studio'],['batch-d-legal.zh-CN','zh-CN','ROLE-FACILITATOR','studio'],['batch-d-client.en-US','en-US','ROLE-CLIENT','product']]){
 const s=structuredClone(session);s.navigation={...s.navigation,page:pageType,mode:'print',step:'condition',locale,role,scenario:locale==='en-AU'?'SCN-CREDIT':'SCN-LEGAL',specialistBeat:locale==='en-AU'?'D3':'D4',stage:'S4',modal:false,reference:null,dependency:null,conditionDomain:locale==='en-AU'?'credit':'legal',agreementRevision:3};
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(7000);await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),s);
 try{await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('.print-sheet');await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
  const text=await page.locator('.print-sheet').innerText(),html=await page.locator('.print-sheet').innerHTML();assert.match(text,/DEMO-CTT-001/);assert.match(text,/Not Ready|not ready|尚未就绪/i);assert.doesNotMatch(html,/restricted_detail|RESTRICTED_D_CANARY/);
  if(pageType==='studio'){assert.ok(await page.locator('[data-d-semantic="D02-ASSESS"]').count());assert.ok(await page.locator('[data-d-semantic="D02-EXECUTION"]').count());assert.match(text,/SRC-017:R19/);}
  assert.deepEqual((await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')))).data,s.data);
  await page.emulateMedia({media:'print'});await page.pdf({path:'output/pdf/'+name+'.pdf',format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});await page.screenshot({path:dir+name+'.print.png',fullPage:false});
  results.push({name,locale,role,status:'passed',pdf:'output/pdf/'+name+'.pdf',screenshot:name+'.print.png',businessStateUnchanged:true});
 }catch(e){results.push({name,status:'failed',error:e.message});}finally{await context.close();}
}}finally{await browser.close();}
fs.writeFileSync(dir+'print-results.json',JSON.stringify({at:new Date().toISOString(),command:'node prototype/qa/batch-d/print-proof.mjs',results},null,2)+'\n');console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
