/* Stage selection changes presentation only, never the saved business state. */
(() => {
  const stages = [
    {name:'Intake',code:'M0 + M1',description:'Confirm who is applying, for which product, and who may act on their behalf.',next:'Next: requirements can be prepared once the scope is confirmed.',gates:['Applicant, product and booking scope recorded with a version.','Unknown booking arrangements remain open; identity, access and signing authority are assessed separately.'],human:'Client / RM confirms the application facts. An authorized reviewer confirms the scope and purpose-specific representation. Expected issue: the ownership-change draft needs completion before scope review.',ai:'Extract application facts, suggest duplicate matches and flag unknowns. Do not merge applicants or grant authority automatically.',log:['Draft saved · Ownership change, step 3 of 6.','Next preparation · Compare revised ownership facts with the existing scope.','Waiting · Applicant confirmation before the requirements baseline.']},
    {name:'Requirements',code:'M2',description:'Define the applicable requirements before requesting more information.',next:'Next: source evidence against the confirmed requirement version.',gates:['Requirements have an applicability status, rationale and current version.','Unknown applicability and exceptions have named owners; unknown does not mean not applicable.'],human:'KYC / the relevant specialist confirms the requirement set and exceptions. If applicability is unclear, clarification is expected before that condition can be treated as satisfied.',ai:'Prepare proposed requirements from configured rules, flag changes and identify existing evidence candidates.',log:['No request assigned primarily to this stage.','When started · Prepare the requirement set from the confirmed scope.','Human checkpoint · Confirm applicability and exceptions.']},
    {name:'Evidence',code:'M3',description:'Reuse permitted evidence and request only the remaining gaps.',next:'Next: return accepted evidence to its original review task; receipt alone does not close a gap.',gates:['Source, version, permitted use and subject are linked to each document.','A reviewer records sufficiency for each intended use; unresolved gaps remain visible.'],human:'KYC reviews source and purpose-specific sufficiency. For Meridian, a certified register of directors is still required; upload is expected to trigger review, not automatic acceptance.',ai:'Find reusable documents, compare extracted facts and prepare scoped requests for permitted contributors.',log:['Parallel work · Meridian still needs a certified register of directors.','On receipt · Technical checks and fact comparison can start.','Waiting · KYC must assess whether the document supports the intended use.']},
    {name:'Screening',code:'M4',description:'Compare potential matches against the confirmed screening population.',next:'Next: record the screening disposition and assess EDD applicability independently.',gates:['Population, query version and coverage are confirmed and current.','Material matches have a human disposition; missing facts return through a scoped evidence request.'],human:'A screening / risk reviewer assesses material matches. If identifying facts are missing, further evidence is expected before a disposition; resolving one match does not clear the whole case.',ai:'Align match facts, show differences and sources, and prepare a review pack or specific evidence request.',log:['Parallel work · Screening remains part of Meridian’s open work.','Preparation · Align match facts and supporting sources.','Human checkpoint · Confirm coverage and record material dispositions.']},
    {name:'EDD review',code:'M5',description:'Meridian needs two inputs before its evidence pack can be reviewed.',next:'Next: QA may review this work once EDD evidence and required specialist decisions are recorded.',gates:['Source of funds / wealth details and the certified register are submitted and reviewed for their respective uses.','The specialist records the EDD assessment, applicable conditions and required approval; other prerequisites remain separate.'],human:'Expected next reviewer: Financial Crime / EDD specialist. Likely review focus: funds and wealth explanation, consistency with available evidence, and any residual gaps. Further clarification may be required; no approval outcome or date is predicted.',ai:'Organize the available evidence, identify unsupported statements and prepare the specialist review pack. AI preparation does not approve the risk assessment.',log:['Preparing · Meridian EDD evidence pack.','Waiting on client · Source of funds / wealth details.','Parallel gap · Certified register of directors is still outstanding.','Next handoff · Specialist review after evidence sufficiency checks.']},
    {name:'Quality review',code:'M6',description:'Review the current evidence and findings, with targeted correction loops.',next:'Next: QA sign-off contributes to readiness, alongside every other applicable prerequisite.',gates:['QA checks current requirements, evidence versions and applicable specialist results.','Specific findings are resolved and re-reviewed; QA sign-off is recorded by the responsible reviewer.'],human:'QA reviews completeness and purpose-specific sufficiency. Where a gap remains, targeted remediation is expected rather than restarting the entire case. QA sign-off is not an admission decision.',ai:'Compile the review checklist, link findings to evidence versions and identify the affected downstream work.',log:['No request assigned primarily to QA.','Meridian dependency · Evidence and EDD inputs remain open.','When eligible · Prepare a version-linked QA checklist.']},
    {name:'Parallel controls',code:'M7 · Credit · Legal',description:'Conflicts, credit and legal preparation can start as soon as their own inputs allow.',next:'Next: results join the readiness check; this is not a mandatory stage after QA.',gates:['Applicable conflicts, credit and legal conditions have their own owners and recorded outcomes.','Legal uses current credit terms; changed inputs trigger affected review before signing or readiness.'],human:'Relevant conflicts, credit and legal reviewers make their own judgments and approvals. Kestrel is provisionally grouped here because legal drafting is the known activity; its other control results still need confirmation.',ai:'Track dependencies, compare input versions and prepare legal or review material without treating preparation as approval.',log:['Kestrel · Legal drafting is in progress.','Stage assignment · Provisional, based on the known drafting activity.','Unconfirmed · Other applicable control results are not provided.','Next check · Verify current inputs before review or signing.']},
    {name:'Readiness',code:'M8',description:'Keep readiness, authorized confirmation and publication separate.',next:'Final handoffs: ready for confirmation → authorized decision → publication result.',gates:['All current applicable prerequisites are met; no unknown, stale version or unresolved hold is silently passed.','An authorized person explicitly records the decision. Publication is tracked independently; notification failure does not repeat approval.'],human:'An appropriately authorized decision-maker confirms admission. Solana’s legacy card reports cleared status; supporting authorization and publication records are not included in this homepage demo and need verification.',ai:'Summarize outstanding prerequisites, assemble the decision basis and report publication status separately.',log:['Legacy record · Solana marked cleared on 28 Aug 2026.','Evidence limit · Authorization and publication records are not shown here.','Next verification · Inspect the recorded decision and publication outcome.']}
  ];
  const cards=[...document.querySelectorAll('[data-stage]')];
  cards.sort((a,b)=>Number(a.dataset.request==='done')-Number(b.dataset.request==='done'));
  cards.forEach(card=>document.querySelector('#request-list').append(card));
  const nav=document.querySelector('#stage-nav');
  const caseSnapshots={'OB-2026-0147':stages[4],'OB-2026-0151':stages[6],'OB-2026-0093':stages[7],'DRAFT':stages[0], 'DEMO-EDD-002':{
    next:'Next: the EDD specialist reviews the submitted evidence before handing the result to QA.',
    gates:['The specialist assesses the submitted source-of-wealth evidence for its intended use. Receipt alone does not establish sufficiency.','Record the risk judgment, any conditions and required approval. Other applicable case prerequisites remain open until separately checked.'],
    human:'Expected reviewer: EDD / Financial Crime specialist. Review focus: whether the submitted business-sale evidence supports the declared source of wealth. The reviewer may accept it for this use or request specific clarification; no outcome is predicted.',
    ai:'Compare the declared wealth explanation with the submitted evidence and prepare a source-linked review summary. Do not make the specialist decision.',
    log:['Demo case · Harbourview Industries, DEMO-EDD-002.','Received · Business-sale evidence submitted for source-of-wealth review.','Preparing · Source-linked comparison for the EDD specialist.','Waiting on bank · Specialist sufficiency and risk assessment. No client action currently requested.']
  }};
  const agentEstimates={'OB-2026-0151':{task:'Agreement draft',window:'10–15 min',note:'Demo estimate · draft preparation only. Legal review follows.'}};
  const snapshots=new Map(cards.map(card=>[card,caseSnapshots[card.querySelector('.badge-mono').textContent.trim()]||{next:'Confirm this case’s current prerequisites with its owner.',gates:['Case-specific evidence and conditions have not been provided.'],human:'Reviewer and decision basis need confirmation for this case.',ai:'Prepare a case-specific evidence summary once its inputs are available.',log:['No activity record is available for this case.']} ]));
  let activeStage=0,lastStage=null,needsOnly=false,selected=null;
  cards.forEach((card,index)=>{
    card.dataset.caseId=card.querySelector('.badge-mono').textContent.trim();
    card.dataset.needs=card.dataset.needs || (card.dataset.caseId==='OB-2026-0147'?'true':'false');
    const stageLabel=document.createElement('p');stageLabel.className='card-stage';
    stageLabel.textContent=String(card.dataset.stage).padStart(2,'0')+' · '+stages[Number(card.dataset.stage)-1].name;
    card.prepend(stageLabel);
    const selectButton=document.createElement('button');selectButton.type='button';selectButton.className='card-select';
    selectButton.setAttribute('aria-label','Select '+card.querySelector('h3').textContent);
    selectButton.setAttribute('aria-pressed','false');
    selectButton.addEventListener('click',()=>showCase(card));card.append(selectButton);
    card.querySelectorAll('.cc-foot a,.cc-foot details').forEach(item=>item.remove());
    const link=document.createElement('a');link.className='case-detail-link';link.textContent=card.dataset.caseId==='DRAFT'?'Resume request':'View case details';
    link.href=card.dataset.caseId==='OB-2026-0147'?'case.html':card.dataset.caseId==='DRAFT'?'intake.html':'request.html?case='+encodeURIComponent(card.dataset.caseId);
    card.append(link);
    const estimate=agentEstimates[card.dataset.caseId];
    if(estimate){
      const eta=document.createElement('div');eta.className='agent-eta';
      const label=document.createElement('span');label.className='agent-eta-label';label.textContent=estimate.task+' · estimated completion';
      const time=document.createElement('strong');time.textContent='In '+estimate.window;
      const note=document.createElement('small');note.textContent=estimate.note;
      eta.append(label,time,note);card.querySelector('.cc-foot').before(eta);
    }

  });
  const tableWrap=document.createElement('div');tableWrap.className='request-table-wrap';
  tableWrap.innerHTML='<table class="request-table"><caption class="table-sr-only">All requests. Select a case number to see its next steps; client names open details.</caption><thead><tr><th scope="col">Case</th><th scope="col">Client</th><th scope="col">DD level</th><th scope="col">Stage</th><th scope="col">Waiting on</th><th scope="col">Target</th></tr></thead><tbody></tbody></table>';
  document.querySelector('.stage-columns').before(tableWrap);
  const rows=new Map();
  cards.forEach(card=>{
    const row=document.createElement('tr');
    const id=card.dataset.caseId;
    const identity=document.createElement('td'),pick=document.createElement('button');
    pick.type='button';pick.className='table-case-select';pick.textContent=id;pick.setAttribute('aria-label','Select '+card.querySelector('h3').textContent);pick.addEventListener('click',()=>showCase(card));identity.append(pick);
    const client=document.createElement('td'),link=document.createElement('a'),subtitle=document.createElement('span');
    const parts=card.querySelector('h3').textContent.split(' — ');link.textContent=parts[0];link.href=card.querySelector('.case-detail-link').getAttribute('href');subtitle.textContent=parts[1]||'';client.append(link,subtitle);
    const dd=document.createElement('td');dd.textContent=id==='DRAFT'?'Unconfirmed':Number(card.dataset.stage)===5?'Enhanced':'Standard';
    const stage=document.createElement('td');stage.textContent=stages[Number(card.dataset.stage)-1].name;
    const waiting=document.createElement('td'),status=document.createElement('span');status.className='table-waiting';waiting.append(status);
    const target=document.createElement('td');const estimate=agentEstimates[id];target.textContent=estimate?estimate.window:'—';if(estimate){const note=document.createElement('small');note.textContent='Demo · draft only';target.append(note);}
    row.append(identity,client,dd,stage,waiting,target);
    row.addEventListener('click',event=>{if(!event.target.closest('a,button'))showCase(card);});
    rows.set(card,{row,status,pick});tableWrap.querySelector('tbody').append(row);
  });
  function syncRows(){
    rows.forEach(({row,status,pick},card)=>{row.hidden=card.hidden;row.classList.toggle('selected-row',card===selected);pick.setAttribute('aria-pressed',String(card===selected));status.textContent=card.dataset.caseId==='DRAFT'?'You · Draft':card.dataset.caseId==='OB-2026-0151'?'Agent · Drafting':card.dataset.caseId==='DEMO-EDD-002'?'Bank · EDD review':card.dataset.request==='done'?'Cleared record':'You · '+card.querySelector('.chip').textContent.trim();status.classList.toggle('awaiting-you',card.dataset.needs==='true');});
  }
  stages.forEach((stage,index)=>{
    const matching=cards.filter(card=>Number(card.dataset.stage)===index+1);
    const attention=matching.filter(card=>card.dataset.needs==='true').length;
    const button=document.createElement('button');button.type='button';button.dataset.stageButton=index+1;
    button.innerHTML=`<span class="stage-number">${String(index+1).padStart(2,'0')}</span><span>${stage.name}</span><span class="stage-count">${matching.length}</span><span class="stage-attention">${attention?attention+' needs you':' '}</span>`;
    button.setAttribute('aria-controls','request-list');
    button.addEventListener('click',()=>{activeStage=index+1;lastStage=activeStage;render();});nav.append(button);
  });
  function showCase(card){
    selected=card;
    syncRows();
    cards.forEach(item=>{item.classList.toggle('selected-case',item===card);item.querySelector('.card-select').setAttribute('aria-pressed',String(item===card));});
    const stage=snapshots.get(card);
    const name=card.querySelector('h3').textContent.split(' — ')[0];
    const estimate=agentEstimates[card.dataset.caseId];
    const etaPanel=document.querySelector('#execution-eta');
    etaPanel.hidden=!estimate;
    etaPanel.textContent=estimate?estimate.task+' · estimated in '+estimate.window+'. '+estimate.note:'';
    document.querySelector('#gate-title').textContent='Next steps · '+name;
    for(const [id,value] of Object.entries({'gate-next':stage.next,'stage-human':stage.human,'stage-ai':stage.ai,'execution-context':name+' · '+card.dataset.caseId+' · '+stages[Number(card.dataset.stage)-1].name})) document.getElementById(id).textContent=value;
    document.querySelector('#stage-gates').replaceChildren(...stage.gates.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    document.querySelector('#execution-items').replaceChildren(...stage.log.map((text,index)=>{
      const li=document.createElement('li');li.className='agent-item';const marker=document.createElement('span');marker.className='ai-time';marker.textContent=String(index+1).padStart(2,'0');
      const body=document.createElement('span');body.textContent=text;li.append(marker,body);return li;
    }));
    document.querySelectorAll('.case-context details').forEach(item=>item.open=false);
  }
  function render(){
    const query=document.querySelector('#case-search').value.trim().toLowerCase();
    cards.forEach(card=>{card.hidden=Boolean((activeStage&&Number(card.dataset.stage)!==activeStage)||(needsOnly&&card.dataset.needs!=='true')||(query&&!card.textContent.toLowerCase().includes(query)));});
    const visible=cards.filter(card=>!card.hidden);
    nav.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.stageButton)===activeStage)));
    document.querySelector('#show-all').setAttribute('aria-pressed',String(activeStage===0));
    document.querySelector('#browse-stages').setAttribute('aria-pressed',String(activeStage!==0));
    nav.hidden=activeStage===0;
    tableWrap.hidden=activeStage!==0;
    document.querySelector('#request-list').hidden=activeStage===0;
    document.querySelector('.stage-workspace').classList.toggle('all-list-view',activeStage===0);
    syncRows();
    document.querySelector('#needs-input').setAttribute('aria-pressed',String(needsOnly));
    document.querySelector('#stage-empty').hidden=visible.length>0;
    document.querySelector('.case-context').hidden=visible.length===0;
    document.querySelector('#stage-code').textContent='';
    document.querySelector('#stage-title').textContent=(activeStage?stages[activeStage-1].name:'All requests')+' · '+visible.length;
    document.querySelector('#stage-description').textContent=visible.length?(activeStage?'Select a card to see its next step. Use “View case details” to open the request.':'Select a row to see next steps below. Click a client name to open details.'):'No case is selected. Your requests have not changed.';
    if(visible.length)showCase(visible.includes(selected)?selected:visible[0]);
  }
  const attention=cards.filter(card=>card.dataset.needs==='true').length;
  document.querySelector('#portfolio-summary').textContent=cards.length+' requests · '+attention+' case needs you';
  document.querySelector('#needs-input').textContent='Needs you · '+attention;
  document.querySelector('#show-all').addEventListener('click',()=>{activeStage=0;render();});
  document.querySelector('#browse-stages').addEventListener('click',()=>{activeStage=lastStage||Number(selected?.dataset.stage)||1;lastStage=activeStage;render();});
  document.querySelector('#needs-input').addEventListener('click',()=>{needsOnly=!needsOnly;render();});
  document.querySelector('#case-search').addEventListener('input',render);
  const actions=document.createElement('div');actions.className='stage-task-links';
  actions.innerHTML='<a href="edd.html">Complete funds & wealth details</a><a href="documents.html">Upload register of directors</a>';
  cards.find(card=>card.dataset.caseId==='OB-2026-0147').append(actions);
  document.addEventListener('daily-state-changed',event=>{
    const state=event.detail;const card=cards.find(item=>item.dataset.caseId==='OB-2026-0147');
    card.querySelector('.chip').textContent=state.submittedAt?'1 input outstanding':'2 inputs outstanding';
    card.querySelector('.cc-foot .badge-mono').textContent=state.submittedAt?'Explanation received · register needed':'Awaiting EDD information';
    if(state.submittedAt){
      const snapshot=snapshots.get(card);
      snapshot.next='Your explanation is received, pending review. Upload the certified register of directors separately; evidence must be accepted for its intended use before the specialist handoff.';
      snapshot.log=['Received · Funds and wealth explanation submitted in this local demo.','Waiting on bank · Explanation sufficiency review.','Still needed · Certified register of directors.','Next handoff · EDD specialist after evidence checks.'];
    }
    const explanation=card.querySelector('.stage-task-links a');
    explanation.textContent=state.submittedAt?'View submitted explanation':'Review prepared explanation';
    explanation.href='#prepared-dialog';
    explanation.onclick=e=>{e.preventDefault();document.dispatchEvent(new Event('open-prepared'));};
    syncRows();
    if(selected===card)showCase(card);
  });
  render();
})();
