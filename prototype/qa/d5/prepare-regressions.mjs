// Mechanical relocation preserves all historical QA source and receipts.
import fs from 'node:fs';
const source='prototype/qa/operating-model/regression',target='prototype/qa/d5/regression';
fs.mkdirSync(target,{recursive:true});
for(const file of fs.readdirSync(source).filter(f=>f.endsWith('.mjs'))){const text=fs.readFileSync(`${source}/${file}`,'utf8').replaceAll('prototype/qa/operating-model/regression','prototype/qa/d5/regression');fs.writeFileSync(`${target}/${file}`,'// D5 regression copy; original evidence preserved.\n'+text);}
fs.mkdirSync('prototype/qa/d5/om-regression',{recursive:true});
for(const file of ['harness.mjs','host-browser.mjs','navigation-edge.mjs','product-return.mjs','review-regression.mjs','print-lifecycle.mjs']){
 const text=fs.readFileSync(`prototype/qa/operating-model/${file}`,'utf8').replaceAll('prototype/qa/operating-model/host','prototype/qa/d5/om-regression/host');
 fs.writeFileSync(`prototype/qa/d5/om-regression/${file}`,'// D5 rerun of D4 contract; historical receipts preserved.\n'+text);
}
console.log('Relocated existing A/B/C/D/D3A and D4 harnesses without running or modifying their assertions.');
