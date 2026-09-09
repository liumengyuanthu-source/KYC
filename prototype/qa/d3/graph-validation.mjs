import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const results=[];
for(const locale of ['en-AU','en-US','zh-CN'])for(const file of [`prototype/diagrams/batch-b/client-collaboration.${locale}.v1.1.json`,`prototype/diagrams/batch-c/DG-C-MATCH.Target.${locale}.r02.json`,`prototype/diagrams/batch-c/DG-C-MATCH.Current.${locale}.r02.json`]){
 const r=spawnSync('node',['/Users/christinaliu/.codex/skills/archify/bin/archify.mjs','validate','workflow',file,'--quality','showcase','--json'],{encoding:'utf8'});let receipt;try{receipt=JSON.parse(r.stdout)}catch{receipt={error:r.stderr||r.stdout}}results.push({file,exit_code:r.status,receipt});
}
fs.writeFileSync('prototype/qa/d3/graph-validation.json',JSON.stringify({mode:'revalidation of existing assets; no new diagrams authored',results},null,2)+'\n');console.log(results.map(r=>({file:r.file,exit:r.exit_code,ok:r.receipt.ok,checks:r.receipt.checks?.length})));if(results.some(r=>r.exit_code!==0))process.exitCode=1;
