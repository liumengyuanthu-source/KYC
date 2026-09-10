import {specialistGraphHtml} from './specialist-graph.mjs';
import {referenceHtml} from './reference-ui.mjs';
import {specialistStoryContract} from './specialist-story.mjs';

const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pair=(locale,en,zh)=>locale==='zh-CN'?zh:en;
const domains=['conflicts','credit','legal'];
const labels={
 'ROLE-CONFLICTS':['Conflicts','利益冲突'],'ROLE-CREDIT':['Credit','信贷'],'ROLE-LEGAL':['Legal','法务'],'ROLE-KYCOPS':['KYC Operations','KYC 运营'],'ROLE-QA':['Quality assurance','质量复核'],branch:['This specialist branch','本专业条线'],task:['This task','本项任务'],case:['The whole case','整个案件'],
 conflicts:['Conflicts','利益冲突'],credit:['Credit','信贷'],legal:['Legal','法务'],
 required:['Required','适用'],pending:['Pending','待办'],satisfied:['Satisfied','已满足'],
 approved_subject_to_condition:['Approved subject to condition','已批准但附带条件'],
 specialist_review_pending:['Specialist review pending','等待专业复核'],complete:['Complete','已完成'],
 open:['Open','未决'],internally_approved:['Internally approved','内部已批准'],
 awaiting_execution:['Execution pending','待签署'],current:['Current','当前'],superseded:['Superseded','已被取代'],
 not_ready:['Not Ready','尚未就绪'],unknown:['Unknown','未知']
};
const proseZh={
 'Specialist review outstanding':'专业复核尚未完成',
 'Credit condition approved; documentation fulfilment tracked separately':'信贷条件已批准；文件履行状态单独跟踪',
 'Internally approved; execution pending':'内部已批准；等待签署',
 'Current agreement uses superseded Credit input':'当前协议使用了已被取代的信贷输入',
 'Specialist review':'专业复核',
 'Documentation incorporation before execution':'签署前纳入文件条件',
 'Execution':'签署',
 'Validated signatory authority':'经验证的签署权限',
 'Current Credit input':'当前信贷输入',
 'Track Legal incorporation and execution':'跟踪法务纳入与签署',
 'Review execution prerequisites':'复核签署前置条件'
};
const label=(value,locale)=>labels[value]?.[locale==='zh-CN'?1:0]||String(value??'—').replaceAll('_',' ');
const prose=(value,locale)=>locale==='zh-CN'?(proseZh[value]||value):value;
const conditionFor=(projection,domain)=>projection.conditions?.find(condition=>condition.domain===domain);
const list=value=>(Array.isArray(value)?value:[value]).filter(Boolean);
const rows=(items,locale)=>items.map(([name,value,trace=false])=>`<div class="d-detail-row"><dt>${esc(name)}</dt><dd${trace?' class="trace-meta"':''}>${Array.isArray(value)?value.map(x=>`<span class="d-token">${esc(prose(x,locale))}</span>`).join(' '):esc(prose(value??pair(locale,'Not recorded','未记录'),locale))}</dd></div>`).join('');

export const legacyWriterActions=Object.freeze(['batch-start','batch-action','case-action','c-start','c-demo','c-action','collab-init','collab-action','collab-auth','save']);
export const isLegacyWriterAction=action=>legacyWriterActions.includes(action);
export const legacyWriterSelector=legacyWriterActions.map(action=>`[data-action="${action}"]`).join(',');

export function specialistEntryHtml({locale='en-AU',canRestore=false,pending=false,error=''}={}){
 return `<section class="d-entry"><span class="trace-meta">BATCH D · SRC-019 · ${pair(locale,'AUTHORED PREVIEW','编制预览')}</span><h3>${pair(locale,'Parallel specialist review','专业条线并行复核')}</h3><p>${pair(locale,'This preview describes the approved synthetic D-entry state. Opening the scene, Play and Next never load it or change the case.','此预览描述已批准的合成 D 入口状态。打开场景、播放或下一步均不会载入数据或改变案件。')}</p><div class="notice"><strong>${pair(locale,'Explicit fixture boundary','明确的样例边界')}</strong><p>${pair(locale,'Archive the current session and load the authored C-referred continuation only when you want to enter the specialist demonstration.','仅在需要进入专业条线演示时，归档当前会话并载入从 C 转交状态衍生的编制样例。')}</p></div>${error?`<p class="error" role="alert">${esc(error)}</p>`:''}<div class="controls"><button class="primary" data-action="d-start" ${pending?'disabled aria-disabled="true"':''}>${pending?pair(locale,'Loading approved D entry…','正在载入已批准 D 入口…'):pair(locale,'Archive session & load approved D entry','归档会话并载入已批准 D 入口')}</button>${canRestore?`<button data-action="d-restore">${pair(locale,'Restore archived pre-D session','恢复已归档的 D 前会话')}</button>`:''}</div></section>`;
}

function domainSummary(projection,domain,locale){
 const condition=conditionFor(projection,domain)||{};
 const status=domain==='conflicts'?projection.conflict?.review_status:domain==='credit'?projection.credit?.approval_status:projection.legal?.execution_status;
 const conditionState=domain==='credit'?pair(locale,'Condition approved','信贷条件已批准'):label(condition.condition_status||condition.status,locale);
 return `<article class="d-domain-card" data-d-domain="${domain}"><span class="eyebrow">${pair(locale,'DOMAIN','条线')}</span><h4>${label(domain,locale)}</h4><p><strong>${conditionState}</strong> · ${label(status,locale)}</p><p>${esc(prose(condition.why||pair(locale,'No active D state loaded.','尚未载入 D 活动状态。'),locale))}</p>${condition.revision?`<span class="mono">v${condition.revision}</span>`:''}</article>`;
}

function readinessTable(projection,locale){
 return `<table class="d-readiness"><caption>${pair(locale,'All specialist domains contribute; none alone clears the case.','所有专业条线均提供贡献；任一条线都不能单独完成案件准入。')}</caption><thead><tr><th>${pair(locale,'Domain','条线')}</th><th>${pair(locale,'Condition','条件')}</th><th>${pair(locale,'Owner','责任人')}</th><th>${pair(locale,'Waiting for','等待事项')}</th></tr></thead><tbody>${domains.map(domain=>{const condition=conditionFor(projection,domain)||{},state=domain==='credit'?pair(locale,'Condition approved','信贷条件已批准'):label(condition.condition_status||condition.status,locale);return `<tr><th>${label(domain,locale)}</th><td>${state}</td><td>${esc(label(condition.owner_role_ref,locale))}</td><td>${esc(list(condition.waitingFor).map(value=>prose(value,locale)).join(' · ')||'—')}</td></tr>`}).join('')}</tbody></table>`;
}

export function specialistSceneHtml({scene='SCN-CONFLICTS',beat='D1',mode='Target',projection={},locale='en-AU',active=false,graphState={},print=false}={}){
 const graph=beat==='D3'||beat==='D4'?'DG-D02':beat==='D2'?'DG-D01':beat==='D5'?'DG-D03':'DG-D01';
 const contract=specialistStoryContract(beat),title=contract.title;
 const current=mode==='Current';
 const activeLabel=active?pair(locale,'ACTIVE SYNTHETIC SESSION','活动中的合成会话'):pair(locale,'AUTHORED PREVIEW · NOT LOADED','编制预览 · 尚未载入');
 const stateText=!active?pair(locale,'Preview only; the current case has not been replaced.','仅为预览；当前案件未被替换。'):beat==='D2'?label(projection.conflict?.review_status,locale):beat==='D3'?label(projection.credit?.approval_status,locale):beat==='D4'?`${label(projection.legal?.approval_status,locale)} · ${label(projection.legal?.execution_status,locale)}`:label(projection.readiness?.result,locale);
 const activeWork=pair(locale,...contract.work);
 const wait=pair(locale,...contract.wait);
 const output=pair(locale,...contract.output);
 const notMeans=pair(locale,'No playback, condition view, internal approval or simulation executes an agreement, clears a conflict, confirms signatory authority or makes the case Ready.','播放、条件视图、内部批准或模拟均不会签署协议、清除利益冲突、确认签署权限或使案件就绪。');
 const summaries=(beat==='D1'||beat==='D5')?`<div class="d-domain-grid">${domains.map(domain=>domainSummary(projection,domain,locale)).join('')}</div>`:'';
 const readiness=beat==='D5'?readinessTable(projection,locale):'';
 const graphHtml=specialistGraphHtml({graph,projection,locale,focus:graphState.focus,playing:graphState.playing,print});
 const sourceIds=beat==='D2'?'SRC-019 · SRC-009:DEP-01 · SRC-010:DEP-01':beat==='D3'||beat==='D4'?'SRC-019 · SRC-009:DEP-07':beat==='D5'?'SRC-019 · SRC-009:DEP-11 · SRC-010:DEP-12':'SRC-019 · SRC-009 · SRC-010';
 const printMeta=print?`<div class="d-print-meta"><p class="eyebrow">${esc(projection.caseId)} · ${esc(projection.scopeId)} · ${beat}</p><p>${pair(locale,'Case revision','案件版本')} ${esc(projection.revision)} · ${label(projection.readiness?.result,locale)} · ${esc(sourceIds)}</p><p>${pair(locale,'Role-safe synthetic projection · no approval, execution or publication','角色安全的合成投影 · 不执行批准、签署或发布')}</p></div>`:'';
 return `<section class="d-story" data-d-beat="${beat}" data-d-scene="${scene}">${printMeta}<div class="d-story-head"><span class="trace-meta">${beat} · ${activeLabel} · ${esc(mode)}</span><h3>${pair(locale,...title)}</h3><p>${current?pair(locale,'Current: handoffs are interpreted across separate records and version currency is easy to miss.','Current：交接分散在多个记录中，版本是否最新容易被忽略。'):pair(locale,'Target: specialist work stays parallel while dependencies, versions and readiness consequences remain visible on one case.','Target：专业条线保持并行，同时在同一案件中显示依赖、版本和就绪影响。')}</p></div>${summaries}<dl class="d-story-contract">${rows([[pair(locale,'Domain','条线'),beat==='D1'||beat==='D5'?pair(locale,'Conflicts · Credit · Legal','利益冲突 · 信贷 · 法务'):label(beat==='D2'?'conflicts':beat==='D3'?'credit':'legal',locale)],[pair(locale,'Process','流程'),beat==='D2'?'M1 → M7':beat==='D3'?'C2.1–C2.3':beat==='D4'?'C1.1–C1.3':'M1 · C2 · C1 · M8',true],[pair(locale,'State','状态'),stateText],[pair(locale,'Trigger','触发'),pair(locale,'New institutional relationship · AU Entity A · FX forward','新机构关系 · 澳洲主体 A · 外汇远期')],[pair(locale,'Active work','进行中的工作'),activeWork],[pair(locale,'Wait / required input','等待 / 所需输入'),wait],[pair(locale,'Expected output','预期输出'),output],[pair(locale,'Does not mean','不代表'),notMeans],[pair(locale,'Dependency','依赖'),graph==='DG-D02'?'SRC-009:DEP-07':graph==='DG-D03'?'Scoped Hold / unknown impact':'SRC-009:DEP-01/05/06/11',graph!=='DG-D03'] ],locale)}</dl>${readiness}${graphHtml}${print?referenceHtml({locale,scene,print:true}):`<div class="d-story-actions"><button data-action="product" data-value="condition">${pair(locale,'Open Product condition','打开产品条件')}</button><button data-action="reference-scene">${pair(locale,'References / research','研究依据')}</button></div>`}</section>`;
}

export function specialistConditionHtml({projection={},domain='conflicts',role='ROLE-KYCOPS',locale='en-AU',agreementRevision=null,liveAgreementRevision=null,rationale='',error='',active=false,print=false}={}){
 if(!projection.available)return `<section class="d-workspace d-unavailable"><span class="trace-meta">BATCH D · ${pair(locale,'READ-ONLY PREVIEW','只读预览')}</span><h2>${pair(locale,'Resolve outstanding conditions','解决未闭合条件')}</h2><p>${pair(locale,'This role or case does not have an active specialist projection. Load the authored D entry explicitly or choose a configured safe view.','此角色或案件没有可用的专业条线投影。请明确载入编制的 D 入口，或选择已配置的安全视图。')}</p></section>`;
 const selected=conditionFor(projection,domain)||conditionFor(projection,'conflicts')||{};
 const frozen=agreementRevision??projection.legal?.agreement_revision;
 const stale=projection.legal?.input_currency==='superseded'||(liveAgreementRevision!=null&&frozen!==liveAgreementRevision);
 const roleOptions=[['ROLE-FACILITATOR','Facilitator'],['ROLE-CONFLICTS','Conflicts'],['ROLE-CREDIT','Credit'],['ROLE-LEGAL','Legal'],['ROLE-KYCOPS','KYC Operations'],['ROLE-QA','QA'],['ROLE-RM','Relationship Manager · safe'],['ROLE-CLIENT','Client · safe']];
 const conditionState=domain==='credit'?pair(locale,'Condition approved','信贷条件已批准'):label(selected.condition_status||selected.status,locale);
 const documentation=projection.credit?.documentation_status==='incorporated_not_executed'?pair(locale,'Documentation incorporated','文件条件已纳入'):pair(locale,'Current Credit input awaits incorporation','当前信贷输入等待纳入');
 const conditionRows=[[pair(locale,'Applicability','适用性'),label(selected.applicability,locale)],[pair(locale,'Condition state','条件状态'),conditionState],...(domain==='credit'?[[pair(locale,'Documentation','文件纳入'),documentation],[pair(locale,'Legal execution','法务签署'),pair(locale,'Legal execution pending','法务签署待完成')]]:[]),[pair(locale,'Blocking scope','阻塞范围'),label(selected.blocking_scope,locale)],[pair(locale,'Owner','责任人'),label(selected.owner_role_ref,locale)],[pair(locale,'Revision','版本'),selected.revision],[pair(locale,'Why','原因'),selected.why],[pair(locale,'Waiting for','等待事项'),selected.waitingFor],[pair(locale,'Dependencies','依赖'),selected.dependency_refs],[pair(locale,'Decision references','决定引用'),selected.decision_refs],[pair(locale,'Evidence references','证据引用'),selected.evidence_refs],[pair(locale,'Last changed','最后变更'),selected.last_changed_at],[pair(locale,'Active work','进行中的工作'),selected.activity]];
 const conflict=domain==='conflicts'?`<section class="d-safe-detail"><h3>${pair(locale,'Conflict review','利益冲突复核')}</h3><p>${esc(projection.conflict?.summary)}</p><p>${label(projection.conflict?.review_status,locale)} · ${label(projection.conflict?.finding_status,locale)}</p>${projection.conflict?.detail?`<details><summary>${pair(locale,'Restricted configured detail','受限的已配置详情')}</summary><p>${esc(projection.conflict.detail.restricted_detail)}</p><p>${label(projection.conflict.detail.materiality_status,locale)}</p></details>`:''}</section>`:'';
 const revision=`<section class="d-version"><h3>${pair(locale,'Agreement revision','协议版本')} ${esc(frozen??'—')}</h3><p>${pair(locale,'Selected historical revision stays fixed while the live case can change.','选定的历史版本保持固定，活动案件可以继续变化。')}</p>${stale?`<div class="notice"><strong>${pair(locale,'Stale input flagged','已标记旧输入')}</strong><p>${pair(locale,'AGR-01 revision 03 consumes an earlier Credit input. Review the current AI-01 before any execution assessment.','AGR-01 版本 03 使用较早的信贷输入；开展任何签署评估前须复核当前 AI-01。')}</p></div>`:''}<ul>${projection.versionChain?.map(item=>`<li><span class="mono">${esc(item.alias||item.id)} · v${esc(item.revision)}</span> — ${label(item.status,locale)}</li>`).join('')||''}</ul></section>`;
 const controls=print?'':`<div class="d-workspace-controls"><label>${pair(locale,'Role-safe view','角色安全视图')} <select id="d-role">${roleOptions.map(([value,name])=>`<option value="${value}" ${role===value?'selected':''}>${pair(locale,name,({'Facilitator':'主持人','Conflicts':'利益冲突','Credit':'信贷','Legal':'法务','KYC Operations':'KYC 运营','QA':'QA','Relationship Manager · safe':'客户经理 · 安全视图','Client · safe':'客户 · 安全视图'})[name])}</option>`).join('')}</select></label><div class="d-domain-tabs">${domains.map(value=>`<button data-d-condition="${value}" aria-pressed="${value===domain}">${label(value,locale)}</button>`).join('')}</div></div>`;
 const facilitator=!print&&role==='ROLE-FACILITATOR'?`<section class="d-simulation"><span class="eyebrow">${pair(locale,'FACILITATOR-ONLY SIMULATION','仅主持人可用的模拟')}</span><h3>${pair(locale,'Revise the Credit input','修订信贷输入')}</h3><p>${pair(locale,'This guarded action appends a synthetic revision to demonstrate stale Legal input. It is not a Credit approval, policy change or agreement action.','此受保护操作追加一个合成版本，用于演示法务旧输入。它不是信贷批准、政策变更或协议操作。')}</p><label for="d-rationale">${pair(locale,'Simulation rationale','模拟理由')}</label><textarea id="d-rationale">${esc(rationale)}</textarea>${error?`<p class="error" role="alert">${esc(error)}</p>`:''}<button class="primary" data-action="d-action" data-value="revise_credit">${pair(locale,'Revise Credit input · simulation','修订信贷输入 · 模拟')}</button></section>`:'';
 return `<section class="d-workspace" data-d-active="${active}"><header class="d-workspace-head"><span class="trace-meta">BATCH D · SRC-019 · ${active?pair(locale,'ACTIVE SYNTHETIC SESSION','活动中的合成会话'):pair(locale,'AUTHORED PREVIEW','编制预览')}</span><h2>${pair(locale,'Resolve outstanding conditions','解决未闭合条件')}</h2><p>${label(projection.readiness?.result,locale)} · ${pair(locale,'Case revision','案件版本')} ${esc(projection.revision)}</p><p class="trace-meta">${esc(projection.caseId)} · ${esc(projection.scopeId)}</p></header>${controls}<article class="d-condition-card" data-d-selected="${esc(domain)}"><h3>${label(domain,locale)}</h3><dl>${rows(conditionRows.filter(([name])=>![pair(locale,'Dependencies','依赖'),pair(locale,'Decision references','决定引用'),pair(locale,'Evidence references','证据引用')].includes(name)),locale)}</dl><details class="trace-details"${print?' open':''}><summary>${pair(locale,'Record references and dependencies','记录引用与依赖')}</summary><p class="trace-meta">${esc(selected.owner_role_ref)}</p><dl class="trace-meta">${rows(conditionRows.filter(([name])=>[pair(locale,'Dependencies','依赖'),pair(locale,'Decision references','决定引用'),pair(locale,'Evidence references','证据引用')].includes(name)),locale)}</dl></details></article>${conflict}${revision}<section class="d-dependencies"><h3>${pair(locale,'Dependency views','依赖视图')}</h3>${print?'':`<div class="controls"><button data-action="d-dependency" data-value="${domain==='conflicts'?'DG-D01':'DG-D02'}">${pair(locale,'View dependency','查看依赖')} <small class="trace-meta">${domain==='conflicts'?'DG-D01':'DG-D02'}</small></button><button data-action="d-dependency" data-value="DG-D03">${pair(locale,'Scoped Holds','限定 Holds')} <small class="trace-meta">DG-D03</small></button></div>`}</section>${facilitator}</section>`;
}

export function specialistDependencyHtml({graph='DG-D01',projection={},locale='en-AU',focus=null,playing=false,print=false}={}){
 return `<section class="d-workspace d-dependency-view"><div class="d-dependency-head">${print?'':`<button data-action="d-dependency-back">← ${pair(locale,'Back to Condition Detail','返回条件详情')}</button>`}<span class="eyebrow">${pair(locale,'PRESENTATION ONLY · NO CASE WRITES','仅用于讲解 · 不写入案件')}</span></div>${specialistGraphHtml({graph,projection,locale,focus,playing,print})}</section>`;
}

export function specialistLegacyBannerHtml({locale='en-AU',canRestore=false}={}){
 return `<div class="d-legacy-guard" role="status"><div class="d-guard-line"><strong>${pair(locale,'Specialist session active · restore the earlier session to resume previous actions','专业条线会话已启用 · 恢复早期会话后可继续先前操作')}</strong>${canRestore?`<button data-action="d-restore">${pair(locale,'Restore pre-D session','恢复 D 前会话')}</button>`:''}</div><details><summary>${pair(locale,'Why are previous actions paused?','为何暂停先前操作？')}</summary><p>${pair(locale,'Earlier A–C views remain readable, but their writers were not designed to preserve D dependencies. Restore the archived pre-D session to resume those actions.','A–C 早期视图仍可阅读，但其写入功能无法保证 D 依赖不被改写。如需恢复这些操作，请还原已归档的 D 前会话。')}</p></details></div>`;
}
