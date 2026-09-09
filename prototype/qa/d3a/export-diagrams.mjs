import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const {diagramAssets}=await import('../../reconstruction/diagram-manifest.mjs');
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
try{for(const asset of diagramAssets){const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce',acceptDownloads:true});
 try{await page.goto('http://127.0.0.1:8765/prototype/'+asset.html);await page.locator('#btn-export').click();const pending=page.waitForEvent('download');await page.locator('[data-format="svg"]').click();const download=await pending;assert.equal(await download.failure(),null);await download.saveAs('prototype/'+asset.svg);
 const bytes=fs.readFileSync('prototype/'+asset.svg),body=bytes.toString();assert.match(body,/<svg/);assert.doesNotMatch(body,/<script[\s>]/i);
 for(const ref of asset.nodeRefs)assert.ok(body.includes(`data-node-id="${ref.graphNodeId}"`),`Missing exported node ${ref.nodeId}`);
 results.push({html:asset.html,svg:asset.svg,status:'passed',sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length});
 }catch(e){results.push({html:asset.html,status:'failed',error:e.message});}finally{await page.close();fs.writeFileSync('prototype/qa/d3a/diagram-exports.json',JSON.stringify({at:new Date().toISOString(),results},null,2));}
}}finally{await browser.close();}console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
