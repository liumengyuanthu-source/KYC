/* Read-only Archify host. Workshop reviews remain owned by the existing drawers. */
window.TobeWorkflow={
 location:{view:'investigate',active:'trigger'},
 mount(root,steps,gates,openDiscussion,openGate){
  const memory=this.location,escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const map=root.querySelector('#tobeMap'),frame=root.querySelector('#tobeArchify'),inspector=root.querySelector('#tobeInspector'),picker=root.querySelector('#tobeAction'),play=root.querySelector('#tobePlay');
  let disposed=false,disconnect=()=>{},previousOverflow='',timeout;
  const list=a=>`<ul>${a.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>`;
  const expand=on=>{
   if(on&&!map.classList.contains('expanded')){previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';}
   if(!on&&map.classList.contains('expanded'))document.body.style.overflow=previousOverflow;
   map.classList.toggle('expanded',on);
   const b=root.querySelector('#tobeExpand');b.textContent=on?'Back to scenario':'Expand diagram';b.setAttribute('aria-pressed',String(on));
  };
  const stop=()=>{
   const doc=frame.contentDocument,p=doc?.querySelector('#guided-view-play');
   if(p?.getAttribute('aria-pressed')==='true')p.click();
   if(doc?.documentElement.getAttribute('data-motion')==='live')doc.querySelector('#btn-motion')?.click();
  };
  const showStatic=on=>{
   if(on)stop();
   root.querySelector('#tobeStatic').hidden=!on;frame.hidden=on;play.hidden=on;
   const b=root.querySelector('#tobeStaticToggle');b.textContent=on?'Interactive diagram':'Static fallback';b.setAttribute('aria-pressed',String(on));
  };
  const render=id=>{
   if(!/^(trigger|resolution|human|hold|downstream|t(?:[1-9]|10))$/.test(id))return;
   memory.active=id;inspector.dataset.action=id;picker.value=/^t\d+$/.test(id)?id.slice(1):'';
   const n=/^t\d+$/.test(id)?Number(id.slice(1)):0,s=steps[n-1];
   if(s){
    inspector.innerHTML=`<span class="card-tag">To-be · step ${n} of 10 · proposed design</span><h3>${escape(s.t)}</h3><p>${escape(s.fn)}</p>
     <div class="before-comparison"><section class="before-opportunity"><h4>Agent work & output</h4>${list(s.beh)}${list(s.out)}</section><section class="before-pain"><h4>Where human input is required</h4><p>${escape(s.gate)}</p></section></div>
     <details class="before-facts"><summary>Inputs, skills, rules & next step</summary><h4>Inputs</h4>${list(s.inp)}<h4>Skills / tools</h4>${list(s.skl)}<h4>Rules / constraints · to validate</h4>${list(s.rul)}<h4>Decision logic</h4>${s.dec?list(s.dec):'<p>No explicit branch in this step’s source detail; unresolved conditions still require review.</p>'}<h4>Next</h4><p>${escape(s.nxt)}</p></details>
     <button type="button" class="btn btn-dark" id="tobeDiscuss">Discuss this action</button>`;
    inspector.querySelector('#tobeDiscuss').onclick=()=>{expand(false);openDiscussion(n);};
    return;
   }
   if(id==='human'){
    inspector.innerHTML='<span class="card-tag">Human judgement · no automatic approval</span><h3>Ask the right person, with the context retained</h3><p>Inspect the original Human Gate preparation, question and accountable role. Opening a gate does not choose its outcome.</p><div class="tobe-gate-links">'+gates.map(g=>`<button type="button" class="toolbtn" data-open-gate="${g.id}">${escape(g.id+' · '+g.t)}</button>`).join('')+'</div>';
    inspector.querySelectorAll('[data-open-gate]').forEach(b=>b.onclick=()=>{expand(false);openGate(b.dataset.openGate);});return;
   }
   const content={
    trigger:['Business intent starts M0.1','Person T / RM introduces Entity A’s FX and Trade Finance request. This synthetic request does not establish authority, eligibility or clearance.'],
    resolution:['Continue with resolution and handoff','Step 7 supplies candidate contexts. Sufficient information proceeds to comparison; missing context first takes bounded resolution.'],
    hold:['Hold / stop — no supported continuation','Unresolved or unauthorised work must remain open. This diagram shows a proposed stop boundary, not an implemented bank-policy engine.'],
    downstream:['A supported M0.1 result, not Clear-to-Trade','WF-01 carries the context, owner, next actor, waiting condition and history into downstream onboarding. Other requirements and controls may remain open.']
   }[id];
   inspector.innerHTML=`<span class="card-tag">Read-only workflow context</span><h3>${escape(content[0])}</h3><p>${escape(content[1])}</p>`;
   if(id==='resolution'){inspector.innerHTML+='<button class="btn btn-dark" id="tobeContinueMap">Continue to Resolve & handoff</button>';inspector.querySelector('button').onclick=()=>switchView('resolve','t7');}
  };
  const switchView=(view,active)=>{
   stop();disconnect();clearTimeout(timeout);memory.view=view;memory.active=active||(view==='investigate'?'trigger':'t7');
   const name='tobe-'+view;
   root.querySelectorAll('[data-tobe-view]').forEach(b=>{const on=b.dataset.tobeView===view;b.classList.toggle('sel',on);b.setAttribute('aria-pressed',String(on));});
   root.querySelector('#tobeFullViewer').href=`diagrams/${name}.html?theme=light`;
   const img=root.querySelector('#tobeStatic img');img.src=`diagrams/${name}.svg`;img.alt=view==='investigate'?'Complete M0.1 investigation: trigger and steps 1–7':'Complete M0.1 resolution: steps 7–10, Human Gates, hold and downstream handoff';
   play.disabled=true;play.textContent='Loading guided tour…';play.onclick=null;showStatic(false);
   root.querySelector('#tobeViewerStatus').textContent='Loading Archify… Static fallback remains available.';
   frame.src=`diagrams/${name}.html?theme=light`;render(memory.active);
   timeout=setTimeout(()=>{if(!disposed&&play.disabled&&!frame.contentDocument?.querySelector('svg'))showStatic(true);},8000);
  };
  const onLoad=()=>{
   if(disposed)return;clearTimeout(timeout);disconnect();
   const doc=frame.contentDocument,svg=doc?.querySelector('svg');
   if(!svg){root.querySelector('#tobeViewerStatus').textContent='Viewer unavailable · use the static diagram and action details';showStatic(true);return;}
   doc.documentElement.dataset.workshopTobe='true';
   const skin=doc.createElement('link');skin.rel='stylesheet';skin.href='../archify-workshop.css';doc.head.append(skin);
   stop();root.querySelector('#tobeViewerStatus').textContent='Archify · select a node; discuss its original detail below';
   const nativePlay=doc.querySelector('#guided-view-play'),motion=frame.contentWindow.matchMedia('(prefers-reduced-motion: reduce)');
   const sync=()=>{const running=nativePlay?.getAttribute('aria-pressed')==='true';play.textContent=motion.matches?'Reduced motion · explore manually':running?'Pause guided tour':'Play guided tour';play.disabled=motion.matches||!nativePlay;play.setAttribute('aria-pressed',String(running));};
   play.onclick=()=>{
    if(doc.documentElement.getAttribute('data-motion')==='still'){
     doc.querySelector('#btn-motion')?.click();frame.contentWindow.requestAnimationFrame(()=>{if(!disposed&&frame.contentDocument===doc){nativePlay?.click();sync();}});
    }else{nativePlay?.click();sync();}
   };
   const pick=e=>{const node=e.target.closest?.('[data-node-id]');if(node)render(node.dataset.nodeId);};
   const guide=e=>e.stopPropagation();
   doc.addEventListener('click',pick);doc.addEventListener('keydown',key);doc.querySelector('#btn-diagram-guide')?.addEventListener('click',guide);
   const observer=new MutationObserver(()=>{sync();const selected=svg.querySelector('[data-focus-selected][data-node-id]');if(selected&&selected.dataset.nodeId!==memory.active)render(selected.dataset.nodeId);});
   observer.observe(doc.documentElement,{attributes:true,subtree:true,attributeFilter:['aria-pressed','data-focus-selected','data-motion']});
   motion.addEventListener('change',sync);
   disconnect=()=>{observer.disconnect();motion.removeEventListener('change',sync);doc.removeEventListener('click',pick);doc.removeEventListener('keydown',key);doc.querySelector('#btn-diagram-guide')?.removeEventListener('click',guide);};
   render(memory.active);sync();
  };
  const key=e=>{if(e.key==='Escape'&&map.classList.contains('expanded'))expand(false);};
  document.addEventListener('keydown',key);frame.addEventListener('load',onLoad);
  root.querySelector('#tobeExpand').onclick=()=>expand(!map.classList.contains('expanded'));
  root.querySelector('#tobeStaticToggle').onclick=()=>showStatic(root.querySelector('#tobeStatic').hidden);
  root.querySelectorAll('[data-tobe-view]').forEach(b=>b.onclick=()=>switchView(b.dataset.tobeView));
  picker.onchange=()=>{
   const n=+picker.value;if(!n)return;const view=n<=6?'investigate':n>=8?'resolve':memory.view,id='t'+n;
   if(view!==memory.view){switchView(view,id);return;}
   render(id);frame.contentDocument?.querySelector(`svg [data-node-id="${id}"]`)?.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  };
  root.querySelectorAll('#tobeStatic [data-tnode]').forEach(b=>b.onclick=()=>{expand(false);openDiscussion(+b.dataset.tnode);});
  switchView(memory.view,memory.active);
  return ()=>{stop();disposed=true;clearTimeout(timeout);disconnect();document.removeEventListener('keydown',key);frame.removeEventListener('load',onLoad);expand(false);};
 }
};
