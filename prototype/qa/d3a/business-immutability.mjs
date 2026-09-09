import fs from 'node:fs';import crypto from 'node:crypto';
const before=JSON.parse(fs.readFileSync('00_governance/d3a/baseline/manifest.json','utf8'));
const files=['case-engine','batch-a-engine','collaboration-engine','screening-engine','specialist-engine'].map(n=>`prototype/${n}.mjs`);
const results=files.map(path=>{const sha256=crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');return{path,sha256,status:before.find(x=>x.path===path)?.sha256===sha256?'passed':'failed'};});
fs.writeFileSync('prototype/qa/d3a/business-immutability.json',JSON.stringify({at:new Date().toISOString(),results},null,2));console.log(results);if(results.some(r=>r.status==='failed'))process.exitCode=1;
