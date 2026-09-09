// D3 regression copy of prototype/qa/batch-d/run-unit-proof.mjs; original evidence preserved.
import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const files=readdirSync('prototype/tests').filter(n=>n.endsWith('.test.mjs')).sort().map(n=>'prototype/tests/'+n);
const run=spawnSync(process.execPath,['--test','--test-reporter=tap',...files],{encoding:'utf8',maxBuffer:20*1024*1024});
writeFileSync('prototype/qa/d3/unit-results.tap',run.stdout+run.stderr);
const tests=[...run.stdout.matchAll(/^(ok|not ok) \d+ - (.+)$/gm)].map(m=>({name:m[2],status:m[1]==='ok'?'passed':'failed',rt_ids:[...m[2].matchAll(/RT-D(\d{2}(?:\/\d{2})*)/g)].flatMap(m=>m[1].split('/').map(n=>'RT-D'+n))}));
writeFileSync('prototype/qa/d3/unit-results.json',JSON.stringify({at:new Date().toISOString(),command:'node --test --test-reporter=tap prototype/tests/*.test.mjs',exit_code:run.status,tests,hashes:Object.fromEntries(files.map(f=>[f,createHash('sha256').update(readFileSync(f)).digest('hex')]))},null,2)+'\n');
console.log({tests:tests.length,passed:tests.filter(t=>t.status==='passed').length,failed:tests.filter(t=>t.status==='failed'),exit:run.status});process.exitCode=run.status;
