import {chromium} from '../tooling/node_modules/playwright/index.mjs';
import AxeBuilder from '../tooling/node_modules/@axe-core/playwright/dist/index.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {activities} from '../../prototype/journey/model.mjs';

const root='audit/journey-source-realignment';
const red=process.argv.includes('--red');
const results=[],errors=[];
mkdirSync(root,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();page.setDefaultTimeout(12000);
page.on('pageerror',error=>errors.push(error.message));
const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
const action=(name,value)=>page.locator(`#scenario-dialog[open] [data-action="${name}"]${value?`[data-value="${value}"]`:''}`);
async function check(name,fn){try{await fn();results.push({name,status:'passed'});}catch(error){results.push({name,status:'failed',error:error.message});throw error;}}
async function close(){await page.keyboard.press('Escape');await page.waitForSelector('#scenario-dialog[open]',{state:'hidden'});}
try{
 await page.goto('http://127.0.0.1:8765/prototype/#studio');
 await page.waitForSelector('.journey-scroll');
 await check('Role activities have real scenario entry controls',async()=>assert.ok(await page.locator('[data-action="journey-activity"]').count()>0,'Expected clickable role activities; existing static role rows have none'));
 if(!red){
 const before=(await state()).data,authority=(await state()).navigation.role;
 const roles=['ROLE-CLIENT','ROLE-RM','ROLE-KYCOPS','ROLE-QA','ROLE-FINCRIME','ROLE-CONFLICTS','ROLE-LEGAL','ROLE-CREDIT'];
 for(const role of roles)await check(`${role}: role-specific activity opens without changing product authority`,async()=>{
  await page.locator('#journey-role').selectOption(role);
  const card=page.locator('.journey-scroll [data-action="journey-activity"]').first();
  assert.ok(await card.count()>0);const id=await card.getAttribute('data-value');
  await card.click();await page.waitForSelector('#scenario-dialog[open]');
  assert.equal((await state()).navigation.role,authority);
  assert.equal((await state()).navigation.journeyActivity,id);
  assert.ok((await page.locator('#scenario-dialog').innerText()).length>300);
  assert.ok(await action('journey-detail').count()>0,'Activity has a link to the existing shared scenario');
  await close();
 });
 await check('All 30 role activities open their mapped shared scene and return without business writes',async()=>{
  for(const activity of activities){
   await page.locator('#journey-role').selectOption(activity.role);
   await page.locator(`.journey-scroll [data-action="journey-activity"][data-value="${activity.id}"]`).click();
   assert.equal((await state()).navigation.scenario,activity.scene,activity.id);
   await action('journey-detail').click();
   assert.equal((await state()).navigation.journeyView,'detail',activity.id);
   assert.equal((await state()).navigation.scenario,activity.scene,activity.id);
   assert.ok((await page.locator('#scenario-dialog').innerText()).length>300,activity.id);
   await close();
  }
  assert.deepEqual((await state()).data,before);
 });
 await page.locator('#journey-role').selectOption('ROLE-CLIENT');
 await page.locator('[data-action="compare"][data-value="current"]').first().click();
 await page.locator('.journey-scroll').evaluate(el=>{el.scrollLeft=700;el.dispatchEvent(new Event('scroll'));});
 const cards=page.locator('.journey-scroll [data-action="journey-activity"]');
 let visibleCard=cards.nth(Math.min(2,(await cards.count())-1));
 for(let i=0;i<await cards.count();i++){const card=cards.nth(i);if(await card.evaluate(el=>{const b=el.getBoundingClientRect(),p=el.closest('.journey-scroll').getBoundingClientRect();return b.left>=p.left&&b.right<=p.right;})){visibleCard=card;break;}}
 await visibleCard.scrollIntoViewIfNeeded();
 const originLeft=await page.locator('.journey-scroll').evaluate(el=>el.scrollLeft);
 await visibleCard.click();
 await check('Current/Target and bilingual switching preserve selected role activity and business data',async()=>{
  const original=(await state()).navigation;
  await action('compare','target').click();
  assert.equal((await state()).navigation.journeyActivity,original.journeyActivity);
  await page.locator('#scene-locale').selectOption('zh-CN');
  assert.equal((await state()).navigation.journeyActivity,original.journeyActivity);
  assert.equal((await state()).navigation.journeyRole,'ROLE-CLIENT');
  assert.match(await page.locator('#scenario-dialog').innerText(),/客户/);
  await action('compare','current').click();
  assert.deepEqual((await state()).data,before);
  await page.screenshot({path:`${root}/after-client-scenario.zh-CN.png`});
  const axe=await new AxeBuilder({page}).include('#scenario-dialog').analyze();
  writeFileSync(`${root}/activity-accessibility.json`,JSON.stringify({violations:axe.violations,incomplete:axe.incomplete},null,2));
 });
 await check('Escape restores horizontal position and focus to launching activity',async()=>{
  const id=(await state()).navigation.journeyActivity;
  await close();
  const left=await page.locator('.journey-scroll').evaluate(el=>el.scrollLeft);
  assert.ok(Math.abs(left-originLeft)<3,`scroll ${originLeft} -> ${left}`);
  await page.waitForFunction(id=>document.activeElement?.dataset?.action==='journey-activity'&&document.activeElement.dataset.value===id,id);
 });
 await check('Keyboard Enter opens activity and Escape closes',async()=>{
  await page.keyboard.press('Enter');await page.waitForSelector('#scenario-dialog[open]');await close();
 });
 await check('Full Journey print includes all roles, both comparisons and adjacent pains',async()=>{
  await page.locator('[data-action="mode"][data-value="print"]').first().click();
  const text=await page.locator('#main').innerText();
  for(const role of ['客户','法务','信贷','QA','利益冲突'])assert.ok(text.includes(role),role);
  assert.match(text,/Current/);assert.match(text,/Target/);assert.match(text,/持续监控|持续监测/);assert.match(text,/退出|终止/);
  const bodyWidth=await page.evaluate(()=>document.documentElement.scrollWidth);assert.ok(bodyWidth<=1440+2,`Print preview overflows: ${bodyWidth}`);
  await page.screenshot({path:`${root}/after-print.zh-CN.png`});
  await page.pdf({path:`${root}/journey-all-roles.zh-CN.pdf`,format:'A4',printBackground:true});
  // Chromium fires afterprint; the existing host may already restore the origin.
  const exitPrint=page.locator('[data-action="exit-print"]').first();
  if(await exitPrint.count())await exitPrint.click();
  assert.equal((await state()).navigation.page,'studio');
  assert.equal((await state()).navigation.journeyRole,'ROLE-CLIENT');
  assert.deepEqual((await state()).data,before);
 });
 await page.locator('#locale').selectOption('en-AU');
 await page.locator('#journey-role').selectOption('ROLE-KYCOPS');
 await page.locator('.journey-scroll').evaluate(el=>{el.scrollLeft=0;el.dispatchEvent(new Event('scroll'));});
 await page.locator('.journey-scroll [data-action="journey-activity"]').first().click();
 await check('Existing shared scene and Product return retain the original role activity',async()=>{
  const origin=(await state()).navigation;
  await action('journey-detail').click();
  assert.equal((await state()).navigation.scenario,origin.scenario);
  const product=page.locator('#scenario-dialog [data-action="product"],#scenario-dialog [data-action="rc-product"]');
  await product.first().click();
  await page.waitForFunction(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).navigation.page==='product');
  assert.equal((await state()).navigation.comparison,'target');
  await page.locator('#locale').selectOption('en-US');
  await page.locator('[data-action="return"][data-value="scenario"]').first().click();
  assert.equal((await state()).navigation.comparison,origin.comparison);
  assert.equal((await state()).navigation.journeyRole,origin.journeyRole);
  assert.equal((await state()).navigation.journeyActivity,origin.journeyActivity);
  assert.equal((await state()).navigation.locale,'en-US');
  assert.deepEqual((await state()).data,before);
  await close();
 });
 await page.locator('#locale').selectOption('en-AU');
 await page.screenshot({path:`${root}/after-journey.en-AU.png`,fullPage:false});
 const axe=await new AxeBuilder({page}).include('#main').analyze();
 writeFileSync(`${root}/journey-accessibility.json`,JSON.stringify({violations:axe.violations,incomplete:axe.incomplete},null,2));
 await check('Mobile has operable role activities without whole-page horizontal overflow',async()=>{
  await page.setViewportSize({width:390,height:844});
  await page.locator('#journey-role').selectOption('ROLE-QA');
  await page.locator('.journey-scroll [data-action="journey-activity"]').first().click();
  await page.waitForSelector('#scenario-dialog[open]');
  assert.ok(await page.locator('#scenario-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+2),'Modal content clipped horizontally');
  await page.screenshot({path:`${root}/after-mobile-scenario.png`});
  await close();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Whole page overflows mobile width');
  await page.screenshot({path:`${root}/after-mobile-journey.png`,fullPage:true});
 });
 await check('Read-only journey actions emit no business changes or browser errors',async()=>{assert.deepEqual((await state()).data,before);assert.deepEqual(errors,[]);});
 await check('Save / Discard / Stay still guard product edits entered from a role activity',async()=>{
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#journey-role').selectOption('ROLE-KYCOPS');
  await page.locator('.journey-scroll [data-action="journey-activity"]').first().click();
  await action('journey-detail').click();
  await page.locator('#scenario-dialog [data-action="product"],#scenario-dialog [data-action="rc-product"]').first().click();
  const field=page.locator('#batch-group');await field.waitFor();
  const savedValue=await field.inputValue();
  await field.fill('Draft-only test group');
  await page.locator('[data-action="return"][data-value="scenario"]').first().click();
  await page.locator('#dirty-dialog [data-action="guard"][data-value="stay"]').click();
  assert.equal(await field.inputValue(),'Draft-only test group');assert.equal((await state()).navigation.page,'product');
  await page.locator('[data-action="return"][data-value="scenario"]').first().click();
  await page.locator('#dirty-dialog [data-action="guard"][data-value="discard"]').click();
  assert.equal((await state()).navigation.page,'studio');assert.deepEqual((await state()).data,before);
  const detail=action('journey-detail');if(await detail.count())await detail.click();
  await page.locator('#scenario-dialog [data-action="product"],#scenario-dialog [data-action="rc-product"]').first().click();
  assert.equal(await field.inputValue(),savedValue);
  await field.fill('Local saved draft group');
  await page.locator('[data-action="return"][data-value="scenario"]').first().click();
  await page.locator('#dirty-dialog [data-action="guard"][data-value="save"]').click();
  const after=await state();assert.equal(after.navigation.page,'studio');
  assert.equal(after.data.scopes[0].group_display_name,'Local saved draft group');
  assert.deepEqual(after.data.clearanceConditions,before.clearanceConditions);
  assert.equal(after.data.case.publication_status,before.case.publication_status);
  await page.screenshot({path:`${root}/after-dirty-return.png`});
 });
 await check('Touch device can tap a role activity and scroll the horizontal journey',async()=>{
  const touchContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  try{
   const touchPage=await touchContext.newPage();
   await touchPage.goto('http://127.0.0.1:8765/prototype/#studio');
   await touchPage.waitForSelector('.journey-scroll');
   await touchPage.locator('.journey-scroll').scrollIntoViewIfNeeded();
   const box=await touchPage.locator('.journey-scroll').boundingBox();
   const cdp=await touchContext.newCDPSession(touchPage);
   const x=Math.min(box.x+box.width-25,365),y=box.y+30;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
   for(let delta=20;delta<=120;delta+=20)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-delta,y}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await touchPage.waitForFunction(()=>document.querySelector('.journey-scroll').scrollLeft>20);
   const card=touchPage.locator('.journey-scroll [data-action="journey-activity"]').first();
   await card.scrollIntoViewIfNeeded();await card.tap();
   await touchPage.waitForSelector('#scenario-dialog[open]');
   await touchPage.screenshot({path:`${root}/after-touch.png`});
  }finally{await touchContext.close();}
 });
 await check('Preview link opens Journey from saved Product without resetting the case',async()=>{
  const detail=action('journey-detail');if(await detail.count())await detail.click();
  await page.locator('#scenario-dialog [data-action="product"],#scenario-dialog [data-action="rc-product"]').first().click();
  const current=(await state()).data;
  await page.goto('http://127.0.0.1:8765/prototype/?studio=journey');
  await page.waitForSelector('.journey-scroll');
  assert.equal((await state()).navigation.page,'studio');assert.equal((await state()).navigation.modal,false);
  assert.deepEqual((await state()).data,current);
  assert.notEqual(new URL(page.url()).searchParams.get('studio'),'journey');
 });
 }
}catch(error){await page.screenshot({path:`${root}/${red?'red':'failure'}.png`}).catch(()=>{});process.exitCode=1;}
finally{
 writeFileSync(`${root}/${red?'red':'browser-results'}.json`,JSON.stringify({at:new Date().toISOString(),results,errors},null,2));
 console.log(JSON.stringify({passed:results.filter(x=>x.status==='passed').length,failed:results.filter(x=>x.status==='failed'),errors},null,2));
 await browser.close();
}
