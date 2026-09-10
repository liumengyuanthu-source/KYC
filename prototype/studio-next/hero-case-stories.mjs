const stories = {
  'SCN-SCOPE': {
    'en-US': 'Entity A asks Morgan to establish an Australian FX forward relationship. Before onboarding starts, Morgan separates the sales location, requested product, client entity and intended bank booking entity so the case begins with one clear scope.',
    'zh-CN': 'Entity A 请 Morgan 为其建立澳大利亚外汇远期业务关系。入驻开始前，Morgan 需要拆分销售地点、申请产品、客户法人和银行记账主体，让案件从一个清晰且一致的范围开始。',
  },
  'SCN-ENTITY': {
    'en-US': 'Person T works for the Singapore parent, Entity B, but is supplying information for Entity A. Morgan and KYC Operations must confirm the group relationship and whether Person T may act for A or may only coordinate information.',
    'zh-CN': 'Person T 任职于新加坡母公司 Entity B，却正在为 Entity A 提供资料。Morgan 与 KYC Operations 必须确认集团关系，并判断 Person T 能代表 A 行事，还是只能协助传递信息。',
  },
  'SCN-REQUIREMENTS': {
    'en-US': 'With the relationship scope established, the case manager determines which AML/KYC, entity, jurisdiction and FX product requirements apply to Entity A. Any uncertain requirement stays visible instead of being silently treated as complete.',
    'zh-CN': '业务关系范围明确后，案件经理需要判断哪些反洗钱、KYC、主体、司法辖区和外汇产品要求适用于 Entity A。任何尚不确定的要求都保持可见，不能被默认为已经完成。',
  },
  'SCN-SOURCE': {
    'en-US': 'The bank may already hold group evidence for Entity B or identity information for Person T. KYC Operations checks permission, freshness, provenance and relevance before reusing any item for Entity A, avoiding an unnecessary repeat request.',
    'zh-CN': '银行可能已经持有 Entity B 的集团资料或 Person T 的身份信息。KYC Operations 在复用于 Entity A 之前，要核对权限、时效、来源和适用性，避免向客户重复索取已有且可用的资料。',
  },
  'SCN-GAP': {
    'en-US': 'The case still lacks specific proof of Person T’s authority for Entity A. The team prepares a precise request, sends it through Morgan to the permitted recipient and tracks the response without reopening the entire evidence pack.',
    'zh-CN': '案件仍缺少 Person T 对 Entity A 具体权限的证明。团队需要准备一项明确的补充请求，由 Morgan 发送给获准接收的人，并在不重开整套材料的情况下跟踪回复。',
  },
  'SCN-VALIDATE': {
    'en-US': 'A submitted document may prove Person T’s identity without proving authority to represent Entity A. The specialist assesses each item against the exact question it is meant to answer and records what remains unresolved.',
    'zh-CN': '客户提交的文件可能证明 Person T 的身份，却不能证明其有权代表 Entity A。专业审核人员要按照每份材料所回答的具体问题判断其充分性，并记录仍未解决的事项。',
  },
  'SCN-POPULATION': {
    'en-US': 'Before screening begins, the team identifies the parties that must be checked for this relationship: Entity A, Entity B, Person T and any applicable owners, controllers or connected parties. The population follows the confirmed requirements.',
    'zh-CN': '筛查开始前，团队需要确定本次业务关系应检查哪些对象：Entity A、Entity B、Person T，以及适用的所有权人、控制人或关联方。筛查范围必须依据已经确认的要求形成。',
  },
  'SCN-MATCH': {
    'en-US': 'Screening produces a possible match involving Person T. The specialist compares names, dates, locations and other identifiers, asks for only the missing facts and records a scoped decision instead of treating the match score as the answer.',
    'zh-CN': '筛查发现一个可能涉及 Person T 的匹配。专业审核人员对比姓名、日期、地点及其他识别信息，只补问缺失事实，并形成有范围的判断，不能把匹配分数直接当作结论。',
  },
  'SCN-EDD': {
    'en-US': 'If the relationship presents applicable higher-risk indicators, the EDD reviewer examines Entity A’s business rationale, source of funds or wealth and relevant ownership context. If EDD does not apply, that reason is explicitly recorded.',
    'zh-CN': '如果该业务关系出现适用的较高风险指标，EDD 审核人员将检查 Entity A 的业务理由、资金或财富来源以及相关所有权背景。如果无需 EDD，也必须明确记录不适用的依据。',
  },
  'SCN-CONFLICTS': {
    'en-US': 'The Conflicts team checks whether Entity A, Entity B, Person T, the requested product or the proposed relationship creates a conflict. This review can start early and run in parallel, while an open finding blocks only the work it affects.',
    'zh-CN': '利益冲突团队检查 Entity A、Entity B、Person T、申请产品或拟建立的业务关系是否产生冲突。该检查可以提前并行启动；未解决的发现只阻塞其实际影响的工作。',
  },
  'SCN-CREDIT': {
    'en-US': 'Credit assesses Entity A’s FX forward exposure and decides the applicable limit, collateral or other conditions. The decision remains tied to the confirmed client and booking structure so another group entity is not approved by mistake.',
    'zh-CN': 'Credit 评估 Entity A 的外汇远期风险敞口，并确定适用的额度、抵押品或其他条件。决定始终关联已经确认的客户与记账结构，避免误把批准授予集团中的其他主体。',
  },
  'SCN-LEGAL': {
    'en-US': 'Legal prepares the agreement for the correct client and bank booking entity, using the current Credit conditions as an input. Draft, approved and executed versions remain distinct until the right parties complete the agreement.',
    'zh-CN': 'Legal 根据正确的客户主体和银行记账主体准备协议，并把最新 Credit 条件作为输入。草拟、批准和签署版本保持清晰区分，直到正确的签约方完成协议。',
  },
  'SCN-QA': {
    'en-US': 'Quality review finds a precise inconsistency in the case pack. QA returns only the affected item to its owner, keeps the rest of the case moving and then verifies the correction against the evidence and recorded decision.',
    'zh-CN': '质量审核在案件材料中发现一项具体的不一致。QA 只把受影响的事项退回责任人，让其他工作继续推进，并根据证据和已记录决定复核修正结果。',
  },
  'SCN-READINESS': {
    'en-US': 'The case manager brings KYC, screening, EDD, Conflicts, Credit, Legal and QA conditions into one readiness view. Person T’s authority or an open Legal condition remains visible, so a local decision cannot be mistaken for overall readiness.',
    'zh-CN': '案件经理把 KYC、筛查、EDD、利益冲突、Credit、Legal 和 QA 条件汇总到统一就绪视图。Person T 的权限或未完成的 Legal 条件持续可见，避免把局部决定误认为整体就绪。',
  },
  'SCN-PUBLISH': {
    'en-US': 'After an authorised person confirms the applicable conditions, the system records the scoped outcome and Morgan communicates the permitted next steps to Entity A. Publication remains separate from the earlier local reviews and decisions.',
    'zh-CN': '获得授权的人确认所有适用条件后，系统记录有明确范围的最终结果，由 Morgan 向 Entity A 说明获准的后续步骤。结果发布与之前的局部审核和专业判断保持区分。',
  },
};

export function heroCaseStory(id,locale='en-US') {
  const story = stories[id];
  if (!story) return '';
  return story[locale === 'zh-CN' ? 'zh-CN' : 'en-US'];
}

export const heroCaseStoryIds = Object.freeze(Object.keys(stories));
