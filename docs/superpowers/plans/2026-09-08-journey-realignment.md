# Source-aligned Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Rebuild the existing Journey around source process numbers, distinct role activities, linked pains and working scenario navigation.

**Architecture:** Add a read-only source model and Journey renderer beside the existing vanilla modules. Integrate navigation into the existing modal and product return contract without changing business engines. All views share existing SCN IDs and the same synthetic case.

**Tech Stack:** Vanilla ES modules, CSS, Node test runner, existing local Playwright / Chromium.

**Spec:** `audit/journey-source-realignment/2026-09-08-findings.md`, proposed structure explicitly approved by user on 2026-09-08 (“好的，可以，重构吧”).

## Global Constraints

- Preserve the same synthetic Entity A / FX forward case; B is reported parent and Person T's authority is not established.
- Preserve SCN IDs, business schemas, A–F engines, authorization guards, media boundaries and existing workspaces.
- Keep black / blue / white visual system; no violet or mint. Business titles dominate; source numbers are secondary.
- Retain source M0–M8, C1 and C2; distinguish duplicate Target M0.1 by source anchor. Do not infer deletion or authority from strikethrough.
- Roles: Client, RM, KYC Ops, QA, Financial Crime / Compliance, Conflicts, Legal, Credit; agentic / systems are support context, not new bank-authority roles.
- Sources: SRC-007 PPT slides 1–2 process, slides 4–5 qualitative pains. Mappings to proposed scenarios are design interpretation, not measured bank facts.
- Monitoring, offboarding and reporting remain adjacent context, not new executable workflows.
- All changes local in the user-approved existing checkout; no commits, push, publication or unrelated reset. Preserve dirty files.

## Task 1: Source model and role activity catalog

**Files:** Create `prototype/journey/model.mjs`, `prototype/tests/journey-model.test.mjs`, `03_personas_journey/source-aligned-crosswalk.md`.

**Interfaces:** Export `processes`, `journeyRoles`, `activities`, `pains`, `sourceSteps`, `activityById(id)`, `activitiesFor({role,process,comparison})`. Bilingual text is `{ 'en-AU': en, 'en-US': en, 'zh-CN': zh }`.

Data contracts:
```js
// process: {id:'M0', stage:'S1', title:Text, parallel:false, anchor:'SCN-SCOPE'}
// role: {id:'ROLE-CLIENT', title:Text}
// activity: {id:stableLocalKey, role, process:'M0', scene:'SCN-SCOPE', title:Text,
//   goal:Text, current:Text, target:Text, input:Text, output:Text, handoff:Text,
//   pains:[painKey], refs:{current:[sourceStepKey],target:[sourceStepKey]}}
// sourceStep: {key, page:1|2, number:'M0.1', lane, title:Text, status:'source'|'ambiguous', note?:Text}
// pain: {id:localKey,page:4|5,title:Text,description:Text,scope:'onboarding'|'adjacent'}
```

- [x] Write failing behavioral tests for role/process filtering, valid shared scene links, lossless source coverage, Current/Target distinct source resolution, adjacent pains excluded from executable work.
- [x] Run `node --test prototype/tests/journey-model.test.mjs`, record RED.
- [x] Implement the catalog from source PPT and existing normalized source review. All numbered source steps need a mapping or explicit source-ambiguity/adjacent classification. Unnumbered client touchpoints use contextual anchors, not invented M numbers. Every relevant source role has multiple concrete entries. Not every role/process intersection requires an activity.
- [x] Record a human-readable crosswalk, including source vs design status and Target-only changes; do not overwrite old PP IDs.
- [x] Run focused tests and report RED/GREEN and file list in the task report.

## Task 2: Journey UI, modal context and navigation

**Files:** Create `prototype/journey/ui.mjs`, `prototype/journey/journey.css`, `prototype/tests/journey-ui.test.mjs`; modify `prototype/app.mjs`, `prototype/navigation.mjs`, `prototype/index.html` only as needed.

**Interfaces:** Consume Task 1 exports. Export `journeyHtml(nav)`, `activityHtml(activity,nav)`, `journeyPrintHtml(nav)`. Import new stylesheet after existing styles. Use real buttons with `data-action="journey-activity" data-value="activity.id"`; preserve existing `scene` buttons for detailed views. Add pure navigation actions for journey lens, activity and process selection with validated IDs.

- [x] Write tests showing Current→Target keeps the selected activity, role lens does not change `nav.role` (product authority), and Product→Return restores activity/process/role lens/camera/Current with the selected language.
- [x] Run focused tests, record RED.
- [x] Render a compact process rail M0–M8 plus visibly parallel C1/C2/M7 context. Default a meaningful selected-role lens; allow All roles. Role selector changes actual content. Process cards/role lane entries open real activity views. Empty cells explicitly say no direct task, with no fake button affordance. Use an independent `journeyRole` lens so QA/Credit/Client selection cannot grant product permission.
- [x] Implement a role activity modal with role goal, Current pain, Target change, required input, output/handoff, source references, linked shared scenario and a path to the existing product task. Reuse existing detailed scene views via an explicit detail action. Source ambiguities disclosed, not silently merged. Do not hide existing Archify diagrams/media.
- [x] Replace stale six-scene-only copy and duplicate generic story numbering with descriptive beat labels and secondary source numbers. Retain approved D/E playback semantics, business read-only boundaries and existing scene workspaces.
- [x] Extend semantic camera to process anchors (not just S1–S5), preserve exact horizontal position on open/close, language and compare. Keyboard focus returns to the launching activity, Escape closes cleanly, touch scroll is native and blank-space mouse drag remains supported.
- [x] Add full Journey print output with all role activities, both Current/Target and all pains independent of viewport/selected role. Expose scoped activity print separately. Preserve other product/scene print routes.
- [x] Run focused tests and the entire `node --test prototype/tests/*.test.mjs` suite. Validate with local browser tests, desktop/mobile screenshots and print output; no remote access.

## Verification and handoff

- [x] Root independent source coverage check and task-scoped review of each increment.
- [x] Fresh browser regression: all eight roles have working entries; Current/Target, language, open/close after pan, keyboard, product return, unchanged business state, adjacent pains, full print.
- [x] Inspect saved screenshots at desktop and mobile; fix clipping and unreadable numbers.
- [x] Final review and `07_output/2026-09-08-journey-realignment-review.md` with exact results, evidence and unresolved source ambiguities.
