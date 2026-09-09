// Exact dirty-checkout increment: a git HEAD range cannot see the untracked prototype.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {spawnSync} from 'node:child_process';
const base=process.argv[2]||'00_governance/d5/baseline',name=process.argv[3]||'task-1';
const output='.superpowers/sdd/2026-09-08-d5-product-experience';
const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'))),files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){if(!['diagrams','qa','media'].includes(e.name))walk(p);}else if(/\.(mjs|css|html|json)$/.test(e.name))files.push(p);}}walk('prototype');
const changed=[],hashes={},diffs=[];
for(const p of files){const hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');hashes[p]=hash;if(hash===manifest.files[p])continue;changed.push({path:p,kind:manifest.files[p]?'modified':'added',sha256:hash});const old=manifest.files[p]?path.join(base,p):'/dev/null';const run=spawnSync('diff',['-u','-U','12',old,p],{encoding:'utf8',maxBuffer:30e6});if(run.status>1)throw Error(run.stderr);diffs.push(run.stdout);}
const deleted=Object.keys(manifest.files).filter(p=>!fs.existsSync(p));if(deleted.length)throw Error('Unexpected deletion: '+deleted.join(','));
fs.mkdirSync(output,{recursive:true});fs.writeFileSync(`${output}/${name}-diff.md`,`# D5 actual source increment\n\nBase snapshot: ${base}; unchanged git HEAD ${manifest.head}. No commits.\n\n${changed.map(x=>`${x.kind}: ${x.path}`).join('\n')}\n\n\`\`\`diff\n${diffs.join('\n')}\n\`\`\`\n`);
fs.writeFileSync(`${output}/${name}-manifest.json`,JSON.stringify({at:new Date().toISOString(),base,changed},null,2));
const next=`${output}/${name}-snapshot`;if(fs.existsSync(next))throw Error('Review snapshot already exists; choose a new review name');
for(const p of files){fs.mkdirSync(path.dirname(path.join(next,p)),{recursive:true});fs.copyFileSync(p,path.join(next,p));}
fs.writeFileSync(`${next}/manifest.json`,JSON.stringify({head:manifest.head,files:hashes},null,2));
console.log({package:`${output}/${name}-diff.md`,changed:changed.length,snapshot:next});
