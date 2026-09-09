#!/usr/bin/env python3
"""Extract node inventory and Before/After delta from `Sanitised Process Map.pptx` (SRC-007).

Reads slide 1 (current state) and slide 2 (target state), recovers each shape's text and
geometry, assigns every M/C node to a swimlane by shape centre against the lane label
positions, and emits three pre-filled templates for the team to complete:

  01_process/node_dictionary.csv          INP-B1
  01_process/before_after_delta.csv       INP-B2
  04_operating_model/execution_mode_matrix.csv   INP-C1

Node titles, stages and lanes are extracted facts (SRC-007). Every other column is blank
and must be filled by a human; delta type is a geometry-derived hypothesis, not a decision.

Usage:  python3 scripts/extract_process_map.py
"""

import csv
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
EMU = 914400.0

REPO = Path(__file__).resolve().parents[1]
PPTX = REPO.parent / "Sanitised Process Map.pptx"

NODE_RE = re.compile(r"(?=(?:M\d\.\d{1,2}|C\d\.\d)\s)")
NODE_ID_RE = re.compile(r"^(M\d\.\d{1,2}|C\d\.\d)\s+(.*)$")

STAGE_NAMES = {
    "M0": "Booking model determination",
    "M1": "Client intake & triage",
    "M2": "Requirements determination",
    "M3": "Document sourcing",
    "M4": "Screening",
    "M5": "EDD assessment",
    "M6": "Quality Assurance",
    "M7": "Conflicts Check",
    "M8": "Cleared-to-trade",
    "C1": "CGM Legal",
    "C2": "Credit",
    "HITL": "Human in the loop (target only)",
}

# Lane label text -> canonical lane name. Labels sit in the left margin (x < 0.6).
LANE_LABELS = {
    "CLIENT": "Client",
    "SALES / RM (FRONT OFFICE)": "Sales / RM (Front Office)",
    "CLIENT FULFILMENT / KYC OPS": "Client Fulfilment / KYC Ops",
    "FINANCIAL CRIME RISK / COMPLIANCE": "Financial Crime Risk / Compliance",
    "RMG CONTROL ROOM": "RMG Control Room",
    "CGM LEGAL": "CGM Legal",
    "CREDIT": "Credit",
    "APPLICATIONS & SYSTEMS": "Applications & Systems",
    "AGENTIC EXECUTION": "Agentic execution",
}


def shapes(zf, slide_no):
    root = ET.fromstring(zf.read(f"ppt/slides/slide{slide_no}.xml"))
    out = []
    for sp in root.iter(P + "sp"):
        body = sp.find(P + "txBody")
        if body is None:
            continue
        paras = []
        for para in body.findall(A + "p"):
            text = "".join(t.text or "" for t in para.iter(A + "t"))
            if text.strip():
                paras.append(text.strip())
        text = re.sub(r"\s+", " ", " ".join(paras)).strip()
        if not text:
            continue
        xfrm = sp.find(P + "spPr/" + A + "xfrm")
        off = xfrm.find(A + "off") if xfrm is not None else None
        ext = xfrm.find(A + "ext") if xfrm is not None else None
        if off is None or ext is None:
            continue
        out.append(
            {
                "x": int(off.get("x")) / EMU,
                "y": int(off.get("y")) / EMU,
                "w": int(ext.get("cx")) / EMU,
                "h": int(ext.get("cy")) / EMU,
                "t": text,
            }
        )
    return out


def lane_bands(shs):
    """Lane label shapes live in the left margin; each label starts a band."""
    bands = []
    for s in shs:
        if s["x"] < 0.6 and s["t"].upper() in LANE_LABELS:
            bands.append((s["y"], LANE_LABELS[s["t"].upper()]))
    bands.sort()
    return bands


def lane_of(shape, bands, slide_no):
    if shape["t"].upper().startswith("QA TEAM"):
        return "QA Team"
    centre = shape["y"] + shape["h"] / 2
    lane = "Unassigned"
    for start, name in bands:
        if centre >= start:
            lane = name
        else:
            break
    # Slide 2: the agentic band sits above the HITL role lanes; a shape whose centre
    # falls before the first role label after "Agentic execution" belongs to the band.
    return lane


def parse_nodes(shs, bands, slide_no):
    """-> {node_id: [{title, lane, x, y}]} (list, because the map reuses some IDs)."""
    nodes = {}
    for s in shs:
        if not re.search(r"\b[MC]\d\.\d", s["t"]):
            continue
        lane = lane_of(s, bands, slide_no)
        text = re.sub(r"^QA TEAM\s+", "", s["t"])
        for chunk in NODE_RE.split(text):
            chunk = chunk.strip()
            if not chunk:
                continue
            m = NODE_ID_RE.match(chunk)
            if not m:
                continue
            nid, title = m.group(1), m.group(2).strip()
            nodes.setdefault(nid, []).append(
                {"title": title, "lane": lane, "x": round(s["x"], 2), "y": round(s["y"], 2)}
            )
    return nodes


def sort_key(nid):
    stage, sub = nid.split(".")
    return (stage[0], int(stage[1]), int(sub))


# ---------------------------------------------------------------- extraction

zf = zipfile.ZipFile(PPTX)
cur_shapes, tgt_shapes = shapes(zf, 1), shapes(zf, 2)
cur_bands, tgt_bands = lane_bands(cur_shapes), lane_bands(tgt_shapes)
cur, tgt = parse_nodes(cur_shapes, cur_bands, 1), parse_nodes(tgt_shapes, tgt_bands, 2)

# Target-only HITL activities carry no ID on the map; assign one so they are specifiable.
HITL = [
    ("HITL-01", "Resolve classification exceptions", "Client Fulfilment / KYC Ops", "M1"),
    ("HITL-02", "Resolve complex info gaps", "Client Fulfilment / KYC Ops", "M2|M3"),
    ("HITL-03", "Review ambiguous screening hits", "Client Fulfilment / KYC Ops", "M4"),
    ("HITL-04", "Support evidence gaps where needed", "Client Fulfilment / KYC Ops", "M5"),
    ("HITL-05", "Adjudicate material screening finding", "Financial Crime Risk / Compliance", "M4"),
]

all_ids = sorted(set(cur) | set(tgt), key=sort_key)

# ---------------------------------------------------------------- node_dictionary.csv

NODE_COLS = [
    "Process_ID", "Node_Title", "Stage", "Stage_Name", "Current_Lane", "Target_Lane",
    "Purpose", "Accountable_Role", "Inputs", "Outputs", "Decision_Rule_Or_Policy_Ref",
    "Blocked_By", "Blocks", "Parallel_Allowed", "Rework_Trigger", "Typical_Elapsed_Range",
    "Failure_Mode_1", "Failure_Mode_2", "System_Of_Record", "Evidence_Status", "Source_ID", "Notes",
]

rows = []
for nid in all_ids:
    c, t = cur.get(nid, []), tgt.get(nid, [])
    title = (c[0]["title"] if c else t[0]["title"])
    stage = nid.split(".")[0]
    note = ""
    for label, entries in (("current", c), ("target", t)):
        if len(entries) > 1:
            variants = " || ".join(f"{e['title']} [{e['lane']}]" for e in entries)
            note += (f"ID drawn {len(entries)} times on the {label} map: {variants}. "
                     "Confirm which is authoritative. ")
    note = note.strip()
    rows.append({
        "Process_ID": nid,
        "Node_Title": title,
        "Stage": stage,
        "Stage_Name": STAGE_NAMES.get(stage, ""),
        "Current_Lane": " | ".join(sorted({e["lane"] for e in c})) or "NOT_PRESENT",
        "Target_Lane": " | ".join(sorted({e["lane"] for e in t})) or "NOT_PRESENT",
        "Evidence_Status": "PPT_TITLE_ONLY_NEEDS_SPECIFICATION",
        "Source_ID": "SRC-007",
        "Notes": note,
    })
for hid, title, lane, stage_ref in HITL:
    rows.append({
        "Process_ID": hid, "Node_Title": title, "Stage": "HITL",
        "Stage_Name": STAGE_NAMES["HITL"], "Current_Lane": "NOT_PRESENT", "Target_Lane": lane,
        "Evidence_Status": "PPT_TITLE_ONLY_NEEDS_SPECIFICATION", "Source_ID": "SRC-007",
        "Notes": f"Target-only human activity, drawn under {stage_ref}. ID assigned by us; no ID on the map.",
    })

out = REPO / "01_process" / "node_dictionary.csv"
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=NODE_COLS)
    w.writeheader()
    for r in rows:
        w.writerow({c: r.get(c, "") for c in NODE_COLS})
print(f"{out.relative_to(REPO)}: {len(rows)} rows")

# ---------------------------------------------------------------- before_after_delta.csv

DELTA_COLS = [
    "Delta_ID", "Process_ID", "Node_Title_Current", "Node_Title_Target",
    "Current_Lane", "Target_Lane", "Delta_Type_Hypothesis", "Relationship_Tag",
    "Geometry_Confidence", "What_Changed", "Why", "Confirmed_By", "Confirmed_Delta_Type",
    "Evidence_Status", "Source_ID",
]

deltas = []
n = 0
for nid in all_ids:
    c, t = cur.get(nid, []), tgt.get(nid, [])
    n += 1
    ct = c[0]["title"] if c else ""
    tt = t[0]["title"] if t else ""
    cl = " | ".join(sorted({e["lane"] for e in c})) or "NOT_PRESENT"
    tl = " | ".join(sorted({e["lane"] for e in t})) or "NOT_PRESENT"
    if not c:
        dtype, tag, what = "Added", "", "Target only; no counterpart in the current map."
    elif not t:
        dtype, tag, what = "Removed", "", "Current only; no counterpart in the target map."
    elif ct.lower() != tt.lower():
        dtype, tag, what = "Enhanced", "Retitled", f"Title changed: '{ct}' -> '{tt}'."
    elif cl != tl:
        dtype, tag, what = "Enhanced", "Reassigned", f"Same activity, lane moved: {cl} -> {tl}."
    else:
        dtype, tag, what = "Retained", "", "Same title, same lane."
    confidence = "High"
    if len(c) > 1 or len(t) > 1:
        confidence = "Medium - ID drawn more than once"
        drawn = []
        for label, entries in (("current", c), ("target", t)):
            if len(entries) > 1:
                drawn.append(f"{label}: " + " || ".join(f"'{e['title']}' [{e['lane']}]" for e in entries))
        what = ("This ID is drawn more than once, with different titles or lanes (" + "; ".join(drawn)
                + "). The delta type below compares only the first instance of each. Rule on which is authoritative, or split the ID.")
        dtype, tag = "Unconfirmed", "Duplicate ID"
    deltas.append({
        "Delta_ID": f"BA-{n:03d}", "Process_ID": nid,
        "Node_Title_Current": ct, "Node_Title_Target": tt,
        "Current_Lane": cl, "Target_Lane": tl,
        "Delta_Type_Hypothesis": dtype, "Relationship_Tag": tag,
        "Geometry_Confidence": confidence, "What_Changed": what,
        "Evidence_Status": "DERIVED_FROM_SRC007_GEOMETRY_NEEDS_CONFIRMATION",
        "Source_ID": "SRC-007",
    })

STRUCTURAL = [
    ("HITL-01..05", "", "Resolve classification exceptions / complex info gaps / ambiguous screening hits / evidence gaps / adjudicate material finding",
     "NOT_PRESENT", "Client Fulfilment / KYC Ops; Financial Crime Risk / Compliance", "Added", "",
     "Five named human exception activities introduced as a distinct band under M1, M2/M3, M4 and M5."),
    ("LANE-AGENTIC", "", "Agentic execution band", "NOT_PRESENT", "Agentic execution", "Added", "",
     "New band spanning M0-M8; 49 of the 56 M-nodes sit inside it in the target map. Legal (C1) and Credit (C2) stay entirely outside it."),
    ("LANE-QA", "QA Team lane carrying M6.1-M6.8", "", "QA Team", "NOT_PRESENT", "Removed", "Merged",
     "QA Team lane label is absent from the target map; M6.1-M6.8 appear inside the agentic band. Confirm whether the QA function is removed, renamed, or simply not drawn."),
    ("STAGE-M7", "M7 stage header positioned after M6 (x=10.37)", "M7 stage header positioned beside M1 (x=2.68)", "L1 Processes", "L1 Processes", "Enhanced", "Resequenced",
     "Conflicts stage header moved to the front of the timeline, consistent with 'non-dependent fulfilment starts early'. Note M7.1-M7.4 still render at the original column."),
    ("CLIENT-QA2", "Respond to QA gap requests (second instance, x=10.61)", "", "Client", "NOT_PRESENT", "Removed", "",
     "One of two client QA-gap touchpoints is gone in the target. The other six client touchpoints are unchanged."),
    ("GATE-DOWNSTREAM", "Decision gate 'Downstream action?'", "", "Financial Crime Risk / Compliance", "NOT_PRESENT", "Removed", "",
     "Gate shape absent from the target map. Removed from the drawing does not necessarily mean removed from the process."),
    ("GATE-INFO", "Decision gate 'Info required'", "", "Client Fulfilment / KYC Ops", "NOT_PRESENT", "Removed", "",
     "Gate shape absent from the target map. Confirm whether it is now implicit inside agentic execution."),
    ("GATE-CREDIT", "Decision gate 'Credit required?'", "Decision gate 'Credit required?'", "Client Fulfilment / KYC Ops", "Client Fulfilment / KYC Ops", "Retained", "",
     "Only decision gate surviving in the target map."),
    ("ANNO-CONFLICT", "Annotation 'Trigger conflict check (from M1 information)'", "", "RMG Control Room", "NOT_PRESENT", "Removed", "",
     "Annotation absent in target; the early-start intent appears to be expressed by moving the M7 header instead."),
    ("ANNO-RISK", "Annotation 'Risk input; identify EDD indicators'", "", "Financial Crime Risk / Compliance", "NOT_PRESENT", "Removed", "",
     "Annotation absent in target."),
    ("SYS-LEGACY", "Salesforce/RM; Salesforce/Email intake; Fenergo Policy/CIP library + Risk rules; Fenergo/SharePoint/registries/data providers; ESR tools; ActOne/Case Management; SharePoint Workflow/Tasks; Conflicts system (TCC); FROST; downstream trading/risk systems", "",
     "Applications & Systems", "NOT_PRESENT", "Removed", "Replaced",
     "Nine current system groups reduce to three in the target. Consistent with the 4 Sep decision to replace Fenergo, but the verdict for each remaining system needs INP-D1."),
    ("SYS-NEW", "", "NICE Actimize; DocuSign, iManage", "NOT_PRESENT", "Applications & Systems", "Added", "",
     "New target systems. World-Check and RDC are retained."),
    ("SYS-KEPT", "World-Check, RDC, ESR tools, Fenergo", "World-Check, RDC", "Applications & Systems", "Applications & Systems", "Enhanced", "Reduced",
     "Screening stack narrows to World-Check and RDC."),
]
for i, (did, ct, tt, cl, tl, dtype, tag, what) in enumerate(STRUCTURAL, 1):
    deltas.append({
        "Delta_ID": f"BA-S{i:02d}", "Process_ID": did,
        "Node_Title_Current": ct, "Node_Title_Target": tt,
        "Current_Lane": cl, "Target_Lane": tl,
        "Delta_Type_Hypothesis": dtype, "Relationship_Tag": tag,
        "Geometry_Confidence": "High", "What_Changed": what,
        "Evidence_Status": "DERIVED_FROM_SRC007_GEOMETRY_NEEDS_CONFIRMATION",
        "Source_ID": "SRC-007",
    })

out = REPO / "01_process" / "before_after_delta.csv"
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=DELTA_COLS)
    w.writeheader()
    for r in deltas:
        w.writerow({c: r.get(c, "") for c in DELTA_COLS})
print(f"{out.relative_to(REPO)}: {len(deltas)} rows")

# ---------------------------------------------------------------- execution_mode_matrix.csv

EXEC_COLS = [
    "Process_ID", "Node_Title", "Target_Lane", "Map_Implies",
    "Execution_Mode_MVP", "Execution_Mode_Target", "Agent_Inputs", "Agent_Outputs",
    "Cannot_Check", "Escalation_Trigger", "Accountable_Human", "Four_Eyes_Required",
    "Override_Effect", "Audit_Fields", "Evidence_Status", "Source_ID",
]

exec_rows = []
for r in rows:
    tl = r["Target_Lane"]
    if tl == "NOT_PRESENT":
        implies = "Not in target map - confirm whether the activity is removed"
    elif tl == "Agentic execution":
        implies = "Agentic band - flavour unspecified, must be tagged"
    elif tl == "Client":
        implies = "Client-performed"
    else:
        implies = "Human lane"
    exec_rows.append({
        "Process_ID": r["Process_ID"], "Node_Title": r["Node_Title"], "Target_Lane": tl,
        "Map_Implies": implies, "Evidence_Status": "NEEDS_TAGGING", "Source_ID": "SRC-007",
    })

out = REPO / "04_operating_model" / "execution_mode_matrix.csv"
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=EXEC_COLS)
    w.writeheader()
    for r in exec_rows:
        w.writerow({c: r.get(c, "") for c in EXEC_COLS})
print(f"{out.relative_to(REPO)}: {len(exec_rows)} rows")

# ---------------------------------------------------------------- summary

from collections import Counter
counts = Counter(d["Delta_Type_Hypothesis"] for d in deltas)
print("\nDelta hypothesis summary:", dict(counts))
print("Nodes in current map:", len(cur), "| target map:", len(tgt), "| union:", len(all_ids))
