# Round A independent browser and print proof

Final captures refreshed 2026-09-07 05:54:19 UTC against local `http://127.0.0.1:8765/prototype/`. All six recorded source hashes match the final app, navigation, CSS, content, engine and synthetic fixture. Source hashes, browser measurements and bounded interaction results are in `browser-proof.json`; `final-route-proof.json` records the final six-action route.

## Reproduced issues and authorised corrections

1. **Role display mismatch after Stay.** With unsaved screening rationale, choosing Financial Crime then Stay left the selector showing Financial Crime while stored navigation and permitted actions remained KYC Operations. Fixed by re-rendering the original role on Stay/Escape while keeping the draft. Retest: UI and stored role both `ROLE-KYCOPS`.
2. **Unsupported trigger could operate the new-relationship case.** Product extension was marked unauthored in Studio, but the top Product entry enabled Confirm demo requirements, incrementing the new-relationship case from revision 1 to 2. Fixed by disabling all business actions for unauthored triggers and displaying an explicit Product notice. Retest: Confirm disabled; revision stays 1; last event remains synthetic baseline creation.
3. **Studio-only roles looked like KYC Operations in Product.** Added an explicit selected read-only option for the current role when it is outside the three Product roles. Verified Client, RM, combined Reviewer and combined Specialists retain their correct selector identity with zero enabled business actions.
4. **Narrative results needed prospective wording.** Scenario and print narratives now label outputs as Expected result / 预期结果, distinguishing them from actual case state.

Only `app.mjs` was changed, after explicit parent authorisation. No case-engine policy or trigger fixture was expanded. The root agent owns the separate full happy-case, false-green and CUA validation.

## Actual pointer drag

Used an isolated headless Chrome context and real browser mouse/pointer events over measured stage-heading coordinates. No JavaScript camera assignment occurred. Journey scrollLeft moved **405 → 728**; opening and closing SCN-MATCH restored **728**. The first coordinate attempt hit the sticky header and did not scroll; the corrected probe verified the hit target was `stage-heading` before dragging. `drag-restored.en-AU.png` records the resulting view.

## Screenshot evidence

- `studio.en-AU.1440x900.png`, `studio.zh-CN.1440x900.png`: actual viewport captures.
- `studio.en-AU.full.png`, `studio.zh-CN.full.png`: complete page captures with the high-level Archify section expanded.
- `print-preview.en-AU.full.png`, `print-preview.zh-CN.full.png`: full print-preview content.
- `role-stay.en-AU.png`, `unsupported-trigger-product.en-AU.png`: final corrected bounded QA states.

Both Studio locales have document width 1440 at viewport width 1440, with no horizontal document overflow. The journey intentionally scrolls internally: content width 2025, viewport width approximately 1154. Both capture runs recorded zero page errors. Visible first screens were inspected. These measurements do not claim all viewport sizes or all interactions.

## PDF evidence

`round-a-print-proof.en-AU.pdf` and `round-a-print-proof.zh-CN.pdf` are full fresh-session Print-mode captures at case revision 1, **8 A4 pages each**, produced by Chrome with the app's print stylesheet. Both include:

- six authored scenes with both Current and Target;
- all nine structural scenario entries;
- seven readiness conditions and explicit non-publication/non-execution status;
- all three loaded canonical SVG figures on pages 6–8;
- six Expected result labels and the final validation questions.

Poppler `pdftotext -layout` confirmed all 15 stable scenario IDs, three Archify captions and eight pages in each file. Extracted text is retained beside each PDF. Poppler page renders are `print.en-AU-1.png` through `-8.png` and matching `zh-CN` files. All original pages were inspected, then changed text pages were re-rendered and re-inspected after the Expected result correction; content remains unclipped and Chinese glyphs render correctly. The figures are vector and complete; their fine labels are compact at A4 and benefit from PDF zoom or the linked standalone viewer.

Print evidence proves inclusion beyond the viewport, not bank acceptance, accessible tagged-PDF certification or production readiness. PDFs contain no JavaScript, no forms and no encryption. The isolated capture did not touch the user's active browser session.

Additional verification: JavaScript syntax check passed; existing navigation unit tests passed 5/5. Full operational browser coverage is intentionally not claimed here.

## Final route and locale retest

The open SCN-MATCH modal initially reset its scroll position from 160 to 0 on a Scene language change. The authorised correction retains the pixel position, clamped to the translated content, after render and SVG load. Final browser retest: en-AU → zh-CN, Current retained, SCN-MATCH retained, modal scrollTop **160 → 160**. `scene-locale.zh-CN.png` was inspected.

A fresh isolated session performed all six business actions through visible UI controls: confirm requirements, reuse identity, request residual evidence, receive supplement, assess supplement, then record human disposition as ROLE-FINCRIME. `screening.en-AU.png` shows the actual synthetic references SYN-A-104 / SYN-B-207, AU / NZ and translated Corporation · synthetic labels. The badge reads Awaiting human review; the entered decision rationale refers only to displayed identifiers and jurisdictions, not invented dates. `clearance.en-AU.png` and its full-page companion show the resulting revision 7 with one decision, evidence and screening satisfied, three unresolved required conditions, one unknown applicability, not_ready, publication not_requested and transaction out_of_scope. The visible final notice also identifies unconfirmed booking entity and policy profile. These latest screenshots were visually inspected. Viewport images naturally require scrolling for content below 900 px; full-page captures retain the live sticky header at its current scroll position.

An independent autoplay probe stopped at SCN-MATCH / cursor 4 with the modal open, the Play story button reset, case revision 1 and zero decisions. This proves that presentation playback does not perform the human decision.

The final PDF refresh still contains 8 pages, all 15 stable scenario IDs, three Archify captions and six expected-result labels in each locale. The final changes affected Product labels and modal position, not printed content, so no additional identical page-render review was claimed. Final PDF SHA-256: en-AU `e4775a63a5a1eb072f7233035f274db58f988ea7162284cfd2d706c61fe8e5e9`; zh-CN `3c078a0e02ca7ca0162cde0a0b1c61ead9958b50e1bac9e26b412c3a3f39e024`.

The earlier drag, role and trigger probes are retained with their prior result provenance; the final route and captures were rerun on the recorded final hashes. Parent-reported full verification is separate: 28 Node tests, 15 data checks and 18 Python tests.
