# Shared Case Spine field dictionary v0.1

Draft prototype logical contract; all 405 field rows are DESIGN-HYPOTHESIS. See field_dictionary.csv for all 21 IA §7.2 metadata columns and shared-case-spine.schema.json for types. Key presence is mandatory; nullable values preserve explicitly unknown facts. No bank field threshold, policy or authority is asserted.

Business records are SYNTHETIC; their definitions are DESIGN-HYPOTHESIS. Unknown banking policy is retained with question_ref. A demo permission is explicitly separate from a bank mandate.

EvidenceUseAssessment carries evidence revision, requirement, subject and purpose. Artifact receipt, verification, use sufficiency, requirement satisfaction, human decision, condition and readiness are independent fields. A decision must pin input revisions. Published state and trade execution are separate; Round A has no publication or trade action.

CaseScope is named Scope in this draft; Party/LegalEntity is Entity; EvidenceArtifact is Evidence; Task/TaskDependency is WorkItem/Dependency. Representative and Authority remain separate objects. Source-qualified dependency mapping is documented in dependency-crosswalk.md. No production table/API contract is claimed.
