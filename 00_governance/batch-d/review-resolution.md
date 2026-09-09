# Batch D review resolution

## Model gate — passed

Independent Task1 reviewer found two Important issues: unknown applicable dependency impact was shown as unaffected; Legal product scope / current Credit terms were insufficiently validated. Original owner added three failing behavioral tests, fixed guards and regenerated candidates. Focused19/19 and full203/203 passed at that point. Scoped reviewer independently probed affected Legal versus independent Credit, current entry/revised input incorporation and blocked execution; both findings resolved, no consequential new defects.

## Graph/reference gate — passed

Independent Task2 review identified incomplete focused fallback, positional version facts, overbroad source bindings, missing literal edge coverage and unescaped consumed revision. Owner fixed rendering/binding/escaping, retained all fallback nodes/edges and constrained A-CDM/process references. Eight focused tests pass. Scoped review approved production fixes and requested three extra hold-to-affected edge assertions; these were added and reviewer confirmed closure. Local absolute authoring-tool paths remain a disclosed portability limitation.

## Host integration gate

Task3 first scoped review returned two Important findings, no Critical findings: asynchronous load/archive race with hidden failure feedback; incomplete finite zh-CN display translation. Original owner completed the bounded TDD fix and froze source. New load-race2/2, fresh unit217/217, D browser8 + fallback5 + returns3 + print3 and A21/B13/C18 regressions passed. Scoped re-review closed both findings with no new Critical/Important breakage. Host gate passed. Final integrated review dispatched separately.

Controller browser verification found and tracked these pre-handoff issues:

- Initial D deep-link probe failed before host wiring; after wiring,8 mainline checks passed with no page errors.
- Studio print initially omitted case/scope/revision/Not Ready metadata; owner added it. Next probe found missing offline research citations; owner reused the existing filtered registry output. All3 final print checks pass.
- A return test hardcoded the seed camera anchor. The host normalizes a stage to its leading SCN-QA anchor. The test now compares the actual captured origin; all3 return/draft checks pass, including latest locale and unchanged business data. This was a test-fixture correction, not a relaxed return requirement.
- Initial dark-blue specialist panels diverged from the approved light-glass host. Owner revised the scoped CSS to warm translucent white and compacted the compatibility banner; controller inspected the resulting screenshot.
- Actual client PDF visual inspection found a near-empty first page and oversized single-column rows (15 pages). Compact print-only layout and pagination corrected it to9 pages. Credit and Legal have5 each. All19 final pages inspected in contact sheets, representative full-size first pages additionally checked; file creation alone was not used as a visual pass.
- A regression21 passed/1 not-run; B13 passed; C18 passed. The A noscript assertion now specifically counts the six original A links because D adds its own static links; original A fallback coverage is retained.
- Post-gate graph display clarification: the static CD-01 design label now has an escaped live record alias/ID beneath it, so changed Credit's CD-02 is visible. Literal assertion failed4/5 then passed5/5 after the display-only change; final integrated review includes it.
- New delayed-fetch browser probe reproduced two concurrent fixture requests (expected1) and missing role=alert on failure. Fix regression load-race-browser.mjs now passes2/2: one pending request, no legacy writes, no late active-D reload, one exact original archive, visible503 failure and successful retry/restore. The final active D session cannot be archived as pre-D by a repeated Start.
- Root-owned graph locale fix: literal Chinese fallback/print test failed on `complete`, then6/6 focused tests passed after adding the UI-only `已完成` display mapping. Source IDs and model enums remain unchanged.

## Scope decisions and costs

Final integrated review found no Critical issue, one Important graph-family binding defect and a minor finite Chinese Credit status omission. Fresh SCN-CREDIT/SCN-READINESS rendered DG-D02/DG-D03 but focus/Next used stored DG-D01. Reviewer reproduced via modules; controller then reproduced both cases in actual Chrome (scene-graph-results.json failed2/2). Existing passing Product dependency tests did not cover this Studio-specific path. Original UI owner implemented a presentation-only binding fix plus finite label mapping; model data and source aliases are unchanged. Controller reran218 unit tests,2 Studio graph cases,8 mainline cases,3 return cases and3 print cases: all passed. The scoped final reviewer closed both findings after focused read-only checks, with no directly consequential Critical/Important findings. Final gate passed; ready for local review within synthetic-demo scope.

- Continue current dirty checkout to retain approved untracked app. Cost: exact baseline-copy review rather than ordinary HEAD diff; no unrelated edits reset, no commit/push.
- Explicit D authored fixture, prior session archived. Cost: D does not dynamically infer completion from every possible A/B/C state.
- Block legacy writers while D is loaded, restore archive to resume upstream actions. Cost: this increment demonstrates the approved sequence, not a universal backward change-impact engine.
- No new Lab application. Cost: identical read-only lens projection is checked in unit tests; Lab UI coupling remains unimplemented and not claimed.
