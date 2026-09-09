import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base='prototype/media/d2-batch-a/r01/';
const manifest=JSON.parse(readFileSync(base+'package-provenance.json','utf8'));
const files=manifest.files.map(f=>{const actual=createHash('sha256').update(readFileSync(base+f.path)).digest('hex');return {path:f.path,expected:f.sha256,actual,status:actual===f.sha256?'passed':'failed'};});
const report={at:new Date().toISOString(),scope:'Frozen approved A r01 package only; not a substitute for mainline host regression',files};
writeFileSync('prototype/qa/batch-c/a-package-results.json',JSON.stringify(report,null,2)+'\n');
console.log({files:files.length,failed:files.filter(f=>f.status==='failed')});if(files.some(f=>f.status==='failed'))process.exitCode=1;
