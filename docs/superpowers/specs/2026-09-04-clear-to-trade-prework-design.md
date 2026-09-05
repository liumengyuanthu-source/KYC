# Clear-to-Trade Workshop Pre-work Delivery Design

**Date:** 4 September 2026
**Design owner and final gate approver:** Christina
**Status:** Approved for implementation on 5 September 2026
**Project directory:** `/Users/christinaliu/Documents/ChatGPT/Australia Bank/clear-to-trade-product`

## 1. Purpose

Establish a controlled delivery system for the Institutional Clear-to-Trade Product workshop pre-work. The system must turn primary evidence into traceable journeys, autonomy boundaries, structured state, product capability and requirement hypotheses, and workshop decisions without guessing the client identity or prematurely fixing a technical architecture.

This design governs how the work will be executed. It does not itself author journey, product, client-facing or workshop content.

## 2. Instruction Boundary

The following files are source material for this design, not self-authorising execution instructions:

- `Clear_to_Trade_Codex_Master_Handoff_v1.md`
- `Clear_to_Trade_Codex_Task_00_Bootstrap.md`

Their principles, task definitions and acceptance criteria are adopted only where this design explicitly retains them. Christina's direct requests and approvals remain the execution authority.

## 3. Selected Delivery Approach

Use a dedicated clean project directory under the existing workspace. Do not transform the existing `Australia Bank` workspace root, and do not move, rename, delete or commit its existing audit artifacts.

The dedicated directory will become the Clear-to-Trade project root. T00 will initialise a repository whose Git top-level is exactly this directory. A Git repository discovered only through the parent workspace does not satisfy this condition. The parent workspace's existing untracked files are outside the Clear-to-Trade delivery boundary.

Execution follows strict gates:

1. Complete G0 readiness.
2. Execute T00 only.
3. Verify T00 and report exact results.
4. Stop for Christina's approval.
5. Continue with T01 only after explicit approval.

No task may be silently combined with its downstream task.

## 4. Governing Principles

### 4.1 Evidence before narrative

Every non-trivial statement must resolve to a primary source, a labelled assumption, a design hypothesis, a client-validation item or an approved decision. Narrative artifacts may simplify evidence but may not replace or override it.

### 4.2 Journey-led product definition

The role-based journey is the mechanism for deriving the target experience, autonomy allocation, structured state, operating model, capabilities and requirements. A requirement cannot be introduced merely because it sounds useful.

### 4.3 One content spine

Maintain this traceability chain:

`Source → Process Activity → Journey Moment → Pain Point / Opportunity → Target Experience → Human or Agentic Action → State Change → Capability → Requirement → Workshop Decision`

### 4.4 One backbone with trigger variants

Preserve M0–M8 plus linked Legal and Credit activities. Model new relationship, product extension, material change, refresh and cross-border expansion as variants of one common backbone.

### 4.5 Explicit human accountability

For every target activity, identify its autonomy mode, accountable human, allowed action, guardrails, stop condition, escalation route, override, recovery and audit record. Keep MVP Human-in-the-Loop separate from target Human Review by Exception.

### 4.6 Capability first and architecture later

Before the workshop, define required product behaviours, logical system boundaries and integration questions. Do not define production architecture, final platforms, detailed APIs, final data models, vendors or commercial estimates.

### 4.7 Updateability and controlled change

Use stable IDs, structured registers and explicit dependencies. New evidence updates affected records and downstream artifacts through a change-impact workflow; it does not silently overwrite earlier assumptions or decisions.

### 4.8 Confidentiality by construction

Use only approved neutral labels. Do not infer the client identity, current volumes, KPIs, SLAs, systems, regulatory interpretations or autonomous approval rights. Shared outputs must pass a configurable prohibited-term scan.

## 5. Delivery Architecture

### 5.1 Foundation

- D0: evidence, assumptions, questions and decisions
- D1: M0–M8 process decomposition and journey backbone

### 5.2 Experience and scenario

- D2: initiative and product-framing narrative
- D3: role ecosystem, priority personas and JTBD hypotheses
- D4: current role-based journey and pain hypotheses
- D5: one synthetic hero case with trigger deltas
- D6: target agentic journey using the same moments and hero case

### 5.3 Control and product definition

- D7: autonomy and Human-in-the-Loop model
- D8: structured state and continuous-readiness model
- D9: agentic operating model and logical product environment
- D10: capability and requirement hypotheses

### 5.4 Workshop and consolidation

- D11: pre-client and workshop materials
- D12: post-workshop product-definition baseline

The dependency direction is one-way unless a later decision triggers the controlled change-impact workflow.

## 6. Execution Phases

### Phase 0 — G0 readiness

Confirm the following before claiming T00 can pass:

- controlled project directory;
- approved neutral naming;
- Christina as final gate approver;
- source locations and availability;
- Xiaoming and Coco availability and work split;
- 10 September alpha and 11 September review expectations;
- prohibited-term configuration owner;
- 30-person-day envelope remains an unapproved planning estimate;
- exact workshop date remains open and later milestones use T-relative dates.

Output: a G0 readiness record classifying each item as `CONFIRMED`, `MISSING`, `OPEN` or `NOT_APPLICABLE`.

### Phase 1 — T00 repository bootstrap

T00 creates only governance and validation foundations:

- project repository and folder structure;
- `README.md` and `CODEX_MASTER_HANDOFF.md`;
- confidentiality and distribution rules;
- governance CSV schemas;
- source, confidentiality and ID validators;
- bootstrap tests;
- safe scaffolds for downstream validators;
- source-availability and bootstrap status reports.

It must not create personas, journey moments, product claims, requirements or client-facing content.

### Phase 2 — T00 verification and gate

Run every specified bootstrap command and preserve the exact command, exit code and relevant output. If a Tier 1 source is missing, source validation must fail and T00 must be reported as `BLOCKED`, not complete. The repository scaffold may exist, but T01 remains prohibited.

When all T00 acceptance criteria pass, commit only the dedicated Clear-to-Trade project files with the approved commit message and stop for Christina's approval.

### Phase 3 — Evidence foundation

After T00 approval:

- T01 copies and normalises approved sources without modifying originals.
- T02 separates facts, assumptions, questions and decisions.
- T03 decomposes M0–M8, Legal and Credit activities with provenance.

No persona, pain point or product narrative becomes approved content before this foundation exists.

### Phase 4 — Alpha definition

After D0 and D1 are accepted, T04–T09 develop the initiative narrative, roles, current journey, hero case, target journey and autonomy model. Visual work consumes approved structured content and cannot introduce unsupported facts.

### Phase 5 — Product and workshop definition

T10–T15 define structured state, logical operating model, capabilities, requirement hypotheses and workshop materials. T16 begins only after actual workshop decisions are captured.

## 7. Source Readiness

The initial read-only search covered the current workspace and `/Users/christinaliu/Downloads`.

Found:

- `Clear_to_Trade_Codex_Master_Handoff_v1.md`
- `Clear_to_Trade_Codex_Task_00_Bootstrap.md`

Not found in the searched locations:

- `09-04 Meeting_ Institutional Trading KYC _Clear to Trade_ Product Kickoff & Planning-transcript.txt`
- `09-04 Meeting_ Institutional Trading KYC _Clear to Trade_ Product Kickoff & Planning-Summary.txt`
- `Sanitised Process Map.pptx`
- a separately controlled copy of Raunaq's written brief
- listed Tier 2 references

The first three missing items are Tier 1 blockers under the adopted source rules. Their absence does not prevent writing the design or repository scaffold, but it prevents T00 acceptance and all downstream content work.

## 8. Specification Resolutions

The master handoff leaves several implementation details incomplete. The implementation plan must resolve them as follows.

### 8.1 Governance register schemas

Define explicit, version-controlled headers for every register before creating empty CSV files. At minimum, every record includes its stable ID, title or description, status, owner, creation date, last-updated date, source or decision linkage, impacted artifact IDs and notes where applicable.

The implementation plan will state every exact column name and validator expectation; no `TBD` columns are permitted.

### 8.2 Bootstrap validation semantics

- Missing Tier 1 source: non-zero exit and T00 `BLOCKED`.
- Missing optional Tier 2 or Tier 3 source: report gap without failing bootstrap.
- Duplicate or malformed governance ID: non-zero exit.
- Prohibited term in a shared-output folder: non-zero exit.
- Empty shared-output folder: successful scan with an explicit zero-file result.

### 8.3 Downstream script scaffolds

T00 fully implements `validate_sources.py`, `validate_confidentiality.py` and `validate_ids.py`. Downstream validators may be created only as safe command-line scaffolds that clearly report `NOT_READY` and cannot be mistaken for successful validation. Their full implementation belongs to the task that creates their input data.

### 8.4 Repository isolation

Before any Git mutation, compare `git rev-parse --show-toplevel` with the dedicated project path. Because the new directory sits inside an existing parent repository, T00 must initialise a local repository when the resolved Git top-level is not exactly the dedicated project directory. All later Git commands, tests, scans and reports must run with the dedicated project directory as their working directory. Existing parent-workspace files are never staged, scanned as project output or moved by T00.

## 9. Quality and Acceptance

### 9.1 T00 acceptance

T00 is complete only when:

- the dedicated tree exists;
- governance schemas are exact and machine-readable;
- bootstrap tests pass;
- all required Tier 1 sources are found;
- optional-source gaps are reported without false failure;
- shared outputs have zero prohibited-term hits;
- IDs are unique and valid;
- the bootstrap report contains no unresolved blocking ambiguity;
- the dedicated project commit contains no parent-workspace artifacts.

### 9.2 Downstream quality

Every requirement must satisfy:

`Requirement → Capability → Journey Moment → Process Activity → Source or Assumption`

Every review comment must become `APPROVE`, `REVISE`, `DEFER_TO_CLIENT`, `OUT_OF_SCOPE` or `NEEDS_EVIDENCE`, with an owner and status.

### 9.3 Scope alarms

Validation must flag:

- final architecture or technology selection;
- detailed APIs;
- unapproved commercial estimates;
- unconfirmed KPI or SLA targets;
- invented client identity or system ownership;
- autonomous KYC, QA or Clear-to-Trade approval claims.

## 10. Skill and Execution Strategy

- Design exploration: `superpowers:brainstorming`
- Detailed implementation plan: `superpowers:writing-plans`
- T00 implementation: `superpowers:test-driven-development`
- Plan execution in this session: `superpowers:executing-plans`
- Completion evidence: `superpowers:verification-before-completion`
- Later PowerPoint production: `presentations:Presentations` or `pptx`, selected when an approved deck task begins

Subagents are not required for T00. Work will be executed inline so that repository boundaries and gate evidence remain easy to audit.

## 11. Decisions Already Approved

- Use a dedicated clean project directory.
- Do not repurpose the existing workspace root.
- Preserve the parent workspace and its existing audit artifacts.
- Analyse and plan before executing the bootstrap.
- Use strict task and approval gates.

## 12. Decisions Required Before T00 Can Pass

- Provide or locate the missing Tier 1 source files.
- Confirm whether the written brief embedded in the master handoff is the controlled source or whether a separate source file exists.
- Supply or approve the initial prohibited-term list without introducing a guessed client identity.
- Confirm Xiaoming and Coco availability and work split if those items remain part of G0.

These items may remain open while preparing the implementation plan. They may not be silently treated as confirmed during T00 verification.

## 13. Miro Automation Scope Update — 5 September 2026

### 13.1 Delivery-model change

The visual-production model is updated from designer-led manual assembly to an automation-first workflow:

`Repository source data → Codex-generated editable Miro V0 → Codex read-back and QA → Xiaoming/Coco refinement → Codex reconciliation → Christina approval`

The repository remains the source of truth. Miro is an editable visual representation and must not become an independent content source.

### 13.2 Added deliverables

The delivery catalogue now includes:

- `F00A` Automation Component Library & Visual Tokens;
- a machine-readable visual token file;
- a reusable component and connector catalogue;
- a frame manifest and per-frame payload files;
- a Miro item registry containing stable content IDs and board geometry;
- geometry QA and designer-refinement registers;
- an export manifest;
- connection, build, read-back and reconciliation reports.

The visual board has three controlled versions:

- `V0`: Codex-generated, structurally complete and editable;
- `V0.5`: designer-refined without unapproved source-content changes;
- `V1.0`: Christina-approved, client-ready and reconciled to the repository.

### 13.3 Added execution tasks and gates

- `CJ-T08A / UX0–UX1`: connection preflight and four-frame pilot only;
- `CJ-T08B / UX2`: Priority A V0 generation, one frame at a time;
- `UX3`: Xiaoming and Coco refine existing generated items;
- `CJ-T08C / UX4–UX5`: read-back reconciliation and export readiness.

CJ-T08A must stop after `F00A`, `F02`, one representative `F04` segment and its matching `F09` segment. Full-board generation requires Christina, Xiaoming and Coco to approve the pilot visual system.

### 13.4 Miro security and editability boundary

Direct board writing is permitted only when all of the following are confirmed:

- a callable Miro integration is available;
- Christina supplies the full approved board URL;
- the authenticated account is in the approved need-to-know team;
- edit permission is confirmed;
- the target area is empty and non-overlapping;
- source, stable-ID, confidentiality and synthetic-data checks pass.

Credentials, access tokens and OAuth data must never be written to the repository. Board items must remain editable; flattened images may be used only as previews or fallback exports.

### 13.5 Current Miro readiness result

The current Codex environment exposes no callable Miro tool. The approved board URL, authenticated team, edit permission, empty target area, `Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md`, and validated F02/F04/F09 source files are also unavailable in the searched locations.

Therefore direct CJ-T08A board creation is blocked. The permitted immediate work is limited to:

- updating the repository delivery model;
- creating local visual tokens, component catalogues and manifest schemas;
- recording the exact connection and source blockers;
- preparing testable fallback payload and SVG-generation contracts without claiming that a Miro board exists.

No F04 or F09 content card may be invented to bypass missing validated journey sources.
