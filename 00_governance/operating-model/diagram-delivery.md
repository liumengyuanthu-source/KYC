# D4 diagram implementation and boundaries

Local Archify skill: v2.17. Uses architecture schema for explanatory relationships, not infrastructure/deployment claims. Four original r2 specifications remain unchanged in `../experiments/methodology-operating-model-r2/source/`. Current derivatives use `__MATCH` and retain original diagram IDs as parent references in `prototype/operating-model/diagram-manifest.mjs` and build manifest.

| View | Parent | Derived reading purpose |
|---|---|---|
| Overview | D4_04_operating_architecture | six original display groups, selected input/output/responsibility relationships, not six mandatory execution stages |
| Execution Choice | D4_01_agentic_suitability | inputs/access first; Human gate before simpler Skill or conditional Agent candidate alternatives |
| Skills | D4_02_agent_matrix | produces / supports / purpose constraints, not automatic execution of human judgement |
| Collaboration | D4_03_human_agent_collaboration | six authored moments; information/human pause boundaries; later example requires explicit preview |

The general r2 diagrams were authored before the current D4 analysis. Their legacy Agent labels and Human-last decision order are not the current execution assignment. Do not silently overwrite them or present them as a running system. Current derivatives reflect the new Brief, with parent lineage rather than copied legacy semantics.

## Reproducible local commands

From repo root:

```
node 04_operating_model/d4/build-diagrams.mjs
node prototype/qa/operating-model/export-diagrams.mjs
node prototype/qa/operating-model/style-diagrams.mjs
node prototype/qa/operating-model/focus-diagrams.mjs
node prototype/qa/operating-model/visual-check-diagrams.mjs
```

`validate` and `deliver` are run for each exact specification by the builder. Canonical `.archify.html` remains byte-frozen after delivery. Browser SVG exports are preserved as `.canonical.svg`; the embedded `.svg` applies publication styling (sans-serif, black/blue/white, larger text). Every node rectangle and connection path is checked unchanged, as is text containment. Publication styles are not claimed to be Archify-native styling. No real optical refraction is implemented; existing navigation glass uses backdrop blur and gradient highlights only.

Initial native Execution Choice view failed viewport containment (1440×900 scrollHeight1129). One diagnosed aspect-ratio correction preserved text, nodes and semantics; no overflow hiding. Corrected native view passes all required desktop sizes. Initial evidence remains in `diagrams/visual-summary.json`; corrected view evidence in `visual-summary-execution-choice.json`.

Three independent evidence claims: deterministic9/9showcase, browser containment/theme checks, perceptual rendered-image review. Final counts and asset hashes live under `prototype/qa/operating-model/diagrams/`. Accessible HTML content is retained if images are unavailable. No Archify player callback is assumed; host selection/narration remains read-only.
