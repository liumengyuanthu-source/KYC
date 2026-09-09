import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {spawnSync} from 'node:child_process';
const name=process.argv[2]||'task-1',base='00_governance/operating-model/baseline',work='.superpowers/sdd/2026-09-08-d4-operating-model';
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){if(!['diagrams','qa','media'].includes(e.name))walk(p);}else if(/\.(mjs|css|html|json)$/.test(e.name))files.push(p);}}walk('prototype');
const changed=files.filter(p=>!fs.existsSync(path.join(base,p))||!fs.readFileSync(p).equals(fs.readFileSync(path.join(base,p))));
for(const f of fs.readdirSync('00_governance/operating-model').filter(f=>/export|projection|crosswalk/.test(f)&&f.endsWith('.mjs')))changed.push('00_governance/operating-model/'+f);
let output=`# ${name}: exact D4 pilot workspace delta\n\nBase/head commit unchanged. Compare against 2026-09-08 pre-edit snapshots (78files,277tests). No commits; prior untracked code excluded.\n\n`;
for(const p of changed){const bytes=fs.readFileSync(p),old=path.join(base,p);output+=`## ${p}\nSHA256: ${crypto.createHash('sha256').update(bytes).digest('hex')}\n\n`;if(fs.existsSync(old)){const d=spawnSync('diff',['-U','10',old,p],{encoding:'utf8'});if(d.status>1)throw Error(d.stderr);output+='```diff\n'+d.stdout+'```\n';}else output+='```\n'+bytes.toString()+'\n```\n';}
const out=path.join(work,`${name}-diff.md`);fs.writeFileSync(out,output);console.log({path:path.resolve(out),files:changed,bytes:output.length});
