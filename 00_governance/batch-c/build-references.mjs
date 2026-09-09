import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dir=new URL('../../prototype/references/',import.meta.url);mkdirSync(dir,{recursive:true});
const read=name=>readFileSync('/Users/christinaliu/Downloads/'+name,'utf8');
const session=read('Clear_to_Trade_Session_Research_Kimi_PPT_Brief_v1.0.md');
const visual=read('Clear_to_Trade_Public_Product_Visual_Links_v1.0.md');
const final=read('Clear_to_Trade_D2_Batch_C_Screening_Review_and_EDD_Final_v1.0.md');
const registry={version:'1.0',sources:[],observations:[],interpretations:[],bindings:[],aliases:[],assets:[],notes:['Inherited user-supplied research, not newly verified bank policy.','No media acquired; no restricted project-source body or download included.']};
const field=(body,label)=>body.match(new RegExp('^- '+label+'[^：:]*[：:]\\s*(.*)$','m'))?.[1]?.trim()??null;
const kind=id=>[16,17,18,19,20,21,22].includes(id)?'cross_industry_pattern':[24,25,32,33,34,35,36].includes(id)?'technical_design_reference':'industry_reference';
const scenes=id=>id<=10?['SCN-GAP','SCN-VALIDATE']:id<=12?['SCN-REQUIREMENTS']:id<=14?['SCN-ENTITY']:id===15?['SCN-SCOPE']:id<=20?['SCN-MATCH','SCN-READINESS']:id<=22?['SCN-QA']:id<=26?['SCN-GAP','SCN-VALIDATE']:id===27||id===28?['SCN-EDD']:id===29?['SCN-CREDIT']:id<=31?['SCN-POPULATION','SCN-MATCH']:[];
const english=[
 'Entity onboarding, information and document submission; representative access is arranged through the RM. Multiple representatives do not imply simultaneous editing.',
 'A reference number and OTP to registered contact details support specified Australian business KYC updates, with save/resume and contact visibility limits.',
 'SmartServe describes different existing/new-user entry paths and organisation-related communication access; per-item isolation is not established.',
 'Singapore SmartServe is described as available on desktop and mobile. Detailed Bermuda authentication settings cannot be transferred.',
 'The 2019 APAC institutional release describes prefill, electronic exchange and signatures. Historical claims are not this project’s benefit estimates.',
 'An official onboarding video entry exists; its actual frames and timestamps have not been verified.',
 'The 2025 commercial banking release describes relationship views and onboarding/servicing improvements. It is distinct from the 2019 institutional release.',
 'A commercial banking platform video description mentions several product areas. Generic Cash/Trade screens are not KYC review evidence.',
 'A narrow identity-verification task may start from email/text without a separate traditional login. This does not remove identity checks or grant case access.',
 'Registered, eligible Hong Kong Premier customers have bounded RM communication channels. This is not Australian institutional KYC document collection.',
 'Standard KYC information exchange retains data-owner access control. Eligibility, connection and case-specific assessment are separate.',
 'Correspondent-banking questionnaires and guidance provide baseline patterns, not a ready-made corporate customer checklist.',
 'Legal entity identity and accounting-consolidation parent relationships are distinct; parent data does not establish all natural-person beneficial owners.',
 'vLEI provides patterns for verifiable organisational roles. It does not grant this bank’s signing or trading authority.',
 'ISDA event/state/rule expression is a modelling reference, not adoption of CDM or an official KYC schema.',
 'A-CDM milestones can inform downstream updates. Aviation notification mechanisms are not bank approval or SLA rules.',
 'ONE Record is a shared-data/access pattern in cargo; its model tools are not bank products.',
 'GS1 traceability distinguishes events and key data elements; banking fields remain this project’s interpretation.',
 'NIST digital-thread work informs version and change traceability; manufacturing rules are not transferred.',
 'FHIR R4 Provenance is a version-specific target/agent/source pattern, not implementation of a healthcare standard.',
 'ICH Q9(R1) discusses risk decisions, subjectivity and quality risk-management methods in pharmaceuticals; banking QA mapping is not established.',
 'ICH Q10 provides a pharmaceutical quality-system framework. Its summary does not prove a specific bank remediation process.',
 'The 2023 SEC release concerns retention and supervision of business electronic communications by US broker-dealers; it is not a global WhatsApp ban.',
 'NIST distinguishes email confirmation from authentication; its out-of-band method does not accept email. A link and OTP to the same mailbox do not automatically constitute MFA.',
 'Upload security guidance informs intake separation; receipt is not evidence sufficiency.',
 'AUSTRAC guidance distinguishes customer identity, representative identity and authority, beneficial owners and relationship purpose; specific obligations require contextual validation.',
 'Source-of-funds/wealth guidance is a distinct due-diligence topic, not a universal document requirement derived from empty fields.',
 'Enhanced due diligence depends on defined circumstances and targeted measures, not every screening alert.',
 'Counterparty credit-risk guidance supports treating Credit separately from KYC; local implementation and bank adoption are not established.',
 'The Australian consolidated-list page is a dynamic source reference, not every applicable list or synthetic identity evidence.',
 'Earlier research described contextual review of screening alerts. The 2019 PDF has not been reopened in this research round.',
 'Apple material guidance separates navigation/control from readable content; HTML blur is not native Liquid Glass optical refraction.',
 'Modal guidance calls for keyboard focus management and restoration; our implementation must still be tested.',
 'Hover/focus content must remain accessible and dismissible where applicable; critical blockers stay visible.',
 'Dragging guidance supports non-drag alternatives such as stage and previous/next controls.',
 'Australian spelling guidance supports consistent language; locale switching cannot change business policy or jurisdiction.'
];
function add({doc,id,title,url,version=null,dateScope=null,status,observation,adopt,avoid,sourceKind,sceneRefs,nodeRefs=[],englishObservation}){
 const existing=registry.sources.find(s=>s.canonical_url===url&&s.source_version===version);
 const source=existing??{source_id:'REFSRC-'+createHash('sha256').update(url+'|'+version).digest('hex').slice(0,12),title,publisher:title.split(/ — | – /)[0],source_kind:sourceKind,canonical_url:url,source_version:version,publication_date:dateScope?.match(/\d{4}-\d{2}-\d{2}/)?.[0]??null,date_precision:dateScope?.match(/\d{4}-\d{2}-\d{2}/)?'day':'not_specified',region_scope:dateScope??'Not specified in source record',customer_segment:dateScope??'Not specified',source_language:'en'};
 if(!existing)registry.sources.push(source);
 const qualified=doc+':'+id,obs={observation_id:qualified,source_ref:source.source_id,supported_statement:observation,supported_statement_en:englishObservation??observation,locator:{source_document:doc,section:id},verification_status:status,verified_at:null,verification_origin:'inherited_research',verification_evidence_ref:doc+'#'+id};registry.observations.push(obs);
 registry.aliases.push({source_document:doc,source_document_version:'1.0',local_ref_id:id,canonical_source_ref:source.source_id,relationship_type:existing?'same_url_and_version':'source_record'});
 registry.interpretations.push({interpretation_id:qualified+':design',supporting_observation_refs:[qualified],why_it_matters:'A bounded pattern for '+(sceneRefs.join(', ')||'Studio interaction'),adopt,adapt:'Project-specific objects, permissions and tests; bank applicability remains to be validated.',avoid:avoid??adopt,author:'Clear to Trade project',validation_status:'design_interpretation_not_bank_policy'});
 registry.bindings.push({binding_id:qualified+':binding',source_ref:source.source_id,observation_ref:qualified,interpretation_ref:qualified+':design',scenario_refs:sceneRefs,semantic_node_refs:nodeRefs,field_refs:[],support_kind:sourceKind==='cross_industry_pattern'?'transferable_pattern':'design_interpretation',binding_rationale:'Source observation informs design, not executable bank authority.'});
}
for(const match of session.matchAll(/^### (R\d{2}) — (.+)\n([\s\S]*?)(?=^### |^## |$(?![\s\S]))/gm)){
 const[,id,title,body]=match,n=Number(id.slice(1));
 add({doc:'SRC-017',id,title,url:field(body,'官方链接'),version:n===20?'R4':n===31?'2019':null,dateScope:field(body,'日期'),status:field(body,'本轮核验状态'),observation:field(body,'观察'),adopt:field(body,'采用'),sourceKind:kind(n),sceneRefs:scenes(n),englishObservation:english[n-1]});
}
const core=final.split('### 21.4')[1].split('### 21.5')[0];
for(const line of core.split('\n').filter(x=>/^\| R-C\d/.test(x))){
 const c=line.split('|').slice(1,-1).map(x=>x.trim()),link=c[1].match(/\[(.+)\]\((.+)\)/),id=c[0];
 const nodes=c[4].match(/[PME]\d{2}/g)??[];
 add({doc:'SRC-016',id,title:link[1],url:link[2],version:id==='R-C05'?'R5':null,status:'Inherited limited research statement; Final performed no new website verification.',observation:c[2],adopt:c[3].split('Adapt：')[0].replace('Adopt：',''),avoid:c[3].split('Avoid：')[1],sourceKind:id==='R-C05'?'cross_industry_pattern':'industry_reference',sceneRefs:[...new Set(nodes.map(n=>n[0]==='P'?'SCN-POPULATION':n[0]==='M'?'SCN-MATCH':'SCN-EDD'))],nodeRefs:nodes,englishObservation:{'R-C01':'Screening alerts need context, relevant information and retained review rationale; guidance is not bank configuration.','R-C02':'List records may contain aliases, multiple identity attributes, varying precision and unknowns.','R-C03':'Guidance describes defined EDD circumstances and targeted enhanced work.','R-C04':'PEP status is distinct from sanctions or adverse media and does not itself imply unlawful activity.','R-C05':'FHIR R5 Provenance relates a target to an activity, agent and source entities.'}[id]});
}
for(const m of visual.matchAll(/^## (V\d{2}) — (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)){
 const[,id,title,body]=m,url=field(body,'Official page'),source=registry.sources.find(s=>s.canonical_url===url);
 registry.assets.push({asset_id:'SRC-018:'+id,source_ref:source?.source_id??null,title,asset_kind:field(body,'Type'),public_url:field(body,'Asset / entry'),local_path:null,capture_status:'not_captured',inherited_status:field(body,'Status'),captured_at:null,page_or_timestamp:null,version:'1.0',caption_locales:{'zh-CN':title,'en-AU':'Pending source asset '+id,'en-US':'Pending source asset '+id},alt_text_locales:{},display_permission_status:'not_established'});
}
if(registry.aliases.length!==41||registry.assets.length!==19||registry.observations.some(x=>!x.supported_statement))throw Error('Incomplete import');
writeFileSync(new URL('registry.json',dir),JSON.stringify(registry,null,2)+'\n');
writeFileSync(new URL('registry.mjs',dir),'// Generated by build-references.mjs; inherited research, no network verification.\nexport default '+JSON.stringify(registry,null,2)+';\n');
console.log(JSON.stringify({sources:registry.sources.length,aliases:registry.aliases.length,observations:registry.observations.length,assets:registry.assets.length}));
