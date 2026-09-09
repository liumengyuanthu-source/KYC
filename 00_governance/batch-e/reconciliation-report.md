# E-T00 — repository and source reconciliation

Date: 2026-09-08. Approved design is not bank validation. Local-only implementation.

## File / delta map

| Existing physical location | E increment |
|---|---|
| prototype/case-engine.mjs | Keep legacy non-E readiness; do not interpret candidate_ready as authorised confirmation |
| prototype/specialist-engine.mjs; 04_operating_model/batch-d | Consume same-case D entry: conflicts pending, Credit condition approved, Legal execution pending |
| prototype/screening-engine.mjs; batch-c | Preserve Person T unresolved/referred decision and open population; any later closure needs explicit new reviewed synthetic events |
| batch-b requirements/evidence/requests | Map ownership/control requirement and purpose assessment before allocating E aliases |
| prototype/clearance-engine.mjs (new) | Guarded E remediation, prerequisites, snapshots, confirmation and publication; no external writes |
| prototype/app.mjs; navigation.mjs; content.mjs | Minimal E scene/product/return integration after engine verification; retain D3–D5 |
| prototype/clearance-ui.mjs (new) | Clearance and QA Remediation Detail only |
| prototype/diagrams/batch-e (new) | Installed Archify source, checked HTML and static output for DG-E01–03 |
| 04_operating_model/batch-e (new) | Additive candidate schema, field/alias/dependency delta, action contract, independent literal oracle |
| 00_governance/batch-f/reconciliation-report.md | Historical preflight remains; supersede missing-E blocker only after actual E verification |

## Source-qualified DEP crosswalk

| Source-local relation | Existing semantic interpretation | E treatment |
|---|---|---|
| SRC-009:DEP-09 | Continuous QA / final sign-off | Reuse QA condition; add explicit check/rereview chain |
| SRC-009:DEP-10; SRC-010:DEP-11 | QA gap → remediation | Exact ownership/control purpose gap only; not blanket rework |
| SRC-009:DEP-11; SRC-010:DEP-12 | Conditions → readiness | Reuse clearanceConditions and source-qualified dependencies; evaluate current versions |
| SRC-009:DEP-12; SRC-010:DEP-13 | Readiness / authority → publication | Separate ready snapshot, authorised decision and publication event |
| SRC-010:DEP-14 | Evidence adequacy change → reevaluation | Retain original artifact/decision, reassess current applicability |
| SRC-009:DEP-07 | Credit → Legal version chain | Reuse D dependency IDs, not SRC-010:DEP-07 (finding → human review) |

E aliases REQ-B05/EUA-05/QA-04/GAP-QA-01/RT-01 require runtime mapping in the task-1 contract; no naked alias overwrite. Top-level source CSV ends at SRC-008, but subordinate manifests already allocate later namespaces; E/F must inspect these before extending them.

## Material compatibility boundaries

- D's legacy-writer guard is deliberate: legacy actions rewrite dependencies without knowing D. E must not invoke those actions on its advanced session.
- D entry is an explicit authored continuation of C-referred, not proof of full screening closure. E Final authorises later synthetic closure events, which need their own inputs and history.
- Booking and policy remain unknown in D. E may model explicitly sourced demo context, never silently fill bank context or infer it from language.
- Bank signatory and final clearance authority remain unknown; demo role configuration is separate from real authority.
- The prior F preflight is paused, not completed. Latest user approval is E first, then F. D6 remains paused.

Implementation and UI tests are pending; this reconciliation is not a pass receipt.

## Subsequent implementation status — 2026-09-08

The paragraph above records the E-T00 preflight state, not the current acceptance status. Task 1 data/actions/contracts is now independently accepted after two fix rounds. E source is SRC-020; F reserves SRC-021. Final E native suite: 46 passed. Exact artifact hashes, source-qualified alias/dependency deltas and state/UI test separation are recorded in `acceptance-status.json` and `04_operating_model/batch-e/`.

The ownership requirement is reused from Batch B; its missing purpose assessment is added explicitly. New synthetic closure records preserve original B/C history. Eight exact legacy/D contribution records have source-qualified historical exclusions tied to E's new prerequisite basis, not generic exemptions for unknown or old dependencies. Additional current unknown inputs/dependencies fail closed.

Task 2 UI/return/bilingual/print verification is in progress. The F gate remains closed until that E host work is verified and reviewed. D6 stays paused.
