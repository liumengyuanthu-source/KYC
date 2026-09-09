import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const dir='prototype/qa/d3a/before';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
try{for(const scene of ['SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE']){
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/prototype/?locale=zh-CN');await page.locator(`[data-action="scene"][data-value="${scene}"]`).first().click();await page.locator('#scenario-dialog[open]').waitFor();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${dir}/${scene}.png`});
 results.push({scene,errors,title:await page.locator('#scene-title').innerText(),screenshot:`${dir}/${scene}.png`});await page.close();
}}finally{await browser.close();fs.writeFileSync(`${dir}/results.json`,JSON.stringify(results,null,2));}console.log(results);
