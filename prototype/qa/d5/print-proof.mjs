import fs from 'node:fs';import assert from 'node:assert/strict';
import {browser,liveSeed} from './harness.mjs';
const dir='prototype/qa/d5/print';fs.mkdirSync(dir,{recursive:true});const results=[];
for(const [name,locale,role] of [['review-en-AU','en-AU','ROLE-KYCOPS'],['review-en-US','en-US','ROLE-KYCOPS'],['review-zh-CN','zh-CN','ROLE-KYCOPS'],['rm-en-AU','en-AU','ROLE-RM'],['client-en-AU','en-AU','ROLE-CLIENT']]){
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage(),seed=liveSeed();seed.navigation.locale=locale;seed.navigation.role=role;await context.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
 try{await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('[data-d5-workspace]');const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);await page.screenshot({path:`${dir}/${name}.screen.png`});
  await page.locator('[data-action="mode"][data-value="print"]').filter({visible:true}).first().click();await page.waitForSelector('.print-sheet');
  const html=await page.locator('.print-sheet').innerHTML();if(role!=='ROLE-KYCOPS')assert.doesNotMatch(html,/person-t-c01|1970|1971|sanctions_name_match|D4A-MATCH|comparison_basis/);
  const pdf=`${dir}/${name}.pdf`;await page.pdf({path:pdf,format:'A4',printBackground:true,preferCSSPageSize:true});
  assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data),before);fs.writeFileSync(`${dir}/${name}.html-fragment`,html);results.push({name,locale,role,status:'passed',pdf,html:`${dir}/${name}.html-fragment`});
 }catch(e){results.push({name,locale,role,status:'failed',error:e.stack});}finally{await context.close();fs.writeFileSync(`${dir}/results.json`,JSON.stringify({at:new Date().toISOString(),browser:browser.version(),results},null,2));}
}
await browser.close();console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
