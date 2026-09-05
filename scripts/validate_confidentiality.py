#!/usr/bin/env python3
"""Scan shared outputs for configured prohibited terms."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path


TEXT_EXTENSIONS = {".csv", ".json", ".md", ".py", ".txt", ".yaml", ".yml"}


@dataclass(frozen=True)
class ConfidentialityHit:
    path: Path
    line_number: int
    term: str


@dataclass(frozen=True)
class ScanResult:
    exit_code: int
    scanned_files: int
    hits: tuple[ConfidentialityHit, ...]
    unreadable_files: tuple[Path, ...]
    configuration_error: str | None = None


def _active_terms(path: Path) -> tuple[str, ...]:
    if not path.is_file():
        return ()
    return tuple(
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    )


def scan_tree(target: Path, terms_file: Path) -> ScanResult:
    terms = _active_terms(terms_file)
    if not terms:
        return ScanResult(2, 0, (), (), "No active prohibited terms configured")
    if not target.exists():
        return ScanResult(2, 0, (), (), f"Scan target does not exist: {target}")

    files = (
        [target]
        if target.is_file()
        else [
            path
            for path in target.rglob("*")
            if path.is_file()
            and ".git" not in path.parts
            and path.suffix.lower() in TEXT_EXTENSIONS
        ]
    )
    hits: list[ConfidentialityHit] = []
    unreadable: list[Path] = []
    scanned = 0
    for path in sorted(files):
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except (OSError, UnicodeError):
            unreadable.append(path)
            continue
        scanned += 1
        for line_number, line in enumerate(lines, start=1):
            folded = line.casefold()
            for term in terms:
                if term.casefold() in folded:
                    hits.append(ConfidentialityHit(path, line_number, term))

    exit_code = 1 if hits or unreadable else 0
    return ScanResult(exit_code, scanned, tuple(hits), tuple(unreadable))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", type=Path)
    parser.add_argument(
        "--terms-file",
        type=Path,
        default=Path("00_governance/prohibited_terms.txt"),
    )
    args = parser.parse_args()
    result = scan_tree(args.target, args.terms_file)
    if result.configuration_error:
        print(f"ERROR: {result.configuration_error}")
    for hit in result.hits:
        print(f"HIT: {hit.path}:{hit.line_number}: {hit.term}")
    for path in result.unreadable_files:
        print(f"UNREADABLE: {path}")
    print(f"SCANNED_FILES={result.scanned_files}")
    print(f"CONFIDENTIALITY_HITS={len(result.hits)}")
    print(f"CONFIDENTIALITY_EXIT={result.exit_code}")
    return result.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
