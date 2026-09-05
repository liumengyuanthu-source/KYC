import subprocess
import sys


def test_requirement_validator_refuses_to_report_success_before_t13():
    result = subprocess.run(
        [sys.executable, "scripts/validate_requirements.py"],
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 2
    assert result.stdout.strip() == "NOT_READY: requirement inputs are created by T13"
