# PC-01 Archify delivery

Installed skill: Archify2.17, unchanged. All diagrams use typed architecture specifications as **author work taxonomy**, with explicit `contains` labels. They do not describe deployment components, dependency timing or business execution. The neutral component renderer is only a visual primitive; its external-component icon does not imply a real system integration. Host integration uses static exports, not the standalone viewer's interactive runtime.

## Canonical assets

`prototype/reconstruction/diagram-manifest.mjs` lists12 r3 HTML/SVG pairs: BR03/04/05 × Current/To-be × zh-CN/en-AU. en-US reuses the English geometry and authored labels. Stable author IDs containing a dot are retained in registry; the manifest explicitly maps them to graph-safe IDs. No business ID changes.

Every r3 specification passed schema/render/showcase checks before `deliver`; each delivery includes exact SHA256 specification/artifact receipts. SVG files were downloaded using the actual Archify Export → SVG control. Exports were checked for all manifest node IDs and absence of scripts. No hand-drawn substitute SVG was created.

Receipts:

- `prototype/qa/d3a/diagram-build.json`:12 final validation/delivery successes plus diagnosed label-clearance repair attempts.
- `prototype/qa/d3a/diagram-exports.json`:12 export successes and SVG hashes.
- `prototype/qa/d3a/diagram-visual-summary.json`:12 actual-browser passes; each sidecar records1440×900,1600×1000,1920×1080,2048×1320 measurements and screenshots. This is bounded browser evidence, not human design approval.

The first candidate had purple dashed arrows and is not a mainline asset. r1 candidates had desktop vertical overflow. r2 passed containment but perceptual review found bottom-heavy empty space on sparse diagrams. r3 redistributes existing nodes vertically; no clipping, hidden overflow, smaller type or filler content was used to counterfeit a pass. Earlier candidates are retained as historical evidence, never linked by the mainline manifest.

## Perceptual review so far

Controller opened r3 largest-desktop screenshots for BR03 Current Chinese, BR04 To-be English and BR05 Current Chinese. Labels and connectors are readable at standalone scale, no overlaps or clipped content were seen, and sparse layouts now use the height evenly. The other locale/side permutations have automated browser evidence, not a separately claimed image-based review. Actual host two-column and mobile readability is a separate T03 verification: HTML labels remain the primary full-size reading and keyboard alternative.

## Runtime boundary

The host may select actual `data-node-id` members through the manifest and show taxonomy context. `maps_to` groups are HTML author relations, never all-to-all execution edges. Proposals have no direct Current predecessor; context source nodes must be labelled as context. Host reading/focus/filter/locale controls never call business writers. Missing SVG leaves complete HTML work and mapping lists. No media or Play completion is a business result.
