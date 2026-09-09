# Source-qualified dependency crosswalk — Round A

All dependencies are candidate design rules, not bank policy. Runtime meaning follows SRC-010 Discussion 2 §7. Bare DEP numbers are prohibited because SRC-009 IA v0.4 §6 and SRC-010 reuse the same numbers for different relationships.

| Runtime key | D2 meaning | IA semantic counterpart | Round A |
|---|---|---|---|
| SRC-010:DEP-01 | Intake → Conflicts | SRC-009:DEP-01 | Skeleton |
| SRC-010:DEP-02 | Entity → preliminary screening | SRC-009:DEP-02 | Skeleton |
| SRC-010:DEP-03 | Scope → requirements | SRC-009:DEP-03 | Authored scope input; no scope CRUD |
| SRC-010:DEP-04 | Requirements → retrieval | SRC-009:DEP-04 (part) | Executable slice |
| SRC-010:DEP-05 | Evidence → residual request | SRC-009:DEP-04 (part) | Executable slice; response returns to review |
| SRC-010:DEP-06 | Population → comprehensive run | SRC-009:DEP-02 (part) | Read-only synthetic context |
| SRC-010:DEP-07 | Finding → human review | SRC-009:DEP-08 (part) | Executable slice |
| SRC-010:DEP-08 | Risk indicator → EDD | SRC-009:DEP-08 (part) | Separate unknown applicability |
| SRC-010:DEP-09 | Scope → Legal | SRC-009:DEP-05 | Read-only awaiting execution |
| SRC-010:DEP-10 | Scope → Credit | SRC-009:DEP-06 | Read-only condition pending |
| SRC-010:DEP-11 | QA gap → remediation | SRC-009:DEP-10 | Read-only QA pending |
| SRC-010:DEP-12 | Conditions → readiness | SRC-009:DEP-11 | Derived blocked result |
| SRC-010:DEP-13 | Readiness → publication | SRC-009:DEP-12 | Skeleton; no publishing action |
| SRC-010:DEP-14 | Evidence adequacy change → re-evaluation | SRC-009 §8, not an equivalent DEP key | Deferred P1 |

IA SRC-009:DEP-07 (Credit/Legal agreement-version handoff) and SRC-009:DEP-09 (incremental QA versus sign-off) do not have a one-to-one D2 dependency row. They remain source-scoped seeds; neither is silently mapped to the same-numbered D2 key.

Minimum prerequisites, wait fields and resume events are carried by the concrete Dependency records. Scope of a hold is a WorkItem field. A blocked screening work item does not alter independent Legal, Credit or Conflicts state. Unknown EDD applicability is retained; a name match alone never sets it to required or not_required.
