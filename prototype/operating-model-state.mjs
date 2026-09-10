import {DEFAULT_ACTION,VIEWS,actionFor,GROUPS,authorAllowed} from './operating-model/model.mjs';
export function operatingState(input={}){
 const requested=input.action===undefined?DEFAULT_ACTION:input.action;
 return {scene:'SCN-MATCH',unavailableScene:input.scene&&input.scene!=='SCN-MATCH'?input.scene:null,view:VIEWS.includes(input.view)?input.view:'overview',action:actionFor(requested)?requested:null,staleAction:requested&&!actionFor(requested)?requested:null,skill:input.skill||null,agent:null,frame:1,playing:false,authoredOutcome:false,checkpoint:'C-result',assessmentVersion:'v0.1',catalogue:false,usage:null,reference:false,scroll:0,focus:null};
}
export function operatingAction(input,intent,value,{reducedMotion=false}={}){
 const s={...(input||operatingState())};
 if(!['next','play'].includes(intent))s.playing=false;
 switch(intent){
  case 'view':if(VIEWS.includes(value))s.view=value;break;
  case 'select':if(actionFor(value)){s.action=value;s.staleAction=null;s.skill=null;s.usage=null;}break;
  case 'action-prev':case 'action-next':{const ids=GROUPS.flatMap(g=>g.actions),index=ids.indexOf(s.action);s.action=ids[Math.max(0,Math.min(ids.length-1,index+(intent==='action-next'?1:-1)))];s.skill=null;s.staleAction=null;break;}
  case 'skill':s.view='skills';s.skill=/^SK-(0[1-9]|1[0-2])$/.test(value)?value:null;s.usage=null;break;
  case 'catalogue':s.catalogue=!s.catalogue;break;
  case 'inspect':s.usage=value;break;
  case 'scene':s.unavailableScene=value==='SCN-MATCH'?null:value;s.usage=null;break;
  case 'return-pilot':s.unavailableScene=null;break;
  case 'reference':s.reference=!s.reference;break;
  case 'agent':s.agent=s.agent===value?null:value;break;
  case 'play':s.playing=!reducedMotion&&s.frame!==3&&s.frame!==4&&s.frame<6;break;
  case 'pause':break;
  case 'next':if(s.frame<4||s.authoredOutcome&&s.frame<6)s.frame++;if([3,4,6].includes(s.frame))s.playing=false;break;
  case 'previous':s.frame=Math.max(1,s.frame-1);if(s.frame<5){s.authoredOutcome=false;s.checkpoint='C-result';}break;
  case 'replay':s.frame=1;s.authoredOutcome=false;s.checkpoint='C-result';break;
  case 'preview-outcome':if(s.frame===4){s.frame=5;s.authoredOutcome=true;s.checkpoint='C-unresolved';}break;
  case 'fit':s.focus=s.action;break;
 }
 return s;
}
export function operatingTarget(data,{role='ROLE-KYCOPS',caseRef,scopeRef,findingRef}={}){
 const no=reason=>({available:false,reason});
 if(!authorAllowed(role))return no('role');
 if(!data?.demoConfig?.batchC||data.demoConfig.batchD)return no('session');
 const c=data.case,scope=data.scopes?.[0];if(!c||!scope||caseRef&&caseRef!==c.id||scopeRef&&scopeRef!==scope.id)return no('context');
 const population=data.screeningPopulations?.find(x=>x.id===`${c.id}/population/screening-c`),run=population?.latest_run_ref;
 const finding=data.screeningFindings?.find(x=>x.source_refs?.includes('SRC-016')&&x.run_ref===run&&x.subject_ref===`${c.id}/person/person-t`&&!x.historical);
 if(!finding||findingRef&&findingRef!==finding.id)return no('finding');
 if(finding.case_id!==c.id||finding.case_scope_id!==scope.id||finding.scope_revision!==scope.revision)return no('stale');
 const subject=data.runSubjectSnapshots?.find(x=>x.id===finding.subject_snapshot_ref),person=data.naturalPersons?.find(x=>x.id===finding.subject_ref);
 if(!subject||!person||subject.party_ref!==person.id||subject.party_revision!==person.revision)return no('stale');
 const task=data.workItems?.find(x=>x.finding_ref===finding.id&&x.work_type==='screening_review'&&x.case_id===c.id&&x.case_scope_id===scope.id);
 if(!task)return no('task');
 return {available:true,step:'screening',caseRef:c.id,scopeRef:scope.id,findingRef:finding.id,taskRef:task.id,sessionRef:data.demoConfig.batchC.version,revision:c.revision,scopeRevision:scope.revision};
}
