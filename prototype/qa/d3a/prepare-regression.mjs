// Mechanical relocation: preserve earlier evidence and business assertions unchanged.
import fs from 'node:fs';
for(const file of ['a-regression.mjs','b-regression.mjs','c-regression.mjs','mainline-browser.mjs','return-browser.mjs','scene-graph-browser.mjs','run-unit-proof.mjs']){
 const from=`prototype/qa/d3/${file}`,to=`prototype/qa/d3a/${file}`;
 if(fs.existsSync(to))throw Error('Refusing to replace existing D3A runner '+to);
 const source=fs.readFileSync(from,'utf8').replaceAll('prototype/qa/d3/','prototype/qa/d3a/');
 fs.writeFileSync(to,`// D3A regression relocation of ${from}; prior receipts remain intact.\n`+source);
}
for(const dir of ['a-regression','b-regression','c-regression','d-regression'])fs.mkdirSync(`prototype/qa/d3a/${dir}`,{recursive:true});
