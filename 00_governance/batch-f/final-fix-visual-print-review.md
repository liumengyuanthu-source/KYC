# Final correction wave — actual PDF inspection

Root rendered and visually inspected every page of these new browser-produced PDFs (not print CSS emulation alone):

- F `prototype/qa/batch-f/final-fix-host/definition.zh-CN.pdf`: all18 pages.
- F `prototype/qa/batch-f/final-fix-host/definition.en-AU.pdf`: all22 pages.
- E `prototype/qa/batch-e/final-fix-mainline/complete-E.zh-CN.pdf`: all10 pages.

Evidence images: `audit/evidence/ef-final-fix-zh/`, `ef-final-fix-en/`, `ef-final-fix-e/`; pages rendered with Poppler scale-to1200 and inspected individually in batches.

F pagination Minor addressed: all11 F01 semantic items now remain with the graph on zh10/en13; the complete limitation section remains together on zh18/en22. No missing content, text clipping or overlapping text observed across all40 F pages. Deliberate section/page boundaries retain some whitespace. The full20 reading beats, domains, capability/criteria blocks and12 validation questions remain readable. F02's failed-graph semantic fallback is explicitly labelled.

E all10 pages remain readable, with complete condition groups, QA chain, prerequisites, decision/publication, activity and static diagrams. Activity now visibly separates authored scenario time from recorded action time (pages4–7). History timestamps are not rewritten. No text clipping or overlap observed.

This is a scoped local print-layout result, not user aesthetic acceptance, complete accessibility certification or bank validation. It does not change the known E03-English/F02 graphical failures or F01/F03 standalone-viewer containment failures. Historical PDF reports and artifacts remain intact.

Final PDF SHA-256:
- F zh: `9a79e1520a1c6b312b31f5f755e7456de31290033b146d96f982e8cb2019acda`
- F en: `0f9f3c9447a42d66f3930867c7c70e79328f2c87b0081313cb24f339a37ac397`
- E zh: `e75a5a8f15f9bad70aab6b5af87d520e539fa71bec4dff826100695867ac3fbe`

Root also inspected the new F desktop-top and mobile-top viewport captures in `final-fix-host/`. Reader-facing text and controls remain legible at the captured sizes; no new text overlap observed.
