import fs from 'node:fs';
const dir='prototype/qa/batch-d/';
const read=name=>fs.existsSync(dir+name)?JSON.parse(fs.readFileSync(dir+name)):null;
const unit=read('unit-results.json');
const receipts=['browser-results.json','static-results.json','return-results.json','load-race-results.json','scene-graph-results.json'].flatMap(file=>(read(file)?.results||[]).map(r=>({...r,file})));
const requirements=[
 'Incomplete screening does not blanket-stop Legal or Credit',
 'Potential conflict does not blanket-stop case activity',
 'Conflicts search completion is not clearance',
 'Credit assessment completion is not Legal completion',
 'Credit not required is not approved',
 'Unknown applicability is not not-required',
 'Changed Credit exposes stale Legal input',
 'Legal draft completion is not condition satisfaction',
 'Internal Legal approval is not execution',
 'Execution never infers signatory authority',
 'One specialist completion never clears the case',
 'RM and client views omit restricted conflict detail',
 'Read-only lens projections share Mainline condition revisions',
 'Dependency return preserves case, agreement, scene and viewport context',
 'Archify playback never writes business state',
 'Task and branch holds do not become case holds',
 'Unknown dependency impact remains unknown until review',
 'Superseded Credit input remains historically traceable'
];
const rows=requirements.map((requirement,i)=>{
 const id='RT-D'+String(i+1).padStart(2,'0');
 const u=(unit?.tests||[]).filter(t=>t.rt_ids.includes(id)).map(t=>({level:'unit',file:'unit-results.tap',name:t.name,status:t.status}));
 const b=receipts.filter(t=>t.ids?.includes(id)).map(t=>({level:'browser',file:t.file,name:t.name||t.kind,status:t.status,evidence:t.evidence,error:t.error}));
 const evidence=[...u,...b],status=evidence.some(e=>e.status==='failed')?'failed':evidence.some(e=>e.status==='passed')?'passed':'not-run';
 return {id,requirement,status,evidence,...(i===12?{limitation:'Shared read-only projection tested. No new Living Case Lab UI implemented; end-to-end Lab UI test not-run.'}:{})};
});
const supplemental={unitExit:unit?.exit_code,unitTests:unit?.tests?.length,unitPassed:unit?.tests?.filter(t=>t.status==='passed').length,print:read('print-results.json'),regression:Object.fromEntries(['a','b','c'].map(k=>[k,read(k+'-regression/browser-results.json')||read(k+'-regression/results.json')]))};
fs.writeFileSync(dir+'acceptance-results.json',JSON.stringify({at:new Date().toISOString(),scope:'D2 Batch D only; synthetic local demonstration',rows,supplemental},null,2)+'\n');
const md=['# Batch D red-team evidence','',`Generated from actual receipts. Unit exit: ${unit?.exit_code??'not-run'}.`,'','| ID | Requirement | Result | Executed evidence |','|---|---|---|---|',...rows.map(r=>`| ${r.id} | ${r.requirement} | ${r.status} | ${r.evidence.map(e=>`${e.level}: ${e.file} — ${e.name}`).join('<br>')||'None'} |`),'','RT-D13 covers the shared read-only lens projection only. Living Case Lab UI was not added and its UI test is not-run.','Browser evidence is Chromium only; no Safari/Firefox, assistive-technology certification, production authorization or real bank integration testing.',''];
fs.writeFileSync('00_governance/batch-d/red-team-results.md',md.join('\n'));
console.log(rows.map(r=>({id:r.id,status:r.status,levels:[...new Set(r.evidence.map(e=>e.level))]})));
