import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const root='.superpowers/sdd/2026-09-07-d3-pilot/';
const previous=fs.readFileSync(root+'task-1-diff.md','utf8').split('\n## Generated content')[0];
let out='# Task1 fix against exact originally reviewed new files\n';
for(const block of previous.split('\n--- a/').slice(1)){
 const file=block.slice(0,block.indexOf('\n'));
 const content=block.split('\n').filter(line=>line.startsWith('+')&&!line.startsWith('+++')).map(line=>line.slice(1)).join('\n')+'\n';
 const diff=spawnSync('diff',['-u','--label','a/'+file,'--label','b/'+file,'-',file],{input:content,encoding:'utf8'});
 if(diff.status>1)throw Error(diff.stderr);out+='\n'+diff.stdout;
}
fs.writeFileSync(root+'task-1-fix-diff.md',out);console.log({bytes:out.length});
