# D5 Scenario → Product contracts

Authoritative design mapping, not proof of implementation. Stable D4/D3/PX/SCN identifiers preserved; demo roles are not verified bank authority. Full reads/outputs/preconditions/forbidden effects and exact inherited source refs are in the companion JSON (229 actions, 94 parents, 15 scenes).

## SCN-SCOPE · thin_mapping

RM / KYC Operations → WF-01 → PX-02 Scope / Parties / Authority

Intent / moment: 请求接收 → 范围澄清 → booking/产品资格 → 尽调context → 范围版本

Current runtime: scope; Existing A scope action guards.

Consequence boundary: 范围/产品/booking仍未知的任务保持未决；后续独立工作按自身前置继续

Test: thin mapping; existing engine suites where implemented


## SCN-ENTITY · thin_mapping

KYC Operations / RM → WF-01 → PX-02 Scope / Parties / Authority

Intent / moment: 主体候选 → 分类 → 关系 → 指定权限 → 有限访问

Current runtime: entity; Existing A entity/authority guards.

Consequence boundary: 协调权限、签约权限和系统访问各自状态；不合成一个Verified

Test: thin mapping; existing engine suites where implemented


## SCN-REQUIREMENTS · thin_mapping

KYC Operations → WF-02 → PX-03 Requirements / Evidence

Intent / moment: 上下文 → 适用性 → 要求集 → 例外审阅 → 可披露请求

Current runtime: requirements; Round A bounded requirements.

Consequence boundary: unknown要求不静默排除；例外等待单独显示

Test: thin mapping; existing engine suites where implemented


## SCN-SOURCE · thin_mapping

KYC Operations → WF-03 → PX-03 Requirements / Evidence

Intent / moment: 来源资格 → 取得资料 → 候选Claims → 资料关联 → 剩余缺口

Current runtime: evidence; Round A source/evidence.

Consequence boundary: 查源失败不是无匹配；来源重试期间其他工作是否继续按依赖

Test: thin mapping; existing engine suites where implemented


## SCN-GAP · full_priority

KYC Operations / RM / Client contributor → WF-04 → PX-04 Requests

Intent / moment: 准备请求 → 收件/披露审阅 → 模拟派发 → 客户回应 → 交回评估

Current runtime: collaboration; B scoped request save / review / dispatch / submit_response.

Consequence boundary: 对客户与对银行等待分别标识；发送、收到、评估分开

Test: audit/tests/journey.mjs P3–P5

- D4A-GAP-01-01: 计算未满足要求的具体缺口并关联已有项. Reads: RequirementApplicability, EvidenceUseAssessment[], OpenGap[]. Outputs: GapDelta. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RequirementApplicability、EvidenceUseAssessment[]、OpenGap[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限GapDelta并留下来源与事件。
- D4A-GAP-01-02: 应用经校验的Gap差异，未知适用性保持内部审阅. Reads: GapDelta, ExpectedRevision. Outputs: Gap.revision, ApplicabilityReviewTask. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少GapDelta、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Gap.revision、ApplicabilityReviewTask并留下来源与事件。
- D4A-GAP-02-01: 将相关Gap组织成简短可回应的请求草稿. Reads: AllowedGapProjection, ResponseOptions. Outputs: RequestItemDraft[]. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对AllowedGapProjection、ResponseOptions加入缺失值、矛盾及恶意指令，输出RequestItemDraft[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-GAP-02-02: 检查每个请求仍关联原控制且无越界披露. Reads: RequestItemDraft[], RequirementRefs, DisclosureConstraints. Outputs: RequestDraftValidation. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RequestItemDraft[]、RequirementRefs、DisclosureConstraints中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequestDraftValidation并留下来源与事件。
- D4A-GAP-03-01: 批准适当联系人及最小资源动作范围. Reads: ContactRecord, ProposedRequestScope. Outputs: RequestAccessDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given ContactRecord、ProposedRequestScope对应的权限或关键证据缺失，When尝试“批准适当联系人及最小资源动作范围”，Then保持待判断并不产生RequestAccessDecision；有权、当前输入下才记录指定结果。
- D4A-GAP-03-02: 配置并强制执行指定请求项Grant. Reads: RequestAccessDecision, GrantPolicy. Outputs: AccessGrant, AuthorisedProjection. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RequestAccessDecision、GrantPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AccessGrant、AuthorisedProjection并留下来源与事件。
- D4A-GAP-04-01: 确认需要人工批准的请求版本与披露内容. Reads: RequestDraft, RecipientScope, ApprovalRule. Outputs: RequestApproval. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given RequestDraft、RecipientScope、ApprovalRule对应的权限或关键证据缺失，When尝试“确认需要人工批准的请求版本与披露内容”，Then保持待判断并不产生RequestApproval；有权、当前输入下才记录指定结果。
- D4A-GAP-04-02: 通过合成适配器发送已批准内容. Reads: RequestApproval, SentRevision, IdempotencyKey. Outputs: DispatchReceipt. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RequestApproval、SentRevision、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DispatchReceipt并留下来源与事件。
- D4A-GAP-04-03: 记录送达或失败观察，不据此关闭请求. Reads: DispatchReceipt, ChannelObservation. Outputs: DeliveryObservation, RequestActivity. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少DispatchReceipt、ChannelObservation中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DeliveryObservation、RequestActivity并留下来源与事件。
- D4A-GAP-05-01: 客户贡献者提交本人获准任务的资料. Reads: AllowedRequestItems, ClientInput. Outputs: SubmissionIntent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: 未收到适当参与者的回应，不生成SubmissionIntent；模拟资料与来源人员清楚，不能由播放或模型冒充提交。
- D4A-GAP-05-02: 关联原提供人、项目、版本并生成回执. Reads: SubmissionIntent, AccessGrant, FileReceipt. Outputs: Submission, RequestItem.response_status. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少SubmissionIntent、AccessGrant、FileReceipt中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Submission、RequestItem.response_status并留下来源与事件。
- D4A-GAP-05-03: 计算整份请求的局部回应状态，不写业务满足. Reads: RequestItemStates, EvidenceUseStates. Outputs: RequestResponseSummary. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RequestItemStates、EvidenceUseStates中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequestResponseSummary并留下来源与事件。
- D4A-GAP-06-01: 将获准的沟通记录整理为待审要点. Reads: ApprovedInteractionInput, CaseScope. Outputs: InteractionSummaryDraft. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对ApprovedInteractionInput、CaseScope加入缺失值、矛盾及恶意指令，输出InteractionSummaryDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-GAP-06-02: RM核对客户解释与下一动作，不代替客户授权. Reads: InteractionSummaryDraft, OriginalInteraction. Outputs: ReviewedInteractionSummary. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: 未收到适当参与者的回应，不生成ReviewedInteractionSummary；模拟资料与来源人员清楚，不能由播放或模型冒充提交。
- D4A-GAP-06-03: 记录原提供者和代录入者，关联请求项. Reads: ReviewedInteractionSummary, StaffSubmission. Outputs: InteractionRecord, Submission.provenance. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ReviewedInteractionSummary、StaffSubmission中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限InteractionRecord、Submission.provenance并留下来源与事件。

## SCN-VALIDATE · thin_mapping

KYC Operations → WF-03 → PX-07 Evidence Review

Intent / moment: 接收 → 技术释放 → 主体/来源 → 用途评估 → 记录/反馈

Current runtime: screening-evidence; B release/link and C assess_identity_insufficient.

Consequence boundary: received不等于sufficient；缺评估时不自动再次索取材料

Test: thin mapping; existing engine suites where implemented


## SCN-POPULATION · thin_mapping

KYC Operations / Screening reviewer → WF-05 → PX-08 Population / Coverage

Intent / moment: 定义范围 → 确认主体 → 查询计划 → 查询返回 → 覆盖复核

Current runtime: population; C prepare_preliminary / request_preliminary / receive_result.

Consequence boundary: 群体不完整时显示范围未定；不能只数查过名字

Test: thin mapping; existing engine suites where implemented


## SCN-MATCH · full_priority

KYC Operations / Screening reviewer → WF-05 → PX-09 Screening Review

Intent / moment: 绑定查询 → 比较信息 → 按需补证 → 复核包 → 人判断 → 记录局部结果

Current runtime: screening; C save_review_draft / request_identity / refer / record_unresolved; exclusion disabled.

Consequence boundary: 无缺口不强制补证；人可能转交/未决；局部完成不关全案

Test: audit/tests/journey.mjs P1–P8 / CHK-01–04

- D4A-MATCH-01-01: 绑定命中、主体快照、查询范围和来源版本. Reads: ProviderRecordSnapshot, RunSubjectSnapshot, RunId. Outputs: ScreeningFinding. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少ProviderRecordSnapshot、RunSubjectSnapshot、RunId中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningFinding并留下来源与事件。
- D4A-MATCH-01-02: 校验记录一致性并标记重复/关联候选. Reads: ScreeningFinding, KnownFindingRegistry. Outputs: FindingConsistencyCheck. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少ScreeningFinding、KnownFindingRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限FindingConsistencyCheck并留下来源与事件。
- D4A-MATCH-02-01: 保留日期精度、多值、原文字体与缺失状态. Reads: SubjectClaims, ProviderClaims. Outputs: TypedComparableClaims. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少SubjectClaims、ProviderClaims中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限TypedComparableClaims并留下来源与事件。
- D4A-MATCH-02-02: 生成匹配/差异/不可比较矩阵并引用原值. Reads: TypedComparableClaims. Outputs: AttributeComparison[]. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 对TypedComparableClaims加入缺失值、矛盾及恶意指令，输出AttributeComparison[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-MATCH-03-01: 选择当前finding的获准取证途径与停止条件. Reads: FindingUnknowns, ExistingEvidence, AllowedSources, PreviousReceipts. Outputs: IdentityEvidencePlanProposal. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出IdentityEvidencePlanProposal。
- D4A-MATCH-03-02: 将仍缺的身份事实转为受限新请求项. Reads: IdentityEvidencePlanProposal, AllowedClientReason. Outputs: IdentityRequestDraft. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 对IdentityEvidencePlanProposal、AllowedClientReason加入缺失值、矛盾及恶意指令，输出IdentityRequestDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-MATCH-03-03: 确认个人证据的收件人、披露和访问范围. Reads: IdentityRequestDraft, ExistingGrant. Outputs: IdentityRequestAccessDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: Given IdentityRequestDraft、ExistingGrant对应的权限或关键证据缺失，When尝试“确认个人证据的收件人、披露和访问范围”，Then保持待判断并不产生IdentityRequestAccessDecision；有权、当前输入下才记录指定结果。
- D4A-MATCH-04-01: 编制带引用的事实、未知、矛盾和允许动作. Reads: Finding, CurrentEvidenceUse, Comparison, AllowedActionSet. Outputs: ScreeningDecisionPack. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 对Finding、CurrentEvidenceUse、Comparison加入缺失值、矛盾及恶意指令，输出ScreeningDecisionPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-MATCH-04-02: 校验包的引用可访问、版本当前、无伪造结论. Reads: ScreeningDecisionPack, AccessScope, CurrentRevisions. Outputs: DecisionPackValidation. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少ScreeningDecisionPack、AccessScope、CurrentRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DecisionPackValidation并留下来源与事件。
- D4A-MATCH-05-01: 准备重大性所需事实与未解决的矛盾. Reads: Finding, Evidence, RiskContext. Outputs: MaterialityBrief. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 对Finding、Evidence、RiskContext加入缺失值、矛盾及恶意指令，输出MaterialityBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-MATCH-05-02: 判断模糊/重大事项与需升级的处理. Reads: MaterialityBrief, ApplicableControlContext. Outputs: RiskMaterialityDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: Given MaterialityBrief、ApplicableControlContext对应的权限或关键证据缺失，When尝试“判断模糊/重大事项与需升级的处理”，Then保持待判断并不产生RiskMaterialityDecision；有权、当前输入下才记录指定结果。
- D4A-MATCH-05-03: 按明确决定与规则应用特定动作的hold. Reads: RiskMaterialityDecision, HoldPolicy. Outputs: ScopedHold, EscalationTask. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少RiskMaterialityDecision、HoldPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScopedHold、EscalationTask并留下来源与事件。
- D4A-MATCH-06-01: 选择有依据的局部处置或保持未决. Reads: ScreeningDecisionPack, CurrentInputManifest. Outputs: ProposedDisposition, HumanRationale. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: Given ScreeningDecisionPack、CurrentInputManifest对应的权限或关键证据缺失，When尝试“选择有依据的局部处置或保持未决”，Then保持待判断并不产生ProposedDisposition、HumanRationale；有权、当前输入下才记录指定结果。
- D4A-MATCH-06-02: 完成配置要求的独立授权，不默认每案新增审批. Reads: ProposedDisposition, ApprovalPolicy, ReviewerPermission. Outputs: AuthorisedDisposition. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: Given ProposedDisposition、ApprovalPolicy、ReviewerPermission对应的权限或关键证据缺失，When尝试“完成配置要求的独立授权，不默认每案新增审批”，Then保持待判断并不产生AuthorisedDisposition；有权、当前输入下才记录指定结果。
- D4A-MATCH-06-03: 校验当前版本与授权后记录局部结果. Reads: AuthorisedDisposition, ExpectedRevisions, IdempotencyKey. Outputs: ScreeningReviewDecision, AuditEvent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少AuthorisedDisposition、ExpectedRevisions、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningReviewDecision、AuditEvent并留下来源与事件。
- D4A-MATCH-07-01: 根据处置计算finding和coverage的限定状态. Reads: ScreeningReviewDecision, CoverageManifest, DependencyEdge[]. Outputs: CoverageDelta, ReadinessReevaluationEvent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少ScreeningReviewDecision、CoverageManifest、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CoverageDelta、ReadinessReevaluationEvent并留下来源与事件。
- D4A-MATCH-07-02: 显示原有ownership/EDD/Legal等未决条件. Reads: CurrentCaseState, AllowedRoleProjection. Outputs: CaseImpactView. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 从similarity/无结果直接排除身份或宣布全球无风险. Oracle: 缺少CurrentCaseState、AllowedRoleProjection中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CaseImpactView并留下来源与事件。

## SCN-EDD · thin_mapping

Financial Crime / Specialist → WF-06 → PX-10 Condition Detail

Intent / moment: 适用性 → 风险问题 → 证据包 → 专业判断 → 批准/条件 → 交接

Current runtime: edd; C conditional EDD fixture; not hero closure.

Consequence boundary: 未确认适用性显示unknown；未展开不是not_required；时长需独立依据

Test: thin mapping; existing engine suites where implemented


## SCN-CONFLICTS · thin_mapping

Control Room / Case Manager → WF-07 → PX-10 Condition Detail

Intent / moment: 早发起 → 搜索 → 相关性复核 → 按需升级 → 记录结果

Current runtime: conflicts; D bounded specialist work.

Consequence boundary: 只能显示获准状态与预计，不泄漏受限背景；hold范围独立

Test: thin mapping; existing engine suites where implemented


## SCN-LEGAL · thin_mapping

Legal / Case Manager → WF-09 → PX-10 Condition Detail

Intent / moment: Intake → 协议要求 → 草稿/审阅 → Credit输入 → 协商 → 批准 → 签署 → 保存

Current runtime: legal; D bounded specialist work.

Consequence boundary: 草稿可继续但执行可能等签字/条件；显示具体等待对象，不只Pending

Test: thin mapping; existing engine suites where implemented


## SCN-CREDIT · thin_mapping

Credit / Case Manager → WF-08 → PX-10 Condition Detail

Intent / moment: 适用性 → 数据 → 风险评估 → 条件 → 初次批准 → Legal交接 → 适用最终核对

Current runtime: credit; D bounded specialist work.

Consequence boundary: 条件批准不等于履行；初次批准和最终协议核对不同节点

Test: thin mapping; existing engine suites where implemented


## SCN-QA · full_priority

QA / KYC Operations → WF-10 → PX-11 QA Remediation Detail

Intent / moment: 检查范围 → 各项核验 → 具体缺口 → 补正 → 重审 → 签核

Current runtime: authored scenario only; No complete D5 QA remediation/signoff runtime.

Consequence boundary: 重审使用新一轮episode；补正完成不自动QA通过

Test: NOT_RUN complete runtime absent; source mapping and readonly scene audit only

- D4A-QA-01-01: 装配当前Scope的QA清单并检查完整性. Reads: CaseScope, RequirementSet, QACheckDefinition. Outputs: QAManifest, ManifestUnknowns. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少CaseScope、RequirementSet、QACheckDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QAManifest、ManifestUnknowns并留下来源与事件。
- D4A-QA-01-02: 确认不能规则化的QA范围与未知适用项. Reads: QAManifest, ManifestUnknowns. Outputs: QAScopeReview. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given QAManifest、ManifestUnknowns对应的权限或关键证据缺失，When尝试“确认不能规则化的QA范围与未知适用项”，Then保持待判断并不产生QAScopeReview；有权、当前输入下才记录指定结果。
- D4A-QA-02-01: 检查清单需要的字段/资料/评估/决定是否存在. Reads: QAManifest, CurrentCaseObjects. Outputs: QACheckResult[], MissingObjectRefs. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QAManifest、CurrentCaseObjects中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheckResult[]、MissingObjectRefs并留下来源与事件。
- D4A-QA-02-02: 保留缺失对象和检查版本，不自动判QA通过. Reads: QACheckResult[], ExpectedRevision. Outputs: QACheck.revision, QAObservation. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QACheckResult[]、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheck.revision、QAObservation并留下来源与事件。
- D4A-QA-03-01: 核对来源引用、版本、必要时点是否存在. Reads: EvidenceProvenance, SourcePolicy, CurrentRevision. Outputs: SourceMetadataCheck. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少EvidenceProvenance、SourcePolicy、CurrentRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限SourceMetadataCheck并留下来源与事件。
- D4A-QA-03-02: 整理不能自动解释的来源矛盾. Reads: SourceMetadataCheck, ConflictingClaims. Outputs: SourceReviewBrief. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对SourceMetadataCheck、ConflictingClaims加入缺失值、矛盾及恶意指令，输出SourceReviewBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-QA-03-03: 判断复杂来源问题及所需补正. Reads: SourceReviewBrief, OriginalEvidence. Outputs: SourceReviewDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given SourceReviewBrief、OriginalEvidence对应的权限或关键证据缺失，When尝试“判断复杂来源问题及所需补正”，Then保持待判断并不产生SourceReviewDecision；有权、当前输入下才记录指定结果。
- D4A-QA-04-01: 确认相应用途是否存在当前评估. Reads: Requirement, Subject, Purpose, EvidenceUseAssessment. Outputs: AssessmentPresenceCheck. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少Requirement、Subject、Purpose中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AssessmentPresenceCheck并留下来源与事件。
- D4A-QA-04-02: 准备缺评估或评估冲突的具体问题. Reads: AssessmentPresenceCheck, EvidenceUseRefs. Outputs: SufficiencyReviewBrief. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对AssessmentPresenceCheck、EvidenceUseRefs加入缺失值、矛盾及恶意指令，输出SufficiencyReviewBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-QA-04-03: 处理需专业判断的用途充分性问题. Reads: SufficiencyReviewBrief, ActualEvidence. Outputs: QASufficiencyJudgment. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given SufficiencyReviewBrief、ActualEvidence对应的权限或关键证据缺失，When尝试“处理需专业判断的用途充分性问题”，Then保持待判断并不产生QASufficiencyJudgment；有权、当前输入下才记录指定结果。
- D4A-QA-05-01: 核对适用Screening/EDD结果、条件与输入版本. Reads: QAManifest, ScreeningCoverage, EDDApplicability, EDDConditions. Outputs: CrossConditionCheck, SpecificIssueRefs. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QAManifest、ScreeningCoverage、EDDApplicability中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CrossConditionCheck、SpecificIssueRefs并留下来源与事件。
- D4A-QA-05-02: 把矛盾或未知绑定到原领域任务. Reads: SpecificIssueRefs, ExistingWorkItems. Outputs: QAFinding, LinkedSpecialistTask. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少SpecificIssueRefs、ExistingWorkItems中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QAFinding、LinkedSpecialistTask并留下来源与事件。
- D4A-QA-06-01: 将观察关联既有Gap和实际受影响对象. Reads: QAObservation, ExistingGap[], DependencyEdge[]. Outputs: RemediationScope. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QAObservation、ExistingGap[]、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RemediationScope并留下来源与事件。
- D4A-QA-06-02: 准备补评估/补资料/重审的具体建议. Reads: RemediationScope, EvidenceStatus. Outputs: RemediationProposal. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对RemediationScope、EvidenceStatus加入缺失值、矛盾及恶意指令，输出RemediationProposal仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-QA-06-03: 在范围已确认后建立/更新指定责任任务. Reads: ReviewedRemediationProposal, AssignmentRule. Outputs: Remediation, WorkItem, ResumeAnchor. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ReviewedRemediationProposal、AssignmentRule中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Remediation、WorkItem、ResumeAnchor并留下来源与事件。
- D4A-QA-07-01: 对修订输入执行相应确定性重审检查. Reads: RemediationResolution, RevisedEvidenceUse, CheckDefinition. Outputs: QARecheckCandidate. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少RemediationResolution、RevisedEvidenceUse、CheckDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QARecheckCandidate并留下来源与事件。
- D4A-QA-07-02: 审阅仍需专业判断的补正结果. Reads: QARecheckCandidate, RevisedEvidence. Outputs: QARecheckDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given QARecheckCandidate、RevisedEvidence对应的权限或关键证据缺失，When尝试“审阅仍需专业判断的补正结果”，Then保持待判断并不产生QARecheckDecision；有权、当前输入下才记录指定结果。
- D4A-QA-07-03: 记录该项目的重审版本，不自动最终签核. Reads: QARecheckDecision, ExpectedRevision. Outputs: QACheck.recheck_revision, RemediationResolutionLink. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QARecheckDecision、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheck.recheck_revision、RemediationResolutionLink并留下来源与事件。
- D4A-QA-08-01: 检查QA清单完整、结果当前且无未决签核阻塞. Reads: QAManifest, QACheck[], ScopeRevision, HoldRefs. Outputs: QASignoffEligibility. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少QAManifest、QACheck[]、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QASignoffEligibility并留下来源与事件。
- D4A-QA-08-02: 按演示权限对具体QA范围确认签核. Reads: QASignoffEligibility, ReviewPack, Permission. Outputs: AuthorisedQASignoff. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given QASignoffEligibility、ReviewPack、Permission对应的权限或关键证据缺失，When尝试“按演示权限对具体QA范围确认签核”，Then保持待判断并不产生AuthorisedQASignoff；有权、当前输入下才记录指定结果。
- D4A-QA-08-03: 保存QA确认及所审版本，不写全案clearance. Reads: AuthorisedQASignoff, ExpectedRevisions. Outputs: QASignoff, AuditEvent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少AuthorisedQASignoff、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QASignoff、AuditEvent并留下来源与事件。

## SCN-READINESS · full_priority

Case Manager / Authorised Clearance Reviewer → WF-11 → PX-12 Clearance

Intent / moment: 清单完整性 → 适用结果 → 当前版本/hold → 阻塞/下一步 → 就绪快照

Current runtime: readiness; Readiness projection only; missing full approved closure manifest.

Consequence boundary: 缺全案依赖时间不报全案完成日；没有条件不能空集Ready

Test: audit/tests/surfaces.mjs Not Ready + engine safety tests

- D4A-READINESS-01-01: 装配并核对expected condition manifest. Reads: CaseScope, ApprovedPrerequisiteDefinition, ConditionRegistry. Outputs: ConditionManifest, MissingConditionRefs. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少CaseScope、ApprovedPrerequisiteDefinition、ConditionRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConditionManifest、MissingConditionRefs并留下来源与事件。
- D4A-READINESS-01-02: 确认仍未知的条件适用范围与清单问题. Reads: ConditionManifest, ScopeUnknowns. Outputs: PrerequisiteScopeDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: Given ConditionManifest、ScopeUnknowns对应的权限或关键证据缺失，When尝试“确认仍未知的条件适用范围与清单问题”，Then保持待判断并不产生PrerequisiteScopeDecision；有权、当前输入下才记录指定结果。
- D4A-READINESS-02-01: 按当前依赖聚合已满足/阻塞/未知的前置条件. Reads: CompleteConditionManifest, CurrentConditionStates, QASignoff. Outputs: PrerequisiteEvaluation. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少CompleteConditionManifest、CurrentConditionStates、QASignoff中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PrerequisiteEvaluation并留下来源与事件。
- D4A-READINESS-02-02: 保存输入与计算结果的ReadinessSnapshot. Reads: PrerequisiteEvaluation, InputManifest. Outputs: ReadinessSnapshot. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少PrerequisiteEvaluation、InputManifest中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ReadinessSnapshot并留下来源与事件。
- D4A-READINESS-03-01: 逐项检查证据/决定/协议/Scope当前性与hold. Reads: ConditionInputs, DependencyEdge[], HoldRefs, CurrentRevisions. Outputs: CurrencyCheck, BlockingRef[], UnknownRef[]. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少ConditionInputs、DependencyEdge[]、HoldRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CurrencyCheck、BlockingRef[]、UnknownRef[]并留下来源与事件。
- D4A-READINESS-03-02: 建立精确重评任务并保留历史结果. Reads: CurrencyCheck, DeclaredImpact, ExpectedRevision. Outputs: CurrencyReviewTask, HistoricalDecisionLink. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少CurrencyCheck、DeclaredImpact、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CurrencyReviewTask、HistoricalDecisionLink并留下来源与事件。
- D4A-READINESS-04-01: 投影实际阻塞、责任、所缺输入和允许动作. Reads: ReadinessSnapshot, RolePermission, TaskRegistry. Outputs: AllowedReadinessView. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少ReadinessSnapshot、RolePermission、TaskRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedReadinessView并留下来源与事件。
- D4A-READINESS-04-02: 在获准且独立的工作中提出可解释下一行动顺序. Reads: AllowedReadinessView, Dependencies, CapacityContextIfKnown. Outputs: NextWorkPlanProposal. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出NextWorkPlanProposal。
- D4A-READINESS-04-03: 基于真实状态生成有引用的简短原因说明. Reads: ReadinessSnapshot, AllowedConditionProjection. Outputs: ReadinessExplanation. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 对ReadinessSnapshot、AllowedConditionProjection加入缺失值、矛盾及恶意指令，输出ReadinessExplanation仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-READINESS-05-01: 检查完整清单、当前结果与无禁止hold，派生就绪. Reads: Manifest, PrerequisiteEvaluation, CurrentRevisions, HoldRefs. Outputs: ReadyForConfirmationOrNotReady. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少Manifest、PrerequisiteEvaluation、CurrentRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ReadyForConfirmationOrNotReady并留下来源与事件。
- D4A-READINESS-05-02: 按当前操作者权限显示确认动作或明确缺权原因. Reads: ReadyForConfirmationOrNotReady, ActorPermission. Outputs: AllowedClearanceActions. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权; 由LLM对完整性或Ready作概率预测代替确定性检查. Oracle: 缺少ReadyForConfirmationOrNotReady、ActorPermission中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedClearanceActions并留下来源与事件。

## SCN-PUBLISH · full_priority

Authorised Clearance Reviewer / RM → WF-12 → PX-12 Clearance

Intent / moment: 确认输入 → 有权确认 → 记录 → 发布回执 → RM沟通

Current runtime: authored scenario only; No final authorisation/publication runtime.

Consequence boundary: 发布失败不删决定；邮件草稿/复制不是已发送；Trade不在范围

Test: NOT_RUN complete runtime absent; source mapping and readonly scene audit only

- D4A-PUBLISH-01-01: 固定准入支撑结果包及版本引用. Reads: ReadinessSnapshot, CurrentDecisionRefs, EvidenceRefs. Outputs: ClearancePack, InputManifest. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ReadinessSnapshot、CurrentDecisionRefs、EvidenceRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearancePack、InputManifest并留下来源与事件。
- D4A-PUBLISH-01-02: 按角色暴露获准结果包摘要与来源入口. Reads: ClearancePack, RolePolicy. Outputs: AllowedClearancePackView. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ClearancePack、RolePolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedClearancePackView并留下来源与事件。
- D4A-PUBLISH-02-01: 核对当前snapshot、Scope、权限和输入没有改变. Reads: ReadinessSnapshot, ActorPermission, ExpectedRevisions, HoldRefs. Outputs: ClearanceConfirmationEligibility. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ReadinessSnapshot、ActorPermission、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearanceConfirmationEligibility并留下来源与事件。
- D4A-PUBLISH-02-02: 对明确范围作合成有权准入确认. Reads: ClearanceConfirmationEligibility, ClearancePack. Outputs: AuthorisedClearanceDecision. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: Given ClearanceConfirmationEligibility、ClearancePack对应的权限或关键证据缺失，When尝试“对明确范围作合成有权准入确认”，Then保持待判断并不产生AuthorisedClearanceDecision；有权、当前输入下才记录指定结果。
- D4A-PUBLISH-02-03: 记录有权决定、范围、时间与所审输入. Reads: AuthorisedClearanceDecision, ExpectedRevisions, IdempotencyKey. Outputs: ClearanceDecision, AuditEvent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少AuthorisedClearanceDecision、ExpectedRevisions、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearanceDecision、AuditEvent并留下来源与事件。
- D4A-PUBLISH-03-01: 分别记录实际事件的记录/生效/发送/接收时间. Reads: DecisionEvent, DispatchReceipt, Acknowledgement. Outputs: TimestampedEventRecords. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少DecisionEvent、DispatchReceipt、Acknowledgement中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限TimestampedEventRecords并留下来源与事件。
- D4A-PUBLISH-04-01: 验证发布目标、载荷范围、权限和当前决定. Reads: ClearanceDecision, PublicationPolicy, TargetAllowlist. Outputs: ApprovedPublicationIntent. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ClearanceDecision、PublicationPolicy、TargetAllowlist中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ApprovedPublicationIntent并留下来源与事件。
- D4A-PUBLISH-04-02: 发送或重试同一获准发布意图. Reads: ApprovedPublicationIntent, IdempotencyKey, RetryPolicy. Outputs: PerTargetDispatchReceipt. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ApprovedPublicationIntent、IdempotencyKey、RetryPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PerTargetDispatchReceipt并留下来源与事件。
- D4A-PUBLISH-04-03: 保留各目标回执与失败，不删除原准入决定. Reads: PerTargetDispatchReceipt, ClearanceDecision.ref. Outputs: PublicationEvent, Acknowledgement, FailureRecord. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少PerTargetDispatchReceipt、ClearanceDecision.ref中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PublicationEvent、Acknowledgement、FailureRecord并留下来源与事件。
- D4A-PUBLISH-05-01: 准备受限信息已过滤的结果通知草稿. Reads: AllowedOutcomeProjection, ApprovedCommunicationTemplate. Outputs: OutcomeCommunicationDraft. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 将候选/建议标为已采信事实; 记录正式专业决定或授权; 向未获准收件人派发内容; 直接写sufficiency或readiness truth. Oracle: 对AllowedOutcomeProjection、ApprovedCommunicationTemplate加入缺失值、矛盾及恶意指令，输出OutcomeCommunicationDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。
- D4A-PUBLISH-05-02: RM处理需要关系解释或例外澄清的沟通. Reads: OutcomeCommunicationDraft, ClientContext. Outputs: ReviewedOutcomeCommunication. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade. Oracle: 未收到适当参与者的回应，不生成ReviewedOutcomeCommunication；模拟资料与来源人员清楚，不能由播放或模型冒充提交。
- D4A-PUBLISH-05-03: 按获准版本与渠道记录派发和送达观察. Reads: ApprovedOutcomeCommunication, RecipientGrant. Outputs: OutcomeNotificationReceipt. Forbidden: 创建或修改银行政策/权限; 覆盖历史证据或决定; 切换语言时修改业务地区/名单/适用性; 无依据写全案Clear-to-Trade; 把缺失前置或失败回执替换为成功; 把产品写入权当作业务判断权. Oracle: 缺少ApprovedOutcomeCommunication、RecipientGrant中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限OutcomeNotificationReceipt并留下来源与事件。

