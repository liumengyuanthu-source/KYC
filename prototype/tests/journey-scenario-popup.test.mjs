import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {scenarioMappings, getSourceDetail} from '../studio-next/scenario-mapping.mjs';
import {scenariosForNode, scenarioPopupHtml, scenarioCtaHtml} from '../studio-next/journey-scenario-popup.mjs';

test('every authored CJ and Hero node has a valid preview and all 15 scenarios are reachable', () => {
  const reachable = new Set();
  for (const file of ['target-journey.html','hero-journey.html']) {
    const html = readFileSync(new URL(`../studio-next/${file}`, import.meta.url),'utf8');
    const ids = [...new Set([...html.matchAll(/data-node-id="([a-z][a-z-]+)"/g)].map(m=>m[1]))];
    assert.ok(ids.length > 0, `${file}: no authored nodes found`);
    for (const id of ids) {
      const scenes = scenariosForNode(id);
      assert.ok(scenes.length > 0, `${file}: ${id} has no preview`);
      for (const s of scenes) reachable.add(s.id);
    }
  }
  assert.deepEqual([...reachable].sort(),scenarioMappings.map(s=>s.id).sort());
  assert.deepEqual(scenariosForNode('unknown'),[]);
});

test('all popup source chips preserve exact primary/related membership from the guideline', () => {
  for (const s of scenarioMappings) {
    const html = scenarioPopupHtml(s.id);
    const chips = [...html.matchAll(/data-jsp-source="([MC]\d+\.\d+)" data-source-role="(primary|related)"/g)];
    for (const role of ['primary','related']) {
      assert.deepEqual(chips.filter(m=>m[2]===role).map(m=>m[1]),s[role],`${s.id} ${role}`);
    }
    assert.match(html,new RegExp(`data-scenario-id="${s.id}"`));
    assert.ok(html.includes('Mapping notes'));
  }
  assert.equal(scenarioPopupHtml('unknown'),'');
});

test('shared canvas nodes offer distinct scenarios without combining source ownership', () => {
  assert.deepEqual(scenariosForNode('readiness').map(s=>s.id),['SCN-READINESS','SCN-PUBLISH']);
  assert.deepEqual(scenariosForNode('intake').map(s=>s.id),['SCN-SCOPE','SCN-ENTITY']);
  const readiness = scenarioPopupHtml('SCN-READINESS');
  assert.match(readiness,/data-jsp-source="M8\.3" data-source-role="related"/);
  assert.match(scenarioPopupHtml('SCN-PUBLISH'),/data-jsp-source="M8\.3" data-source-role="primary"/);
  assert.match(scenarioPopupHtml('SCN-LEGAL'),/data-jsp-source="C2\.7" data-source-role="related"/);
});

test('M0.1 preview source data retains separate Target occurrences and the ambiguity note', () => {
  const s = getSourceDetail(scenariosForNode('trigger')[0].id,'M0.1');
  const target = s.occurrences.filter(o=>o.page==='p2');
  assert.equal(target.length,2);
  assert.notEqual(target[0].locator,target[1].locator);
  assert.match(s.note,/Initiation relationship/);
  assert.match(s.note,/Determine sales location/);
});


test('S1 opens the existing M0.1 sample in a separate tab under root and GitHub project paths', () => {
  const html = scenarioCtaHtml('SCN-SCOPE');
  assert.match(html, /^<a /);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  const href = html.match(/href="([^"]+)"/)[1];
  for (const prefix of ['', '/KYC']) {
    for (const view of ['target', 'hero']) {
      const destination = new URL(href, `https://example.com${prefix}/prototype/studio-next/${view}-journey.html`);
      assert.equal(destination.pathname, `${prefix}/prototype/scenario-samples/m0-1/index.html`);
    }
  }
  const sample = readFileSync(new URL(href, new URL('../studio-next/target-journey.html', import.meta.url)), 'utf8');
  assert.match(sample, /Scenario M0\.1 - Sales location &amp; booking entity/);
});

test('unimplemented workshops keep their own scenario detail instead of opening the S1 sample', () => {
  for (const scenario of scenarioMappings.filter(s => s.id !== 'SCN-SCOPE')) {
    const html = scenarioCtaHtml(scenario.id);
    assert.match(html, /^<button /);
    assert.ok(html.includes(`data-scenario-id="${scenario.id}"`));
    assert.doesNotMatch(html, /m0-1/);
  }
  assert.equal(scenarioCtaHtml('unknown'), '');
});
