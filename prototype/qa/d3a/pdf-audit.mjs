import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const dir='output/pdf/d3a/',qa='prototype/qa/d3a/print/',results=[];
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.pdf'))){
 const run=spawnSync('/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',['-c','import pdfplumber,json,sys; d=pdfplumber.open(sys.argv[1]); print(json.dumps([dict(width=p.width,height=p.height,words=[[w["x0"],w["top"],w["x1"],w["bottom"],w["text"]] for w in p.extract_words()]) for p in d.pages]))',dir+file],{encoding:'utf8',maxBuffer:30*1024*1024});if(run.status!==0)throw Error(run.stderr||String(run.error));
 const pages=JSON.parse(run.stdout),outside=[],missingHeader=[],samples=[];let words=0;
 for(const [i,p]of pages.entries()){
  if(p.width<=p.height)outside.push({page:i+1,error:'not landscape'});
  const text=p.words.map(w=>w[4]).join(' ');if(!text.includes(file.split('.')[0]))missingHeader.push(i+1);
  for(const w of p.words){words++;if(w[0]<0||w[1]<0||w[2]>p.width+1||w[3]>p.height+1)outside.push({page:i+1,text:w[4],bounds:w.slice(0,4)});}
 }
 if(!file.includes('en-US'))for(const page of [...new Set([1,Math.ceil(pages.length/2),pages.length])]){
  const prefix=qa+file.replace('.pdf','')+'.page-'+page;
  const render=spawnSync('pdftoppm',['-f',String(page),'-singlefile','-scale-to','1200','-png',dir+file,prefix],{encoding:'utf8'});if(render.status!==0)throw Error(render.stderr);samples.push(prefix+'.png');
 }
 results.push({file:dir+file,pages:pages.length,words,status:pages.length&&words&&!outside.length&&!missingHeader.length?'passed':'failed',outside,missingHeader,samples,visualStatus:samples.length?'pending_open':'not_run_duplicate_locale'});
}
fs.writeFileSync(qa+'pdf-audit.json',JSON.stringify({at:new Date().toISOString(),method:'All-page text bounds, landscape and repeated branch context; sample renders require separate visual review.',results},null,2));console.log(results.map(({file,pages,status,outside,missingHeader})=>({file,pages,status,outside,missingHeader})));if(results.some(r=>r.status==='failed'))process.exitCode=1;
