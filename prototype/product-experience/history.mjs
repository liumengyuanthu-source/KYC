import {productProgress,statusAdapter} from './projection.mjs';
import {collaborationProjection} from '../collaboration-engine.mjs';
export function historyProjection({records=[],canRead=()=>false,role='ROLE-KYCOPS',tab='active',query='',user=null,currentRequestAuthority=false}={}){
 if(role==='ROLE-CLIENT'&&!currentRequestAuthority)return {records:[],total:0,safe_state:'contact_rm'};
 const allowed=records.filter(canRead);const selected=allowed.filter(r=>tab==='my_completed_work'?r.work_completed&&r.user_ref===user:tab==='archived'?['archived','session_snapshot'].includes(r.state):r.state==='active').filter(r=>`${r.case_ref||''} ${r.entity||''} ${r.scope_summary||''} ${r.outcome||''}`.toLowerCase().includes(query.toLowerCase()));
 return {records:selected.map(r=>({...structuredClone(r),read_only:true})),total:selected.length,safe_state:null};
}
export function sessionHistory(s,{role='ROLE-KYCOPS',user='demo-operator-1',archives=[],locale='en-AU',...context}={}){
 const progress=productProgress(s,{role,locale,...context});
 if(role==='ROLE-CLIENT'){
  const session=s.contributorSessions?.find(x=>x.id===context.sessionId),permitted=collaborationProjection(s,{...context,audience:'client',requestId:session?.request_id});
  if(!permitted.allowed)return {records:[],allowed:false,safe_state:'contact_rm',slots:[]};
  return {allowed:true,client:true,safe_state:null,slots:[],records:(permitted.submissions||[]).map(r=>({id:r.id,kind:'request_receipt',request_ref:permitted.request.id,revision:r.revision,as_of:r.submitted_at,intake_security_status:r.intake_security_status,read_only:true}))};
 }
 if(!progress.allowed||progress.safe)return {records:[],allowed:progress.allowed,safe_state:role==='ROLE-CLIENT'?'contact_rm':'no_historical_access',slots:[]};
 // Local saved versions are snapshots, not archived business outcomes. Current access must still allow the same case.
 const event=s.auditEvents?.at(-1),records=[{id:'active',case_ref:s.case.id,entity:'Entity A',scope_summary:'FX forward',scope_revision:s.scopes[0].revision,revision:s.case.revision,state:'active',outcome:'not_ready',as_of:event?.occurred_at||null,source_ref:event?.id||null,read_only:true,semantics:statusAdapter({work_state:'unknown'},locale)}];
 records[0].progress=productProgress(s,{role,locale,asOf:event?.occurred_at||null,historicalAsOf:event?.occurred_at||null,...context});
 for(const [i,a] of archives.entries()){
  if(a.data?.case?.id!==s.case.id||!a.data?.demoConfig?.batchC)continue;
  const old=productProgress(a.data,{role,locale,asOf:a.archived_at,historicalAsOf:a.archived_at,...context});if(!old.allowed||old.safe)continue;
  records.push({id:`session-${i}`,case_ref:s.case.id,entity:'Entity A',scope_summary:'FX forward',scope_revision:old.scope_revision,revision:old.revision,state:'session_snapshot',outcome:'not_ready',as_of:a.archived_at||a.data.auditEvents?.at(-1)?.occurred_at||null,source_ref:'local-session-archive',progress:old,read_only:true});
 }
 return {allowed:true,records,safe_state:null,slots:[{id:'historical_completed',populated:false,reason:'No approved completed-case fixture with historical scope and archive event.'},{id:'ended_non_clearance',populated:false,reason:'No approved ended-case fixture with a non-clearance outcome.'},{id:'my_completed_active',populated:false,reason:'No completed Person T review with current persona attribution. Existing authority work is Unassigned.'}]};
}
