// D5 regression copy; original evidence preserved.
// Operating Model regression relocation; historical source/results preserved.
import assert from 'node:assert/strict';
import {probe,finish,base} from './host-harness.mjs';
await probe(['UX-23','UX-24'],'branch-print-url-product-reentry',async h=>{
 await h.click('rc-compare');await h.click('rc-print');
 assert.ok(await h.page.locator('[data-print-branch="BR-03"]').count());
 await h.page.goto(base+'?scene=SCN-VALIDATE&locale=zh-CN');
 await h.page.waitForSelector('#scenario-dialog[open]');
 await h.click('collab-open');
 assert.equal((await h.state()).navigation.page,'product');
 const before=await h.state();
 await h.page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
 assert.equal(await h.page.locator('[data-print-branch]').count(),0,'Product native print must not inherit a prior authored branch print');
 await h.page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
 assert.deepEqual((await h.state()).data,before.data);
});
await finish();
