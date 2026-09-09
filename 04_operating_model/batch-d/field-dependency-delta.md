# Batch D field and dependency delta

Approved design source: SRC-019 Final v1.0. Additive candidate, not production schema or bank permission configuration.

| Area | Increment | Preserved boundary |
|---|---|---|
| Collections | conflictReviews, conflictFindings, creditAssessments, creditConditions, agreementInputs, legalAgreements, conditionHistory | Existing case/scopes/entities/authorities/evidence/requests/screening data retained |
| ProfessionalCondition | Read-only interface over existing three clearanceConditions IDs | No duplicate mutable readiness store |
| Conditions | Legal/Credit/Conflicts revision1→2 only in explicit D authored fixture | Old condition records retained in conditionHistory; A/B/C fixtures not rewritten |
| Credit result | Required; assessment complete; approved subject to documented trading condition | No amount, bank approval role, SLA or trade entitlement |
| Legal | AGR-01 agreement revision03 consumes AI-01 input revision01 | Internal approval, execution and signatory authority remain separate |
| Version simulation | Explicit facilitator command appends Credit/CC/AI revision02 and a synthetic decision | AGR-01 revision03 still consumes AI revision01; input shown superseded; no silent overwrite |
| Dependencies | Version-addressed D edges added to existing dependencies | Original source-qualified A/C edges unchanged; SRC-009:DEP-07 is not SRC-010:DEP-07 |
| Holds | Existing holds extended compatibly with task/branch/case/unknown scope | Unknown prerequisite/dependency impact blocks affected work; independent work not blanket stopped |
| Readiness | Derived from the existing condition store | Not Ready; screening coverage, Legal execution, Conflicts and QA remain open |

The supplied C-referred story snapshot has case revision34. D-entry is an authored synthetic case revision35, not a history claim that a real credit approval was executed. A live user session is archived before explicit D loading. The changed fixture demonstrates an actual guarded local simulation command, not playback writeback.

Field dictionary contains277 field/alias entries with metadata; candidate validation covers two snapshots and reports its actual checks. Earlier Legal revisions01/02 were not supplied and are not invented. Raw fixture and runtime states remain local synthetic data.

Bank questions D-Q01–06 are in `00_governance/batch-d/business-questions.md`. Batch E receives the existing condition IDs, explicit wait/dependency state and version refs through downstream-e-interface.json; no Batch E behavior is implemented.
