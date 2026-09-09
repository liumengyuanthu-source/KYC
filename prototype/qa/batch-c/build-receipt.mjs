// This aggregates actual receipts, not test existence. Unshipped positive paths remain not-run.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const root=new URL('./',import.meta.url),read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const specs=read('red-team-specifications.json');
const unit=read('unit-results.json');
const host={results:['browser-results.json','browser-edge-results.json','print-results.json','review-regression-results.json'].filter(p=>existsSync(new URL(p,root))).flatMap(p=>read(p).results.map(r=>({...r,receipt:p})))};
const notRun={
 'RT-C16':'Stale-input conflicts and draft preservation are model-tested, but the actual browser race against a later subject/provider update is not run; no concurrent provider adapter or host inject is shipped.',
 'RT-C18':'Supported exclusion remains disabled_pending_fixture_review: no separately reviewed identity package and sufficiency oracle.',
 'RT-C21':'The after-exclusion positive state cannot be exercised while exclusion is disabled; no automatic EDD mutation is separately asserted on unresolved/referral paths.',
 'RT-C22':'Required applicability and pack are unit-tested using isolated explicit demo config; the complete EDD approval-positive path is unconfigured and not run.',
 'RT-C25':'No new operational Legal/Credit completion action is approved in this batch. Preserving existing conditions is not counted as executing this scenario.',
 'RT-C31':'Lab inject remains disabled and unapproved. Mainline independence is separately tested under RT-C68; no shadow-change success is claimed.'
};
const hostRequired=new Set([13,16,17,27,28,29,30,32,33,44,45,46,47,49,50,51,56,57,58,59,60,61,62,63,64,65,68].map(n=>'RT-C'+String(n).padStart(2,'0')));
const question=id=>[18,21,66].includes(Number(id.slice(-2)))?'C-Q-DISPOSITION':[22,39,40].includes(Number(id.slice(-2)))?'C-Q-EDD-APPLICABILITY':Number(id.slice(-2))>=48&&Number(id.slice(-2))<=60?'C-Q-RESEARCH':[31,68].includes(Number(id.slice(-2)))?'C-Q-LAB':'C-Q-HOLD / C-Q-COLLABORATION';
const requiredNamedHosts={
 'RT-C13':['ROLE-RM DOM and print are role-projected','ROLE-CLIENT DOM and print are role-projected','Identity client DOM contains only its granted task and no internal provider details'],
 'RT-C27':['Story navigation and collapsed branches cannot write case state'],
 'RT-C51':['Global References stays inside Studio and preserves origin'],
 'RT-C63':['batch-c-match.en-AU','batch-c-match.zh-CN','batch-c-client.en-AU'],
 'RT-C68':['Complete mainline without Living Case Lab']
};
const results=specs.map(spec=>{
 const units=unit.tests.filter(t=>t.rt_ids.includes(spec.id));
 const hosts=host.results.filter(t=>(t.ids||[]).includes(spec.id));
 const failed=[...units,...hosts].filter(t=>t.status==='failed');
 const passes=[...units,...hosts].filter(t=>t.status==='passed');
 const covered=requiredNamedHosts[spec.id]?requiredNamedHosts[spec.id].every(name=>host.results.some(t=>t.name===name&&t.status==='passed')):hostRequired.has(spec.id)?hosts.some(t=>t.status==='passed'):passes.length>0;
 const status=failed.length?'failed':notRun[spec.id]?'not-run':covered?'passed':'not-run';
 return {...spec,status,severity:status==='failed'?'review_required':'none_observed_in_executed_scope',
  business_question:question(spec.id),business_question_owner:'Bank/control owner unassigned; Christina coordinates workshop review',
  actual:failed.length?failed.map(t=>t.name+': '+t.error).join(' | '):notRun[spec.id]|| (covered?'Observed the listed assertions in the shipped synthetic profile; see evidence-specific boundaries.':'No complete actual assertion receipt for this specification yet.'),
  execution_scope:hostRequired.has(spec.id)?'Integrated local HTML + relevant unit assertions':'Synthetic model / static source contract',
  case_fixture:'DEMO-CTT-001; scope institutional; per-check before/after revisions in browser receipt; named C-entry..C-referred design snapshots v17..v34, scope v3',
  evidence:[...units.map(t=>({file:'unit-results.json',test:t.name,status:t.status,command:unit.command})),...hosts.map(t=>({file:t.receipt,test:t.name,status:t.status,steps:t.steps,case_before:t.case_before,case_after:t.case_after,screenshot:t.screenshot}))]
 };
});
const counts=Object.fromEntries(['passed','failed','not-run'].map(k=>[k,results.filter(r=>r.status===k).length]));
const report={source:'SRC-016 Final 1.0 §§17/23',actual_generated_at:new Date().toISOString(),counts,release_scope:'Local synthetic review only; no remote publication, real provider/client integration or full D2 completion',results};
writeFileSync(new URL('red-team-results.json',root),JSON.stringify(report,null,2)+'\n');
const safe=s=>String(s).replaceAll('|',' / ').replaceAll('\n',' ');
writeFileSync(new URL('red-team-results.md',root),'# Batch C — actual RT receipt\n\n'+Object.entries(counts).map(([k,v])=>`${k}: ${v}`).join(' · ')+'\n\nPassed is bounded by its listed evidence, not a claim of bank policy or production certification. Positive exclusion, full EDD approval, Legal/Credit completion and Lab inject remain explicitly not run.\n\n| ID | Status | Required result | Actual / boundary | Evidence |\n|---|---|---|---|---|\n'+results.map(r=>`| ${r.id} | ${r.status} | ${safe(r.required_result)} | ${safe(r.actual)} | ${r.evidence.map(e=>safe(e.file+' — '+e.test)).join('<br>')} |`).join('\n')+'\n');
console.log(counts);
