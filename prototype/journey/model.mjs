// Read-only source-aligned journey catalog. Source labels are retained separately
// from design mappings; this module grants no workflow or approval authority.

const text = (en, zh) => {
  if (!zh) throw new TypeError(`Missing working zh-CN translation for: ${en}`);
  return Object.freeze({ 'en-AU': en, 'en-US': en, 'zh-CN': zh });
};
const processZh = {
  'Booking model determination':'记账模式判定', 'Client intake & triage':'客户受理与分流', 'Requirements determination':'要求判定',
  'Document sourcing':'文件与证据获取', Screening:'筛查', 'EDD assessment':'强化尽职调查评估', 'Quality Assurance':'质量保证',
  'Conflicts Check':'利益冲突检查', 'Cleared-to-trade':'获准交易', Legal:'法务', Credit:'信贷',
};

const processRows = [
  ['M0', 'S1', 'Booking model determination', false, 'SCN-SCOPE'],
  ['M1', 'S1', 'Client intake & triage', false, 'SCN-ENTITY'],
  ['M2', 'S2', 'Requirements determination', false, 'SCN-REQUIREMENTS'],
  ['M3', 'S2', 'Document sourcing', false, 'SCN-SOURCE'],
  ['M4', 'S3', 'Screening', false, 'SCN-MATCH'],
  ['M5', 'S3', 'EDD assessment', false, 'SCN-EDD'],
  ['M6', 'S4', 'Quality Assurance', false, 'SCN-QA'],
  ['M7', 'S4', 'Conflicts Check', true, 'SCN-CONFLICTS'],
  ['M8', 'S5', 'Cleared-to-trade', false, 'SCN-READINESS'],
  ['C1', 'S4', 'Legal', true, 'SCN-LEGAL'],
  ['C2', 'S4', 'Credit', true, 'SCN-CREDIT'],
];
export const processes = Object.freeze(processRows.map(([id, stage, title, parallel, anchor]) =>
  Object.freeze({ id, stage, title: text(title, processZh[title]), parallel, anchor })));

export const journeyRoles = Object.freeze([
  ['ROLE-CLIENT', 'Client', '客户'], ['ROLE-RM', 'Sales / RM (Front Office)', '销售 / 客户经理（前台）'],
  ['ROLE-KYCOPS', 'Client Fulfilment / KYC Ops', '客户履约 / KYC 运营'], ['ROLE-QA', 'QA Team', '质量保证团队'],
  ['ROLE-FINCRIME', 'Financial Crime Risk / Compliance', '金融犯罪风险 / 合规'], ['ROLE-CONFLICTS', 'Control Room', '控制室'],
  ['ROLE-LEGAL', 'Legal', '法务'], ['ROLE-CREDIT', 'Credit', '信贷'],
].map(([id, en, zh]) => Object.freeze({ id, title: text(en, zh) })));

const numbered = {
  M0: ['Determine sales location & reporting / booking entity', 'Confirm & validate approved product / service scope', 'Determine DD level', 'Record booking model'],
  M1: ['Submit onboarding request & capture initial client / relationship', 'Receive onboarding request info', 'Create onboarding case & working repository', 'Confirm client legal name & location', 'Classify client / legal entity type & triage case'],
  M2: ['Determine AML / KYC requirements & applicable reliefs', 'Determine non-AML requirements & applicable exemption (With Legal if required)', 'Consolidate requirements', 'Apply risk rating, identify EDD indicators & adjust requirements', 'Issue client requirements'],
  M3: ['Source from public & commercial sources', 'Identify residual gaps', 'Request info from client', 'Capture & validate evidence', 'Manage outstanding gaps & sourcing audit trail'],
  M4: ['Initial risk pre-screening', 'Early adverse-media screen', 'Establish screening pop.', 'Execute comprehensive screening', 'Adjudicate screening hits', 'Assess risk & materiality', 'Determine screening outcome'],
  M5: ['Initiate & assign EDD case', 'Compile EDD evidence pack', 'Assess evidencing risk factors', 'Close intelligence & gaps', 'Consult risk specialists', 'Determine EDD outcome & conditions', 'Obtain required approvals', 'Record & hand over EDD outcome'],
  M6: ['Confirm applicable requirements / CIPs', 'Check completeness', 'Validate evidence sources', 'Assess evidence sufficiency', 'Cross-check screening & EDD conditions', 'Identify & issue gaps', 'Re-review remediated items', 'Provide QA sign-off'],
  M7: ['Initiate conflicts check', 'Perform conflicts / NDA search', 'Investigate & resolve conflicts', 'Record conflict clearance'],
  M8: ['Confirm all required clearance prerequisites are complete', 'Finalise onboarding case & link supporting outputs', 'Confirm / record cleared-to-trade status', 'Record clearance timestamp', 'Communication outcome'],
  C1: ['Intake & initialise legal request', 'Determine required agreements / forms', 'Draft required agreements', 'Incorporate Credit input (if required)', 'Negotiate agreement terms', 'Obtain internal review & approvals', 'Execute agreements', 'Capture key terms & store executed documents'],
  C2: ['Determine credit requirement', 'Retrieve & validate financial / exposure data', 'Assess counterparty credit risk', 'Determine credit limit & conditions', 'Obtain credit approval', 'Provide Credit Agreement data to Legal', 'Review / approve final agreement & data'],
};
const numberedZh = {
  M0:['判定销售地点、报告及记账实体','确认并验证获批产品／服务范围','判定尽职调查级别','记录记账模式'],
  M1:['提交开户申请并采集初始客户／关系信息','接收开户申请信息','创建开户案件与工作资料库','确认客户法定名称与所在地','划分客户／法律实体类型并分流案件'],
  M2:['判定反洗钱／KYC 要求及适用减免','判定非反洗钱要求及适用豁免（必要时与法务协作）','汇总要求','应用风险评级、识别强化尽调指标并调整要求','向客户发布要求'],
  M3:['从公开及商业来源获取资料','识别剩余缺口','向客户索取信息','采集并验证证据','管理未解决缺口及资料获取审计轨迹'],
  M4:['初始风险预筛查','早期负面媒体筛查','建立筛查对象范围','执行全面筛查','裁定筛查命中','评估风险及重要性','判定筛查结论'],
  M5:['发起并分配强化尽调案件','汇编强化尽调证据包','评估风险因素的证据情况','补齐情报与缺口','咨询风险专家','判定强化尽调结论及条件','取得所需审批','记录并移交强化尽调结论'],
  M6:['确认适用要求／客户识别程序','检查完整性','验证证据来源','评估证据充分性','交叉核对筛查及强化尽调条件','识别并发出缺口','重新审查已补救项目','提供质量保证签核'],
  M7:['发起利益冲突检查','执行利益冲突／保密协议检索','调查并解决利益冲突','记录冲突清除结论'],
  M8:['确认所有必要准入前提均已完成','完成开户案件并关联支持材料','确认／记录获准交易状态','记录准入时间戳','传达结果'],
  C1:['受理并启动法务请求','判定所需协议／表单','起草所需协议','纳入信贷意见（如需要）','谈判协议条款','取得内部审查与审批','签署协议','采集关键条款并存储已签署文件'],
  C2:['判定信贷需求','获取并验证财务／敞口数据','评估交易对手信用风险','判定信贷限额及条件','取得信贷审批','向法务提供信贷协议数据','审查／批准最终协议及数据'],
};
const lanes = { M0: 'Sales / RM; Client Fulfilment / KYC Ops', M1: 'Sales / RM; Client Fulfilment / KYC Ops', M2: 'Client Fulfilment / KYC Ops', M3: 'Sales / RM; Client Fulfilment / KYC Ops', M4: 'Client Fulfilment / KYC Ops; Financial Crime Risk / Compliance', M5: 'Financial Crime Risk / Compliance', M6: 'QA Team', M7: 'Control Room', M8: 'Client Fulfilment / KYC Ops; Sales / RM', C1: 'Legal', C2: 'Credit' };

const currentSteps = Object.entries(numbered).flatMap(([prefix, titles]) => titles.map((title, index) => ({
  key: `p1:${prefix}.${index + 1}`, page: 1, number: `${prefix}.${index + 1}`,
  lane: prefix === 'M0' ? (index < 2 ? 'Sales / RM (Front Office)' : 'Client Fulfilment / KYC Ops')
    : prefix === 'M1' ? (index === 0 ? 'Sales / RM (Front Office)' : 'Client Fulfilment / KYC Ops')
    : prefix === 'M4' ? (index < 5 ? 'Client Fulfilment / KYC Ops' : 'Financial Crime Risk / Compliance')
    : prefix === 'M3' && index === 2 ? 'Client Fulfilment / KYC Ops'
    : prefix === 'M8' ? (index < 4 ? 'Client Fulfilment / KYC Ops' : 'Sales / RM (Front Office)') : lanes[prefix],
  title: text(title, numberedZh[prefix][index]), status: 'source',
})));
const targetTitles = structuredClone(numbered);
const targetTitlesZh = structuredClone(numberedZh);
targetTitles.C1[2] = 'Review drafted agreements';
targetTitlesZh.C1[2] = '审查已起草的协议';
targetTitles.M5.push('Perform EDD judgment and risk assessment', 'Approve EDD outcome and conditions');
targetTitlesZh.M5.push('执行强化尽调判断与风险评估','批准强化尽调结论及条件');
targetTitles.M7.push('Investigate potential conflicts', 'Escalate to senior manager if required', 'Confirm and record outcome');
targetTitlesZh.M7.push('调查潜在利益冲突','必要时升级至高级经理','确认并记录结论');
const targetSteps = Object.entries(targetTitles).flatMap(([prefix, titles]) => titles.map((title, index) => ({
  key: `p2:${prefix}.${index + 1}`, page: 2, number: `${prefix}.${index + 1}`,
  lane: prefix.startsWith('C') ? lanes[prefix]
    : ((prefix === 'M1' && index === 0) || (prefix === 'M8' && index === 4)) ? 'Sales / RM (Front Office)'
    : prefix === 'M5' && index >= 8 ? 'Financial Crime Risk / Compliance' : prefix === 'M7' && index >= 4 ? 'Control Room' : 'Agentic execution',
  title: text(title, targetTitlesZh[prefix][index]), status: 'source',
})));
targetSteps.push({ key: 'p2:M0.1:rm-initiation', page: 2, number: 'M0.1', lane: 'Sales / RM (Front Office)', title: text('Initiation relationship / product request','发起客户关系／产品请求'), status: 'ambiguous', note: text('Target slide 2 repeats M0.1. Retained by page, lane and local key; not silently renumbered.','目标第 2 页重复使用 M0.1；本目录按页码、泳道和本地键分别保留，不作静默重编号。') });
for (const item of targetSteps) {
  if (['p2:M1.1', 'p2:C2.1', 'p2:C2.2', 'p2:C2.6', 'p2:C2.7'].includes(item.key)) {
    item.status = 'ambiguous'; item.note = text('Source text is struck through; formatting alone does not establish deletion, automation or reassignment.','源文字带删除线；仅凭格式不足以认定该步骤已删除、自动化或重新分配。');
  }
  if (item.key === 'p2:C2.5') {
    item.status = 'ambiguous'; item.note = text('Only “Obtain” is struck through in the source; the whole activity is not treated as deleted.','源图仅对“取得”一词加删除线，因此不将整个活动视为已删除。');
  }
}
const clientContexts = [
  ['initial-information', 'M0', 'Provide initial relationship information','提供初始客户关系信息'],
  ['requirements-response', 'M2', 'Respond to requirements / clarifications','回应要求／澄清事项'],
  ['documents', 'M3', 'Provide requested documents & information','提供所需文件与信息'],
  ['screening-clarification', 'M4', 'Respond to screening clarifications / additional info','回应筛查澄清／补充信息请求'],
  ['edd-information', 'M5', 'Provide EDD information (e.g. SoF / SoW)','提供强化尽调信息（如资金来源／财富来源）'],
  ['qa-gap-response', 'M6', 'Respond to QA gap requests','回应质量检查缺口请求'],
  ['outcome', 'M8', 'Receive outcome & next steps','接收结果与后续步骤'],
].flatMap(([id, process, title, zh]) => [1, 2].map((page) => Object.freeze({
  key: `p${page}:client:${id}`, page, number: `contextual:${process}`, lane: 'Client', title: text(title,zh), status: 'source',
  note: text('Unnumbered client touchpoint anchored contextually; no source process number invented.','未编号的客户触点仅作情境锚定，不虚构源流程编号。'),
})));
const currentRmRequest = Object.freeze({ key:'p1:M3.3:rm', page:1, number:'M3.3', lane:'Sales / RM (Front Office)', title:text('Request info from client','向客户索取信息'), status:'source' });
export const sourceSteps = Object.freeze([...currentSteps, currentRmRequest, ...targetSteps, ...clientContexts].map(Object.freeze));

const refs = (prefix, from, to, extraTarget = []) => ({
  current: Array.from({ length: to - from + 1 }, (_, i) => `p1:${prefix}.${from + i}`),
  target: [...Array.from({ length: to - from + 1 }, (_, i) => `p2:${prefix}.${from + i}`), ...extraTarget],
});

const painRows = [
  ['PAIN-CLIENT-INTAKE', 4, 'Client intake', 'Information is captured in one tool but often re-keyed, rechecked or re-requested.', 'onboarding'],
  ['PAIN-REQUIREMENTS', 4, 'Requirements distillation', 'Jurisdiction-specific requirements and standard rule libraries create manual interpretation.', 'onboarding'],
  ['PAIN-KYC-ID', 4, 'KYC and ID Verification', 'Outputs do not flow cleanly into AML, tax, credit, legal and approval workflows.', 'onboarding'],
  ['PAIN-AML', 4, 'AML Screening', 'Alerts outside the onboarding journey create duplicate reviews and manual escalation.', 'onboarding'],
  ['PAIN-RISK', 4, 'Risk decisioning', 'Generic tool logic leaves compliance judgment gaps as a human problem.', 'onboarding'],
  ['PAIN-MONITORING', 4, 'Ongoing monitoring', 'Periodic-review tools are disconnected from trading activity, client priority and relationship context.', 'adjacent'],
  ['PAIN-OFFBOARDING', 4, 'Offboard', 'Exit decisions must be manually pushed across accounts, products, systems and client records.', 'adjacent'],
  ['PAIN-ORCHESTRATION', 4, 'Process orchestration', 'Tools track tasks but do not orchestrate the full journey across fragmented systems and teams.', 'onboarding'],
  ['PAIN-REPORTING', 4, 'Reporting', 'Disconnected data requires manual work to produce regulator-ready reports.', 'adjacent'],
  ['PAIN-HANDOFFS', 5, 'Multiple handoffs', 'Many touchpoints and sequential steps.', 'onboarding'],
  ['PAIN-INTERPRETATION', 5, 'Manual interpretation', 'Rules and requirements interpreted case by case.', 'onboarding'],
  ['PAIN-REPETITION', 5, 'Stakeholder repetition', 'Parallel conversations and repeated clarifications.', 'onboarding'],
  ['PAIN-FRAGMENTATION', 5, 'Fragmented systems / data', 'Siloed tools, manual data entry and inconsistent data.', 'onboarding'],
  ['PAIN-REWORK', 5, 'Re-work & duplication', 'Missing information, errors and restarted steps.', 'onboarding'],
  ['PAIN-SLOW', 5, 'Slow onboarding', 'Delays, waiting and bottlenecks throughout the process.', 'onboarding'],
];
const painZh = {
  'Client intake':['客户受理','信息虽在一个工具中采集，却经常需要重新录入、复核或再次向客户索取。'],
  'Requirements distillation':['要求梳理','不同司法辖区的要求与标准规则库仍需人工逐项解释。'],
  'KYC and ID Verification':['KYC 与身份核验','核验结果无法顺畅流转至反洗钱、税务、信贷、法务及审批流程。'],
  'AML Screening':['反洗钱筛查','在开户旅程之外产生的预警导致重复审查与人工升级。'],
  'Risk decisioning':['风险决策','通用工具逻辑留下判断缺口，仍需合规人员人工处理。'],
  'Ongoing monitoring':['持续监控','定期审查工具与交易活动、客户优先级及关系背景相互脱节。'],
  Offboard:['退出管理','退出决定需要人工同步到各账户、产品、系统和客户记录。'],
  'Process orchestration':['流程编排','工具只能追踪任务，无法跨碎片化系统与团队编排完整旅程。'],
  Reporting:['报告','数据分散在不同工具中，需要人工加工才能形成监管就绪报告。'],
  'Multiple handoffs':['多次交接','触点众多，且大量步骤按顺序交接。'],
  'Manual interpretation':['人工解释','规则和要求需要逐案人工解读。'],
  'Stakeholder repetition':['干系人重复沟通','并行沟通与重复澄清增加协调负担。'],
  'Fragmented systems / data':['系统与数据碎片化','工具彼此割裂，依赖人工录入，数据也不一致。'],
  'Re-work & duplication':['返工与重复劳动','信息缺失或错误会导致步骤重新开始。'],
  'Slow onboarding':['开户缓慢','整个流程存在延迟、等待与瓶颈。'],
};
export const pains = Object.freeze(painRows.map(([id, page, title, description, scope]) => Object.freeze({ id, page, title: text(title, painZh[title][0]), description: text(description, painZh[title][1]), scope })));

const activityZh = {
  'Provide initial relationship information':'提供初始客户关系信息', 'Respond to requirements and clarifications':'回应要求与澄清事项',
  'Provide requested documents and information':'提供所需文件与信息', 'Respond to screening clarifications':'回应筛查澄清事项',
  'Provide EDD information':'提供强化尽调信息', 'Respond to QA gap requests':'回应质量检查缺口请求', 'Receive outcome and next steps':'接收结果与后续步骤',
  'Initiate and shape relationship scope':'发起并界定客户关系范围', 'Submit onboarding request':'提交开户申请', 'Request client information':'向客户索取信息',
  'Communicate outcome':'传达办理结果', 'Determine due-diligence level and record booking model':'判定尽调级别并记录记账模式',
  'Create and triage the onboarding case':'创建并分流开户案件', 'Determine and issue requirements':'判定并发布所需材料清单',
  'Source available evidence':'获取现有证据', 'Identify and request residual gaps':'识别并索取剩余缺口材料',
  'Validate evidence and maintain sourcing trail':'验证证据并维护获取轨迹', 'Prepare and execute screening population':'准备筛查对象并执行筛查',
  'Review ambiguous screening hits':'审查不明确的筛查命中', 'Confirm and publish clearance readiness':'确认并发布准入就绪状态',
  'Check requirements and evidence sufficiency':'检查要求与证据充分性', 'Resolve gaps and provide QA sign-off':'解决缺口并完成质量签核',
  'Assess screening risk and outcome':'评估筛查风险与结论', 'Assess EDD and conditions':'评估强化尽调及其条件',
  'Initiate and search for conflicts':'发起并检索利益冲突', 'Investigate, escalate and record conflicts outcome':'调查、升级并记录冲突结论',
  'Prepare and review agreements':'准备并审查协议', 'Negotiate, approve and execute agreements':'谈判、审批并签署协议',
  'Assess credit requirement and conditions':'评估信贷需求与条件', 'Approve credit and provide agreement data':'审批信贷并提供协议数据',
};
const handoffZh = {
  'Sales / RM and Client Fulfilment':'销售／客户经理与客户履约团队', 'Client Fulfilment / KYC Ops':'客户履约／KYC 运营',
  'Financial Crime Risk / Compliance':'金融犯罪风险／合规团队', 'Sales / RM':'销售／客户经理', 'Client':'客户',
  'Client Fulfilment intake':'客户履约受理环节', 'Requirements determination':'要求判定环节', 'Client and document sourcing':'客户及文件获取环节',
  'Screening and QA':'筛查与质量保证环节', 'Financial Crime Risk / Compliance':'金融犯罪风险／合规团队',
  'Sales / RM and downstream systems':'销售／客户经理及下游系统', 'QA conditions review':'质量条件复核环节',
  'Clearance readiness':'准入就绪环节', 'EDD or case progression':'强化尽调或案件后续处理', 'QA and clearance readiness':'质量保证与准入就绪环节',
  'Control Room investigation':'控制室调查环节', 'Credit and negotiation':'信贷与协议谈判环节', 'Credit approval':'信贷审批环节',
  'Legal and clearance readiness':'法务与准入就绪环节', 'Residual-gap assessment':'剩余缺口评估环节', 'Ambiguous-hit review':'不明确命中复核环节',
  'Control Room investigation':'控制室调查环节', 'Client Fulfilment / Financial Crime':'客户履约／金融犯罪风险团队', 'QA Team':'质量保证团队',
};
const artifactRows = [
 ['client-initiate','Scoped relationship and product questions','Submitted relationship and product information; not accepted evidence','限定范围的客户关系与产品问题','客户提交的关系与产品信息；尚未构成已接受证据'],
 ['client-requirements-response','Versioned requirements and specific clarification questions','Submitted requirement responses; not accepted evidence','版本化要求与具体澄清问题','客户提交的要求答复；尚未构成已接受证据'],
 ['client-respond','Scoped document request with purpose and due date','Submitted information and documents; not accepted evidence','注明用途与期限的限定文件请求','客户提交的信息与文件；尚未构成已接受证据'],
 ['client-screening-clarification','Explained screening clarification request and requested facts','Submitted screening clarification; not a screening decision','已说明原因的筛查澄清请求及所需事实','客户提交的筛查澄清；不构成筛查决定'],
 ['client-clarify-risk','Scoped EDD questions and requested SoF / SoW material','Submitted EDD information; not an EDD approval','限定范围的强化尽调问题及资金／财富来源材料要求','客户提交的强化尽调信息；不构成强化尽调批准'],
 ['client-qa-response','Named QA evidence gap and scoped response request','Submitted QA gap response; not accepted evidence or sign-off','具名的质量证据缺口与限定答复请求','客户提交的质量缺口答复；不构成已接受证据或签核'],
 ['client-outcome','Published clearance outcome and communication context','Client-visible outcome acknowledgement and next-step questions','已发布的准入结果与沟通背景','客户可见的结果确认及后续问题'],
 ['rm-scope','Entity A relationship request and proposed FX forward scope','Scoped relationship, product, sales location and booking-entity request','实体 A 的客户关系请求及拟议外汇远期范围','限定的客户关系、产品、销售地点及记账实体请求'],
 ['rm-submit','Scoped relationship details and approved product request','Submitted onboarding request with identified unknowns','限定的客户关系详情与获批产品请求','已提交的开户申请及已识别未知项'],
 ['rm-request-info','Named residual gaps and client-safe questions','Scoped client information request with purpose and status','具名剩余缺口与可向客户提出的问题','注明用途与状态的限定客户信息请求'],
 ['rm-communicate','Recorded clearance status and permitted next steps','Client communication record and acknowledged next steps','已记录的准入状态与允许的后续步骤','客户沟通记录及已确认的后续步骤'],
 ['ops-intake','Scoped Entity A FX forward request and booking facts','Recorded DD level and versioned booking model','实体 A 外汇远期请求及记账事实','已记录的尽调级别与版本化记账模式'],
 ['ops-triage','Submitted onboarding request, legal identity facts and known unknowns','Versioned case, legal-entity classification and triage exceptions','已提交的开户请求、法律身份事实及已知未知项','版本化案件、法律实体分类及分流例外'],
 ['ops-requirements','Scoped Entity A FX forward case and applicability basis','Versioned applicability and requirements set including unknowns','限定范围的实体 A 外汇远期案件及适用要求依据','包含未知项的版本化适用性与要求清单'],
 ['ops-source','Versioned requirements and existing evidence provenance','Evidence reuse candidates and residual evidence gaps','版本化要求与现有证据溯源信息','可复用证据候选项与剩余证据缺口'],
 ['ops-gap','Residual evidence gaps, purpose and safe request channel','Versioned gap request and outstanding-item register','剩余证据缺口、用途及安全请求渠道','版本化缺口请求与未决事项清单'],
 ['ops-validate','Released evidence, provenance and stated purpose','Scoped sufficiency assessment and sourcing audit trail','已释放证据、来源信息及明确用途','限定范围的充分性评估与资料获取审计轨迹'],
 ['ops-screen','Verified entity and representative population with screening basis','Versioned query population and screening results','已核验的实体及代表人对象与筛查依据','版本化查询对象集与筛查结果'],
 ['ops-hit-review','Versioned screening results and ambiguous-hit evidence','Documented hit assessment and unresolved materiality questions','版本化筛查结果与不明确命中的证据','已记录的命中评估与未解决的重要性问题'],
 ['ops-clear','Versioned requirement, evidence, screening, EDD, QA, conflicts, Legal and Credit states','Readiness assessment and recorded clearance state','版本化要求、证据、筛查、强化尽调、质量、冲突、法务及信贷状态','就绪评估与已记录的准入状态'],
 ['qa-evidence','Named requirement version, evidence version and applicable conditions','Named sufficiency findings and evidence gaps','具名的要求版本、证据版本及适用条件','具名的充分性结论与证据缺口'],
 ['qa-signoff','Named gaps, remediation versions and screening / EDD conditions','Named re-review outcome or QA sign-off only','具名缺口、补救版本及筛查／强化尽调条件','具名复审结果或仅质量保证签核'],
 ['fcr-screen','Material screening finding, evidence and risk context','Recorded materiality assessment and screening outcome','重大筛查发现、证据及风险背景','已记录的重要性评估与筛查结论'],
 ['fcr-edd','EDD evidence pack, unresolved intelligence gaps and approval basis','Versioned EDD judgment, conditions, approval record and handoff','强化尽调证据包、未决情报缺口及审批依据','版本化强化尽调判断、条件、审批记录及移交'],
 ['control-search','Scoped entity, relationship, parties and NDA search inputs','Versioned conflicts / NDA search result and potential matches','限定的实体、关系、相关方及保密协议检索输入','版本化利益冲突／保密协议检索结果及潜在匹配'],
 ['control-resolve','Potential conflict findings, relationship context and escalation basis','Scoped conflict decision, escalation record and recorded outcome','潜在冲突发现、关系背景及升级依据','限定范围的冲突决定、升级记录及已记录结论'],
 ['legal-draft-review','Current agreement version, approved scope, Credit terms and drafting basis','Draft or reviewed agreement version with open legal issues','当前协议版本、获批范围、信贷条款及起草依据','协议草案或已审查版本及未决法律问题'],
 ['legal-execute','Reviewed agreement, approved Credit terms and verified signatory authority','Executed agreement, captured key terms and stored document record','已审查协议、获批信贷条款及已核验签署权限','已签署协议、已采集关键条款及文件存储记录'],
 ['credit-assess','Validated financial, exposure and counterparty inputs','Versioned credit-risk assessment, limit and conditions','已验证的财务、敞口及交易对手输入','版本化信用风险评估、限额及条件'],
 ['credit-approve','Versioned credit assessment, proposed limit, conditions and agreement data','Approval record and versioned Credit-to-Legal input','版本化信贷评估、拟议限额、条件及协议数据','审批记录与版本化信贷至法务输入'],
];
const artifacts = new Map(artifactRows.map(([id,input,output,inputZh,outputZh]) => [id,{input,output,inputZh,outputZh}]));
const narrativeRows = [
 ['client-initiate','客户通过分散触点提供初始关系信息，部分内容可能被重复询问。','客户针对限定问题一次提交关系与产品信息；提交内容仍须后续验证。'],
 ['client-requirements-response','客户回应不同团队提出的要求与澄清，可能需要重复说明。','客户针对汇总后的版本化要求作答，并可看到问题背景。'],
 ['client-respond','客户按多次请求提供文件与信息。','客户针对明确的剩余缺口提交文件；提交不等于证据已被接受。'],
 ['client-screening-clarification','客户回应筛查澄清与补充信息请求。','客户针对已说明原因的例外请求提交澄清；筛查结论仍由相应角色作出。'],
 ['client-clarify-risk','客户按要求提供资金来源、财富来源等强化尽调资料。','客户针对明确的强化尽调问题提供材料；判断与审批仍由授权人员完成。'],
 ['client-qa-response','客户回应质量检查发现的材料缺口。','客户针对具名缺口补交信息；补交不代表证据获接受或质量签核完成。'],
 ['client-outcome','客户等待各分散步骤完成后接收结果。','客户接收可追溯的办理结果与后续步骤。'],
 ['rm-scope','客户经理判定销售地点、记账实体及获批产品范围。','PPT 将关系／产品请求发起与代理式记账模式判定分别呈现，两个 M0.1 均被保留。'],
 ['rm-submit','客户经理提交开户请求并采集初始客户及关系信息。','目标 PPT 中 M1.1 带删除线；是否删除、自动化或重新分配尚未确定。'],
 ['rm-request-info','客户经理根据 M3.3 向客户索取缺失信息。','客户经理依据结构化剩余缺口发出限定范围的信息请求。'],
 ['rm-communicate','客户经理在准入完成后向客户传达结果。','客户经理依据已发布状态传达结果及允许的后续步骤。'],
 ['ops-intake','运营人员判定尽调级别并记录记账模式。','常规判定由代理式执行提出，分类例外仍交由人员处理。'],
 ['ops-triage','运营人员接收申请、创建案件、确认法律身份并分类分流。','常规受理由代理式执行准备，并明确呈现分类例外。'],
 ['ops-requirements','运营人员解释、汇总并发布适用要求。','目标流程生成版本化适用要求，并把未知项及例外交由人员确认。'],
 ['ops-source','运营人员从公开及商业来源获取证据。','目标流程优先识别带来源信息的可复用证据。'],
 ['ops-gap','运营人员识别剩余缺口并向客户索取信息。','目标流程汇总缺口并形成注明用途的限定请求。'],
 ['ops-validate','运营人员采集、验证证据并维护资料获取审计轨迹。','目标流程按既定用途评估证据充分性，并保留完整来源轨迹。'],
 ['ops-screen','运营人员执行预筛查、建立对象集并运行全面筛查。','目标流程准备版本化筛查对象集并执行常规查询。'],
 ['ops-hit-review','运营人员裁定筛查命中。','目标流程将不明确命中交由人员审查，并记录未决重要性问题。'],
 ['ops-clear','运营人员核对所有前提、完成案件并记录准入状态。','目标流程持续评估包括法务与信贷在内的完整就绪状态；不据此扩大审批权限。'],
 ['qa-evidence','质量团队核对要求、完整性、证据来源及充分性。','质量团队按具名版本审查证据与条件，并记录具体缺口。'],
 ['qa-signoff','质量团队交叉核对条件、发出缺口、复审补救并完成签核。','PPT 描绘代理式质量检查，但实际签核权限仍须遵循已批准控制。'],
 ['fcr-screen','金融犯罪风险／合规人员评估重要性并判定筛查结论。','常规材料由代理式流程准备，重大筛查发现仍由人员裁定。'],
 ['fcr-edd','人员汇编证据、评估风险、咨询专家、取得审批并移交结论。','M5.9 与 M5.10 明确保留人工强化尽调判断与审批，权限仍遵循已批准控制。'],
 ['control-search','控制室从 M1 信息发起冲突检查并执行冲突／保密协议检索。','冲突检查从受理阶段并行启动，而非仅作为后期顺序步骤。'],
 ['control-resolve','控制室调查、解决并记录冲突清除结论。','人员调查潜在冲突，必要时升级，并记录限定范围的冲突决定。'],
 ['legal-draft-review','受理法务请求、确定协议模板、起草协议，并按需纳入信贷输入。','PPT 将 C1.3 从起草协议改为审查协议草案。'],
 ['legal-execute','法务谈判条款、取得内部审批、签署协议并存储文件。','目标流程保留法务判断，并记录已签署协议及关键条款。'],
 ['credit-assess','信贷人员判定需求、验证财务与敞口数据，并评估风险、限额及条件。','目标 PPT 的部分信贷步骤带删除线；这尚未确定其已删除、自动化或重新分配。'],
 ['credit-approve','信贷取得审批、向法务提供协议数据并审查最终协议。','C2.5 仅“取得”一词带删除线，其他步骤的删除线也不构成权限转移依据。'],
];
const narratives = new Map(narrativeRows.map(([id,currentZh,targetZh]) => [id,{currentZh,targetZh}]));

const activity = (id, role, process, scene, title, sourceRefs, painIds, current, target, handoff) => Object.freeze({
  id, role, process, scene, title: text(title, activityZh[title]), goal: text(title, activityZh[title]),
  current: text(current, narratives.get(id).currentZh),
  target: text(target, narratives.get(id).targetZh),
  input: text(artifacts.get(id).input, artifacts.get(id).inputZh),
  output: text(artifacts.get(id).output, artifacts.get(id).outputZh),
  handoff: text(handoff, `交接至${handoffZh[handoff] || '相应后续角色或流程'}。`),
  pains: painIds, refs: Object.freeze({ current: Object.freeze(sourceRefs.current), target: Object.freeze(sourceRefs.target) }),
});

export const activities = Object.freeze([
  activity('client-initiate', 'ROLE-CLIENT', 'M0', 'SCN-SCOPE', 'Provide initial relationship information', {current:['p1:client:initial-information'],target:['p2:client:initial-information']}, ['PAIN-CLIENT-INTAKE','PAIN-REPETITION'], 'Provide information through fragmented touchpoints.', 'Provide information once against contextual requirements.', 'Sales / RM and Client Fulfilment'),
  activity('client-requirements-response', 'ROLE-CLIENT', 'M2', 'SCN-REQUIREMENTS', 'Respond to requirements and clarifications', {current:['p1:client:requirements-response'],target:['p2:client:requirements-response']}, ['PAIN-HANDOFFS','PAIN-REPETITION'], 'Respond to requirements and clarification requests.', 'Respond to a consolidated contextual requirement set.', 'Client Fulfilment / KYC Ops'),
  activity('client-respond', 'ROLE-CLIENT', 'M3', 'SCN-GAP', 'Provide requested documents and information', {current:['p1:client:documents'],target:['p2:client:documents']}, ['PAIN-HANDOFFS','PAIN-REWORK'], 'Provide documents across repeated requests.', 'Provide evidence against a visible residual gap.', 'Client Fulfilment / KYC Ops'),
  activity('client-screening-clarification', 'ROLE-CLIENT', 'M4', 'SCN-MATCH', 'Respond to screening clarifications', {current:['p1:client:screening-clarification'],target:['p2:client:screening-clarification']}, ['PAIN-AML','PAIN-REPETITION'], 'Respond to screening clarifications and additional-information requests.', 'Respond to an explained exception request.', 'Client Fulfilment / Financial Crime'),
  activity('client-clarify-risk', 'ROLE-CLIENT', 'M5', 'SCN-EDD', 'Provide EDD information', {current:['p1:client:edd-information'],target:['p2:client:edd-information']}, ['PAIN-REPETITION','PAIN-SLOW'], 'Provide source-of-funds or source-of-wealth information when requested.', 'Provide exception evidence with clear reason and status.', 'Financial Crime Risk / Compliance'),
  activity('client-qa-response', 'ROLE-CLIENT', 'M6', 'SCN-QA', 'Respond to QA gap requests', {current:['p1:client:qa-gap-response'],target:['p2:client:qa-gap-response']}, ['PAIN-REWORK','PAIN-SLOW'], 'Respond to QA gap requests.', 'Respond to a traceable evidence gap without implied approval authority.', 'QA Team'),
  activity('client-outcome', 'ROLE-CLIENT', 'M8', 'SCN-PUBLISH', 'Receive outcome and next steps', {current:['p1:client:outcome'],target:['p2:client:outcome']}, ['PAIN-SLOW'], 'Wait for an outcome across disconnected steps.', 'Receive a traceable outcome and next steps.', 'Sales / RM'),
  activity('rm-scope', 'ROLE-RM', 'M0', 'SCN-SCOPE', 'Initiate and shape relationship scope', {current:['p1:M0.1','p1:M0.2'],target:['p2:M0.1:rm-initiation','p2:M0.1','p2:M0.2']}, ['PAIN-CLIENT-INTAKE'], 'Determine location, booking entity and approved scope.', 'Initiation is shown separately from agentic booking-model determination.', 'Client Fulfilment / KYC Ops'),
  activity('rm-submit', 'ROLE-RM', 'M1', 'SCN-ENTITY', 'Submit onboarding request', refs('M1',1,1), ['PAIN-HANDOFFS','PAIN-REWORK'], 'Capture initial client and relationship information.', 'Source text is struck through; reassignment remains unresolved.', 'Client Fulfilment / KYC Ops'),
  activity('rm-request-info', 'ROLE-RM', 'M3', 'SCN-GAP', 'Request client information', {current:['p1:M3.3:rm'],target:['p2:M3.3']}, ['PAIN-REPETITION'], 'Request missing information from the client.', 'Use structured gaps to support a contextual request.', 'Client'),
  activity('rm-communicate', 'ROLE-RM', 'M8', 'SCN-PUBLISH', 'Communicate outcome', refs('M8',5,5), ['PAIN-SLOW'], 'Communicate outcome after clearance.', 'Communicate published state and next steps.', 'Client'),
  activity('ops-intake', 'ROLE-KYCOPS', 'M0', 'SCN-SCOPE', 'Determine due-diligence level and record booking model', refs('M0',3,4), ['PAIN-CLIENT-INTAKE','PAIN-INTERPRETATION'], 'Determine DD level and record the booking model.', 'Agentic execution is proposed; exceptions remain human work.', 'Client Fulfilment intake'),
  activity('ops-triage', 'ROLE-KYCOPS', 'M1', 'SCN-ENTITY', 'Create and triage the onboarding case', refs('M1',2,5), ['PAIN-CLIENT-INTAKE','PAIN-FRAGMENTATION'], 'Receive, create, identify and classify the case.', 'Execute routine intake and surface classification exceptions.', 'Requirements determination'),
  activity('ops-requirements', 'ROLE-KYCOPS', 'M2', 'SCN-REQUIREMENTS', 'Determine and issue requirements', refs('M2',1,5), ['PAIN-REQUIREMENTS','PAIN-INTERPRETATION'], 'Interpret, consolidate and issue requirements.', 'Propose dynamic requirements while preserving exception review.', 'Client and document sourcing'),
  activity('ops-source', 'ROLE-KYCOPS', 'M3', 'SCN-SOURCE', 'Source available evidence', refs('M3',1,1), ['PAIN-KYC-ID','PAIN-FRAGMENTATION'], 'Source evidence from public and commercial sources.', 'Reuse source evidence with provenance.', 'Residual-gap assessment'),
  activity('ops-gap', 'ROLE-KYCOPS', 'M3', 'SCN-GAP', 'Identify and request residual gaps', refs('M3',2,3), ['PAIN-REPETITION','PAIN-REWORK'], 'Identify gaps and request information.', 'Route a consolidated contextual gap request.', 'Client'),
  activity('ops-validate', 'ROLE-KYCOPS', 'M3', 'SCN-VALIDATE', 'Validate evidence and maintain sourcing trail', refs('M3',4,5), ['PAIN-KYC-ID','PAIN-REWORK'], 'Capture, validate and track evidence and outstanding gaps.', 'Validate evidence for purpose and preserve a traceable trail.', 'Screening and QA'),
  activity('ops-screen', 'ROLE-KYCOPS', 'M4', 'SCN-POPULATION', 'Prepare and execute screening population', refs('M4',1,4), ['PAIN-AML','PAIN-FRAGMENTATION'], 'Pre-screen, establish population and execute comprehensive screening.', 'Execute routine population preparation and screening.', 'Ambiguous-hit review'),
  activity('ops-hit-review', 'ROLE-KYCOPS', 'M4', 'SCN-MATCH', 'Review ambiguous screening hits', refs('M4',5,5), ['PAIN-AML','PAIN-INTERPRETATION'], 'Adjudicate screening hits.', 'Route ambiguous hits to human review.', 'Financial Crime Risk / Compliance'),
  activity('ops-clear', 'ROLE-KYCOPS', 'M8', 'SCN-READINESS', 'Confirm and publish clearance readiness', refs('M8',1,4), ['PAIN-ORCHESTRATION','PAIN-SLOW'], 'Confirm prerequisites, finalise the case and record clearance.', 'Continuously reassess structured state; approval authority is not inferred.', 'Sales / RM and downstream systems'),
  activity('qa-evidence', 'ROLE-QA', 'M6', 'SCN-QA', 'Check requirements and evidence sufficiency', refs('M6',1,4), ['PAIN-INTERPRETATION','PAIN-FRAGMENTATION'], 'Confirm requirements, completeness, sources and sufficiency.', 'Review evidence-backed state and exceptions.', 'QA conditions review'),
  activity('qa-signoff', 'ROLE-QA', 'M6', 'SCN-QA', 'Resolve gaps and provide QA sign-off', refs('M6',5,8), ['PAIN-REWORK','PAIN-HANDOFFS'], 'Cross-check conditions, issue gaps, re-review and sign off.', 'Target depicts agentic QA; actual sign-off authority remains unapproved.', 'Clearance readiness'),
  activity('fcr-screen', 'ROLE-FINCRIME', 'M4', 'SCN-MATCH', 'Assess screening risk and outcome', refs('M4',6,7), ['PAIN-AML','PAIN-RISK'], 'Assess materiality and determine screening outcome.', 'Adjudicate material findings; routine preparation is proposed as agentic.', 'EDD or case progression'),
  activity('fcr-edd', 'ROLE-FINCRIME', 'M5', 'SCN-EDD', 'Assess EDD and conditions', refs('M5',1,8,['p2:M5.9','p2:M5.10']), ['PAIN-RISK','PAIN-INTERPRETATION'], 'Compile evidence, assess risk, consult specialists, obtain approvals and hand over.', 'Human judgment and approval are explicit for M5.9–M5.10; authority follows approved controls.', 'QA and clearance readiness'),
  activity('control-search', 'ROLE-CONFLICTS', 'M7', 'SCN-CONFLICTS', 'Initiate and search for conflicts', refs('M7',1,2), ['PAIN-FRAGMENTATION','PAIN-HANDOFFS'], 'Initiate from M1 information and perform conflicts / NDA search.', 'Conflict checks begin from intake, not as a late sequential step.', 'Control Room investigation'),
  activity('control-resolve', 'ROLE-CONFLICTS', 'M7', 'SCN-CONFLICTS', 'Investigate, escalate and record conflicts outcome', refs('M7',3,4,['p2:M7.5','p2:M7.6','p2:M7.7']), ['PAIN-INTERPRETATION','PAIN-SLOW'], 'Investigate, resolve and record conflict clearance.', 'Human investigation, escalation and outcome recording are explicit.', 'Clearance readiness'),
  activity('legal-draft-review', 'ROLE-LEGAL', 'C1', 'SCN-LEGAL', 'Prepare and review agreements', refs('C1',1,4), ['PAIN-HANDOFFS','PAIN-REWORK'], 'Intake, determine forms, draft agreements and incorporate Credit input.', 'Target changes C1.3 from drafting to review of drafted agreements.', 'Credit and negotiation'),
  activity('legal-execute', 'ROLE-LEGAL', 'C1', 'SCN-LEGAL', 'Negotiate, approve and execute agreements', refs('C1',5,8), ['PAIN-SLOW','PAIN-FRAGMENTATION'], 'Negotiate, review, approve, execute and store agreements.', 'Retain legal judgment and traceable executed terms.', 'Clearance readiness'),
  activity('credit-assess', 'ROLE-CREDIT', 'C2', 'SCN-CREDIT', 'Assess credit requirement and conditions', refs('C2',1,4), ['PAIN-INTERPRETATION','PAIN-FRAGMENTATION'], 'Determine requirements, validate data and assess risk and limits.', 'Struck-through target activities remain ambiguous, not treated as deleted.', 'Credit approval'),
  activity('credit-approve', 'ROLE-CREDIT', 'C2', 'SCN-CREDIT', 'Approve credit and provide agreement data', refs('C2',5,7), ['PAIN-HANDOFFS','PAIN-SLOW'], 'Obtain approval, provide data to Legal and review final agreement.', 'Strike-through formatting does not establish automation or delegated authority.', 'Legal and clearance readiness'),
]);

export const activityById = (id) => activities.find((item) => item.id === id);
export const activitiesFor = ({ role, process, comparison } = {}) => activities.filter((item) =>
  (!role || item.role === role) && (!process || item.process === process) &&
  (!comparison || !['current', 'target'].includes(comparison) || item.refs[comparison].length > 0 || item.role === 'ROLE-CLIENT'));
