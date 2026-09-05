import csv
import subprocess
import sys
from pathlib import Path

from scripts.generate_status_report import build_status_report


def test_status_report_stays_blocked_when_required_inputs_are_missing(tmp_path):
    sources = tmp_path / "00_sources"
    governance = tmp_path / "00_governance"
    output = tmp_path / "07_output"
    miro = tmp_path / "06_workshop" / "miro"
    for directory in (sources, governance, output, miro):
        directory.mkdir(parents=True, exist_ok=True)
    fields = ["Source_ID", "File_Name", "Repository_Path", "Tier", "Availability_Status"]
    with (sources / "source_inventory.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerow(
            {
                "Source_ID": "SRC-001",
                "File_Name": "required.txt",
                "Repository_Path": "00_sources/raw/required.txt",
                "Tier": "1",
                "Availability_Status": "MISSING",
            }
        )
    (governance / "prohibited_terms.txt").write_text("# awaiting approval\n", encoding="utf-8")
    (miro / "miro_connection_report.md").write_text("**Status:** `BLOCKED`\n", encoding="utf-8")

    report = build_status_report(tmp_path)

    assert "**Overall status:** `BLOCKED`" in report
    assert "Source validation | 1 | BLOCKED" in report
    assert "Confidentiality configuration | 2 | BLOCKED" in report
    assert "| Miro UX0 | — | BLOCKED |" in report


def test_status_report_script_runs_from_a_project_root(tmp_path):
    script = Path(__file__).parents[1] / "scripts" / "generate_status_report.py"

    result = subprocess.run(
        [sys.executable, str(script)],
        cwd=tmp_path,
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 0
    assert "STATUS=BLOCKED" in result.stdout
    assert (tmp_path / "07_output" / "bootstrap_status_report.md").is_file()
