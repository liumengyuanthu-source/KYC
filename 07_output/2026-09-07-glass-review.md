# Black / blue / white glass redesign

2026-09-07. Local synthetic prototype; Round A scope is unchanged.

[Open Chinese preview](http://127.0.0.1:8765/prototype/?locale=zh-CN)

## Direction and provenance

The user's final direction supersedes the earlier violet, mint and pink treatment: black, blue and white only, with a warm neutral canvas and blue-grey ambient shade at the upper right. No iridescent colour overlay is used.

Inspected [Macquarie's US homepage](https://www.macquarie.com/us/en.html), including live computed styles. At inspection its hero heading used `MCQGlobal-Light`, its body used `MCQGlobal-Regular`, and blue calls to action included `rgb(15,122,199)`. The reference informed lightweight sans-serif hierarchy, monochrome contrast and restrained blue emphasis, not a copy of the brand. No Macquarie font file, logo, imagery or business copy was imported. The app uses local Helvetica Neue / Helvetica / Arial and Chinese system fallbacks. Macquarie is a visual reference, not the identity of this confidential client.

The frontend design skill informed the redesign audit and the separation of material from readable content. Its marketing-page patterns were not imposed on the operational forms. Test-driven development and verification workflows were used for the new interactions; existing case and navigation logic remain the contract.

## What changed

- Dark navigation with a translucent selected capsule; black headings and restrained blue actions.
- Compact introduction, workshop method in a disclosure, a lighter case strip and a three-level glass hierarchy.
- First selected scene begins around y=789 in Chinese and y=807 in English at 1440×900, versus y=1228 in the initial Chinese baseline probe. Long journey content still scrolls; the entire matrix is not squeezed into one viewport.
- Independent material planes for hover illumination, very small tilt, pressure and one release rebound. Text and icons do not receive blur, rotation or scaling.
- Continuous selected-surface travel in comparison/mode controls. Latest locale, scenario and navigation position are retained.
- Keyboard focus retained across re-render; stale return-focus callbacks cannot steal a newer user focus.
- The workspace return strip and scenario primary actions remain visible through long content. Mobile scroll offsets reserve space for the return strip rather than letting it cover the heading.
- Native disabled controls, Save / Discard / Stay, reduced-motion and reduced-transparency paths.
- Tabler outline paths for play, external-direction and information icons, with their MIT license retained locally.
- Embedded Archify images appear monochrome; their canonical source files and independent viewers were not rewritten.

## Material implementation: precise limits

Actual backdrop treatment: CSS `backdrop-filter: blur(...)` softens content behind selected surfaces where the browser supports it. It does not bend rays or geometrically refract the backdrop.

Simulated: narrow edge reflection, milky thickness, local highlight, bevels and contact/ambient shadows are layered gradients and shadows. There is no optical refraction, displacement shader, chromatic aberration or physically based caustic simulation.

Pointer highlight calculations run only in response to pointer movement, batched to a frame. There is no idle animation loop. Tilt is limited to the decorative material plane (at most 0.35 degrees per axis). Keyboard and touch press/release use the same state model. Reduced motion disables tilt, stretch and rebound. Reduced transparency uses near-solid surfaces. Unsupported backdrop blur has an opaque fallback.

## Verification and review assets

Executable UI checks: [glass-check.mjs](../prototype/qa/glass-check.mjs). Results: [interaction-results.json](../prototype/qa/glass/interaction-results.json). The suite covers 14 explicit presentation/navigation checks. New interaction assertions were first observed failing against the prior behaviour, then rerun after implementation.

Independent fresh-session route, three locales, pointer drag, touch events and print-media checks: [glass-proof.mjs](../prototype/qa/glass-proof.mjs). Current source hashes and observations: [proof.json](../prototype/qa/glass/proof.json).

Fresh core regression: 28 Node tests, 15 data-contract checks and 18 existing Python tests passed. The complete six-action UI route reaches case revision 7 and records one human disposition, while readiness remains `not_ready` and publication remains `not_requested`. No policy, authority, KPI or integration was introduced.

Screenshots:

- [Chinese Studio](../prototype/qa/glass/studio.zh-CN.png)
- [English Studio](../prototype/qa/glass/studio.en-AU.png)
- [Chinese scenario](../prototype/qa/glass/scenario.zh-CN.png)
- [Screening workspace](../prototype/qa/glass/screening.en-AU.png)
- [Clearance after local screening completion](../prototype/qa/glass/clearance.en-AU.png)
- [Hover](../prototype/qa/glass/button-hover.en-AU.png) / [pressed](../prototype/qa/glass/button-pressed.en-AU.png) / [disabled role](../prototype/qa/glass/disabled-role.en-AU.png)
- [Touch press](../prototype/qa/glass/touch-pressed.zh-CN.png) / [mobile layout](../prototype/qa/glass/mobile.zh-CN.png)
- [Full print-media content](../prototype/qa/glass/print.en-AU.png)

Print-media proof contains all 15 unique scenario IDs and all three loaded diagrams, including off-viewport content, and hides screen navigation. This round did not replace the historical Round A PDFs or claim a newly paginated PDF proof.

## Remaining limits

Verified in isolated Chrome contexts at desktop and mobile viewport sizes, including synthetic touch events. This is not a physical-device, Safari/Firefox, full WCAG, assistive-technology, battery/GPU or performance certification. Native font rendering varies by platform. Diagram fine print still benefits from zoom or the independent viewer. No public publishing was performed.

## Change impact

Changed: `prototype/index.html`, presentation/render/focus integration in `app.mjs`, and README. Added: `glass.css`, `glass.mjs`, icon license and isolated QA artifacts. The original style layer is retained beneath the redesign, with print behaviour preserved. Case engine, fixture, stable IDs, source-status governance and schema are unchanged. Existing unrelated workspace modifications were preserved. Earlier QA artifacts remain historical; use this report for the redesign.
