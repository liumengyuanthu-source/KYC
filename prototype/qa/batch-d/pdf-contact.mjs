import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const dir='prototype/qa/batch-d/';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const name of ['credit.en-AU','legal.zh-CN','client.en-US']){
 const pages=fs.readdirSync(dir).filter(f=>f.startsWith('pdf-'+name+'-')&&f.endsWith('.png')).sort();
 const page=await browser.newPage({viewport:{width:1350,height:1000}});
 await page.setContent(`<style>body{margin:12px;background:#d8d8d8;font:14px sans-serif}main{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0}img{display:block;width:100%}figcaption{padding:6px;background:white}</style><main>${pages.map((p,i)=>`<figure><figcaption>${name} · Page ${i+1}</figcaption><img src="http://127.0.0.1:8765/prototype/qa/batch-d/${p}"></figure>`).join('')}</main>`);
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete));await page.screenshot({path:dir+'contact-'+name+'.png',fullPage:true});await page.close();
}}finally{await browser.close();}
