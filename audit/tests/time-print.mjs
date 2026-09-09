import {chromium} from '../tooling/node_modules/playwright/index.mjs';
import {productProgress} from '../../prototype/product-experience/projection.mjs';
import {temporalProjection,TIME_DEMO} from '../../prototype/product-experience/temporal.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
for(const locale of ['en-AU','en-US','zh-CN']){
 const seed=JSON.parse(fs.readFileSync('audit/screenshots/actual/journey/review.unresolved.en-AU.state.json'));seed.navigation={...seed.navigation,page:'product',step:'screening',modal:false,role:'ROLE-KYCOPS',locale,mode:'explore'};
 const ctx=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});await ctx.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);const page=await ctx.newPage();
 try{
 await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('[data-d5-workspace]');const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
 // Move the browser clock beyond any illustrative 1–2 day estimate. No command fired.
 await page.clock.setFixedTime(new Date('2027-09-08T00:00:00Z'));await page.locator('[data-d5-time-demo] > summary').click();assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data),before);
 const x=productProgress(before,{role:'ROLE-KYCOPS',asOf:'2027-09-08T00:00:00Z'});assert.equal(x.clearance,'not_ready');assert.equal(x.estimate.calendar_finish,null);assert.equal(temporalProjection(TIME_DEMO).elapsed_hours,5);
 await page.locator('[data-action="mode"][data-value="print"]').click();await page.waitForSelector('.print-sheet');
 const text=await page.locator('.print-sheet').innerText();assert.match(text,/Person T/);assert.match(text,/Not ready|尚未就绪/);assert.equal(await page.locator('.print-sheet [data-d5-step-detail]').count(),6);assert.ok(text.length>2500);assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data),before);
 fs.writeFileSync('audit/reports/print-'+locale+'.txt',text);await page.screenshot({path:'audit/screenshots/actual/print-'+locale+'.png'});
 await page.locator('[data-action="exit-print"]').click();assert.equal(await page.locator('[data-d5-workspace]').count(),1);assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data),before);
 results.push({locale,status:'passed',checks:['estimate expiry cannot complete business work','no unsupported calendar finish','six print step details and full text beyond viewport','print return state'],printed_characters:text.length});
 }catch(e){results.push({locale,status:'failed',error:e.message});}finally{await ctx.close();}
}
await browser.close();fs.writeFileSync('audit/reports/time-print-results.json',JSON.stringify({at:new Date().toISOString(),results},null,2));console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
