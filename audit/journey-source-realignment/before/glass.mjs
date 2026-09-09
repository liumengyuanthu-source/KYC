// Web glass approximation: backdrop blur + gradient illumination. No optical refraction.
// Material planes move independently; readable content is never filtered or distorted.
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
let pressed=null,frame=0,lastRelease=null;
const groups=()=>[...document.querySelectorAll('.segmented,.topnav')];
const groupKey=(g,i)=>`${g.closest('dialog')?'modal':'page'}:${g.className}:${i}`;
export function captureGlass(){return new Map(groups().map((g,i)=>{const s=g.querySelector('.selection-glass');return [groupKey(g,i),s?{rect:s.getBoundingClientRect(),value:s.dataset.value}:null]}));}
function selectGlass(g,previous){
 const active=g.querySelector('button[aria-pressed="true"],button.active');if(!active)return;
 const s=document.createElement('span');s.className='selection-glass';s.setAttribute('aria-hidden','true');s.dataset.value=active.dataset.value||active.dataset.action;
 g.append(s);s.style.left=active.offsetLeft+'px';s.style.top=active.offsetTop+'px';s.style.width=active.offsetWidth+'px';s.style.height=active.offsetHeight+'px';
 if(previous&&!reduce.matches&&previous.value!==s.dataset.value){const r=s.getBoundingClientRect(),p=previous.rect;
  s.animate([{transform:`translate(${p.x-r.x}px,${p.y-r.y}px) scale(${p.width/r.width},${p.height/r.height})`},{transform:'translate(0,0) scale(1.025,.98)',offset:.8},{transform:'none'}],{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});
 }
}
export function enhanceGlass(previous=new Map()){
 document.querySelectorAll('button').forEach(b=>{
  if(b.querySelector(':scope > .glass-surface'))return;
  const label=document.createElement('span');label.className='button-label';while(b.firstChild)label.append(b.firstChild);
  const surface=document.createElement('span');surface.className='glass-surface';surface.setAttribute('aria-hidden','true');b.append(surface,label);b.classList.add('glass-control');
  if(lastRelease&&!reduce.matches&&performance.now()-lastRelease.at<150&&b.dataset.action===lastRelease.action&&b.dataset.value===lastRelease.value&&b.closest('dialog')?.id===lastRelease.dialog){b.classList.add('is-releasing');setTimeout(()=>b.classList.remove('is-releasing'),420)}
 });
 groups().forEach((g,i)=>{g.querySelector('.selection-glass')?.remove();selectGlass(g,previous.get(groupKey(g,i)))});
}
function control(e){const b=e.target.closest?.('button.glass-control');return b&&!b.disabled?b:null;}
function release(){if(!pressed)return;const b=pressed;pressed=null;b.classList.remove('is-pressed');lastRelease={action:b.dataset.action,value:b.dataset.value,dialog:b.closest('dialog')?.id,at:performance.now()};
 if(reduce.matches||!b.isConnected)return;
 b.classList.add('is-releasing');setTimeout(()=>b.classList.remove('is-releasing'),420);
}
document.addEventListener('pointermove',e=>{
 if(!fine.matches||reduce.matches||e.pointerType==='touch')return;
 const b=control(e);if(!b)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
  const r=b.getBoundingClientRect(),x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));
  b.style.setProperty('--light-x',`${x*100}%`);b.style.setProperty('--light-y',`${y*100}%`);
  b.style.setProperty('--tilt-x',`${(0.5-y)*.7}deg`);b.style.setProperty('--tilt-y',`${(x-.5)*.7}deg`);
 });
},{passive:true});
document.addEventListener('pointerout',e=>{const b=control(e);if(b&&!b.contains(e.relatedTarget)){b.style.removeProperty('--tilt-x');b.style.removeProperty('--tilt-y');b.style.removeProperty('--light-x');b.style.removeProperty('--light-y')}});
document.addEventListener('pointerdown',e=>{if(e.button!==0)return;release();pressed=control(e);pressed?.classList.add('is-pressed')});
document.addEventListener('pointerup',release);document.addEventListener('pointercancel',release);
document.addEventListener('keydown',e=>{if(!e.repeat&&['Enter',' '].includes(e.key)){pressed=control(e);pressed?.classList.add('is-pressed')}});
document.addEventListener('keyup',e=>{if(['Enter',' '].includes(e.key))release()});
window.addEventListener('blur',release);
reduce.addEventListener('change',()=>{release();document.querySelectorAll('.glass-surface,.selection-glass').forEach(e=>e.getAnimations().forEach(a=>a.cancel()))});
let resize;
window.addEventListener('resize',()=>{clearTimeout(resize);resize=setTimeout(()=>groups().forEach(g=>{g.querySelector('.selection-glass')?.remove();selectGlass(g)}),100)});

// Tabler outline icons, MIT, Copyright (c) 2020-2026 Paweł Kuna.
// Paths vendored from github.com/tabler/tabler-icons/icons/outline, 2026-09-07.
const paths={arrow:'<path d="M17 7l-10 10"/><path d="M8 7l9 0l0 9"/>',play:'<path d="M7 4v16l13 -8l-13 -8"/>',info:'<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 9h.01"/><path d="M11 12h1v4h1"/>'};
function icon(name){return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;}
export function refineLayout(locale){
 const zh=locale==='zh-CN',intro=document.querySelector('.intro');
 if(intro){
  intro.querySelector('.eyebrow').textContent=zh?'机构业务 · JOURNEY STUDIO':'INSTITUTIONAL BUSINESS · JOURNEY STUDIO';
  intro.querySelector('h1').textContent=zh?'共同看清准入条件。':'A shared view of readiness.';
  intro.querySelector('.intro-copy').textContent=zh?'从适用要求到人工决定，看清每一步如何影响整体准入。':'From requirements to human decisions. See how each task affects the whole case.';
  const method=intro.querySelector('.method');const more=document.createElement('details');more.className='method-disclosure';const summary=document.createElement('summary');summary.textContent=zh?'Workshop 方法':'Workshop method';more.append(summary,method);intro.append(more);
  document.querySelector('.case-strip + section')?.classList.add('journey-studio');
 }
 document.querySelectorAll('.scene-card .arrow').forEach(e=>e.innerHTML=icon('arrow'));
 document.querySelectorAll('button.info').forEach(e=>e.innerHTML=icon('info'));
 const play=document.querySelector('[data-action="play"]');if(play&&!['Pause','暂停'].includes(play.textContent))play.insertAdjacentHTML('afterbegin',icon('play'));
 const tail=document.querySelector('.foot span:last-child');if(tail)tail.textContent=zh?'黑 · 蓝 · 白 / Web 玻璃模拟，非光学折射':'Black · blue · white / Web glass approximation, not optical refraction';
}
