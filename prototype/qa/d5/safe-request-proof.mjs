import assert from 'node:assert/strict';
import {probe,finish,liveSeed} from './harness.mjs';
for(const [role,audience] of [['ROLE-RM','rm'],['ROLE-CLIENT','client']]){
 const seed=liveSeed();seed.navigation.role=role;
 await probe(['D5-19','D5-40','D5-41','D5U-31','D5U-38'],`${audience}-request-entry-retains-safe-audience`,async h=>{
  await h.click('c-collaboration');assert.equal((await h.state()).collabCtx.audience,audience);assert.equal((await h.state()).navigation.role,role);assert.equal(await h.page.locator('#collab-audience,#collab-user').count(),0);assert.ok(await h.page.locator('[data-d5-safe-request]').isVisible());
  assert.equal(await h.page.locator('[data-action="collab-action"][data-value="review_request"]').count(),0);assert.equal(await h.page.locator('[data-action="collab-action"][data-value="dispatch"]').count(),0);
  assert.doesNotMatch(await h.page.locator('#main').innerHTML(),/1970|1971|comparison_basis|SYN-PROVIDER/);assert.deepEqual((await h.state()).data,h.before.data);
  await h.click('collab-print');assert.doesNotMatch(await h.page.locator('.print-sheet').innerHTML(),/1970|1971|comparison_basis|SYN-PROVIDER/);assert.deepEqual((await h.state()).data,h.before.data);
 },{seed});
}
await finish();
