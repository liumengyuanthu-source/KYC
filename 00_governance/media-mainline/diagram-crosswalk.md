# Diagram and state crosswalk — approved panel-first/r01

Source: `experiments/d2-batch-a-media/MAINLINE_INTEGRATION_HANDOFF.md`, `integration-selection.json`, `source/diagram-contract.json`; user approval in current task. Status: synthetic / approved design, not bank policy. Local Archify 2.17 frozen exports reused; no regeneration or altered SVG geometry.

| Alias | Existing mainline (workflow schema 2) | Selected media (architecture schema 1) | Ruling |
| --- | --- | --- | --- |
| DG-SCOPE-A | request→group→entity→scope→unknown; group→entity labelled RM clarifies | request→group-a display label; request→entity-a pre-authored RM clarification; entity-a→scope | Keep existing mainline workflow. Embed separately versioned native media SVG; not identical topology. group↔group-a and entity↔entity-a are semantic mappings, not renamed record IDs. Media makes evidence/clarification relation explicit. |
| DG-ENTITY-A | b/a/t/evidence/gap; EV-A03 evidence node supports role; gap→a unproven | entity-b/entity-a/person-t/authority; EV-A03 on role-claim edge, EV-A02 on reported-parent edge; principal remains not established | Preserve both artifacts. Map b↔entity-b, a↔entity-a, t↔person-t, gap↔authority. Employment is not authority; reported parent is not counterparty/guarantor. No claim that topology is identical. |
| DG-ENABLE-A | scope→gate→prepare/wait; prepare→notready; task-specific permission/hold gate | context→requirements (sufficient inputs + no holds), context→authority, authority→external (waiting) | Media is narrower: only known-context requirements preparation shown as possible. No readiness inheritance from the more general mainline preparation branch. Other branches remain not assessed. |

Source qualification: source/diagram-contract.json preserves business semantics outside renderer shape types; `external` is a neutral rendering type, not a real system integration. EV-A01–03 available in frozen narrative; EV-A04 appears at A02-C2 as a pre-authored source event; EV-A05 not received. RM clarification at A01-C3 is narrative content, not a submitted live action. No new DEP, entity, scenario or case IDs.

Mainline files `prototype/diagrams/batch-a/*` are not overwritten. Media files are under `prototype/media/d2-batch-a/r01/assets/diagrams/`; each native SVG, native HTML viewer and typed JSON retains its source SHA-256 in package-provenance.json. English-US reuses English-AU diagram bytes as approved by the source contract, while UI/captions use en-US resources. Viewers are optional separate-tab explanatory surfaces; local focus chips/panels do not invoke host Journey navigation or update a store.

## Cue / navigation mapping

SCN-SCOPE: A01-C1…C4 map to existing A-01…A-04; A01-C5 is the authored `A-exit` summary. SCN-ENTITY: A02-C1…C5 map B-01…B-05; A02-C6 is `B-exit`. These are presentation cues, not new business milestones. The older `navigation.batchBeats` remains untouched for legacy sessions; r01 cue/time state lives exclusively under session key `ctt-media-panel-first-r01`. It is not copied into the business fixture, audit log, readiness, drafts or version history.

Latest case state and locale remain owned by the host. Frozen story facts remain explicitly marked read-only, separate from the live-session details. User actions are required in Product to change business records. A02-C4 holds at 9.5s until Next; advancing to preparation supplies neither evidence nor permission.
