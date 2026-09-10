// Reproducible Archify delivery; failed candidates never replace a trusted artifact.
import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('./',import.meta.url),cli='/Users/christinaliu/.codex/skills/archify/bin/archify.mjs';
const names=['DG-E01.en-AU','DG-E02.en-AU','DG-E01.zh-CN','DG-E02.zh-CN','DG-E03.zh-CN'];
const receipts=[];
for(const name of names){
  for(const phase of ['validate','deliver']){
    const args=[cli,phase,'workflow',fileURLToPath(new URL(`specs/${name}.json`,root))];
    if(phase==='deliver')args.push(fileURLToPath(new URL(`${name}.html`,root)));
    const result=spawnSync(process.execPath,[...args,'--quality','showcase','--json'],{encoding:'utf8'});
    const receipt=JSON.parse(result.stdout);receipts.push({name,phase,exit_code:result.status,receipt});
    if(result.status!==0)throw new Error(`${name} ${phase}: ${receipt.error}`);
  }
}
writeFileSync(new URL('delivery-receipts.json',root),JSON.stringify(receipts,null,2)+'\n');
console.log(JSON.stringify(receipts.map(x=>({name:x.name,phase:x.phase,exit:x.exit_code}))));
