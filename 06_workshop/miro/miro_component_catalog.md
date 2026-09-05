# Miro Component and Connector Catalogue

**Version:** 0.1
**Status:** Provisional pilot system; Xiaoming and Coco calibration required.

## Components

| ID | Purpose | Visible fields | First-draft primitive | Traceability |
|---|---|---|---|---|
| CMP-STAGE | Stage header | Stage ID, stage name, process coverage | Rounded rectangle + text | Process ID |
| CMP-LANE | Swimlane label | Role/layer name, optional owner marker | Rectangle + text | Persona or role ID where available |
| CMP-ACTION | Current action | Journey ID, title, short detail | Rounded card | Journey and process IDs |
| CMP-JOB | Job to Be Done | Persona, desired outcome | Rounded card | Persona ID |
| CMP-SYSTEM | System/tool/data | System role, source-of-truth status | Outlined card | Source or assumption ID |
| CMP-HANDOFF | Handoff/dependency | From, to, object/decision | Labelled connector note | Journey/process IDs |
| CMP-PAIN | Current friction | Pain ID, observation, evidence status | Risk-red card | Pain and source/assumption IDs |
| CMP-ROOT | Root-cause hypothesis | Category, validation tag | Assumption-yellow card | Assumption ID |
| CMP-AGENTIC | Agentic action | Action, tool/rule dependency, output | Target-green card | Journey/capability ID |
| CMP-HUMAN | Human judgment | Accountable role, decision, escalation trigger | Human-purple card | Journey/decision ID |
| CMP-STATE | Structured state | State ID, state name, blocker/ready marker | State badge/card | State ID |
| CMP-QUESTION | Open question | Question ID, owner, target gate | Yellow sticky | Question ID |
| CMP-CAPABILITY | Product capability | Capability ID, behaviour | Blue card | Capability ID |
| CMP-REQUIREMENT | Requirement hypothesis | Requirement ID, validation status | Outlined blue card | Requirement ID |
| CMP-VARIANT | Trigger variant | Trigger, delta, requirement/state effect | Orange card | Journey/process ID |

## Connectors

| ID | Meaning | Treatment | Anchoring rule |
|---|---|---|---|
| CON-REQ | Required sequence | Solid arrow | Both ends attached |
| CON-OPT | Optional path | Dashed arrow | Both ends attached |
| CON-PAR | Parallel work | Double-line or parallel label | Both ends attached |
| CON-LOOP | Remediation/rework | Curved return arrow | Both ends attached |
| CON-DEC | Decision gate | Diamond or labelled branch | Branch origin and destination attached |
| CON-DATA | Information/data movement | Thin dotted connector | Both ends attached |
| CON-STATE | State transition | Green arrow | State source and target attached |
| CON-ESC | Human escalation | Purple/red dashed arrow | Agentic source and human receiver attached |

Unanchored decorative lines are not permitted.
