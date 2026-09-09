# Visual regression — candidate baseline review

Result: REVIEW. 15 provisional baseline images exist; 13 expected test results, 2 unexpected, 0 skipped, 0 flaky in the latest Playwright report. A screenshot pass establishes repeatability, not Christina's approval.

## Environment

Local installed Google Chrome; Playwright Test and axe exact versions in tooling/package-lock.json. 1440×900 screenshot runner, reduced motion, en-AU browser locale, Australia/Sydney timezone; browser Date fixed at 2026-09-08T00:00:00Z. Synthetic saved case checkpoints only. Actual viewport/language checks separately cover 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768 and 390×844 in English/Chinese.

## Baselines

- 01-current.png
- 02-target.png
- 03-scenario.png
- 04-CHK01.png
- 05-CHK02.png
- 06-CHK03.png
- 07-CHK04.png
- 08-decision-pack.png
- 09-case-return.png
- 10-readiness.png
- 11-active.png
- 12-my-completed-empty.png
- 13-archived-empty.png
- 14-default-layout.png
- 15-changed-layout.png

01–03: Current, Target, Scenario. 04–07: four case checkpoints (received state is opened in a role-filtered internal view, not auto-assessed). 08: human review area. 09: Current + Chinese return. 10: current Not Ready case. 11–13: Active and empty completed/archive lists. 14–15: default and changed optional module layout.

**Unpopulated history outcomes remain NOT_RUN.** Empty lists are not substitutes for a completed historic case, ended case or attributed completed task.

## Intended changes and diffs

- Narrow S1 changes are state-specific guidance, current-C Readiness navigation, and valid keyboard focus token. Their before/after sources and exact patch are in environment/pre-fix and controlled-fix.diff.
- The initial candidate pack was captured after the first fix but before Readiness caller repair. Any remaining changed 08-decision-pack pixels caused by replacing the ambiguous assessment write with navigation are intentional and await baseline approval. Baselines are not automatically updated.
- Unexpected screenshot results must be inspected in screenshots/diffs; do not infer they are harmless solely from this list.
- Full-page sticky-position artifacts are excluded from overlap judgments; normalized viewport captures are used. The corrected harness path is documented in AUDIT_METHOD_LIMITATIONS.md.

## Human review

The controller inspected fresh original journey screenshots plus changed checkpoint candidates. The first viewport remains dense and client workshop tools dominate; these are S2 findings, not an approved final visual design. See HEURISTIC_JOURNEY_REVIEW.md and ux-audit-assets/journey-review.html for ordered observations. Christina review is still required.

Latest raw result: reports/visual-results.json. No commercial screenshot service or remote upload.

## Additional inspected wording difference

06-CHK03: 3,013 pixels changed in the assessment-basis sentence (old: recorded current assessment; new: current, validated assessment). Expected, actual and diff were opened together; no layout or data change was observed in this comparison. The raw result stays FAILED and the candidate is not updated. Expected: screenshots/baselines/06-CHK03.png; actual: screenshots/actual/visual/06-CHK03.png; diff: screenshots/diffs/visual-06-CHK03/06-CHK03-diff.png.

## Inspected final difference

08-decision-pack: 61,063 changed pixels (reported ratio 0.05). Opened expected, actual and diff together. The generic assessment write button is removed; action rows become shorter. The shorter document also clamps the scroll position, moving the evidence/action area down about 52px in the normalized viewport. This explains why the diff exceeds the button alone. No baseline was updated. The result remains FAILED in raw automation and REVIEW for intentional-change acceptance.

- Expected: screenshots/baselines/08-decision-pack.png
- Actual: screenshots/actual/visual/08-decision-pack.png
- Diff: screenshots/diffs/visual-08-decision-pack/08-decision-pack-diff.png

10-readiness is a first-time candidate capture; its first pass is not an independent before/after regression. Completed/archive captures remain empty-state coverage only.
