// Metadata and approved Final summaries only. Never import restricted source contents.
import model from '../diagrams/batch-c/model.mjs';
const rows=[
 ['S-C01','SRC-007','Process context: screening and independent EDD','流程背景：筛查与独立 EDD','Original source version not specified; supplied filename differs from the cited (1) name','Original process source mapped at high level only; no exact node/page locator or byte-identity claim.',
  'The approved Batch C design retains screening review and EDD as distinct work. Graph nodes are project interpretations, not verbatim bank process steps.',
  '本组已批准设计保留筛查复核与 EDD 的独立工作；图节点是项目推导，不是银行流程逐字重现。'],
 ['S-C03','SRC-015','Approved Batch B collaboration boundary','已批准 Batch B 协作边界','Approved Addendum 1.0','Source read; approved demo contract, not bank policy verification.',
  'Identity collection reuses the existing request, recipient, grant, submission and evidence-use contracts. Existing coordination and ownership items must retain their own states.',
  '身份补件复用既有请求、接收人、授权、提交与证据用途合同；原协调和所有权事项保留各自状态。'],
 ['S-C06','SRC-016:S-C06','P0/P1 boundary — original source unavailable','P0/P1 边界——原始来源未取得','Original P0/P1 version unavailable','Original P0/P1 document not found; only the approved Final restatement is available. No independent source verification.',
  'The Final restatement requires full return paths and honest readiness: completing a visible task does not close unrelated or unknown conditions. The missing original remains a source question.',
  'Final 重述要求完整返回和真实准备状态：可见任务完成不关闭其他或未知条件。缺少原始文件仍是来源问题。']
];
export const projectReferences=rows.map(([alias,id,title,titleZh,version,status,en,zh])=>{
 const families=model.families.filter(f=>f.nodes.some(n=>n.reference_aliases.includes(alias)));
 return {
  source:{source_id:id,title,title_zh:titleZh,publisher:'Clear to Trade project source mapping',source_kind:'project_source',canonical_url:null,source_version:version,publication_date:null,region_scope:'Approved synthetic workshop summary; internal original excluded'},
  observation:{observation_id:'SRC-016:'+alias,supported_statement:zh,supported_statement_en:en,verification_status:status,verification_origin:'approved_final_summary_only',verified_at:null},
  interpretation:{why_it_matters:zh,adopt:en,adapt:'Apply only to the approved local synthetic scope and preserve source status.',avoid:'Do not infer bank policy, source verification or access to the internal original.',author:'Clear to Trade project'},
  binding:{scenario_refs:families.map(f=>f.scene),semantic_node_refs:families.flatMap(f=>f.nodes.filter(n=>n.reference_aliases.includes(alias)).map(n=>n.id)),support_kind:'approved_project_summary_not_original'}
 };
});
