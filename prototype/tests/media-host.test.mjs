import test from 'node:test';
import assert from 'node:assert/strict';
import {sanitiseSnapshot,previewNavigation,createMediaHost} from '../media-host.mjs';
import {staticMediaStory} from '../media-static.mjs';
import {initialNavigation} from '../navigation.mjs';
import {batchUI} from '../batch-a-ui.mjs';
import {createBatchA} from '../batch-a-engine.mjs';
import {readFileSync} from 'node:fs';
test('host accepts only media fields and never restores playback',()=>{
 const input={asset:'DMO-A01',revision:'r01',time:6,beat:2,playing:true,holdPassed:false,case:{ready:true}};
 assert.deepEqual(sanitiseSnapshot('SCN-SCOPE',input),{asset:'DMO-A01',revision:'r01',time:6,beat:2,holdPassed:false,playing:false});
 assert.equal(input.playing,true);
 assert.equal(sanitiseSnapshot('SCN-ENTITY',input),null);
 assert.equal(sanitiseSnapshot('__proto__',input),null);
 assert.equal(sanitiseSnapshot('SCN-SCOPE',{...input,time:Infinity}),null);
});
test('frozen Entity narrative never replaces latest live receipt or authority',()=>{
 const data=createBatchA(JSON.parse(readFileSync(new URL('../../04_operating_model/round-a/synthetic-case-fixture.json',import.meta.url))));
 data.evidence.push({alias:'EV-A05',receipt_status:'received'});
 data.authorities.find(a=>a.action_type==='coordinate_information').status='established_for_demo';
 const n={...initialNavigation(),scenario:'SCN-ENTITY'},html=batchUI({data,n,L:en=>en,button:()=>''}).scene();
 assert.ok(html.includes('EV-A05: Not received'));assert.ok(html.includes('Received in live session'));
 assert.ok(html.includes('established_for_demo'));assert.ok(!html.includes('EV-A05 has not been received.'));
});
test('host ignores stale async completion and payloads, snapshots pause on stop',async()=>{
 let complete,callback,destroyed=0,paused=0;const writes=[];
 const valid={asset:'DMO-A01',revision:'r01',time:6,beat:2,playing:true,holdPassed:false};
 const el={isConnected:true,dataset:{},parentElement:{querySelector:()=>({open:true})}};
 const h=createMediaHost({read:()=>valid,write:(...x)=>writes.push(x),load:async()=>({mountMedia:async(_,options)=>{callback=options.onChange;await new Promise(r=>complete=r);return {pause(){paused++},destroy(){destroyed++},snapshot:()=>valid}}})});
 const pending=h.mount(el,{scene:'SCN-SCOPE',locale:'en-AU',comparison:'current'});await new Promise(r=>setImmediate(r));
 h.stop();callback(valid);complete();await pending;assert.equal(writes.length,0);assert.equal(destroyed,1);
 const next=h.mount(el,{scene:'SCN-SCOPE',locale:'zh-CN',comparison:'target'});await new Promise(r=>setImmediate(r));complete();await next;
 callback({...valid,case:{ready:true}});h.stop();assert.equal(paused,1);assert.equal(destroyed,2);assert.equal(writes.at(-1)[1].playing,false);assert.ok(!('case' in writes.at(-1)[1]));
});
test('optional module failure leaves readable static fallback open',async()=>{
 const fallback={open:false},el={isConnected:true,dataset:{},parentElement:{querySelector:()=>fallback}};
 const h=createMediaHost({read:()=>null,write:()=>assert.fail('No write on load failure'),load:async()=>{throw Error('blocked')}});
 await h.mount(el,{scene:'SCN-ENTITY',locale:'zh-CN'});assert.equal(fallback.open,true);assert.equal(el.dataset.mediaStatus,'fallback');assert.ok(el.textContent.includes('静态'));
});
test('required resource failure displays notice inside an existing shadow root',async()=>{
 const fallback={open:false},shadowRoot={},el={shadowRoot,isConnected:true,dataset:{},parentElement:{querySelector:()=>fallback}};
 const h=createMediaHost({read:()=>null,write:()=>{},load:async()=>({mountMedia:async()=>{throw Error('Locale blocked after attaching shadow')}})});
 await h.mount(el,{scene:'SCN-ENTITY',locale:'en-US'});assert.match(shadowRoot.textContent,/Player unavailable/);assert.equal(fallback.open,true);
});
test('unpassed A02 hold caps restored time, wrong revision ignored',()=>{
 const x={asset:'DMO-A02',revision:'r01',time:20,beat:5,holdPassed:false};
 assert.equal(sanitiseSnapshot('SCN-ENTITY',x).time,9.5);
 assert.equal(sanitiseSnapshot('SCN-ENTITY',x).beat,3);
 assert.equal(sanitiseSnapshot('SCN-ENTITY',{...x,revision:'future'}),null);
});
test('direct preview changes navigation only; existing case/role/locale preserved',()=>{
 const n={...initialNavigation(),role:'ROLE-RM',locale:'en-US'};
 const out=previewNavigation(n,'SCN-ENTITY');
 assert.equal(out.modal,true);assert.equal(out.scenario,'SCN-ENTITY');assert.equal(out.role,n.role);assert.equal(out.locale,n.locale);
 assert.deepEqual(previewNavigation(n,'<script>'),n);assert.equal(n.modal,false);
});
test('static fallback always contains all 5+6 cues in all locales, with guard facts',()=>{
 for(const locale of ['zh-CN','en-AU','en-US']){
  const html=staticMediaStory('SCN-SCOPE',locale)+staticMediaStory('SCN-ENTITY',locale);
  assert.equal((html.match(/data-media-cue=/g)||[]).length,11);
  for(const s of ['A01-C5','A02-C6','EV-A05','Entity A','Entity B','Person T','FX forward'])assert.ok(html.includes(s),s);
  assert.ok(html.includes(locale==='zh-CN'?'尚未指派':'Unassigned'));
  assert.ok(!html.includes('data-action='));
 }
});
