from pathlib import Path

from scripts.validate_confidentiality import scan_tree


def write_terms(root: Path, text: str) -> Path:
    path = root / "terms.txt"
    path.write_text(text, encoding="utf-8")
    return path


def test_scan_detects_term_case_insensitively(tmp_path):
    target = tmp_path / "output"
    target.mkdir()
    (target / "slide.md").write_text("Restricted Example Client appears here.\n", encoding="utf-8")
    terms = write_terms(tmp_path, "example client\n")

    result = scan_tree(target, terms)

    assert result.exit_code == 1
    assert result.scanned_files == 1
    assert [(hit.path.name, hit.line_number, hit.term) for hit in result.hits] == [
        ("slide.md", 1, "example client")
    ]


def test_scan_ignores_comment_and_blank_term_lines(tmp_path):
    target = tmp_path / "output"
    target.mkdir()
    (target / "slide.txt").write_text("Commented Client", encoding="utf-8")
    terms = write_terms(tmp_path, "# Commented Client\n\nactive client\n")

    result = scan_tree(target, terms)

    assert result.exit_code == 0
    assert result.hits == ()


def test_scan_returns_configuration_error_without_active_terms(tmp_path):
    target = tmp_path / "output"
    target.mkdir()
    terms = write_terms(tmp_path, "# awaiting approval\n\n")

    result = scan_tree(target, terms)

    assert result.exit_code == 2
    assert result.configuration_error == "No active prohibited terms configured"


def test_scan_reports_zero_files_for_empty_output_directory(tmp_path):
    target = tmp_path / "output"
    target.mkdir()
    terms = write_terms(tmp_path, "example client\n")

    result = scan_tree(target, terms)

    assert result.exit_code == 0
    assert result.scanned_files == 0
    assert result.hits == ()
