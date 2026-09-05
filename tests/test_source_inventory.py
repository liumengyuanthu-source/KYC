import csv
from pathlib import Path

from scripts.validate_sources import validate_inventory


FIELDS = [
    "Source_ID",
    "File_Name",
    "Repository_Path",
    "SHA256",
    "Source_Type",
    "Tier",
    "Owner",
    "Source_Date",
    "Confidentiality",
    "Intended_Use",
    "Availability_Status",
    "Validation_Status",
    "Notes",
]


def write_inventory(root: Path, rows: list[dict[str, str]]) -> None:
    inventory = root / "00_sources" / "source_inventory.csv"
    inventory.parent.mkdir(parents=True)
    with inventory.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)


def row(source_id: str, tier: str, path: str, status: str) -> dict[str, str]:
    values = {field: "" for field in FIELDS}
    values.update(
        {
            "Source_ID": source_id,
            "File_Name": Path(path).name,
            "Repository_Path": path,
            "Tier": tier,
            "Availability_Status": status,
        }
    )
    return values


def test_bootstrap_fails_when_required_tier1_file_is_missing(tmp_path):
    write_inventory(tmp_path, [row("SRC-001", "1", "00_sources/raw/map.pptx", "MISSING")])

    result = validate_inventory(tmp_path, "bootstrap")

    assert result.exit_code == 1
    assert [(issue.code, issue.source_id) for issue in result.issues] == [
        ("MISSING_TIER1", "SRC-001")
    ]


def test_bootstrap_reports_optional_source_without_failing(tmp_path):
    write_inventory(tmp_path, [row("SRC-002", "2", "00_sources/raw/reference.pdf", "MISSING")])

    result = validate_inventory(tmp_path, "bootstrap")

    assert result.exit_code == 0
    assert [(issue.code, issue.severity) for issue in result.issues] == [
        ("MISSING_OPTIONAL", "WARNING")
    ]


def test_existing_inventory_path_must_resolve_inside_project(tmp_path):
    outside = tmp_path.parent / "outside.txt"
    outside.write_text("external", encoding="utf-8")
    write_inventory(tmp_path, [row("SRC-003", "2", str(outside), "AVAILABLE")])

    result = validate_inventory(tmp_path, "bootstrap")

    assert result.exit_code == 2
    assert [issue.code for issue in result.issues] == ["PATH_OUTSIDE_PROJECT"]


def test_duplicate_source_id_is_invalid_configuration(tmp_path):
    rows = [
        row("SRC-004", "2", "00_sources/raw/a.md", "MISSING"),
        row("SRC-004", "2", "00_sources/raw/b.md", "MISSING"),
    ]
    write_inventory(tmp_path, rows)

    result = validate_inventory(tmp_path, "bootstrap")

    assert result.exit_code == 2
    assert [issue.code for issue in result.issues] == ["DUPLICATE_SOURCE_ID"]
