# Round A review handoff

2026-09-07 · Confidential Australian Banking Client · Internal only

## Outcome and stop boundary

First HTML slice implemented for review. **Stop here; do not expand Round B/C without reviewing this slice.** This is not a claim that the entire P0 workshop, all 15 scenarios, a production product or a client-approved operating model is complete.

Local preview: `http://127.0.0.1:8765/prototype/` (loopback server required). [Launch/readme](../prototype/README.md).

Delivered:

- Two-entry HTML application: Studio and Product Prototype; Story / Explore / Print; Current / Target; zh-CN / en-AU / en-US.
- Five-stage, five-viewpoint journey structure; six authored scenes; nine explicitly structural scenarios.
- One shared synthetic case and a continuous route: Requirements → Source → Gap → Validate → Match → Readiness.
- One stateful workspace with real local actions, rationale validation, role gating, history, drafts and explicit return paths.
- [Draft schema](../04_operating_model/round-a/shared-case-spine.schema.json), [405-row field dictionary](../04_operating_model/round-a/field_dictionary.csv), [fixture](../04_operating_model/round-a/synthetic-case-fixture.json), [scenario registry](../03_personas_journey/round-a/scenario_registry.json). Seventeen object definitions cover the requested conceptual objects, with Representative and Authority separated.
- Nine Archify standalone HTMLs and nine supported-export static SVGs: three diagram families × three locales. [Manifest and receipts](../prototype/diagrams/manifest.json).
- [English print proof](../prototype/qa/round-a-print-proof.en-AU.pdf) and [Chinese print proof](../prototype/qa/round-a-print-proof.zh-CN.pdf), eight A4 pages each. All six scenes, nine structural entries and three diagrams present.

## Evidence and actual tests

28 Node tests pass: navigation, authority, false-green protection, schema alignment after each action, revision checks, idempotency, purpose-specific use, dependency status and historical snapshots. Fifteen initial data-contract checks pass. The original 18 Python tests still pass. These are scoped checks, not production security or bank-policy certification.

Main-agent real-browser run completed all six business actions. Case revision moved from 1 to 7, one screening decision was recorded, Evidence and Screening conditions became satisfied, and **Legal / Credit / QA remained unresolved; EDD applicability remained unknown; publication stayed not_requested.** Booking/policy context and final authority also remain unconfirmed.

| Interaction | Observed result |
|---|---|
| Horizontal drag, scene open and close | Isolated browser probe: scrollLeft 405 → 728; close restored 728. |
| Current → Target while scene is open | Same scene retained. |
| Current scene → Target product → Back to Scenario | Origin Current and scene restored; current case data retained. |
| Product → Back to Journey | Modal closed, origin KYC role and scrollLeft 405 restored, case revision 7 retained. |
| Continue Story after exploration | Advanced curated route to Source; did not mark exploration as business completion. |
| Language in product and open scene | Chinese persisted on return; scene, Current and camera preserved. |
| Save / Discard / Stay | All three paths operated in the actual browser; discard reopening had no unsaved text. |
| Browser Back | Returned Product → originating Source modal; case revision 7 retained. |
| Print content | Model contained all 15 scenario IDs and three fully loaded diagrams, independent of viewport. |
| Role permission gate | KYC could not record disposition; configured synthetic reviewer could after assessment. |
| False Green | Screening completion did not clear the case or publish a status. |
| Narrow-screen containment | Chinese Studio at 390×844: document width 390, no operations-cell overflow; normal viewport restored afterward. |

Browser pointer tests, final screenshots, PDF inspection and additional probes: [QA report](../prototype/qa/QA-REPORT.md). Archify deterministic validation, automated browser evidence and perceptual review are reported separately; all nine diagrams passed their respective checks.

## Red-team findings and corrections

1. **Unsupported-trigger action leak:** top navigation allowed an un-authored trigger into operative product actions. Fixed by disabling actions for that context and showing an explicit notice. Retested without a case revision change.
2. **Dirty role / Stay mismatch:** native select showed the proposed role although navigation retained the prior role. Fixed by restoring the authoritative displayed role when Stay is chosen. Retested.
3. **Unimplemented role displayed as KYC:** added an explicit current-role read-only option for Studio-only viewpoints; no implied permissions.
4. **Data schema drift:** runtime enum, authority, nullability and historical-snapshot mismatches corrected. All six action outputs now validate.
5. **Card fit:** increased the shared operations row height after detecting content overflow; no smaller body text used.
6. **Evidence substance:** supplied explicitly fictional comparison attributes rather than treating a received placeholder as the only review content. Missing supplement attributes stay hidden until receipt; no single attribute automatically decides a match.

These findings are implementation defects, distinct from the open business assumptions below. No Lab was exposed or promoted.

## Open questions for review

| Question | Owner / impact |
|---|---|
| Which bank roles may confirm requirements, evidence sufficiency and screening outcomes? | Christina + bank Operations / Financial Crime; replaces only the authored demo permission configuration after validation. |
| What are permitted evidence sources, purpose-specific sufficiency rules and required context? | Policy/data owners; field dictionary and guards. No policy threshold has been invented. |
| What makes EDD applicable, independent of a possible name match? | Risk / Financial Crime; currently unknown, not silently not_required. |
| Who provides final QA sign-off, clearance authorisation and publication? | Process owners; all remain separately unavailable in this slice. |
| Are the differently named `Process Map(1)` and referenced original P0/P1 files additional controlled sources? | Christina; not found under those names. Use available SRC-007 and clearly attributed inherited P0 descriptions meanwhile. |
| Does the six-scene flow provide the right density and narrative emphasis? | Christina / Xiaoming / Coco; review the actual HTML before broader population. |

## Change-impact report

| Area | Change | Preserved / deferred |
|---|---|---|
| Experience | New `prototype/` local app; old eleven-lane Miro visual not reused. | Existing Miro objects, exports and CSVs unchanged. |
| Sources | SRC-009–012 registered in an additive Round A source manifest; active baseline pointer added. | Original sources/hashes retained. No inferred client identity. |
| IDs | SCN aliases map to existing J-M2/J-M3 references; demo child IDs scoped under DEMO-CTT-001. | No invented replacement J01–J15 system. |
| Dependencies | D2 and IA DEP numbering collisions qualified by source/version and crosswalk. | No silent change of original dependency meaning. |
| Data | Shared fixture/schema/dictionary; exact local business state separate from reading state. | No database/API commitment, bank authority or production architecture. |
| Workflow | Versioned actions and historical states; local condition changes only. | Legal/Credit/QA read-only; no EDD auto-trigger or status publication. |
| Presentation | Current/Target pair, semantic camera, modal, return token, localised labels, static diagram embeds. | Independent diagram viewer owns its own gestures; no undocumented event bridge. |
| P1 | Interface boundary retained; no active Lab or controlled inject. | Three Lenses, Shadow State, promotion and what-if deferred. |
| Release | Internal local preview and A4 proofs. | No public hosting, client release, English-only bundle or A3 proof. |

## Known limitations

- Storage is tab-local session storage, not a durable multi-user case service. Role selection is simulation, not authentication.
- Narrative scene outcomes are labelled expected results; they are not proof that an operation has occurred. Current live outcomes come from the shared case.
- Current/Target high-level diagrams retain common source-supported dependencies; proposed Target preparation differences do not invent new Current deficiencies.
- Baseline marker and policy/permission unknowns remain visible. Full evidence sources are restricted project materials, not bundled as bank-approved policy.
- Initial print scope is the full Round A content, not a selectable arbitrary subset. A4 diagram detail is compact; standalone SVG/viewer supports closer review.
- All viewport/interaction evidence is scoped to tested browsers and fixtures; no comprehensive WCAG, touch-device, high-volume, production-security or client validation claim.
- No final feature scores, benchmark research refresh, video assets, workshop decisions or full PRD created. Existing benchmark seeds are not presented as newly verified bank facts.

Recommended review: start with the six-scene route, inspect the screening comparison and resulting remaining conditions, then assess Current/Target and return behaviour. Record specific content/design revisions before extending the mainline.
