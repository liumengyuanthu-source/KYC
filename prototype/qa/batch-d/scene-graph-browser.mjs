import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='prototype/qa/batch-d/',results=[],browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const [scene,graph,node,next]of [['SCN-CREDIT','DG-D02','D02-INPUT','D02-REVISION'],['SCN-READINESS','DG-D03','D03-UNKNOWN','D03-AFFECTED']]){
 const context=await browser.newContext(),page=await context.newPage();page.setDefaultTimeout(7000);const state=()=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
 try{
  await page.goto(`http://127.0.0.1:8765/prototype/?scene=${scene}&locale=zh-CN`);await page.waitForSelector('#scenario-dialog[open]');const before=(await state()).data;
  await page.locator(`#scenario-dialog [data-d-node="${node}"]`).click();let s=await state();assert.equal(s.navigation.dGraph.graph,graph);assert.equal(s.navigation.dGraph.focus,node);assert.equal(await page.locator(`#scenario-dialog [data-d-semantic="${node}"].selected`).count(),1);
  await page.locator('#scenario-dialog [data-d-graph-command="NEXT"]').click();s=await state();assert.equal(s.navigation.dGraph.focus,next);assert.deepEqual(s.data,before);assert.ok(!s.data.demoConfig.batchD);
  for(const [beat,family,focus,following] of [['D5','DG-D03','D03-UNKNOWN','D03-AFFECTED'],['D1','DG-D01','D01-CREDIT','D01-LEGAL'],['D3','DG-D02','D02-INPUT','D02-REVISION']]){
   await page.locator(`#scenario-dialog button[data-d-beat="${beat}"]`).click();assert.equal((await state()).navigation.dGraph.graph,family);
   await page.locator(`#scenario-dialog [data-d-node="${focus}"]`).click();assert.equal((await state()).navigation.dGraph.focus,focus);
   await page.locator('#scenario-dialog [data-d-graph-command="NEXT"]').click();assert.equal((await state()).navigation.dGraph.focus,following);assert.deepEqual((await state()).data,before);
  }
  await page.screenshot({path:dir+`scene-graph-${graph}.zh-CN.png`});results.push({ids:['RT-D14','RT-D15'],name:`${scene} focuses and advances its rendered ${graph}`,status:'passed'});
 }catch(e){results.push({ids:['RT-D14','RT-D15'],name:`${scene} / ${graph}`,status:'failed',error:e.message});}finally{await context.close();}
}}finally{await browser.close();}
fs.writeFileSync(dir+'scene-graph-results.json',JSON.stringify({results},null,2)+'\n');console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
