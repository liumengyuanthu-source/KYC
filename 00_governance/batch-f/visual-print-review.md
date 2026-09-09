# F actual visual / print review

## Initial host-green-2 inspection — not final acceptance

Root rendered all18 actual pages of `prototype/qa/batch-f/host-green-2/definition.zh-CN.pdf` with Poppler at1200px and inspected every page. Evidence: `audit/evidence/batch-f-pdf/page-01.png` through `page-18.png`. This is actual PDF inspection, not print-CSS emulation alone.

Findings returned to the implementer before task freeze:

- Page9: long EvidenceUseAssessment object label touches the physical-store value. Wrap long technical tokens and preserve column gap.
- Page8–9: Evidence domain heading is stranded at a page boundary. Keep summary with initial rows.
- Pages13–17: Chinese print still uses English capability behaviour, human boundaries, acceptance criteria, question assumptions and owners. Translate reader-facing copy; retain technical IDs as secondary metadata.
- Pages13–15: capability traceability lines become orphaned across page boundaries. Keep a capability block together when it fits.
- Pages4–5: D1 and D2 repeat scene-level copy instead of distinct reading beats. Verify exact story beat lookup and preserve both approved IDs.
- Page10: initial host fallback lists7 grouped steps while typed F01 manifest has11 nodes. Verify no authority / evidence / publication semantics are lost.

No final acceptance is inferred from this initial inspection. Fullpage screenshots at12501px/23234px were too tall to judge legibility after preview downscaling; requested separate desktop, graph and mobile viewport captures.

The F01/F03 static diagram captures were separately inspected under the diagram handoff. Canonical standalone viewport failures and F02 graphical failure remain separately disclosed.

## Functional freeze host-final — actual inspection

Root inspected all19 Chinese and all23 English pages rendered from `prototype/qa/batch-f/host-final/definition.zh-CN.pdf` and `definition.en-AU.pdf`. Rendered evidence is under `audit/evidence/batch-f-pdf-final-zh/` and `audit/evidence/batch-f-pdf-final-en/`.

The earlier column collision, isolated domain heading, duplicate D1/D2 content and English-only reader-facing capability/question text in Chinese print are resolved. F01 now preserves all11 manifest nodes. Story, all8 object domains, capabilities, acceptance criteria,12 questions, optional read-only Lab and limitations are present. No text clipping or overlap was observed in the final42 pages.

Root also inspected final desktop top, mobile top and all3 diagram viewport captures. Text is legible at those captured viewport sizes; no visible overlap was observed. F01/F03 static graph geometry and semantic steps are accessible; F02 clearly labels the semantic fallback. This is not user aesthetic acceptance or a new standalone Archify viewport pass.

Deferred print polish for final review: F01's eleventh semantic item sits alone on Chinese page11 / English page14; the final limitations section splits across Chinese18–19 and English22–23, with the English heading stranded. All content remains present and readable, but pagination can be tightened. These findings do not convert known graphical failures into passes.
