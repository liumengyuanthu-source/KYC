#!/usr/bin/env python3
"""Generate an evidence-based T00 and Miro readiness status report."""

from __future__ import annotations

import csv
import sys
from datetime import date
from pathlib import Path

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.validate_confidentiality import scan_tree
from scripts.validate_ids import validate_ids
from scripts.validate_sources import validate_inventory


def _miro_status(project_root: Path) -> str:
    report = project_root / "06_workshop" / "miro" / "miro_connection_report.md"
    if not report.is_file():
        return "BLOCKED"
    text = report.read_text(encoding="utf-8")
    return "BLOCKED" if "`BLOCKED`" in text else "REVIEW_REQUIRED"


def _source_rows(project_root: Path) -> list[dict[str, str]]:
    inventory = project_root / "00_sources" / "source_inventory.csv"
    if not inventory.is_file():
        return []
    with inventory.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def build_status_report(project_root: Path) -> str:
    root = project_root.resolve()
    source = validate_inventory(root, "bootstrap")
    confidentiality = scan_tree(
        root / "07_output", root / "00_governance" / "prohibited_terms.txt"
    )
    ids = validate_ids(root / "00_governance")
    miro = _miro_status(root)
    overall = (
        "PASS"
        if source.exit_code == confidentiality.exit_code == ids.exit_code == 0
        and miro != "BLOCKED"
        else "BLOCKED"
    )
    rows = _source_rows(root)
    found = [row for row in rows if row.get("Availability_Status") in {"AVAILABLE", "PROVISIONAL_EMBEDDED"}]
    missing = [row for row in rows if row.get("Availability_Status") == "MISSING"]
    issue_lines = [
        f"- `{issue.code}` — `{issue.source_id}`: {issue.message}"
        for issue in source.issues
    ] or ["- No source issues reported."]
    found_lines = [
        f"- `{row.get('Source_ID')}` — `{row.get('File_Name')}` ({row.get('Availability_Status')})"
        for row in found
    ] or ["- None."]
    missing_lines = [
        f"- `{row.get('Source_ID')}` — `{row.get('File_Name')}` (Tier {row.get('Tier')})"
        for row in missing
    ] or ["- None."]

    return "\n".join(
        [
            "# T00 Bootstrap and Miro Readiness Status",
            "",
            f"**Generated:** {date.today().isoformat()}",
            f"**Repository:** `{root}`",
            f"**Overall status:** `{overall}`",
            "",
            "## Validation summary",
            "",
            "| Check | Exit | Status |",
            "|---|---:|---|",
            f"| Source validation | {source.exit_code} | {'PASS' if source.exit_code == 0 else 'BLOCKED'} |",
            f"| Confidentiality configuration | {confidentiality.exit_code} | {'PASS' if confidentiality.exit_code == 0 else 'BLOCKED'} |",
            f"| Stable IDs | {ids.exit_code} | {'PASS' if ids.exit_code == 0 else 'BLOCKED'} |",
            f"| Miro UX0 | — | {miro} |",
            "",
            "## Sources found",
            "",
            *found_lines,
            "",
            "## Sources missing",
            "",
            *missing_lines,
            "",
            "## Source validation issues",
            "",
            *issue_lines,
            "",
            "## Miro stop state",
            "",
            "No Miro board was created or modified. CJ-T08A remains blocked before UX0 because the callable integration, approved board URL, permissions, production specification and validated pilot content are unavailable.",
            "",
            "## Precise next inputs",
            "",
            "1. The 4 September meeting transcript.",
            "2. The 4 September meeting summary.",
            "3. `Sanitised Process Map.pptx`.",
            "4. Confirmation whether Raunaq's embedded brief is the controlled source.",
            "5. Christina-approved prohibited terms.",
            "6. The approved Miro connection and full restricted-board URL.",
            "7. `Clear_to_Trade_Customer_Journey_Miro_Production_Spec_v1.md` and validated F02/F04/F09 repository sources.",
            "",
        ]
    )


def main() -> int:
    root = Path.cwd()
    output = root / "07_output" / "bootstrap_status_report.md"
    output.parent.mkdir(parents=True, exist_ok=True)
    report = build_status_report(root)
    output.write_text(report, encoding="utf-8")
    print(f"WROTE={output}")
    print("STATUS=BLOCKED" if "`BLOCKED`" in report else "STATUS=PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
