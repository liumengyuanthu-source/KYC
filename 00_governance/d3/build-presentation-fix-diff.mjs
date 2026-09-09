import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const root='.superpowers/sdd/2026-09-07-d3-pilot/';
const previous=fs.readFileSync(root+'task-2-diff.md','utf8').split('\n## Generated content')[0];
let out='# Task2 visual fix against exact reviewed workspace version\n';
for(const block of previous.split('\n--- a/').slice(1)){
 const lines=block.split('\n'),file=lines[0],baseline='00_governance/d3/baseline/'+file.slice(10);
 const base=fs.existsSync(baseline)?fs.readFileSync(baseline,'utf8').replace(/\n$/,'').split('\n'):[];
 let cursor=0,rebuilt=[],inHunk=false;
 for(const line of lines.slice(1)){
  const h=line.match(/^@@ -(\d+)(?:,\d+)? \+\d+/);
  if(h){const start=Math.max(0,Number(h[1])-1);rebuilt.push(...base.slice(cursor,start));cursor=start;inHunk=true;continue;}
  if(!inHunk||line.startsWith('+++'))continue;
  if(line.startsWith(' ')){rebuilt.push(line.slice(1));cursor++;}
  else if(line.startsWith('-'))cursor++;
  else if(line.startsWith('+'))rebuilt.push(line.slice(1));
 }
 rebuilt.push(...base.slice(cursor));
 const diff=spawnSync('diff',['-u','--label','a/'+file,'--label','b/'+file,'-',file],{input:rebuilt.join('\n')+'\n',encoding:'utf8',maxBuffer:4*1024*1024});
 if(diff.status>1)throw Error(diff.stderr);out+='\n'+diff.stdout;
}
fs.writeFileSync(root+'task-2-fix-diff.md',out);console.log({bytes:out.length});
