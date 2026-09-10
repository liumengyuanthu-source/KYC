export const connections = [
  {
    "from": "SCN-CREDIT|PERSONA-CREDIT",
    "to": "SCN-LEGAL|PERSONA-LEGAL",
    "from_scn": "SCN-CREDIT",
    "to_scn": "SCN-LEGAL",
    "kind": "handoff",
    "label": "Specified credit condition package → Legal incorporation review",
    "anchor": "C2.6 → C1.4",
    "status": "source_supported_parent_handoff; atomic endpoints are design projections",
    "limit": "This specific handoff does not serialize all C1 and C2 work."
  },
  {
    "from": "SCN-MATCH|PERSONA-RISK",
    "to": "SCN-GAP|PERSONA-CLIENT-T",
    "from_scn": "SCN-MATCH",
    "to_scn": "SCN-GAP",
    "kind": "loop",
    "label": "Permitted identity-evidence request → limited contributor response",
    "anchor": "",
    "status": "design_loop; exact purpose and request binding required",
    "limit": "Intermediate approval/send/access steps omitted from overview; screening_identity is separate from coordinate_information."
  },
  {
    "from": "SCN-GAP|PERSONA-CLIENT-T",
    "to": "SCN-VALIDATE|PERSONA-KYCOPS",
    "from_scn": "SCN-GAP",
    "to_scn": "SCN-VALIDATE",
    "kind": "loop",
    "label": "Submitted artifact → purpose-specific sufficiency review",
    "anchor": "",
    "status": "design_loop; not direct atomic contract link",
    "limit": "Submission does not mean sufficient, accepted or cleared; intake and adoption controls remain."
  },
  {
    "from": "SCN-VALIDATE|PERSONA-KYCOPS",
    "to": "SCN-MATCH|PERSONA-RISK",
    "from_scn": "SCN-VALIDATE",
    "to_scn": "SCN-MATCH",
    "kind": "loop",
    "label": "Return to the same finding for a supported disposition",
    "anchor": "",
    "status": "design_loop; pilot same-case/finding binding required",
    "limit": "Pilot identity evidence remains insufficient; finding remains unresolved. Return navigation writes no business event."
  },
  {
    "from": "COL|M1",
    "to": "SCN-CONFLICTS|PERSONA-CONTROL",
    "from_scn": "",
    "to_scn": "SCN-CONFLICTS",
    "kind": "early",
    "label": "can start from M1",
    "anchor": "",
    "status": "",
    "limit": "M7 can start from M1. The target map draws the M7 header beside M1 while M7.1–M7.4 stay in the M7 column — the source is ambiguous here."
  }
];
