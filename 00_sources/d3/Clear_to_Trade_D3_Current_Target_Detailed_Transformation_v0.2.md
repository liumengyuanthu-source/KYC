# Clear-to-Trade — Discussion 3 Current → Target Transformation
## 逐场景业务细化、PPT映射与行业／跨行业参考

- **版本：v0.2 · 2026-09-07**
- **状态：详细评审基线。D3方向已确认；新增细节与调和提案仍按记录审阅。**
- **Owner：Christina**
- **客户称谓：Confidential Australian Banking Client**
- **分发：内部受控，合成演示制作；不是银行签核文件。**
- **覆盖：15个既有场景；94条具体工作变更；Current的66个、Target的71个不同编号活动均有映射（重复与划线另存源位置，不等于已确认业务规则）。**
- **配套：`Clear_to_Trade_D3_Transformation_Traceability_v0.2.json`。沿用既有ID，通过alias mapping关联；本稿不重新命名业务对象。**

> 当前做什么、目标图改变什么、我们具体怎么设计、引用哪一种参考、仍需谁验证——必须分开表达。


## 0. 本稿范围、读法与当前状态

**Discussion 3 = Current → Target Transformation。**本稿不把D3改为生产Schema、Agent架构或Priority评分讨论。

内容颗粒度深入到工作项、来源活动、演员分工、字段/版本、判断/等待、输出、界面变化与验证问题；最终用户界面仍按“总览→场景→局部细节”渐进展开，不把本稿所有表格同时放上屏幕。

- 已确认：D3方向、原有A–F的总体工作范围、同一合成案件与两入口体验。
- 本轮新增：逐活动After方案及来源标注、PPT可视化审阅、跨稿冲突清单与建议调和方式。
- **本稿为详细评审基线，不以文件名替代银行验证，也不授权静默覆盖Codex已实现状态。**可先导入内容和映射；涉及已批准逻辑的冲突需明确记录/审阅。
- 未生成：新的HTML、生产Schema、Archify成图、媒体、接口、应用测试。本轮实际检查限文件/源映射/内容引用一致性。

### 内容来源分层

| 标签 | 含义 | 不得被误解为 |
|---|---|---|
| PPT-C / PPT-T | 本PPT第1/2页活动、原文、泳道及格式 | 客户最终用户访谈、已运行系统功能审计 |
| Regulatory / Industry guidance | 监管/行业指引给出的控制问题或原则 | 本银行的自动决策规则和配置 |
| Bank / Industry product example | 公开的银行或行业工具功能实例 | 本银行已使用、已集成或同样取得收益 |
| Cross-industry pattern | 航空、制造、医疗、药品质量等可迁移机制 | 银行适用法律或权限 |
| Internal design case | PHKL等我们已有的内部设计文件 | 已证明生产上线/实测收益的客户成功案例 |
| Our design proposal | 为本项目提出的字段、界面、规则细化与流程分工 | 外部来源直接规定或银行已确认 |
| Synthetic fixture | Entity A/B、Person T、受控输入与模拟结果 | 真实名单、真实身份、真实审批 |

内部PPT与PHKL文件均保持need-to-know。客户发布可展示获准的释义，但不自动把内部文件链接打包进外部Studio。公开reference可以链接官方页；禁止把benchmark原文当Case Evidence或授权依据。

## 1. 本次怎样核对PPT

依据：`Sanitised Process Map(1).pptx`，第1页Current、第2页Target，第3页为方法说明。

Files未提供渲染图，因此本轮在容器中渲染PPT并实际查看了两页；同时读取原生形状、坐标、文字和删除线属性。没有用OCR猜字。下文source occurrence包含页号与shape ID，避免重复流程码冲突。

**只保留源文件表达，不重新定义原图。**例如Target的删除线表达了修改意图，但未说明被删工作是取消、自动化还是转移；相应逻辑必须标记为待解释。Target的Actor分配和最终决策问责是不同结论。

### 第3页与本稿的关系

PPT第3页要求Current Journey pain/opportunity、Target role journey、Hero Case、HITL/autonomy、Journey-to-Product Requirements。D3给这些交付物补“具体改变什么”；并不新增第六份核心业务成果。Priority score仍在最后的Priority Board，不放进当前场景卡。

## 2. 前后比较的共同基础

1. 相同Case、目标实体、产品意图、Scope revision、Trigger/context、初始证据/查询输入与已知未知。
2. 比较同一个业务问题与检查点，不强行比较相同钟表时刻；动画时长不是业务周期。
3. Target可改变准备/执行方式、信息组织、错误发现时点和可见性，但新增取得的信息必须有真实的合成事件，不可幕后多给一份资料。
4. 保留相同控制目标；Current也可能得到正确结论，Target不是必须获得更宽松或更快的结果。
5. Before不复制不存在的银行旧UI，不声称完全手工或完全无结构。After只进入目标产品体验。
6. 同一场景的Current/Target不是两个独立客户；也是不同流程投影而非互相覆盖的业务定义。
7. 复杂/未决路径保留固定回点，不再引入更多独立Hero cases。EDD不为覆盖功能而必经。

### 三类状态上下文独立

`Design comparison(Current/Target)`、`Story checkpoint`、`Operational session`、`Lab shadow variant`分开。对同一(context tuple)的视图要求一致；切语言/图/比较按钮都不能写入业务决定。Lab受控变化后允许与Mainline不同，但差异必须可解释、有标识、不可自动回写。

## 3. Source与既有A–F的调和清单

以下是检测到的源歧义或跨稿冲突。**不把建议修正伪装成原PPT，也不因为新文档较新便自动覆盖所有旧行为。**

| ID／类型 | 位置与问题 | 实际观察 | 建议处理／需确认 |
|---|---|---|---|
| D3-ISS-01 · PPT-AMBIGUITY | 两页相同设计原则 / S1/S2 SH26 | Dynamic requirements、早并行、continuous structured state同一句在两页均出现。 | 不能仅凭此字幕声称Current静态且串行。以具体活动与泳道变化分析；问作者该句是否误复用。（Account team / process-map owner） |
| D3-ISS-02 · SOURCE-ID | Target重复M0.1与划线M1.1 / S2 SH283 vs SH279; SH20 | RM新的M0.1 initiation与Agentic M0.1 booking不同；M1.1仍可读但被划线。 | 保留source-qualified occurrence ID；意图是发起入口重命名还是流程变化需确认，不能删除实际申请动作。（Process-map owner） |
| D3-ISS-03 · SOURCE-ALLOCATION | 发送要求与向客户索取 / S1 SH291 M2.5; SH292 M3.3; SH9 M3.3 | M2.5在Ops；M3.3同时位于Ops组和RM独立框。 | 区分内容责任、对外沟通与派发执行；RM-assisted设计已批准，但所有发送是否RM审批未被PPT证实。（Raunaq / KYC operations） |
| D3-ISS-04 · SOURCE-ALLOCATION | Target Credit删除线 / S2 SH316/318/324/326/328 | C2.1/.2/.6/.7划线；C2.5只Obtain划线；C2.3/.4仍正常。 | 保留这些控制目的；源记录格式不改。D3给出待确认执行归属，不宣称银行已取消信用数据、approval或最终协议检查。（Credit SME / process-map owner） |
| D3-ISS-05 · SOURCE-ALLOCATION | Legal草稿来源 / S1/S2 SH334 C1.3 | Draft required agreements → Review drafted agreements。 | 可证实Legal动作词改变，不能证实AI从零起草。保留draft_origin和模板/人/自动化来源待确认。（Legal / product owner） |
| D3-ISS-06 · AUTHORITY | Agentic泳道里的判断与记录 / S2 M4.6/.7; M5.3/.6/.7; M6.8; M7.3/.4; M8.3; additional HITL | 目标自动执行组包含judgment/sign-off词，同时存在专门human判断和批准。 | 分开准备/执行/判断/批准/记录；演示的保守权限fixture是提案，不能说PPT已经完全确认。（Risk / QA / Control Room / clearance authority owner） |
| D3-ISS-07 · FLOW-SEMANTICS | Credit required?与Legal关系 / S1/S2 diamond plus C1/C2 tracks | 菱形在图上指向Legal轨道；文字Credit required不充分说明所有Legal适用性。 | Legal与Credit各自适用性保留；无Credit不自动等于无需Legal。五阶段也不替代真实依赖。（Legal / Credit / process-map owner） |
| D3-ISS-08 · CROSS-DOCUMENT-CONFLICT | F applicability四值与B/C三值冲突 / Batch F §5 vs Batch B §6 and Batch C §10.1 | F把review_required放进applicability；B/C明确把review workflow分开。 | 建议保留required/not_required/unknown；review_state另存。列为具体冲突，Codex先报告映射，不无声重写历史数据。（Christina / Codex schema reconciliation） |
| D3-ISS-09 · CROSS-DOCUMENT-STATE | Credit condition approved≠fulfilled / Batch D Living Story / CreditCondition | 已批准条件输入Legal，不等于其约束已落实。当前示例条件仅说纳入批准条件，缺具体payload可能循环。 | 保留approval_status与fulfilment_status；有condition_spec_ref和clause/version核对才可fulfilled。没有payload时只是结构演示，不能声称商业条款已验证。（Christina / Credit-Legal reviewer） |
| D3-ISS-10 · CLOSURE-GAP | E最终关状态缺前置事件 / Batch E E4 / Final State | E列Conflicts、coverage、Legal execution、QA关闭，但未把全部上游关键依据写清。 | 增加closure manifest：ownership评估→群体→required runs/复用依据→finding outcome；EDD适用性；booking/产品资格；signer权限；适用Credit最终检查；holds。缺项保持Not Ready。（Christina / scenario fixture reviewer） |
| D3-ISS-11 · QA-SEMANTICS | 缺评估记录不等于资料无效 / Batch E E2 / REQ-B05 chain | 材料存在但充分性尚未建立，可能缺assessment，而不是source false或evidence invalid。 | QA observation先写assessment_missing_or_unconfirmed，关联原Gap。只有实际证据评估支持才写insufficient。（QA / Ops reviewer） |
| D3-ISS-12 · STATE-ISOLATION | 同一spine不等于所有视图任何时刻完全相同 / Batch F experience/state phrasing vs Lab Shadow State | Story checkpoint、操作session和Lab changed分支各有context；有意inject后差异应当存在。 | 相同(case,scope,session,variant,checkpoint)下要求一致；Shadow变化保留明确delta，不强行覆盖Mainline或删除差异。（Christina / Codex） |
| D3-ISS-13 · CLEARANCE-SEMANTICS | 三段状态是呈现而非合并所有事实 / Batch E/F readiness/clearance enums | NOT_READY/READY_FOR_AUTHORISATION/CLEARED可作为摘要，但不能一个字段同时承担计算、决定和发布。 | 底层分别保存ReadinessSnapshot、ClearanceDecision、PublicationEvent；derived display有明确映射且绑定current input。（Christina / Codex） |
| D3-ISS-14 · READINESS-INVARIANT | QA与Readiness不得循环依赖 / Batch E prerequisite examples and QA scope | QA核验condition，最终readiness又依赖QA；若QA也依赖最终ready会死锁。 | 采用业务事实/要求→QA checks→QA signoff→readiness；readiness可持续显示pending但不作为QA完成前提。（QA / product model reviewer） |
| D3-ISS-15 · PROVENANCE | 全部after不得挂同一笼统benchmark标签 / Prior broad benchmark register | 很多参考是标准/指南或内部设计，不是银行已实施案例。 | 每条变更有source locator、参考观察、adaptation及不可推断范围；无直接案例就写OUR，不硬找背书。（Christina / research owner） |


## 4. 15个场景的细化总览


| 场景 | 横轴／业务范围 | 行级调整数 | 行业／跨行业／内部参考 |
|---|---|---|---|
| SCN-SCOPE 明确本次关系与业务范围 | S1 | 5 | REG-AUSTRAC-CDD, IC-PHKL |
| SCN-ENTITY 区分法人、关联组织、代表人及具体权限 | S1 | 6 | REG-AUSTRAC-CDD, IND-GLEIF-L2, IND-GLEIF-VLEI |
| SCN-REQUIREMENTS 形成可解释的本案要求 | S2 | 6 | REG-AUSTRAC-CDD, IND-SWIFT-KYC, IND-ISDA-DRR |
| SCN-SOURCE 先使用获准且合适的资料来源 | S2 | 6 | IND-SWIFT-KYC, XB-IATA, XB-GS1 |
| SCN-GAP 把内部缺口组织成可回应的请求 | S2 | 6 | IB-ING-DOOR, IB-ANZ-SECURE, IC-PHKL |
| SCN-VALIDATE 按主体与用途评估资料 | S2 | 6 | REG-AUSTRAC-CDD, XB-FHIR-R5, IC-PHKL |
| SCN-POPULATION 明确应该筛查谁、哪些类别与范围 | S3 | 6 | IND-WOLFSBERG, REG-DFAT-LIST |
| SCN-MATCH 用相同证据处理Person T的一条疑似命中 | S3 | 7 | IND-WOLFSBERG, REG-DFAT-LIST, IC-PHKL, XB-FHIR-R5 |
| SCN-EDD 有独立原因的加强尽调及有权结果 | S3 | 8 | REG-AUSTRAC-EDD, REG-AUSTRAC-SOF, IC-PHKL |
| SCN-CONFLICTS 早期冲突检查与受限专业判断 | S1–S4 | 5 | XB-ACDM |
| SCN-LEGAL 协议版本吸收专业输入并完成适用执行 | S2–S5 | 8 | IB-ISDA-CREATE, XB-NIST-THREAD |
| SCN-CREDIT 信用评估、批准、条件落实与协议数据分开 | S2–S4 | 7 | IND-BASEL-CCR, XB-NIST-THREAD |
| SCN-QA 从具体检查项回到具体补正 | S4 | 8 | XB-ICH-Q10, XB-FHIR-R5, IC-PHKL |
| SCN-READINESS 明确哪些条件真正满足、哪些仍在阻塞 | S4–S5 | 5 | XB-ACDM, XB-GS1, XB-FHIR-R5 |
| SCN-PUBLISH 最终记录、发布时间和客户结果分开 | S5 | 5 | XB-ACDM, XB-FHIR-R5, XB-GS1, IC-PHKL |


## 5. 逐场景Current → Target工作合同

**说明：**每行Current来自指定过程活动；After是对目标方向的具体提案。Change标签不是source真实性标签；字段是target逻辑字段候选，并不证明现状系统不存在这些字段。PPT原文与source occurrence见附录A；参考观察及迁移边界见第10节。


### 5.1 SCN-SCOPE — 明确本次关系与业务范围


**PPT Current：**Current M1.1由RM提交；M0.1–.2在RM，M0.3–.4在Ops。

**PPT Target：**Target新增RM的M0.1 request，旧M1.1被划线；booking等M0.1–.4位于Agentic execution。两处M0.1不能合并。

**共同检查点：**原始请求刚收到；Entity A为拟交易主体，Entity B为关联母公司，产品只是FX forward意图；booking、资格及DD信息按实际缺口保留。

**共同输入：**同一原始请求、已知主体/产品声明、现有政策context，不给After额外批准。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-SCOPE-01<br>请求接收与去重 | RM捕获并提交关系信息，Ops接收。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 产品保存原请求来源，抽取候选主体/产品/联系人；匹配已有工作案件后提示可能重复，不能无提示合并。<br>变化：Reassigned | RM/Ops确认本次新关系或已有申请关联；抽取不是验证。 | Case.request_source_ref; Case.trigger_type; Case.intake_dedup_candidate_refs; CandidateClaim.value_status | IC-PHKL |
| D3-SCOPE-02<br>销售与booking context | RM确定销售地点和reporting/booking entity。<br>角色：SALES / RM (Front Office) | 把销售地点、银行booking法人、拟交易客户法人分栏；对候选值展示来源，未知为空并生成具体确认工作。<br>变化：Reassigned | 不能因Entity A在澳洲便选择某银行法人；匹配规则与确认权待验证。 | CaseScope.sales_location; CaseScope.booking_entity_ref; CaseScope.booking_basis_ref; CaseScope.unresolved_context_refs | OUR：没有强行挂外部案例 |
| D3-SCOPE-03<br>产品意图与资格 | 确认并验证approved product/service scope。<br>角色：SALES / RM (Front Office) | 分开Requested Product、允许业务范围和资格确认记录；不以产品卡被选中代表准入。<br>变化：Reassigned | 资格结果须来自适用规则/有权记录。 | CaseScope.requested_product_refs; ProductEligibility.status; ProductEligibility.decision_ref; ProductEligibility.scope_revision | OUR：没有强行挂外部案例 |
| D3-SCOPE-04<br>尽调层级与初步风险context | Ops确定DD level；后续M2.4可调整要求。<br>角色：CLIENT FULFILMENT / KYC OPS | 保留当前评估层级、政策依据和未决风险问题；M2或Screening新信息可触发重评，不把初判永久固定。<br>变化：Enhanced | 跨境、外币或母公司地点不单独产生演示高风险结论。 | DDContext.level; DDContext.basis_refs; DDContext.assessment_status; DDContext.revision | REG-AUSTRAC-CDD |
| D3-SCOPE-05<br>记录范围及后续使用 | 记录booking model，创建案件及repository。<br>角色：CLIENT FULFILMENT / KYC OPS | 保存不可混淆的CaseScope版本与source refs；Requirements/Legal/Credit各引用其实际采用版本。<br>变化：Enhanced | 范围确认不是KYC批准；变更先评估下游影响。 | CaseScope.revision; CaseScope.confirmation_ref; ScopeUse.consumer_ref; ScopeUse.scope_revision | XB-NIST-THREAD |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-SCOPE-01 | PPT-S1-SH20-A1, PPT-S1-SH284-A1 | PPT-S2-SH20-A1, PPT-S2-SH284-A1, PPT-S2-SH283-A1；struck_out |
| D3-SCOPE-02 | PPT-S1-SH283-A1 | PPT-S2-SH279-A1 |
| D3-SCOPE-03 | PPT-S1-SH283-A2 | PPT-S2-SH279-A2 |
| D3-SCOPE-04 | PPT-S1-SH3-A1, PPT-S1-SH18-A4 | PPT-S2-SH279-A3, PPT-S2-SH18-A4 |
| D3-SCOPE-05 | PPT-S1-SH3-A2, PPT-S1-SH284-A2 | PPT-S2-SH279-A4, PPT-S2-SH284-A2 |


**等待／恢复与下一步：**缺失booking/product eligibility对应工作保持待确认；不阻止足够输入且获准的内部准备。新的范围/资格依据产生版本，不能仅点Next推进。

**角色体验的实际变化：**RM少重复描述已确定context；Ops先看未知与冲突。两者仍承担适当的澄清与确认职责。

**卡片、图示与产品如何呈现：**Scope卡显示交易主体/产品意图/主要未知；弹窗原请求与结构化范围并排；Archify从RM请求聚焦至M0各子活动，不复制duplicate ID。

**不变控制：**集团名≠法人；产品请求≠产品资格；中文/澳洲英文≠booking context；M0.1源重复留疑问。

**需要验证的效果：**审阅者能否指出实际法人、请求产品和批准资格的区别？测试纠正一处主体不会修改其他案件。 这不是已测量收益。

---


### 5.2 SCN-ENTITY — 区分法人、关联组织、代表人及具体权限


**PPT Current：**M1.4/.5确认客户名称、地点与分类；M2/M3承接所需主体证据。PPT没有独立编号的完整代表授权步骤。

**PPT Target：**M1.4/.5移入Agentic；Ops处理classification exceptions。用途级权限模型是行业启发和本项目设计，不是PPT逐字写明。

**共同检查点：**同一Entity A/B与Person T资料；集团职位资料已收到，但对Entity A的协同、声明、签约、交易权限尚不能彼此继承。

**共同输入：**原请求、集团结构概览、职位资料、可访问登记信息及各自实际来源状态。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-ENTITY-01<br>法人身份候选匹配 | 确认client legal name/location。<br>角色：CLIENT FULFILMENT / KYC OPS | 保存原名、登记名、别名、注册地、标识和出处；相似名称产生候选，不直接覆盖主记录。<br>变化：Reassigned | 明确哪个公司是counterparty，不混bank booking entity。 | LegalEntity.legal_name; LegalEntity.registration_jurisdiction; LegalEntity.identifiers; EntityMatch.status; EntityMatch.source_refs | IND-GLEIF-L2 |
| D3-ENTITY-02<br>实体分类与例外 | Ops分类法人类型并triage case。<br>角色：CLIENT FULFILMENT / KYC OPS | 已支持的分类建议显示规则/证据；复杂结构保持review_required工作并送到分类例外。<br>变化：Reassigned | 分类结果与复核工作状态分开；未知不任选最近类别。 | EntityClassification.value; EntityClassification.basis_ref; ClassificationReview.status; ClassificationReview.owner_ref | REG-AUSTRAC-CDD |
| D3-ENTITY-03<br>集团关系与ownership/control | 源图只给确认主体及验证证据，未定义关系数据库。<br>角色：CLIENT FULFILMENT / KYC OPS | 分别记录报告的母子关系、会计合并关系与自然人所有/控制关联，每条边有类型、证据和验证状态。<br>变化：Proposed addition | GLEIF Level2不能直接代替最终自然人受益所有人识别。 | PartyRelationship.relationship_type; PartyRelationship.from_ref; PartyRelationship.to_ref; PartyRelationship.verification_ref | IND-GLEIF-L2 |
| D3-ENTITY-04<br>人、雇主与所代表主体 | 这些活动承载所需信息；PPT未独立规定代表权限对象。<br>角色：CLIENT FULFILMENT / KYC OPS | Person T、Employer Entity B、Principal Entity A分别记录；业务角色名称与权限判断不合并。<br>变化：Proposed addition | 联系方法验证、人员身份验证、公司授权、产品访问四者分开。 | Person.identity_ref; Representative.employer_ref; Representative.principal_ref; Representative.role_claim_ref | REG-AUSTRAC-CDD, IND-GLEIF-VLEI |
| D3-ENTITY-05<br>按用途建立代表权限 | 确定并验证适用材料，具体权限目录未给。<br>角色：CLIENT FULFILMENT / KYC OPS | 对协调资料、正式声明、签署协议等已建模动作分别记录证据用途与决定；不足时生成明确Gap。<br>变化：Proposed addition | 协调材料足够不推导签约权；实际可接受材料及reviewer待银行确认。 | AuthorityRecord.principal_ref; AuthorityRecord.action_type; AuthorityRecord.status; AuthorityRecord.evidence_use_refs; AuthorityRecord.decision_ref | REG-AUSTRAC-CDD |
| D3-ENTITY-06<br>有限参与者接入 | PPT没有客户Portal/Grant细节。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 复用Batch B的联系审核与有限任务Grant，让适当人员提交指定证据，而不让其查看案件所有内部资料。<br>变化：Proposed addition | 身份/认证不自动授予business authority；无合法授权路径保留draft和staff-assisted替代。 | AccessGrant.resource_scope; AccessGrant.permitted_actions; RequestAccessDecision.basis_refs | IB-ING-DOOR, IB-ANZ-SECURE |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-ENTITY-01 | PPT-S1-SH284-A3 | PPT-S2-SH284-A3 |
| D3-ENTITY-02 | PPT-S1-SH284-A4 | PPT-S2-SH284-A4, PPT-S2-SH280-EX |
| D3-ENTITY-03 | PPT-S1-SH284-A3, PPT-S1-SH292-A4 | PPT-S2-SH284-A3, PPT-S2-SH292-A4 |
| D3-ENTITY-04 | PPT-S1-SH284-A3, PPT-S1-SH18-A1, PPT-S1-SH292-A4 | PPT-S2-SH284-A3, PPT-S2-SH18-A1, PPT-S2-SH292-A4 |
| D3-ENTITY-05 | PPT-S1-SH18-A1, PPT-S1-SH292-A4 | PPT-S2-SH18-A1, PPT-S2-SH292-A4, PPT-S2-SH281-EX |
| D3-ENTITY-06 | PPT-S1-SH284-A2, PPT-S1-SH292-A3, PPT-S1-SH9-A1 | PPT-S2-SH284-A2, PPT-S2-SH292-A3 |


**等待／恢复与下一步：**实体无法唯一识别先澄清；任职资料不能解决principal/action权限。有限贡献者可按独立grant提供权限资料，不能全案开放。

**角色体验的实际变化：**人员从查名字转为确认候选关系与未建立用途；客户知道请求针对哪一家实体。

**卡片、图示与产品如何呈现：**同一人物及两法人，关系边分别标reported/reviewed；选代表时显示employer、principal、action范围，避免人像警示色暗示风险。

**不变控制：**Authority为M1/M2/M3的设计细化；没有PPT独立动作就注明延伸，不伪造过程码。

**需要验证的效果：**能否看出任职、协调、签约和访问是四类不同事实？ 这不是已测量收益。

---


### 5.3 SCN-REQUIREMENTS — 形成可解释的本案要求


**PPT Current：**M2.1 AML/KYC及reliefs，M2.2 non-AML及exemptions，M2.3汇总，M2.4风险/EDD调整，M2.5发布；Current已经有policy/CIP/risk rules。

**PPT Target：**同样M2.1–.5移入Agentic，复杂信息/分类交给Ops；自动形成机器可执行规则属于设计细化。

**共同检查点：**同一Scope版本与相同已知/未知context；两侧使用相同适用政策输入，不让Target偷偷增加已批准exemption。

**共同输入：**Scope、实体类型、booking状态、产品、已取得政策版本、初步风险与历史要求。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-REQUIREMENTS-01<br>AML/KYC要求与relief | 根据适用context确定要求及reliefs。<br>角色：CLIENT FULFILMENT / KYC OPS | 绑定适用policy/CIP版本、主体、用途、条件评估结果；规则可确定则执行，不能确定则建立review工作。<br>变化：Reassigned | applicability三值，review workflow另存；无规则不生成看似权威要求。 | Requirement.policy_revision; Requirement.subject_ref; Requirement.purpose_code; Requirement.applicability; ApplicabilityReview.status | REG-AUSTRAC-CDD |
| D3-REQUIREMENTS-02<br>Non-AML要求与exemption | 需要时与Legal确定non-AML要求和exemption。<br>角色：CLIENT FULFILMENT / KYC OPS | 分开放置non-AML领域与所需专业输入；请求具体exemption决定，记录其有效scope而非删除要求。<br>变化：Enhanced | Legal是源图指明的条件协作者；不推断具体税务/市场规则已适用。 | Requirement.domain; ExemptionDecision.scope_ref; ExemptionDecision.authority_ref; ExemptionDecision.basis_ref | OUR：没有强行挂外部案例 |
| D3-REQUIREMENTS-03<br>汇总要求 | 合并各项要求。<br>角色：CLIENT FULFILMENT / KYC OPS | 按subject/purpose组织RequirementSet；候选重复可合并展示但保留不同来源/控制，记录版本及差异。<br>变化：Enhanced | 同一文件能支持多要求不等于这些控制可合并成一个。 | RequirementSet.revision; RequirementSet.context_refs; Requirement.definition_ref; Requirement.origin_refs | IND-SWIFT-KYC |
| D3-REQUIREMENTS-04<br>风险重评与EDD影响 | 应用风险评级、识别EDD indicators、调整要求。<br>角色：CLIENT FULFILMENT / KYC OPS | 新风险问题绑定触发事件，重算受影响适用性并留delta；不因请求急迫调低控制。<br>变化：Enhanced | 风险建议/决定/要求更改分开；EDD另有适用记录。 | RiskAssessment.revision; RiskIndicator.trigger_ref; RequirementChange.affected_refs; EDDApplicabilityAssessment.ref | REG-AUSTRAC-EDD |
| D3-REQUIREMENTS-05<br>要求发布与客户请求 | M2.5 Ops发要求；M3.3另见RM和Ops，具体发送责任待确认。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 内部完整RequirementSet投影为获准客户请求；发布版本、收件人、渠道及dispatch审阅分别保留。<br>变化：Reassigned | 不将RM强制加入每次标准提醒审批，也不赋予RM豁免要求权。 | InformationRequest.requirement_set_revision; RequestRecipient.permitted_item_refs; DisclosureReview.ref; Notification.dispatch_status | IB-ING-DOOR, IB-ANZ-SECURE |
| D3-REQUIREMENTS-06<br>要求计划变更后重用 | 源图无明确change graph字段，已有risk adjustment。<br>角色：CLIENT FULFILMENT / KYC OPS | Scope或policy引用改变时保留旧plan，显示哪些requirement需重评及哪些证据用途可继续引用。<br>变化：Proposed addition | 重用须有适用/currency依据，不全清空也不全继承。 | RequirementSet.supersedes_ref; RequirementUse.currency_status; ChangeImpact.unknown_refs | IND-ISDA-DRR, XB-NIST-THREAD |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-REQUIREMENTS-01 | PPT-S1-SH18-A1 | PPT-S2-SH18-A1 |
| D3-REQUIREMENTS-02 | PPT-S1-SH18-A2 | PPT-S2-SH18-A2 |
| D3-REQUIREMENTS-03 | PPT-S1-SH18-A3 | PPT-S2-SH18-A3 |
| D3-REQUIREMENTS-04 | PPT-S1-SH18-A4 | PPT-S2-SH18-A4 |
| D3-REQUIREMENTS-05 | PPT-S1-SH291-A1, PPT-S1-SH292-A3, PPT-S1-SH9-A1 | PPT-S2-SH18-A5, PPT-S2-SH292-A3 |
| D3-REQUIREMENTS-06 | PPT-S1-SH18-A1, PPT-S1-SH18-A3, PPT-S1-SH3-A2 | PPT-S2-SH18-A1, PPT-S2-SH18-A3, PPT-S2-SH279-A4 |


**等待／恢复与下一步：**某context缺失保留相应适用性unknown，不把全部要求阻断或全部当required。已获支持的要求可先准备取证。

**角色体验的实际变化：**Ops处理适用性歧义和例外，不从头解释每一条已明确规则；客户只看到合适的外部子集。

**卡片、图示与产品如何呈现：**Requirements视图将Applies to、Purpose、Basis、Status、Remaining gap对齐；Compare显示同一要求如何从人工整合到版本化plan。

**不变控制：**标准问卷不是本案全部要求；Mandatory/relief不可由模型自由决定。

**需要验证的效果：**指定要求能否追到主体、用途、依据和scope？异常context变化是否精确影响相关项？ 这不是已测量收益。

---


### 5.4 SCN-SOURCE — 先使用获准且合适的资料来源


**PPT Current：**M3.1已经从public/commercial sources获取资料；M3.5已有sourcing audit。

**PPT Target：**相同活动位于Agentic lane；自动源路由、claim extraction和用途关联为方案细化。

**共同检查点：**同一RequirementSet、已有证据库存、同样获准数据源和可用性；Target不获得Current不存在的真实连接。

**共同输入：**Entity A的已知标识、现有资料、数据源访问权限/查询范围、源时点。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-SOURCE-01<br>来源选择与检索资格 | 从public/commercial sources查找。<br>角色：CLIENT FULFILMENT / KYC OPS | 对subject和required fact挑选已允许来源，绑定source policy与query scope；无访问依据不运行。<br>变化：Reassigned | 不能宣称图中供应商名称等于可用API；本轮mock明示。 | SourceRetrieval.subject_ref; SourceRetrieval.query_scope; SourceRetrieval.access_basis_ref; SourceRetrieval.adapter_ref | IND-SWIFT-KYC |
| D3-SOURCE-02<br>记录来源和不同时间 | 已有sourcing audit；具体字段未展示。<br>角色：CLIENT FULFILMENT / KYC OPS | 分别记录检索时间、资料内容时点、来源版本、query返回状态和可重现引用。<br>变化：Enhanced | 读到页面的今天不等于信息今天有效。 | SourceRetrieval.retrieved_at; EvidenceArtifact.data_as_of; EvidenceArtifact.source_revision; ProvenanceRecord.locator | XB-GS1, XB-FHIR-R5 |
| D3-SOURCE-03<br>提取可比较claims | 获取后验证资料，抽取工具并未规定。<br>角色：CLIENT FULFILMENT / KYC OPS | 从资料准备候选name/relationship等claims，保留原位置和提取状态；确认后再形成下游可用值。<br>变化：Proposed addition | 模型抽取confidence仅指抽取，不作身份/充分性结论。 | EvidenceClaim.attribute_code; EvidenceClaim.reported_value; EvidenceClaim.origin_locator; EvidenceClaim.value_status | XB-FHIR-R5 |
| D3-SOURCE-04<br>已有资料与重复候选 | 识别缺口前须考虑已有材料；当前去重实现未知。<br>角色：CLIENT FULFILMENT / KYC OPS | 比较同一文件或同一源版本的候选重复，保留原始贡献者与路径；展示多次提交，不任意删证据。<br>变化：Enhanced | hash一致不决定业务用途一致，不以最新值无声覆盖旧值。 | EvidenceArtifact.content_ref; DuplicateCandidate.match_basis; Submission.original_source_ref | IND-SWIFT-KYC |
| D3-SOURCE-05<br>来源失败和恢复 | 源图未展开错误处理。<br>角色：CLIENT FULFILMENT / KYC OPS | 查询超时/部分返回/权限不足保留具体状态和下一步；安全重试使用关联请求ID。<br>变化：Proposed addition | 失败不能当无信息或阴性结果，不新增一堆故事分支。 | SourceRetrieval.result_status; SourceRetrieval.failure_code; SourceRetrieval.retry_of_ref; WorkItem.wait_reason_ref | XB-IATA |
| D3-SOURCE-06<br>资料与用途关联 | 验证资料并识别残余缺口。<br>角色：CLIENT FULFILMENT / KYC OPS | 候选资料连接subject+requirement+purpose，由后续用途评估确认；没有因来源权威直接满意。<br>变化：Enhanced | 银行接受程度和使用范围仍单独验证。 | EvidenceUseAssessment.requirement_ref; EvidenceUseAssessment.subject_ref; EvidenceUseAssessment.purpose_code; EvidenceUseAssessment.sufficiency | REG-AUSTRAC-CDD |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-SOURCE-01 | PPT-S1-SH292-A1 | PPT-S2-SH292-A1 |
| D3-SOURCE-02 | PPT-S1-SH292-A1, PPT-S1-SH292-A5 | PPT-S2-SH292-A1, PPT-S2-SH292-A5 |
| D3-SOURCE-03 | PPT-S1-SH292-A1, PPT-S1-SH292-A4 | PPT-S2-SH292-A1, PPT-S2-SH292-A4 |
| D3-SOURCE-04 | PPT-S1-SH292-A1, PPT-S1-SH292-A2 | PPT-S2-SH292-A1, PPT-S2-SH292-A2 |
| D3-SOURCE-05 | PPT-S1-SH292-A1, PPT-S1-SH292-A5 | PPT-S2-SH292-A1, PPT-S2-SH292-A5 |
| D3-SOURCE-06 | PPT-S1-SH292-A2, PPT-S1-SH292-A4 | PPT-S2-SH292-A2, PPT-S2-SH292-A4 |


**等待／恢复与下一步：**无法唯一识别或没有访问依据停止相应查询；失败记录unknown/error不伪造值；返回新的具体source response后恢复。

**角色体验的实际变化：**分析人员少重复搜同一资料，主要处理找不到、冲突、时效和使用权问题。

**卡片、图示与产品如何呈现：**Evidence按来源/主体/资料时点/用途显示；一个资料卡可展开用途连接，不能整卡全绿。

**不变控制：**资料取得≠验证≠用途充分；提取≠法律意义的第三方CDD reliance。

**需要验证的效果：**是否在请求客户前识别了可复用来源？source failure是否仍透明？ 这不是已测量收益。

---


### 5.5 SCN-GAP — 把内部缺口组织成可回应的请求


**PPT Current：**M3.2识别residual gaps，M3.3向客户要信息；M2.5发要求，RM/Client有澄清动作。源图未确认客户渠道。

**PPT Target：**M3.2/.3产品执行；有限贡献者、安全网页、通知与资料提交分离来自获批设计与案例启发。

**共同检查点：**相同两项初始残余缺口：Person T协调资料授权、Entity A ownership/control；其他内部要求保持独立。

**共同输入：**已有用途评估、缺口、已审阅联系信息、实际Grant、客户可披露原因。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-GAP-01<br>识别实际残余缺口 | 识别资料未满足的部分。<br>角色：CLIENT FULFILMENT / KYC OPS | 结合当前用途评估与适用性生成具体缺口类型；已有open gap关联，不重复制造gap。<br>变化：Enhanced | unknown applicability先内部确认，不伪装mandatory请求。 | Gap.requirement_ref; Gap.subject_ref; Gap.purpose_code; Gap.reason_code; Gap.origin_assessment_ref | OUR：没有强行挂外部案例 |
| D3-GAP-02<br>组织客户请求项 | 向客户发要求并澄清。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 相关缺口聚合为可回应项目，保留每个requirement/subject/purpose链接，显示接受的响应方式与理由。<br>变化：Enhanced | 不是给每项控制强制要求一份新文件；材料类型按配置不即兴指定。 | RequestItem.gap_refs; RequestItem.client_reason; RequestItem.response_options; InformationRequest.revision | IB-ING-DOOR |
| D3-GAP-03<br>收件人与有限访问 | Current只说明客户与RM/Ops沟通。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 区分Person T授权项目与适当公司贡献者ownership项目，每个Grant仅覆盖已审阅资源和动作。<br>变化：Proposed addition | 转发邀请不传递权限；无权限先用适当联系人或获批辅助路径。 | RequestRecipient.person_ref; AccessGrant.resource_scope; AccessGrant.provisioning_basis_ref; DisclosureReview.ref | IB-ANZ-SECURE |
| D3-GAP-04<br>请求审批、发送、送达 | 源图不展开传输状态。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 审阅请求版本后按配置通知；草稿、已批准、发送、送达观察各独立。官网Reference+mock authentication为演示默认配置。<br>变化：Proposed addition | 真实OTP/邮件未接入；提醒不默认每次RM审批。 | RequestReview.status; Notification.dispatch_status; Notification.delivery_status; InformationRequest.sent_revision | IB-ANZ-SECURE |
| D3-GAP-05<br>局部响应与澄清 | 客户提供资料及回应。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 客户保存/提交自己的项目并获得回执；另一项保持open；提问关联原request item。<br>变化：Enhanced | 实际银行用户授权与前端role switch不是同一件事。 | Submission.request_item_refs; Submission.submitted_by; Submission.on_behalf_of; RequestItem.response_status | IB-ING-DOOR, IB-ANZ-SECURE |
| D3-GAP-06<br>辅助沟通与代收 | RM有客户联系，具体电话/邮件流程尚未确认。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | RM保存经审阅沟通要点；staff-assisted上传保留原提供人与代录入者、渠道及时间。<br>变化：Proposed addition | 摘要不是授权或正式决定；不记录假的客户登录。 | InteractionRecord.source_ref; InteractionRecord.reviewed_by; Submission.original_submitter_ref; Submission.staff_uploader_ref | IC-PHKL |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-GAP-01 | PPT-S1-SH292-A2 | PPT-S2-SH292-A2 |
| D3-GAP-02 | PPT-S1-SH291-A1, PPT-S1-SH292-A3, PPT-S1-SH9-A1 | PPT-S2-SH18-A5, PPT-S2-SH292-A3 |
| D3-GAP-03 | PPT-S1-SH292-A3, PPT-S1-SH9-A1 | PPT-S2-SH292-A3 |
| D3-GAP-04 | PPT-S1-SH292-A3, PPT-S1-SH9-A1 | PPT-S2-SH292-A3 |
| D3-GAP-05 | PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A4 | PPT-S2-SH292-A3, PPT-S2-SH292-A4 |
| D3-GAP-06 | PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A5 | PPT-S2-SH292-A3, PPT-S2-SH292-A5 |


**等待／恢复与下一步：**不确认收件人/披露/发送权时留draft；客户回应后回原item，不创建新独立案件。

**角色体验的实际变化：**RM解释为什么、协调谁来提供；Ops管理依据，客户仅处理本人任务。

**卡片、图示与产品如何呈现：**Current画获知的沟通动作，未确认渠道标假设；Target短request item+安全任务；正文不是大邮件墙。

**不变控制：**业务请求可多收件人，原始要求一份；登录或邮箱验证不授予签约权。

**需要验证的效果：**客户能否知道哪家主体、为什么需要、如何回应？一项提交是否不误关另一项？ 这不是已测量收益。

---


### 5.6 SCN-VALIDATE — 按主体与用途评估资料


**PPT Current：**M3.4 capture & validate evidence；M3.5处理gap并记audit；Current已经验证。

**PPT Target：**M3.4/.5由产品执行，复杂info gap在Ops；自动检查与专业充分性边界需细化。

**共同检查点：**相同新响应与来源状态；协调授权材料不能同时当Person T全部身份和签约证明。

**共同输入：**请求item、原资料、来源、主体/用途、现有claims、现有评估版本。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-VALIDATE-01<br>接收与技术检查 | 捕获资料，技术检查未详细描述。<br>角色：CLIENT FULFILMENT / KYC OPS | 接收留original artifact，mock intake明确released/quarantine/rejected；只有允许审阅的资料进入后续。<br>变化：Proposed addition | 安全检查并不验证法律真实性或业务充分性。 | EvidenceArtifact.intake_security_status; EvidenceArtifact.content_revision; Submission.ref | OUR：没有强行挂外部案例 |
| D3-VALIDATE-02<br>主体与来源核对 | 验证证据。<br>角色：CLIENT FULFILMENT / KYC OPS | 对比资料主体、提供人、出具主体、资料时点与当前用途；冲突建立issue。<br>变化：Enhanced | 出具Entity B职位信不变成Entity A授权。 | EvidenceClaim.subject_ref; EvidenceArtifact.issuer_ref; EvidenceArtifact.data_as_of; DataConflict.claim_refs | REG-AUSTRAC-CDD |
| D3-VALIDATE-03<br>候选值与已采信值 | 源图无字段级采信机制。<br>角色：CLIENT FULFILMENT / KYC OPS | 明确reported/extracted/reviewed状态；必要时由有权人员决定采用哪个claim并记录依据。<br>变化：Proposed addition | 不把模型高置信度写作已验证事实。 | EvidenceClaim.value_status; ClaimAdoption.decision_ref; ClaimAdoption.scope_ref | XB-FHIR-R5 |
| D3-VALIDATE-04<br>用途充分性 | 验证资料足以支持相关工作，具体criteria未给。<br>角色：CLIENT FULFILMENT / KYC OPS | 每项EvidenceUse绑定subject、requirement、purpose，准备检查；复杂充分性保留人工处理。<br>变化：Enhanced | sufficient仅适用于该用途及输入版本；代表协调权不授予签署/交易。 | EvidenceUseAssessment.sufficiency; EvidenceUseAssessment.basis_refs; EvidenceUseAssessment.assessed_by_ref; EvidenceUseAssessment.revision | REG-AUSTRAC-CDD |
| D3-VALIDATE-05<br>更新缺口与依赖 | 管理outstanding gaps与sourcing audit。<br>角色：CLIENT FULFILMENT / KYC OPS | 根据新评估只更新显式依赖的Gap/Task/Requirement，未知影响进入review；保留历史与receipt。<br>变化：Enhanced | 不能只凭完成任务数量让全案ready。 | Gap.resolved_by_ref; DependencyEdge.from_revision; ChangeImpact.unknown_refs; AuditEvent.causation_ref | XB-NIST-THREAD, XB-GS1 |
| D3-VALIDATE-06<br>反馈与再次提交 | 客户澄清及后续gap处理已存在。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 对可披露理由提供指定项目的反馈；补件沿原item继续并保留sent/response版本。<br>变化：Enhanced | 不把内部审查原因全部暴露；新请求项目需要适用访问范围。 | ResponseFeedback.allowed_reason; RequestItem.next_action; InformationRequest.sent_revision | IC-PHKL, IB-ANZ-SECURE |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-VALIDATE-01 | PPT-S1-SH292-A4 | PPT-S2-SH292-A4 |
| D3-VALIDATE-02 | PPT-S1-SH292-A4 | PPT-S2-SH292-A4 |
| D3-VALIDATE-03 | PPT-S1-SH292-A4 | PPT-S2-SH292-A4 |
| D3-VALIDATE-04 | PPT-S1-SH292-A4 | PPT-S2-SH292-A4, PPT-S2-SH281-EX, PPT-S2-SH392-EX |
| D3-VALIDATE-05 | PPT-S1-SH292-A5 | PPT-S2-SH292-A5 |
| D3-VALIDATE-06 | PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A5 | PPT-S2-SH292-A3, PPT-S2-SH292-A5 |


**等待／恢复与下一步：**安全接收未释放或业务缺口未解则暂停相关评估；收到revised evidence后创建新评估，不删旧版本。

**角色体验的实际变化：**Ops先看用途差异和冲突；客户得到具体补充说明而不是泛化rejected。

**卡片、图示与产品如何呈现：**Evidence Review显示原文+Claims+用途结果；部分覆盖用明细，不扩充sufficiency枚举。

**不变控制：**技术文件安全、来源核验、事实真伪、用途充分性分开；保留四值sufficiency。

**需要验证的效果：**相同文件对两个用途不同结果是否可解释？与下游判断的关联是否准确？ 这不是已测量收益。

---


### 5.7 SCN-POPULATION — 明确应该筛查谁、哪些类别与范围


**PPT Current：**M4.1 initial risk pre-screening、M4.2 early adverse-media、M4.3 population、M4.4 comprehensive；不能把M4.1偷换成全部sanctions流程。

**PPT Target：**M4.1–.4在Agentic lane；细粒度Population/Membership/Run/Coverage是为解释执行范围的设计。

**共同检查点：**Ownership/control仍未全闭合；已知Entity A/B/Person T不等于最终完整群体。

**共同输入：**同一主体/关系/数据源可用性、policy context及实际未决项。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-POPULATION-01<br>初始风险预筛 | 先进行risk pre-screening。<br>角色：CLIENT FULFILMENT / KYC OPS | 按本次scope和已知风险context准备预筛，记录实际检查范围和结果/未知，不宣称已跑全部制裁类别。<br>变化：Reassigned | Person T演示query是已审阅配置的一项，不用岗位/国籍自动纳入所有名单。 | ScreeningPlan.run_kind; ScreeningPlan.purpose; ScreeningPlan.inclusion_basis_ref; ScreeningPlan.scope_revision | IND-WOLFSBERG |
| D3-POPULATION-02<br>早期负面媒体 | 早期adverse-media screen已经存在。<br>角色：CLIENT FULFILMENT / KYC OPS | 保留来源发布日期/检索日期、主体归属与待解释事项；与sanctions/PEP类别分开。<br>变化：Reassigned | 报道不等于事实定罪，来源可信/相关性由适当审阅处理。 | MediaFinding.source_ref; MediaFinding.published_at; MediaFinding.subject_attribution; MediaFinding.review_status | IND-WOLFSBERG |
| D3-POPULATION-03<br>群体纳入与排除依据 | 建立screening population。<br>角色：CLIENT FULFILMENT / KYC OPS | 每主体×类别保存纳入/排除/未决及criteria，ownership缺口显示为inventory gap。<br>变化：Enhanced | 未知不等于排除；没有识别完相关人不能用空列表满足。 | ScreeningMembership.decision; ScreeningMembership.criterion_ref; ScreeningPopulation.inventory_status; ScreeningPopulation.gap_refs | IND-WOLFSBERG |
| D3-POPULATION-04<br>群体与查询计划版本 | 按群体执行完整筛查。<br>角色：CLIENT FULFILMENT / KYC OPS | 冻结本次所查party snapshots、范围和源版本；完整plan确认前保留不足项。<br>变化：Enhanced | 完整群体确认不自动执行所有queries，更不代表无命中。 | ScreeningPopulation.revision; RunSubjectSnapshot.party_revision; ScreeningPlan.confirmation_ref | OUR：没有强行挂外部案例 |
| D3-POPULATION-05<br>执行与适用覆盖 | 执行comprehensive screening。<br>角色：CLIENT FULFILMENT / KYC OPS | 按subject revision×category×query/list scope记录实际返回；failed/partial/no-alert分开，不以providers logo表示完成。<br>变化：Reassigned | 本轮所有外部query是明确synthetic adapter；实际licence/API未验证。 | ScreeningRun.run_status; ScreeningRun.result_count; ScreeningRun.data_as_of; ScreeningCoverageItem.execution_status | IND-WOLFSBERG |
| D3-POPULATION-06<br>覆盖关闭与结果复用 | 完成查询并最终确定筛查结果。<br>角色：CLIENT FULFILMENT / KYC OPS/FINANCIAL CRIME / RISK / COMPLIANCE | 检查required tuples、未处置findings、时效和当前scope；复用旧结果须有currency评估和mapping。<br>变化：Enhanced | 全部可见任务完成不等于manifest完整；空/错误加载不是成功。 | ScreeningCoverageItem.review_status; ScreeningCoverageItem.currency_status; CoverageAssessment.manifest_complete; CoverageAssessment.basis_refs | IND-WOLFSBERG |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-POPULATION-01 | PPT-S1-SH296-A1 | PPT-S2-SH296-A1 |
| D3-POPULATION-02 | PPT-S1-SH296-A2 | PPT-S2-SH296-A2 |
| D3-POPULATION-03 | PPT-S1-SH296-A3 | PPT-S2-SH296-A3 |
| D3-POPULATION-04 | PPT-S1-SH296-A3, PPT-S1-SH296-A4 | PPT-S2-SH296-A3, PPT-S2-SH296-A4 |
| D3-POPULATION-05 | PPT-S1-SH296-A4 | PPT-S2-SH296-A4 |
| D3-POPULATION-06 | PPT-S1-SH296-A4, PPT-S1-SH177-A2 | PPT-S2-SH296-A4, PPT-S2-SH296-A7 |


**等待／恢复与下一步：**足够输入且获准的初步查询可启动；完整群体和类别范围未知则不能关闭comprehensive。新party事件只触发相关coverage评估。

**角色体验的实际变化：**Ops不靠名字数量判断覆盖；可直接看到哪个主体/类别/数据源未查、未复核或过期。

**卡片、图示与产品如何呈现：**Population列表显示纳入依据、query readiness、inventory gap；Archify选择一个人时同时保留未确认群体。

**不变控制：**UI语言不切换名单范围；法规名单可用性与真正覆盖不同。

**需要验证的效果：**能否解释一条查询结束与完整筛查的区别？数据源失败是否不被算零命中？ 这不是已测量收益。

---


### 5.8 SCN-MATCH — 用相同证据处理Person T的一条疑似命中


**PPT Current：**M4.5在Ops；M4.6/.7在Financial Crime/Risk/Compliance；Current已做adjudication和risk decision。

**PPT Target：**M4.5–.7在Agentic lane，同时Ops review ambiguous、Financial Crime adjudicate material；记录执行与判断责任重叠须澄清。

**共同检查点：**Checkpoint1：同一possible match、证据不足；Checkpoint2：同一补充identity evidence已收到且对相应用途审阅，两侧都允许合理未决。

**共同输入：**Person T与SYN-PROVIDER-RECORD-C01同一输入/源时点；没有真实名单人员或额外幕后identity资料。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-MATCH-01<br>绑定命中与原始查询 | Ops处置screening hits。<br>角色：CLIENT FULFILMENT / KYC OPS | 固定subject/run/provider记录，准备比较上下文；不将同名alias误拆为多个人，也不无声删重复。<br>变化：Reassigned | 来源、版本及内容保持immutable；数据整理不作最终风险判断。 | ScreeningFinding.run_ref; ScreeningFinding.subject_snapshot_ref; ScreeningFinding.provider_snapshot_ref; ScreeningFinding.related_record_refs | IND-WOLFSBERG |
| D3-MATCH-02<br>属性对照 | 人员审阅相关客户与命中信息。<br>角色：CLIENT FULFILMENT / KYC OPS | 从当前claims生成name/DOB等对照，保留多值、精度和未知；展示每一值出处。<br>变化：Enhanced | 缺DOB不能显示不一致；一个不同日期/国籍不构成自动排除规则。 | AttributeComparison.subject_claim_refs; AttributeComparison.provider_claim_refs; AttributeComparison.precision; AttributeComparison.result | REG-DFAT-LIST |
| D3-MATCH-03<br>具体补证与请求 | Current Client lane已允许screening clarifications。<br>角色：CLIENT FULFILMENT / KYC OPS/SALES / RM (Front Office) | 复用B生成finding身份区分用途的新request item/版本；先使用获准既有源，仍不足才对外。<br>变化：Enhanced | 旧coordination grant不自动扩展个人身份证据范围，原two request items不被覆盖。 | RequestItem.finding_ref; RequestItem.purpose_code; AccessGrant.resource_scope; EvidenceUseAssessment.subject_ref | IB-ANZ-SECURE, IC-PHKL |
| D3-MATCH-04<br>准备复核包 | Ops做命中处置，现状资料拼接负担未量化。<br>角色：CLIENT FULFILMENT / KYC OPS | 产品组织证据摘要、差异、未知和相关请求；内容有引用，AI建议与已知事实分区。<br>变化：Enhanced | 大模型不能写默认通过rationale；人员需看所依赖材料。 | ReviewPack.input_manifest; ReviewPack.unresolved_refs; ReviewPack.prepared_by_type; Recommendation.basis_refs | IC-PHKL, IND-WOLFSBERG |
| D3-MATCH-05<br>风险与重大性 | Financial Crime/Risk/Compliance评估risk/materiality。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 产品准备风险context；模糊/重大finding流向相应人，保留具体action权限和hold范围。<br>变化：Retained | Target图不能被解释为所有风险决定自主化；权限未知不提供Record动作。 | RiskReview.materiality_status; RiskReview.permission_ref; Hold.action_scope; Hold.basis_ref | IND-WOLFSBERG |
| D3-MATCH-06<br>记录限定输入下的处置 | Financial Crime确定screening outcome。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 记录finding处置、理由、所审evidence和scope版本；必要additional approval独立。<br>变化：Enhanced | 允许unresolved/refer出口；记录动作与银行权限仍是演示配置。 | ScreeningReviewDecision.disposition; ScreeningReviewDecision.input_revision_refs; ScreeningReviewDecision.permission_ref; ScreeningReviewDecision.rationale | IND-WOLFSBERG, XB-FHIR-R5 |
| D3-MATCH-07<br>局部结果与整体影响 | 结果用于后续clearance prerequisite核对。<br>角色：CLIENT FULFILMENT / KYC OPS/FINANCIAL CRIME / RISK / COMPLIANCE | 只更新关联finding/coverage，再产生可解释snapshot；ownership群体、EDD、Legal/Credit未知继续存在。<br>变化：Enhanced | 不得写person.safe=true或case.cleared=true；Evidence later change只重评有依据的依赖。 | ScreeningCoverageItem.finding_refs; Decision.currency_status; ReadinessSnapshot.blocking_refs; AuditEvent.causation_ref | XB-FHIR-R5 |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-MATCH-01 | PPT-S1-SH296-A5 | PPT-S2-SH296-A5, PPT-S2-SH376-EX |
| D3-MATCH-02 | PPT-S1-SH296-A5 | PPT-S2-SH296-A5, PPT-S2-SH376-EX |
| D3-MATCH-03 | PPT-S1-SH296-A5, PPT-S1-SH292-A3, PPT-S1-SH9-A1, PPT-S1-SH292-A4 | PPT-S2-SH296-A5, PPT-S2-SH292-A3, PPT-S2-SH292-A4, PPT-S2-SH392-EX |
| D3-MATCH-04 | PPT-S1-SH296-A5 | PPT-S2-SH296-A5, PPT-S2-SH376-EX |
| D3-MATCH-05 | PPT-S1-SH177-A1 | PPT-S2-SH296-A6, PPT-S2-SH409-EX |
| D3-MATCH-06 | PPT-S1-SH177-A2 | PPT-S2-SH296-A7, PPT-S2-SH409-EX |
| D3-MATCH-07 | PPT-S1-SH177-A2, PPT-S1-SH65-A1 | PPT-S2-SH296-A7, PPT-S2-SH65-A1 |


**等待／恢复与下一步：**信息缺口分支回同一finding；权限不足移交同一review任务；不能以EDD处理替代重大制裁限制。

**角色体验的实际变化：**人员少拼接背景、多判断证据；RM/客户看到可披露的请求与进展而非内部风险全量。

**卡片、图示与产品如何呈现：**同一对照布局：类似/不同/未知；大弹窗内Comparison、Work、Impact、References；Product只正常标题Screening Review。

**不变控制：**source-comparison≠verified identity；排除该record≠whitelist永久；局部处置≠完整覆盖。

**需要验证的效果：**有资料缺口时是否正确停止？同一输入是否不会因Target按钮自动排除？ 这不是已测量收益。

---


### 5.9 SCN-EDD — 有独立原因的加强尽调及有权结果


**PPT Current：**M2.4识别EDD indicators；M5.1–.8由Financial Crime/Risk/Compliance开展。

**PPT Target：**M5.1–.8均在Agentic lane；新增Human M5.9 judgment/risk assessment、M5.10 approval；M5.3/.6/.7与新增人的边界必须解释。

**共同检查点：**同一risk context；默认不是强制高风险故事。required、not_required、unknown分别显示，不凭未展开分支就not_required。

**共同输入：**适用评估、风险问题、当时可用材料、政策/范围和权限，不额外给Target已批准结果。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-EDD-01<br>独立适用性 | 识别EDD indicators并调整要求。<br>角色：CLIENT FULFILMENT / KYC OPS | 创建独立applicability评估及trigger reason，缺依据保持unknown；风险变化触发复核。<br>变化：Enhanced | 一次false match排除不能写EDD not_required。 | EDDApplicabilityAssessment.applicability; EDDApplicabilityAssessment.trigger_refs; EDDApplicabilityAssessment.review_status | REG-AUSTRAC-EDD |
| D3-EDD-02<br>发起与分配 | Initiate & assign EDD case。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | required且scope明确后建立关联work和分配依据；owner未定显示Unassigned。<br>变化：Reassigned | 不为完成演示创造真实审批人或角色权限。 | EDDAssessment.applicability_ref; WorkItem.assignment_basis_ref; WorkItem.owner_ref | OUR：没有强行挂外部案例 |
| D3-EDD-03<br>编制证据包 | Compile EDD evidence pack。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 按具体风险问题关联claims、source、版本和未决项，生成可审阅材料包。<br>变化：Reassigned | 材料摘要不是风险批准；不能向无权角色展开受限信息。 | EvidencePack.revision; EvidencePack.risk_question_refs; EvidencePack.input_refs; EvidencePack.open_issues | IC-PHKL, XB-FHIR-R5 |
| D3-EDD-04<br>风险因素判断 | Assess evidencing risk factors。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 产品可准备证据与候选风险解释，M5.9有权人员判断实际意义并记录。<br>变化：Reassigned | 图中M5.3自动泳道不代替M5.9；保留“由谁判断”未决问题。 | EDDAssessment.risk_factor_refs; EDDAssessment.judgment_ref; EDDAssessment.assessor_permission_ref | REG-AUSTRAC-EDD |
| D3-EDD-05<br>关闭intelligence/证据缺口 | Close intelligence & gaps。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 依风险问题形成具体内部查询或获准客户请求；适用时分别关联SoF、SoW用途。<br>变化：Enhanced | 请求的是实际缺口，不统一复制长问卷。 | RiskQuestion.gap_refs; RequestItem.risk_question_ref; EvidenceUseAssessment.purpose_code | REG-AUSTRAC-SOF |
| D3-EDD-06<br>专家咨询 | Consult risk specialists。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 向相应专业角色发送最小必要context、问题、所需决定和返回位置。<br>变化：Enhanced | AI输出不能冒充专家回复；相关权限与hold检查保留。 | SpecialistConsultation.question_ref; SpecialistConsultation.response_ref; SpecialistConsultation.visibility_scope | OUR：没有强行挂外部案例 |
| D3-EDD-07<br>结果、条件与批准 | 决定EDD outcome/conditions并取得required approvals。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 拆开准备结果/风险判断/条件定义/授权批准/记录；每项指定输入包版本与decision scope。<br>变化：Reassigned | 不能用M5.7自动泳道删掉M5.10人的批准；conditions defined≠conditions fulfilled。 | EDDOutcome.decision_ref; EDDCondition.status; Approval.input_revision; Approval.authority_ref | REG-AUSTRAC-EDD |
| D3-EDD-08<br>交接结果 | Record & hand over EDD outcome。<br>角色：FINANCIAL CRIME / RISK / COMPLIANCE | 把结果和仍有效条件提供给QA/Readiness，按角色限制细节；无批准只发送pending投影。<br>变化：Enhanced | 不因EDD work closed让全案ready，条件持续与scope版本关联。 | EDDOutcome.handoff_event_ref; ClearanceCondition.origin_ref; ClearanceCondition.satisfied_by_refs | XB-FHIR-R5 |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-EDD-01 | PPT-S1-SH18-A4 | PPT-S2-SH18-A4 |
| D3-EDD-02 | PPT-S1-SH297-A1 | PPT-S2-SH297-A1 |
| D3-EDD-03 | PPT-S1-SH297-A2 | PPT-S2-SH297-A2 |
| D3-EDD-04 | PPT-S1-SH297-A3 | PPT-S2-SH297-A3, PPT-S2-SH410-A1 |
| D3-EDD-05 | PPT-S1-SH297-A4 | PPT-S2-SH297-A4, PPT-S2-SH392-EX |
| D3-EDD-06 | PPT-S1-SH297-A5 | PPT-S2-SH297-A5 |
| D3-EDD-07 | PPT-S1-SH297-A6, PPT-S1-SH297-A7 | PPT-S2-SH297-A6, PPT-S2-SH297-A7, PPT-S2-SH410-A1, PPT-S2-SH410-A2 |
| D3-EDD-08 | PPT-S1-SH297-A8 | PPT-S2-SH297-A8 |


**等待／恢复与下一步：**unknown→等待适用评估；required→针对性任务；材料/专家/批准未到保持等待；结果写回conditions非直接clearance。

**角色体验的实际变化：**专家少汇编证据包，更多处理风险问题与条件；客户只接受可解释、风险相关的补充。

**卡片、图示与产品如何呈现：**EDD仅一条条件轨道：applicability chip+理由+进入所需工作；不生成第二套大产品。

**不变控制：**EDD批准不覆盖制裁限制；具体SoF/SoW要求有适用依据，不能为两个空卡片强制填满。

**需要验证的效果：**能否回答为什么本案要EDD、要解决哪一风险问题，而不是“复杂所以多收资料”？ 这不是已测量收益。

---


### 5.10 SCN-CONFLICTS — 早期冲突检查与受限专业判断


**PPT Current：**M1信息触发M7.1–.4，Control Room进行搜索/调查/清除记录。

**PPT Target：**M7.1–.4在Agentic；Control Room有M7.5–.7；目标不是从“晚”到“早”的绝对新功能，而是更清楚的标准执行/异常判断分工。

**共同检查点：**同一M1关系信息，已具备自身input且无禁止hold时开始；Current同样已有early trigger。

**共同输入：**Entity A/B、产品/关系范围、获准search scope与相同返回候选。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-CONFLICTS-01<br>尽早发起 | 源图已明确M1信息触发conflict check。<br>角色：RMG CONTROL ROOM/SALES / RM (Front Office) | 对当前party/relationship输入建立work与trigger record，满足自身条件即可准备，不等待所有KYC。<br>变化：Enhanced | 因源图有early trigger，不把这一点称Target独有创新。 | ConflictReview.scope_revision; ConflictReview.trigger_basis_ref; ConflictReview.party_refs | XB-ACDM |
| D3-CONFLICTS-02<br>执行获准搜索 | Perform conflicts/NDA search。<br>角色：RMG CONTROL ROOM | 标准搜索通过获准工具执行/模拟，记录查询范围与结果时点，返回candidate和异常。<br>变化：Reassigned | source unavailable不能搜索成功；Current工具能力未知。 | ConflictReview.search_scope; ConflictSearch.result_status; ConflictSearch.source_ref | OUR：没有强行挂外部案例 |
| D3-CONFLICTS-03<br>调查与相关性判断 | Control Room investigate/resolve。<br>角色：RMG CONTROL ROOM | 产品准备相关context与重复候选，M7.5处理potential；区分candidate记录与实际专业结论。<br>变化：Reassigned | 图中M7.3自动执行不等于可以替人决定所有冲突。 | ConflictFinding.restricted_detail_ref; ConflictFinding.resolution_status; ConflictDecision.basis_refs | OUR：没有强行挂外部案例 |
| D3-CONFLICTS-04<br>升级和hold | 源过程包含resolve，但未展开所有升级条件。<br>角色：RMG CONTROL ROOM | 需要时按明确演示规则升级，记录范围、责任、等待及解除条件；无权限或影响不明不自动分配结论。<br>变化：Enhanced | 不要自动全停，也不能在case hold未知时宣称Legal/Credit可继续。 | Hold.target_refs; Hold.action_scope; Hold.release_condition_ref; Escalation.owner_ref | XB-ACDM |
| D3-CONFLICTS-05<br>确认与记录分开 | Record conflict clearance。<br>角色：RMG CONTROL ROOM | 有权者M7.7确认结果，产品M7.4记录对应decision和状态投影，更新相关准入条件。<br>变化：Enhanced | search complete≠clearance；源图权限分工待验证，演示角色明示。 | ConflictReview.decision_ref; ConflictReview.clearance_status; ClearanceCondition.current_basis_ref | XB-FHIR-R5 |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-CONFLICTS-01 | PPT-S1-SH312-A1, PPT-S1-SH20-A1 | PPT-S2-SH312-A1, PPT-S2-SH20-A1；struck_out |
| D3-CONFLICTS-02 | PPT-S1-SH312-A2 | PPT-S2-SH312-A2 |
| D3-CONFLICTS-03 | PPT-S1-SH312-A3 | PPT-S2-SH312-A3, PPT-S2-SH311-A1 |
| D3-CONFLICTS-04 | PPT-S1-SH312-A3 | PPT-S2-SH311-A2 |
| D3-CONFLICTS-05 | PPT-S1-SH312-A4 | PPT-S2-SH312-A4, PPT-S2-SH311-A3 |


**等待／恢复与下一步：**potential不等于已确认冲突；task/branch/case限制须有依据；未知impact不能标其他全可做。

**角色体验的实际变化：**Case Manager少追问笼统Pending，看到可披露理由与下一责任角色；Control Room保留敏感判断。

**卡片、图示与产品如何呈现：**跨阶段轨道，从M1触发锚点延至结果；选finding只给获准角色完整详情，其他只看permitted status。

**不变控制：**暂无已核实的完全同构银行Conflicts产品案例；流程根据PPT，事件协同仅跨行业启发。

**需要验证的效果：**能否分开search finished、potential investigation、authorised outcome和recorded clearance？ 这不是已测量收益。

---


### 5.11 SCN-LEGAL — 协议版本吸收专业输入并完成适用执行


**PPT Current：**C1.1–.8完整协议工作；C1.4要求时吸收Credit input。

**PPT Target：**仅C1.3明确从Draft required变Review drafted；生成方未说明。其余Legal活动仍有责任；版本联动是设计增强。

**共同检查点：**同一产品/法人/booking工作范围和Credit inputs；协议并不因为我们未显示金额就自动完成商业内容。

**共同输入：**同一协议需求、已有草稿、具体credit condition reference和现有审批/签字权限状态。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-LEGAL-01<br>Legal intake | 接收并建立Legal request。<br>角色：CGM LEGAL | 从共享scope取得法人/产品/booking及当前版本，缺少输入建立明确任务，不要求Legal反复从邮件拼接。<br>变化：Enhanced | 当前反复拼接程度是待验证痛点，不能伪称已实测。 | LegalRequest.scope_ref; LegalRequest.scope_revision; LegalRequest.input_gap_refs | IB-ISDA-CREATE |
| D3-LEGAL-02<br>确定协议与表单 | 确定required agreements/forms。<br>角色：CGM LEGAL | 将适用协议定义、主体、用途、版本与专业判断分开；未确认类型保持pending。<br>变化：Enhanced | 不根据产品标签自动套一套ISDA/担保/抵押文本。 | AgreementRequirement.definition_ref; AgreementRequirement.applicability; AgreementRequirement.basis_ref | IB-ISDA-CREATE |
| D3-LEGAL-03<br>草稿准备与审阅 | Current由Legal draft；Target写review drafted。<br>角色：CGM LEGAL | 显示草稿的真实来源（template/human/approved automation）及版本；未确定生成方时不承诺GenAI起草。<br>变化：Reassigned | 任何AI建议条款需对应review和批准，模型不作法律决定。 | LegalAgreement.draft_origin; LegalAgreement.template_revision; LegalAgreement.agreement_revision; DraftReview.status | IB-ISDA-CREATE |
| D3-LEGAL-04<br>纳入Credit条件 | 需要时Legal incorporates Credit；C2.6提供数据。<br>角色：CGM LEGAL/CREDIT | 条件记录有condition_spec_ref/current revision；逐项保存incorporation映射到协议章节/字段与review状态。<br>变化：Enhanced | C2.6在Target被划线，交接执行者待确认；先保留逻辑依赖而非宣称保留人工步骤。 | CreditCondition.condition_spec_ref; AgreementInput.credit_revision; ConditionIncorporation.agreement_revision; ConditionIncorporation.clause_ref | IND-BASEL-CCR, IB-ISDA-CREATE |
| D3-LEGAL-05<br>协商与变更 | Negotiate agreement terms。<br>角色：CGM LEGAL | 记录每个有效草稿、反馈和变更；识别哪些变更触及Credit条件或scope，回到具体review。<br>变化：Enhanced | 不要求客户与银行共看全部内部意见；变更影响未知不得无提示继续。 | NegotiationChange.changed_clause_refs; NegotiationChange.visibility; AgreementRevision.supersedes_ref; ChangeImpact.review_refs | IB-ISDA-CREATE |
| D3-LEGAL-06<br>最终内部审批与Credit检查 | Legal internal review/approvals；Credit final agreement/data review。<br>角色：CGM LEGAL/CREDIT | 批准绑定明确协议版本与条件输入版本；适用的Credit最终检查完成才允许相关下游，保持与初次Credit批准分开。<br>变化：Enhanced | C2.7划线含义未定，先记录控制目的和执行者问题；不做循环“要先签才审、先审才签”。 | AgreementApproval.agreement_revision; CreditAgreementReview.input_revision; CreditAgreementReview.status; Approval.authority_ref | IND-BASEL-CCR |
| D3-LEGAL-07<br>执行协议 | Execute agreements。<br>角色：CGM LEGAL | 只有协议当前版本、所需批准、实际签字权限及hold条件成立才记录执行；关联执行证据。<br>变化：Enhanced | Person T coordination权限不自动成为signatory；缺实际授权事件保持pending。 | ExecutionRecord.agreement_revision; ExecutionRecord.signatory_authority_refs; ExecutionRecord.executed_at; ExecutionRecord.evidence_ref | IB-ISDA-CREATE |
| D3-LEGAL-08<br>条款与执行文件保存 | Capture key terms and store executed docs。<br>角色：CGM LEGAL | 保存signed artifact版本/hash引用及关键条款的来源位置；下游条件消费结构化字段同时保留原件。<br>变化：Enhanced | 存储成功不能反向证明签署授权/有效性；没有原件不生成虚构成功记录。 | ExecutedDocument.content_ref; KeyTerm.source_locator; LegalAgreement.executed_document_ref; AuditEvent.ref | IB-ISDA-CREATE, XB-FHIR-R5 |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-LEGAL-01 | PPT-S1-SH330-A1 | PPT-S2-SH330-A1 |
| D3-LEGAL-02 | PPT-S1-SH332-A1 | PPT-S2-SH332-A1 |
| D3-LEGAL-03 | PPT-S1-SH334-A1 | PPT-S2-SH334-A1 |
| D3-LEGAL-04 | PPT-S1-SH336-A1, PPT-S1-SH326-A1 | PPT-S2-SH336-A1, PPT-S2-SH326-A1；struck_out |
| D3-LEGAL-05 | PPT-S1-SH338-A1 | PPT-S2-SH338-A1 |
| D3-LEGAL-06 | PPT-S1-SH340-A1, PPT-S1-SH328-A1 | PPT-S2-SH340-A1, PPT-S2-SH328-A1；struck_out |
| D3-LEGAL-07 | PPT-S1-SH342-A1 | PPT-S2-SH342-A1 |
| D3-LEGAL-08 | PPT-S1-SH344-A1 | PPT-S2-SH344-A1 |


**等待／恢复与下一步：**可用基础输入足够可准备；final review/执行仍等所需Credit数据、实际协议版本批准、签字权和适用hold。

**角色体验的实际变化：**Legal少找最新附件、多确认当前条款；RM能解释等待的是签署还是条款，不直接获得受限文本。

**卡片、图示与产品如何呈现：**Condition Detail为主，展开条款引用和版本链；Archify聚焦Credit inputs→实际agreement revision→review/execute，不做完整谈判系统。

**不变控制：**不预设本FX业务必须ISDA Master；不以DocuSign完成推导有效签署授权；draft来源未知明示。

**需要验证的效果：**能否指出哪项Credit条件进入哪个协议版本、谁审核、签署记录针对哪个版本？ 这不是已测量收益。

---


### 5.12 SCN-CREDIT — 信用评估、批准、条件落实与协议数据分开


**PPT Current：**C2.1–.7独立Credit工作并行，输出条件及Legal输入。

**PPT Target：**Target C2.1/.2/.6/.7和generic credit need被划线，C2.5仅Obtain划线；C2.3/.4保留。划线不等于该控制被正式取消。

**共同检查点：**同一FX意图和金融/敞口资料；无实际演示输入包不能假设分析或金额已经获批。

**共同输入：**本次产品/法人/booking、已建模credit applicability、真实合成financial/exposure snapshot及审批fixture。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-CREDIT-01<br>判断信用工作是否适用 | Determine credit requirement。<br>角色：CREDIT | 基于当前scope创建适用性及依据；对划线活动标“目标执行归属待确认”，不能从数据库删掉控制目的。<br>变化：Enhanced | 不因没有授信金额画面便假定Credit不需要。 | CreditAssessment.applicability; CreditAssessment.applicability_basis; ApplicabilityReview.status | IND-BASEL-CCR |
| D3-CREDIT-02<br>取得金融与敞口资料 | Retrieve & validate financial/exposure data。<br>角色：CREDIT | 组织来源、财务期间、币种、报告实体和敞口时点；未建模所需资料保持缺口，数据抽取可准备不可自证。<br>变化：Enhanced | Target划线去向未明；没有实际数据不宣称完整信用分析已完成。 | FinancialSnapshot.period; FinancialSnapshot.reporting_entity_ref; ExposureSnapshot.as_of; CreditAssessment.input_manifest | IND-BASEL-CCR |
| D3-CREDIT-03<br>交易对手风险判断 | Assess counterparty credit risk。<br>角色：CREDIT | 产品提供整理/核对/来源视图及可用的风险分析结果；Credit作相应判断，保存所用资料版本。<br>变化：Retained | 无模型评估证据不新建信用评分承诺；不把利润或熟悉度当批准依据。 | CreditAssessment.risk_assessment_ref; CreditAssessment.assessor_ref; CreditAssessment.input_revision_refs | IND-BASEL-CCR |
| D3-CREDIT-04<br>定义额度与条件 | Determine credit limit & conditions。<br>角色：CREDIT | 条件定义、约束范围、适用产品和满足证据各自记录；本轮不展示未研究金额，使用有边界的合成documentation condition。<br>变化：Enhanced | condition approved与fulfilled独立；空payload不能支撑“已纳入协议”的真假判断。 | CreditCondition.definition_ref; CreditCondition.condition_spec_ref; CreditCondition.approval_status; CreditCondition.fulfilment_status | IND-BASEL-CCR |
| D3-CREDIT-05<br>批准记录 | Obtain credit approval；Target仅Obtain划线。<br>角色：CREDIT | 显示有权审批记录/条件包/输入版本；产品记录或收集审批，不把approval从控制中删掉。<br>变化：Enhanced | 真实权限仍未验证；模型或动画不能批准信用。 | CreditDecision.approval_ref; CreditDecision.permission_ref; CreditDecision.conditions_revision; CreditDecision.effective_scope | OUR：没有强行挂外部案例 |
| D3-CREDIT-06<br>交给Legal | 向Legal提供Credit Agreement data。<br>角色：CGM LEGAL/CREDIT | 结构化交接条件包及source revision，记录Legal所消费版本和未满足项；输入变更触发定向review。<br>变化：Enhanced | 保留Target划线来源疑问；不默认实时集成已存在。 | AgreementInput.source_decision_ref; AgreementInput.credit_revision; AgreementInput.acknowledged_by_ref; DependencyEdge.consumer_ref | XB-NIST-THREAD, IND-BASEL-CCR |
| D3-CREDIT-07<br>适用的最终协议核对 | Review/approve final agreement & data。<br>角色：CGM LEGAL/CREDIT | 把最终协议版本核对与初次Credit审批分成记录；条款改动按规则影响相关review的currency。<br>变化：Enhanced | Target划线不能无声去掉；需确认由谁/什么控制替代，不人为无条件阻塞全部Legal。 | CreditAgreementReview.agreement_revision; CreditAgreementReview.credit_input_revision; CreditAgreementReview.currency_status; CreditAgreementReview.decision_ref | IND-BASEL-CCR |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-CREDIT-01 | PPT-S1-SH316-A1 | PPT-S2-SH316-A1；struck_out |
| D3-CREDIT-02 | PPT-S1-SH318-A1 | PPT-S2-SH318-A1；struck_out |
| D3-CREDIT-03 | PPT-S1-SH320-A1 | PPT-S2-SH320-A1 |
| D3-CREDIT-04 | PPT-S1-SH322-A1 | PPT-S2-SH322-A1 |
| D3-CREDIT-05 | PPT-S1-SH324-A1 | PPT-S2-SH324-A1；partial_strike_Obtain_only |
| D3-CREDIT-06 | PPT-S1-SH326-A1, PPT-S1-SH336-A1 | PPT-S2-SH326-A1, PPT-S2-SH336-A1；struck_out |
| D3-CREDIT-07 | PPT-S1-SH328-A1, PPT-S1-SH340-A1 | PPT-S2-SH328-A1, PPT-S2-SH340-A1；struck_out |


**等待／恢复与下一步：**适用性未知先待评估；数据不足不算信用通过；初次风险批准与最终协议核对分开才能避免循环依赖。

**角色体验的实际变化：**Credit少重复传输数据/找版本，保留风险判断；Legal得到可解释的条件包而非一个approved字。

**卡片、图示与产品如何呈现：**一个Condition Detail，审批记录、条件状态、Legal使用版本分层；无金额不放假数值，不另建信用授信系统。

**不变控制：**不把strikethrough默认为legal elimination；Credit not_required不显示Approved。

**需要验证的效果：**能否区分批准某项条件、将条件写入协议、条件实际满足三个事实？ 这不是已测量收益。

---


### 5.13 SCN-QA — 从具体检查项回到具体补正


**PPT Current：**M6.1–.8包含完整性、来源、用途、cross-check、gap、re-review、QA signoff；Current已支持补正。

**PPT Target：**全部M6在Agentic lane，M6.8也在其中。演示保留有权QA确认是控制假设，必须清楚区别源图和提案。

**共同检查点：**同一ownership资料存在、用途评估未建立充分性。它可能是评估记录缺失，不一定资料本身无效。

**共同输入：**实际requirement set、当前evidence用途、screening/EDD outcome、专业条件与scope版本。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-QA-01<br>确认QA范围 | Confirm applicable requirements/CIPs。<br>角色：QA TEAM (explicit label inside source block) | 固定本次QA采用的scope/requirement set/policy引用及check manifest；未知适用项留问题。<br>变化：Enhanced | 空check列表/加载失败不能“全部通过”。 | QAReview.scope_revision; QAReview.requirement_set_revision; QAReview.check_manifest_ref; QAReview.manifest_status | OUR：没有强行挂外部案例 |
| D3-QA-02<br>完整性检查 | Check completeness。<br>角色：QA TEAM (explicit label inside source block) | 规则检查真正需要的资料/字段/评估是否存在，把缺失对象指明。<br>变化：Reassigned | 文件数量齐全不等于业务完整；本轮规则来自审阅配置。 | QACheck.check_type; QACheck.expected_input_refs; QACheck.missing_refs; QACheck.result | OUR：没有强行挂外部案例 |
| D3-QA-03<br>来源有效性 | Validate evidence sources。<br>角色：QA TEAM (explicit label inside source block) | 显示原始出处、取得方式、资料时点、内容版本与源审核依据；冲突或无来源保留未决。<br>变化：Enhanced | public source不自动可信，intake released也不是source validity。 | QACheck.source_check_ref; QACheck.evidence_revision_refs; QACheck.currency_basis_refs | XB-FHIR-R5 |
| D3-QA-04<br>用途充分性检查 | Assess evidence sufficiency。<br>角色：QA TEAM (explicit label inside source block) | 校验subject/requirement/purpose是否有当前评估；缺assessment记录用assessment_missing reason，不武断作evidence_invalid。<br>变化：Enhanced | 充分性需要实际依据/权限，模型不能为流程收口填sufficient。 | QACheck.evidence_use_ref; QACheck.reason_code; QACheck.basis_refs; EvidenceUseAssessment.sufficiency | REG-AUSTRAC-CDD |
| D3-QA-05<br>交叉核对适用结果 | Cross-check screening & EDD conditions。<br>角色：QA TEAM (explicit label inside source block) | 核对群体范围、查询覆盖、finding处置、EDD适用性/条件及相关输入版本；专业条件范围在方案中注明扩展。<br>变化：Enhanced | 未知EDD不可省略；KYC QA是否负责Legal/Credit全面审查需验证，readiness另有专业条件汇合。 | QACheck.screening_condition_ref; QACheck.edd_condition_refs; QACheck.reviewed_input_revisions | OUR：没有强行挂外部案例 |
| D3-QA-06<br>发出精确gap | Identify & issue gaps。<br>角色：QA TEAM (explicit label inside source block) | 关联具体QA observation至既有或新Gap和负责人；能补评估就不自动向客户重索文件。<br>变化：Enhanced | 记录缺失不必正式药品CAPA；不复制整案任务。 | QAFinding.related_gap_ref; Remediation.required_action; Remediation.owner_ref; Remediation.affected_refs | XB-ICH-Q10, IC-PHKL |
| D3-QA-07<br>重审补正 | Re-review remediated items。<br>角色：QA TEAM (explicit label inside source block) | 补正resolution独立于QA recheck；重审新证据/评估版本并保留原检查历史。<br>变化：Enhanced | 补正标completed不能自动QA passed；未知影响先调查不全清空。 | Remediation.resolution_refs; QACheck.recheck_revision; QACheck.supersedes_ref; QACheck.reviewed_by_ref | XB-ICH-Q10 |
| D3-QA-08<br>QA签核/记录 | QA TEAM Provide QA sign-off。<br>角色：QA TEAM (explicit label inside source block) | 标准检查由产品完成；演示以明确权限fixture确认QA review并记录，UI标模型边界外的bank validation问题。<br>变化：Reassigned | Target M6.8在Agentic lane，不宣称PPT本来就有最终人工QA；真实问责/自动记录策略待定。 | QASignoff.review_manifest_ref; QASignoff.permission_ref; QASignoff.input_revision_refs; QASignoff.recorded_at | OUR：没有强行挂外部案例 |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-QA-01 | PPT-S1-SH298-A1 | PPT-S2-SH298-A1 |
| D3-QA-02 | PPT-S1-SH298-A2 | PPT-S2-SH298-A2 |
| D3-QA-03 | PPT-S1-SH298-A3 | PPT-S2-SH298-A3 |
| D3-QA-04 | PPT-S1-SH298-A4 | PPT-S2-SH298-A4 |
| D3-QA-05 | PPT-S1-SH298-A5 | PPT-S2-SH298-A5 |
| D3-QA-06 | PPT-S1-SH298-A6 | PPT-S2-SH298-A6 |
| D3-QA-07 | PPT-S1-SH298-A7 | PPT-S2-SH298-A7 |
| D3-QA-08 | PPT-S1-SH298-A8 | PPT-S2-SH298-A8 |


**等待／恢复与下一步：**未有权signoff、未审阅相关check、输入过时都保持等待；针对已有Gap追加QA observation，不重复派单。

**角色体验的实际变化：**QA从重新找材料变为核对明确的检查依据与缺口；Ops直接看到需要补评估还是补资料。

**卡片、图示与产品如何呈现：**QA Remediation Detail：要求/资料/用途/观察/责任/动作/recheck；Compare不能把Current做成整案重跑，因为PPT已给re-review。

**不变控制：**缺检查结果≠pass；无gap≠自动signoff；QA循环与最终readiness不能形成逻辑环。

**需要验证的效果：**能否区分资料不足与评估缺失？完成补正后是否仍需要re-review？ 这不是已测量收益。

---


### 5.14 SCN-READINESS — 明确哪些条件真正满足、哪些仍在阻塞


**PPT Current：**M8.1核实全部required clearance prerequisites；Current也有最终核对能力。

**PPT Target：**M8.1移入Agentic。持续structured state原则两页都有；精确snapshot与closed manifest是本方案细化。

**共同检查点：**同一scope与当时实际conditions；不能Current卡在Legal未签，Target直接换成所有签完。

**共同输入：**完整适用条件清单、来源/决定/版本、QA结果、专业条件、有效hold和实际unknown。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-READINESS-01<br>完整适用条件manifest | 核对all required prerequisites和QA scope。<br>角色：QA TEAM (explicit label inside source block)/CLIENT FULFILMENT / KYC OPS | 从当前CaseScope与已审阅规则装配expected condition manifest，标完整性、适用性和缺失项。<br>变化：Enhanced | 空集/加载失败/未建模条件不允许无阻塞即ready。 | ConditionManifest.expected_refs; ConditionManifest.completeness_status; ConditionManifest.scope_revision; ConditionManifest.unknown_refs | OUR：没有强行挂外部案例 |
| D3-READINESS-02<br>分层聚合而不混淆 | 核实各前置条件完整。<br>角色：CLIENT FULFILMENT / KYC OPS | Requirement/evidence使用与专业事实分别产出condition；QA在已定义scope检查它们；最后readiness聚合。<br>变化：Enhanced | 不要让QA等待最终Ready而Ready又等QA；Credit批准记录不替代条件落实。 | ClearancePrerequisite.condition_refs; ClearancePrerequisite.status; ReadinessSnapshot.prerequisite_refs | XB-ACDM |
| D3-READINESS-03<br>版本与hold核验 | PPT未给具体版本字段。<br>角色：CLIENT FULFILMENT / KYC OPS | 逐项检查scope/decision/evidence/agreement/currency与hold；对stale输入生成具体复核项。<br>变化：Proposed addition | 检测stale不是自动撤销已执行协议；维持历史并阻止本轮未经验证的ready。 | ReadinessSnapshot.input_manifest; ReadinessSnapshot.hold_refs; ReadinessSnapshot.stale_refs; ReadinessSnapshot.unknown_refs | XB-NIST-THREAD, XB-FHIR-R5 |
| D3-READINESS-04<br>阻塞、责任与下一步 | 当前可能依系统和人确认，具体状态显示未给。<br>角色：CLIENT FULFILMENT / KYC OPS | 产生scope-specific snapshot，显示每个blocker的工作、owner、缺失输入和resume condition；敏感详情按角色投影。<br>变化：Enhanced | unassigned真实显示，不编造人员；不使用82%等未测量/误导准入百分比。 | ReadinessSnapshot.blocking_refs; ClearanceCondition.owner_ref; ClearanceCondition.next_action_ref; ClearanceCondition.allowed_summary | XB-ACDM, IC-PHKL |
| D3-READINESS-05<br>准备好与有权确认分开 | prerequisites与confirm/record本来是不同步骤。<br>角色：CLIENT FULFILMENT / KYC OPS | 条件完整且当前有效时给Ready for authorised confirmation；record权限另查，无权限依然不能confirm。<br>变化：Enhanced | Readiness calculation不赋予最终权限；没有模拟authorization fixture保持可讲解的待确认态。 | ReadinessSnapshot.calculation_result; ClearanceDecision.authority_ref; ClearanceDecision.readiness_snapshot_ref | XB-ACDM |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-READINESS-01 | PPT-S1-SH65-A1, PPT-S1-SH298-A1 | PPT-S2-SH65-A1, PPT-S2-SH298-A1 |
| D3-READINESS-02 | PPT-S1-SH65-A1 | PPT-S2-SH65-A1 |
| D3-READINESS-03 | PPT-S1-SH65-A1 | PPT-S2-SH65-A1 |
| D3-READINESS-04 | PPT-S1-SH65-A1 | PPT-S2-SH65-A1 |
| D3-READINESS-05 | PPT-S1-SH65-A1, PPT-S1-SH65-A3 | PPT-S2-SH65-A1, PPT-S2-SH65-A3 |


**等待／恢复与下一步：**任何适用条件不满足、适用性未知、数据过时、manifest不完整或有禁止hold，则不能Ready。

**角色体验的实际变化：**Case Manager可直达阻塞对象与责任，不靠任务百分比；专家不必向所有人公开敏感原因。

**卡片、图示与产品如何呈现：**Clearance页按条件分组reason/owner/next action；Target先呈现相同未完成结果，再可回业务节点处理。

**不变控制：**不是向银行承诺完整法律准入模型；expected condition manifest本身待验证，演示配置明确。

**需要验证的效果：**能否证明没有漏掉应检查条件，而不仅“列出来的都绿”？ 这不是已测量收益。

---


### 5.15 SCN-PUBLISH — 最终记录、发布时间和客户结果分开


**PPT Current：**M8.2 finalise/link，M8.3 confirm/record，M8.4 timestamp在Ops，M8.5 RM沟通。

**PPT Target：**M8.2–.4在Agentic，M8.5仍RM。独立Human authorisation角色、publication transport/ack是明确设计增强，不是PPT的额外原码。

**共同检查点：**同一当前scope和已完成实际前置条件；对照时不由Target按钮补上未经发生的审批或协议执行。

**共同输入：**ReadinessSnapshot、输入fingerprint、授权record、recipient/channel policy及实际mock capability。


| 变更／工作 | Before具体工作 | After具体调整（方案提案） | 判断与控制边界 | 字段／记录候选 | 参考依据（不是银行规则） |
|---|---|---|---|---|---|
| D3-PUBLISH-01<br>案件完结与支撑包 | Finalise case & link supporting outputs。<br>角色：CLIENT FULFILMENT / KYC OPS | 形成可追溯的结果包manifest，连接scope、professional decisions、QA与资料版本，不复制全量私密内容到RM。<br>变化：Reassigned | workflow phase终止不是所有后续控制失效；保留当前未发布状态。 | ClearancePack.manifest_ref; ClearancePack.scope_revision; ClearancePack.supporting_output_refs | XB-FHIR-R5 |
| D3-PUBLISH-02<br>有权确认与记录 | Confirm/record cleared-to-trade status。<br>角色：CLIENT FULFILMENT / KYC OPS | 将判断/授权与产品记录拆分；以current snapshot和expected revisions执行合成确认，记录结果范围。<br>变化：Reassigned | Target自动lane与实际authority不等价；权限验证未做生产认证；stale输入保留draft并返回复核。 | ClearanceDecision.decision_scope; ClearanceDecision.authority_ref; ClearanceDecision.input_fingerprint; ClearanceDecision.recorded_at | IC-PHKL, XB-ACDM |
| D3-PUBLISH-03<br>时间语义 | Record clearance timestamp。<br>角色：CLIENT FULFILMENT / KYC OPS | 分别保留decision记录时点、如有配置的生效时点、下游发布时点和接收观察。<br>变化：Enhanced | 页面打开时间不是批准时间；不得伪造未来或provider成功回执。 | ClearanceDecision.recorded_at; ClearanceDecision.effective_at; PublicationEvent.published_at; Acknowledgement.observed_at | XB-GS1 |
| D3-PUBLISH-04<br>Structured status下游发布 | 源图指下游系统及状态记录；具体transport未给。<br>角色：CLIENT FULFILMENT / KYC OPS | 在获准目标和scope内发布版本化状态；queued/sent/acknowledged/failed分开，失败保留decision并支持幂等重试。<br>变化：Proposed addition | 不是生成真实交易、SMR或监管报告；未接服务标local simulation。 | PublicationEvent.target_refs; PublicationEvent.payload_scope; PublicationEvent.transport_status; PublicationEvent.idempotency_ref | XB-GS1, XB-IATA |
| D3-PUBLISH-05<br>RM/客户结果沟通 | RM沟通outcome与next steps。<br>角色：SALES / RM (Front Office) | 依据允许投影生成清楚的实体/产品/范围与下一步通知；RM保留关系解释，系统可按获准配置发送标准通知。<br>变化：Enhanced | 客户通知不能隐瞒仍影响准入的条件，也不披露内部受限原因；receipt不等于同意。 | OutcomeCommunication.recipient_ref; OutcomeCommunication.allowed_scope; OutcomeCommunication.dispatch_status; InteractionRecord.ref | IB-ANZ-SECURE, IC-PHKL |


**PPT行级链接：**


| Change | Current occurrence | Target occurrence／格式 |
|---|---|---|
| D3-PUBLISH-01 | PPT-S1-SH65-A2 | PPT-S2-SH65-A2 |
| D3-PUBLISH-02 | PPT-S1-SH65-A3 | PPT-S2-SH65-A3 |
| D3-PUBLISH-03 | PPT-S1-SH65-A4 | PPT-S2-SH65-A4 |
| D3-PUBLISH-04 | PPT-S1-SH65-A3, PPT-S1-SH65-A4 | PPT-S2-SH65-A3, PPT-S2-SH65-A4 |
| D3-PUBLISH-05 | PPT-S1-SH289-A1 | PPT-S2-SH289-A1 |


**等待／恢复与下一步：**不当前/无权不confirm；已确认但publish失败保留decision，说明各target状态与安全retry。

**角色体验的实际变化：**人看到确认范围，产品执行记录和受控通知；RM解释允许的结果，不手工扩大准入范围。

**卡片、图示与产品如何呈现：**Clearance正常产品标题；决定、发布、客户沟通三块小状态；成功不跳烟花页面，不出现Trade executed。

**不变控制：**无真实交易/报告发送；版本过时不悄悄重用旧授权；发布不是无条件客户可交易的独立技术证明。

**需要验证的效果：**能否回查谁基于哪版证据确认哪个实体/产品，并区分未送达的下游？ 这不是已测量收益。

---


## 6. Studio中的实际呈现与交互

### 6.1 主矩阵：简短但可追溯

每个场景卡首层最多：动作标题、一个业务问题、Process ID、一个必要状态。变化类型最多突出一两项，引用数量显示小`R`标记。完整工作条目在场景内展开，不铺满大矩阵。

- 五阶段是阅读坐标；Legal/Credit/Conflicts跨阶段，源图的早启动在Current与Target两边都保留。
- Current/Target使用同一场景锚点/角色位置；允许活动多对一或重分工，不要求所有节点一一同数。
- 状态的颜色、执行者icon、source标签与变化标签各自独立；Target不自动绿色、Human不自动红色、Hypothesis不等于风险高。
- Current未核实的系统步骤显示“工作表达/待验证”，不能生成假银行截图作为实证。

### 6.2 场景弹窗

默认单面Current或Target，点击Compare才看同检查点的并列差异。已有标签可采用：场景、Work & dependencies、Fields、References；不因D3增加新的门户或多层侧边栏。

每个After条目可展开四行：
1. **PPT怎么说：**原码、页码、actor与句子；格式歧义明确。
2. **参考观察：**行业/跨行业/内部案例实际支持什么。
3. **本项目调整：**我们如何迁移到这一个工作/字段/界面。
4. **不可推断：**来源不能证明的权限、系统、时效或收益。

从流程节点的小R进入相同弹窗的References标签，保留选中节点。全局Reference入口仍是Studio次级阅读区，不能成为第三主入口。

### 6.3 Prototype与返回

- Product标题沿用Scope / Parties / Authority / Requirements / Evidence / Requests / Screening / Condition Detail / QA Review / Clearance等普通名称。
- 没有“看看AI如何帮助你”等引导副标题。小i仅解释术语，hover/focus/tap均可用；缺资料、权限错误、保存失败直接可见。
- Current场景进入产品的按钮明确`View target product`。返回恢复原Current比较位置，但不回滚已保存的Target会话。
- 返回上下文包含case、scope、scene、role、stage、trigger、comparison checkpoint、选中node、viewport/zoom、story cursor、tab。最新language preference优先于旧返回token。
- 有未保存编辑：Save draft / Discard changes / Stay。Save失败仍留当前页并保留输入。
- Browser Back只走有意义层级，不为每帧播放或每次平移添加历史。
- 业务版本在离开期间变化：回原语义位置并说明版本差异，不静默恢复旧决定。

### 6.4 图片、动效和Archify

D3以升级既有A–F图为主，不新增十五张独立大图。每个已存在DG节点绑定本稿change_id和source refs。

- Archify图：用原生skill生成，Current/Target保留Input、Decision、Output等共同锚点；区分start/data dependency/condition contribution，不能所有边同义。
- 比较播放：用户主动播放；只突出重分工/新增关联的片段。证据不足和人工判断处暂停，允许未决返回；不能Next自动批准。
- 语义zoom：Overview减少文字，Read保留正常字号，Focus在场景或图中聚焦。不可把数百字缩小到看不清。
- Persona和场景图：沿用人物与环境；不以Current阴暗/混乱、Target闪光科技来伪造差距。业务文字由HTML负责，不烘焙进图片。
- 媒体缺失：静态业务关系、文字和状态仍可理解；不出现无功能Play。
- 打印：选定同一场景/checkpoint生成Current/Target对照；附场景/角色/过程/来源及未决项，完整选定数据不是只打印视窗DOM。

### 6.5 可用于每个After条目的实际角标示例

> M3.3 / Target process map — 产品执行请求。  
> ING DOOR / Industry example — RM协调、指定用户数字提交。  
> Our proposal — 本案采用RequestItem级Grant、独立dispatch/submission/assessment状态。  
> Limit — ING公开页面不能证明本案权限模型，也不是澳洲客户当前系统。

引用标签只说明依据，不授予业务批准；客户任务区不显示内部研究标签或受限文件链接。

## 7. 使最终After结局成立的Closure Manifest

**下表不是新故事或新工作台，而是禁止E用几条完成动画补齐所有控制的校验表。**若任何一项在合成输入中缺少已审阅依据，场景可以停在Not Ready；不要为讲完故事而编造批准。


| ID／领域 | 需成立的具体业务依据 | 所需记录链 | 关联场景 |
|---|---|---|---|
| CL-01 Scope/产品/booking | 当前Scope、银行booking context及本次产品资格有适用依据；不是只写FX intent。 | scope/product对应决定或审阅fixture | SCN-SCOPE |
| CL-02 Ownership/control | 所需关系资料到达且用途评估完成；B保留的缺口真正关闭。 | submission→intake→assessment→gap result | SCN-VALIDATE |
| CL-03 筛查群体与覆盖 | 完整适用群体/类别确认；所需查询实际有结果，或有明确旧结果reuse评估；所有需处置项已适当处理。 | population revision→plan→run/result→review/currency | SCN-POPULATION |
| CL-04 EDD适用性 | 实际applicability decided；required则相应判断、批准和条件有结果；not_required有依据。 | EDDApplicabilityAssessment / EDDAssessment | SCN-EDD |
| CL-05 Conflicts | 合适角色确认当前scope对应结果并记录，无未解除相关hold。 | ConflictDecision+record+hold assessment | SCN-CONFLICTS |
| CL-06 Credit及条件 | 审批记录、条件定义、对协议/其他前置条件的履行/符合性分别成立。 | CreditDecision+Condition fulfilment/current-input review | SCN-CREDIT |
| CL-07 协议/签署 | 适用协议当前版本已满足批准与执行前提；签字授权来自具体主体/动作的依据，不继承Person T协同权限。 | current AgreementRevision+approvals+signatory authority+execution artifact | SCN-LEGAL |
| CL-08 QA | 本次check manifest完整，观察项与补正分别闭环；QA实际重审与signoff有当前依据。 | QAReview / QASignoff current input manifest | SCN-QA |
| CL-09 整体控制 | expected-condition manifest完整、无未知适用性、无未解决关键状态、无禁止hold或未评估影响。 | ConditionManifest+ReadinessSnapshot inputs | SCN-READINESS |
| CL-10 授权与发布 | 有权角色对当前snapshot确认；发布目标/内容/状态另存，无伪造provider回执。 | ClearanceDecision then PublicationEvent | SCN-PUBLISH |


## 8. D3变更记录的字段合同

D2的业务字段不在此推倒重建；本表是“比较与设计追溯”的内容层，不是新的银行业务数据库。


| 字段／组 | 类型 | 含义与约束 |
|---|---|---|
| change_id | stable string | 保留D3记录ID，映射到既有scenario，不替换业务ID。 |
| scenario_id / comparison_checkpoint | refs | 同一场景同一业务时点；不是播放耗时。 |
| common_input_manifest | versioned refs | 共同主体/证据/查询数据/政策context。新获取信息必须有双方可比来源与事件，不能隐藏增益。 |
| current_source_refs / target_source_refs | source occurrence refs[] | PPT页+shape+occurrence；无直接源对应时为空并写明extension reason。 |
| current_actor / target_actor_in_map | role refs / source labels | 保留PPT分配；演示角色分配与正式问责分开。 |
| after_proposal | localised rich text | 按动作、字段、判断、输出编制，不写空泛AI enhanced。 |
| change_type | enum | Retained / Reassigned / Enhanced / Proposed addition，非风险/证据标签。 |
| benchmark_refs | refs[] | 只关联真正支持的机制；无参考允许空。 |
| benchmark_observation / design_interpretation | separate text | 事实与迁移推论分开；各有来源和边界。 |
| human_or_rule_boundary | object/action guard refs | 具体谁做什么、何时停止、什么条件恢复。缺权限不执行。 |
| field_deltas / event_refs | typed field + event refs | 沿用D2模型；不假设Current系统完全没有这些字段。 |
| control_invariants | assertions[] | 输入/控制目标/决策/数据可见性不因比较切换而松动。 |
| wait_resume_contract | work/condition/owner refs | 等什么字段、哪份结果、谁确认、恢复事件与返回对象。 |
| value_hypothesis / validation_question | text | 用户少做什么或更清楚什么；无测量不填百分比。 |
| diagram_node_refs / media_refs | asset refs[] | Actual Archify节点/图/媒体版本与场景绑定；缺素材静态可用。 |
| approval_status | typed metadata | proposal / approved_for_demo / bank_validated分别凭真实确认记录；此稿为detailed-review。 |


## 9. 交给Codex时的使用方式

这是一份**内容与追溯的详细评审基线**，不是替未知本地工程编造代码行号的执行脚本。

1. 读取当前A–F及本稿，先输出“源歧义／跨稿冲突／新增展示字段”三个清单。源歧义不通过改PPT消除。
2. 按既有registry映射15个Scenario和本稿change_id。JSON中的source occurrence为源索引，不替换既有Process ID。
3. 将每个变更挂入existing scenario.current/target/transformations字段或等价结构；不要创建一份独立不受版本控制的After数据库。
4. 把各reference映射到既有source registry；保留官方文档版本/市场，PHKL标internal-design，不去重为同一bank implementation。
5. 先制作SCN-GAP与SCN-MATCH的同检查点对比并人工review，再按同一模板扩到全部场景；原有业务逻辑与权限继续走确定性测试。
6. 所有出现的图由本机Archify负责。将变更标记和references绑定已存在的DG节点，优先复用已有图而非新画图墙。
7. 影响源数据/枚举/权限或完成路径的建议只按明确确认流程落地，保留历史与migration mapping。尤其不要直接使用F的review_required作为applicability第四值。
8. 实际验证：所有PPT源活动可回查、每个After条目有来源类别、相同输入对比不偷换、切换不写业务状态、所有返回/语言/打印投影正确。
9. 报告实际修改文件、源覆盖、业务未知、测试命令与输出、状态前后及截图；未执行不标passed。不接真实筛查、消息、银行签名或交易服务。

### 评审与测试清单（本轮未执行应用测试）

- [ ] PPT Current全部编号活动已映射，Target新增/重复/划线均有源记录。
- [ ] M0.1两种语义不会被同ID覆盖，M3.3多actor不会被静默简化。
- [ ] C2删除线保留，C1.3草稿来源和M6.8/M8.3实际问责仍可追踪。
- [ ] 每个变更分别有PPT表述、After细化、控制边界、字段、至少一个验证问题。
- [ ] 基准观察与我们的迁移设计分开；无引用也可明确OUR，不制造行业共识。
- [ ] After不能凭隐藏证据/不同输入/降低控制取得更好结局。
- [ ] Person T的coordination、identity、signatory、portal access用途分开。
- [ ] Unknown applicability/condition manifest/hold不会漏进Ready。
- [ ] C2.5批准、Credit条件满足、C2.7协议检查、Legal执行分别有当前依据。
- [ ] QA的missing assessment与insufficient evidence分开；re-review与补正结束分开。
- [ ] 全部成功条件需要closure manifest，不能只有E4几条动画。
- [ ] 同一context下跨视图一致；Shadow inject可有可解释差异，不强制覆盖主线。
- [ ] Current/Target、language、play、pan、zoom、return不产生business decision。
- [ ] 3语言内容与实体/政策context分离；正式英文发布不包含内部中文批注或敏感源路径。
- [ ] 合成截图不含真实名单/身份证/银行客户；行业原图只在References区，且标市场/日期/素材类型。
- [ ] Print含完整选定场景、对比时点、来源和未决项，不丢屏幕外内容。

### 本轮输出状态

已完成：PPT两页渲染与原生文字/删除线检查，来源及跨稿差异登记，15个场景的详细After提案、机器可读追溯数据与文档一致性校验。

没有完成或宣称：本地Codex代码审计、HTML/Archify新图生成、实际schema迁移、产品操作测试、银行规则确认、生产安全或收益测量。

## 10. Reference Library — 可直接加入Studio的来源短卡

来源观察与本项目迁移逐项分开。外部来源没有证明的地方不填“industry best practice”。没有公开部署证据的参考标为标准/指南/研究，不称实施案例。


### REG-AUSTRAC-CDD — AUSTRAC — Initial CDD: body corporate, partnership or unincorporated association

- **类型：**regulatory_guidance
- **定位／版本：**Initial CDD / identity, representative, authority, ownership and purpose sections
- **来源观察：**分别考虑客户、代表人的身份与权限、受益所有人及关系目的。
- **本项目迁移（我们的设计）：**启发主体、代表、权限、目的和证据用途分离。
- **不可推断：**不是该银行的字段表、材料可接受性、豁免或授权判定；适用法律和过渡安排仍需验证。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/initial-customer-due-diligence/initial-customer-due-diligence-guides-customer-type/initial-cdd-body-corporate-partnership-or-unincorporated-association

- **关联场景：**SCN-SCOPE, SCN-ENTITY, SCN-REQUIREMENTS, SCN-SOURCE, SCN-VALIDATE, SCN-QA


### REG-AUSTRAC-EDD — AUSTRAC — Enhanced customer due diligence

- **类型：**regulatory_guidance
- **定位／版本：**When enhanced CDD is required / targeted measures
- **来源观察：**增强措施有具体适用情境，并应针对所识别的风险。
- **本项目迁移（我们的设计）：**分开建模EDD适用性、风险问题、评估、条件和批准。
- **不可推断：**没有触发资料≠已证明不适用；不表示通过EDD可以绕过制裁限制。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/enhanced-customer-due-diligence

- **关联场景：**SCN-REQUIREMENTS, SCN-EDD


### REG-AUSTRAC-SOF — AUSTRAC — Source of funds and source of wealth

- **类型：**regulatory_guidance
- **定位／版本：**Source of funds / Source of wealth
- **来源观察：**资金来源与财富来源是不同的尽调问题。
- **本项目迁移（我们的设计）：**为适用风险问题建立独立用途与证据关联。
- **不可推断：**不要求每个案件无差别收集两套材料。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/source-funds-and-source-wealth

- **关联场景：**SCN-EDD


### REG-DFAT-LIST — DFAT — Guide to Australia’s Consolidated List

- **类型：**regulatory_reference
- **定位／版本：**Names, aliases, dates and places of birth, citizenship
- **来源观察：**名单记录可以包含多种识别属性、别名和不完整信息。
- **本项目迁移（我们的设计）：**保留多值、精度、未知及原始记录，支持用途明确的对照。
- **不可推断：**不以单属性差异作自动排除，不假定澳洲名单覆盖所有适用司法辖区，不导入真实人物。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list/guide-australias-consolidated-list

- **关联场景：**SCN-POPULATION, SCN-MATCH


### IND-WOLFSBERG — Wolfsberg — Guidance on Sanctions Screening (2019)

- **类型：**industry_guidance
- **定位／版本：**§1; §2.1; §3.2; §4; §6
- **来源观察：**Alert不等于确定风险；应结合相关信息审阅，记录处置理由，并明确筛查范围和配置。
- **本项目迁移（我们的设计）：**区分Population、Run、Finding、Review、Decision与Coverage；为人组织判断材料。
- **不可推断：**我们的权限、阈值、暂停范围、复用规则不是该指引直接给出的银行配置。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://wolfsberg-group.org/resources/legacy/53

- **关联场景：**SCN-POPULATION, SCN-MATCH


### IB-ING-DOOR — ING Wholesale — Direct Online Onboarding Request (DOOR)

- **类型：**bank_product_example
- **定位／版本：**2026-02-26; European listed markets; access and task FAQ
- **来源观察：**RM可安排KYC代表访问；用户在InsideBusiness填写信息、上传与保存续办。多代表不等于同时编辑。
- **本项目迁移（我们的设计）：**RM协调关系、指定贡献者在任务界面处理资料，内部请求与外部视图分离。
- **不可推断：**不是澳洲部署证明，不照抄其时限，也不声称其权限与本案逐项目Grant相同。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.ingwb.com/en/insidebusiness/self-service/onboarding

- **关联场景：**SCN-ENTITY, SCN-REQUIREMENTS, SCN-GAP


### IB-ANZ-SECURE — ANZ — KYC SecureReply

- **类型：**bank_product_example
- **定位／版本：**Selected business-customer information-update workflow; entry/save/contributor FAQ
- **来源观察：**Reference与登记联系方式的OTP用于入口；保存与提交分开，部分字段有贡献者可见性限制。
- **本项目迁移（我们的设计）：**官网入口与请求定位可分开；局部响应、提交回执与复核状态分离。
- **不可推断：**不是全部新机构交易准入；不据此认证本案安全等级或客户代表权限。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.anz.com.au/support/business/secure-reply/

- **关联场景：**SCN-ENTITY, SCN-REQUIREMENTS, SCN-GAP, SCN-VALIDATE, SCN-MATCH, SCN-PUBLISH


### IND-SWIFT-KYC — SWIFT — KYC Registry opens to corporates

- **类型：**industry_utility_example
- **定位／版本：**2019-12-16 historical corporate launch
- **来源观察：**标准化baseline信息与文档共享，资料拥有者决定银行访问。
- **本项目迁移（我们的设计）：**公共baseline与本案要求分开；先检索可用资料再请求缺口。
- **不可推断：**本案无已确认Registry接入；共享完整性不等于本银行接受其充分性或法律意义的依赖。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.swift.com/news-events/press-releases/swift-opens-its-kyc-registry-corporates

- **关联场景：**SCN-REQUIREMENTS, SCN-SOURCE


### IND-GLEIF-L2 — GLEIF — Level 2 Data: Who Owns Whom

- **类型：**industry_standard_reference
- **定位／版本：**Level 1 / Level 2 definitions
- **来源观察：**法人身份参考信息与直接/最终会计合并母公司关系分别描述。
- **本项目迁移（我们的设计）：**分别建模LegalEntity、PartyRelationship与自然人控制关系。
- **不可推断：**会计合并母公司≠全部自然人受益所有人；有LEI≠完成KYC。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.gleif.org/en/lei-data/access-and-use-lei-data/level-2-data-who-owns-whom

- **关联场景：**SCN-ENTITY


### IND-GLEIF-VLEI — GLEIF — The verifiable LEI

- **类型：**industry_standard_reference
- **定位／版本：**Organisation, person and role credential overview
- **来源观察：**组织、代表人及相关角色可以通过凭证建立可验证关系。
- **本项目迁移（我们的设计）：**参考组织/人/角色分离；本案仍按主体与动作评估业务权限。
- **不可推断：**不假定客户拥有vLEI，不把岗位凭证等同签约、交易或全案访问权。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.gleif.org/en/organizational-identity/lei-vlei/the-verifiable-lei-vlei

- **关联场景：**SCN-ENTITY


### IND-BASEL-CCR — Basel Committee — Guidelines for counterparty credit risk management

- **类型：**industry_supervisory_guidance
- **定位／版本：**2024-12-11; §3 paras 7–10, PDF physical pp.8–9
- **来源观察：**交易对手资料、信用判断、额度、合同条款与风险缓释需要有清楚关联。
- **本项目迁移（我们的设计）：**区分信用风险决定、附带条件、条件落实及协议版本引用。
- **不可推断：**不作为澳洲本银行已采纳规则；不编造金额、担保、抵押或FX统一协议要求。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.bis.org/publications/202412-guidelines-final-guidelines-counterparty-credit-risk-management.pdf

- **关联场景：**SCN-LEGAL, SCN-CREDIT


### IB-ISDA-CREATE — ISDA Create

- **类型：**industry_product_example
- **定位／版本：**Official solution description; also https://www.isdacreate.org/
- **来源观察：**线上文档创建、谈判、执行与结构化法律/商业数据、协作和谈判历史。
- **本项目迁移（我们的设计）：**Legal可围绕协议版本、条件关联、审批和执行记录工作。
- **不可推断：**不能推断本案必须用ISDA或该供应商；不复制宣传收益、不将自动化等同生成式AI或法律判断。
- **本轮核验状态：**official_search_content_checked_2026-09-07; direct_page_fetch_failed; companion_site_readable

- **官方链接：**https://www.isda.org/isda-solutions-infohub/isda-create/

- **关联场景：**SCN-LEGAL


### IND-ISDA-DRR — ISDA — DRR and Common Domain Model

- **类型：**industry_standard_reference
- **定位／版本：**DRR/CDM concepts; version-specific implementation outside scope
- **来源观察：**金融产品、事件、状态与数字监管规则可分开表达。
- **本项目迁移（我们的设计）：**启发条件/事件/结果模型及规则版本链接。
- **不可推断：**贸易生命周期和报告标准不是KYC Schema，也不赋予最终准入权限。
- **本轮核验状态：**carried_forward_verified_session_reference; recheck_before_external_release

- **官方链接：**https://drr-docs.isda.org/docs/get-started/drr-and-cdm/

- **关联场景：**SCN-REQUIREMENTS


### XB-ACDM — EUROCONTROL — A-CDM specification

- **类型：**cross_industry_standard
- **定位／版本：**Edition 1.0, 2025-01-30; §§5.1.11–5.1.13; physical pp.40–43
- **来源观察：**Aircraft Ready、Start-up Requested、Start-up Approved是不同事件，具有前提、输入、触发及通知。
- **本项目迁移（我们的设计）：**启发就绪、请求授权、实际批准和通知分层；工作事件更新相关协作方。
- **不可推断：**不搬航空时限/放行权；不证明银行可以依据一张通用里程碑表放行。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.eurocontrol.int/sites/default/files/2025-01/eurocontrol-specification-for-acdm.pdf

- **关联场景：**SCN-CONFLICTS, SCN-READINESS, SCN-PUBLISH


### XB-IATA — IATA — ONE Record

- **类型：**cross_industry_standard
- **定位／版本：**Data model, API, security / data ownership overview
- **来源观察：**共享数据模型与访问机制支持关联记录；资料拥有方仍控制来源和访问。
- **本项目迁移（我们的设计）：**Shared Case Spine作为权限化逻辑视图，非所有数据无条件汇入一个公开库。
- **不可推断：**不是银行实施案例；无权角色不能因同一案件而查看同一完整payload。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.iata.org/one-record/

- **关联场景：**SCN-SOURCE, SCN-PUBLISH


### XB-GS1 — GS1 — Global Traceability Standard

- **类型：**cross_industry_standard
- **定位／版本：**§3.1 Critical Tracking Events / Key Data Elements; official search excerpt
- **来源观察：**用关键事件与描述事件的数据元素组织可追溯性。
- **本项目迁移（我们的设计）：**接收、提交、评估、重审、记录结果分别保留对象、来源、参与者、版本和时点。
- **不可推断：**不复制货运字段或声明GS1银行合规；直接网页读取受限时以可见官方摘要说明。
- **本轮核验状态：**official_search_excerpt_checked_2026-09-07; full_page_fetch_failed

- **官方链接：**https://www.gs1.org/standards/gs1-global-traceability-standard/current-standard

- **关联场景：**SCN-SOURCE, SCN-VALIDATE, SCN-READINESS, SCN-PUBLISH


### XB-NIST-THREAD — NIST — Digital Thread for Manufacturing

- **类型：**cross_industry_research
- **定位／版本：**Page updated 2026-08-12; project marked Completed
- **来源观察：**研究跨生命周期工程信息关联与可追溯交换。
- **本项目迁移（我们的设计）：**启发Credit决定→条款输入→协议版本→后续使用的持续链接。
- **不可推断：**不是已部署银行因果引擎；并不证明我们的最小影响集合天然正确。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.nist.gov/programs-projects/digital-thread-manufacturing

- **关联场景：**SCN-SCOPE, SCN-REQUIREMENTS, SCN-VALIDATE, SCN-LEGAL, SCN-CREDIT, SCN-READINESS


### XB-FHIR-R5 — HL7 FHIR R5 — Provenance

- **类型：**cross_industry_standard
- **定位／版本：**Fixed version 5.0.0; target/activity/agent/entity
- **来源观察：**记录资源版本所关联的活动、参与者及来源实体。
- **本项目迁移（我们的设计）：**判断记录关联具体输入版本、操作者及生成活动。
- **不可推断：**这里agent是参与者概念而非AI Agent；不宣称实现FHIR；R4与R5保留独立版本。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://hl7.org/fhir/R5/provenance.html

- **关联场景：**SCN-SOURCE, SCN-VALIDATE, SCN-MATCH, SCN-EDD, SCN-CONFLICTS, SCN-LEGAL, SCN-QA, SCN-READINESS, SCN-PUBLISH


### XB-ICH-Q10 — FDA / ICH — Q10 Pharmaceutical Quality System

- **类型：**cross_industry_guidance
- **定位／版本：**§3.2.2–3.2.3; physical pp.13–14, printed pp.10–11
- **来源观察：**调查/补正、风险相称的变更管理及效果检查是质量体系机制。
- **本项目迁移（我们的设计）：**QA缺口记录、针对性补正与独立重审；变更影响有依据。
- **不可推断：**不是每个漏填字段都进入正式CAPA，也不是银行QA法律义务或大平台建设依据。
- **本轮核验状态：**official_content_checked_2026-09-07

- **官方链接：**https://www.fda.gov/media/71553/download

- **关联场景：**SCN-QA


### IC-PHKL — PHKL Future Clinic — internal project handoff

- **类型：**internal_design_case
- **定位／版本：**a9d5e073-4793-415f-b9c8-a6eeca7fb349.md; §§14–16
- **来源观察：**内部设计采用同一案件跨角色、AI准备、医生签署与承保人独立审阅及澄清。
- **本项目迁移（我们的设计）：**借鉴任务工作台、准备/决定/提交分离、每幕链接数据事件和下游角色。
- **不可推断：**仅内部设计参照；没有在本轮核验生产上线或业务收益，不作为公开实施成功案例。
- **本轮核验状态：**internal_file_reviewed; not_public; no_deployment_claim

- **内部文件：**仅受控引用，不生成公开URL，也不随客户版自动打包。

- **关联场景：**SCN-SCOPE, SCN-GAP, SCN-VALIDATE, SCN-MATCH, SCN-EDD, SCN-QA, SCN-READINESS, SCN-PUBLISH


## 附录A. PPT活动原文与源定位

本表保留编号、原词、可见Actor和删除线；不对源文件纠错。出现同一码多处以source_id区分。Target actor来自本轮视觉/坐标核对，不是客户岗位签核。


### 原PPT第1页：Current


| Source ID | 原编号 | 原文 | 可见执行区 | 格式 |
|---|---|---|---|---|
| PPT-S1-SH283-A1 | M0.1 | M0.1 Determine sales location & reporting / booking entity | SALES / RM (Front Office) | normal |
| PPT-S1-SH283-A2 | M0.2 | M0.2 Confirm & validate approved product / service scope | SALES / RM (Front Office) | normal |
| PPT-S1-SH284-A1 | M1.2 | M1.2 Receive onboarding request info | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH284-A2 | M1.3 | M1.3 Create onboarding case & working repository | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH284-A3 | M1.4 | M1.4 Confirm client legal name & location | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH284-A4 | M1.5 | M1.5 Classify client / legal entity type & triage case | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH289-A1 | M8.5 | M8.5  Communication outcome | SALES / RM (Front Office) | normal |
| PPT-S1-SH291-A1 | M2.5 | M2.5  Issue client requirements | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH292-A1 | M3.1 | M3.1  Source from public & commercial sources | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH292-A2 | M3.2 | M3.2  Identify residual gaps | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH292-A3 | M3.3 | M3.3  Request info from client | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH292-A4 | M3.4 | M3.4  Capture & validate evidence | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH292-A5 | M3.5 | M3.5  Manage outstanding gaps & sourcing audit trail | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH296-A1 | M4.1 | M4.1  Initial risk pre-screening | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH296-A2 | M4.2 | M4.2  Early adverse-media screen | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH296-A3 | M4.3 | M4.3  Establish screening pop. | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH296-A4 | M4.4 | M4.4  Execute comprehensive screening | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH296-A5 | M4.5 | M4.5  Adjudicate screening hits | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH330-A1 | C1.1 | C1.1 Intake &<br>initialise legal<br>request | CGM LEGAL | normal |
| PPT-S1-SH332-A1 | C1.2 | C1.2 Determine required<br>agreements / forms | CGM LEGAL | normal |
| PPT-S1-SH334-A1 | C1.3 | C1.3 Draft required<br>agreements | CGM LEGAL | normal |
| PPT-S1-SH336-A1 | C1.4 | C1.4 Incorporate<br>Credit input<br>(if required) | CGM LEGAL | normal |
| PPT-S1-SH338-A1 | C1.5 | C1.5 Negotiate<br>agreement terms | CGM LEGAL | normal |
| PPT-S1-SH340-A1 | C1.6 | C1.6 Obtain internal<br>review & approvals | CGM LEGAL | normal |
| PPT-S1-SH342-A1 | C1.7 | C1.7 Execute<br>agreements | CGM LEGAL | normal |
| PPT-S1-SH344-A1 | C1.8 | C1.8 Capture key terms<br>& store executed<br>documents | CGM LEGAL | normal |
| PPT-S1-SH297-A1 | M5.1 | M5.1  Initiate & assign EDD case | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A2 | M5.2 | M5.2  Compile EDD evidence pack | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A3 | M5.3 | M5.3  Assess evidencing risk factors | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A4 | M5.4 | M5.4  Close intelligence & gaps | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A5 | M5.5 | M5.5  Consult risk specialists | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A6 | M5.6 | M5.6  Determine EDD outcome & conditions | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A7 | M5.7 | M5.7  Obtain required approvals | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH297-A8 | M5.8 | M5.8  Record & hand over EDD outcome | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH298-A1 | M6.1 | M6.1  Confirm applicable requirements / CIPs | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A2 | M6.2 | M6.2  Check completeness | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A3 | M6.3 | M6.3  Validate evidence sources | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A4 | M6.4 | M6.4  Assess evidence sufficiency | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A5 | M6.5 | M6.5  Cross-check screening & EDD conditions | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A6 | M6.6 | M6.6  Identify & issue gaps | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A7 | M6.7 | M6.7  Re-review remediated items | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH298-A8 | M6.8 | M6.8  Provide QA sign-off | QA TEAM (explicit label inside source block) | normal |
| PPT-S1-SH312-A1 | M7.1 | M7.1  Initiate conflicts check | RMG CONTROL ROOM | normal |
| PPT-S1-SH312-A2 | M7.2 | M7.2  Perform conflicts / NDA search | RMG CONTROL ROOM | normal |
| PPT-S1-SH312-A3 | M7.3 | M7.3  Investigate & resolve conflicts | RMG CONTROL ROOM | normal |
| PPT-S1-SH312-A4 | M7.4 | M7.4  Record conflict clearance | RMG CONTROL ROOM | normal |
| PPT-S1-SH316-A1 | C2.1 | C2.1 Determine credit<br>requirement | CREDIT | normal |
| PPT-S1-SH318-A1 | C2.2 | C2.2 Retrieve & validate<br>financial / exposure data | CREDIT | normal |
| PPT-S1-SH320-A1 | C2.3 | C2.3 Assess counterparty<br>credit risk | CREDIT | normal |
| PPT-S1-SH322-A1 | C2.4 | C2.4 Determine credit<br>limit & conditions | CREDIT | normal |
| PPT-S1-SH324-A1 | C2.5 | C2.5 Obtain credit<br>approval | CREDIT | normal |
| PPT-S1-SH326-A1 | C2.6 | C2.6 Provide Credit<br>Agreement data to Legal | CREDIT | normal |
| PPT-S1-SH328-A1 | C2.7 | C2.7 Review / approve final<br>agreement & data | CREDIT | normal |
| PPT-S1-SH3-A1 | M0.3 | M0.3 Determine DD level | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH3-A2 | M0.4 | M0.4 Record booking model | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH18-A1 | M2.1 | M2.1 Determine AML / KYC requirements & applicable reliefs | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH18-A2 | M2.2 | M2.2 Determine non-AML requirements & applicable exemption (With Legal if required) | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH18-A3 | M2.3 | M2.3 Consolidate requirements | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH18-A4 | M2.4 | M2.4 Apply risk rating, identify EDD indicators & adjust requirements | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH20-A1 | M1.1 | M1.1 Submit onboarding request & capture initial client / relationship | SALES / RM (Front Office) | normal |
| PPT-S1-SH65-A1 | M8.1 | M8.1  Confirm all required clearance prerequisites are complete | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH65-A2 | M8.2 | M8.2 Finalise onboarding case & link supporting outputs | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH65-A3 | M8.3 | M8.3 Confirm / record cleared-to-trade status | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH65-A4 | M8.4 | M8.4 Record clearance timestamp | CLIENT FULFILMENT / KYC OPS | normal |
| PPT-S1-SH177-A1 | M4.6 | M4.6  Assess risk & materiality | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH177-A2 | M4.7 | M4.7  Determine screening outcome | FINANCIAL CRIME / RISK / COMPLIANCE | normal |
| PPT-S1-SH9-A1 | M3.3 | M3.3  Request info from client | SALES / RM (Front Office) | normal |


### 原PPT第2页：Target


| Source ID | 原编号 | 原文 | 可见执行区 | 格式 |
|---|---|---|---|---|
| PPT-S2-SH283-A1 | M0.1 | M0.1 Initiation relationship/ product request | SALES / RM (Front Office) | normal |
| PPT-S2-SH284-A1 | M1.2 | M1.2 Receive onboarding request info | Agentic execution | normal |
| PPT-S2-SH284-A2 | M1.3 | M1.3 Create onboarding case & working repository | Agentic execution | normal |
| PPT-S2-SH284-A3 | M1.4 | M1.4 Confirm client legal name & location | Agentic execution | normal |
| PPT-S2-SH284-A4 | M1.5 | M1.5 Classify client / legal entity type & triage case | Agentic execution | normal |
| PPT-S2-SH289-A1 | M8.5 | M8.5  Communication outcome | SALES / RM (Front Office) | normal |
| PPT-S2-SH292-A1 | M3.1 | M3.1  Source from public & commercial sources | Agentic execution | normal |
| PPT-S2-SH292-A2 | M3.2 | M3.2  Identify residual gaps | Agentic execution | normal |
| PPT-S2-SH292-A3 | M3.3 | M3.3  Request info from client | Agentic execution | normal |
| PPT-S2-SH292-A4 | M3.4 | M3.4  Capture & validate evidence | Agentic execution | normal |
| PPT-S2-SH292-A5 | M3.5 | M3.5  Manage outstanding gaps & sourcing audit trail | Agentic execution | normal |
| PPT-S2-SH296-A1 | M4.1 | M4.1  Initial risk pre-screening | Agentic execution | normal |
| PPT-S2-SH296-A2 | M4.2 | M4.2  Early adverse-media screen | Agentic execution | normal |
| PPT-S2-SH296-A3 | M4.3 | M4.3  Establish screening pop. | Agentic execution | normal |
| PPT-S2-SH296-A4 | M4.4 | M4.4  Execute comprehensive screening | Agentic execution | normal |
| PPT-S2-SH296-A5 | M4.5 | M4.5  Adjudicate screening hits | Agentic execution | normal |
| PPT-S2-SH296-A6 | M4.6 | M4.6  Assess risk & materiality | Agentic execution | normal |
| PPT-S2-SH296-A7 | M4.7 | M4.7  Determine screening outcome | Agentic execution | normal |
| PPT-S2-SH330-A1 | C1.1 | C1.1 Intake &<br>initialise legal<br>request | CGM LEGAL | normal |
| PPT-S2-SH332-A1 | C1.2 | C1.2 Determine required<br>agreements / forms | CGM LEGAL | normal |
| PPT-S2-SH334-A1 | C1.3 | C1.3 Review drafted<br>agreements | CGM LEGAL | normal |
| PPT-S2-SH336-A1 | C1.4 | C1.4 Incorporate<br>Credit input<br>(if required) | CGM LEGAL | normal |
| PPT-S2-SH338-A1 | C1.5 | C1.5 Negotiate<br>agreement terms | CGM LEGAL | normal |
| PPT-S2-SH340-A1 | C1.6 | C1.6 Obtain internal<br>review & approvals | CGM LEGAL | normal |
| PPT-S2-SH342-A1 | C1.7 | C1.7 Execute<br>agreements | CGM LEGAL | normal |
| PPT-S2-SH344-A1 | C1.8 | C1.8 Capture key terms<br>& store executed<br>documents | CGM LEGAL | normal |
| PPT-S2-SH297-A1 | M5.1 | M5.1  Initiate & assign EDD case | Agentic execution | normal |
| PPT-S2-SH297-A2 | M5.2 | M5.2  Compile EDD evidence pack | Agentic execution | normal |
| PPT-S2-SH297-A3 | M5.3 | M5.3  Assess evidencing risk factors | Agentic execution | normal |
| PPT-S2-SH297-A4 | M5.4 | M5.4  Close intelligence & gaps | Agentic execution | normal |
| PPT-S2-SH297-A5 | M5.5 | M5.5  Consult risk specialists | Agentic execution | normal |
| PPT-S2-SH297-A6 | M5.6 | M5.6  Determine EDD outcome & conditions | Agentic execution | normal |
| PPT-S2-SH297-A7 | M5.7 | M5.7  Obtain required approvals | Agentic execution | normal |
| PPT-S2-SH297-A8 | M5.8 | M5.8  Record & hand over EDD outcome | Agentic execution | normal |
| PPT-S2-SH298-A1 | M6.1 | M6.1  Confirm applicable requirements / CIPs | Agentic execution | normal |
| PPT-S2-SH298-A2 | M6.2 | M6.2  Check completeness | Agentic execution | normal |
| PPT-S2-SH298-A3 | M6.3 | M6.3  Validate evidence sources | Agentic execution | normal |
| PPT-S2-SH298-A4 | M6.4 | M6.4  Assess evidence sufficiency | Agentic execution | normal |
| PPT-S2-SH298-A5 | M6.5 | M6.5  Cross-check screening & EDD conditions | Agentic execution | normal |
| PPT-S2-SH298-A6 | M6.6 | M6.6  Identify & issue gaps | Agentic execution | normal |
| PPT-S2-SH298-A7 | M6.7 | M6.7  Re-review remediated items | Agentic execution | normal |
| PPT-S2-SH298-A8 | M6.8 | M6.8  Provide QA sign-off | Agentic execution | normal |
| PPT-S2-SH311-A1 | M7.5 | M7.5 Investigate potential conflicts | RMG CONTROL ROOM — Human in the Loop | normal |
| PPT-S2-SH311-A2 | M7.6 | M7.6 Escalate to senior manager  if required | RMG CONTROL ROOM — Human in the Loop | normal |
| PPT-S2-SH311-A3 | M7.7 | M7.7 Confirm and record outcome | RMG CONTROL ROOM — Human in the Loop | normal |
| PPT-S2-SH312-A1 | M7.1 | M7.1  Initiate conflicts check | Agentic execution | normal |
| PPT-S2-SH312-A2 | M7.2 | M7.2  Perform conflicts / NDA search | Agentic execution | normal |
| PPT-S2-SH312-A3 | M7.3 | M7.3  Investigate & resolve conflicts | Agentic execution | normal |
| PPT-S2-SH312-A4 | M7.4 | M7.4  Record conflict clearance | Agentic execution | normal |
| PPT-S2-SH316-A1 | C2.1 | C2.1 Determine credit<br>requirement | CREDIT | struck_out |
| PPT-S2-SH318-A1 | C2.2 | C2.2 Retrieve & validate<br>financial / exposure data | CREDIT | struck_out |
| PPT-S2-SH320-A1 | C2.3 | C2.3 Assess counterparty<br>credit risk | CREDIT | normal |
| PPT-S2-SH322-A1 | C2.4 | C2.4 Determine credit<br>limit & conditions | CREDIT | normal |
| PPT-S2-SH324-A1 | C2.5 | C2.5 Obtain credit<br>approval | CREDIT | partial_strike_Obtain_only |
| PPT-S2-SH326-A1 | C2.6 | C2.6 Provide Credit<br>Agreement data to Legal | CREDIT | struck_out |
| PPT-S2-SH328-A1 | C2.7 | C2.7 Review / approve final<br>agreement & data | CREDIT | struck_out |
| PPT-S2-SH18-A1 | M2.1 | M2.1 Determine AML / KYC requirements & applicable reliefs | Agentic execution | normal |
| PPT-S2-SH18-A2 | M2.2 | M2.2 Determine non-AML requirements & applicable exemption (With Legal if required) | Agentic execution | normal |
| PPT-S2-SH18-A3 | M2.3 | M2.3 Consolidate requirements | Agentic execution | normal |
| PPT-S2-SH18-A4 | M2.4 | M2.4 Apply risk rating, identify EDD indicators & adjust requirements | Agentic execution | normal |
| PPT-S2-SH18-A5 | M2.5 | M2.5  Issue client requirements | Agentic execution | normal |
| PPT-S2-SH20-A1 | M1.1 | M1.1 Submit onboarding request & capture initial client / relationship | SALES / RM (Front Office) | struck_out |
| PPT-S2-SH65-A1 | M8.1 | M8.1  Confirm all required clearance prerequisites are complete | Agentic execution | normal |
| PPT-S2-SH65-A2 | M8.2 | M8.2 Finalise onboarding case & link supporting outputs | Agentic execution | normal |
| PPT-S2-SH65-A3 | M8.3 | M8.3 Confirm / record cleared-to-trade status | Agentic execution | normal |
| PPT-S2-SH65-A4 | M8.4 | M8.4 Record clearance timestamp | Agentic execution | normal |
| PPT-S2-SH279-A1 | M0.1 | M0.1 Determine sales location & reporting / booking entity | Agentic execution | normal |
| PPT-S2-SH279-A2 | M0.2 | M0.2 Confirm & validate approved product / service scope | Agentic execution | normal |
| PPT-S2-SH279-A3 | M0.3 | M0.3 Determine DD level | Agentic execution | normal |
| PPT-S2-SH279-A4 | M0.4 | M0.4 Record booking model | Agentic execution | normal |
| PPT-S2-SH410-A1 | M5.9 | M5.9 Perform EDD judgment and risk assessment | FINANCIAL CRIME / RISK / COMPLIANCE — Human in the Loop | normal |
| PPT-S2-SH410-A2 | M5.10 | M5.10 Approve EDD outcome and conditions | FINANCIAL CRIME / RISK / COMPLIANCE — Human in the Loop | normal |
| PPT-S2-SH280-EX | 未编号HITL | Resolve classification exceptions | CLIENT FULFILMENT / KYC OPS — Human in the Loop | normal |
| PPT-S2-SH281-EX | 未编号HITL | Resolve complex info gaps | CLIENT FULFILMENT / KYC OPS — Human in the Loop | normal |
| PPT-S2-SH376-EX | 未编号HITL | Review ambiguous screening hits | CLIENT FULFILMENT / KYC OPS — Human in the Loop | normal |
| PPT-S2-SH392-EX | 未编号HITL | Support evidence gaps where needed | CLIENT FULFILMENT / KYC OPS — Human in the Loop | normal |
| PPT-S2-SH409-EX | 未编号HITL | Adjudicate material screening finding | FINANCIAL CRIME / RISK / COMPLIANCE — Human in the Loop | normal |


## 附录B. 项目文件定位与来源层级


1. `Sanitised Process Map(1).pptx` 第1/2页是本轮Before/After活动与格式的主源；第3页是交付方法。
2. A/B/C/D/E/F的Final文件是已批准演示设计底稿，不取代原PPT/实际客户业务验证。
3. `09-04 Meeting_ Institutional Trading KYC _Clear to Trade_ Product Kickoff & Planning-Summary.txt` 提供新建产品替换KYC、对接既有trade/tools的会议背景。它是会议总结，不把语言支持旧说法覆盖后来用户已确认的中英作者模式。
4. `a9d5e073-4793-415f-b9c8-a6eeca7fb349.md`（PHKL内部handoff）用于已披露的内部方法参考，不是银行事实。
5. 原Source register与本稿同名source_id如发生冲突，先按文件+页+shape+原文映射，不按编号覆盖。

**本稿未包含真实客户身份推测、真实身份证资料、真实名单记录、生产秘密或复制的受版权保护全文。**
