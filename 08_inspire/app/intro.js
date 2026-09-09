/* Region-based, nonmodal introduction. Completion never changes business data. */
(() => {
  const key='ctt-workspace-regional-intro-v2';
  const coach=document.querySelector('#workspace-intro');
  const main=document.querySelector('.home-main');
  const steps=[
    {target:'.daily-brief',title:'Your daily starting point',copy:'Switch between your tasks and bank reviews. Open a task to see the context and its next action.'},
    {target:'.request-table tbody tr:not([hidden]), .case-card:not([hidden])',title:'Select a request to see its next step',copy:'Select a row in All requests, or a card in the stage view. Client links open the request details.'},
    {target:'.case-context .gate-card',title:'Know what happens next',copy:'This panel follows your selected case. Expand the conditions for expected human review; Aria’s execution log sits directly below.'}
  ];
  let index=0,target=null,opener=null,frame=0;
  const next=document.querySelector('#intro-next');
  function place(){
    if(coach.hidden||!target)return;
    if(!target.getClientRects().length){finish();return;}
    const r=target.getBoundingClientRect(),box=coach.getBoundingClientRect();
    const topLimit=Math.max(12,main.getBoundingClientRect().top+10),bottomLimit=innerHeight-12;
    let x,y;
    if(innerWidth-r.right>box.width+24){x=r.right+14;y=r.top;}
    else if(r.left>box.width+24){x=r.left-box.width-14;y=r.top;}
    else {x=r.right-box.width;y=bottomLimit-r.bottom>=box.height+14?r.bottom+14:r.top-box.height-14;}
    coach.style.left=Math.max(12,Math.min(x,innerWidth-box.width-12))+'px';
    coach.style.top=Math.max(topLimit,Math.min(y,bottomLimit-box.height))+'px';
  }
  function render(){
    target?.classList.remove('intro-highlight');
    const item=steps[index];target=[...document.querySelectorAll(item.target)].find(element=>element.getClientRects().length);
    if(!target){finish();return;}
    target.classList.add('intro-highlight');
    document.querySelector('#intro-title').textContent=item.title;
    document.querySelector('#intro-description').textContent=item.copy;
    document.querySelector('#intro-step-label').textContent=`${index+1} / ${steps.length} · QUICK TOUR`;
    document.querySelector('#intro-back').disabled=index===0;
    next.textContent=index===steps.length-1?'Got it':'Next';
    coach.hidden=false;
    target.scrollIntoView({block:'center',behavior:'instant'});
    const r=target.getBoundingClientRect(),h=coach.getBoundingClientRect().height;
    const topLimit=main.getBoundingClientRect().top+10;
    // Make room above a tall target when neither side nor the space below fits.
    if(innerWidth-r.right<324&&r.left<324&&innerHeight-r.bottom<h+26&&r.top-topLimit<h+14){main.scrollTop-=h+14-(r.top-topLimit);}
    place();next.focus({preventScroll:true});
  }
  function open(){opener=document.activeElement;index=0;render();}
  function finish(){
    try{localStorage.setItem(key,'complete');}catch{try{sessionStorage.setItem(key,'complete');}catch{}}
    coach.hidden=true;target?.classList.remove('intro-highlight');target=null;
    if(opener&&opener!==document.body)opener.focus({preventScroll:true});
  }
  document.querySelector('#intro-skip').addEventListener('click',finish);
  document.querySelector('#intro-back').addEventListener('click',()=>{if(index>0){index--;render();}});
  next.addEventListener('click',()=>{if(index===steps.length-1)finish();else{index++;render();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!coach.hidden)finish();});
  document.querySelector('#replay-intro').addEventListener('click',event=>{event.preventDefault();open();});
  function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(place);}
  main.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  // Opening a real workflow takes precedence over the tour.
  document.addEventListener('open-prepared',()=>{if(!coach.hidden)finish();});
  document.querySelector('#review-task-list').addEventListener('click',event=>{if(event.target.closest('.review-task-action')&&!coach.hidden)finish();});
  let completed=false;try{completed=localStorage.getItem(key)==='complete';}catch{}
  try{completed=completed||sessionStorage.getItem(key)==='complete';}catch{}
  if(!completed)open();
})();
