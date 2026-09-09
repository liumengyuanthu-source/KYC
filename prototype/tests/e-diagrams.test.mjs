import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../diagrams/batch-e/',import.meta.url);
const json=name=>JSON.parse(readFileSync(new URL(name,root),'utf8'));
const manifest=json('manifest.json');
test('E diagram manifest resolves delivered read-only static artifacts and semantic nodes',()=>{
 assert.equal(manifest.businessStateWrites,false);
 assert.equal(manifest.readOnly,true);
 assert.equal(manifest.localeAliases['en-US'],'en-AU');
 for(const diagram of manifest.diagrams){
  for(const [locale,path] of Object.entries(diagram.locales)){
   if(!path)continue;
   assert.equal(existsSync(new URL(path,root)),true);
   const spec=json(`specs/${diagram.id}.${locale}.json`);
   const ids=new Set(spec.nodes.map(node=>node.id));
   for(const node of diagram.steps)assert.ok(ids.has(node),`${diagram.id} ${locale} missing ${node}`);
   const svg=readFileSync(new URL(path,root),'utf8');
   assert.doesNotMatch(svg,/<script\b|on(?:click|load|error)\s*=/i);
  }
 }
});
test('E diagram canonical exports bind to the checked HTML artifacts without claiming host validation',()=>{
 const receipts=json('export-receipts.json');assert.equal(receipts.length,5);
 for(const receipt of receipts){
  const html=readFileSync(new URL(receipt.name+'.html',root));
  const hash=createHash('sha256').update(html).digest('hex');
  assert.equal(receipt.html_sha256,hash);
  const check=json(receipt.name+'.visual-check.json');
  assert.equal(check.artifact.sha256,hash);assert.equal(check.ok,true);
  assert.equal(check.containment.viewports.length,4);
  assert.equal(receipt.state_writes,false);
 }
});
test('E English publication graph has an honest semantic fallback, not a false pass',()=>{
 const publication=manifest.diagrams.find(d=>d.id==='DG-E03');
 assert.equal(publication.locales['en-AU'],null);
 assert.equal(publication.fallback['en-AU'].length,6);
 assert.match(publication.limitation,/failed/);
 assert.match(publication.fallback['en-AU'].join(' '),/separate simulated action/);
 assert.match(publication.fallback['en-AU'].join(' '),/failed publication preserves the decision/);
 assert.match(publication.fallback['en-AU'].join(' '),/No trade is executed/);
});
