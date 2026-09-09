import fs from 'node:fs';import {spawn} from 'node:child_process';
import {diagramAssets} from '../../reconstruction/diagram-manifest.mjs';
const results=[],queue=[...diagramAssets];
async function worker(){for(;;){const asset=queue.shift();if(!asset)return;const path='prototype/'+asset.html,receiptPath=path.replace(/\.html$/,'.visual-check.json');
 if(!fs.existsSync(receiptPath))await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['/Users/christinaliu/.codex/skills/archify/bin/archify.mjs','visual-check',path,'--json'],{stdio:'ignore'});child.on('error',reject);child.on('exit',resolve);});
 const receipt=JSON.parse(fs.readFileSync(receiptPath));results.push({html:asset.html,status:receipt.status,sha256:receipt.artifact.sha256,diagnostics:receipt.diagnostics,receipt:receiptPath});
 fs.writeFileSync('prototype/qa/d3a/diagram-visual-summary.json',JSON.stringify({results},null,2));
 console.log(asset.html,receipt.status);
}}
await Promise.all([worker(),worker()]);if(results.some(r=>r.status!=='pass'))process.exitCode=1;
