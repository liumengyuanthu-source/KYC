import assert from 'node:assert/strict';import fs from 'node:fs';
import {probe,finish} from './harness.mjs';
const seed=JSON.parse(fs.readFileSync('prototype/qa/operating-model/host/c-live-session.json'));
for(const destination of ['operating-model','scenario','journey'])await probe(['OM-18','OM-19','OM-23'],'latest-role-return-'+destination,async h=>{
 await h.click('om-product');await h.page.locator('#c-role').selectOption('ROLE-RM');
 assert.equal((await h.state()).navigation.role,'ROLE-RM');
 if(destination==='operating-model')await h.click('om-return');else await h.click('return',destination);
 assert.equal((await h.state()).navigation.role,'ROLE-RM');
 if(destination==='operating-model')assert.equal(await h.page.locator('.om-skill-brief,.om-work,.om-candidate').count(),0);
 assert.deepEqual((await h.state()).data,seed.data);
},{seed});
await probe(['OM-25','OM-30'],'visible-skill-print-and-unmade-sample',async h=>{
 await h.click('om-action','D4A-MATCH-02-02');await h.click('om-view','skills');
 assert.equal(await h.page.locator('.om-skill-brief').getAttribute('data-skill'),'SK-03');
 await h.click('om-print','skill');assert.match(await h.page.locator('.om-compact-print').innerText(),/SK-03/);await h.click('om-exit-print');
 await h.click('om-catalogue');await h.click('om-skill','SK-01');await h.click('om-print','skill');
 const text=await h.page.locator('.om-compact-print').innerText();assert.match(text,/SK-01/);assert.match(text,/Not authored|not authored/);assert.doesNotMatch(text,/Draft output: can the finding|C01|1970/);
 assert.deepEqual((await h.state()).data,h.before.data);
});
await finish();
