import fs from 'node:fs';
const before='audit/screenshots/actual/surfaces-initial';
if(!fs.existsSync(before))fs.cpSync('audit/screenshots/actual/surfaces',before,{recursive:true});
let s=fs.readFileSync('audit/tests/journey.mjs','utf8').replaceAll("dir='audit/screenshots/actual/journey/'","dir='audit/screenshots/actual/journey-final/'").replace('node prototype/qa/d5/regression/c-regression/mainline-browser.mjs','node audit/tests/journey-final.mjs').replace("path:'audit/traces/primary-journey.zip'","path:'audit/traces/primary-journey-final.zip'");
fs.writeFileSync('audit/tests/journey-final.mjs',s);
