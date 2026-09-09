import test from 'node:test';import assert from 'node:assert/strict';
import {temporalProjection,estimateProjection,formatInstant,TIME_DEMO} from '../../product-experience/temporal.mjs';
test('D5U-08 independent Sydney residence oracle totals five hours, not five hours human work',()=>{
 const before=structuredClone(TIME_DEMO),p=temporalProjection(TIME_DEMO);
 assert.equal(p.elapsed_hours,5);assert.equal(p.residence_hours.queued,.5);assert.equal(p.residence_hours.in_progress,.5);assert.equal(p.residence_hours.waiting,4);assert.equal(p.human_active_effort_hours,null);assert.deepEqual(TIME_DEMO,before);
});
test('D5U-07 missing event time does not become page-open time',()=>{
 const p=temporalProjection({events:[{kind:'entered_queue',at:null}],as_of:'2026-09-07T04:00:00Z'});
 assert.equal(p.entered_at,null);assert.equal(p.started_at,null);assert.equal(p.waiting_since,null);assert.equal(p.elapsed_hours,null);
});
test('D5U-29 finished historical work does not accumulate today waiting',()=>{
 const events=[{kind:'entered_queue',at:'2026-09-01T00:00:00Z'},{kind:'waiting_for_client',at:'2026-09-01T01:00:00Z'},{kind:'completed',at:'2026-09-01T03:00:00Z'}];
 const p=temporalProjection({events,as_of:'2026-09-08T00:00:00Z',historical_as_of:'2026-09-01T04:00:00Z'});
 assert.equal(p.elapsed_hours,3);assert.equal(p.residence_hours.waiting,2);assert.equal(p.waiting_since,null);
});
test('D5U-11 localisation changes formatting, not Sydney timestamps or calendar',()=>{
 const original=structuredClone(TIME_DEMO);for(const locale of ['en-AU','en-US','zh-CN'])assert.match(formatInstant('2026-09-07T04:00:00Z',locale,'Australia/Sydney'),/Australia\/Sydney/);
 assert.deepEqual(TIME_DEMO,original);assert.equal(estimateProjection(TIME_DEMO.estimate).calendar_finish,null);
});
test('D5U-33 internal, stale and unreviewed estimates cannot become client commitments',()=>{
 const basis={lower:1,upper:2,source_ref:'approved-estimate',client_communication_allowed:true,review_status:'reviewed',freshness:'current',source_kind:'reviewed_local_configuration'};
 assert.equal(estimateProjection({...basis,source_kind:'synthetic_demo_configuration'}).client_communication_allowed,false);
 assert.equal(estimateProjection({...basis,freshness:'stale'}).client_communication_allowed,false);
 assert.equal(estimateProjection({...basis,review_status:'draft'}).client_communication_allowed,false);
 assert.equal(estimateProjection({...basis,client_communication_allowed:false}).client_communication_allowed,false);
});
