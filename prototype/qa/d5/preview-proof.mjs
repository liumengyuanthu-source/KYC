import assert from 'node:assert/strict';
import {probe,finish,liveSeed} from './harness.mjs';
const url='index.html?workspace=screening&locale=zh-CN';
await probe(['D5-03','D5-04','D5-43'],'direct-preview-fresh-explicit-entry',async h=>{
 const s=await h.state();assert.equal(s.navigation.page,'product');assert.equal(s.navigation.locale,'zh-CN');assert.ok(!s.data.demoConfig.batchC);assert.equal(s.data.screeningFindings.filter(f=>f.id.endsWith('/person-t-c01')).length,0);assert.ok(await h.page.locator('[data-action="c-demo"]').isVisible());assert.ok(!h.page.url().includes('workspace='));
},{url,seed:null});
await probe(['D5-04','D5-15','D5U-37'],'direct-preview-restores-live-without-write',async h=>{
 assert.ok(await h.page.locator('[data-d5-workspace]').isVisible());assert.equal((await h.state()).navigation.locale,'zh-CN');assert.deepEqual((await h.state()).data,liveSeed().data);await h.page.reload();await h.page.waitForSelector('[data-d5-workspace]');assert.deepEqual((await h.state()).data,liveSeed().data);
},{url});
await finish();
