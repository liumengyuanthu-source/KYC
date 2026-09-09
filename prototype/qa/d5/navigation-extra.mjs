import assert from 'node:assert/strict';import {probe,finish,liveSeed} from './harness.mjs';
const d=(page,a,v)=>page.locator(`[data-d5-action="${a}"]${v?`[data-value="${v}"]`:''}`).filter({visible:true}).first().click();
await probe(['D5-04','D5-15','D5U-37'],'reload-keeps-current-saved-task',async h=>{
 await h.page.locator('#screening-rationale').fill('D5 fresh reload preserves this saved review.');await h.click('c-action','save_review_draft');const saved=(await h.state()).data;await h.page.reload();await h.page.waitForSelector('#screening-rationale');assert.deepEqual((await h.state()).data,saved);assert.equal(await h.page.locator('#screening-rationale').inputValue(),'D5 fresh reload preserves this saved review.');
});
await probe(['D5-06','D5-42','D5U-39'],'keyboard-control-keeps-semantic-focus',async h=>{
 const control=h.page.locator('[data-d5-action="customize"]');await control.focus();await h.page.keyboard.press('Enter');const focus=await h.page.evaluate(()=>document.activeElement?.getAttribute('data-d5-action'));assert.equal(focus,'customize','Opening customization should not move focus to unrelated Cases control');await d(h.page,'cancel-layout');assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5-37','D5-39','D5U-02','D5U-39'],'step-and-language-preserve-open-reading-detail',async h=>{
 await h.page.locator('[data-d5-progress-detail] > summary').click();await h.page.locator('[data-d5-step="MATCH-03"]').click();assert.equal(await h.page.locator('[data-d5-progress-detail]').getAttribute('open'),'');assert.ok(await h.page.locator('[data-d5-step-detail="MATCH-03"]').isVisible());await h.language('zh-CN');assert.equal(await h.page.locator('[data-d5-progress-detail]').getAttribute('open'),'');assert.ok(await h.page.locator('[data-d5-step-detail="MATCH-03"]').isVisible());assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5U-21','D5U-28'],'persona-preferences-and-dirty-input-do-not-cross',async h=>{
 await d(h.page,'customize');await d(h.page,'remove','OPT-DEPENDENCIES');await d(h.page,'save-layout');await h.page.locator('#screening-rationale').fill('Unsaved operator one text.');await h.page.locator('#d5-persona').selectOption('demo-operator-2');assert.ok(await h.page.locator('#dirty-dialog').isVisible());await h.click('guard','discard');assert.equal(await h.page.locator('#screening-rationale').inputValue(),'');assert.ok(await h.page.locator('[data-d5-module="OPT-DEPENDENCIES"]').count());await h.page.locator('#d5-persona').selectOption('demo-operator-1');assert.equal(await h.page.locator('[data-d5-module="OPT-DEPENDENCIES"]').count(),0);assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5U-25','D5U-26','D5U-28'],'readonly-record-and-zero-results',async h=>{
 await d(h.page,'cases');await h.page.locator('#d5-history-search').fill('Entity A');await d(h.page,'history-open','active');assert.ok(await h.page.locator('[data-d5-history-record]').isVisible());assert.equal(await h.page.locator('[data-action="c-action"]').count(),0);await d(h.page,'history-back');assert.equal(await h.page.locator('#d5-history-search').inputValue(),'Entity A');await h.page.locator('#d5-history-search').fill('not-authorized-case-xyz');assert.ok(await h.page.locator('[data-d5-history-empty]').isVisible());assert.equal(await h.page.locator('[data-d5-history-error]').count(),0);assert.deepEqual((await h.state()).data,h.before.data);await d(h.page,'active');assert.deepEqual((await h.state()).data,h.before.data);
});
const missing=liveSeed();missing.navigation.d5={persona:'demo-operator-1',cases:true,tab:'active',query:'',selected:'nonexistent-history'};
await probe(['D5U-25','D5U-27'],'unavailable-history-distinct-from-no-results',async h=>{assert.ok(await h.page.locator('[data-d5-history-error]').isVisible());assert.equal(await h.page.locator('[data-d5-history-empty]').count(),0);assert.deepEqual((await h.state()).data,h.before.data);},{seed:missing});
await finish();
