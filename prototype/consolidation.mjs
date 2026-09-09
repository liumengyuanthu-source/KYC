// Batch F is a read-only index over A–E. It owns no business state or commands.
import {byId,pair} from './content.mjs';
import {eBeats} from './clearance-ui.mjs';
import {specialistStoryContract} from './specialist-story.mjs';
import {route,specialistBeatAt,clearanceBeatAt} from './navigation.mjs';
import {clearanceProjection} from './clearance-engine.mjs';
export const F_SOURCE='SRC-021';
export const domains=[
 ['Case & Scope',{Case:'case',CaseScope:'scopes'}],
 ['Party & Authority',{LegalEntity:'entities',Person:'naturalPersons',Representative:'representatives',AuthorityRecord:'authorities'}],
 ['Requirement',{RequirementSet:'requirements (scope + revision grouping)',Requirement:'requirements',Gap:'requestItems / qaFindings (distinct purpose and quality gaps)'}],
 ['Evidence',{EvidenceArtifact:'evidence',EvidenceClaim:'evidence[].claims (embedded)',EvidenceUseAssessment:'evidenceUseAssessments'}],
 ['Work',{WorkItem:'workItems',InformationRequest:'informationRequests',Remediation:'workItems (QA remediation subtype)',Hold:'holds'}],
 ['Decision & Specialist',{Decision:'decisions / screeningReviewDecisions (typed)',ScreeningFinding:'screeningFindings',ConflictReview:'conflictReviews',CreditCondition:'creditConditions',LegalAgreement:'legalAgreements'}],
 ['Dependency',{DependencyEdge:'dependencies',ProfessionalCondition:'clearanceConditions'}],
 ['Clearance',{ClearancePrerequisite:'clearancePrerequisites (evaluated snapshots)',ReadinessSnapshot:'readinessSnapshots',ClearanceDecision:'clearanceDecisions',PublicationEvent:'publicationEvents'}]
].map(([domain,objects])=>({domain,objects,source_refs:['SRC-009','SRC-010','SRC-013','SRC-015','SRC-016','SRC-019','SRC-020','SRC-021'],validation_status:'approved_demo_design_not_bank_validation'}));
export const stateDictionary=[
 {domain:'applicability',values:['required','not_required','unknown','review_required'],note:'unknown and review_required never mean not_required'},
 {domain:'work',values:['not_started','in_progress','waiting','completed','superseded'],legacy:{ready:'not_started',draft:'in_progress',awaiting_input:'waiting',awaiting_response:'waiting',awaiting_human:'waiting',awaiting_review:'waiting',paused:'waiting',referred:'waiting'},note:'Completed work never implies evidence sufficiency or condition satisfaction'},
 {domain:'condition',values:['open','review_required','satisfied','blocked','unknown'],legacy:{pending:'open',not_required:'separate applicability decision; preserve raw status'},note:'Do not convert not_required into satisfied or approved'},
 {domain:'evidence_use',values:['not_assessed','sufficient','insufficient','unknown'],note:'Purpose, subject, claim and version are required; receipt is a separate field'},
 {domain:'request_response',values:['open','draft','submitted','under_review','needs_more_information','closed'],note:'Submission is not sufficient evidence'},
 {domain:'request_review',values:['draft','pending_review','approved','superseded'],note:'Approved request is not sent'},
 {domain:'dispatch',values:['not_requested','queued','sent','failed'],note:'Delivery observed separately; sent is not read'},
 {domain:'legal_review_approval_execution',values:['review_status','approval_status','execution_status'],note:'Independent fields remain intact; internal approval is not executed agreement'},
 {domain:'QA',values:['not_final','gap_open','re_review_required','passed','signed_off'],note:'Signoff alone is not readiness'},
 {domain:'clearance',values:['NOT_READY','READY_FOR_AUTHORISED_CONFIRMATION','CLEARED_TO_TRADE'],legacy:{not_ready:'legacy non-E not ready',candidate_ready:'legacy candidate only; cannot infer E readiness'},note:'Only E evaluates current readiness; unavailable is null, not factual Not ready'},
 {domain:'publication',values:['not_requested','succeeded','failed'],note:'Separate current_applicability; historical succeeded is not current after invalidation. No trade is executed'}
];
const steps={'SCN-SCOPE':'scope','SCN-ENTITY':'entity','SCN-REQUIREMENTS':'requirements','SCN-SOURCE':'evidence','SCN-GAP':'collaboration','SCN-VALIDATE':'collaboration','SCN-POPULATION':'population','SCN-MATCH':'screening','SCN-EDD':'edd','SCN-CONFLICTS':'condition','SCN-CREDIT':'condition','SCN-LEGAL':'condition','SCN-READINESS':'clearance','SCN-QA':'qa-remediation','SCN-PUBLISH':'clearance'};
const dependenciesByScene={'SCN-SCOPE':['SRC-010:DEP-03'],'SCN-ENTITY':['SRC-010:DEP-02'],'SCN-REQUIREMENTS':['SRC-010:DEP-03','SRC-010:DEP-04'],'SCN-SOURCE':['SRC-010:DEP-04','SRC-010:DEP-05'],'SCN-GAP':['SRC-010:DEP-05'],'SCN-VALIDATE':['SRC-010:DEP-05','SRC-010:DEP-14'],'SCN-POPULATION':['SRC-010:DEP-06'],'SCN-MATCH':['SRC-010:DEP-07'],'SCN-EDD':['SRC-010:DEP-08'],'SCN-CONFLICTS':['SRC-010:DEP-01'],'SCN-CREDIT':['SRC-010:DEP-10','SRC-009:DEP-07'],'SCN-LEGAL':['SRC-010:DEP-09','SRC-009:DEP-07'],'SCN-QA':['SRC-009:DEP-09','SRC-009:DEP-10','SRC-010:DEP-11'],'SCN-READINESS':['SRC-010:DEP-12'],'SCN-PUBLISH':['SRC-010:DEP-13']};
export function masterStory(){return route.map((scene_id,i)=>{
 const e=clearanceBeatAt(i),d=specialistBeatAt(i),b=eBeats.find(x=>x[0]===e),base=byId(scene_id),dc=d?specialistStoryContract(d):null,scene=b?{...base,title:pair(b[2],b[3]),current:pair(b[6],b[7]),target:pair(b[4],b[5]),wait:pair('Current scope and assembled case records','当前范围与汇集案件记录'),output:pair(b[8],b[9]),human:pair('Explicit configured human review; bank authority remains to validate','已配置的明确人工复核；银行权限仍待验证'),source:'SRC-020'}:dc?{...base,title:pair(...dc.title),current:pair(...dc.current),target:pair(...dc.work),wait:pair(...dc.wait),output:pair(...dc.output),source:'SRC-019'}:base,beat_id=e||d||`STORY-${i+1}`,nextBeat=clearanceBeatAt(i+1)||specialistBeatAt(i+1)||(i+1<route.length?`STORY-${i+2}`:null);
 return {beat_id,scene_id,case_id:'DEMO-CTT-001',stage:scene.stage,process_refs:[scene.process],title:scene.title,trigger:'new-relationship',primary_roles:scene_id==='SCN-QA'?['ROLE-QA','ROLE-KYCOPS']:scene_id==='SCN-PUBLISH'?['ROLE-CASEMGR']:['ROLE-KYCOPS','ROLE-CASEMGR'],goal:scene.title,current_work:scene.current,target_work:scene.target,inputs:[scene.wait],outputs:[scene.output],decision_refs:[scene.human],wait_refs:[scene.wait],dependency_refs:dependenciesByScene[scene_id],state_change_refs:[scene.output],next_scene_id:route[i+1]||null,next_beat_ref:nextBeat,prototype_entry_ref:{scene:scene_id,step:d?'condition':steps[scene_id],beat:e||d||null,action:'PRODUCT',loads_snapshot:false},return_ref:{action:'RETURN',destination:'scenario',scene:scene_id,storyCursor:i,latest_locale:true},reference_refs:[scene.source||'SRC-007',e?'SRC-020':d?'SRC-019':'SRC-010'],evidence_status:'approved_demo_design; synthetic_case; bank_validation_required',reading_writes:false,snapshot_boundary:e?'Explicit reviewed D → E continuation archives current session':d?'Explicit reviewed D entry archives previous session':'Existing explicit same-case entry; reading never loads business outcomes'};
 });}
const latest=rows=>{const m=new Map();for(const r of rows||[]){const old=m.get(r.id);if(!old||(r.revision??0)>=(old.revision??0))m.set(r.id,r);}return [...m.values()];};
const objectMap=s=>new Map(latest(Object.entries(s||{}).filter(([k,v])=>Array.isArray(v)&&!['conditionHistory','auditEvents','storyRoutes'].includes(k)).flatMap(([,v])=>v).filter(x=>x?.id)).map(x=>[x.id,x]));
export function dependencyProjection(s,{changedRefs=[],candidateRefs=[]}={}){
 const objects=objectMap(s),scope=s?.scopes?.[0],edges=latest(s?.dependencies),holds=latest(s?.holds).filter(h=>h.status!=='released'&&h.status!=='superseded');
 const result={affected:[],unaffected:[],unknown:[],edges:structuredClone(edges),holds:structuredClone(holds),stateWrites:false};
 const contextValid=!!s?.case?.id&&!!scope?.id&&scope.case_id===s.case.id&&Number.isSafeInteger(scope.revision)&&scope.revision>0;
 const scoped=x=>contextValid&&x?.case_id===s.case.id&&x?.case_scope_id===scope.id&&(!Object.hasOwn(x,'case_scope_ref')||x.case_scope_ref===scope.id)&&x.scope_revision===scope.revision;
 const current=e=>scoped(e)&&scoped(objects.get(e.from_object_ref))&&scoped(objects.get(e.to_object_ref))
  &&(!Object.hasOwn(e,'from_ref')||e.from_ref===e.from_object_ref)&&(!Object.hasOwn(e,'to_ref')||e.to_ref===e.to_object_ref)
  &&['task','branch','case'].includes(e.impact_scope)&&['satisfied','pending','not_applicable'].includes(e.status)&&Number.isSafeInteger(e.from_revision)&&Number.isSafeInteger(e.to_revision)&&objects.get(e.from_object_ref)?.revision===e.from_revision&&objects.get(e.to_object_ref)?.revision===e.to_revision&&!!e.dependency_condition&&e.validation_status==='reviewed_for_demo';
 const reach=new Set(changedRefs),uncertain=new Set();
 for(let i=0;i<=edges.length;i++){let grew=false;for(const e of edges){if(!reach.has(e.from_object_ref)&&!uncertain.has(e.from_object_ref))continue;if(e.dependency_type==='independence'&&current(e))continue;const set=current(e)&&!uncertain.has(e.from_object_ref)?reach:uncertain;if(!set.has(e.to_object_ref)){set.add(e.to_object_ref);grew=true;}}if(!grew)break;}
 for(const ref of [...new Set(candidateRefs)]){
  const holdImpact=h=>{
   if(!scoped(h)||!['active','inactive'].includes(h.status)||!['task','branch','case'].includes(h.hold_scope))return 'unknown';
   if(h.status==='inactive')return 'unaffected';
   if(h.hold_scope==='case')return 'affected';
   const refs=[...new Set([h.target_object_ref,...(Array.isArray(h.object_scope_refs)?h.object_scope_refs:[])].filter(Boolean))];
   if(!refs.length||refs.some(target=>!scoped(objects.get(target))))return 'unknown';
   return refs.includes(ref)?'affected':'unaffected';
  };
  const impacts=holds.map(holdImpact),unknownHold=impacts.includes('unknown');
  const independent=changedRefs.length>0&&changedRefs.every(from=>edges.some(e=>e.from_object_ref===from&&e.to_object_ref===ref&&e.dependency_type==='independence'&&e.status==='not_applicable'&&current(e)));
  const kind=!contextValid||!changedRefs.length||!scoped(objects.get(ref))||unknownHold||uncertain.has(ref)?'unknown':impacts.includes('affected')||reach.has(ref)?'affected':independent?'unaffected':'unknown';result[kind].push(ref);
 }
 return result;
}
export function consolidatedProjection(s,{role='ROLE-QA',lens='outcome'}={}){
 const p=clearanceProjection(s,{role}),available=!!p.available,internal=available&&!['ROLE-RM','ROLE-CLIENT'].includes(role);
 return {caseId:p.caseId,revision:p.revision,scopeRevision:p.scopeRevision,available,readinessState:available?p.readiness.readiness_state:null,publicationStatus:available?(p.publication?.current_applicability===false&&p.publication?.status!=='not_requested'?'historical_not_current':p.publication?.status||'not_requested'):null,tradeExecution:'NOT_PART_OF_PROTOTYPE',conditions:structuredClone(p.conditions||[]),dependencies:internal?structuredClone(latest(s.dependencies)):[],holds:internal?structuredClone(latest(s.holds)):[],lens:['outcome','work','assurance'].includes(lens)?lens:'outcome',readOnly:true,stateWrites:false,sourceStatus:'synthetic_runtime_not_bank_policy'};
}
export function referenceIndex(cards){
 const index=new Map();for(const c of cards){const s=c.source,url=s.canonical_url||null,key=JSON.stringify([url||s.source_id,s.source_version||null,s.region_scope||null,s.customer_segment||null]);let row=index.get(key);
  if(!row){row={reference_id:s.source_id,title:s.title,type:({project_source:'client_source',industry_reference:'industry_benchmark',cross_industry_pattern:'cross_industry_benchmark',technical_design_reference:'design_interpretation',design_interpretation:'design_interpretation'})[s.source_kind]||'design_interpretation',official_source_url:url,source_version:s.source_version||null,context:{region:s.region_scope||null,segment:s.customer_segment||null},source_status:c.observation.verification_status,source_aliases:[],observations:[],mapped_scene_refs:[],mapped_diagram_node_refs:[],mapped_requirement_refs:[],verification:'inherited; link-check receipt is separate'};index.set(key,row);}
  row.source_aliases=[...new Set([...row.source_aliases,s.source_id])];row.observations.push({...structuredClone(c.observation),why_it_matters:c.interpretation?.why_it_matters||null,adopt:c.interpretation?.adopt||null,adapt:c.interpretation?.adapt||null,avoid:c.interpretation?.avoid||null});row.mapped_scene_refs=[...new Set([...row.mapped_scene_refs,...c.binding.scenario_refs])];row.mapped_diagram_node_refs=[...new Set([...row.mapped_diagram_node_refs,...c.binding.semantic_node_refs])];
 }return [...index.values()];
}
