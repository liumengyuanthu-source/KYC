# D5U-T00 — inspected baseline and delta map

Date: 2026-09-08. User requests D5 implementation with delegated UX/UI. Executable scope is D5U-T00–T06 Person T pilot, not T07 rollout. The attachment is design input, not permission to change bank policy or connect systems.

## Baseline

- Branch `codex/clear-to-trade-bootstrap`, HEAD `1e202f5102aaf0726940e0ae8508341ad032b93a`.
- Existing checkout contains user changes and an untracked prototype. No branch migration, commit or cleanup. Ninety actual source files copied before edits; hashes in `baseline/manifest.json`.
- `node 00_governance/d5/baseline.mjs`: 299 passed, zero failed. This is baseline evidence, not D5 acceptance.
- Chrome baseline at `prototype/qa/d5/baseline/screening-before.png`, computed style evidence at `result.json`. 1440×1000, no horizontal page overflow or script error.
- Actual visual source: `prototype/glass.css` root tokens and body typography; existing `studio.css`, `screening.css`, `presentation.css` component hierarchy. Font is Helvetica Neue / Helvetica / Arial / PingFang SC / Microsoft YaHei. Existing dark ink, muted gray, blue and warm paper tokens retained. No claim that an external brand font was installed.
- Baseline issue: evidence comparison consumes most of the first viewport while required human input/actions sit below. Raw field names and finding IDs compete with the task. D5 moves task/evidence/action into a working layout; no new marketing visual assets.

## Source-qualified crosswalk

`node 00_governance/d5/inventory.mjs` verifies the complete original D4 JSON, not the intentionally partial Product-side author module.

| Set | Result | Qualification |
|---|---|---|
| D4 source SHA | `fdaa5d5c172645dd2f0409bbc929a016dd5d78ba0ea24d3b15f2fd79ba3852ad` | Matches D5 metadata |
| D5 bindings SHA | `896f760ceef1725b6a323dcefd559c86a0e0871fac0dcb58f2a91b80e0cb72a0` | Matches pack manifest |
| Actions / parent works / scenarios | 229 / 94 / 15 | IDs, workflow, executors, skill refs and source PPT refs match original D4 |
| MATCH pilot actions | 17 | Six readable display groups; not seventeen new commands |
| Acceptance definitions | 88 | Forty new + forty-eight inherited; original document verification is not runtime evidence |

The exact per-action input/output/source/issue crosswalk is `source-crosswalk.json`. D3/D4 decompositions are design interpretations connected to PPT occurrences, not verbatim bank controls. Prior industry references retain their original qualification; this turn does not claim new external verification.

## File / interface delta plan

| Existing interface | Intended additive consumer | Protected boundary |
|---|---|---|
| `screening-engine.mjs` projection and commands | Product evidence/action core | Current Person T finding, source versions, missing identity, existing disposition eligibility |
| `collaboration-engine.mjs` request/grant projection | Precise identity request and client-safe path | No automatic expansion of two original request items or contributor authority |
| WorkItems / auditEvents / clearanceConditions | Shared progress/status/time projection | Null without evidence; local completion is not clearance |
| `navigation.mjs`, app dirty guard | Cases/history/layout and return continuity | No Case data in return tokens; latest language wins |
| Existing static Archify outputs | Optional dependency module | Read-only; fallback HTML remains usable |
| New local layout preference | Optional module arrangement | Persona + role + workspace + schema; no form/evidence data |

Archify local skill v2.17 read; `doctor` passed. Reuse existing typed/source-backed static diagrams; no new diagram-generation claim. Background blur and gradient highlights remain simulation, not optical refraction.

## Known limitations at start

Current C fixture supports unresolved Person T review and scoped request, not a reviewed-exclusion happy ending. Person T coordinates information but has no established authority for Entity A. Existing historical archives are pre-D session backups, not evidence of a bank-approved historical clearance. Missing historical outcome samples must be explicitly unpopulated rather than approving the current hero case. Actual time fields are synthetic operational event timestamps; the separate authored five-hour example must not enter the Case. D5 email draft is optional and must not displace core work.
