# D6 audio — AUDIO-T00 discovery and dependency gate

Date: 2026-09-08. Status: local inventory completed; original D6 reconciliation blocked by missing source files. This is not D6 completion or audio acceptance.

## Sources

Read in full: `/Users/christinaliu/Downloads/Clear_to_Trade_D6_Audio_and_Music_Brief_v1.0.md`.

SHA-256: `77423ad5873f3509866a26e516014f531b54abd086352b8cb158337e3473ce00`.

Not located in supplied workspace, project sources or Downloads:

- D6 main specification v0.2, including its original media manifest.
- `Clear_to_Trade_D6_Audio_Cue_Sheet_v1.0.json`.

The brief contains six exact OM scripts. Its TIME/WORK ten-frame scripts, RM-safe alternatives, original asset IDs and full chapter/checkpoint bindings are delegated to those absent files. Do not invent them. `audio-source-extract.json` is a partial extraction from the supplied brief, NOT a replacement for the original Cue Sheet.

## Actual host / capability crosswalk

| Existing path | Observed responsibility | D6 integration constraint |
|---|---|---|
| prototype/media-host.mjs | A-group SCN-SCOPE / SCN-ENTITY media adapter; pause/destroy and sanitised paused resume snapshots | Reuse its read-only boundary; it currently accepts only DMO-A01/A02, not D6 assets |
| prototype/batch-a-media.mjs | Animated static media with Play/Pause, reduced-motion, visibility/blur stopping | No verified audio/stem/mix switching capability; do not claim otherwise |
| prototype/operating-model/content.mjs | Six authored Person T frame descriptions, original unknowns and unresolved outcome | Exact full D6 binding still needs main spec; no substitute successful ending |
| prototype/operating-model/diagram-manifest.mjs | Existing OM-F1…OM-F6 identifiers | Preserve these IDs; avoid a new frame numbering system |
| prototype/operating-model-ui.mjs | Manual collaboration controls, static reading and authored-checkpoint labels | Attach optional readable scripts inside this established surface after reconciliation |
| prototype/app.mjs | Host stop/render/navigation, OM timer, guarded Product/history transitions, print lifecycle | D6 stop must not save/discard drafts or invoke a business command |
| prototype/product-experience/temporal.mjs | Existing separate synthetic timing projection | Preserve business time versus media duration separation |
| prototype/product-experience/history.mjs | Permission-filtered history projection | Do not replace active case or invent populated historic outcomes |
| prototype/product-experience/product-experience.css and existing OM styles | Current black/blue/white warm-glass visual system | No theme rebuild or additional violet/mint palette |

No WAV, MP3, M4A, MP4, WebM, VTT or SRT files were found in the current prototype inventory. Existing rendered HTML diagrams and media frames are not audio assets.

## Local tools — observed, not inferred

- Existing project Node/Playwright/Chrome remain available from prior local work; no new browser run is counted as D6 acceptance here.
- `/Users/christinaliu/.local/bin/heygen --version` returns `v0.8.0`.
- `ffmpeg`, `ffprobe`, and `hyperframes` were not found on the current shell PATH. This is not a claim that no bundled copy exists anywhere.
- No provider login, model, catalogue, generation or rights check was called. Having a CLI does not establish audio capability, credits or permitted uses.
- `media-use` skill and audio/setup references were read. Its default new-service setup is not followed because the supplied brief prohibits new-platform installation and automatic model calls. The doctor entry includes provider/telemetry checks, so this source-gap stage uses narrow local binary/version checks instead.

## File / delta map

Created only:

- `00_governance/d6/AUDIO_T00_DISCOVERY.md` — this inventory and source gate.
- `00_governance/d6/audio-source-extract.json` — six inherited bilingual OM scripts; ten missing-script frame references; two unselected music directions; null actual assets.
- `00_governance/d6/audio-acceptance-status.json` — all AUD-01…AUD-24 remain NOT_RUN.

No prototype, engine, role policy, original registry, CSS, screenshot baseline or D5 audit evidence modified. No push, publication, purchase, email or external asset sharing.

## Remaining execution sequence

1. Receive and read D6 main v0.2, cue JSON and original manifest; reconcile IDs, all 16 scripts, checkpoint mapping, source status and intended audience.
2. AUDIO-T01: integrate supplied scripts, truthful missing-assets state, silent defaults and media-only controls. Add failing tests before implementation.
3. AUDIO-T02: prepare the supplied generic author brief and at most two audition slots. Actual audition creation, rights and Christina selection remain external review dependencies; silence does not block the core.
4. AUDIO-T03: only approved existing files with verified use scope may enter the player. Caption timings stay null until real recording alignment.
5. AUDIO-T04: verify single-source ownership, immediate stop, frame/checkpoint gates, semantic language return, static fallback, and Save/Discard/Stay without Case writes.
6. AUDIO-T05: execute AUD-01…24, report PASS/FAIL/NOT_RUN and package only the permitted version. Stop before D7 or remote publication.

The user has been asked for the absent D6 package. Missing audio alone would allow a complete silent implementation; missing approved scripts/checkpoint contracts does not justify inventing them.
