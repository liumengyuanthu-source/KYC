import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const out=new URL('./glass/',import.meta.url),url='http://127.0.0.1:8765/prototype/';fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const report={at:new Date().toISOString(),checks:[],screens:[]};
const screenshot=async(p,name,fullPage=false)=>{await p.waitForFunction(()=>[...document.querySelectorAll('img.diagram')].every(i=>i.complete&&i.naturalWidth>0));await p.screenshot({path:fileURLToPath(new URL(name,out)),fullPage});report.screens.push(name)};
const read=p=>p.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
try{
 for(const locale of ['zh-CN','en-AU','en-US']){
  const cx=await b.newContext({viewport:{width:1440,height:900}}),p=await cx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(url+'?locale='+locale);await p.locator('.journey-frame').waitFor();await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),1440);await screenshot(p,'studio.'+locale+'.png');
  report.checks.push({locale,documentOverflow:false,pageErrors:errors,firstScene:await p.locator('.scene-card.selected').boundingBox()});
  if(locale==='zh-CN'){
   await p.locator('.storyrail [data-value="SCN-MATCH"]').click();await screenshot(p,'scenario.zh-CN.png');await p.locator('#scenario-dialog [data-action="close"]').click();
   const heading=p.locator('.stage-column[data-stage="S2"] .stage-heading'),h=await heading.boundingBox();const before=await p.locator('.journey-scroll').evaluate(e=>e.scrollLeft);
   await p.mouse.move(h.x+h.width-30,h.y+30);await p.mouse.down();await p.mouse.move(h.x+50,h.y+30,{steps:12});await p.mouse.up();const moved=await p.locator('.journey-scroll').evaluate(e=>e.scrollLeft);assert.ok(moved>before+100);
   await p.locator('.storyrail [data-value="SCN-MATCH"]').click();await p.locator('#scenario-dialog [data-action="close"]').click();assert.equal(await p.locator('.journey-scroll').evaluate(e=>e.scrollLeft),moved);report.checks.push({drag:{before,moved,restored:true}});
  }
  await p.locator('.storyrail [data-value="SCN-REQUIREMENTS"]').click();await p.locator('#scenario-dialog [data-action="product"]').click();
  if(locale==='en-AU'){
   const primary=p.locator('[data-value="confirm_requirements"]');await primary.hover();await screenshot(p,'button-hover.en-AU.png');await p.mouse.down();await p.waitForTimeout(140);await screenshot(p,'button-pressed.en-AU.png');await p.mouse.up();
   // The normal click above is the real first business action.
   assert.equal((await read(p)).data.case.revision,2);
   await p.locator('.work-nav [data-value="evidence"]').click();await p.locator('#rationale').fill('Registry supports the synthetic legal entity for identity only; screening needs a separate purpose assessment.');await p.locator('[data-value="reuse_identity"]').click();
   await p.locator('.work-nav [data-value="gaps"]').click();await p.locator('#rationale').fill('Request the missing identifier and entity-type evidence for screening disambiguation.');await p.locator('[data-value="send_residual_request"]').click();await p.locator('[data-value="receive_supplement"]').click();
   await p.locator('.work-nav [data-value="validation"]').click();await p.locator('#rationale').fill('Received synthetic supplement supports this subject and screening-disambiguation purpose.');await p.locator('[data-value="assess_supplement"]').click();
   await p.locator('.work-nav [data-value="screening"]').click();assert.ok(await p.locator('[data-value="record_disposition"]').isDisabled());const blockedRevision=(await read(p)).data.case.revision;
   await screenshot(p,'disabled-role.en-AU.png');await p.locator('#product-role').selectOption('ROLE-FINCRIME');await p.locator('#rationale').fill('Reviewed SYN-A-104 against SYN-B-207 and AU against NZ alongside the sufficient purpose assessment. These synthetic records represent different subjects.');
   await p.locator('#rationale').focus();await screenshot(p,'screening.en-AU.png');await p.locator('[data-value="record_disposition"]').click();await p.locator('.work-nav [data-value="clearance"]').click();
   const d=(await read(p)).data;assert.equal(d.case.revision,7);assert.equal(d.decisions.length,1);assert.equal(d.readinessSnapshots.at(-1).result,'not_ready');assert.equal(d.case.publication_status,'not_requested');report.checks.push({route:{blockedRevision,revision:d.case.revision,decisions:1,readiness:'not_ready',publication:d.case.publication_status}});
   await p.mouse.move(1,1);await p.waitForTimeout(550);await screenshot(p,'clearance.en-AU.png');
   assert.equal(await p.locator('.glass-surface,.selection-glass').evaluateAll(es=>es.flatMap(e=>e.getAnimations()).filter(a=>a.playState==='running').length),0);report.checks.push({idleAnimations:0});
   await p.locator('[data-action="return"][data-value="journey"]').click();await p.locator('[data-action="mode"][data-value="print"]').click();await p.waitForFunction(()=>[...document.querySelectorAll('.print-diagram img')].every(e=>e.complete&&e.naturalWidth));await p.emulateMedia({media:'print'});
   await screenshot(p,'print.en-AU.png',true);const print=await p.locator('.print-sheet').innerText();assert.equal(new Set(print.match(/SCN-[A-Z-]+/g)||[]).size,15);assert.equal(await p.locator('.print-diagram').count(),3);assert.equal(await p.locator('.topbar').isVisible(),false);report.checks.push({print:{uniqueScenarioIDs:15,diagrams:3,screenNavigationHidden:true}});
  }
  if(locale==='zh-CN')await screenshot(p,'workspace.zh-CN.png');
  assert.equal(errors.length,0);await cx.close();
 }
 const touch=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),p=await touch.newPage();await p.goto(url+'?locale=zh-CN');await p.locator('.storyrail').waitFor();
 const target=p.locator('[data-value="current"][data-action="compare"]').first();await target.scrollIntoViewIfNeeded();const rect=await target.boundingBox(),cdp=await touch.newCDPSession(p);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:rect.x+rect.width/2,y:rect.y+rect.height/2}]});await p.waitForTimeout(120);assert.ok(await target.evaluate(e=>e.classList.contains('is-pressed')));await screenshot(p,'touch-pressed.zh-CN.png');await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(500);assert.equal((await read(p)).navigation.comparison,'current');assert.equal(await p.locator('.is-pressed').count(),0);report.checks.push({touchPressRelease:true});
 await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-transparency',value:'reduce'}]});assert.equal(await p.locator('.journey-studio').evaluate(e=>getComputedStyle(e).backdropFilter),'none');report.checks.push({reducedTransparencyFallback:true});
 await p.locator('.storyrail [data-value="SCN-MATCH"]').click();await p.locator('#scenario-dialog [data-action="product"]').click();await p.locator('.work-nav [data-value="clearance"]').click();const returnBox=await p.locator('.returnbar').boundingBox(),panel=await p.locator('.work-panel').boundingBox();assert.ok(panel.y>=returnBox.y+returnBox.height,JSON.stringify({returnBox,panel}));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),390);report.checks.push({mobileReturnDoesNotCoverContent:true});await screenshot(p,'workspace-mobile.zh-CN.png');await touch.close();
 const narrow=await b.newContext({viewport:{width:1024,height:768}}),q=await narrow.newPage();await q.goto(url+'?locale=en-AU');await q.locator('.journey-frame').waitFor();assert.equal(await q.evaluate(()=>document.documentElement.scrollWidth),1024);report.checks.push({width1024Overflow:false});await narrow.close();
 report.sourceHashes=Object.fromEntries(['app.mjs','glass.mjs','glass.css','studio.css','case-engine.mjs'].map(f=>[f,createHash('sha256').update(fs.readFileSync(new URL('../'+f,import.meta.url))).digest('hex')]));
 fs.writeFileSync(new URL('proof.json',out),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await b.close()}
