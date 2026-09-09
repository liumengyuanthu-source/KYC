# Batch B file / delta map

Approved scope: SRC-015 Addendum v1.0, B-CH00–05 only. No new top-level product, no bank policy, no real outbound messaging, no remote publish or push.

| Surface | Increment | Preserved contract |
|---|---|---|
| prototype/collaboration-engine.mjs | Same-case requests, contributors, grants, submissions and assessments | Existing authority_gap request ID; same DEMO-CTT-001 |
| prototype/collaboration-ui.mjs + collaboration.css | RM / Client / Ops audience views | Black/white/blue; no violet or mint; only safe projection to client renderer |
| prototype/app.mjs + index.html | In-scene entry, role demo tools, save/return/print integration | Existing Studio / Product entrances and semantic navigation |
| 04_operating_model/batch-b | Logical field contract, dictionary, snapshots, sources, DEP crosswalk | Old Batch A schema not overwritten; not production schema certification |
| prototype/diagrams/batch-b | Archify 2.17 workflow typed specs, HTML, canonical SVG, receipts | Static host embed; diagram navigation cannot mutate case state |
| prototype/tests + prototype/qa | Engine, renderer, contract and actual browser regressions | Existing A / navigation / readiness tests retained |

## Source-qualified DEP crosswalk

Full mapping is 04_operating_model/batch-b/dependency-crosswalk.json, copied from the A crosswalk with explicit B effect annotations. No new bare DEP numbers are minted.

| Qualified dependency | Meaning and Batch B consequence |
|---|---|
| SRC-010:DEP-03 | Scope → Requirements; scope changes invalidate old request/assessment applicability |
| SRC-010:DEP-04 | Requirements → retrieval; requirement-first entry remains |
| SRC-010:DEP-05 | Evidence gap → residual request; authority_gap becomes two separately assigned items |
| SRC-010:DEP-14 | Adequacy change → reassessment; exact purpose/evidence revision retained |
| SRC-010:DEP-12 | Conditions → readiness; local item progress does not clear whole case |
| SRC-009:DEP-05 = SRC-010:DEP-09 | Legal, NOT residual request; no Legal approval added |

SRC-015 approves a design/demo direction, not bank fact. It adds no numbered DEP. SRC-009 IA v0.4 and SRC-010 D2 define design dependencies; SRC-013 Batch A Final remains the inherited party/scope basis. A manifest records SRC-015 bytes/hash and the missing research file.

## Scenario attachment (existing IDs)

- SCN-REQUIREMENTS: applicability and purpose lead into the collaboration workspace.
- SCN-GAP: two scoped items, RM assistance, limited contributor response.
- SCN-VALIDATE: mock intake → explicit linkage → purpose assessment → remaining blockers.
- Current/Target source scene is preserved on return; Product is proposed Target behavior. This is an additive attachment, not a redesigned journey structure.

## Deliberate limits

Logical fields include observed types, nullable, conditional requirement, edit ownership, validation, revision, sensitivity, provenance and UI bindings. Null-only fields remain unresolved prototype types. A strict merged whole-case JSON Schema / production schema migration is not claimed.

User input is synthetic. The full case remains in the local workshop host/session store; allowlisted DOM is a demonstrated UI boundary, not server-side access enforcement.
