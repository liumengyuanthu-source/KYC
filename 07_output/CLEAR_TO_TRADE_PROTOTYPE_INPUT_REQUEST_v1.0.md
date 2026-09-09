# Clear to Trade — Prototype Input Request

**Version:** v1.0 · 2026-09-08
**Purpose:** The exact material I need from the team in order to propose a *designed* prototype (not a slide redraw) for the Target Clear-to-Trade process in `Sanitised Process Map.pptx`.
**Design constraint already fixed:** `07_output/CLEAR_TO_TRADE_UXUI_DESIGN_SYSTEM_v1.0.md` (v1.0). Nothing in this request changes that system; it only feeds it.
**Written in English so it can be forwarded to Kobe / Ronak / Pratik unchanged.**

---

## 0. How to use this document

Every input has an ID (`INP-xx`), a priority, and a stated consequence if it does not arrive. Please answer inline in this file, or drop files into the paths suggested in §7.

| Priority | Meaning |
|---|---|
| **P0 — Blocking** | I cannot design a screen that is truthful without it. If it is missing I will design against a stated assumption and mark it `UNCONFIRMED` on the screen itself. |
| **P1 — Quality** | Prototype still works, but it will look generic / demo-ish instead of like the analyst's real day. |
| **P2 — Polish** | Affects taste and reference calibration, not correctness. |

Three answers are acceptable for every item: **(a) here is the material**, **(b) use this assumption**, **(c) leave it visibly unknown in the prototype**. Option (c) is legitimate — the design system already requires an honest `未知 / Unknown` state with a confirmation path. What is *not* acceptable is silence, because silence becomes an invented number on a client-facing screen.

**Timeline anchor (from slide 3):** Step 1 ends ~16 Sep, pre-client 17 Sep, workshop first week of Oct. To hold that, **P0 items are needed by end of 11 Sep**; P1 by 15 Sep.

---

## 1. What I already have — do not re-supply

| Have | Source | Status |
|---|---|---|
| Current-state process map, M0–M8 + C1 Legal + C2 Credit, 6 lanes, 9 system groups | PPT slide 1 | Titles only, no node semantics |
| Target-state process map, incl. `Agentic execution` and `HUMAN IN THE LOOP` lanes | PPT slide 2 | Titles only, delta not classified |
| Build logic: Process Map → Role-based Journey → Product Requirement; deliverable list; effort split | PPT slide 3 | Confirmed direction |
| Systemic pain thesis: "point solutions digitise steps, they do not simplify the system" — 9 capability columns | PPT slide 4 | Consultant hypothesis, no user evidence |
| Client Fulfilment Analyst fragmentation map: 6 stages, 5 counterparties, 7 tool clusters, 6 named pains | PPT slide 5 | Consultant hypothesis, no user evidence |
| Kickoff decisions: replace Fenergo (not overlay); interface to World-Check, RDC, NICE Actimize, DocuSign, iManage; Salesforce/regional platforms out of initial scope; English-only prototype; MVP has HITL, target is exception-only human review; KPI/SLA to be industry benchmarks until the workshop | 09-04 meeting summary + transcript | Confirmed |
| Working artefacts already in repo | `01_process/process_decomposition.csv`, `03_personas_journey/*`, `04_operating_model/*` (HITL matrix, state dictionary, state transitions), `05_product_requirements/*` (capability map, requirement backlog, scorecard), `00_governance/*` (assumptions, open questions, sources) | **All rows currently carry `DESIGN_HYPOTHESIS` / `CLIENT_VALIDATION_REQUIRED`, and coverage is thin — 5–11 rows each, mostly M2/M3.** They are a schema, not yet content. |
| Existing prototype codebase and glass design language | `prototype/` (engines for screening, clearance, collaboration, operating model, product experience) | Reusable shell; the product layer is being re-composed per `2026-09-08-product-prototype-detailed-design.md` |

**So the real gap is not structure. It is node-level truth, delta classification, and evidence content.** That is what §2 asks for.

---

## 2. P0 — Blocking inputs

### A. Scope and storyline lock

**INP-A1 · Hero case dossier — the single highest-value item.**
The kickoff assigned this to Kobe and Ronak ("share complex real-world institutional KYC cases"). Everything in the prototype — every field, every screening hit, every gap, every approval — renders from one case. Without it I fabricate a case, and a fabricated case makes every screen unarguable in the workshop.

Needed per case (sanitised, synthetic names fine, structure must be real):

- Requesting legal entity: type, domicile, regulated status, LEI presence.
- Ownership chain to UBO, including at least one genuinely awkward branch (nominee, trust, fund-of-funds, ≥3 layers, or an opaque jurisdiction).
- Products / services requested, and the booking entity and reporting jurisdiction they imply.
- Which authorised persons act, and where signing authority is ambiguous.
- What actually made this case hard: the specific moment it stalled, who was waiting on whom, how many days, how many re-requests to the client.
- The screening reality: roughly how many alerts, what proportion false positive, what the one genuinely material hit looked like.
- The EDD reality: which risk factors triggered it, what evidence was demanded, what the memo had to argue.
- Outcome, and the rework loop if there was one.

Two secondary cases would let the prototype demonstrate the dynamic-requirements claim (a product extension and a material-change refresh behaving differently from a new relationship). One is the minimum.

**INP-A2 · Trigger variants in demo scope.**
The map lists four triggers: new relationship · product/service extension · material client/ownership/risk change · refresh/reassessment. Confirm which are *shown working* in the prototype vs merely named. My default if unanswered: **new relationship fully built; product extension shown as a variant that re-uses prior evidence; the other two named only.**

**INP-A3 · Role scope for the prototype.**
Kickoff prioritised KYC Ops and Case Manager. Confirm the full set I build screens for, and which are represented only as counterparties. Candidates: Client, Sales/RM, Client Fulfilment (KYC Ops), Case Manager, Financial Crime Risk/Compliance, QA, RMG Control Room, CGM Legal, Credit. My default: **build KYC Ops analyst + Case Manager; represent Client, RM, Legal, Credit, QA, Control Room as real handoff surfaces without their own workspace.**

**INP-A4 · Room and narrative.**
Who is in the 17 Sep pre-client and the Oct workshop (roles, seniority, technical depth)? What are the three things they must remember afterwards? This determines whether the prototype opens on an analyst's task or on a control-tower view — a decision I would rather not guess.

---

### B. Process truth — the input that makes "transparent process" possible

The PPT gives node **titles**. A transparent process UI needs node **semantics**. This is the largest single ask, and it is what separates a real product from a diagram with hover states.

**INP-B1 · Node dictionary — 76 rows, already scaffolded.**
`01_process/node_dictionary.csv` is generated and pre-filled with every node ID, title, stage and lane (51 nodes on the current map, 71 on the target, 76 rows including the five unlabelled human exception activities). Per node still needed: purpose in one line · required inputs · outputs/artefacts · the decision rule or policy reference that governs it · accountable role · what blocks it from starting · what it blocks · whether it can run in parallel · rework/loop conditions · typical elapsed time range · the two most common failure modes.

Realistic fallback: **fully specify M0–M4 and M8 plus C1/C2 gates; treat M5–M7 at stage level.** Say so and I will design the rest as honestly coarse rather than fake-precise.

**INP-B2 · Before → After delta classification — 84 rows, already drafted.**
The design system mandates one legend: **Retained / Removed / Enhanced / Added / Unconfirmed**, each with evidence. I have machine-read both slides including **shape geometry**, so lane membership and every reassignment are extracted facts, not readings. `01_process/before_after_delta.csv` carries a delta hypothesis for all 71 nodes plus 13 structural deltas (lanes, gates, annotations, client touchpoints, systems). What I need from you is `Confirmed_Delta_Type` and `Why` — confirm-or-correct, not author-from-blank. The eight findings that need a decision are in Appendix A.

**INP-B3 · Dependency and readiness rules.**
The map's own thesis is *"dynamic requirements determine what runs; non-dependent fulfilment starts early; readiness is continuously reassessed and published as structured state."* To render that, I need:

- The M8.1 prerequisite list — exactly what must be true for cleared-to-trade, and the source of truth for each.
- Which activities are genuinely independent and may start at M1 (the map implies M7 conflicts can start early; confirm which others).
- What events force re-assessment of already-completed work (new ownership data, screening refresh, product scope change, policy version change, expiry?) — and what happens to work already signed off: does it go `过时 / Stale`, or reopen?
- What "published as structured state" means concretely: who consumes it downstream (FROST? trading systems?), and at what granularity.

**INP-B4 · Requirements determination logic (M2) — at least one worked decision table.**
Inputs appear to be: jurisdiction × entity type × product/service × DD level × applicable reliefs/exemptions × risk rating × EDD indicators. Give me one real, complete resolution — e.g. Cayman fund, FX forward, booked in Australia → this exact requirement set, these reliefs applied, these CIP items, this evidence list, with the policy citation for each line. One worked example makes the whole "why is this required?" explanation layer credible; zero examples makes it decorative.

**INP-B5 · Structured state model confirmation.**
Confirm or replace the state vocabulary in `04_operating_model/state_dictionary.csv`. The design system fixes the presentation states (需要处理 / 处理中 / 等待 / 受阻 / 未知 / 已完成 / 不适用 / 过时). I need the *business* states these map to, per domain (requirement, evidence item, screening alert, EDD case, agreement, credit limit, conflicts check, case), plus who owns each transition.

---

### C. Intelligence definition — what makes it "agentic", precisely

**INP-C1 · Execution mode per node.**
Using the six D4 labels already agreed — **Rule · Workflow · Deterministic Skill · Semantic Skill · Bounded Agent candidate · Human** — tag every node twice: MVP and Target. Slide 2 shows an `Agentic execution` band across M0–M6 without saying which flavour each node is, and the design system explicitly forbids calling all of it "Agentic". This tagging is what lets the UI say honestly *how* a result was produced.

**INP-C2 · Human-in-the-loop boundary and escalation ladder.**
Slide 2 names five HITL activities (resolve classification exceptions · resolve complex info gaps · review ambiguous screening hits · support evidence gaps · adjudicate material screening finding) plus M5.9/M5.10 and M7.5–M7.7. For each: what triggers escalation (threshold, ambiguity, materiality, policy?) · who is competent to decide · what they must see to decide · what they may *not* delegate · four-eyes requirements · what happens on override and whether an override reopens upstream work.

**INP-C3 · Agent output contract.**
For every agentic step, what does it hand a human? My proposed contract, to confirm or amend: *recommendation · the evidence it used, each item citable to source and timestamp · what it could not check and why · what it changed since last time · the specific action it wants approved.* Also: is there a numeric confidence score, or is uncertainty expressed only as named exceptions? **My strong recommendation is named exceptions, not percentages** — a 0.82 on a compliance screen invites false trust and is hard to defend to a regulator. Confirm.

**INP-C4 · Data and evidence source shapes.**
For World-Check, RDC, NICE Actimize, DocuSign, iManage, plus public/commercial registries: what fields actually come back, in what structure, with what identifiers and what latency. Sanitised sample payloads or redacted screenshots are ideal; field lists are workable. Without this, evidence panels are lorem ipsum, and the field-level Before/After comparison the design system requires cannot be built.

**INP-C5 · Automation red lines.**
What must never be automated or auto-approved, and what must never be shown to which role. This one is a hard constraint on the design, not a preference — I will treat any un-stated area as prohibited-by-default rather than assume permission.

---

### D. Systems, permissions and data handling

**INP-D1 · Keep / Upgrade / Remove per system** (slide 3 names this as a deliverable). Current-state systems: Salesforce/RM, email intake, Fenergo (policy/CIP library, case, risk rules), SharePoint, ActOne/Case Management, World-Check, RDC, ESR tools, conflicts system (TCC), FROST, downstream trading/risk systems, external registries and data providers. Kickoff says Fenergo is replaced and Salesforce is out of initial scope — I need the same verdict for the rest, because the prototype has to show *where a thing lives* every time it shows evidence.

**INP-D2 · System of record per data object.** For entity, ownership, requirements, evidence, screening result, EDD outcome, agreement, credit limit, clearance record: who owns it, does our product read or write, and what is the reconciliation story. This determines whether a screen can offer "edit" or only "request change".

**INP-D3 · Permission model.** Role × object × action, least privilege, segregation of duties, four-eyes rules, and one concrete example of something a Case Manager must *not* see or do. The existing prototype already has permission guards; they need real rules.

**INP-D4 · PII / cyber constraints for the demo itself.** What may appear on a screen shown in a client room, redaction rules, whether synthetic data must be visibly labelled (the design system already requires synthetic marking), and where the prototype may be hosted/shared.

---

### E. Measures

**INP-E1 · KPI / SLA benchmark set.** Kickoff accepted industry benchmarks as working assumptions. I need the actual numbers we will stand behind — per stage, and end-to-end — plus their source. The design system forbids showing SLA breach where no SLA exists, so with no numbers the prototype shows elapsed time and dependency health only, never a target or a countdown. That is a visible downgrade in how "in control" the product feels.

**INP-E2 · Volume and complexity profile.** Cases per month, mix by trigger, mix by client type, how many cases an analyst holds concurrently, typical elapsed days per stage, rework frequency. This decides whether the analyst's home is a queue, a workload board, or a single focused case — a structural decision I would rather make on data than on taste.

---

## 3. P1 — Inputs that decide whether it feels real

| ID | Input | Why it matters |
|---|---|---|
| INP-F1 | Sanitised real artefacts: client requirements letter, evidence checklist, an EDD memo, a QA gap list, a conflicts clearance record, credit agreement data set, a clearance record | Screens show real language instead of placeholder text. Highest-leverage P1 item. |
| INP-F2 | The client-side experience today: portal, email, PDF forms? What the client actually receives and how they respond | The client lane is identical in Before and After on the map (see Appendix A) — either that is an oversight or a deliberate scope boundary. Needs a decision. |
| INP-F3 | Terminology glossary + banned phrasing; applicable regulatory references (AML/CTF, CDD/ECDD, CIP, sanctions regimes, cross-border rules) | `00_governance/prohibited_terms.txt` is currently empty of approved terms. Wrong vocabulary is instantly disqualifying in this room. |
| INP-F4 | Any real pain evidence: interview notes, quotes, ticket/rework data, cycle-time samples | Slides 4–5 are our hypotheses. Anything real lets a pain point be stated as fact instead of assertion. |
| INP-F5 | Persona depth for the roles in INP-A3: seniority, experience, tools open on their desktop, how their performance is judged, and specifically what would make them distrust an automated recommendation | Drives the "prove it to me" affordances, which are the core of a compliance UI. |
| INP-F6 | Brand and sanitisation rules: NTT DATA styling, client anonymity level, logo usage in a client-facing prototype | The design system fixes the visual language but not the branding envelope. |
| INP-F7 | Accessibility target (WCAG 2.2 AA assumed) and any bank UI standards we should not contradict | Cheap to honour from the start, expensive to retrofit. |
| INP-F8 | Demo mechanics: driven live or recorded, screen resolution / projector aspect, desktop-only, browser | Affects layout density and whether I build for 1440 or 1920. Default assumption: **live, desktop Chrome, 1440×900 safe area, 16:9.** |

---

## 4. P2 — Reference calibration ("cutting edge", but on purpose)

**INP-G1 — from you:** 3–5 products you consider best-in-class and, for each, the one thing you want stolen. Also: anything you have seen in this space that you actively dislike, which is often more useful.

**INP-G2 — confirm the reference families below.** These are the patterns I would apply to hit "intelligent, technical-feeling but friendly, transparent". I want to know which are in taste before I build, because they are structural, not decorative. The design system's constraints (quiet, black/blue/white, warm grey, restrained glass, no neon, no violet/mint, motion only for height and selection) already rule out most of the flashier expressions of these — they are adopted as *behaviours*, not as visual style.

| # | Pattern | What it gives Clear to Trade | Adopt / Adapt / Avoid |
|---|---|---|---|
| 1 | **Agent work-in-progress made legible** — the plan, the steps taken, the sources touched, presented as a reviewable record rather than a spinner | The core "how did it reach this?" answer. Adapted, not copied: banking wants a finished, auditable package with an expandable trace, not a live chain-of-thought performance | |
| 2 | **Citation-anchored evidence** — every asserted fact clickable to its source document, page, field and retrieval timestamp | Makes agent output defensible in a QA and regulator conversation | |
| 3 | **Review-as-diff** — approvals framed as "here is what changed and what I want you to approve", not a blank form | Turns M6 QA and M5 EDD approval into a fast, confident action | |
| 4 | **Graph exploration for ownership and screening networks** — direct manipulation of the entity/UBO structure and alert relationships | The one place where the case's real complexity becomes visible in a single glance | |
| 5 | **Dependency/readiness timeline** — what is running in parallel, what is truly blocking clearance, what can start now | Directly renders the map's own thesis; the antidote to slide 5's "multiple handoffs" | |
| 6 | **Focused work surface over dashboard** — the home screen is the next decision, not a wall of metrics; queue and workload are one level away | Matches how an analyst actually spends a day, and matches the product detailed design already written | |
| 7 | **Keyboard-first with command palette** — fast operators stop touching the mouse | This is where "technical feeling" comes from, without a single dark-mode terminal cliché | |
| 8 | **Progressive disclosure with sticky context** — the case identity, scope version and blocking reason stay pinned; detail expands in place rather than in stacked modals | Prevents the "I opened six tabs and lost the case" failure the current state is defined by | |
| 9 | **"What changed since you last looked"** — a per-case change digest on return | The re-assessment loop is continuous; returning users must not have to re-read everything | |
| 10 | **Explicit unknown and blocked states with a resolution path** — never a blank, never a zero | Already mandated by the design system; listed here because it is also the modern-product move | |

**INP-G3:** Confirm we may study publicly available UI of comparable tools (Fenergo, Encompass, Quantexa, Napier, ComplyAdvantage, Hummingbird, Sardine, Alloy) for pattern reference only — no asset reuse, no claim of parity.

---

## 5. Design decisions I need from you (each has a default)

If you do not answer, I proceed with the default and mark it in the prototype's assumption register.

| ID | Decision | My recommendation (default if silent) |
|---|---|---|
| DEC-1 | Home surface: analyst task vs case control tower | **Analyst's next decision.** Case overview is one click away and exists to explain *why not cleared yet*. |
| DEC-2 | Agent visibility: live streaming trace vs finished package with expandable trace | **Finished package, trace on demand.** Live streaming reads as a tech demo and slows real work. |
| DEC-3 | Uncertainty expression: confidence percentage vs named exception | **Named exception + explicit "not checked" list.** No percentages on compliance screens. |
| DEC-4 | Approval granularity: per item vs batched review of a prepared pack | **Batched pack, per-item override.** Matches M6 QA and M5 EDD reality; avoids 40 clicks. |
| DEC-5 | Does the product write to source systems, or only prepare and request? | **MVP prepares and requests; target writes within approved authority.** Needs INP-D2 to be real. |
| DEC-6 | Client-facing surface in scope for the prototype? | **Show the client touchpoint as an artefact (the requirements request the client receives), not a second product.** Revisit if INP-F2 says otherwise. |
| DEC-7 | Time display without SLAs | **Elapsed time + dependency health, no targets, no countdowns** until INP-E1 lands. |
| DEC-8 | Language | **English only**, per kickoff. The design system's multi-language rules stay in the spec, unbuilt. |

---

## 6. What the "transparent process" layer needs, mapped to inputs

So you can see exactly why each ask exists:

| Prototype element | Depends on |
|---|---|
| Process ribbon M0→M8 with live state per stage | B1, B5 |
| Before/After overlay with the five-type legend | B2 (Appendix A confirmation) |
| Node inspector: purpose, inputs, rule, owner, execution mode, evidence | B1, C1, C4 |
| Dependency graph + "why is this blocked" + "what can start now" | B3 |
| Requirements explainer: this is required *because* policy X, relief Y applied | B4 |
| Agent result card with citations, gaps and requested action | C3, C4 |
| Escalation and override flow with audit trail | C2, D3 |
| Case change digest on return | B3, B5 |
| Clearance gate checklist at M8 | B3 |
| Evidence and artefact rendering that reads as real work | F1, C4 |

---

## 7. Suggested drop points and templates

Fill in place where the schema already exists; new material goes to `00_sources/raw/`.

```
clear-to-trade-product/
  00_sources/raw/hero_case/            # INP-A1 dossier + any sanitised artefacts (F1)
  00_sources/raw/system_landscape/     # INP-D1, D2
  00_sources/raw/vendor_payloads/      # INP-C4 samples
  01_process/node_dictionary.csv       # INP-B1  -- GENERATED, 76 rows pre-filled
  01_process/before_after_delta.csv    # INP-B2  -- GENERATED, 84 rows pre-filled
  01_process/requirements_rules.csv    # INP-B4  (new)
  04_operating_model/execution_mode_matrix.csv  # INP-C1 -- GENERATED, 76 rows pre-filled
  04_operating_model/state_dictionary.csv       # INP-B5 (confirm existing)
  05_product_requirements/kpi_sla_benchmarks.csv  # INP-E1 (new)
```

**Three of these are already built and pre-filled**, so B1, B2 and C1 are now confirm-and-complete rather than start-from-blank:

| File | Pre-filled from the PPT | Left for you |
|---|---|---|
| `01_process/node_dictionary.csv` | All 76 node IDs, titles, stages, current lane, target lane | Purpose, role, inputs/outputs, decision rule, dependencies, elapsed range, failure modes, system of record |
| `01_process/before_after_delta.csv` | Both titles, both lanes, a delta hypothesis and what changed, for 71 nodes + 13 structural deltas | `Confirmed_Delta_Type`, `Why`, `Confirmed_By` |
| `04_operating_model/execution_mode_matrix.csv` | Node, target lane, and what the map implies | Execution mode MVP/Target, agent contract, escalation, accountable human, override effect |

Lane membership is read from **shape geometry**, not guessed — see `01_process/README_PROCESS_TEMPLATES.md` for how to fill these efficiently and what the extraction already revealed. Regenerate any time with `python3 scripts/extract_process_map.py` (standard library only; it overwrites, so copy filled files first).

The hero case template is at `00_sources/raw/hero_case/HERO_CASE_DOSSIER_TEMPLATE.md`.

**INP-A1 — hero case dossier:** free-form document is fine; please cover the ten bullets in §2 A1.

---

## 8. If you can only do five things

1. **INP-A1** — the hero case dossier.
2. **INP-B1** — node dictionary; the 76-row scaffold exists, fill it even if only M0–M4 + M8 go deep.
3. **INP-B2** — confirm or correct the 84 pre-filled delta rows, starting with the eight findings in Appendix A.
4. **INP-C1 + C2** — execution mode per node and the HITL boundary.
5. **INP-F1** — three sanitised real artefacts.

With those five I can propose a prototype that is defensible on 17 Sep. Everything else improves fidelity; these five determine whether it is true.

---

## 9. Assumptions I will run on if unanswered

These will be visible in the prototype as assumptions, not as facts. Correct any that are wrong — that is faster than sourcing the underlying material.

| # | Assumption |
|---|---|
| 1 | Hero case = new institutional relationship, Cayman-domiciled fund structure, FX forward, booked in Australia, ownership opaque at layer 3. |
| 2 | Cleared-to-trade requires: requirements set complete · evidence sufficient and QA signed off · screening adjudicated · EDD outcome recorded where triggered · conflicts cleared · agreements executed · credit approved where required. |
| 3 | Conflicts (M7) and Credit (C2) start early from M1 information and run parallel to M2–M6. |
| 4 | Legal C1 depends on Credit C2 output only where credit is required (per the `Credit required?` gate on the map). |
| 5 | Screening adjudication (M4.5) and EDD outcome (M5.6/M5.9) always keep a named human decision-maker, at MVP and at target. |
| 6 | Requirements are versioned; a scope or ownership change invalidates dependent completed work and marks it stale rather than deleting it. |
| 7 | No numeric SLA is displayed anywhere until INP-E1 arrives. |
| 8 | All names, entities and documents in the prototype are synthetic and visibly marked as such. |

---

## 10. What you get back

On receipt of the P0 set (or explicit assumption approvals), I will deliver:

1. **Prototype proposal** — screen inventory, the flow through the hero case, and how each screen maps back to specific M/C nodes.
2. **Interaction spec** for the intelligence layer: agent result card, evidence citation, escalation, override, change digest.
3. **Transparent-process spec**: process ribbon, dependency graph, Before/After overlay, clearance gate.
4. **Clickable prototype** of the hero path, built on the existing `prototype/` shell within the v1.0 design system.
5. **Assumption register delta** — everything the prototype asserts that the bank has not yet confirmed, in one list, ready for the workshop.

---

## Appendix A — Before → After delta, extracted from the PPT

**Updated 2026-09-08 after machine-reading shape geometry.** Lane membership below is read from the position of each shape against the lane labels, so the reassignments are now extraction facts rather than the readings marked `Medium`/`Low` in the first draft. What remains open is *intent*: whether each observed change is deliberate, and why.

Full row-by-row detail is in `01_process/before_after_delta.csv` (84 rows). Summary:

| Delta type (hypothesis) | Count | Comment |
|---|---|---|
| Enhanced | 50 | Overwhelmingly `Reassigned` — the activity survives, the executor changes |
| Retained | 17 | Same title, same lane — 15 of these are Legal C1 and Credit C2 |
| Added | 8 | M5.9, M5.10, M7.5–M7.7, plus the HITL band, the agentic band and new systems |
| Removed | 7 | QA Team lane, three gates, two annotations, one client touchpoint, the legacy system stack |
| Unconfirmed | 2 | M0.1 and M3.3 — each drawn twice with different lanes or titles (finding A6) |

### The eight findings worth a decision

**A1 · The target is more agentic than the titles suggest.** 49 of 56 M-nodes sit inside the `Agentic execution` band. Only seven remain human: M0.1, M1.1, M8.5, M5.9, M5.10, M7.5–M7.7 — plus five named exception activities that carry no ID on the map (assigned `HITL-01`–`HITL-05` so they can be specified). **This is the single most important thing to confirm**, because it sets how much of the product is "agent prepares, human decides" versus "agent executes".

**A2 · Legal and Credit are untouched.** All 15 C1/C2 nodes stay in human lanes; only C1.3 changes (`Draft required agreements` → `Review drafted agreements`). Either that scoping is deliberate, or those lanes were not worked yet. Needs a ruling — it is a conspicuous gap in an end-to-end target state, and it will be asked about.

**A3 · Whole lanes disappear.** `QA Team` is gone (M6.1–M6.8 move into the agentic band). `Client Fulfilment / KYC Ops` goes from ~30 nodes to four exception activities. Intended, or unfinished drawing?

**A4 · Three of four gates and both annotations vanish.** `Downstream action?`, `Info required`, `Trigger conflict check (from M1 information)` and `Risk input; identify EDD indicators` are absent in the target; only `Credit required?` survives. Absent from the drawing is not absent from the process — most likely they are now implicit inside agentic execution, but the prototype still has to render those decisions somewhere, so I need to know where they live.

**A5 · M7 moves to the front.** The `M7 Conflicts Check` header relocates from x=10.37 (after M6) to x=2.68 (beside M1) — the drawing expressing "non-dependent fulfilment starts early". But M7.1–M7.4 still render in the original column while M7.5–M7.7 render early. Confirm the intended sequencing.

**A6 · Two IDs are drawn twice with different meanings.** In the target, `M0.1` is both `Initiation relationship/ product request` (Sales/RM) and `Determine sales location & reporting / booking entity` (agentic). On the current map, `M3.3` appears in both KYC Ops and Sales/RM. Each needs a ruling or a new ID.

**A7 · The system landscape collapses from nine groups to three.** Retained: World-Check, RDC. Added: NICE Actimize, DocuSign, iManage. Absent: Salesforce ×2, Fenergo ×4, SharePoint ×3, ActOne / Case Management, ESR tools, Conflicts system (TCC), FROST, downstream trading / risk systems. Fenergo's removal matches the 4 Sep decision; the rest is INP-D1.

**A8 · The client lane barely moves.** Seven client touchpoints in the current map, six in the target — the only removal is the duplicated `Respond to QA gap requests`. Provide initial information · respond to requirements · provide documents · respond to screening clarifications · provide EDD information · receive outcome are all unchanged.

**On A8 — this is the one I would most like ruled on.** The target removes a great deal of work from the bank but, as drawn, asks the client for effectively the same things. Slide 4's own thesis is that today's tools *"push complexity back onto the client and frontline teams"*. If holding the client boundary steady is deliberate, we should say so plainly and design to it. If it is an omission, then reducing client re-requests — one consolidated request instead of six sequential ones, prior evidence reused instead of re-collected — is the most demonstrable value story available to us, and I would want it at the centre of the prototype. It changes what the hero moment is.

---

*Prepared against `Sanitised Process Map.pptx` (SRC-007), the 4 September kickoff (SRC-005/006), and `CLEAR_TO_TRADE_UXUI_DESIGN_SYSTEM_v1.0.md`. This document requests inputs only; it changes no business rule, no PPT numbering and no existing deliverable.*
