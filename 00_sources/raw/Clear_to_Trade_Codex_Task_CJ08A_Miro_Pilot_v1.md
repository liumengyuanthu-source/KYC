# CJ-T08A — Miro MCP Preflight and Visual-System Pilot

> **For Codex:** Execute this task only after `CJ-T01` through the required journey-content tasks have produced validated source files. Stop after the pilot and wait for Christina's approval.

## Goal

Connect Codex to the approved restricted Miro board and create a small, editable pilot that proves the content-to-canvas workflow before generating the complete customer-journey board.

## Required reading order

1. `CODEX_MASTER_HANDOFF.md`
2. `Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md`
3. `Clear_to_Trade_UXUI_Miro_Automation_Scope_v1.1.md`
4. `06_workshop/miro/miro_board_manifest.yaml`
5. validated source files for F02, F04 and F09

## Required inputs from Christina

- full Miro board URL;
- confirmation that the board is in the approved need-to-know team;
- confirmation that Miro MCP is enabled and connected;
- confirmation that the authenticated user has edit access;
- approved neutral project title;
- target empty board area or permission to create a new restricted board.

## Files to create

```text
06_workshop/miro/
├── miro_connection_report.md
├── miro_visual_tokens.yaml
├── miro_component_catalog.md
├── miro_frame_manifest.csv
├── miro_item_registry.csv
├── miro_build_log.md
├── miro_geometry_qa.csv
├── miro_designer_refinement_backlog.csv
└── miro_frame_content/
    ├── F00A.yaml
    ├── F02.yaml
    ├── F04_pilot.yaml
    └── F09_pilot.yaml
```

## Execution steps

- [ ] Verify Miro MCP is available in Codex.
- [ ] Authenticate to the correct Miro team.
- [ ] Open the full approved board URL.
- [ ] Record board ID, board title, authenticated team and edit permission.
- [ ] Read existing board items and identify a non-overlapping target area.
- [ ] Run source, client-name, PII and ID validation.
- [ ] Stop immediately if the board/team/permission/confidentiality checks fail.
- [ ] Create provisional `miro_visual_tokens.yaml` from the v1.1 scope.
- [ ] Create `miro_component_catalog.md` with every component and connector type.
- [ ] Create frame F00A with the component library, evidence tags and connector samples.
- [ ] Create frame F02 showing L0/L1/L2 journey architecture.
- [ ] Create one representative S2 segment of F04, including current actions, systems, pain and root-cause hypothesis.
- [ ] Create the matching S2 segment of F09, including agentic action, rules/tools, human boundary and structured state.
- [ ] Use stable visible IDs and synthetic content only.
- [ ] Read every created frame and item back from Miro.
- [ ] Record Miro item IDs, coordinates, dimensions and parent frame in `miro_item_registry.csv`.
- [ ] Check for overlaps, clipped text, out-of-frame items, disconnected connectors and missing IDs.
- [ ] Apply one automated correction pass when safe.
- [ ] Record unresolved visual issues in `miro_designer_refinement_backlog.csv`.
- [ ] Create a pilot feedback section for Xiaoming, Coco and Christina.
- [ ] Update the build log and change log.
- [ ] Stop and report results. Do not create the full board.

## Pilot acceptance criteria

- F00A, F02, F04 pilot and F09 pilot exist on the approved board;
- items remain editable rather than flattened into one image;
- current and target pilot segments share the same geometry;
- all cards have visible stable IDs;
- evidence/assumption/target-state labels are visible;
- agentic action and human judgment are visually distinct;
- connectors are anchored;
- no guessed client identity or personal data appears;
- item registry and geometry QA are complete;
- designers can review the visual language without rereading source documents.

## Required completion report

Report:

1. board URL and board ID;
2. authenticated team and permission status;
3. created frames and item count;
4. source files used;
5. validation and QA results;
6. unresolved visual issues;
7. decisions needed from Xiaoming;
8. decisions needed from Coco;
9. decisions needed from Christina;
10. exact stop state before `CJ-T08B`.
