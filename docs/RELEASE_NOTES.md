# Clear-to-Trade main flow — September 2026

## Included

- Xiaoming's September 9 main-flow baseline.
- Workshop, Scenario Studio and Demo with a shared navy, blue, white and yellow visual style.
- Journey Map as the Scenario Studio entry, with Customer journey / Hero case perspectives.
- Fifteen scenarios mapped to 71 M/C source identifiers, with distinct Primary and Related relationships.
- Node popups that show source codes and source locations. S1 opens the existing M0.1 workshop sample in a separate tab; other scenarios retain their own detail view.
- Workshop chapters, discussion notes, summary and export controls.
- Existing Demo UX with synthetic story roles.
- English and Simplified Chinese views.

Scenario Template redesign remains deferred. The prototype is a static synthetic design environment; it does not connect to a bank or execute real KYC or trading actions.

## Deployment preparation

Added a site-root entry, local preview command, explicit runtime packaging, a clean source-snapshot export and a manual GitHub Pages workflow. The historical source workspace and its audit evidence remain separate from the prepared repository snapshot.

Corrected the Workshop requirements-document link to the existing `08_inspire/md/` location.

Local verification: three packaging tests and twelve scenario-mapping tests passed. The generated site was opened under a nested `/KYC/` path; Journey Map, M0.1 source preview, scenario detail, Workshop and Demo were verified there.

Status: prepared locally; not uploaded to GitHub or published to Pages. See [deployment instructions](DEPLOYMENT.md).

## S1 workshop sample — Version 2

S1 opens the user-selected Version 2 at its Summary step (`#6`) in a separate tab. Runtime files from `scenario-template-versions/version-2/app` are copied unchanged into `prototype/scenario-samples/m0-1-v2/`, including its V2 stylesheet, local hero image, To-be viewers and eleven-row Summary mapping. Browser drafts use the original V2 storage namespace. The previous V1 copy is replaced; the source versions remain untouched.

The sample retains its M0.1 title and content; converting it into the full Scenario 1 template is deferred. Relative URLs support GitHub project paths.

## Diagram playback — September 10

Explicit Play now resumes Live from Still in the V2 Before and both To-be readers, as well as Customer journey / Hero case. Pause and system reduced-motion behavior are retained. V2 source and packaged copy are synchronized; viewer URLs are versioned to avoid stale cached controls.

## Kimi Demo baseline — September 10

The complete Demo is replaced by the user-supplied Kimi `app/` package. Its five-page flow, shared styling, interactions and photographic hero are retained. Annette is renamed Morgan, and every Demo page includes a return control to Scenario Studio. The Studio Demo navigation opens this new baseline. All eight Home stage icons render.

## Scenario Scoreboard tab — September 10

Scenario Studio now exposes Scoreboard beside Customer journey and Hero case. It embeds the existing prioritization workshop in the same content area and scores the same 15 mapped scenarios across five dimensions. URL state, local scoring persistence, live ranking, bundles, portfolio and roadmap remain available under root and GitHub project paths.

The embedded Scoreboard now inherits the Studio language and removes its duplicate locale selector. Its visual layer uses the same navy, blue, amber, pale-blue and white system as the Kimi Demo, with Source Serif display headings, Inter body text, tighter cards and matching shadows. The scoring flow and saved workshop data are unchanged.

All Scoreboard surfaces now present the scenario catalogue as `S1–S15`, including scoring cards, details, bundles, portfolio and roadmap. Stable `SCN-*` keys remain internal so existing saved sessions and exports keep their data relationships. The former “Hero Case Anchor” badge is now “Hero case”; an on-page explanation states that all 15 scenarios make up the Hero case story and that membership does not change the score.

## Scenario numbers on journey maps — September 10

Customer journey and Hero case nodes now display their mapped `S1–S15` scenario numbers directly on the canvas. Shared nodes retain each distinct number, and the selected node changes its badges to amber. The labels are generated from the same mapping used by the scenario popup, so canvas labels and popup content remain aligned.

## Hero case business stories — September 10

Each of the 15 Hero case scenario popups now begins with a distinct business story grounded in the Entity A / Entity B / Person T case and Morgan's relationship-manager role. The story changes with the scenario selected at a shared node and follows the Studio's English or Simplified Chinese setting. Customer journey popups remain focused on reusable source mapping.
