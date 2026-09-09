# Process templates — what they are and how to fill them

Generated 2026-09-08 by `scripts/extract_process_map.py` from `Sanitised Process Map.pptx` (SRC-007), slides 1 and 2. Re-runnable; **re-running overwrites these three files**, so fill them in a copy or fill them and stop running the script.

| File | Input ID | Rows | What is pre-filled | What you fill |
|---|---|---|---|---|
| `01_process/node_dictionary.csv` | INP-B1 | 76 | Process_ID, Node_Title, Stage, Current_Lane, Target_Lane | Purpose, Accountable_Role, Inputs, Outputs, Decision rule, Blocked_By, Blocks, Parallel_Allowed, Rework_Trigger, Elapsed range, 2 failure modes, System_Of_Record |
| `01_process/before_after_delta.csv` | INP-B2 | 84 | Both titles, both lanes, a delta **hypothesis**, and what changed | `Confirmed_Delta_Type`, `Why`, `Confirmed_By` |
| `04_operating_model/execution_mode_matrix.csv` | INP-C1 | 76 | Process_ID, Node_Title, Target_Lane, what the map implies | Execution_Mode_MVP / _Target, agent inputs & outputs, Cannot_Check, escalation, accountable human, four-eyes, override effect, audit fields |

Everything pre-filled is **extracted fact** from the PPT — titles, stages and lane membership are read from shape text and shape geometry, not typed by hand. Everything blank is a decision only a human can make. `Delta_Type_Hypothesis` is exactly that: a hypothesis derived from geometry, which is why there is a separate `Confirmed_Delta_Type` column.

---

## How to fill efficiently

**You do not have to fill all 76 rows.** In priority order:

1. **`before_after_delta.csv` first.** Mostly confirm-or-correct — a `Confirmed_Delta_Type` per row and a `Why` on anything that isn't `Retained`. This is the fastest path to the highest value, and it is what the Before/After view in the prototype renders from.
2. **`execution_mode_matrix.csv` next.** Two dropdown-style columns per row (`Rule | Workflow | Deterministic Skill | Semantic Skill | Bounded Agent candidate | Human`). 48 nodes currently sit in an undifferentiated "Agentic execution" band; tagging them is what lets the product say honestly *how* each result was produced.
3. **`node_dictionary.csv` last, and depth-first not breadth-first.** Fully specify **M0–M4, M8, and the C1/C2 gates**; leave M5–M7 at stage level and say so. A deep partial is far more useful than a shallow complete.

Valid values for `Confirmed_Delta_Type`: `Retained` · `Removed` · `Enhanced` · `Added` · `Unconfirmed`.
`Relationship_Tag` (optional, describes the mechanism): `Reassigned` · `Split` · `Merged` · `Resequenced` · `Retitled` · `Replaced` · `Reduced`.

Leaving a cell blank is fine. Writing `UNKNOWN` is better — it tells me the gap is real rather than unreached, and it gets designed as an explicit unknown state instead of being invented.

---

## What the geometry extraction already told us

These are readings of the drawing, not confirmed process decisions. They are the highest-value things to confirm or correct, because several of them change what the prototype should emphasise.

**1. The target state is far more agentic than the node titles suggest.** 49 of the 56 M-nodes sit inside the `Agentic execution` band. Only seven M-nodes remain in a human lane: M0.1 (initiation), M1.1 (submit request), M8.5 (communicate outcome), M5.9, M5.10, and M7.5–M7.7. Plus five named human exception activities with no IDs on the map, which the extractor has labelled `HITL-01`–`HITL-05` so they can be specified.

**2. Legal and Credit are untouched.** All 15 C1/C2 nodes stay in their human lanes, and only C1.3 changes at all (`Draft required agreements` → `Review drafted agreements`). Either the target deliberately scopes Legal and Credit out of the agentic model, or they were simply not worked yet. **This needs a ruling** — it is a large, visible gap in an otherwise end-to-end target state, and someone in the workshop will ask.

**3. Whole lanes disappear.** The `QA Team` lane is gone; M6.1–M6.8 move into the agentic band. The `Client Fulfilment / KYC Ops` lane goes from ~30 nodes to 4 exception activities. Confirm these are intended reassignments and not just unfinished drawing.

**4. Three of four decision gates and both annotations vanish.** `Downstream action?`, `Info required`, `Trigger conflict check (from M1 information)` and `Risk input; identify EDD indicators` are all absent in the target; only `Credit required?` survives. Absent from the drawing ≠ absent from the process — most likely they are now implicit inside agentic execution, but that needs stating, because the prototype has to render those decisions somewhere.

**5. M7 moves to the front.** The `M7 Conflicts Check` stage header relocates from x=10.37 (after M6) to x=2.68 (beside M1) — the map expressing "non-dependent fulfilment starts early". Note the inconsistency: M7.1–M7.4 still render in the original column position while M7.5–M7.7 render early. Confirm the intended sequencing.

**6. One client touchpoint is removed, six are unchanged.** The second `Respond to QA gap requests` is gone; the other six client interactions are identical between current and target. See §Appendix A of the input request — this is the open question about whether client-side burden reduction is in scope.

**7. Two IDs are drawn twice, with different meanings.**
- `M0.1` appears in the target twice: `Initiation relationship/ product request` (Sales/RM) **and** `Determine sales location & reporting / booking entity` (agentic band). These are different activities sharing one ID.
- `M3.3` appears twice on the *current* map: once in Client Fulfilment / KYC Ops and once in Sales / RM.

Both need a ruling on which is authoritative, or a new ID. Flagged in the `Notes` column of `node_dictionary.csv`.

**8. The system landscape collapses from nine groups to three.** Retained: World-Check, RDC. Added: NICE Actimize, DocuSign, iManage. Absent: Salesforce (both entries), Fenergo (all four entries), SharePoint (all three), ActOne / Case Management, ESR tools, Conflicts system (TCC), FROST, downstream trading / risk systems. The Fenergo removal matches the 4 Sep decision; the rest need INP-D1.

---

## Re-running the extractor

```bash
cd clear-to-trade-product && python3 scripts/extract_process_map.py
```

No dependencies beyond the Python standard library. If the PPT is updated, re-run to regenerate — but **copy your filled-in files first**, because the script overwrites all three.
