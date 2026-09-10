# Archify diagram delivery

Nine local workflow figures: Current, Target and Screening, each in zh-CN, en-AU and en-US. Embed the matching `.svg` through an HTML `img`; link the matching `.html` as an independent viewer. Do not nest viewer gesture ownership.

All nine final candidates passed 9/9 showcase artifact checks with zero composition errors and warnings. All nine final HTML files passed the packaged Chrome visual-check at 1440×900, 1600×1000, 1920×1080 and 2048×1320, with both light/dark endpoint screenshots. Receipt hashes were checked against the final HTML bytes. Image-capable review inspected both themes and the large-desktop composition; final review passed. These are separate claims.

The first sandbox browser attempt failed with Chrome SIGABRT. The supported command subsequently passed outside the sandbox. Latest artifact-bound `.visual-check.json` receipts are authoritative. Their built-in `visualReview: pending` is intentionally unchanged; separate perceptual-review results are recorded in `manifest.json`.

Static SVGs were downloaded through the actual Archify viewer **Export → SVG** action. Every export reported `data-last-export-canonical=true`; every SVG has no script element. No SVG geometry was drawn or rewritten. `receipts/canonical-exports.json` binds SVG digests to source HTML digests. `export-canonical.mjs` reproduces this supported UI export locally.

Archify skill version: 2.17. Node: v22.15.0. Doctor passed. Packaged update checker ran once after the initial candidate and returned silent / cache-unavailable; the installed skill was unchanged.

## Content and integration boundary

Current and Target use the same 11-node, five-stage high-level topology because early conflicts, parallel Legal/Credit and conditional EDD are source-supported in both states. Target structured collaboration is a design hypothesis described in its conclusion cards. SVG export excludes those HTML cards, so the host must retain the Current/Target source and design-status captions.

The diagram preserves M0/M1 scope and identity; M2/M3 requirements and sourcing; M4 screening; risk/applicability-driven M5 EDD; M6 QA; M1→M7 early conflicts; independent C1 Legal/C2 Credit with C2→C1 agreement data; all applicable outcomes converging; separate authority; and subsequent publication. Legal/Credit start on their own sufficient inputs; no arrow asserts that scope alone authorises work. Unlabelled main-path and convergence edges repeat the immediately visible endpoint meaning; decision, conditional and cross-workstream relationships retain explicit labels.

Sources are traced through `0907 studio building/Clear_to_Trade_Experience_Principles_IA_Baseline_v0.4.md` §4.1–4.3 and the Discussion 2 scenario/dependency catalogue to SRC-007, Sanitised Process Map(1).pptx slides 1/2. These are an abstraction of the normalised baseline, not a claim of new direct review of every source-PPT arrow. Bank-specific authority, thresholds and interfaces remain open.

Screening is a synthetic proposed collaboration slice. Evidence sufficient plus demo authority permits a local disposition; other Legal/Credit/QA conditions can keep the case not ready. It does not authorise trades.

## Corrections and limits

The initial screening candidate was validated before repair; three labels exceeded default node width. A focused width correction passed. Current first required a smaller measured width for desktop readability and then passed. Perceptual review removed the generic technology legend so Current Legal/Credit were not presented as “Agent Logic.” Final screening review widened its remaining small nodes so icons and labels did not crowd. Perceptual correction rounds: Current/Target 1, Screening 2.

The static figures do not carry a runtime bridge, navigate the host, execute approval or alter case state. Host navigation, print pagination, camera/focus/playback and product workflow tests are owned by the main implementation and are not covered by these standalone receipts. The optional shared-spine integration figure was not generated.

See `manifest.json` for all artifact paths, SHA-256 receipts, source notes and statuses. Final delivery receipts use `.final-delivery.json`; older `.delivery.json` receipts are historical intermediate builds and do not describe the final files.
