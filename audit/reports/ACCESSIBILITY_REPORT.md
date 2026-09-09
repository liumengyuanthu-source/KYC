# Accessibility — first pass

Result: REVIEW. 23 fresh axe scans. 0 serious/critical violation groups. 19 total violation groups, with repeated headings counted per page.

Native modal Tab containment (20 advances), Escape and source-focus return are tested in surfaces-results/context-extra-results. Customize keyboard entry, non-drag move buttons and reduced-motion/touch input are covered by host checks. Visible focus outline is checked on source disclosure. 12 viewport/language combinations checked for horizontal page overflow.

## Automated findings

| Surface evidence | Rule | Impact | Nodes |
|---|---|---|---|
| ROLE-CLIENT.json | page-has-heading-one | moderate | 1 |
| ROLE-REVIEWER.json | page-has-heading-one | moderate | 1 |
| ROLE-RM.json | page-has-heading-one | moderate | 1 |
| cases-active.json | heading-order | moderate | 1 |
| cases-archived.json | heading-order | moderate | 1 |
| cases-my_completed_work.json | heading-order | moderate | 1 |
| identity.assessed.en-AU.json | page-has-heading-one | moderate | 1 |
| identity.client.en-AU.json | heading-order | moderate | 1 |
| identity.received.en-AU.json | heading-order | moderate | 1 |
| identity.request.en-AU.json | heading-order | moderate | 1 |
| population.scene.en-AU.json | heading-order | moderate | 1 |
| references.return.en-US.json | heading-order | moderate | 1 |
| review.pack.en-AU.json | page-has-heading-one | moderate | 1 |
| review.referred.en-AU.json | page-has-heading-one | moderate | 1 |
| review.result.en-AU.json | page-has-heading-one | moderate | 1 |
| review.saved.en-AU.json | page-has-heading-one | moderate | 1 |
| review.unresolved.en-AU.json | page-has-heading-one | moderate | 1 |
| safe.ROLE-CLIENT.print.en-US.json | page-has-heading-one | moderate | 1 |
| safe.ROLE-RM.print.en-US.json | page-has-heading-one | moderate | 1 |

## Limits

No VoiceOver/NVDA user run, OS high-contrast review, native 200% browser zoom or comprehensive 400% reflow verification. CSS root/body text scaling is a limited probe and fixed-px typography does not fully scale. Axe incomplete items (notably contrast where backgrounds prevent certainty) remain in raw JSON for human review. Disabled controls intentionally are not keyboard actions. This is NOT WCAG certification. S2 heading fixes await Christina review.

## Manual focus defect

UX-009 status: fixed. Actual keyboard focus initially had outline-style none because the colour token was undefined; after using the existing blue token, the same keyboard check reports solid. See focus-diagnostic.json (before) and context-extra-results.json (after). Zero serious axe findings did not detect or excuse this defect.
