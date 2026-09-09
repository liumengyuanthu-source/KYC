export const route=['SCN-SCOPE','SCN-ENTITY','SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE','SCN-POPULATION','SCN-MATCH','SCN-EDD','SCN-CONFLICTS','SCN-CONFLICTS','SCN-CREDIT','SCN-LEGAL','SCN-READINESS'];
export const specialistStory=[['D1','SCN-CONFLICTS'],['D2','SCN-CONFLICTS'],['D3','SCN-CREDIT'],['D4','SCN-LEGAL'],['D5','SCN-READINESS']];
export const specialistBeatAt=cursor=>specialistStory[cursor-(route.length-specialistStory.length)]?.[0]||null;
export const specialistGraphForBeat=beat=>beat==='D3'||beat==='D4'?'DG-D02':beat==='D5'?'DG-D03':beat==='D1'||beat==='D2'?'DG-D01':null;
const specialistBeatForScene=id=>({'SCN-CONFLICTS':'D2','SCN-CREDIT':'D3','SCN-LEGAL':'D4','SCN-READINESS':'D5'})[id]||null;
const synchronizeSpecialistGraph=(state,beat)=>{const graph=specialistGraphForBeat(beat);return !graph||state.dGraph?.graph===graph?state.dGraph:{graph,focus:null,cursor:0,playing:false};};
export const stageFor=id=>({'SCN-SCOPE':'S1','SCN-ENTITY':'S1','SCN-CONFLICTS':'S1','SCN-REQUIREMENTS':'S2','SCN-SOURCE':'S2','SCN-GAP':'S2','SCN-VALIDATE':'S2','SCN-POPULATION':'S3','SCN-MATCH':'S3','SCN-EDD':'S3','SCN-QA':'S4','SCN-LEGAL':'S4','SCN-CREDIT':'S4','SCN-READINESS':'S5','SCN-PUBLISH':'S5'})[id]||'S2';
export const dialogScrollKey=state=>state.reference?`reference:${state.reference.scene||'all'}:${state.reference.node||'all'}`:`scene:${state.scenario}`;
export function initialNavigation() { return {page:'studio',mode:'story',locale:'en-AU',comparison:'target',trigger:'new-relationship',role:'ROLE-KYCOPS',stage:'S1',scenario:'SCN-SCOPE',modal:false,storyCursor:0,routeId:'ROUTE-NEW-REL-01',camera:{anchor:'SCN-SCOPE',offset:0},zoom:'read',step:'requirements',returnToken:null,graph:{scene:null,focus:null,branch:null},dGraph:{graph:'DG-D01',focus:null,cursor:0,playing:false},specialistBeat:null,conditionDomain:'conflicts',agreementRevision:null,liveAgreementRevision:null,liveCaseRevision:null,dependency:null,reference:null,productScroll:0,transformation:{compare:false,selectedChange:null,openChanges:[],diagramFocus:null}}; }
export function navigate(state, a) {
 const s=structuredClone(state);
 s.transformation??={compare:false,selectedChange:null,openChanges:[],diagramFocus:null};
 switch(a.type){
 case 'TRANSFORMATION_TRACE':s.transformation.traceOpen=(s.transformation.traceOpen||[]).filter(id=>id!==a.id);if(a.open)s.transformation.traceOpen.push(a.id);break;
 case 'TRANSFORMATION_COMPARE':s.transformation.compare=a.value??!s.transformation.compare;break;
 case 'TRANSFORMATION_SELECT':s.transformation.selectedChange=a.id;break;
 case 'TRANSFORMATION_DISCLOSURE':s.transformation.openChanges=s.transformation.openChanges.filter(id=>id!==a.id);if(a.open){s.transformation.openChanges.push(a.id);s.transformation.selectedChange=a.id;}break;
 case 'TRANSFORMATION_FOCUS':s.transformation.diagramFocus=a.id;s.transformation.selectedChange=a.id;break;
 case 'LOCALE': if(['zh-CN','en-AU','en-US'].includes(a.value))s.locale=a.value;break;
 case 'COMPARE': s.comparison=a.value;break;
 case 'ROLE':s.role=a.value;break;
 case 'TRIGGER':s.trigger=a.value;break;
 case 'MODE':s.mode=a.value;break;
 case 'ZOOM':s.zoom=a.value;break;
 case 'CAMERA':s.camera={anchor:a.anchor,offset:a.offset};s.stage=a.stage||s.stage;break;
 case 'SCENE':{const beat=a.beat||specialistBeatForScene(a.id);s.scenario=a.id;s.stage=a.stage||stageFor(a.id);s.specialistBeat=beat;s.dGraph=synchronizeSpecialistGraph(s,beat);s.modal=true;break;}
 case 'D_BEAT':s.specialistBeat=a.beat;s.scenario=a.scenario||specialistStory.find(x=>x[0]===a.beat)?.[1]||s.scenario;s.stage=stageFor(s.scenario);s.dGraph=synchronizeSpecialistGraph(s,a.beat);s.modal=true;break;
 case 'CLOSE':s.modal=false;break;
 case 'PRODUCT':
  if(s.page!=='product')s.returnToken={...structuredClone(s),returnToken:null};
  s.originScopeRevision=a.scopeRevision;s.page='product';s.comparison='target';s.modal=false;s.step=a.step||'screening';break;
 case 'D_CONDITION':s.conditionDomain=['conflicts','credit','legal'].includes(a.domain)?a.domain:s.conditionDomain;s.agreementRevision??=a.agreementRevision??null;break;
 case 'D_DATA_REVISION':s.liveCaseRevision=a.caseRevision;s.liveAgreementRevision=a.agreementRevision;break;
 case 'D_DEPENDENCY':
  s.dependency={graph:a.graph,origin:{...structuredClone(s),dependency:null}};s.dGraph={graph:a.graph,focus:null,cursor:0,playing:false};break;
 case 'D_DEPENDENCY_BACK':{
  if(!s.dependency?.origin)break;const origin=s.dependency.origin;return {...origin,locale:s.locale,dependency:null};
 }
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
 case 'CONTINUE':s.storyCursor=Math.min(s.storyCursor+1,route.length-1);s.scenario=route[s.storyCursor];s.specialistBeat=specialistBeatAt(s.storyCursor);s.dGraph=synchronizeSpecialistGraph(s,s.specialistBeat);s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};s.page='studio';s.mode='story';s.modal=true;break;
 case 'RESUME':s.scenario=route[s.storyCursor];s.specialistBeat=specialistBeatAt(s.storyCursor);s.dGraph=synchronizeSpecialistGraph(s,s.specialistBeat);s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};s.mode='story';s.modal=true;break;
 case 'PREVIOUS':s.storyCursor=Math.max(0,s.storyCursor-1);s.scenario=route[s.storyCursor];s.specialistBeat=specialistBeatAt(s.storyCursor);s.dGraph=synchronizeSpecialistGraph(s,s.specialistBeat);s.stage=stageFor(s.scenario);s.camera={anchor:s.scenario,offset:0};break;
 }
 return s;
}
export function leaveGuard(dirty, choice) { return !dirty?'leave':choice==='save'?'save-and-leave':choice==='discard'?'discard-and-leave':choice==='stay'?'stay':'prompt'; }
