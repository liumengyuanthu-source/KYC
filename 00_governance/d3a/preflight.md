# D3A-T00 — actual repository / source-qualified crosswalk

Design contract: supplied3A Final v1.0. Implementation boundary: T00–T03 plus pilot regression, then T04 human calibration; not all12 full interfaces and not Discussion4.

## Located inputs and existing implementation

Exact paths, hashes and sizes: `source-inventory.json` (12 located inputs).3A and A–F sources reside in `/Users/christinaliu/Downloads/`; IA v0.4 and D2 specification reside in the adjacent `0907 studio building/`; D3 MD/JSON are in `00_sources/d3/`; process deck is `00_sources/raw/Sanitised Process Map.pptx`. Its SHA matches D3's cited differently named deck. This is byte identity, not a new complete PPT visual audit.

Current app is `prototype/index.html` + `app.mjs`, native ESM, no React or package migration. `navigation.mjs` owns view state. `case-engine.mjs`, `batch-a-engine.mjs`, `collaboration-engine.mjs`, `screening-engine.mjs`, `specialist-engine.mjs` own business actions and are preserved. `transformations/content.mjs` already imports15 scenes/94 changes/144 source occurrences and20 references. The existing reference registry remains canonical;17 D3 aliases mapped,3 explicitly unmatched. No fresh internet validation in this run.

E source is available (and was already recorded by F preflight), but E runtime remains absent. F remains preliminary reconciliation, not implemented consolidation. `04_operating_model/batch-d/downstream-e-interface.json`, `00_governance/batch-f/reconciliation-report.md`, `prototype/content.mjs` QA/publication skeletons and current engine corroborate that boundary. Reading E/F does not authorise rebuilding them in3A.

## Author aliases → existing IDs

| Branch | Existing stage refs | Scene refs | Existing changes |
|---|---|---|---:|
|BR-01|S1|SCN-SCOPE|5|
|BR-02|S1,S2|SCN-ENTITY|6|
|BR-03|S2|SCN-REQUIREMENTS|6|
|BR-04|S2|SCN-SOURCE, SCN-VALIDATE|12|
|BR-05|S2|SCN-GAP|6|
|BR-06|S3|SCN-POPULATION|6|
|BR-07|S3|SCN-MATCH|7|
|BR-08|S3,S4|SCN-EDD|8|
|BR-09|S1,S2,S3,S4|SCN-CONFLICTS|5|
|BR-10|S2,S3,S4|SCN-CREDIT|7|
|BR-11|S2,S3,S4,S5|SCN-LEGAL|8|
|BR-12|S4,S5|SCN-QA, SCN-READINESS, SCN-PUBLISH|18|

STAGE1–5 are aliases to existing S1–5; slide_no is a PPT locator, never a journey stage. Multi-stage membership is not a start prerequisite or execution sequence. BR12's QA/remediation/readiness/authorisation-publication are distinct taxonomy roots.

## PC-01 source-qualified mapping

| Existing change | Current occurrence (direct or context) | Target occurrence | Treatment |
|---|---|---|---|
|D3-REQUIREMENTS-01|PPT-S1-SH18-A1|PPT-S2-SH18-A1|Reassigned; rule/review boundary retained|
|D3-REQUIREMENTS-03|PPT-S1-SH18-A3|PPT-S2-SH18-A3|Enhanced; original controls remain separate|
|D3-SOURCE-03|PPT-S1-SH292-A1,A4 (context only)|PPT-S2-SH292-A1,A4|Proposed addition; no fabricated Current claims extraction node|
|D3-GAP-01|PPT-S1-SH292-A2|PPT-S2-SH292-A2|Enhanced; unknown applicability not mandatory request|
|D3-GAP-03|PPT-S1-SH292-A3; PPT-S1-SH9-A1 (context only)|PPT-S2-SH292-A3|Proposed addition; request-item grant not established by source|
|D3-GAP-05|PPT-S1-SH292-A3,A4; PPT-S1-SH9-A1|PPT-S2-SH292-A3,A4|Enhanced; grouped relation, not invented all-to-all edges|
|D3-VALIDATE-04|PPT-S1-SH292-A4|PPT-S2-SH292-A4; PPT-S2-SH281-EX; PPT-S2-SH392-EX|Enhanced; complex sufficiency remains human|

Compact A1,A4 above means separate full occurrence IDs; registry retains full IDs, not this table shorthand. Actor/format provenance remains separate from proposed performer/decider.

Dependencies remain source-qualified and separate from contains/maps_to. Existing `SRC-009:DEP-07` Credit→Legal is not `SRC-010:DEP-07` Screening; no dependency ID is reassigned. PC-01 uses existing RequirementSet/EvidenceUseAssessment/Gap/RequestItem/AccessGrant/Submission interfaces; labels and mapping selection do not emit their events.

## Unresolved questions retained

All15 D3-ISS records remain open: eight source ambiguities, seven cross-document conflicts (full wording and owner in `../d3/reconciliation.md`). Target duplicate M0.1, struck M1.1/Credit activities, partial C2.5 strike, Legal draft origin and actor/authority overlaps are not silently resolved. F applicability remains distinct from B/C review_state. No new bank threshold, actor mandate, evidence acceptance or clearance condition is invented.

## File / delta plan

| Area | Change |
|---|---|
|prototype/reconstruction|Read-only registry, seven-mapping PC-01 localized projection, static Archify source/output manifest|
|prototype/reconstruction-ui.mjs / reconstruction.css|One reusable comparison and inline reference/detail view|
|prototype/app.mjs / navigation.mjs / index.html|Four scenario entries, view-only state/history, existing target-product return, selected branch print|
|prototype/tests / qa/d3a|New TDD and actual-host evidence; historical QA untouched|
|00_governance/d3a /07_output|Baseline, source crosswalk, actual results and human-calibration handoff|

## Baseline visual evidence

Four freshly captured screenshots in `prototype/qa/d3a/before/` were opened: Requirements, Source, GAP, Validate. All load without page errors. Current strengths: consistent glass style, readable business titles, preserved unknowns. Weaknesses relevant to3A: comparison controls precede scene context; GAP puts a long work list first; Requirements/Validate duplicate a collaboration explainer and generic product entry; no explicit scene→comparison→selected-work path. Preserve warnings while replacing that stacked reading order. These four samples are not a new159-file visual pass.

Actual baseline command: `node --test --test-reporter=dot prototype/tests/*.test.mjs` exited0,240 tests. Browser baseline: `node prototype/qa/d3a/capture-before.mjs`,4 captures with no page errors. Archify2.17 schema-based candidate validated9/9 showcase,0errors/0warnings; production diagram delivery and UI tests still pending at T00.
