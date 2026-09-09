# D2 Batch C — incremental review handoff

Status: Batch C incremental implementation is ready for local synthetic review. Independent code review is closed, including scoped re-reviews; all reviewed Critical/Important findings are closed. This is not completion of all D2, production certification, or a claim that all 68 RT specifications passed. Authority: the user request and SRC-016 Final 1.0; only Batch C v0.1 is superseded. A/B approved content and frozen panel-first/r01 media are preserved.

Open the local [Chinese Population scene](http://127.0.0.1:8765/prototype/?scene=SCN-POPULATION&locale=zh-CN). URL navigation is read-only. Choose “Open product task”, then explicitly continue the current B case or archive the session and open the approved B partial fixture. Detailed walkthrough: `07_output/batch-c-local-review-guide.md`.

## Implemented model and source boundary

- Same synthetic case `DEMO-CTT-001`, AU Entity A / FX forward, SG Entity B reported parent, Person T employed by B. No bank authority is inferred.
- Additive Population/Run/Comparison/Decision/Branch/EDD objects. C entry preserves all existing scoped entities, persons, authorities, B items/recipients/grants, legacy finding and seven clearance conditions.
- Preliminary query, explicit synthetic result, saved review draft, targeted identity request, B intake/release/link, purpose-specific insufficient/unknown assessment, unresolved record and referral are named guarded actions. All are local simulations.
- No supported-exclusion fixture/oracle is supplied. `record_disposition` remains disabled even for the simulated reviewer. Comprehensive-positive and EDD approval-positive interfaces are not configured.
- Independent EDD applicability defaults unknown. Unit-only explicit reviewed demo reasons exercise required/not_required and bounded pack behavior; these test fixtures are not silently enabled in the mainline.
- C readiness is an explicit synthetic not-ready overlay. It does not rewrite legacy clearance conditions or certify bank readiness.

## Reviewable artifacts

| Artifact | Location | Boundary |
|---|---|---|
| C-T00 file/source/DEP map | `00_governance/batch-c/file-delta-map.md` | Source-qualified IDs; missing originals identified |
| Additive schema and dictionary | `04_operating_model/batch-c/candidate-schema.json`, `field-dictionary.json` | Candidate only; no production migration or independent third-party Schema certification |
| Field / dependency delta | `04_operating_model/batch-c/field-dependency-delta.json` | 647 physical field rows: 342 in new collections, 71 additive fields on C records, 234 existing fields reused |
| Replay snapshots and action contract | `04_operating_model/batch-c/screening-snapshots.json`, `action-contract.json`, `literal-oracle.json` | Seven event-derived snapshots, 17 replay actions; never auto-load a browser session |
| Archify assets | `prototype/diagrams/batch-c/active-manifest.json` | Three families × Current/Target × three locales; grouped SVG plus all 36 nodes/54 edges in semantic tables |
| References | `prototype/references/registry.json`, `design.mjs`, `project.mjs` | 41 qualified external observations, four design interpretations, three project-source summaries; no internal originals |
| Media / static fallback | `prototype/media/d2-batch-c/manifest.json`, `static/` | DMO-C01/02 static equivalents; DMO-C03 real working HTML and actual saved-state captures; no video fabricated; 9 standalone HTML fallbacks |
| Actual test register | `prototype/qa/batch-c/red-team-results.json` | Generated only from actual final unit/host receipts; not-run positive paths remain visible |
| Business questions | `00_governance/batch-c/business-questions.md` | Real policy/authority/evidence/hold/list/EDD choices remain unassigned |

## Actual verification — bounded evidence, not production certification

| Layer | Actual result | Receipt |
|---|---|---|
| All Node tests | 176 passed / 0 failed; original baseline was 100 | `prototype/qa/batch-c/unit-results.json` and `.tap` |
| Full C mainline | 18 passed / 0 failed / no page errors | `prototype/qa/batch-c/browser-results.json` |
| C edge cases | 14 passed / 0 failed / no page errors | `prototype/qa/batch-c/browser-edge-results.json` |
| Review regressions | 8 passed / 0 failed; authorized A/B history, three restricted Activity roles, two dirty identity returns, actual pointer-down Reference scroll/locale, EDD owner/question | `prototype/qa/batch-c/review-regression-results.json` |
| Static fallback | 10 passed, including all nine pages without JavaScript, missing SVG and 390px viewport | `prototype/qa/batch-c/static-results.json` |
| A media / host regression | 21 passed / 0 failed / 1 not-run; 51 packaged r01 asset hashes unchanged | `prototype/qa/batch-c/a-regression/`, `a-package-results.json` |
| B collaboration regression | 13 passed / 0 failed / no page errors | `prototype/qa/batch-c/b-regression/` |
| C PDF output | 3 passed; EN internal 22 pages, Chinese internal 18 pages, client-safe one page | `prototype/qa/batch-c/print-results.json`, `pdf-visual-review.md`; final files under `output/pdf/` |
| Archify delivery | 18 selected canonical deliveries; 72 settled desktop measurements across four resolutions | `prototype/diagrams/batch-c/active-delivery-receipts.json`, `desktop-settled-receipts.json` |
| RT-C01–68 | **62 passed / 0 failed / 6 not-run** | `prototype/qa/batch-c/red-team-results.json` and `.md` |

The browser performed explicit query preparation/request, synthetic result receipt, draft save, new identity request, B review/dispatch/authentication/submission/intake/link, insufficient identity-use assessment, authorized unresolved recording and Ops referral. The saved host case is revision 32 / scope revision 3, retains EV-A05, and allocates EV-ID-C01 only after submission. Unresolved and referral records coexist; the seven original clearance conditions and publication status remain unchanged.

Passed RT entries are limited to their listed synthetic model and/or actual browser assertions. In particular, explicit EDD-reason test fixtures are unit-only and are not enabled in the shipped mainline. Archify geometry checks do not certify visual polish of every view. The A not-run item covers Safari/Firefox, native zoom and full assistive-technology verification, not an observed Chrome failure.

### Six not-run RT specifications

| ID | Why not run |
|---|---|
| RT-C16 | Model stale-input conflicts/draft preservation tested; actual browser race against a later subject/provider update not exercised. No concurrent provider adapter/host inject shipped. |
| RT-C18 | Supported-exclusion path disabled: no separately reviewed identity package and independent sufficiency oracle. |
| RT-C21 | After-exclusion EDD independence cannot be exercised while exclusion is disabled; unresolved/referral independence is tested. |
| RT-C22 | Bounded required/applicability/pack model tested with isolated explicit demo config; complete EDD approval-positive path unconfigured. |
| RT-C25 | No new operational Legal/Credit completion action approved here; preservation is not counted as completing that scenario. |
| RT-C31 | Living Case Lab inject remains disabled; mainline independence is tested separately. |

## Honest visual / source limitations

The dense first Population candidate failed composition diagnostics. Refinement was bounded; the active manifest uses the validated r02 MATCH / English Population views and original canonical Population Chinese / EDD fallback. Failed candidates are retained for audit, not embedded. Standalone diagram whitespace remains a polish issue; full semantic reading tables are the functional fallback.

External references retain inherited research status and no new verification date. No fresh regulatory applicability or remote-page availability verification is claimed. The browser verified that a public source click uses the canonical URL and no referrer, with its external request intercepted and aborted; this is not proof of current page contents. Nineteen referenced visual assets were not acquired. S-C06's original P0/P1 file is unavailable; its card explicitly identifies that only the approved Final restatement is available.

## Change impact and reviewed fixes

- Same case store and stable A/B IDs. No upstream schema files, old grants, original request items, legacy Entity A finding or clearance conditions are rewritten by C entry. Optional requestId scoping is the shared B engine change; original B flows have fresh regression receipts.
- Mainline host now routes C scenes explicitly, retains current comparison/role/locale on return, and protects unsaved input on both sides of the identity collaboration round trip. Collaboration returns to the promised screening-evidence destination; ordinary Evidence returns to Review.
- Restricted or unconfigured roles cannot reach C rationale via legacy Case Activity. Authorized Case Activity retains A/B history and includes only C event IDs allowed by the C projection.
- References have their own dialog scroll storage. Fixed R hit areas no longer move away during pointer down. Host images reserve the actual canonical SVG width/height, preventing the EN→ZH asset-load scroll jump without a forced late scroll or editing the diagrams.
- Graph focus, references, media, Story/Continue and print remain read-only. Only named guarded product actions mutate synthetic business state.
- Exact pre-C source copies, owned-file review packages/hashes and scoped test reports are retained in `00_governance/batch-c/baseline/` and `.superpowers/sdd/2026-09-07-batch-c/`. No reset, commit, push or remote publication was performed.

Before a later workshop, confirm the synthetic grant/time configuration: the retained B fixture expires on 2026-09-08 UTC and is deliberately not silently extended. Bank reviewers/control owners still need to confirm population membership, dataset coverage/currency, identity sufficiency, assignment/Hold rules and independent EDD basis/approval. These questions do not authorise Codex to invent policy.

## Downstream interfaces — not automatically implemented

Upstream population confirmation; separately reviewed identity exclusion package and oracle; real scoped reviewer/hold/assignment rules; independent EDD reason and approval contract; Legal/Credit/QA/Conflicts condition actions; a separately approved single shadow inject. No remote service, production integration, commit, push or publication is performed by this handoff.
