# Controlled S1 fix report

Date: 2026-09-08  
Case: `DEMO-CTT-001`  
Scope: three reproduced S1 presentation defects only; no business-engine, permission, policy, SLA, fixture, capture, commit, push, or reset change.

## Outcome

1. The D5 hero guidance now derives current problem, owner, next actor, recommendation, reason, bounded consequence, and at most one primary action from the existing `productProgress` projection and `projection.actions` guards.
2. Internal CORE-CONTEXT now displays the existing recorded scope business purpose (`FX forward for future USD procurement payments`). Safe RM/Client projections still return before this internal field is read or emitted.
3. SCN-READINESS on an existing current Batch C case now opens the existing read-only current-case Clearance panel without loading a D fixture. An active D session retains the original Condition Detail route. Navigation continues through the existing `PRODUCT`/return-token path.
4. D5 focus and selected-step styles now use the already-declared `--blue` token instead of undefined `--accent`; no palette value or visual system was added.

## Root causes

- Hero text was hard-coded in `productWorkspaceHtml`, while primary emphasis separately inferred “request identity” from branch existence. Both ignored received evidence, current assessments, resume state, and recorded decisions.
- SCN-READINESS was universally mapped to the Batch D `condition` entry even when the current C case already had an existing `readiness(data)`/clearance surface.
- `product-experience.css` referenced `var(--accent)` for focus, selection, and issue border, but the loaded CSS declares `--blue`, not `--accent`; the browser therefore computed `outline-style: none`.

## TDD evidence

### RED — state guidance

Command:

```text
node --test prototype/tests/product-experience-guidance.test.mjs
```

Observed before implementation: `8` tests, `1` pass, `7` fail. Failures were the missing current-state summary/action behavior and locale coverage; the RM/Client safe-projection test already passed.

### RED — scope/readiness bridge

Same command after adding the next tests, before production changes: `9` tests, `7` pass, `2` fail. Missing behavior was the readable FX-forward scope and conditional current-C readiness route.

### RED — visible focus

Same command after adding the focus-token regression, before the CSS repair: `10` tests, `9` pass, `1` fail. Failure showed remaining `var(--accent)` references in issue, selected-step, and `:focus-visible` rules.

### GREEN — focused

Command:

```text
node --test prototype/tests/product-experience-guidance.test.mjs
```

Final output: `10` tests, `10` pass, `0` fail.

Covered inputs/behaviors:

- fresh journey fixtures for no evidence, dispatched request, received evidence, insufficient purpose assessment, and recorded unresolved result;
- a resumed state produced from the fresh assessed fixture through the existing `resume_branch` engine action;
- RM/Client safe projections;
- zh-CN, en-AU, and en-US output;
- unchanged source state for every rendered case;
- no stale request-again summary after dispatch/receipt/assessment;
- no repeated-decision primary after a recorded result;
- at most one available primary task action;
- current-C readiness bridge versus active-D condition routing;
- declared token use for focus and selected-step presentation.

### GREEN — browser audit

Command:

```text
node audit/tests/context-extra.mjs
```

The sandboxed first launch aborted because Chrome could not be managed (`kill EPERM`). The required rerun with local-browser permission passed `3/3`:

- horizontal Current/Target return anchor: passed (`760` → `760`);
- source expansion and keyboard-visible focus: passed; computed `outline-style` is `solid`;
- timing disclosure remains read-only and creates no entered event: passed.

The script wrote its standard `audit/reports/context-extra-results.json`, `audit/screenshots/actual/source-detail.png`, and `audit/screenshots/actual/progress-detail.png`. It did not edit journey captures.

### GREEN — full native suite

Command:

```text
node --test prototype/tests/*.test.mjs
```

Final output: `330` tests, `330` pass, `0` fail, `0` skipped.

## Product files changed

- `prototype/product-experience/ui.mjs`
- `prototype/product-experience/projection.mjs`
- `prototype/product-experience/product-experience.css`
- `prototype/app.mjs`
- `prototype/tests/product-experience-guidance.test.mjs` (new focused test)

Pre-fix product copies:

- `audit/environment/pre-fix/ui.mjs`
- `audit/environment/pre-fix/projection.mjs`
- `audit/environment/pre-fix/product-experience.css`
- `audit/environment/pre-fix/app.mjs`

Exact controlled patch: `audit/reports/controlled-fix.diff`.

## Constraint checks

- Existing action keys and navigation attributes are reused: `request_identity`, `assess_identity`, `resume_branch`, `record_unresolved`, `refer`, and `PRODUCT` with `clearance`/`condition`.
- Primary styling is applied only when the corresponding existing projection action is allowed and inputs are not stale.
- Recorded results take precedence over action suggestions, preventing repeat-decision emphasis.
- No readiness, policy, permission, owner, SLA, approval, exclusion, or clearance predicate was added.
- No engine or guard was modified.
- No D fixture is auto-loaded.
- No commit, push, or reset was performed.

## Parked concerns (not changed)

- On 1366×768 captures, evidence/actions begin around y=660 and workshop controls dominate the Client first screen. This is a broader hierarchy/layout issue outside the bounded S1 fixes.
- Heading/metadata cleanup and header-density reduction remain S2 and were intentionally not addressed.
- The current clearance panel is the existing shared read-only projection; this fix changes only how the current-C SCN-READINESS action reaches it.

## Fix round 1 — runtime route and command semantics

Review result: the initial source-regex route test was inadequate. `specialistSceneHtml()` supplied an earlier visible Product button with `data-value="condition"`; browser automation and users reached that action before the corrected footer. The resulting product surface was the Batch D authored-preview/fixture-load entry, reproduced in the preserved `audit/reports/surfaces-fix1.json` result `readiness-not-ready`.

The first-fix versions were preserved under `audit/environment/fix-round-1-pre-fix/`. The round-only patch is `audit/reports/controlled-fix-round-1.diff`; the cumulative patch remains `audit/reports/controlled-fix.diff`.

### Round 1 RED

Commands:

```text
node --test prototype/tests/product-experience-guidance.test.mjs
node audit/tests/readiness-guidance-fix1.mjs
```

Observed:

- Native focused test: `10` tests, `9` pass, `1` fail. The failing test proved the generic `data-value="assess_identity"` command was still present.
- Runtime browser test: `4` checks, `1` pass, `3` fail.
  - current C first Product action was `condition`, expected `clearance`;
  - RM/Client first Product action was `condition`, expected safe `screening`;
  - generic assessment command existed and could bypass explicit outcome selection;
  - active D correctly remained on `condition` (control case passed).

### Round 1 implementation

- Every visible Product action in the current-C SCN-READINESS modal is remapped at render time, not only the footer.
- Internal configured roles route to the existing read-only `clearancePanel()` for the same case.
- RM and Client do **not** enter that legacy internal panel because it exposes condition-level data outside the D5 allowlist. They route to the existing role-filtered `screening` progress surface instead; no read filter was relaxed.
- Active D sessions retain `condition` and the existing return token.
- The generic `assess_identity` task button was removed. When assessment is currently allowed, guidance promotes the existing `c-back-review` navigation to `screening-evidence`, where the user must explicitly choose `insufficient` or `unknown`; navigation does not write case state.

### Round 1 GREEN — real browser path

Command:

```text
node audit/tests/readiness-guidance-fix1.mjs
```

Final output: `4/4` passed.

- Current C: Return Journey → SCN-READINESS → first Product action → `clearance`; case revision remained `20`, `batchD` remained absent, data was byte-for-structure unchanged, visible result was `Not ready to trade`, and zh-CN return restored SCN-READINESS/current/modal exactly.
- Active D: first Product action remained `condition`; revision `35` data stayed unchanged.
- RM/Client: first Product action routed to safe `screening` progress; Email guidance remained visible and restricted Person T/condition/rationale strings were absent.
- Assessment: no generic write command existed; the CTA navigated to `screening-evidence`, showed explicit `Assess as insufficient` / `Assess as unknown` choices, retained revision `30`, and left all data unchanged.

Machine-readable browser result: `audit/reports/readiness-guidance-fix1-results.json`.

### Round 1 GREEN — native verification

```text
node --test prototype/tests/product-experience-guidance.test.mjs
# 10 tests, 10 pass, 0 fail

node --test prototype/tests/*.test.mjs
# 330 tests, 330 pass, 0 fail, 0 skipped
```

No engine, reducer, projection permission, policy, SLA, D fixture, or state model was broadened in fix round 1. No final root capture was modified by the new browser regression; it writes only `audit/reports/readiness-guidance-fix1-results.json`.
