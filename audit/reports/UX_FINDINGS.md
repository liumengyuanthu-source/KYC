# UX / UI findings

Severity is task/safety impact, not a visual score. Only S0/S1 may be fixed in this round. No S0 reproduced in the tested local fixtures.

## UX-001 · S1 · fixed

- Gate / persona / scene / surface: G1/G2 · KYC Ops / Reviewer · SCN-MATCH · PX-09
- Finding: Summary and action emphasis do not follow receipt, purpose assessment or recorded result.
- Evidence (relative to audit/): screenshots/actual/journey/review.pack.en-AU.text.txt
- Expected: Current-state guidance with one permitted next step.
- Why it matters: Avoid unnecessary repeated collection and repeated local decisions.
- Recommendation / effort: Use existing projection and guarded actions, no new business writes. · M
- Retest: controlled-fix-report.md
- Oracle: Quality Gate P1/P5/P6; D5 §18.2/20.2

## UX-002 · S1 · fixed

- Gate / persona / scene / surface: G2/G3 · KYC Ops · SCN-READINESS · PX-12 entry
- Finding: Current C case Readiness route leads to Batch D fixture-load preview.
- Evidence (relative to audit/): reports/surfaces-initial.json; screenshots/actual/surfaces/readiness-not-ready.failure.png
- Expected: Readonly readiness of the same case without loading another fixture.
- Why it matters: Breaks the end-to-end current-case story.
- Recommendation / effort: Reuse current safe projection; keep D fixture entry separate. · M
- Retest: surfaces-results.json; controlled-fix-report.md
- Oracle: Quality Gate P7/P8 and CTX-01

## UX-003 · S2 · open — review only

- Gate / persona / scene / surface: G6/G7 · KYC Ops · SCN-MATCH · PX-09
- Finding: Core evidence and action column begins around y=660 at 1366×768 before the guidance fix; too little of the task fits the first screen.
- Evidence (relative to audit/): screenshots/actual/surfaces/responsive-1366-en-AU.png
- Expected: Current task and a meaningful amount of evidence immediately visible.
- Why it matters: Excess navigation/progress height increases scrolling and weakens hierarchy.
- Recommendation / effort: After review, compact upper navigation/progress into a summary; keep full detail expandable. · M
- Retest: No S2 redesign performed
- Oracle: Quality Gate G6/G7

## UX-004 · S2 · open — review only

- Gate / persona / scene / surface: G8 · All tested roles · SCN-MATCH / SCN-GAP · PX-09 / PX-04 / Cases
- Finding: Missing h1 or skipped heading levels in several rendered surfaces.
- Evidence (relative to audit/): accessibility/*.json
- Expected: Logical heading outline with page heading.
- Why it matters: Assistive navigation loses structure, although tested keyboard tasks remain operable.
- Recommendation / effort: Correct semantic heading levels independently of visual typography. · S
- Retest: Automated axe; no screen-reader certification
- Oracle: Quality Gate G8

## UX-005 · S2 · open — review only

- Gate / persona / scene / surface: G6/G10 · Client contributor · SCN-GAP · PX-04
- Finding: Large workshop controls dominate the client first viewport above the actual request.
- Evidence (relative to audit/): screenshots/actual/journey/identity.client.en-AU.png
- Expected: Client task before facilitator controls in the presentation hierarchy.
- Why it matters: Makes the limited client contribution look like an internal demo console.
- Recommendation / effort: Fold facilitator tools into a clearly separate controlled disclosure after review. · M
- Retest: No client chrome redesign
- Oracle: D5 client scope / Quality Gate G6

## UX-006 · S2 · open — review only

- Gate / persona / scene / surface: G6/G10 · Chinese-speaking facilitator / reviewer · SCN-MATCH · Studio / PX-09
- Finding: Some source/internal labels remain mixed-language or prominent (source-comparison, finding, review, EV-ID-C01 and long evidence IDs).
- Evidence (relative to audit/): screenshots/actual/journey/population.return.zh-CN.png; identity.assessed.en-AU.png
- Expected: Human-readable bilingual wording first, source IDs secondary.
- Why it matters: Still feels partly written for builders; weakens the requested human-friendly journey.
- Recommendation / effort: Translate human-facing prose and keep exact identifiers in muted metadata/disclosures, without renumbering. · M
- Retest: No bulk copy rewrite
- Oracle: User instruction to de-emphasise IDs; Quality Gate G6

## UX-007 · S2 · scope limitation — not expanded

- Gate / persona / scene / surface: G2/G9 · QA / Clearance reviewer · SCN-QA / SCN-PUBLISH · PX-11 / PX-12
- Finding: Full QA remediation, final authorisation/publication and three ended/cleared historical outcomes are not implemented or lack approved fixtures.
- Evidence (relative to audit/): contracts/D5_SCENARIO_PRODUCT_CONTRACTS.json; cases-archived screenshot
- Expected: Explicit scope limit; no fictional success state.
- Why it matters: Prevents representing this bounded pilot as the full workshop product.
- Recommendation / effort: Approve downstream fixtures and scope in a later batch; keep NOT_RUN now. · L
- Retest: NOT_RUN full downstream outcomes
- Oracle: D5 §16.1/22.4; Quality Gate G2/G9

## UX-008 · S2 · open — review only

- Gate / persona / scene / surface: G5 · KYC Ops · SCN-MATCH · PX-09 progress
- Finding: Timing detail is honest but mostly collapsed; six equally large step cards and repeated metadata add density.
- Evidence (relative to audit/): screenshots/actual/progress-detail.png
- Expected: Compact current owner/wait/expected summary with accessible details.
- Why it matters: Users must open another layer to understand waiting and timing.
- Recommendation / effort: Review compact current-step summary in the next visual pass; retain unknowns and factual clock separation. · M
- Retest: Time semantics tests pass; user comprehension NOT_ASSESSABLE
- Oracle: D5 §18.2; Quality Gate G5

## UX-009 · S1 · fixed

- Gate / persona / scene / surface: G8 · Keyboard user · SCN-MATCH · PX-09
- Finding: Actual focused summary matches :focus-visible but outline computes to none because --accent is undefined.
- Evidence (relative to audit/): reports/focus-diagnostic.json; context-extra-initial.json
- Expected: Visible keyboard focus using the existing palette.
- Why it matters: Keyboard users cannot reliably see their location, which axe alone did not detect.
- Recommendation / effort: Replace invalid colour-token reference with the existing blue token; no new colour values. · S
- Retest: context-extra-results.json; controlled-fix-report.md
- Oracle: Quality Gate G8 manual focus requirement

## UX-010 · S1 — configuration-specific, outside frozen main demo · open — unsupported permission-reconfiguration variant

- Gate / persona / scene / surface: G1/G4 · Reviewer with changed demo permissions · SCN-MATCH · PX-09 hero
- Finding: Removing assess_identity from the viewing Reviewer role can make a still-valid KYCOps assessment appear as changed evidence. Native basis resolution itself is permission-sensitive.
- Evidence (relative to audit/): reports/final-review-verdict.md; prototype/screening-predicates.mjs:225
- Expected: Permission denial and actual evidence invalidation must have distinct guidance.
- Why it matters: No write bypass occurs, but the next-action explanation can be misleading after permission reconfiguration.
- Recommendation / effort: Keep this review limited to the frozen supplied role configuration. In a subsequent bounded fix, distinguish denied basis visibility from changed evidence without weakening guards. · M
- Retest: Default configured roles passed; reviewer reproduced the altered configuration in memory. Not included in passing browser count.
- Oracle: Final scoped review; bank permissions remain unconfirmed demo configuration.
