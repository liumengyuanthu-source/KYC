# D5 Experience Quality Gate Implementation Plan

> **For agentic workers:** Use executing-plans for the tightly coupled audit sequence; use subagent-driven-development if a bounded product fix is required. Preserve this workspace's uncommitted baseline.

**Goal:** Audit the completed D5 Person T slice against the supplied quality gate, correct only demonstrated S0/S1 defects and stop for Christina review.

**Architecture:** Keep audit tooling, contracts, fresh evidence and reports in `audit/`. Reuse existing native browser and unit-test contracts. No new business engine or visual system.

**Tech Stack:** Existing native HTML/CSS/ES modules, local Chrome, Playwright Test, axe.

**Spec:** `/Users/christinaliu/Downloads/CLEAR_TO_TRADE_PRODUCT_EXPERIENCE_QUALITY_GATE.md`; D5 v0.2 MD and Bindings in `00_sources/d5/`.

## Global Constraints

- Protect current black/blue/white/warm-glass tokens and all uncommitted work.
- Synthetic case DEMO-CTT-001 only; no real bank policy, authority, SLA or integration.
- No push, publish, merge, reset, remote screenshot service or Figma installation.
- Fresh evidence only. Missing fixtures and unavailable tools remain NOT_RUN / NOT_ASSESSABLE.
- Contract/inventory precede screenshots. S2/S3 remain review recommendations.

## Audit sequence

- [x] T00–T03: Record environment/source hashes, full priority and thin remaining scenario contracts, current token/component inventory. Build contracts from original binding IDs, including each action's reads, outputs, forbidden effects and oracle. Command: `node audit/scripts/discover.mjs`.
- [x] T04–T07: Adapt existing actual C journey into audit namespace with P1–P8 / CHK-01–04 receipts; run original engine/time/context suites into fresh logs. Preserve existing fixture semantics: unresolved is a valid bounded result, not exclusion or clearance.
- [x] T08–T10: Scan fresh journey checkpoints with axe; test keyboard/focus and required desktop/tablet sizes plus mobile catastrophe. Capture stable screenshots then use Playwright `toHaveScreenshot()` to compare repeated captures, distinguishing visual repeatability from human baseline approval.
- [x] T11–T13: Inspect ordered fresh screenshots and produce findings, heuristic review, traceability and 15-attack red-team report. Do not infer hidden behaviour from screenshots.
- [x] T14–T15: For demonstrated primary S0/S1, capture failing assertions, make minimal reviewed fixes, rerun impacted gates. Preserve pre-fix evidence. One configuration-specific S1 residual (UX-010) is explicitly parked; no broad redesign.
- [x] T16: Produce executive summary and evidence links, report gate-by-gate outcomes and unavailable checks. Stop for Christina review; visual approval and UX-010 remain open.

## File/delta map

Create `audit/{environment,contracts,ui-baseline,reports,scripts,tests,screenshots,traces,accessibility,ux-audit-assets,tooling}`. Product edits are conditional on reproduced S0/S1 findings and must be listed separately in the final report. No product file is pre-authorised for a stylistic rewrite.

## Execution decisions

- Audit remains in the requested dirty local checkout: a new worktree would omit the untracked D5 product that is the audit subject.
- No commits are made as part of this audit; file hashes and saved pre-fix copies provide the delta boundary.
- The audit sequence is tightly coupled (screens and findings depend on the same actual case journey), so execute locally; delegate only a concrete independent fix/review if needed.

### Task 1: Correct misleading next-action summary in the hero slice

**Files:** Modify `prototype/product-experience/ui.mjs`; optionally add a focused presentation helper under `prototype/product-experience/`; tests under `prototype/tests/`. Preserve CSS tokens and all business engines.

**Evidence:** Fresh `audit/screenshots/actual/journey/review.pack.en-AU.text.txt` and `review.unresolved.en-AU.text.txt`: after receipt, purpose assessment and local decision, the summary still says "Next: prepare the exact gap, request information or refer." After a gap exists none of the available main actions has primary styling. Owner/next actor and exact human question are hidden or absent from first-level context. This is S1 misleading workflow guidance, not a request for a new decision flow.

**Interfaces:** Consume existing `productProgress` projection and its `projection.actions`, branches, evidence, assessments and decisions. Produce a role/current-state-specific summary and at most one available primary task action, without any new write or permission predicate.

- [ ] Write and run failing tests for: no evidence; dispatched request awaiting client; received evidence unassessed; current insufficient purpose assessment requiring resume; resumed unresolved identity; recorded unresolved result; RM/Client safe projection. Assert no stale "request again" summary after receipt/assessment, no repeated-decision primary after recorded result, and unchanged source data.
- [ ] Implement visible current problem, owner/Unassigned, next actor, recommended next action with reason and bounded consequence. Prefer actual assessment/resume/reviewer action when supported by existing guards, otherwise explicit waiting/unassigned. Do not suggest re-requesting simply because information is insufficient. Do not convert a viewed step into work progress. Use existing commands/navigation attributes; no approval/exclusion fixture invention.
- [ ] Make the specific human question explicit in CORE-ACTION: identity remains inconclusive; configured reviewer may record unresolved or referral only; this does not clear the case. Facts/unknowns remain in existing comparison and source sections. Use zh-CN/en-AU/en-US and current black/blue/white tokens.
- [ ] Run focused red/green tests then existing full native test suite once. Report exact files and evidence. Preserve before copies and create an exact uncommitted diff; no git commit/reset/push.

**Report:** `audit/reports/controlled-fix-report.md`; source pre-fix copies in `audit/environment/pre-fix/`. Do not edit audit captures or reports outside this task's files. No subagents from the implementer.
