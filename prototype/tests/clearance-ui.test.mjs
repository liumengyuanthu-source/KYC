import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialNavigation,navigate,route,specialistBeatAt} from '../navigation.mjs';
import {clearanceProjection} from '../clearance-engine.mjs';
import {clearanceHtml,clearanceCommand,clearanceSceneHtml} from '../clearance-ui.mjs';
import {selectReferences} from '../references.mjs';
const states=JSON.parse(readFileSync(new URL('../../04_operating_model/batch-e/clearance-snapshots.json',import.meta.url))).snapshots;
test('Final fix E gap activity has localized gap state and distinguishes authored time from local action time',()=>{
 for(const [locale,gap,authored,action] of [['en-AU','Gap open','Authored scenario time','Recorded action time'],['en-US','Gap open','Authored scenario time','Recorded action time'],['zh-CN','缺口待处理','场景编制时间','操作记录时间']]){
  const s=structuredClone(states['E-gap']),before=structuredClone(s),projection=clearanceProjection(s,{role:'ROLE-QA'}),html=clearanceHtml({projection,role:'ROLE-QA',locale,step:'qa-remediation'});
  assert.match(html,new RegExp(gap));assert.match(html,new RegExp(authored));assert.match(html,new RegExp(action));assert.match(html,/2026-09-08T08:00:00Z/);assert.deepEqual(s,before);
 }
});
test('E route preserves D1–D5 positions and adds six separate E beats',()=>{
 assert.equal(specialistBeatAt(9),'D1');assert.equal(specialistBeatAt(13),'D5');assert.equal(route.length,20);
 let n={...initialNavigation(),storyCursor:13};for(let i=1;i<=6;i++){n=navigate(n,{type:'CONTINUE'});assert.equal(n.clearanceBeat,`E${i}`);}
});
test('E semantic origin survives return with latest language and no business snapshot',()=>{
 let n={...initialNavigation(),comparison:'current',camera:{anchor:'SCN-QA',offset:56}};n=navigate(n,{type:'E_BEAT',beat:'E3'});n=navigate(n,{type:'PRODUCT',step:'qa-remediation',scopeRevision:3});n=navigate(n,{type:'LOCALE',value:'zh-CN'});n=navigate(n,{type:'RETURN',destination:'scenario'});
 assert.equal(n.clearanceBeat,'E3');assert.equal(n.comparison,'current');assert.equal(n.locale,'zh-CN');assert.equal(n.camera.offset,56);assert.equal(n.data,undefined);
});
test('Clearance has six readable groups, scoped three-state result and no percentage',()=>{
 const p=clearanceProjection(states['E-ready'],{role:'ROLE-QA'}),html=clearanceHtml({projection:p,role:'ROLE-QA'});
 assert.equal((html.match(/data-e-group=/g)||[]).length,6);assert.match(html,/Ready for authorised confirmation/);assert.doesNotMatch(html,/%/);assert.match(html,/Waiting for/);assert.match(html,/Owner/);
});
test('Command adapter separates guarded draft, confirmation and publication',()=>{
 const p=clearanceProjection(states['E-ready'],{role:'ROLE-CLEARANCE-REVIEWER'}),base={projection:p,role:'ROLE-CLEARANCE-REVIEWER',action:'confirm_clearance',rationale:'Review basis',key:'stable-1',at:'2026-09-08T10:00:00Z'};
 const c=clearanceCommand(base);assert.equal(c.snapshotFingerprint,p.readiness.fingerprint);assert.equal(c.packageRef,undefined);
 const d=clearanceCommand({...base,save:true});assert.equal(d.type,'save_draft');assert.equal(d.draftAction,'confirm_clearance');assert.equal(d.draftRationale,'Review basis');assert.equal(d.snapshotFingerprint,undefined);
});
test('RM/client DOM and complete print consume only safe projection',()=>{
 for(const role of ['ROLE-RM','ROLE-CLIENT']){const s=structuredClone(states['E-cleared']);s.clearanceDecisions[0].rationale='PRIVATE_SENTINEL';const p=clearanceProjection(s,{role});const h=clearanceHtml({projection:p,role,print:true});assert.doesNotMatch(h,/PRIVATE_SENTINEL|textarea|data-e-commit/);assert.match(h,/data-e-diagram="DG-E03"/);assert.match(h,/Trade execution is not part/);}
});
test('E story comparison and diagram host are presentation only',()=>{
 const p=clearanceProjection(states['E-entry'],{role:'ROLE-QA'}),h=clearanceSceneHtml({projection:p,beat:'E3',comparison:'current'});assert.match(h,/Current/);assert.match(h,/data-e-focus/);assert.doesNotMatch(h,/iframe|data-e-commit|autoplay/);
});
test('Satisfied conditions and signed-off QA show no outstanding work; prior publication is historical after change',()=>{
 const ready=clearanceProjection(states['E-ready'],{role:'ROLE-QA'}),html=clearanceHtml({projection:ready,print:true});assert.match(html,/No further action for current inputs/);assert.match(html,/No further action for the signed-off current evidence use/);
 for(const name of ['E-evidence-changed','E-scope-changed']){const p=clearanceProjection(states[name],{role:'ROLE-QA'});const h=clearanceHtml({projection:p,print:true});assert.match(h,/Not ready/);if(p.publication.status!=='not_requested')assert.match(h,/historical, no longer current/);}
});
test('E reference bindings reuse observations without duplicate cards or a new verification claim',()=>{
 const all=selectReferences({});assert.equal(all.length,49);assert.equal(new Set(all.map(x=>x.source.source_id+'|'+x.observation.observation_id)).size,49);
 const cards=selectReferences({scene:'SCN-PUBLISH',node:'E03-confirm'});assert.ok(cards.some(x=>x.observation.observation_id==='SRC-020:M6-M8'));assert.ok(cards.some(x=>x.observation.observation_id==='SRC-017:R20'));assert.ok(cards.every(x=>!x.observation.verified_at));
});
