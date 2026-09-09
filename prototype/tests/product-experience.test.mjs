import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const p = await import('../product-experience/projection.mjs').catch(()=>({}));
const t = await import('../product-experience/temporal.mjs').catch(()=>({}));
const w = await import('../product-experience/preferences.mjs').catch(()=>({}));
const h = await import('../product-experience/history.mjs').catch(()=>({}));
const seed=()=>JSON.parse(readFileSync(new URL('../qa/operating-model/host/c-live-session.json',import.meta.url))).data;
test('D5 progress has five anchors, six MATCH groups, actual binding and unknown manifest',()=>{
 assert.equal(typeof p.productProgress,'function');const s=seed(),before=structuredClone(s),a=p.productProgress(s,{role:'ROLE-KYCOPS',asOf:'2026-09-08T00:00:00Z'});
 assert.equal(a.stages.length,5);assert.deepEqual(a.steps.map(x=>x.id),['MATCH-01','MATCH-02','MATCH-03','MATCH-04','MATCH-05','MATCH-06']);assert.equal(a.completeness,'unknown');
 assert.equal(a.finding_ref,'DEMO-CTT-001/finding/person-t-c01');assert.equal(a.scope_revision,3);assert.equal(a.steps[4].timing.started_at,null);assert.equal(a.steps[4].assignee_ref,null);
 assert.deepEqual(a.parallel.map(x=>x.id),['credit','legal','conflicts','edd','qa']);assert.equal(a.clearance,'not_ready');assert.deepEqual(s,before);
 const b=p.productProgress(s,{role:'ROLE-KYCOPS',viewingStep:'MATCH-06',asOf:'2026-09-08T00:00:00Z'});assert.equal(b.viewing_step,'MATCH-06');assert.deepEqual(b.steps,a.steps);assert.deepEqual(s,before);
});
test('D5 RM/client projections exclude internal evidence, timing examples, identifiers and counts before HTML',()=>{
 assert.equal(typeof p.productProgress,'function');const s=seed();
 for(const role of ['ROLE-RM','ROLE-CLIENT']){const x=p.productProgress(s,{role});const json=JSON.stringify(x);assert.doesNotMatch(json,/person-t-c01|sanctions|SYNTHETIC-C-DATASET|comparison_basis|D5U-TIME-DEMO|Legal|conflicts/);assert.equal(x.relationship_channel,'email');assert.equal(x.estimate.calendar_finish,null);}
 assert.equal(p.productProgress(s,{role:'ROLE-UNCONFIGURED'}).allowed,false);
});
test('D5 semantic adapter keeps health, work, next and freshness separate and requires basis',()=>{
 assert.equal(typeof p.semanticStatus,'function');for(const key of ['action_required','in_progress','waiting','on_track','at_risk','blocked','overdue','completed','unknown','not_applicable']){const x=p.semanticStatus(key,{basis:'verified-fixture',baselineType:'internal_target',locale:'zh-CN'});assert.equal(x.key,key);assert.ok(x.icon);assert.ok(x.label);}
 assert.equal(p.semanticStatus('on_track').key,'unknown');assert.equal(p.semanticStatus('not_applicable').key,'unknown');assert.equal(p.semanticStatus('overdue',{basis:'estimate',baselineType:'estimate'}).key,'unknown');
 const a=p.statusAdapter({work_state:'waiting',health_state:'on_track',health_basis:'target-v1',next_action:{allowed:false,reason:'missing input'},freshness_state:'stale'});assert.equal(a.work.key,'waiting');assert.equal(a.health.key,'unknown');assert.equal(a.next.allowed,false);assert.equal(a.freshness,'stale');
});
test('D5 exact time illustration is isolated, conditional, internal and preserves timestamps',()=>{
 assert.equal(typeof t.temporalProjection,'function');const d=t.TIME_DEMO,x=t.temporalProjection(d);
 assert.equal(d.fixture_id,'D5U-TIME-DEMO-01');assert.equal(x.elapsed_hours,5);assert.equal(x.residence_hours.queued,.5);assert.equal(x.residence_hours.in_progress,.5);assert.equal(x.residence_hours.waiting,4);assert.equal(x.human_active_effort_hours,null);assert.equal(x.as_of,'2026-09-07T14:00:00+10:00');
 assert.equal(d.estimate.lower,1);assert.equal(d.estimate.upper,2);assert.equal(d.estimate.client_communication_allowed,false);assert.equal(t.estimateProjection(d.estimate).calendar_finish,null);
});
test('D5 residence intervals cannot overlap, archived clocks freeze and re-review retains episodes',()=>{
 assert.equal(typeof t.temporalProjection,'function');const events=[{kind:'entered_queue',at:'2026-09-07T09:00:00Z',episode_ref:'one'},{kind:'started_review',at:'2026-09-07T09:30:00Z',episode_ref:'one'},{kind:'completed',at:'2026-09-07T10:00:00Z',episode_ref:'one'},{kind:'re_review_started',at:'2026-09-07T11:00:00Z',episode_ref:'two'},{kind:'waiting_for_client',at:'2026-09-07T12:00:00Z',episode_ref:'two'}];
 const x=t.temporalProjection({events,as_of:'2026-09-07T14:00:00Z',historical_as_of:'2026-09-07T13:00:00Z'});assert.equal(x.as_of,'2026-09-07T13:00:00Z');assert.equal(x.episodes.length,2);assert.equal(x.entered_at,'2026-09-07T09:00:00Z');assert.equal(x.residence_hours.waiting,1);assert.equal(x.residence_hours.in_progress,1.5);for(let i=1;i<x.intervals.length;i++)assert.ok(Date.parse(x.intervals[i].start)>=Date.parse(x.intervals[i-1].end));
 assert.equal(t.temporalProjection({events:[],as_of:'2026-09-08T00:00:00Z'}).elapsed_hours,null);assert.equal(t.estimateProjection().lower,null);
 const e=t.estimateProjection({lower:2,upper:3,unit:'business_days',source_ref:'v2',reason:'new input',revisions:[{source_ref:'v1',upper:2}]});assert.equal(e.revisions[0].source_ref,'v1');assert.equal(e.reason,'new input');
});
test('D5 layout stores only IDs, is persona scoped, rechecks roles and keeps immutable core',()=>{
 assert.equal(typeof w.preferenceKey,'function');assert.notEqual(w.preferenceKey({user:'one',role:'ROLE-KYCOPS'}),w.preferenceKey({user:'two',role:'ROLE-KYCOPS'}));
 const x=w.normalisePreference({enabled:['OPT-DEPENDENCIES','OPT-CONTACTS','CORE-WORK'],order:['OPT-DEPENDENCIES','OPT-CONTACTS'],collapsed:['CORE-ACTION'],evidence:'SECRET'},{role:'ROLE-CLIENT'});assert.doesNotMatch(JSON.stringify(x),/DEPENDENCIES|SECRET|CORE/);
 let a=w.defaultPreference({role:'ROLE-KYCOPS'});const original=structuredClone(a);assert.deepEqual(w.changePreference(a,'remove','CORE-WORK',{role:'ROLE-KYCOPS'}),a);a=w.changePreference(a,'add','OPT-NOTES',{role:'ROLE-KYCOPS'});assert.ok(a.enabled.includes('OPT-NOTES'));assert.deepEqual(original,w.defaultPreference({role:'ROLE-KYCOPS'}));
});
test('D5 history access precedes search and frozen record selection never changes the current session',()=>{
 assert.equal(typeof h.historyProjection,'function');const records=[{id:'allowed',case_ref:'case1',state:'archived',outcome:'cancelled',as_of:'2026-09-01T00:00:00Z',scope_revision:1},{id:'secret',case_ref:'secret',state:'archived',outcome:'cleared'}];
 const x=h.historyProjection({records,canRead:r=>r.case_ref==='case1',tab:'archived',query:''});assert.equal(x.total,1);assert.equal(x.records[0].outcome,'cancelled');assert.equal(x.records[0].read_only,true);assert.equal(h.historyProjection({records,canRead:()=>false,query:'secret',tab:'archived'}).total,0);
 assert.equal(h.historyProjection({records,tab:'archived'}).total,0);assert.equal(h.historyProjection({records,role:'ROLE-CLIENT',canRead:()=>true}).safe_state,'contact_rm');
 const s=seed(),before=structuredClone(s);h.sessionHistory(s,{role:'ROLE-KYCOPS',user:'demo-operator-1',archives:[]});assert.deepEqual(s,before);
});
test('D5 current valid client grant exposes only its own frozen receipt and revocation removes it',()=>{
 const s=seed(),context={role:'ROLE-CLIENT',user:'demo-operator-1',userId:'DEMO-CTT-001/person/person-t',sessionId:'SESSION-CONTRACT-T',now:'2026-09-07T11:00:00Z'};
 const x=h.sessionHistory(s,context);assert.equal(x.records.length,1);assert.equal(x.records[0].id,'DEMO-CTT-001/submission/collab-1');assert.equal(x.records[0].as_of,'2026-09-07T10:00:00Z');assert.equal(x.records[0].kind,'request_receipt');
 s.accessGrants.forEach(g=>g.status='revoked');assert.equal(h.sessionHistory(s,context).records.length,0);
});
test('D5 layout preview/save/reset override prior optional reading while Cancel preserves it',()=>{
 assert.equal(typeof w.disclosureReadingState,'function');assert.equal(typeof w.clearOptionalReading,'function');
 const reading={'ROLE-KYCOPS:OPT-TIMELINE':true,'ROLE-KYCOPS:progress':true,'ROLE-RM:OPT-TIMELINE':true},before=structuredClone(reading);
 assert.equal(w.disclosureReadingState(reading,{role:'ROLE-KYCOPS',id:'OPT-TIMELINE'}),true);
 assert.equal(w.disclosureReadingState(reading,{role:'ROLE-KYCOPS',id:'OPT-TIMELINE',layoutPreview:true})??false,false);
 assert.equal(w.disclosureReadingState(reading,{role:'ROLE-KYCOPS',id:'progress',layoutPreview:true}),true);
 assert.equal(w.disclosureReadingState(reading,{role:'ROLE-KYCOPS',id:'OPT-TIMELINE',layoutPreview:false}),true);assert.deepEqual(reading,before);
 const saved=w.clearOptionalReading(reading,'ROLE-KYCOPS');assert.equal(saved['ROLE-KYCOPS:OPT-TIMELINE'],undefined);assert.equal(saved['ROLE-KYCOPS:progress'],true);assert.equal(saved['ROLE-RM:OPT-TIMELINE'],true);assert.deepEqual(reading,before);
});
test('D5 disclosure reading is isolated by persona and saved layout clears only that persona',()=>{
 const reading={'one:ROLE-KYCOPS:OPT-TIMELINE':true,'one:ROLE-KYCOPS:progress':true,'two:ROLE-KYCOPS:OPT-TIMELINE':false};
 assert.equal(w.disclosureReadingState(reading,{user:'one',role:'ROLE-KYCOPS',id:'OPT-TIMELINE'}),true);
 assert.equal(w.disclosureReadingState(reading,{user:'two',role:'ROLE-KYCOPS',id:'OPT-TIMELINE'}),false);
 assert.equal(w.disclosureReadingState(reading,{user:'three',role:'ROLE-KYCOPS',id:'OPT-TIMELINE'}),undefined);
 const saved=w.clearOptionalReading(reading,'ROLE-KYCOPS','one');assert.equal(saved['one:ROLE-KYCOPS:OPT-TIMELINE'],undefined);assert.equal(saved['one:ROLE-KYCOPS:progress'],true);assert.equal(saved['two:ROLE-KYCOPS:OPT-TIMELINE'],false);
});
