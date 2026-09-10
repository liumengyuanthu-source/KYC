import {comparisonFor,branches} from './reconstruction/registry.mjs';

export const pc01Scenes=Object.freeze(['SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE']);
export const readerRevision='d3a-pc01-author-r1';
export const activeBranchPrint=state=>state.reconstructionPrint===true&&state.page==='studio'&&state.mode==='print'&&pc01Scenes.includes(state.scenario)&&!state.reference&&!state.branchIndex;
export const authorReaderAllowed=role=>!['ROLE-RM','ROLE-CLIENT'].includes(role);
export function branchComparison(sceneId,locale='en-AU') {
 const base=comparisonFor(sceneId,locale);if(!base)return null;
 const parts=base.branch.scenario_refs.map(id=>comparisonFor(id,locale)).filter(Boolean);
 const unique=(field,key)=>[...new Map(parts.flatMap(p=>p[field]).map(v=>[v[key],v])).values()];
 const traces=unique('traces','trace_id').map(trace=>{
  const siblings=parts.flatMap(p=>p.traces).filter(t=>t.trace_id===trace.trace_id),merged={...trace};
  for(const field of ['mapping_refs','scene_refs','current_node_refs','target_node_refs'])merged[field]=[...new Set(siblings.flatMap(t=>t[field]))];
  merged.external_refs={...trace.external_refs};
  for(const field of ['mapping_refs','scene_refs','current_node_refs','target_node_refs'])merged.external_refs[field]=[...new Set(siblings.flatMap(t=>t.external_refs[field]))].filter(id=>!merged[field].includes(id));
  return merged;
 });
 return {...base,nodes:unique('nodes','node_id'),mappings:unique('mappings','mapping_id'),topics:unique('topics','topicId'),traces,references:unique('references','reference_ref')};
}
export function readerState(sceneId,input={}) {
 const c=branchComparison(sceneId);if(!c)return null;
 const same=!input.sceneId||input.sceneId===sceneId;
 const pick=(field,values,fallback)=>same&&values.includes(input[field])?input[field]:fallback;
 const s={sceneId,branchId:c.branch.branch_id,panel:pick('panel',['scenario','comparison','references','branches'],'scenario'),mode:pick('mode',['current','target','compare'],'compare'),mappingId:same&&Object.hasOwn(input,'mappingId')?input.mappingId:c.defaultMappingId,nodeId:same?input.nodeId||null:null,filter:same&&typeof input.filter==='string'?input.filter.slice(0,120):'',view:pick('view',['overview','read','focus'],'read'),revision:readerRevision,notice:null,originSceneId:pc01Scenes.includes(input.originSceneId)?input.originSceneId:sceneId,returnPanel:pick('returnPanel',['scenario','comparison'],'comparison'),branchChoice:same&&branches.some(b=>b.branch_id===input.branchChoice)?input.branchChoice:null};
 const missing=s.nodeId&&!c.nodes.some(v=>v.node_id===s.nodeId)?s.nodeId:s.mappingId&&!c.mappings.some(v=>v.mapping_id===s.mappingId)?s.mappingId:null;
 if(missing){s.notice={oldRef:String(missing).slice(0,160),oldRevision:String(input.revision||'unknown').slice(0,80)};s.mappingId=null;s.nodeId=null;s.panel='comparison';s.view='overview';}
 else if(same&&input.notice?.oldRef)s.notice={oldRef:String(input.notice.oldRef).slice(0,160),oldRevision:String(input.notice.oldRevision||'unknown').slice(0,80)};
 return s;
}
export function selectionFor(s,locale='en-AU') {
 const c=branchComparison(s.sceneId,locale),mapping=c?.mappings.find(m=>m.mapping_id===s.mappingId);
 return {mapping: mapping||null,current:[...(mapping?.before_node_refs||[])],target:[...(mapping?.after_node_refs||[])]};
}
export function readerAction(sceneId,input,action,value) {
 let s=readerState(sceneId,input||{});if(!s)return null;
 const c=branchComparison(sceneId);
 if(action==='compare'){s.panel='comparison';s.branchChoice=null;}
 if(action==='mode'&&['current','target','compare'].includes(value))s.mode=value;
 if(action==='mapping'){s.mappingId=value;s.nodeId=null;s.notice=null;}
 if(action==='node'){
  s.nodeId=value;s.notice=null;
  const groups=c.mappings.filter(m=>[...m.before_node_refs,...m.after_node_refs].includes(value));
  if(!groups.some(m=>m.mapping_id===s.mappingId))s.mappingId=groups.length===1?groups[0].mapping_id:null;
 }
 if(action==='references'){s.returnPanel=s.panel==='scenario'?'scenario':'comparison';s.panel='references';}
 if(action==='index'){s.returnPanel=s.panel==='scenario'?'scenario':'comparison';s.panel='branches';}
 if(action==='back'){s.panel=['references','branches'].includes(s.panel)?s.returnPanel:'scenario';s.branchChoice=null;}
 if(action==='filter')s.filter=String(value||'');
 if(action==='clear')s.filter='';
 if(action==='view'&&['overview','read','focus'].includes(value))s.view=value;
 if(action==='reset'){s.view='read';s.filter='';s.nodeId=null;s.mappingId=c.defaultMappingId;s.notice=null;}
 if(action==='branch')s.branchChoice=value;
 if(action==='prev'||action==='next'){
  const list=c.mappings.filter(m=>!s.filter||m.primary_change_type===s.filter),index=list.findIndex(m=>m.mapping_id===s.mappingId);
  if(list.length){s.mappingId=list[(index+(action==='next'?1:-1)+list.length)%list.length].mapping_id;s.nodeId=null;s.notice=null;}
 }
 return readerState(sceneId,s);
}

// Explicit authored route lookup. Inputs are host projection IDs only; no Case is copied.
export function targetFor({sceneId,nodeId=null,mappingId=null,role='ROLE-KYCOPS',trigger='new-relationship',configured=false,itemIds=[],selectedItemId=null,authorityItemId=null,activeSpecialist=false,availableWorkspace=false}={}) {
 const no=reason=>({included:false,reason}),c=branchComparison(sceneId);
 if(!c)return no('scene_not_included');
 if(configured&&availableWorkspace&&['ROLE-RM','ROLE-CLIENT'].includes(role))return {included:true,step:'collaboration',preserveContext:true};
 if(nodeId&&!c.nodes.some(n=>n.node_id===nodeId))return no('node_not_included');
 if(role!=='ROLE-KYCOPS')return no('operational_role_not_configured');
 if(trigger!=='new-relationship')return no('trigger_not_configured');
 if(activeSpecialist)return no('specialist_session_active');
 const group=c.mappings.find(m=>m.mapping_id===mappingId)||c.mappings.find(m=>m.after_node_refs.includes(nodeId));
 const targetScene=group?.scene_refs.includes('SCN-VALIDATE')?'SCN-VALIDATE':group?.scene_refs.includes('SCN-SOURCE')?'SCN-SOURCE':sceneId;
 if(targetScene==='SCN-SOURCE')return no('candidate_claim_editor_not_included');
 const tab=targetScene==='SCN-REQUIREMENTS'?'requirements':targetScene==='SCN-VALIDATE'?'evidence':'requests';
 if(!configured)return {included:true,step:'collaboration',tab,itemId:null,contextReady:false,reason:'collaboration_not_configured'};
 if(!authorityItemId||!itemIds.includes(authorityItemId))return no('authority_item_unavailable');
 const itemId=tab==='evidence'?authorityItemId:itemIds.includes(selectedItemId)?selectedItemId:authorityItemId;
 return {included:true,step:'collaboration',tab,itemId,contextReady:true,reason:null};
}
