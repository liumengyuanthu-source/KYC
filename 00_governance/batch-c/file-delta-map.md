# C-T00 — Repository and source-qualified reconciliation

Authority: user request plus SRC-016, Batch C Final v1.0. Only C v0.1 is superseded. IA v0.4 (SRC-009), D2 (SRC-010), A Final (SRC-013), B Addendum (SRC-015), and approved A media remain intact. Final approves demo design, not bank policy, evidence sufficiency, generated diagrams or passed application tests.

Baseline inspected: existing checkout `codex/clear-to-trade-bootstrap`; prototype is untracked. Fresh `node --test prototype/tests/*.test.mjs`:100 passed,0 failed. No package manager or new framework needed: native ES modules, HTML/CSS, Node test runner, local static server, bundled Playwright/Chrome. Preserve unrelated dirty files. No commit/push/remote publication in this increment; review uses pre-change copies and exact diffs.

## File / delta map

| Existing surface | Planned bounded delta |
|---|---|
| prototype/case-engine.mjs; batch-a-engine.mjs | Preserve A and legacy fixture semantics; C has a separate guarded action module over the same case. Legacy Entity A possible-match record is not renamed to Person T. |
| prototype/collaboration-engine.mjs | Add optional requestId selection, filtering and purpose-scoped configuration. Default remains B's authority_gap request. Reuse existing Request/Recipient/Grant/Submission/Intake contracts, never extend an old grant to identity evidence. |
| prototype/screening-engine.mjs; screening-predicates.mjs | New C adapter, immutable query snapshots, current-version decisions, three linked branches, independent EDD and derived coverage. No second case store. |
| 04_operating_model/batch-c/ | Additive logical field contract/schema, fixtures, source/alias crosswalk, literal independent expected outcomes and event receipts. A/B schema files not rewritten. |
| prototype/content.mjs; navigation.mjs | Retain15 scenario aliases and ROUTE-NEW-REL-01. Promote POPULATION/EDD skeletons; MATCH uses Person T C content, not legacy Entity A output. Add semantic C/Reference return context without old locale or business snapshot restore. |
| prototype/screening-ui.mjs; screening.css; app.mjs; index.html | Population / Review / Evidence / EDD / Activity inside existing Prototype; scene References in same central container; no third entrance or drawer. Existing black/blue/white design and A media preserved. |
| prototype/diagrams/batch-c/ | Archify2.17 workflowv2 families, static SVG/HTML, source specs, semantic bindings and receipts. No replacement of existing A/B diagrams. |
| prototype/references.mjs; reference-ui.mjs | Unified source-qualified registry, five C cards, SessionR01–36 and available V metadata. Public URLs only; no case context or restricted project download links. |
| prototype/tests; prototype/qa; 00_governance/batch-c; 07_output | TDD plus fresh actual browser/state/print evidence and RT-C01–68 accounting; unsupported paths explicitly not-run. |

## Stable IDs and interfaces

- Case:`DEMO-CTT-001`; Scope:`DEMO-CTT-001/scope/institutional`; Entity A:`DEMO-CTT-001/entity/harbour`; B:`DEMO-CTT-001/entity/entity-b`; T:`DEMO-CTT-001/person/person-t`.
- B request:`DEMO-CTT-001/request/authority_gap`; original items:`request-item/authority-coordinate` and `request-item/ownership-control`. Their histories, statuses and grants remain unchanged when C creates its distinct targeted request.
- B `B-coordination-assessed` authored snapshot exists, with EV-A05 and coordination-only assessment. Current browser session is not assumed to equal that snapshot. Default C entry continues actual current B data; any fixture loading must be explicit and archive the current session.
- Existing `finding/possible-match` concerns Entity A; C allocates a distinct Person T finding only after a synthetic result event. No EV-ID-C01 at entry. Existing supplement and EV-A03/05 are not identity proof for T.
- Existing sufficiency remains `not_assessed/sufficient/insufficient/unknown`; applicability remains `required/not_required/unknown`. No `safe`, `whitelisted`, or global client approval field.
- Body actions and diagram decision views consume a shared predicate registry with rule IDs; semantic nodes are display bindings, not database tables. Branches reuse WorkItem and request references and keep original finding/population/EDD anchors.

## Source and dependency crosswalk

| Qualified alias | Registry / semantic mapping |
|---|---|
| S-C01 | SRC-007, registered Sanitised Process Map.pptx, slides1/2; `(1)` filename is not assumed byte-identical. Source records preserve file/slide/state/lane/rawID. |
| S-C02 / S-C03 / S-C04 / S-C05 | SRC-010 / SRC-015 / SRC-013 / SRC-012 respectively |
| S-C06 | Original P0/P1 `(1)` not found; derivative references retained, no claim of reading original |
| S-C07 | C v0.1 superseded; not present in bounded inventory; Final supplies active contract |
| S-C08 | New SRC-017 Session Research and SRC-018 Public Product Visual Links, both found in Downloads; preserve separate source-document aliases |
| S-USER-C / INT-C01–04 | Current approval / SRC-016 project design interpretations, not external or bank policy |
| SRC-009:DEP-02 | Splits by semantic endpoint to SRC-010:DEP-02 preliminary and DEP-06 comprehensive |
| SRC-009:DEP-08 | Splits to SRC-010:DEP-07 finding review and DEP-08 independent EDD |
| SRC-009:DEP-07 | Credit→Legal version loop; NOT SRC-010:DEP-07 screening |
| SRC-009:DEP-05 / SRC-010:DEP-05 | Legal (canonical SRC-010:DEP-09) / residual request respectively; never merge numerically |
| SRC-009:DEP-11 / SRC-010:DEP-12 | Conditions→Readiness; C affects only scoped screening/EDD projection |
| SRC-010:DEP-14 | Purpose adequacy→re-evaluation; Lab interface only, no new live inject |
| SRC-016:R-C03 / SRC-017:R28 | Same official EDD URL; shared source allowed, observations/verification records retained separately |
| SRC-016:R-C05 / SRC-017:R20 | FHIRR5 / R4 respectively; never deduplicate across versions |
| SRC-016:R-C01 / SRC-017:R31 | Wolfsberg landing / PDF related family; distinct artifacts and verification scope |

## Conflicts and truthful limits

1. Legacy screening engine can mark its historical Entity A screening condition satisfied after one local disposition. C must not route its Person T action into that reducer; C coverage remains incomplete while ownership or required tuples are unresolved. Existing archived fixture behavior stays independently testable.
2. B code selects one hard-coded request and several loops inspect all recipients/items. Request scoping must be enforced at reads and actions before adding personal evidence, including RM projections and exports. Regression test original B fields/grants.
3. No reviewed C identity exclusion package / independent sufficiency oracle exists in current materials. Exclusion remains `disabled_pending_fixture_review`. Draft, request and permitted unresolved/referral paths are the runnable deliverable; no forced clean ending.
4. B fixture grant expiry is2026-09-08UTC, not a bank lifetime rule. Use actual time and fail closed on expiry; deterministic tests use explicit fixture time.
5. Archify installed2.17; workflowv2 schema and viewer/delivery contracts read. Supported host integration is static canonical SVG plus host-local focus/semantic controls; no undocumented postMessage command API assumed. First12-node Population candidate is schema-readable but fails3 composition diagnostics; it is not delivered or counted as passed and will be repaired in C-T06.
6. Reference research is inherited, not new web research or updated legal guidance. Missing assets stay unavailable; no real list, PII, or third-party iframe loading.

## Verification and rollback

Run existing Node suite before/after, focused C tests, B regression, diagram schema/semantic validation and Archify deliver/visual-check, then real Chromium host tests (return/dirty/role/locale/print/fallback). Record all68 RT IDs as passed/failed/not-run with evidence, never map test existence to passed.

Pre-change files and SHA manifest are stored under `00_governance/batch-c/baseline/`; new files are listed in the change manifest. Rollback is a reviewed restoration of those exact owned files, preserving unrelated changes and session archives; never git reset/clean. No rollback is performed automatically. Bank authority, query/list scope, evidence standards, hold policy, EDD triggers and release remain explicit business questions for Christina/control owners.
