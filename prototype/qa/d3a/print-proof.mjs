import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
import {branches,comparisonFor} from '../../reconstruction/registry.mjs';
const dir='prototype/qa/d3a/print/',pdfDir='output/pdf/d3a/';fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(pdfDir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
try{for(const [branchId,scene] of [['BR-03','SCN-REQUIREMENTS'],['BR-04','SCN-SOURCE'],['BR-05','SCN-GAP']])for(const locale of ['zh-CN','en-AU','en-US']){
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();page.setDefaultTimeout(8000);
 const name=branchId+'.'+locale;try{
  await page.goto(`http://127.0.0.1:8765/prototype/?scene=${scene}&locale=${locale}`);await page.locator('[data-action="rc-compare"]').click();
  const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));
  await page.locator('[data-action="rc-print"]').click();const print=page.locator(`[data-print-branch="${branchId}"]`);await print.waitFor();
  const text=await print.innerText(),branch=branches.find(b=>b.branch_id===branchId),models=branch.scenario_refs.map(s=>comparisonFor(s,locale));
  const mappings=[...new Map(models.flatMap(m=>m.mappings).map(m=>[m.mapping_id,m])).values()];
  assert.equal(await print.locator('[data-mapping-id]').count(),mappings.length);
  for(const mapping of mappings){assert.ok(text.includes(mapping.mapping_id),mapping.mapping_id);for(const ref of [...mapping.current_source_refs,...mapping.target_source_refs])assert.ok(text.includes(ref),ref);}
  for(const word of ['Entity A','Entity B','Person T','FX forward'])assert.ok(text.includes(word),word);
  for(const node of models.flatMap(m=>m.nodes))for(const ref of [...(node.input_refs||[]),...(node.output_refs||[])])assert.ok(text.includes(ref),ref+' must survive print');
  assert.equal(await print.locator('pre').count(),0,'Raw serialized source JSON must not dominate human-readable print');
  assert.match(text,/hypothesis|假设/i);assert.match(text,/unresolved|unknown|未决|未知/i);
  assert.doesNotMatch(text,/\/Users\/|file:\/\//);
  await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
  const pdf=pdfDir+name+'.pdf';await page.pdf({path:pdf,format:'A4',landscape:true,preferCSSPageSize:true,printBackground:true});
  const after=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));assert.deepEqual(after.data,before.data);
  await page.emulateMedia({media:'screen'});const exit=page.locator('[data-action="exit-print"]');if(await exit.isVisible())await exit.click();
  const restored=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')));assert.equal(restored.navigation.scenario,before.navigation.scenario);assert.equal(restored.navigation.locale,locale);assert.notEqual(restored.navigation.mode,'print');assert.equal(restored.navigation.reconstruction.mappingId,before.navigation.reconstruction.mappingId);
  results.push({ids:['UX-08','UX-23','UX-26'],branchId,scene,locale,status:'passed',mappingCount:mappings.length,pdf,businessStateUnchanged:true,visualStatus:'pending'});
 }catch(e){results.push({branchId,scene,locale,status:'failed',error:e.message});await page.screenshot({path:dir+name+'.failure.png'}).catch(()=>{});}finally{await context.close();fs.writeFileSync(dir+'results.json',JSON.stringify({at:new Date().toISOString(),results},null,2));}
}}finally{await browser.close();}console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
