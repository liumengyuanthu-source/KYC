# Authored comparison content — synthetic only

These values are fictional data for one bounded screening comparison. No registry, screening provider or customer system was queried. They are not bank policy, evidence thresholds or real registration identifiers. Differences in individual attributes do not automatically establish a screening disposition; the configured demo reviewer must inspect purpose-linked evidence and record a rationale.

| Logical content reference | Fixture record | Authored content |
|---|---|---|
| `synthetic:inline:registry-extract` | `DEMO-CTT-001/evidence/registry` | legal_name: Harbour Institutional Holdings (Synthetic); incorporation_jurisdiction: AU |
| `synthetic:inline:supplement-placeholder` | `DEMO-CTT-001/evidence/supplement` before receipt | Preauthored response payload: registration_reference SYN-A-104; incorporation_jurisdiction AU; entity_type synthetic_corporation. Hidden from the evidence comparison while receipt_status is missing. |
| `synthetic:inline:subject-identifier-response` | Same supplement after simulated receipt | Same authored payload becomes available for review. Receipt does not itself verify the item or assess sufficiency. |
| `SYNTHETIC-PROVIDER/possible-match/1` | `DEMO-CTT-001/finding/possible-match` | legal_name: Harbour Institutional Holdings (Provider Demo); registration_reference SYN-B-207; incorporation_jurisdiction NZ; entity_type synthetic_corporation |

The structured values live in optional string maps `Evidence.content_attributes` and `ScreeningFinding.provider_attributes`. The fixture remains the single source of these comparison values. This document explains the existing logical references; it is not an additional evidence artifact or a second state store.
