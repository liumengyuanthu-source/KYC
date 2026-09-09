# Clear-to-Trade · Round A

Local, dependency-free HTML application. It is a stateful synthetic demonstration for internal design review, not a bank-connected system.

## Open

From the project root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/prototype/`. Opening `index.html` directly as a file is not supported because the shared JSON fixture is loaded over HTTP. The server binds to loopback only; do not expose this project directory publicly.

The app has no remote script/font dependencies. Archify diagrams are local static SVGs; independent viewers open in a separate tab. Business actions never call an external API or send a message.

## First slice

In Story mode open Requirements → Open product task. Confirm the authored requirement set. In Evidence, enter a rationale and confirm identity-purpose reuse. Record the residual request, then load its synthetic response. Review that response for the screening purpose. Switch the explicit simulated role to Financial Crime reviewer and record the authored disposition with rationale. Clearance remains blocked by Legal/Credit/QA, unknown EDD applicability and unconfirmed context/authority.

All role permissions are fictional demo configuration. The UI is not production access control. Client/RM/specialist viewpoints not authored as operational roles are read-only. No generic "approve client" or publication action exists.

## Persistence and navigation

One tab's `sessionStorage` holds navigation, the current fixture-derived business state, immutable prior versions and saved task drafts. No data is sent to a server. Closing the tab may end that demo session; this is not durable multi-user storage. A newly opened independent tab starts from the authored baseline. Reload preserves saved session data. Unsaved edits trigger Save / Discard / Stay when leaving within the app and the browser's native warning when leaving the document.

Studio return tokens contain origin comparison, mode, role, trigger, scene, stage and a semantic stage anchor with relative offset. Latest language preference and latest business data are not rolled back. Pan does not create history entries. The curated story cursor does not advance from free exploration. Playback is presentational and pauses at human screening review.

Print Preview renders all six paired scenarios, the nine structural entries, live condition summary and all three diagrams from content, not the visible matrix. It does not export only the current viewport. English-only client packaging and A3 detailed print have not been released.

## Verification

The current UI is the black/blue/white web-glass redesign. `glass.css` is the independent material/layout layer; `glass.mjs` handles pointer light, surface-only pressure/rebound, selection travel and compact presentation. No business schema or case-engine changes were made for this redesign. See [glass review](../07_output/2026-09-07-glass-review.md) for current screenshots, test evidence, reference provenance and material limitations. The earlier Round A screenshots/PDFs are retained as historical evidence, not screenshots of the redesign.

```sh
node --test prototype/tests/*.test.mjs
node 04_operating_model/round-a/validate-spine.mjs
.venv/bin/python -m pytest -q
node prototype/qa/glass-check.mjs
node prototype/qa/glass-proof.mjs
```

See [review handoff](../07_output/2026-09-07-round-a-review.md), [browser/print QA](qa/QA-REPORT.md), [Archify receipts](diagrams/manifest.json), and [data contract](../04_operating_model/round-a/field_dictionary.md).
