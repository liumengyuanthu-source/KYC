import { chromium } from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.dirname(out);
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const reports=[];
try {
 for(const locale of ['en-AU','zh-CN']){
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/prototype/?locale='+locale);
  await page.locator('.journey-scroll').waitFor();await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(out,'studio.'+locale+'.1440x900.png')});
  await page.locator('.details-block').first().locator('summary').click();
  await page.waitForFunction(()=>[...document.querySelectorAll('img.diagram')].every(x=>x.complete&&x.naturalWidth>0));
  await page.screenshot({path:path.join(out,'studio.'+locale+'.full.png'),fullPage:true});
  const metrics=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,journeyWidth:document.querySelector('.journey-scroll').clientWidth,journeyScrollWidth:document.querySelector('.journey-scroll').scrollWidth}));
  await context.close();
  const printContext=await browser.newContext({viewport:{width:1440,height:900}});const print=await printContext.newPage();
  await print.goto('http://127.0.0.1:8765/prototype/?mode=print&locale='+locale);
  await print.locator('[data-print-scope="round-a-all"]').waitFor();
  await print.waitForFunction(()=>document.querySelectorAll('.print-diagram img').length===3&&[...document.querySelectorAll('.print-diagram img')].every(x=>x.complete&&x.naturalWidth>0));
  await print.evaluate(()=>document.fonts.ready);
  const printDom=await print.evaluate(()=>({text:document.querySelector('.print-sheet').innerText,sectionCount:document.querySelectorAll('.print-scene').length,diagrams:[...document.querySelectorAll('.print-diagram img')].map(x=>({src:x.getAttribute('src'),loaded:x.complete&&x.naturalWidth>0,width:x.naturalWidth,height:x.naturalHeight})),caseRevision:JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data.case.revision}));
  await print.screenshot({path:path.join(out,'print-preview.'+locale+'.full.png'),fullPage:true});
  await print.pdf({path:path.join(out,'round-a-print-proof.'+locale+'.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
  reports.push({locale,studio:metrics,print:printDom,pageErrors:errors,pdf:'round-a-print-proof.'+locale+'.pdf'});
  await printContext.close();
 }
 console.log(JSON.stringify({capturedAt:new Date().toISOString(),sourceHashes:Object.fromEntries(['app.mjs','navigation.mjs','studio.css','content.mjs','case-engine.mjs','../04_operating_model/round-a/synthetic-case-fixture.json'].map(f=>[f,hash(path.join(root,f))])),reports},null,2));
}finally{await browser.close();}
