# D2 Batch D — Parallel specialist increment

Status: ready for local review. D-T00–D-T07 are implemented; model, graph/reference, host and final integrated review gates passed after bounded fixes. This is Batch D only, not completion of all D2 or production approval.

## Review entry

- Local mainline: http://127.0.0.1:8765/prototype/?scene=SCN-CREDIT&locale=en-AU
- Walkthrough: `batch-d-local-review-guide.md`.
- Approved source: SRC-019, supplied Batch D Final v1.0; approval is for synthetic demonstration design, not bank policy or production readiness.

## What this increment adds

| Deliverable | Local artifact / behavior |
|---|---|
| D-T00 reconciliation | `../00_governance/batch-d/file-delta-map.md`, source-manifest.json and source-qualified crosswalk |
| D-T01 shared state | Existing case DEMO-CTT-001 and institutional scope; additive specialist records and two candidate snapshots |
| D-T02 dependencies | Version-addressed Credit → Legal input chain; task / branch / case / unknown-impact distinctions |
| D-T03 scenes | Existing SCN-CONFLICTS, SCN-CREDIT and SCN-LEGAL promoted; D1–D5 reading beats connect them to Readiness;15 scenario IDs retained |
| D-T04 Archify | DG-D01 parallel work, DG-D02 Credit/Legal versions, DG-D03 scoped holds;3 locales, active r02 SVG and standalone viewers |
| D-T05 product | One reusable Condition Detail with three selectors; explicit guarded facilitator Credit revision simulation |
| D-T06 references | Existing registry records rebound to relevant scenes/nodes; no duplicate source registry or fresh verification claim |
| D-T07 evidence | `../prototype/qa/batch-d/` — unit, browser, return, fallback, print and relocated A/B/C regression receipts |

No new specialist workbench applications, Lab UI, production API, remote service or Batch E implementation were added.

## Business-state proof

The entry is an explicitly authored C-referred continuation, not a claim that the user completed earlier actions. Loading it archives the prior session before changing the active synthetic case.

- Conflicts search is complete; the finding is open and specialist clearance is pending. Potential relationship conflict is not a misconduct finding.
- Credit is required and a condition is approved. No amount, limit, SLA, trade entitlement or bank approval mandate is invented.
- Credit Decision CD-01 → Credit Condition CC-01 → Agreement Input AI-01 → AGR-01 revision03 is traceable. Internal Legal approval is not execution.
- Facilitator revision appends the new input and decision. AGR-01 revision03 remains attached to AI-01 revision01 and visibly becomes stale. Historical inputs remain immutable.
- Person T has coordination context only. Employment at reported parent B, document coordination or agreement execution never establishes signing/trading authority for A.
- Overall case remains **Not Ready**. Conflicts, Legal execution, screening coverage and QA are unresolved. No percentage or automatic clearance.

## Fields, dependencies and sources

- Field delta: `../04_operating_model/batch-d/field-dependency-delta.md`.
- Dictionary and candidate schema: `field-dictionary.json` and `candidate-schema.json` in that directory;277 field/alias entries, additive candidate only.
- Candidate validation: both D-entry and D-credit-changed validate against the supplied local contract; not a production schema certification.
- Source mapping: Conflicts SRC-009:DEP-01 ↔ SRC-010:DEP-01; Legal preparation009:05 ↔010:09; Credit preparation009:06 ↔010:10; readiness009:11 ↔010:12.
- **Credit→Legal SRC-009:DEP-07 is not screening SRC-010:DEP-07.** Full source-qualified mappings remain in source-alias-crosswalk.json.
- References reuse NIST Digital Thread, A-CDM, counterparty-credit and process-map records. These support design analogies or process provenance, not undisclosed bank rules. No new researched facts are asserted.

## Scope rulings and costs

1. Kept the existing dirty checkout and approved untracked prototype. Review uses exact pre-D baseline copies rather than a misleading HEAD-only diff. No unrelated changes reset; no commit/push.
2. ProfessionalCondition is a read-only projection over existing clearance condition IDs. Cost: this is an additive demonstrator contract, not production object migration.
3. Explicit D entry archives the prior session. Cost: it does not infer a valid specialist continuation from every possible A/B/C state.
4. Legacy A/B/C writers are disabled centrally while D is active because their dependency recalculation cannot preserve D state. Read-only historical views remain; restoring the archive resumes original actions. Cost: no universal backward change-impact engine.
5. D1–D5 are presentation beats, not business transitions. Focus/Play/Next/images/references cannot author state. Cost: no new video or automatic agent execution.
6. Lab remains optional; shared read-only lens projection is unit tested, but Lab UI integration is **not-run** and not claimed.
7. Unknown bank permissions, dependency invalidation and hold-release rules are business validation questions D-Q01–06, not silently supplied policy.

## Verification

| Executed checks | Result | Receipt |
|---|---|---|
| Full Node suite |218 passed /0 failed |unit-results.json and unit-results.tap |
| D actual mainline flow |8 passed /0 failed |browser-results.json |
| D fallback / reduced-motion / safe roles / mobile / no-JS links |5 passed /0 failed |static-results.json |
| D References + exact returns + Save/Discard/Stay |3 passed /0 failed |return-results.json |
| D delayed double-load / failure-retry / exact archive restore |2 passed /0 failed |load-race-results.json |
| D Studio graph-family focus / Next / cross-scene navigation |2 passed /0 failed |scene-graph-results.json |
| D printable outputs |3 passed /0 failed |print-results.json |
| Existing A media/mainline regression |21 passed /0 failed /1 not-run |a-regression/browser-results.json |
| Existing B client collaboration regression |13 passed /0 failed |b-regression/browser-results.json |
| Existing C screening/EDD regression |18 passed /0 failed |c-regression/browser-results.json |
| Archify active standalone variants |9 passed |../diagrams/batch-d/browser-summary.json |

All browser receipts above are under `../prototype/qa/batch-d/`. RT-D01–18 map to actual unit/browser evidence in `../00_governance/batch-d/red-team-results.md` and `acceptance-results.json`; they are not18 separate browser tests. RT-D05/06/08/13/16/17 use unit evidence. RT-D13 explicitly excludes a new Lab UI integration test.

Three final PDFs: `../output/pdf/batch-d-credit.en-AU.pdf` (5 pages), `batch-d-legal.zh-CN.pdf` (5 pages), `batch-d-client.en-US.pdf` (9 pages). All19 pages inspected in rendered contact sheets; representative first pages additionally inspected full-size. Complete graphs, semantic fallback and inherited research citations remain printable. `visual-review.md` records the scope and earlier rejected layout.

Not-run: new Living Case Lab UI, Safari/Firefox, native browser200% zoom and assistive-technology certification, real bank authentication/approval/integration. The A test explicitly records its cross-browser/accessibility limitation. Unknown bank rules are separately tracked in business-questions.md.

Print metadata/citations/pagination defects discovered during QA were fixed and rerun. Formal review also found a re-entrant D-load/archive race and incomplete finite Chinese display text. The load now snapshots the pre-D session synchronously, latches a single request, blocks pending/late writer commands and provides visible failure/retry feedback;2 targeted browser cases and fresh full regressions passed. Final integrated review identified Studio graph-family binding and one Chinese Credit status omission. Both were fixed, verified by2 additional browser cases and literal unit assertions, and closed by scoped re-review with no directly consequential Critical/Important findings. Direct scenes and story navigation now select the displayed graph family; same-family focus is retained and cross-family focus resets. Intermediate failures are recorded in review-resolution.md; only current executed receipts are counted above.

## Media, visual and portability boundaries

Archify2.17,9 active r02 variants validated and exported with complete semantic node/edge fallback. All9 standalone viewers have automated multi-viewport receipts; representative English/Chinese light/dark screenshots were visually inspected, not every image individually.

No new video samples are required or produced. Existing DMO-A01/A02 r01 assets remain unchanged. Host playback only advances presentation focus. Glass is translucent CSS/backdrop blur and gradient-highlight simulation, not physical optical refraction.

The authoring and QA scripts reference this machine's installed runtimes. The delivered prototype uses local static assets; moving the authoring toolchain to another machine requires path configuration. Browser verification is Chromium, not Safari/Firefox or screen-reader certification. Local role-safe rendering is not production authorization security.

## Handoff boundary

`../04_operating_model/batch-d/downstream-e-interface.json` exposes existing condition IDs, unresolved waits, scopes, revisions and dependency references for later QA/Readiness work. It does not implement Batch E. Review this increment before authorizing another group.
