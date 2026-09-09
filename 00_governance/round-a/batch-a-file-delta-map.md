# D2 Batch A — file / delta map and precedence

Scope: SCN-SCOPE / SCN-ENTITY only. SRC-013 Final v1.0 governs this approved batch; SRC-009 IA v0.4 and SRC-010 D2 retain architecture and source-qualified dependencies. SRC-014 is a media production brief, not selected media or a new bank policy. Latest explicit user black/blue/white palette overrides older violet / NTT working-color suggestions. No D1 reopening, remote publish, push or automatic Batch B.

| Asset | Delta / preserved contract |
|---|---|
| prototype/content.mjs, navigation.mjs | Same 15 SCN aliases, same route ID; two skeletons become authored S1 scenes before Requirements. Five stages and two entrances preserved. |
| prototype/batch-a-engine.mjs | Controlled actions over the same Case, Scope, EvidenceUse, WorkItem, Authority and AuditEvent records. No second business store. |
| prototype/app.mjs, batch-a-ui.mjs, batch-a.css | Scope / Parties / Authority / Tasks within existing product; scenario context, return and print consume current session. |
| round-a/batch-a-spine.schema.json | Additive prototype schema revision; earlier schema and fixture retained. No production-schema completion claim. |
| round-a/batch-a-field-delta.csv | Added physical fields with owner, source, edit and version semantics. Logical aliases below; original field dictionary remains baseline. |
| round-a/batch-a-story-snapshots.json | Read-only authored A0–A3 snapshots from controlled actions. Narrative position never loads these into the live store. |
| round-a/batch-a-dependency-crosswalk.json | Source + raw ID + semantic relation + existing canonical key. No bare DEP IDs. |
| prototype/diagrams/batch-a | Archify 2.17 typed sources, receipts, canonical SVG / HTML; candidate media manifest has null missing paths. |
| prototype/tests + prototype/qa/batch-a | Unit, schema and real browser evidence; reports distinguish failed / passed / not-run. |

## Explicit baseline revision / aliases

Case DEMO-CTT-001, scope DEMO-CTT-001/scope/institutional, route ROUTE-NEW-REL-01 and Entity A physical ID DEMO-CTT-001/entity/harbour are retained. The former synthetic name Harbour Institutional Holdings is superseded for the newly approved fixture by Entity A (Synthetic); it is not a bank/customer name change. FX_FORWARD supersedes the former generic synthetic product code by the user's explicit case brief. New B and T records do not repurpose Alex Morgan's old ID. The old Alex record belongs to the archived earlier fixture only.

The previous fixture began at a later screening slice; the approved Batch A baseline begins at A0. Existing tab data is never auto-migrated. An explicit Archive session & start Batch A control preserves the earlier case snapshot in `versions`, and case data, saved drafts and navigation in `archives`, before starting the approved earlier timepoint. The original fixture remains untouched. Explicit migration and saved-draft preservation were verified in an isolated browser session; this is session storage, not durable backup.

EV-A04 maps to the existing `evidence/registry`; it has no content at A0 and arrives only through `source_result_received`. EV-A01/02/03 receive new stable child IDs. EV-A05 is not received or instantiated. The old screening supplement placeholder is not EV-A05; it remains a separate later-scene interface, with no content at A0.

Legal/Credit applicability in Batch A is unknown, replacing the older slice's later-timepoint branch examples only in the explicitly selected baseline. No authority gap or foreign parent triggers EDD or a blanket freeze.

## Logical-to-physical aliases

| Final logical field | Existing physical field / additive extension |
|---|---|
| requested_product_ids | Scope.product_scope_ids (FX_FORWARD requested, not eligibility) |
| booking_entity_id | Scope.booking_entity_ref; null, never inferred from locale |
| scope_revision | Scope.revision, mirrored scope_revision maintained by actions |
| NaturalPerson / Representative | naturalPersons + representatives.person_id; employer vs principal separate |
| Evidence Use for provisional authority gap | EvidenceUseAssessment.requirement_id may be null; principal + purpose required |
| evidence_use_assessment_refs | Authority.evidence_use_refs |
| source_scene_id | WorkItem.scenario_id |
| Task / Dependency | Existing WorkItem / source-qualified Dependency contract |

Full source-qualified crosswalk is the JSON alongside this map. In particular SRC-009:DEP-05 maps to SRC-010:DEP-09 (Legal); SRC-010:DEP-05 is residual request. IA DEP-07 and DEP-09 remain source-qualified standalone seeds, not same-number D2 equivalents.

## Source availability limits

New Final, Brief, current IA/D2 and existing implementation read. Master Handoff source hierarchy, principles and IDs read for inherited guardrails, not its obsolete whole-project execution schedule. Original P0/P1 named `(1)` file remains unavailable from the earlier bounded inventory; no claim of reading it. Process references inherit the registered source-map evidence; no new claim that the available PPT is byte-identical to the `(1)` file mentioned in design documents.
