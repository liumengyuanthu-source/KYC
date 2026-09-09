# E host integration preflight

Read against Task 2 plan; these are code observations, not new design authority.

## Routing seams to preserve

- `navigation.mjs` currently calculates the D beat offset as `route.length - specialistStory.length`. Appending E beats without changing this offset would silently relabel earlier story positions. Bind D beats to explicit start/index or a single route descriptor; test both D and E positions.
- `enhanceSpecialistHost()` in `app.mjs` rewrites the final five storyrail buttons to D1–D5. Do not leave that positional assumption after extending the route.
- `SCN-READINESS` currently enters `showSpecialistScene()` and has D/C role-safe product targets. An E override needs an explicit E beat/session rule; preserve the earlier D5 view and current C safe progress.
- `renderPrintView()` tests C product and D scenes before its general fallback. E clearance/QA print must resolve before incompatible C/D dispatch, but should not shadow existing C/D print.
- Deep-link allowlist does not currently include SCN-QA/SCN-PUBLISH. Add presentation-only links, not fixture loading from a query string.
- `caseStrip()` currently hardcodes Not ready / Not published, and `workSide()` says publication unavailable. In an active E session these must use E projection; otherwise returning from a cleared scope makes Studio contradict Product.
- `specialistProjection()` intentionally retains D-entry explanatory text (execution pending, signatory unknown) even when its objects are later continued by E, and `isDSession()` can still be true in an E scope-revision-3 session. Do not present those old D explanations as current E facts. Route active E condition work to the E Clearance view (selected group), or clearly show D as authored historical context alongside the current E projection. Preserve non-E D operation. Keep the E writer guard independent even after a scope change makes isDSession false.
- Existing `returnToken` restores Current comparison and semantic camera while retaining latest language. Extend with E presentation beat/snapshot anchor; do not restore old business data from the return token.

## Draft and state boundaries

- `guarded`, `saveDraft`, click `guard`, popstate and beforeunload all currently know ordinary/C/D drafts. E needs all those exits, including role/scene/print where applicable.
- A saved E rationale must be a draft-only event/store. Save cannot dispatch QA rereview, signoff, confirm or publish implicitly. Failed save keeps the dialog and original text.
- Existing D legacy-write lock prevents A/B/C actions from rewriting advanced dependency graphs. E must retain that protection and avoid falsely showing a working legacy action.
- E's action contract explicitly excludes all earlier writers. For older Product destinations during E, provide a clear read-only continuation boundary/current Clearance link and explicit pre-E restore, rather than render legacy C/D assumptions as current facts. Non-E sessions must retain their existing workspaces. This is not permission to rewrite those workspaces or discard prior sessions.
- Session entry/archive confirmation is a separate operation from opening a page. No automatic outcome package load in navigation, Play or Next.
- E generated states are about 398–818 KB each in compact JSON. Existing app `versions.push(before)` on every action would exceed common sessionStorage limits over the complete E route. Do not duplicate every full E state in the legacy versions array: the E state already keeps immutable record/snapshot/event history. Preserve existing pre-E history/archive, persist current E state, and verify reload after the entire action sequence. Surface storage failure honestly; never report a draft as durable if persistence failed.

## Diagram / reference seams

Use `prototype/diagrams/batch-e/manifest.json` and `diagram-handoff.md`. Native HTML is not the embedded primary UI; host SVG and readable semantic steps prevent competing viewer controls.

Relevant existing reference source IDs (inherit observation and verification status; do not reallocate):

| Purpose | Existing source | Existing observation |
|---|---|---|
| Specific remediation / re-review inspiration | REFSRC-cc616f5c6867, FDA/ICH Q10 | SRC-017:R22 |
| Quality risk inspiration | REFSRC-a69324ba5269, FDA/ICH Q9(R1) | SRC-017:R21 |
| Traceability inspiration | REFSRC-3e10e7311eba, GS1 | SRC-017:R18 |
| Provenance inspiration | REFSRC-f9e731b2c4ac, HL7 FHIR R4 | SRC-017:R20 |
| Banking-control research | REFSRC-0c59d273e815, AUSTRAC initial CDD | Resolve its existing observation/binding |
| Independent EDD applicability research | REFSRC-2c963446a9c8, AUSTRAC EDD | Resolve its existing observation/binding |

M6/M8 belong to original sanitised process map SRC-007. Resolve a local-source binding without disguising the original as public industry research. Keep FHIR R5 REFSRC-251cbc0d0dec distinct from R4. Cross-industry references are design inspiration, never bank policy.

`prototype/references/project.mjs` already supports `project_source` with null canonical_url and approved-Final summaries, deliberately excluding the restricted original. Reuse this mechanism for M6/M8 and preserve its original-verification caveat; no need to expose the PPT or invent a public URL. Add E observations/bindings, not a replacement of the earlier C observation.

## Verification qualification

E engine state RT18–20 cannot substitute for real browser return/print/read-only tests. Existing D5 UX-010 permission-config variant remains an acknowledged unrelated audit residual; do not erase it or claim universal permission-independence.

Existing local test seams: `prototype/qa/batch-d/{mainline-browser,return-browser,scene-graph-browser}.mjs` for D; A/B/C adapted regression runners under `prototype/qa/d5/regression/`; latest post-UX-audit D5 host assertions under `audit/tests/{host-browser,guidance-final-wave,navigation-extra}.mjs`. Inspect each harness's paths/fixtures/output before running; older copies may encode intentionally superseded UI selectors. Report that distinction, do not silently weaken assertions. All native tests use `node --test prototype/tests/*.test.mjs`.
