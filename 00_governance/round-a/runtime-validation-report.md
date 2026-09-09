# Round A runtime/schema integration validation

Executed 2026-09-07 using:

`node --test prototype/tests/case-engine.test.mjs prototype/tests/runtime-schema.test.mjs`

Result: 21 tests passed, 0 failed. This includes 11 existing state-transition tests and 10 new runtime/schema integration tests. The new tests were run before implementation fixes and initially showed 9 failures; after alignment all pass.

Each action in requirements confirmation → identity reuse → residual request → supplement receipt → supplement assessment → screening disposition produces a fixture conforming to the draft schema. The checks retain receipt/sufficiency separation, demo role permissions, input-revision guards, separate bank authority unknowns, and the three remaining Legal/Credit/QA blockers. Null booking/policy context prevents candidate readiness even if conditions are manually made green.

Runtime vocabulary is aligned: evidence verification `verified`, screening awaiting human `awaiting_human`, disposition `not_a_match`. `awaiting_response` is an explicit new WorkItem design enum for a recorded residual request awaiting its named response; `awaiting_input` remains the pre-request prerequisite state. Receipt also requires the send audit event. KYC purpose assessment uses its distinct `authority/demo-kycops` record. Empty optional audit rationale is omitted, not represented as null.

Readiness history is preserved. `semantics(data, {history: priorFixtures})` checks historical snapshots against matching stored condition/scope revisions and checks the latest snapshot against current truth. Without supplied prior fixtures, historical checks cover references, revision metadata and internal blocker/result consistency only; they do not reconstruct absent historical condition values. The latest validation is never relaxed.

Limits: these are logical runtime/data checks, not browser navigation, visual, persistence, bank policy or production security certification. Browser acceptance remains separately owned by the parent task. Existing source registers and original supplied files were not modified.
