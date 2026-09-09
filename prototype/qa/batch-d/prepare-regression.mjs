import fs from 'node:fs';
const jobs=[
 ['prototype/qa/batch-c/mainline-browser.mjs','c-regression.mjs',s=>s.replaceAll("prototype/qa/batch-c/","prototype/qa/batch-d/c-regression/")],
 ['prototype/qa/batch-c/a-regression.mjs','a-regression.mjs',s=>s.replaceAll('prototype/qa/batch-c/a-regression/','prototype/qa/batch-d/a-regression/').replaceAll("'./a-regression/'","'./a-regression/'")],
 ['prototype/qa/collaboration-browser.mjs','b-regression.mjs',s=>s.replace("new URL('./batch-b/',import.meta.url)","new URL('./b-regression/',import.meta.url)")]
];
for(const [source,out,change]of jobs){const content=change(fs.readFileSync(source,'utf8'));if(content===fs.readFileSync(source,'utf8')&&out!=='a-regression.mjs')throw Error(`No output path relocation: ${source}`);fs.writeFileSync(new URL(out,import.meta.url),'// Batch D regression copy; original receipt and test source preserved.\n'+content);console.log(source,'→',out);}
