# Institutional Clear-to-Trade Product

Controlled repository for the workshop pre-work of the **Institutional Clear-to-Trade Product**.

## Working rules

- Use only the approved neutral labels in `00_governance/distribution_rules.md`.
- Treat repository registers as the source of truth; Miro is an editable visual view.
- Execute one task at a time and stop at every named gate.
- Do not begin T01 until T00 has passed validation and Christina has approved it.
- Do not generate Miro content until UX0 connection, permission, source and confidentiality checks pass.
- Keep facts, assumptions, hypotheses, open questions and decisions distinct.

## Miro production states

- **V0:** Codex-generated, structurally complete and editable.
- **V0.5:** Xiaoming/Coco-refined without unapproved source-content changes.
- **V1.0:** Christina-approved and reconciled to repository sources.

## Bootstrap validation

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/python scripts/validate_sources.py --phase bootstrap
.venv/bin/python scripts/validate_confidentiality.py 07_output
.venv/bin/python scripts/validate_ids.py 00_governance
.venv/bin/python -m pytest -v
```

Validator unit tests may pass while the project gate remains blocked by unavailable evidence or unapproved confidentiality configuration.
