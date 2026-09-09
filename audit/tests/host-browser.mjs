import assert from 'node:assert/strict';
import {probe,finish} from './harness.mjs';
async function d5(page,action,value){const q=`[data-d5-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`,t=page.locator(q);if(!await t.filter({visible:true}).count()){for(let i=0;i<5;i++){const p=t.first().locator('xpath=ancestor::details[not(@open)]');if(!await p.count())break;await p.first().locator(':scope > summary').click();}}await t.filter({visible:true}).first().click();}
await probe(['D5-04','D5-07','D5-10','D5-43','D5U-01','D5U-19'],'pilot-core-current-finding',async h=>{
 await h.page.waitForSelector('[data-d5-workspace]');
 for(const id of ['CORE-CONTEXT','CORE-PROGRESS','CORE-WORK','CORE-ACTION'])assert.ok(await h.page.locator(`[data-d5-core="${id}"]`).isVisible(),id);
 assert.equal((await h.state()).data.screeningFindings.find(x=>x.id.endsWith('person-t-c01')).subject_ref,h.before.data.screeningFindings.find(x=>x.id.endsWith('person-t-c01')).subject_ref);
 assert.equal(await h.page.locator('#screening-rationale').count(),1);assert.ok(await h.page.locator('[data-action="c-action"][data-value="record_disposition"]').isDisabled());
 assert.match(await h.page.locator('[data-d5-workspace]').innerText(),/Person T/);assert.doesNotMatch(await h.page.locator('[data-d5-workspace]').innerText(),/D4A-MATCH|Necessity score|Feasibility score/);
 assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5U-02','D5U-03','D5U-04','D5U-37'],'step-reading-does-not-execute',async h=>{
 for(const id of ['MATCH-01','MATCH-02','MATCH-03','MATCH-04','MATCH-05','MATCH-06']){const item=h.page.locator(`[data-d5-step="${id}"]`);if(!await item.isVisible()){const parent=item.locator('xpath=ancestor::details[not(@open)]');if(await parent.count())await parent.first().locator(':scope > summary').click();}await item.click();assert.deepEqual((await h.state()).data,h.before.data);}
 const text=await h.page.locator('[data-d5-workspace]').innerText();assert.match(text,/Credit/);assert.match(text,/Legal/);assert.match(text,/Conflicts/);assert.match(text,/confirm|unknown|establish/i);
});
await probe(['D5U-20','D5U-21','D5U-23','D5U-36','D5U-37'],'layout-save-reset-and-draft-isolation',async h=>{
 await h.page.locator('#screening-rationale').fill('Unstored human review text survives layout-only operations.');
 await d5(h.page,'customize');await d5(h.page,'remove','OPT-DEPENDENCIES');await d5(h.page,'save-layout');
 const layouts=await h.page.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([k])=>k.startsWith('ctt-d5-layout:'))));
 assert.ok(Object.keys(layouts).length);for(const raw of Object.values(layouts))assert.doesNotMatch(raw,/Unstored|person-t-c01|ProviderRecord|rationale/);
 assert.equal(await h.page.locator('#screening-rationale').inputValue(),'Unstored human review text survives layout-only operations.');
 await d5(h.page,'customize');await d5(h.page,'reset-layout');
 for(const id of ['CORE-CONTEXT','CORE-PROGRESS','CORE-WORK','CORE-ACTION'])assert.ok(await h.page.locator(`[data-d5-core="${id}"]`).isVisible());
 assert.equal(await h.page.locator('#screening-rationale').inputValue(),'Unstored human review text survives layout-only operations.');assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5-14','D5-38','D5U-28'],'history-dirty-stay-failed-save-discard',async h=>{
 const invalid='Z'.repeat(10001);await h.page.locator('#screening-rationale').fill(invalid);await d5(h.page,'cases');assert.ok(await h.page.locator('#dirty-dialog').isVisible());await h.click('guard','stay');assert.equal(await h.page.locator('#screening-rationale').inputValue(),invalid);
 await d5(h.page,'cases');await h.click('guard','save');assert.ok(await h.page.locator('#dirty-dialog [role="alert"]').isVisible());assert.equal(await h.page.locator('#screening-rationale').inputValue(),invalid);assert.deepEqual((await h.state()).data,h.before.data);
 await h.click('guard','discard');assert.ok(await h.page.locator('#d5-history-search').isVisible());await d5(h.page,'active');assert.deepEqual((await h.state()).data,h.before.data);
});
await probe(['D5-39','D5U-28','D5U-37'],'saved-review-history-language-roundtrip',async h=>{
 const text='D5 local review: Person T identity is still unresolved; no clearance requested.';await h.page.locator('#screening-rationale').fill(text);await d5(h.page,'cases');await h.click('guard','save');const saved=(await h.state()).data;assert.equal(saved.screeningReviewDrafts.at(-1).text,text);
 await h.page.locator('#d5-history-search').fill('not-a-real-case');assert.deepEqual((await h.state()).data,saved);await h.language('zh-CN');await d5(h.page,'active');assert.equal((await h.state()).navigation.locale,'zh-CN');assert.deepEqual((await h.state()).data,saved);assert.equal(await h.page.locator('#screening-rationale').inputValue(),text);
});
await probe(['D5-40','D5-41','D5U-22','D5U-30','D5U-31','D5U-38'],'safe-rm-client-projections',async h=>{
 for(const role of ['ROLE-RM','ROLE-CLIENT']){await h.page.locator('#c-role').selectOption(role);const body=await h.page.locator('#main').innerHTML();assert.doesNotMatch(body,/person-t-c01|SYNTHETIC-C-DATASET|1970|1971|sanctions_name_match|D4A-MATCH|comparison_basis/);assert.equal(await h.page.locator('#screening-rationale').count(),0);assert.match(await h.page.locator('#main').innerText(),/Email|email|邮件/);await d5(h.page,'customize');assert.equal(await h.page.locator('[data-value="OPT-DEPENDENCIES"]').count(),0);await d5(h.page,'cancel-layout');assert.deepEqual((await h.state()).data,h.before.data);}
});
await probe(['D5-42','D5U-39'],'narrow-touch-reduced-motion',async h=>{
 assert.ok(await h.page.locator('[data-d5-workspace]').isVisible());
 const size=await h.page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,JSON.stringify(size));
 await h.page.locator('#screening-rationale').fill('Touch test remains a draft.');await d5(h.page,'customize');await d5(h.page,'cancel-layout');assert.equal(await h.page.locator('#screening-rationale').inputValue(),'Touch test remains a draft.');assert.deepEqual((await h.state()).data,h.before.data);
},{width:390,height:844,touch:true});
await probe(['D5-39','D5U-39'],'three-language-current-input',async h=>{
 await h.page.locator('#screening-rationale').fill('Original English rationale / 原始人工理由');for(const locale of ['zh-CN','en-US','en-AU']){await h.language(locale);assert.equal(await h.page.locator('#screening-rationale').inputValue(),'Original English rationale / 原始人工理由');assert.equal((await h.state()).navigation.locale,locale);assert.deepEqual((await h.state()).data,h.before.data);}
});
await finish();
