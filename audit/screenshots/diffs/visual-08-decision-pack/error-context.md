# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.mjs >> 08-decision-pack
- Location: audit/tests/visual.spec.mjs:19:37

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  61063 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: 08-decision-pack.png

Call log:
  - Expect "toHaveScreenshot(08-decision-pack.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 61063 pixels (ratio 0.05 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 61063 pixels (ratio 0.05 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]: CLEARTO TRADE
      - navigation "Main navigation" [ref=e8]:
        - button "Journey / Scenario Studio" [ref=e9] [cursor=pointer]
        - button "Product Prototype" [ref=e10] [cursor=pointer]
      - button "References" [ref=e11] [cursor=pointer]
      - generic [ref=e12]: Demo environment · synthetic
      - combobox "Language" [ref=e13]:
        - option "English (AU)" [selected]
        - option "English (US)"
        - option "简体中文"
    - main [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - button "Cases" [ref=e17] [cursor=pointer]
          - button "Back to scenario" [ref=e18] [cursor=pointer]
          - button "Print this view" [ref=e19] [cursor=pointer]
          - button "Back to journey" [ref=e20] [cursor=pointer]
        - generic [ref=e21]:
          - generic [ref=e22]:
            - text: Demo persona
            - combobox "Demo persona" [ref=e23]:
              - option "Operator 1" [selected]
              - option "Operator 2"
          - generic [ref=e24]:
            - text: Role projection
            - combobox "Role projection" [ref=e25]:
              - option "KYC Operations" [selected]
              - option "Risk / Financial Crime / QA"
              - option "Financial Crime reviewer"
              - option "Relationship Manager"
              - option "Client"
      - navigation "Task sections" [ref=e27]:
        - button "Population" [ref=e28] [cursor=pointer]
        - button "Review" [ref=e29] [cursor=pointer]
        - button "Evidence" [ref=e30] [cursor=pointer]
        - button "EDD" [ref=e31] [cursor=pointer]
        - button "Activity" [ref=e32] [cursor=pointer]
      - generic [ref=e33]:
        - generic [ref=e34]:
          - generic [ref=e35]:
            - heading "Screening Review Person T · Entity A" [level=2] [ref=e36]
            - paragraph [ref=e37]: "DEMO-CTT-001 · Scope: FX forward for future USD procurement payments · Scope revision 3 · Case revision 30 · KYC Operations"
          - generic [ref=e38]: Not ready
        - generic [ref=e39]:
          - strong [ref=e40]: "Current problem: the current purpose assessment is insufficient"
          - generic [ref=e41]: "Owner: Unassigned · Next actor: KYC Operations"
          - generic [ref=e42]: "Recommended next action: Resume review · Resume uses the current, validated assessment; it does not request the same information again or clear the case."
        - generic [ref=e43]:
          - generic "Case stages · reading anchors" [ref=e44]:
            - generic [ref=e45]: S1 Initiate & scope
            - generic [ref=e46]: S2 Determine & source
            - generic [ref=e47]: S3 Screen & assess
            - generic [ref=e48]: S4 Assure & resolve
            - generic [ref=e49]: S5 Clear to trade
          - generic "Local review steps" [ref=e50]:
            - button "01 Bind query Step complete" [ref=e51] [cursor=pointer]:
              - generic:
                - text: 01 Bind query
                - generic:
                  - generic:
                    - generic [aria-hidden]: ✓
                    - text: Step complete
            - button "02 Compare information Action needed" [ref=e52] [cursor=pointer]:
              - generic:
                - text: 02 Compare information
                - generic:
                  - generic:
                    - generic [aria-hidden]: →
                    - text: Action needed
            - button "03 Request evidence if needed Waiting" [ref=e53] [cursor=pointer]:
              - generic:
                - text: 03 Request evidence if needed
                - generic:
                  - generic:
                    - generic [aria-hidden]: ◷
                    - text: Waiting
            - button "04 Review pack Action needed" [ref=e54] [cursor=pointer]:
              - generic:
                - text: 04 Review pack
                - generic:
                  - generic:
                    - generic [aria-hidden]: →
                    - text: Action needed
            - button "05 Human judgment Waiting" [pressed] [ref=e55] [cursor=pointer]:
              - generic:
                - text: 05 Human judgment
                - generic:
                  - generic:
                    - generic [aria-hidden]: ◷
                    - text: Waiting
            - button "06 Record local result Blocked" [ref=e56] [cursor=pointer]:
              - generic:
                - text: 06 Record local result
                - generic:
                  - generic:
                    - generic [aria-hidden]: ⊘
                    - text: Blocked
          - paragraph [ref=e57]:
            - text: "Required steps still being confirmed. Step selection is reading only. Actual work:"
            - generic [ref=e58]:
              - generic [aria-hidden] [ref=e59]: ◷
              - text: Waiting
          - group [ref=e60]:
            - generic "View all steps, owners and time" [ref=e61] [cursor=pointer]
        - generic [ref=e62]:
          - generic [ref=e63]:
            - heading "Compare the identity information" [level=2] [ref=e64]
            - table [ref=e65]:
              - rowgroup [ref=e66]:
                - row [ref=e67]:
                  - columnheader "Attribute" [ref=e68]
                  - columnheader "Person T" [ref=e69]
                  - columnheader "Source record" [ref=e70]
                  - columnheader "Comparison" [ref=e71]
              - rowgroup [ref=e72]:
                - row [ref=e73]:
                  - rowheader "Name" [ref=e74]
                  - cell "Person T" [ref=e75]
                  - cell "Person T" [ref=e76]
                  - cell "Similar · review needed" [ref=e77]
                - row [ref=e78]:
                  - rowheader "Birth date" [ref=e79]
                  - cell "Not provided" [ref=e80]
                  - cell "1970 (year only) / 1971 (year only)" [ref=e81]
                  - cell "Inconclusive" [ref=e82]
                - row [ref=e83]:
                  - rowheader "Birthplace" [ref=e84]
                  - cell "Not provided" [ref=e85]
                  - cell "Not provided" [ref=e86]
                  - cell "Inconclusive" [ref=e87]
                - row [ref=e88]:
                  - rowheader "Nationality" [ref=e89]
                  - cell "Not provided" [ref=e90]
                  - cell "Not provided" [ref=e91]
                  - cell "Inconclusive" [ref=e92]
            - generic [ref=e93]:
              - heading "Evidence for identity distinction" [level=3] [ref=e94]
              - paragraph [ref=e95]:
                - text: "EV-ID-C01 · Intake status: released · v1"
                - generic [ref=e96]: DEMO-CTT-001/person/person-t · DEMO-CTT-001/evidence/collaboration-2
              - paragraph [ref=e97]: "Purpose assessment: Insufficient · v1"
              - paragraph [ref=e98]: Received is not assessed. Coordination evidence does not automatically satisfy the screening identity purpose.
            - group [ref=e99]:
              - generic "Original query, source and versions" [ref=e100] [cursor=pointer]
          - generic [ref=e101]:
            - heading "Your review" [level=2] [ref=e102]
            - paragraph [ref=e103]: "Human question: identity remains inconclusive; a configured reviewer may record unresolved or referral only; this does not clear the case."
            - generic [ref=e104]:
              - text: Rationale / precise identity gap
              - textbox "Rationale / precise identity gap" [ref=e105]: Person T identity remains unresolved; request distinguishing identity context only.
            - paragraph [ref=e106]: Draft saved · no decision recorded by saving
            - generic [ref=e107]:
              - button "Request identity information" [ref=e108] [cursor=pointer]
              - button "Save review draft" [ref=e109] [cursor=pointer]
              - button "Resume review" [ref=e110] [cursor=pointer]
              - button "Refer to specialist" [ref=e111] [cursor=pointer]
              - button "Record unresolved" [disabled] [ref=e112]
              - button "Record disposition" [disabled] [ref=e113]
            - paragraph [ref=e114]: "Exclusion is unavailable: no reviewed exclusion fixture or permission configuration. Referral destination is Unassigned until configured."
            - paragraph [ref=e115]: Record unresolved requires a configured reviewer.
            - button "Open identity request" [ref=e116] [cursor=pointer]
            - button "Review received identity evidence" [ref=e117] [cursor=pointer]
            - paragraph [ref=e118]: This action changes only its bound task or finding. Coverage remains incomplete; the case is not ready.
        - generic [ref=e119]:
          - heading "Other case conditions · parallel work" [level=3] [ref=e120]
          - generic [ref=e121]:
            - strong [ref=e122]: Credit
            - generic [ref=e123]:
              - generic [aria-hidden] [ref=e124]: "?"
              - text: Not yet established
            - generic [ref=e125]: "Applicability: Unknown · Earlier scope · requires current review"
          - generic [ref=e126]:
            - strong [ref=e127]: Legal
            - generic [ref=e128]:
              - generic [aria-hidden] [ref=e129]: "?"
              - text: Not yet established
            - generic [ref=e130]: "Applicability: Unknown · Earlier scope · requires current review"
          - generic [ref=e131]:
            - strong [ref=e132]: Conflicts
            - generic [ref=e133]:
              - generic [aria-hidden] [ref=e134]: "?"
              - text: Not yet established
            - generic [ref=e135]: "Applicability: Required · Earlier scope · requires current review"
          - generic [ref=e136]:
            - strong [ref=e137]: Financial Crime reviewer
            - generic [ref=e138]:
              - generic [aria-hidden] [ref=e139]: "?"
              - text: Not yet established
            - generic [ref=e140]: "Applicability: Unknown · Earlier scope · requires current review"
          - generic [ref=e141]:
            - strong [ref=e142]: QA reviewer
            - generic [ref=e143]:
              - generic [aria-hidden] [ref=e144]: "?"
              - text: Not yet established
            - generic [ref=e145]: "Applicability: Required · Earlier scope · requires current review"
          - paragraph [ref=e146]: Manifest completeness is unknown. No complete-case date or clearance follows from a local review result.
        - button "Customize workspace" [ref=e148] [cursor=pointer]
        - generic [ref=e149]:
          - group [ref=e150]:
            - generic "Activity timeline" [ref=e151] [cursor=pointer]
          - group [ref=e152]:
            - generic "Related dependencies" [ref=e153] [cursor=pointer]
          - group [ref=e154]:
            - generic "Related evidence" [ref=e155] [cursor=pointer]
        - group [ref=e156]:
          - generic "Illustrative timing example · separate from this session" [ref=e157] [cursor=pointer]
      - generic [ref=e158]:
        - generic [ref=e159]: Confidential Australian Banking Client · Internal design review only
        - generic [ref=e160]: Black · blue · white / Web glass approximation, not optical refraction
```

# Test source

```ts
  1  | import {test,expect} from '../tooling/node_modules/@playwright/test/index.mjs';
  2  | import fs from 'node:fs';import path from 'node:path';
  3  | const journey='audit/screenshots/actual/journey-final/',surfaces='audit/screenshots/actual/surfaces/';
  4  | const cases=[
  5  |  ['01-current',surfaces+'journey-current.state.json'],['02-target',surfaces+'journey-target.state.json'],
  6  |  ['03-scenario',journey+'match.scene.en-AU.state.json'],
  7  |  ['04-CHK01',journey+'review.result.en-AU.state.json','review'],
  8  |  ['05-CHK02',journey+'identity.received.en-AU.state.json','review'],
  9  |  ['06-CHK03',journey+'identity.assessed.en-AU.state.json','review'],
  10 |  ['07-CHK04',journey+'review.unresolved.en-AU.state.json','review'],
  11 |  ['08-decision-pack',journey+'review.pack.en-AU.state.json','review-action'],
  12 |  ['09-case-return',journey+'population.return.zh-CN.state.json'],
  13 |  ['10-readiness',surfaces+'readiness-not-ready.state.json'],
  14 |  ['11-active',surfaces+'cases-active.state.json'],['12-my-completed-empty',surfaces+'cases-my_completed_work.state.json'],
  15 |  ['13-archived-empty',surfaces+'cases-archived.state.json'],
  16 |  ['14-default-layout',journey+'review.result.en-AU.state.json','review'],
  17 |  ['15-changed-layout',journey+'review.result.en-AU.state.json','layout']
  18 | ];
  19 | for(const [name,file,mode] of cases)test(name,async({page},testInfo)=>{
  20 |  const seed=JSON.parse(fs.readFileSync(file));if(mode)seed.navigation={...seed.navigation,page:'product',step:'screening',modal:false,locale:'en-AU',role:'ROLE-KYCOPS',studioPage:null,d5:{}};
  21 |  await page.clock.setFixedTime(new Date('2026-09-08T00:00:00Z'));
  22 |  await page.addInitScript(s=>sessionStorage.setItem('ctt-round-a-v1',JSON.stringify(s)),seed);
  23 |  await page.goto('http://127.0.0.1:8765/prototype/');await page.waitForSelector('#main');
  24 |  const before=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data);
  25 |  if(mode==='layout'){await page.locator('[data-d5-action="customize"]').click();await page.locator('[data-d5-action="add"][data-value="OPT-NOTES"]').click();await page.locator('[data-d5-action="save-layout"]').click();}
  26 |  if(mode==='review-action')await page.locator('.d5-action-column').scrollIntoViewIfNeeded();else await page.evaluate(()=>scrollTo(0,0));
  27 |  await page.evaluate(()=>document.activeElement?.blur());
  28 |  await page.screenshot({path:`audit/screenshots/actual/visual/${name}.png`,animations:'disabled'});
  29 |  // Candidate baseline is a fresh capture, NOT automatic design approval.
  30 |  // On later runs retain it: changed pixels fail and require explicit human review.
  31 |  const baseline=testInfo.snapshotPath(name+'.png');if(!fs.existsSync(baseline)){fs.mkdirSync(path.dirname(baseline),{recursive:true});await page.screenshot({path:baseline,animations:'disabled'});}
> 32 |  await expect(page).toHaveScreenshot(name+'.png',{animations:'disabled',maxDiffPixelRatio:0.001});
     |                     ^ Error: expect(page).toHaveScreenshot(expected) failed
  33 |  expect(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('ctt-round-a-v1')).data)).toEqual(before);
  34 | });
  35 | 
```