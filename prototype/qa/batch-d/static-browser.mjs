import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {navigate} from '../../navigation.mjs';
const dir='prototype/qa/batch-d/',session=JSON.parse(fs.readFileSync(dir+'host-saved-session.json')),results=[];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const kind of ['missing-image','reduced-motion','client-print','rm-mobile']){
 const s=structuredClone(session),role=kind==='client-print'?'ROLE-CLIENT':kind==='rm-mobile'?'ROLE-RM':'ROLE-FACILITATOR';
 s.navigation={...s.navigation,page:'product',step:'condition',mode:kind==='client-print'?'print':'explore',modal:false,reference:null,locale:kind==='rm-mobile'?'zh-CN':'en-AU',role,conditionDomain:'legal',agreementRevision:3,dependency:null};
 if(['missing-image','reduced-motion'].includes(kind))s.navigation=navigate(s.navigation,{type:'D_DEPENDENCY',graph:'DG-D03'});
 s.data.conflictFindings[0].restricted_detail='RESTRICTED_D_CANARY';s.data.conflictFindings[0].summary='RESTRICTED_D_CANARY';
 const context=await browser.newContext({viewport:{width:kind==='rm-mobile'?390:1440,height:kind==='rm-mobile'?844:1000},reducedMotion:kind==='reduced-motion'?'reduce':'no-preference'}),page=await context.newPage();page.setDefaultTimeout(7000);
 await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),s);
 if(kind==='missing-image')await context.route('**/*',r=>r.request().url().includes('/diagrams/batch-d/')&&r.request().url().endsWith('.svg')?r.abort():r.continue());
 try{
  await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector(kind==='client-print'?'.print-sheet':'.d-workspace');
  const before=JSON.stringify((await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')))).data);
  if(kind==='missing-image'){assert.equal(await page.locator('[data-d-semantic]').count(),10);assert.equal(await page.locator('[data-d-edge]').count(),13);await page.locator('[data-d-node="D03-UNKNOWN"]').click();assert.equal(await page.locator('[data-d-semantic]').count(),10);}
  if(kind==='reduced-motion'){await page.locator('[data-d-graph-command="PLAY"]').click();await page.waitForTimeout(800);assert.equal(await page.locator('[data-d-graph-command="PAUSE"]').count(),0);}
  if(['client-print','rm-mobile'].includes(kind))assert.doesNotMatch(await page.locator('#app').innerHTML(),/RESTRICTED_D_CANARY|restricted_detail/);
  if(kind==='rm-mobile'){const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));}
  assert.equal(JSON.stringify((await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')))).data),before);
  await page.screenshot({path:dir+kind+'.png',fullPage:kind==='rm-mobile'});results.push({kind,status:'passed',evidence:kind+'.png',ids:kind.includes('client')||kind==='rm-mobile'?['RT-D12']:['RT-D15']});
 }catch(e){results.push({kind,status:'failed',error:e.message});}finally{await context.close();}
}
 const context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
 try{await page.goto('http://127.0.0.1:8765/prototype/');const links=page.locator('noscript a[href*="/diagrams/batch-d/"]');assert.ok(await links.count()>=3);const hrefs=await links.evaluateAll(es=>es.map(e=>e.getAttribute('href')));for(const id of ['DG-D01','DG-D02','DG-D03'])assert.ok(hrefs.some(h=>h.includes(id)));results.push({kind:'javascript-disabled-static-links',status:'passed',ids:['RT-D15'],evidence:hrefs});}catch(e){results.push({kind:'javascript-disabled-static-links',status:'failed',error:e.message});}finally{await context.close();}
}finally{await browser.close();}
fs.writeFileSync(dir+'static-results.json',JSON.stringify({results},null,2)+'\n');console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
