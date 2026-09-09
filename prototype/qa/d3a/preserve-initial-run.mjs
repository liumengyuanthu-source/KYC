import fs from 'node:fs';
const target='prototype/qa/d3a/runs/initial';
if(fs.existsSync(target))throw Error('Initial evidence snapshot already exists');
fs.mkdirSync(target,{recursive:true});
for(const dir of ['host','print'])fs.cpSync('prototype/qa/d3a/'+dir,target+'/'+dir,{recursive:true});
fs.cpSync('output/pdf/d3a',target+'/pdf',{recursive:true});
console.log('Initial failures and print proofs preserved at '+target);
