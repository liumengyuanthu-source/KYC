import {spawnSync} from 'node:child_process';import fs from 'node:fs';
const name=process.argv[2]||'independent-final';
const files=['prototype/qa/d5/temporal-independent.test.mjs','prototype/qa/d5/projection-independent.test.mjs'];
const result=spawnSync(process.execPath,['--test',...files],{encoding:'utf8'});
fs.writeFileSync(`prototype/qa/d5/${name}.tap`,result.stdout+result.stderr);
const tests=[...result.stdout.matchAll(/^(ok|not ok) \d+ - (.+)$/gm)].map(x=>({name:x[2],status:x[1]==='ok'?'passed':'failed'}));
fs.writeFileSync(`prototype/qa/d5/${name}.json`,JSON.stringify({at:new Date().toISOString(),command:`node --test ${files.join(' ')}`,exit:result.status,tests},null,2));
console.log({tests:tests.length,passed:tests.filter(t=>t.status==='passed').length,failed:tests.filter(t=>t.status==='failed')});process.exitCode=result.status;
