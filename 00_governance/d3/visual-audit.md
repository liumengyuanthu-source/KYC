# D3 readability audit — current-run evidence

Scope: all159 repository HTML files inventoried; active host is one HTML with multiple dynamic surfaces. Static scan is not visual acceptance. Of134 standalone Archify HTML files, many are development/delivery snapshots; preserve historical receipts.21 media/static pages and3 archived HTML are recorded separately. No other project or experiment is silently rewritten.

User goal: people can first understand the business question and next action; implementation identifiers remain available but visually secondary. Existing black/blue/white glass language is preserved.

## Fresh captured steps

All eight screenshots in `prototype/qa/d3/before/` were opened and visually inspected during this run. Initial GAP URL did not open the modal and the initial reference/client selectors failed; those captures were rejected and corrected using actual controls. Final capture-results.json has8 captured states, no page errors.

1. Studio (`01-studio.png`): heading and journey structure work. Case ID, stage/process labels and context breadcrumb repeatedly compete with meaningful labels; D rail also uses technical presentation-beat wording outside the initial viewport. Keep stage names, deemphasize numeric/trace metadata.
2. GAP (`02-gap.png`): title/action and wait/human sections are readable. Repeated Batch/source eyebrow and duplicated scene structure add noise. D3 comparison should replace rather than pile tables above more tables; complete provenance under disclosure.
3. MATCH (`03-match.png`): readable primary summary; diagram technical branding/family label is still an uppercase eyebrow. Node buttons further down are raw Mxx labels. Lead with human task names, keep node IDs accessible as small metadata.
4. Scope product (`04-scope.png`): main task is clear, but generic case-workspace title and equal-weight case/request IDs dominate useful entity/product values. Prefer ordinary active-task title, secondary case reference, preserve actual scope unknowns.
5. Condition Detail (`05-condition.png`): strongest technical-noise problem. Long full case/scope path directly under title; literal ROLE-CONFLICTS and branch shown as body values; dependencies look like code chips. Replace display with role/scope labels, retain record IDs in detail. The archive compatibility warning must remain visible but use user-action language, not “writers”.
6. References (`06-references.png`): meaningful title/observation present. SRC017 IDs, industry_reference, SCN references and generic interpretation prose dilute it. Human source class and observation lead, registry IDs/locators small. Preserve explicit “not bank policy” boundary.
7. Client (`07-client.png`): access-denied explanation must stay prominent. `authenticated_session_required` is diagnostic support text and should not be equal to the human explanation. Workshop tool block can be quieter without hiding simulated-role controls or suggesting production auth.
8. GAP mobile (`08-mobile.png`): no page horizontal overflow; modal reading area constrained by footer. Technical labels consume top area. Keep touch targets/body readable; reduce nonessential metadata, not body text.

## Proposed correction contract

- Human title/action first; process and source metadata lower in hierarchy.
- Use semantic `trace-meta`/`trace-details` classes, not global opacity or runtime regex rewriting of arbitrary data.
- ≥14px ordinary body, ≥11px auxiliary metadata, readable contrast; no shrinking unknown/error/readiness messages into fine print.
- Graph node controls display human names; stable `data-c-node`, `data-d-node`, IDs and bindings unchanged.
- Full source/field detail printable; print projection independent of disclosure/viewport.
- Keep all two-pilot business controls and immutable state intact; comparison describes work, never creates evidence/approval.

## Static-family samples

Four further screenshots in `prototype/qa/d3/static/` were opened and visually inspected: all HTTP200, no page horizontal overflow at1440px.

9. Approved A media print: business headline already leads, asset identifiers are secondary. Preserve frozen r01 content and interaction contract.
10. C screening static wrapper: business title works; source/Archify labels and raw semantic-node labels need the shared presentation correction. Rebuild generated wrappers after renderer changes rather than hand-editing graph artifacts.
11. D standalone Archify: business node names lead, stable node IDs are small. Preserve validated standalone graph.
12. B standalone Archify: business node names lead, IDs are secondary. Preserve validated standalone graph.

Limits: this is12 sampled surface states plus full file inventory. It is not159 separately navigated visual audits, WCAG certification, a real identity/channel audit, E/F implementation or permission to alter frozen media story logic. After verification is recorded below.

## After inspection

All eight after states and four static-family after states were opened. GAP and MATCH now lead with expandable work titles and an explicit comparison, while source codes sit inside readable provenance. Condition Detail now names the owner and blocking scope in human terms, and source dependencies are disclosed. Reference classes are localised and registry/code context is secondary. Scope's case/request value is secondary; counterparty unknown remains prominent. Client access denial remains explicit. Mobile has no horizontal clipping; the long comparison remains vertically scrollable (not a claim that all work fits in one screen).

Three visual findings were corrected and recaptured: an exposed dark trailing condition-grid cell, ordinary-weight generic reference-code prose, and a Scope request ID with main-value emphasis. The three latest screenshots were reopened and confirmed fixed. Capture now waits for finite CSS animations to settle, avoiding a false intermediate top-navigation selection position.

The scenario DOM audit covers14 clickable entries without business changes or overflow. The existing publication placeholder has no clickable mainline entry: explicitly not-run, not a new D3 regression or permission to implement E/F. Other12 scenario screenshots from the route scan are capture evidence, not individually claimed visual approvals.

Remaining design limit: the underlying large journey/stage architecture is preserved. This increment tests two deeper, linked work comparisons; it does not claim to resolve every earlier concern about the overall journey/scenario structure.

## Final PDF proof inspection

All90 pages of six scene/locale PDFs passed text-boundary geometry checks. Twelve rendered first/middle/last pages were actually opened: GAP en-AU1/4/8 and zh-CN1/4/7; MATCH en-AU1/12/23 and zh-CN1/11/21. Business headings and ordinary content remain readable, IDs/locators are secondary, and no sample shows clipped text. These are internal print proofs, not polished publication layouts: long provenance and reference blocks cross pages, some terminal pages are sparse, and inherited research wording remains mixed-language in the appendix. Pagination and appendix copy are non-blocking follow-up polish. en-US PDFs passed content/geometry checks but did not receive separate visual sampling because their copy matches en-AU. This is not visual approval of every PDF page.
