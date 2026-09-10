import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {scenarioMappings} from '../studio-next/scenario-mapping.mjs';
import {
  normalizeStudioDimension,
  studioDimensionFrame,
  studioDimensions,
} from '../studio-next/studio-dimensions.mjs';
import {shouldInstallLocaleControl} from '../i18n/control-policy.mjs';

test('the journey toolbar exposes the scoreboard as a third dimension', () => {
  assert.deepEqual(studioDimensions.map(dimension => dimension.id), [
    'cj',
    'hero',
    'scoreboard',
  ]);
  assert.equal(normalizeStudioDimension('scoreboard'), 'scoreboard');
  assert.equal(normalizeStudioDimension('unknown'), 'cj');
});

test('each dimension resolves inside the studio and the scoreboard uses the workshop app', () => {
  assert.deepEqual(studioDimensionFrame('cj'), {
    title: 'Interactive target journey',
    src: './studio-next/target-journey.html',
    kind: 'journey',
  });
  assert.deepEqual(studioDimensionFrame('hero'), {
    title: 'Interactive hero case',
    src: './studio-next/hero-journey.html',
    kind: 'journey',
  });
  assert.deepEqual(studioDimensionFrame('scoreboard'), {
    title: 'Scenario scoreboard',
    src: './workshop/index.html',
    kind: 'scoreboard',
  });
});

test('the scoreboard scores the same 15 scenarios used by scenario mapping', () => {
  const html = readFileSync(new URL('../workshop/index.html', import.meta.url), 'utf8');
  const scenarioBlock = html.slice(
    html.indexOf('const SCENARIOS=['),
    html.indexOf('const BUNDLES='),
  );
  const scoreboardIds = [...scenarioBlock.matchAll(/\{id:"(SCN-[A-Z-]+)"/g)].map(match => match[1]);
  assert.equal(scoreboardIds.length, 15);
  assert.deepEqual(scoreboardIds, scenarioMappings.map(scenario => scenario.id));
});

test('the embedded scoreboard removes its duplicate internal navigation', () => {
  const extension = readFileSync(new URL('../workshop/extension.js', import.meta.url), 'utf8');
  assert.match(extension, /embedded.*returnNav\.remove\(\)/);
});

test('the embedded scoreboard follows the Studio locale without its own selector', () => {
  assert.equal(shouldInstallLocaleControl('?embedded=studio&locale=en-US'), false);
  assert.equal(shouldInstallLocaleControl('?locale=zh-CN'), true);
});

test('the scoreboard theme uses the Demo portal visual tokens', () => {
  const theme = readFileSync(new URL('../workshop/theme.css', import.meta.url), 'utf8');
  assert.match(theme, /--navy:\s*#171f31/);
  assert.match(theme, /--amber:\s*#f0ad2e/);
  assert.match(theme, /--font-display:/);
  assert.match(theme, /body\s*\{[^}]*background:\s*#f4f5f8/s);
});

test('the scoreboard presents S1-S15 and explains the Hero case label', () => {
  const extension = readFileSync(new URL('../workshop/extension.js', import.meta.url), 'utf8');
  assert.match(extension, /s\.number=`S\$\{index\+1\}`/);
  assert.match(extension, /applyScenarioLabels/);
  assert.match(extension, /All 15 scenarios make up the Hero case story/);
  assert.match(extension, /Included in the Hero case story/);
});
