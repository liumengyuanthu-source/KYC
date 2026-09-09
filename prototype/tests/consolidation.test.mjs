import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialNavigation,navigate,route} from '../navigation.mjs';
import {selectReferences} from '../references.mjs';
import {definitionHtml,fDiagramHtml} from '../consolidation-ui.mjs';
let api;try{api=await import('../consolidation.mjs');}catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
const snapshots=JSON.parse(readFileSync(new URL('../../04_operating_model/batch-e/clearance-snapshots.json',import.meta.url))).snapshots;
const state=name=>structuredClone(snapshots[name]);
for(const location of ['edge','from','to'])for(const field of ['case_id','case_scope_id','case_scope_ref'])test(`Final fix F identity: foreign ${location} ${field} is unknown before independence`,()=>{
 const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1);s.dependencies=[edge];edge.dependency_type='independence';edge.status='not_applicable';
 const target=location==='edge'?edge:Object.values(s).filter(Array.isArray).flat().filter(x=>x.id===edge[location+'_object_ref']).at(-1);target[field]='OTHER';
 const before=structuredClone(s),view=api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref]});assert.deepEqual(view.unknown,[edge.to_object_ref]);assert.deepEqual(view.unaffected,[]);assert.deepEqual(s,before);
});
for(const field of ['from_ref','to_ref','case_id','case_scope_id'])test(`Final fix F identity: missing identity or conflicting ${field} alias is unknown`,()=>{
 const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1);s.dependencies=[edge];edge.dependency_type='independence';edge.status='not_applicable';
 if(field.endsWith('_ref'))edge[field]='OTHER';else delete edge[field];
 assert.deepEqual(api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref]}).unknown,[edge.to_object_ref]);
});
for(const fault of ['missing target','unknown status','missing status','unknown target','foreign context'])test(`Final fix F holds: ${fault} cannot imply affected or independence`,()=>{
 const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1);s.dependencies=[edge];edge.dependency_type='independence';edge.status='not_applicable';
 const h={id:'F-final-hold',case_id:s.case.id,case_scope_id:s.scopes[0].id,scope_revision:s.scopes[0].revision,status:'active',hold_scope:'task',target_object_ref:edge.to_object_ref};
 if(fault==='missing target')delete h.target_object_ref;if(fault==='unknown status')h.status='unknown';if(fault==='missing status')delete h.status;if(fault==='unknown target')h.target_object_ref='UNRESOLVED';if(fault==='foreign context')h.case_scope_id='OTHER';s.holds.push(h);
 const view=api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref]});assert.deepEqual(view.unknown,[edge.to_object_ref]);assert.deepEqual(view.affected,[]);assert.deepEqual(view.unaffected,[]);
});
test('Final fix F D5 entry uses retained specialist condition step while E5 uses clearance',()=>{const story=api.masterStory();assert.equal(story.find(x=>x.beat_id==='D5').prototype_entry_ref.step,'condition');assert.equal(story.find(x=>x.beat_id==='E5').prototype_entry_ref.step,'clearance');});
test('F master reading route reaches publication through actual scene links without creating business scenarios',()=>{
 assert.ok(api,'F consolidation projection is required');const story=api.masterStory();assert.equal(story.length,20);assert.equal(new Set(story.map(x=>x.scene_id)).size,15);assert.deepEqual(story.map(x=>x.scene_id),route);
 for(let i=0;i<story.length;i++){assert.equal(story[i].next_scene_id,story[i+1]?.scene_id||null);assert.equal(story[i].next_beat_ref,story[i+1]?.beat_id||null);for(const key of ['trigger','current_work','target_work','decision_refs','inputs','outputs','prototype_entry_ref','return_ref','evidence_status'])assert.ok(story[i][key],key);}
 assert.equal(story.at(-1).scene_id,'SCN-PUBLISH');assert.equal(story[18].beat_id,'E5');
});
test('F definition return preserves semantic navigation and latest language with no new top-level experience',()=>{
 const origin={...initialNavigation(),scenario:'SCN-MATCH',role:'ROLE-REVIEWER',comparison:'current',trigger:'new-relationship',camera:{anchor:'SCN-MATCH',offset:157},zoom:'detail',storyCursor:7};
 let n=navigate(origin,{type:'DEFINITION_OPEN'});assert.equal(n.studioPage,'product-definition');assert.equal(n.page,'studio');n=navigate(n,{type:'LOCALE',value:'zh-CN'});n=navigate(n,{type:'DEFINITION_BACK'});assert.deepEqual(n,{...origin,locale:'zh-CN'});
});
test('F dependency projection never calls absence independence; stale endpoints and unknown holds stay unknown',()=>{
 assert.ok(api);const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id==='DEMO-CTT-001/dependency/e-task-qa').at(-1),before=structuredClone(s);
 let p=api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref,'UNLINKED']});assert.ok(p.affected.includes(edge.to_object_ref));assert.ok(p.unknown.includes('UNLINKED'));assert.equal(p.unaffected.length,0);assert.deepEqual(s,before);
 s.dependencies.filter(x=>x.id===edge.id).at(-1).from_revision=-1;p=api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref]});assert.ok(p.unknown.includes(edge.to_object_ref));
 s.holds.push({id:'F-test-hold',status:'active',hold_scope:'unknown',target_object_ref:edge.to_object_ref});p=api.dependencyProjection(s,{changedRefs:[edge.from_object_ref],candidateRefs:[edge.to_object_ref]});assert.ok(p.unknown.includes(edge.to_object_ref));
});
test('F dependency independence requires explicit current relation and reviewed condition',()=>{
 assert.ok(api);const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1),from=s.workItems.filter(x=>x.id===edge.from_object_ref).at(-1),to=s.qaChecks.filter(x=>x.id===edge.to_object_ref).at(-1);s.dependencies=[{...edge,dependency_type:'independence',status:'not_applicable',dependency_condition:'Reviewed no dependency for this purpose'}];
 const p=api.dependencyProjection(s,{changedRefs:[from.id],candidateRefs:[to.id]});assert.ok(p.unaffected.includes(to.id));
});
test('F unavailable scope or permission is not displayed as a factual readiness result',()=>{
 assert.ok(api);for(const s of [{},state('E-ready')]){const p=api.consolidatedProjection(s,{role:'ROLE-UNKNOWN'});assert.equal(p.available,false);assert.equal(p.readinessState,null);assert.deepEqual(p.dependencies,[]);}
 const s=state('E-ready');s.scopes=[];assert.equal(api.consolidatedProjection(s,{role:'ROLE-QA'}).readinessState,null);
});
test('F lenses and print project the active revision and preserve clearance/publication distinction',()=>{
 assert.ok(api);for(const [name,want,pub] of [['E-ready','READY_FOR_AUTHORISED_CONFIRMATION','not_requested'],['E-cleared','CLEARED_TO_TRADE','not_requested'],['E-published','CLEARED_TO_TRADE','succeeded'],['E-scope-changed','NOT_READY','historical_not_current']]){const s=state(name),before=structuredClone(s),p=api.consolidatedProjection(s,{role:'ROLE-QA'});assert.equal(p.readinessState,want);assert.equal(p.publicationStatus,pub);for(const lens of ['outcome','work','assurance']){const x=api.consolidatedProjection(s,{role:'ROLE-QA',lens});assert.equal(x.revision,s.case.revision);assert.equal(x.readinessState,want);assert.equal(x.stateWrites,false);}assert.deepEqual(s,before);}
});
test('F references retain observations, inherited verification and FHIR release context',()=>{
 assert.ok(api);const cards=selectReferences(),out=api.referenceIndex(cards);assert.equal(out.flatMap(x=>x.observations).length,49);assert.equal(new Set(out.flatMap(x=>x.observations.map(o=>o.observation_id))).size,49);
 for(const c of cards){const x=out.find(x=>x.observations.some(o=>o.observation_id===c.observation.observation_id));assert.equal(x.observations.find(o=>o.observation_id===c.observation.observation_id).verification_status,c.observation.verification_status);}
 const fhir=out.filter(x=>/fhir/i.test(x.official_source_url||''));assert.ok(fhir.some(x=>/R4|r4/.test(x.official_source_url)));assert.ok(fhir.some(x=>/R5|r5/.test(x.official_source_url)));
});
test('F does not promote evidence receipt, empty prerequisites or unknown applicability to clearance',()=>{
 assert.ok(api);for(const change of [s=>s.requirements=[],s=>s.clearanceConditions=[],s=>s.evidenceUseAssessments=[],s=>s.clearanceConditions[0].applicability='unknown',s=>s.evidenceUseAssessments.at(-1).sufficiency='insufficient']){const s=state('E-ready');change(s);assert.equal(api.consolidatedProjection(s,{role:'ROLE-QA'}).readinessState,'NOT_READY');}
});
test('F view region changes preserve policy and return semantic context',()=>{
 const origin={...initialNavigation(),scenario:'SCN-LEGAL',comparison:'current'};let n=navigate(origin,{type:'DEFINITION_OPEN'});n=navigate(n,{type:'REGION',value:'SG'});assert.equal(n.region,'SG');n=navigate(n,{type:'DEFINITION_BACK'});assert.equal(n.region,'SG');assert.equal(n.scenario,'SCN-LEGAL');assert.equal(n.comparison,'current');
});
test('F unknown dependency status cannot be presented as known affected work',()=>{
 const s=state('E-ready'),e=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1);e.status='unknown';const p=api.dependencyProjection(s,{changedRefs:[e.from_object_ref],candidateRefs:[e.to_object_ref]});assert.ok(p.unknown.includes(e.to_object_ref));assert.equal(p.unaffected.length,0);
});
test('F graph references resolve existing observations without increasing the reference inventory',()=>{
 for(const node of ['F01-evidence','F02-unknown','F03-lab']){const refs=selectReferences({node});assert.ok(refs.length>0,node);assert.ok(refs.every(r=>r.observation.verification_origin!=='new_F_verification'));}assert.equal(selectReferences().length,49);
});
test('F D1 parallel introduction and D2 Conflicts review preserve distinct reading contracts',()=>{
 const story=api.masterStory(),a=story.find(s=>s.beat_id==='D1'),b=story.find(s=>s.beat_id==='D2');assert.notDeepEqual(a.title,b.title);assert.notDeepEqual(a.target_work,b.target_work);assert.match(a.target_work['en-AU'],/Conflicts, Credit and Legal/);assert.match(b.target_work['en-AU'],/specialist reviews/);
});
test('F fallback preserves every checked diagram node and Chinese requirement prose',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../diagrams/batch-f/manifest.json',import.meta.url))),d=JSON.parse(readFileSync(new URL('../../00_governance/batch-f/product-definition.json',import.meta.url)));
 const html=fDiagramHtml(manifest,'DG-F01','zh-CN',0,true);assert.equal((html.match(/<li /g)||[]).length,11);assert.match(html,/F01-authority/);assert.match(html,/F01-publication/);
 const print=definitionHtml({definition:d,manifest,state:{},nav:{locale:'zh-CN',role:'ROLE-QA'},print:true});assert.doesNotMatch(print,/The product shall|Human confirms scope|Case Manager coordinates; KYC Ops assesses/);assert.match(print,/假设.*收到|给定|当.*则/s);
});
for(const relation of ['normal','independence'])for(const impactScope of [undefined,'unknown','invalid-scope'])test(`F review fix 1: ${relation} edge with ${impactScope===undefined?'absent':impactScope} impact scope remains unknown`,()=>{
 const s=state('E-ready'),edge=s.dependencies.filter(x=>x.id.endsWith('e-task-qa')).at(-1);
 // Isolate the actual current QA edge: unrelated paths cannot mask an unsafe independence result.
 s.dependencies=[structuredClone(edge)];const candidate=s.dependencies[0];
 if(impactScope===undefined)delete candidate.impact_scope;else candidate.impact_scope=impactScope;
 if(relation==='independence'){candidate.dependency_type='independence';candidate.status='not_applicable';candidate.dependency_condition='Reviewed no dependency for this purpose';}
 const before=structuredClone(s),p=api.dependencyProjection(s,{changedRefs:[candidate.from_object_ref],candidateRefs:[candidate.to_object_ref]});
 assert.deepEqual(p.unknown,[candidate.to_object_ref]);assert.deepEqual(p.affected,[]);assert.deepEqual(p.unaffected,[]);assert.deepEqual(s,before);
});
