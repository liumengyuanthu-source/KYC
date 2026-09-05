#!/usr/bin/env python3
"""Validate the controlled source inventory and report readiness."""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ValidationIssue:
    code: str
    severity: str
    source_id: str
    message: str


@dataclass(frozen=True)
class ValidationResult:
    exit_code: int
    issues: tuple[ValidationIssue, ...]


def _inside(root: Path, candidate: Path) -> bool:
    try:
        candidate.resolve().relative_to(root.resolve())
    except ValueError:
        return False
    return True


def validate_inventory(project_root: Path, phase: str) -> ValidationResult:
    del phase  # The bootstrap contract is phase-compatible for later extension.
    root = project_root.resolve()
    inventory = root / "00_sources" / "source_inventory.csv"
    if not inventory.is_file():
        issue = ValidationIssue(
            "INVENTORY_MISSING", "ERROR", "", f"Inventory not found: {inventory}"
        )
        return ValidationResult(2, (issue,))

    issues: list[ValidationIssue] = []
    with inventory.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    seen: set[str] = set()
    for record in rows:
        source_id = (record.get("Source_ID") or "").strip()
        if not source_id:
            issues.append(
                ValidationIssue("SOURCE_ID_MISSING", "ERROR", "", "A source row has no ID")
            )
            continue
        if source_id in seen:
            issues.append(
                ValidationIssue(
                    "DUPLICATE_SOURCE_ID", "ERROR", source_id, f"Duplicate source ID: {source_id}"
                )
            )
            continue
        seen.add(source_id)

    if issues:
        return ValidationResult(2, tuple(issues))

    for record in rows:
        source_id = (record.get("Source_ID") or "").strip()
        tier = (record.get("Tier") or "").strip()
        status = (record.get("Availability_Status") or "").strip().upper()
        relative_path = (record.get("Repository_Path") or "").strip()
        candidate = Path(relative_path)
        if candidate.is_absolute():
            resolved = candidate
        else:
            resolved = root / candidate

        if status in {"AVAILABLE", "PROVISIONAL_EMBEDDED"} and not _inside(root, resolved):
            issues.append(
                ValidationIssue(
                    "PATH_OUTSIDE_PROJECT",
                    "ERROR",
                    source_id,
                    f"Available source path escapes project root: {relative_path}",
                )
            )
            continue

        available = status in {"AVAILABLE", "PROVISIONAL_EMBEDDED"} and resolved.is_file()
        if not available:
            if tier == "1":
                issues.append(
                    ValidationIssue(
                        "MISSING_TIER1",
                        "BLOCKER",
                        source_id,
                        f"Required Tier 1 source unavailable: {record.get('File_Name', '')}",
                    )
                )
            else:
                issues.append(
                    ValidationIssue(
                        "MISSING_OPTIONAL",
                        "WARNING",
                        source_id,
                        f"Optional source unavailable: {record.get('File_Name', '')}",
                    )
                )

    if any(issue.code in {"INVENTORY_MISSING", "SOURCE_ID_MISSING", "DUPLICATE_SOURCE_ID", "PATH_OUTSIDE_PROJECT"} for issue in issues):
        exit_code = 2
    elif any(issue.severity == "BLOCKER" for issue in issues):
        exit_code = 1
    else:
        exit_code = 0
    return ValidationResult(exit_code, tuple(issues))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--phase", default="bootstrap")
    args = parser.parse_args()
    result = validate_inventory(Path.cwd(), args.phase)
    for issue in result.issues:
        print(f"{issue.severity}: {issue.code}: {issue.source_id}: {issue.message}")
    print(f"SOURCE_VALIDATION_EXIT={result.exit_code}")
    return result.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
