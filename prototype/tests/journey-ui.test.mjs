import test from 'node:test';
import assert from 'node:assert/strict';
import {initialNavigation,navigate,dialogScrollKey} from '../navigation.mjs';
import {activities,journeyRoles} from '../journey/model.mjs';

test('Journey viewpoint changes content without changing product authority',()=>{
 const base=initialNavigation();
 for(const role of journeyRoles){const next=navigate(base,{type:'JOURNEY_ROLE',value:role.id});assert.equal(next.journeyRole,role.id);assert.equal(next.role,base.role);}
 assert.deepEqual(navigate(base,{type:'JOURNEY_ROLE',value:'admin'}),base);
});
test('Current to Target keeps activity, process, lens and camera',()=>{
 let n=navigate(initialNavigation(),{type:'JOURNEY_ROLE',value:'ROLE-CLIENT'});
 n=navigate(n,{type:'CAMERA',anchor:'M3',offset:83});
 n=navigate(n,{type:'JOURNEY_ACTIVITY',id:'client-respond'});
 n=navigate(n,{type:'COMPARE',value:'current'});
 const after=navigate(n,{type:'COMPARE',value:'target'});
 assert.equal(after.journeyActivity,'client-respond');assert.equal(after.journeyProcess,'M3');assert.equal(after.journeyRole,'ROLE-CLIENT');assert.deepEqual(after.camera,n.camera);
 assert.match(dialogScrollKey(after),/client-respond/);
});
test('Activity detail to Product to Return restores exact Current origin with newest locale',()=>{
 let n=navigate(initialNavigation(),{type:'JOURNEY_ROLE',value:'ROLE-CLIENT'});
 n=navigate(n,{type:'CAMERA',anchor:'M3',offset:77});
 n=navigate(n,{type:'JOURNEY_ACTIVITY',id:'client-respond'});
 n=navigate(n,{type:'COMPARE',value:'current'});
 const origin=structuredClone(n);
 n=navigate(n,{type:'JOURNEY_DETAIL'});assert.equal(n.journeyView,'detail');assert.equal(n.scenario,origin.scenario);
 n=navigate(n,{type:'PRODUCT',step:'gaps'});assert.equal(n.comparison,'target');
 n=navigate(n,{type:'LOCALE',value:'en-US'});
 n=navigate(n,{type:'RETURN',destination:'scenario'});
 for(const key of ['journeyActivity','journeyProcess','journeyRole','comparison','role'])assert.equal(n[key],origin[key]);
 assert.deepEqual(n.camera,origin.camera);assert.equal(n.locale,'en-US');assert.equal(n.journeyView,'activity');
});
test('All roles activity open and close retains All roles and ignores invalid IDs',()=>{
 const all=navigate(initialNavigation(),{type:'JOURNEY_ROLE',value:'all'});
 const open=navigate(all,{type:'JOURNEY_ACTIVITY',id:'legal-execute'});
 assert.equal(open.journeyRole,'all');assert.equal(navigate(open,{type:'DIALOG_ESCAPE'}).modal,false);
 for(const id of ['',null,'bad'])assert.deepEqual(navigate(all,{type:'JOURNEY_ACTIVITY',id}),all);
 assert.deepEqual(navigate(all,{type:'JOURNEY_PROCESS',value:'M99'}),all);
});
test('Selecting processes has distinct semantic anchors; story transitions clear activity presentation',()=>{
 const n=navigate(initialNavigation(),{type:'JOURNEY_PROCESS',value:'M1'});
 assert.deepEqual(n.camera,{anchor:'M1',offset:0});assert.equal(n.journeyProcess,'M1');
 const open=navigate(n,{type:'JOURNEY_ACTIVITY',id:'ops-triage'});
 for(const a of [{type:'CONTINUE'},{type:'RESUME'},{type:'PREVIOUS'},{type:'SCENE',id:'SCN-EDD'},{type:'D_BEAT',beat:'D3'},{type:'E_BEAT',beat:'E1'}]){
  const next=navigate(open,a);assert.equal(next.journeyActivity,null);assert.equal(next.journeyView,null);
 }
});
test('Renderer has exact role entries and full print preserves all comparisons and source pains',async()=>{
 const {journeyHtml,activityHtml,journeyPrintHtml}=await import('../journey/ui.mjs');
 for(const role of journeyRoles){const nav={...initialNavigation(),journeyRole:role.id};const html=journeyHtml(nav);for(const a of activities)assert.equal(html.includes(`data-value="${a.id}"`),a.role===role.id);}
 const nav={...initialNavigation(),journeyRole:'ROLE-CLIENT',locale:'zh-CN'};
 const html=journeyPrintHtml(nav);for(const a of activities)assert.ok(html.includes(`data-activity="${a.id}"`));
 assert.match(html,/Current/);assert.match(html,/Target/);assert.match(html,/持续监控|持续监测/);assert.match(html,/退出|终止/);
 const modal=activityHtml(activities[0],nav);assert.match(modal,/journey-detail/);assert.doesNotMatch(modal,/contextual:M/);assert.match(modal,/未编号|原图未编号/);
});
test('Explicit Journey entry resets competing presentation without changing actor or saved session context',()=>{
 const n={...initialNavigation(),page:'product',mode:'print',studioPage:'operating-model',modal:true,reference:{scene:'SCN-MATCH'},journeyPrint:'activity',journeyView:'activity',role:'ROLE-RM',journeyRole:'ROLE-QA',camera:{anchor:'M6',offset:41},returnToken:{scenario:'SCN-MATCH'}};
 const next=navigate(n,{type:'JOURNEY_OPEN'});
 assert.equal(next.page,'studio');assert.equal(next.mode,'explore');assert.equal(next.studioPage,null);assert.equal(next.modal,false);assert.equal(next.reference,null);assert.equal(next.journeyPrint,null);
 assert.equal(next.role,n.role);assert.equal(next.journeyRole,n.journeyRole);assert.deepEqual(next.camera,n.camera);assert.deepEqual(next.returnToken,n.returnToken);
});
test('Shared print scope selects all Journey activities or the open role activity without mutating origin',async()=>{
 const {journeyPrintScope}=await import('../navigation.mjs');
 let origin=navigate(initialNavigation(),{type:'JOURNEY_ACTIVITY',id:'client-respond'});
 origin={...origin,comparison:'current',locale:'zh-CN',camera:{anchor:'M3',offset:73}};
 const snapshot=structuredClone(origin);
 assert.equal(journeyPrintScope(origin),'activity');
 const closed=navigate(origin,{type:'CLOSE'});
 assert.equal(journeyPrintScope(closed),'all');
 for(const scenario of ['SCN-QA','SCN-PUBLISH','SCN-GAP','SCN-LEGAL'])assert.equal(journeyPrintScope({...closed,scenario}),'all');
 assert.deepEqual(origin,snapshot);
});
test('Shared print scope leaves Product and specialized Studio/detail routes intact',async()=>{
 const {journeyPrintScope}=await import('../navigation.mjs');
 const origin=navigate(initialNavigation(),{type:'JOURNEY_ACTIVITY',id:'client-respond'});
 for(const nav of [
  {...origin,page:'product',modal:false,step:'clearance'},
  {...origin,page:'product',modal:false,step:'screening'},
  {...origin,studioPage:'operating-model',modal:false},
  {...origin,studioPage:'product-definition',modal:false},
  {...origin,journeyView:'detail'},
  {...origin,journeyActivity:'invalid'},
  {...origin,reference:{scene:'SCN-GAP'}},
  {...origin,branchIndex:true},
  {...origin,reconstructionPrint:true},
  navigate(initialNavigation(),{type:'SCENE',id:'SCN-QA'}),
  navigate(initialNavigation(),{type:'SCENE',id:'SCN-GAP'}),
 ])assert.equal(journeyPrintScope(nav),null,JSON.stringify(nav));
});
