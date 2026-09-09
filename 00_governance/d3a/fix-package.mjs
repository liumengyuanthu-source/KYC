// Compare the exact Task1 files with the source embedded in the previous review.
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
const workspace='.superpowers/sdd/2026-09-07-d3a-pc01';
const review=fs.readFileSync(`${workspace}/task-1-diff.md`,'utf8');
const tmp=fs.mkdtempSync('/private/tmp/d3a-fix-review-');
let result='# Task1 fix round1 exact delta\n\nBase/head unchanged; prior reviewed source bytes embedded in task-1-diff.md.\n';
for(const match of review.matchAll(/## (prototype\/[^\n]+)\nSHA256: [^\n]+\n\n```\n([\s\S]*?)\n```\n/g)){
 const file=match[1],before=path.join(tmp,path.basename(file));fs.writeFileSync(before,match[2]);
 const diff=spawnSync('diff',['-u','--label',`prior/${file}`,'--label',file,before,file],{encoding:'utf8'});
 if(diff.status>1)throw Error(diff.stderr);if(diff.stdout)result+=`\n## ${file}\n\n\`\`\`diff\n${diff.stdout}\`\`\`\n`;
}
const out=`${workspace}/task-1-fix-1-diff.md`;fs.writeFileSync(out,result);console.log({out,bytes:result.length});
