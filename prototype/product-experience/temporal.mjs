// D5 presentation only. Callers supply an observation time; this module has no clock or writes.
export const TIME_DEMO=Object.freeze({fixture_id:'D5U-TIME-DEMO-01',scope:'illustration_only_not_a_bank_sla',timezone:'Australia/Sydney',as_of:'2026-09-07T14:00:00+10:00',events:[{kind:'entered_queue',at:'2026-09-07T09:00:00+10:00'},{kind:'started_review',at:'2026-09-07T09:30:00+10:00'},{kind:'waiting_for_client',at:'2026-09-07T10:00:00+10:00'}],human_active_effort_hours:null,estimate:{source_kind:'synthetic_demo_configuration',source_ref:'D5-v0.2 §18.5',lower:1,upper:2,unit:'business_days',anchor_condition:'all_required_information_ready_for_this_review',calendar_ref:null,timezone:'Australia/Sydney',estimated_at:'2026-09-07T14:00:00+10:00',based_on_versions:{design:'D5-v0.2'},review_status:'illustrative_only',calendar_finish:null,client_communication_allowed:false,is_bank_sla:false}});
const transition={entered_queue:'queued',started_review:'in_progress',resumed:'in_progress',re_review_started:'in_progress',waiting_for_client:'waiting',waiting_for_bank:'waiting',completed:'completed'};
const valid=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
export function temporalProjection({events=[],as_of=null,historical_as_of=null,timezone='Australia/Sydney'}={}){
 const asOf=historical_as_of||as_of,limit=valid(asOf)?Date.parse(asOf):null;
 const rows=events.filter(e=>transition[e.kind]&&valid(e.at)&&(limit===null||Date.parse(e.at)<=limit)).map((e,i)=>({...e,_i:i})).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at)||a._i-b._i);
 const intervals=[],residence={queued:0,in_progress:0,waiting:0},episodes=[];let currentEpisode='initial';
 for(let i=0;i<rows.length;i++){
  const e=rows[i];if(e.episode_ref)currentEpisode=e.episode_ref;else if(e.kind==='re_review_started')currentEpisode=`re-review-${i}`;
  let ep=episodes.find(x=>x.id===currentEpisode);if(!ep){ep={id:currentEpisode,entered_at:e.at,completed_at:null,event_refs:[]};episodes.push(ep);}ep.event_refs.push(e.id||null);if(e.kind==='completed')ep.completed_at=e.at;
  const end=rows[i+1]?.at||asOf,state=transition[e.kind];if(end&&state!=='completed'&&Date.parse(end)>=Date.parse(e.at)){const hours=(Date.parse(end)-Date.parse(e.at))/3600000;residence[state]+=hours;intervals.push({start:e.at,end,state,hours,episode_ref:currentEpisode,event_ref:e.id||null});}
 }
 const first=kind=>rows.find(x=>x.kind===kind)?.at||null,last=rows.at(-1),completed=last?.kind==='completed'?last.at:null,entered=rows[0]?.at||null,end=completed||asOf;
 return {as_of:asOf,timezone,frozen:!!historical_as_of,entered_at:entered,queued_at:first('entered_queue'),started_at:first('started_review'),waiting_since:last&&transition[last.kind]==='waiting'?last.at:null,resumed_at:rows.filter(e=>['resumed','re_review_started'].includes(e.kind)).at(-1)?.at||null,completed_at:completed,elapsed_hours:entered&&end?(Date.parse(end)-Date.parse(entered))/3600000:null,residence_hours:rows.length?residence:{queued:null,in_progress:null,waiting:null},human_active_effort_hours:null,intervals,episodes};
}
export function estimateProjection(estimate){
 if(!estimate)return {lower:null,upper:null,unit:null,calendar_finish:null,source_ref:null,reason:'awaiting_reviewable_information_and_owner_estimate',client_communication_allowed:false,revisions:[]};
 // An interval never creates a calendar deadline, permission, SLA or decision.
 return {...structuredClone(estimate),calendar_finish:null,client_communication_allowed:estimate.client_communication_allowed===true&&estimate.review_status==='reviewed'&&estimate.freshness==='current'&&!!estimate.source_ref&&estimate.source_kind!=='synthetic_demo_configuration',revisions:structuredClone(estimate.revisions||[])};
}
export function formatInstant(value,locale='en-AU',timezone='Australia/Sydney'){
 if(!valid(value))return locale==='zh-CN'?'未记录':'Not recorded';
 return `${new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short',timeZone:timezone}).format(new Date(value))} · ${timezone}`;
}
