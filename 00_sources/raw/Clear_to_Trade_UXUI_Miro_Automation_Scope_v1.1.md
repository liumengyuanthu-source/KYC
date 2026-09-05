# Institutional Clear-to-Trade Customer Journey
## UX/UI Scope Update — Automation-First Miro Production

> **Version:** v1.1  
> **Status:** Approved working scope for Christina, Codex, Xiaoming and Coco  
> **Primary milestone:** Miro alpha pack by 10 September 2026  
> **Applies to:** `Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md`  
> **Override:** This document supersedes the default Miro construction workflow, UX/UI role allocation and `CJ-T08` definition in Sections 14–17 of the v1.0 production specification.  
> **Client naming rule:** Use only `Confidential Australian Banking Client`, `Strategic APAC Banking Account`, `Institutional Clear-to-Trade Product`, or `Agentic AI KYC Clear-to-Trade Product`.

---

# 1. Scope Decision

The default production model changes from:

```text
Codex prepares content
→ Xiaoming and Coco manually assemble Miro
→ Christina reviews
```

to:

```text
Repository source data
→ Codex generates the first Miro board directly
→ Codex reads back and corrects the board
→ Xiaoming and Coco refine the visual design and usability
→ Christina approves the client-ready frames
```

The purpose of this change is not to remove UX/UI ownership. It is to move repetitive board assembly, card placement, ID labelling, frame creation and first-pass connector work to Codex, so the designers spend their time on:

- information hierarchy;
- journey readability;
- narrative emphasis;
- role and state differentiation;
- branch, loop and dependency clarity;
- executive export quality;
- visual consistency and polish.

The repository remains the source of truth. Miro is the editable visual view.

---

# 2. Three Production Versions

## 2.1 `V0 — Codex-generated structural board`

V0 must be complete enough to review without rebuilding it manually.

It includes:

- board and frame structure;
- frame titles, descriptions and navigation;
- stage headers and swimlanes;
- component-library frame;
- all approved journey cards and visible IDs;
- evidence-status labels;
- current and target journey content;
- required, optional, parallel, loop and decision connectors;
- agentic, rules, human and system distinctions;
- hero case, trigger variants, HITL and state content;
- version/footer labels;
- designer comments and known visual issues.

V0 is **not** expected to be client-ready. It must be structurally correct, content-complete and editable.

## 2.2 `V0.5 — Designer-refined board`

Xiaoming and Coco refine the priority frames without rewriting the source content.

V0.5 includes:

- corrected hierarchy and spacing;
- reduced visual density;
- clearer stage and swimlane reading order;
- improved branches, loops and handoffs;
- refined visual components;
- improved role, state, control and evidence differentiation;
- stronger executive storytelling;
- refined 16:9 export frames.

## 2.3 `V1.0 — Christina-approved client-ready board`

V1.0 includes:

- approved content and labels;
- no unresolved overlaps or clipped text;
- current and target journeys directly comparable;
- readable executive exports;
- explicit hypothesis and validation labelling;
- full process/journey traceability;
- confidentiality scan passed;
- change log and decision log updated.

---

# 3. Miro Connection and Security Preconditions

Codex may generate the board directly only when all preconditions are satisfied.

## 3.1 Required connection

- Miro MCP is installed and connected in Codex.
- Codex is authenticated to the correct Miro team.
- Christina supplies the full approved Miro board URL.
- The authenticated user already has edit permission on the board.
- Enterprise admin approval is obtained if required by the organisation.

## 3.2 Board boundary

- Create or use a restricted, need-to-know project board.
- Use a blank test area or test board before updating a shared working board.
- Never write access tokens, OAuth data or credentials into the repository.
- Never include guessed client identity, real personal data or unapproved confidential details.
- Use synthetic hero-case names and data.
- Codex must read existing board items before creation and select a non-overlapping area.

## 3.3 Fallback mode

If Miro MCP access is unavailable, Codex must stop and report the blocker. It may generate:

- frame SVG files;
- frame payload specifications;
- card CSV files;
- a board placement manifest;

but must not claim the Miro board has been created.

---

# 4. UX/UI Source-of-Truth Files

Codex must generate the Miro board from repository assets, not from free-form interpretation during the board-writing step.

## 4.1 Required content sources

```text
03_personas_journey/
├── journey_moments_master.csv
├── persona_hypotheses.md
├── jobs_to_be_done.csv
├── current_journey_matrix.csv
├── hero_case.md
├── trigger_variants.csv
├── target_journey_matrix.csv
└── pain_point_register.csv

04_operating_model/
├── hitl_task_matrix.csv
├── structured_state_model.md
├── state_transition_table.csv
└── agentic_operating_model.md

05_product_requirements/
├── capability_map.md
├── requirement_backlog.csv
└── requirement_traceability.csv
```

## 4.2 Required UX/UI automation files

```text
06_workshop/miro/
├── miro_board_manifest.yaml
├── miro_visual_tokens.yaml
├── miro_component_catalog.md
├── miro_frame_manifest.csv
├── miro_frame_content/
│   ├── F00.yaml
│   ├── F01.yaml
│   └── ...
├── miro_frame_svg/
│   ├── F00.svg
│   ├── F01.svg
│   └── ...
├── miro_item_registry.csv
├── miro_build_log.md
├── miro_geometry_qa.csv
├── miro_designer_refinement_backlog.csv
└── miro_export_manifest.csv
```

## 4.3 Board item registry

Every generated item must be recorded in `miro_item_registry.csv` with:

```text
board_id
frame_id
frame_code
item_id
item_type
content_id
journey_id
process_reference
x
y
width
height
style_token
parent_id
source_file
source_row
version
last_updated
```

This allows Codex to update an existing board rather than create duplicates.

---

# 5. Machine-Readable Visual System

Codex must not invent a different visual style for each frame. The first draft must use one machine-readable design system.

## 5.1 Provisional visual tokens

Xiaoming and Coco may revise these after the pilot-frame calibration.

```yaml
canvas:
  background: "#F7F9FC"
  frame_fill: "#FFFFFF"
  frame_border: "#D8E0E8"

colour:
  primary_blue: "#005B9F"
  dark_navy: "#123B56"
  light_blue: "#EAF4FB"
  process_grey: "#EDF1F4"
  assumption_yellow: "#FFF4CC"
  target_green: "#E7F5ED"
  human_purple: "#EEE8FA"
  risk_red: "#FDECEC"
  opportunity_orange: "#FFF0E2"
  text_primary: "#1E2A35"
  text_secondary: "#5E6B78"

spacing:
  frame_margin: 80
  stage_gap: 24
  lane_gap: 8
  card_gap: 16
  card_padding: 18

shape:
  corner_radius: 12
  border_width: 2
  header_height: 100
  lane_label_width: 360
  standard_card_width: 260
  standard_card_height: 150
  compact_card_width: 220
  compact_card_height: 110

text:
  font_family: "Miro-supported sans-serif"
  frame_title: 40
  stage_title: 24
  lane_title: 20
  card_title: 17
  card_body: 14
  tag_text: 11
  footer_text: 10
```

## 5.2 Component types

Codex must create and reuse these components:

| Component ID | Purpose | Required visible content |
|---|---|---|
| `CMP-STAGE` | Stage header | Stage ID, stage name, process coverage |
| `CMP-LANE` | Swimlane label | Role/layer name and optional owner icon |
| `CMP-ACTION` | Current user or team action | Journey ID, action title, short detail |
| `CMP-JOB` | Job to Be Done | Persona, desired outcome |
| `CMP-SYSTEM` | System/tool/data item | System role, source-of-truth status |
| `CMP-HANDOFF` | Handoff/dependency | From, to, object or decision handed over |
| `CMP-PAIN` | Current friction | Pain ID, short observation, evidence status |
| `CMP-ROOT` | Root-cause hypothesis | Root-cause category and validation tag |
| `CMP-AGENTIC` | Agentic product action | Action, tool/rule dependency, output |
| `CMP-HUMAN` | Human judgment | Accountable role, decision, escalation trigger |
| `CMP-STATE` | Structured state | State ID, state name, blocker/ready marker |
| `CMP-QUESTION` | Open question | Question ID, owner, target gate |
| `CMP-CAPABILITY` | Product capability | Capability ID and short behaviour |
| `CMP-REQUIREMENT` | Requirement hypothesis | Requirement ID and validation status |
| `CMP-VARIANT` | Trigger variant | Trigger, delta, requirement/state effect |

## 5.3 Connector types

| Connector ID | Meaning | First-draft treatment |
|---|---|---|
| `CON-REQ` | Required sequence | Solid arrow |
| `CON-OPT` | Optional path | Dashed arrow |
| `CON-PAR` | Parallel work | Double-line or parallel-labelled connector |
| `CON-LOOP` | Remediation/rework | Curved return arrow |
| `CON-DEC` | Decision gate | Diamond or decision-labelled branch |
| `CON-DATA` | Information/data movement | Thin dotted connector |
| `CON-STATE` | State transition | Green arrow |
| `CON-ESC` | Human escalation | Purple/red dashed arrow |

Connectors must attach to items. Do not create unanchored decorative lines.

---

# 6. Miro Board Architecture Update

Add one internal frame to the existing F00–F15 manifest.

## `F00A — Automation Component Library & Visual Tokens`

**Purpose:** Calibrate the machine-generated visual system before all frames are produced.

**Content:**

- colour and spacing tokens;
- sample stage header;
- sample swimlane label;
- all card/component types;
- all connector types;
- evidence-status tags;
- MVP/Target tags;
- version/footer pattern;
- one sample 16:9 frame;
- one sample dense journey segment.

**Owner:** Codex generates V0; Xiaoming and Coco calibrate; Christina approves content labels.

**Export:** Internal only.

## Frame production priority

### Priority A — Alpha client/storyline frames

Produce and refine first:

- `F00` Board Home & Navigation;
- `F01` Sources, Evidence Status & Visual Legend;
- `F02` Journey Architecture;
- `F03` Role Ecosystem & Persona Hypotheses;
- `F04` Current End-to-End Executive Journey;
- `F06` Case Manager Deep Dive;
- `F07` KYC Operations Deep Dive;
- `F08` Hero Case & Trigger Variants;
- `F09` Target Agentic End-to-End Journey;
- `F10` MVP vs Target HITL & Autonomy;
- selected `F15` executive export frames.

### Priority B — Workshop working frames

Build after Alpha structure is stable:

- `F05` Current Detailed Service Blueprint;
- `F11` Structured State & Continuous Readiness;
- `F12` Pain → Root Cause → Opportunity;
- `F13` Journey → Capability → Requirement;
- `F14` Evidence Gaps & Validation Plan;
- remaining `F15` exports.

---

# 7. Automation-First Miro Build Workflow

## Gate UX0 — Connection and source readiness

Codex must confirm:

- Miro MCP is connected;
- correct team and board are selected;
- board URL and board ID are recorded;
- edit permission exists;
- source files pass validation;
- no restricted client name or personal data appears;
- target creation area is empty.

If any item fails, stop and report.

## Gate UX1 — Pilot-frame calibration

Codex generates only:

1. `F00A` component library;
2. `F02` journey architecture;
3. one representative segment of `F04` current executive journey;
4. one representative segment of `F09` target journey.

Xiaoming and Coco review:

- stage proportions;
- swimlane heights;
- card density;
- typography;
- colour semantics;
- connector language;
- current/target comparability;
- export readability.

Codex updates `miro_visual_tokens.yaml` and `miro_component_catalog.md` based on the calibration.

## Gate UX2 — Full V0 generation

Codex creates one frame at a time.

For each frame:

1. read the frame content file;
2. generate or update the frame shell;
3. create title, subtitle, version and status;
4. create stage headers and swimlane labels;
5. create content cards with stable visible IDs;
6. attach evidence and status tags;
7. create anchored connectors;
8. create frame-level notes and validation questions;
9. read the frame back from Miro;
10. record item IDs and positions;
11. run geometry and content QA;
12. update the frame once if required;
13. log unresolved issues for designers.

Codex must not attempt to generate all complex frames in a single unreviewed prompt.

## Gate UX3 — Designer refinement

Designers work on the existing generated items. They do not recreate the board unless the frame fails structurally.

Every manual change that alters content, IDs, stage mapping or product logic must be recorded in the refinement backlog and approved by Christina before updating the repository source.

## Gate UX4 — Codex reconciliation

After designer refinement, Codex:

- reads the board again;
- compares visible IDs with the repository;
- updates item positions in the registry;
- detects missing/duplicate cards;
- checks process and journey coverage;
- records designer-added content;
- creates a change-impact report;
- does not overwrite approved designer layout unless instructed.

## Gate UX5 — Client-ready export

Xiaoming and Coco refine selected F15 frames. Christina approves. Codex runs final content, confidentiality and traceability checks.

---

# 8. Updated UX/UI Scope by Role

## 8.1 Xiaoming — Journey UX and Information Architecture Lead

### Primary responsibility

Make the machine-generated journey understandable, navigable and comparable at executive and working levels.

### In scope

- calibrate the five-stage journey grid;
- calibrate the eleven common swimlanes;
- refine current/target common geometry;
- reduce card density and improve chunking;
- establish reading order and zoom hierarchy;
- refine required, optional, parallel, loop and decision flows;
- make Legal, Credit, QA and Conflicts dependencies clear without overwhelming the main path;
- refine Case Manager and KYC Operations deep dives;
- ensure L0, L1 and L2 views are consistent;
- refine executive narrative flow across F02, F04, F05, F06, F07 and F09;
- design the journey export pattern for PowerPoint;
- perform visual usability and navigation QA.

### Not responsible for

- manually rebuilding every card;
- retyping Codex content;
- deciding KYC policy or HITL boundaries;
- creating production architecture;
- changing source IDs without approval;
- validating unconfirmed client facts.

### Primary frame ownership

- F02 Journey Architecture;
- F04 Current Executive Journey;
- F05 Current Detailed Blueprint;
- F06 Case Manager Deep Dive;
- F07 KYC Operations Deep Dive;
- F09 Target Agentic Journey;
- journey-related F15 exports.

### Estimated effort

- Pilot calibration: 0.5 day;
- Current journey refinement: 1.0–1.5 days;
- Role deep dives: 0.75–1.0 day;
- Target journey refinement: 1.0–1.25 days;
- Export and visual QA: 0.5 day;
- **Total planning range: 3.75–4.75 person-days.**

## 8.2 Coco — Product Visual, Persona and State Design Lead

### Primary responsibility

Make roles, agentic execution, human judgment, evidence, state and product implications visually distinct and presentation-ready.

### In scope

- calibrate the component library and colour semantics;
- refine role ecosystem and priority persona cards;
- refine hero-case storyboard and trigger-variant cards;
- refine agentic action, deterministic rule, system/tool and human-decision components;
- refine evidence-status tags and assumption/open-question treatments;
- refine MVP vs target autonomy visual;
- refine structured-state and readiness visual language;
- refine pain/root-cause/opportunity and capability/requirement cards;
- create consistent icon and marker use;
- ensure visual distinction does not imply unsupported facts;
- refine F03, F08, F10, F11, F12, F13 and supporting F15 exports;
- perform consistency and visual-polish QA.

### Not responsible for

- manually assembling the entire board;
- rewriting journey or product logic;
- determining regulatory accountability;
- creating detailed architecture diagrams;
- inventing KPI values, client facts or product capabilities;
- changing evidence status without approval.

### Primary frame ownership

- F00/F01 visual system support;
- F00A Component Library;
- F03 Role Ecosystem;
- F08 Hero Case & Trigger Variants;
- F10 HITL & Autonomy;
- F11 Structured State;
- F12 Pain → Root Cause → Opportunity;
- F13 Journey → Capability → Requirement;
- product/state-related F15 exports.

### Estimated effort

- Pilot calibration: 0.5 day;
- Persona and role refinement: 0.5–0.75 day;
- Hero case and trigger variants: 0.75–1.0 day;
- HITL and state visuals: 0.75–1.0 day;
- Product traceability and exports: 0.75–1.0 day;
- **Total planning range: 3.25–4.25 person-days.**

## 8.3 Codex — First-Draft Miro Builder and Reconciliation Engine

### Primary responsibility

Translate validated repository content into an editable, structured and traceable Miro V0 board.

### In scope

- create/search the approved board;
- create the F00–F15 frames and F00A component library;
- build initial layouts from machine-readable tokens;
- create text, shapes, cards, sticky notes, tables, diagrams and anchored connectors as supported;
- populate all approved content and visible IDs;
- attach status tags;
- generate current and target journey layouts;
- create frame notes and validation questions;
- read the board back;
- maintain item registry and build log;
- run content, geometry and traceability QA;
- prepare the designer refinement backlog;
- reconcile the board after manual designer changes;
- generate export order and handoff notes.

### Not responsible for

- final visual design judgment;
- client fact validation;
- policy or risk decisions;
- pixel-perfect presentation design;
- overriding manual designer changes without approval;
- producing a board when MCP access is not confirmed.

## 8.4 Christina — Content, Product and Gate Owner

### Primary responsibility

Approve content meaning, journey logic, product implications, scope and client-ready status.

### In scope

- approve visual tokens after pilot calibration;
- approve journey and role hierarchy;
- approve hero-case story;
- approve current pain and target product content;
- approve HITL and state language;
- resolve content conflicts;
- control scope and confidentiality;
- approve each gate and client export.

---

# 9. UX/UI RACI

| Work item | Christina | Codex | Xiaoming | Coco |
|---|---|---|---|---|
| Content source and IDs | A | R | C | C |
| Miro connection/preflight | A | R | I | I |
| Visual tokens V0 | A | R | C | C |
| Pilot-frame creation | A | R | C | C |
| Journey grid refinement | A | C | R | C |
| Component-library refinement | A | C | C | R |
| Current executive journey | A | R for V0 | R for refinement | C |
| Detailed blueprint | A | R for V0 | R for refinement | C |
| Persona/role ecosystem | A | R for V0 | C | R for refinement |
| Hero case | A | R for V0 | C | R for refinement |
| Target agentic journey | A | R for V0 | R for refinement | C |
| HITL/autonomy | A | R for V0 | C | R for refinement |
| Structured state | A | R for V0 | C | R for refinement |
| Journey-to-product traceability | A | R for V0 | C | R for refinement |
| Geometry/read-back QA | A | R | C | C |
| Visual QA | A | C | R | R |
| Final export | A | C | R | R |

`R = Responsible`, `A = Accountable`, `C = Consulted`, `I = Informed`.

---

# 10. Alpha Delivery Schedule

## 7 September — Automation setup and pilot generation

### Codex

- validate source files;
- create board manifest and item registry;
- connect to the approved Miro board;
- create F00A component library;
- create F02 journey architecture;
- create representative current and target journey segments;
- read back and run first QA.

### Xiaoming and Coco

- review pilot board;
- calibrate grid, typography, colour, card density and connectors;
- record changes in the token/component files.

### Christina

- approve content labels and automation scope.

## 8 September — Full V0 Alpha generation

### Codex

Create full V0 for:

- F00;
- F01;
- F02;
- F03;
- F04;
- F06;
- F07;
- F08;
- F09;
- F10;
- selected F15 export frames.

Run frame-by-frame read-back and record unresolved issues.

## 9 September — Designer optimisation

### Xiaoming

- refine F02, F04, F06, F07 and F09;
- improve executive flow and current/target comparability.

### Coco

- refine F00A, F03, F08, F10 and selected F15 frames;
- improve persona, state, human/agentic and evidence language.

### Codex

- reconcile IDs and item registry after design changes;
- update only content issues approved by Christina;
- create QA and refinement report.

## 10 September — Alpha export

Deliver:

- editable Miro board V0.5;
- 8–10 selected 16:9 export frames;
- PDF or image export pack where available;
- design/open-question backlog;
- source and traceability report;
- list of frames not yet refined.

## 11 September — Review and next-sprint lock

Classify feedback as:

- Approve;
- Content revise;
- Visual refine;
- Validate with client;
- Defer;
- Out of scope.

---

# 11. Codex Build Rules

## 11.1 Create one complex frame at a time

Do not ask Miro to generate the whole board in one prompt. Use the frame manifest and build one frame, read it back, then continue.

## 11.2 Prefer structured layouts

For dense journey frames:

- use SVG/canvas-based creation where supported;
- use tables for matrices that should remain tabular;
- use shapes/text for controlled card layouts;
- use sticky notes primarily for workshop-editable hypotheses and questions;
- use Mermaid only for suitable linear or state diagrams, not for the full service blueprint.

## 11.3 Preserve editability

The V0 board must remain editable. Do not replace entire journey frames with a single flattened image unless used only as a temporary preview.

## 11.4 Visible traceability

Every meaningful card must show at least one visible ID:

- Journey ID;
- Process ID;
- Pain/Opportunity ID;
- State ID;
- Capability/Requirement ID;

according to the frame purpose.

## 11.5 Content density

- Executive frames: maximum 3–5 primary cards per stage;
- Detailed frames: group atomic actions within L1 moments;
- Card title: ideally 3–8 words;
- Card body: ideally no more than 28 words;
- long explanations go into frame notes or linked docs;
- no card may contain a full paragraph from source material.

## 11.6 Do not overwrite designer work

After UX3, Codex must use read/update mode. Any full-frame regeneration requires Christina approval.

---

# 12. V0 Acceptance Criteria

The Codex-generated V0 passes only if:

## Board and structure

- all required frames exist and are named correctly;
- frames are placed in the approved navigation order;
- content does not overlap another frame;
- current and target frames use comparable stage geometry;
- all primary swimlanes are present;
- navigation and version labels are visible.

## Content and traceability

- every card comes from an approved source file;
- every journey card has a stable ID;
- M0–M8, C1 and C2 coverage is preserved;
- Case Manager and KYC Operations deep dives exist;
- Hero Case and trigger variants exist;
- agentic actions and human judgments are visually separated;
- assumptions and client-validation questions are labelled;
- no KPI or SLA value is invented.

## Geometry and readability

- no clipped text;
- no connector crosses a card body where avoidable;
- no disconnected mandatory connector;
- no card is outside its frame;
- primary frame titles are readable at normal board navigation zoom;
- selected 16:9 frames remain readable after export;
- unresolved density issues are logged rather than hidden.

## Confidentiality

- approved neutral client naming only;
- no real client personal data;
- no guessed identity;
- no credentials or tokens;
- synthetic hero-case data only.

---

# 13. Designer Refinement Acceptance Criteria

Xiaoming and Coco finish their refinement when:

- executives can understand the journey story in under two minutes;
- KYC users can trace stages and responsibilities without reading the process map separately;
- current and target differences are immediately visible;
- branches, parallel activities, decision gates and remediation loops are legible;
- role, agentic action, rules, system/tool, human judgment and state use distinct visual treatments;
- the board has one consistent component and colour language;
- visual emphasis matches the intended storyline rather than equal-weighting every process step;
- key F15 export frames are presentation-ready;
- all content changes have been reconciled to the repository.

---

# 14. Out of Scope for This UX/UI Sprint

- production-grade product UI;
- clickable product prototype;
- detailed application screen design;
- final brand system;
- production architecture;
- detailed data model;
- detailed API design;
- final accessibility certification;
- custom Miro application development;
- automation outside the approved project board;
- all four trigger variants as separate full journeys;
- client-validated persona research;
- invented quantitative KPIs or SLAs.

---

# 15. Updated Codex Task Definition

Replace the previous `CJ-T08 — Miro Copy and Frame Package` with the following automation-first tasks.

## `CJ-T08A — Miro MCP Preflight and Visual-System Pilot`

**Outputs:**

- connection report;
- approved board ID and URL reference;
- `miro_visual_tokens.yaml`;
- `miro_component_catalog.md`;
- `F00A` component library;
- pilot F02/F04/F09 segments;
- read-back QA report;
- pilot designer feedback log.

**Stop condition:** Stop for Xiaoming, Coco and Christina calibration before full generation.

## `CJ-T08B — Generate Miro Alpha Board V0`

**Outputs:**

- complete frame shells;
- populated Priority A frames;
- visible IDs and tags;
- connectors and navigation;
- item registry;
- build log;
- geometry QA;
- designer refinement backlog.

**Acceptance:** The board can be reviewed and refined without manual reconstruction.

## `CJ-T08C — Post-Design Reconciliation and Export Readiness`

**Outputs:**

- updated item registry;
- source/board difference report;
- missing/duplicate ID report;
- content-change reconciliation;
- export manifest;
- final QA report.

**Acceptance:** Designer changes are preserved and all approved content remains traceable.

---

# 16. First Codex Prompt for Miro Automation

```text
Read, in order:
1. CODEX_MASTER_HANDOFF.md
2. Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md
3. Clear_to_Trade_UXUI_Miro_Automation_Scope_v1.1.md
4. the validated journey, persona, hero-case, HITL and state source files.

Execute CJ-T08A only.

Use the approved Miro MCP connection and the full approved board URL supplied by Christina. Confirm the authenticated team, board edit access, board ID, target empty area and confidentiality boundary before writing anything.

Create the machine-readable visual token file and component catalogue. Then generate only:
- F00A Automation Component Library & Visual Tokens;
- F02 Journey Architecture;
- one representative segment of F04 Current Executive Journey;
- one representative segment of F09 Target Agentic Journey.

Use visible stable IDs, approved evidence-status labels, anchored connectors and synthetic data only. Read the created items back from Miro, register all item IDs and coordinates, run geometry/content/confidentiality QA, create a pilot feedback log and stop.

Do not generate the full board before Christina, Xiaoming and Coco approve the pilot visual system.
```

---

# 17. One-Sentence Handoff

> Codex owns the structured and editable Miro first draft; Xiaoming owns journey readability and information architecture; Coco owns persona, state, agentic/HITL and product visual refinement; Christina owns content, scope, confidentiality and every release gate.
