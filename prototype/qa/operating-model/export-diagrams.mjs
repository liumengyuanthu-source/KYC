import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const {manifest}=JSON.parse(fs.readFileSync('prototype/qa/operating-model/diagrams/build-manifest.json'));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
try{for(const asset of manifest){const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce',acceptDownloads:true});
 try{await page.goto('http://127.0.0.1:8765/'+asset.output);await page.locator('#btn-export').click();const pending=page.waitForEvent('download');await page.locator('[data-format="svg"]').click();const download=await pending;assert.equal(await download.failure(),null);const svg=asset.output.replace('.archify.html','.svg');await download.saveAs(svg);
 const bytes=fs.readFileSync(svg),body=bytes.toString();assert.match(body,/<svg/);assert.doesNotMatch(body,/<script[\s>]/i);for(const ref of asset.nodeRefs)assert.ok(body.includes(`data-node-id="${ref}"`),`Missing exported node ${ref}`);
 await page.screenshot({path:`prototype/qa/operating-model/diagrams/${asset.id}.${asset.locale}.png`});results.push({html:asset.output,svg,status:'passed',sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length});
 }catch(e){results.push({html:asset.output,status:'failed',error:e.message});}finally{await page.close();fs.writeFileSync('prototype/qa/operating-model/diagrams/exports.json',JSON.stringify({at:new Date().toISOString(),results},null,2));}
}}finally{await browser.close();}console.log({checks:results.length,passed:results.filter(x=>x.status==='passed').length,failed:results.filter(x=>x.status==='failed')});if(results.some(r=>r.status==='failed'))process.exitCode=1;
