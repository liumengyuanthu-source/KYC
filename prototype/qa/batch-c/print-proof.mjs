import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/batch-c/',session=JSON.parse(readFileSync(dir+'host-saved-session.json','utf8'));mkdirSync('output/pdf',{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const results=[];
for(const [name,locale,kind,comparison] of [['batch-c-match.en-AU','en-AU','scene','target'],['batch-c-match.zh-CN','zh-CN','scene','current'],['batch-c-client.en-AU','en-AU','client','target']]){
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}}),page=await ctx.newPage();page.setDefaultTimeout(6000);
 const s=structuredClone(session);s.navigation={...s.navigation,page:kind==='scene'?'studio':'product',mode:'print',modal:false,reference:null,scenario:'SCN-MATCH',stage:'S3',step:'screening',locale,comparison,role:kind==='client'?'ROLE-CLIENT':'ROLE-KYCOPS',graph:{scene:'SCN-MATCH',focus:'M04',branch:null}};
 await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),s);
 try{
  await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('.print-sheet');await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
  const html=await page.locator('.print-sheet').innerHTML();
  if(kind==='scene'){
   assert.equal(await page.locator('[data-semantic-node]').count(),12);assert.match(html,/M01/);assert.match(html,/M12/);assert.match(html,/SRC-016:R-C01/);assert.match(html,/SRC-016:S-C06/);assert.match(html,/inherited_research/);assert.match(html,/DEMO-CTT-001/);assert.match(html,/person-t-c01/);assert.match(html,/EV-ID-C01|screening_identity|identity-c/);
  }else{assert.doesNotMatch(html,/SYN-PROVIDER|1970|comparison_basis|INT-C0|R-C01|screeningReviewDecisions/);}
  const before=s.data.case.revision;assert.equal((await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')))).data.case.revision,before);
  await page.emulateMedia({media:'print'});await page.screenshot({path:dir+name+'.print.png',fullPage:false});
  await page.pdf({path:'output/pdf/'+name+'.pdf',format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});
  results.push({ids:kind==='scene'?['RT-C32','RT-C63']:['RT-C13','RT-C58','RT-C63'],name,status:'passed',steps:'Actual mainline print mode from saved host workflow; focus M04 cannot truncate selected scene',case_before:{revision:before},case_after:{revision:before},screenshot:name+'.print.png',pdf:'output/pdf/'+name+'.pdf'});
 }catch(e){results.push({ids:['RT-C32','RT-C63'],name,status:'failed',error:e.message});}
 await ctx.close();
}
writeFileSync(dir+'print-results.json',JSON.stringify({at:new Date().toISOString(),command:'node prototype/qa/batch-c/print-proof.mjs',results},null,2)+'\n');await browser.close();console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
