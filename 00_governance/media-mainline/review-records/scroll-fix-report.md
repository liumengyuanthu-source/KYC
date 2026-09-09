# Media mount scroll-race fix

## Scope

- Changed only the media post-mount lifecycle in `prototype/app.mjs`.
- Added `prototype/qa/media-scroll-race.mjs` and its generated result at `prototype/qa/media-mainline/scroll-race-results.json`.
- No business data, schemas, navigation contracts, or general locale handling changed.

## Root cause and fix

`mediaHost.mount()` resolves after both successful and superseded/aborted mounts. The host continuation restored its captured scroll position before proving that its slot was still the current connected render, and it restored even when the user had scrolled during the pending load.

The render now assigns a generation, captures the browser's actual `scrollTop` immediately after the initial restore, and performs no post-mount work unless the generation and connected slot identity are current. A valid mount restores the saved position (using native clamp behavior) or applies one-shot `focus=media` positioning only when `scrollTop` is still equal to that captured initial value.

## TDD and verification

Command: `node prototype/qa/media-scroll-race.mjs`

- RED before the fix: MSR-01 reset `600 → 0`; MSR-02 stale same-scene render reset `900 → 300`.
- GREEN after the fix: 2 passed, 0 failed.
- Final generated evidence: delayed-load scroll stayed `600 → 600` while max scroll grew `2084 → 2610`; rapid same-scene replacement stayed `120 → 120` through stale and current completion.
- MSR-02 deliberately uses stable offsets above the media insertion point to isolate callback ownership. Native browser scroll anchoring below expanding media is separate from stale-callback restoration and is not asserted by this test.

Command: `node prototype/qa/media-preview-smoke.mjs`

- Existing explicit `focus=media` smoke: SCN-SCOPE passed and SCN-ENTITY passed.
- Both previews positioned the media panel about 12px below the sticky modal header, stayed paused at time 0, and retained static transport positioning.

The controller owns the final unit/browser suite rerun.
