/* Host adapter only. The delivered Archify HTML is immutable. */
window.BeforeWorkflow={
 mount(root,steps,openDiscussion){
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const map=root.querySelector('#beforeMap'),frame=root.querySelector('#beforeArchify'),inspector=root.querySelector('#beforeInspector'),picker=root.querySelector('#beforeAction');
  let observer=null,playObserver=null,active='trigger',disposed=false,previousOverflow='';
  const render=id=>{
   if(!/^(trigger|b(?:[1-9]|10))$/.test(id))return;
   active=id;inspector.dataset.action=id;picker.value=id==='trigger'?'0':id.slice(1);
   if(id==='trigger'){
    inspector.innerHTML='<span class="card-tag">Trigger · synthetic case</span><h3>Person T submits an onboarding request</h3><p>Entity A in Australia requests FX and Trade Finance. The Sydney RM must establish the sales, reporting and booking context. The request itself does not establish authority or eligibility.</p><p class="before-boundary">Select any numbered node to inspect the original action, pain, opportunity and handoff detail.</p>';
    return;
   }
   const s=steps[Number(id.slice(1))-1],prev=s.n===1?'Person T’s request':steps[s.n-2].t,next=s.n===10?'Downstream onboarding':steps[s.n].t;
   inspector.innerHTML=`<span class="card-tag">Before · action ${s.n} / 10 · working hypothesis</span><h3>${escape(s.t)}</h3>
    <div class="before-comparison"><section class="before-pain"><h4>Current experience & pain</h4><p>${escape(s.pain)}</p></section><section class="before-opportunity"><h4>Opportunity to discuss</h4><p>${escape(s.opp)}</p></section></div>
    <details class="before-facts"><summary>Action detail · inputs, handoffs & blockers</summary>
     <h4>What the RM does / sees</h4><ul>${s.doing.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>
     <h4>What must be established before moving on</h4><ul>${s.fwd.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>
     <h4>Where the work may wait</h4><ul>${s.blk.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>
     <p><b>From:</b> ${escape(prev)}<br><b>Next:</b> ${escape(next)}</p>
    </details><button type="button" class="btn btn-dark" id="beforeDiscuss">Discuss this action</button>`;
   inspector.querySelector('#beforeDiscuss').onclick=()=>{if(map.classList.contains('expanded'))expand(false);openDiscussion(s.n);};
  };
  const expand=on=>{
   const button=root.querySelector('#beforeExpand');
   if(on&&!map.classList.contains('expanded')){previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';}
   if(!on)document.body.style.overflow=previousOverflow;
   map.classList.toggle('expanded',on);button.textContent=on?'Back to scenario':'Expand diagram';button.setAttribute('aria-pressed',String(on));
  };
  root.querySelector('#beforeExpand').onclick=()=>expand(!map.classList.contains('expanded'));
  const key=e=>{if(e.key==='Escape'&&map.classList.contains('expanded'))expand(false);};
  document.addEventListener('keydown',key);
  const showStatic=on=>{
   root.querySelector('#beforeStatic').hidden=!on;frame.hidden=on;
   const button=root.querySelector('#beforeStaticToggle');button.textContent=on?'Interactive diagram':'Static fallback';button.setAttribute('aria-pressed',String(on));
   if(on){const doc=frame.contentDocument;const play=doc?.querySelector('#guided-view-play');if(play?.getAttribute('aria-pressed')==='true')play.click();const motion=doc?.querySelector('#btn-motion');if(doc?.documentElement.getAttribute('data-motion')==='live')motion?.click();}
  };
  root.querySelector('#beforeStaticToggle').onclick=()=>showStatic(root.querySelector('#beforeStatic').hidden);
  picker.onchange=()=>{
   const id=picker.value==='0'?'trigger':'b'+picker.value;render(id);
   frame.contentDocument?.querySelector(`[data-node-id="${id}"]`)?.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  };
  const load=()=>{
   if(disposed)return;
   const doc=frame.contentDocument,svg=doc?.querySelector('svg');
   if(!svg){showStatic(true);return;}
   const skin=doc.createElement('link');skin.rel='stylesheet';skin.href='../archify-workshop.css';doc.head.append(skin);
   root.querySelector('#beforeViewerStatus').textContent='Archify · select a node for discussion detail below';
   // Use the reader's native controls; never write to the workshop state.
   if(doc.documentElement.getAttribute('data-motion')==='live')doc.querySelector('#btn-motion')?.click();
   const play=root.querySelector('#beforePlay'),nativePlay=doc.querySelector('#guided-view-play');
   const syncPlay=()=>{
    const running=nativePlay?.getAttribute('aria-pressed')==='true';
    play.textContent=running?'Pause guided tour':'Play guided tour';play.setAttribute('aria-pressed',String(running));
    play.disabled=frame.contentWindow.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(play.disabled)play.textContent='Reduced motion · explore manually';
   };
   play.onclick=()=>{
    if(doc.documentElement.getAttribute('data-motion')==='still'){
     doc.querySelector('#btn-motion')?.click();
     frame.contentWindow.requestAnimationFrame(()=>{if(!disposed){nativePlay?.click();syncPlay();}});
    }else{nativePlay?.click();syncPlay();}
   };
   // Archify 2.17's outside-click guard compares only the button itself,
   // so clicking its child icon immediately closes the guide. Stop that
   // one click after the native button handler, without changing the artifact.
   doc.querySelector('#btn-diagram-guide')?.addEventListener('click',e=>e.stopPropagation());
   syncPlay();playObserver=new MutationObserver(syncPlay);playObserver.observe(nativePlay,{attributes:true,attributeFilter:['aria-pressed','disabled']});
   const onPick=e=>{const node=e.target.closest?.('[data-node-id]');if(node)render(node.dataset.nodeId);};
   doc.addEventListener('click',onPick);doc.addEventListener('keydown',key);
   observer=new MutationObserver(()=>{
    const selected=svg.querySelector('[data-focus-selected][data-node-id]');
    if(selected&&selected.dataset.nodeId!==active)render(selected.dataset.nodeId);
   });
   observer.observe(svg,{attributes:true,subtree:true,attributeFilter:['data-focus-selected']});
  };
  frame.addEventListener('load',load);
  frame.addEventListener('error',()=>showStatic(true));
  render('trigger');
  return ()=>{disposed=true;observer?.disconnect();playObserver?.disconnect();document.removeEventListener('keydown',key);if(map.classList.contains('expanded'))expand(false);};
 }
};
