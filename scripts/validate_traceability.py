#!/usr/bin/env python3
"""Traceability validator activation guard."""


def main() -> int:
    print("NOT_READY: traceability inputs are created by T03 and later tasks")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
