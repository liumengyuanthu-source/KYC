# S2 state concept — not a client schema

Status: DESIGN_HYPOTHESIS. The original S2 concept below is preserved. Approved D2 A–F demo implementations extend the domain coverage; this is not a client schema.

F consolidation entry: `batch-f/shared-case-spine.json`, `batch-f/state-dictionary.json`, `batch-f/field-dictionary.json` and `batch-f/dependency-register.json` are derived indexes with physical canonical source paths, not new business-state stores. Runtime remains the active same-case objects owned by the existing A–E engines. F reads the verified E evaluator and never maps legacy candidate_ready to clearance. Additional states and qualified aliases remain explicit.

Domain coverage: Case/Scope; Party/Authority; Requirement; Evidence; Work; Decision/Specialist; Dependency; Clearance. Conditions remain `clearanceConditions`, dependencies `dependencies`, holds `holds`, assessments `evidenceUseAssessments`, snapshots `readinessSnapshots`. Readiness, authorised decision, publication and trade execution remain distinct; this prototype does not execute trades.

Canonical state definitions are in state_dictionary.csv; transitions are in state_transitions.csv. The requested name state_transition_table.csv is an alias, not a second master.

Requirements and evidence are separate domains. A case also needs per-requirement and per-evidence records: one aggregate status cannot describe several gaps progressing in parallel.

Proposed fields: case reference; context version; policy version; requirement reference; evidence reference and source; retrieval timestamp; gap reason; accountable role; next action; decision actor/reason/time; readiness impact. No live client records are used.

The happy path is not mandatory: sufficient existing evidence goes directly from sourcing to review without a client request. Insufficient evidence returns to an open gap. A material context change reopens requirements and invalidates affected evidence decisions.

S2 evidence-pack acceptance is not QA sign-off, EDD approval, Legal/Credit clearance or cleared-to-trade status. Final clearance must separately reconcile all applicable prerequisites and authorised decisions.
