import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const dir=new URL('./',import.meta.url);mkdirSync(dir,{recursive:true});
const doc=readFileSync('/Users/christinaliu/Downloads/Clear_to_Trade_D2_Batch_C_Screening_Review_and_EDD_Final_v1.0.md','utf8');
const records=[];
for(const line of doc.split('\n').filter(l=>/^\| RT-C\d{2} \|/.test(l))){const c=line.split('|').slice(1,-1).map(x=>x.trim());records.push({id:c[0],situation:c[1],required_result:c[2],source:'SRC-016 Final1.0',status:'not-run',actual:'Awaiting exact assertion and integrated host evidence',evidence:[],severity:'review_gate',business_question_owner:'Workshop control owner — unassigned'});}
if(records.length!==68||new Set(records.map(r=>r.id)).size!==68)throw Error('RT contract incomplete');
writeFileSync(new URL('red-team-specifications.json',dir),JSON.stringify(records,null,2)+'\n');console.log({specifications:records.length,execution_claim:false});
