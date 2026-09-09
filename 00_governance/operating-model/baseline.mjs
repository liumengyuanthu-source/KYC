import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {spawnSync} from 'node:child_process';
const root=process.cwd(),base='00_governance/operating-model/baseline';
if(fs.existsSync(base))throw Error('Baseline already exists; will not overwrite');
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){if(!['diagrams','qa','media'].includes(e.name))walk(p);}else if(/\.(mjs|css|html|json)$/.test(e.name))files.push(p);}}walk('prototype');
const hashes={};for(const p of files){const b=fs.readFileSync(p);hashes[p]=crypto.createHash('sha256').update(b).digest('hex');fs.mkdirSync(path.dirname(path.join(base,p)),{recursive:true});fs.copyFileSync(p,path.join(base,p));}
fs.writeFileSync(path.join(base,'manifest.json'),JSON.stringify({at:new Date().toISOString(),head:spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim(),files:hashes},null,2));
const run=spawnSync(process.execPath,['--test',...files.filter(p=>p.endsWith('.test.mjs'))],{encoding:'utf8',maxBuffer:20e6});fs.writeFileSync(path.join(base,'tests.tap'),run.stdout+run.stderr);console.log({files:files.length,baseline:path.join(root,base),exit:run.status,summary:run.stdout.split('\n').slice(-10)});process.exitCode=run.status;
