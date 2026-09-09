import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const checks=JSON.parse(fs.readFileSync('prototype/qa/operating-model/pdf-results.json')).results,images=[];
for(const p of checks){
 for(const page of [...new Set([1,Math.ceil(p.pages/2),p.pages])]){
  const prefix='prototype/qa/operating-model/print/'+path.basename(p.file,'.pdf')+'.page'+page;
  execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-scale-to','1500','-png','-singlefile',p.file,prefix]);images.push({pdf:p.file,page,image:prefix+'.png',perceptualReview:'pending'});
 }
}
fs.writeFileSync('prototype/qa/operating-model/print/sample-manifest.json',JSON.stringify(images,null,2));console.log(images);
