/* Deterministic workshop synthesis. No network, inferred approval or mutation of source comments. */
const hasText=value=>typeof value==='string'&&value.trim().length>0;
const hasReview=r=>!!r&&(!!r.act||hasText(r.comment));
const REVIEW_LABELS={agree:'Agreed',modify:'Needs modification',na:'Not applicable',validate:'Needs validation'};
// Explicit design crosswalk; links describe relevance, never client policy or acceptance.
const DISCUSSION_LINKS={H1:[3,4],H2:[5],H3:[6],e1:[4],e2:[4],e3:[5],e4:[4],e5:[1,6,8],e6:[2,3],e7:[7,9],e8:[7,9],
 'HG-01':[1,6,8],'HG-02':[4,8],'HG-03':[5,8],'HG-04':[7,9],'HG-05':[7,9]};
// Matches existing BUNDLE order; existing bd-group-index IDs remain stable.
const FEATURE_STEP_LINKS=[
 [[1],[1,8],[2,3,4,5],[1,4,5,8],[8],[8,9],[9],[9,10]],
 [[1],[2],[3],[4],[6],[7],[7],[8],[9]],
 [[1,3,5],[7],[7],[7],[7],[4,6],[10]],
 [[3],[2,4],[4],[5],[1,8],[6],[1,8],[8,9],[9],[8],[9,10],[10],[10]],
 [[1,2,3,4,5,6,7,8,9,10],[4],[5],[7,9],[9]],
 [[10],[8,10],[8],[8,10],[8,9],[8],[10],[10]]
];
function discussionRecords(){
 const records=[];
 BEFORE.forEach(s=>['b','t'].forEach(prefix=>{
  const id=prefix+s.n,r=S.actions[id];
  if(hasReview(r))records.push({id,steps:[s.n],title:`${prefix==='b'?'Before':'To-be'} ${s.n} · ${prefix==='b'?s.t:TOBE[s.n-1].t}`,
   status:REVIEW_LABELS[r.act]||'Comment only',comment:r.comment||'',excluded:r.act==='na'});
 }));
 ESC.forEach((r,i)=>{const id='e'+(i+1),s=S.actions[id];if(hasReview(s))records.push({id,steps:DISCUSSION_LINKS[id],title:r[0],status:REVIEW_LABELS[s.act]||'Comment only',comment:s.comment||'',excluded:s.act==='na'});});
 HYPO.forEach(h=>{const r=S.hypo[h.id];if(r&&(hasText(r.choice)||hasText(r.comment)))records.push({id:h.id,steps:DISCUSSION_LINKS[h.id],title:h.t,status:r.choice?`Hypothesis answer: ${r.choice}`:'Comment only',comment:r.comment||''});});
 GATES.forEach(g=>{const r=S.gates[g.id];if(r&&(hasText(r.decision)||hasText(r.comment)))records.push({id:g.id,steps:DISCUSSION_LINKS[g.id],title:g.t,status:r.decision?`Demo decision: ${r.decision}`:'Comment only',comment:r.comment||''});});
 return records;
}
function discussionModel(){
 const records=discussionRecords();
 const rows=BEFORE.map(s=>({step:s.n,before:s,pain:s.pain,target:TOBE[s.n-1],records:records.filter(r=>r.steps.includes(s.n))})).filter(r=>r.records.length);
 const features=BUNDLE.flatMap(([group,items],gi)=>items.map((title,ii)=>{
  const id=bundleId(gi,ii),steps=FEATURE_STEP_LINKS[gi][ii],sources=records.filter(r=>!r.excluded&&r.steps.some(n=>steps.includes(n)));
  const manual=typeof S.bundle[id]==='boolean';
  return {id,group,title,sources,manual,included:manual&&S.bundle[id],status:manual?(S.bundle[id]?'Included manually':'Excluded manually'):'Suggested · review required'};
 })).filter(f=>f.sources.length||f.manual);
 const open=records.filter(r=>['Needs modification','Needs validation','Comment only'].includes(r.status)||r.status.includes('Unknown')||r.status.includes('Stop')||r.status.includes('denied'));
 const unanswered=HYPO.filter(h=>!hasText(S.hypo[h.id]?.choice)).map(h=>`${h.id} · ${h.t} — not yet answered`);
 return {records,rows,features,open,unanswered};
}
function discussionCoverage(){
 const note=id=>hasText(S.notes[id]),review=id=>hasReview(S.actions[id]);
 const slots=[
  [note('context')],
  [hasText(S.beforeQ),...BEFORE.map(s=>review('b'+s.n)),note('before')],
  [...HYPO.map(h=>hasText(S.hypo[h.id]?.choice)||hasText(S.hypo[h.id]?.comment)),note('diagnose')],
  [...TOBE.map(s=>review('t'+s.n)),...ESC.map((_,i)=>review('e'+(i+1))),note('tobe')],
  [...GATES.map(g=>hasText(S.gates[g.id]?.decision)||hasText(S.gates[g.id]?.comment)),note('gates')],
  [hasText(S.summary.status),S.summary.trans.length>0,hasText(S.summary.target),hasText(S.summary.note)]
 ];
 return slots.map(s=>({recorded:s.filter(Boolean).length,total:s.length}));
}
function sourceRecordHTML(r){
 return `<div class="summary-source"><span class="summary-status">${esc(r.status)}</span> <small>${esc(r.id)} · ${esc(r.title)}</small>${hasText(r.comment)?`<p class="source-comment">${esc(r.comment)}</p>`:''}</div>`;
}
function mappingSummaryHTML(model){
 if(!model.rows.length)return '<p class="summary-empty">No discussion recorded yet. Review a Before action, To-be action, situation or hypothesis to build this mapping.</p>';
 return `<div class="summary-map-scroll"><table class="map-tbl"><thead><tr><th>Before / pain</th><th>Proposed To-be / Human boundary</th><th>Discussion &amp; source</th></tr></thead><tbody>${model.rows.map(r=>`<tr data-summary-row="${r.step}">
 <td><b>${r.step} · ${esc(r.before.t)}</b><p>${esc(r.pain)}</p></td>
 <td><b>${esc(r.target.t)}</b><p>${esc(r.target.fn)}</p><small>Human boundary: ${esc(r.target.gate)}</small></td>
 <td>${r.records.map(sourceRecordHTML).join('')}</td></tr>`).join('')}</tbody></table></div>`;
}
function bundleSummaryHTML(model,interactive=true){
 if(!model.features.length)return '<p class="summary-empty">No feature suggestions yet. The bundle will grow from relevant discussion; nothing is preselected.</p>';
 return BUNDLE.map(([group])=>{
  const features=model.features.filter(f=>f.group===group);if(!features.length)return '';
  return `<div class="bundle-group"><div class="t">${esc(group)}</div><div class="summary-features">${features.map(f=>`<div class="summary-feature">
  ${interactive?`<button class="sel-chip ${f.included?'sel':''}" data-bid="${f.id}" aria-pressed="${f.included}">${esc(f.title)}</button>`:`<b>${esc(f.title)}</b>`}
  <small>${esc(f.status)}</small><details><summary>Discussion basis · ${f.sources.length}</summary>${f.sources.length?f.sources.map(sourceRecordHTML).join(''):'Manual choice retained; no active discussion source.'}</details>
  ${interactive&&f.manual?`<button class="feature-reset" data-breset="${f.id}">Use discussion suggestion</button>`:''}</div>`).join('')}</div></div>`;
 }).join('');
}
function discussionNotesHTML(){
 const notes=STEPS.filter(s=>hasText(S.notes[s.id]));
 return notes.length?notes.map(s=>`<section><h3>${esc(s.label)}</h3><p class="source-comment">${esc(S.notes[s.id])}</p></section>`).join(''):'<p>No module notes recorded.</p>';
}
