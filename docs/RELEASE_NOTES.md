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

## S1 workshop sample

The nine runtime files from `experiments/kimi-scenario-template-r01/app` were copied unchanged into `prototype/scenario-samples/m0-1/`. The sample retains its M0.1 title and content; converting it into the full Scenario 1 template is deferred. Its relative URLs work under a GitHub project path.

Verification: twelve mapping/link tests and three packaging tests passed. Chrome opened the sample in a new tab from the built `/KYC/` path; S2 retained its own detail. The in-app browser did not create a tab during the automated click test, so the sample was opened separately for preview.
