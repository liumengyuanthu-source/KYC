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
