// Relocate existing regression runners so this run cannot overwrite prior receipts.
import fs from 'node:fs';
const jobs=[['a-regression.mjs','a-regression/'],['b-regression.mjs','b-regression/'],['c-regression.mjs','c-regression/'],['mainline-browser.mjs','d-regression/'],['return-browser.mjs','d-regression/'],['scene-graph-browser.mjs','d-regression/'],['run-unit-proof.mjs','./']];
for(const [file,folder] of jobs){
 const original=`prototype/qa/batch-d/${file}`;
 let source=fs.readFileSync(original,'utf8').replaceAll('prototype/qa/batch-d/','prototype/qa/d3/');
 if(folder==='d-regression/')source=source.replaceAll("'prototype/qa/d3/'","'prototype/qa/d3/d-regression/'");
 const out=`prototype/qa/d3/${file}`;
 fs.mkdirSync(`prototype/qa/d3/${folder}`,{recursive:true});
 fs.writeFileSync(out,`// D3 regression copy of ${original}; original evidence preserved.\n`+source);
 console.log({original,out,folder});
}
