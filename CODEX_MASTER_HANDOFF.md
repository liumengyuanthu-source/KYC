# Institutional Clear-to-Trade Product Pre-work
## Codex Master Handoff, Delivery Plan and Task Execution Specification

> **For Codex and agentic workers:** Execute this plan task-by-task in sequence. Do not skip gates. Do not advance to a downstream task when its required upstream artifact has not passed the stated acceptance criteria. Stop after each gate and request Christina's approval.

**Goal:** Translate the supplied current-state and target-state clear-to-trade process maps into an executive-ready, role-based user journey, a human-controlled agentic operating model, and prioritised product requirement hypotheses for the client product vision workshop.

**Delivery architecture:** The work uses one traceable content spine: source evidence → M0–M8 process decomposition → personas and journey moments → current journey → hero scenario → target agentic journey → autonomy and structured state → operating model → product capabilities and requirements → pre-client and workshop materials. Every downstream statement must link back to a source, an explicit assumption, or an approved decision.

**Working stack:** Markdown, CSV, PowerPoint source files, Python validation scripts, Git, Codex, ChatGPT, Microsoft PowerPoint, and UX/UI design support from Xiaoming and Coco.

**Primary owners:** Christina is the engagement, content and gate owner. Xiaoming and Coco are the UX/UI design resources. ChatGPT supports analysis, content architecture and quality assurance. Codex is the structured production and repository execution engine.

---

# 0. How to Use This Handoff

1. Treat this document as the project master specification and execution plan.
2. Create the repository structure in Task T00 before drafting any client-facing content.
3. Execute one Codex task at a time.
4. At the end of each task:
   - run the stated validation;
   - update the task status and change log;
   - commit the work;
   - produce a concise completion report;
   - stop when the task is marked as a gate task.
5. Do not wait for a subject-matter expert to begin. Use explicit assumptions and industry hypotheses, then update affected records when new inputs arrive.
6. Do not silently overwrite earlier assumptions. Preserve version history and record the impact of every material change.
7. Do not use or imply any guessed client identity. All shared materials must use the approved neutral label.
8. Do not build a full technical architecture before the October product workshop. Pre-work is limited to product framing, journey, logical product environment, autonomy, structured state, capability and requirement hypotheses.

---

# 1. Project Context and Confirmed Brief

## 1.1 Approved neutral project name

Use one of the following only:

- **Confidential Australian Banking Client**
- **Strategic APAC Banking Account**
- **Institutional Clear-to-Trade Product**
- **Agentic AI KYC Clear-to-Trade Product**

Do not name, hint at, or visually imitate any institution whose identity has not been formally disclosed and approved for use.

## 1.2 Confirmed objective

The team is supporting the definition of an end-to-end institutional trading **clear-to-trade product**. The product is broader than a standalone KYC tool and is intended to cover KYC, legal, compliance, credit or related approvals, conflicts and pre-trade clearance until the client or relationship is cleared to trade.

The immediate pre-work objective is to turn the supplied process maps into:

1. an end-to-end role-based user journey;
2. a target agentic user journey;
3. one core hero journey with trigger variants;
4. a human-in-the-loop and target autonomy model;
5. a logical product environment concept;
6. product capability and requirement hypotheses;
7. materials that support the pre-client discussion and October product workshop.

## 1.3 Confirmed audience

- Client executives
- Client KYC team
- NTT DATA advisory and product solutioning stakeholders

The executive audience needs a clear product vision, business rationale, journey and decision agenda. The KYC audience needs credible process detail, role boundaries, exception logic, evidence, control and product behaviour.

## 1.4 Confirmed product direction

The target product is expected to be primarily agentic, while combining:

- deterministic rules;
- workflow and orchestration;
- third-party system integrations;
- possible machine-learning decision support;
- human-in-the-loop controls for the MVP;
- human review by exception in the target state.

Agentic AI is therefore a confirmed product direction, but the detailed agent architecture is not yet fixed. The pre-work must define work allocation and product requirements rather than assume a specific Agent Studio platform.

## 1.5 Confirmed process boundary

The supplied process maps use the following M0–M8 backbone:

- **M0 — Booking model determination**
- **M1 — Client intake and triage**
- **M2 — Requirements determination**
- **M3 — Document sourcing**
- **M4 — Screening**
- **M5 — Enhanced Due Diligence assessment**
- **M6 — Quality Assurance**
- **M7 — Conflicts check**
- **M8 — Cleared-to-trade**

The maps also include parallel Legal and Credit activities.

## 1.6 Confirmed trigger types

The common clear-to-trade process can be initiated by:

- new relationship;
- product or service extension;
- material client, ownership or risk change;
- refresh or reassessment;
- cross-border or new-country expansion as an additional scenario raised in discussion.

The design principle is **one common backbone with dynamic trigger variants**, not a separate product for each trigger.

## 1.7 Confirmed role priority

The journey must first show the end-to-end ecosystem, then provide greater depth for:

- **Case Manager**
- **KYC Operations**

Other relevant roles include:

- Client
- Sales / Relationship Manager
- Client Fulfilment
- Financial Crime
- Risk / Compliance
- Quality Assurance
- Legal
- Credit
- RMG Control Room
- Operations / Executive management

## 1.8 Confirmed system direction

The product is expected to be built from the ground up and replace existing KYC systems rather than sit as a simple add-on layer over them. It is expected to integrate with existing trade systems and selected third-party tools.

Initial external-tool references in the supplied materials include:

- World-Check
- RDC
- NICE Actimize
- DocuSign
- iManage
- existing downstream trading and risk systems

Salesforce and regional management platforms are not confirmed in the initial scope. Treat them as **boundary questions**, not committed architecture elements.

## 1.9 Confirmed pre-work limitations

- Detailed client-user pain points are not yet available.
- Direct access to the client's current institutional KYC systems is not yet available.
- Existing SME input is not sufficient to validate every institutional trading KYC detail.
- Detailed KPIs and SLAs are not yet defined.
- Initial materials are English only.
- Multi-region compliance, PII protection and cybersecurity remain core design considerations.
- Full architecture and detailed technical design must wait until after the client workshop.

## 1.10 Confirmed milestones

- **10 September 2026:** first alpha draft shared with the team
- **11 September 2026:** catch-up review and alignment
- **By 16 September 2026:** client-ready pre-meeting material prepared
- **Week of 17 September 2026:** pre-client meeting; exact date to be confirmed
- **First week of October 2026:** client product workshop; exact date to be confirmed
- **Workshop + 3 working days:** post-workshop product definition draft
- **Workshop + 5 working days:** consolidated product definition baseline

Because the exact workshop date is not confirmed, all workshop preparation gates after 23 September must also be managed using T-relative milestones.

---

# 2. Source Hierarchy and Evidence Rules

## 2.1 Source priority

### Tier 1 — Primary project evidence

These sources override all secondary interpretations:

1. `09-04 Meeting_ Institutional Trading KYC _Clear to Trade_ Product Kickoff & Planning-transcript.txt`
2. `09-04 Meeting_ Institutional Trading KYC _Clear to Trade_ Product Kickoff & Planning-Summary.txt`
3. `Sanitised Process Map.pptx`
4. Raunaq's written brief:
   - Workshop with client executives and KYC team
   - Define KYC product vision and solidify product requirements
   - Clear-to-trade KYC process
   - Agentic AI product executing the entire process with human in the loop
   - Journey required as pre-work and workshop foundation

### Tier 2 — Internal method and planning references

1. `Marriott Case Study.pdf`
2. `Australian_Bank_F2B_Onboarding_KYC_Research_Handoff_v1.md`
3. `Australian_Bank_PreStart_Input_and_Deliverables_Checklist_v1.md`
4. Christina's planning slide: Process Map → Role-based User Journey → Agentic Operating Model → Product Requirement Hypotheses

### Tier 3 — Reusable design reference, when available

- PHKL journey, hero-case, same-case/different-role, data-closed-loop and human-approval methods
- Prior Agent Studio visuals only as visual or decomposition references, never as a preselected platform answer

## 2.2 Required provenance status

Every non-trivial content statement must carry one of these statuses in the working register:

- `MEETING_CONFIRMED`
- `PROCESS_MAP_DERIVED`
- `WRITTEN_BRIEF_CONFIRMED`
- `INDUSTRY_ASSUMPTION`
- `DESIGN_HYPOTHESIS`
- `CLIENT_VALIDATION_REQUIRED`
- `DECISION_APPROVED`
- `OUT_OF_SCOPE`

## 2.3 Conflict handling

When two sources conflict:

1. do not silently choose one;
2. record both in the source and assumption registers;
3. state the likely impact;
4. create a decision or validation question;
5. use the latest explicit meeting decision as the temporary working direction;
6. mark the decision as provisional until Christina approves it.

## 2.4 Prohibited inference

Do not infer or present as fact:

- the client's identity;
- current volumes, SLAs, KPIs or staffing levels;
- current system ownership not shown in the supplied process map;
- precise regulatory interpretations not supplied or reviewed;
- whether Salesforce is in or out of the final architecture;
- whether QA sign-off can be fully autonomous;
- whether the clear-to-trade status itself is an autonomous decision;
- production architecture, cloud, infrastructure or vendor decisions.

---

# 3. Delivery Principles

## Principle 1 — Hypothesis-led, not SME-blocked

Start immediately from the process maps, meeting decisions and industry-grounded assumptions. Do not wait for additional SME input. Every unvalidated conclusion must be visible as a hypothesis and designed for efficient update.

## Principle 2 — Journey-led and product-directed

The journey is not a standalone UX artifact. It is the mechanism for deriving the future operating model, autonomy boundaries, structured state, product capabilities and requirements.

## Principle 3 — One source, multiple deliverables

Maintain a single structured content model. Do not separately rewrite the same fact for the initiative deck, journey, workshop deck and requirement backlog.

The required traceability chain is:

`Source → Process Activity → Journey Moment → Pain Point / Opportunity → Target Experience → Agentic or Human Action → State Change → Product Capability → Product Requirement → Workshop Decision`

## Principle 4 — Initiative deck is the narrative foundation

The initiative deck establishes the common storyline for every later deliverable. It is not the factual master and must not override the evidence register. It is the approved narrative through which the evidence and hypotheses are communicated.

## Principle 5 — Preserve M0–M8 traceability

Executive materials may compress the process into five stages, but detailed artifacts must preserve the M0–M8 references.

Recommended executive stages:

1. Initiate and scope
2. Determine requirements and source evidence
3. Screen and assess
4. Assure, resolve and approve
5. Clear to trade

## Principle 6 — One core journey, multiple trigger variants

Use one clear-to-trade backbone. Model trigger-specific differences as dynamic requirements, branches, deltas and exceptions.

## Principle 7 — Separate MVP and target autonomy

MVP and target-state human involvement must never be shown as the same model.

- **MVP:** more human confirmation; agent prepares and executes lower-risk deterministic work.
- **Target:** standard work is agentically executed; humans review exceptions and retain material judgment and accountability.

## Principle 8 — Capability-first, not platform-first

Define the required product behaviours and capabilities before selecting a detailed agent architecture, runtime or platform.

## Principle 9 — Product-first, architecture-later

Before the workshop, produce only a logical product environment and system-boundary hypotheses. Do not build production architecture.

## Principle 10 — Human accountability must remain explicit

For each activity, state whether the product can:

- assist;
- prepare;
- execute within guardrails;
- escalate for judgment.

Also state the accountable human role, stop condition, override mechanism and audit record.

## Principle 11 — Design every artifact for update

Use stable IDs, structured tables and explicit dependencies so new SME or client input updates only affected records.

## Principle 12 — No isolated output

Every artifact must be either:

- an upstream foundation;
- a downstream transformation of approved content;
- a workshop input;
- a decision record;
- or a reusable asset for product, architecture, MVP, build-and-operate or commercials.

---

# 4. Scope and Non-scope

## 4.1 In scope before the workshop

- Source and assumption governance
- M0–M8 process decomposition
- Journey backbone
- Persona and jobs-to-be-done hypotheses
- Current role-based journey
- Hero case and trigger variants
- Target agentic journey
- MVP and target autonomy model
- Human-in-the-loop boundary
- Structured state model at conceptual level
- Agentic operating model at conceptual level
- Logical product environment
- Product capability map
- Epic-level product requirement hypotheses
- Requirement prioritisation logic
- Executive pre-read
- Pre-client pack
- Workshop deck, canvases, facilitation guide and decision log

## 4.2 Not in scope before the workshop

- Production target architecture
- Detailed APIs or interface specifications
- Final data model
- Detailed cybersecurity architecture
- Vendor selection
- Final platform selection
- Full business requirements document
- Complete signed-off product requirements document
- High-fidelity clickable prototype unless separately approved
- Full journey for every trigger
- Implementation estimate
- Commercial proposal
- Detailed build-and-operate operating model
- Automated regulatory or KYC approval design

---

# 5. Team, Responsibilities and Human Effort Envelope

## 5.1 Core human team

| Person | Proposed role | Primary responsibilities |
|---|---|---|
| Christina | Engagement, Journey and Product Content Lead | Direction, source interpretation, journey logic, hero case, autonomy, product requirements, client/team communication, resource coordination and all gate approvals |
| Xiaoming | Journey and Service Design Lead | Executive journey, detailed current/target journey, service blueprint, flow and handoff visualisation, visual system for journey artifacts |
| Coco | Product Experience and Visual Design Lead | Persona cards, hero-case storyboard, autonomy/HITL model, structured-state visual, logical product environment, capability and workshop visuals |
| ChatGPT | Analysis, Content Architecture and QA Partner | Source synthesis, master content, matrices, dependency management, Codex briefs, wording, quality review, contradiction and scope checks |
| Codex | Structured Production and Repository Engine | File creation, source normalisation, registers, structured backlogs, traceability, draft content, validation scripts, versioning and packaging |

Xiaoming and Coco's specific visual work packages may be swapped by Christina if their availability or strengths require it. The artifact ownership and gate accountability remain unchanged.

## 5.2 SME input model

Additional KYC, product, architecture or operational SME input is a **validation and enrichment track**, not a critical-path dependency.

When new SME input arrives:

1. add it to the source register;
2. update the affected assumption status;
3. identify impacted stable IDs;
4. regenerate only affected content;
5. issue a change-impact report;
6. submit material changes to Christina for approval.

## 5.3 Proposed 30-person-day investment envelope

This is a planning envelope, not an approved financial commitment.

| Stage | Christina | Xiaoming | Coco | Total |
|---|---:|---:|---:|---:|
| Stage 1 — Alpha framing and current journey | 6 | 5 | 4 | 15 |
| Stage 2 — Target journey and autonomy | 2 | 2 | 1 | 5 |
| Stage 3 — Product requirements and workshop pack | 3 | 3 | 4 | 10 |
| **Total** | **11** | **10** | **9** | **30** |

Every human work item must be logged against a task ID and deliverable ID.

## 5.4 Timesheet tracking fields

Maintain `00_governance/effort_tracker.csv` with:

- Date
- Person
- Role
- Task ID
- Deliverable ID
- Activity
- Hours
- Internal charge code
- Opportunity reference
- Budget owner
- Approval status
- Notes

---

# 6. Stable IDs and Core Content Model

## 6.1 ID conventions

- Source: `SRC-###`
- Confirmed fact: `FACT-###`
- Assumption: `ASM-###`
- Open question: `Q-###`
- Decision: `DEC-###`
- Process activity: existing M0–M8 and C1/C2 IDs from the process map
- Journey moment: `J-M#-##`
- Pain point: `PP-###`
- Opportunity: `OPP-###`
- Hero event: `HC-###`
- State: `ST-<DOMAIN>-###`
- Product capability: `CAP-###`
- Requirement: `CTT-REQ-###`
- Risk: `RSK-###`
- Deliverable: `D0`–`D12`
- Codex task: `T00`–`T16`

## 6.2 Required core tables

### Process decomposition

`01_process/process_decomposition.csv`

Required columns:

- Process_ID
- Executive_Stage
- Process_Stage
- Trigger
- Current_Actor
- Current_Activity
- Input
- System_or_Tool
- Decision_or_Rule
- Output
- Handoff_To
- Parallel_or_Sequential
- Rework_Loop
- Current_Pain_Hypothesis
- Target_Agentic_Treatment
- Human_Judgment
- Source_ID
- Provenance_Status
- Validation_Status

### Journey moments

`03_personas_journey/journey_moments.csv`

Required columns:

- Journey_ID
- Process_ID
- Persona_ID
- Trigger_Variant
- User_Objective
- User_Action
- Experience
- Information_or_Evidence
- System_or_Touchpoint
- Wait_or_Handoff
- Pain_Point_ID
- Root_Cause
- Target_Experience
- Product_Action
- Human_Action
- State_Change
- Capability_ID
- Source_ID
- Validation_Status

### Requirement backlog

`05_product_requirements/requirement_backlog.csv`

Required columns:

- Requirement_ID
- Requirement_Title
- Capability_ID
- Journey_ID
- Process_ID
- Persona_ID
- Job_to_Be_Done
- Current_Problem
- Product_Behaviour
- Autonomy_Level
- Human_Control
- Trigger
- Input_Data
- Tool_or_Integration
- Output
- State_Change
- Acceptance_Hypothesis
- Client_Experience_Score
- Operational_Value_Score
- Control_Criticality_Score
- Agentic_Suitability_Score
- Data_Readiness_Score
- Integration_Feasibility_Score
- Time_to_Value_Score
- MVP_Priority
- Source_ID
- Assumption_ID
- Validation_Status

---

# 7. Deliverable Dependency Architecture

```text
PRIMARY SOURCES
Meeting + Process Map + Written Brief + Approved Internal References
                         │
                         ▼
D0 Evidence, Assumption and Decision Register
   Factual and governance foundation
                         │
                         ▼
D1 Process Decomposition and Journey Backbone
   Structural foundation
                         │
                         ▼
D2 Initiative and Product Framing Deck
   Narrative foundation for all client-facing materials
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
D3 Persona/JTBD     D4 Current Journey   D5 Hero Case/Variants
 Role foundation     Problem foundation   Scenario foundation
        └────────────────┼────────────────┘
                         ▼
D6 Target Agentic Journey
   Future-experience foundation
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
D7 Autonomy/HITL   D8 Structured State   D9 Agentic Operating Model
 Control foundation State/data foundation Work-allocation foundation
        └────────────────┼────────────────┘
                         ▼
D10 Product Capability and Requirement Hypotheses
    Product-definition foundation
                         │
                         ▼
D11 Pre-client and Workshop Material Pack
    Workshop execution foundation
                         │
                         ▼
CLIENT WORKSHOP DECISIONS
                         │
                         ▼
D12 Confirmed Product Definition Pack
    Foundation for architecture, MVP, design/build/operate and commercials
```

## 7.1 Important dependency rules

1. D2 is the **narrative foundation**, but D0 and D1 are its evidence and structural foundations.
2. D4 cannot be completed before D3 has at least a working persona hypothesis.
3. D6 requires D4 and D5; it cannot be a generic future-state diagram.
4. D7, D8 and D9 must be derived from D6 and must be mutually consistent.
5. D10 must trace to D4–D9. No requirement may exist only because it “sounds useful.”
6. D11 is an integrated transformation of approved upstream content; it must not create new product claims without updating D0 and D10.
7. D12 must record workshop decisions and supersede only the hypotheses explicitly resolved by the client.

---

# 8. Deliverable Catalogue

## D0 — Evidence, Assumption and Decision Register

**Purpose:** Factual and governance foundation for every other artifact.

**Outputs:**

- Source register
- Fact register
- Assumption register
- Open-question register
- Decision log
- Change log
- Deliverable manifest
- Effort tracker
- Confidentiality and distribution rules

**Owner:** Christina

**Codex role:** Create and maintain all structured registers.

**First usable version:** 7 September 2026

**Acceptance criteria:**

- Every primary source is inventoried.
- Every source-derived claim has a source ID.
- Every unverified claim is labelled as an assumption or hypothesis.
- No guessed client identity appears.
- Every decision has owner, date, rationale and impacted artifact IDs.

---

## D1 — Process Decomposition and Journey Backbone

**Purpose:** Translate the detailed process maps into a structured basis for journeys and requirements.

**Outputs:**

- M0–M8 activity matrix
- Current-to-target comparison
- Executive five-stage backbone
- Process-to-journey mapping
- Trigger-variant matrix
- Parallel flow, decision and rework inventory

**Owner:** Christina

**Design review:** Xiaoming and Coco

**First usable version:** 8 September 2026

**Acceptance criteria:**

- All M0–M8 activities are represented.
- Legal and Credit activities are mapped separately but linked to the backbone.
- Current and target activities are not mixed.
- Agentic execution and human-in-the-loop activities are distinguishable.
- Each record carries provenance and validation status.

---

## D2 — Initiative and Product Framing Deck

**Purpose:** Narrative foundation for alpha, pre-client and workshop materials.

**Recommended 10-slide structure:**

1. Product ask and strategic objective
2. Why clear-to-trade is broader than a standalone KYC tool
3. From process map to role-based journey and product definition
4. Delivery and product-design principles
5. Clear-to-trade journey backbone
6. Persona ecosystem and priority roles
7. One core journey and trigger variants
8. Current-to-target transformation
9. Deliverables, gates and working model
10. Decisions and inputs required

**Owner:** Christina

**Visual lead:** Xiaoming

**Visual support:** Coco

**Codex role:** Generate slide-level content and visual specifications; maintain version consistency.

**Versions:**

- v0.5 Alpha — 10 September
- v0.8 Pre-client — 16 September
- Workshop version — T-5

**Acceptance criteria:**

- The storyline is understandable without the full detailed process map.
- It distinguishes confirmed facts from working hypotheses.
- It does not imply production architecture.
- It makes the connection from process to journey to product explicit.
- Every slide maps to one or more downstream deliverables.

---

## D3 — Persona and Jobs-to-Be-Done Hypothesis Pack

**Purpose:** Role foundation for journey, experience and product behaviour.

**Outputs:**

- Role ecosystem map
- Priority persona card: Case Manager
- Priority persona card: KYC Operations
- Supporting persona summaries
- Jobs-to-be-done matrix
- Objectives, information needs, decisions, risks and provisional success measures

**Owner:** Christina

**Visual lead:** Coco

**Journey integration:** Xiaoming

**Versions:**

- Skeleton — 8 September
- v0.8 — 10 September
- v1.0 — 16 September

**Acceptance criteria:**

- End-to-end roles are visible.
- Case Manager and KYC Operations receive greater depth.
- Jobs to be done are distinct from process activities.
- KPIs and SLAs are shown only as hypotheses when not confirmed.
- Data access and decision rights are not invented.

---

## D4 — Current Role-based User Journey

**Purpose:** Convert the current process into a user and operating experience, with visible pain points and root-cause hypotheses.

**Outputs:**

- Executive current journey
- Detailed M0–M8 journey / service blueprint
- Pain-point and opportunity register
- Root-cause classification: process, ownership, policy, data, system and operating model
- Priority deep dives for Case Manager and KYC Operations

**Owner:** Christina

**Visual lead:** Xiaoming

**Visual support:** Coco

**Versions:**

- Skeleton — 9 September
- Alpha — 10 September
- Client-ready v1.0 — 16 September

**Acceptance criteria:**

- The journey shows what users try to achieve, not only what tasks occur.
- Internal waiting, client waiting and system waiting are distinguishable.
- Pain points are marked as hypotheses unless explicitly evidenced.
- Every pain point maps to a process ID and source or assumption ID.
- The output does not presume that AI is required for every problem.

---

## D5 — Hero Case and Trigger Variant Pack

**Purpose:** Scenario foundation that keeps all later artifacts centred on one consistent case.

**Core backbone:** Institutional Client Clear-to-Trade

**Primary trigger:** New Relationship

**Variants:**

- Product or service extension
- Material ownership or risk change
- Refresh or reassessment
- Cross-border or new-country expansion

**Recommended hero case design:**

- one standard end-to-end path;
- one ambiguous screening hit;
- one EDD trigger;
- parallel Legal and Credit work;
- one human escalation;
- one remediation loop;
- final structured clear-to-trade state.

**Outputs:**

- Hero case summary card
- Event timeline
- Main flow
- Exception branch
- Trigger-delta matrix
- Current-pain to target-resolution mapping

**Owner:** Christina

**Storyboard lead:** Coco

**Journey mapping:** Xiaoming

**Versions:**

- Structure — 9 September
- Alpha — 10 September
- v1.0 — 16 September
- Client-validated — after the pre-client meeting

**Acceptance criteria:**

- The hero case is synthetic and contains no client-identifying data.
- The case is sufficiently complex to test the product vision but is not an implausible collection of every exception.
- Trigger variants reuse the core backbone.
- Each event maps to process, role, state and product implication.

---

## D6 — Target Agentic User Journey

**Purpose:** Future-experience foundation showing how the product redistributes work across users, agentic execution, rules, systems and human judgment.

**Recommended lanes:**

1. Client
2. Sales / Relationship Manager
3. Case Manager / KYC Operations
4. Agentic Product Execution
5. Human Expert / Judgment
6. Systems and Third-party Tools
7. Structured State
8. Experience and Business Value

**Required mechanisms:**

- Dynamic requirements determine what runs
- Non-dependent fulfilment starts early
- Readiness is continuously reassessed
- Evidence is sourced and reused before asking the client
- Standard execution is agentic
- Human judgment handles ambiguity, materiality and exceptions
- Every action and decision is traceable

**Owner:** Christina

**Visual lead:** Xiaoming

**Product-state visual support:** Coco

**Versions:**

- Skeleton — 10 September
- v0.8 — 16 September
- v1.0 — 23 September

**Acceptance criteria:**

- Uses the same case and trigger model as D5.
- Shows explicit work, not a generic “Agentic AI” band.
- Each major action identifies data, tool, human boundary and state change.
- MVP and target autonomy are not conflated.
- Future value remains a hypothesis when no baseline exists.

---

## D7 — Human-in-the-Loop and Autonomy Model

**Purpose:** Control foundation defining when the product assists, prepares, executes and escalates.

**Four autonomy modes:**

- **Assist** — retrieve, explain, compare, summarise or recommend
- **Prepare** — produce a draft or assembled work product for approval
- **Execute within guardrails** — execute deterministic or low-risk work within approved rules and permissions
- **Escalate for judgment** — stop and route ambiguous, material, complex or exceptional cases to an accountable human

**Two design horizons:**

- MVP autonomy
- Target autonomy / review by exception

**Priority control points:**

- entity classification exceptions;
- complex information gaps;
- ambiguous screening hits;
- material screening findings;
- EDD judgment and risk assessment;
- EDD outcome and condition approval;
- QA sign-off;
- conflict resolution;
- Legal and Credit decisions;
- final clear-to-trade accountability.

**Outputs:**

- Autonomy principles
- M0–M8 task-allocation matrix
- MVP vs target comparison
- Escalation and recovery flow
- Human accountability matrix

**Owner:** Christina

**Visual lead:** Coco

**Journey integration:** Xiaoming

**Versions:**

- Concept — 10 September
- v0.8 — 16 September
- v1.0 — 23 September

**Acceptance criteria:**

- Every target activity has an autonomy mode.
- Every execute action has guardrails and an accountable owner.
- Every escalation has a trigger, receiver, expected decision and re-entry rule.
- QA sign-off and clear-to-trade publication remain explicitly unresolved where the supplied evidence is insufficient.

---

## D8 — Structured State Model

**Purpose:** State and data foundation allowing readiness to be continuously calculated, displayed and audited.

**State domains:**

- Case
- Booking model
- Requirements
- Evidence
- Screening
- EDD
- Quality Assurance
- Conflicts
- Legal
- Credit
- Clear-to-Trade

**Outputs:**

- State dictionary
- State-transition table
- Readiness component model
- Role-visible status model
- State-event mapping
- State ownership and source-of-truth hypotheses

**Owner:** Christina

**Visual lead:** Coco

**Journey validation:** Xiaoming

**Versions:**

- Draft — 16 September
- v1.0 — 23 September

**Acceptance criteria:**

- Every major journey action creates or consumes a defined state or event.
- State names are unambiguous and mutually consistent.
- Clear-to-trade is decomposed into prerequisite states.
- Source-of-truth fields are hypotheses unless confirmed.
- Status visibility respects role boundaries.

---

## D9 — Agentic Operating Model

**Purpose:** Work-allocation foundation explaining how product, deterministic rules, humans, third-party tools and downstream systems collaborate.

**Outputs:**

- Logical operating-model diagram
- Product execution loop
- Human exception loop
- Tool and action catalogue
- Failure, override and recovery pattern
- Audit and traceability model
- MVP and target operating comparison

**Owner:** Christina

**Visual lead:** Coco

**Experience alignment:** Xiaoming

**Versions:**

- Concept — 16 September
- v1.0 — 23 September

**Acceptance criteria:**

- Does not assume an Agent Studio platform.
- Distinguishes workflow, rules, document intelligence, AI assistance, agentic execution and human decision.
- Shows how work re-enters the agentic flow after human resolution.
- Identifies third-party tools as logical integrations, not final technical architecture.

---

## D10 — Product Capability and Requirement Hypothesis Pack

**Purpose:** Product-definition foundation for workshop prioritisation and later detailed product work.

**Initial capability epics:**

1. Relationship and product intake
2. Booking model and scope determination
3. Client and entity classification
4. Dynamic requirements
5. Evidence sourcing, reuse and provenance
6. Client request and clarification management
7. Screening and alert adjudication
8. EDD evidence and decision support
9. Continuous assurance and QA
10. Conflicts check
11. Legal and Credit orchestration
12. Continuous readiness calculation
13. Structured clear-to-trade state
14. Human exception workbench
15. Audit and traceability
16. Operational and management insight
17. Multi-region compliance, PII and cybersecurity
18. Agent evaluation, governance and controls

**Outputs:**

- Capability map
- Epic definitions
- Requirement backlog
- Prioritisation scorecard
- Requirement traceability matrix
- MVP candidate set
- Open product decisions

**Owner:** Christina

**Visual and prioritisation support:** Coco

**Journey traceability:** Xiaoming

**Versions:**

- Taxonomy — 23 September
- Backlog v0.8 — 30 September
- Workshop version — T-5

**Acceptance criteria:**

- Every requirement traces to journey, process, persona and capability.
- Every agentic requirement explains why simple workflow, deterministic rules or a single embedded copilot are insufficient.
- Requirements remain hypotheses before client confirmation.
- Architecture requirements are framed as questions or logical needs, not fixed technical designs.

---

## D11 — Pre-client and Workshop Material Pack

**Purpose:** Workshop execution foundation.

**Outputs:**

- Initiative deck adapted as executive pre-read
- Pre-client discussion deck
- Workshop deck
- Current and target journeys
- Hero case materials
- Autonomy canvas
- Structured-state canvas
- Capability and requirement prioritisation canvas
- Facilitation guide
- Decision log template
- Q&A and backup pages

**Owner:** Christina

**Journey visual:** Xiaoming

**Product and workshop visual:** Coco

**Versions:**

- Pre-client pack — 16 September
- Workshop draft — T-7
- Content freeze — T-5
- Dry run — T-2
- Final pack — T-1

**Acceptance criteria:**

- Every workshop section seeks a defined decision or validation.
- Executives and KYC participants both have relevant discussion entry points.
- The materials are neither a blank-canvas exercise nor a falsely finalised product design.
- The deck, canvases and requirement backlog use the same terms and IDs.

---

## D12 — Post-workshop Product Definition Pack

**Purpose:** Foundation for architecture, MVP, design/build/operate and commercial estimation.

**Outputs:**

- Confirmed product vision
- Confirmed personas and journeys
- Approved autonomy and human accountability boundaries
- Prioritised product requirements
- Confirmed structured-state model
- MVP vertical slice
- Confirmed system and integration questions
- Success-measure framework
- Architecture discovery scope
- Design, build and operate workstreams
- Commercial estimation inputs
- Open decisions and owners

**Owner:** Christina

**Versions:**

- Draft — Workshop + 3 working days
- Consolidated baseline — Workshop + 5 working days

**Acceptance criteria:**

- Workshop decisions are distinguished from unresolved hypotheses.
- Requirement changes carry decision references.
- The next phase has an explicit scope and input list.
- No commercial number is invented without an approved estimation basis.

---

# 9. Gate Model

## G0 — Delivery Baseline Lock

**Date:** 4 September 2026

**Purpose:** Approve principles, deliverable architecture, owners, folder structure, task sequence and Codex workflow.

**Required approval:** Christina

**Outputs:** This master handoff and Task T00 execution brief.

---

## G1 — Alpha Direction Lock

**Date:** 10 September 2026

**External/team package:** `Initiative & Journey Alpha Pack v0.5`

**Contents:**

- Confirmed product ask
- Process-to-product method
- Principles
- Journey backbone
- Persona ecosystem and priority roles
- Current journey alpha
- Target journey skeleton
- Hero case and trigger variants
- MVP vs target autonomy concept
- Deliverables, gates and decisions required

**Decisions sought:**

- journey boundary;
- role set;
- hero trigger and case complexity;
- target-journey direction;
- autonomy framing;
- product boundary;
- pre-client pack structure;
- consolidated review owner.

---

## G2 — Internal Alignment Lock

**Date:** 11 September 2026

**Purpose:** Convert comments into decisions, not an uncontrolled edit list.

**Required classifications:**

- Approved
- Revise
- Defer
- Validate with client
- Out of scope

**Outputs:** Updated decision log, change-impact report and G3 work plan.

---

## G3 — Client-ready Pre-meeting Lock

**Date:** 16 September 2026

**Contents:**

- Initiative deck v0.8
- Current journey v1.0
- Target journey v0.8
- Hero case v1.0
- Autonomy model v0.8
- Logical product environment
- Validation questions

**Purpose:** Prepare material for the pre-client meeting in the week of 17 September.

---

## G4 — Product Definition Lock

**Date:** 23 September 2026

**Internal outputs:**

- Target journey v1.0
- HITL and autonomy v1.0
- Structured state v1.0
- Agentic operating model v1.0
- Product capability taxonomy

---

## G5 — Workshop Content Freeze

**Date:** T-5 working days

**Outputs:**

- Requirement backlog workshop version
- Executive pre-read
- Workshop deck
- Canvases
- Facilitation guide
- Decision pack

---

## G6 — Workshop Readiness

**Date:** T-2 working days

**Outputs:**

- Full dry run
- Timing and facilitator assignments
- Q&A and backup pages
- Decision prompts
- Final action list

---

## G7 — Product Definition Baseline

**Date:** Workshop + 5 working days

**Output:** D12 consolidated baseline.

---

# 10. Calendar and Action Plan

## 4 September — Baseline and resource coordination

### Christina

- Confirm Xiaoming and Coco's availability for 7–10 September.
- Explain confidentiality and neutral naming rules.
- Confirm the 10 September delivery and 11 September review.
- Confirm the controlled project workspace.

### ChatGPT

- Finalise this handoff.
- Prepare Task T00.
- Define first-pass process-to-journey content logic.

### Codex

- Do not begin until Christina approves G0.

---

## 7 September — Kickoff and repository bootstrap

### Christina

- Run a 45-minute kickoff with Xiaoming and Coco.
- Explain the product ask, M0–M8, audience, gates and ownership.
- Confirm the proposed division of visual work.

### Codex

- Execute T00–T02 after T00 passes.

### Xiaoming

- Define the journey visual system.
- Create the executive and detailed journey-grid directions.

### Coco

- Define persona, hero-case, autonomy and state visual patterns.

---

## 8 September — Process and role foundation

### Christina + ChatGPT

- Review M0–M8 decomposition.
- Confirm persona hypotheses.
- Confirm initial pain-point library.
- Confirm hero-case spine.

### Xiaoming

- Build the current-journey skeleton and five-stage executive backbone.

### Coco

- Build role ecosystem, priority persona cards and trigger-variant visual.

### Codex

- Execute T03–T05 in approved sequence.

---

## 9 September — Future-journey synthesis and internal review

### Christina + ChatGPT

- Confirm target journey content.
- Confirm MVP versus target autonomy concept.
- Confirm initiative-deck storyline.
- Confirm decisions and open questions.

### Xiaoming

- Produce current-journey alpha and target-journey layout.

### Coco

- Produce hero-case storyboard, autonomy model and logical product-environment visual.

### Internal review criteria

- Logic is consistent with the process map.
- Hypotheses are visible.
- No architecture overreach.
- Every visual contributes to the later product requirements.

---

## 10 September — G1 alpha delivery

Send:

- `Clear_to_Trade_Alpha_Pack_v0.5`
- source and assumption appendix
- decisions-required list
- next-stage plan

The alpha pack should contain approximately 9–10 slides, following the D2 structure and incorporating D3–D7 alpha content.

---

## 11 September — G2 catch-up

The meeting must end with:

- approved items;
- revision decisions;
- items deferred to the client;
- scope additions or removals;
- named owners and dates;
- impact on D3–D11.

Update the decision log on the same day.

---

## 14–16 September — Pre-client refinement

Complete:

- D3 v1.0
- D4 v1.0
- D5 v1.0
- D6 v0.8
- D7 v0.8
- D9 logical concept
- G3 validation questions

Send the client-ready pack by 16 September.

---

## Week of 17 September — Pre-client validation

Use the meeting to validate, not to re-present the process map.

Seek input on:

- role definitions and jobs to be done;
- real pain points and severity;
- trigger priority;
- human-accountability points;
- current systems and tools;
- system replacement and integration boundaries;
- KPIs and SLAs;
- product success measures;
- workshop decisions required.

After the meeting, execute the change-impact workflow before updating the artifacts.

---

## 17–23 September — Target model and product-definition foundation

Complete:

- D6 v1.0
- D7 v1.0
- D8 v1.0
- D9 v1.0
- D10 taxonomy

Pass G4 on 23 September.

---

## 24–30 September — Requirement and workshop build

Complete:

- D10 backlog v0.8
- Prioritisation scorecard
- Requirement traceability
- D11 workshop draft
- Executive pre-read draft
- Canvases and facilitation guide

Aim to have substantive content complete by 30 September so the remaining time is reserved for client input, quality review and dry run.

---

## T-7 to T-1 — Workshop finalisation

- T-7: integrated workshop draft
- T-5: content freeze
- T-2: dry run and executive Q&A
- T-1: final packaging and distribution

---

## Workshop + 3 to +5 working days

- +3: D12 draft
- +5: D12 consolidated baseline

---

# 11. Working Workflow

## 11.1 Standard production loop

```text
Christina decision or new source
        ↓
ChatGPT analyses and updates the master content model
        ↓
Codex creates or updates structured artifacts
        ↓
Xiaoming / Coco visualise approved content
        ↓
ChatGPT checks logic, traceability, scope and consistency
        ↓
Christina approves the gate
```

## 11.2 Daily handoff rules

1. Christina provides new decisions or inputs in one consolidated message.
2. ChatGPT converts them into:
   - impacted IDs;
   - required content changes;
   - downstream impact;
   - Codex task update.
3. Codex updates the structured files first.
4. Visual outputs are updated only after the underlying structured content is accepted.
5. ChatGPT performs consistency QA.
6. Christina approves, rejects or defers.

## 11.3 Change-impact workflow

For any new SME or client input:

```text
New input
→ Add source ID
→ Compare with existing facts and assumptions
→ Update validation status
→ Identify impacted Process / Journey / State / Capability / Requirement IDs
→ Update structured source files
→ Generate change-impact report
→ Update visual artifacts
→ Record decision
```

## 11.4 Review workflow

Every review comment must become one of:

- `APPROVE`
- `REVISE`
- `DEFER_TO_CLIENT`
- `OUT_OF_SCOPE`
- `NEEDS_EVIDENCE`

Do not maintain free-floating comments without owner and status.

## 11.5 Version workflow

Use:

- `v0.1–v0.4`: internal working
- `v0.5`: alpha review
- `v0.8`: client-ready draft
- `v0.9`: workshop-ready draft
- `v1.0`: gate-approved version
- `v1.1+`: controlled updates after approved changes

---

# 12. Repository Structure

```text
clear-to-trade-product/
│
├── README.md
├── CODEX_MASTER_HANDOFF.md
├── .gitignore
│
├── 00_sources/
│   ├── raw/
│   ├── normalized/
│   └── source_inventory.csv
│
├── 00_governance/
│   ├── delivery_principles.md
│   ├── deliverable_manifest.csv
│   ├── source_register.csv
│   ├── fact_register.csv
│   ├── assumption_register.csv
│   ├── open_questions.csv
│   ├── decision_log.csv
│   ├── change_log.csv
│   ├── effort_tracker.csv
│   └── distribution_rules.md
│
├── 01_process/
│   ├── process_decomposition.csv
│   ├── process_decomposition.md
│   ├── current_target_comparison.csv
│   ├── trigger_variant_matrix.csv
│   └── process_to_journey_mapping.csv
│
├── 02_initiative_deck/
│   ├── initiative_deck_content.md
│   ├── initiative_deck_slide_spec.md
│   ├── initiative_deck_dependencies.csv
│   └── initiative_deck_review_log.csv
│
├── 03_personas_journey/
│   ├── role_ecosystem.md
│   ├── persona_hypotheses.md
│   ├── jobs_to_be_done.csv
│   ├── journey_moments.csv
│   ├── current_journey.md
│   ├── pain_point_register.csv
│   ├── hero_case.md
│   ├── hero_case_events.csv
│   ├── trigger_variants.csv
│   └── target_agentic_journey.md
│
├── 04_operating_model/
│   ├── autonomy_principles.md
│   ├── hitl_task_matrix.csv
│   ├── escalation_recovery_flow.md
│   ├── state_dictionary.csv
│   ├── state_transitions.csv
│   ├── readiness_model.md
│   ├── agentic_operating_model.md
│   └── logical_product_environment.md
│
├── 05_product_requirements/
│   ├── capability_map.csv
│   ├── capability_map.md
│   ├── requirement_backlog.csv
│   ├── prioritisation_scorecard.csv
│   ├── requirement_traceability.csv
│   └── open_product_decisions.csv
│
├── 06_workshop/
│   ├── executive_preread.md
│   ├── preclient_deck_content.md
│   ├── workshop_deck_content.md
│   ├── workshop_canvases.md
│   ├── facilitation_guide.md
│   ├── workshop_decision_log.csv
│   └── qa_backup_questions.md
│
├── 07_output/
│   ├── alpha_pack/
│   ├── preclient_pack/
│   ├── workshop_pack/
│   └── postworkshop_product_definition/
│
├── scripts/
│   ├── validate_sources.py
│   ├── validate_confidentiality.py
│   ├── validate_ids.py
│   ├── validate_traceability.py
│   ├── validate_requirements.py
│   └── generate_status_report.py
│
└── tests/
    ├── test_source_inventory.py
    ├── test_confidentiality.py
    ├── test_ids.py
    ├── test_traceability.py
    └── test_requirements.py
```

---

# 13. Quality and Validation Rules

## 13.1 Confidentiality validation

The repository must contain a configurable prohibited-term list. At minimum, it must detect:

- guessed client names;
- guessed business-unit names;
- unapproved logos or branded references;
- phrases that imply the client identity has been confirmed.

The scan must exclude clearly labelled private source-analysis files only when Christina explicitly approves the exclusion. Shared outputs must have zero prohibited-name hits.

## 13.2 Source validation

- Every source ID must resolve to a file or written brief.
- Tier 1 sources must be present or explicitly marked unavailable.
- Missing primary sources must stop downstream execution.

## 13.3 ID validation

- IDs must be unique.
- Every relationship field must reference an existing ID.
- Every product requirement must link to at least one journey and process ID.

## 13.4 Traceability validation

Required minimum chain for each product requirement:

`Requirement → Capability → Journey Moment → Process Activity → Source or Assumption`

## 13.5 Narrative consistency validation

The following terms must be used consistently:

- Clear-to-Trade
- Agentic Product Execution
- Human-in-the-Loop for MVP
- Human Review by Exception for Target
- Dynamic Requirements
- Continuous Readiness
- Structured State
- Case Manager
- KYC Operations

## 13.6 Scope validation

Flag any pre-work content that introduces:

- final architecture;
- detailed API design;
- final technology selection;
- unapproved commercial estimate;
- unconfirmed KPI targets;
- autonomous KYC, QA or clearance approval.

---

# 14. Codex Task DAG

```text
T00 Repository Bootstrap and Guardrails
 ↓
T01 Source Normalisation and Inventory
 ↓
T02 Evidence, Assumption and Decision Baseline
 ↓
T03 M0–M8 Process Decomposition
 ├──────────────┬────────────────┐
 ↓              ↓                ↓
T04 Initiative  T05 Personas     T06 Pain Points and
Deck Skeleton   and JTBD         Current Journey
 └──────────────┼────────────────┘
                ↓
T07 Hero Case and Trigger Variants
                ↓
T08 Target Agentic Journey
       ┌────────┼─────────┐
       ↓        ↓         ↓
T09 Autonomy  T10 State  T11 Agentic Operating Model
       └────────┼─────────┘
                ↓
T12 Product Capability Map
                ↓
T13 Product Requirement Backlog
                ↓
T14 Alpha and Pre-client Pack Assembly
                ↓
T15 Workshop Pack Assembly
                ↓
T16 Post-workshop Product Definition Baseline
```

---

# 15. Codex Task Specifications

## T00 — Repository Bootstrap and Guardrails

**Goal:** Create a controlled repository, folder structure, governance files, validation scaffolding and project README before any content drafting.

**Inputs:**

- This master handoff
- Existing project directory
- Available source files

**Files to create:**

- Repository tree from Section 12
- `README.md`
- `CODEX_MASTER_HANDOFF.md`
- governance-file headers
- validation-script stubs with working bootstrap checks
- initial tests

**Steps:**

- [ ] Confirm the current working directory and whether it is already a Git repository.
- [ ] If no Git repository exists, initialise Git in the project root.
- [ ] Create the folder structure exactly as specified in Section 12.
- [ ] Copy this handoff to `CODEX_MASTER_HANDOFF.md` without editing its requirements.
- [ ] Create `README.md` with project goal, approved neutral naming, execution rules, gates and the instruction to run one task at a time.
- [ ] Create CSV headers for every governance register.
- [ ] Create `00_governance/distribution_rules.md` with the confidentiality and neutral-client naming rules.
- [ ] Create `scripts/validate_sources.py` to check required filenames or accepted filename variants.
- [ ] Create `scripts/validate_confidentiality.py` to scan shared-output folders for prohibited client-identification terms configured in a local text list.
- [ ] Create `scripts/validate_ids.py` to check unique IDs in governance CSV files.
- [ ] Create bootstrap tests for source paths, confidentiality scanning and ID uniqueness.
- [ ] Run all bootstrap tests.
- [ ] Generate a bootstrap status report listing created files, found sources, missing sources and risks.
- [ ] Commit with message: `chore: bootstrap clear-to-trade delivery repository`.

**Verification:**

Run:

```bash
python scripts/validate_sources.py --phase bootstrap
python scripts/validate_confidentiality.py 07_output
python scripts/validate_ids.py 00_governance
python -m pytest tests/test_source_inventory.py tests/test_confidentiality.py tests/test_ids.py -v
```

Expected result:

- repository tree exists;
- validation scripts return exit code 0 for bootstrap conditions;
- missing optional references are reported but do not fail;
- missing Tier 1 primary sources fail;
- shared-output folders contain no prohibited identifiers.

**Stop condition:** Stop after T00. Present the repository tree, source availability report, test results, risks and proposed T01 start. Do not execute T01 without Christina's approval.

---

## T01 — Source Normalisation and Inventory

**Goal:** Bring all primary and approved secondary sources into a controlled, searchable and citeable internal structure.

**Inputs:** T00 repository; Tier 1 and available Tier 2 files.

**Outputs:**

- raw source copies
- normalised plain-text extracts
- `source_inventory.csv`
- source hashes
- source priority and status

**Steps:**

- [ ] Locate the exact Tier 1 files by filename and accepted filename variants.
- [ ] Copy sources into `00_sources/raw/` without modification.
- [ ] Calculate SHA-256 hashes and record them.
- [ ] Extract text from TXT, Markdown, PPTX and PDF sources into `00_sources/normalized/`.
- [ ] Preserve slide or page boundaries in normalised files.
- [ ] Create source IDs and populate the source inventory.
- [ ] Label each source by tier, owner, date, confidentiality and intended use.
- [ ] Record any unreadable or incomplete source.
- [ ] Run source validation.
- [ ] Commit with message: `docs: normalise clear-to-trade source pack`.

**Acceptance criteria:**

- Tier 1 sources are readable and indexed.
- Original files are unchanged.
- Page/slide boundaries are preserved.
- Every source has a unique ID and hash.

---

## T02 — Evidence, Assumption and Decision Baseline

**Goal:** Establish D0 before creating narrative content.

**Outputs:** source, fact, assumption, question, decision, change and deliverable registers.

**Steps:**

- [ ] Extract meeting-confirmed facts from the transcript and summary.
- [ ] Extract process-map-derived statements separately.
- [ ] Record Raunaq's written brief as confirmed written input.
- [ ] Create assumptions for pain points, KPIs, roles, system boundaries and autonomy points not yet confirmed.
- [ ] Create open questions for QA sign-off, clear-to-trade accountability, Salesforce scope, regional systems, exact workshop date and product success measures.
- [ ] Populate the deliverable manifest with D0–D12, owners, dates, dependencies and gate links.
- [ ] Run confidentiality, source and ID validation.
- [ ] Commit with message: `docs: establish evidence and assumption baseline`.

**Acceptance criteria:**

- Facts and assumptions are never mixed.
- Each fact resolves to a primary source.
- Each assumption has an impact and validation route.
- Every deliverable has owner, date, dependency and status.

---

## T03 — M0–M8 Process Decomposition

**Goal:** Create D1 as the structural foundation for all journeys and requirements.

**Outputs:** detailed decomposition, current-target comparison, trigger matrix and process-to-journey mapping.

**Steps:**

- [ ] Extract all M0–M8 current activities from the process map.
- [ ] Extract all M0–M8 target activities.
- [ ] Extract Legal C1 and Credit C2 activities.
- [ ] Identify decisions, optional flows, parallel flows and rework loops.
- [ ] Map each activity to actor, input, system, output and handoff.
- [ ] Identify which target activities are agentic and which are human-in-the-loop.
- [ ] Assign each activity to one of the five executive stages.
- [ ] Create trigger-specific deltas without duplicating the common backbone.
- [ ] Record pain-point hypotheses separately from process facts.
- [ ] Validate every process ID and source reference.
- [ ] Commit with message: `docs: decompose current and target clear-to-trade process`.

**Acceptance criteria:** All M0–M8, Legal and Credit activities are represented with no orphan records.

---

## T04 — Initiative Deck Content Skeleton

**Goal:** Create the D2 narrative foundation for G1.

**Outputs:** slide-by-slide content and visual specification for the 10-slide initiative deck.

**Steps:**

- [ ] Draft the 10-slide storyline from D0 and D1.
- [ ] Add a one-sentence purpose and decision objective to every slide.
- [ ] Identify which downstream artifacts each slide uses and feeds.
- [ ] Mark facts, hypotheses and client-validation questions.
- [ ] Write a visual brief for Xiaoming and Coco for every slide.
- [ ] Run scope and confidentiality validation.
- [ ] Commit with message: `docs: create initiative deck narrative skeleton`.

**Acceptance criteria:** No slide introduces content without a source, assumption or decision reference.

---

## T05 — Persona and Jobs-to-Be-Done Hypotheses

**Goal:** Create D3 role foundation.

**Outputs:** role ecosystem, two deep-dive personas, supporting-role summaries and JTBD matrix.

**Steps:**

- [ ] List all roles shown in primary sources.
- [ ] Separate confirmed process roles from design personas.
- [ ] Draft Case Manager and KYC Operations deep dives.
- [ ] Define objectives, inputs, outputs, decisions, frustrations, risks and information needs.
- [ ] Draft provisional success measures without inventing targets.
- [ ] Record all unvalidated statements as assumptions.
- [ ] Produce visual specifications for Coco.
- [ ] Commit with message: `docs: define role and jobs-to-be-done hypotheses`.

---

## T06 — Pain Points and Current Role-based Journey

**Goal:** Create D4 alpha for G1.

**Outputs:** journey moments, pain-point register, root-cause classification and current journey content.

**Steps:**

- [ ] Convert D1 process activities into user objectives and journey moments.
- [ ] Identify handoffs, waits, repeated actions, manual interpretation and multi-system work.
- [ ] Distinguish client, employee and system experience.
- [ ] Classify root causes by process, ownership, policy, data, system and operating model.
- [ ] Add improvement opportunities without preselecting AI.
- [ ] Produce executive and detailed journey content specifications.
- [ ] Run traceability validation.
- [ ] Commit with message: `docs: build current role-based clear-to-trade journey`.

---

## T07 — Hero Case and Trigger Variants

**Goal:** Create D5 scenario foundation.

**Outputs:** synthetic hero case, event timeline, main flow, exception branch and trigger-delta matrix.

**Steps:**

- [ ] Create a synthetic institutional-client profile with no client-identifying details.
- [ ] Use New Relationship as the primary trigger.
- [ ] Add one ambiguous screening hit, one EDD trigger, parallel Legal/Credit, one human escalation and one rework loop.
- [ ] Ensure the case remains plausible and readable.
- [ ] Map each event to process IDs, roles, evidence, decisions, state and product implications.
- [ ] Define deltas for product extension, material change, refresh and cross-border expansion.
- [ ] Produce storyboard content for Coco and journey integration notes for Xiaoming.
- [ ] Commit with message: `docs: define hero clear-to-trade case and trigger variants`.

---

## T08 — Target Agentic Journey

**Goal:** Create D6 from approved current journey and hero case.

**Outputs:** target journey content, lane matrix and value hypotheses.

**Steps:**

- [ ] Use the same journey moments and hero-case events as D4 and D5.
- [ ] Allocate each future action across user, product, deterministic rule, third-party tool, human expert and system.
- [ ] Add dynamic requirements, parallel fulfilment, continuous readiness and evidence reuse.
- [ ] Add explicit state transitions.
- [ ] Add MVP and target-state notes without merging them.
- [ ] Add value hypotheses linked to current pain points.
- [ ] Produce visual specification for Xiaoming.
- [ ] Run traceability and scope validation.
- [ ] Commit with message: `docs: create target agentic clear-to-trade journey`.

---

## T09 — Autonomy and Human-in-the-Loop Model

**Goal:** Create D7 control foundation.

**Outputs:** task-allocation matrix, MVP/target comparison, escalation and recovery flow.

**Steps:**

- [ ] Assign Assist, Prepare, Execute within Guardrails or Escalate for Judgment to every target task.
- [ ] Identify human owner and accountability.
- [ ] Define allowed action, prohibited action, guardrail, escalation trigger and audit record.
- [ ] Separate MVP and target autonomy.
- [ ] Highlight unresolved QA, conflict, EDD and clear-to-trade decisions.
- [ ] Produce visual specification for Coco.
- [ ] Commit with message: `docs: define human-in-the-loop and autonomy model`.

---

## T10 — Structured State and Readiness Model

**Goal:** Create D8 state foundation.

**Outputs:** state dictionary, transition table, readiness model and role-visible status.

**Steps:**

- [ ] Define state domains and allowed state values.
- [ ] Map hero-case events to state transitions.
- [ ] Define provisional readiness components and prerequisites.
- [ ] Identify which role may view which status.
- [ ] Record source-of-truth hypotheses.
- [ ] Validate no contradictory transitions.
- [ ] Produce visual specification for Coco.
- [ ] Commit with message: `docs: define structured state and readiness model`.

---

## T11 — Agentic Operating Model and Logical Product Environment

**Goal:** Create D9 without drifting into production architecture.

**Outputs:** operating model, execution loop, human exception loop, tool/action catalogue, logical product environment.

**Steps:**

- [ ] Define product execution responsibilities.
- [ ] Distinguish workflow, rules, AI assistance and agentic execution.
- [ ] Define third-party tool interactions at logical level.
- [ ] Define human exception reception, decision, override and re-entry.
- [ ] Define audit and traceability needs.
- [ ] Define MVP and target-state differences.
- [ ] Flag all technical architecture items as post-workshop.
- [ ] Commit with message: `docs: define agentic operating model and logical environment`.

---

## T12 — Product Capability Map

**Goal:** Create the first layer of D10.

**Outputs:** capability map, epic definitions and capability-to-journey mapping.

**Steps:**

- [ ] Create the 18 initial capability epics from Section 8.
- [ ] Define purpose, users, journey stages, product behaviour, human boundary and value for each capability.
- [ ] Map capabilities to pain points, states and process activities.
- [ ] Remove duplicate or overlapping capabilities.
- [ ] Mark MVP, later and validation-needed candidates.
- [ ] Produce visual specifications for Coco.
- [ ] Commit with message: `docs: define clear-to-trade product capability map`.

---

## T13 — Product Requirement Hypothesis Backlog

**Goal:** Create the second layer of D10.

**Outputs:** requirement backlog, scorecard, traceability and open-product-decision log.

**Steps:**

- [ ] Derive product requirements from the capability map and target journey.
- [ ] Populate every required backlog field.
- [ ] Score each requirement using the seven stated dimensions.
- [ ] Identify MVP candidate requirements.
- [ ] Explain why each agentic requirement needs agentic execution rather than workflow, rules or a simpler embedded copilot.
- [ ] Run requirement and traceability validation.
- [ ] Commit with message: `docs: create product requirement hypothesis backlog`.

---

## T14 — Alpha and Pre-client Pack Assembly

**Goal:** Assemble G1 and G3 materials from approved upstream content.

**Outputs:** alpha content package, pre-client content package, slide dependencies and review log.

**Steps:**

- [ ] Assemble the G1 alpha package from D2–D7.
- [ ] Verify every slide against the source and assumption registers.
- [ ] Generate designer-ready page specifications.
- [ ] After G2 decisions, update the content model first.
- [ ] Assemble G3 pre-client pack.
- [ ] Generate a validation-question list tied to open assumptions and decisions.
- [ ] Commit with message: `docs: assemble alpha and pre-client content packs`.

---

## T15 — Workshop Pack Assembly

**Goal:** Create D11 from the approved product-definition hypotheses.

**Outputs:** executive pre-read, workshop deck, canvases, facilitation guide, decision log and backup Q&A.

**Steps:**

- [ ] Define the workshop decision sequence.
- [ ] Build executive and KYC-team discussion paths.
- [ ] Create canvases for journey validation, autonomy, state, capability prioritisation and MVP boundary.
- [ ] Link every session to a decision and expected output.
- [ ] Run terminology, source, scope, confidentiality and traceability QA.
- [ ] Generate dry-run checklist.
- [ ] Commit with message: `docs: assemble clear-to-trade product workshop pack`.

---

## T16 — Post-workshop Product Definition Baseline

**Goal:** Create D12 from actual client decisions.

**Outputs:** confirmed product definition, prioritised requirements, MVP, next-phase scope and decision-linked change report.

**Steps:**

- [ ] Import workshop decisions and action notes.
- [ ] Update assumptions to confirmed, rejected or unresolved.
- [ ] Recalculate requirement priority.
- [ ] Confirm the MVP vertical slice.
- [ ] Define architecture discovery, product design, build-and-operate and estimation inputs.
- [ ] Produce the D12 draft at +3 working days.
- [ ] Incorporate consolidated feedback and issue v1.0 at +5 working days.
- [ ] Commit with message: `docs: baseline post-workshop product definition`.

---

# 16. First Codex Execution Prompt

Copy the prompt below into Codex after Christina approves G0.

```text
You are working on the Institutional Clear-to-Trade Product pre-work repository.

Read `CODEX_MASTER_HANDOFF.md` in full before making changes.

Execute Task T00 — Repository Bootstrap and Guardrails only.

Rules:
1. Do not execute T01 or any downstream task.
2. Preserve the exact approved neutral naming and confidentiality rules.
3. Do not name or imply any guessed client identity.
4. Do not create client-facing journey or product content in T00.
5. Create the exact repository structure, governance headers, README, validation scripts and bootstrap tests specified in T00.
6. Locate the available primary source files, but do not normalise their content yet.
7. Missing Tier 1 sources must be reported as blockers; missing secondary references must be reported as non-blocking gaps.
8. If the current directory is not a Git repository, initialise Git in the project root.
9. Run every T00 verification command.
10. Commit the completed bootstrap work with the required commit message.

At completion, stop and report:
- repository path;
- created file tree;
- Tier 1 sources found and missing;
- tests run and exact results;
- confidentiality scan result;
- risks or ambiguities;
- the precise proposed inputs for T01.

Do not continue until Christina explicitly approves T00 and authorises T01.
```

---

# 17. G0 Approval Checklist for Christina

Before starting Codex T00, confirm:

- [ ] Approved neutral project name
- [ ] Xiaoming and Coco availability for 7–10 September
- [ ] Proposed Xiaoming / Coco work split
- [ ] 10 September alpha and 11 September review
- [ ] Controlled workspace location
- [ ] Git repository location or permission to initialise one
- [ ] Availability of the two 4 September meeting text files
- [ ] Availability of `Sanitised Process Map.pptx`
- [ ] Availability of the Marriott and prior research references, if they are to be used
- [ ] 30-person-day envelope remains a planning estimate pending internal approval
- [ ] Christina is the only final gate approver for Codex execution

---

# 18. Definition of Success for the Pre-work

The pre-work is successful when:

1. the existing process map has been translated into a credible role-based journey;
2. the current journey distinguishes evidence from hypotheses;
3. one coherent hero case demonstrates the common process and trigger variants;
4. the target journey makes agentic execution and human judgment explicit;
5. MVP human-in-the-loop and target review-by-exception are clearly separated;
6. structured state and continuous readiness are visible and traceable;
7. product requirements derive from user work, control needs and journey outcomes;
8. executive and KYC audiences can use the materials to make defined workshop decisions;
9. the repository can absorb new SME or client input without rebuilding every artifact;
10. the workshop outcome can move directly into product definition, architecture discovery, MVP planning, design/build/operate scoping and commercial estimation.

