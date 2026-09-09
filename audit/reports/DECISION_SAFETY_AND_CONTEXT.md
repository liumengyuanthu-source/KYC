# Decision Safety and Context — bounded evidence map

All PASS claims below refer to fresh audit-local execution of the named existing tests, not bank policy validation. Raw evidence: `unit-results.json`, the journey-final browser results, host result files, `context-extra-results.json`, and `time-print-results.json`.

| Oracle | Result | Evidence / qualification |
|---|---|---|
| DS-01 Screening resolved + Legal open ≠ Ready | PASS | `False Green…` and `One complete slice records a local decision…` native tests; actual Person T unresolved remains not ready |
| DS-02 Prepared recommendation ≠ approval | PASS | Journey saves review draft and asserts no screening decision; engine draft/request/referral boundaries |
| DS-03 Wrong role cannot read/execute | PASS bounded | Actual RM/client DOM/print and safe request bridge; native deny/revoked grant tests. Not production RBAC |
| DS-04 Local completion ≠ whole case clear | PASS | Native completed-local-slice preserves Legal/Credit/QA; actual unresolved result preserves all other conditions |
| DS-05 Received ≠ sufficient | PASS | Actual client receipt, quarantine/release/link, insufficient purpose assessment; earlier authority/ownership items preserved |
| DS-06 Credit approved ≠ fulfilled | PASS bounded | Existing RT-D04/05/06 and Credit state/version tests; not a production Credit decision |
| DS-07 Decision ≠ publication ≠ trade | PASS bounded | Native no-publication action + actual case `publication_status=not_requested`. Successful publication runtime NOT_RUN |
| DS-08 Unknown/empty manifest ≠ Ready | PASS | `Empty conditions and missing scope fail closed`; D5 completeness remains unknown |
| DS-09 Estimated end cannot complete work | PASS | Browser clock moved to 2027 in three languages; no business data change or calendar finish |
| DS-10 Navigation/replay/layout ≠ business action | PASS | Actual Play/Continue, language, return, future-step and optional-layout data equality checks |

| Context | Result | Evidence / qualification |
|---|---|---|
| CTX-01 Studio → Product → Studio | PASS for MATCH; Readiness route tracked separately | Current/Target→current origin; horizontal position 760→760; exact current case retained. See UX-002 for Readiness bridge and its final retest |
| CTX-02 Role changes projection only | PASS bounded | Host safe-role checks and data equality; fixture role switch is not a production access-control claim |
| CTX-03 Language changes presentation only | PASS | en-AU/en-US/zh-CN preserve original rationale and data; latest language wins on return |
| CTX-04 Future step is readonly | PASS | Each MATCH display step clicked; actual work/events unchanged |
| CTX-05 History cannot overwrite current | PASS bounded | ACL-before-search, readonly active snapshot, dirty Save/Discard/Stay and return. Full archived outcome fixtures NOT_RUN |
| CTX-06 Lab Shadow isolation | NOT_RUN full workflow | Full Lab Shadow is unavailable. Existing engine rejects unsupported shadow injection; this is not the full interaction proof |

No outcome was fabricated to turn a missing fixture into a pass. P6 supports only the reviewed demo’s unresolved/referral path; positive exclusion and production material decisions are not configured.
