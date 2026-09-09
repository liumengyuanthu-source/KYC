# Discussion 4 — 全量场景、工作与原子动作评估

版本 v0.1 · 2026-09-07 · 内部受控 · Confidential Australian Banking Client

**性质：分析评审稿，不是银行政策、生产Schema、模型实测或上线授权。**沿用D3的15场景/94工作变更，新增229个作者层原子动作；它们不是229条PPT原始步骤。

评分顺序固定为 **C/O/D/B/V/T/H**；N=C+O+D，F=B+T。分值1–5采用主稿定义的锚点。此处每一动作均有输入、输出、分工、人的介入、停/恢复与测试；精确字段级数据见同包JSON，评分公式见Excel。

**阅读：**按场景查工作 → 看每条动作的执行方式和分值 → 看允许输出与判断边界 → 查看D3原source refs → 需要时在Studio展开节点。不要把全部表格塞入产品工作界面。


## SCN-SCOPE — 明确本次关系与业务范围

**Branch：**BR-01；**Workflow：**WF-01；**粒度：**5个原工作，13个动作。

**Current PPT：**Current M1.1由RM提交；M0.1–.2在RM，M0.3–.4在Ops。

**Target PPT：**Target新增RM的M0.1 request，旧M1.1被划线；booking等M0.1–.4位于Agentic execution。两处M0.1不能合并。

**共同检查点：**原始请求刚收到；Entity A为拟交易主体，Entity B为关联母公司，产品只是FX forward意图；booking、资格及DD信息按实际缺口保留。

**共同输入：**同一原始请求、已知主体/产品声明、现有政策context，不给After额外批准。

**场景级初评分（不作自主授权）：**C=4 / O=3 / D=2 / B=3 / V=4 / T=4 / H=5。

**执行组成：**规则/代码 7；确定性Skill/工具 1；语义Skill 1；受限Agent候选 0；人执行判断/确认/提供 4。不是工时比例。


### D3-SCOPE-01 — 请求接收与去重

**变更分类：**Reassigned。**当前工作：**RM捕获并提交关系信息，Ops接收。

**原After提案：**产品保存原请求来源，抽取候选主体/产品/联系人；匹配已有工作案件后提示可能重复，不能无提示合并。

**Pain：**原始请求与可能重复案件的关系可能需要人员重复比对。（设计假设，未获客户实证）

**原因假设／控制理由：**同一业务意图跨邮件和案件入口，来源与候选合并边界可能不清。

**Opportunity：**一次抽取候选，精确保留来源与重复提示，不自动合并。

**原PPT引用：**Current PPT-S1-SH20-A1, PPT-S1-SH284-A1；Target PPT-S2-SH20-A1, PPT-S2-SH284-A1, PPT-S2-SH283-A1。

**D3字段候选：**Case.request_source_ref; Case.trigger_type; Case.intake_dedup_candidate_refs; CandidateClaim.value_status。

**Reference：**IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-02, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SCOPE-01-01 | 从原始请求提取候选主体、产品和联系人 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | RM / KYC Operations |
| D4A-SCOPE-01-02 | 按可用标识检索候选重复案件 | 确定性Skill/工具; SK-01,SK-03 | 2/2/1/4/3/4/3 | 5 / 8 | RM / KYC Operations |
| D4A-SCOPE-01-03 | 确认是新关系还是既有申请，处理主体歧义 | 人执行判断/确认/提供; SK-06 | 4/2/2/3/3/3/3 | 8 / 6 | RM / KYC Operations |
| D4A-SCOPE-01-04 | 记录有出处的案件和申请关联 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |


**D4A-SCOPE-01-01｜从原始请求提取候选主体、产品和联系人**

- 输入：IntakeArtifact.content；SourcePermission。

- 输出：CandidateClaim[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CandidateClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对IntakeArtifact.content、SourcePermission加入缺失值、矛盾及恶意指令，输出CandidateClaim[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-01-02｜按可用标识检索候选重复案件**

- 输入：CandidateClaim[]；CaseSearchScope。

- 输出：DuplicateCandidate[]。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DuplicateCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CandidateClaim[]、CaseSearchScope中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DuplicateCandidate[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-01-03｜确认是新关系还是既有申请，处理主体歧义**

- 输入：DuplicateCandidate[]；OriginalRequest。

- 输出：IntakeLinkDecision。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 

- 协同：Human-led；Assist；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅IntakeLinkDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成IntakeLinkDecision；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-01-04｜记录有出处的案件和申请关联**

- 输入：IntakeLinkDecision；ExpectedRevision。

- 输出：Case.request_source_ref；Case.link_revision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Case.request_source_ref、Case.link_revision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少IntakeLinkDecision、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Case.request_source_ref、Case.link_revision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SCOPE-02 — 销售与booking context

**变更分类：**Reassigned。**当前工作：**RM确定销售地点和reporting/booking entity。

**原After提案：**把销售地点、银行booking法人、拟交易客户法人分栏；对候选值展示来源，未知为空并生成具体确认工作。

**Pain：**销售地点、客户法人和银行booking法人可能混在一段沟通内。（设计假设，未获客户实证）

**原因假设／控制理由：**主体类型与适用booking规则未被分栏表达。

**Opportunity：**规则限定候选并显式处理缺失context。

**原PPT引用：**Current PPT-S1-SH283-A1；Target PPT-S2-SH279-A1。

**D3字段候选：**CaseScope.sales_location; CaseScope.booking_entity_ref; CaseScope.booking_basis_ref; CaseScope.unresolved_context_refs。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-02, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SCOPE-02-01 | 按已批准配置检查booking候选与缺失context | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |
| D4A-SCOPE-02-02 | 澄清实际销售与booking范围，例外送授权角色 | 人执行判断/确认/提供; SK-06 | 4/2/2/3/3/3/3 | 8 / 6 | RM / booking authority |


**D4A-SCOPE-02-01｜按已批准配置检查booking候选与缺失context**

- 输入：CaseScope.sales_location；BookingPolicy.revision；CandidateBookingEntity。

- 输出：BookingContextCheck；ContextGap[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅BookingContextCheck、ContextGap[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope.sales_location、BookingPolicy.revision、CandidateBookingEntity中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限BookingContextCheck、ContextGap[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-02-02｜澄清实际销售与booking范围，例外送授权角色**

- 输入：BookingContextCheck；OriginalRequest。

- 输出：BookingContextDecision。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 

- 协同：Human-led；Assist；人负责/异常转交：RM / booking authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅BookingContextDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成BookingContextDecision；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SCOPE-03 — 产品意图与资格

**变更分类：**Reassigned。**当前工作：**确认并验证approved product/service scope。

**原After提案：**分开Requested Product、允许业务范围和资格确认记录；不以产品卡被选中代表准入。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**此项是必要产品资格控制，源资料未证明现状有可消除痛点。

**Opportunity：**把申请意图与获准产品范围分开，提供规则证据。

**原PPT引用：**Current PPT-S1-SH283-A2；Target PPT-S2-SH279-A2。

**D3字段候选：**CaseScope.requested_product_refs; ProductEligibility.status; ProductEligibility.decision_ref; ProductEligibility.scope_revision。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-02, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SCOPE-03-01 | 核对请求产品与当前资格规则，未知保持未知 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |
| D4A-SCOPE-03-02 | 确认需授权的产品资格或例外 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Product eligibility authority |


**D4A-SCOPE-03-01｜核对请求产品与当前资格规则，未知保持未知**

- 输入：RequestedProduct[]；EligibilityPolicy.revision；CaseScope.revision。

- 输出：ProductEligibilityCheck。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ProductEligibilityCheck，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestedProduct[]、EligibilityPolicy.revision、CaseScope.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ProductEligibilityCheck并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-03-02｜确认需授权的产品资格或例外**

- 输入：ProductEligibilityCheck；ApprovalContext。

- 输出：ProductEligibility.decision_ref。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Product eligibility authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ProductEligibility.decision_ref，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ProductEligibilityCheck、ApprovalContext对应的权限或关键证据缺失，When尝试“确认需授权的产品资格或例外”，Then保持待判断并不产生ProductEligibility.decision_ref；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SCOPE-04 — 尽调层级与初步风险context

**变更分类：**Enhanced。**当前工作：**Ops确定DD level；后续M2.4可调整要求。

**原After提案：**保留当前评估层级、政策依据和未决风险问题；M2或Screening新信息可触发重评，不把初判永久固定。

**Pain：**初步尽调层级与后续风险变化之间可能缺乏明确关联。（设计假设，未获客户实证）

**原因假设／控制理由：**层级、指标与要求修订可能没有共同版本引用。

**Opportunity：**保留初判、指标来源和重评依据。

**原PPT引用：**Current PPT-S1-SH3-A1, PPT-S1-SH18-A4；Target PPT-S2-SH279-A3, PPT-S2-SH18-A4。

**D3字段候选：**DDContext.level; DDContext.basis_refs; DDContext.assessment_status; DDContext.revision。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-02, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SCOPE-04-01 | 根据已确认规则生成初步尽调层级候选 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |
| D4A-SCOPE-04-02 | 判断不能由规则确定的层级或风险意义 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | KYC risk / Financial Crime authority |
| D4A-SCOPE-04-03 | 关联新风险事件与DD版本，不覆盖历史 | 规则/代码; SK-10,SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | RM / KYC Operations |


**D4A-SCOPE-04-01｜根据已确认规则生成初步尽调层级候选**

- 输入：CaseScope；RiskIndicator[]；DDPolicy.revision。

- 输出：DDContext.candidate；DDContext.unknown_refs。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DDContext.candidate、DDContext.unknown_refs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、RiskIndicator[]、DDPolicy.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DDContext.candidate、DDContext.unknown_refs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-04-02｜判断不能由规则确定的层级或风险意义**

- 输入：DDContext.candidate；EvidenceRefs。

- 输出：DDLevelDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：KYC risk / Financial Crime authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DDLevelDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given DDContext.candidate、EvidenceRefs对应的权限或关键证据缺失，When尝试“判断不能由规则确定的层级或风险意义”，Then保持待判断并不产生DDLevelDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-04-03｜关联新风险事件与DD版本，不覆盖历史**

- 输入：DDLevelDecision；TriggerEvent。

- 输出：DDContext.revision；RequirementReassessmentTask。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DDContext.revision、RequirementReassessmentTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少DDLevelDecision、TriggerEvent中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DDContext.revision、RequirementReassessmentTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SCOPE-05 — 记录范围及后续使用

**变更分类：**Enhanced。**当前工作：**记录booking model，创建案件及repository。

**原After提案：**保存不可混淆的CaseScope版本与source refs；Requirements/Legal/Credit各引用其实际采用版本。

**Pain：**不同团队可能引用不同的案件范围版本。（设计假设，未获客户实证）

**原因假设／控制理由：**消费者与采用的Scope版本关联不足。

**Opportunity：**用版本化范围和消费者关系降低错用版本风险。

**原PPT引用：**Current PPT-S1-SH3-A2, PPT-S1-SH284-A2；Target PPT-S2-SH279-A4, PPT-S2-SH284-A2。

**D3字段候选：**CaseScope.revision; CaseScope.confirmation_ref; ScopeUse.consumer_ref; ScopeUse.scope_revision。

**Reference：**XB-NIST-THREAD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-02, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SCOPE-05-01 | 保存已确认Scope快照及其来源 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |
| D4A-SCOPE-05-02 | 计算已声明消费者是否需要重新检查范围 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |


**D4A-SCOPE-05-01｜保存已确认Scope快照及其来源**

- 输入：ScopeDecision；CaseScope.expected_revision。

- 输出：CaseScope.revision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CaseScope.revision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ScopeDecision、CaseScope.expected_revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CaseScope.revision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SCOPE-05-02｜计算已声明消费者是否需要重新检查范围**

- 输入：ScopeChange；DependencyEdge[]。

- 输出：AffectedConsumer[]；UnknownImpact[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AffectedConsumer[]、UnknownImpact[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ScopeChange、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AffectedConsumer[]、UnknownImpact[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**相同请求修正主体时不修改其他案件；Requested Product不能自动变Product Eligibility。

**上游/下游：**缺失booking/product eligibility对应工作保持待确认；不阻止足够输入且获准的内部准备。新的范围/资格依据产生版本，不能仅点Next推进。

**Journey／Product：**Scope卡显示交易主体/产品意图/主要未知；弹窗原请求与结构化范围并排；Archify从RM请求聚焦至M0各子活动，不复制duplicate ID。

**价值验证问题：**审阅者能否指出实际法人、请求产品和批准资格的区别？测试纠正一处主体不会修改其他案件。 不添加无数据的节省比例。


## SCN-ENTITY — 区分法人、关联组织、代表人及具体权限

**Branch：**BR-02；**Workflow：**WF-01；**粒度：**6个原工作，16个动作。

**Current PPT：**M1.4/.5确认客户名称、地点与分类；M2/M3承接所需主体证据。PPT没有独立编号的完整代表授权步骤。

**Target PPT：**M1.4/.5移入Agentic；Ops处理classification exceptions。用途级权限模型是行业启发和本项目设计，不是PPT逐字写明。

**共同检查点：**同一Entity A/B与Person T资料；集团职位资料已收到，但对Entity A的协同、声明、签约、交易权限尚不能彼此继承。

**共同输入：**原请求、集团结构概览、职位资料、可访问登记信息及各自实际来源状态。

**场景级初评分（不作自主授权）：**C=5 / O=3 / D=2 / B=3 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 5；确定性Skill/工具 0；语义Skill 5；受限Agent候选 0；人执行判断/确认/提供 6。不是工时比例。


### D3-ENTITY-01 — 法人身份候选匹配

**变更分类：**Reassigned。**当前工作：**确认client legal name/location。

**原After提案：**保存原名、登记名、别名、注册地、标识和出处；相似名称产生候选，不直接覆盖主记录。

**Pain：**相似名称可能增加实体核对负担。（设计假设，未获客户实证）

**原因假设／控制理由：**候选匹配与已验证主数据可能未区分。

**Opportunity：**生成带出处的候选，保留人工采信。

**原PPT引用：**Current PPT-S1-SH284-A3；Target PPT-S2-SH284-A3。

**D3字段候选：**LegalEntity.legal_name; LegalEntity.registration_jurisdiction; LegalEntity.identifiers; EntityMatch.status; EntityMatch.source_refs。

**Reference：**IND-GLEIF-L2；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-01-01 | 比较登记名、别名、地区和标识，给候选而非定论 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / delegated access owner |
| D4A-ENTITY-01-02 | 采信正确的拟交易法人或请求澄清 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | KYC Operations / entity reviewer |


**D4A-ENTITY-01-01｜比较登记名、别名、地区和标识，给候选而非定论**

- 输入：PartyClaims[]；RegistrySnapshot。

- 输出：EntityMatchCandidate[]。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EntityMatchCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对PartyClaims[]、RegistrySnapshot加入缺失值、矛盾及恶意指令，输出EntityMatchCandidate[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-01-02｜采信正确的拟交易法人或请求澄清**

- 输入：EntityMatchCandidate[]；EvidenceRefs。

- 输出：EntityIdentityDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：KYC Operations / entity reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EntityIdentityDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EntityMatchCandidate[]、EvidenceRefs对应的权限或关键证据缺失，When尝试“采信正确的拟交易法人或请求澄清”，Then保持待判断并不产生EntityIdentityDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-ENTITY-02 — 实体分类与例外

**变更分类：**Reassigned。**当前工作：**Ops分类法人类型并triage case。

**原After提案：**已支持的分类建议显示规则/证据；复杂结构保持review_required工作并送到分类例外。

**Pain：**复杂实体结构可能需要重复解释分类依据。（设计假设，未获客户实证）

**原因假设／控制理由：**分类规则、证据与例外处理关联不够明确。

**Opportunity：**确定性分类先行，语义说明辅助，例外保留人的判断。

**原PPT引用：**Current PPT-S1-SH284-A4；Target PPT-S2-SH284-A4, PPT-S2-SH280-EX。

**D3字段候选：**EntityClassification.value; EntityClassification.basis_ref; ClassificationReview.status; ClassificationReview.owner_ref。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-02-01 | 对已知实体类型执行明确分类规则 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / delegated access owner |
| D4A-ENTITY-02-02 | 整理复杂结构的证据与未匹配条件 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | KYC Operations / delegated access owner |
| D4A-ENTITY-02-03 | 决定未能规则化的实体分类 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Entity classification authority |


**D4A-ENTITY-02-01｜对已知实体类型执行明确分类规则**

- 输入：EntityClaims；ClassificationRules.revision。

- 输出：EntityClassificationCandidate。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EntityClassificationCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EntityClaims、ClassificationRules.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EntityClassificationCandidate并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-02-02｜整理复杂结构的证据与未匹配条件**

- 输入：EntityClassificationCandidate；PartyRelationship[]。

- 输出：ClassificationReviewPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClassificationReviewPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对EntityClassificationCandidate、PartyRelationship[]加入缺失值、矛盾及恶意指令，输出ClassificationReviewPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-02-03｜决定未能规则化的实体分类**

- 输入：ClassificationReviewPack。

- 输出：EntityClassification.decision_ref。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Entity classification authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EntityClassification.decision_ref，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ClassificationReviewPack对应的权限或关键证据缺失，When尝试“决定未能规则化的实体分类”，Then保持待判断并不产生EntityClassification.decision_ref；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-ENTITY-03 — 集团关系与ownership/control

**变更分类：**Proposed addition。**当前工作：**源图只给确认主体及验证证据，未定义关系数据库。

**原After提案：**分别记录报告的母子关系、会计合并关系与自然人所有/控制关联，每条边有类型、证据和验证状态。

**Pain：**集团图可能被误当为完整所有权或控制证明。（设计假设，未获客户实证）

**原因假设／控制理由：**不同关系类型、声明与验证状态未分开。

**Opportunity：**提取有来源关系候选并按关系类型审阅。

**原PPT引用：**Current PPT-S1-SH284-A3, PPT-S1-SH292-A4；Target PPT-S2-SH284-A3, PPT-S2-SH292-A4。

**D3字段候选：**PartyRelationship.relationship_type; PartyRelationship.from_ref; PartyRelationship.to_ref; PartyRelationship.verification_ref。

**Reference：**IND-GLEIF-L2；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-03-01 | 从组织材料提取关系声明、主体和出处 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | KYC Operations / delegated access owner |
| D4A-ENTITY-03-02 | 审阅关系含义与证明程度，不由模型确认UBO | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Ownership / control reviewer |
| D4A-ENTITY-03-03 | 保存关系类型、验证结果与版本 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations / delegated access owner |


**D4A-ENTITY-03-01｜从组织材料提取关系声明、主体和出处**

- 输入：OwnershipArtifact；EntityRefs。

- 输出：RelationshipClaim[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RelationshipClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对OwnershipArtifact、EntityRefs加入缺失值、矛盾及恶意指令，输出RelationshipClaim[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-03-02｜审阅关系含义与证明程度，不由模型确认UBO**

- 输入：RelationshipClaim[]；VerificationBasis。

- 输出：PartyRelationship.verification_ref。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Ownership / control reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PartyRelationship.verification_ref，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given RelationshipClaim[]、VerificationBasis对应的权限或关键证据缺失，When尝试“审阅关系含义与证明程度，不由模型确认UBO”，Then保持待判断并不产生PartyRelationship.verification_ref；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-03-03｜保存关系类型、验证结果与版本**

- 输入：RelationshipDecision；EntityRefs。

- 输出：PartyRelationship.revision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PartyRelationship.revision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RelationshipDecision、EntityRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PartyRelationship.revision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-ENTITY-04 — 人、雇主与所代表主体

**变更分类：**Proposed addition。**当前工作：**这些活动承载所需信息；PPT未独立规定代表权限对象。

**原After提案：**Person T、Employer Entity B、Principal Entity A分别记录；业务角色名称与权限判断不合并。

**Pain：**雇主、职位与声称代表的公司可能被合并。（设计假设，未获客户实证）

**原因假设／控制理由：**人物、任职关系与Principal未独立建模。

**Opportunity：**分离Person、Employer、Principal和角色声明。

**原PPT引用：**Current PPT-S1-SH284-A3, PPT-S1-SH18-A1, PPT-S1-SH292-A4；Target PPT-S2-SH284-A3, PPT-S2-SH18-A1, PPT-S2-SH292-A4。

**D3字段候选：**Person.identity_ref; Representative.employer_ref; Representative.principal_ref; Representative.role_claim_ref。

**Reference：**REG-AUSTRAC-CDD, IND-GLEIF-VLEI；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-04-01 | 提取人物、雇主、Principal和角色声明 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | KYC Operations / delegated access owner |
| D4A-ENTITY-04-02 | 确认声明涉及哪一家公司及本次动作 | 人执行判断/确认/提供; SK-06 | 4/2/2/3/3/3/3 | 8 / 6 | RM / appropriate client contact |
| D4A-ENTITY-04-03 | 建立人物和代表关系，不创建业务授权 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations / delegated access owner |


**D4A-ENTITY-04-01｜提取人物、雇主、Principal和角色声明**

- 输入：Request；RoleLetter；PartyRegistry。

- 输出：RepresentativeCandidate。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RepresentativeCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对Request、RoleLetter、PartyRegistry加入缺失值、矛盾及恶意指令，输出RepresentativeCandidate仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-04-02｜确认声明涉及哪一家公司及本次动作**

- 输入：RepresentativeCandidate；OriginalRequest。

- 输出：RepresentativeClarification。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 

- 协同：Human-led；Assist；人负责/异常转交：RM / appropriate client contact（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RepresentativeClarification，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成RepresentativeClarification；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-04-03｜建立人物和代表关系，不创建业务授权**

- 输入：RepresentativeClarification；PartyRefs。

- 输出：Person.ref；Representative.ref。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Person.ref、Representative.ref，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RepresentativeClarification、PartyRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Person.ref、Representative.ref并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-ENTITY-05 — 按用途建立代表权限

**变更分类：**Proposed addition。**当前工作：**确定并验证适用材料，具体权限目录未给。

**原After提案：**对协调资料、正式声明、签署协议等已建模动作分别记录证据用途与决定；不足时生成明确Gap。

**Pain：**一份职位资料可能被误用为所有代表权限。（设计假设，未获客户实证）

**原因假设／控制理由：**证据用途与具体动作授权未独立关联。

**Opportunity：**把协调、声明、签约等用途逐项评估。

**原PPT引用：**Current PPT-S1-SH18-A1, PPT-S1-SH292-A4；Target PPT-S2-SH18-A1, PPT-S2-SH292-A4, PPT-S2-SH281-EX。

**D3字段候选：**AuthorityRecord.principal_ref; AuthorityRecord.action_type; AuthorityRecord.status; AuthorityRecord.evidence_use_refs; AuthorityRecord.decision_ref。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-05-01 | 按Principal和动作整理证据覆盖与未知 | 语义Skill; SK-03,SK-05 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / delegated access owner |
| D4A-ENTITY-05-02 | 由合适角色判断某个动作权限是否成立 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Representative-authority reviewer |
| D4A-ENTITY-05-03 | 记录限定主体与动作的授权结果 | 规则/代码; SK-11 | 2/1/1/5/3/5/5 | 4 / 10 | KYC Operations / delegated access owner |


**D4A-ENTITY-05-01｜按Principal和动作整理证据覆盖与未知**

- 输入：AuthorityRequirement[]；RoleClaims；EvidenceUse[]。

- 输出：AuthorityEvidenceMatrix。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorityEvidenceMatrix，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AuthorityRequirement[]、RoleClaims、EvidenceUse[]加入缺失值、矛盾及恶意指令，输出AuthorityEvidenceMatrix仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-05-02｜由合适角色判断某个动作权限是否成立**

- 输入：AuthorityEvidenceMatrix；ApplicableCriteria。

- 输出：AuthorityDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Representative-authority reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorityDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given AuthorityEvidenceMatrix、ApplicableCriteria对应的权限或关键证据缺失，When尝试“由合适角色判断某个动作权限是否成立”，Then保持待判断并不产生AuthorityDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-05-03｜记录限定主体与动作的授权结果**

- 输入：AuthorityDecision；ExpectedRevision。

- 输出：AuthorityRecord.revision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorityRecord.revision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AuthorityDecision、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AuthorityRecord.revision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-ENTITY-06 — 有限参与者接入

**变更分类：**Proposed addition。**当前工作：**PPT没有客户Portal/Grant细节。

**原After提案：**复用Batch B的联系审核与有限任务Grant，让适当人员提交指定证据，而不让其查看案件所有内部资料。

**Pain：**为上传授权证明而要求先拥有全案权限，可能造成流程死结。（设计假设，未获客户实证）

**原因假设／控制理由：**接入权限与客户的业务代表权被混淆。

**Opportunity：**有限贡献者可提交指定材料，不授予全案或签约权限。

**原PPT引用：**Current PPT-S1-SH284-A2, PPT-S1-SH292-A3, PPT-S1-SH9-A1；Target PPT-S2-SH284-A2, PPT-S2-SH292-A3。

**D3字段候选：**AccessGrant.resource_scope; AccessGrant.permitted_actions; RequestAccessDecision.basis_refs。

**Reference：**IB-ING-DOOR, IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-ENTITY-06-01 | 确认联系与最小访问范围 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Delegated access owner |
| D4A-ENTITY-06-02 | 根据已确认Grant约束任务和资料可见性 | 规则/代码; SK-12 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / delegated access owner |


**D4A-ENTITY-06-01｜确认联系与最小访问范围**

- 输入：ContactCheck；RequestedResources；DisclosurePolicy。

- 输出：RequestAccessDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Delegated access owner（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestAccessDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ContactCheck、RequestedResources、DisclosurePolicy对应的权限或关键证据缺失，When尝试“确认联系与最小访问范围”，Then保持待判断并不产生RequestAccessDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-ENTITY-06-02｜根据已确认Grant约束任务和资料可见性**

- 输入：RequestAccessDecision；ActorSession。

- 输出：AccessGrant；AllowedResourceProjection。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / delegated access owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺booking/资格/主体/权限时停相应工作；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确context或有权决定到达后重读相关版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AccessGrant、AllowedResourceProjection，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestAccessDecision、ActorSession中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AccessGrant、AllowedResourceProjection并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**雇主/Principal/任职/动作权限/访问Grant分别保留；未验证关系不能成为真实授权。

**上游/下游：**实体无法唯一识别先澄清；任职资料不能解决principal/action权限。有限贡献者可按独立grant提供权限资料，不能全案开放。

**Journey／Product：**同一人物及两法人，关系边分别标reported/reviewed；选代表时显示employer、principal、action范围，避免人像警示色暗示风险。

**价值验证问题：**能否看出任职、协调、签约和访问是四类不同事实？ 不添加无数据的节省比例。


## SCN-REQUIREMENTS — 形成可解释的本案要求

**Branch：**BR-03；**Workflow：**WF-02；**粒度：**6个原工作，17个动作。

**Current PPT：**M2.1 AML/KYC及reliefs，M2.2 non-AML及exemptions，M2.3汇总，M2.4风险/EDD调整，M2.5发布；Current已经有policy/CIP/risk rules。

**Target PPT：**同样M2.1–.5移入Agentic，复杂信息/分类交给Ops；自动形成机器可执行规则属于设计细化。

**共同检查点：**同一Scope版本与相同已知/未知context；两侧使用相同适用政策输入，不让Target偷偷增加已批准exemption。

**共同输入：**Scope、实体类型、booking状态、产品、已取得政策版本、初步风险与历史要求。

**场景级初评分（不作自主授权）：**C=5 / O=4 / D=3 / B=3 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 7；确定性Skill/工具 2；语义Skill 2；受限Agent候选 1；人执行判断/确认/提供 5。不是工时比例。


### D3-REQUIREMENTS-01 — AML/KYC要求与relief

**变更分类：**Reassigned。**当前工作：**根据适用context确定要求及reliefs。

**原After提案：**绑定适用policy/CIP版本、主体、用途、条件评估结果；规则可确定则执行，不能确定则建立review工作。

**Pain：**适用要求与relief依据可能需要逐案重新查阅。（设计假设，未获客户实证）

**原因假设／控制理由：**Scope、规则版本、主体用途和例外未清晰连接。

**Opportunity：**规则算适用性，语义检索提供解释，例外送人。

**原PPT引用：**Current PPT-S1-SH18-A1；Target PPT-S2-SH18-A1。

**D3字段候选：**Requirement.policy_revision; Requirement.subject_ref; Requirement.purpose_code; Requirement.applicability; ApplicabilityReview.status。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-01-01 | 检索适用政策版本和已批准条款 | 确定性Skill/工具; SK-01 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-01-02 | 执行明确AML/KYC条件，保留未知适用性 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-01-03 | 决定需授权的relief或政策例外 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Policy exception authority |


**D4A-REQUIREMENTS-01-01｜检索适用政策版本和已批准条款**

- 输入：CaseScope；ApprovedPolicyCatalogue。

- 输出：PolicyExcerpt[]。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PolicyExcerpt[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、ApprovedPolicyCatalogue中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PolicyExcerpt[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-01-02｜执行明确AML/KYC条件，保留未知适用性**

- 输入：ScopeInputs；PolicyRules.revision。

- 输出：RequirementApplicability[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementApplicability[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ScopeInputs、PolicyRules.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequirementApplicability[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-01-03｜决定需授权的relief或政策例外**

- 输入：RequirementApplicability[]；PolicyExcerpt[]。

- 输出：ReliefDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Policy exception authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReliefDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given RequirementApplicability[]、PolicyExcerpt[]对应的权限或关键证据缺失，When尝试“决定需授权的relief或政策例外”，Then保持待判断并不产生ReliefDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-REQUIREMENTS-02 — Non-AML要求与exemption

**变更分类：**Enhanced。**当前工作：**需要时与Legal确定non-AML要求和exemption。

**原After提案：**分开放置non-AML领域与所需专业输入；请求具体exemption决定，记录其有效scope而非删除要求。

**Pain：**非AML要求可能因专业输入分散而遗漏或延后。（设计假设，未获客户实证）

**原因假设／控制理由：**要求的领域、责任与exemption决定未关联。

**Opportunity：**保留独立控制来源，路由具体专业问题。

**原PPT引用：**Current PPT-S1-SH18-A2；Target PPT-S2-SH18-A2。

**D3字段候选：**Requirement.domain; ExemptionDecision.scope_ref; ExemptionDecision.authority_ref; ExemptionDecision.basis_ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-02-01 | 识别有明确配置的非AML要求与待确认项 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-02-02 | 由相应专业方审阅exemption或未明确适用项 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Legal / relevant policy authority |
| D4A-REQUIREMENTS-02-03 | 保存exemption的范围和依据，不删除原控制 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | KYC Operations / policy owner |


**D4A-REQUIREMENTS-02-01｜识别有明确配置的非AML要求与待确认项**

- 输入：ScopeInputs；NonAMLRuleSet。

- 输出：NonAMLRequirement[]；OpenApplicability[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅NonAMLRequirement[]、OpenApplicability[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ScopeInputs、NonAMLRuleSet中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限NonAMLRequirement[]、OpenApplicability[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-02-02｜由相应专业方审阅exemption或未明确适用项**

- 输入：NonAMLRequirement[]；ExpertContext。

- 输出：ExemptionDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal / relevant policy authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ExemptionDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given NonAMLRequirement[]、ExpertContext对应的权限或关键证据缺失，When尝试“由相应专业方审阅exemption或未明确适用项”，Then保持待判断并不产生ExemptionDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-02-03｜保存exemption的范围和依据，不删除原控制**

- 输入：ExemptionDecision；RequirementRefs。

- 输出：RequirementDecisionLink。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementDecisionLink，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ExemptionDecision、RequirementRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequirementDecisionLink并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-REQUIREMENTS-03 — 汇总要求

**变更分类：**Enhanced。**当前工作：**合并各项要求。

**原After提案：**按subject/purpose组织RequirementSet；候选重复可合并展示但保留不同来源/控制，记录版本及差异。

**Pain：**相似要求与重复文件名称可能掩盖不同控制目的。（设计假设，未获客户实证）

**原因假设／控制理由：**按文件名而非主体/用途归组。

**Opportunity：**展示合并但保留每一要求的来源和目的。

**原PPT引用：**Current PPT-S1-SH18-A3；Target PPT-S2-SH18-A3。

**D3字段候选：**RequirementSet.revision; RequirementSet.context_refs; Requirement.definition_ref; Requirement.origin_refs。

**Reference：**IND-SWIFT-KYC；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-03-01 | 识别可能重复的要求表述与不同用途 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-03-02 | 按已确认定义建立版本化RequirementSet | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | KYC Operations / policy owner |


**D4A-REQUIREMENTS-03-01｜识别可能重复的要求表述与不同用途**

- 输入：RequirementCandidate[]。

- 输出：RequirementGroupingProposal。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementGroupingProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对RequirementCandidate[]加入缺失值、矛盾及恶意指令，输出RequirementGroupingProposal仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-03-02｜按已确认定义建立版本化RequirementSet**

- 输入：AcceptedRequirement[]；ScopeRevision。

- 输出：RequirementSet.revision；OriginLinks。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementSet.revision、OriginLinks，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AcceptedRequirement[]、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequirementSet.revision、OriginLinks并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-REQUIREMENTS-04 — 风险重评与EDD影响

**变更分类：**Enhanced。**当前工作：**应用风险评级、识别EDD indicators、调整要求。

**原After提案：**新风险问题绑定触发事件，重算受影响适用性并留delta；不因请求急迫调低控制。

**Pain：**新风险信息可能未及时反馈到相应要求。（设计假设，未获客户实证）

**原因假设／控制理由：**风险指标、决定与要求修订缺少明确事件链。

**Opportunity：**规则识别受影响项，必要判断交给人。

**原PPT引用：**Current PPT-S1-SH18-A4；Target PPT-S2-SH18-A4。

**D3字段候选：**RiskAssessment.revision; RiskIndicator.trigger_ref; RequirementChange.affected_refs; EDDApplicabilityAssessment.ref。

**Reference：**REG-AUSTRAC-EDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-04-01 | 依据已批准风险触发条件定位要求重评范围 | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-04-02 | 判断未定风险意义和相应要求调整 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Financial Crime / risk authority |
| D4A-REQUIREMENTS-04-03 | 记录调整差异并只重开关联适用性工作 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | KYC Operations / policy owner |


**D4A-REQUIREMENTS-04-01｜依据已批准风险触发条件定位要求重评范围**

- 输入：RiskEvent；PolicyRuleSet；DependencyEdge[]。

- 输出：RequirementReassessmentProposal。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementReassessmentProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RiskEvent、PolicyRuleSet、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequirementReassessmentProposal并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-04-02｜判断未定风险意义和相应要求调整**

- 输入：RiskEvidence；RequirementReassessmentProposal。

- 输出：RiskAdjustmentDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Financial Crime / risk authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RiskAdjustmentDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given RiskEvidence、RequirementReassessmentProposal对应的权限或关键证据缺失，When尝试“判断未定风险意义和相应要求调整”，Then保持待判断并不产生RiskAdjustmentDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-04-03｜记录调整差异并只重开关联适用性工作**

- 输入：RiskAdjustmentDecision；RequirementSet.revision。

- 输出：RequirementChange；ReviewTask[]。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementChange、ReviewTask[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RiskAdjustmentDecision、RequirementSet.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequirementChange、ReviewTask[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-REQUIREMENTS-05 — 要求发布与客户请求

**变更分类：**Reassigned。**当前工作：**M2.5 Ops发要求；M3.3另见RM和Ops，具体发送责任待确认。

**原After提案：**内部完整RequirementSet投影为获准客户请求；发布版本、收件人、渠道及dispatch审阅分别保留。

**Pain：**内部要求直接外发可能难懂或泄露受限理由。（设计假设，未获客户实证）

**原因假设／控制理由：**内部完整要求与客户投影未分层。

**Opportunity：**形成针对性请求草稿，权限控制后派发。

**原PPT引用：**Current PPT-S1-SH291-A1, PPT-S1-SH292-A3, PPT-S1-SH9-A1；Target PPT-S2-SH18-A5, PPT-S2-SH292-A3。

**D3字段候选：**InformationRequest.requirement_set_revision; RequestRecipient.permitted_item_refs; DisclosureReview.ref; Notification.dispatch_status。

**Reference：**IB-ING-DOOR, IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-05-01 | 将获准要求转换成客户可理解的草稿项目 | 语义Skill; SK-08 | 4/2/2/4/4/3/3 | 8 / 7 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-05-02 | 审阅需人工确认的新请求、披露和收件范围 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Request / disclosure approver |
| D4A-REQUIREMENTS-05-03 | 派发已批准请求版本并独立记录结果 | 确定性Skill/工具; SK-08,SK-12 | 2/3/1/3/3/5/4 | 6 / 8 | KYC Operations / policy owner |


**D4A-REQUIREMENTS-05-01｜将获准要求转换成客户可理解的草稿项目**

- 输入：AllowedRequirementProjection；ApprovedResponseOptions。

- 输出：ClientRequestDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClientRequestDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AllowedRequirementProjection、ApprovedResponseOptions加入缺失值、矛盾及恶意指令，输出ClientRequestDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-05-02｜审阅需人工确认的新请求、披露和收件范围**

- 输入：ClientRequestDraft；DisclosurePolicy。

- 输出：RequestReviewDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Request / disclosure approver（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestReviewDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ClientRequestDraft、DisclosurePolicy对应的权限或关键证据缺失，When尝试“审阅需人工确认的新请求、披露和收件范围”，Then保持待判断并不产生RequestReviewDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-05-03｜派发已批准请求版本并独立记录结果**

- 输入：ApprovedRequestRevision；AllowedRecipient。

- 输出：NotificationDispatch；DeliveryObservation。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅NotificationDispatch、DeliveryObservation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedRequestRevision、AllowedRecipient中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限NotificationDispatch、DeliveryObservation并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-REQUIREMENTS-06 — 要求计划变更后重用

**变更分类：**Proposed addition。**当前工作：**源图无明确change graph字段，已有risk adjustment。

**原After提案：**Scope或policy引用改变时保留旧plan，显示哪些requirement需重评及哪些证据用途可继续引用。

**Pain：**Scope变化可能引发全部重做或旧证据过度继承。（设计假设，未获客户实证）

**原因假设／控制理由：**要求修订、证据用途与当前适用性未逐项评估。

**Opportunity：**规则确定已知影响，复杂缺口再规划有限补充。

**原PPT引用：**Current PPT-S1-SH18-A1, PPT-S1-SH18-A3, PPT-S1-SH3-A2；Target PPT-S2-SH18-A1, PPT-S2-SH18-A3, PPT-S2-SH279-A4。

**D3字段候选：**RequirementSet.supersedes_ref; RequirementUse.currency_status; ChangeImpact.unknown_refs。

**Reference：**IND-ISDA-DRR, XB-NIST-THREAD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-08, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-REQUIREMENTS-06-01 | 计算Scope或政策修订的显式依赖影响 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / policy owner |
| D4A-REQUIREMENTS-06-02 | 针对未知影响提出有限核对/取证顺序 | 受限Agent候选; SK-01,SK-05,SK-06 | 4/4/4/3/4/3/3 | 12 / 6 | KYC Operations / policy owner；AG-CASE |
| D4A-REQUIREMENTS-06-03 | 审阅需要改要求或允许证据重用的判断 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | KYC / policy reviewer |


**D4A-REQUIREMENTS-06-01｜计算Scope或政策修订的显式依赖影响**

- 输入：ScopeChange；RequirementSet；DependencyEdge[]。

- 输出：KnownImpact；UnknownImpact。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅KnownImpact、UnknownImpact，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ScopeChange、RequirementSet、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限KnownImpact、UnknownImpact并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-06-02｜针对未知影响提出有限核对/取证顺序**

- 输入：UnknownImpact；AllowedSkills；CaseReadContext。

- 输出：ReassessmentPlanProposal。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：KYC Operations / policy owner（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReassessmentPlanProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出ReassessmentPlanProposal。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-REQUIREMENTS-06-03｜审阅需要改要求或允许证据重用的判断**

- 输入：ReassessmentPlanProposal；CurrencyEvidence。

- 输出：RequirementReuseDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：KYC / policy reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：规则、上下文或例外权限未知；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新scope/policy/有权决定产生后定向重评；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequirementReuseDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ReassessmentPlanProposal、CurrencyEvidence对应的权限或关键证据缺失，When尝试“审阅需要改要求或允许证据重用的判断”，Then保持待判断并不产生RequirementReuseDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**unknown适用性不能变not_required；新政策引用不自动删除已有控制或批准。

**上游/下游：**某context缺失保留相应适用性unknown，不把全部要求阻断或全部当required。已获支持的要求可先准备取证。

**Journey／Product：**Requirements视图将Applies to、Purpose、Basis、Status、Remaining gap对齐；Compare显示同一要求如何从人工整合到版本化plan。

**价值验证问题：**指定要求能否追到主体、用途、依据和scope？异常context变化是否精确影响相关项？ 不添加无数据的节省比例。


## SCN-SOURCE — 先使用获准且合适的资料来源

**Branch：**BR-04；**Workflow：**WF-03；**粒度：**6个原工作，14个动作。

**Current PPT：**M3.1已经从public/commercial sources获取资料；M3.5已有sourcing audit。

**Target PPT：**相同活动位于Agentic lane；自动源路由、claim extraction和用途关联为方案细化。

**共同检查点：**同一RequirementSet、已有证据库存、同样获准数据源和可用性；Target不获得Current不存在的真实连接。

**共同输入：**Entity A的已知标识、现有资料、数据源访问权限/查询范围、源时点。

**场景级初评分（不作自主授权）：**C=4 / O=4 / D=4 / B=3 / V=4 / T=4 / H=4。

**执行组成：**规则/代码 8；确定性Skill/工具 2；语义Skill 3；受限Agent候选 1；人执行判断/确认/提供 0。不是工时比例。


### D3-SOURCE-01 — 来源选择与检索资格

**变更分类：**Reassigned。**当前工作：**从public/commercial sources查找。

**原After提案：**对subject和required fact挑选已允许来源，绑定source policy与query scope；无访问依据不运行。

**Pain：**在多个来源中重复寻找同一事实，可能增加人工负担。（设计假设，未获客户实证）

**原因假设／控制理由：**来源选择与所需事实、访问资格和已有证据脱节。

**Opportunity：**先固定来源优先序；只有结果依赖的多步检索才验证Agent增益。

**原PPT引用：**Current PPT-S1-SH292-A1；Target PPT-S2-SH292-A1。

**D3字段候选：**SourceRetrieval.subject_ref; SourceRetrieval.query_scope; SourceRetrieval.access_basis_ref; SourceRetrieval.adapter_ref。

**Reference：**IND-SWIFT-KYC；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-01-01 | 检查请求事实、数据源和访问依据 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations |
| D4A-SOURCE-01-02 | 按结果选择下一获准来源或停止取证 | 受限Agent候选; SK-01,SK-05 | 4/4/4/3/4/3/3 | 12 / 6 | KYC Operations；AG-EVID |
| D4A-SOURCE-01-03 | 执行已获准的单次来源查询 | 确定性Skill/工具; SK-01 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations |


**D4A-SOURCE-01-01｜检查请求事实、数据源和访问依据**

- 输入：RequiredFact；ApprovedSourceCatalogue；AccessPolicy。

- 输出：AllowedSourceSet。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AllowedSourceSet，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequiredFact、ApprovedSourceCatalogue、AccessPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedSourceSet并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-01-02｜按结果选择下一获准来源或停止取证**

- 输入：AllowedSourceSet；ExistingEvidence；RetrievalResult[]。

- 输出：EvidenceSearchPlan；ResidualUnknowns。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：KYC Operations（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceSearchPlan、ResidualUnknowns，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出EvidenceSearchPlan、ResidualUnknowns。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-01-03｜执行已获准的单次来源查询**

- 输入：ApprovedQueryIntent；SubjectSnapshot。

- 输出：SourceResponse；RetrievalReceipt。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SourceResponse、RetrievalReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedQueryIntent、SubjectSnapshot中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限SourceResponse、RetrievalReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SOURCE-02 — 记录来源和不同时间

**变更分类：**Enhanced。**当前工作：**已有sourcing audit；具体字段未展示。

**原After提案：**分别记录检索时间、资料内容时点、来源版本、query返回状态和可重现引用。

**Pain：**检索日期可能被误当作资料生效时间。（设计假设，未获客户实证）

**原因假设／控制理由：**来源时点、取得时点和版本记录混合。

**Opportunity：**确定性保留来源元数据，不使用LLM编造日期。

**原PPT引用：**Current PPT-S1-SH292-A1, PPT-S1-SH292-A5；Target PPT-S2-SH292-A1, PPT-S2-SH292-A5。

**D3字段候选：**SourceRetrieval.retrieved_at; EvidenceArtifact.data_as_of; EvidenceArtifact.source_revision; ProvenanceRecord.locator。

**Reference：**XB-GS1, XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-02-01 | 分别记录资料时点、检索时间和来源位置 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations |
| D4A-SOURCE-02-02 | 检查来源元数据完整性，缺失保持unknown | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations |


**D4A-SOURCE-02-01｜分别记录资料时点、检索时间和来源位置**

- 输入：SourceResponse；AdapterReceipt。

- 输出：ProvenanceRecord；EvidenceArtifact.data_as_of。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ProvenanceRecord、EvidenceArtifact.data_as_of，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SourceResponse、AdapterReceipt中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ProvenanceRecord、EvidenceArtifact.data_as_of并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-02-02｜检查来源元数据完整性，缺失保持unknown**

- 输入：ProvenanceRecord；RequiredMetadata。

- 输出：MetadataGap[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MetadataGap[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ProvenanceRecord、RequiredMetadata中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限MetadataGap[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SOURCE-03 — 提取可比较claims

**变更分类：**Proposed addition。**当前工作：**获取后验证资料，抽取工具并未规定。

**原After提案：**从资料准备候选name/relationship等claims，保留原位置和提取状态；确认后再形成下游可用值。

**Pain：**人员可能重复从文件读取并转录相同属性。（设计假设，未获客户实证）

**原因假设／控制理由：**资料原文与字段声明没有稳定位置关联。

**Opportunity：**抽取候选Claim及locator，独立验证后采用。

**原PPT引用：**Current PPT-S1-SH292-A1, PPT-S1-SH292-A4；Target PPT-S2-SH292-A1, PPT-S2-SH292-A4。

**D3字段候选：**EvidenceClaim.attribute_code; EvidenceClaim.reported_value; EvidenceClaim.origin_locator; EvidenceClaim.value_status。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-03-01 | 按字段schema提取带原文位置的候选Claim | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | KYC Operations |
| D4A-SOURCE-03-02 | 检查输出结构、引用范围与必需字段 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations |


**D4A-SOURCE-03-01｜按字段schema提取带原文位置的候选Claim**

- 输入：EvidenceArtifact；ExtractionSchema。

- 输出：EvidenceClaim[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对EvidenceArtifact、ExtractionSchema加入缺失值、矛盾及恶意指令，输出EvidenceClaim[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-03-02｜检查输出结构、引用范围与必需字段**

- 输入：EvidenceClaim[]；AllowedDocumentScope。

- 输出：ExtractionValidation；RejectedClaim[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ExtractionValidation、RejectedClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceClaim[]、AllowedDocumentScope中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ExtractionValidation、RejectedClaim[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SOURCE-04 — 已有资料与重复候选

**变更分类：**Enhanced。**当前工作：**识别缺口前须考虑已有材料；当前去重实现未知。

**原After提案：**比较同一文件或同一源版本的候选重复，保留原始贡献者与路径；展示多次提交，不任意删证据。

**Pain：**重复提交可能增加检查成本，也可能掩盖新的资料版本。（设计假设，未获客户实证）

**原因假设／控制理由：**重复文件与不同用途、提交历史混同。

**Opportunity：**确定性重复检测先行，语义近似仅作候选。

**原PPT引用：**Current PPT-S1-SH292-A1, PPT-S1-SH292-A2；Target PPT-S2-SH292-A1, PPT-S2-SH292-A2。

**D3字段候选：**EvidenceArtifact.content_ref; DuplicateCandidate.match_basis; Submission.original_source_ref。

**Reference：**IND-SWIFT-KYC；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-04-01 | 按内容指纹和来源版本识别确切重复 | 规则/代码; SK-03 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations |
| D4A-SOURCE-04-02 | 识别语义近似材料与差异，不自动删除 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations |
| D4A-SOURCE-04-03 | 保留原始提交记录并关联重复候选 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations |


**D4A-SOURCE-04-01｜按内容指纹和来源版本识别确切重复**

- 输入：EvidenceArtifact[]；SubmissionHistory。

- 输出：ExactDuplicateCandidate[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ExactDuplicateCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceArtifact[]、SubmissionHistory中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ExactDuplicateCandidate[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-04-02｜识别语义近似材料与差异，不自动删除**

- 输入：NonExactArtifactPairs。

- 输出：NearDuplicateReview。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅NearDuplicateReview，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对NonExactArtifactPairs加入缺失值、矛盾及恶意指令，输出NearDuplicateReview仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-04-03｜保留原始提交记录并关联重复候选**

- 输入：DuplicateAssessment；SubmissionRefs。

- 输出：EvidenceLineageLinks。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceLineageLinks，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少DuplicateAssessment、SubmissionRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EvidenceLineageLinks并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SOURCE-05 — 来源失败和恢复

**变更分类：**Proposed addition。**当前工作：**源图未展开错误处理。

**原After提案：**查询超时/部分返回/权限不足保留具体状态和下一步；安全重试使用关联请求ID。

**Pain：**来源失败可能被误解为没有所需信息。（设计假设，未获客户实证）

**原因假设／控制理由：**查询成功、部分响应和失败缺少独立状态。

**Opportunity：**有限重试与失败恢复使用确定性工作流。

**原PPT引用：**Current PPT-S1-SH292-A1, PPT-S1-SH292-A5；Target PPT-S2-SH292-A1, PPT-S2-SH292-A5。

**D3字段候选：**SourceRetrieval.result_status; SourceRetrieval.failure_code; SourceRetrieval.retry_of_ref; WorkItem.wait_reason_ref。

**Reference：**XB-IATA；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-05-01 | 区分超时、部分结果、拒绝访问与空成功 | 规则/代码; SK-09 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations |
| D4A-SOURCE-05-02 | 按固定预算重试同一安全查询或交还来源选择 | 确定性Skill/工具; SK-01,SK-07 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations |


**D4A-SOURCE-05-01｜区分超时、部分结果、拒绝访问与空成功**

- 输入：AdapterReceipt；QueryIntent。

- 输出：RetrievalStatus；FailureReason。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RetrievalStatus、FailureReason，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AdapterReceipt、QueryIntent中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RetrievalStatus、FailureReason并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-05-02｜按固定预算重试同一安全查询或交还来源选择**

- 输入：RetryPolicy；IdempotencyKey；LastReceipt。

- 输出：RetryReceipt；SourceUnavailableTask。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RetryReceipt、SourceUnavailableTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RetryPolicy、IdempotencyKey、LastReceipt中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RetryReceipt、SourceUnavailableTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-SOURCE-06 — 资料与用途关联

**变更分类：**Enhanced。**当前工作：**验证资料并识别残余缺口。

**原After提案：**候选资料连接subject+requirement+purpose，由后续用途评估确认；没有因来源权威直接满意。

**Pain：**找到一份资料后可能不知道它究竟支持哪项要求。（设计假设，未获客户实证）

**原因假设／控制理由：**资料与subject/purpose的关系尚未评估。

**Opportunity：**推荐证据用途关联，由规则和必要人工建立充分性。

**原PPT引用：**Current PPT-S1-SH292-A2, PPT-S1-SH292-A4；Target PPT-S2-SH292-A2, PPT-S2-SH292-A4。

**D3字段候选：**EvidenceUseAssessment.requirement_ref; EvidenceUseAssessment.subject_ref; EvidenceUseAssessment.purpose_code; EvidenceUseAssessment.sufficiency。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-01, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-SOURCE-06-01 | 对照要求与Claim提出用途关联 | 语义Skill; SK-03,SK-05 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations |
| D4A-SOURCE-06-02 | 建立未评估的用途记录，绝不直接写sufficient | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | KYC Operations |


**D4A-SOURCE-06-01｜对照要求与Claim提出用途关联**

- 输入：Requirement[]；EvidenceClaim[]。

- 输出：EvidenceUseCandidate[]。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceUseCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对Requirement[]、EvidenceClaim[]加入缺失值、矛盾及恶意指令，输出EvidenceUseCandidate[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-SOURCE-06-02｜建立未评估的用途记录，绝不直接写sufficient**

- 输入：EvidenceUseCandidate[]；ScopeRevision。

- 输出：EvidenceUseAssessment.not_assessed。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceUseAssessment.not_assessed，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceUseCandidate[]、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EvidenceUseAssessment.not_assessed并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**来源失败不生成资料；抽取保留locator；hash相同不等于用途相同。

**上游/下游：**无法唯一识别或没有访问依据停止相应查询；失败记录unknown/error不伪造值；返回新的具体source response后恢复。

**Journey／Product：**Evidence按来源/主体/资料时点/用途显示；一个资料卡可展开用途连接，不能整卡全绿。

**价值验证问题：**是否在请求客户前识别了可复用来源？source failure是否仍透明？ 不添加无数据的节省比例。


## SCN-GAP — 把内部缺口组织成可回应的请求

**Branch：**BR-05；**Workflow：**WF-04；**粒度：**6个原工作，15个动作。

**Current PPT：**M3.2识别residual gaps，M3.3向客户要信息；M2.5发要求，RM/Client有澄清动作。源图未确认客户渠道。

**Target PPT：**M3.2/.3产品执行；有限贡献者、安全网页、通知与资料提交分离来自获批设计与案例启发。

**共同检查点：**相同两项初始残余缺口：Person T协调资料授权、Entity A ownership/control；其他内部要求保持独立。

**共同输入：**已有用途评估、缺口、已审阅联系信息、实际Grant、客户可披露原因。

**场景级初评分（不作自主授权）：**C=4 / O=4 / D=2 / B=3 / V=4 / T=4 / H=4。

**执行组成：**规则/代码 8；确定性Skill/工具 1；语义Skill 2；受限Agent候选 0；人执行判断/确认/提供 4。不是工时比例。


### D3-GAP-01 — 识别实际残余缺口

**变更分类：**Enhanced。**当前工作：**识别资料未满足的部分。

**原After提案：**结合当前用途评估与适用性生成具体缺口类型；已有open gap关联，不重复制造gap。

**Pain：**相同未满足要求可能被多人重复开缺口。（设计假设，未获客户实证）

**原因假设／控制理由：**当前要求、用途评估和既有open gap未联查。

**Opportunity：**按具体对象计算残余缺口并去重。

**原PPT引用：**Current PPT-S1-SH292-A2；Target PPT-S2-SH292-A2。

**D3字段候选：**Gap.requirement_ref; Gap.subject_ref; Gap.purpose_code; Gap.reason_code; Gap.origin_assessment_ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-01-01 | 计算未满足要求的具体缺口并关联已有项 | 规则/代码; SK-05,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |
| D4A-GAP-01-02 | 应用经校验的Gap差异，未知适用性保持内部审阅 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |


**D4A-GAP-01-01｜计算未满足要求的具体缺口并关联已有项**

- 输入：RequirementApplicability；EvidenceUseAssessment[]；OpenGap[]。

- 输出：GapDelta。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅GapDelta，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequirementApplicability、EvidenceUseAssessment[]、OpenGap[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限GapDelta并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-01-02｜应用经校验的Gap差异，未知适用性保持内部审阅**

- 输入：GapDelta；ExpectedRevision。

- 输出：Gap.revision；ApplicabilityReviewTask。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Gap.revision、ApplicabilityReviewTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少GapDelta、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Gap.revision、ApplicabilityReviewTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-GAP-02 — 组织客户请求项

**变更分类：**Enhanced。**当前工作：**向客户发要求并澄清。

**原After提案：**相关缺口聚合为可回应项目，保留每个requirement/subject/purpose链接，显示接受的响应方式与理由。

**Pain：**客户可能收到重复、抽象或难以回应的补件文字。（设计假设，未获客户实证）

**原因假设／控制理由：**请求按内部控制逐条复制，没有按回应行为组织。

**Opportunity：**一次组合相关需求并保留各项来源。

**原PPT引用：**Current PPT-S1-SH291-A1, PPT-S1-SH292-A3, PPT-S1-SH9-A1；Target PPT-S2-SH18-A5, PPT-S2-SH292-A3。

**D3字段候选：**RequestItem.gap_refs; RequestItem.client_reason; RequestItem.response_options; InformationRequest.revision。

**Reference：**IB-ING-DOOR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-02-01 | 将相关Gap组织成简短可回应的请求草稿 | 语义Skill; SK-08 | 4/2/2/4/4/3/3 | 8 / 7 | RM / KYC Operations |
| D4A-GAP-02-02 | 检查每个请求仍关联原控制且无越界披露 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |


**D4A-GAP-02-01｜将相关Gap组织成简短可回应的请求草稿**

- 输入：AllowedGapProjection；ResponseOptions。

- 输出：RequestItemDraft[]。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestItemDraft[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AllowedGapProjection、ResponseOptions加入缺失值、矛盾及恶意指令，输出RequestItemDraft[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-02-02｜检查每个请求仍关联原控制且无越界披露**

- 输入：RequestItemDraft[]；RequirementRefs；DisclosureConstraints。

- 输出：RequestDraftValidation。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestDraftValidation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestItemDraft[]、RequirementRefs、DisclosureConstraints中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequestDraftValidation并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-GAP-03 — 收件人与有限访问

**变更分类：**Proposed addition。**当前工作：**Current只说明客户与RM/Ops沟通。

**原After提案：**区分Person T授权项目与适当公司贡献者ownership项目，每个Grant仅覆盖已审阅资源和动作。

**Pain：**集团联系人可能被误授予所有个人资料或实体文件。（设计假设，未获客户实证）

**原因假设／控制理由：**收件人、公司关系和请求级访问混用。

**Opportunity：**逐资源/动作授权，模型只可提出候选。

**原PPT引用：**Current PPT-S1-SH292-A3, PPT-S1-SH9-A1；Target PPT-S2-SH292-A3。

**D3字段候选：**RequestRecipient.person_ref; AccessGrant.resource_scope; AccessGrant.provisioning_basis_ref; DisclosureReview.ref。

**Reference：**IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-03-01 | 批准适当联系人及最小资源动作范围 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Delegated access owner |
| D4A-GAP-03-02 | 配置并强制执行指定请求项Grant | 规则/代码; SK-12 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |


**D4A-GAP-03-01｜批准适当联系人及最小资源动作范围**

- 输入：ContactRecord；ProposedRequestScope。

- 输出：RequestAccessDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Delegated access owner（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestAccessDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ContactRecord、ProposedRequestScope对应的权限或关键证据缺失，When尝试“批准适当联系人及最小资源动作范围”，Then保持待判断并不产生RequestAccessDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-03-02｜配置并强制执行指定请求项Grant**

- 输入：RequestAccessDecision；GrantPolicy。

- 输出：AccessGrant；AuthorisedProjection。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AccessGrant、AuthorisedProjection，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestAccessDecision、GrantPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AccessGrant、AuthorisedProjection并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-GAP-04 — 请求审批、发送、送达

**变更分类：**Proposed addition。**当前工作：**源图不展开传输状态。

**原After提案：**审阅请求版本后按配置通知；草稿、已批准、发送、送达观察各独立。官网Reference+mock authentication为演示默认配置。

**Pain：**请求已批准、发送或送达可能被一个状态覆盖。（设计假设，未获客户实证）

**原因假设／控制理由：**请求审阅与渠道派发缺少独立事件。

**Opportunity：**审批、派发和送达观察分别记录，幂等重试。

**原PPT引用：**Current PPT-S1-SH292-A3, PPT-S1-SH9-A1；Target PPT-S2-SH292-A3。

**D3字段候选：**RequestReview.status; Notification.dispatch_status; Notification.delivery_status; InformationRequest.sent_revision。

**Reference：**IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-04-01 | 确认需要人工批准的请求版本与披露内容 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Request / disclosure approver |
| D4A-GAP-04-02 | 通过合成适配器发送已批准内容 | 确定性Skill/工具; SK-08,SK-12 | 2/3/1/3/3/5/4 | 6 / 8 | RM / KYC Operations |
| D4A-GAP-04-03 | 记录送达或失败观察，不据此关闭请求 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |


**D4A-GAP-04-01｜确认需要人工批准的请求版本与披露内容**

- 输入：RequestDraft；RecipientScope；ApprovalRule。

- 输出：RequestApproval。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Request / disclosure approver（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestApproval，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given RequestDraft、RecipientScope、ApprovalRule对应的权限或关键证据缺失，When尝试“确认需要人工批准的请求版本与披露内容”，Then保持待判断并不产生RequestApproval；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-04-02｜通过合成适配器发送已批准内容**

- 输入：RequestApproval；SentRevision；IdempotencyKey。

- 输出：DispatchReceipt。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DispatchReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestApproval、SentRevision、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DispatchReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-04-03｜记录送达或失败观察，不据此关闭请求**

- 输入：DispatchReceipt；ChannelObservation。

- 输出：DeliveryObservation；RequestActivity。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DeliveryObservation、RequestActivity，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少DispatchReceipt、ChannelObservation中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DeliveryObservation、RequestActivity并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-GAP-05 — 局部响应与澄清

**变更分类：**Enhanced。**当前工作：**客户提供资料及回应。

**原After提案：**客户保存/提交自己的项目并获得回执；另一项保持open；提问关联原request item。

**Pain：**一项资料提交可能使全部Request误关闭。（设计假设，未获客户实证）

**原因假设／控制理由：**项级回应、材料接收和评估未分开。

**Opportunity：**贡献者分项保存提交，系统仅记录本项收到。

**原PPT引用：**Current PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A4；Target PPT-S2-SH292-A3, PPT-S2-SH292-A4。

**D3字段候选：**Submission.request_item_refs; Submission.submitted_by; Submission.on_behalf_of; RequestItem.response_status。

**Reference：**IB-ING-DOOR, IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-05-01 | 客户贡献者提交本人获准任务的资料 | 人执行判断/确认/提供; SK-08 | 2/1/1/4/2/4/3 | 4 / 8 | Authorised task contributor |
| D4A-GAP-05-02 | 关联原提供人、项目、版本并生成回执 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |
| D4A-GAP-05-03 | 计算整份请求的局部回应状态，不写业务满足 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | RM / KYC Operations |


**D4A-GAP-05-01｜客户贡献者提交本人获准任务的资料**

- 输入：AllowedRequestItems；ClientInput。

- 输出：SubmissionIntent。

- 选择依据：资料提供或声明来自真实参与者；系统可辅助上传/保存，不替客户作声明。 

- 协同：Human-led；Assist；人负责/异常转交：Authorised task contributor（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SubmissionIntent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成SubmissionIntent；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-05-02｜关联原提供人、项目、版本并生成回执**

- 输入：SubmissionIntent；AccessGrant；FileReceipt。

- 输出：Submission；RequestItem.response_status。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Submission、RequestItem.response_status，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SubmissionIntent、AccessGrant、FileReceipt中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Submission、RequestItem.response_status并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-05-03｜计算整份请求的局部回应状态，不写业务满足**

- 输入：RequestItemStates；EvidenceUseStates。

- 输出：RequestResponseSummary。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RequestResponseSummary，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RequestItemStates、EvidenceUseStates中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RequestResponseSummary并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-GAP-06 — 辅助沟通与代收

**变更分类：**Proposed addition。**当前工作：**RM有客户联系，具体电话/邮件流程尚未确认。

**原After提案：**RM保存经审阅沟通要点；staff-assisted上传保留原提供人与代录入者、渠道及时间。

**Pain：**RM口头说明或代收文件可能没有关联具体请求。（设计假设，未获客户实证）

**原因假设／控制理由：**沟通、声明、实际上传者和正式决定混同。

**Opportunity：**允许辅助沟通但保留来源和人工审阅。

**原PPT引用：**Current PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A5；Target PPT-S2-SH292-A3, PPT-S2-SH292-A5。

**D3字段候选：**InteractionRecord.source_ref; InteractionRecord.reviewed_by; Submission.original_submitter_ref; Submission.staff_uploader_ref。

**Reference：**IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-03, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-GAP-06-01 | 将获准的沟通记录整理为待审要点 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | RM / KYC Operations |
| D4A-GAP-06-02 | RM核对客户解释与下一动作，不代替客户授权 | 人执行判断/确认/提供; SK-06 | 4/2/2/3/3/3/3 | 8 / 6 | Relationship Manager |
| D4A-GAP-06-03 | 记录原提供者和代录入者，关联请求项 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | RM / KYC Operations |


**D4A-GAP-06-01｜将获准的沟通记录整理为待审要点**

- 输入：ApprovedInteractionInput；CaseScope。

- 输出：InteractionSummaryDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅InteractionSummaryDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对ApprovedInteractionInput、CaseScope加入缺失值、矛盾及恶意指令，输出InteractionSummaryDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-06-02｜RM核对客户解释与下一动作，不代替客户授权**

- 输入：InteractionSummaryDraft；OriginalInteraction。

- 输出：ReviewedInteractionSummary。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 

- 协同：Human-led；Assist；人负责/异常转交：Relationship Manager（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReviewedInteractionSummary，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成ReviewedInteractionSummary；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-GAP-06-03｜记录原提供者和代录入者，关联请求项**

- 输入：ReviewedInteractionSummary；StaffSubmission。

- 输出：InteractionRecord；Submission.provenance。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：RM / KYC Operations（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：收件人/披露/访问不清或等待客户；本动作所需输入或权限欠缺则保持待处理。

- 恢复：逐项响应到达后回原RequestItem；不扩大访问；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅InteractionRecord、Submission.provenance，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReviewedInteractionSummary、StaffSubmission中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限InteractionRecord、Submission.provenance并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**新贡献者仅见获准请求项；批准、发送、送达、提交、满足分别记录。

**上游/下游：**不确认收件人/披露/发送权时留draft；客户回应后回原item，不创建新独立案件。

**Journey／Product：**Current画获知的沟通动作，未确认渠道标假设；Target短request item+安全任务；正文不是大邮件墙。

**价值验证问题：**客户能否知道哪家主体、为什么需要、如何回应？一项提交是否不误关另一项？ 不添加无数据的节省比例。


## SCN-VALIDATE — 按主体与用途评估资料

**Branch：**BR-04；**Workflow：**WF-03；**粒度：**6个原工作，14个动作。

**Current PPT：**M3.4 capture & validate evidence；M3.5处理gap并记audit；Current已经验证。

**Target PPT：**M3.4/.5由产品执行，复杂info gap在Ops；自动检查与专业充分性边界需细化。

**共同检查点：**相同新响应与来源状态；协调授权材料不能同时当Person T全部身份和签约证明。

**共同输入：**请求item、原资料、来源、主体/用途、现有claims、现有评估版本。

**场景级初评分（不作自主授权）：**C=5 / O=3 / D=2 / B=3 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 5；确定性Skill/工具 2；语义Skill 4；受限Agent候选 0；人执行判断/确认/提供 3。不是工时比例。


### D3-VALIDATE-01 — 接收与技术检查

**变更分类：**Proposed addition。**当前工作：**捕获资料，技术检查未详细描述。

**原After提案：**接收留original artifact，mock intake明确released/quarantine/rejected；只有允许审阅的资料进入后续。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**技术上传防护属于必要控制，不是业务充分性判断。

**Opportunity：**明确文件接收、隔离、释放和拒绝，不用AI判断恶意文件安全。

**原PPT引用：**Current PPT-S1-SH292-A4；Target PPT-S2-SH292-A4。

**D3字段候选：**EvidenceArtifact.intake_security_status; EvidenceArtifact.content_revision; Submission.ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-01-01 | 调用受控文件接收和安全处理服务/本地模拟 | 确定性Skill/工具; SK-09 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-01-02 | 仅允许已释放材料进入业务审阅 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / evidence reviewer |


**D4A-VALIDATE-01-01｜调用受控文件接收和安全处理服务/本地模拟**

- 输入：Submission；FilePolicy。

- 输出：IntakeReceipt；SecurityScanResult。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅IntakeReceipt、SecurityScanResult，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少Submission、FilePolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限IntakeReceipt、SecurityScanResult并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-01-02｜仅允许已释放材料进入业务审阅**

- 输入：SecurityScanResult；IntakePolicy。

- 输出：Artifact.intake_status；ReviewEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Artifact.intake_status、ReviewEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SecurityScanResult、IntakePolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Artifact.intake_status、ReviewEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-VALIDATE-02 — 主体与来源核对

**变更分类：**Enhanced。**当前工作：**验证证据。

**原After提案：**对比资料主体、提供人、出具主体、资料时点与当前用途；冲突建立issue。

**Pain：**母公司的材料可能被误用为子公司的事实或权限。（设计假设，未获客户实证）

**原因假设／控制理由：**资料主体、出具方与所需Principal未显式核对。

**Opportunity：**准备主体和出处差异，冲突有明确处理人。

**原PPT引用：**Current PPT-S1-SH292-A4；Target PPT-S2-SH292-A4。

**D3字段候选：**EvidenceClaim.subject_ref; EvidenceArtifact.issuer_ref; EvidenceArtifact.data_as_of; DataConflict.claim_refs。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-02-01 | 对照出具方、资料主体、Principal和内容时点 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-02-02 | 处理无法由规则确认的来源/主体冲突 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Evidence / entity reviewer |


**D4A-VALIDATE-02-01｜对照出具方、资料主体、Principal和内容时点**

- 输入：EvidenceClaim[]；RequiredSubjectPurpose。

- 输出：EvidenceContextComparison。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceContextComparison，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对EvidenceClaim[]、RequiredSubjectPurpose加入缺失值、矛盾及恶意指令，输出EvidenceContextComparison仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-02-02｜处理无法由规则确认的来源/主体冲突**

- 输入：EvidenceContextComparison；SourceMaterial。

- 输出：EvidenceContextDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Evidence / entity reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceContextDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EvidenceContextComparison、SourceMaterial对应的权限或关键证据缺失，When尝试“处理无法由规则确认的来源/主体冲突”，Then保持待判断并不产生EvidenceContextDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-VALIDATE-03 — 候选值与已采信值

**变更分类：**Proposed addition。**当前工作：**源图无字段级采信机制。

**原After提案：**明确reported/extracted/reviewed状态；必要时由有权人员决定采用哪个claim并记录依据。

**Pain：**候选抽取值可能被静默写成已验证事实。（设计假设，未获客户实证）

**原因假设／控制理由：**声明、模型提取与采信之间没有明确边界。

**Opportunity：**先产候选，再作有依据的采信与版本记录。

**原PPT引用：**Current PPT-S1-SH292-A4；Target PPT-S2-SH292-A4。

**D3字段候选：**EvidenceClaim.value_status; ClaimAdoption.decision_ref; ClaimAdoption.scope_ref。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-03-01 | 准备候选字段与出处，不覆盖已采信字段 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-03-02 | 对需人工判断的冲突选择或拒绝采信 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Evidence reviewer |
| D4A-VALIDATE-03-03 | 按决定保存采信关系和旧版本 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations / evidence reviewer |


**D4A-VALIDATE-03-01｜准备候选字段与出处，不覆盖已采信字段**

- 输入：EvidenceArtifact；ExistingClaims。

- 输出：CandidateClaim[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CandidateClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对EvidenceArtifact、ExistingClaims加入缺失值、矛盾及恶意指令，输出CandidateClaim[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-03-02｜对需人工判断的冲突选择或拒绝采信**

- 输入：CandidateClaim[]；ConflictingClaims；Criteria。

- 输出：ClaimAdoptionDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Evidence reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClaimAdoptionDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CandidateClaim[]、ConflictingClaims、Criteria对应的权限或关键证据缺失，When尝试“对需人工判断的冲突选择或拒绝采信”，Then保持待判断并不产生ClaimAdoptionDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-03-03｜按决定保存采信关系和旧版本**

- 输入：ClaimAdoptionDecision；ExpectedRevision。

- 输出：ClaimAdoptionRecord。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClaimAdoptionRecord，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ClaimAdoptionDecision、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClaimAdoptionRecord并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-VALIDATE-04 — 用途充分性

**变更分类：**Enhanced。**当前工作：**验证资料足以支持相关工作，具体criteria未给。

**原After提案：**每项EvidenceUse绑定subject、requirement、purpose，准备检查；复杂充分性保留人工处理。

**Pain：**同一文件对不同用途的充分性可能被一个标记代替。（设计假设，未获客户实证）

**原因假设／控制理由：**Subject、Requirement、Purpose与评估输入未绑定。

**Opportunity：**语义Skill准备用途对照，复杂充分性由人判断。

**原PPT引用：**Current PPT-S1-SH292-A4；Target PPT-S2-SH292-A4, PPT-S2-SH281-EX, PPT-S2-SH392-EX。

**D3字段候选：**EvidenceUseAssessment.sufficiency; EvidenceUseAssessment.basis_refs; EvidenceUseAssessment.assessed_by_ref; EvidenceUseAssessment.revision。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-04-01 | 准备此主体此用途的证据支持/矛盾/未知矩阵 | 语义Skill; SK-05,SK-06 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-04-02 | 判断需人工评估的用途充分性并说明依据 | 人执行判断/确认/提供; SK-06 | 5/3/2/2/3/2/5 | 10 / 4 | Evidence-use reviewer |
| D4A-VALIDATE-04-03 | 记录四值充分性与用途范围，不更新其他权限 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | KYC Operations / evidence reviewer |


**D4A-VALIDATE-04-01｜准备此主体此用途的证据支持/矛盾/未知矩阵**

- 输入：Requirement；EvidenceClaims；UseCriteria。

- 输出：EvidenceUseReviewPack。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceUseReviewPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对Requirement、EvidenceClaims、UseCriteria加入缺失值、矛盾及恶意指令，输出EvidenceUseReviewPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-04-02｜判断需人工评估的用途充分性并说明依据**

- 输入：EvidenceUseReviewPack；CurrentInputs。

- 输出：EvidenceSufficiencyDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Evidence-use reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceSufficiencyDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EvidenceUseReviewPack、CurrentInputs对应的权限或关键证据缺失，When尝试“判断需人工评估的用途充分性并说明依据”，Then保持待判断并不产生EvidenceSufficiencyDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-04-03｜记录四值充分性与用途范围，不更新其他权限**

- 输入：EvidenceSufficiencyDecision；UseScope。

- 输出：EvidenceUseAssessment.revision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EvidenceUseAssessment.revision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceSufficiencyDecision、UseScope中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EvidenceUseAssessment.revision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-VALIDATE-05 — 更新缺口与依赖

**变更分类：**Enhanced。**当前工作：**管理outstanding gaps与sourcing audit。

**原After提案：**根据新评估只更新显式依赖的Gap/Task/Requirement，未知影响进入review；保留历史与receipt。

**Pain：**补正后可能漏重评相关决定，或无差别重开全部工作。（设计假设，未获客户实证）

**原因假设／控制理由：**对象版本与消费者依赖未明确维护。

**Opportunity：**已知依赖用规则更新，未知关系交人审阅。

**原PPT引用：**Current PPT-S1-SH292-A5；Target PPT-S2-SH292-A5。

**D3字段候选：**Gap.resolved_by_ref; DependencyEdge.from_revision; ChangeImpact.unknown_refs; AuditEvent.causation_ref。

**Reference：**XB-NIST-THREAD, XB-GS1；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-05-01 | 沿已登记依赖计算受影响与未知消费者 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-05-02 | 创建具体复核任务并保留不受影响记录 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations / evidence reviewer |


**D4A-VALIDATE-05-01｜沿已登记依赖计算受影响与未知消费者**

- 输入：EvidenceAssessmentChange；DependencyEdge[]。

- 输出：ImpactSet；UnknownImpact。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ImpactSet、UnknownImpact，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceAssessmentChange、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ImpactSet、UnknownImpact并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-05-02｜创建具体复核任务并保留不受影响记录**

- 输入：ReviewedImpactSet；CurrentTaskRegistry。

- 输出：ReassessmentTask[]；AuditEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReassessmentTask[]、AuditEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReviewedImpactSet、CurrentTaskRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ReassessmentTask[]、AuditEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-VALIDATE-06 — 反馈与再次提交

**变更分类：**Enhanced。**当前工作：**客户澄清及后续gap处理已存在。

**原After提案：**对可披露理由提供指定项目的反馈；补件沿原item继续并保留sent/response版本。

**Pain：**补件反馈可能过于笼统，使客户重复提交无关材料。（设计假设，未获客户实证）

**原因假设／控制理由：**内部观察未转换成范围明确的客户下一步。

**Opportunity：**按允许披露的具体缺口给反馈并沿原项目继续。

**原PPT引用：**Current PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A5；Target PPT-S2-SH292-A3, PPT-S2-SH292-A5。

**D3字段候选：**ResponseFeedback.allowed_reason; RequestItem.next_action; InformationRequest.sent_revision。

**Reference：**IC-PHKL, IB-ANZ-SECURE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-11, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-VALIDATE-06-01 | 起草针对原Request Item的安全反馈 | 语义Skill; SK-08 | 4/2/2/4/4/3/3 | 8 / 7 | KYC Operations / evidence reviewer |
| D4A-VALIDATE-06-02 | 发送获准反馈并保留原请求/响应版本 | 确定性Skill/工具; SK-08,SK-12 | 2/3/1/3/3/5/4 | 6 / 8 | KYC Operations / evidence reviewer |


**D4A-VALIDATE-06-01｜起草针对原Request Item的安全反馈**

- 输入：AllowedGapReason；RequestItem；ResponseOptions。

- 输出：FeedbackDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅FeedbackDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AllowedGapReason、RequestItem、ResponseOptions加入缺失值、矛盾及恶意指令，输出FeedbackDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-VALIDATE-06-02｜发送获准反馈并保留原请求/响应版本**

- 输入：ApprovedFeedback；RecipientGrant；RequestRevision。

- 输出：FeedbackEvent；NotificationReceipt。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / evidence reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：来源不可用、资料冲突、用途不充分/未评估；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新获准响应或用途判断到达，重新核对版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅FeedbackEvent、NotificationReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedFeedback、RecipientGrant、RequestRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限FeedbackEvent、NotificationReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**收到/释放资料不等于用途充分；一用途满足不赋予其他权限。

**上游/下游：**安全接收未释放或业务缺口未解则暂停相关评估；收到revised evidence后创建新评估，不删旧版本。

**Journey／Product：**Evidence Review显示原文+Claims+用途结果；部分覆盖用明细，不扩充sufficiency枚举。

**价值验证问题：**相同文件对两个用途不同结果是否可解释？与下游判断的关联是否准确？ 不添加无数据的节省比例。


## SCN-POPULATION — 明确应该筛查谁、哪些类别与范围

**Branch：**BR-06；**Workflow：**WF-05；**粒度：**6个原工作，13个动作。

**Current PPT：**M4.1 initial risk pre-screening、M4.2 early adverse-media、M4.3 population、M4.4 comprehensive；不能把M4.1偷换成全部sanctions流程。

**Target PPT：**M4.1–.4在Agentic lane；细粒度Population/Membership/Run/Coverage是为解释执行范围的设计。

**共同检查点：**Ownership/control仍未全闭合；已知Entity A/B/Person T不等于最终完整群体。

**共同输入：**同一主体/关系/数据源可用性、policy context及实际未决项。

**场景级初评分（不作自主授权）：**C=4 / O=4 / D=2 / B=3 / V=4 / T=4 / H=5。

**执行组成：**规则/代码 6；确定性Skill/工具 3；语义Skill 1；受限Agent候选 0；人执行判断/确认/提供 3。不是工时比例。


### D3-POPULATION-01 — 初始风险预筛

**变更分类：**Reassigned。**当前工作：**先进行risk pre-screening。

**原After提案：**按本次scope和已知风险context准备预筛，记录实际检查范围和结果/未知，不宣称已跑全部制裁类别。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**初始风险预筛是必要控制，不能偷换为所有类别的完整筛查。

**Opportunity：**明确实际检查目的、输入和允许范围。

**原PPT引用：**Current PPT-S1-SH296-A1；Target PPT-S2-SH296-A1。

**D3字段候选：**ScreeningPlan.run_kind; ScreeningPlan.purpose; ScreeningPlan.inclusion_basis_ref; ScreeningPlan.scope_revision。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-01-01 | 按明确规则装配初步风险预筛范围 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-01-02 | 执行获准初步检查并记录真实合成返回 | 确定性Skill/工具; SK-09 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations / screening scope reviewer |


**D4A-POPULATION-01-01｜按明确规则装配初步风险预筛范围**

- 输入：CaseScope；PreScreenPolicy；KnownPartyRefs。

- 输出：PreScreenPlan；UnresolvedScope。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PreScreenPlan、UnresolvedScope，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少CaseScope、PreScreenPolicy、KnownPartyRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PreScreenPlan、UnresolvedScope并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-01-02｜执行获准初步检查并记录真实合成返回**

- 输入：ApprovedPreScreenPlan；AccessScope。

- 输出：PreScreenRunReceipt。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PreScreenRunReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ApprovedPreScreenPlan、AccessScope中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PreScreenRunReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-POPULATION-02 — 早期负面媒体

**变更分类：**Reassigned。**当前工作：**早期adverse-media screen已经存在。

**原After提案：**保留来源发布日期/检索日期、主体归属与待解释事项；与sanctions/PEP类别分开。

**Pain：**早期媒体结果可能缺乏主体归属或来源时点。（设计假设，未获客户实证）

**原因假设／控制理由：**资料检索、报道内容与可信风险结论混同。

**Opportunity：**固定查询后整理来源归属，不把报道当定论。

**原PPT引用：**Current PPT-S1-SH296-A2；Target PPT-S2-SH296-A2。

**D3字段候选：**MediaFinding.source_ref; MediaFinding.published_at; MediaFinding.subject_attribution; MediaFinding.review_status。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-02-01 | 运行获准早期媒体查询并保存来源时点 | 确定性Skill/工具; SK-09 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-02-02 | 准备报道与主体的关联及不确定性 | 语义Skill; SK-03,SK-06 | 4/2/2/4/4/4/3 | 8 / 8 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-02-03 | 评估需专业判断的相关性或重大性 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Financial Crime reviewer |


**D4A-POPULATION-02-01｜运行获准早期媒体查询并保存来源时点**

- 输入：ApprovedMediaQuery；SubjectSnapshot。

- 输出：MediaSourceSnapshot[]。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MediaSourceSnapshot[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ApprovedMediaQuery、SubjectSnapshot中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限MediaSourceSnapshot[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-02-02｜准备报道与主体的关联及不确定性**

- 输入：MediaSourceSnapshot[]；SubjectClaims。

- 输出：MediaAttributionDraft。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MediaAttributionDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：对MediaSourceSnapshot[]、SubjectClaims加入缺失值、矛盾及恶意指令，输出MediaAttributionDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-02-03｜评估需专业判断的相关性或重大性**

- 输入：MediaAttributionDraft；SourceEvidence。

- 输出：MediaRelevanceDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Financial Crime reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MediaRelevanceDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given MediaAttributionDraft、SourceEvidence对应的权限或关键证据缺失，When尝试“评估需专业判断的相关性或重大性”，Then保持待判断并不产生MediaRelevanceDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-POPULATION-03 — 群体纳入与排除依据

**变更分类：**Enhanced。**当前工作：**建立screening population。

**原After提案：**每主体×类别保存纳入/排除/未决及criteria，ownership缺口显示为inventory gap。

**Pain：**已知主体可能被误当作完整应筛查群体。（设计假设，未获客户实证）

**原因假设／控制理由：**纳入依据与ownership inventory完整性未分开。

**Opportunity：**基于规则生成候选群体，未明确项必须可见。

**原PPT引用：**Current PPT-S1-SH296-A3；Target PPT-S2-SH296-A3。

**D3字段候选：**ScreeningMembership.decision; ScreeningMembership.criterion_ref; ScreeningPopulation.inventory_status; ScreeningPopulation.gap_refs。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-03-01 | 执行主体×类别的纳入/排除规则 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-03-02 | 审阅未决群体成员与适用范围 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Screening scope reviewer |


**D4A-POPULATION-03-01｜执行主体×类别的纳入/排除规则**

- 输入：PartyInventory；ScreeningCriteria.revision。

- 输出：MembershipCandidate[]；InventoryGap[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MembershipCandidate[]、InventoryGap[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少PartyInventory、ScreeningCriteria.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限MembershipCandidate[]、InventoryGap[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-03-02｜审阅未决群体成员与适用范围**

- 输入：MembershipCandidate[]；InventoryEvidence。

- 输出：PopulationMembershipDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Screening scope reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PopulationMembershipDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given MembershipCandidate[]、InventoryEvidence对应的权限或关键证据缺失，When尝试“审阅未决群体成员与适用范围”，Then保持待判断并不产生PopulationMembershipDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-POPULATION-04 — 群体与查询计划版本

**变更分类：**Enhanced。**当前工作：**按群体执行完整筛查。

**原After提案：**冻结本次所查party snapshots、范围和源版本；完整plan确认前保留不足项。

**Pain：**查询后难以确认当时用了哪个主体版本。（设计假设，未获客户实证）

**原因假设／控制理由：**群体、subject snapshot与query plan未关联。

**Opportunity：**冻结输入版本并检查计划确认条件。

**原PPT引用：**Current PPT-S1-SH296-A3, PPT-S1-SH296-A4；Target PPT-S2-SH296-A3, PPT-S2-SH296-A4。

**D3字段候选：**ScreeningPopulation.revision; RunSubjectSnapshot.party_revision; ScreeningPlan.confirmation_ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-04-01 | 建立不可变查询主体快照和群体版本 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-04-02 | 校验完整计划前置条件，缺项保持pending | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / screening scope reviewer |


**D4A-POPULATION-04-01｜建立不可变查询主体快照和群体版本**

- 输入：ConfirmedMembership；PartyClaims；ScopeRevision。

- 输出：RunSubjectSnapshot；PopulationRevision。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RunSubjectSnapshot、PopulationRevision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ConfirmedMembership、PartyClaims、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RunSubjectSnapshot、PopulationRevision并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-04-02｜校验完整计划前置条件，缺项保持pending**

- 输入：PopulationRevision；QueryRequirements；InventoryGaps。

- 输出：PlanConfirmationEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PlanConfirmationEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少PopulationRevision、QueryRequirements、InventoryGaps中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PlanConfirmationEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-POPULATION-05 — 执行与适用覆盖

**变更分类：**Reassigned。**当前工作：**执行comprehensive screening。

**原After提案：**按subject revision×category×query/list scope记录实际返回；failed/partial/no-alert分开，不以providers logo表示完成。

**Pain：**部分失败或无结果可能被混为已完成筛查。（设计假设，未获客户实证）

**原因假设／控制理由：**查询类别、来源范围和返回状态没有独立覆盖记录。

**Opportunity：**固定查询服务记录真实执行与失败，不自由解释为无风险。

**原PPT引用：**Current PPT-S1-SH296-A4；Target PPT-S2-SH296-A4。

**D3字段候选：**ScreeningRun.run_status; ScreeningRun.result_count; ScreeningRun.data_as_of; ScreeningCoverageItem.execution_status。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-05-01 | 执行计划内获准筛查查询并保存原始返回 | 确定性Skill/工具; SK-09 | 2/2/1/4/3/4/3 | 5 / 8 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-05-02 | 更新查询tuple的成功/部分/失败状态 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / screening scope reviewer |


**D4A-POPULATION-05-01｜执行计划内获准筛查查询并保存原始返回**

- 输入：ApprovedQueryPlan；FrozenSubjects；IdempotencyKey。

- 输出：ScreeningRun；ProviderRecordSnapshot。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScreeningRun、ProviderRecordSnapshot，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ApprovedQueryPlan、FrozenSubjects、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningRun、ProviderRecordSnapshot并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-05-02｜更新查询tuple的成功/部分/失败状态**

- 输入：ScreeningRun；RequiredCoverageTuple[]。

- 输出：ScreeningCoverageItem.execution_status。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScreeningCoverageItem.execution_status，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ScreeningRun、RequiredCoverageTuple[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningCoverageItem.execution_status并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-POPULATION-06 — 覆盖关闭与结果复用

**变更分类：**Enhanced。**当前工作：**完成查询并最终确定筛查结果。

**原After提案：**检查required tuples、未处置findings、时效和当前scope；复用旧结果须有currency评估和mapping。

**Pain：**局部任务完成可能掩盖未查主体、待复核或旧结果。（设计假设，未获客户实证）

**原因假设／控制理由：**覆盖清单完整性和结果时效未独立评估。

**Opportunity：**以完整清单和当前依据计算覆盖，不用Agent判断绿灯。

**原PPT引用：**Current PPT-S1-SH296-A4, PPT-S1-SH177-A2；Target PPT-S2-SH296-A4, PPT-S2-SH296-A7。

**D3字段候选：**ScreeningCoverageItem.review_status; ScreeningCoverageItem.currency_status; CoverageAssessment.manifest_complete; CoverageAssessment.basis_refs。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-POPULATION-06-01 | 核验required tuples、finding处置、时效与范围 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | KYC Operations / screening scope reviewer |
| D4A-POPULATION-06-02 | 处理规则无法证明的旧结果复用/范围变化 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Screening scope reviewer |


**D4A-POPULATION-06-01｜核验required tuples、finding处置、时效与范围**

- 输入：CoverageManifest；RunResults；FindingDecisions；ScopeRevision。

- 输出：CoverageAssessment；BlockingRefs。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：KYC Operations / screening scope reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CoverageAssessment、BlockingRefs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少CoverageManifest、RunResults、FindingDecisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CoverageAssessment、BlockingRefs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-POPULATION-06-02｜处理规则无法证明的旧结果复用/范围变化**

- 输入：CurrencyReviewPack；OldResultRefs。

- 输出：CoverageReuseDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Screening scope reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CoverageReuseDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given CurrencyReviewPack、OldResultRefs对应的权限或关键证据缺失，When尝试“处理规则无法证明的旧结果复用/范围变化”，Then保持待判断并不产生CoverageReuseDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**部分主体查询成功不关闭完整覆盖；失败/空manifest不变成功。

**上游/下游：**足够输入且获准的初步查询可启动；完整群体和类别范围未知则不能关闭comprehensive。新party事件只触发相关coverage评估。

**Journey／Product：**Population列表显示纳入依据、query readiness、inventory gap；Archify选择一个人时同时保留未确认群体。

**价值验证问题：**能否解释一条查询结束与完整筛查的区别？数据源失败是否不被算零命中？ 不添加无数据的节省比例。


## SCN-MATCH — 用相同证据处理Person T的一条疑似命中

**Branch：**BR-07；**Workflow：**WF-05；**粒度：**7个原工作，17个动作。

**Current PPT：**M4.5在Ops；M4.6/.7在Financial Crime/Risk/Compliance；Current已做adjudication和risk decision。

**Target PPT：**M4.5–.7在Agentic lane，同时Ops review ambiguous、Financial Crime adjudicate material；记录执行与判断责任重叠须澄清。

**共同检查点：**Checkpoint1：同一possible match、证据不足；Checkpoint2：同一补充identity evidence已收到且对相应用途审阅，两侧都允许合理未决。

**共同输入：**Person T与SYN-PROVIDER-RECORD-C01同一输入/源时点；没有真实名单人员或额外幕后identity资料。

**场景级初评分（不作自主授权）：**C=5 / O=4 / D=4 / B=3 / V=5 / T=3 / H=5。

**执行组成：**规则/代码 8；确定性Skill/工具 0；语义Skill 4；受限Agent候选 1；人执行判断/确认/提供 4。不是工时比例。


### D3-MATCH-01 — 绑定命中与原始查询

**变更分类：**Reassigned。**当前工作：**Ops处置screening hits。

**原After提案：**固定subject/run/provider记录，准备比较上下文；不将同名alias误拆为多个人，也不无声删重复。

**Pain：**命中记录可能脱离最初的查询输入或主体版本。（设计假设，未获客户实证）

**原因假设／控制理由：**provider result、party和run缺少不可变绑定。

**Opportunity：**记录服务固定原始结果和调查目标。

**原PPT引用：**Current PPT-S1-SH296-A5；Target PPT-S2-SH296-A5, PPT-S2-SH376-EX。

**D3字段候选：**ScreeningFinding.run_ref; ScreeningFinding.subject_snapshot_ref; ScreeningFinding.provider_snapshot_ref; ScreeningFinding.related_record_refs。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-01-01 | 绑定命中、主体快照、查询范围和来源版本 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-01-02 | 校验记录一致性并标记重复/关联候选 | 规则/代码; SK-03,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-01-01｜绑定命中、主体快照、查询范围和来源版本**

- 输入：ProviderRecordSnapshot；RunSubjectSnapshot；RunId。

- 输出：ScreeningFinding。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScreeningFinding，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ProviderRecordSnapshot、RunSubjectSnapshot、RunId中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningFinding并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-01-02｜校验记录一致性并标记重复/关联候选**

- 输入：ScreeningFinding；KnownFindingRegistry。

- 输出：FindingConsistencyCheck。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅FindingConsistencyCheck，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ScreeningFinding、KnownFindingRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限FindingConsistencyCheck并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-02 — 属性对照

**变更分类：**Enhanced。**当前工作：**人员审阅相关客户与命中信息。

**原After提案：**从当前claims生成name/DOB等对照，保留多值、精度和未知；展示每一值出处。

**Pain：**缺失或不同精度的属性可能被误判为不一致。（设计假设，未获客户实证）

**原因假设／控制理由：**比较值没有保留来源、精度与未知。

**Opportunity：**确定性规范化与语义比较仅准备可审阅差异。

**原PPT引用：**Current PPT-S1-SH296-A5；Target PPT-S2-SH296-A5, PPT-S2-SH376-EX。

**D3字段候选：**AttributeComparison.subject_claim_refs; AttributeComparison.provider_claim_refs; AttributeComparison.precision; AttributeComparison.result。

**Reference：**REG-DFAT-LIST；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-02-01 | 保留日期精度、多值、原文字体与缺失状态 | 规则/代码; SK-03 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-02-02 | 生成匹配/差异/不可比较矩阵并引用原值 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-02-01｜保留日期精度、多值、原文字体与缺失状态**

- 输入：SubjectClaims；ProviderClaims。

- 输出：TypedComparableClaims。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅TypedComparableClaims，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少SubjectClaims、ProviderClaims中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限TypedComparableClaims并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-02-02｜生成匹配/差异/不可比较矩阵并引用原值**

- 输入：TypedComparableClaims。

- 输出：AttributeComparison[]。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AttributeComparison[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：对TypedComparableClaims加入缺失值、矛盾及恶意指令，输出AttributeComparison[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-03 — 具体补证与请求

**变更分类：**Enhanced。**当前工作：**Current Client lane已允许screening clarifications。

**原After提案：**复用B生成finding身份区分用途的新request item/版本；先使用获准既有源，仍不足才对外。

**Pain：**模糊命中可能导致泛化补件或重复请求。（设计假设，未获客户实证）

**原因假设／控制理由：**具体身份问题没有连接已有用途与访问范围。

**Opportunity：**允许有限自适应取证，但发请求与授权仍由工作流控制。

**原PPT引用：**Current PPT-S1-SH296-A5, PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A4；Target PPT-S2-SH296-A5, PPT-S2-SH292-A3, PPT-S2-SH292-A4, PPT-S2-SH392-EX。

**D3字段候选：**RequestItem.finding_ref; RequestItem.purpose_code; AccessGrant.resource_scope; EvidenceUseAssessment.subject_ref。

**Reference：**IB-ANZ-SECURE, IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-03-01 | 选择当前finding的获准取证途径与停止条件 | 受限Agent候选; SK-01,SK-05,SK-06 | 4/4/4/3/4/3/3 | 12 / 6 | Financial Crime / authorised screening reviewer；AG-REVIEW |
| D4A-MATCH-03-02 | 将仍缺的身份事实转为受限新请求项 | 语义Skill; SK-08 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-03-03 | 确认个人证据的收件人、披露和访问范围 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Request / access authority |


**D4A-MATCH-03-01｜选择当前finding的获准取证途径与停止条件**

- 输入：FindingUnknowns；ExistingEvidence；AllowedSources；PreviousReceipts。

- 输出：IdentityEvidencePlanProposal。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅IdentityEvidencePlanProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出IdentityEvidencePlanProposal。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-03-02｜将仍缺的身份事实转为受限新请求项**

- 输入：IdentityEvidencePlanProposal；AllowedClientReason。

- 输出：IdentityRequestDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅IdentityRequestDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：对IdentityEvidencePlanProposal、AllowedClientReason加入缺失值、矛盾及恶意指令，输出IdentityRequestDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-03-03｜确认个人证据的收件人、披露和访问范围**

- 输入：IdentityRequestDraft；ExistingGrant。

- 输出：IdentityRequestAccessDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Request / access authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅IdentityRequestAccessDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given IdentityRequestDraft、ExistingGrant对应的权限或关键证据缺失，When尝试“确认个人证据的收件人、披露和访问范围”，Then保持待判断并不产生IdentityRequestAccessDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-04 — 准备复核包

**变更分类：**Enhanced。**当前工作：**Ops做命中处置，现状资料拼接负担未量化。

**原After提案：**产品组织证据摘要、差异、未知和相关请求；内容有引用，AI建议与已知事实分区。

**Pain：**复核人可能需要重新拼接资料、命中背景与未决事项。（设计假设，未获客户实证）

**原因假设／控制理由：**相关输入分散，事实和模型建议容易混在一起。

**Opportunity：**固定包先用Skill；只在未知证据路径时采用有界规划。

**原PPT引用：**Current PPT-S1-SH296-A5；Target PPT-S2-SH296-A5, PPT-S2-SH376-EX。

**D3字段候选：**ReviewPack.input_manifest; ReviewPack.unresolved_refs; ReviewPack.prepared_by_type; Recommendation.basis_refs。

**Reference：**IC-PHKL, IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-04-01 | 编制带引用的事实、未知、矛盾和允许动作 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-04-02 | 校验包的引用可访问、版本当前、无伪造结论 | 规则/代码; SK-05,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-04-01｜编制带引用的事实、未知、矛盾和允许动作**

- 输入：Finding；CurrentEvidenceUse；Comparison；AllowedActionSet。

- 输出：ScreeningDecisionPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScreeningDecisionPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：对Finding、CurrentEvidenceUse、Comparison加入缺失值、矛盾及恶意指令，输出ScreeningDecisionPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-04-02｜校验包的引用可访问、版本当前、无伪造结论**

- 输入：ScreeningDecisionPack；AccessScope；CurrentRevisions。

- 输出：DecisionPackValidation。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DecisionPackValidation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ScreeningDecisionPack、AccessScope、CurrentRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限DecisionPackValidation并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-05 — 风险与重大性

**变更分类：**Retained。**当前工作：**Financial Crime/Risk/Compliance评估risk/materiality。

**原After提案：**产品准备风险context；模糊/重大finding流向相应人，保留具体action权限和hold范围。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**重大性与专业风险判断本身是必须保留的责任，不是可消除痛点。

**Opportunity：**让人带着充分context判断，产品不替代最终责任。

**原PPT引用：**Current PPT-S1-SH177-A1；Target PPT-S2-SH296-A6, PPT-S2-SH409-EX。

**D3字段候选：**RiskReview.materiality_status; RiskReview.permission_ref; Hold.action_scope; Hold.basis_ref。

**Reference：**IND-WOLFSBERG；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-05-01 | 准备重大性所需事实与未解决的矛盾 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-05-02 | 判断模糊/重大事项与需升级的处理 | 人执行判断/确认/提供; SK-06 | 5/3/3/2/3/2/5 | 11 / 4 | Financial Crime authority |
| D4A-MATCH-05-03 | 按明确决定与规则应用特定动作的hold | 规则/代码; SK-07,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-05-01｜准备重大性所需事实与未解决的矛盾**

- 输入：Finding；Evidence；RiskContext。

- 输出：MaterialityBrief。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅MaterialityBrief，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：对Finding、Evidence、RiskContext加入缺失值、矛盾及恶意指令，输出MaterialityBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-05-02｜判断模糊/重大事项与需升级的处理**

- 输入：MaterialityBrief；ApplicableControlContext。

- 输出：RiskMaterialityDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Financial Crime authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RiskMaterialityDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given MaterialityBrief、ApplicableControlContext对应的权限或关键证据缺失，When尝试“判断模糊/重大事项与需升级的处理”，Then保持待判断并不产生RiskMaterialityDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-05-03｜按明确决定与规则应用特定动作的hold**

- 输入：RiskMaterialityDecision；HoldPolicy。

- 输出：ScopedHold；EscalationTask。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScopedHold、EscalationTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少RiskMaterialityDecision、HoldPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScopedHold、EscalationTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-06 — 记录限定输入下的处置

**变更分类：**Enhanced。**当前工作：**Financial Crime确定screening outcome。

**原After提案：**记录finding处置、理由、所审evidence和scope版本；必要additional approval独立。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**有权记录处置是必要控制；支持记录而非取消批准。

**Opportunity：**把人作判断与产品校验/记录分开并保留有效输入。

**原PPT引用：**Current PPT-S1-SH177-A2；Target PPT-S2-SH296-A7, PPT-S2-SH409-EX。

**D3字段候选：**ScreeningReviewDecision.disposition; ScreeningReviewDecision.input_revision_refs; ScreeningReviewDecision.permission_ref; ScreeningReviewDecision.rationale。

**Reference：**IND-WOLFSBERG, XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-06-01 | 选择有依据的局部处置或保持未决 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Authorised screening reviewer |
| D4A-MATCH-06-02 | 完成配置要求的独立授权，不默认每案新增审批 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Configured additional approver where required |
| D4A-MATCH-06-03 | 校验当前版本与授权后记录局部结果 | 规则/代码; SK-11 | 2/1/1/5/3/5/5 | 4 / 10 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-06-01｜选择有依据的局部处置或保持未决**

- 输入：ScreeningDecisionPack；CurrentInputManifest。

- 输出：ProposedDisposition；HumanRationale。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Authorised screening reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ProposedDisposition、HumanRationale，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given ScreeningDecisionPack、CurrentInputManifest对应的权限或关键证据缺失，When尝试“选择有依据的局部处置或保持未决”，Then保持待判断并不产生ProposedDisposition、HumanRationale；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-06-02｜完成配置要求的独立授权，不默认每案新增审批**

- 输入：ProposedDisposition；ApprovalPolicy；ReviewerPermission。

- 输出：AuthorisedDisposition。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Configured additional approver where required（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorisedDisposition，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：Given ProposedDisposition、ApprovalPolicy、ReviewerPermission对应的权限或关键证据缺失，When尝试“完成配置要求的独立授权，不默认每案新增审批”，Then保持待判断并不产生AuthorisedDisposition；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-06-03｜校验当前版本与授权后记录局部结果**

- 输入：AuthorisedDisposition；ExpectedRevisions；IdempotencyKey。

- 输出：ScreeningReviewDecision；AuditEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ScreeningReviewDecision、AuditEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少AuthorisedDisposition、ExpectedRevisions、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ScreeningReviewDecision、AuditEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-MATCH-07 — 局部结果与整体影响

**变更分类：**Enhanced。**当前工作：**结果用于后续clearance prerequisite核对。

**原After提案：**只更新关联finding/coverage，再产生可解释snapshot；ownership群体、EDD、Legal/Credit未知继续存在。

**Pain：**一条命中关闭可能被误认为全案已具备交易条件。（设计假设，未获客户实证）

**原因假设／控制理由：**finding、coverage、其他专业条件和readiness混合。

**Opportunity：**规则更新限定影响，并将阻塞向正确角色解释。

**原PPT引用：**Current PPT-S1-SH177-A2, PPT-S1-SH65-A1；Target PPT-S2-SH296-A7, PPT-S2-SH65-A1。

**D3字段候选：**ScreeningCoverageItem.finding_refs; Decision.currency_status; ReadinessSnapshot.blocking_refs; AuditEvent.causation_ref。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-MATCH-07-01 | 根据处置计算finding和coverage的限定状态 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / authorised screening reviewer |
| D4A-MATCH-07-02 | 显示原有ownership/EDD/Legal等未决条件 | 规则/代码; SK-12 | 2/2/1/5/4/5/3 | 5 / 10 | Financial Crime / authorised screening reviewer |


**D4A-MATCH-07-01｜根据处置计算finding和coverage的限定状态**

- 输入：ScreeningReviewDecision；CoverageManifest；DependencyEdge[]。

- 输出：CoverageDelta；ReadinessReevaluationEvent。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CoverageDelta、ReadinessReevaluationEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少ScreeningReviewDecision、CoverageManifest、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CoverageDelta、ReadinessReevaluationEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-MATCH-07-02｜显示原有ownership/EDD/Legal等未决条件**

- 输入：CurrentCaseState；AllowedRoleProjection。

- 输出：CaseImpactView。

- 选择依据：按真实对象状态/权限生成投影，固定查询比自由生成结论可靠。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / authorised screening reviewer（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：群体未全、来源失败、身份资料不足、缺权限/重大性待判断；本动作所需输入或权限欠缺则保持待处理。

- 恢复：新资料/查询/专业决定到达后只重评实际受影响项；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CaseImpactView，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；从similarity/无结果直接排除身份或宣布全球无风险。

- 验收候选：缺少CurrentCaseState、AllowedRoleProjection中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CaseImpactView并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**同名/单字段差异不自动排除；有权局部处置不关闭所有screening或clearance。

**上游/下游：**信息缺口分支回同一finding；权限不足移交同一review任务；不能以EDD处理替代重大制裁限制。

**Journey／Product：**同一对照布局：类似/不同/未知；大弹窗内Comparison、Work、Impact、References；Product只正常标题Screening Review。

**价值验证问题：**有资料缺口时是否正确停止？同一输入是否不会因Target按钮自动排除？ 不添加无数据的节省比例。


## SCN-EDD — 有独立原因的加强尽调及有权结果

**Branch：**BR-08；**Workflow：**WF-06；**粒度：**8个原工作，19个动作。

**Current PPT：**M2.4识别EDD indicators；M5.1–.8由Financial Crime/Risk/Compliance开展。

**Target PPT：**M5.1–.8均在Agentic lane；新增Human M5.9 judgment/risk assessment、M5.10 approval；M5.3/.6/.7与新增人的边界必须解释。

**共同检查点：**同一risk context；默认不是强制高风险故事。required、not_required、unknown分别显示，不凭未展开分支就not_required。

**共同输入：**适用评估、风险问题、当时可用材料、政策/范围和权限，不额外给Target已批准结果。

**场景级初评分（不作自主授权）：**C=5 / O=5 / D=4 / B=2 / V=4 / T=2 / H=5。

**执行组成：**规则/代码 7；确定性Skill/工具 0；语义Skill 4；受限Agent候选 2；人执行判断/确认/提供 6。不是工时比例。


### D3-EDD-01 — 独立适用性

**变更分类：**Enhanced。**当前工作：**识别EDD indicators并调整要求。

**原After提案：**创建独立applicability评估及trigger reason，缺依据保持unknown；风险变化触发复核。

**Pain：**未展开EDD分支可能被误解为不需要EDD。（设计假设，未获客户实证）

**原因假设／控制理由：**适用判断、review状态与显示深度混在一起。

**Opportunity：**明确适用依据，不把同名命中或跨境视为自动触发。

**原PPT引用：**Current PPT-S1-SH18-A4；Target PPT-S2-SH18-A4。

**D3字段候选：**EDDApplicabilityAssessment.applicability; EDDApplicabilityAssessment.trigger_refs; EDDApplicabilityAssessment.review_status。

**Reference：**REG-AUSTRAC-EDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-01-01 | 执行已批准EDD适用触发规则，缺依据留unknown | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / EDD authority |
| D4A-EDD-01-02 | 决定需专业解释的EDD适用性 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Financial Crime / EDD authority |


**D4A-EDD-01-01｜执行已批准EDD适用触发规则，缺依据留unknown**

- 输入：CaseScope；RiskIndicators；EDDPolicy.revision。

- 输出：EDDApplicabilityCandidate。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDApplicabilityCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、RiskIndicators、EDDPolicy.revision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDApplicabilityCandidate并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-01-02｜决定需专业解释的EDD适用性**

- 输入：EDDApplicabilityCandidate；RiskEvidence。

- 输出：EDDApplicabilityDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDApplicabilityDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EDDApplicabilityCandidate、RiskEvidence对应的权限或关键证据缺失，When尝试“决定需专业解释的EDD适用性”，Then保持待判断并不产生EDDApplicabilityDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-02 — 发起与分配

**变更分类：**Reassigned。**当前工作：**Initiate & assign EDD case。

**原After提案：**required且scope明确后建立关联work和分配依据；owner未定显示Unassigned。

**Pain：**适用后可能缺少明确任务或负责角色。（设计假设，未获客户实证）

**原因假设／控制理由：**任务创建与风险判断责任未分开。

**Opportunity：**工作流建立关联EDD工作并保留Unassigned。

**原PPT引用：**Current PPT-S1-SH297-A1；Target PPT-S2-SH297-A1。

**D3字段候选：**EDDAssessment.applicability_ref; WorkItem.assignment_basis_ref; WorkItem.owner_ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-02-01 | 校验required适用性、范围和允许启动条件 | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Financial Crime / EDD authority |
| D4A-EDD-02-02 | 按明确责任目录建立EDD任务与暂停条件 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Financial Crime / EDD authority |


**D4A-EDD-02-01｜校验required适用性、范围和允许启动条件**

- 输入：EDDApplicabilityDecision；CaseScope；HoldRefs。

- 输出：EDDStartEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDStartEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EDDApplicabilityDecision、CaseScope、HoldRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDStartEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-02-02｜按明确责任目录建立EDD任务与暂停条件**

- 输入：EDDStartEligibility；AssignmentCatalogue。

- 输出：EDDAssessment；WorkItem。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDAssessment、WorkItem，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EDDStartEligibility、AssignmentCatalogue中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDAssessment、WorkItem并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-03 — 编制证据包

**变更分类：**Reassigned。**当前工作：**Compile EDD evidence pack。

**原After提案：**按具体风险问题关联claims、source、版本和未决项，生成可审阅材料包。

**Pain：**专家可能花时间汇编资料而不是判断风险问题。（设计假设，未获客户实证）

**原因假设／控制理由：**证据包按文件堆叠而未按风险问题组织。

**Opportunity：**同一证据编排候选Agent在隔离任务scope下补齐已批准问题。

**原PPT引用：**Current PPT-S1-SH297-A2；Target PPT-S2-SH297-A2。

**D3字段候选：**EvidencePack.revision; EvidencePack.risk_question_refs; EvidencePack.input_refs; EvidencePack.open_issues。

**Reference：**IC-PHKL, XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-03-01 | 按已确定风险问题规划获准材料的补齐顺序 | 受限Agent候选; SK-01,SK-05 | 4/4/4/3/4/3/3 | 12 / 6 | Financial Crime / EDD authority；AG-EVID |
| D4A-EDD-03-02 | 按问题组织证据包、来源与未决事项 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / EDD authority |


**D4A-EDD-03-01｜按已确定风险问题规划获准材料的补齐顺序**

- 输入：ApprovedRiskQuestions；AvailableEvidence；AllowedSources。

- 输出：EDDEvidencePlanProposal。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDEvidencePlanProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出EDDEvidencePlanProposal。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-03-02｜按问题组织证据包、来源与未决事项**

- 输入：EDDEvidencePlan；EvidenceUse[]；RiskQuestion[]。

- 输出：EDDEvidencePack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDEvidencePack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对EDDEvidencePlan、EvidenceUse[]、RiskQuestion[]加入缺失值、矛盾及恶意指令，输出EDDEvidencePack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-04 — 风险因素判断

**变更分类：**Reassigned。**当前工作：**Assess evidencing risk factors。

**原After提案：**产品可准备证据与候选风险解释，M5.9有权人员判断实际意义并记录。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**对风险因素作实质解释是专家职责，不能由分值授权自动化。

**Opportunity：**为判断提供结构化context并保留专家理由。

**原PPT引用：**Current PPT-S1-SH297-A3；Target PPT-S2-SH297-A3, PPT-S2-SH410-A1。

**D3字段候选：**EDDAssessment.risk_factor_refs; EDDAssessment.judgment_ref; EDDAssessment.assessor_permission_ref。

**Reference：**REG-AUSTRAC-EDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-04-01 | 准备风险问题、相关证据与反向证据 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / EDD authority |
| D4A-EDD-04-02 | 作EDD风险因素判断与意义评估 | 人执行判断/确认/提供; SK-06 | 5/4/3/2/3/2/5 | 12 / 4 | EDD specialist |


**D4A-EDD-04-01｜准备风险问题、相关证据与反向证据**

- 输入：RiskQuestion[]；EvidenceUse[]；OpenIssue[]。

- 输出：RiskFactorReviewPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RiskFactorReviewPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对RiskQuestion[]、EvidenceUse[]、OpenIssue[]加入缺失值、矛盾及恶意指令，输出RiskFactorReviewPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-04-02｜作EDD风险因素判断与意义评估**

- 输入：RiskFactorReviewPack；PolicyContext。

- 输出：EDDRiskJudgment。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：EDD specialist（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDRiskJudgment，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given RiskFactorReviewPack、PolicyContext对应的权限或关键证据缺失，When尝试“作EDD风险因素判断与意义评估”，Then保持待判断并不产生EDDRiskJudgment；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-05 — 关闭intelligence/证据缺口

**变更分类：**Enhanced。**当前工作：**Close intelligence & gaps。

**原After提案：**依风险问题形成具体内部查询或获准客户请求；适用时分别关联SoF、SoW用途。

**Pain：**增强尽调可能变成无针对性的长补件清单。（设计假设，未获客户实证）

**原因假设／控制理由：**未把每个风险问题映射为具体未知与用途。

**Opportunity：**提出有限取证计划并保持SoF/SoW等用途分开。

**原PPT引用：**Current PPT-S1-SH297-A4；Target PPT-S2-SH297-A4, PPT-S2-SH392-EX。

**D3字段候选：**RiskQuestion.gap_refs; RequestItem.risk_question_ref; EvidenceUseAssessment.purpose_code。

**Reference：**REG-AUSTRAC-SOF；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-05-01 | 针对尚未解决的风险问题选择下一获准信息动作 | 受限Agent候选; SK-01,SK-05,SK-08 | 4/4/4/3/4/3/3 | 12 / 6 | Financial Crime / EDD authority；AG-EVID |
| D4A-EDD-05-02 | 审核需对外披露的针对性补充项目 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | EDD/request authority |


**D4A-EDD-05-01｜针对尚未解决的风险问题选择下一获准信息动作**

- 输入：RiskQuestionGaps；PriorResponses；AllowedSources。

- 输出：TargetedEnquiryPlan。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅TargetedEnquiryPlan，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出TargetedEnquiryPlan。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-05-02｜审核需对外披露的针对性补充项目**

- 输入：TargetedEnquiryPlan；DisclosureRules。

- 输出：ApprovedRiskInformationRequest。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：EDD/request authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ApprovedRiskInformationRequest，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given TargetedEnquiryPlan、DisclosureRules对应的权限或关键证据缺失，When尝试“审核需对外披露的针对性补充项目”，Then保持待判断并不产生ApprovedRiskInformationRequest；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-06 — 专家咨询

**变更分类：**Enhanced。**当前工作：**Consult risk specialists。

**原After提案：**向相应专业角色发送最小必要context、问题、所需决定和返回位置。

**Pain：**专家咨询可能缺少问题、所需决定或返回位置。（设计假设，未获客户实证）

**原因假设／控制理由：**咨询被当成普通消息，而非案件内有结果的任务。

**Opportunity：**准备最小必要上下文，固定路由和返回。

**原PPT引用：**Current PPT-S1-SH297-A5；Target PPT-S2-SH297-A5。

**D3字段候选：**SpecialistConsultation.question_ref; SpecialistConsultation.response_ref; SpecialistConsultation.visibility_scope。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-06-01 | 整理要咨询的问题、证据与所需输出 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / EDD authority |
| D4A-EDD-06-02 | 按责任目录派发并记录答复任务 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Financial Crime / EDD authority |
| D4A-EDD-06-03 | 由相应专家提供真实专业意见 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Risk specialist |


**D4A-EDD-06-01｜整理要咨询的问题、证据与所需输出**

- 输入：RiskQuestion；CaseAllowedProjection。

- 输出：SpecialistConsultationPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SpecialistConsultationPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对RiskQuestion、CaseAllowedProjection加入缺失值、矛盾及恶意指令，输出SpecialistConsultationPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-06-02｜按责任目录派发并记录答复任务**

- 输入：SpecialistConsultationPack；RoleDirectory。

- 输出：ConsultationTask；ResumeAnchor。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConsultationTask、ResumeAnchor，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SpecialistConsultationPack、RoleDirectory中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConsultationTask、ResumeAnchor并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-06-03｜由相应专家提供真实专业意见**

- 输入：ConsultationTask；EvidenceRefs。

- 输出：SpecialistOpinion。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Risk specialist（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SpecialistOpinion，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ConsultationTask、EvidenceRefs对应的权限或关键证据缺失，When尝试“由相应专家提供真实专业意见”，Then保持待判断并不产生SpecialistOpinion；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-07 — 结果、条件与批准

**变更分类：**Reassigned。**当前工作：**决定EDD outcome/conditions并取得required approvals。

**原After提案：**拆开准备结果/风险判断/条件定义/授权批准/记录；每项指定输入包版本与decision scope。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**风险结果、条件与正式批准不能因为自动化而被合并。

**Opportunity：**把准备、判断、条件定义、批准和记录分别关联。

**原PPT引用：**Current PPT-S1-SH297-A6, PPT-S1-SH297-A7；Target PPT-S2-SH297-A6, PPT-S2-SH297-A7, PPT-S2-SH410-A1, PPT-S2-SH410-A2。

**D3字段候选：**EDDOutcome.decision_ref; EDDCondition.status; Approval.input_revision; Approval.authority_ref。

**Reference：**REG-AUSTRAC-EDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-07-01 | 整理已知风险结果与候选条件，不代签 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Financial Crime / EDD authority |
| D4A-EDD-07-02 | 确定EDD结果与实际需要的条件 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | EDD specialist |
| D4A-EDD-07-03 | 对指定包版本完成相应批准 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | EDD approval authority |
| D4A-EDD-07-04 | 记录结果与未满足条件，禁止全案自动通过 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Financial Crime / EDD authority |


**D4A-EDD-07-01｜整理已知风险结果与候选条件，不代签**

- 输入：RiskJudgments；ExpertOpinions；EvidencePack.revision。

- 输出：EDDOutcomeDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDOutcomeDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对RiskJudgments、ExpertOpinions、EvidencePack.revision加入缺失值、矛盾及恶意指令，输出EDDOutcomeDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-07-02｜确定EDD结果与实际需要的条件**

- 输入：EDDOutcomeDraft；CurrentEvidence。

- 输出：EDDOutcomeDecision；EDDConditionDefinition[]。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：EDD specialist（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDOutcomeDecision、EDDConditionDefinition[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EDDOutcomeDraft、CurrentEvidence对应的权限或关键证据缺失，When尝试“确定EDD结果与实际需要的条件”，Then保持待判断并不产生EDDOutcomeDecision、EDDConditionDefinition[]；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-07-03｜对指定包版本完成相应批准**

- 输入：EDDOutcomeDecision；ApprovalPolicy。

- 输出：EDDApproval。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：EDD approval authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDApproval，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given EDDOutcomeDecision、ApprovalPolicy对应的权限或关键证据缺失，When尝试“对指定包版本完成相应批准”，Then保持待判断并不产生EDDApproval；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-07-04｜记录结果与未满足条件，禁止全案自动通过**

- 输入：EDDApproval；Conditions；ScopeRevision。

- 输出：EDDOutcome；ClearanceCondition[]。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDOutcome、ClearanceCondition[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EDDApproval、Conditions、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDOutcome、ClearanceCondition[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-EDD-08 — 交接结果

**变更分类：**Enhanced。**当前工作：**Record & hand over EDD outcome。

**原After提案：**把结果和仍有效条件提供给QA/Readiness，按角色限制细节；无批准只发送pending投影。

**Pain：**EDD工作结束可能让未履行条件被遗漏。（设计假设，未获客户实证）

**原因假设／控制理由：**结果与条件履行被一个Completed覆盖。

**Opportunity：**让QA和Readiness读取明确状态而非摘要结论。

**原PPT引用：**Current PPT-S1-SH297-A8；Target PPT-S2-SH297-A8。

**D3字段候选：**EDDOutcome.handoff_event_ref; ClearanceCondition.origin_ref; ClearanceCondition.satisfied_by_refs。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-EDD-08-01 | 发布已记录的EDD结果与条件引用给内部消费者 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Financial Crime / EDD authority |
| D4A-EDD-08-02 | 按角色显示结果、未决条件和下一责任人 | 规则/代码; SK-12 | 2/2/1/5/4/5/3 | 5 / 10 | Financial Crime / EDD authority |


**D4A-EDD-08-01｜发布已记录的EDD结果与条件引用给内部消费者**

- 输入：EDDOutcome；CurrentConditionRefs。

- 输出：EDDConditionHandoffEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDConditionHandoffEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EDDOutcome、CurrentConditionRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDConditionHandoffEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-EDD-08-02｜按角色显示结果、未决条件和下一责任人**

- 输入：EDDConditionHandoffEvent；RolePolicy。

- 输出：EDDAllowedSummary。

- 选择依据：按真实对象状态/权限生成投影，固定查询比自由生成结论可靠。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Financial Crime / EDD authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：适用性unknown、材料/专家/批准缺失；本动作所需输入或权限欠缺则保持待处理。

- 恢复：对应证据或有权决定到达；不通过普通EDD绕过限制；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅EDDAllowedSummary，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EDDConditionHandoffEvent、RolePolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限EDDAllowedSummary并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**unknown不变not_required；本案是否需要EDD由独立依据判断；批准不等于条件履行。

**上游/下游：**unknown→等待适用评估；required→针对性任务；材料/专家/批准未到保持等待；结果写回conditions非直接clearance。

**Journey／Product：**EDD仅一条条件轨道：applicability chip+理由+进入所需工作；不生成第二套大产品。

**价值验证问题：**能否回答为什么本案要EDD、要解决哪一风险问题，而不是“复杂所以多收资料”？ 不添加无数据的节省比例。


## SCN-CONFLICTS — 早期冲突检查与受限专业判断

**Branch：**BR-09；**Workflow：**WF-07；**粒度：**5个原工作，10个动作。

**Current PPT：**M1信息触发M7.1–.4，Control Room进行搜索/调查/清除记录。

**Target PPT：**M7.1–.4在Agentic；Control Room有M7.5–.7；目标不是从“晚”到“早”的绝对新功能，而是更清楚的标准执行/异常判断分工。

**共同检查点：**同一M1关系信息，已具备自身input且无禁止hold时开始；Current同样已有early trigger。

**共同输入：**Entity A/B、产品/关系范围、获准search scope与相同返回候选。

**场景级初评分（不作自主授权）：**C=5 / O=4 / D=3 / B=2 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 5；确定性Skill/工具 1；语义Skill 1；受限Agent候选 0；人执行判断/确认/提供 3。不是工时比例。


### D3-CONFLICTS-01 — 尽早发起

**变更分类：**Enhanced。**当前工作：**源图已明确M1信息触发conflict check。

**原After提案：**对当前party/relationship输入建立work与trigger record，满足自身条件即可准备，不等待所有KYC。

**Pain：**提前启动的条件可能靠人工追问和协调。（设计假设，未获客户实证）

**原因假设／控制理由：**M1触发与检查输入、权限和hold关系未明确。

**Opportunity：**保留Current已有早启动，用确定性前置判断形成任务。

**原PPT引用：**Current PPT-S1-SH312-A1, PPT-S1-SH20-A1；Target PPT-S2-SH312-A1, PPT-S2-SH20-A1。

**D3字段候选：**ConflictReview.scope_revision; ConflictReview.trigger_basis_ref; ConflictReview.party_refs。

**Reference：**XB-ACDM；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CONFLICTS-01-01 | 验证M1 context、适用性和hold后发起检查 | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Control Room / conflicts authority |
| D4A-CONFLICTS-01-02 | 建立对应Scope的检查工作与来源 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Control Room / conflicts authority |


**D4A-CONFLICTS-01-01｜验证M1 context、适用性和hold后发起检查**

- 输入：CaseScope；PartyContext；ConflictPolicy；HoldRefs。

- 输出：ConflictStartEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictStartEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、PartyContext、ConflictPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConflictStartEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CONFLICTS-01-02｜建立对应Scope的检查工作与来源**

- 输入：ConflictStartEligibility；TriggerEvent。

- 输出：ConflictReview；WorkItem。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictReview、WorkItem，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ConflictStartEligibility、TriggerEvent中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConflictReview、WorkItem并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CONFLICTS-02 — 执行获准搜索

**变更分类：**Reassigned。**当前工作：**Perform conflicts/NDA search。

**原After提案：**标准搜索通过获准工具执行/模拟，记录查询范围与结果时点，返回candidate和异常。

**Pain：**搜索是否成功可能不易与冲突是否解决区分。（设计假设，未获客户实证）

**原因假设／控制理由：**执行回执与专业结论缺少独立记录。

**Opportunity：**使用获准搜索工具，记录返回与失败。

**原PPT引用：**Current PPT-S1-SH312-A2；Target PPT-S2-SH312-A2。

**D3字段候选：**ConflictReview.search_scope; ConflictSearch.result_status; ConflictSearch.source_ref。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CONFLICTS-02-01 | 按允许范围执行Conflicts/NDA搜索 | 确定性Skill/工具; SK-09 | 2/2/1/4/3/4/3 | 5 / 8 | Control Room / conflicts authority |
| D4A-CONFLICTS-02-02 | 绑定原结果与范围，不写clearance | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Control Room / conflicts authority |


**D4A-CONFLICTS-02-01｜按允许范围执行Conflicts/NDA搜索**

- 输入：ApprovedConflictSearch；PartySnapshot。

- 输出：ConflictSearchReceipt；CandidateFinding[]。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictSearchReceipt、CandidateFinding[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedConflictSearch、PartySnapshot中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConflictSearchReceipt、CandidateFinding[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CONFLICTS-02-02｜绑定原结果与范围，不写clearance**

- 输入：ConflictSearchReceipt；ScopeRevision。

- 输出：ConflictFinding；SearchAudit。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictFinding、SearchAudit，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ConflictSearchReceipt、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConflictFinding、SearchAudit并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CONFLICTS-03 — 调查与相关性判断

**变更分类：**Reassigned。**当前工作：**Control Room investigate/resolve。

**原After提案：**产品准备相关context与重复候选，M7.5处理potential；区分candidate记录与实际专业结论。

**Pain：**候选关联需要专业人员重新组织上下文。（设计假设，未获客户实证）

**原因假设／控制理由：**候选、来源与本案关系不清。

**Opportunity：**语义整理关联，专业人决定实际相关性。

**原PPT引用：**Current PPT-S1-SH312-A3；Target PPT-S2-SH312-A3, PPT-S2-SH311-A1。

**D3字段候选：**ConflictFinding.restricted_detail_ref; ConflictFinding.resolution_status; ConflictDecision.basis_refs。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CONFLICTS-03-01 | 整理受限候选与案件关系、来源和未知 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Control Room / conflicts authority |
| D4A-CONFLICTS-03-02 | 调查并决定候选是否构成需处理的冲突 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Control Room / conflicts specialist |


**D4A-CONFLICTS-03-01｜整理受限候选与案件关系、来源和未知**

- 输入：ConflictFinding；PermittedRelationshipContext。

- 输出：ConflictReviewPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictReviewPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对ConflictFinding、PermittedRelationshipContext加入缺失值、矛盾及恶意指令，输出ConflictReviewPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CONFLICTS-03-02｜调查并决定候选是否构成需处理的冲突**

- 输入：ConflictReviewPack；ApplicableControlContext。

- 输出：ConflictDecisionProposal。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Control Room / conflicts specialist（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictDecisionProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ConflictReviewPack、ApplicableControlContext对应的权限或关键证据缺失，When尝试“调查并决定候选是否构成需处理的冲突”，Then保持待判断并不产生ConflictDecisionProposal；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CONFLICTS-04 — 升级和hold

**变更分类：**Enhanced。**当前工作：**源过程包含resolve，但未展开所有升级条件。

**原After提案：**需要时按明确演示规则升级，记录范围、责任、等待及解除条件；无权限或影响不明不自动分配结论。

**Pain：**问题出现后容易全部暂停或错误放行不明影响的工作。（设计假设，未获客户实证）

**原因假设／控制理由：**hold影响范围、责任和解除条件未结构化。

**Opportunity：**先判断范围，再由规则限制对应动作。

**原PPT引用：**Current PPT-S1-SH312-A3；Target PPT-S2-SH311-A2。

**D3字段候选：**Hold.target_refs; Hold.action_scope; Hold.release_condition_ref; Escalation.owner_ref。

**Reference：**XB-ACDM；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CONFLICTS-04-01 | 确定需升级或限制的影响范围 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Conflicts authority |
| D4A-CONFLICTS-04-02 | 按已知决定执行task/branch/case动作限制 | 规则/代码; SK-07,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Control Room / conflicts authority |


**D4A-CONFLICTS-04-01｜确定需升级或限制的影响范围**

- 输入：ConflictReviewPack；DependencyEvidence。

- 输出：ConflictImpactDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Conflicts authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictImpactDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ConflictReviewPack、DependencyEvidence对应的权限或关键证据缺失，When尝试“确定需升级或限制的影响范围”，Then保持待判断并不产生ConflictImpactDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CONFLICTS-04-02｜按已知决定执行task/branch/case动作限制**

- 输入：ConflictImpactDecision；HoldPolicy；DependencyEdge[]。

- 输出：Hold；EscalationTask；UnknownImpact。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Hold、EscalationTask、UnknownImpact，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ConflictImpactDecision、HoldPolicy、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Hold、EscalationTask、UnknownImpact并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CONFLICTS-05 — 确认与记录分开

**变更分类：**Enhanced。**当前工作：**Record conflict clearance。

**原After提案：**有权者M7.7确认结果，产品M7.4记录对应decision和状态投影，更新相关准入条件。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**冲突正式确认与记录是保留控制，不得按搜索完成自动关闭。

**Opportunity：**授权确认和状态记录分层。

**原PPT引用：**Current PPT-S1-SH312-A4；Target PPT-S2-SH312-A4, PPT-S2-SH311-A3。

**D3字段候选：**ConflictReview.decision_ref; ConflictReview.clearance_status; ClearanceCondition.current_basis_ref。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CONFLICTS-05-01 | 确认指定Scope内的冲突结果及条件 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Conflicts authority |
| D4A-CONFLICTS-05-02 | 记录对应结果并更新限定条件 | 规则/代码; SK-11 | 2/1/1/5/3/5/5 | 4 / 10 | Control Room / conflicts authority |


**D4A-CONFLICTS-05-01｜确认指定Scope内的冲突结果及条件**

- 输入：ConflictDecisionProposal；CurrentEvidence；Permission。

- 输出：AuthorisedConflictOutcome。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Conflicts authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorisedConflictOutcome，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ConflictDecisionProposal、CurrentEvidence、Permission对应的权限或关键证据缺失，When尝试“确认指定Scope内的冲突结果及条件”，Then保持待判断并不产生AuthorisedConflictOutcome；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CONFLICTS-05-02｜记录对应结果并更新限定条件**

- 输入：AuthorisedConflictOutcome；ExpectedRevision。

- 输出：ConflictReview.clearance_ref；ConditionEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Control Room / conflicts authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：候选需调查、未知影响或无权确认；本动作所需输入或权限欠缺则保持待处理。

- 恢复：明确调查结果与解除条件满足后重评，不自动全案恢复；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConflictReview.clearance_ref、ConditionEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AuthorisedConflictOutcome、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConflictReview.clearance_ref、ConditionEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**搜索完成不代表clearance；不自动全案暂停，也不在影响未知时宣称全部可继续。

**上游/下游：**potential不等于已确认冲突；task/branch/case限制须有依据；未知impact不能标其他全可做。

**Journey／Product：**跨阶段轨道，从M1触发锚点延至结果；选finding只给获准角色完整详情，其他只看permitted status。

**价值验证问题：**能否分开search finished、potential investigation、authorised outcome和recorded clearance？ 不添加无数据的节省比例。


## SCN-LEGAL — 协议版本吸收专业输入并完成适用执行

**Branch：**BR-11；**Workflow：**WF-09；**粒度：**8个原工作，21个动作。

**Current PPT：**C1.1–.8完整协议工作；C1.4要求时吸收Credit input。

**Target PPT：**仅C1.3明确从Draft required变Review drafted；生成方未说明。其余Legal活动仍有责任；版本联动是设计增强。

**共同检查点：**同一产品/法人/booking工作范围和Credit inputs；协议并不因为我们未显示金额就自动完成商业内容。

**共同输入：**同一协议需求、已有草稿、具体credit condition reference和现有审批/签字权限状态。

**场景级初评分（不作自主授权）：**C=5 / O=4 / D=3 / B=2 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 8；确定性Skill/工具 3；语义Skill 3；受限Agent候选 0；人执行判断/确认/提供 7。不是工时比例。


### D3-LEGAL-01 — Legal intake

**变更分类：**Enhanced。**当前工作：**接收并建立Legal request。

**原After提案：**从共享scope取得法人/产品/booking及当前版本，缺少输入建立明确任务，不要求Legal反复从邮件拼接。

**Pain：**Legal可能需要重新定位案件范围和已提供资料。（设计假设，未获客户实证）

**原因假设／控制理由：**请求内容与Scope版本、所缺字段未绑定。

**Opportunity：**固定工作流加载共享范围并明确不足项。

**原PPT引用：**Current PPT-S1-SH330-A1；Target PPT-S2-SH330-A1。

**D3字段候选：**LegalRequest.scope_ref; LegalRequest.scope_revision; LegalRequest.input_gap_refs。

**Reference：**IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-01-01 | 取得获准的交易主体、产品与booking范围 | 确定性Skill/工具; SK-01 | 2/2/1/4/3/4/3 | 5 / 8 | Legal / agreement authority |
| D4A-LEGAL-01-02 | 校验Legal intake最小输入并建立具体缺口 | 规则/代码; SK-04,SK-07 | 3/2/1/4/4/5/4 | 6 / 9 | Legal / agreement authority |


**D4A-LEGAL-01-01｜取得获准的交易主体、产品与booking范围**

- 输入：CaseScope.revision；LegalRoleProjection。

- 输出：LegalIntakeContext。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅LegalIntakeContext，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope.revision、LegalRoleProjection中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限LegalIntakeContext并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-01-02｜校验Legal intake最小输入并建立具体缺口**

- 输入：LegalIntakeContext；LegalIntakeDefinition。

- 输出：LegalRequest；LegalInputGap[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅LegalRequest、LegalInputGap[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少LegalIntakeContext、LegalIntakeDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限LegalRequest、LegalInputGap[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-02 — 确定协议与表单

**变更分类：**Enhanced。**当前工作：**确定required agreements/forms。

**原After提案：**将适用协议定义、主体、用途、版本与专业判断分开；未确认类型保持pending。

**Pain：**协议选择依据不明确会增加重复确认。（设计假设，未获客户实证）

**原因假设／控制理由：**产品意图与适用协议定义可能被直接等同。

**Opportunity：**先用已批准的协议适用规则，未知交Legal判断。

**原PPT引用：**Current PPT-S1-SH332-A1；Target PPT-S2-SH332-A1。

**D3字段候选：**AgreementRequirement.definition_ref; AgreementRequirement.applicability; AgreementRequirement.basis_ref。

**Reference：**IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-02-01 | 匹配当前范围与已明确的协议定义 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | Legal / agreement authority |
| D4A-LEGAL-02-02 | 确定未知或例外情况下的协议/表单需求 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Legal authority |


**D4A-LEGAL-02-01｜匹配当前范围与已明确的协议定义**

- 输入：CaseScope；ApprovedAgreementCatalogue。

- 输出：AgreementApplicabilityCandidate。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementApplicabilityCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、ApprovedAgreementCatalogue中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementApplicabilityCandidate并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-02-02｜确定未知或例外情况下的协议/表单需求**

- 输入：AgreementApplicabilityCandidate；ProductContext。

- 输出：AgreementRequirementDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementRequirementDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given AgreementApplicabilityCandidate、ProductContext对应的权限或关键证据缺失，When尝试“确定未知或例外情况下的协议/表单需求”，Then保持待判断并不产生AgreementRequirementDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-03 — 草稿准备与审阅

**变更分类：**Reassigned。**当前工作：**Current由Legal draft；Target写review drafted。

**原After提案：**显示草稿的真实来源（template/human/approved automation）及版本；未确定生成方时不承诺GenAI起草。

**Pain：**草稿来源不清可能把模板/人工文件误表述为AI已起草。（设计假设，未获客户实证）

**原因假设／控制理由：**Target只写Review drafted，未明确生成方。

**Opportunity：**来源明确的模板优先，专家审阅实质内容。

**原PPT引用：**Current PPT-S1-SH334-A1；Target PPT-S2-SH334-A1。

**D3字段候选：**LegalAgreement.draft_origin; LegalAgreement.template_revision; LegalAgreement.agreement_revision; DraftReview.status。

**Reference：**IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-03-01 | 在来源与模板获准时填入已确认字段形成草稿 | 确定性Skill/工具; SK-06 | 3/2/1/4/4/4/4 | 6 / 8 | Legal / agreement authority |
| D4A-LEGAL-03-02 | 审阅草稿条款和适用性，不由模型作法律决定 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Legal reviewer |


**D4A-LEGAL-03-01｜在来源与模板获准时填入已确认字段形成草稿**

- 输入：ApprovedTemplate.revision；AcceptedScopeFields；DraftOrigin。

- 输出：AgreementDraft；DraftProvenance。

- 选择依据：适用模板和已知字段足以完成定界输出；生成式改写不是默认需要。 没有批准模板或明确草稿来源时仅显示缺口；不默认生成法律条款。

- 协同：Agent-prepared；Prepare；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementDraft、DraftProvenance，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：缺少ApprovedTemplate.revision、AcceptedScopeFields、DraftOrigin中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementDraft、DraftProvenance并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-03-02｜审阅草稿条款和适用性，不由模型作法律决定**

- 输入：AgreementDraft；ApplicableLegalContext。

- 输出：LegalDraftReview。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅LegalDraftReview，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given AgreementDraft、ApplicableLegalContext对应的权限或关键证据缺失，When尝试“审阅草稿条款和适用性，不由模型作法律决定”，Then保持待判断并不产生LegalDraftReview；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-04 — 纳入Credit条件

**变更分类：**Enhanced。**当前工作：**需要时Legal incorporates Credit；C2.6提供数据。

**原After提案：**条件记录有condition_spec_ref/current revision；逐项保存incorporation映射到协议章节/字段与review状态。

**Pain：**Credit条件可能没有准确映射到协议位置。（设计假设，未获客户实证）

**原因假设／控制理由：**批准、条件定义和已纳入条款被混为一件事。

**Opportunity：**语义匹配可提候选，实质落实由专业审阅确认。

**原PPT引用：**Current PPT-S1-SH336-A1, PPT-S1-SH326-A1；Target PPT-S2-SH336-A1, PPT-S2-SH326-A1。

**D3字段候选：**CreditCondition.condition_spec_ref; AgreementInput.credit_revision; ConditionIncorporation.agreement_revision; ConditionIncorporation.clause_ref。

**Reference：**IND-BASEL-CCR, IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-04-01 | 比较具体Credit条件与当前协议条款并列差异 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | Legal / agreement authority |
| D4A-LEGAL-04-02 | 核对条款是否落实指定版本的专业条件 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Legal / Credit designated reviewer |
| D4A-LEGAL-04-03 | 保存条件、条款位置和协议版本的使用关系 | 规则/代码; SK-10,SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Legal / agreement authority |


**D4A-LEGAL-04-01｜比较具体Credit条件与当前协议条款并列差异**

- 输入：CreditCondition.spec_ref；AgreementDraft.revision。

- 输出：ConditionIncorporationCandidate。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConditionIncorporationCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对CreditCondition.spec_ref、AgreementDraft.revision加入缺失值、矛盾及恶意指令，输出ConditionIncorporationCandidate仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-04-02｜核对条款是否落实指定版本的专业条件**

- 输入：ConditionIncorporationCandidate；CreditInput.revision。

- 输出：ConditionIncorporationReview。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal / Credit designated reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConditionIncorporationReview，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ConditionIncorporationCandidate、CreditInput.revision对应的权限或关键证据缺失，When尝试“核对条款是否落实指定版本的专业条件”，Then保持待判断并不产生ConditionIncorporationReview；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-04-03｜保存条件、条款位置和协议版本的使用关系**

- 输入：ConditionIncorporationReview；ExpectedRevisions。

- 输出：AgreementInput；ConditionIncorporation；DependencyEdge。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementInput、ConditionIncorporation、DependencyEdge，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ConditionIncorporationReview、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementInput、ConditionIncorporation、DependencyEdge并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-05 — 协商与变更

**变更分类：**Enhanced。**当前工作：**Negotiate agreement terms。

**原After提案：**记录每个有效草稿、反馈和变更；识别哪些变更触及Credit条件或scope，回到具体review。

**Pain：**谈判修改可能未及时反馈到相关专业批准。（设计假设，未获客户实证）

**原因假设／控制理由：**条款差异、可见性和批准输入版本未关联。

**Opportunity：**人负责谈判，Skill整理差异，规则定位已知影响。

**原PPT引用：**Current PPT-S1-SH338-A1；Target PPT-S2-SH338-A1。

**D3字段候选：**NegotiationChange.changed_clause_refs; NegotiationChange.visibility; AgreementRevision.supersedes_ref; ChangeImpact.review_refs。

**Reference：**IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-05-01 | 由获授权人员协商实际条款与客户反馈 | 人执行判断/确认/提供; SK-06 | 5/4/4/2/3/2/5 | 13 / 4 | Legal / authorised negotiator |
| D4A-LEGAL-05-02 | 提取条款修订与原版本差异并保留出处 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | Legal / agreement authority |
| D4A-LEGAL-05-03 | 按声明依赖标记受影响审批或未知影响 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Legal / agreement authority |


**D4A-LEGAL-05-01｜由获授权人员协商实际条款与客户反馈**

- 输入：CurrentAgreement；NegotiationContext。

- 输出：NegotiationResponse。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 

- 协同：Human-led；Assist；人负责/异常转交：Legal / authorised negotiator（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅NegotiationResponse，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成NegotiationResponse；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-05-02｜提取条款修订与原版本差异并保留出处**

- 输入：NegotiationResponse；AgreementRevisions。

- 输出：ClauseChangeCandidate[]。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClauseChangeCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对NegotiationResponse、AgreementRevisions加入缺失值、矛盾及恶意指令，输出ClauseChangeCandidate[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-05-03｜按声明依赖标记受影响审批或未知影响**

- 输入：ReviewedClauseChanges；DependencyEdge[]。

- 输出：ApprovalCurrencyReviewTask[]；UnknownImpact[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ApprovalCurrencyReviewTask[]、UnknownImpact[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReviewedClauseChanges、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ApprovalCurrencyReviewTask[]、UnknownImpact[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-06 — 最终内部审批与Credit检查

**变更分类：**Enhanced。**当前工作：**Legal internal review/approvals；Credit final agreement/data review。

**原After提案：**批准绑定明确协议版本与条件输入版本；适用的Credit最终检查完成才允许相关下游，保持与初次Credit批准分开。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**协议审批是正式责任，不能因自动化而合并为自动通过。

**Opportunity：**校验当前版本并分别保存各专业批准。

**原PPT引用：**Current PPT-S1-SH340-A1, PPT-S1-SH328-A1；Target PPT-S2-SH340-A1, PPT-S2-SH328-A1。

**D3字段候选：**AgreementApproval.agreement_revision; CreditAgreementReview.input_revision; CreditAgreementReview.status; Approval.authority_ref。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-06-01 | 校验协议、Credit输入和所需批准是否当前 | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Legal / agreement authority |
| D4A-LEGAL-06-02 | 各自完成适用的Legal批准和Credit最终核对 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Legal approver / Credit final-review authority |
| D4A-LEGAL-06-03 | 绑定实际所审协议和条件包版本记录批准 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Legal / agreement authority |


**D4A-LEGAL-06-01｜校验协议、Credit输入和所需批准是否当前**

- 输入：Agreement.revision；CreditInput.revision；ApprovalManifest。

- 输出：AgreementApprovalEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementApprovalEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少Agreement.revision、CreditInput.revision、ApprovalManifest中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementApprovalEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-06-02｜各自完成适用的Legal批准和Credit最终核对**

- 输入：AgreementApprovalEligibility；CurrentAgreement。

- 输出：DomainApproval[]。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 各领域是独立审批记录；不要求同一用户同时具备两个权限。

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal approver / Credit final-review authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅DomainApproval[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given AgreementApprovalEligibility、CurrentAgreement对应的权限或关键证据缺失，When尝试“各自完成适用的Legal批准和Credit最终核对”，Then保持待判断并不产生DomainApproval[]；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-06-03｜绑定实际所审协议和条件包版本记录批准**

- 输入：DomainApproval[]；ExpectedRevisions。

- 输出：AgreementApproval；CreditAgreementReview。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementApproval、CreditAgreementReview，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少DomainApproval[]、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementApproval、CreditAgreementReview并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-07 — 执行协议

**变更分类：**Enhanced。**当前工作：**Execute agreements。

**原After提案：**只有协议当前版本、所需批准、实际签字权限及hold条件成立才记录执行；关联执行证据。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**协议执行和签字权是必要控制，不是可由AI推导的成功状态。

**Opportunity：**执行前核验当前输入，记录真实合成签署行为及证据。

**原PPT引用：**Current PPT-S1-SH342-A1；Target PPT-S2-SH342-A1。

**D3字段候选：**ExecutionRecord.agreement_revision; ExecutionRecord.signatory_authority_refs; ExecutionRecord.executed_at; ExecutionRecord.evidence_ref。

**Reference：**IB-ISDA-CREATE；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-07-01 | 检查当前协议、各批准、签字权限与hold | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Legal / agreement authority |
| D4A-LEGAL-07-02 | 由具有相应签署权限的参与方完成签署 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Authorised signatories |
| D4A-LEGAL-07-03 | 接收获准签署服务的回执并绑定原件 | 确定性Skill/工具; SK-09,SK-11 | 2/2/1/4/3/4/3 | 5 / 8 | Legal / agreement authority |


**D4A-LEGAL-07-01｜检查当前协议、各批准、签字权限与hold**

- 输入：Agreement.revision；ApprovalManifest；SignatoryAuthority；HoldRefs。

- 输出：ExecutionEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ExecutionEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少Agreement.revision、ApprovalManifest、SignatoryAuthority中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ExecutionEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-07-02｜由具有相应签署权限的参与方完成签署**

- 输入：ExecutionEligibility；ExecutionDocument。

- 输出：SigningAction。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Authorised signatories（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SigningAction，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ExecutionEligibility、ExecutionDocument对应的权限或关键证据缺失，When尝试“由具有相应签署权限的参与方完成签署”，Then保持待判断并不产生SigningAction；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-07-03｜接收获准签署服务的回执并绑定原件**

- 输入：SigningAction；ExecutionAdapter。

- 输出：ExecutionReceipt；SignedArtifactRef。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 本轮只用明确合成回执；成功存储不验证法律有效性。

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ExecutionReceipt、SignedArtifactRef，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SigningAction、ExecutionAdapter中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ExecutionReceipt、SignedArtifactRef并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-LEGAL-08 — 条款与执行文件保存

**变更分类：**Enhanced。**当前工作：**Capture key terms and store executed docs。

**原After提案：**保存signed artifact版本/hash引用及关键条款的来源位置；下游条件消费结构化字段同时保留原件。

**Pain：**下游可能不知道关键条款来自哪份执行版本。（设计假设，未获客户实证）

**原因假设／控制理由：**结构化字段与签署原件未稳定链接。

**Opportunity：**提取仅作候选，采信与保存保留实际出处。

**原PPT引用：**Current PPT-S1-SH344-A1；Target PPT-S2-SH344-A1。

**D3字段候选：**ExecutedDocument.content_ref; KeyTerm.source_locator; LegalAgreement.executed_document_ref; AuditEvent.ref。

**Reference：**IB-ISDA-CREATE, XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-05, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-LEGAL-08-01 | 提取已执行文件的关键条款候选及位置 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | Legal / agreement authority |
| D4A-LEGAL-08-02 | 审阅会影响控制条件的关键条款采信 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Legal / designated term reviewer |
| D4A-LEGAL-08-03 | 记录条款值、原件版本与审阅决定 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Legal / agreement authority |


**D4A-LEGAL-08-01｜提取已执行文件的关键条款候选及位置**

- 输入：SignedArtifact；KeyTermSchema。

- 输出：KeyTermCandidate[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅KeyTermCandidate[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对SignedArtifact、KeyTermSchema加入缺失值、矛盾及恶意指令，输出KeyTermCandidate[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-08-02｜审阅会影响控制条件的关键条款采信**

- 输入：KeyTermCandidate[]；SignedArtifact。

- 输出：KeyTermAdoptionDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Legal / designated term reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅KeyTermAdoptionDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given KeyTermCandidate[]、SignedArtifact对应的权限或关键证据缺失，When尝试“审阅会影响控制条件的关键条款采信”，Then保持待判断并不产生KeyTermAdoptionDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-LEGAL-08-03｜记录条款值、原件版本与审阅决定**

- 输入：KeyTermAdoptionDecision；SignedArtifactRef。

- 输出：KeyTermRecord；ExecutedDocumentLink。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Legal / agreement authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：Credit输入、条款、签字权、审批或hold未解决；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前输入被确认；批准必须针对将使用的实际协议版本；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅KeyTermRecord、ExecutedDocumentLink，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少KeyTermAdoptionDecision、SignedArtifactRef中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限KeyTermRecord、ExecutedDocumentLink并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**条款纳入关联具体Credit/Agreement版本；协调资料权限不等于签字权；批准不等于执行。

**上游/下游：**可用基础输入足够可准备；final review/执行仍等所需Credit数据、实际协议版本批准、签字权和适用hold。

**Journey／Product：**Condition Detail为主，展开条款引用和版本链；Archify聚焦Credit inputs→实际agreement revision→review/execute，不做完整谈判系统。

**价值验证问题：**能否指出哪项Credit条件进入哪个协议版本、谁审核、签署记录针对哪个版本？ 不添加无数据的节省比例。


## SCN-CREDIT — 信用评估、批准、条件落实与协议数据分开

**Branch：**BR-10；**Workflow：**WF-08；**粒度：**7个原工作，16个动作。

**Current PPT：**C2.1–.7独立Credit工作并行，输出条件及Legal输入。

**Target PPT：**Target C2.1/.2/.6/.7和generic credit need被划线，C2.5仅Obtain划线；C2.3/.4保留。划线不等于该控制被正式取消。

**共同检查点：**同一FX意图和金融/敞口资料；无实际演示输入包不能假设分析或金额已经获批。

**共同输入：**本次产品/法人/booking、已建模credit applicability、真实合成financial/exposure snapshot及审批fixture。

**场景级初评分（不作自主授权）：**C=5 / O=4 / D=3 / B=2 / V=4 / T=3 / H=5。

**执行组成：**规则/代码 6；确定性Skill/工具 2；语义Skill 3；受限Agent候选 0；人执行判断/确认/提供 5。不是工时比例。


### D3-CREDIT-01 — 判断信用工作是否适用

**变更分类：**Enhanced。**当前工作：**Determine credit requirement。

**原After提案：**基于当前scope创建适用性及依据；对划线活动标“目标执行归属待确认”，不能从数据库删掉控制目的。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**Target划线不证明信用适用性控制被取消。

**Opportunity：**规则明确适用项，缺依据时交专业方确认。

**原PPT引用：**Current PPT-S1-SH316-A1；Target PPT-S2-SH316-A1。

**D3字段候选：**CreditAssessment.applicability; CreditAssessment.applicability_basis; ApplicabilityReview.status。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-01-01 | 对Scope运行已确认信用适用条件 | 规则/代码; SK-04 | 3/2/1/4/4/5/4 | 6 / 9 | Credit / credit authority |
| D4A-CREDIT-01-02 | 处理未明确或例外的信用工作适用性 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Credit authority |


**D4A-CREDIT-01-01｜对Scope运行已确认信用适用条件**

- 输入：CaseScope；CreditApplicabilityRules。

- 输出：CreditApplicabilityCandidate。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditApplicabilityCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、CreditApplicabilityRules中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditApplicabilityCandidate并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-01-02｜处理未明确或例外的信用工作适用性**

- 输入：CreditApplicabilityCandidate；ScopeEvidence。

- 输出：CreditApplicabilityDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Credit authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditApplicabilityDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CreditApplicabilityCandidate、ScopeEvidence对应的权限或关键证据缺失，When尝试“处理未明确或例外的信用工作适用性”，Then保持待判断并不产生CreditApplicabilityDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-02 — 取得金融与敞口资料

**变更分类：**Enhanced。**当前工作：**Retrieve & validate financial/exposure data。

**原After提案：**组织来源、财务期间、币种、报告实体和敞口时点；未建模所需资料保持缺口，数据抽取可准备不可自证。

**Pain：**财务期间、报告主体和敞口时点可能不一致。（设计假设，未获客户实证）

**原因假设／控制理由：**输入资料及单位、币种与Scope缺少明确对应。

**Opportunity：**来源检索、候选抽取、确定性核对分开。

**原PPT引用：**Current PPT-S1-SH318-A1；Target PPT-S2-SH318-A1。

**D3字段候选：**FinancialSnapshot.period; FinancialSnapshot.reporting_entity_ref; ExposureSnapshot.as_of; CreditAssessment.input_manifest。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-02-01 | 取得有权访问的财务与敞口快照 | 确定性Skill/工具; SK-01 | 2/2/1/4/3/4/3 | 5 / 8 | Credit / credit authority |
| D4A-CREDIT-02-02 | 提取报告实体、期间、币种与候选数值 | 语义Skill; SK-02 | 4/1/1/4/4/4/3 | 6 / 8 | Credit / credit authority |
| D4A-CREDIT-02-03 | 核对单位、币种、期间和来源完整性 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | Credit / credit authority |


**D4A-CREDIT-02-01｜取得有权访问的财务与敞口快照**

- 输入：Counterparty；FinancialSourceScope；AccessPolicy。

- 输出：FinancialArtifact；ExposureSnapshot。

- 选择依据：查询参数、获准来源与失败路径可以定义；调用多个接口不等于自主规划。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅FinancialArtifact、ExposureSnapshot，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少Counterparty、FinancialSourceScope、AccessPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限FinancialArtifact、ExposureSnapshot并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-02-02｜提取报告实体、期间、币种与候选数值**

- 输入：FinancialArtifact；FieldSchema。

- 输出：FinancialClaim[]。

- 选择依据：非结构化输入需要语义提取，但输出边界固定；先用单一Skill而非Agent。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅FinancialClaim[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对FinancialArtifact、FieldSchema加入缺失值、矛盾及恶意指令，输出FinancialClaim[]仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-02-03｜核对单位、币种、期间和来源完整性**

- 输入：FinancialClaim[]；ExposureSnapshot；DataDefinition。

- 输出：CreditInputCheck；DataGap[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 单位和数值校验用代码，不以LLM算术生成信用分数。

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditInputCheck、DataGap[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少FinancialClaim[]、ExposureSnapshot、DataDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditInputCheck、DataGap[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-03 — 交易对手风险判断

**变更分类：**Retained。**当前工作：**Assess counterparty credit risk。

**原After提案：**产品提供整理/核对/来源视图及可用的风险分析结果；Credit作相应判断，保存所用资料版本。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**交易对手信用风险判断是专业职责，不能被数据摘要代替。

**Opportunity：**Skill整理输入与问题，由Credit作实质判断。

**原PPT引用：**Current PPT-S1-SH320-A1；Target PPT-S2-SH320-A1。

**D3字段候选：**CreditAssessment.risk_assessment_ref; CreditAssessment.assessor_ref; CreditAssessment.input_revision_refs。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-03-01 | 组织当前金融/敞口输入、来源和未知 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Credit / credit authority |
| D4A-CREDIT-03-02 | 作交易对手信用风险评估 | 人执行判断/确认/提供; SK-06 | 5/3/3/2/3/2/5 | 11 / 4 | Credit risk authority |


**D4A-CREDIT-03-01｜组织当前金融/敞口输入、来源和未知**

- 输入：ReviewedFinancialData；ExposureSnapshot；Scope。

- 输出：CreditAssessmentPack。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditAssessmentPack，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对ReviewedFinancialData、ExposureSnapshot、Scope加入缺失值、矛盾及恶意指令，输出CreditAssessmentPack仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-03-02｜作交易对手信用风险评估**

- 输入：CreditAssessmentPack；ApplicableCreditContext。

- 输出：CreditRiskAssessment。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Credit risk authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditRiskAssessment，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CreditAssessmentPack、ApplicableCreditContext对应的权限或关键证据缺失，When尝试“作交易对手信用风险评估”，Then保持待判断并不产生CreditRiskAssessment；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-04 — 定义额度与条件

**变更分类：**Enhanced。**当前工作：**Determine credit limit & conditions。

**原After提案：**条件定义、约束范围、适用产品和满足证据各自记录；本轮不展示未研究金额，使用有边界的合成documentation condition。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**信用条件与额度的定义需要责任人，条件批准不等于已经满足。

**Opportunity：**定义真实有内容的合成条件，再单独记录落实证据。

**原PPT引用：**Current PPT-S1-SH322-A1；Target PPT-S2-SH322-A1。

**D3字段候选：**CreditCondition.definition_ref; CreditCondition.condition_spec_ref; CreditCondition.approval_status; CreditCondition.fulfilment_status。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-04-01 | 确定适用范围内的额度/条件内容 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Credit authority |
| D4A-CREDIT-04-02 | 分开保存条件定义、批准和履行状态 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Credit / credit authority |


**D4A-CREDIT-04-01｜确定适用范围内的额度/条件内容**

- 输入：CreditRiskAssessment；ProductScope。

- 输出：CreditConditionDefinition。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 本轮不编造金额；合成documentation condition必须有可核对内容。

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Credit authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditConditionDefinition，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CreditRiskAssessment、ProductScope对应的权限或关键证据缺失，When尝试“确定适用范围内的额度/条件内容”，Then保持待判断并不产生CreditConditionDefinition；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-04-02｜分开保存条件定义、批准和履行状态**

- 输入：CreditConditionDefinition；ScopeRevision。

- 输出：CreditCondition.spec_ref；CreditCondition.fulfilment_status。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditCondition.spec_ref、CreditCondition.fulfilment_status，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CreditConditionDefinition、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditCondition.spec_ref、CreditCondition.fulfilment_status并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-05 — 批准记录

**变更分类：**Enhanced。**当前工作：**Obtain credit approval；Target仅Obtain划线。

**原After提案：**显示有权审批记录/条件包/输入版本；产品记录或收集审批，不把approval从控制中删掉。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**信用批准是必要权限，Target划线Obtain不等于取消批准。

**Opportunity：**有权人批准，固定命令记录，不引入自动Credit审批。

**原PPT引用：**Current PPT-S1-SH324-A1；Target PPT-S2-SH324-A1。

**D3字段候选：**CreditDecision.approval_ref; CreditDecision.permission_ref; CreditDecision.conditions_revision; CreditDecision.effective_scope。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-05-01 | 批准明确条件包及输入版本 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Credit approval authority |
| D4A-CREDIT-05-02 | 保存有权批准与当前范围，未满足条件仍保留 | 规则/代码; SK-11 | 2/1/1/5/3/5/5 | 4 / 10 | Credit / credit authority |


**D4A-CREDIT-05-01｜批准明确条件包及输入版本**

- 输入：CreditRiskAssessment；ConditionDefinition；ApprovalPolicy。

- 输出：CreditApprovalDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Credit approval authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditApprovalDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CreditRiskAssessment、ConditionDefinition、ApprovalPolicy对应的权限或关键证据缺失，When尝试“批准明确条件包及输入版本”，Then保持待判断并不产生CreditApprovalDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-05-02｜保存有权批准与当前范围，未满足条件仍保留**

- 输入：CreditApprovalDecision；ExpectedInputRevisions。

- 输出：CreditDecision；ApprovedConditionRefs。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditDecision、ApprovedConditionRefs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CreditApprovalDecision、ExpectedInputRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditDecision、ApprovedConditionRefs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-06 — 交给Legal

**变更分类：**Enhanced。**当前工作：**向Legal提供Credit Agreement data。

**原After提案：**结构化交接条件包及source revision，记录Legal所消费版本和未满足项；输入变更触发定向review。

**Pain：**Legal可能使用旧版Credit条件包。（设计假设，未获客户实证）

**原因假设／控制理由：**交接只有附件或状态，缺少消费者采用版本。

**Opportunity：**结构化传递和版本确认用确定性工作流。

**原PPT引用：**Current PPT-S1-SH326-A1, PPT-S1-SH336-A1；Target PPT-S2-SH326-A1, PPT-S2-SH336-A1。

**D3字段候选：**AgreementInput.source_decision_ref; AgreementInput.credit_revision; AgreementInput.acknowledged_by_ref; DependencyEdge.consumer_ref。

**Reference：**XB-NIST-THREAD, IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-06-01 | 把已批准条件包交给获准的Legal消费者 | 确定性Skill/工具; SK-07,SK-12 | 2/3/1/3/3/5/4 | 6 / 8 | Credit / credit authority |
| D4A-CREDIT-06-02 | 比较Legal采用版本与当前Credit输入 | 规则/代码; SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Credit / credit authority |


**D4A-CREDIT-06-01｜把已批准条件包交给获准的Legal消费者**

- 输入：CreditDecision；ConditionPackage.revision；LegalAccess。

- 输出：AgreementInputReceipt。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AgreementInputReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CreditDecision、ConditionPackage.revision、LegalAccess中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AgreementInputReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-06-02｜比较Legal采用版本与当前Credit输入**

- 输入：AgreementInputReceipt；CurrentCreditRevision。

- 输出：CreditLegalCurrency；TargetedReviewTask。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditLegalCurrency、TargetedReviewTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AgreementInputReceipt、CurrentCreditRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditLegalCurrency、TargetedReviewTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-CREDIT-07 — 适用的最终协议核对

**变更分类：**Enhanced。**当前工作：**Review/approve final agreement & data。

**原After提案：**把最终协议版本核对与初次Credit审批分成记录；条款改动按规则影响相关review的currency。

**Pain：**初次Credit批准可能被误用于后来修改的最终协议。（设计假设，未获客户实证）

**原因假设／控制理由：**初次风险批准与最终协议核对没有独立记录。

**Opportunity：**差异Skill辅助，独立专业复核后记录当前适用性。

**原PPT引用：**Current PPT-S1-SH328-A1, PPT-S1-SH340-A1；Target PPT-S2-SH328-A1, PPT-S2-SH340-A1。

**D3字段候选：**CreditAgreementReview.agreement_revision; CreditAgreementReview.credit_input_revision; CreditAgreementReview.currency_status; CreditAgreementReview.decision_ref。

**Reference：**IND-BASEL-CCR；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-04, D3-ISS-07, D3-ISS-09, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-CREDIT-07-01 | 比较协议变化是否涉及已批准条件 | 语义Skill; SK-03 | 4/2/2/4/4/4/3 | 8 / 8 | Credit / credit authority |
| D4A-CREDIT-07-02 | 完成适用的最终协议/数据核对批准 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Credit final-agreement reviewer |
| D4A-CREDIT-07-03 | 绑定当前所审输入和结果，不写Legal执行完成 | 规则/代码; SK-11 | 2/1/1/5/3/5/4 | 4 / 10 | Credit / credit authority |


**D4A-CREDIT-07-01｜比较协议变化是否涉及已批准条件**

- 输入：CurrentAgreement；PriorAgreement；CreditConditionSpec。

- 输出：CreditRelevantClauseDelta。

- 选择依据：比较与归纳需要上下文；固定比较任务可由Skill完成，不自动形成专业结论。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditRelevantClauseDelta，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对CurrentAgreement、PriorAgreement、CreditConditionSpec加入缺失值、矛盾及恶意指令，输出CreditRelevantClauseDelta仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-07-02｜完成适用的最终协议/数据核对批准**

- 输入：CreditRelevantClauseDelta；AgreementRevision；CreditTerms。

- 输出：CreditAgreementDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Credit final-agreement reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditAgreementDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given CreditRelevantClauseDelta、AgreementRevision、CreditTerms对应的权限或关键证据缺失，When尝试“完成适用的最终协议/数据核对批准”，Then保持待判断并不产生CreditAgreementDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-CREDIT-07-03｜绑定当前所审输入和结果，不写Legal执行完成**

- 输入：CreditAgreementDecision；ExpectedRevisions。

- 输出：CreditAgreementReview；CurrencyRecord。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Credit / credit authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：金融数据、条件payload、权限或最终协议核对未齐；本动作所需输入或权限欠缺则保持待处理。

- 恢复：当前financial/credit/agreement版本有依据后继续相关工作；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CreditAgreementReview、CurrencyRecord，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CreditAgreementDecision、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CreditAgreementReview、CurrencyRecord并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**条件定义、批准、落实分别保存；删除线不等于取消控制；旧批准不覆盖新协议。

**上游/下游：**适用性未知先待评估；数据不足不算信用通过；初次风险批准与最终协议核对分开才能避免循环依赖。

**Journey／Product：**一个Condition Detail，审批记录、条件状态、Legal使用版本分层；无金额不放假数值，不另建信用授信系统。

**价值验证问题：**能否区分批准某项条件、将条件写入协议、条件实际满足三个事实？ 不添加无数据的节省比例。


## SCN-QA — 从具体检查项回到具体补正

**Branch：**BR-12；**Workflow：**WF-10；**粒度：**8个原工作，21个动作。

**Current PPT：**M6.1–.8包含完整性、来源、用途、cross-check、gap、re-review、QA signoff；Current已支持补正。

**Target PPT：**全部M6在Agentic lane，M6.8也在其中。演示保留有权QA确认是控制假设，必须清楚区别源图和提案。

**共同检查点：**同一ownership资料存在、用途评估未建立充分性。它可能是评估记录缺失，不一定资料本身无效。

**共同输入：**实际requirement set、当前evidence用途、screening/EDD outcome、专业条件与scope版本。

**场景级初评分（不作自主授权）：**C=4 / O=4 / D=2 / B=3 / V=4 / T=4 / H=5。

**执行组成：**规则/代码 13；确定性Skill/工具 0；语义Skill 3；受限Agent候选 0；人执行判断/确认/提供 5。不是工时比例。


### D3-QA-01 — 确认QA范围

**变更分类：**Enhanced。**当前工作：**Confirm applicable requirements/CIPs。

**原After提案：**固定本次QA采用的scope/requirement set/policy引用及check manifest；未知适用项留问题。

**Pain：**检查项目是否列全可能被任务数量掩盖。（设计假设，未获客户实证）

**原因假设／控制理由：**检查范围、适用要求和实际输入版本未固定。

**Opportunity：**完整清单校验先行，未知范围由有权人员确认。

**原PPT引用：**Current PPT-S1-SH298-A1；Target PPT-S2-SH298-A1。

**D3字段候选：**QAReview.scope_revision; QAReview.requirement_set_revision; QAReview.check_manifest_ref; QAReview.manifest_status。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-01-01 | 装配当前Scope的QA清单并检查完整性 | 规则/代码; SK-04,SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-01-02 | 确认不能规则化的QA范围与未知适用项 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | QA scope authority |


**D4A-QA-01-01｜装配当前Scope的QA清单并检查完整性**

- 输入：CaseScope；RequirementSet；QACheckDefinition。

- 输出：QAManifest；ManifestUnknowns。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QAManifest、ManifestUnknowns，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少CaseScope、RequirementSet、QACheckDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QAManifest、ManifestUnknowns并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-01-02｜确认不能规则化的QA范围与未知适用项**

- 输入：QAManifest；ManifestUnknowns。

- 输出：QAScopeReview。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：QA scope authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QAScopeReview，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given QAManifest、ManifestUnknowns对应的权限或关键证据缺失，When尝试“确认不能规则化的QA范围与未知适用项”，Then保持待判断并不产生QAScopeReview；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-02 — 完整性检查

**变更分类：**Reassigned。**当前工作：**Check completeness。

**原After提案：**规则检查真正需要的资料/字段/评估是否存在，把缺失对象指明。

**Pain：**文件数量齐全可能掩盖缺字段或缺评估。（设计假设，未获客户实证）

**原因假设／控制理由：**资料、字段、评估和决定没有分别列为检查对象。

**Opportunity：**明确期待对象，固定规则指出具体缺口。

**原PPT引用：**Current PPT-S1-SH298-A2；Target PPT-S2-SH298-A2。

**D3字段候选：**QACheck.check_type; QACheck.expected_input_refs; QACheck.missing_refs; QACheck.result。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-02-01 | 检查清单需要的字段/资料/评估/决定是否存在 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-02-02 | 保留缺失对象和检查版本，不自动判QA通过 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | QA authority |


**D4A-QA-02-01｜检查清单需要的字段/资料/评估/决定是否存在**

- 输入：QAManifest；CurrentCaseObjects。

- 输出：QACheckResult[]；MissingObjectRefs。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QACheckResult[]、MissingObjectRefs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QAManifest、CurrentCaseObjects中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheckResult[]、MissingObjectRefs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-02-02｜保留缺失对象和检查版本，不自动判QA通过**

- 输入：QACheckResult[]；ExpectedRevision。

- 输出：QACheck.revision；QAObservation。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QACheck.revision、QAObservation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QACheckResult[]、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheck.revision、QAObservation并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-03 — 来源有效性

**变更分类：**Enhanced。**当前工作：**Validate evidence sources。

**原After提案：**显示原始出处、取得方式、资料时点、内容版本与源审核依据；冲突或无来源保留未决。

**Pain：**来源链或时点不清可能拖慢审阅。（设计假设，未获客户实证）

**原因假设／控制理由：**资料取得时间、内容时点和来源证据混同。

**Opportunity：**先做固定来源核对，语义异常提供审阅材料。

**原PPT引用：**Current PPT-S1-SH298-A3；Target PPT-S2-SH298-A3。

**D3字段候选：**QACheck.source_check_ref; QACheck.evidence_revision_refs; QACheck.currency_basis_refs。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-03-01 | 核对来源引用、版本、必要时点是否存在 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-03-02 | 整理不能自动解释的来源矛盾 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | QA authority |
| D4A-QA-03-03 | 判断复杂来源问题及所需补正 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | QA / evidence source reviewer |


**D4A-QA-03-01｜核对来源引用、版本、必要时点是否存在**

- 输入：EvidenceProvenance；SourcePolicy；CurrentRevision。

- 输出：SourceMetadataCheck。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SourceMetadataCheck，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少EvidenceProvenance、SourcePolicy、CurrentRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限SourceMetadataCheck并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-03-02｜整理不能自动解释的来源矛盾**

- 输入：SourceMetadataCheck；ConflictingClaims。

- 输出：SourceReviewBrief。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：QA authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SourceReviewBrief，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对SourceMetadataCheck、ConflictingClaims加入缺失值、矛盾及恶意指令，输出SourceReviewBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-03-03｜判断复杂来源问题及所需补正**

- 输入：SourceReviewBrief；OriginalEvidence。

- 输出：SourceReviewDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：QA / evidence source reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SourceReviewDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given SourceReviewBrief、OriginalEvidence对应的权限或关键证据缺失，When尝试“判断复杂来源问题及所需补正”，Then保持待判断并不产生SourceReviewDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-04 — 用途充分性检查

**变更分类：**Enhanced。**当前工作：**Assess evidence sufficiency。

**原After提案：**校验subject/requirement/purpose是否有当前评估；缺assessment记录用assessment_missing reason，不武断作evidence_invalid。

**Pain：**缺少用途评估可能被误报为资料无效。（设计假设，未获客户实证）

**原因假设／控制理由：**未评估、评估不足和证据错误没有区分。

**Opportunity：**优先确定缺的是记录还是证明，不增加无谓客户补件。

**原PPT引用：**Current PPT-S1-SH298-A4；Target PPT-S2-SH298-A4。

**D3字段候选：**QACheck.evidence_use_ref; QACheck.reason_code; QACheck.basis_refs; EvidenceUseAssessment.sufficiency。

**Reference：**REG-AUSTRAC-CDD；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-04-01 | 确认相应用途是否存在当前评估 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-04-02 | 准备缺评估或评估冲突的具体问题 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | QA authority |
| D4A-QA-04-03 | 处理需专业判断的用途充分性问题 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | QA / authorised evidence reviewer |


**D4A-QA-04-01｜确认相应用途是否存在当前评估**

- 输入：Requirement；Subject；Purpose；EvidenceUseAssessment。

- 输出：AssessmentPresenceCheck。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AssessmentPresenceCheck，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少Requirement、Subject、Purpose中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AssessmentPresenceCheck并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-04-02｜准备缺评估或评估冲突的具体问题**

- 输入：AssessmentPresenceCheck；EvidenceUseRefs。

- 输出：SufficiencyReviewBrief。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：QA authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅SufficiencyReviewBrief，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AssessmentPresenceCheck、EvidenceUseRefs加入缺失值、矛盾及恶意指令，输出SufficiencyReviewBrief仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-04-03｜处理需专业判断的用途充分性问题**

- 输入：SufficiencyReviewBrief；ActualEvidence。

- 输出：QASufficiencyJudgment。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：QA / authorised evidence reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QASufficiencyJudgment，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given SufficiencyReviewBrief、ActualEvidence对应的权限或关键证据缺失，When尝试“处理需专业判断的用途充分性问题”，Then保持待判断并不产生QASufficiencyJudgment；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-05 — 交叉核对适用结果

**变更分类：**Enhanced。**当前工作：**Cross-check screening & EDD conditions。

**原After提案：**核对群体范围、查询覆盖、finding处置、EDD适用性/条件及相关输入版本；专业条件范围在方案中注明扩展。

**Pain：**已处理的screening/EDD结果可能与当前QA范围不一致。（设计假设，未获客户实证）

**原因假设／控制理由：**不同领域的结果、条件和版本未交叉核对。

**Opportunity：**固定关联核验，不将QA变成所有专业判断的替代。

**原PPT引用：**Current PPT-S1-SH298-A5；Target PPT-S2-SH298-A5。

**D3字段候选：**QACheck.screening_condition_ref; QACheck.edd_condition_refs; QACheck.reviewed_input_revisions。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-05-01 | 核对适用Screening/EDD结果、条件与输入版本 | 规则/代码; SK-05,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-05-02 | 把矛盾或未知绑定到原领域任务 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | QA authority |


**D4A-QA-05-01｜核对适用Screening/EDD结果、条件与输入版本**

- 输入：QAManifest；ScreeningCoverage；EDDApplicability；EDDConditions。

- 输出：CrossConditionCheck；SpecificIssueRefs。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CrossConditionCheck、SpecificIssueRefs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QAManifest、ScreeningCoverage、EDDApplicability中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CrossConditionCheck、SpecificIssueRefs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-05-02｜把矛盾或未知绑定到原领域任务**

- 输入：SpecificIssueRefs；ExistingWorkItems。

- 输出：QAFinding；LinkedSpecialistTask。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QAFinding、LinkedSpecialistTask，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少SpecificIssueRefs、ExistingWorkItems中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QAFinding、LinkedSpecialistTask并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-06 — 发出精确gap

**变更分类：**Enhanced。**当前工作：**Identify & issue gaps。

**原After提案：**关联具体QA observation至既有或新Gap和负责人；能补评估就不自动向客户重索文件。

**Pain：**QA缺口可能触发重复任务或整案返工。（设计假设，未获客户实证）

**原因假设／控制理由：**观察未连接既有Gap和真正需要的补正动作。

**Opportunity：**精确定位对象后生成有引用的修复建议。

**原PPT引用：**Current PPT-S1-SH298-A6；Target PPT-S2-SH298-A6。

**D3字段候选：**QAFinding.related_gap_ref; Remediation.required_action; Remediation.owner_ref; Remediation.affected_refs。

**Reference：**XB-ICH-Q10, IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-06-01 | 将观察关联既有Gap和实际受影响对象 | 规则/代码; SK-05,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-06-02 | 准备补评估/补资料/重审的具体建议 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | QA authority |
| D4A-QA-06-03 | 在范围已确认后建立/更新指定责任任务 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | QA authority |


**D4A-QA-06-01｜将观察关联既有Gap和实际受影响对象**

- 输入：QAObservation；ExistingGap[]；DependencyEdge[]。

- 输出：RemediationScope。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RemediationScope，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QAObservation、ExistingGap[]、DependencyEdge[]中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限RemediationScope并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-06-02｜准备补评估/补资料/重审的具体建议**

- 输入：RemediationScope；EvidenceStatus。

- 输出：RemediationProposal。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：QA authority（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅RemediationProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对RemediationScope、EvidenceStatus加入缺失值、矛盾及恶意指令，输出RemediationProposal仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-06-03｜在范围已确认后建立/更新指定责任任务**

- 输入：ReviewedRemediationProposal；AssignmentRule。

- 输出：Remediation；WorkItem；ResumeAnchor。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅Remediation、WorkItem、ResumeAnchor，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReviewedRemediationProposal、AssignmentRule中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限Remediation、WorkItem、ResumeAnchor并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-07 — 重审补正

**变更分类：**Enhanced。**当前工作：**Re-review remediated items。

**原After提案：**补正resolution独立于QA recheck；重审新证据/评估版本并保留原检查历史。

**Pain：**补正任务完成可能被误等同于QA重审通过。（设计假设，未获客户实证）

**原因假设／控制理由：**任务完成与检查结论未分离。

**Opportunity：**按新输入重查并保留专业审阅和旧结果。

**原PPT引用：**Current PPT-S1-SH298-A7；Target PPT-S2-SH298-A7。

**D3字段候选：**Remediation.resolution_refs; QACheck.recheck_revision; QACheck.supersedes_ref; QACheck.reviewed_by_ref。

**Reference：**XB-ICH-Q10；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-07-01 | 对修订输入执行相应确定性重审检查 | 规则/代码; SK-05 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-07-02 | 审阅仍需专业判断的补正结果 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | QA reviewer |
| D4A-QA-07-03 | 记录该项目的重审版本，不自动最终签核 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | QA authority |


**D4A-QA-07-01｜对修订输入执行相应确定性重审检查**

- 输入：RemediationResolution；RevisedEvidenceUse；CheckDefinition。

- 输出：QARecheckCandidate。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QARecheckCandidate，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少RemediationResolution、RevisedEvidenceUse、CheckDefinition中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QARecheckCandidate并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-07-02｜审阅仍需专业判断的补正结果**

- 输入：QARecheckCandidate；RevisedEvidence。

- 输出：QARecheckDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：QA reviewer（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QARecheckDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given QARecheckCandidate、RevisedEvidence对应的权限或关键证据缺失，When尝试“审阅仍需专业判断的补正结果”，Then保持待判断并不产生QARecheckDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-07-03｜记录该项目的重审版本，不自动最终签核**

- 输入：QARecheckDecision；ExpectedRevision。

- 输出：QACheck.recheck_revision；RemediationResolutionLink。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QACheck.recheck_revision、RemediationResolutionLink，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QARecheckDecision、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QACheck.recheck_revision、RemediationResolutionLink并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-QA-08 — QA签核/记录

**变更分类：**Reassigned。**当前工作：**QA TEAM Provide QA sign-off。

**原After提案：**标准检查由产品完成；演示以明确权限fixture确认QA review并记录，UI标模型边界外的bank validation问题。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**QA签核是明确责任；源Target自动泳道不证明正式权限已定义。

**Opportunity：**规则检查签核条件，人确认，产品记录。

**原PPT引用：**Current PPT-S1-SH298-A8；Target PPT-S2-SH298-A8。

**D3字段候选：**QASignoff.review_manifest_ref; QASignoff.permission_ref; QASignoff.input_revision_refs; QASignoff.recorded_at。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-11, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-QA-08-01 | 检查QA清单完整、结果当前且无未决签核阻塞 | 规则/代码; SK-05,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | QA authority |
| D4A-QA-08-02 | 按演示权限对具体QA范围确认签核 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | QA sign-off authority |
| D4A-QA-08-03 | 保存QA确认及所审版本，不写全案clearance | 规则/代码; SK-11 | 2/1/1/5/3/5/5 | 4 / 10 | QA authority |


**D4A-QA-08-01｜检查QA清单完整、结果当前且无未决签核阻塞**

- 输入：QAManifest；QACheck[]；ScopeRevision；HoldRefs。

- 输出：QASignoffEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QASignoffEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少QAManifest、QACheck[]、ScopeRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QASignoffEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-08-02｜按演示权限对具体QA范围确认签核**

- 输入：QASignoffEligibility；ReviewPack；Permission。

- 输出：AuthorisedQASignoff。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：QA sign-off authority（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorisedQASignoff，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given QASignoffEligibility、ReviewPack、Permission对应的权限或关键证据缺失，When尝试“按演示权限对具体QA范围确认签核”，Then保持待判断并不产生AuthorisedQASignoff；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-QA-08-03｜保存QA确认及所审版本，不写全案clearance**

- 输入：AuthorisedQASignoff；ExpectedRevisions。

- 输出：QASignoff；AuditEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：QA authority（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、缺assessment、矛盾或待重审；本动作所需输入或权限欠缺则保持待处理。

- 恢复：补正resolution到达不等于通过；执行重审后再签核；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅QASignoff、AuditEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AuthorisedQASignoff、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限QASignoff、AuditEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**缺assessment先补评估，不自动重索资料；补正完成不自动QA通过；QA不依赖最终ready。

**上游/下游：**未有权signoff、未审阅相关check、输入过时都保持等待；针对已有Gap追加QA observation，不重复派单。

**Journey／Product：**QA Remediation Detail：要求/资料/用途/观察/责任/动作/recheck；Compare不能把Current做成整案重跑，因为PPT已给re-review。

**价值验证问题：**能否区分资料不足与评估缺失？完成补正后是否仍需要re-review？ 不添加无数据的节省比例。


## SCN-READINESS — 明确哪些条件真正满足、哪些仍在阻塞

**Branch：**BR-12；**Workflow：**WF-11；**粒度：**5个原工作，11个动作。

**Current PPT：**M8.1核实全部required clearance prerequisites；Current也有最终核对能力。

**Target PPT：**M8.1移入Agentic。持续structured state原则两页都有；精确snapshot与closed manifest是本方案细化。

**共同检查点：**同一scope与当时实际conditions；不能Current卡在Legal未签，Target直接换成所有签完。

**共同输入：**完整适用条件清单、来源/决定/版本、QA结果、专业条件、有效hold和实际unknown。

**场景级初评分（不作自主授权）：**C=4 / O=4 / D=2 / B=4 / V=5 / T=5 / H=5。

**执行组成：**规则/代码 8；确定性Skill/工具 0；语义Skill 1；受限Agent候选 1；人执行判断/确认/提供 1。不是工时比例。


### D3-READINESS-01 — 完整适用条件manifest

**变更分类：**Enhanced。**当前工作：**核对all required prerequisites和QA scope。

**原After提案：**从当前CaseScope与已审阅规则装配expected condition manifest，标完整性、适用性和缺失项。

**Pain：**已显示项目全绿可能掩盖未列出的必要条件。（设计假设，未获客户实证）

**原因假设／控制理由：**完整条件清单与条件是否满足混同。

**Opportunity：**先检查清单本身与Scope适用性，不接受空集成功。

**原PPT引用：**Current PPT-S1-SH65-A1, PPT-S1-SH298-A1；Target PPT-S2-SH65-A1, PPT-S2-SH298-A1。

**D3字段候选：**ConditionManifest.expected_refs; ConditionManifest.completeness_status; ConditionManifest.scope_revision; ConditionManifest.unknown_refs。

**Reference：**OUR — 无直接外部案例，不强行背书；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-08, D3-ISS-10, D3-ISS-13, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-READINESS-01-01 | 装配并核对expected condition manifest | 规则/代码; SK-04,SK-10 | 3/2/1/4/4/5/4 | 6 / 9 | Case Manager / prerequisite owners |
| D4A-READINESS-01-02 | 确认仍未知的条件适用范围与清单问题 | 人执行判断/确认/提供; SK-06 | 5/2/2/2/2/2/5 | 9 / 4 | Relevant prerequisite / policy owners |


**D4A-READINESS-01-01｜装配并核对expected condition manifest**

- 输入：CaseScope；ApprovedPrerequisiteDefinition；ConditionRegistry。

- 输出：ConditionManifest；MissingConditionRefs。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ConditionManifest、MissingConditionRefs，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少CaseScope、ApprovedPrerequisiteDefinition、ConditionRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ConditionManifest、MissingConditionRefs并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-01-02｜确认仍未知的条件适用范围与清单问题**

- 输入：ConditionManifest；ScopeUnknowns。

- 输出：PrerequisiteScopeDecision。

- 选择依据：实质判断或不确定性需要具相应资格/责任的人；高上下文复杂度不等于可自主决定。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Relevant prerequisite / policy owners（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PrerequisiteScopeDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：Given ConditionManifest、ScopeUnknowns对应的权限或关键证据缺失，When尝试“确认仍未知的条件适用范围与清单问题”，Then保持待判断并不产生PrerequisiteScopeDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-READINESS-02 — 分层聚合而不混淆

**变更分类：**Enhanced。**当前工作：**核实各前置条件完整。

**原After提案：**Requirement/evidence使用与专业事实分别产出condition；QA在已定义scope检查它们；最后readiness聚合。

**Pain：**局部任务完成可能被误当为整体已就绪。（设计假设，未获客户实证）

**原因假设／控制理由：**Task、Condition、QA与授权没有分层计算。

**Opportunity：**由确定性计算聚合条件，不让模型预测绿灯。

**原PPT引用：**Current PPT-S1-SH65-A1；Target PPT-S2-SH65-A1。

**D3字段候选：**ClearancePrerequisite.condition_refs; ClearancePrerequisite.status; ReadinessSnapshot.prerequisite_refs。

**Reference：**XB-ACDM；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-08, D3-ISS-10, D3-ISS-13, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-READINESS-02-01 | 按当前依赖聚合已满足/阻塞/未知的前置条件 | 规则/代码; SK-10 | 3/3/1/4/5/5/5 | 7 / 9 | Case Manager / prerequisite owners |
| D4A-READINESS-02-02 | 保存输入与计算结果的ReadinessSnapshot | 规则/代码; SK-11 | 2/1/1/5/4/5/4 | 4 / 10 | Case Manager / prerequisite owners |


**D4A-READINESS-02-01｜按当前依赖聚合已满足/阻塞/未知的前置条件**

- 输入：CompleteConditionManifest；CurrentConditionStates；QASignoff。

- 输出：PrerequisiteEvaluation。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PrerequisiteEvaluation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少CompleteConditionManifest、CurrentConditionStates、QASignoff中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PrerequisiteEvaluation并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-02-02｜保存输入与计算结果的ReadinessSnapshot**

- 输入：PrerequisiteEvaluation；InputManifest。

- 输出：ReadinessSnapshot。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReadinessSnapshot，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少PrerequisiteEvaluation、InputManifest中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ReadinessSnapshot并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-READINESS-03 — 版本与hold核验

**变更分类：**Proposed addition。**当前工作：**PPT未给具体版本字段。

**原After提案：**逐项检查scope/decision/evidence/agreement/currency与hold；对stale输入生成具体复核项。

**Pain：**旧版本或未知hold可能被漏掉。（设计假设，未获客户实证）

**原因假设／控制理由：**条件结果未检查当前使用范围与时效。

**Opportunity：**确定性校验version/currency/hold，未知进入阻塞。

**原PPT引用：**Current PPT-S1-SH65-A1；Target PPT-S2-SH65-A1。

**D3字段候选：**ReadinessSnapshot.input_manifest; ReadinessSnapshot.hold_refs; ReadinessSnapshot.stale_refs; ReadinessSnapshot.unknown_refs。

**Reference：**XB-NIST-THREAD, XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-08, D3-ISS-10, D3-ISS-13, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-READINESS-03-01 | 逐项检查证据/决定/协议/Scope当前性与hold | 规则/代码; SK-10 | 3/3/1/4/5/5/5 | 7 / 9 | Case Manager / prerequisite owners |
| D4A-READINESS-03-02 | 建立精确重评任务并保留历史结果 | 规则/代码; SK-07,SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Case Manager / prerequisite owners |


**D4A-READINESS-03-01｜逐项检查证据/决定/协议/Scope当前性与hold**

- 输入：ConditionInputs；DependencyEdge[]；HoldRefs；CurrentRevisions。

- 输出：CurrencyCheck；BlockingRef[]；UnknownRef[]。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CurrencyCheck、BlockingRef[]、UnknownRef[]，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少ConditionInputs、DependencyEdge[]、HoldRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CurrencyCheck、BlockingRef[]、UnknownRef[]并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-03-02｜建立精确重评任务并保留历史结果**

- 输入：CurrencyCheck；DeclaredImpact；ExpectedRevision。

- 输出：CurrencyReviewTask；HistoricalDecisionLink。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅CurrencyReviewTask、HistoricalDecisionLink，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少CurrencyCheck、DeclaredImpact、ExpectedRevision中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限CurrencyReviewTask、HistoricalDecisionLink并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-READINESS-04 — 阻塞、责任与下一步

**变更分类：**Enhanced。**当前工作：**当前可能依系统和人确认，具体状态显示未给。

**原After提案：**产生scope-specific snapshot，显示每个blocker的工作、owner、缺失输入和resume condition；敏感详情按角色投影。

**Pain：**Case Manager可能难以从很多Pending里辨认真正下一步。（设计假设，未获客户实证）

**原因假设／控制理由：**阻塞、责任、输入和可行动作没有统一关联。

**Opportunity：**先确定性显示事实；复杂多约束情况下才验证Case Agent建议。

**原PPT引用：**Current PPT-S1-SH65-A1；Target PPT-S2-SH65-A1。

**D3字段候选：**ReadinessSnapshot.blocking_refs; ClearanceCondition.owner_ref; ClearanceCondition.next_action_ref; ClearanceCondition.allowed_summary。

**Reference：**XB-ACDM, IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-08, D3-ISS-10, D3-ISS-13, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-READINESS-04-01 | 投影实际阻塞、责任、所缺输入和允许动作 | 规则/代码; SK-12 | 2/2/1/5/4/5/3 | 5 / 10 | Case Manager / prerequisite owners |
| D4A-READINESS-04-02 | 在获准且独立的工作中提出可解释下一行动顺序 | 受限Agent候选; SK-07,SK-10,SK-06 | 4/4/4/3/4/3/3 | 12 / 6 | Case Manager / prerequisite owners；AG-CASE |
| D4A-READINESS-04-03 | 基于真实状态生成有引用的简短原因说明 | 语义Skill; SK-06 | 4/2/2/4/4/3/3 | 8 / 7 | Case Manager / prerequisite owners |


**D4A-READINESS-04-01｜投影实际阻塞、责任、所缺输入和允许动作**

- 输入：ReadinessSnapshot；RolePermission；TaskRegistry。

- 输出：AllowedReadinessView。

- 选择依据：按真实对象状态/权限生成投影，固定查询比自由生成结论可靠。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AllowedReadinessView，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少ReadinessSnapshot、RolePermission、TaskRegistry中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedReadinessView并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-04-02｜在获准且独立的工作中提出可解释下一行动顺序**

- 输入：AllowedReadinessView；Dependencies；CapacityContextIfKnown。

- 输出：NextWorkPlanProposal。

- 选择依据：不同结果可能要求在获准来源/技能间重新选择；仅把有限信息规划列作Agent候选。 不排名风险豁免、不保证SLA；没有动态选择价值时退回排序规则。

- 协同：Agent-led within guardrails；Prepare；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：仅shadow/建议计划；获准动作经工作流或人显式确认。Target：仅在对照试验及权限/安全验证后，执行白名单读/草稿动作；不可升级到实质决定。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅NextWorkPlanProposal，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：在相同获准来源/工具预算下，对比固定workflow+Skills与本动作；注入资料指令/权限撤销/连续无进展时必须停止且不得越界；只输出NextWorkPlanProposal。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-04-03｜基于真实状态生成有引用的简短原因说明**

- 输入：ReadinessSnapshot；AllowedConditionProjection。

- 输出：ReadinessExplanation。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReadinessExplanation，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：对ReadinessSnapshot、AllowedConditionProjection加入缺失值、矛盾及恶意指令，输出ReadinessExplanation仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-READINESS-05 — 准备好与有权确认分开

**变更分类：**Enhanced。**当前工作：**prerequisites与confirm/record本来是不同步骤。

**原After提案：**条件完整且当前有效时给Ready for authorised confirmation；record权限另查，无权限依然不能confirm。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**就绪计算不授予最终批准权，属于必要控制边界。

**Opportunity：**Ready for confirmation与可执行权限单独显示。

**原PPT引用：**Current PPT-S1-SH65-A1, PPT-S1-SH65-A3；Target PPT-S2-SH65-A1, PPT-S2-SH65-A3。

**D3字段候选：**ReadinessSnapshot.calculation_result; ClearanceDecision.authority_ref; ClearanceDecision.readiness_snapshot_ref。

**Reference：**XB-ACDM；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-08, D3-ISS-10, D3-ISS-13, D3-ISS-14, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-READINESS-05-01 | 检查完整清单、当前结果与无禁止hold，派生就绪 | 规则/代码; SK-10 | 3/3/1/4/5/5/5 | 7 / 9 | Case Manager / prerequisite owners |
| D4A-READINESS-05-02 | 按当前操作者权限显示确认动作或明确缺权原因 | 规则/代码; SK-12 | 2/2/1/5/4/5/3 | 5 / 10 | Case Manager / prerequisite owners |


**D4A-READINESS-05-01｜检查完整清单、当前结果与无禁止hold，派生就绪**

- 输入：Manifest；PrerequisiteEvaluation；CurrentRevisions；HoldRefs。

- 输出：ReadyForConfirmationOrNotReady。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReadyForConfirmationOrNotReady，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少Manifest、PrerequisiteEvaluation、CurrentRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ReadyForConfirmationOrNotReady并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-READINESS-05-02｜按当前操作者权限显示确认动作或明确缺权原因**

- 输入：ReadyForConfirmationOrNotReady；ActorPermission。

- 输出：AllowedClearanceActions。

- 选择依据：按真实对象状态/权限生成投影，固定查询比自由生成结论可靠。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Case Manager / prerequisite owners（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：清单不全、适用性未知、过时结果、未满足条件/hold；本动作所需输入或权限欠缺则保持待处理。

- 恢复：权威事件到达后确定性重算，不由LLM或动画修改；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AllowedClearanceActions，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权；由LLM对完整性或Ready作概率预测代替确定性检查。

- 验收候选：缺少ReadyForConfirmationOrNotReady、ActorPermission中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedClearanceActions并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**清单必须列全且当前；任一关键未知/stale/hold不允许false ready；计算不授予确认权。

**上游/下游：**任何适用条件不满足、适用性未知、数据过时、manifest不完整或有禁止hold，则不能Ready。

**Journey／Product：**Clearance页按条件分组reason/owner/next action；Target先呈现相同未完成结果，再可回业务节点处理。

**价值验证问题：**能否证明没有漏掉应检查条件，而不仅“列出来的都绿”？ 不添加无数据的节省比例。


## SCN-PUBLISH — 最终记录、发布时间和客户结果分开

**Branch：**BR-12；**Workflow：**WF-12；**粒度：**5个原工作，12个动作。

**Current PPT：**M8.2 finalise/link，M8.3 confirm/record，M8.4 timestamp在Ops，M8.5 RM沟通。

**Target PPT：**M8.2–.4在Agentic，M8.5仍RM。独立Human authorisation角色、publication transport/ack是明确设计增强，不是PPT的额外原码。

**共同检查点：**同一当前scope和已完成实际前置条件；对照时不由Target按钮补上未经发生的审批或协议执行。

**共同输入：**ReadinessSnapshot、输入fingerprint、授权record、recipient/channel policy及实际mock capability。

**场景级初评分（不作自主授权）：**C=3 / O=4 / D=1 / B=4 / V=5 / T=5 / H=5。

**执行组成：**规则/代码 7；确定性Skill/工具 2；语义Skill 1；受限Agent候选 0；人执行判断/确认/提供 2。不是工时比例。


### D3-PUBLISH-01 — 案件完结与支撑包

**变更分类：**Reassigned。**当前工作：**Finalise case & link supporting outputs。

**原After提案：**形成可追溯的结果包manifest，连接scope、professional decisions、QA与资料版本，不复制全量私密内容到RM。

**Pain：**结果与支撑输出可能散落在多个任务。（设计假设，未获客户实证）

**原因假设／控制理由：**scope、专业决定、QA与原证据版本缺统一结果包。

**Opportunity：**生成引用清单而非复制所有资料。

**原PPT引用：**Current PPT-S1-SH65-A2；Target PPT-S2-SH65-A2。

**D3字段候选：**ClearancePack.manifest_ref; ClearancePack.scope_revision; ClearancePack.supporting_output_refs。

**Reference：**XB-FHIR-R5；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-10, D3-ISS-13, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-PUBLISH-01-01 | 固定准入支撑结果包及版本引用 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Authorised clearance role / RM |
| D4A-PUBLISH-01-02 | 按角色暴露获准结果包摘要与来源入口 | 规则/代码; SK-12 | 2/2/1/5/4/5/3 | 5 / 10 | Authorised clearance role / RM |


**D4A-PUBLISH-01-01｜固定准入支撑结果包及版本引用**

- 输入：ReadinessSnapshot；CurrentDecisionRefs；EvidenceRefs。

- 输出：ClearancePack；InputManifest。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClearancePack、InputManifest，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReadinessSnapshot、CurrentDecisionRefs、EvidenceRefs中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearancePack、InputManifest并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-01-02｜按角色暴露获准结果包摘要与来源入口**

- 输入：ClearancePack；RolePolicy。

- 输出：AllowedClearancePackView。

- 选择依据：按真实对象状态/权限生成投影，固定查询比自由生成结论可靠。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AllowedClearancePackView，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ClearancePack、RolePolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限AllowedClearancePackView并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-PUBLISH-02 — 有权确认与记录

**变更分类：**Reassigned。**当前工作：**Confirm/record cleared-to-trade status。

**原After提案：**将判断/授权与产品记录拆分；以current snapshot和expected revisions执行合成确认，记录结果范围。

**Pain：**不强行建立痛点；这是保留的必要控制。

**原因假设／控制理由：**最终准入确认是正式责任，不能由readiness模型或动画代签。

**Opportunity：**校验、授权、记录三个动作独立。

**原PPT引用：**Current PPT-S1-SH65-A3；Target PPT-S2-SH65-A3。

**D3字段候选：**ClearanceDecision.decision_scope; ClearanceDecision.authority_ref; ClearanceDecision.input_fingerprint; ClearanceDecision.recorded_at。

**Reference：**IC-PHKL, XB-ACDM；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-10, D3-ISS-13, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-PUBLISH-02-01 | 核对当前snapshot、Scope、权限和输入没有改变 | 规则/代码; SK-04,SK-10 | 3/2/1/4/5/5/5 | 6 / 9 | Authorised clearance role / RM |
| D4A-PUBLISH-02-02 | 对明确范围作合成有权准入确认 | 人执行判断/确认/提供; SK-06 | 3/1/1/3/2/4/5 | 5 / 7 | Synthetic authorised clearance reviewer; real bank role unconfirmed |
| D4A-PUBLISH-02-03 | 记录有权决定、范围、时间与所审输入 | 规则/代码; SK-11 | 2/1/1/5/4/5/5 | 4 / 10 | Authorised clearance role / RM |


**D4A-PUBLISH-02-01｜核对当前snapshot、Scope、权限和输入没有改变**

- 输入：ReadinessSnapshot；ActorPermission；ExpectedRevisions；HoldRefs。

- 输出：ClearanceConfirmationEligibility。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClearanceConfirmationEligibility，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ReadinessSnapshot、ActorPermission、ExpectedRevisions中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearanceConfirmationEligibility并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-02-02｜对明确范围作合成有权准入确认**

- 输入：ClearanceConfirmationEligibility；ClearancePack。

- 输出：AuthorisedClearanceDecision。

- 选择依据：正式权限属于负责角色；可以自动核验/记录，不能把权力授予模型。 

- 协同：Human-led；Escalate for judgment；人负责/异常转交：Synthetic authorised clearance reviewer; real bank role unconfirmed（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅AuthorisedClearanceDecision，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：Given ClearanceConfirmationEligibility、ClearancePack对应的权限或关键证据缺失，When尝试“对明确范围作合成有权准入确认”，Then保持待判断并不产生AuthorisedClearanceDecision；有权、当前输入下才记录指定结果。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-02-03｜记录有权决定、范围、时间与所审输入**

- 输入：AuthorisedClearanceDecision；ExpectedRevisions；IdempotencyKey。

- 输出：ClearanceDecision；AuditEvent。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ClearanceDecision、AuditEvent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少AuthorisedClearanceDecision、ExpectedRevisions、IdempotencyKey中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ClearanceDecision、AuditEvent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-PUBLISH-03 — 时间语义

**变更分类：**Enhanced。**当前工作：**Record clearance timestamp。

**原After提案：**分别保留decision记录时点、如有配置的生效时点、下游发布时点和接收观察。

**Pain：**页面时间可能被误当为批准或接收时间。（设计假设，未获客户实证）

**原因假设／控制理由：**决定、可能生效、发送和回执时间混在一个字段。

**Opportunity：**使用可信事件时钟记录不同事实。

**原PPT引用：**Current PPT-S1-SH65-A4；Target PPT-S2-SH65-A4。

**D3字段候选：**ClearanceDecision.recorded_at; ClearanceDecision.effective_at; PublicationEvent.published_at; Acknowledgement.observed_at。

**Reference：**XB-GS1；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-10, D3-ISS-13, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-PUBLISH-03-01 | 分别记录实际事件的记录/生效/发送/接收时间 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Authorised clearance role / RM |


**D4A-PUBLISH-03-01｜分别记录实际事件的记录/生效/发送/接收时间**

- 输入：DecisionEvent；DispatchReceipt；Acknowledgement。

- 输出：TimestampedEventRecords。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅TimestampedEventRecords，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少DecisionEvent、DispatchReceipt、Acknowledgement中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限TimestampedEventRecords并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-PUBLISH-04 — Structured status下游发布

**变更分类：**Proposed addition。**当前工作：**源图指下游系统及状态记录；具体transport未给。

**原After提案：**在获准目标和scope内发布版本化状态；queued/sent/acknowledged/failed分开，失败保留decision并支持幂等重试。

**Pain：**失败重试可能产生重复发布或误报成功。（设计假设，未获客户实证）

**原因假设／控制理由：**业务决定与传输状态没有分离且缺幂等关联。

**Opportunity：**版本化载荷、逐目标状态、明确回执和有限重试。

**原PPT引用：**Current PPT-S1-SH65-A3, PPT-S1-SH65-A4；Target PPT-S2-SH65-A3, PPT-S2-SH65-A4。

**D3字段候选：**PublicationEvent.target_refs; PublicationEvent.payload_scope; PublicationEvent.transport_status; PublicationEvent.idempotency_ref。

**Reference：**XB-GS1, XB-IATA；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-10, D3-ISS-13, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-PUBLISH-04-01 | 验证发布目标、载荷范围、权限和当前决定 | 规则/代码; SK-04,SK-12 | 3/2/1/4/5/5/5 | 6 / 9 | Authorised clearance role / RM |
| D4A-PUBLISH-04-02 | 发送或重试同一获准发布意图 | 确定性Skill/工具; SK-12 | 2/3/1/3/4/5/5 | 6 / 8 | Authorised clearance role / RM |
| D4A-PUBLISH-04-03 | 保留各目标回执与失败，不删除原准入决定 | 规则/代码; SK-11 | 2/1/1/5/3/5/2 | 4 / 10 | Authorised clearance role / RM |


**D4A-PUBLISH-04-01｜验证发布目标、载荷范围、权限和当前决定**

- 输入：ClearanceDecision；PublicationPolicy；TargetAllowlist。

- 输出：ApprovedPublicationIntent。

- 选择依据：结果由已批准条件、字段和当前版本计算；规则缺失不是交给模型补规则。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ApprovedPublicationIntent，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ClearanceDecision、PublicationPolicy、TargetAllowlist中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限ApprovedPublicationIntent并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-04-02｜发送或重试同一获准发布意图**

- 输入：ApprovedPublicationIntent；IdempotencyKey；RetryPolicy。

- 输出：PerTargetDispatchReceipt。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PerTargetDispatchReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedPublicationIntent、IdempotencyKey、RetryPolicy中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PerTargetDispatchReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-04-03｜保留各目标回执与失败，不删除原准入决定**

- 输入：PerTargetDispatchReceipt；ClearanceDecision.ref。

- 输出：PublicationEvent；Acknowledgement；FailureRecord。

- 选择依据：写入与版本校验有固定输入输出；不需要模型选择下一步。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅PublicationEvent、Acknowledgement、FailureRecord，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少PerTargetDispatchReceipt、ClearanceDecision.ref中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限PublicationEvent、Acknowledgement、FailureRecord并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


### D3-PUBLISH-05 — RM/客户结果沟通

**变更分类：**Enhanced。**当前工作：**RM沟通outcome与next steps。

**原After提案：**依据允许投影生成清楚的实体/产品/范围与下一步通知；RM保留关系解释，系统可按获准配置发送标准通知。

**Pain：**RM可能不易解释结果的实体/产品范围与尚未送达情况。（设计假设，未获客户实证）

**原因假设／控制理由：**客户通知、发布结果与准入范围容易扩大。

**Opportunity：**生成获准范围的通知草稿并保留RM关系沟通。

**原PPT引用：**Current PPT-S1-SH289-A1；Target PPT-S2-SH289-A1。

**D3字段候选：**OutcomeCommunication.recipient_ref; OutcomeCommunication.allowed_scope; OutcomeCommunication.dispatch_status; InteractionRecord.ref。

**Reference：**IB-ANZ-SECURE, IC-PHKL；观察／迁移／边界继承原Reference，不等于银行已确认。

**未决来源问题：**D3-ISS-06, D3-ISS-10, D3-ISS-13, D3-ISS-15；本轮不静默修正。

| Action | 具体工作 | Executor / Skills | 评分 C/O/D/B/V/T/H | N / F | Human / Agent |
|---|---|---|---|---|---|
| D4A-PUBLISH-05-01 | 准备受限信息已过滤的结果通知草稿 | 语义Skill; SK-06,SK-08 | 4/2/2/4/4/3/3 | 8 / 7 | Authorised clearance role / RM |
| D4A-PUBLISH-05-02 | RM处理需要关系解释或例外澄清的沟通 | 人执行判断/确认/提供; SK-06 | 4/2/2/3/3/3/3 | 8 / 6 | Relationship Manager |
| D4A-PUBLISH-05-03 | 按获准版本与渠道记录派发和送达观察 | 确定性Skill/工具; SK-08,SK-12 | 2/3/1/3/3/5/4 | 6 / 8 | Authorised clearance role / RM |


**D4A-PUBLISH-05-01｜准备受限信息已过滤的结果通知草稿**

- 输入：AllowedOutcomeProjection；ApprovedCommunicationTemplate。

- 输出：OutcomeCommunicationDraft。

- 选择依据：准备与引用相关材料可以有明确交付；材料包不等于批准，固定输入先采用Skill。 

- 协同：Agent-prepared；Prepare；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：固定模板/语义草稿并审阅后使用，不直接形成正式决定。Target：在字段/引用/质量边界验证后可自动生成候选；复杂矛盾或正式用途判断交人。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅OutcomeCommunicationDraft，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；将候选/建议标为已采信事实；记录正式专业决定或授权；向未获准收件人派发内容；直接写sufficiency或readiness truth。

- 验收候选：对AllowedOutcomeProjection、ApprovedCommunicationTemplate加入缺失值、矛盾及恶意指令，输出OutcomeCommunicationDraft仍需逐项引用、保留未知；无证据的事实或正式结论为失败。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-05-02｜RM处理需要关系解释或例外澄清的沟通**

- 输入：OutcomeCommunicationDraft；ClientContext。

- 输出：ReviewedOutcomeCommunication。

- 选择依据：关系与事实澄清要由知情人响应；AI可准备问题而不能代替对方声明。 已配置的标准通知不强制逐次RM审批；例外/关系解释才转人。

- 协同：Human-led；Assist；人负责/异常转交：Relationship Manager（角色假设）。

- MVP：人执行判断/确认；产品仅支持context与记录。Target：专业判断/权限保持有权人；具体银行角色待验证。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅ReviewedOutcomeCommunication，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade。

- 验收候选：未收到适当参与者的回应，不生成ReviewedOutcomeCommunication；模拟资料与来源人员清楚，不能由播放或模型冒充提交。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**D4A-PUBLISH-05-03｜按获准版本与渠道记录派发和送达观察**

- 输入：ApprovedOutcomeCommunication；RecipientGrant。

- 输出：OutcomeNotificationReceipt。

- 选择依据：已批准请求的发送、回执、重试是受控状态机；不需Agent自由决定收件人与披露内容。 

- 协同：Human-by-exception；Execute within guardrails；人负责/异常转交：Authorised clearance role / RM（角色假设）。

- MVP：已审阅合成规则/适配器内执行；真实权限/集成未验证。Target：使用确定性契约和运行权限执行；异常/未知保持明确停止。

- 停止：缺权限、snapshot过时、发布失败或收件范围不明；本动作所需输入或权限欠缺则保持待处理。

- 恢复：确认重新核对；发布按同一意图幂等重试，保留决定；重新校验所有读写权限、当前版本、原任务/return anchor，不能只因用户点击过而恢复。

- 允许写入：仅OutcomeNotificationReceipt，经已有业务命令与权限边界提交；候选输出仍是候选。

- 禁止：创建或修改银行政策/权限；覆盖历史证据或决定；切换语言时修改业务地区/名单/适用性；无依据写全案Clear-to-Trade；把缺失前置或失败回执替换为成功；把产品写入权当作业务判断权。

- 验收候选：缺少ApprovedOutcomeCommunication、RecipientGrant中的必需前置、版本过时或同意图重复提交时，不产生错误/重复业务结果；成功输出仅限OutcomeNotificationReceipt并留下来源与事件。

- 状态：评分待校准；生产政策/数据/集成/实测/责任/发布六项均未验证；应用测试未执行。


**本场景的共同控制验收：**确认、记录、发布、回执、沟通分开；失败保留决定；发布不产生真实交易。

**上游/下游：**不当前/无权不confirm；已确认但publish失败保留decision，说明各target状态与安全retry。

**Journey／Product：**Clearance正常产品标题；决定、发布、客户沟通三块小状态；成功不跳烟花页面，不出现Trade executed。

**价值验证问题：**能否回查谁基于哪版证据确认哪个实体/产品，并区分未送达的下游？ 不添加无数据的节省比例。


## 来源和版本说明

本附件仅做D4执行分解和适配评分，不改变D3变化分类、PPT原文、D3-ISS清单或银行批准状态。每个原子动作的PPT引用来自父工作，表示上下文及细化关系，不声称原PPT已有同名细动作。

其他参考及方法论的原名、版本、URL、观察和使用边界见主稿及JSON references；内部方法论与PHKL仅在授权环境可见。
