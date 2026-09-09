import diagrams from './diagrams/batch-d/model.mjs';
import {D_IDS} from './specialist-engine.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const supported=['DG-D01','DG-D02','DG-D03'];
export function specialistGraphState(state={},action={}){
 const s={graph:'DG-D01',focus:null,cursor:0,playing:false,...structuredClone(state)};
 const f=diagrams[`${supported.includes(s.graph)?s.graph:'DG-D01'}.en-AU`];
 switch(action.type){
 case 'GRAPH':if(supported.includes(action.id))return{graph:action.id,focus:null,cursor:0,playing:false};break;
 case 'FOCUS':s.focus=f.nodes.some(n=>n.id===action.id)?action.id:null;s.cursor=Math.max(0,f.nodes.findIndex(n=>n.id===s.focus));s.playing=false;break;
 case 'PLAY':s.playing=!action.reducedMotion;break;
 case 'NEXT':s.cursor=Math.min(s.cursor+1,f.nodes.length-1);s.focus=f.nodes[s.cursor].id;if(s.cursor===f.nodes.length-1)s.playing=false;break;
 case 'PAUSE':case 'REDUCED_MOTION':case 'HIDDEN':s.playing=false;break;
 }
 return s;
}
function nodeFact(id,p){
 if(!p.available)return null;
 const recordId=({'D02-ASSESS':D_IDS.creditAssessment,'D02-DECISION':p.credit?.decision_ref,'D02-CONDITION':D_IDS.creditCondition,'D02-INPUT':D_IDS.agreementInput,'D02-REVISION':D_IDS.agreement})[id];
 if(recordId)return p.versionChain?.find(record=>record.id===recordId)||null;
 if(id.startsWith('D02-'))return{revision:p.legal?.agreement_revision,status:({ 'D02-REVIEW':p.legal?.review_status,'D02-APPROVAL':p.legal?.approval_status,'D02-EXECUTION':p.legal?.execution_status})[id]};
 const domain={'D01-CONFLICTS':'conflicts','D01-CREDIT':'credit','D01-LEGAL':'legal'}[id];
 if(domain)return p.conditions?.find(c=>c.domain===domain)||null;
 if(id==='D01-READY')return{status:p.readiness?.result,revision:p.revision};
 if(id==='D01-SCOPE')return{revision:p.scopeRevision,status:'scope_specific'};
 return null;
}
export function specialistGraphHtml({graph='DG-D01',projection={},locale='en-AU',focus=null,playing=false,print=false}={}){
 const f=diagrams[`${graph}.${locale}`];if(!f)return'';const zh=locale==='zh-CN',L=(en,cn)=>zh?cn:en;
 const focused=f.nodes.find(n=>n.id===focus),edges=focused?f.edges.filter(e=>e.from===focus||e.to===focus):f.edges;
 const nodes=f.nodes; // Focus highlights; it never removes the static fallback.
 const status=v=>({complete:L('Complete','已完成'),current:L('Current','当前'),superseded:L('Superseded input','旧输入已被取代'),stale:L('Stale','已过期'),not_ready:L('Not Ready','尚未就绪'),internally_approved:L('Internally approved','内部已批准'),pending:L('Pending','待办'),scope_specific:L('This scope only','仅此范围'),awaiting_execution:L('Execution pending','待签署'),condition_pending:L('Condition pending','条件待闭合'),satisfied:L('Condition satisfied','本条件已满足')})[v]||v||L('Not evaluated','未评估');
 return `<section class="d-graph" data-d-graph="${graph}"><header><span class="trace-meta">${graph} · Archify 2.17</span><h3>${esc(f.title)}</h3><p>${L('Read-only dependency view. Playback never changes the case.','只读依赖视图。播放不改变案件。')}</p></header><img src="./diagrams/batch-d/${f.asset}.svg" width="${f.width}" height="${f.height}" style="width:100%;height:auto" alt="${esc(f.title)}" onerror="this.hidden=true"><p class="small">${L('Complete node and relationship text remains available below if the image is unavailable. These are authored relationships, not executable bank rules.','图片不可用时，下方仍保留完整节点与关系。连线是已编制的设计关系，不是可执行银行规则。')}</p>${print?'':`<nav class="d-graph-controls" aria-label="${L('Diagram focus','图示聚焦')}"><button data-d-graph-command="${playing?'PAUSE':'PLAY'}">${playing?L('Pause','暂停'):L('Play focus','播放聚焦')}</button><button data-d-graph-command="NEXT">${L('Next node','下一节点')}</button><button data-d-node="">${L('Show all','显示全部')}</button>${f.nodes.map(n=>`<button data-d-node="${n.id}" aria-pressed="${focus===n.id}">${esc(n.label)}<small class="trace-meta">${n.id}</small></button>`).join('')}</nav>`}<div class="d-graph-nodes">${nodes.map(n=>{const fact=nodeFact(n.id,projection);return `<article data-d-semantic="${n.id}" class="${focus===n.id?'selected':''}"><h4>${esc(n.label)} <small class="trace-meta">${n.id}</small></h4><p>${esc(n.sublabel)}</p>${fact?`${fact.id?`<p class="trace-meta">${L("Live record","当前记录")}: ${esc(fact.alias||fact.id)} · ${esc(fact.id)}</p>`:""}<p>${L('Current revision','当前版本')}: ${esc(fact.revision??'—')} · ${esc(status(fact.status||fact.condition_status))}</p>${fact.consumed_input_revision?`<p>${L('Consumed input revision','使用的输入版本')}: ${esc(fact.consumed_input_revision)}</p>`:''}`:`<p>${L('Context / impact must be evaluated for the selected work; no automatic outcome.','须针对所选工作评估背景或影响；不自动产生结果。')}</p>`}<p><strong>${L('Upstream','上游')}</strong> · ${esc(f.edges.filter(e=>e.to===n.id).map(e=>`${e.from} · ${e.label}`).join(' / ')||L('Entry context','入口背景'))}</p><p><strong>${L('Downstream','下游')}</strong> · ${esc(f.edges.filter(e=>e.from===n.id).map(e=>`${e.to} · ${e.label}`).join(' / ')||L('No outgoing edge','无后续连线'))}</p>${print?'':`<button data-d-ref="${n.id}">${L('References','来源')}</button>`}</article>`;}).join('')}</div><table class="d-edge-table"><caption>${L('Typed relationships','具名依赖关系')}</caption><thead><tr><th>${L('From → To','从 → 至')}</th><th>${L('Meaning','含义')}</th></tr></thead><tbody>${f.edges.map(e=>`<tr data-d-edge="${e.id}" class="${focused&&edges.includes(e)?'selected':''}"><td>${e.from} → ${e.to}</td><td>${esc(e.label)}</td></tr>`).join('')}</tbody></table></section>`;
}
