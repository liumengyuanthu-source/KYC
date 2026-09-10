import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../shared/scenario-progress.js', import.meta.url),'utf8');

function fakeStorage(initial={}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem:key => values.has(key) ? values.get(key) : null,
    setItem:(key,value) => values.set(key,String(value)),
  };
}

function loadApi() {
  const context = {globalThis:{}};
  vm.runInNewContext(source,context);
  return context.globalThis.CTTScenarioProgress;
}

test('shared scenario progress records step changes and completion', () => {
  const api = loadApi();
  const storage = fakeStorage();
  api.record(storage,{scenarioId:'SCN-SCOPE',scenarioNumber:'S1',subprocess:'M0.1',step:1,total:6});
  assert.deepEqual({...api.get(storage,'SCN-SCOPE')},{
    scenarioId:'SCN-SCOPE',scenarioNumber:'S1',subprocess:'M0.1',step:1,total:6,completed:false,
  });
  api.record(storage,{scenarioId:'SCN-SCOPE',scenarioNumber:'S1',subprocess:'M0.1',step:6,total:6,completed:true});
  assert.equal(api.get(storage,'SCN-SCOPE').completed,true);
});

test('shared scenario progress safely ignores malformed storage', () => {
  const api = loadApi();
  const storage = fakeStorage({[api.KEY]:'not json'});
  assert.deepEqual({...api.read(storage)},{});
});

test('M0.1 wizard publishes navigation and completion while showing separate step progress', () => {
  const app = readFileSync(new URL('../scenario-samples/m0-1-v2/app.js', import.meta.url),'utf8');
  assert.match(app,/history\.replaceState\(null,'',`#\$\{S\.step\+1\}`\)/);
  assert.match(app,/publishScenarioProgress\(true\)/);
  assert.match(app,/aria-label="Scenario workshop progress"/);
  assert.match(app,/Step \$\{currentStep\} \/ \$\{STEPS\.length\}/);
});

test('M0.1 workshop keeps a persistent return path to the Customer Journey', () => {
  const html = readFileSync(new URL('../scenario-samples/m0-1-v2/index.html', import.meta.url),'utf8');
  assert.match(html,/id="backJourney"/);
  assert.match(html,/href="\.\.\/\.\.\/index\.html\?[^"#]*dimension=cj/);
  assert.match(html,/Back to Customer Journey/);
  const app = readFileSync(new URL('../scenario-samples/m0-1-v2/app.js', import.meta.url),'utf8');
  assert.match(app,/prepareJourneyReturn\(\)/);
  assert.match(app,/localStorage\.setItem\(LS_KEY,JSON\.stringify\(S\)\)/);
});
