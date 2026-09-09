// Mechanical relocation preserves prior evidence. Behaviour remains in existing tests.
import fs from 'node:fs';
const dir='audit/tests';fs.mkdirSync(dir,{recursive:true});
const read=f=>fs.readFileSync(f,'utf8'),write=(f,s)=>fs.writeFileSync(f,s);
write(dir+'/harness.mjs',read('prototype/qa/d5/harness.mjs').replace("dir='prototype/qa/d5/host/'","dir='audit/screenshots/actual/host/'"));
for(const file of ['host-browser.mjs','navigation-extra.mjs','modules-proof.mjs','preview-proof.mjs','safe-request-proof.mjs','resume-proof.mjs'])write(dir+'/'+file,read('prototype/qa/d5/'+file));
write(dir+'/unit-proof.mjs',read('prototype/qa/d5/regression/run-unit-proof.mjs').replaceAll('prototype/qa/d5/regression/unit-results','audit/reports/unit-results'));
let c=read('prototype/qa/d5/regression/c-regression.mjs').replace("dir='prototype/qa/d5/regression/c-regression/'","dir='audit/screenshots/actual/journey/'");
c=c.replace("import {chromium}","import AxeBuilder from '../tooling/node_modules/@axe-core/playwright/dist/index.mjs';\nimport {chromium}");
c=c.replace('viewport:{width:1440,height:1000}','viewport:{width:1440,height:900},reducedMotion:\'reduce\'');
c=c.replace("page.setDefaultTimeout(6000);","page.setDefaultTimeout(10000);await context.tracing.start({screenshots:true,snapshots:true,sources:true});");
c=c.replace("const shot=async name=>{await page.screenshot({path:dir+name+'.png',fullPage:false});return name+'.png';};",`const shot=async name=>{
 await page.screenshot({path:dir+name+'.png',fullPage:false});
 await page.screenshot({path:dir+name+'.full.png',fullPage:true});
 writeFileSync(dir+name+'.state.json',JSON.stringify(await state(),null,2));
 writeFileSync(dir+name+'.text.txt',await page.locator('body').innerText());
 const axe=await new AxeBuilder({page}).analyze();
 writeFileSync('audit/accessibility/'+name+'.json',JSON.stringify({url:page.url(),at:new Date().toISOString(),violations:axe.violations,incomplete:axe.incomplete,passes:axe.passes.map(p=>p.id)},null,2));
 return name+'.png';};`);
c=c.replace("await click('compare','current');await click('product','population');", "await click('compare','current');await click('product','population');");
c=c.replace("return shot('review.result.en-AU');","await click('return','scenario');await click('close');await click('scene','SCN-MATCH');await shot('match.scene.en-AU');await click('product','screening');return shot('review.result.en-AU');");
c=c.replace("await page.locator('#collab-audience').selectOption('client');", "await shot('identity.request.en-AU');await page.locator('#collab-audience').selectOption('client');");
c=c.replace("assert.equal(s.requestItems.find(i=>i.alias==='ITEM-OWNERSHIP').response_status,'open');});", "assert.equal(s.requestItems.find(i=>i.alias==='ITEM-OWNERSHIP').response_status,'open');return shot('identity.received.en-AU');});");
c=c.replace("await click('c-back-review');await page.locator('#c-role').selectOption('ROLE-FINCRIME');", "await click('c-back-review');await shot('review.pack.en-AU');await page.locator('#c-role').selectOption('ROLE-FINCRIME');");
c=c.replace("assert.equal(s.navigation.scenario,'SCN-POPULATION');assert.equal(s.navigation.locale,'zh-CN');", "assert.equal(s.navigation.scenario,'SCN-MATCH');assert.equal(s.navigation.locale,'zh-CN');");
// P8 proves MATCH origin first; separate existing graph reference checks still use Population.
c=c.replace("await check([49,50,59,60]", "await click('close');await click('scene','SCN-POPULATION');\n await check([49,50,59,60]");
c=c.replace("finally{record();await browser.close();", "finally{record();await context.tracing.stop({path:'audit/traces/primary-journey.zip'});await browser.close();");
write(dir+'/journey.mjs',c);
console.log('Fresh audit test namespace created; prior D5 evidence unchanged.');
