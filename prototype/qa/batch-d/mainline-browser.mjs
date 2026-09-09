import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const dir='prototype/qa/batch-d/',base='http://127.0.0.1:8765/prototype/',results=[],errors=[];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1'))),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const click=async(action,value)=>{const selector=`[data-action="${action}"]${value?`[data-value="${value}"]`:''}`,inside=page.locator('dialog[open]').locator(selector).filter({visible:true});await (await inside.count()?inside:page.locator(selector).filter({visible:true})).first().click();};
const locale=async(value)=>{const el=page.locator('#scene-locale').filter({visible:true});await(await el.count()?el:page.locator('#locale')).selectOption(value);};
const shot=async(name)=>{await page.screenshot({path:dir+name+'.png',fullPage:false});return name+'.png';};
function record(){fs.writeFileSync(dir+'browser-results.json',JSON.stringify({at:new Date().toISOString(),command:'node prototype/qa/batch-d/mainline-browser.mjs',browser:browser.version(),results,errors},null,2)+'\n');}
async function check(ids,name,fn){const before=await state();try{const evidence=await fn();const after=await state();results.push({ids,name,status:'passed',before:{caseRevision:before?.data?.case?.revision,hash:hash(before?.data)},after:{caseRevision:after?.data?.case?.revision,hash:hash(after?.data)},evidence});record();}catch(e){results.push({ids,name,status:'failed',error:e.message});await shot('failure');record();throw e;}}
try{
 await page.goto(base+'?scene=SCN-CONFLICTS&locale=en-AU');await page.waitForSelector('#scenario-dialog[open]');
 const original=await state();
 await check(['RT-D15'],'Opening specialist scenario and switching Current/Target do not load a demo case',async()=>{
  assert.ok(!original.data.demoConfig.batchD);await click('compare','current');await click('compare','target');assert.equal(hash((await state()).data),hash(original.data));return shot('d-scenario.entry.en-AU');
 });
 await click('compare','current');
 if(!await page.locator('[data-action="d-start"]').filter({visible:true}).count())await click('product','condition');
 await click('d-start');await page.waitForFunction(()=>!!JSON.parse(sessionStorage.getItem('ctt-round-a-v1'))?.data?.demoConfig?.batchD);
 if(!await page.locator('.d-workspace').count())await click('product','condition');
 await check(['RT-D01','RT-D02','RT-D03','RT-D04','RT-D09','RT-D10','RT-D11'],'Explicit D fixture retains A/B/C, scoped conditions and an archived prior session',async()=>{
  const s=await state();assert.equal(s.data.case.id,'DEMO-CTT-001');assert.equal(s.data.scopes[0].id,'DEMO-CTT-001/scope/institutional');assert.equal(s.data.conflictReviews.at(-1).search_status,'complete');assert.equal(s.data.conflictReviews.at(-1).clearance_status,'pending');assert.equal(s.data.legalAgreements.at(-1).execution_status,'pending');assert.ok(s.archives.some(a=>hash(a.data)===hash(original.data)));assert.equal(s.data.authorities.find(a=>a.action_type==='execute_agreement').status,'not_established');assert.match(await page.locator('.d-workspace').innerText(),/Not Ready|not ready|尚未就绪/i);return shot('d-condition.en-AU');
 });
 const entry=await state();fs.writeFileSync(dir+'host-entry-session.json',JSON.stringify(entry,null,2)+'\n');
 await page.locator('[data-d-condition="legal"]').click();
 await check(['RT-D14','RT-D15'],'Dependency focus and playback return to the same condition, case and revision without business writes',async()=>{
  const before=await state();await click('d-dependency','DG-D02');await page.locator('[data-d-node="D02-INPUT"]').click();await page.locator('[data-d-graph-command="NEXT"]').click();await page.locator('[data-d-graph-command="PLAY"]').click();await page.waitForTimeout(700);const pause=page.locator('[data-d-graph-command="PAUSE"]');if(await pause.count())await pause.click();assert.equal(hash((await state()).data),hash(before.data));await shot('d-dependency.en-AU');await click('d-dependency-back');assert.equal((await state()).data.legalAgreements.at(-1).agreement_revision,3);assert.equal((await state()).navigation.scenario,before.navigation.scenario);return 'd-dependency.en-AU.png';
 });
 await check(['RT-D14'],'Latest language survives Product → Current scenario return and D1–D5 are presentation only',async()=>{
  const before=(await state()).data;await locale('zh-CN');await click('return','scenario');assert.equal((await state()).navigation.comparison,'current');assert.equal((await state()).navigation.locale,'zh-CN');
  for(const beat of ['D1','D2','D3','D4','D5']){await page.locator(`#scenario-dialog button[data-d-beat="${beat}"]`).click();assert.equal(hash((await state()).data),hash(before));}
  await shot('d-readiness.zh-CN');await page.locator('#scenario-dialog button[data-d-beat="D4"]').click();await click('product','condition');return 'd-readiness.zh-CN.png';
 });
 await check(['RT-D12'],'RM and client condition views and print contain no restricted conflict detail',async()=>{
  for(const role of ['ROLE-RM','ROLE-CLIENT']){await page.locator('#d-role').selectOption(role);const html=await page.locator('#app').innerHTML();assert.doesNotMatch(html,/restricted_detail|Internal relationship|SYN-CONFLICT-RESTRICTED/);assert.equal(await page.locator('[data-action="d-action"]:not(:disabled)').filter({visible:true}).count(),0);}
  return shot('d-client.zh-CN');
 });
 await page.locator('#d-role').selectOption('ROLE-FACILITATOR');await page.locator('[data-d-condition="credit"]').click();await locale('en-AU');
 await check(['RT-D07','RT-D18','RT-D11'],'Explicit Credit revision preserves historical Legal input and Not Ready',async()=>{
  const before=(await state()).data;await page.locator('#d-rationale').fill('Synthetic Credit source input revision for dependency review; no new bank terms or authority.');await click('d-action','revise_credit');const s=(await state()).data;
  assert.equal(s.agreementInputs.length,before.agreementInputs.length+1);assert.equal(s.legalAgreements.at(-1).credit_input_revision,1);assert.equal(s.legalAgreements.at(-1).agreement_revision,3);assert.deepEqual(s.agreementInputs[0],before.agreementInputs[0]);assert.match(await page.locator('.d-workspace').innerText(),/superseded|stale|旧输入|取代/i);return shot('d-credit.changed.en-AU');
 });
 const saved=await state();fs.writeFileSync(dir+'host-saved-session.json',JSON.stringify(saved,null,2)+'\n');
 await check(['RT-D15'],'Upstream legacy commands cannot write a D session',async()=>{
  const before=(await state()).data;await page.evaluate(()=>{for(const action of ['batch-action','case-action','c-action','collab-action']){const b=document.createElement('button');b.dataset.action=action;b.dataset.value='save_request';document.body.append(b);b.click();b.remove();}});assert.equal(hash((await state()).data),hash(before));return 'Four actual host-dispatched legacy command families rejected';
 });
 await check(['RT-D14'],'Explicit restore recovers the archived session and latest locale',async()=>{await locale('en-US');await click('d-restore');const restored=await state();assert.equal(hash(restored.data),hash(original.data));assert.equal(restored.navigation.locale,'en-US');assert.ok(restored.archives.length);return shot('d-restored.en-US');});
 assert.deepEqual(errors,[]);record();
}finally{await browser.close();}
console.log(JSON.stringify({checks:results.length,failed:results.filter(r=>r.status==='failed'),errors}));
