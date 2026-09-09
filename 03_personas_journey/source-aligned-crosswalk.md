# Source-aligned journey crosswalk

Status: source transcription plus design mapping. Source statements and Target proposals are not evidence of approved bank authority. Existing PP and SCN identifiers are unchanged.

## Source-to-catalog mapping

| Source lane | Source steps (Current / Target) | Catalog activities | Shared design scene | Treatment |
|---|---|---|---|---|
| Client | Unnumbered touchpoints across M0, M2–M6 and M8 | `client-initiate`, `client-requirements-response`, `client-respond`, `client-screening-clarification`, `client-clarify-risk`, `client-qa-response`, `client-outcome` | `SCN-SCOPE`, `SCN-REQUIREMENTS`, `SCN-GAP`, `SCN-MATCH`, `SCN-EDD`, `SCN-QA`, `SCN-PUBLISH` | Contextual anchors only; no invented M numbers |
| Sales / RM | M0.1–M0.2, M1.1, lane-specific M3.3, M8.5 | `rm-scope`, `rm-submit`, `rm-request-info`, `rm-communicate` | `SCN-SCOPE`, `SCN-ENTITY`, `SCN-GAP`, `SCN-PUBLISH` | Current RM M3.3 is retained separately as `p1:M3.3:rm`; Target M0.1 duplicate has its own key; Target M1.1 strike-through is ambiguous |
| Client Fulfilment / KYC Ops | M0.3–M0.4, M1.2–M1.5, M2.1–M2.5, M3.1–M3.5, M4.1–M4.5, M8.1–M8.4 | `ops-intake`, `ops-triage`, `ops-requirements`, `ops-source`, `ops-gap`, `ops-validate`, `ops-screen`, `ops-hit-review`, `ops-clear` | Mapped to the corresponding stable SCN IDs, including `SCN-GAP`, `SCN-VALIDATE`, `SCN-POPULATION` and `SCN-MATCH` | Agentic execution is a Target proposal; exception work remains explicit |
| QA Team | M6.1–M6.8 | `qa-evidence`, `qa-signoff` | `SCN-QA` | Source QA sign-off is retained; the diagram does not grant autonomous approval authority |
| Financial Crime Risk / Compliance | M4.6–M4.7, M5.1–M5.8; Target M5.9–M5.10 | `fcr-screen`, `fcr-edd` | `SCN-MATCH`, `SCN-EDD` | Target adds explicit human EDD judgment and approval |
| Control Room | M7.1–M7.4; Target M7.5–M7.7 | `control-search`, `control-resolve` | `SCN-CONFLICTS` | Conflicts starts from M1 information and is not modeled as a late sequential-only step |
| Legal | C1.1–C1.8 | `legal-draft-review`, `legal-execute` | `SCN-LEGAL` | Parallel track. Target C1.3 changes from “Draft required agreements” to “Review drafted agreements” |
| Credit | C2.1–C2.7 | `credit-assess`, `credit-approve` | `SCN-CREDIT` | Parallel track. Target strike-through formatting is retained as ambiguity, including partial strike-through of “Obtain” in C2.5 |

The catalog retains 67 numbered Current source instances representing 66 distinct labels: M3.3 appears once in the Sales / RM lane and once in Client Fulfilment / KYC Ops. It also retains 72 numbered Target instances. Page- and lane-qualified local keys keep duplicates lossless, and every instance is referenced by its corresponding role activity. The design activity layer groups source steps by role objective; it does not replace or renumber them.

## Pain-source treatment

Slide 4 contributes nine categories: Client intake; Requirements distillation; KYC and ID Verification; AML Screening; Risk decisioning; Ongoing monitoring; Offboard; Process orchestration; Reporting. Ongoing monitoring, Offboard and Reporting are retained as `adjacent` context and never attached to executable catalog activities.

Slide 5 contributes six onboarding hypotheses: Multiple handoffs; Manual interpretation; Stakeholder repetition; Fragmented systems / data; Re-work & duplication; Slow onboarding. These are qualitative source claims, not measured bank-specific outcomes.

## Target-only changes and qualifications

- Target repeats M0.1 for RM initiation and agentic booking-model determination. Both are retained without silent renumbering.
- Target M1.1 and several Credit labels are struck through. This is recorded as `ambiguous`, not interpreted as deletion, automation or reassignment.
- Target adds M5.9–M5.10 human EDD judgment/approval and M7.5–M7.7 Control Room investigation/escalation/outcome.
- Target changes Legal C1.3 from drafting to review of drafted agreements.
- Agentic execution, continuously published state and Target sign-off language remain design proposals. Runtime authority continues to come only from approved product controls.
