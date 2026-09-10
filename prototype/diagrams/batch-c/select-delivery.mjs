import {readFileSync,writeFileSync,existsSync} from 'node:fs';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
const dir=new URL('./',import.meta.url),entries=[],receipts=[];
for(const family of ['DG-C-POPULATION','DG-C-MATCH','DG-C-EDD'])for(const mode of ['Current','Target'])for(const locale of ['zh-CN','en-AU','en-US']){
 const useR02=family==='DG-C-MATCH'||family==='DG-C-POPULATION'&&locale!=='zh-CN';
 const name=`${family}.${mode}.${locale}${useR02?'.r02':''}`;
 const run=spawnSync(process.execPath,['/Users/christinaliu/.codex/skills/archify/bin/archify.mjs','deliver','workflow',fileURLToPath(new URL(name+'.json',dir)),fileURLToPath(new URL(name+'.html',dir)),'--quality','showcase','--json'],{encoding:'utf8'});
 const receipt=JSON.parse(run.stdout);if(run.status!==0)throw Error(name+run.stdout);
 receipts.push({name,phase:'deliver',exit_code:run.status,receipt});entries.push({family,mode,locale,name,spec:name+'.json',html:name+'.html',svg:name+'.svg',revision:useR02?'r02':'original_canonical_fallback',reason:useR02?'Reviewed vertical layout candidate passed':'r02 stopped at nonimproving diagnostics; original checked canonical retained'});
}
writeFileSync(new URL('active-manifest.json',dir),JSON.stringify(entries,null,2)+'\n');
writeFileSync(new URL('active-delivery-receipts.json',dir),JSON.stringify(receipts,null,2)+'\n');console.log({active:entries.length});
