import {test,expect} from '../tooling/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';import path from 'node:path';
const journey='audit/screenshots/actual/journey-final/',surfaces='audit/screenshots/actual/surfaces/';
const cases=[
 ['01-current',surfaces+'journey-current.state.json'],['02-target',surfaces+'journey-target.state.json'],
 ['03-scenario',journey+'match.scene.en-AU.state.json'],
 ['04-CHK01',journey+'review.result.en-AU.state.json','review'],
 ['05-CHK02',journey+'identity.received.en-AU.state.json','review'],
 ['06-CHK03',journey+'identity.assessed.en-AU.state.json','review'],
 ['07-CHK04',journey+'review.unresolved.en-AU.state.json','review'],
 ['08-decision-pack',journey+'review.pack.en-AU.state.json','review-action'],
 ['09-case-return',journey+'population.return.zh-CN.state.json'],
 ['10-readiness',surfaces+'readiness-not-ready.state.json'],
 ['11-active',surfaces+'cases-active.state.json'],['12-my-completed-empty',surfaces+'cases-my_completed_work.state.json'],
 ['13-archived-empty',surfaces+'cases-archived.state.json'],
 ['14-default-layout',journey+'review.result.en-AU.state.json','review'],
 ['15-changed-layout',journey+'review.result.en-AU.state.json','layout']
];
for(const [name,file,mode] of cases)test(name,async({page},testInfo)=>{
 const seed=JSON.parse(fs.readFileSync(file));if(mode)seed.navigation={...seed.navigation,page:'product',step:'screening',modal:false,locale:'en-AU',role:'ROLE-KYCOPS',studioPage:null,d5:{}};
 await page.clock.setFixedTime(new Date('2026-09-08T00:00:00Z'));
 await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
 await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('#main');
 const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
 if(mode==='layout'){await page.locator('[data-d5-action="customize"]').click();await page.locator('[data-d5-action="add"][data-value="OPT-NOTES"]').click();await page.locator('[data-d5-action="save-layout"]').click();}
 if(mode==='review-action')await page.locator('.d5-action-column').scrollIntoViewIfNeeded();else await page.evaluate(()=>scrollTo(0,0));
 await page.evaluate(()=>document.activeElement?.blur());
 await page.screenshot({path:`audit/screenshots/actual/visual/${name}.png`,animations:'disabled'});
 // Candidate baseline is a fresh capture, NOT automatic design approval.
 // On later runs retain it: changed pixels fail and require explicit human review.
 const baseline=testInfo.snapshotPath(name+'.png');if(!fs.existsSync(baseline)){fs.mkdirSync(path.dirname(baseline),{recursive:true});await page.screenshot({path:baseline,animations:'disabled'});}
 await expect(page).toHaveScreenshot(name+'.png',{animations:'disabled',maxDiffPixelRatio:0.001});
 expect(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data)).toEqual(before);
});
