import test from 'node:test';
import assert from 'node:assert/strict';
import {initialNavigation,navigate,leaveGuard,dialogScrollKey,route} from '../navigation.mjs';
test('Current scene returns from Target product without overwriting latest language or case revision',()=>{
 let n=initialNavigation();
 n=navigate(n,{type:'COMPARE',value:'current'});
 n=navigate(n,{type:'CAMERA',anchor:'SCN-MATCH',offset:73,stage:'S3'});
 n=navigate(n,{type:'SCENE',id:'SCN-MATCH',stage:'S3'});
 n=navigate(n,{type:'PRODUCT',step:'screening'});
 assert.equal(n.page,'product'); assert.equal(n.comparison,'target');
 n=navigate(n,{type:'LOCALE',value:'zh-CN'});
 n=navigate(n,{type:'RETURN',destination:'scenario'});
 assert.equal(n.comparison,'current'); assert.equal(n.locale,'zh-CN');
 assert.equal(n.scenario,'SCN-MATCH'); assert.equal(n.camera.offset,73);
 assert.equal(n.modal,true);
});
test('Journey return closes modal but preserves role and semantic camera',()=>{
 let n=initialNavigation(); n=navigate(n,{type:'ROLE',value:'ROLE-CASEMGR'});
 n=navigate(n,{type:'CAMERA',anchor:'SCN-GAP',offset:109,stage:'S2'});
 n=navigate(n,{type:'SCENE',id:'SCN-GAP',stage:'S2'});
 n=navigate(n,{type:'PRODUCT',step:'gaps'});
 n=navigate(n,{type:'RETURN',destination:'journey'});
 assert.equal(n.page,'studio'); assert.equal(n.modal,false);
 assert.equal(n.role,'ROLE-CASEMGR'); assert.equal(n.camera.anchor,'SCN-GAP');
});
test('Explore does not consume story cursor; Continue advances curated route only',()=>{
 let n=initialNavigation(); n=navigate(n,{type:'MODE',value:'explore'});
 n=navigate(n,{type:'SCENE',id:'SCN-READINESS',stage:'S5'});
 assert.equal(n.storyCursor,0);
 n=navigate(n,{type:'CONTINUE'});
 assert.equal(n.scenario,'SCN-ENTITY'); assert.equal(n.storyCursor,1);
});
test('Comparison and language changes keep scene and semantic anchor',()=>{
 let n=navigate(initialNavigation(),{type:'SCENE',id:'SCN-VALIDATE',stage:'S2'});
 n=navigate(n,{type:'COMPARE',value:'current'}); n=navigate(n,{type:'LOCALE',value:'en-US'});
 assert.equal(n.scenario,'SCN-VALIDATE'); assert.equal(n.modal,true); assert.equal(n.locale,'en-US');
});
test('Save, discard and stay have different leave semantics',()=>{
 assert.equal(leaveGuard(true,null),'prompt'); assert.equal(leaveGuard(true,'stay'),'stay');
 assert.equal(leaveGuard(true,'save'),'save-and-leave'); assert.equal(leaveGuard(true,'discard'),'discard-and-leave');
 assert.equal(leaveGuard(false,null),'leave');
});
test('Batch C product and reference layers preserve the exact Current scene origin',()=>{
 let n=initialNavigation();
 n=navigate(n,{type:'COMPARE',value:'current'});
 n=navigate(n,{type:'SCENE',id:'SCN-MATCH',stage:'S3'});
 n.graph={scene:'SCN-MATCH',focus:'M04',branch:'information_gap'};
 n=navigate(n,{type:'PRODUCT',step:'screening-evidence',scopeRevision:3});
 n.productScroll=420;
 n=navigate(n,{type:'REFERENCE',scene:'SCN-MATCH',node:'M04',selected:'SRC-016:R-C01'});
 assert.equal(n.reference.origin.node,'M04');
 n=navigate(n,{type:'LOCALE',value:'zh-CN'});
 n=navigate(n,{type:'REFERENCE_CLOSE'});
 assert.equal(n.page,'product');assert.equal(n.step,'screening-evidence');assert.equal(n.productScroll,420);
 n=navigate(n,{type:'RETURN',destination:'scenario'});
 assert.equal(n.page,'studio');assert.equal(n.modal,true);assert.equal(n.scenario,'SCN-MATCH');
 assert.equal(n.comparison,'current');assert.equal(n.locale,'zh-CN');assert.equal(n.graph.focus,'M04');
});
test('global References retains an explicit all-library scope and All clears node filters',()=>{
 let n=navigate(initialNavigation(),{type:'SCENE',id:'SCN-MATCH',stage:'S3'});
 n=navigate(n,{type:'REFERENCE',scene:null,node:null});
 assert.equal(n.reference.scene,null);assert.equal(n.reference.node,null);
 n=navigate(n,{type:'REFERENCE_FILTER',scene:'SCN-MATCH',node:'M03'});
 assert.equal(n.reference.node,'M03');
 n=navigate(n,{type:'REFERENCE_FILTER',scene:null,node:null,kind:null,query:'',selected:null});
 assert.equal(n.reference.scene,null);assert.equal(n.reference.node,null);
});
test('scene and Reference dialogs use distinct scroll keys for the same scene',()=>{
 const scene={...initialNavigation(),scenario:'SCN-MATCH',modal:true};
 const reference=navigate(scene,{type:'REFERENCE',scene:'SCN-MATCH',node:'M03'});
 assert.equal(dialogScrollKey(scene),'scene:SCN-MATCH');
 assert.equal(dialogScrollKey(reference),'reference:SCN-MATCH:M03');
});

test('story route presents D1-D5 after the screening slice without adding scenario IDs',()=>{
 assert.deepEqual(route.slice(-5),['SCN-CONFLICTS','SCN-CONFLICTS','SCN-CREDIT','SCN-LEGAL','SCN-READINESS']);
 let n={...initialNavigation(),storyCursor:8,scenario:'SCN-EDD'};
 const want=[['D1','SCN-CONFLICTS'],['D2','SCN-CONFLICTS'],['D3','SCN-CREDIT'],['D4','SCN-LEGAL'],['D5','SCN-READINESS']];
 for(const [beat,scenario] of want){n=navigate(n,{type:'CONTINUE'});assert.equal(n.specialistBeat,beat);assert.equal(n.scenario,scenario);}
});

test('dependency return restores condition, revision and viewport context while latest locale wins',()=>{
 let n=navigate(initialNavigation(),{type:'SCENE',id:'SCN-LEGAL',stage:'S4'});
 n=navigate(n,{type:'PRODUCT',step:'condition',scopeRevision:3});
 n=navigate(n,{type:'D_CONDITION',domain:'legal',agreementRevision:3});
 n.camera={anchor:'SCN-LEGAL',offset:117};n.zoom='focus';n.productScroll=640;
 n=navigate(n,{type:'D_DEPENDENCY',graph:'DG-D02'});
 assert.equal(n.dependency.graph,'DG-D02');
 n=navigate(n,{type:'LOCALE',value:'zh-CN'});
 n=navigate(n,{type:'D_DEPENDENCY_BACK'});
 assert.equal(n.page,'product');assert.equal(n.step,'condition');assert.equal(n.conditionDomain,'legal');
 assert.equal(n.agreementRevision,3);assert.equal(n.camera.offset,117);assert.equal(n.zoom,'focus');assert.equal(n.productScroll,640);
 assert.equal(n.locale,'zh-CN');assert.equal(n.dependency,null);
});

test('selected agreement revision stays frozen when live data revision is reported separately',()=>{
 let n=navigate(initialNavigation(),{type:'D_CONDITION',domain:'legal',agreementRevision:3});
 n=navigate(n,{type:'D_DATA_REVISION',caseRevision:36,agreementRevision:4});
 assert.equal(n.agreementRevision,3);
 assert.equal(n.liveAgreementRevision,4);
 assert.equal(n.liveCaseRevision,36);
});

test('specialist scene and beat navigation synchronize the rendered graph family without losing same-family focus',()=>{
 let n=initialNavigation();
 n=navigate(n,{type:'SCENE',id:'SCN-CREDIT',stage:'S4'});
 assert.equal(n.specialistBeat,'D3');assert.equal(n.dGraph.graph,'DG-D02');assert.equal(n.dGraph.focus,null);
 n.dGraph={graph:'DG-D02',focus:'D02-INPUT',cursor:3,playing:false};
 n=navigate(n,{type:'D_BEAT',beat:'D4'});
 assert.equal(n.dGraph.graph,'DG-D02');assert.equal(n.dGraph.focus,'D02-INPUT');
 n=navigate(n,{type:'D_BEAT',beat:'D5'});
 assert.deepEqual(n.dGraph,{graph:'DG-D03',focus:null,cursor:0,playing:false});
 n=navigate(n,{type:'REFERENCE',scene:'SCN-READINESS',node:'D03-UNKNOWN'});
 n=navigate(n,{type:'LOCALE',value:'zh-CN'});
 n=navigate(n,{type:'REFERENCE_CLOSE'});
 assert.equal(n.dGraph.graph,'DG-D03');assert.equal(n.locale,'zh-CN');
 n=navigate(n,{type:'D_BEAT',beat:'D1'});
 assert.deepEqual(n.dGraph,{graph:'DG-D01',focus:null,cursor:0,playing:false});
});
