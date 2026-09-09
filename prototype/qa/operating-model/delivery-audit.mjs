import assert from 'node:assert/strict';
import {probe,finish} from './harness.mjs';
import {operatingProjection} from '../../operating-model/model.mjs';
const model=operatingProjection({role:'ROLE-DEMO-AUTHOR'});
await probe(['OM-12','OM-23','OM-30'],'seventeen-source-mappings-and-status',async h=>{
 for(const locale of ['en-AU','en-US','zh-CN']){
  await h.language(locale);await h.click('om-view','overview');
  for(const a of model.actions){
   await h.click('om-action',a.action_id);await h.page.locator('.om-source-disclosure summary').click();
   const text=await h.page.locator('[data-om-sources]').innerText();
   for(const ref of [...a.current_source_refs,...a.target_source_refs,...a.issue_refs,...a.benchmark_refs])assert.ok(text.includes(ref),a.action_id+' '+ref);
   if(locale!=='zh-CN')assert.doesNotMatch(await h.page.locator('.om-page').innerText(),/\p{Script=Han}/u);
  }
 }
 await h.language('en-AU');await h.click('om-view','skills');await h.click('om-catalogue');
 for(const skill of model.skills){await h.click('om-skill',skill.id);const text=await h.page.locator('.om-statuses').innerText();assert.match(text,/Defined · design proposal/);assert.match(text,/Read-only interface binding/);assert.match(text,/Unverified · no model \/ runtime evaluation/);}
 assert.doesNotMatch((await h.page.locator('.om-page button').allTextContents()).join('\n'),/Run Agent|Deploy Agent|Approve clearance/i);
 assert.match(await h.page.locator('.om-development').innerText(),/not authentication/);
 assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['OM-24'],'touch-target-selection-without-hover',async h=>{
 await h.page.locator('[data-action="om-view"][data-value="collaboration"]').tap();await h.page.locator('[data-action="om-next"]').tap();
 assert.equal((await h.state()).navigation.operating.frame,2);
 assert.ok(await h.page.locator('[data-action="om-next"]').isVisible());assert.deepEqual((await h.state()).data,h.before.data);
},{width:390,height:844,touch:true});
await finish();
