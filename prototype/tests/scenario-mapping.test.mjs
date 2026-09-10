import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

// These protect source role separation, shared IDs and lossless source instances.
const api = await import('../studio-next/scenario-mapping.mjs').catch(e => {
  if (e.code === 'ERR_MODULE_NOT_FOUND') return {};
  throw e;
});

test('scope maps its seven backbone actions separately from risk feedback', () => {
  assert.equal(typeof api.getScenarioMapping, 'function', 'scenario mapping is not available');
  const s = api.getScenarioMapping('SCN-SCOPE');
  assert.deepEqual(s.primary, ['M0.1','M0.2','M0.3','M0.4','M1.1','M1.2','M1.3']);
  assert.deepEqual(s.related, ['M2.4']);
  assert.equal(api.getScenarioMapping('unknown'), null);
});

test('credit and legal resolve by stable identity and retain directional handoffs', () => {
  assert.equal(typeof api.getScenarioMapping, 'function');
  const credit = api.getScenarioMapping('SCN-CREDIT');
  const legal = api.getScenarioMapping('SCN-LEGAL');
  assert.equal(credit.number, 'S11');
  assert.equal(legal.number, 'S12');
  assert.ok(credit.primary.includes('C2.7'));
  assert.ok(legal.related.includes('C2.7'));
  assert.ok(!legal.primary.includes('C2.7'));
});

test('source details retain both target M0.1 occurrences without merging by code', () => {
  assert.equal(typeof api.getSourceDetail, 'function');
  const source = api.getSourceDetail('SCN-SCOPE', 'M0.1');
  const target = source.occurrences.filter(o => o.page === 'p2');
  assert.equal(target.length, 2);
  assert.equal(new Set(target.map(o => o.locator)).size, 2);
});

test('user-facing source descriptions omit internal PowerPoint shape locators', () => {
  const raw = api.getSourceDetail('SCN-SCOPE', 'M0.1');
  assert.ok(raw.occurrences.some(o => o.shape === 'shape283'), 'exact source locator must remain available internally');
  const html = api.scenarioMappingHtml('SCN-SCOPE');
  assert.doesNotMatch(html, /shape\d+/i);
  assert.doesNotMatch(html, /SRC-\d+/i);
  assert.match(html, /M0\.1/);
  assert.match(html, /SALES \/ RM \(Front Office\)/);
});

test('mapping filter finds the scenario through related anchors as well as its title', () => {
  assert.equal(typeof api.filterScenarioMappings, 'function');
  assert.deepEqual(api.filterScenarioMappings('Resolve', 'C2.7').map(s => s.id), ['SCN-CREDIT','SCN-LEGAL']);
  assert.equal(api.filterScenarioMappings('all', 'nothing matches').length, 0);
});

test('readiness keeps confirmation outside its primary source group', () => {
  assert.equal(typeof api.getScenarioMapping, 'function');
  assert.deepEqual(api.getScenarioMapping('SCN-READINESS').primary, ['M8.1']);
  assert.ok(api.getScenarioMapping('SCN-READINESS').related.includes('M8.3'));
  assert.ok(api.getScenarioMapping('SCN-PUBLISH').primary.includes('M8.3'));
});

test('source drilldown links to the existing work inside the selected scenario', () => {
  const detail = api.getSourceDetail('SCN-SCOPE', 'M0.1');
  assert.ok(detail.workItems?.some(w => w.id === 'D3-SCOPE-01'));
  assert.ok(detail.workItems.every(w => w.id.startsWith('D3-SCOPE-')));
});

test('the customer journey can render a collapsed S1-S15 source index', () => {
  assert.equal(typeof api.scenarioSourceIndexHtml, 'function');
  const html = api.scenarioSourceIndexHtml();
  assert.match(html, /^<details class="sm-scenario-index-fold"/);
  assert.doesNotMatch(html, /^<details[^>]+open/);
  assert.equal([...html.matchAll(/data-scenario-id="SCN-[A-Z-]+"/g)].length, 15);
  assert.match(html, />S1</);
  assert.match(html, /M0\.1/);
  assert.match(html, /Primary source steps/);
  assert.match(html, /Related sources/);

  const ui = readFileSync(new URL('../studio-next/ui.mjs', import.meta.url), 'utf8');
  assert.match(ui, /state\.dimension==='cj'\?scenarioSourceIndexHtml\(\):''/);
});

test('the source index explains the four-level journey-process-scenario-action mapping', () => {
  assert.equal(typeof api.scenarioJourneyProcessMatrixHtml, 'function');
  const html = api.scenarioJourneyProcessMatrixHtml();
  assert.equal([...html.matchAll(/data-four-level-scenario="SCN-[A-Z-]+"/g)].length, 15);
  assert.match(html, /Customer journey/);
  assert.match(html, /Process group/);
  assert.match(html, /Scenario/);
  assert.match(html, /Source actions/);
  const s1 = html.match(/data-four-level-scenario="SCN-SCOPE"[\s\S]*?<\/tr>/)?.[0] || '';
  assert.match(s1, /Initiate/);
  assert.match(s1, /M0/);
  assert.match(s1, /M1/);
  assert.match(s1, /M0\.1/);
  assert.match(s1, /M2\.4/);
  assert.match(s1, /Primary/);
  assert.match(s1, /Related/);
});
