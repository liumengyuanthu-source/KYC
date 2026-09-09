import {chromium} from '../tooling/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const base=JSON.parse(fs.readFileSync('audit/screenshots/actual/journey/review.result.en-AU.state.json'));
const dEntry=JSON.parse(fs.readFileSync('04_operating_model/batch-d/specialist-snapshots.json')).snapshots['D-entry'];
const results=[];
const open=async seed=>{const ctx=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});await ctx.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);const page=await ctx.newPage();page.setDefaultTimeout(8000);await page.goto('http://127.0.0.1:8765/prototype/');return {ctx,page};};
const state=page=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
const click=async(page,a,v)=>{const q=`[data-action="${a}"]${v?`[data-value="${v}"]`:''}`,dialog=page.locator('dialog[open]').locator(q).filter({visible:true});return (await dialog.count()?dialog:page.locator(q).filter({visible:true})).first().click();};
const check=async(name,fn)=>{try{const detail=await fn();results.push({name,status:'passed',detail});}catch(error){results.push({name,status:'failed',error:error.message});}};

await check('current C readiness first Product action opens same-case readonly clearance and returns exactly',async()=>{
 const seed=structuredClone(base);seed.navigation={...seed.navigation,page:'product',modal:false,locale:'en-AU',step:'screening',d5:{}};const {ctx,page}=await open(seed),before=structuredClone((await state(page)).data);
 await click(page,'return','journey');await click(page,'scene','SCN-READINESS');
 const first=page.locator('dialog[open] [data-action="product"]').filter({visible:true}).first();assert.equal(await first.getAttribute('data-value'),'clearance');await first.click();
 let saved=await state(page);assert.equal(saved.navigation.page,'product');assert.equal(saved.navigation.step,'clearance');assert.equal(saved.data.case.revision,before.case.revision);assert.equal(saved.data.demoConfig.batchD,undefined);assert.deepEqual(saved.data,before);
 const text=await page.locator('#main').innerText();assert.match(text,/Clearance/);assert.match(text,/Not ready to trade/);assert.doesNotMatch(text,/Archive session & load approved D entry/);
 await page.locator('#locale').selectOption('zh-CN');await click(page,'return','scenario');saved=await state(page);assert.equal(saved.navigation.scenario,'SCN-READINESS');assert.equal(saved.navigation.modal,true);assert.equal(saved.navigation.locale,'zh-CN');assert.equal(saved.navigation.comparison,'current');assert.deepEqual(saved.data,before);await ctx.close();return {revision:before.case.revision,step:'clearance',locale:saved.navigation.locale};
});

await check('active D readiness keeps condition route without changing the fixture',async()=>{
 const seed=structuredClone(base);seed.data=dEntry;seed.navigation={...seed.navigation,page:'studio',modal:true,locale:'en-AU',comparison:'current',scenario:'SCN-READINESS',stage:'S5',specialistBeat:'D5'};const {ctx,page}=await open(seed),before=structuredClone((await state(page)).data);
 const first=page.locator('dialog[open] [data-action="product"]').filter({visible:true}).first();assert.equal(await first.getAttribute('data-value'),'condition');await first.click();const saved=await state(page);assert.equal(saved.navigation.step,'condition');assert.deepEqual(saved.data,before);await ctx.close();return {revision:before.case.revision,step:'condition'};
});

await check('RM and Client readiness actions stay on role-filtered product progress',async()=>{
 for(const role of ['ROLE-RM','ROLE-CLIENT']){const seed=structuredClone(base);seed.navigation={...seed.navigation,page:'studio',modal:true,locale:'en-AU',comparison:'current',scenario:'SCN-READINESS',stage:'S5',specialistBeat:'D5',role};const {ctx,page}=await open(seed),before=structuredClone((await state(page)).data);const first=page.locator('dialog[open] [data-action="product"]').filter({visible:true}).first();assert.equal(await first.getAttribute('data-value'),'screening');await first.click();const text=await page.locator('#main').innerText();assert.match(text,/Email/);assert.doesNotMatch(text,/Person T|sanctions|Legal execution|Conflict detail|screening-rationale/);assert.deepEqual((await state(page)).data,before);await ctx.close();}return {roles:['ROLE-RM','ROLE-CLIENT'],projection:'safe screening progress'};
});

await check('identity assessment CTA navigates to explicit outcome choices without writing',async()=>{
 const seed=JSON.parse(fs.readFileSync('audit/screenshots/actual/journey/identity.assessed.en-AU.state.json'));seed.navigation={...seed.navigation,page:'product',modal:false,locale:'en-AU',step:'screening',d5:{}};const {ctx,page}=await open(seed),before=structuredClone((await state(page)).data);assert.equal(await page.locator('[data-action="c-action"][data-value="assess_identity"]').count(),0);await page.locator('[data-action="c-back-review"][data-value="screening-evidence"]').click();const saved=await state(page);assert.equal(saved.navigation.step,'screening-evidence');assert.deepEqual(saved.data,before);assert.match(await page.locator('#main').innerText(),/Assess as insufficient[\s\S]*Assess as unknown/);await ctx.close();return {step:'screening-evidence',revision:before.case.revision};
});

await browser.close();
fs.writeFileSync('audit/reports/readiness-guidance-fix1-results.json',JSON.stringify({at:new Date().toISOString(),results},null,2));
console.log(results);if(results.some(x=>x.status==='failed'))process.exitCode=1;
