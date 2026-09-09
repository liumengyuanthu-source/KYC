// Deterministic Archify validation/delivery. Never browser-check a failed delivery.
import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('./',import.meta.url),cli='/Users/christinaliu/.codex/skills/archify/bin/archify.mjs';
const phase=process.argv[2]||'validate';
if(!['validate','deliver'].includes(phase))throw Error('Expected validate or deliver');
const names=process.argv.slice(3).length?process.argv.slice(3):['DG-F01.en-AU','DG-F01.zh-CN','DG-F02.en-AU','DG-F02.zh-CN','DG-F03.en-AU','DG-F03.zh-CN'];
const receipts=[];
for(const name of names){
 const args=[cli,phase,'workflow',fileURLToPath(new URL(`specs/${name}.json`,root))];
 if(phase==='deliver')args.push(fileURLToPath(new URL(`${name}.html`,root)));
 const result=spawnSync(process.execPath,[...args,'--quality','showcase','--json'],{encoding:'utf8'});
 const receipt=JSON.parse(result.stdout);receipts.push({name,phase,exit_code:result.status,receipt});
 writeFileSync(new URL(`${name}.${phase}.json`,root),JSON.stringify(receipts.at(-1),null,2)+'\n');
}
writeFileSync(new URL(`${phase}-receipts.json`,root),JSON.stringify(receipts,null,2)+'\n');
console.log(JSON.stringify(receipts.map(x=>({name:x.name,phase:x.phase,exit:x.exit_code,receipt:x.receipt}))));
if(receipts.some(x=>x.exit_code!==0))process.exitCode=1;
