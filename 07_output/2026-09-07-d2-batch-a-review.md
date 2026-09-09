# D2 Batch A review — SCN-SCOPE / SCN-ENTITY
Date: 2026-09-07. Status: reviewable local increment, not final D2 acceptance.

## Review entry
Local preview: http://127.0.0.1:8765/prototype/?locale=zh-CN

Open S1 → SCN-SCOPE → Target product. Save the scope, record the synthetic RM clarification, record the working scope. Then Parties → receive synthetic registry → review entity context; Authority → enter rationale → assess → open gap. Return to the source scenario or Journey. The next linked scenario is only navigation: it does not complete downstream work.

A saved earlier demo is not silently reset. Use the explicit archive/start Batch A control if needed. It preserves prior case data, saved drafts and navigation in this browser session. This is sessionStorage, not durable or multiuser persistence.

## Scope and precedence
Only the two approved scenarios were expanded. No site rewrite, D1 reopening, Batch B/C expansion, production integration, remote publish, git push or commit. Existing dirty tracked work and prior Round A files were preserved. The user-approved black/blue/white host remains; violet/mint suggestions in the older media brief were not adopted.

SRC-013 = Final v1.0; SRC-014 = media Brief v1.0; SRC-009 = IA v0.4; SRC-010 = D2 v0.1. Source-supported process, industry reference, design hypothesis and synthetic fixture are distinct; approval of the design does not make it client-confirmed policy.

See [file / delta map](../00_governance/round-a/batch-a-file-delta-map.md), [source manifest](../00_governance/round-a/batch-a-sources.json) and [qualified dependency crosswalk](../04_operating_model/round-a/batch-a-dependency-crosswalk.json). The source-availability limits in the map remain explicit.

## A-T01–A-T06
| Task | Implemented increment | Qualification |
|---|---|---|
| A-T01 | Same-case A/B/T model, evidence arrival, four authored A0–A3 snapshots, fields, events, revision checks | Additive prototype schema, not production / independent JSON Schema certification |
| A-T02 | SCOPE + ENTITY Current/Target, A-01–B-05, zh-CN/en-AU/en-US, linked S1 location and next scene | Does not redesign the full journey-to-scenario information architecture |
| A-T03 | Three Archify diagrams × three locales; static SVG, focus context, typed sources and receipts | Static presentation delivered; standalone perceptual review failed, media absent |
| A-T04 | Scope draft, clarification, working scope, source receipt/review, purpose assessment, idempotent gap/review/request drafts | All local demo actions; no actual bank permission, outbound message or approval |
| A-T05 | Return paths, dirty guard, latest locale, semantic/pixel position, full print scope, read-only Next/Replay | RT-A19 full stale-write browser path and RT-A21 actual media playback not run |
| A-T06 | Unit/schema/repository/browser results, screenshots, field/DEP delta and next-group contract | Review handoff only; no blanket acceptance or automatic continuation |

## Input → output contract
| Input | Real action / event | Output and retained uncertainty |
|---|---|---|
| EV-A01 request; Group A display name; FX forward / USD procurement | save_scope_draft → scope_draft_saved | Versioned draft; booking, eligibility and DD stay null/unknown |
| Authored RM clarification | clarify_counterparty → counterparty_scope_clarified; record_working_scope | Entity A only as proposed trading entity; B remains reported parent, not guarantor |
| EV-A04 initially missing with empty content | receive_registry → source_result_received; review_entity | Source and entity review state; no complete BO/CDD or invented registered identifier |
| T employed at B; claimed principal A; EV-A03 | assess_authority → evidence_use_assessed | A / coordinate_information remains evidence_required; artifact unchanged |
| Same principal + purpose + unresolved gap | open_authority_gap / refer_authority / request_clarification | Traceable work/request draft, Unassigned owner, no due date or sending permission invented |
| Current scope/entity revisions + task prerequisites | preparation() / downstream_preparation_enabled | Only qualifying preparation can continue; signing, trading authority and clearance do not follow |

EV-A01/02/03 are the only available evidence in A0. EV-A04 has a later receipt event. EV-A05 has not been received or instantiated. All authored A0–A3 snapshots remain not_ready. Story frames refer to authored teaching positions; they are never loaded into the live product store. B-02 is a source-arrival cue tied to an explicit product action, not an automatic arrival caused by Next.

## Field and ID delta
- Existing Case DEMO-CTT-001, Scope institutional, Entity A physical ID entity/harbour, route ROUTE-NEW-REL-01 and all 15 SCN IDs retained.
- Explicit approved fixture revision renames the former synthetic Harbour display to Entity A and changes the earlier generic product example to FX_FORWARD. New B/T IDs do not recycle Alex's old ID.
- New NaturalPerson, PartyRelationship and InformationRequest types extend the existing 16 types to 19.
- [Field delta](../04_operating_model/round-a/batch-a-field-delta.csv): 172 added physical-field rows, with metadata; original dictionary remains the baseline. Technical codes and user-entered text are not machine-translated.
- Scope gains group display, proposed counterparty, business purpose, working-scope status, currency and provenance. Existing product_scope_ids and booking_entity_ref remain physical aliases.
- Representative separates employer from claimed principal. Authority has four purposes: coordinate_information, make_declarations, execute_agreement, issue_trade_instruction.
- Purpose-use assessments may carry a null requirement_id before a formal requirement exists; principal/purpose/input revisions still identify the assessed use. New WorkItems carry scope, purpose, gap key, owner, wait and input references.
- Scope/Entity revisions invalidate bound prior decision currency and relevant satisfied requirements. A0 retains the original initial readiness snapshot ID to preserve existing references.
- New earlier Batch A baseline explicitly resets later-timepoint Legal/Credit/Conflicts examples to unknown applicability. The original fixture and earlier saved session are not rewritten.

Artifacts: [schema](../04_operating_model/round-a/batch-a-spine.schema.json), [fixture](../04_operating_model/round-a/batch-a-fixture.json), [snapshots](../04_operating_model/round-a/batch-a-story-snapshots.json), [scenario registry](../03_personas_journey/round-a/scenario_registry.json).

## Source-qualified DEP crosswalk
| Source key | Meaning / mapping |
|---|---|
| SRC-009:DEP-03 → SRC-010:DEP-03 | Scope → requirements |
| SRC-009:DEP-04 → SRC-010:DEP-04 and DEP-05 | Retrieval and residual request are distinct semantic branches |
| SRC-009:DEP-05 → SRC-010:DEP-09 | Scope → Legal |
| SRC-010:DEP-05 | Evidence gap → residual request; not Legal |
| SRC-009:DEP-06 → SRC-010:DEP-10 | Scope → Credit |
| SRC-009:DEP-07, SRC-009:DEP-09 | Retained source-qualified seeds; no same-number D2 substitution |
| SRC-010:DEP-12 / DEP-13 / DEP-14 | Readiness / publication / changed evidence remain later interfaces |

The complete crosswalk preserves split mappings and runtime IDs where present. Empty runtime ID arrays mean an interface/preparation gate, not implemented Legal/Credit work.

## Archify and media
Local Archify 2.17 used. DG-SCOPE-A, DG-ENTITY-A and DG-ENABLE-A each have zh-CN/en-AU/en-US typed specs, HTML, canonical SVG and browser sidecars.
[Delivery receipts](../prototype/diagrams/batch-a/delivery-receipts.json):
- Deterministic delivery: all nine outputs passed 9/9 showcase checks, zero errors/warnings.
- Automated browser evidence: all nine passed, exact artifact hashes matched, four desktop viewport sizes.
- Perceptual standalone review: failed. Inspected ENTITY en-AU default view has excess lower whitespace and native semantic colours outside the approved host palette. Other standalone variants have no individual perceptual approval. This is not hidden behind the automated pass.
- Host uses static grayscale embeds and retains principal, employer, evidence and unknown status as text while focusing. No nested autoplay/navigation conflicts.
- Print-only monochrome SVG derivatives preserve canonical originals and geometry. They are explicitly marked derivatives, not canonical Archify exports. This avoids Chrome's offscreen CSS-filter printing omission.

[Media manifest](../prototype/diagrams/batch-a/media-manifest.json): MED-A-PER-T, MED-A-PER-OPS, MED-A-STILL-SCOPE, MED-A-STILL-ENTITY, DMO-A01/02/03 and VID-A01 are not_received / not_selected. Actual file paths, duration, licence and review reference are null. No stock placeholder claims to be an approved asset.
Static HTML objects, relations, results and SVGs are available. No fake video Play or success state. Candidate revision selection requires explicit approved_for_mainline + review_ref; a newer candidate does not replace the approved item. The selector contract is tested; real media ingest/promotion is not implemented or claimed.

## Verification and RT-A01–RT-A28
Fresh command evidence: [verification-results.json](../prototype/qa/batch-a/verification-results.json).
- JavaScript engine, schema, navigation and print-readiness tests: 51 passed, 0 failed.
- Existing data-contract checks: 15 passed, 0 failed.
- Python repository checks: 18 passed, 0 failed.
- Real Chrome browser checks: 13 + 7 passed; no captured JS exceptions. These counts overlap RT cases and are not 20 additional independent red-team requirements.
- Test-first failures were observed before implementing the Batch A action module; printing was also checked in rendered PDFs, exposing a defect missed by DOM-only tests.

Evidence abbreviations: U = [batch-a.test.mjs](../prototype/tests/batch-a.test.mjs); S = [schema tests](../prototype/tests/batch-a-schema.test.mjs); B = [browser results](../prototype/qa/batch-a/browser-results.json); X = [extra browser results](../prototype/qa/batch-a/extra-results.json).

| RT | Status | Evidence / boundary |
|---|---|---|
| A01 | passed | U/B: group name never merges Entity A/B |
| A02 | passed | U/B: B employment does not confer A signing/trading authority |
| A03 | passed | U/B: EV-A03 availability and assessment do not establish authority |
| A04 | passed | U: null booking permits draft; booking-dependent work waits |
| A05 | passed | B: locale change preserves principal, booking and business data |
| A06 | passed | U/B: recorded scope remains not_ready |
| A07 | passed | U/B: entity resolution leaves BO/CDD unknown |
| A08 | passed | U: completed Conflicts preparation cannot satisfy other conditions |
| A09 | passed | B/X: Save / Discard / Stay; saved values retained |
| A10 | passed | U/B: Next to final beat cannot mutate the case |
| A11 | passed | U/B: same open gap is idempotent |
| A12 | passed | U: unavailable source stays missing, no invented registry result |
| A13 | passed | U/B/X: demo action layer rejects unauthorised role; UI read-only; not production security |
| A14 | passed | U: changed scope or Entity revision invalidates bound prior decisions |
| A15 | passed | U: three read-only projections share snapshot reference; shadow clone cannot mutate mainline; no Lab UI |
| A16 | passed | B/X: actual drag, semantic anchor, pixel offset, role, Current and zoom restoration |
| A17 | passed | U/B/S: only initial three artifacts; explicit later EV-A04 event; no EV-A05 |
| A18 | passed | U: empty condition table / unknown applicability cannot be Ready |
| A19 | not-run | Stale revision rejection passes U; rejected-input retention passes X. Full stale-revision conflict + input retention in one browser path was not exercised; do not substitute the generic invalid-input test |
| A20 | passed | U/B: repeated gap creation yields one task/request, no extra revision |
| A21 | not-run | No independent media sample received. Media reducer / Story Next isolation passes; actual sample-to-end playback untested |
| A22 | passed | B: Current → Target product → Chinese → save → original Current, latest session |
| A23 | passed | B/X: hover, keyboard focus/Esc and touch dismissal; blocker stays outside i-help |
| A24 | passed | B: absent media leaves static relationships/results readable, no fake playback |
| A25 | passed | B/X: full scope from S3/S4, all six SVGs decoded, return restored; PDF-rendered Target omission fixed with print derivatives |
| A26 | passed | S: source-qualified DEP-05 resolves separately for Legal and residual request |
| A27 | passed | U: selector contract prevents newer candidate promotion; real media pipeline not exercised |
| A28 | passed | B: mainline has no Lab runtime dependency and works with unavailable media/Lab routes; future Lab loader not tested |

RT summary: 26 passed, 0 failed, 2 not-run, with the interface-level qualifications above. Standalone diagram visual review is a separate failed quality gate; this report does not claim all acceptance gates passed.

## Screenshots / print evidence
- [Scope scene](../prototype/qa/batch-a/scope-scene.en-AU.png)
- [Scope product, Chinese](../prototype/qa/batch-a/scope-product.zh-CN.png)
- [Authority product, Chinese](../prototype/qa/batch-a/authority-product.zh-CN.png)
- [ENTITY, en-US](../prototype/qa/batch-a/entity.en-US.png)
- [Touch / reduced motion](../prototype/qa/batch-a/touch-reduced-motion.png)
- PDF proof files: prototype/qa/batch-a/batch-a.zh-CN.pdf (13 pages, A0 session) and batch-a.en-US.pdf (14 pages, exercised later session). They intentionally represent different live revisions, not a claim of translation-equivalent snapshots.
- Chinese full print was visually inspected; English Batch A pages and Target page sampled. Final Target diagrams were re-rendered after replacing the offscreen filter. No full English page-by-page visual approval is claimed.
- Existing pre-Batch-A comparison screenshots remain in the prior Round A/glass review pack; no reconstructed “before” screenshot was fabricated.

Fixes found during this batch: closed-modal duplicate help IDs/focus escape; right-edge journey anchor overwritten by scroll clamping; early registry reuse from the old workspace; stale decision currency; and offscreen filtered SVG omission in Chrome print.
Native browser Ctrl/Cmd+P outside Print Preview is not the verified route. Use Print Preview → Print / Save PDF, which waits for every diagram and reports load errors.

## Next-group interface — not permission to proceed
SCN-REQUIREMENTS receives the same Case/Scope revision, A counterparty, B reported relationship, T's separate employer/principal and four-purpose authority status, evidence receipt/use revisions and any open task. “Ready for preparation” is not a completed Requirement or bank eligibility decision.
Legal, Credit, screening population, EDD, QA, publication and Lab consume their own applicability/input/authority/hold gates. None is approved or completed merely by continuing this story. Lab currently has a read-only projection contract only.

## Business review questions
1. Which actual bank roles may record working scope, assess a representative's authority, refer an exception, or send a request? Demo config is not that answer.
2. What evidence establishes T's authority for A and for which purposes? EV-A05 remains absent; EV-A03 is insufficient for A coordination.
3. Who owns the open authority task, and what due-date/escalation policy applies? Unassigned/null retained.
4. Which booking entity, product eligibility, DD classification and Legal/Credit applicability govern the request?
5. What source-access/licensing and recipient/disclosure rules govern retrieval and outgoing information requests?
6. When approved media arrives, which exact revision has review/promotion evidence? No asset is auto-selected.

Known review work retained: journey/scenario integration still needs your later structural design review; standalone Archify polish; exact stale-write UI integration coverage; actual media playback/promotion. These do not authorise another D2 group. Stop here for Christina's review.

