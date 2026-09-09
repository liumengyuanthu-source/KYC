/** Dependency-free checks for exactly the JSON Schema vocabulary used by the draft.
 * This is not a general JSON Schema certification and does not test UI behaviour. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const project=path.resolve(here,'../..');
const read=(p)=>JSON.parse(readFileSync(path.resolve(here,p),'utf8'));
const schema=read('shared-case-spine.schema.json');
const fixture=read('synthetic-case-fixture.json');
const registry=read('../../03_personas_journey/round-a/scenario_registry.json');
const manifest=read('../../00_governance/round-a/source_manifest.json');
const checks=[];
const assert=(ok,label)=>{if(!ok)throw new Error(label);};
const test=(name,fn)=>{try{fn();checks.push({name,status:'PASS'});}catch(e){checks.push({name,status:'FAIL',reason:e.message});}};
const type=(v,t)=>t==='null'?v===null:t==='integer'?Number.isInteger(v):t==='array'?Array.isArray(v):t==='object'?v!==null&&typeof v==='object'&&!Array.isArray(v):typeof v===t;
function validate(value,node,at='$',documentSchema=schema){
 if(node.$ref)return validate(value,documentSchema.$defs[node.$ref.split('/').at(-1)],at,documentSchema);
 if(node.type)assert((Array.isArray(node.type)?node.type:[node.type]).some(t=>type(value,t)),`${at}: expected ${node.type}`);
 if(node.const!==undefined)assert(value===node.const,`${at}: const mismatch`);
 if(node.enum)assert(node.enum.includes(value),`${at}: invalid enum ${value}`);
 if(value===null)return;
 if(node.minimum!==undefined)assert(value>=node.minimum,`${at}: below minimum`);
 if(node.format==='date-time')assert(typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)&&Number.isFinite(Date.parse(value)),`${at}: invalid UTC datetime`);
 if(typeof value==='string')assert(value.trim().length>0,`${at}: empty string must not represent unknown`);
 if(Array.isArray(value)){if(node.minItems)assert(value.length>=node.minItems,`${at}: missing items`);value.forEach((v,i)=>validate(v,node.items,`${at}[${i}]`,documentSchema));}
 else if(typeof value==='object'){
  for(const key of node.required||[])assert(Object.hasOwn(value,key),`${at}.${key}: missing required key`);
  for(const [key,v]of Object.entries(value)){
   if(node.properties?.[key])validate(v,node.properties[key],`${at}.${key}`,documentSchema);
   else if(node.additionalProperties===false)throw new Error(`${at}.${key}: unexpected property`);
   else if(typeof node.additionalProperties==='object')validate(v,node.additionalProperties,`${at}.${key}`,documentSchema);
  }
 }
}
const collectionTypes={case:'Case',scopes:'Scope',entities:'Entity',representatives:'Representative',authorities:'Authority',requirements:'Requirement',evidence:'Evidence',evidenceUseAssessments:'EvidenceUseAssessment',workItems:'WorkItem',dependencies:'Dependency',screeningFindings:'ScreeningFinding',decisions:'Decision',clearanceConditions:'ClearanceCondition',readinessSnapshots:'ReadinessSnapshot',auditEvents:'AuditEvent',storyRoutes:'StoryRoute'};
const records=(data)=>Object.entries(collectionTypes).flatMap(([key,kind])=>(Array.isArray(data[key])?data[key]:[data[key]]).map(record=>({record,kind})));
const sourceIds=new Set([...manifest.sources.map(x=>x.source_id),...readFileSync(path.join(project,'00_governance/source_register.csv'),'utf8').split('\n').slice(1).map(x=>x.split(',')[0])]);
function references(data){
 const all=records(data);const map=new Map(all.map(x=>[x.record.id,x]));
 assert(map.size===all.length,'Duplicate stable record IDs');
 for(const {record:r,kind}of all){
  for(const [key,definition]of Object.entries(schema.$defs[kind].properties)){
   if(!definition['x-reference']||r[key]===null)continue;
   for(const value of Array.isArray(r[key])?r[key]:[r[key]]){
    const target=map.get(value);assert(target,`${r.id}.${key}: unresolved ${value}`);
    assert(definition['x-reference']==='Any'||definition['x-reference']===target.kind,`${r.id}.${key}: wrong target type`);
    assert(target.record.case_id===r.case_id&&target.record.case_scope_id===r.case_scope_id,`${r.id}.${key}: cross-case/scope reference`);
   }
  }
  assert(r.case_id==='DEMO-CTT-001',`${r.id}: case drift`);
  assert(r.source_status==='SYNTHETIC'&&r.simulation_flag===true,`${r.id}: must remain synthetic`);
  assert(r.source_refs.every(x=>sourceIds.has(x)),`${r.id}: unregistered design source`);
  if(r.authority_status==='unknown')assert(r.question_ref&&data.demoConfig.questions[r.question_ref],`${r.id}: missing authority question`);
 }
 return map;
}
function semantics(data,{history=[]}={}){
 const map=references(data);
 for(const a of data.evidenceUseAssessments){
  const e=map.get(a.evidence_id).record,q=map.get(a.requirement_id).record;
  assert(a.subject_id===e.subject_id&&a.subject_id===q.subject_id,`${a.id}: subject mismatch`);
  assert(a.purpose_code===q.purpose_code,`${a.id}: purpose mismatch`);
  assert(a.evidence_revision===e.evidence_revision,`${a.id}: stale evidence version`);
  if(a.sufficiency!=='sufficient')assert(a.reason_code,`${a.id}: required reason missing`);
  if(['sufficient','insufficient'].includes(a.sufficiency))assert(a.basis_refs.length&&a.assessed_by_ref&&a.assessed_at&&a.authority_ref,`${a.id}: completed assessment requires basis/actor/time/demo permission`);
  if(a.sufficiency==='sufficient')assert(['available','received'].includes(e.receipt_status)&&e.verification_status==='verified',`${a.id}: unreceived/unverified evidence cannot be sufficient`);
  if(a.revision>1)assert(a.supersedes_assessment_ref,`${a.id}: reassessment must preserve history link`);
 }
 for(const e of data.evidence)assert(e.receipt_status==='missing'?e.acquired_at===null:e.acquired_at!==null,`${e.id}: receipt/time mismatch`);
 for(const d of data.decisions){
  assert(d.bank_authority_ref===null,`${d.id}: synthetic decision cannot assert bank mandate`);
  assert(data.demoConfig.allowed_actions_by_role[d.recorded_by]?.includes('record_disposition'),`${d.id}: role lacks synthetic disposition permission`);
  assert(d.basis_refs.length>0&&Object.keys(d.input_revisions).length>0,`${d.id}: missing decision basis/version`);
  for(const [key,revision]of Object.entries(d.input_revisions))assert(map.get(key)?.record.revision===revision,`${d.id}: stale input revision`);
 }
 for(const f of data.screeningFindings)if(f.review_status==='resolved')assert(f.decision_ref,`${f.id}: resolved finding lacks human decision`);
 const priorStates=history.map(x=>x.data||x);
 const snapshots=data.readinessSnapshots;
 for(const [index,s] of snapshots.entries()){
  const latest=index===snapshots.length-1;
  if(index>0)assert(s.revision>snapshots[index-1].revision&&s.supersedes_ref===snapshots[index-1].id,`${s.id}: nonmonotonic snapshot revision/history link`);
  for(const [conditionId,revision]of Object.entries(s.condition_revisions))assert(Number.isInteger(revision)&&revision>=1&&map.get(conditionId)?.kind==='ClearanceCondition'&&revision<=map.get(conditionId).record.revision,`${s.id}: invalid historical condition revision`);
  assert(Object.keys(s.condition_revisions).length===data.clearanceConditions.length,`${s.id}: incomplete condition revision basis`);
  const historical=priorStates.find(state=>state.scopes?.[0]?.revision===s.scope_revision&&state.clearanceConditions?.every(c=>s.condition_revisions[c.id]===c.revision));
  const basis=latest?data:historical;
  if(!basis){assert(s.result===(s.blocking_condition_ids.length||s.unknown_condition_ids.length?'not_ready':s.result),`${s.id}: historical false green`);continue;}
  const scope=basis.scopes?.[0];
  const block=basis.clearanceConditions.filter(c=>c.applicability==='required'&&(c.status!=='satisfied'||c.scope_revision!==scope?.revision)).map(c=>c.id).sort();
  const unknown=basis.clearanceConditions.filter(c=>c.applicability==='unknown'||c.status==='unknown').map(c=>c.id).sort();
  assert(JSON.stringify([...s.blocking_condition_ids].sort())===JSON.stringify(block),`${s.id}: wrong blocker list`);
  assert(JSON.stringify([...s.unknown_condition_ids].sort())===JSON.stringify(unknown),`${s.id}: unknown applicability lost`);
  const invalidContext=!scope||scope.scope_status!=='confirmed_for_demo'||!scope.booking_entity_ref||!scope.policy_profile_ref||!scope.entity_ids?.length||!scope.product_scope_ids?.length||!basis.clearanceConditions.length||!basis.clearanceConditions.some(c=>c.applicability==='required');
  assert(s.result===(invalidContext||block.length||unknown.length?'not_ready':'candidate_ready'),`${s.id}: false green or incomplete scope context`);
  for(const c of basis.clearanceConditions)assert(s.condition_revisions[c.id]===c.revision,`${s.id}: condition revision mismatch`);
 }
 assert(data.case.publication_status==='not_requested'&&data.case.transaction_status==='out_of_scope','Publication/trade execution leaked into slice');
}
test('Draft schema validates every initial fixture record',()=>validate(fixture,schema));
test('Same-case typed references, registered sources and synthetic status',()=>references(fixture));
test('Initial receipt/purpose/authority/readiness invariants',()=>semantics(fixture));
test('15 preserved SCN aliases; 6 prior authored, 2 Batch A authored and 7 skeleton',()=>{assert(registry.length===15&&new Set(registry.map(x=>x.scenario_id)).size===15,'Registry cardinality');assert(registry.filter(x=>x.authoring_status==='authored_round_a').length===6,'Prior authored count');assert(registry.filter(x=>x.authoring_status==='authored_d2_batch_a').length===2,'Batch A authored count');assert(registry.filter(x=>x.authoring_status==='skeleton').length===7,'Skeleton count');assert(registry.filter(x=>x.authoring_status==='skeleton').every(x=>x.contract===null),'Skeleton falsely authored');});
test('Crosswalk uses only existing journey IDs',()=>{const existing=new Set(readFileSync(path.join(project,'03_personas_journey/journey_moments.csv'),'utf8').split('\n').slice(1).map(x=>x.split(',')[0]));for(const s of registry)for(const j of s.journey_crosswalk)assert(existing.has(j),`Invented journey ID ${j}`);});
test('Source-qualified D2 dependency semantics',()=>{for(const d of fixture.dependencies){assert(/^SRC-010:DEP-\d\d$/.test(d.source_key),'Unqualified runtime dependency');assert(d.ia_crosswalk_keys.every(x=>/^SRC-009:DEP-\d\d$/.test(x)),'Unqualified IA dependency');}});
test('IA §7.2 field metadata coverage',()=>{const content=readFileSync(path.join(here,'field_dictionary.csv'),'utf8');assert(content.split('\n')[0].split(',').length===21,'Expected 21 metadata columns');for(const [kind,def]of Object.entries(schema.$defs))for(const key of Object.keys(def.properties))assert(content.includes(`"${kind}","${key}",`),`Missing dictionary row ${kind}.${key}`);});
const reject=(mutate,check)=>{const data=structuredClone(fixture);mutate(data);let caught=false;try{check(data);}catch{caught=true;}assert(caught,'Invalid mutation was accepted');};
test('Reject dangling reference',()=>reject(d=>d.requirements[0].subject_id='DEMO-CTT-001/entity/missing',references));
test('Reject wrong reference type',()=>reject(d=>d.requirements[0].subject_id=d.evidence[0].id,references));
test('Reject missing required nullable key',()=>reject(d=>delete d.scopes[0].booking_entity_ref,d=>validate(d,schema)));
test('Reject null for non-null field',()=>reject(d=>d.requirements[0].purpose_code=null,d=>validate(d,schema)));
test('Reject non-synthetic source status',()=>reject(d=>d.evidence[0].source_status='SOURCE-SUPPORTED',references));
test('Reject receipt treated as sufficient',()=>reject(d=>d.evidenceUseAssessments[2].sufficiency='sufficient',semantics));
test('Reject false green with open Legal/Credit/QA',()=>reject(d=>d.readinessSnapshots[0].result='candidate_ready',semantics));
test('Screening local completion leaves Legal/Credit/QA blocked',()=>{const d=structuredClone(fixture);d.clearanceConditions.filter(c=>['evidence','screening'].includes(c.domain)).forEach(c=>c.status='satisfied');const blocked=d.clearanceConditions.filter(c=>c.applicability==='required'&&c.status!=='satisfied');assert(blocked.map(c=>c.domain).join('|')==='legal|credit|qa','Independent conditions lost');});
const report={suite:'Round A draft data contract',run_at:new Date().toISOString(),checks,summary:{passed:checks.filter(x=>x.status==='PASS').length,failed:checks.filter(x=>x.status==='FAIL').length},limits:['Tests inspect generated schema vocabulary and logical fixture invariants; not an independent full JSON Schema implementation.','No runtime/UI, external send, bank policy/authority, publication, persistence or production security certification.','Legal/Credit/QA are read-only branch placeholders. EDD applicability remains unknown.','Original P0/P1 source absent from narrowly searched workspace; derived references are not treated as the original.']};
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 console.log(JSON.stringify(report,null,2));
 if(report.summary.failed)process.exitCode=1;
}
export {validate,references,semantics};
