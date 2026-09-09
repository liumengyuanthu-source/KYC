# Clear-to-Trade — Scenario Template ↔ Source Process Mapping

## Purpose

This document defines how the 15 workshop Scenarios should be populated from the source PPT actions.

**Core rule**

- **Scenario = workshop container**
- **Primary M/C actions = source-process backbone used to build the Scenario Before / To-be flow**
- **Related M/C actions = contextual inputs, branches, dependencies, reuse or downstream consumption**
- **Do not create separate M/C pages**
- **Do not automatically append Related actions as serial steps**
- **The Scenario Template remains unchanged:**
  Context → Before → Diagnose → Transform → To-be → Human Gate → Summary → Product Feature Bundle → Demo

The M/C actions are source anchors used to populate the template.

---

## Mapping Table

| Scenario | Primary source actions | Related actions | Why these actions belong together | Studio / Codex implementation note |
|---|---|---|---|---|
| **S1 Define onboarding scope** | M0.1, M0.2, M0.3, M0.4, M1.1, M1.2, M1.3 | M2.4 | Together they establish the initial case: request intake, case creation, sales/reporting/booking context, product scope, DD level and booking model. M2.4 feeds risk/requirement changes back into scope. | Build one S1 current-state flow. M0.1 can contain deeper branching (group relationship, cross-region visibility, booking choice), but remains inside S1. |
| **S2 Confirm entity & authority** | M1.4, M1.5 | M1.3, M2.1, M3.3, M3.4 | The source directly supports legal-name/location confirmation and entity classification/triage. Case creation, requirement applicability and clarification/evidence actions provide supporting context. | Do not rewrite M1.4/M1.5 as full authority verification. Authority detail is design elaboration and should be marked as such. |
| **S3 Determine applicable requirements** | M2.1, M2.2, M2.3, M2.4, M2.5 | M0.4, M3.3 | These actions determine AML/KYC and non-AML requirements, consolidate them, adjust them for risk/EDD and issue them to the client. Booking model is an input; clarification may reuse client-request activity. | Build one requirements flow: applicability → relief/exemption → consolidation → risk adjustment → issue requirements. |
| **S4 Reuse existing evidence** | M3.1, M3.5 | M3.2, M3.4 | The core is sourcing from public/commercial sources and maintaining sourcing/audit trail. Gap identification and evidence validation support the reuse decision. | Focus the Scenario on “what can be reused, for what purpose, with what provenance/currentness”. M3.5 also supports S5/S6, so do not make it exclusive to S4. |
| **S5 Request & submit missing information** | M3.2, M3.3, M3.5 | M2.5, M3.4 | The Scenario starts from residual gaps, creates client requests and manages outstanding items. Issued requirements feed the request; received evidence hands off into validation. | Current flow should show residual gap → request → response/clarification → outstanding status. M3.4 is mainly a handoff to S6. |
| **S6 Assess evidence for purpose** | M3.4, M3.5 | M3.3 | The source says capture & validate evidence and manage gaps/audit trail. “Purpose-specific sufficiency” is the design refinement layered on top. | Keep “received”, “valid source”, “usable for purpose”, and “sufficient” as distinct states. Mark purpose-specific assessment as design elaboration where not explicit in source wording. |
| **S7 Establish screening population** | M4.1, M4.2, M4.3, M4.4 | M4.7 | These actions cover risk pre-screening, early adverse-media screening, establishing the screening population and comprehensive screening. M4.7 is a downstream result dependency. | Do not reduce this Scenario to population setup only. The source scope includes early and comprehensive screening execution. |
| **S8 Review possible screening match** | M4.5, M4.6, M4.7 | M3.3, M3.4, M8.1 | The core flow is adjudicate hits → assess risk/materiality → determine screening outcome. Client clarification/evidence can be reused, and the outcome feeds overall readiness. | Build one hit-review flow with evidence/request branches and a clear human-judgement gate. M8.1 is downstream consumption, not another step inside the match review. |
| **S9 Conduct EDD** | M5.1–M5.10 | M2.4 | The source covers initiation, assignment, evidence pack, risk-factor assessment, gap closure, specialist consultation, outcome/conditions, approvals and handoff. Target also makes human judgement/approval explicit in M5.9/M5.10. | Build one EDD lifecycle. Do not interpret Target-only M5.9/M5.10 as proof that judgement did not exist in Current; treat them as explicit target decomposition until validated. |
| **S10 Conduct conflicts review** | M7.1–M7.7 | M1.1 | The core is initiating the check, performing searches, investigating potential conflicts, escalation, confirming and recording outcome. M1.1 can provide early information for starting the check. | Show the review as potentially early/parallel. Do not place it late just because M7 numbering is high. |
| **S11 Assess Credit & conditions** | C2.1–C2.7 | C1.4, C1.6 | These actions determine Credit applicability, gather exposure/financial data, assess risk, set limits/conditions, obtain approval and hand data/results to Legal. Legal consumes Credit inputs. | Keep Credit decision, conditions, fulfilment and final agreement check distinct. Target strike-through formatting does not by itself mean those activities are removed. |
| **S12 Manage Legal agreements & conditions** | C1.1–C1.8 | C2.6, C2.7 | The Legal flow covers request intake, agreement/form selection, draft/review, Credit input incorporation, negotiation, approvals, execution and storage of terms/documents. Credit provides named inputs and review points. | Do not force the whole Legal flow to wait serially for Credit. Model C2.6/C2.7 as dependencies/handoffs where applicable. |
| **S13 QA review** | M6.1–M6.8 | — | The source provides a complete QA lifecycle: applicable requirements, completeness, source validation, evidence sufficiency, screening/EDD cross-check, gap issue, remediation re-review and sign-off. | Preserve the full loop. The simplified Scenario name “QA review” must not remove remediation/re-review. |
| **S14 Aggregate readiness conditions** | M8.1 | M6.1, M8.3 | M8.1 is the main readiness aggregation action. QA applicability is an input and M8.3 is the authorised confirmation boundary that follows readiness. | Treat S14 as “are all prerequisites truly satisfied?” not “clear-to-trade already published”. Ready ≠ authorised confirmation. |
| **S15 Confirm & publish outcome** | M8.2, M8.3, M8.4, M8.5 | — | The source covers case finalisation, confirmation/recording of cleared-to-trade status, clearance timestamp and communication outcome. | Keep decision, recording, timestamp, downstream publication and communication as separate semantics. Do not trigger these from navigation or demo playback. |

---

## Important cross-scenario cautions

### M0.1
The source contains two Target occurrences with the same identifier but different text. Use occurrence / source identity, not the text label alone, when tracing M0.1.

### M3.3
Primarily belongs to **S5**, but is reused by **S2 / S3 / S6 / S8** for clarification or evidence requests. Do not duplicate it as a full standalone flow in every Scenario.

### M3.5
Supports **S4 / S5 / S6**. It is a cross-cutting outstanding-gap / sourcing-audit capability, not a uniquely owned serial step.

### C2.7
Primarily belongs to **S11**, while **S12** consumes it as a Credit-to-Legal dependency. Do not duplicate final approval in both Scenarios.

### M8.1 / M8.3
**S14** owns readiness aggregation (M8.1). **S15** owns final confirmation/publication (M8.2–M8.5). M8.3 is the boundary between readiness and authorised status.

---

## How Codex should populate each Scenario Template

For each Scenario:

1. **Context**
   - Use the Hero Case and the Scenario business goal.
   - Identify personas, trigger, required outcome and working hypotheses.

2. **Before**
   - Build an Archify-style process canvas from the **Primary source actions**.
   - Expand each source action only as deeply as needed to make the real business logic discussable.
   - Branches, decisions, waiting, handoffs and exceptions must be visible.
   - Show source M/C tags on nodes, but do not turn them into sub-pages.

3. **Diagnose**
   - Keep the same Before canvas.
   - Overlay Pain, Opportunity, Workshop Comments and validation state.
   - Related actions can appear as branches/dependencies/reuse links.

4. **Transform**
   - Map each confirmed current-state issue to **Retain / Remove / Optimize / Add**.
   - Preserve traceability back to the source node.

5. **To-be**
   - Rebuild the Scenario as one Agentic workflow.
   - Make Agent / Skill / Rule / Human interaction explicit.
   - Human Gates must appear on the workflow itself.

6. **Human Gate**
   - Generated from the To-be flow.
   - Each gate must state: why the Agent stopped, what it already completed, who decides, what they decide, and where the Agent resumes.

7. **Summary**
   - Must be generated from the discussion trace:
     Current node → Pain → Opportunity → Transformation → Target node → Human Gate → Product Capability.

8. **Product Feature Bundle**
   - Produce one coherent bundle at the Scenario level.
   - Every capability must trace back to one or more Scenario findings.

9. **Demo**
   - Reserve clickable prototype / video placement after the reasoning and decision summary.

---

## Non-negotiable design rule

**The 15 Scenario Templates are the user-facing workshop structure.  
The 71 M/C actions are the source-traceability layer used to populate those templates.  
Do not expose the 71 actions as 71 workshop pages.**
