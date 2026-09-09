export const route=['SCN-SCOPE','SCN-ENTITY','SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE','SCN-POPULATION','SCN-MATCH','SCN-EDD','SCN-READINESS'];
export const stageFor=id=>({'SCN-SCOPE':'S1','SCN-ENTITY':'S1','SCN-CONFLICTS':'S1','SCN-REQUIREMENTS':'S2','SCN-SOURCE':'S2','SCN-GAP':'S2','SCN-VALIDATE':'S2','SCN-POPULATION':'S3','SCN-MATCH':'S3','SCN-EDD':'S3','SCN-QA':'S4','SCN-LEGAL':'S4','SCN-CREDIT':'S4','SCN-READINESS':'S5','SCN-PUBLISH':'S5'})[id]||'S2';
export const dialogScrollKey=state=>state.reference?`reference:${state.reference.scene||'all'}:${state.reference.node||'all'}`:`scene:${state.scenario}`;
export function initialNavigation() { return {page:'studio',mode:'story',locale:'en-AU',comparison:'target',trigger:'new-relationship',role:'ROLE-KYCOPS',stage:'S1',scenario:'SCN-SCOPE',modal:false,storyCursor:0,routeId:'ROUTE-NEW-REL-01',camera:{anchor:'SCN-SCOPE',offset:0},zoom:'read',step:'requirements',returnToken:null,graph:{scene:null,focus:null,branch:null},reference:null,productScroll:0}; }
export function navigate(state, a) {
 const s=structuredClone(state);
 switch(a.type){
 case 'LOCALE': if(['zh-CN','en-AU','en-US'].includes(a.value))s.locale=a.value;break;
 case 'COMPARE': s.comparison=a.value;break;
 case 'ROLE':s.role=a.value;break;
 case 'TRIGGER':s.trigger=a.value;break;
 case 'MODE':s.mode=a.value;break;
 case 'ZOOM':s.zoom=a.value;break;
 case 'CAMERA':s.camera={anchor:a.anchor,offset:a.offset};s.stage=a.stage||s.stage;break;
 case 'SCENE':s.scenario=a.id;s.stage=a.stage||stageFor(a.id);s.modal=true;break;
 case 'CLOSE':s.modal=false;break;
 case 'PRODUCT':
  if(s.page!=='product')s.returnToken={...structuredClone(s),returnToken:null};
  s.originScopeRevision=a.scopeRevision;s.page='product';s.comparison='target';s.modal=false;s.step=a.step||'screening';break;
 case 'REFERENCE':
  s.reference={scene:Object.hasOwn(a,'scene')?a.scene:s.scenario,node:Object.hasOwn(a,'node')?a.node:null,selected:a.selected||null,kind:a.kind||null,query:a.query||'',origin:{...structuredClone(s),node:a.node||s.graph?.focus||null,reference:null}};
  s.modal=true;break;
 case 'REFERENCE_FILTER':if(s.reference)Object.assign(s.reference,{scene:a.scene!==undefined?a.scene:s.reference.scene,node:a.node!==undefined?a.node:s.reference.node,kind:a.kind!==undefined?a.kind:s.reference.kind,query:a.query!==undefined?a.query:s.reference.query,selected:a.selected!==undefined?a.selected:s.reference.selected});break;
 case 'REFERENCE_CLOSE':{
  if(!s.reference?.origin)break;
  const origin=s.reference.origin;return {...origin,locale:s.locale,reference:null};
 }
 case 'RETURN':{
  const origin=s.returnToken||{...initialNavigation(),scenario:s.scenario,stage:stageFor(s.scenario),camera:{anchor:s.scenario,offset:0}};
  return {...origin,page:'studio',modal:a.destination==='scenario',locale:s.locale,returnToken:null,originScopeRevision:s.originScopeRevision};
 }
 case 'CONTINUE':s.storyCursor=Math.min(s.storyCursor+1,route.length-1);s.scenario=route[s.storyCursor];s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};s.page='studio';s.mode='story';s.modal=true;break;
 case 'RESUME':s.scenario=route[s.storyCursor];s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};s.mode='story';s.modal=true;break;
 case 'PREVIOUS':s.storyCursor=Math.max(0,s.storyCursor-1);s.scenario=route[s.storyCursor];s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};break;
 }
 return s;
}
export function leaveGuard(dirty, choice) { return !dirty?'leave':choice==='save'?'save-and-leave':choice==='discard'?'discard-and-leave':choice==='stay'?'stay':'prompt'; }
