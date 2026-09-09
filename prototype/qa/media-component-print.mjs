import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1000,height:1200}}),results=[];
try{await page.route('**/component-print-proof',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta charset="utf-8"></head><body><div id="proof"></div></body></html>'}));
 for(const scene of ['SCN-SCOPE','SCN-ENTITY']){
  await page.goto('http://127.0.0.1:8765/prototype/component-print-proof');await page.evaluate(async scene=>{const {mountMedia}=await import('/prototype/batch-a-media.mjs');await mountMedia(document.querySelector('#proof'),{scene,locale:'en-AU'});},scene);
  await page.emulateMedia({media:'print'});const articles=page.locator('#proof .static-story article');const count=scene==='SCN-SCOPE'?5:6;
  assert.equal(await articles.count(),count);for(let i=0;i<count;i++)assert.ok(await articles.nth(i).isVisible(),`cue ${i} must render in print`);
  const help=page.locator('#proof [data-help-content]');assert.equal(await help.getAttribute('role'),'dialog');const name=await help.getAttribute('aria-labelledby');assert.ok(name);assert.ok((await page.locator(`#proof #${name}`).textContent()).trim());
  await page.locator('#proof .static-story').screenshot({path:`prototype/qa/media-mainline/component-print.${scene}.png`});
  results.push({scene,status:'passed',visible_print_cues:count,help_role:'dialog'});
 }
 writeFileSync('prototype/qa/media-mainline/component-print-results.json',JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results));
}finally{await browser.close()}
