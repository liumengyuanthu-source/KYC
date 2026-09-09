# Batch E candidate contracts

Generate with `node 04_operating_model/batch-e/build-contract.mjs`. This uses the same mechanical JSON generation workflow as Batch D. Source changes use apply_patch.

The ten named snapshots are authored continuations of the same D-entry case. E entry does not close earlier B/C unknowns. The package adds a reported-only independent Signatory S so the complete inventory can explicitly cover that person; actual signing authority requires its own review event. Person T's earlier C unresolved decision remains historical, and B coordination evidence is kept separate from identity and signing authority.

`approved-synthetic-package.json` is an inspectable set of demo facts, not a bank policy. Context, KYC evidence, ownership purpose assessment, Conflicts, full population/coverage, independent EDD applicability, signatory authority and Legal execution each require an explicit guarded event. Unknown booking/policy fields on the original scope stay null; a separate scoped synthetic context decision records the demo context.

`action-contract.json` is the Task 2 integration contract. Only `clearanceProjection` determines E readiness; do not call the legacy candidate_ready predicate or older writers on an E session. All three lenses read that same projection. `save_draft` only versions a role's draft in the existing workItems store and records audit/snapshot history; it does not submit a business action.

All schemas are additive candidate v0.1. `clearancePrerequisites` stores derived evaluation history, while existing `clearanceConditions`, dependencies, holds and evidence-use assessments remain the actual inputs. Prior condition revisions are retained in conditionHistory. ClearanceDecision and PublicationEvent are separate records. No trade execution or external integration exists.

Coverage is deliberately bounded to the reviewed package: all five known parties have explicit membership determinations (A/B/T/Signatory S included; Contributor O explicitly excluded for the named category), and four required runs have scoped subject snapshots. Extra parties, requirements or conditions fail closed. A changed scope or Credit input needs a new reviewed package; this slice does not invent one.

Native coverage and exact run output are in `.superpowers/sdd/2026-09-08-batch-e-f/task-1-report.md` and its logs. UI/browser portions of RT18–20 remain NOT_RUN until Task 2.
