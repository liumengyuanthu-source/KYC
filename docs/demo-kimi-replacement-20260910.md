# Demo replacement with Kimi version · 2026-09-10

Source: `0907 studio building/Kimi_Agent_8阶段图标未显示.zip`.

The ZIP's complete `app/` directory replaces `08_inspire/app/`: Home, New request, Case tracker, Documents, EDD, the shared interaction script, shared stylesheet and `assets/hero.jpg`. Files from the previous Demo implementation that are absent from the Kimi package were removed from this branch. Git history retains the replaced version.

Only two requested deltas were added after import:

- Annette / Annette Black is displayed as Morgan. The existing Group Treasurer role and Kimi business content remain unchanged for this first-pass copy.
- Every Demo page has a `Back to Studio` control that returns to the Customer journey map. The Studio's existing Demo navigation points to the imported Home page.

## Verification

- Opened all five pages from the local server. Each page loaded without browser console errors and displayed Morgan plus the Studio return control.
- Verified the Home `Browse 8 Stages` view; all eight stage cards and their icons render.
- Verified Home → Studio and Studio → Demo navigation.
- Verified the New request wizard advances from Request to Entity through its existing Continue control.
- Ran JavaScript syntax, Git whitespace, static-site build and packaging tests.

No visual tuning beyond the requested return control and persona text is included. The next UI pass can start from this exact Kimi baseline.
