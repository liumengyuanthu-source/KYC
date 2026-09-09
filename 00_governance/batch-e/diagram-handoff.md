# E static diagrams — mainline handoff

Source: SRC-020, E Final v1.0, approved synthetic demonstration design. Not client-validated process or authority.

Use `prototype/diagrams/batch-e/manifest.json`. Five canonical Archify HTML artifacts were delivered and passed their artifact-bound browser checks; all five SVG exports passed the local export/palette harness. The neutral host/print derivatives preserve diagram geometry and labels but replace the native viewer palette/font. Do not describe the derivatives as separately Archify-validated artifacts.

Root inspected all five host captures. No observed clipping/overlap at the captured desktop size. Diagram context text is compact: provide readable semantic steps and zoom; do not shrink the diagram to phone width as the only explanation.

DG-E03 English is an explicit limitation: its candidate failed the projected-text readability threshold; two consecutive corrections did not improve the objective error count. The bounded Archify repair rule stopped further attempts. Use the supplied English static semantic fallback. The Chinese diagram is delivered. No English graph pass or complete media claim is warranted.

Host selection, diagram focus and Next are read-only presentation. Avoid embedding the interactive native viewer inside an interactive journey host; use the static SVG with host-owned focus/step text. No command should be dispatched to the E engine by diagram controls. Printing uses the same SVG content and complete semantic steps.

DG-E01 illustrates the particular ownership-purpose gap loop. Show the general no-gap guard separately if describing wider QA behaviour; do not imply all QA checks require remediation. `REQ-B05 → EUA-05 → QA-04 → GAP-QA-01 → RT-01` remains a source-qualified alias chain; show readable titles first.

Verification commands:

- `node prototype/diagrams/batch-e/deliver.mjs` — 5/5 deliver/validate, no warnings/errors.
- Archify `visual-check` on the five delivered HTML files — 5/5 automated browser pass, four viewport sizes each. Native machine reports retain `visualReview: pending`; this human-like inspection is recorded separately in the manifest.
- `node audit/tests/e-diagram-export.mjs` — 5 exports passed, palette asserted and host screenshots saved.

The screenshot harness initially stalled on a standalone SVG document. A minimal same-SVG HTML wrapper rendered successfully; the harness now captures the HTML-embedded host presentation. This changes only screenshot context, not diagram geometry or browser validation evidence.

Host integration, role redaction, bilingual return and complete-print verification remain pending Task 2. Missing audio/video is non-blocking and not presented as fabricated playback.
