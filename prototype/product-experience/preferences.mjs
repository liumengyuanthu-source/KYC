export const CORE_MODULES=Object.freeze(['CORE-CONTEXT','CORE-PROGRESS','CORE-WORK','CORE-ACTION']);
export const SCHEMA_VERSION=1;
const internal=['ROLE-KYCOPS','ROLE-REVIEWER','ROLE-FINCRIME','ROLE-CASEMGR','ROLE-QA','ROLE-LEGAL','ROLE-CREDIT','ROLE-CONFLICTS','ROLE-FACILITATOR'];
const definitions=[['OPT-TIMELINE','Activity timeline','完整处理时间线'],['OPT-DEPENDENCIES','Related dependencies','相关依赖图'],['OPT-EVIDENCE','Related evidence','相关资料概览'],['OPT-CONTACTS','Contacts and communications','联系人与沟通历史'],['OPT-ARCHIVE','Recent history','最近查看的历史记录'],['OPT-NOTES','Work notes','工作备注']];
export function moduleCatalogue({role='ROLE-KYCOPS',allowed=true}={}){
 if(!allowed)return [];
 const ids=role==='ROLE-CLIENT'?['OPT-TIMELINE','OPT-ARCHIVE']:role==='ROLE-RM'?['OPT-CONTACTS','OPT-TIMELINE','OPT-ARCHIVE','OPT-NOTES']:internal.includes(role)?definitions.map(x=>x[0]):[];
 return definitions.filter(x=>ids.includes(x[0])).map(([id,en,zh])=>({id,en,zh}));
}
export function preferenceKey({user='demo-operator-1',role='ROLE-KYCOPS',workspace='screening',schema=SCHEMA_VERSION}={}){return `ctt-d5-layout:${encodeURIComponent(user)}:${role}:${workspace}:v${schema}`;}
export function normalisePreference(input={},context={}){
 const allowed=new Set(moduleCatalogue(context).map(x=>x.id)),unique=xs=>[...new Set(Array.isArray(xs)?xs:[])].filter(x=>allowed.has(x));
 const enabled=unique(input.enabled),order=unique(input.order).filter(x=>enabled.includes(x));return {enabled,order:[...order,...enabled.filter(x=>!order.includes(x))],collapsed:unique(input.collapsed).filter(x=>enabled.includes(x))};
}
export function defaultPreference(context={}){
 const ids=context.role==='ROLE-CLIENT'?['OPT-TIMELINE']:context.role==='ROLE-RM'?['OPT-CONTACTS','OPT-TIMELINE']:['ROLE-REVIEWER','ROLE-FINCRIME'].includes(context.role)?['OPT-EVIDENCE','OPT-TIMELINE']:['OPT-TIMELINE','OPT-DEPENDENCIES','OPT-EVIDENCE'];return normalisePreference({enabled:ids,order:ids,collapsed:ids},context);
}
export function changePreference(input,action,id,context={}){
 const s=normalisePreference(input,context);if(!moduleCatalogue(context).some(x=>x.id===id))return s;
 if(action==='add'&&!s.enabled.includes(id)){s.enabled.push(id);s.order.push(id);}if(action==='remove'){s.enabled=s.enabled.filter(x=>x!==id);s.order=s.order.filter(x=>x!==id);s.collapsed=s.collapsed.filter(x=>x!==id);}
 if(action==='collapse')s.collapsed=s.collapsed.includes(id)?s.collapsed.filter(x=>x!==id):[...s.collapsed,id];
 const index=s.order.indexOf(id),next=action==='up'?index-1:action==='down'?index+1:index;if(index>=0&&next>=0&&next<s.order.length)[s.order[index],s.order[next]]=[s.order[next],s.order[index]];
 return s;
}
export function readPreference(storage,context){try{const raw=storage.getItem(preferenceKey(context));return raw?normalisePreference(JSON.parse(raw),context):defaultPreference(context);}catch{return defaultPreference(context);}}
export function savePreference(storage,input,context){const clean=normalisePreference(input,context);storage.setItem(preferenceKey(context),JSON.stringify(clean));return clean;}
// Preview is temporary layout state; Cancel must still find the prior reading position.
export function disclosureReadingState(reading={}, {user,role,id,layoutPreview=false}={}){return layoutPreview&&id?.startsWith('OPT-')?undefined:reading?.[`${user?`${user}:`:''}${role}:${id}`];}
export function clearOptionalReading(reading={},role,user){return Object.fromEntries(Object.entries(reading||{}).filter(([key])=>!key.startsWith(`${user?`${user}:`:''}${role}:OPT-`)));}
