import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBatchB} from '../collaboration-engine.mjs';
import {createBatchC,screeningAction,screeningProjection} from '../screening-engine.mjs';
import {renderCollaboration} from '../collaboration-ui.mjs';
import {scenes,skeleton} from '../content.mjs';
import {route} from '../navigation.mjs';

const ui=await import('../screening-ui.mjs').catch(()=>({}));
const snapshots=JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/batch-a-story-snapshots.json',import.meta.url)));
const seed=()=>createBatchC(createBatchB(snapshots.snapshots['SNAP-A3']));
function action(s,type,extra={}){
 const p=screeningProjection(s,{role:'ROLE-KYCOPS'});
 return screeningAction(s,{type,role:'ROLE-KYCOPS',expectedRevision:p.revision,expectedScopeRevision:p.scopeRevision,
  expectedInputRevisions:p.inputRevisions,key:`UI:${type}:${s.case.revision}`,rationale:'Reviewed current synthetic context',at:'2026-09-07T12:00:00Z',...extra});
}
function withFinding(){let s=seed();s=action(s,'prepare_preliminary');s=action(s,'request_preliminary');return action(s,'receive_result',{runId:s.screeningRuns.at(-1).id,outcome:'completed'});}

test('Batch C entry is explicit and names both current-case and archival fixture choices',()=>{
 assert.equal(typeof ui.screeningEntryHtml,'function');
 const html=ui.screeningEntryHtml({locale:'en-AU',canContinue:true});
 assert.match(html,/data-action="c-start"/);
 assert.match(html,/data-action="c-demo"/);
 assert.match(html,/Continue current Batch B case/);
 assert.doesNotMatch(html,/auto|reset on/i);
});
test('Batch C routing is bounded to its five workspace steps and does not capture Scope or Clearance',()=>{
 assert.equal(typeof ui.isScreeningStep,'function');
 for(const step of ['population','screening','screening-evidence','edd','screening-activity'])assert.equal(ui.isScreeningStep(step),true);
 for(const step of ['scope','authority','requirements','clearance','collaboration'])assert.equal(ui.isScreeningStep(step),false);
});

test('all fifteen scene IDs remain stable while Population and EDD become authored route scenes',()=>{
 const ids=[...scenes.map(x=>x.id),...skeleton.map(x=>x[0])];
 assert.equal(ids.length,15);assert.equal(new Set(ids).size,15);
 assert.ok(scenes.some(x=>x.id==='SCN-POPULATION')&&scenes.some(x=>x.id==='SCN-EDD'));
 assert.ok(route.indexOf('SCN-POPULATION')<route.indexOf('SCN-MATCH'));
 assert.ok(route.indexOf('SCN-EDD')>route.indexOf('SCN-MATCH'));
 assert.doesNotMatch(scenes.find(x=>x.id==='SCN-MATCH').output['en-AU'],/This finding is resolved/);
});

test('operator rendering exposes real guarded actions and an explicit disabled disposition reason',()=>{
 assert.equal(typeof ui.screeningWorkspaceHtml,'function');
 const p=screeningProjection(withFinding(),{role:'ROLE-KYCOPS'});
 const html=ui.screeningWorkspaceHtml({projection:p,role:'ROLE-KYCOPS',step:'screening',locale:'en-AU',rationale:'Keep this draft',dirty:true});
 assert.match(html,/DEMO-CTT-001\/finding\/person-t-c01/);
 assert.match(html,/id="screening-rationale"[^>]*>Keep this draft/);
 assert.match(html,/data-action="c-action" data-value="save_review_draft"/);
 assert.match(html,/data-action="c-action" data-value="request_identity"/);
 assert.match(html,/data-value="record_disposition"[^>]*disabled/);
 assert.match(html,/Exclusion is disabled pending reviewed fixture and permission configuration/);
 assert.doesNotMatch(html,/legacy Entity A finding.*Person T.*complete/is);
});

test('safe RM and client product projections never render restricted screening fields, including print',()=>{
 const s=withFinding();
 for(const role of ['ROLE-RM','ROLE-CLIENT']){
  const p=screeningProjection(s,{role});
  for(const print of [false,true]){
   const html=ui.screeningWorkspaceHtml({projection:p,role,step:'screening',locale:'en-AU',print});
   assert.match(html,/Review in progress/);
   assert.doesNotMatch(html,/SYN-PROVIDER|date_of_birth|provider record|screening-rationale/i);
  }
 }
});

test('selected Batch C scene print renders its complete decision set and scoped reference footnotes',()=>{
 assert.equal(typeof ui.screeningSceneHtml,'function');
 const p=screeningProjection(withFinding(),{role:'ROLE-KYCOPS'});
 const html=ui.screeningSceneHtml({scene:'SCN-MATCH',locale:'en-AU',mode:'Target',projection:p,print:true});
 for(let i=1;i<=12;i++)assert.match(html,new RegExp(`data-semantic-node="M${String(i).padStart(2,'0')}"`));
 assert.match(html,/Research · not case evidence/);
 assert.match(html,/https:\/\//);
 assert.doesNotMatch(html,/data-c-node=|data-c-ref=/);
});
test('interactive scene keeps references on demand rather than forcing the full library below the graph',()=>{
 const p=screeningProjection(withFinding(),{role:'ROLE-KYCOPS'});
 const html=ui.screeningSceneHtml({scene:'SCN-MATCH',locale:'en-AU',mode:'Target',projection:p});
 assert.match(html,/data-action="reference-scene"/);
 assert.doesNotMatch(html,/class="reference-library"/);
});

test('Evidence makes the exact disabled resume guard visible',()=>{
 const p=screeningProjection(withFinding(),{role:'ROLE-KYCOPS'});
 p.actions.resume_branch={allowed:false,reason_codes:['HOLD_REQUIRES_REVIEW']};
 const html=ui.screeningWorkspaceHtml({projection:p,role:'ROLE-KYCOPS',step:'screening-evidence',locale:'en-AU'});
 assert.match(html,/HOLD_REQUIRES_REVIEW/);
});

test('print projection includes compact identity artifact and use assessment identifiers',()=>{
 const p=screeningProjection(withFinding(),{role:'ROLE-KYCOPS'});
 p.evidence=[{id:'DEMO-CTT-001/evidence/identity-c',alias:'EV-ID-C01',intake_security_status:'released',evidence_revision:2}];
 p.assessments=[{id:'DEMO-CTT-001/assessment/identity-c-1',evidence_id:p.evidence[0].id,sufficiency:'insufficient',rationale:'Identity remains inconclusive'}];
 const html=ui.screeningWorkspaceHtml({projection:p,role:'ROLE-KYCOPS',step:'screening',locale:'en-AU',print:true});
 assert.match(html,/EV-ID-C01/);assert.match(html,/identity-c-1/);assert.match(html,/Identity remains inconclusive/);
});

test('selected synthetic result survives workspace rerender',()=>{
 const p=screeningProjection(seed(),{role:'ROLE-KYCOPS'});
 const html=ui.screeningWorkspaceHtml({projection:p,role:'ROLE-KYCOPS',step:'population',locale:'en-AU',outcome:'partial'});
 assert.match(html,/value="partial" selected/);
});

test('unknown EDD visibly retains an unresolved question and unassigned owner',()=>{
 const p=screeningProjection(seed(),{role:'ROLE-KYCOPS'});
 const html=ui.screeningWorkspaceHtml({projection:p,role:'ROLE-KYCOPS',step:'edd',locale:'en-AU'});
 assert.match(html,/C-Q-EDD-APPLICABILITY/);assert.match(html,/Owner: Unassigned/);assert.match(html,/Unresolved question/);
});

test('identity request collaboration uses screening-safe copy and routes assessment back to Screening Evidence',()=>{
 const item={id:'identity-item',alias:'ITEM-IDENTITY-C',purpose_code:'screening_identity',client_reason:'Please provide the identity information specified in this request for Person T through the secure task.',response_status:'under_review',revision:1};
 const projection={allowed:true,case_id:'DEMO-CTT-001',case_revision:12,request_id:'DEMO-CTT-001/request/identity-c',request_revision:2,request:{purpose_code:'screening_identity'},items:[item],evidence:[],assessments:[]};
 const client=renderCollaboration({projection,audience:'client',tab:'tasks',locale:'en-AU',selectedItemId:item.id});
 assert.match(client,/Identity information for screening review/);
 assert.doesNotMatch(client,/prepared synthetic authority statement/i);
 const ops=renderCollaboration({projection,audience:'ops',tab:'evidence',locale:'en-AU',selectedItemId:item.id});
 assert.match(ops,/data-action="c-back-review"/);
 assert.match(ops,/data-action="c-back-review" data-value="screening-evidence"/);
 assert.doesNotMatch(ops,/data-value="record_assessment"/);
});

test('restricted legacy Activity uses a safe C projection rather than raw audit events',()=>{
 assert.equal(typeof ui.screeningSafeActivityHtml,'function');
 const html=ui.screeningSafeActivityHtml({projection:{allowed:true,progress:'review_in_progress',revision:32,next_owner:'Unassigned'},locale:'en-AU'});
 assert.match(html,/Activity detail unavailable/);assert.match(html,/Case revision 32/);
 assert.doesNotMatch(html,/Sensitive rationale text|CORR-SECRET/);
});

test('authorized legacy Activity preserves A/B history and admits only projected C events',()=>{
 assert.equal(typeof ui.screeningActivityEvents,'function');
 const old={id:'event-b',event_type:'interaction_note_recorded',rationale:'Existing B rationale',source_refs:['SRC-015']};
 const allowed={id:'event-c-safe',event_type:'screening_query_prepared',source_refs:['SRC-016']};
 const hidden={id:'event-c-hidden',event_type:'screening_private',rationale:'Hidden C rationale',source_refs:['SRC-016']};
 const events=ui.screeningActivityEvents([old,allowed,hidden],{activity:[allowed]});
 assert.deepEqual(events.map(x=>x.id),['event-b','event-c-safe']);
 assert.equal(events[0].rationale,'Existing B rationale');
});

test('cross-workspace C collaboration routes are leave-guarded in the host',()=>{
 const source=readFileSync(new URL('../app.mjs',import.meta.url),'utf8');
 assert.match(source,/if\(a==='c-collaboration'\)\{guarded\(/);
 assert.match(source,/if\(a==='c-back-review'\)\{guarded\(/);
});
