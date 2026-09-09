import {C_IDS} from '../screening-engine.mjs';
import {COLLAB_IDS} from '../collaboration-engine.mjs';
const audienceFor=role=>role==='ROLE-CLIENT'?'client':role==='ROLE-RM'?'rm':'ops';
export function enforceProductRequestRole(context,role){
 if(!context.roleBound&&!['ROLE-RM','ROLE-CLIENT'].includes(role))return context;
 const audience=audienceFor(role),tabs=audience==='client'?['tasks','documents','submitted','help']:audience==='rm'?['requests']:['requirements','requests','evidence','contacts','tasks','activity'];
 return {...context,roleBound:true,audience,tab:tabs.includes(context.tab)?context.tab:audience==='client'?'tasks':'requests'};
}
export function productRequestContext(data,{role,current={}}={}){
 const identity=data.informationRequests?.some(r=>r.id===C_IDS.request),requestId=identity?C_IDS.request:COLLAB_IDS.request;
 // Navigation carries the current principal/session as references. It does not authenticate,
 // grant access, expand a B grant into C, or assume an Ops audience for a safe role.
 return enforceProductRequestRole({...current,roleBound:['ROLE-RM','ROLE-CLIENT'].includes(role),audience:audienceFor(role),tab:role==='ROLE-CLIENT'?'tasks':'requests',userId:current.userId??null,sessionId:current.sessionId??null,requestId,itemId:identity?C_IDS.identityItem:COLLAB_IDS.authorityItem},role);
}
