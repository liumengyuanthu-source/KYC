import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import path from 'node:path';import{fileURLToPath}from'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();const results={};
const read=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
try{
 await page.goto('http://127.0.0.1:8765/prototype/?locale=en-AU');await page.locator('.journey-scroll').waitFor();
 await page.locator('.journey-frame').scrollIntoViewIfNeeded();
 const box=await page.locator('.journey-scroll').boundingBox();
 const before=await page.locator('.journey-scroll').evaluate(x=>x.scrollLeft);
 const dragY=Math.max(120,box.y+85);
 const hit=await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.className,{x:box.x+box.width*.68,y:dragY});
 await page.mouse.move(box.x+box.width*.68,dragY);await page.mouse.down();await page.mouse.move(box.x+box.width*.40,dragY,{steps:12});await page.mouse.up();
 const after=await page.locator('.journey-scroll').evaluate(x=>x.scrollLeft);
 await page.locator('.storyrail [data-value="SCN-MATCH"]').click();
 await page.locator('#scenario-dialog [data-action="close"]').click();
 const restored=await page.locator('.journey-scroll').evaluate(x=>x.scrollLeft);
 results.drag={method:'Playwright mouse emits real browser pointer events over measured stage-header coordinates',box,dragY,hit,before,after,restored,passed:Math.abs(after-before)>100&&Math.abs(after-restored)<2};
 await page.locator('.journey-frame').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'drag-restored.en-AU.png')});
 await page.locator('.topnav [data-action="product"]').click();await page.locator('#rationale').fill('Independent QA unsaved draft.');
 await page.locator('#product-role').selectOption('ROLE-FINCRIME');await page.locator('#dirty-dialog [data-value="stay"]').click();
 results.roleStay={uiRole:await page.locator('#product-role').inputValue(),storedRole:(await read()).navigation.role,notice:await page.locator('.work-panel .notice').textContent()};
 await page.screenshot({path:path.join(out,'role-stay.en-AU.png'),fullPage:true});
 await context.close();
 const second=await browser.newContext({viewport:{width:1440,height:900}});const p=await second.newPage();
 await p.goto('http://127.0.0.1:8765/prototype/?locale=en-AU');await p.locator('#trigger').selectOption('product-extension');
 await p.locator('.topnav [data-action="product"]').click();await p.locator('.work-nav [data-value="requirements"]').click();
 const enabled=await p.locator('[data-value="confirm_requirements"]').isEnabled();
 if(enabled)await p.locator('[data-value="confirm_requirements"]').click();
 results.unsupportedTrigger=await p.evaluate(()=>{const s=JSON.parse(sessionStorage.getItem('ctt-round-a-v1'));return{navigationTrigger:s.navigation.trigger,caseTrigger:s.data.case.trigger_id,caseRevision:s.data.case.revision,lastEvent:s.data.auditEvents.at(-1).event_type}});results.unsupportedTrigger.confirmActionEnabled=enabled;
 await p.screenshot({path:path.join(out,'unsupported-trigger-product.en-AU.png'),fullPage:true});await second.close();
 results.readOnlyRoles=[];
 for(const role of ['ROLE-CLIENT','ROLE-RM','ROLE-REVIEWER','ROLE-SPECIALISTS']){
  const cx=await browser.newContext({viewport:{width:1440,height:900}});const px=await cx.newPage();
  await px.goto('http://127.0.0.1:8765/prototype/?locale=en-AU');await px.locator('#role').selectOption(role);await px.locator('.topnav [data-action="product"]').click();
  results.readOnlyRoles.push({role,uiRole:await px.locator('#product-role').inputValue(),label:await px.locator('#product-role option:checked').textContent(),enabledActions:await px.locator('[data-action="case-action"]:enabled').count()});await cx.close();
 }
 console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
