# Codex Task T00 — Repository Bootstrap and Guardrails

## Objective

Create the controlled repository, governance scaffolding and validation guardrails for the Institutional Clear-to-Trade Product pre-work. Do not create journey, product or client-facing content in this task.

## Required master document

Place `Clear_to_Trade_Codex_Master_Handoff_v1.md` in the project root and rename the repository copy to:

`CODEX_MASTER_HANDOFF.md`

Read it in full before executing this task.

## Codex execution prompt

```text
You are working on the Institutional Clear-to-Trade Product pre-work repository.

Read `CODEX_MASTER_HANDOFF.md` in full before making changes.

Execute Task T00 — Repository Bootstrap and Guardrails only.

Rules:
1. Do not execute T01 or any downstream task.
2. Preserve the exact approved neutral naming and confidentiality rules.
3. Do not name or imply any guessed client identity.
4. Do not create client-facing journey or product content in T00.
5. Create the exact repository structure, governance headers, README, validation scripts and bootstrap tests specified in T00.
6. Locate the available primary source files, but do not normalise their content yet.
7. Missing Tier 1 sources must be reported as blockers; missing secondary references must be reported as non-blocking gaps.
8. If the current directory is not a Git repository, initialise Git in the project root.
9. Run every T00 verification command.
10. Commit the completed bootstrap work with the required commit message.

At completion, stop and report:
- repository path;
- created file tree;
- Tier 1 sources found and missing;
- tests run and exact results;
- confidentiality scan result;
- risks or ambiguities;
- the precise proposed inputs for T01.

Do not continue until Christina explicitly approves T00 and authorises T01.
```

## Required completion evidence

- Repository tree
- `README.md`
- `CODEX_MASTER_HANDOFF.md`
- Governance CSV headers
- Distribution rules
- Bootstrap validation scripts
- Bootstrap tests
- Source availability report
- Test results
- Git commit hash

## Stop condition

Stop after T00. Do not execute T01.
