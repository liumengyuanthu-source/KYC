import {screeningProjection} from '../screening-engine.mjs';
import {collaborationProjection} from '../collaboration-engine.mjs';
import {stages} from '../content.mjs';
import {temporalProjection,estimateProjection} from './temporal.mjs';
export const SOURCE={design:'D5-v0.2',source_ref:'00_sources/d5/Clear_to_Trade_D5_Product_Experience_Bindings_v0.2.json',scenario:'SCN-MATCH',workflow:'WF-05',surface:'PX-09'};
const labels={action_required:['Action needed','需要你处理','arrow-right-circle','→'],in_progress:['In progress','处理中','circle-dot','◉'],waiting:['Waiting','等待资料/他人','clock','◷'],on_track:['On track','按当前计划推进','route-check','✓'],at_risk:['At risk','需关注','triangle-alert','△'],blocked:['Blocked','当前动作受阻','octagon-pause','⊘'],overdue:['Overdue','超过已确认时限','clock-alert','◷!'],completed:['Step complete','本步骤已完成','circle-check','✓'],unknown:['Not yet established','待确认/无法确定','circle-help','?'],not_applicable:['Not required for this scope','本案不适用','minus-circle','−']};
export const localise=(locale,en,zh)=>locale==='zh-CN'?zh:locale==='en-US'?en.replaceAll('authorised','authorized'):en;
export function semanticStatus(key,{basis=null,baselineType=null,locale='en-AU'}={}){
 if(!labels[key]||(['on_track','at_risk','overdue','not_applicable'].includes(key)&&!basis)||(key==='overdue'&&!['internal_target','client_commitment','sla'].includes(baselineType)))key='unknown';
 const [en,zh,icon,glyph]=labels[key];return {key,label:localise(locale,en,zh),icon,glyph,basis};
}
export function statusAdapter({work_state='unknown',health_state='unknown',health_basis=null,baseline_type=null,next_action=null,freshness_state='unknown',basis=null}={},locale='en-AU'){
 const aliases={awaiting_input:'waiting',awaiting_evidence:'waiting',awaiting_response:'waiting',awaiting_review:'waiting',ready:'action_required',not_required:'not_applicable',satisfied:'completed',resolved:'completed',not_started:'unknown',referred:'waiting',pending:'waiting'};
 return {work:semanticStatus(aliases[work_state]||work_state,{basis,locale}),health:semanticStatus(freshness_state==='stale'?'unknown':health_state,{basis:health_basis,baselineType:baseline_type,locale}),next:next_action?structuredClone(next_action):null,freshness:freshness_state};
}
const topics=[['Bind query','绑定查询'],['Compare information','比较信息'],['Request evidence if needed','按需补证'],['Review pack','复核包'],['Human judgment','人判断'],['Record local result','记录局部结果']];
const getRefs=e=>e.object_refs||[e.object_ref];
export function productProgress(s,{role='ROLE-KYCOPS',locale='en-AU',viewingStep='MATCH-05',asOf=null,historicalAsOf=null,...context}={}){
 if(!s?.demoConfig?.batchC)return {allowed:false,reason:'C_CONTEXT_REQUIRED',steps:[],stages:[]};
 let p=screeningProjection(s,{role,...context});
 if(p.allowed===false)return {allowed:false,reason:'PERMISSION_REQUIRED',steps:[],stages:[]};
 const L=(en,zh)=>localise(locale,en,zh);
 // Safe views return before any internal objects, source refs, histories, timing or counts are read.
 if(['ROLE-RM','ROLE-CLIENT'].includes(role)){
  const permitted=p.collaboration||collaborationProjection(s,{...context,audience:role==='ROLE-RM'?'rm':'client'}),items=permitted?.allowed?permitted.items||[]:[];
  const received=items.some(x=>['received','submitted','awaiting_review','sufficient','partially_sufficient','accepted_for_review'].includes(x.response_status));
  const safeItems=items.map(x=>({title:x.client_reason,response_status:x.response_status}));
  return {allowed:true,safe:true,role,case_ref:role==='ROLE-RM'?p.case_id:null,revision:role==='ROLE-RM'?p.revision:null,progress:semanticStatus(items.length?'waiting':'unknown',{locale}),message:received?L('Information has been received. The remaining request items and bank review still need attention.','资料已收到；其他请求项目与银行复核仍需处理。'):items.length?L('The permitted request remains open. Check the listed information and the next response.','获准请求尚未结束，请查看所列资料及下一项响应。'):L('Review remains open. Timing and the next step need confirmation.','复核尚未结束，时间及下一步仍需确认。'),items:safeItems,next_actor:L('Relationship Manager','客户经理'),relationship_channel:'email',secure_contribution:true,estimate:estimateProjection(),request_access:!!permitted?.allowed,steps:[],stages:[]};
 }
 const boundBranch=p.branches.find(b=>b.branch_type==='information_gap'&&b.finding_ref===p.finding?.id);
 p=screeningProjection(s,{role,...context,evidenceId:context.evidenceId??p.evidence.at(-1)?.id,branchId:context.branchId??boundBranch?.id});
 const f=p.finding,task=s.workItems.find(w=>w.work_type==='screening_review'&&w.finding_ref===f?.id),branches=p.branches.filter(b=>b.finding_ref===f?.id),gap=branches.find(b=>b.branch_type==='information_gap');
 const assessments=p.assessments.filter(a=>a.finding_ref===f?.id),request=s.informationRequests.find(r=>r.id===gap?.request_ref);
 const related=new Set([f?.id,f?.run_ref,gap?.request_ref,gap?.request_item_ref,...s.screeningReviewDrafts.filter(d=>d.finding_ref===f?.id).map(d=>d.id),...branches.map(x=>x.id),...p.evidence.map(e=>e.id),...assessments.map(a=>a.id),...s.notifications.filter(n=>gap&&n.request_id===gap.request_ref).map(n=>n.id),...s.submissions.filter(x=>gap&&x.request_id===gap.request_ref).map(x=>x.id),...p.decisions.filter(x=>x.finding_ref===f?.id).map(x=>x.id)].filter(Boolean));
 const events=s.auditEvents.filter(e=>getRefs(e).some(r=>related.has(r))||(gap&&e.request_id===gap.request_ref));
 const transitions=events.flatMap(e=>{
  const kind=({'screening_result_received':'entered_queue','screening_review_resumed':'re_review_started','screening_evidence_gap_opened':'waiting_for_bank','notification_dispatched':'waiting_for_client','screening_identity_evidence_received':'waiting_for_bank'})[e.event_type];
  return kind?[{id:e.id,kind,at:e.occurred_at}]:[];
 });
 const timing=temporalProjection({events:transitions,as_of:asOf,historical_as_of:historicalAsOf}),hasDecision=p.decisions.some(d=>d.finding_ref===f?.id),hasEvidence=p.evidence.length>0;
 // Native resume evidence validates artifact record revision, release/link, subject/scope,
 // assessor permission and a recorded post-trigger assessment. Do not mirror a partial check.
 const resumed=gap?.status==='in_review',assessed=p.predicates.resume.branch_ref===gap?.id&&!!p.predicates.resume.basis_event_refs?.length&&!p.predicates.resume.reason_codes.includes('IDENTITY_ASSESSMENT_REQUIRED');
 const states=[f?'completed':'unknown',p.comparisons.length?'action_required':'unknown',resumed?'in_progress':gap?(gap.status==='completed'?'completed':'waiting'):f?'action_required':'unknown',p.draft?'action_required':'unknown',hasDecision?'completed':resumed?'in_progress':f?(gap?'waiting':'action_required'):'unknown',hasDecision?'completed':'blocked'];
 const nexts=[L('Inspect bound query','查看绑定查询'),L('Review the available comparisons','复核现有对照'),hasEvidence?L('Review received information for this purpose','按本用途复核收到的资料'):L('Prepare the precise identity request','准备精确身份请求'),L('Review prepared inputs and unknowns','复核已准备输入和未知项'),L('Request information or refer for review','补充信息或转交复核'),L('Record only a configured, supported result','仅记录配置允许且有依据的本项结果')];
 const steps=topics.map(([en,zh],i)=>({id:`MATCH-0${i+1}`,title:L(en,zh),workitem_refs:[task?.id,...(i===2?branches.map(x=>x.id):[])].filter(Boolean),output_refs:i===0?[f?.run_ref].filter(Boolean):i===1?p.comparisons.map(x=>x.id):i===3?[p.draft?.id].filter(Boolean):i===5?p.decisions.filter(x=>x.finding_ref===f?.id).map(x=>x.id):[],state:states[i],owner_role:task?.owner_role||'Unassigned',assignee_ref:f?.assignee_ref||null,next_actor_ref:i===2&&gap?(gap.waiting_for||gap.owner_ref||'Unassigned'):f?.assigned_role_ref||'Unassigned',waiting_on_refs:i===2&&gap?[gap.waiting_for||gap.wait_reason].filter(Boolean):[],timing,estimate:estimateProjection(),next_action:{label:nexts[i],allowed:false},semantics:statusAdapter({work_state:states[i],freshness_state:'current'},locale)}));
 // Display groups have independent event evidence. No group inherits another group's queue time.
 const eventKinds=[{'preliminary_screening_requested':'started_review','screening_result_received':'completed'}, {'screening_result_received':'entered_queue'}, {'screening_evidence_gap_opened':'waiting_for_bank','notification_dispatched':'waiting_for_client','screening_identity_evidence_received':'waiting_for_bank','screening_review_resumed':'resumed'}, {'screening_review_prepared':'entered_queue'}, {'screening_review_resumed':'re_review_started','screening_disposition_recorded':'completed'}, {'screening_disposition_recorded':'completed'}];
 steps.forEach((step,i)=>{step.timing=temporalProjection({events:events.filter(e=>eventKinds[i][e.event_type]).map(e=>({id:e.id,kind:eventKinds[i][e.event_type],at:e.occurred_at})),as_of:asOf,historical_as_of:historicalAsOf});});
 steps[2].next_actor_ref=hasEvidence?'ROLE-KYCOPS':gap?(request?.dispatch_status==='dispatched'?'ROLE-CLIENT':'ROLE-KYCOPS'):'ROLE-KYCOPS';
 steps[2].waiting_on_refs=resumed?[]:gap?[assessed?'resume_current_review':hasEvidence?'purpose_assessment':request?.dispatch_status==='dispatched'?'client_response':'request_review_and_dispatch']:[];
 if(resumed||assessed)steps[2].next_action={label:resumed?L('Continue review using the current purpose assessment; unresolved identity remains open','依据当前用途评估继续复核；未决身份问题保持开放'):L('Resume review using the current purpose assessment','依据当前用途评估恢复复核'),allowed:!resumed&&p.actions.resume_branch.allowed};
 if(hasEvidence&&!assessed){
  const intakeReady=p.actions.assess_identity.allowed;
  steps[2].next_action={label:intakeReady?L('Review the current evidence for this purpose','按本用途复核当前资料'):L('Recheck intake release, evidence linking and the purpose assessment for the changed input','重新核验变更输入的接收放行、证据关联与用途评估'),allowed:false};
  steps[2].waiting_on_refs=[intakeReady?'purpose_assessment':'intake_release_link_and_purpose_recheck'];
  if(assessments.length)steps[2].semantics=statusAdapter({work_state:steps[2].state,freshness_state:'stale',next_action:steps[2].next_action},locale);
 }
 const conditions=(s.clearanceConditions||[]).filter(c=>['credit','legal','conflicts','edd','qa'].includes(c.domain));
 const parallel=['credit','legal','conflicts','edd','qa'].map(id=>{const c=conditions.find(x=>x.domain===id),fresh=c?.scope_revision===p.scopeRevision?'current':c?'stale':'unknown';return {id,owner_role:c?.owner_role||'Unassigned',state:c?.status||'unknown',applicability:c?.applicability||'unknown',source_ref:c?.id||null,revision:c?.revision||null,scope_revision:c?.scope_revision||null,semantics:statusAdapter({work_state:c?.applicability==='not_required'?'not_required':c?.status,basis:c?.basis_refs?.length?c.basis_refs:null,freshness_state:fresh},locale),timing:temporalProjection({as_of:asOf}),estimate:estimateProjection()};});
 return {allowed:true,safe:false,source:SOURCE,role,case_ref:p.case_id,scope_ref:s.scopes[0].id,scope_summary:s.scopes[0].business_purpose||s.scopes[0].product_scope_ids?.join(' · ')||null,scope_revision:p.scopeRevision,revision:p.revision,plan_revision:`${SOURCE.design}:${p.scopeRevision}:${p.revision}`,plan_reason:L('Projection of current scope, tasks and recorded outputs; missing completeness remains unknown.','根据当前范围、任务与已记录产物投影；未确认的完整性保持未知。'),completeness:'unknown',clearance:'not_ready',finding_ref:f?.id||null,task_ref:task?.id||null,input_revisions:p.inputRevisions,as_of:asOf,viewing_step:steps.some(x=>x.id===viewingStep)?viewingStep:'MATCH-05',actual_work_state:task?.status||'unknown',steps,stages:stages.map(([id,en,zh])=>({id,title:L(en,zh),state:'unknown'})),parallel,timing,estimate:estimateProjection(),events:events.map(e=>({id:e.id,type:e.event_type,at:e.occurred_at,actor:e.actor_ref})),projection:p};
}
