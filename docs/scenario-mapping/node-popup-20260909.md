# Journey node scenario preview — 2026-09-09

The map's existing node inspector now presents the scenario-to-source relationship directly, before opening scenario detail. This applies to both Customer journey (31 nodes) and Hero case (19 nodes), with all 15 guideline scenarios reachable.

## Interaction

1. Select a journey node. Its popup identifies the node, scenario and journey stage.
2. Nodes with several scenarios offer a scenario selector. Each selection has its own Primary and Related source groups.
3. Select an M/C code to read its source action, relationship to the selected scenario and source notes. Source locations expand to reveal the original occurrence locators.
4. The persistent yellow **View scenario detail** CTA opens S1 in a separate tab using the existing M0.1 workshop sample. The original map and source selection remain open. Other scenarios retain their existing detail behavior until their workshop samples are ready.

Mapping rationale and notes remain available below the source groups. Existing reachability and connection exploration is retained under **Map connections**. Technical node metadata is no longer the primary popup content. The narrow-screen preview covers the map toolbar until closed, so the CTA remains accessible.

## Source boundaries

The guideline mapping data is unchanged. Canvas nodes are entry points into scenario scope; this change does not assign every source code to an individual canvas shape. Primary and Related codes remain separate. M0.1 retains both Target occurrence locators and its wording ambiguity. Target-only EDD actions retain their qualification. Scenario Template is unchanged.

## Verification

- Ten focused tests passed: all authored nodes resolve, all 15 previews preserve exact guideline membership, shared readiness/Credit/Legal relationships remain distinct, and M0.1's two Target occurrences survive.
- Browser verified Trigger/S1 source selection, Intake S1/S2 switching, and S1/S2/EDD CTA destinations and return.
- Verified Chinese translation, 390 px layout with visible CTA, close restoring the toolbar, and the default 922 px layout.
- Browser console reported no errors. JavaScript syntax and Git whitespace checks passed.
