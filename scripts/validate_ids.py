#!/usr/bin/env python3
"""Validate stable identifiers and cross-register references."""

from __future__ import annotations

import argparse
import csv
import re
from dataclasses import dataclass
from pathlib import Path


PATTERNS = {
    "Source_ID": re.compile(r"SRC-\d{3}"),
    "Fact_ID": re.compile(r"FACT-\d{3}"),
    "Assumption_ID": re.compile(r"ASM-\d{3}"),
    "Question_ID": re.compile(r"Q-\d{3}"),
    "Decision_ID": re.compile(r"DEC-\d{3}"),
    "Change_ID": re.compile(r"CHG-\d{3}"),
    "Journey_ID": re.compile(r"J-M[0-8]-\d{2}"),
    "Pain_Point_ID": re.compile(r"PP-\d{3}"),
    "Opportunity_ID": re.compile(r"OPP-\d{3}"),
    "Hero_Event_ID": re.compile(r"HC-\d{3}"),
    "State_ID": re.compile(r"ST-[A-Z][A-Z0-9_]*-\d{3}"),
    "Capability_ID": re.compile(r"CAP-\d{3}"),
    "Requirement_ID": re.compile(r"CTT-REQ-\d{3}"),
    "Risk_ID": re.compile(r"RSK-\d{3}"),
    "Deliverable_ID": re.compile(r"(?:D(?:[0-9]|1[0-2])|T(?:0[0-9]|1[0-6])|CJ-T08[ABC])"),
    "Task_ID": re.compile(r"(?:T(?:0[0-9]|1[0-6])|CJ-T08[ABC])"),
    "Frame_ID": re.compile(r"F(?:0[0-9]|1[0-5]|00A)"),
    "Gate_ID": re.compile(r"(?:G[0-7]|UX[0-5])"),
}

NON_RESOLVING_ENUM_COLUMNS = {"Gate_ID"}


@dataclass(frozen=True)
class IdIssue:
    code: str
    path: Path
    row_number: int
    column: str
    value: str


@dataclass(frozen=True)
class IdValidationResult:
    exit_code: int
    scanned_files: int
    validated_ids: int
    issues: tuple[IdIssue, ...]


def _matches(column: str, value: str) -> bool:
    pattern = PATTERNS.get(column)
    if pattern is not None:
        return pattern.fullmatch(value) is not None
    return any(pattern.fullmatch(value) for pattern in PATTERNS.values())


def validate_ids(root: Path) -> IdValidationResult:
    paths = sorted(root.rglob("*.csv")) if root.exists() else []
    records: list[tuple[Path, list[str], int, dict[str, str]]] = []
    issues: list[IdIssue] = []
    primary_ids: dict[str, tuple[Path, int, str]] = {}

    for path in paths:
        with path.open(newline="", encoding="utf-8-sig") as handle:
            reader = csv.DictReader(handle)
            fields = reader.fieldnames or []
            for row_number, row in enumerate(reader, start=2):
                records.append((path, fields, row_number, row))
                if not fields:
                    continue
                primary_column = fields[0]
                if primary_column not in PATTERNS:
                    continue
                value = (row.get(primary_column) or "").strip()
                if not value:
                    continue
                if not _matches(primary_column, value):
                    issues.append(IdIssue("MALFORMED_ID", path, row_number, primary_column, value))
                    continue
                if value in primary_ids:
                    issues.append(IdIssue("DUPLICATE_ID", path, row_number, primary_column, value))
                    continue
                primary_ids[value] = (path, row_number, primary_column)

    for path, fields, row_number, row in records:
        if not fields:
            continue
        primary_column = fields[0]
        for column in fields[1:]:
            if not (column.endswith("_ID") or column.endswith("_IDs")):
                continue
            raw = (row.get(column) or "").strip()
            for value in (part.strip() for part in raw.split("|")):
                if not value:
                    continue
                singular = column[:-1] if column.endswith("_IDs") else column
                if not _matches(singular, value):
                    issues.append(IdIssue("MALFORMED_REFERENCE", path, row_number, column, value))
                elif column in NON_RESOLVING_ENUM_COLUMNS:
                    continue
                elif value not in primary_ids:
                    issues.append(IdIssue("UNRESOLVED_REFERENCE", path, row_number, column, value))

    return IdValidationResult(1 if issues else 0, len(paths), len(primary_ids), tuple(issues))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path)
    args = parser.parse_args()
    result = validate_ids(args.root)
    for issue in result.issues:
        print(f"{issue.code}: {issue.path}:{issue.row_number}: {issue.column}={issue.value}")
    print(f"SCANNED_CSV_FILES={result.scanned_files}")
    print(f"VALIDATED_IDS={result.validated_ids}")
    print(f"ID_VALIDATION_EXIT={result.exit_code}")
    return result.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
