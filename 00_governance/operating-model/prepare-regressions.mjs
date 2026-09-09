// Mechanical relocation: reuse existing regression logic without overwriting historical evidence.
import fs from 'node:fs';import path from 'node:path';
const out='prototype/qa/operating-model/regression';fs.mkdirSync(out,{recursive:true});
const files=['host-harness.mjs','host-browser.mjs','navigation-edge.mjs','product-return.mjs','chain-preview.mjs','print-reentry.mjs','a-regression.mjs','b-regression.mjs','c-regression.mjs','run-unit-proof.mjs'];
for(const f of files){const src='prototype/qa/d3a/'+f;if(fs.existsSync(src))fs.writeFileSync(path.join(out,f),'// Operating Model regression relocation; historical source/results preserved.\n'+fs.readFileSync(src,'utf8').replaceAll('prototype/qa/d3a/',out+'/').replaceAll("from '../../","from '../../../"));}
for(const f of ['mainline-browser.mjs','return-browser.mjs','scene-graph-browser.mjs']){const src='prototype/qa/batch-d/'+f;fs.writeFileSync(path.join(out,'d-'+f),'// Operating Model regression relocation; Batch D source/results preserved.\n'+fs.readFileSync(src,'utf8').replaceAll('prototype/qa/batch-d/',out+'/d/'));}
console.log({out,files:fs.readdirSync(out).filter(x=>x.endsWith('.mjs'))});
