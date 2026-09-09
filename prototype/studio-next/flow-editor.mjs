const PREFIX='ctt-workshop-flow-v1:';
const sessions=new Map();
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const locale=()=>window.CTTLanguage?.locale||'en-US';
const tr=(en,zh)=>locale()==='zh-CN'?zh:en;
const title=n=>n.labels?.[locale()]??Object.values(n.labels||{})[0]??(window.CTTLanguage?.translate(n.label)||n.label);
function seed(svg){
 const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
 const nodes=[...doc.querySelectorAll('g[data-node-id]')].map(g=>{const r=g.querySelector('rect');return {id:g.getAttribute('data-node-id'),label:g.getAttribute('data-node-label')||'Step',labels:{},role:g.getAttribute('data-node-context')||'',roles:{},note:g.getAttribute('data-node-sublabel')||'',notes:{},parent:g.getAttribute('data-parent')||'',x:Number(r?.getAttribute('x')||0),y:Number(r?.getAttribute('y')||0),width:Number(r?.getAttribute('width')||220),height:100};});
 const edges=[...doc.querySelectorAll('path[data-edge-from]')].map((p,i)=>({id:'edge-'+i,from:p.getAttribute('data-edge-from'),to:p.getAttribute('data-edge-to'),label:p.getAttribute('data-edge-label')||'',labels:{}}));
 // Extra vertical space keeps editable labels readable, including bilingual content.
 nodes.forEach(n=>n.y=Math.round(n.y*1.3));
 return {version:1,nodes,edges};
}
function get(key,svg){if(!sessions.has(key)){let saved=null,error='';try{const raw=localStorage.getItem(PREFIX+key);if(raw){const d=JSON.parse(raw);if(d.version===1&&Array.isArray(d.nodes)&&Array.isArray(d.edges))saved=d;}}catch{error=tr('Saved draft could not be read.','无法读取已保存的讨论版本。');}sessions.set(key,{saved,draft:null,original:svg,selected:null,error});}return sessions.get(key);}
const field=(n,key)=>n[key+'s']?.[locale()]??Object.values(n[key+'s']||{})[0]??(window.CTTLanguage?.translate(n[key])||n[key]||'');
function modelSVG(m,editing,selected){
 const w=Math.max(900,...m.nodes.map(n=>n.x+n.width+50)),h=Math.max(300,...m.nodes.map(n=>n.y+n.height+50));
 const wrap=(value,size=22)=>{const chars=Array.from(value);return Array.from({length:Math.ceil(chars.length/size)},(_,i)=>chars.slice(i*size,(i+1)*size).join(''));};
 return `<svg class="fe-svg" viewBox="0 0 ${w} ${h}" role="group" aria-label="${tr('Workshop flow draft','工作坊流程讨论版本')}"><defs><marker id="fe-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#527392"/></marker></defs>${m.edges.map(e=>{const a=m.nodes.find(n=>n.id===e.from),b=m.nodes.find(n=>n.id===e.to);if(!a||!b)return '';const ax=a.x+a.width/2,ay=a.y+a.height,bx=b.x+b.width/2,by=b.y;const y=(ay+by)/2;return `<path d="M${ax} ${ay} V${y} H${bx} V${by}" fill="none" stroke="#527392" stroke-width="1.5" marker-end="url(#fe-arrow)"/><text x="${(ax+bx)/2}" y="${y-6}" text-anchor="middle" font-size="10" fill="#43566a" data-i18n-source>${esc(title(e))}</text>`;}).join('')}${m.nodes.map(n=>`<g ${editing?`data-fe="select" data-id="${esc(n.id)}" tabindex="0" role="button" aria-label="${esc(title(n))}"`:''}><rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" rx="8" fill="${selected===n.id&&editing?'#e2f0ff':'#fff'}" stroke="${selected===n.id&&editing?'#006ad4':'#7a8da1'}" stroke-width="${selected===n.id&&editing?3:1.5}"/><text x="${n.x+12}" y="${n.y+18}" fill="#53677b" font-size="10" data-i18n-source>${esc(field(n,'role').slice(0,40))}</text><text x="${n.x+12}" y="${n.y+40}" fill="#172433" font-size="12" font-weight="600" data-i18n-source>${wrap(title(n),25).slice(0,2).map((l,i)=>`<tspan x="${n.x+12}" dy="${i?16:0}">${esc(l)}</tspan>`).join('')}</text><text x="${n.x+12}" y="${n.y+86}" fill="#53677b" font-size="10" data-i18n-source>${esc(field(n,'note').slice(0,40))}</text></g>`).join('')}</svg>`;
}
export function workshopFlow(key,svg){const s=get(key,svg);return s.draft||s.saved?`<div class="fe-preview" data-flow-key="${esc(key)}">${modelSVG(s.draft||s.saved,!!s.draft,s.selected)}</div>`:svg;}
export function workshopTools(key,svg){const s=get(key,svg),m=s.draft,n=m?.nodes.find(n=>n.id===s.selected);const button=(a,en,zh)=>`<button type="button" data-fe="${a}">${tr(en,zh)}</button>`;
 return `<section class="fe-tools" data-flow-key="${esc(key)}" data-i18n-source><div class="fe-toolbar"><strong>${tr('Workshop draft','工作坊讨论版本')}</strong>${m?button('save','Save','保存')+button('cancel','Cancel editing','取消编辑')+button('add','Add step','新增步骤'):button('edit',s.saved?'Edit saved flow':'Edit target flow',s.saved?'编辑已保存流程':'编辑目标流程')}${s.saved||m?button('export','Export backup','导出备份')+button('reset',s.resetPending?'Confirm restore':'Restore original',s.resetPending?'确认恢复原图':'恢复原图'):''}<span role="status">${esc(s.error|| (m?tr('Unsaved edits','尚未保存'):s.saved?tr('Saved in this browser','已保存在当前浏览器'):''))}</span></div>${m?`<p>${tr('Select a step in the diagram to edit it. Changes apply to this part of the target flow only.','点击图中步骤进行编辑。修改仅适用于当前场景、当前部分的目标流程。')}</p><div class="fe-edit-layout"><div>${n?`<label>${tr('Step','步骤')}<input data-fe-field="label" value="${esc(title(n))}" maxlength="100"></label><label>${tr('Participant / role','参与者／角色')}<input data-fe-field="role" value="${esc(field(n,'role'))}" maxlength="100"></label><label>${tr('Description','说明')}<input data-fe-field="note" value="${esc(field(n,'note'))}" maxlength="160"></label><div class="fe-position"><label>X<input type="number" min="0" max="4000" data-fe-field="x" value="${n.x}"></label><label>Y<input type="number" min="0" max="4000" data-fe-field="y" value="${n.y}"></label>${button('left','Move left','左移')}${button('right','Move right','右移')}${button('delete','Delete step','删除步骤')}</div>`:tr('Select a step or add one.','请选择或新增步骤。')}</div><div><h4>${tr('Connections','连接关系')}</h4>${m.edges.map((e,i)=>`<div class="fe-edge"><select aria-label="${tr('From','起点')} ${i+1}" data-fe-edge="${esc(e.id)}" data-end="from">${options(m,e.from)}</select><span>→</span><select aria-label="${tr('To','终点')} ${i+1}" data-fe-edge="${esc(e.id)}" data-end="to">${options(m,e.to)}</select><button type="button" data-fe="remove-edge" data-id="${esc(e.id)}" aria-label="${tr('Remove connection','删除连接')} ${i+1}">×</button></div>`).join('')}${button('add-edge','Add connection','新增连接')}</div></div>`:''}<small>${tr('Saved as a workshop proposal. Source workflows and detailed work records remain available below.','保存为工作坊讨论方案。原始流程与下方工作项记录仍保留。')}</small></section>`;
}
function options(m,id){return m.nodes.map(n=>`<option value="${esc(n.id)}" ${n.id===id?'selected':''}>${esc(title(n))}</option>`).join('');}
export function bindFlowEditor(root,refresh,opts){
 const context=el=>{const key=el.closest('[data-flow-key]')?.dataset.flowKey;return [key,sessions.get(key)];};
 root.addEventListener('click',e=>{const el=e.target.closest('[data-fe]');if(!el)return;e.preventDefault();e.stopImmediatePropagation();const [key,s]=context(el);if(!s)return;const a=el.dataset.fe;const n=s.draft?.nodes.find(n=>n.id===s.selected);s.error='';
 if(a==='edit'){s.draft=structuredClone(s.saved||seed(s.original));s.selected=s.draft.nodes[0]?.id;}
 if(a==='select')s.selected=el.dataset.id;
 if(a==='cancel'){s.draft=null;s.selected=null;}
 if(a==='save'){try{localStorage.setItem(PREFIX+key,JSON.stringify(s.draft));s.saved=structuredClone(s.draft);s.draft=null;}catch{s.error=tr('Save failed. Keep this page open and export a backup.','保存失败，请保留页面并导出备份。');}}
 if(a==='reset'&&!s.resetPending){s.resetPending=true;refresh();return;}if(a==='reset'&&s.resetPending){s.resetPending=false;try{localStorage.removeItem(PREFIX+key);s.saved=null;s.draft=null;}catch{s.error=tr('Could not restore the original.','恢复失败。');}}
 if(a==='add'){const id='workshop-'+crypto.randomUUID();s.draft.nodes.push({id,label:'New step',labels:{'zh-CN':'新步骤'},role:'',roles:{},note:'',notes:{},x:50,y:Math.max(0,...s.draft.nodes.map(n=>n.y+n.height))+35,width:240,height:100});s.selected=id;}
 if(a==='delete'&&n){s.draft.nodes=s.draft.nodes.filter(x=>x.id!==n.id);s.draft.edges=s.draft.edges.filter(x=>x.from!==n.id&&x.to!==n.id);s.selected=s.draft.nodes[0]?.id;}
 if(a==='left'&&n)n.x=Math.max(0,n.x-250);if(a==='right'&&n)n.x=Math.min(4000,n.x+250);
 if(a==='remove-edge')s.draft.edges=s.draft.edges.filter(x=>x.id!==el.dataset.id);
 if(a==='add-edge'&&s.draft.nodes.length>1)s.draft.edges.push({id:crypto.randomUUID(),from:s.selected||s.draft.nodes[0].id,to:s.draft.nodes.find(n=>n.id!==s.selected)?.id||s.draft.nodes[1].id,label:'',labels:{}});
 if(a==='export'){const blob=new Blob([JSON.stringify({diagram:key,...(s.draft||s.saved)},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=key+'-workshop.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 refresh();
 },{...opts,capture:true});
 root.addEventListener('input',e=>{const el=e.target;if(!el.matches('[data-fe-field],[data-fe-edge]'))return;e.stopImmediatePropagation();const [,s]=context(el);if(!s?.draft)return;
 if(el.dataset.feField){const n=s.draft.nodes.find(n=>n.id===s.selected),k=el.dataset.feField;if(!n)return;if(['x','y'].includes(k))n[k]=Math.max(0,Math.min(4000,Number(el.value)||0));else{const prop=k==='label'?'labels':k+'s';n[prop]||={};n[prop][locale()]=el.value;}}
 else {const edge=s.draft.edges.find(x=>x.id===el.dataset.feEdge);edge[el.dataset.end]=el.value;}
 if(el.dataset.feField){const preview=root.querySelector('.fe-preview');if(preview)preview.innerHTML=modelSVG(s.draft,true,s.selected);}else refresh();
 },{...opts,capture:true});
 window.addEventListener('beforeunload',e=>{if([...sessions.values()].some(s=>s.draft)){e.preventDefault();e.returnValue='';}},opts);
 root.addEventListener('keydown',e=>{if(e.target.matches('[data-fe="select"]')&&['Enter',' '].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}},{...opts,capture:true});
}
