# Confidential Australian Banking Client
# CLEAR_TO_TRADE_PRODUCT_EXPERIENCE_QUALITY_GATE.md
## Codex Runbook for UX + UI Audit, Automated Experience Red Team, Accessibility and Visual Regression

**Version:** v1.0  
**Basis:** D5 Product Experience v0.2 + D5 Bindings v0.2  
**Primary product slice:** `SCN-MATCH / Person T / PX-09 Screening Review`  
**Secondary coverage:** D5 scenarios `SCN-SCOPE` through `SCN-PUBLISH`, mapped to `PX-01` through `PX-12`  
**Environment:** Local HTML / prototype repository. No Figma dependency.  
**Purpose:** Perform a first-round product experience audit with Codex before client workshop review.

---

# 0. Why this runbook exists

This is not a generic “does the UI look good?” review.

D5 defines the product experience around:

- Case / Task / Object rather than an Agent catalogue;
- role-aware views;
- explicit task ownership and next actor;
- transparent local and case progress;
- evidence and decision traceability;
- bounded human judgement;
- role history / archived cases;
- fixed core modules plus optional personal modules;
- strong separation of task completion, condition state, decision, publication and overall Clear-to-Trade readiness.

The audit must therefore verify both:

1. **Product intent** — does the interface implement the D5 proposition?
2. **Experience quality** — can the intended persona understand and safely complete the task?

The audit is a **first quality gate**, not user research and not bank sign-off.

---

# 1. Sources of truth and precedence

Before running any audit, Codex must read:

1. `Clear_to_Trade_D5_Product_Experience_Review_v0.2.md`
2. `Clear_to_Trade_D5_Product_Experience_Bindings_v0.2.json`
3. Current repository source and current visual tokens/components
4. Current D4 Agentic Operating Model / Human Control artifacts available in the repo
5. Current D3 / D3A scenario and journey materials available in the repo

## Precedence

When conflicts exist:

1. **Current repository behaviour and latest Christina-approved visual tokens** are the UI implementation baseline.
2. **D5 v0.2** is the product-experience intent baseline.
3. **D5 Bindings JSON** is the scenario / action / surface mapping baseline.
4. D4 informs execution and human boundaries.
5. D3/D3A informs underlying scenario logic.
6. No audit tool may invent bank policy, authority or SLA.

Do not restore old colours or old layout values merely because an earlier document contains them.

---

# 2. D5 product-contract baseline

The audit must preserve the following D5 principles.

## 2.1 Product unit

> **Minimum actionable unit = who must do what, on which object, based on what evidence, and what changes after save / decision.**

Do not audit the product as an “Agent interface”.

Users normally see:
- tasks;
- objects;
- evidence;
- requests;
- conditions;
- decisions;
- progress;
- readiness.

---

## 2.2 Product environments are different

### Studio / Operating Model
- explanatory;
- read-only design / methodology;
- navigation and author views do not create business events.

### Product Prototype
- bounded local simulation;
- allowed commands can change the synthetic session.

### Living Case Lab
- shadow state / controlled delta;
- must not overwrite mainline case truth.

UX audit must fail if these environments silently write into each other.

---

## 2.3 D5 primary product patterns

| Ref | Surface / Pattern |
|---|---|
| PX-01 | Case Overview / Tasks |
| PX-02 | Scope / Parties / Authority |
| PX-03 | Requirements / Evidence linkage |
| PX-04 | Requests |
| PX-05 | RM client requests / communications |
| PX-06 | Client Your Tasks / Submission |
| PX-07 | Evidence Review |
| PX-08 | Screening Population / Coverage |
| PX-09 | Screening Review |
| PX-10 | Condition Detail |
| PX-11 | QA Remediation Detail |
| PX-12 | Clearance |

The first deep audit is `PX-09`.

---

# 3. D5 scenario-to-product mapping used by the audit

The audit should load the exact mapping from the Bindings JSON. At minimum, verify these known mappings:

| Scenario | Primary Product Surface | Key UX intent |
|---|---|---|
| SCN-SCOPE | PX-02 | Scope / product / booking context remain distinct and unknowns stay visible |
| SCN-ENTITY | PX-02 | Entity, relationship, authority and access stay evidence-based |
| SCN-REQUIREMENTS | PX-03 | Requirement-first view: who, why applicable, what is missing |
| SCN-SOURCE | PX-03 → PX-07 | Source, purpose, provenance and unassessed status remain distinct |
| SCN-GAP | PX-04 → PX-05 / PX-06 | Targeted request, limited client response, receipt |
| SCN-VALIDATE | PX-07 | Assess use for purpose; do not rewrite evidence “truth” |
| SCN-POPULATION | PX-08 | Known population vs complete applicable coverage |
| SCN-MATCH | PX-09 | Evidence, clarification, escalation / authorised disposition, local result |
| SCN-EDD | PX-10 | Applicability and specialist judgement remain independent |
| SCN-CONFLICTS | PX-10 | Search, judgement, clearance and hold remain distinct |
| SCN-CREDIT | PX-10 | Approved condition ≠ fulfilled condition |
| SCN-LEGAL | PX-10 | Agreement, credit input, approval and signed version remain distinct |
| SCN-QA | PX-11 | Gap, remediation, re-review and sign-off remain independent |
| SCN-READINESS | PX-12 | Condition manifest, blockers, owner and next action |
| SCN-PUBLISH | PX-12 | Decision, record, publication, communication and trade remain distinct |

---

# 4. Primary audit journey: SCN-MATCH / Person T

This is the first required executable UX contract.

## Persona set

### KYC Operations
Primary operational persona.

### Screening Reviewer / Financial Crime Specialist
Human judgement persona.

### Relationship Manager
Client communication / coordination persona.

### Client Contributor
Limited contribution persona.

### Case Manager
Overall case / dependency / readiness persona.

---

# 5. SCN-MATCH executable experience contract

Codex must implement / derive automated checks from the D5 sequence below.

## P1 — Open Finding

User sees:
- Person T;
- Entity A;
- current Scope;
- originating Screening Run / Finding;
- current task status;
- current owner;
- current next actor;
- current blocker;
- input revision / freshness.

Must not:
- silently load another case;
- infer subject only from display name;
- create an approval event merely by opening the page.

---

## P2 — Inspect Relevant Evidence

User can:
- compare relevant attributes;
- see source / evidence locator;
- see unknown / inconclusive / not comparable;
- understand why review is needed.

Must not:
- convert “viewed” to “reviewed”;
- convert “source exists” to “evidence sufficient”;
- invent missing evidence.

---

## P3 — Request Information Where a Real Gap Exists

User can:
- create a targeted request draft from the specific gap;
- identify recipient;
- review permitted disclosure;
- preserve existing requests.

Must not:
- overwrite earlier authority / ownership requests;
- expose restricted screening / conflicts narrative;
- treat request draft as sent.

---

## P4 — Client Responds Through a Limited Contribution Path

A valid synthetic contributor can:
- submit only permitted requested information;
- receive a submission receipt.

Must not:
- see internal case state;
- access other contributors' information;
- mark evidence sufficient.

---

## P5 — Operations Assesses New Evidence for the Intended Purpose

User can:
- record a new EvidenceUseAssessment for the defined purpose;
- retain prior evidence / versions.

Must not:
- grant signing authority;
- rewrite source evidence as universally valid;
- mark all related requirements satisfied automatically.

---

## P6 — Reviewer Reassesses Finding

Human reviewer receives a **Decision Pack** containing:
- exact decision question;
- why human judgement is needed;
- relevant evidence;
- facts vs unknowns;
- agent / prepared analysis if present;
- available authorised actions;
- consequence of each action.

Must support outcomes such as:
- false positive where authorised;
- request more information;
- escalate / transfer;
- remain unresolved;
- authorised material outcome where configured.

Must not:
- permanently whitelist Person T;
- give every role the same decision buttons;
- make a formal disposition without required authority.

---

## P7 — Return to Case

The product should:
- show the local screening result;
- update affected condition state only;
- preserve unrelated conditions;
- show overall readiness honestly.

Critical:
> Screening resolved + Legal open = **Not yet Clear-to-Trade**.

---

## P8 — Return to Studio

Must return to the exact:
- Case;
- Scenario;
- Journey position;
- view / mode;
- language;
- ReturnAnchor.

Navigation must not:
- create approval;
- reset case;
- reverse saved product state.

---

# 6. D5 checkpoint states used in testing

Use / map existing fixtures to these author-checkpoint aliases:

### CHK-01 — Evidence insufficient
- formal disposition unavailable without basis;
- request / transfer is available.

### CHK-02 — New evidence received, not assessed
- artifact exists;
- formal conclusion remains unavailable;
- link to intended-purpose assessment.

### CHK-03 — Evidence reviewed for current purpose
- authorised reviewer can make a bounded decision;
- decision may still remain unresolved / escalated.

### CHK-04 — Local decision recorded
- decision, timestamp and reviewed revision visible;
- unrelated case conditions remain unchanged.

Do not create new business IDs if fixtures already exist.

---

# 7. Product Experience Quality Gates

Run all gates separately. Do not collapse them into one AI-generated “UX score”.

Use:
- `PASS`
- `REVIEW`
- `FAIL`
- `NOT_RUN`

Each finding must have:
- stable ID;
- severity;
- persona;
- scenario;
- surface;
- observed evidence;
- expected contract;
- recommendation;
- source of oracle;
- retest status.

---

# G0 — Product Intent & Traceability

## Objective

Verify that D5 scenario intent is actually represented in the product.

For every priority scenario, confirm:

```text
Scenario
→ Persona
→ Journey moment / workflow
→ Product surface
→ Work object
→ Required information
→ Allowed action
→ Consequence
→ Forbidden effect
→ Test
```

## Minimum first-round scope

Must fully map:
- SCN-MATCH
- SCN-READINESS
- SCN-PUBLISH
- SCN-GAP
- SCN-QA

Then create thin mappings for the other D5 scenarios.

## Fail conditions

- scenario has no surface;
- surface has no intended persona;
- critical action has no expected consequence;
- requirement / decision state is merged into a generic “complete”;
- missing authority is silently resolved by UI.

---

# G1 — Comprehension

## Objective

Can the persona understand the current work before acting?

For each key task, test whether the screen answers:

1. Which case am I in?
2. Which entity / subject / scope is affected?
3. What is the current task?
4. Why am I involved?
5. What is blocked / unknown?
6. Who owns the task?
7. Who acts next?
8. What can I do now?
9. What happens if I do it?
10. Does this local result change overall readiness?

## Automated / agent-assisted method

Codex / UX audit skill reviews screenshots for:
- hierarchy;
- system status visibility;
- CTA clarity;
- information grouping;
- cognitive load;
- consistency.

## Domain-specific fail examples

- `Clear-to-Trade` status is visually louder than the current unresolved blocker;
- user cannot distinguish case progress from local workflow progress;
- owner and next actor are merged;
- “Pending” is used without explaining what is pending;
- human reviewer cannot see why the system stopped.

---

# G2 — Task Completion

## Objective

Can the persona complete the intended D5 task safely?

Use Playwright to run:
- P1–P8 SCN-MATCH journey;
- SCN-GAP request creation / response path where implemented;
- QA remediation sample;
- Clearance read / limited confirm path where implemented.

Test:
- CTA reachable;
- no dead end;
- back / cancel works;
- unsaved work warning is correct;
- save creates only permitted local effect;
- no duplicate submissions;
- no fake success.

---

# G3 — Context Preservation & State Integrity

## Objective

Preserve context across navigation and product surfaces.

Persist / verify:
- Case;
- Scope;
- Entity / Subject;
- Task / Finding;
- Stage;
- Scenario;
- Role projection;
- language;
- Current / Target;
- input revision;
- ReturnAnchor;
- saved local product state.

## Critical tests

### CTX-01
Studio → Product → Studio returns to exact origin.

### CTX-02
Role switch changes projection but not case truth.

### CTX-03
Language switch changes language only.

### CTX-04
Viewing a future step does not change actual work state.

### CTX-05
History / Archived case view does not overwrite active case session.

### CTX-06
Living Case Lab shadow state does not write to mainline.

---

# G4 — Decision Safety

## Objective

Prevent harmful UX / product-state ambiguity.

### DS-01 False Ready
Screening resolved while Legal remains open:
- overall remains Not yet Clear-to-Trade.

### DS-02 Premature Approval
Agent / system prepares a recommendation:
- no approved / cleared state until authorised human decision where required.

### DS-03 Authority Leakage
RM / Client / unauthorised role:
- cannot see or execute restricted specialist actions.

### DS-04 Completed ≠ Cleared
Completed work item:
- does not auto-complete condition / case.

### DS-05 Received ≠ Sufficient
New evidence:
- received state does not become sufficient without assessment.

### DS-06 Approved Condition ≠ Fulfilled Condition
Credit approval:
- separate from evidence that condition is fulfilled / incorporated.

### DS-07 Decision ≠ Publication ≠ Trade
Clearance decision, record, publication and trading execution remain separate.

### DS-08 Missing dependency
Unknown applicability / missing manifest:
- cannot produce empty-set Ready.

### DS-09 Estimated time
Estimate end:
- cannot trigger approval, hold release or case completion.

### DS-10 Navigation writes
View, replay, filter, layout change:
- no business event.

All DS-01 through DS-10 are release blockers if reproducible.

---

# G5 — Progress & Time Transparency

D5 makes progress / time a core product requirement.

Audit three levels:

## Case Progress
- applicable work;
- parallel tracks;
- completed / active / waiting / unknown;
- no fake strict sequence.

## Workflow Progress
- 4–8 readable display steps where applicable;
- viewing step ≠ actual work state.

## Step Detail
Must show:
- owner;
- next actor;
- entered / started / waiting timestamps when real synthetic events exist;
- time-so-far;
- expected window or explicit reason it cannot be estimated;
- next action;
- overall implication.

## Time safety

Verify:
- page open does not create `entered_at`;
- state residence ≠ human effort;
- estimate ≠ target ≠ SLA;
- unknown estimate is not shown as `0`;
- business-day date is not invented when calendar unknown;
- parallel durations are not simply added;
- re-review creates new episode without deleting history;
- archived relative time freezes.

---

# G6 — UI Visual Hierarchy & Design-System Consistency

No Figma is available.

The **current repo itself** is the design baseline.

## Build a UI inventory before critique

Extract:
- typography tokens;
- spacing tokens;
- radii;
- border / surface tokens;
- icon library;
- button variants;
- input variants;
- card / panel variants;
- status label mapping;
- modal / drawer patterns;
- table / list patterns;
- breakpoints.

Save as:

`audit/ui-baseline/UI_TOKEN_INVENTORY.md`

Do not change tokens during inventory.

## UI checks

### Hierarchy
- one clear task focus;
- one primary action;
- blocker / critical notice visible;
- supporting evidence visually subordinate until needed.

### Consistency
Flag:
- duplicate semantic components with different styling;
- inconsistent button height / radius / padding;
- inconsistent heading hierarchy;
- same status using different colour / icon / label;
- same pattern using different container / spacing for no reason.

### Density
Flag:
- card walls;
- too many always-visible metadata fields;
- evidence and history competing with current task;
- optional modules visually overpowering fixed core modules.

### D5 fixed-core contract

Core modules cannot be hidden:
1. Case & task context
2. Progress & timing
3. Current work & required evidence
4. Next action & critical notices

Optional modules must never hide required evidence / alerts.

---

# G7 — Responsive / Overflow / Localization

Run at minimum:

- 1920 × 1080
- 1440 × 900
- 1366 × 768
- 1280 × 800
- tablet landscape equivalent

If mobile is not in product scope, do not redesign for mobile; still verify the product does not catastrophically break.

Test:
- no clipped critical text;
- no overlapping sticky header;
- modal / task panel remains usable;
- table / comparison layout degrades safely;
- long English labels wrap;
- Chinese / English switch does not change business context;
- no key warning communicated only by colour.

---

# G8 — Accessibility

Use automated and manual-first-round checks.

## Automated
Run axe on key pages and key states.

Minimum:
- serious / critical axe violations = FAIL;
- moderate / minor = REVIEW, unless they block task completion.

## Manual first-round
Test:
- keyboard-only;
- focus order;
- visible focus;
- accessible names;
- labels / instructions;
- modal focus trap / return;
- icon + text status;
- reduced motion;
- zoom / text scaling where practical;
- drag alternatives if any.

Important:
Automated axe success is not equivalent to WCAG conformance.

---

# G9 — Visual Regression

Use Playwright screenshot baselines.

## Required baseline states

At minimum:

1. Studio Current Journey
2. Studio Target Journey
3. Scenario modal
4. PX-09 / CHK-01
5. PX-09 / CHK-02
6. PX-09 / CHK-03
7. PX-09 / CHK-04
8. Human Decision Pack
9. Case return after local decision
10. PX-12 Not yet Clear-to-Trade
11. Active Cases list
12. My completed work
13. Archived read-only case
14. One configurable workspace default
15. Same workspace with allowed optional module change

Generate baseline only after Christina / current repo is accepted as the visual source for the audit branch.

Do not automatically approve changed screenshots.

Classify each diff:
- intended;
- regression;
- content-only;
- environment rendering noise;
- needs human review.

---

# G10 — Heuristic UX Audit

Use the installed `ux-audit` skill on screenshots.

Audit by **journey**, not random single screens.

Primary screenshot bundle:

```text
01_case_or_task_entry
02_screening_review_chk01
03_request_information
04_client_submission
05_evidence_review
06_screening_review_chk03
07_human_decision
08_recorded_local_result
09_case_overview_not_ready
10_return_to_studio
```

Prompt / user goal:

> Persona: KYC Operations / Screening Reviewer.  
> Goal: Resolve a possible screening match safely, understand why human judgement is required, use only relevant evidence, record the bounded result, and return to the overall case without losing context or implying the entire case is Clear-to-Trade.

Run a second smaller audit for:
- Case Manager;
- RM;
- Client Contributor.

Treat screenshot-only limitations as `NOT ASSESSABLE`, not FAIL.

---

# 8. Tooling and installation

Codex must first inspect the current repo.

Do not blindly create a new package manager or overwrite package files.

---

# 8.1 Environment discovery

Run and record:

```bash
pwd
git status --short
git rev-parse --show-toplevel
node --version || true
npm --version || true
pnpm --version || true
yarn --version || true
bun --version || true
python3 --version || true
npx playwright --version || true
```

Inspect:
- `package.json`
- lock files;
- existing Playwright config;
- existing test framework;
- existing screenshot / e2e tests;
- current UI framework.

Save:

`audit/environment/ENVIRONMENT_DISCOVERY.md`

Do not reset working tree.

---

# 8.2 Install the Codex UX Audit skill

Check first:

```bash
test -f "$HOME/.codex/skills/ux-audit/SKILL.md" && echo "ux-audit already installed"
```

If missing:

```bash
mkdir -p /tmp/ctt-ux-audit-install
cd /tmp/ctt-ux-audit-install
git clone https://github.com/EliaAlberti/ux-audit-skill.git
cd ux-audit-skill

python3 -m pip install --user pillow

mkdir -p "$HOME/.codex/skills/ux-audit"
cp -r SKILL.md scripts "$HOME/.codex/skills/ux-audit/"
```

Verify:

```bash
test -f "$HOME/.codex/skills/ux-audit/SKILL.md"
ls -la "$HOME/.codex/skills/ux-audit"
```

**Important:** Codex discovers skills at session startup.  
If this installation happens during the current Codex session, record:

> `UX audit skill installed; new Codex session required for auto-discovery.`

Do not pretend the skill has run before restarting / opening a new session.

If Python / Pillow installation is blocked, do not block the audit:
- the written heuristic audit can still proceed;
- record annotation output as degraded.

---

# 8.3 Install / verify Playwright

If the repo already has `@playwright/test`, reuse it.

Preferred package-manager logic:

### npm
```bash
npm install -D @playwright/test
```

### pnpm
```bash
pnpm add -D @playwright/test
```

### yarn
```bash
yarn add -D @playwright/test
```

### bun
```bash
bun add -d @playwright/test
```

Do not switch package manager.

Install Chromium first:

```bash
npx playwright install chromium
```

If CI / Linux system dependencies are required:

```bash
npx playwright install --with-deps chromium
```

For the first local audit, Chromium is sufficient.  
Firefox / WebKit may be added later if cross-browser testing becomes a requirement.

---

# 8.4 Install axe accessibility integration

Use the same package manager.

### npm
```bash
npm install -D @axe-core/playwright
```

### pnpm
```bash
pnpm add -D @axe-core/playwright
```

### yarn
```bash
yarn add -D @axe-core/playwright
```

### bun
```bash
bun add -d @axe-core/playwright
```

Verify it resolves from the project.

---

# 8.5 Optional: do NOT install paid visual-regression tooling in Round 1

Do not add:
- Chromatic
- Percy
- Applitools
- Figma integrations

unless Christina explicitly requests them later.

Round 1 visual regression uses native Playwright screenshots.

---

# 9. Audit test architecture

Create a dedicated structure without disturbing product code:

```text
audit/
  environment/
  contracts/
  screenshots/
    baselines/
    actual/
    diffs/
    annotated/
  reports/
  traces/
  accessibility/
  ux-audit-assets/

tests/
  experience/
    helpers/
    fixtures/
    contracts/
    ux/
    ui/
    accessibility/
    visual/
```

If the repo already has a testing structure, adapt to it rather than duplicate.

---

# 10. Scenario contracts

Generate:

`audit/contracts/D5_SCENARIO_PRODUCT_CONTRACTS.md`

and machine-readable:

`audit/contracts/d5-scenario-product-contracts.json`

Each contract:

```yaml
scenario_id:
persona:
journey_moment:
primary_surface:
work_object:
user_intent:
required_context:
required_evidence:
allowed_actions:
human_decision_boundary:
expected_consequence:
overall_case_implication:
forbidden_effects:
return_contract:
test_ids:
source_refs:
```

Use D5 / Bindings fields where available.

Do not invent action IDs.

---

# 11. Example contract — SCN-MATCH

```yaml
scenario_id: SCN-MATCH
primary_surface: PX-09
personas:
  - KYC Operations
  - Screening Reviewer
related_personas:
  - Relationship Manager
  - Client Contributor
  - Case Manager

user_intent:
  review a possible screening match using relevant case context,
  obtain missing information only when required,
  make or escalate an authorised bounded decision,
  and preserve overall case state.

required_context:
  - Case
  - Scope
  - Entity A
  - Person T
  - Finding
  - Screening Run
  - task state
  - owner
  - next actor
  - input revision

required_evidence:
  - attribute comparison
  - source locator
  - evidence-use status
  - unknown / inconclusive state

allowed_actions:
  - inspect
  - request targeted information
  - assess new evidence for intended purpose
  - record authorised disposition
  - escalate / transfer
  - leave unresolved

expected_consequence:
  local screening state may update
  affected dependency is reassessed
  unrelated conditions remain unchanged
  overall readiness is recalculated

forbidden_effects:
  - permanent whitelist
  - silent approval
  - mark received evidence sufficient without assessment
  - close Legal / Credit / QA automatically
  - mark full case Clear-to-Trade because Screening completed
```

---

# 12. UI baseline extraction

Before visual critique, create:

`audit/ui-baseline/UI_TOKEN_INVENTORY.md`

Document:

- fonts;
- heading sizes;
- body sizes;
- line heights;
- spacing scale;
- radii;
- borders;
- surfaces;
- semantic status styles;
- button sizes / variants;
- form controls;
- modals;
- tables / lists;
- page / task layout;
- breakpoints;
- icon source.

Then create:

`audit/ui-baseline/COMPONENT_USAGE_MATRIX.md`

Map components to:
- surfaces;
- variants;
- inconsistent instances;
- intentional exceptions.

The first audit may recommend consolidation, but must not refactor automatically.

---

# 13. D5-specific UI Quality Rules

Use these as domain rules in addition to generic heuristics.

## UI-CTT-01 — Case identity is persistent
Case / Scope / Task identity must remain available without turning the header into metadata overload.

## UI-CTT-02 — Local work is visually primary
Current task / decision question outranks history and optional information.

## UI-CTT-03 — Overall readiness is not a decorative green success state
Readiness must remain causally connected to condition status.

## UI-CTT-04 — Human decision is visually distinct
Prepared analysis cannot look identical to authorised decision.

## UI-CTT-05 — Unknown is a first-class state
Unknown cannot be blank, zero, green or silently hidden.

## UI-CTT-06 — Waiting is not Failure
Waiting, Blocked, At Risk, Overdue and Failed must not collapse to one red state.

## UI-CTT-07 — Owner ≠ Next Actor
Show both where they differ.

## UI-CTT-08 — Required evidence cannot be customised away
Optional workspace modules cannot hide decision-critical evidence.

## UI-CTT-09 — One primary action
Do not place multiple equally prominent actions around a material decision.

## UI-CTT-10 — Consequence is visible
Before or immediately after a decision, user can understand what changes and what remains open.

## UI-CTT-11 — Status is not only colour
Status includes text / icon semantics.

## UI-CTT-12 — Same semantic state uses one visual language
Do not use multiple labels / colours for the same state without reason.

---

# 14. D5 fixed and optional module audit

## Fixed core modules — must always remain

1. Case and task context
2. Progress and timing
3. Current work and required evidence
4. Next action and critical notices

Test:
- cannot remove;
- cannot reorder into invisibility;
- deep link restores them;
- no old preference hides them;
- critical notice appears even if optional warnings module is absent.

## Optional modules

Examples in D5:
- Activity timeline
- Related dependencies
- Related evidence overview
- Contacts and communications
- RM email reply draft
- Recent history
- Work notes

Test:
- personal layout change writes only preference;
- no Case / Grant / Decision / Requirement changes;
- no permission leakage;
- optional module removed does not remove core capability.

---

# 15. History / Archived UX audit

Audit:

- Active
- My completed work
- Archived

Critical distinction:

> **My work complete ≠ Case archived.**

Test:
- history is read-only;
- historical time freezes;
- current authorisation governs historical access;
- no “reopen / approve” action appears unless explicitly implemented;
- returning to active case restores current saved state;
- opening history does not overwrite active session.

---

# 16. RM communication / email draft audit

This is NICE TO HAVE and must not block the core quality gate.

If implemented:

Test:
- no real Gmail / SMTP / send;
- `Copy` ≠ `Sent`;
- `Save draft` ≠ `Delivered`;
- restricted Screening / Conflicts facts never appear in DOM / draft payload for RM;
- synthetic estimate is not presented as bank SLA;
- changed facts mark draft `Needs refresh / review`;
- manual edits are not silently overwritten;
- missing optional module does not block core task.

---

# 17. Accessibility test template

Create `tests/experience/accessibility/key-surfaces.spec.ts`.

Run axe on at least:
- PX-09 CHK-01
- PX-09 Human Decision Pack
- PX-09 CHK-04
- PX-12 Not yet Ready
- Case list / history
- configurable workspace

Record:
- URL / route;
- case fixture;
- persona;
- violation rule;
- impact;
- node / selector;
- screenshot;
- remediation.

Do not disable axe rules merely to get green.

---

# 18. Visual regression setup

Use Playwright `toHaveScreenshot()`.

## Rules

- generate baselines in one consistent environment;
- record OS + browser + Playwright version;
- disable / stabilise non-business animation for screenshots where practical;
- use fixed synthetic `as_of` for time examples;
- avoid random fixture IDs;
- do not use large pixel tolerances to hide instability.

## Screenshot naming

```text
<scenario>__<surface>__<persona>__<state>.png
```

Examples:

```text
scn-match__px09__kyc-ops__chk01.png
scn-match__px09__reviewer__decision-pack.png
scn-readiness__px12__case-manager__legal-open.png
```

---

# 19. Severity model

## S0 — Critical / Workshop Blocker

Examples:
- wrong case / role / restricted data;
- false Clear-to-Trade;
- unauthorised decision;
- navigation / layout change creates business write;
- history overwrites active session;
- synthetic / internal estimate appears as client commitment;
- critical alert can be hidden.

## S1 — Major

Examples:
- intended task cannot be completed;
- ambiguous primary action;
- wrong next actor;
- evidence / unknown state is misleading;
- role projection is materially confusing;
- major keyboard / accessibility blocker;
- broken responsive task view.

## S2 — Moderate

Examples:
- visual hierarchy issue;
- unnecessary cognitive load;
- inconsistent component / spacing;
- non-critical accessibility issue;
- status semantics need clarification.

## S3 — Minor

Examples:
- copy polish;
- minor alignment;
- minor spacing / icon inconsistency.

---

# 20. Product Quality Gate decision

Do not calculate a fake 0–100 score.

Use:

## WORKSHOP READY
- 0 S0 open;
- 0 S1 open on the main Hero Case;
- primary SCN-MATCH contract passes;
- False Ready / Authority / Context tests pass;
- serious / critical axe issues resolved on key surfaces;
- visual regression baseline reviewed.

## READY WITH KNOWN LIMITATIONS
- no S0;
- limited S1 outside primary flow;
- clearly documented limitations not required in Workshop main path.

## NOT READY
- any S0;
- primary task completion failure;
- false readiness;
- authority leakage;
- critical context loss;
- misleading state / timing.

---

# 21. Required automated test suites

Create / adapt:

```text
experience.smoke.spec
experience.scn-match.spec
experience.context.spec
experience.decision-safety.spec
experience.progress-time.spec
experience.modules.spec
experience.history.spec
experience.accessibility.spec
experience.visual.spec
```

Optional:
```text
experience.rm-email.spec
```

Do not generate one test per 229 D4 action.

---

# 22. Automated Experience Red Team

After deterministic tests pass, use Codex to actively challenge the experience.

## Red Team personas

### Case Manager
Challenge:
- Can I understand why the case is not ready?
- Can I see what can continue?
- Can I identify the right blocker and owner?

### KYC Operations
Challenge:
- Do I understand why I am involved?
- Is evidence relevant to my task?
- Can I request only the real gap?

### Screening Reviewer
Challenge:
- Is the exact decision question clear?
- Are facts / unknowns / analysis distinguishable?
- Do I know the consequence of my decision?

### RM
Challenge:
- Do I know what to tell / ask the client?
- Does the UI hide internal restricted context correctly?
- Is the timing language safe?

### Client Contributor
Challenge:
- Do I know why the bank needs this information?
- Can I complete only my permitted task?
- Is internal bank work hidden?

---

# 23. Red Team attacks

Run at least:

1. False Green / False Ready
2. Evidence withdrawn / stale
3. wrong role / authority leakage
4. missing owner
5. missing applicability
6. conflicting evidence
7. decision made on stale input
8. history / current session collision
9. language / view switch changes business state
10. optional module hides critical evidence
11. page open writes “started”
12. elapsed estimate reaches zero and triggers state
13. parallel branch incorrectly paused
14. local completed task closes overall case
15. client-safe projection leaks restricted narrative

Classify each as:
- UX defect;
- UI defect;
- business logic defect;
- permission / privacy risk;
- test-data issue;
- open business assumption.

---

# 24. Heuristic audit execution

After skill is installed and a new Codex session is opened:

Audit the primary screenshot journey.

Request:

> Use the ux-audit skill. Audit these screens as one journey, not individually.  
> Persona: KYC Operations / Screening Reviewer.  
> Goal: safely resolve a possible screening match, understand why human judgement is needed, use only relevant evidence, record a bounded outcome, and return to the overall Clear-to-Trade case without losing context or implying full readiness.  
> Treat behaviour not visible in screenshots as not assessable.  
> Preserve D5 domain rules and flag any conflict with the D5 Product Experience contract.

Save:
- heuristic report;
- annotated screenshots;
- positives;
- not-assessable list.

---

# 25. Reports Codex must produce

## A. `UX_EXECUTIVE_SUMMARY.md`

Maximum 2 pages.

Include:
- Gate result;
- top 5 risks;
- top 5 strengths;
- Workshop readiness;
- what remains for real user validation;
- recommended fix order.

---

## B. `UX_FINDINGS.md`

All UX / UI / accessibility / safety findings.

Fields:
- ID
- Severity
- Gate
- Persona
- Scenario
- Surface
- Finding
- Evidence
- Expected
- Why it matters
- Recommendation
- Effort S/M/L
- Status
- Retest

---

## C. `UX_TRACEABILITY_MATRIX.md`

For each priority scenario:

```text
Scenario
→ Surface
→ Persona
→ Product intent
→ Test
→ Result
→ Finding refs
```

---

## D. `UI_VISUAL_REGRESSION_REPORT.md`

Include:
- baselines;
- diffs;
- approved intentional changes;
- regressions;
- environment versions.

---

## E. `ACCESSIBILITY_REPORT.md`

Include:
- automated axe results;
- manual keyboard results;
- not-tested items.

---

## F. `EXPERIENCE_RED_TEAM_REPORT.md`

Include:
- attacks;
- expected oracle;
- actual result;
- classification;
- severity.

---

## G. assets

```text
audit/ux-audit-assets/
audit/screenshots/annotated/
audit/screenshots/diffs/
audit/traces/
audit/accessibility/
```

---

# 26. Recommended run order

Do not start with screenshots.

```text
T00 Read D5 + inspect repo
        ↓
T01 Install / verify tools
        ↓
T02 Create Scenario → Product contracts
        ↓
T03 Inventory current UI / components
        ↓
T04 Run deterministic smoke / context tests
        ↓
T05 Run SCN-MATCH executable journey
        ↓
T06 Run Decision Safety
        ↓
T07 Run Progress / Time tests
        ↓
T08 Run accessibility
        ↓
T09 Generate / review screenshot baselines
        ↓
T10 Run visual regression
        ↓
T11 Run ux-audit skill on screenshot journey
        ↓
T12 Run Automated Experience Red Team
        ↓
T13 Produce findings
        ↓
T14 Fix S0 / S1 only
        ↓
T15 Re-run all impacted gates
        ↓
T16 STOP for Christina review
```

Do not batch-fix S2 / S3 before S0 / S1 are reviewed.

---

# 27. Codex startup instruction

Copy this into the working Codex session:

> Read `Clear_to_Trade_D5_Product_Experience_Review_v0.2.md`, `Clear_to_Trade_D5_Product_Experience_Bindings_v0.2.json`, the current repo, and this `CLEAR_TO_TRADE_PRODUCT_EXPERIENCE_QUALITY_GATE.md`.
>
> This is an audit and controlled-fix task. Protect Christina's current visual tokens and uncommitted work. Do not revert visual design to an older D5 / D4 document.
>
> First perform environment discovery. Then install only missing audit dependencies: the Codex `ux-audit` skill, Playwright Test, Chromium, and `@axe-core/playwright`.
>
> Build the D5 Scenario → Persona → Product Surface → Action → Consequence → Forbidden Effect contract before writing product tests.
>
> Use `SCN-MATCH / Person T / PX-09` as the complete first audit slice. Test P1–P8, CHK-01–CHK-04, context preservation, Decision Safety, progress / time transparency, accessibility and visual regression.
>
> Do not treat screenshot heuristics as proof of interactive behaviour. Use Playwright for behaviour. Do not treat axe as proof of full WCAG compliance.
>
> Do not invent bank policy, authority, SLA, ETA or success metrics. Unknown stays unknown.
>
> Do not install Figma tooling. Do not install paid visual-regression services.
>
> After audit, produce the required reports. Fix only S0 and S1 issues first, re-run impacted tests, then STOP for Christina review before broadening changes across all 15 scenarios.

---

# 28. First-round acceptance checklist

The audit is complete only when:

- [ ] D5 v0.2 and Bindings have been read
- [ ] current repo visual baseline has been documented
- [ ] UX audit skill installed or installation limitation documented
- [ ] Playwright installed / reused
- [ ] Chromium available
- [ ] axe integration installed / reused
- [ ] D5 scenario / product contracts generated
- [ ] SCN-MATCH contract implemented as tests
- [ ] P1–P8 audited
- [ ] CHK-01–CHK-04 audited
- [ ] False Ready test passes
- [ ] role / authority leakage test passes
- [ ] Studio → Product → Studio return passes
- [ ] history does not overwrite active state
- [ ] progress / time semantics tested
- [ ] fixed core module contract tested
- [ ] key surfaces axe-tested
- [ ] keyboard first-round tested
- [ ] responsive viewports tested
- [ ] visual baseline reviewed
- [ ] heuristic screenshot audit completed
- [ ] Automated Experience Red Team completed
- [ ] S0 / S1 findings fixed or explicitly blocked
- [ ] impacted gates re-run
- [ ] executive summary created
- [ ] traceability matrix created
- [ ] STOP reached before broad uncontrolled redesign

---

# 29. Non-goals

This first audit does not prove:

- real bank users find the design usable;
- production RBAC is secure;
- actual banking policy is correctly encoded;
- actual screening / email / legal / credit integrations work;
- formal WCAG conformance;
- real cycle-time improvement;
- SLA achievement;
- regulatory approval.

Those require later validation.

---

# 30. Final quality principle

> **Do not audit the product only for polish. Audit whether it helps the right person make the right move, on the right case, with the right evidence, without implying a decision or readiness that has not actually been earned.**

And:

> **UX checks whether the work can be understood and completed.  
> UI checks whether the experience is clear, consistent and stable.  
> Decision Safety checks whether the product can be trusted.**
