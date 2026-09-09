# D5 Product Experience Quality Gate

This is a separate, fresh local audit of the completed D5 baseline. It does not overwrite the earlier D5 acceptance evidence.

Start with `reports/UX_EXECUTIVE_SUMMARY.md` and `ux-audit-assets/journey-review.html` after the audit finishes. Reports distinguish tested behaviour, screenshot observations, unimplemented fixtures and required human review.

## Reproduce

From the repository root, with the existing local server at `http://127.0.0.1:8765/prototype/`:

```sh
node audit/tests/unit-proof.mjs
node audit/tests/journey-final.mjs
node audit/tests/host-browser.mjs
node audit/tests/navigation-extra.mjs
node audit/tests/modules-proof.mjs
node audit/tests/safe-request-proof.mjs
node audit/tests/resume-proof.mjs
node audit/tests/surfaces.mjs
node audit/tests/context-extra.mjs
node audit/tests/time-print.mjs
node audit/tooling/node_modules/@playwright/test/cli.js test --config=audit/playwright.config.mjs
```

Use the existing Google Chrome executable. Tooling dependencies are isolated in `audit/tooling/`; `npm ci --ignore-scripts` there restores them from the lock. No product package manager/runtime migration was made.

Do not re-run `discover.mjs` over the preserved pre-audit hash manifest or regenerate test copies over later audit modifications. These are first-run capture/relocation helpers, not a reset command.

## Evidence boundaries

- `screenshots/actual/journey/` contains original fresh audit journey evidence before controlled fixes; post-fix captures are stored separately when rerun.
- `screenshots/baselines/` contains provisional first-run visual references. Never update changed images automatically. A repeated screenshot pass proves only render stability against that reference, not approved design.
- Completed/archived outcome fixtures and complete QA/publication runtime are absent. Empty-state captures do not satisfy those missing outcomes.
- Clock and browser tests use only synthetic local data. No bank system, live screening provider, model, mailbox or remote screenshot service is connected.
- Newly installed `ux-audit` is not claimed as executed in this session; the heuristic review uses the existing Product Design Audit method.
- Installed `ux-audit/SKILL.md` SHA-256: `56f813a9fddef652272e74364b05005ac98286683985081102a54a2a548724f6` (installation identity, not audit execution evidence).
- CSS text-scale probing is not native browser zoom, screen-reader testing or WCAG certification.
