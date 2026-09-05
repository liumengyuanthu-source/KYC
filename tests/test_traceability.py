import subprocess
import sys


def test_traceability_validator_refuses_to_report_success_before_t03():
    result = subprocess.run(
        [sys.executable, "scripts/validate_traceability.py"],
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 2
    assert result.stdout.strip() == "NOT_READY: traceability inputs are created by T03 and later tasks"
