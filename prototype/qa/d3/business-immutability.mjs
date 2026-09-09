import fs from 'node:fs';
import {createHash} from 'node:crypto';
const digest=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=['batch-a-engine.mjs','case-engine.mjs','collaboration-engine.mjs','screening-engine.mjs','specialist-engine.mjs'];
const results=files.map(file=>{const before=digest('00_governance/d3/baseline/'+file),after=digest('prototype/'+file);return {file:'prototype/'+file,before,after,status:before===after?'passed':'failed'};});
fs.writeFileSync('prototype/qa/d3/business-immutability.json',JSON.stringify({claim:'Business engine source bytes unchanged by D3; runtime state invariance tested separately',results},null,2)+'\n');console.log(results.map(({file,status})=>({file,status})));if(results.some(r=>r.status==='failed'))process.exitCode=1;
