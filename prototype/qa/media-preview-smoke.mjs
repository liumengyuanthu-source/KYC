import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),results=[];
try{for(const scene of ['SCN-SCOPE','SCN-ENTITY']){
 await page.goto(`http://127.0.0.1:8765/prototype/?scene=${scene}&locale=zh-CN&focus=media`);await page.waitForSelector('[data-media-status="ready"]');
 const geometry=await page.evaluate(()=>{const head=document.querySelector('.modal-head'),panel=document.querySelector('.mainline-media'),slot=document.querySelector('.media-player-slot');return {headBottom:head.getBoundingClientRect().bottom,panelTop:panel.getBoundingClientRect().top,transportPosition:getComputedStyle(slot.shadowRoot.querySelector('.transport')).position,time:slot.dataset.mediaTime};});
 assert.ok(geometry.panelTop>=geometry.headBottom);assert.ok(geometry.panelTop<geometry.headBottom+24);assert.equal(geometry.transportPosition,'static');assert.equal(geometry.time,'0');
 await page.screenshot({path:`prototype/qa/media-mainline/preview.${scene}.zh-CN.png`});
 results.push({scene,status:'passed',geometry});
}writeFileSync('prototype/qa/media-mainline/preview-smoke.json',JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results));}finally{await browser.close()}
