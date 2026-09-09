import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {initialNavigation} from '../../navigation.mjs';
const dir='prototype/qa/batch-c/',base='http://127.0.0.1:8765/prototype/';
const snapshots=JSON.parse(readFileSync('04_operating_model/batch-c/screening-snapshots.json')).snapshots;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[],errors=[];
async function check(ids,name,navigation,fn){
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(name+': '+e.message));
 const data=structuredClone(snapshots['C-referred']),session={data,navigation:{...initialNavigation(),page:'product',step:'screening-evidence',scenario:'SCN-MATCH',stage:'S3',...navigation},versions:[],archives:[],drafts:{},collabCtx:{audience:'ops',tab:'requests',requestId:'DEMO-CTT-001/request/identity-c',itemId:'DEMO-CTT-001/request-item/identity-c',userId:'DEMO-CTT-001/person/person-t'}};
 await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),session);
 try{await page.goto(base);await page.waitForSelector('#main');await fn(page,data);const after=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);assert.deepEqual(after,data);await page.screenshot({path:dir+name+'.png'});results.push({ids,name,status:'passed',steps:'Actual frozen host UI; isolated synthetic session; full case unchanged',case_before:{revision:data.case.revision},case_after:{revision:after.case.revision},screenshot:name+'.png'});}catch(e){results.push({ids,name,status:'failed',error:e.message});await page.screenshot({path:dir+name+'.failed.png'}).catch(()=>{});}finally{await context.close();}
}
for(const role of ['ROLE-RM','ROLE-CLIENT','ROLE-CASEMGR'])await check(['RT-C13','RT-C58'],'review-fix.activity.'+role,{page:'studio',role,scenario:'SCN-SCOPE',stage:'S1',modal:true},async(page,data)=>{
 const privateReasons=data.auditEvents.filter(e=>e.source_refs?.includes('SRC-016')&&e.rationale).map(e=>e.rationale);assert.ok(privateReasons.length);
 await page.locator('#scenario-dialog [data-action="product"]').click();await page.locator('[data-action="step"][data-value="activity"]').click();const html=await page.locator('#app').innerHTML();for(const reason of privateReasons)assert.ok(!html.includes(reason),'Restricted C audit rationale must not enter DOM');assert.doesNotMatch(html,/screening-c-33|screening-decision\/c-2/);
});
await check(['RT-C67'],'review-fix.authorized-case-history',{step:'activity'},async(page,data)=>{
 const text=await page.locator('#main').innerText();assert.match(text,/Reviewed synthetic Batch A example; no bank authority inferred\./);assert.match(text,/Synthetic coordination basis for Entity A only\./);assert.equal(await page.locator('article.activity').count(),data.auditEvents.length);
});
await check(['RT-C29','RT-C61'],'review-fix.dirty-c-to-collaboration',{},async page=>{
 await page.locator('#screening-rationale').fill('Unsaved screening context that must stay visible.');await page.locator('[data-action="c-collaboration"]').click();await page.waitForSelector('#dirty-dialog[open]');await page.locator('[data-action="guard"][data-value="stay"]').click();assert.equal(await page.locator('#screening-rationale').inputValue(),'Unsaved screening context that must stay visible.');await page.locator('[data-action="c-collaboration"]').click();await page.locator('[data-action="guard"][data-value="discard"]').click();await page.waitForSelector('.collab-workspace');
});
await check(['RT-C29','RT-C44','RT-C61'],'review-fix.dirty-collaboration-return',{step:'collaboration'},async page=>{
 await page.locator('[data-action="collab-tab"][data-value="evidence"]').click();await page.locator('#collab-text').fill('Unsaved intake rationale kept until explicit choice.');await page.locator('[data-action="c-back-review"]').click();await page.waitForSelector('#dirty-dialog[open]');await page.locator('[data-action="guard"][data-value="stay"]').click();assert.equal(await page.locator('#collab-text').inputValue(),'Unsaved intake rationale kept until explicit choice.');await page.locator('[data-action="c-back-review"]').click();await page.locator('[data-action="guard"][data-value="discard"]').click();await page.waitForSelector('[data-c-panel="screening-evidence"]');
});
await check(['RT-C49','RT-C50','RT-C60'],'review-fix.reference-scroll',{page:'studio',modal:true,mode:'explore'},async page=>{
 const dialog=page.locator('#scenario-dialog');await page.evaluate(()=>document.fonts.ready);
 // Measure the user's actual pointer-down origin, after the browser scrolls the
 // small control clear of the sticky header/footer, not a pre-click scroll hint.
 await page.evaluate(()=>{window.__referencePointerOrigin=null;document.addEventListener('pointerdown',e=>{if(e.target.closest('[data-c-ref]'))window.__referencePointerOrigin=document.querySelector('#scenario-dialog').scrollTop;},{capture:true});});
 await page.locator('[data-c-ref="M03"]').click();const before=await page.evaluate(()=>window.__referencePointerOrigin);assert.ok(before>100);await page.waitForSelector('.reference-library');await dialog.evaluate(e=>{e.scrollTop=e.scrollHeight;});await page.locator('#scene-locale').selectOption('zh-CN');await page.locator('[data-action="reference-close"]').last().click();await page.waitForSelector('[data-c-ref="M03"]');const after=await dialog.evaluate(e=>e.scrollTop);assert.ok(Math.abs(after-before)<4,`scene pointer-down offset ${before} must restore, got ${after}`);
});
await check(['RT-C39'],'review-fix.edd-owner-question',{step:'edd',scenario:'SCN-EDD'},async page=>{
 const text=await page.locator('[data-c-panel="edd"]').innerText();assert.match(text,/Unknown/);assert.match(text,/C-Q-EDD-APPLICABILITY/);assert.match(text,/Unassigned/);
});
writeFileSync(dir+'review-regression-results.json',JSON.stringify({at:new Date().toISOString(),command:'node prototype/qa/batch-c/review-regressions.mjs',results,errors},null,2)+'\n');await browser.close();console.log({passed:results.filter(r=>r.status==='passed').length,failed:results.filter(r=>r.status==='failed'),errors});if(results.some(r=>r.status==='failed')||errors.length)process.exitCode=1;
