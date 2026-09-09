// Approved project interpretations, never external regulations or case evidence.
export const designReferences=[
 ['INT-C01','Population and coverage are separate','群体与覆盖分别判断',['SCN-POPULATION'],['P03','P05','P07','P08','P09','P10','P11'],'Known subsets may be prepared while the full inventory remains incomplete. Empty, failed or stale coverage cannot pass.','已知子集可以准备，全体群体仍可能不完整；空集、失败或过时覆盖不能通过。'],
 ['INT-C02','Human authority, evidence use and versions','人工权限、证据用途与版本',['SCN-MATCH'],['M02','M04','M06','M08','M10'],'Prepare, request, refer and decide are different actions. Unknown evidence or permission does not authorise a disposition.','准备、补件、移交与处置是不同动作。未知证据或权限不构成处置授权。'],
 ['INT-C03','EDD has three applicability outcomes','EDD 保留三值适用性',['SCN-EDD'],['E02','E03','E04','E07','E09'],'Required, not required and unknown need separate scope-aware handling. Unknown cannot be skipped.','适用、不适用与未知分别按范围处理，未知不能被跳过。'],
 ['INT-C04','Evidence-use changes affect linked work','证据用途变化影响关联工作',['SCN-MATCH','SCN-READINESS'],['M11'],'Retain historical inputs and decisions; re-evaluate affected current dependencies without a direct Lab write-back.','保留历史输入与决定，重评当前关联依赖，不允许 Lab 直接回写。']
].map(([id,en,zh,scenes,nodes,body,bodyZh])=>({
 source:{source_id:'SRC-016:'+id,title:en,title_zh:zh,publisher:'Clear to Trade project',source_kind:'design_interpretation',canonical_url:null,source_version:'Final 1.0',publication_date:null,region_scope:'Approved synthetic demo design; bank applicability not established'},
 observation:{observation_id:'SRC-016:'+id,supported_statement:bodyZh,supported_statement_en:body,verification_status:'Approved design interpretation, not external source verification',verification_origin:'approved_design',verified_at:null},
 interpretation:{why_it_matters:body,adopt:body,adapt:'Use existing A/B objects and action-time guards.',avoid:'Do not present this design as bank-confirmed policy.',author:'Clear to Trade project'},
 binding:{scenario_refs:scenes,semantic_node_refs:nodes,support_kind:'design_interpretation'}
}));
