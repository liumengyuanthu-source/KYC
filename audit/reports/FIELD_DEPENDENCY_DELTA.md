# Controlled audit delta

- Persisted Case, Scope, Evidence, EvidenceUseAssessment, WorkItem, Decision and ClearanceCondition schema: unchanged.
- Stable SCN / PX / D4 / D3 / source IDs: unchanged.
- Readonly D5 projection adds a readable scope label sourced from the current synthetic Scope’s existing business purpose. It is not product eligibility, bank booking confirmation or a new permission.
- UI guidance consumes existing finding/branch/evidence/assessment/decision projections and existing allowed-action guards. Guidance does not write business state.
- Current-C Readiness entry is a navigation dependency; the original return-token contract and active-D route must remain intact. The first implementation missed the modal caller; actual browser failure and correction are retained in the review record.
- The generic assessment recommendation must navigate to the existing explicit-purpose assessment controls; it must not record an unstated Unknown outcome simply because the user asked to inspect evidence.
- CSS replaces an undefined accent token reference with the existing blue token. No new colour, font, radius or glass material system.
- New tests and audit dependencies are local-only. No model, mailbox, screening-provider or bank integration was added.

Exact files and reviewed patch: controlled-fix-report.md / controlled-fix.diff. Final source hash differences: change-impact.json.
