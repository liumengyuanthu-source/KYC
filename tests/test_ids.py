import csv
from pathlib import Path

from scripts.validate_ids import validate_ids


def write_csv(path: Path, fields: list[str], rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def test_duplicate_stable_id_across_files_fails(tmp_path):
    write_csv(tmp_path / "a.csv", ["Source_ID"], [{"Source_ID": "SRC-001"}])
    write_csv(tmp_path / "b.csv", ["Source_ID"], [{"Source_ID": "SRC-001"}])

    result = validate_ids(tmp_path)

    assert result.exit_code == 1
    assert [(issue.code, issue.value) for issue in result.issues] == [
        ("DUPLICATE_ID", "SRC-001")
    ]


def test_malformed_id_for_known_column_fails(tmp_path):
    write_csv(tmp_path / "facts.csv", ["Fact_ID"], [{"Fact_ID": "BAD-1"}])

    result = validate_ids(tmp_path)

    assert result.exit_code == 1
    assert [(issue.code, issue.column) for issue in result.issues] == [
        ("MALFORMED_ID", "Fact_ID")
    ]


def test_empty_header_only_registers_pass(tmp_path):
    write_csv(tmp_path / "facts.csv", ["Fact_ID", "Source_ID"], [])

    result = validate_ids(tmp_path)

    assert result.exit_code == 0
    assert result.validated_ids == 0
    assert result.scanned_files == 1


def test_reference_to_existing_source_id_passes(tmp_path):
    write_csv(tmp_path / "sources.csv", ["Source_ID"], [{"Source_ID": "SRC-001"}])
    write_csv(
        tmp_path / "facts.csv",
        ["Fact_ID", "Source_ID"],
        [{"Fact_ID": "FACT-001", "Source_ID": "SRC-001"}],
    )

    result = validate_ids(tmp_path)

    assert result.exit_code == 0
    assert result.validated_ids == 2


def test_reference_to_unknown_source_id_fails(tmp_path):
    write_csv(
        tmp_path / "facts.csv",
        ["Fact_ID", "Source_ID"],
        [{"Fact_ID": "FACT-001", "Source_ID": "SRC-999"}],
    )

    result = validate_ids(tmp_path)

    assert result.exit_code == 1
    assert [(issue.code, issue.value) for issue in result.issues] == [
        ("UNRESOLVED_REFERENCE", "SRC-999")
    ]


def test_gate_id_is_validated_as_enum_without_registry_lookup(tmp_path):
    write_csv(
        tmp_path / "deliverables.csv",
        ["Deliverable_ID", "Gate_ID"],
        [{"Deliverable_ID": "D0", "Gate_ID": "UX1"}],
    )

    result = validate_ids(tmp_path)

    assert result.exit_code == 0
    assert result.validated_ids == 1
