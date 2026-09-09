// Operating Model regression relocation; historical source/results preserved.
import assert from 'node:assert/strict';
import {probe,finish,dir} from './host-harness.mjs';
await probe(['UX-01','UX-02','UX-10','UX-25'],'pc01-chain-context',async h=>{
 await h.page.screenshot({path:dir+'scenario-summary.zh-CN.png'});
 await h.click('rc-compare');await h.click('rc-mode','current');
 const origin=(await h.state()).navigation.reconstruction;
 await h.click('rc-branch','BR-04');
 assert.ok(await h.page.locator('[data-action="rc-scene"][data-value="SCN-SOURCE"]').isVisible());
 assert.ok(await h.page.locator('[data-action="rc-scene"][data-value="SCN-VALIDATE"]').isVisible());
 await h.click('rc-scene','SCN-SOURCE');
 assert.equal((await h.state()).navigation.reconstruction.branchId,'BR-04');
 await h.click('rc-references');await h.click('rc-back','comparison');
 assert.equal((await h.state()).navigation.reconstruction.sceneId,'SCN-SOURCE');
 await h.click('rc-back','scenario');
 assert.equal((await h.state()).navigation.reconstruction.sceneId,origin.sceneId);
 assert.equal((await h.state()).navigation.reconstruction.mode,origin.mode);
 assert.deepEqual((await h.state()).data,h.before.data);
 await h.click('rc-branch','BR-05');
 assert.equal((await h.state()).navigation.reconstruction.branchId,'BR-05');
 assert.deepEqual((await h.state()).data,h.before.data);
},{locale:'zh-CN'});
await probe(['UX-10','UX-15'],'global-references-escape-after-pc01',async h=>{
 await h.click('rc-compare');await h.click('close');await h.click('reference-global');
 assert.ok((await h.state()).navigation.reference);
 await h.page.keyboard.press('Escape');
 assert.equal((await h.state()).navigation.reference,null);
 assert.equal(await h.page.locator('#scenario-dialog').evaluate(e=>e.open),false);
 assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['UX-10','UX-14'],'nested-branch-return-trail',async h=>{
 await h.click('rc-compare');await h.click('rc-mode','current');
 await h.click('rc-mapping','MAP-D3-REQUIREMENTS-03');
 const origin=(await h.state()).navigation.reconstruction;
 await h.click('rc-branch','BR-05');await h.click('rc-branch','BR-03');
 await h.click('rc-back','scenario');
 assert.equal((await h.state()).navigation.reconstruction.sceneId,'SCN-GAP');
 await h.click('rc-back','scenario');
 const restored=(await h.state()).navigation.reconstruction;
 assert.equal(restored.sceneId,origin.sceneId);assert.equal(restored.mode,origin.mode);
 assert.equal(restored.mappingId,origin.mappingId);assert.equal(restored.panel,'comparison');
 assert.deepEqual((await h.state()).data,h.before.data);
});
await finish();
