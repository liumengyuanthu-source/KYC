# Round A working source and scope notes

Active design basis: SRC-009 IA v0.4, especially §21 integration, with SRC-010 Discussion 2 seeds. The original files remain unchanged in `0907 studio building`. `source_manifest.json` registers SRC-009–SRC-012 locally with SHA-256 digests and availability; the existing source register is preserved.

This round authors one vertical slice across SCN-REQUIREMENTS, SCN-SOURCE, SCN-GAP, SCN-VALIDATE, SCN-MATCH and SCN-READINESS. All 15 existing SCN aliases are registered; nine remain explicitly skeleton. Stable roots DEMO-CTT-001 and ROUTE-NEW-REL-01 are retained. Proposed child keys use only `DEMO-CTT-001/<kind>/<slug>`; these are synthetic local keys, not new enterprise identifiers or source process IDs.

Existing journey IDs are exactly J-M2-01 and J-M3-01 through J-M3-04. M2.5 in J-M3-03 spans requirements issue and residual request, so its existing crosswalk appears in both relevant scenes. There is no J01–J15 registry in the inspected journey file; no such IDs have been created. MATCH and READINESS honestly carry no existing journey crosswalk.

Inherited assumptions ASM-001–ASM-005 remain OPEN: role split, pain hypotheses, permitted evidence/rules, proposed human controls and versioned state. ASM-006 is a historical layout hypothesis and does not establish the Round A navigation design. Exact bank policies, evidence thresholds, source rights, representative mandates and screening/QA/publication authority are unknown. `demoConfig` defines only synthetic local action permissions, with separate unknown bank authority and policy fields.

The referenced original `Confidential_Banking_Clear_to_Trade_Workshop_Prework_P0_P1(1).md` was not found by a workspace filename inventory filtered for prework/P0/P1, including the supplied 0907 studio building folder. A derived prework design exists under docs/superpowers/specs; it is not represented as the original. This is an availability gap, not an assertion that the source never existed. Round A scope is controlled by the active user request and supplied IA/D2.

The schema is a draft logical data contract, not a production database or API. The fixture is synthetic. The validator reports only its actual data-contract checks; it does not certify bank policy, UI behaviour or final acceptance. Publication, actual trades, benchmarks, production architecture and Lab/P1 state changes are not implemented by these data assets.

Decision records begin empty because the initial synthetic case awaits human disposition. A runtime decision must carry its demo authority, specific evidence-use basis and exact input revisions. Initial conditions preserve Legal awaiting_execution, Credit condition_pending and QA pending. EDD applicability is unknown with an explicit question; it is not silently waived. Playback and navigation must never execute state changes.
