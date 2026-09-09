# Task 1 report — isolated read-only media player

Date: 2026-09-07  
Owner scope: `prototype/batch-a-media.mjs`, `prototype/batch-a-media.css`, `prototype/tests/batch-a-media.test.mjs`

## Result

Implemented an async Shadow DOM component for the two approved panel-first/r01 stories:

```js
const controller = await mountMedia(element, {
  scene, locale, comparison, snapshot, onChange, signal
});

controller.pause();
controller.snapshot();
controller.destroy();
```

`snapshot()` and `onChange` expose only:

```js
{asset, revision: 'r01', time, beat, holdPassed, playing}
```

Scene, locale, comparison and saved state are allowlisted/normalized. Saved `playing: true` is never restored. The component imports the packaged frozen `src/content.js` and `src/views.js`, requires the selected locale, and loads the frozen r01 `styles/media.css` before the mainline bridge CSS. Required narrative/locale failure rejects after cleanup so the host-owned complete localized fallback takes over. CSS, portrait and canonical SVG failures fail soft without blanking important text.

The component has no business-store import, storage access, `postMessage` listener, or autonomous scene navigation. Host data attributes expose asset/time/beat/playing for browser verification.

## Behavior covered

- Initially paused; explicit Play only. Play/Pause, Previous, Next and Replay are local presentation controls.
- Replay returns to 0 paused. The ending does not loop or rewind.
- DMO-A02 stops at 9.5 seconds on A02-C4. Play and cue seek cannot cross the hold; explicit Next advances to 13 seconds and records `holdPassed: true`.
- Reduced-motion uses a paused stepped mode and pauses an active timeline when the OS preference changes.
- Host pause/destroy, external AbortSignal, focus leaving the component, window blur and document hiding stop playback.
- Event listeners, animation frames and fetches are cleaned up. Pending/disconnected mounts do not finish setup.
- The i-help control works by focus and click. Escape closes it, restores local focus without reopening, and stops propagation to the host dialog.
- Arrow keys act only while focus is in the component playback/cue controls.
- The approved purpose/evidence panels and cue copy come directly from the packaged read-only source modules. Current/Target organizing-role copy is driven by host input.
- Selected r01 portraits and canonical Archify SVG files are referenced with `new URL(..., import.meta.url)`-relative packaged URLs; no experiment origin is used.
- The embedded transport is non-sticky so it does not overlap the host dialog chrome. Mobile container queries collapse grids without imposing a wide diagram minimum.
- Print reveals every static cue, independent of playback position.

## TDD evidence

1. Initial test import failed because the component did not exist (`ERR_MODULE_NOT_FOUND`).
2. With reducer stubs in place, all six initial tests failed on real assertions (`actual: undefined`), confirming RED for restore/autoplay, malformed input, intents, bounds/immutability, hold/Next and Replay/Previous.
3. Minimal reducer implementation made the initial suite GREEN: 6/6.
4. Self-review added an end-of-story regression test. It failed RED because Next changed time from 16 to 13.
5. The reducer was fixed to preserve the ending. Fresh component result: 7/7 pass.

Fresh verification command:

```sh
node --check prototype/batch-a-media.mjs && node --test prototype/tests/*.test.mjs
```

Result: 99 tests passed, 0 failed, exit 0.

A restricted-source scan of the three assigned implementation/test files found no `4182`, `postMessage`, business-engine import, `sessionStorage`, or `localStorage` reference.

## Integration evidence and remaining boundary

The main controller reported the fresh host browser gate at 21 passed, 0 failed, 1 not run, with evidence under `prototype/qa/media-mainline/`. It covered both scenes, all three locales, controls/hold/restore, business-state hash stability, missing assets/module fallback, responsive layouts and print containing all 11 cues.

The one intentionally unrun boundary is cross-browser/native zoom/assistive-technology validation. The standalone sample's historical 14/14 result is not represented as host-integration evidence.

## Independent review fix

Component review identified that a closed `<details>` element cannot be made print-open merely by changing its CSS display, and that a help container with an interactive close button must not use tooltip semantics. The internal all-cue print copy is now a non-collapsible `<section>` hidden on screen and displayed for print. The i-help panel is now a non-modal `role="dialog"`, labelled by the localized field heading and described by the localized help text. The trigger has an explicit localized accessible name and `aria-controls` relationship.

Focused verification after the fix:

```sh
node --check prototype/batch-a-media.mjs && node --test prototype/tests/batch-a-media.test.mjs
```

Result: 7 tests passed, 0 failed, exit 0. Real-browser print-visibility and dialog-role confirmation is assigned to the main controller's final focused browser gate.

No commit was created.
