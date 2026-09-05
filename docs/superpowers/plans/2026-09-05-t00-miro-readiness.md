# T00 Bootstrap and Miro Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the isolated Clear-to-Trade governance repository, testable bootstrap guardrails and local Miro-automation readiness package without inventing missing journey content or claiming that a Miro board exists.

**Architecture:** A dedicated nested Git repository isolates this work from the parent Australia Bank workspace. CSV and YAML files are authoritative structured inputs; small Python command-line validators enforce source, confidentiality and ID rules. Miro assets remain local manifests and design-system definitions until a callable Miro connection, approved board and validated journey sources are available.

**Tech Stack:** Git, Markdown, CSV, YAML, Python 3 standard library, pytest.

**Spec:** `docs/superpowers/specs/2026-09-04-clear-to-trade-prework-design.md`

## Global Constraints

- Use only `Confidential Australian Banking Client`, `Strategic APAC Banking Account`, `Institutional Clear-to-Trade Product`, or `Agentic AI KYC Clear-to-Trade Product` as project/client labels.
- Do not move, stage, scan as project output or commit files from the parent workspace.
- Work on branch `codex/clear-to-trade-bootstrap`; do not implement on `main` or `master`.
- Execute T00 and CJ-T08A readiness only; do not execute T01 or generate full journey/product content.
- Missing Tier 1 sources and an unconfigured prohibited-term list must prevent a successful T00 acceptance result.
- No board URL, credentials, OAuth data or guessed client identity may be stored.
- Do not claim Miro creation while no callable Miro tool and approved board are available.
- F04 and F09 pilot content must come from validated journey sources; do not synthesize it from the scope documents.

---

### Task 1: Establish the isolated project repository and canonical inputs

**Files:**

- Create: `.git/` through `git init`
- Create: `.gitignore`
- Create: `CODEX_MASTER_HANDOFF.md`
- Create: `00_sources/raw/Clear_to_Trade_Codex_Task_00_Bootstrap.md`
- Create: `00_sources/raw/Clear_to_Trade_Codex_Task_CJ08A_Miro_Pilot_v1.md`
- Create: `00_sources/raw/Clear_to_Trade_UXUI_Miro_Automation_Scope_v1.1.md`
- Preserve: `docs/superpowers/specs/2026-09-04-clear-to-trade-prework-design.md`
- Preserve: `docs/superpowers/plans/2026-09-05-t00-miro-readiness.md`

**Interfaces:**

- Consumes: the four supplied Markdown documents in `/Users/christinaliu/Downloads`.
- Produces: an isolated Git top-level and unchanged canonical copies for all later tasks.

- [x] **Step 1: Verify that the dedicated directory is not already its own Git top-level**

Run:

```bash
resolved=$(git rev-parse --show-toplevel 2>/dev/null || true)
test "$resolved" != "$PWD"
```

Expected: exit 0 because Git currently resolves to the parent workspace rather than this directory.

- [x] **Step 2: Initialise the dedicated repository on the implementation branch**

Run:

```bash
git init -b codex/clear-to-trade-bootstrap
git rev-parse --show-toplevel
git branch --show-current
```

Expected: top-level equals the dedicated directory and branch is `codex/clear-to-trade-bootstrap`.

- [x] **Step 3: Create the directory tree**

Create the exact Section 12 tree from `CODEX_MASTER_HANDOFF.md`, plus:

```text
06_workshop/miro/miro_frame_content/
06_workshop/miro/miro_frame_svg/
docs/superpowers/plans/
docs/superpowers/specs/
```

- [x] **Step 4: Copy source documents without modification**

Copy the master handoff to `CODEX_MASTER_HANDOFF.md`; copy the bootstrap and both Miro scope files to `00_sources/raw/` using their original basenames.

- [x] **Step 5: Verify canonical copies byte-for-byte**

Run `cmp` for each source/destination pair. Expected: all commands exit 0.

- [x] **Step 6: Create `.gitignore`**

Use:

```gitignore
.DS_Store
__pycache__/
.pytest_cache/
*.py[cod]
.coverage
htmlcov/
*.tmp
*.bak
```

- [x] **Step 7: Record repository baseline**

Run `git status --short` and retain the output for the bootstrap report.

---

### Task 2: Create governance schemas and project guidance

**Files:**

- Create: `README.md`
- Create: `00_governance/delivery_principles.md`
- Create: `00_governance/distribution_rules.md`
- Create: `00_governance/prohibited_terms.txt`
- Create: `00_governance/source_register.csv`
- Create: `00_governance/fact_register.csv`
- Create: `00_governance/assumption_register.csv`
- Create: `00_governance/open_questions.csv`
- Create: `00_governance/decision_log.csv`
- Create: `00_governance/change_log.csv`
- Create: `00_governance/deliverable_manifest.csv`
- Create: `00_governance/effort_tracker.csv`
- Create: `00_sources/source_inventory.csv`

**Interfaces:**

- Consumes: approved principles and register requirements from the master handoff and design spec.
- Produces: exact CSV schemas used by validators and downstream traceability work.

- [x] **Step 1: Create README and governance guidance**

Document the goal, neutral names, source hierarchy, one-task-at-a-time rule, T00 stop gate, Miro V0/V0.5/V1.0 model, validation commands and current blocker semantics.

- [x] **Step 2: Create the prohibited-term configuration**

Create a comments-only file explaining that Christina must approve at least one active line before T00 can pass. A comment begins with `#`; blank and comment lines are ignored.

- [x] **Step 3: Create exact governance headers**

Use these headers:

```text
source_register.csv: Source_ID,Source_Title,File_Name,Source_Type,Tier,Owner,Source_Date,Received_Date,Confidentiality,SHA256,Repository_Path,Intended_Use,Availability_Status,Provenance_Status,Validation_Status,Notes
fact_register.csv: Fact_ID,Fact_Statement,Source_ID,Source_Locator,Provenance_Status,Validation_Status,Owner,Created_Date,Last_Updated,Impacted_Artifact_IDs,Notes
assumption_register.csv: Assumption_ID,Assumption_Statement,Category,Rationale,Source_ID,Impact,Validation_Route,Owner,Target_Gate,Status,Created_Date,Last_Updated,Impacted_Artifact_IDs,Notes
open_questions.csv: Question_ID,Question,Category,Source_ID,Assumption_ID,Decision_Owner,Target_Audience,Target_Gate,Due_Date,Status,Resolution,Decision_ID,Impacted_Artifact_IDs,Notes
decision_log.csv: Decision_ID,Decision,Decision_Status,Decision_Owner,Decision_Date,Rationale,Source_ID,Supersedes_Decision_ID,Impacted_Artifact_IDs,Effective_Version,Notes
change_log.csv: Change_ID,Change_Date,Change_Type,Summary,Source_ID,Decision_ID,Changed_By,Impacted_Artifact_IDs,Previous_Status,New_Status,Validation_Result,Notes
deliverable_manifest.csv: Deliverable_ID,Deliverable_Name,Purpose,Owner,Visual_Lead,Version,Status,Due_Date,Dependencies,Gate_ID,Repository_Path,Client_Facing,Validation_Status,Last_Updated,Notes
effort_tracker.csv: Date,Person,Role,Task_ID,Deliverable_ID,Activity,Hours,Internal_Charge_Code,Opportunity_Reference,Budget_Owner,Approval_Status,Notes
source_inventory.csv: Source_ID,File_Name,Repository_Path,SHA256,Source_Type,Tier,Owner,Source_Date,Confidentiality,Intended_Use,Availability_Status,Validation_Status,Notes
```

- [x] **Step 4: Seed source and deliverable records**

Record the master, bootstrap and two Miro documents with IDs `SRC-001` through `SRC-004`. Record Tier 1 availability rows as `SRC-005` through `SRC-008`, using `MISSING` for unavailable physical sources and `PROVISIONAL_EMBEDDED` for the written brief contained in the master handoff. Seed D0–D12, T00 and CJ-T08A/B/C in the deliverable manifest with their dependencies and current status.

- [x] **Step 5: Verify every CSV parses and has a unique header**

Run a short Python read using `csv.DictReader` over all governance CSV files. Expected: every file has a non-empty field list and no duplicate columns.

---

### Task 3: Implement source validation with TDD

**Files:**

- Create: `tests/test_source_inventory.py`
- Create: `scripts/validate_sources.py`

**Interfaces:**

- Consumes: `00_sources/source_inventory.csv` and the repository filesystem.
- Produces: `validate_inventory(project_root: Path, phase: str) -> ValidationResult` and CLI exit codes `0` for pass, `1` for missing Tier 1, `2` for invalid inventory/configuration.

- [x] **Step 1: Write failing source-validator tests**

Create tests for these observable behaviours:

```python
def test_bootstrap_fails_when_required_tier1_file_is_missing(tmp_path): ...
def test_bootstrap_reports_optional_source_without_failing(tmp_path): ...
def test_existing_inventory_path_must_resolve_inside_project(tmp_path): ...
def test_duplicate_source_id_is_invalid_configuration(tmp_path): ...
```

Use literal CSV fixtures and assert the returned issue codes and CLI-compatible exit code.

- [x] **Step 2: Run the tests and verify RED**

Run:

```bash
python3 -m pytest tests/test_source_inventory.py -v
```

Expected: collection fails because `scripts.validate_sources` does not exist.

- [x] **Step 3: Implement the minimum validator**

Implement immutable dataclasses:

```python
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
```

Parse the inventory, reject duplicate IDs, reject paths escaping the project root, fail missing Tier 1 records and report missing optional records as warnings.

- [x] **Step 4: Run source tests and verify GREEN**

Run `python3 -m pytest tests/test_source_inventory.py -v`. Expected: all source tests pass.

- [x] **Step 5: Run the project source scan**

Run:

```bash
python3 scripts/validate_sources.py --phase bootstrap
```

Expected current state: exit 1 with the missing meeting transcript, meeting summary and sanitised process map listed as blockers.

---

### Task 4: Implement confidentiality validation with TDD

**Files:**

- Create: `tests/test_confidentiality.py`
- Create: `scripts/validate_confidentiality.py`

**Interfaces:**

- Consumes: scan target and `00_governance/prohibited_terms.txt`.
- Produces: `scan_tree(target: Path, terms_file: Path) -> ScanResult`; CLI exits `0` for zero hits, `1` for hits, `2` when no active approved term is configured.

- [x] **Step 1: Write failing confidentiality tests**

Create tests for:

```python
def test_scan_detects_term_case_insensitively(tmp_path): ...
def test_scan_ignores_comment_and_blank_term_lines(tmp_path): ...
def test_scan_returns_configuration_error_without_active_terms(tmp_path): ...
def test_scan_reports_zero_files_for_empty_output_directory(tmp_path): ...
```

Assert file paths, line numbers, matched terms, scanned-file count and exit codes from literal fixtures.

- [x] **Step 2: Run the tests and verify RED**

Run `python3 -m pytest tests/test_confidentiality.py -v`. Expected: collection fails because the validator module does not exist.

- [x] **Step 3: Implement the minimum scanner**

Define immutable `ConfidentialityHit` and `ScanResult` dataclasses. Scan UTF-8 text-like files recursively, skip `.git`, report unreadable files, and match active terms case-insensitively without printing file contents.

- [x] **Step 4: Run confidentiality tests and verify GREEN**

Run `python3 -m pytest tests/test_confidentiality.py -v`. Expected: all confidentiality tests pass.

- [x] **Step 5: Run the project output scan**

Run:

```bash
python3 scripts/validate_confidentiality.py 07_output
```

Expected current state: exit 2 because the prohibited-term list awaits Christina approval; do not report this as a passed confidentiality gate.

---

### Task 5: Implement stable-ID validation with TDD

**Files:**

- Create: `tests/test_ids.py`
- Create: `scripts/validate_ids.py`

**Interfaces:**

- Consumes: CSV files beneath a supplied directory.
- Produces: `validate_ids(root: Path) -> IdValidationResult`; CLI exits `0` for valid/empty registries and `1` for malformed, duplicate or unresolved IDs.

- [x] **Step 1: Write failing ID tests**

Create tests for:

```python
def test_duplicate_stable_id_across_files_fails(tmp_path): ...
def test_malformed_id_for_known_column_fails(tmp_path): ...
def test_empty_header_only_registers_pass(tmp_path): ...
def test_reference_to_existing_source_id_passes(tmp_path): ...
def test_reference_to_unknown_source_id_fails(tmp_path): ...
```

Use literal IDs and validate these prefixes: `SRC`, `FACT`, `ASM`, `Q`, `DEC`, `CHG`, `PP`, `OPP`, `HC`, `CAP`, `CTT-REQ`, `RSK`, `D`, `T`, `CJ-T`, `F` and journey IDs matching `J-M[0-8]-NN`.

- [x] **Step 2: Run the tests and verify RED**

Run `python3 -m pytest tests/test_ids.py -v`. Expected: collection fails because the validator module does not exist.

- [x] **Step 3: Implement the minimum validator**

Parse identifier and relationship columns, validate recognised formats, detect duplicates across files, and resolve non-empty relationship values split by `|`. Treat header-only registers as valid.

- [x] **Step 4: Run ID tests and verify GREEN**

Run `python3 -m pytest tests/test_ids.py -v`. Expected: all ID tests pass.

- [x] **Step 5: Run the project governance scan**

Run:

```bash
python3 scripts/validate_ids.py 00_governance
```

Expected: exit 0 with counts for scanned files and validated IDs.

---

### Task 6: Build the local Miro automation readiness package

**Files:**

- Create: `06_workshop/miro/miro_connection_report.md`
- Create: `06_workshop/miro/miro_board_manifest.yaml`
- Create: `06_workshop/miro/miro_visual_tokens.yaml`
- Create: `06_workshop/miro/miro_component_catalog.md`
- Create: `06_workshop/miro/miro_frame_manifest.csv`
- Create: `06_workshop/miro/miro_item_registry.csv`
- Create: `06_workshop/miro/miro_build_log.md`
- Create: `06_workshop/miro/miro_geometry_qa.csv`
- Create: `06_workshop/miro/miro_designer_refinement_backlog.csv`
- Create: `06_workshop/miro/miro_export_manifest.csv`
- Create: `06_workshop/miro/miro_frame_content/F00A.yaml`
- Create: `06_workshop/miro/miro_frame_content/F02.yaml`
- Create: `06_workshop/miro/miro_frame_content/F04_pilot.yaml`
- Create: `06_workshop/miro/miro_frame_content/F09_pilot.yaml`

**Interfaces:**

- Consumes: the v1.1 Miro scope and CJ-T08A pilot specification only for layout/system definitions.
- Produces: machine-readable visual tokens, schemas, frame status and an auditable `BLOCKED` connection report; it produces no fabricated journey cards.

- [x] **Step 1: Create the exact visual token YAML**

Transcribe the approved `canvas`, `colour`, `spacing`, `shape` and `text` values from v1.1 without modification.

- [x] **Step 2: Create the component and connector catalogue**

Define all `CMP-*` and `CON-*` types from v1.1, including required visible fields, intended Miro primitive, token references and traceability requirement.

- [x] **Step 3: Create the board and frame manifests**

Record F00–F15 plus F00A, their titles, priority, owners, dependencies, version and readiness. Use these exact frame-manifest columns:

```text
frame_code,frame_title,scope,priority,version,status,source_files,content_owner,visual_owner,export_type,miro_frame_id,x,y,width,height,last_updated,notes
```

- [x] **Step 4: Create registry and QA schemas**

Use the v1.1 item-registry columns verbatim. Use:

```text
miro_geometry_qa.csv: qa_id,frame_code,item_id,check_type,result,severity,details,auto_correction_applied,owner,status,last_updated
miro_designer_refinement_backlog.csv: issue_id,frame_code,item_id,category,description,recommendation,owner,priority,status,content_change_required,decision_id,last_updated
miro_export_manifest.csv: export_id,frame_code,version,format,aspect_ratio,source_board_id,output_path,confidentiality_status,traceability_status,approval_status,last_updated,notes
```

- [x] **Step 5: Create safe pilot payload shells**

F00A may contain the approved token/component definitions. F02, F04 and F09 must declare `status: BLOCKED_SOURCE_NOT_VALIDATED`, list their exact missing source paths and contain an empty `items: []` collection. This prevents scope documents from being mistaken for journey evidence.

- [x] **Step 6: Write the connection report and build log**

Record:

- Miro callable tool: unavailable;
- approved board URL and ID: not supplied;
- team and edit permission: not verifiable;
- target empty area: not verifiable;
- production spec: not found;
- validated F02/F04/F09 content sources: not found;
- direct board writes and read-back QA: not attempted;
- permitted next action: obtain inputs, rerun UX0 and then execute CJ-T08A only.

- [x] **Step 7: Validate local YAML and CSV assets**

Use Python to parse every CSV and, if PyYAML is installed, parse each YAML. If PyYAML is unavailable, perform a no-network structural check that required top-level keys and `items: []` markers exist, and record the reduced validation depth in the bootstrap report.

---

### Task 7: Create status report, verify and commit the bootstrap state

**Files:**

- Create: `scripts/validate_traceability.py`
- Create: `scripts/validate_requirements.py`
- Create: `scripts/generate_status_report.py`
- Create: `tests/test_traceability.py`
- Create: `tests/test_requirements.py`
- Create: `07_output/bootstrap_status_report.md`

**Interfaces:**

- Consumes: all T00 and Miro-readiness artifacts.
- Produces: an exact pass/blocker report and a single isolated-project commit.

- [x] **Step 1: Create safe downstream-validator scaffolds**

Each downstream validator must print `NOT_READY` with the upstream task that supplies its inputs and exit 2. The matching tests invoke the scripts and assert the exit code and message. They must never return success before their data exists.

- [x] **Step 2: Create the status-report generator**

Implement a script that runs the three bootstrap validators, captures commands and exit codes, lists found/missing sources, summarises Miro UX0 readiness and writes `07_output/bootstrap_status_report.md`. The report status is `PASS` only when all required validators exit 0; otherwise it is `BLOCKED`.

- [x] **Step 3: Run the complete test suite**

Run:

```bash
python3 -m pytest -v
```

Expected: all unit tests pass. Validator unit-test success is distinct from project gate status.

- [x] **Step 4: Run every T00 verification command**

Run:

```bash
python3 scripts/validate_sources.py --phase bootstrap
python3 scripts/validate_confidentiality.py 07_output
python3 scripts/validate_ids.py 00_governance
python3 -m pytest tests/test_source_inventory.py tests/test_confidentiality.py tests/test_ids.py -v
```

Expected project state before missing inputs are supplied: source validation exits 1, confidentiality exits 2, ID validation exits 0, and unit tests pass.

- [x] **Step 5: Generate and inspect the status report**

Run `python3 scripts/generate_status_report.py` and verify that it reports `BLOCKED` rather than `PASS`, names every blocker and proposes only the precise inputs required for T00 acceptance and CJ-T08A UX0.

- [x] **Step 6: Run confidentiality scans against staged project output**

Do not claim a passed confidentiality gate while the term configuration is unapproved. Confirm separately that no credentials, access tokens or board URLs have been written.

- [x] **Step 7: Review repository isolation**

Run:

```bash
git rev-parse --show-toplevel
git status --short
git diff --check
```

Expected: Git top-level is the dedicated project; no path outside it is staged; `git diff --check` is clean.

- [x] **Step 8: Commit the auditable blocked bootstrap**

Stage only files under the dedicated project root and commit with:

```bash
git commit -m "chore: bootstrap clear-to-trade delivery repository"
```

The completion report must describe this as an auditable bootstrap scaffold with `BLOCKED` gate status, not as a passed T00 or completed Miro pilot.
