import test from 'node:test';
import assert from 'node:assert/strict';
import {specialistGraphHtml,specialistGraphState} from '../specialist-graph.mjs';
test('Graph next/focus/play change presentation only and stop at final node',()=>{
 const before={graph:'DG-D01',focus:null,cursor:0,playing:false},n=specialistGraphState(before,{type:'PLAY'});
 assert.equal(n.playing,true);assert.equal(before.playing,false);assert.equal(n.cursor,0);
 let s=n;for(let i=0;i<9;i++)s=specialistGraphState(s,{type:'NEXT'});
 assert.equal(s.playing,false);assert.equal(s.focus,'D01-READY');
 assert.deepEqual(specialistGraphState(n,{type:'REDUCED_MOTION'}).playing,false);
});
test('Print retains every version node despite focus; input projection cannot be written by renderer',()=>{
 const p={available:true,caseId:'DEMO-CTT-001',revision:35,versionChain:[{id:'CD-01',alias:'CD-01',revision:2,status:'current'}]},before=JSON.stringify(p);
 const html=specialistGraphHtml({graph:'DG-D02',projection:p,locale:'en-AU',focus:'D02-DECISION',print:true});
 for(const id of ['D02-ASSESS','D02-DECISION','D02-CONDITION','D02-INPUT','D02-REVISION','D02-REVIEW','D02-APPROVAL','D02-EXECUTION'])assert.ok(html.includes(`data-d-semantic="${id}"`));
 assert.equal(JSON.stringify(p),before);assert.match(html,/width="\d+/);assert.match(html,/height="\d+/);
});
test('Focused diagram still contains complete semantic fallback when image fails',()=>{
 const html=specialistGraphHtml({graph:'DG-D03',focus:'D03-UNKNOWN',locale:'en-AU'});
 for(const id of ['D03-ISSUE','D03-IMPACT','D03-TASK','D03-BRANCH','D03-CASE','D03-UNKNOWN','D03-AFFECTED','D03-UNAFFECTED','D03-DEPS','D03-RESOLVE'])assert.ok(html.includes(`data-d-semantic="${id}"`),id);
 for(let i=1;i<=13;i++)assert.ok(html.includes(`data-d-edge="D03-E${String(i).padStart(2,'0')}"`));
});
test('Version facts bind by stable record identity even when projection order changes',()=>{
 const projection={available:true,credit:{id:'DEMO-CTT-001/credit-assessment/d-01',decision_ref:'DEMO-CTT-001/decision/d-credit-02'},versionChain:[{id:'DEMO-CTT-001/agreement/d-01',revision:3,status:'superseded',consumed_input_revision:'<img src=x onerror=alert(1)>'},{id:'DEMO-CTT-001/decision/d-credit-02',revision:2,status:'current'}]};
 const html=specialistGraphHtml({graph:'DG-D02',projection});
 const decision=html.match(/<article data-d-semantic="D02-DECISION"[\s\S]*?<\/article>/)[0];
 assert.match(decision,/Current revision: 2/);
 assert.match(decision,/DEMO-CTT-001\/decision\/d-credit-02/);
 assert.doesNotMatch(html,/<img src=x/);
});
test('All three rendered families retain literal mandatory route semantics',()=>{
 const parallel=specialistGraphHtml({graph:'DG-D01'});
 for(const [from,to,label] of [['D01-SCOPE','D01-CONFLICTS','Start condition'],['D01-SCOPE','D01-CREDIT','Start condition'],['D01-SCOPE','D01-KYC','Start condition'],['D01-CREDIT','D01-LEGAL','Version dependency'],['D01-CONFLICTS','D01-READY','Contribution'],['D01-LEGAL','D01-READY','Contribution'],['D01-KYC','D01-READY','Contribution']])assert.ok(parallel.includes(`${from} → ${to}</td><td>${label}`));
 const version=specialistGraphHtml({graph:'DG-D02'});for(const [from,to]of [['ASSESS','DECISION'],['DECISION','CONDITION'],['CONDITION','INPUT'],['INPUT','REVISION'],['REVISION','REVIEW'],['REVIEW','APPROVAL'],['APPROVAL','EXECUTION']])assert.ok(version.includes(`D02-${from} → D02-${to}`));
 const holds=specialistGraphHtml({graph:'DG-D03'});for(const to of ['TASK','BRANCH','CASE','UNKNOWN'])assert.ok(holds.includes(`D03-IMPACT → D03-${to}`));for(const [from,to]of [['TASK','AFFECTED'],['BRANCH','AFFECTED'],['CASE','AFFECTED'],['TASK','UNAFFECTED'],['UNKNOWN','DEPS'],['AFFECTED','RESOLVE'],['UNAFFECTED','RESOLVE'],['DEPS','RESOLVE']])assert.ok(holds.includes(`D03-${from} → D03-${to}`));
});
test('Chinese graph fallback and print localize complete without changing source IDs',()=>{
 for(const print of [false,true]){
  const html=specialistGraphHtml({graph:'DG-D02',locale:'zh-CN',print,projection:{available:true,legal:{review_status:'complete',agreement_revision:3}}});
  const review=html.match(/<article data-d-semantic="D02-REVIEW"[\s\S]*?<\/article>/)[0];
  assert.match(review,/当前版本: 3 · 已完成/);assert.doesNotMatch(review,/· complete/);
 }
});
