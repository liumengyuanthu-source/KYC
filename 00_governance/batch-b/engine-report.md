# Batch B collaboration engine report

Date: 2026-09-07  
Scope: bounded business engine only  
Source basis: `SRC-015`, the approved Batch B addendum v1.0  
Implementation fidelity: `local_simulation`

## Outcome

The engine extends Batch A `SNAP-A3` as one shared case. It reuses `DEMO-CTT-001/request/authority_gap`, adds two separately assigned request items, and preserves the Batch A case revision, unresolved booking, ownership/CDD, Legal, Credit, EDD, QA, signing, trading, and publication states. `createBatchB` fails closed unless working scope is recorded and Entity A is resolved for that scope, and returns the same state object when the extension is already present.

No real email, token, authentication, file scan, provider delivery, or bank authority is represented. The sole configured dispatch channel is `official_site_reference`; authentication and file intake are named deterministic simulations. The email adapter is explicitly `disabled_not_run`; WhatsApp has no configured policy.

## Files owned and changed

- `prototype/collaboration-engine.mjs` — fixture extension, immutable actions, authorization/version checks, safe projections.
- `prototype/tests/collaboration.test.mjs` — 25 business-engine tests covering the required engine red team and integration-boundary regressions.
- `00_governance/batch-b/engine-report.md` — this report.

No other file was edited by this engine task. No commit or push was performed.

## API and identifiers

Exports:

- `COLLAB_IDS`
- `createBatchB(input)`
- `collaborationAction(input, action)`
- `collaborationProjection(input, {audience, userId, sessionId, now})`

`COLLAB_IDS` exposes the reused request ID, two physical request-item IDs, Person T, the minimal second contributor, two recipient IDs, and two physical requirement IDs. `ITEM-AUTHORITY` and `ITEM-OWNERSHIP` remain aliases on those physical request-item records.

Accepted action envelope fields follow the brief: `type`, `role`, `expectedRevision`, `expectedRequestRevision`, `expectedItemRevision`, `itemId`, `recipientId`, `userId`, `sessionId`, `key`, `text`, `rationale`, `channel`, `intakeStatus`, `now`, and `reference`. `submit_response` validates and publishes the current `text` in that action, so it supports direct submit without a prior draft and does not silently publish an older saved draft. Accepted actions return a cloned entire case; rejected actions throw. An exact duplicate idempotency replay returns the prior input unchanged even if optimistic-lock expectations or invocation time differ. Reuse of a key by a different actor, principal, action, resource, or payload throws an idempotency-collision error.

## Shared-case collection mapping

The existing `informationRequests`, `requirements`, `evidence`, `evidenceUseAssessments`, `workItems`, and `auditEvents` collections are extended in place. The engine adds:

- `requestItems`
- `businessContacts`
- `interactionRecords`
- `requestRecipients`
- `requestAccessDecisions`
- `notifications`
- `portalInvitations`
- `accessGrants`
- `submissions`
- `channelPolicies`
- `contributorSessions`

New records carry `purpose_class`, `implementation_fidelity`, `business_validation_status`, `source_refs: ['SRC-015']`, and synthetic provenance. The reused InformationRequest receives the same Batch B metadata without rewriting unrelated historic records.

## Projection contract

All audiences receive the shared case/request identity and revisions. Client access repeats session-principal, reference, current scope, current request revision, grant status, expiry, resource-item scope, and permitted-action checks. Every projected item and submission receipt independently passes the complete current-session, current-recipient-assignment, principal, request, scope, expiry, and permitted-action validation; a superficially active but invalid extra grant cannot widen the result. A denied client projection has `allowed: false` and a reason, and contains no `items` or artifacts.

Grant evaluation also re-resolves the current recipient record and requires that it remain active, belong to the same principal, and still assign every granted item. Recipient replacement requires the current approved review/configuration, an active old assignment, a distinct active reviewed target contact, and an item that belongs to the old recipient; the atomic transition revokes old access and establishes only the intended current assignment and bounded grant. Items and evidence carry `scope_revision`. Evidence link and assessment require the exact current scope revision, as well as the artifact record revision captured by the explicit link action; an intervening intake/artifact revision or scope edit requires a fresh current-scope submission/link. Accepted actions append a readiness snapshot whose basis is the new audit event while preserving every prior snapshot.

- Client: allowlisted task fields and the caller's own safe submission receipts. Receipt data includes response text and intake status, not artifact content, staff uploader, or another submitter's identity.
- RM: client-safe progress for both request items, safe contacts, and reviewed `interactionRecords`. It contains no evidence/artifact collection or restricted reason.
- Ops: request/items, Batch B requirements and evidence, tasks, activity, contacts, notifications, submissions, assessments, grants, access decisions, recipients, contributor sessions, and current whole-case readiness.

The safe stable locator is available at `request.reference` and `demoConfig.batchB.reference`. It locates the synthetic request but is not authentication or authorization.

## State and red-team coverage

Covered engine scenarios:

- CH-01/02: unknown applicability stays unknown; a limited access grant does not establish business authority.
- CH-03/04/05: reference-only, forwarded/mismatched principal, expired grant, revoked grant, current/re-entry reads, and writes fail closed; saved drafts remain.
- CH-06: email adapter is disabled and not run; no email preview consumption path exists.
- CH-07: reviewed contact remains separate from coordination/signing/trading authority.
- CH-08: authority submission moves only that item to `under_review`; ownership stays `open`.
- CH-09/10: request approval creates no notification; dispatch and delivery remain independent, with delivery `unknown`.
- CH-11: recipient replacement validates current review/contact/access configuration, revokes old access, and atomically creates a new item-limited assignment/decision/grant rather than copying broad access.
- CH-12: restricted reasons are absent from RM/client serialized projections.
- CH-13/14: duplicate candidates remain separate and cross-reference one another; staff-assisted records retain original provider, on-behalf-of principal, uploader role, and source channel.
- CH-15/16/17: quarantine blocks assessment; release does not satisfy a requirement; only linked released evidence can support the coordination-purpose assessment; execute-agreement and trade-instruction authorities remain unchanged.
- CH-18/19: sent snapshots are request-version, scope, recipient, and item bound; edits preserve old notifications and invalidate old review/grants; exact duplicate dispatch/submission replays do not append records, while key collisions with a different fingerprint fail closed.
- CH-20: scope mismatch blocks client projection and dispatch; items and evidence are scope-revision bound, older-scope evidence cannot be relinked after a scope edit/review, and older-scope assessments project as `needs_review` rather than current.
- CH-26: unconfigured WhatsApp dispatch fails.
- CH-27: whole-case readiness remains `not_ready` after the collaboration slice.
- CH-28: session authentication remains `local_simulation` and explicitly not production-validated.

CH-21 through CH-25 are presentation/navigation/print/Lab responsibilities and are intentionally outside this engine file; the main integration suite owns them.

## TDD and verification evidence

Initial RED, against exported stubs:

```text
node --test prototype/tests/collaboration.test.mjs
tests 14; pass 0; fail 14; exit 1
First failure: Batch B collaboration engine not implemented
```

Additional RED cycles caught client question writes without grant/session checks, dispatch after scope revision change, purpose-specific requirement-ID reuse, stale/current recipient assignment, exact linked evidence revision, and readiness-snapshot continuity. A final hardening RED cycle caught mixed valid/invalid projection grants, incomplete recipient replacement validation, old-scope evidence relinking, idempotency-key collisions before authorization, and submit-time use of a stale saved draft. Each failed for the expected missing behavior before implementation.

Focused GREEN after implementation:

```text
node --test prototype/tests/collaboration.test.mjs
tests 25; pass 25; fail 0; exit 0
```

Repository prototype suite at the latest engine checkpoint:

```text
node --check prototype/collaboration-engine.mjs
node --test prototype/tests/*.test.mjs
syntax check: exit 0
tests 85; pass 85; fail 0; exit 0
```

This fresh run includes the main agent's Batch B contract, projection-rendering, navigation, print, Batch A, and runtime suites in addition to the 25 focused engine tests.

## Remaining concerns and production dependencies

- Authentication, authorization enforcement, session management, storage/audit durability, malware scanning, content validation, delivery observation, retention, and messaging are local in-memory simulations only.
- Contact/disclosure/access review permission and grant lifetime are authored demo fixtures, not confirmed bank policy. The deterministic lifetime is visibly configured as `demoConfig.batchB.grant_expires_at`, not embedded as an enforcement-policy literal.
- The ownership/control requirement remains applicability `unknown`; its item is phrased as a non-mandatory request while applicability is reviewed.
- The coordination assessment is intentionally narrow. It cannot establish declaration, agreement execution, or trade instruction authority.
- Idempotency is deterministic within the serialized shared-case event history; production requires durable server-side idempotency and concurrency controls.
- The configured fixture grant expiry is the deterministic scenario value `2026-09-08T23:59:59Z`. Production expiry policy remains open.
- Whole-case readiness stays `not_ready`; the engine does not publish, clear, sign, or trade.
