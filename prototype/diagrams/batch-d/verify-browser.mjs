import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const dir=new URL('./',import.meta.url),results=[];
for(const id of ['DG-D01','DG-D02','DG-D03'])for(const locale of ['zh-CN','en-AU','en-US']){
 const file=fileURLToPath(new URL(`${id}.${locale}.r02.html`,dir));
 const r=spawnSync(process.execPath,['/Users/christinaliu/.codex/skills/archify/bin/archify.mjs','visual-check',file,'--json'],{encoding:'utf8'});const data=JSON.parse(r.stdout);results.push({id,locale,exit:r.status,status:data.status,artifact:data.artifact,diagnostics:data.diagnostics});console.log(id,locale,r.status,data.status);
}
fs.writeFileSync(new URL('browser-summary.json',dir),JSON.stringify(results,null,2)+'\n');if(results.some(x=>x.exit!==0))process.exitCode=1;
