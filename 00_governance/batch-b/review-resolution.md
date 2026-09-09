# Independent review and fix resolution

2026-09-07. No commits; reviewed explicit file packages against preserved dirty workspace.

| Finding | Resolution | Evidence |
|---|---|---|
| Mixed valid/invalid grants could expose extra items | Every item and receipt independently passes current access context | collaboration-engine.mjs client projection; focused regression |
| Replacement could bypass current request review | Requires current approved review, configured contact/disclosure/access basis and atomic assignment transfer | replace_recipient and old-recipient ownership regression |
| Old-scope evidence could be relinked as current | Item/evidence scope revisions required at link and assessment | old-scope release/relink rejection regression |
| Global idempotency key accepted different operations | Stored action fingerprint; exact replay only, collision throws | actor/action/target/payload collision regression |
| Submit could publish an old saved draft | Uses current action text; captures edit revisions; persists submitted text | saved A → typed B and direct-submit browser tests |
| Revised request displayed old sent state | Renderer uses current request dispatch/delivery state | historical notification renderer regression |

Independent task re-review: all four engine findings ADDRESSED; no new Critical/Important breakage in scoped fix diff.
Independent integration re-review: both integration findings Resolved / Approved.

The engine report was updated after the reviewer's first read; final authoritative evidence is verification-results.json and tests.tap: 85/85 prototype tests, including 25 engine tests. Actual browser suite: 13/13 with zero JavaScript exceptions, including native PDF export and automatic return. Original Python governance tests: 18 passed using .venv/bin/python -m pytest -q tests.

Earlier diagnostic attempts used unittest (0 collected) and system/bundled Python without pytest; these were not counted as passing evidence. The repository .venv supplied the correct test runner.

## Print proof

output/pdf/batch-b-client-print.en-AU.pdf: one A4 page; extracted text contains current revised submission B and no ownership item or internal reason. Latest rendered page manually inspected: sharp type, no clipped content/overlap, assigned task and own receipt only. Native print returns to the previous collaboration view; the browser harness allows that automatic return rather than waiting for an already-dismissed Print Preview button.

## Acceptance boundary

CH-01–28: 26 passed in local simulation, 0 failed, 2 not-run (CH-06 email preview adapter disabled; CH-25 Lab not enabled). No real authentication/authorization, messaging, security scanning, bank-policy validation or production integration was run or implied.
