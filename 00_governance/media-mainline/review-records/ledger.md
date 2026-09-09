Plan: docs/superpowers/plans/2026-09-07-media-mainline.md

| Preflight | Evidence / ruling |
| --- | --- |
| Workspace | clear-to-trade-product, normal checkout, codex/clear-to-trade-bootstrap |
| Base | 1e202f5102aaf0726940e0ae8508341ad032b93a |
| Dirty state | Existing prototype is untracked; existing tracked edits preserved. User explicitly requests mainline integration. Remain here: a HEAD-only worktree would omit the approved baseline. |
| Baseline | node --test prototype/tests/*.test.mjs: 85 passed, 0 failed |
| Scope | Approved DMO-A01 / A02 panel-first/r01 only; no commits, remote push or publish |
| Task 1 | Component implementer dispatched with owned-file boundary, TDD and no subdelegation |
| Task 2 | Controller handles packaging, fallback and host lifecycle |
