import fs from 'node:fs';import {spawn} from 'node:child_process';
const files=['regression/a-regression.mjs','regression/b-regression.mjs','regression/c-regression.mjs','regression/d-mainline-browser.mjs','regression/d-return-browser.mjs','regression/d-scene-graph-browser.mjs','regression/host-browser.mjs','regression/navigation-edge.mjs','regression/product-return.mjs','regression/print-reentry.mjs','regression/chain-preview.mjs','om-regression/host-browser.mjs','om-regression/navigation-edge.mjs','om-regression/product-return.mjs','om-regression/review-regression.mjs','om-regression/print-lifecycle.mjs'];
const output='prototype/qa/d5/regression-runs.json',retry=process.argv.includes('--retry-failed'),prior=retry?JSON.parse(fs.readFileSync(output)):null;
if(prior)fs.copyFileSync(output,`prototype/qa/d5/regression-runs.before-retry-${Date.now()}.json`);
const selected=retry?files.filter(f=>prior.results.some(x=>x.file===f&&x.exit!==0)):files;
const dependent=['regression/d-return-browser.mjs','om-regression/navigation-edge.mjs','om-regression/review-regression.mjs'].filter(f=>selected.includes(f));
const results=prior?prior.results.filter(x=>x.exit===0):[],pending=selected.filter(f=>!dependent.includes(f));
async function worker(){while(pending.length){const f=pending.shift();await new Promise(resolve=>{const p=spawn(process.execPath,['prototype/qa/d5/'+f]);let log='';p.stdout.on('data',b=>log+=b);p.stderr.on('data',b=>log+=b);p.on('exit',code=>{fs.writeFileSync('prototype/qa/d5/'+f+'.run.log',log);results.push({file:f,exit:code});fs.writeFileSync('prototype/qa/d5/regression-runs.json',JSON.stringify({at:new Date().toISOString(),results},null,2));console.log({file:f,exit:code});resolve();});});}}
await Promise.all([worker(),worker(),worker()]);
// These consume explicit sessions authored by d-mainline and om product-return above.
pending.push(...dependent);await Promise.all([worker(),worker()]);
if(results.some(x=>x.exit!==0))process.exitCode=1;
