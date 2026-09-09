import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../diagrams/batch-f/',import.meta.url);
const json=name=>JSON.parse(readFileSync(new URL(name,root),'utf8'));
const manifest=json('manifest.json');
test('F passive diagram manifest retains every typed semantic node in both locales',()=>{
 assert.equal(manifest.readOnly,true);assert.equal(manifest.businessStateWrites,false);
 assert.equal(manifest.localeAliases['en-US'],'en-AU');
 for(const d of manifest.diagrams)for(const locale of ['en-AU','zh-CN']){
  const spec=json(`specs/${d.id}.${locale}.json`);
  assert.deepEqual([...d.steps].sort(),spec.nodes.map(n=>n.id).sort());
  assert.equal(d.fallback[locale].length,d.steps.length);
  if(d.locales[locale]){
   const svg=readFileSync(new URL(d.locales[locale],root),'utf8');
   assert.doesNotMatch(svg,/<script\b|on(?:click|load|error)\s*=/i);
  }
 }
});
test('F four static exports bind to delivered HTML without hiding failed canonical viewport checks',()=>{
 const exports=json('export-receipts.json');assert.equal(exports.length,4);
 for(const item of exports){
  const hash=createHash('sha256').update(readFileSync(new URL(item.name+'.html',root))).digest('hex');
  assert.equal(item.html_sha256,hash);assert.equal(item.state_writes,false);
  const check=json(item.name+'.visual-check.json');
  assert.equal(check.artifact.sha256,hash);assert.equal(check.ok,false);
  assert.ok(check.diagnostics.some(d=>d.code==='viewer/viewport-overflow'));
  assert.match(manifest.diagrams.find(d=>item.name.startsWith(d.id)).status,/standalone_viewer_failed/);
 }
});
test('F dependency graphical failure remains explicit and cannot imply independence',()=>{
 const d=manifest.diagrams.find(d=>d.id==='DG-F02');
 assert.equal(d.status,'failed_semantic_fallback');
 assert.equal(d.locales['en-AU'],null);assert.equal(d.locales['zh-CN'],null);
 assert.match(d.scopeNote,/absent edges never prove independence/);
 for(const locale of ['en-AU','zh-CN']){
  const validation=json(`DG-F02.${locale}.validate.json`);
  assert.equal(validation.exit_code,1);assert.equal(validation.receipt.ok,false);
 }
});
