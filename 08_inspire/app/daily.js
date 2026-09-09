(() => {
  const key='ctt-daily-demo-v1';
  let state={};
  try { state=JSON.parse(localStorage.getItem(key)||'{}'); if(!state||typeof state!=='object')state={}; } catch { state={}; }
  const priorVisit=state.lastVisit;
  const changed=Boolean(state.submittedAt&&(!priorVisit||state.submittedAt>priorVisit));
  const dialog=document.querySelector('#prepared-dialog');
  const feedback=document.querySelector('#prepared-feedback');
  const wealth=document.querySelector('#wealth-answer'),funds=document.querySelector('#funds-answer');
  function persist(){try{localStorage.setItem(key,JSON.stringify(state));return true;}catch{feedback.textContent='Browser storage is unavailable. Your response is kept only while this page stays open.';return false;}}
  let taskOwner='you';
  function renderTasks(){
    const tasks=[
      {owner:state.submittedAt?'bank':'you',title:state.submittedAt?'Review the funds & wealth explanation':'Review and complete the funds & wealth explanation',caseName:'Meridian · OB-2026-0147',role:state.submittedAt?'KYC / EDD reviewer':'You · Information provider',detail:state.submittedAt?'Response received. Check evidence sufficiency before the EDD handoff.':'Aria has prepared the questions. Check the context and supply the missing facts.',label:state.submittedAt?'View submitted response':'Review request',action:'explanation'},
      {owner:'you',title:'Check and upload the certified director register',caseName:'Meridian · OB-2026-0147',role:'You · Document provider',detail:'Check that the copy is certified and matches the applicant. Bank acceptance follows upload.',label:'Review document request',href:'documents.html'},
      {owner:'bank',title:'Assess source-of-wealth evidence',caseName:'Harbourview · DEMO-EDD-002',role:'EDD / Financial Crime specialist',detail:'Compare the submitted business-sale evidence with the declared wealth explanation. Sufficiency remains undecided.',label:'View review context',href:'request.html?case=DEMO-EDD-002'}
    ];
    const yours=tasks.filter(task=>task.owner==='you').length;
    document.querySelector('#your-review-tasks').textContent='For you · '+yours;
    document.querySelector('#bank-review-tasks').textContent='Bank reviewers · '+(tasks.length-yours);
    document.querySelector('#your-review-tasks').setAttribute('aria-pressed',String(taskOwner==='you'));
    document.querySelector('#bank-review-tasks').setAttribute('aria-pressed',String(taskOwner==='bank'));
    document.querySelector('#review-task-list').replaceChildren(...tasks.filter(task=>task.owner===taskOwner).map(task=>{
      const row=document.createElement('details');row.className='review-task review-task-disclosure';
      const summary=document.createElement('summary');
      const info=document.createElement('span');info.className='review-task-heading';
      const meta=document.createElement('span');meta.className='review-task-meta';meta.textContent=task.caseName;
      const title=document.createElement('span');title.className='review-task-title';
      title.textContent=task.action==='explanation'?'Funds & wealth explanation':task.owner==='you'?'Certified director register':'Source-of-wealth evidence';
      info.append(title,meta);
      const status=document.createElement('span');status.className='review-task-status';status.textContent=task.owner==='you'?(task.action==='explanation'&&(state.wealth||state.funds)?'Draft saved':'Needs your input'):'With specialist';
      summary.append(info,status);row.append(summary);
      const content=document.createElement('div');content.className='review-task-body';
      const detail=document.createElement('p');detail.className='review-task-detail';detail.textContent=task.detail;
      const owner=document.createElement('p');owner.className='review-task-owner';owner.textContent='Responsible: '+task.role;
      const action=document.createElement(task.href?'a':'button');action.className='review-task-action';
      action.textContent=task.action==='explanation'?(state.submittedAt?'View submitted response':state.wealth||state.funds?'Continue draft':'Complete explanation'):task.owner==='you'?'Upload document':'View review context';
      if(task.href)action.href=task.href;else{action.type='button';action.addEventListener('click',open);}
      content.append(detail,owner,action);row.append(content);
      row.addEventListener('toggle',()=>{if(row.open)document.querySelectorAll('.review-task-disclosure').forEach(other=>{if(other!==row)other.open=false;});});
      return row;
    }));
  }
  document.querySelector('#your-review-tasks').addEventListener('click',()=>{taskOwner='you';renderTasks();});
  document.querySelector('#bank-review-tasks').addEventListener('click',()=>{taskOwner='bank';renderTasks();});
  function refresh(){
    document.querySelector('#visit-context').textContent=priorVisit?'Since your last visit':'Current snapshot';
    document.querySelector('#brief-title').textContent='Your review queue';
    document.querySelector('#brief-copy').textContent=state.submittedAt?'Explanation received. One document still needs your input.':'Open a task to see what Aria prepared and what needs your input.';
    document.querySelector('#brief-update').textContent=changed?'Update: your explanation was received; the EDD decision is still pending.':priorVisit?'No new bank updates since your last visit.':'Harbourview is with a specialist. No action requested from you.';
    const summary=document.querySelector('[data-case-id="OB-2026-0147"] .case-daily-summary');
    if(summary)summary.textContent=state.submittedAt?'Explanation received, pending bank review. The director register is still needed.':'Aria prepared: a scoped explanation request. You complete only the missing facts.';
    renderTasks();
    document.dispatchEvent(new CustomEvent('daily-state-changed',{detail:state}));
  }
  let opener=null;
  function open(){
    opener=document.activeElement;wealth.value=state.wealth||'';funds.value=state.funds||'';
    const submitted=Boolean(state.submittedAt);
    wealth.readOnly=submitted;funds.readOnly=submitted;
    document.querySelector('#answer-confirm').checked=submitted;
    document.querySelector('#answer-confirm').disabled=submitted;
    document.querySelector('#save-prepared').hidden=submitted;
    document.querySelector('#prepared-form button[type="submit"]').hidden=submitted;
    feedback.textContent=submitted?'Received in this demo. Pending evidence review; the register of directors is still outstanding.':'';
    dialog.showModal();
  }
  document.addEventListener('open-prepared',open);
  document.querySelector('#close-prepared').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus();else document.querySelector('#your-review-tasks').focus();});
  document.querySelector('#save-prepared').addEventListener('click',()=>{state.wealth=wealth.value;state.funds=funds.value;if(persist())feedback.textContent='Draft saved in this browser. Not submitted.';});
  document.querySelector('#prepared-form').addEventListener('submit',event=>{
    event.preventDefault();if(!wealth.value.trim()||!funds.value.trim()){feedback.textContent='Complete both explanations before submitting.';return;}
    if(state.submittedAt)return;
    const next={...state,wealth:wealth.value.trim(),funds:funds.value.trim(),submittedAt:Date.now()};
    try{localStorage.setItem(key,JSON.stringify(next));}catch{feedback.textContent='Unable to save this submission in your browser. Your answers remain here; no submission has been recorded.';return;}
    state=next;refresh();document.querySelector('#brief-update').textContent='Just received: your explanation. Bank review is still pending.';dialog.close();
  });
  const summaries={
    'OB-2026-0147':'Aria prepared: a scoped explanation request. You complete only the missing facts.',
    'DEMO-EDD-002':'With the EDD specialist. No client action requested.',
    'OB-2026-0151':'Legal drafting is progressing. Other control results remain unconfirmed.',
    'OB-2026-0093':'Saved cleared record. View details when needed.',
    'DRAFT':'Your ownership-change draft is ready to resume.'
  };
  document.querySelectorAll('[data-case-id]').forEach(card=>{
    const p=document.createElement('p');p.className='case-daily-summary';p.textContent=summaries[card.dataset.caseId]||'';card.querySelector('.cc-meta').after(p);
  });
  refresh();
  state.lastVisit=Date.now();persist();
})();
