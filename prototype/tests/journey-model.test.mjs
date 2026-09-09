import test from 'node:test';
import assert from 'node:assert/strict';

import {
  processes,
  journeyRoles,
  activities,
  pains,
  sourceSteps,
  activityById,
  activitiesFor,
} from '../journey/model.mjs';

test('filters activities by role, process and Current/Target source comparison', () => {
  const legal = activitiesFor({ role: 'ROLE-LEGAL', process: 'C1', comparison: 'target' });
  assert.ok(legal.length >= 2);
  assert.ok(legal.every((item) => item.role === 'ROLE-LEGAL' && item.process === 'C1'));
  assert.ok(legal.every((item) => item.refs.target.length > 0));
  assert.equal(activitiesFor({ role: 'ROLE-CLIENT', process: 'M0', comparison: 'current' }).length, 1);
  assert.equal(activityById('legal-draft-review')?.scene, 'SCN-LEGAL');
});

test('every activity links to a declared process, role and stable shared scenario', () => {
  const processIds = new Set(processes.map(({ id }) => id));
  const roleIds = new Set(journeyRoles.map(({ id }) => id));
  const scenes = new Set(['SCN-SCOPE', 'SCN-ENTITY', 'SCN-REQUIREMENTS', 'SCN-SOURCE', 'SCN-GAP', 'SCN-VALIDATE', 'SCN-POPULATION', 'SCN-MATCH', 'SCN-EDD', 'SCN-CONFLICTS', 'SCN-LEGAL', 'SCN-CREDIT', 'SCN-QA', 'SCN-READINESS', 'SCN-PUBLISH']);
  for (const item of activities) {
    assert.ok(processIds.has(item.process), item.id);
    assert.ok(roleIds.has(item.role), item.id);
    assert.ok(scenes.has(item.scene), item.id);
  }
});

test('all numbered source steps are covered losslessly and all references resolve', () => {
  const sourceKeys = new Set(sourceSteps.map(({ key }) => key));
  const covered = new Set(activities.flatMap(({ refs }) => [...refs.current, ...refs.target]));
  for (const item of sourceSteps.filter(({ number }) => /^(M[0-8]|C[12])\.\d+$/.test(number))) {
    assert.match(item.number, /^(M[0-8]|C[12])\.\d+$/);
    assert.ok(covered.has(item.key), `uncovered ${item.key}`);
  }
  for (const key of covered) assert.ok(sourceKeys.has(key), `unknown ${key}`);
  assert.ok(sourceSteps.some(({ page, number, status }) => page === 2 && number === 'M0.1' && status === 'ambiguous'));
});

test('preserves stable roles, qualified lanes, parallel conflicts and contextual client anchors', () => {
  assert.ok(journeyRoles.some(({ id }) => id === 'ROLE-FINCRIME'));
  assert.ok(journeyRoles.some(({ id }) => id === 'ROLE-CONFLICTS'));
  assert.equal(processes.find(({ id }) => id === 'M7').parallel, true);
  assert.equal(sourceSteps.find(({ key }) => key === 'p2:M2.1').lane, 'Agentic execution');
  assert.equal(sourceSteps.find(({ key }) => key === 'p2:M1.1').lane, 'Sales / RM (Front Office)');
  assert.equal(sourceSteps.find(({ key }) => key === 'p2:M8.5').lane, 'Sales / RM (Front Office)');
  assert.equal(sourceSteps.find(({ key }) => key === 'p2:C2.3').status, 'source');
  assert.equal(sourceSteps.find(({ key }) => key === 'p2:C2.5').status, 'ambiguous');
  assert.ok(sourceSteps.some(({ key, number }) => key === 'p1:client:screening-clarification' && number === 'contextual:M4'));
  assert.ok(activityById('client-screening-clarification').refs.current.length > 0);
});

test('content is localized and activity inputs and outputs are purpose-specific', () => {
  for (const item of [...processes, ...journeyRoles, ...activities, ...pains, ...sourceSteps]) {
    for (const value of Object.values(item)) {
      if (value && typeof value === 'object' && value['en-AU']) assert.notEqual(value['zh-CN'], value['en-AU']);
    }
  }
  assert.equal(new Set(activities.map(({ input }) => input['en-AU'])).size, activities.length);
  assert.equal(new Set(activities.map(({ output }) => output['en-AU'])).size, activities.length);
  assert.ok(activities.some(({ scene }) => scene === 'SCN-VALIDATE'));
});

test('primary UI Chinese is natural content, not a prefix-only English fallback', () => {
  const primary = [
    ...processes.flatMap(({ title }) => [title]),
    ...activities.flatMap(({ title, goal, current, target, input, output, handoff }) => [title, goal, current, target, input, output, handoff]),
    ...pains.flatMap(({ title, description }) => [title, description]),
  ];
  for (const value of primary) {
    assert.doesNotMatch(value['zh-CN'], /^(中文|源文本|来源原文)[:：]/);
    assert.match(value['zh-CN'], /[\u3400-\u9fff]/);
    assert.ok(!value['zh-CN'].includes(value['en-AU']), value['en-AU']);
  }
});

test('retains both Current M3.3 source instances with exact role links', () => {
  const duplicates = sourceSteps.filter(({ page, number }) => page === 1 && number === 'M3.3');
  assert.equal(duplicates.length, 2);
  assert.deepEqual(duplicates.map(({ lane }) => lane).sort(), ['Client Fulfilment / KYC Ops', 'Sales / RM (Front Office)'].sort());
  assert.ok(activityById('rm-request-info').refs.current.includes('p1:M3.3:rm'));
  assert.ok(activityById('ops-gap').refs.current.includes('p1:M3.3'));
  assert.equal(sourceSteps.filter(({ page, number }) => page === 1 && /^(M[0-8]|C[12])\.\d+$/.test(number)).length, 67);
});

test('source titles and notes contain faithful working Chinese', () => {
  for (const item of sourceSteps) {
    for (const value of [item.title, item.note].filter(Boolean)) {
      assert.match(value['zh-CN'], /[\u3400-\u9fff]/);
      assert.doesNotMatch(value['zh-CN'], /^(中文|源文本|来源原文)[:：]/);
      assert.ok(!value['zh-CN'].includes(value['en-AU']));
    }
  }
});

test('representative activities expose correct domain artifacts', () => {
  assert.match(activityById('ops-requirements').input['en-AU'], /Entity A FX forward.*applicability basis/i);
  assert.match(activityById('ops-requirements').output['en-AU'], /versioned.*requirements.*unknowns/i);
  assert.match(activityById('ops-source').output['en-AU'], /reuse candidates.*evidence gaps/i);
  assert.match(activityById('ops-validate').output['en-AU'], /scoped sufficiency assessment/i);
  assert.match(activityById('ops-screen').output['en-AU'], /versioned query population.*results/i);
  assert.match(activityById('qa-signoff').output['en-AU'], /QA sign-off/i);
  assert.match(activityById('legal-execute').output['en-AU'], /executed agreement/i);
  assert.match(activityById('credit-approve').output['en-AU'], /versioned Credit-to-Legal input/i);
  assert.match(activityById('client-respond').output['en-AU'], /submitted information.*not accepted evidence/i);
  assert.match(activityById('control-resolve').output['en-AU'], /scoped conflict decision/i);
});

test('Chinese Current and Target narratives retain source-specific changes and ambiguities', () => {
  assert.match(activityById('legal-draft-review').current['zh-CN'], /起草协议/);
  assert.match(activityById('legal-draft-review').target['zh-CN'], /C1\.3.*起草.*审查/);
  assert.match(activityById('credit-assess').target['zh-CN'], /删除线.*不.*删除|删除线.*尚未确定/);
  assert.match(activityById('rm-submit').target['zh-CN'], /M1\.1.*删除线.*尚未/);
  assert.match(activityById('fcr-edd').target['zh-CN'], /M5\.9.*M5\.10.*人工.*审批/);
  assert.match(activityById('client-outcome').target['zh-CN'], /结果.*后续步骤/);
  assert.match(activityById('ops-clear').input['en-AU'], /Legal.*Credit/);
});

test('Current and Target references are distinct source records', () => {
  for (const item of activities) {
    assert.ok(item.refs.current.every((key) => key.startsWith('p1:')), item.id);
    assert.ok(item.refs.target.every((key) => key.startsWith('p2:')), item.id);
  }
  const legal = activityById('legal-draft-review');
  assert.notDeepEqual(legal.refs.current, legal.refs.target);
  assert.match(sourceSteps.find(({ key }) => key === 'p1:C1.3').title['en-AU'], /^Draft/);
  assert.match(sourceSteps.find(({ key }) => key === 'p2:C1.3').title['en-AU'], /^Review/);
});

test('adjacent pains are retained as source context but excluded from executable work', () => {
  const adjacent = pains.filter(({ scope }) => scope === 'adjacent');
  assert.deepEqual(adjacent.map(({ id }) => id).sort(), ['PAIN-OFFBOARDING', 'PAIN-REPORTING', 'PAIN-MONITORING'].sort());
  const activityPainIds = new Set(activities.flatMap(({ pains }) => pains));
  assert.ok(adjacent.every(({ id }) => !activityPainIds.has(id)));
});

test('every relevant source role has multiple concrete catalog entries', () => {
  for (const role of journeyRoles) {
    assert.ok(activitiesFor({ role: role.id }).length >= 2, role.id);
  }
});
