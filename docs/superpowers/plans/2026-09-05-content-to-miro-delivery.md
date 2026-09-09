# Clear-to-Trade Content-to-Miro Delivery Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan inline, task by task. Continue authorised local work; pause full-board expansion after the pilot for Christina's review.

**Goal:** Deliver an evidence-linked, editable Miro pilot, then a reviewable Alpha and pre-client discussion pack.

**Architecture:** Restricted source files feed shared evidence and journey content; structured frame content feeds editable Miro objects. The board is a presentation of the repository, not a competing source of product truth. Designer changes are reconciled before later updates.

**Tech Stack:** Markdown/CSV/YAML, existing local validation scripts, PowerPoint text and visual inspection, official Miro MCP with item readback.

**Spec:** `CODEX_MASTER_HANDOFF.md`; `00_sources/raw/Clear_to_Trade_Codex_Task_CJ08A_Miro_Pilot_v1.md`; `00_sources/raw/Clear_to_Trade_UXUI_Miro_Automation_Scope_v1.1.md`.

## Global constraints

- Neutral project title: Institutional Clear-to-Trade Product. Synthetic pilot content only; no client identity guesses or personal data.
- Preserve M0–M8 references and Legal/Credit dependencies. Distinguish source evidence from assumptions and proposals.
- MVP HITL and target exception review are separate models. Approval authority is not assumed.
- English-first artefacts; no detailed architecture, live systems implementation or invented quantified benefits.
- Native editable shapes/text and anchored connectors; current/target comparable geometry; stable visible IDs and source references.
- No overwrite of designer work. Pilot first, full Alpha after review.
- Board writes only to https://miro.com/app/board/uXjVHr-MAS8=/ after current authentication, permission and confidentiality checks pass.

## Progress update — 7 September

S2-scoped evidence and content pack produced; four Miro pilot frames created and read back (206 managed objects). OAuth restored. Stop at pilot review before full Alpha. Wider source decomposition, formal process-author validation and generic ID-validator schema repair are not complete. See 07_output/2026-09-07-s2-pilot-review.md for exact verification and open issues.

## Historical position — 5 September

- Repository and source intake exist; the meeting text and all five process-map slides have now been reviewed.
- Working five-stage backbone and evidence qualifications are drafted. Detailed journey content is not complete.
- Miro previously authenticated and returned an empty board; this turn's board read failed with OAuth `invalid_grant`. Historical access is not current access. No content written.
- Parent `Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md` is missing; exact eleven-lane and L0/L1/L2 conformity is unresolved. Draft proposals can proceed with visible qualification.

## Delivery sequence

### 1. Evidence and process input pack — D0/D1

**Files:** `00_sources/normalized/2026-09-05-source-review.md`; `00_governance/fact_register.csv`, `assumption_register.csv`, `open_questions.csv`; `01_process/process_decomposition.csv`, `process_to_journey_mapping.csv`.

**Consumes:** SRC-005/006/007 and delivery specifications. **Produces:** traceable activities, qualifications and open decisions for all later content.

- [x] Read transcript and summary; separate AI recommendations from meeting statements.
- [x] Inspect five PPT slides visually as well as native text; record image-only content and strike-through caveats.
- [x] Draft S1–S5 backbone retaining M0–M8 and parallel dependencies.
- [ ] Populate atomic activities and evidence/assumption/question registers using timestamps or slide/shape locators.
- [ ] Review early conflicts, Legal/Credit conditional paths, duplicate M0.1 labels and QA/final-clearance authority.
- [ ] Run source and ID checks; manually verify source meaning and no unsupported client claims. Passing a file validator is not customer validation.
- [ ] Reconcile the repository-wide ID check: inventory and source register intentionally reuse SRC-001–SRC-008 but currently trigger eight duplicate errors. Define the register as canonical and the inventory as its index in validation; retain stable source IDs.

**Acceptance:** each pilot activity traces to a source or explicit hypothesis; no source conflict silently resolved as fact.

### 2. Pilot content pack — F02 + F04/F09 S2

**Files:** `03_personas_journey/journey_moments_master.csv`, `current_journey_matrix.csv`, `target_journey_matrix.csv`; `06_workshop/miro/miro_frame_content/F02.yaml`, `F04_pilot.yaml`, `F09_pilot.yaml`; canonical path mapping in `06_workshop/miro/miro_build_log.md`.

**Consumes:** evidence pack and S2 M2/M3 backbone. **Produces:** source-linked role/actions, hypotheses, target human boundaries and state cards.

- [ ] Resolve canonical filenames against existing scaffold before creating new masters; record aliases and avoid duplicated truth.
- [ ] Prepare Case Manager and KYC Operations JTBD; distinguish inferred role split from map roles.
- [ ] Define provisional L0 executive / L1 journey moment / L2 action mapping and eleven common lanes, visibly pending alignment with missing parent spec.
- [ ] Write matching S2 slices: current action/system/pain/root cause; target action/rule or tool/human boundary/state.
- [ ] Add a small synthetic evidence-gap scenario; do not bundle every possible exception.
- [ ] Check comparable stage coverage, IDs, evidence tags and no unsupported benefit numbers.

**Acceptance:** all four pilot frames have usable local content; unresolved policy and layout decisions are visible and do not masquerade as approvals.

### 3. Editable Miro pilot — CJ-T08A

**Files:** existing visual tokens/component catalogue and F00A YAML; connection report, item registry, geometry QA, designer refinement backlog and build log under `06_workshop/miro/`.

**Consumes:** pilot content and restored current board access. **Produces:** four verified pilot areas, not a full board.

- [ ] Reauthenticate official Miro MCP; require user interaction only if OAuth requires it. Recheck team, owner/edit access, current sharing and non-overlapping area.
- [ ] Resolve confidentiality scanner configuration and manually review final cards for PII, logos and identifying labels; do not publish raw source slides.
- [ ] Read Miro Canvas Composer instructions; build F00A component library, F02 architecture, F04 S2 current and F09 S2 target.
- [ ] Read every created item back; record IDs, coordinates, bounds, parent frames and anchored connectors.
- [ ] Inspect overlap, clipping, flow, current/target alignment and evidence labels; correct safe issues once and recheck.
- [ ] Present pilot to Christina for product logic, Xiaoming for journey hierarchy/readability and Coco for component/state/human-agent distinction.

**Acceptance:** editable native content, complete readback/QA, visible qualifications and a reviewable pilot link. Stop before CJ-T08B expansion until pilot feedback is addressed.

### 4. Alpha and 10/11 September review — CJ-T08B/C, D2–D7 draft

**Files:** Priority A Miro frame content/manifests; `02_initiative_deck/`; hero/persona/journey artefacts in `03_personas_journey/`; HITL material in `04_operating_model/`; export manifest.

**Consumes:** calibrated pilot and reviewed journey content. **Produces:** Priority A Alpha board and approximately 9–10-slide narrative/export selection.

- [ ] Extend core journey end-to-end; add role ecosystem, Case Manager/KYC Ops views and one hero case plus trigger deltas.
- [ ] Add MVP/target autonomy distinction and evidence/assumption legend.
- [ ] Build only scoped Priority A frames and selected executive exports; schedule Priority B detail separately.
- [ ] Designers refine V0 into V0.5; reconcile content changes and preserve their layout work.
- [ ] Christina reviews logic and unresolved decisions; freeze a dated review version and record feedback for the next sprint.

**Acceptance:** narrative is understandable without reading raw process maps; traceable claims, no missing parallel clearances, usable designer review/export pack. Dates are internal working targets, not new calendar commitments.

### 5. Pre-client pack and workshop preparation — staged D11

**Files:** `04_operating_model/`, `05_product_requirements/`, `06_workshop/`, `07_output/`.

**Consumes:** Alpha review feedback. **Produces:** pre-client discussion pack first, then deeper workshop material and post-workshop baseline.

- [ ] Target 16 September for a discussion-ready pack: current/target journeys, hero, HITL concept, logical environment and prioritised questions.
- [ ] Do not require complete D8–D10 to deliver this first pack: the existing manifest's 16 September D11 dependency on 23/30 September outputs is inconsistent. Label concepts provisional and version D11 in stages.
- [ ] Develop structured state/operating model around 23 September and capability/requirement hypotheses around 30 September, subject to actual workshop date.
- [ ] Reconcile first-week-October workshop proposal with PPT's 9–10 October dry run; use confirmed workshop date minus five working days for freeze and minus two for dry run. Earlier workshop means replan or narrow later deliverables.
- [ ] After workshop, convert validated decisions into the product-definition baseline and keep unresolved hypotheses open.

**Acceptance:** each version states what is confirmed, proposed and needed from the client; no calendar or staffing commitments invented.

## Responsibility and open dependencies

Codex prepares sources, drafts structured content, builds the editable board and records QA. Christina owns product interpretation and release decisions. Xiaoming/Coco roles above are the supplied collaboration plan; no messages, assignments or meetings have been sent on their behalf.

Current external dependencies: OAuth renewal before writing; missing parent Miro production specification for exact layout alignment; process-author input on institutional examples and authority; confirmed client meeting/workshop dates. These do not prevent local evidence and pilot-content preparation.

## Self-review

Scope covers evidence → backbone → role-based current/target S2 → pilot → designer calibration → Alpha → staged pre-client/workshop pack. It explicitly retains native editability, readback, synthetic data, M0–M8 traceability and the pilot stop point. No full-board completion, client validation or restored OAuth is claimed.
