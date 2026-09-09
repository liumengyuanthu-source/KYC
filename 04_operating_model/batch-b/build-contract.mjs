/** Generates reviewable synthetic contract evidence; not a production schema inference tool. */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {COLLAB_IDS as I,createBatchB,collaborationAction} from '../../prototype/collaboration-engine.mjs';
const here=new URL('./',import.meta.url),read=p=>JSON.parse(readFileSync(new URL(p,here)));
const output=(name,value)=>writeFileSync(new URL(name,here),JSON.stringify(value,null,2)+'\n');
mkdirSync(here,{recursive:true});
const input=read('../round-a/batch-a-story-snapshots.json').snapshots['SNAP-A3'];
let s=createBatchB(input);const snapshots={'B-entry':structuredClone(s)},actions=[];
function act(type,extra={}){
 const request=s.informationRequests.find(x=>x.id===I.request),item=s.requestItems.find(x=>x.id===(extra.itemId||I.authorityItem));
 const action={type,role:'ROLE-KYCOPS',expectedRevision:s.case.revision,expectedRequestRevision:request.revision,expectedItemRevision:item.revision,itemId:item.id,key:'B-REPLAY:'+type+':'+s.case.revision,now:'2026-09-07T10:00:00Z',rationale:'Synthetic coordination basis for Entity A only.',...extra};
 s=collaborationAction(s,action);actions.push(action);return s;
}
act('save_request',{text:'Please provide the two separately assigned synthetic responses.'});
act('review_request');act('dispatch',{channel:'official_site_reference'});
snapshots['B-request-reviewed-dispatched']=structuredClone(s);
act('record_note',{role:'ROLE-RM',text:'Reviewed synthetic contact discussion; Person T will respond only to the assigned item.',channel:'phone'});
act('start_session',{role:'ROLE-CLIENT',userId:I.personT,sessionId:'SESSION-CONTRACT-T',reference:s.demoConfig.batchB.reference});
act('save_response',{role:'ROLE-CLIENT',userId:I.personT,sessionId:'SESSION-CONTRACT-T',text:'Synthetic authority for Person T to coordinate information for Entity A only.'});
act('submit_response',{role:'ROLE-CLIENT',userId:I.personT,sessionId:'SESSION-CONTRACT-T',text:'Synthetic authority for Person T to coordinate information for Entity A only.'});
snapshots['B-one-item-submitted']=structuredClone(s);
const artifact=s.evidence.at(-1).id;
act('release_artifact',{reference:artifact,intakeStatus:'released'});act('link_evidence',{reference:artifact});act('record_assessment',{reference:artifact});
snapshots['B-coordination-assessed']=structuredClone(s);
output('collaboration-snapshots.json',{source_ref:'SRC-015',implementation_fidelity:'local_simulation',snapshots,actions});
const additions={requestItems:'RequestItem',businessContacts:'BusinessContact',interactionRecords:'InteractionRecord',requestRecipients:'RequestRecipient',requestAccessDecisions:'RequestAccessDecision',notifications:'Notification',portalInvitations:'PortalInvitation',accessGrants:'AccessGrant',submissions:'Submission',channelPolicies:'ChannelPolicy',contributorSessions:'ContributorSession'};
const reused={informationRequests:'InformationRequest',requirements:'Requirement',evidence:'EvidenceArtifact (existing Evidence)',evidenceUseAssessments:'EvidenceUseAssessment',workItems:'WorkItem',auditEvents:'AuditEvent'};
const minimum={requestItems:['request_id','requirement_id','purpose_code','response_status'],businessContacts:['person_ref','principal_entity_ref','contact_routes','contact_review_ref'],interactionRecords:['channel','participants','summary','reviewed_by'],requestRecipients:['request_id','person_ref','permitted_item_refs','contact_review_ref'],requestAccessDecisions:['recipient_ref','item_refs','basis_refs','reviewer_permission_ref','status'],notifications:['request_revision','recipient_ref','channel','dispatch_status','delivery_status','adapter_event_ref'],portalInvitations:['recipient_ref','request_scope','auth_policy_ref','expires_at','revoked_at','activated_at'],accessGrants:['user_ref','resource_scope','permitted_actions','provisioning_basis_ref','status','expires_at'],submissions:['request_item_refs','submitted_by','on_behalf_of','staff_uploader_ref','source_channel','submitted_at','artifact_refs'],channelPolicies:['region_context','channel','allowed_purposes','disclosure_classes','capture_method','approval_status','simulation_adapter_ref'],contributorSessions:['user_ref','status','scope_revision','production_authentication_validated']};
const collections=Object.fromEntries(Object.entries(additions).map(([collection,logical_object])=>[collection,{logical_object,reuses_existing:false,required:['id','case_id','revision',...minimum[collection]]}]));
output('collaboration-contract.json',{version:'v0.1',status:'prototype_field_contract_not_production_schema',source_ref:'SRC-015',collections,reused_collections:reused,limitations:'Logical extension contract only. Existing Batch A schema remains unchanged; this does not certify the combined case against a production or whole-case JSON Schema.'});
const fields=[];
for(const [collection,logical] of Object.entries({...additions,...reused})){
 const records=Object.values(snapshots).flatMap(x=>x[collection]).filter(x=>x.source_refs?.includes('SRC-015'));
 for(const field of [...new Set(records.flatMap(Object.keys))].sort()){
  const values=records.filter(x=>Object.hasOwn(x,field)).map(x=>x[field]),types=[...new Set(values.map(v=>v===null?'null':Array.isArray(v)?'array':Number.isInteger(v)?'integer':typeof v))];
  const required=collections[collection]?.required.includes(field)||['id','case_id','revision'].includes(field);
  const clientSafe=['alias','purpose_code','client_reason','response_status','response_draft','response_text','submitted_at','intake_security_status'].includes(field);
  fields.push({object:logical,collection,field,type:types.join('|'),nullable:types.includes('null'),required_when:required?'Every record in this scoped contract':'When the corresponding lifecycle action creates this field; not inferred as globally mandatory',editable_by:collection==='submissions'?'Contributing CLIENT or explicitly attributed staff; engine creates record':field==='response_draft'?'Granted CLIENT only':collection==='interactionRecords'?'RM / authorised demo actor':'KYC Ops via named demo action; engine-owned identifiers and audit metadata',validation:field==='revision'?'Positive integer; case/request/item CAS and stored evidence revision checks':field.endsWith('_refs')||field.endsWith('_ref')||field.endsWith('_id')?'Case-linked reference or explicit demo config reference; no production identity implied':field.includes('text')||field.includes('summary')||field==='response_draft'?'Nonempty on save/submit, max 2000; output escaped':field.includes('status')?'Action-defined state only; independent approval/dispatch/intake/sufficiency':'Observed fixture type; business validation remains open',revision:'Object revision increments on mutation; assessments record basis versions',sensitivity:clientSafe?'Client-safe only within current grant projection':'Internal synthetic; not directly sent to client projection',provenance:'SRC-015 approved demo direction; synthetic fixture, not bank fact',ui_binding:collection==='interactionRecords'?'RM / Client requests':clientSafe?'Client / Your tasks or own receipt':collection==='evidence'||collection==='evidenceUseAssessments'?'Ops / Evidence':collection==='businessContacts'?'Ops / Contacts':'Ops / Requests or Activity',type_basis:'Observed approved slice; null-only fields require later production type confirmation'});
 }
}
output('field-dictionary.json',fields);
const crosswalk=read('../round-a/batch-a-dependency-crosswalk.json');
output('dependency-crosswalk.json',crosswalk.map(r=>({...r,batch_b_effect:['SRC-010:DEP-05','SRC-010:DEP-14','SRC-010:DEP-12'].includes(r.canonical_dependency_id)?'Extends request / purpose assessment / not-ready semantics; SRC-015 adds no new numbered DEP':'Retained interface; no new approval or policy'})));
const sourcePath='/Users/christinaliu/Downloads/Clear_to_Trade_D2_Batch_B_Client_Collaboration_Approved_Addendum_v1.0.md';
output('source-manifest.json',{sources:[{source_id:'SRC-015',path:sourcePath,sha256:createHash('sha256').update(readFileSync(sourcePath)).digest('hex'),status:'USER_APPROVED_DEMO_DIRECTION',bank_policy_status:'unconfirmed'}],missing:[{name:'Clear_to_Trade_D2_Batch_B_Product_Demo_and_Client_Channels_Research_v0.1.md',status:'not_received',blocking:false}],media:{video:'not_received_static_fallback',real_email:'disabled_not_run',real_authentication:'not_run'}});
console.log(JSON.stringify({snapshots:Object.keys(snapshots),fields:fields.length,collections:Object.keys(collections).length,case_revision:s.case.revision}));
