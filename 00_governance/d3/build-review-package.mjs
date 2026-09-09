// Exact workspace delta against this turn's pre-edit snapshots; no index/HEAD changes.
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const task=process.argv[2]||'1',root='.superpowers/sdd/2026-09-07-d3-pilot/';
const sourceFiles=['03_personas_journey/d3/build-content.mjs','prototype/transformations/content.mjs','prototype/transformations/pilot-en.mjs','prototype/tests/transformations.test.mjs'];
const presentationFiles=fs.readdirSync('prototype',{withFileTypes:true}).filter(f=>f.isFile()&&/\.(mjs|css|html)$/.test(f.name)).map(f=>'prototype/'+f.name).filter(file=>{const baseline='00_governance/d3/baseline/'+file.slice(10);return !fs.existsSync(baseline)||!fs.readFileSync(baseline).equals(fs.readFileSync(file));});
const tests=fs.readdirSync('prototype/tests').filter(f=>/transformation|presentation/.test(f)).map(f=>'prototype/tests/'+f);
const extra=['prototype/transformations/diagram-bindings.mjs','prototype/tests/transformation-bindings.test.mjs','prototype/media/d2-batch-c/build-static.mjs','prototype/qa/d3/pilot-browser.mjs','prototype/qa/d3/print-proof.mjs','prototype/qa/d3/scenario-inventory.mjs','prototype/qa/d3/business-immutability.mjs'];
const files=[...new Set(task==='1'?sourceFiles:task==='2'?[...presentationFiles,...tests]:[...sourceFiles,...presentationFiles,...tests,...extra])].filter(f=>fs.existsSync(f));
const hashes={};let output=`# D3 task ${task} workspace delta\nBase=pre-edit snapshots, HEAD unchanged; no commit range (untracked prototype pre-existed).\n`;
for(const file of files){
 const baseline=file.startsWith('prototype/')&&!file.slice(10).includes('/')?'00_governance/d3/baseline/'+file.slice(10):'/dev/null';
 const base=fs.existsSync(baseline)?baseline:'/dev/null';
 const diff=spawnSync('diff',['-u','--label',`a/${file}`,'--label',`b/${file}`,base,file],{encoding:'utf8',maxBuffer:8*1024*1024});
 if(diff.status>1)throw Error(diff.stderr);
 hashes[file]=createHash('sha256').update(fs.readFileSync(file)).digest('hex');output+='\n'+diff.stdout;
}
const generated='prototype/transformations/data.mjs';
if(fs.existsSync(generated))hashes[generated]=createHash('sha256').update(fs.readFileSync(generated)).digest('hex');
output+='\n## Generated content\nFull generated data excluded from prose diff; deterministic source builder and contract tests included. Artifact SHA-256:\n'+JSON.stringify(hashes,null,2)+'\n';
fs.writeFileSync(root+`task-${task}-diff.md`,output);
console.log({path:root+`task-${task}-diff.md`,files:files.length,bytes:output.length});
