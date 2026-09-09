import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {specialistProjection} from '../specialist-engine.mjs';
import {scenes,skeleton,byId} from '../content.mjs';
import {
  specialistSceneHtml,
  specialistConditionHtml,
  specialistDependencyHtml,
  specialistEntryHtml,
  isLegacyWriterAction
} from '../specialist-ui.mjs';

const snapshots=JSON.parse(await readFile(new URL('../../04_operating_model/batch-d/specialist-snapshots.json',import.meta.url),'utf8')).snapshots;

test('three specialist scenarios are promoted while the journey retains exactly 15 stable IDs',()=>{
 assert.equal(scenes.length+skeleton.length,15);
 for(const id of ['SCN-CONFLICTS','SCN-CREDIT','SCN-LEGAL']){
  const scene=byId(id);assert.equal(scene.skeleton,undefined,id);assert.equal(scene.source,'SRC-019');assert.match(scene.process,/M1|C1|C2/);
  assert.ok(scene.current['zh-CN']);assert.ok(scene.target['en-AU']);
 }
});

test('D1 and D5 render all three specialist domains without inventing scenario IDs',()=>{
 const projection=specialistProjection(snapshots['D-entry'],{role:'ROLE-FACILITATOR'});
 for(const beat of ['D1','D5']){
  const html=specialistSceneHtml({scene:'SCN-CONFLICTS',beat,mode:'Target',projection,locale:'en-AU',active:true});
  assert.match(html,new RegExp(`data-d-beat="${beat}"`));
  for(const domain of ['Conflicts','Credit','Legal'])assert.match(html,new RegExp(`>${domain}<`));
  assert.doesNotMatch(html,/SCN-D[1-5]/);
 }
});

test('Condition Detail exposes the complete shared condition contract and dependency routes',()=>{
 const projection=specialistProjection(snapshots['D-entry'],{role:'ROLE-FACILITATOR'});
 const html=specialistConditionHtml({projection,domain:'credit',role:'ROLE-FACILITATOR',locale:'en-AU',agreementRevision:3,rationale:'',active:true});
 for(const label of ['Applicability','Condition state','Blocking scope','Owner','Revision','Why','Waiting for','Dependencies','Decision references','Evidence references','Last changed','Active work'])assert.match(html,new RegExp(label));
 for(const domain of ['conflicts','credit','legal'])assert.match(html,new RegExp(`data-d-condition="${domain}"`));
 assert.match(html,/id="d-role"/);
 assert.match(html,/id="d-rationale"/);
 assert.match(html,/data-action="d-action" data-value="revise_credit"/);
 assert.match(html,/data-action="d-dependency" data-value="DG-D02"/);
 assert.match(html,/data-action="d-dependency" data-value="DG-D03"/);
 assert.doesNotMatch(html,/data-value="(?:approve|execute|clear)"/);
});

test('Credit state distinguishes approved condition, incorporated entry input and stale changed input',()=>{
 const entry=specialistProjection(snapshots['D-entry'],{role:'ROLE-CREDIT'});
 const currentHtml=specialistConditionHtml({projection:entry,domain:'credit',role:'ROLE-CREDIT',locale:'en-AU',agreementRevision:3,active:true});
 assert.match(currentHtml,/Condition approved/);
 assert.match(currentHtml,/Documentation incorporated/);
 assert.match(currentHtml,/Legal execution pending/);
 assert.doesNotMatch(currentHtml,/>Satisfied</);
 const changed=specialistProjection(snapshots['D-credit-changed'],{role:'ROLE-CREDIT'});
 const changedHtml=specialistConditionHtml({projection:changed,domain:'credit',role:'ROLE-CREDIT',locale:'en-AU',agreementRevision:3,active:true});
 assert.match(changedHtml,/Current Credit input awaits incorporation/);
});

test('RM Condition Detail remains useful but never renders restricted conflict detail',()=>{
 const projection=specialistProjection(snapshots['D-entry'],{role:'ROLE-RM'});
 const html=specialistConditionHtml({projection,domain:'conflicts',role:'ROLE-RM',locale:'en-AU',agreementRevision:3,active:true});
 assert.match(html,/Potential relationship conflict requiring specialist review/);
 assert.match(html,/Specialist review pending/);
 assert.doesNotMatch(html,/Synthetic relationship context reserved/);
 assert.doesNotMatch(html,/id="d-rationale"/);
 assert.doesNotMatch(html,/data-action="d-action"/);
});

test('zh-CN Condition Detail translates approved condition prose while retaining stable references',()=>{
 const projection=specialistProjection(snapshots['D-entry'],{role:'ROLE-CREDIT'});
 const html=specialistConditionHtml({projection,domain:'credit',role:'ROLE-CREDIT',locale:'zh-CN',agreementRevision:3,active:true});
 assert.match(html,/信贷条件已批准；文件履行状态单独跟踪/);
 assert.match(html,/签署前纳入文件条件/);
 assert.match(html,/跟踪法务纳入与签署/);
 assert.match(html,/DEMO-CTT-001\/dependency\/d-readiness-credit/);
});

test('Dependency view uses graph fallback and provides an explicit return command',()=>{
 const projection=specialistProjection(snapshots['D-credit-changed'],{role:'ROLE-LEGAL'});
 const html=specialistDependencyHtml({graph:'DG-D02',projection,locale:'zh-CN',focus:'D02-REVISION',playing:false});
 assert.match(html,/class="d-workspace/);
 assert.match(html,/data-action="d-dependency-back"/);
 assert.match(html,/data-d-semantic="D02-ASSESS"/);
 assert.match(html,/data-d-semantic="D02-EXECUTION"/);
 assert.match(html,/旧输入已被取代|已过期/);
});

test('D session writer guard blocks every upstream writer family but not presentation or D commands',()=>{
 for(const action of ['batch-start','batch-action','case-action','c-start','c-demo','c-action','collab-init','collab-action','collab-auth','save'])assert.equal(isLegacyWriterAction(action),true,action);
 for(const action of ['scene','continue','reference-scene','mode','d-start','d-restore','d-action','d-dependency','d-dependency-back'])assert.equal(isLegacyWriterAction(action),false,action);
});

test('failed D load renders an accessible retry surface',()=>{
 const html=specialistEntryHtml({locale:'en-AU',error:'The authored D entry could not be loaded. [D_SNAPSHOT_UNAVAILABLE]'});
 assert.match(html,/role="alert"/);
 assert.match(html,/D_SNAPSHOT_UNAVAILABLE/);
 assert.match(html,/data-action="d-start"/);
 assert.doesNotMatch(html,/data-action="d-start"[^>]*disabled/);
});

test('zh-CN D1 and D5 translate approved summary and readiness prose in screen and print',()=>{
 const projection=specialistProjection(snapshots['D-entry'],{role:'ROLE-FACILITATOR'});
 for(const print of [false,true]){
  const d1=specialistSceneHtml({scene:'SCN-CONFLICTS',beat:'D1',projection,locale:'zh-CN',active:true,print});
  assert.match(d1,/专业复核尚未完成/);
  assert.match(d1,/信贷条件已批准；文件履行状态单独跟踪/);
  assert.match(d1,/内部已批准；等待签署/);
  const d5=specialistSceneHtml({scene:'SCN-READINESS',beat:'D5',projection,locale:'zh-CN',active:true,print});
  const d3=specialistSceneHtml({scene:'SCN-CREDIT',beat:'D3',projection,locale:'zh-CN',active:true,print});
  assert.match(d5,/等待专业复核/);
  assert.match(d5,/签署前纳入文件条件/);
  assert.match(d5,/经验证的签署权限/);
  for(const html of [d1,d3,d5])assert.match(html,/已批准但附带条件/);
  assert.doesNotMatch(`${d1}${d3}${d5}`,/approved_subject_to_condition|approved subject to condition|Specialist review outstanding|Credit condition approved|Internally approved; execution pending|Validated signatory authority/);
 }
});
