import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const dir='prototype/qa/d3/print/',results=[];
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.pdf'))){
 const run=spawnSync('/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',['-c','import pdfplumber,json,sys; d=pdfplumber.open(sys.argv[1]); print(json.dumps([dict(width=p.width,height=p.height,words=[[w["x0"],w["top"],w["x1"],w["bottom"],w["text"]] for w in p.extract_words()]) for p in d.pages]))',dir+file],{encoding:'utf8',maxBuffer:15*1024*1024});if(run.status!==0)throw Error(run.stderr||String(run.error));
 const pages=JSON.parse(run.stdout);let words=0,outside=[];
 for(const [i,p]of pages.entries())for(const m of p.words){
  words++;if(m[0]<0||m[1]<0||m[2]>p.width+1||m[3]>p.height+1)outside.push({page:i+1,text:m[4],bounds:m.slice(0,4)});
 }
 const samples=[];
 if(!file.includes('en-US'))for(const page of [...new Set([1,Math.ceil(pages.length/2),pages.length])]){
  const prefix=dir+file.replace('.pdf','')+'.page-'+page;
  const render=spawnSync('pdftoppm',['-f',String(page),'-singlefile','-scale-to','1200','-png',dir+file,prefix],{encoding:'utf8'});if(render.status!==0)throw Error(render.stderr);samples.push(prefix+'.png');
 }
 results.push({file,pages:pages.length,words,geometry_status:pages.length&&words&&!outside.length?'passed':'failed',outside,samples,visual_status:samples.length?'pending_open':'not_run_en_US_duplicate_copy'});
}
fs.writeFileSync(dir+'pdf-audit.json',JSON.stringify({at:new Date().toISOString(),method:'Every PDF page text bounding box checked; representative first/middle/last pages rendered. Geometry alone is not visual acceptance.',results},null,2)+'\n');console.log(results.map(({file,pages,words,geometry_status,outside})=>({file,pages,words,geometry_status,outside})));if(results.some(x=>x.geometry_status==='failed'))process.exitCode=1;
