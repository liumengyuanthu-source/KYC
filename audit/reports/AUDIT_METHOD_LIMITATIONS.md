# Method and limitations

- This audit uses fresh local execution evidence, not earlier D5 acceptance counts. Prior fixtures are reused only as inputs; the full C/B journey was also recreated with actual UI commands.
- `ux-audit` installation succeeded through Git after the default Python download failed certificate-chain validation. No TLS bypass was used. The new skill is not claimed as executed in this session; ordered screenshot review used the existing Product Design Audit skill.
- The first relocated resume test had two wrong relative imports. These were audit-harness errors; corrected before its passing run. No product change was made for them.
- The first visual configuration used an unsupported `{configDir}` token and a reporter path relative to the config. Captured candidate images were moved unchanged from the literal-token directory into the intended baseline folder; config now uses an absolute filesystem path. The preliminary report remains under `audit/audit/reports/visual-results.json`; final report is `audit/reports/visual-results.json`. This did not alter product pixels or approve a baseline.
- A Playwright `NO_COLOR` / `FORCE_COLOR` environment warning appeared in the preliminary screenshot run. It is tool-environment output, not an application console error.
- Full-page screenshots taken after scrolling can show sticky header positioning artifacts. Use the current viewport captures and normalized candidate baseline images for visual assessment; do not treat a full-page capture artifact as a product overlap defect.
- CSS root/body text scaling is not native browser zoom. Fixed-pixel typography limits what that probe establishes. Native 200% zoom, 400% reflow and real screen-reader use remain NOT_RUN.
- Axe checks do not establish complete accessibility; the invisible keyboard focus defect was found by actual focus inspection despite zero serious/critical axe results at that time.
- Image comparisons establish repeatable rendering against a candidate, not design quality, banking correctness or Christina approval. Intentional diffs are retained for review, not automatically blessed.
- Historical empty states are not approved completed/ended/archived outcome fixtures. QA, final authorisation/publication success and full Lab Shadow are not validated by this round.
- “Pass” for a red-team vector applies only to the named local oracle. Evidence quarantine is not a full withdrawal-event workflow; inconsistent provider birth-year claims are not a conflicting uploaded-document workflow.
