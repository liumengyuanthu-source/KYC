# Clear-to-Trade — Discussion 2 / Batch A Final
## SCN-SCOPE + SCN-ENTITY：已批准的演示设计与 Codex 执行合同

- Version: v1.0
- Date: 2026-09-07
- Owner: Christina
- Audience: Christina、Xiaoming、Coco、获授权的 Codex 工作区
- Client label: Confidential Australian Banking Client
- Classification: Internal working design — restricted distribution
- Parent baseline: `Clear_to_Trade_Experience_Principles_IA_Baseline_v0.4.md`
- Parent D2 specification: `Clear_to_Trade_Discussion_2_Living_Story_Scenarios_Benchmark_Spec_v0.1.md`
- Status: **USER-APPROVED FOR DEMO DESIGN / RELEASED TO CODEX**。Christina 已确认本组增量稿与合成案件，可按本文件实现本地演示。字段业务语义、演示分工和边界作为本组执行约定；银行实际政策、审批权限、生产 Schema 与实现测试没有因此获得确认。
- Change method: 增量执行稿；仅替代 Batch A Review v0.1 的实施地位，不覆盖主基线 v0.4 或其余 D2 内容。沿用仓库已有对象、组件和 ID；先处理 §18 的来源编号碰撞，再定向合并。

## 0. 本组执行范围

本组已批准的制作范围为两个场景：

| 场景 | 回答的问题 | 主要来源 |
|---|---|---|
| SCN-SCOPE | 本次到底要为哪一主体、什么关系、什么产品及 booking context 准备准入？ | M0.1–M0.4、M1.1；D2 §6.1 |
| SCN-ENTITY | 该主体是谁，谁代表它，所声称的权限具体覆盖什么？ | M1.3–M1.5、M3.4；代表权限细节为行业参考扩展；D2 §6.2 |

Discussion 1 保持收口。首组场景的审阅不是所有 D2 内容通过，也不是要求把这两项制作成与筛查切片同等完整的新产品。

**本轮核心：先确定案件事实与业务张力，再决定场景卡、字段与动作。**


### 0.1 “Final”的精确定义

| 维度 | 本版状态 |
|---|---|
| 合成案件与本组故事 | USER-CONFIRMED，作为演示内容基线 |
| 本组业务语义与边界 | USER-CONFIRMED FOR DEMO；不是银行运营规则 |
| 演示用字段语义、动作和预期结果 | 可进入实现；既有字段名称优先映射 |
| 银行法律/合规解释、权限、产品资格、数据保留 | NOT BANK-VALIDATED，不由本稿代替 |
| 详细生产技术方案 | 不在本次交付范围 |
| HTML与测试结果 | NOT VERIFIED HERE，由Codex实际执行后汇报 |
| 图片、动效、动画、视频 | 本版提供制作合同；具体样片须视觉与业务审核后选用 |

本组批准不是冻结整个D2。后续组别可补充规则和字段，但要经过impact review；不得倒改本组已审阅的历史事实或对象含义。

### 0.2 制作授权与停止边界

允许Codex：在已有本地工程内实现本组内容、合成数据、最小真实模拟动作、Archify图示、导航与媒体占位接口，并执行本组测试。沿用已有技术栈和本机已安装Archify。

不允许：新建第三个主入口、重写整站、连接真实银行/名单/邮件系统、发送消息、发布到公网、修改Library/GitHub远端、推定银行权限、自动实现未确认的后续组别或Lab功能。

补充媒体合同：`Clear_to_Trade_D2_Batch_A_Media_Format_and_Demo_Brief_v1.0.md`。它支持另一个对话做候选资产；不覆盖本文业务语义。即使未收到候选媒体，Codex也可用文字、正规HTML对象卡和Archify静态关系图完成可读主线。

### 0.3 本版相对Review的明确变化

- 用户已确认的案件和本组增量稿升级为演示实施基线，不再反复询问同一个案件选择。
- “联系人能够协调”澄清为“联系人提出/声称由集团协调”；这是为消除它与权限未建立的矛盾，不是新增拒绝或授权结论。
- 当前与目标流程、证据用途、字段组、事件、未决业务问题继续保留。
- 原材料存在相同DEP编号对应不同含义的情况；本版显式记录并要求按来源+语义映射，不按裸编号覆盖。
- 新增媒体交付接口、分组推进协议和执行验收，不改变原定五项Workshop成果和一个筛查完整切片的主优先级。

## 1. 来源与新提案的边界

| 层次 | 本轮可以使用的内容 | 不能升级成什么 |
|---|---|---|
| PROJECT-SOURCE | Process Map 的 M0/M1、M3 证据验证、M1 触发 Conflicts、Legal/Credit 并行工作 | 客户最终用户已验证的痛点和实际系统权限 |
| EXISTING-DESIGN | 两主入口、五阶段/角色、组合优先 Ops 视角、Living Story、Shared Case Spine、独立 Lab | 已完成 HTML 或数据库 |
| INDUSTRY-REFERENCE | AUSTRAC 客户/代表/权限区分；GLEIF 身份与关系数据 | 该银行所有政策和门槛已确定 |
| CROSS-INDUSTRY-PATTERN | A-CDM 里程碑触发下游更新 | 航空授权/安全规则适用于银行 |
| DESIGN-HYPOTHESIS | 本文启动/等待/继续条件、界面、字段、状态及分工 | 银行正式审批规范 |
| SYNTHETIC-DEMO | 本文经营实体、母公司、资金人员、产品意图、资料和事件 | 客户实际案件或真实筛查记录 |

## 2. 已确认主案件：有业务张力，但不制造超级复杂案件

### 2.1 已确认的合成背景

一家澳大利亚经营公司希望与银行建立新关系，为未来美元采购付款申请外汇远期业务。联系银行的是境外母公司的一名集团资金负责人。邮件使用集团商业名称，但拟实际承担交易义务的是澳大利亚经营公司。

这位联系人提出由集团资金团队协调开户资料；这是一项请求/代表声明，不是已确认的代理权限。职位证明并不能独立说明其可代表哪一家法人、可以提供什么声明、能否签署协议或下达交易指令。产品必须把这些问题分开。

这是 **Christina 已确认的合成演示设定**，不是银行已确认的客户类型、产品资格或业务案例。方案取舍：相较完全无歧义的单主体案件，它更容易展示 scope、entity、authority 的必要性；相较基金/信托/复杂 SPV，它不会在首幕引入大量不同实体类型规则。

### 2.2 Case Passport 执行设定

| 维度 | 演示值 | 状态/限制 |
|---|---|---|
| Case | 沿用仓库现有合成 case ID；示例别名 `DEMO-CTT-001` | 不强制替换已有 ID |
| Trigger | New relationship | 已有主案例方向；不是所有触发都同时发生 |
| 客户法人 | Entity A，澳大利亚经营公司 | 合成；唯一拟准入交易主体 |
| 关联组织 | Entity B，境外母公司；示例注册地 Singapore | 合成；原始关系为 reported，不先写成 verified |
| Group label | Group A | 展示/商业名称；不是法人主键 |
| 联系人 | Person T，集团资金负责人 | 合成；具体姓名非首轮必需 |
| 联系人与 Entity B 的关系 | Reported employer / group role | 不推出其有权代表 Entity A |
| 产品意图 | FX forward，美元采购付款相关汇率风险管理 | 仅拟申请产品；不构成合适性或资格结论 |
| Booking entity | 未提供时为空；演示后可使用显式合成 bank entity alias | 不根据浏览语言或客户注册地自动选择 |
| 初始材料 | 关系请求、集团结构概览、联系人职位/任命资料 | 全部 synthetic，分别保存 provenance |
| Legal / Credit | 待评估适用性；后续主线可配置明确的合成适用分支 | 不因产品名就生成额度、协议或审批 |
| EDD | 待根据独立风险依据判断 | 不因境外母公司或任命资料不足自动触发 |
| 终点 | 对确定主体/产品/booking scope 的准入结果 | 不执行交易，不给出实际放行建议 |

不填写逼真的真实机构名称、银行实体名、ACN、LEI、护照号、真实供应商匹配结果。需要演示唯一标识时使用 `synthetic_registry_key` 等显式合成 scheme，不伪装成生产登记标识。

### 2.3 四项反向防护

1. 一个母公司不自动成为交易对手或担保人。
2. 一名集团资金负责人不自动成为每个子公司的授权签字人。
3. 一次 Scope 确认不自动完成身份、KYC、Credit 或 Legal 审批。
4. 一项授权问题不自动证明存在金融犯罪风险，也不自动触发全案冻结。

## 3. Living Story 开场：同一商业目标，逐步澄清真正的业务对象

### 3.1 叙事范围

Studio 可以用一段精简的合成沟通展示工作情境；Prototype 内只出现正常产品标题、业务资料和任务，不使用教学型副标题。

**合成请求原文示例（Studio）：**

> We would like to set up FX forward access for our Australian operating company. Our group treasury team will coordinate the documentation.

**内部中文制作稿：**

> 我们想为澳大利亚经营公司申请外汇远期业务，由集团资金团队协调资料。

这段文字不声称来自客户邮件。标签为 Synthetic request。

### 3.2 首幕与第二幕的故事节奏

| Beat alias | 所发生的业务事实/动作 | 画面聚焦 | 该步结束后知道什么 | 仍不知道什么 |
|---|---|---|---|---|
| A-01 Request received | 收到以 Group A 为商业名称的关系请求 | RM请求摘要 | 有新关系和拟申请产品意图 | 实际交易法人、booking主体、代表权限 |
| A-02 Scope ambiguity found | 产品把集团名、经营实体、联系人拆成不同候选对象 | Group A 与 Entity A 两个明确对象 | 联系对象与拟准入对象不能合并 | 请求是否确实仅覆盖 Entity A |
| A-03 Trading entity clarified | RM记录针对本次请求的主体澄清；保存说明及来源 | Entity A在scope中突出，Entity B为related party | 谁是拟准入对手方 | 身份和全部CDD是否充分 |
| A-04 Working scope recorded | 记录产品意图、booking context的已知/未知和范围版本 | Scope记录，不显示绿色全案成功 | 可以按哪些context编制要求 | DD、eligibility、适用审批仍需处理 |
| B-01 Records separated | Entity A、Entity B、Person T分别建档/关联 | 三个对象及关系 | 一个人代表哪个主体，需要单独记录 | 各角色关系的验证程度 |
| B-02 Entity source reviewed | 对照可用的合成登记来源、名称和标识 | Entity A及其source | 能否分辨目标实体 | 所有权/控制与全部受益人是否已验证 |
| B-03 Authority gap identified | 职位证明未明确覆盖代表 Entity A 的具体动作 | Person T → Entity A 的用途关联 | 缺口是代表权限用途，不是泛泛缺文件 | 哪项补充材料可按规则支持该用途 |
| B-04 Targeted work opened | 建立具体authority review/补证任务；不直接对外发送 | 任务、责任、等待原因 | 谁需要下一步、为什么 | 尚未完成的授权和其余CDD |
| B-05 Continue permitted preparation | 显示可继续的准备与暂不允许的关键动作 | 明确并行轨道，不全图亮绿 | 工作可以按局部条件推进 | 全案准入仍未完成 |

**Story cursor 不改变业务数据。**Play/Next读取已审阅事件或展示快照；需要实际变化时必须由模拟 action reducer/显式加载已审阅快照触发。跳过故事不等于批准任何事项。

## 4. SCN-SCOPE 完整工作合同

### 4.1 工作目标与前置

- User job：使各方对“本次准入评估的对象与范围”具有一致、可追溯的工作定义。
- Primary roles：Relationship Manager；Case Manager / KYC Operations。
- Event：`relationship_request_received`。
- Minimum input：请求来源引用、发起角色、关系意图、可用的客户及产品信息。
- Scope status：允许先保存 draft；不是必须所有数据齐全才能记录请求。
- Mandatory-field applicability：由后续规则/业务验证确定；本文只定义哪些字段缺失时不可把范围标为可供下游正式使用。

### 4.2 活动、输入、输出与停止条件

| Work alias | 当前源图活动/本轮扩展 | Target 产品工作 | Human / rule boundary | 具体输出与等待 |
|---|---|---|---|---|
| S-A01 Capture request | M1.1 收集初始关系信息 | 保存原请求与出处，提取候选值 | 提取内容保留来源和未核实状态 | RelationshipRequest；缺值为空不补写 |
| S-A02 Determine sales context | M0.1 sales location | 从请求与内部已提供资料组织候选地区 | 不用UI locale决定业务地区 | sales_location；未知则clarification |
| S-A03 Determine counterparty scope | M1.4和范围理解的结合 | 分离集团标签、拟交易法人及related party | 模糊时由适当业务角色澄清；该澄清不是最终CDD认证 | counterparty_entity_id + basis_ref |
| S-A04 Determine booking context | M0.1 booking/reporting entity | 显示可用候选及资料缺口 | 不自行选最方便银行实体；仅使用提供的合成fixture/后续正式规则 | booking_entity_id + resolution_status |
| S-A05 Validate product scope | M0.2 approved product/service scope | 记录requested product；另记录该组合的规则检查 | requested != approved；未知适用性不得通过 | product_service_scope + eligibility/evaluation ref |
| S-A06 Determine DD level | M0.3 | 保存DD评估结果或待评估状态与规则版本 | dd_level不从母公司所在地或产品名称直接推断；M2可再调整 | dd_level + basis/assessment status |
| S-A07 Record working scope | M0.4 | 保存不可静默覆盖的scope revision及来源 | 范围记录与银行客户批准分别管理 | CaseScope revision / work context readiness |
| S-A08 Route clarification | 设计扩展，支撑M0/M1未决事项 | 针对“法人/booking/product”具体缺口建立任务 | 收件人、披露和外部发送权限未确认时只draft | WorkItem、wait reason、owner |

### 4.3 Current / Target 的真实差别

Current 本来就要求确定销售地点、booking entity、产品/服务范围、DD level及记录booking model。[S01]

Target不是“第一次开始明确范围”，而是把不同输入组织为明确对象、保留候选值与来源、识别未知、维护版本，并让后续工作使用相同范围。Current中跨系统核对/重复解释的频率与严重程度没有用户证据，仍标记 hypothesis。

### 4.4 Scope 结束标准

- 商业集团、客户法人、银行booking主体是不同字段和对象。
- 已解决与未解决的scope问题分别可见。
- 有一份可供后续使用的特定范围版本；不能只写“客户已确认”。
- 下游工作依据明确的输入门槛决定是否可准备、是否可作最终判断。
- 本场景完成不把 `client_eligibility_status`、身份验证、任何监管判断或Clear-to-Trade状态自动置为通过。

## 5. SCN-ENTITY 完整工作合同

### 5.1 工作目标与范围

- User job：识别该案件中的客户法人、相关主体和代表关系，明确每项声明所需的验证以及已知/未知事项。
- Source：M1.3–M1.5和M3.4；更细的AuthorityRecord来自行业参考和设计扩展。
- Primary role：Case Manager / KYC Operations；客户代表提供信息；具体批准职责仍待确认。
- Parent relationship：先记录“reported parent”，没有来源不要直接绘成已核实的所有权链。
- 这一步建立 requirements planning所需context，并不承诺完成全部实体CDD或受益人识别。

### 5.2 必须分开回答的四个问题

1. 联系我们的是什么人？
2. 哪个法律主体拟取得产品/服务？
3. 这个人声称代表哪个主体？
4. 针对该主体，其权限覆盖哪些动作和资料用途？

银行员工的应用权限与客户代表的业务授权是两套模型，不得混为一个 `user.role`。

### 5.3 证据组合：具体到用途

| Evidence alias | 内容 | 首轮可以支持的内容 | 不足以独立支持什么 |
|---|---|---|---|
| EV-A01 | 合成关系请求 | 有该业务意图与联系人声明 | 客户法人已验证；授权已成立 |
| EV-A02 | 合成集团结构概览 | 存在reported entity relationship | 全部ownership/control已验证；母公司是担保人 |
| EV-A03 | 集团资金职位/任命资料 | Person T与Entity B的岗位/雇佣声明，真实性另评 | Person T可代表Entity A签约或交易 |
| EV-A04 | Entity A的合成登记资料 | 供本次实体名称/标识比对 | 完整BO识别、资金来源、代表权限 |
| EV-A05 | 后续取得的针对Entity A、指定用途的授权材料 | 经适用规则和授权review后，可支持具体scope/action | 所有动作无限授权；所有成员或未来范围 |

这些资料都只是预编制的demo artifacts。EV-A05不在初始快照中凭空存在；只有后续响应事件到达才可显示。资料类型的可接受性不由此表替代银行政策。[B01]

### 5.4 活动细化

| Work alias | 具体工作 | 输入 | 产品准备 | 需要的人/规则 | 输出或等待 |
|---|---|---|---|---|---|
| E-A01 Separate party records | 将集团标签、Entity A、Entity B、Person T区分 | request + structure summary | 候选对象与冲突提示 | 禁止按一个名称/邮箱合并 | Party refs + record origins |
| E-A02 Resolve Entity A | 确认目标法人的名称、地区及可用标识 | scope + synthetic registry evidence | 并排source comparison | reviewer按演示规则确认匹配；不填真实注册号 | resolution record；必要时等待标识 |
| E-A03 Record related entity | 记录Entity B与Entity A的关系 | reported structure | 显示relation type/source/status | 未验证关系保持reported | PartyRelationship，不自动加入counterparty scope |
| E-A04 Record representative claim | Person T声称代表Entity A处理资料 | request + representative claim | 结构化principal和action | 不能从Entity B的雇佣关系推断A授权 | Representative + claimed authority |
| E-A05 Assess evidence per action | 区分资料协调、声明、协议签署和交易指令 | EV-A03 + authority purposes | 指出缺少principal/action匹配 | 特定policy/authority reviewer；AI不能授予权限 | purpose-specific authority assessments |
| E-A06 Open exact gap | 创建对Entity A的指定用途授权缺口 | assessment result | 针对subject + purpose建request item | 先确认适当联络人与披露权限 | WorkItem + InformationRequest draft |
| E-A07 Accept response for review | 收到新资料后保留原版本并评估 | EV-A05或其他已提供材料 | 关联指定requirement/use；重评目标动作 | 不自动通过所有actions | 新EvidenceUseAssessment + decision ref |
| E-A08 Continue scoped preparation | 按各分支门槛显示可继续工作 | scope/entity/context revisions | 列出enabled、waiting、prohibited动作 | 适用case/branch hold优先；unknown不当true | Task enabled/waiting及理由 |

### 5.5 Authority 明细，而不是一个“大绿勾”

同一个 Person T与Entity A之间，可以存在以下不同的状态。以下是演示用途分类，不是该银行正式授权分类。

| Action purpose | 初始状态示例 | 对实际工作意味着什么 |
|---|---|---|
| Coordinate onboarding information | Evidence required | 可记录收到的请求；对外披露/委托提交的接受需另判 |
| Make declarations for Entity A | Not established | 不把其声明当作已具备所需授权的正式声明 |
| Execute product agreements | Not established | 不允许由岗位或协调权限推导签约权限 |
| Issue trading instructions | Not assessed | 不在当前原型执行交易；不得由其他权限继承 |

收到一份资料不等于确认上述四种权限。是否适用、证据是否充分、谁能确认，必须按相应scope和用途记录。

### 5.6 第二幕的正确结束

第二幕可以结束于：

- Entity A已经在演示中作为目标主体识别；
- Entity B仍为related party，其关系验证情况独立呈现；
- Person T独立建档并关联其声明；
- 对Entity A的指定授权证据仍待提供/复核；
- 已具备足够context的要求规划、有限来源查询或内部专业准备可继续；
- 整体Clear-to-Trade仍未完成。

这不是“ENTITY场景失败”。它使下一幕的Requirements和Evidence Request拥有明确问题。

## 6. 具体并行、等待与启动门槛

以下细化现有Scope/Entity相关依赖的开始、等待与完成门槛。原文件DEP编号存在碰撞，具体引用必须先按§18的来源与语义crosswalk处理，再使用仓库canonical ID，不按裸编号覆盖。

| 下游工作 | 本轮最小启动输入候选 | 可以先做什么 | 必须等什么才可进一步完成 | 责任/暂停约束 |
|---|---|---|---|---|
| Requirements planning / M2 | 当前scope revision；目标实体及已知product/booking context；适用规则包 | 生成已知部分的draft，标记缺失context | 正式确定/发出要求需按规则解决相关未知与授权 | 不将缺少规则的要求写成mandatory fact |
| Public/commercial retrieval / M3.1 | 能检索的主体标识；来源访问依据 | 查询/整理有权访问的资料及出处 | 用途充分性要另行评估 | 不查实个人/银行数据；现场仅合成 |
| Conflicts preparation / M7 | 可区分的主体、关系/业务请求及该任务要求的字段 | 建立冲突检查请求、进行已批准范围的准备 | 缺主体信息/潜在冲突需相应解决 | 原图支持M1早触发；精确字段为假设 |
| Preliminary screening / M4.1–.2 | 可识别subject revision + 已编制query scope | 执行有限合成pre-screen | 完整筛查群体与必要处置不能跳过 | 初筛不是全量完成；无实时筛查 |
| Legal intake / C1.1–.2 | 拟客户法人、产品scope、适用性评估 | 建立legal request、确定待评估协议范围 | 特定条款、credit inputs、授权及执行版本 | 可准备≠可签署；是否允许早准备待规则 |
| Credit applicability / C2.1 | product/context + counterparty scope | 判断何种credit work适用或记录未知 | 数据、评估、额度/条件和审批 | 不因FX名称自动造credit limit |
| Client-facing clarification | 精确gap、拟recipient、可披露内容及send permission | 起草简明缺口请求 | 发送或接受代理响应所需授权 | 未确认外部发送权限只draft |
| Agreement execution / C1.7 | 正确实体/协议版本、适用批准、相应签字权限 | 本组仅显示依赖 | 全部适用前置条件 | 不以联系人任命书替代 |
| Clearance publication / M8 | 适用条件、范围版本、最终确认与发布权限 | 显示Not ready及理由 | 各适用条件与指定授权 | 两场景结束绝不触发发布 |

**共同门槛：**任何并行工作都必须检查任务、分支及案件级hold，不能以“无直接依赖线”为由宣布安全继续。初步准备、受控执行、最终判断、对外动作必须区分。

## 7. 字段合同：本组冻结业务语义，保留仓库字段映射与生产验证

### 7.1 字段合并规则

- 下表是本组演示 logical contract。业务区分已确认；字段物理命名、存储形式及最终跨组Schema仍需对齐。Codex先对照已有schema建立alias mapping，不为本文重新命名全部字段；语义冲突须记录，不能静默迁移。
- 原始客户陈述、来源验证结果和产品推导不能存入同一个无法区分来源的value。
- `null`与`not_applicable`不同；未验证不是不真实，也不是自动高风险。
- 权限用途尽量一行一scope/action评估，不用一个代表人`verified=true`代表一切。
- 产品内部的employee action permission与客户representative authority分别引用，不共用角色字段。

### 7.2 Common metadata

| 字段候选 | Type | 条件/验证 | 用途 |
|---|---|---|---|
| id | string | 非空稳定ID；与registry对齐 | 跨资产关联 |
| revision | integer | >0；已采用的版本不静默覆盖 | version trace |
| case_id | ref | 关联有效synthetic Case | scope/context |
| provenance_refs | ref[] | 实质值须能回到来源或fixture | 事实与推导区分 |
| value_status | enum | reported / source_reviewed / inferred / unknown / conflicted，实际按字段实例 | 不将提取值冒充验证 |
| created_at / updated_at | datetime | synthetic事件时间；保留timezone | 顺序审计 |
| synthetic | boolean | 本轮所有业务fixture=true | 演示边界 |
| validation_status | enum | design_candidate / reviewed_for_demo / bank_confirmed | 没有银行证据不能用bank_confirmed |
| sensitivity | enum/reference | 演示层亦有角色view contract | 避免误导生产授权 |

### 7.3 Case / Request / CaseScope

| 字段候选 | Type | 本轮内容/为空处理 | 谁提供或确认 |
|---|---|---|---|
| request_id | ref | 原始关系请求 | requester/RM |
| request_source_ref | ref | synthetic email/intake record | ingestion |
| trigger_type | enum | new_relationship | RM/source |
| group_display_name | string | Group A；展示名不是identity key | client statement |
| relationship_intent | text/code | 建立新交易产品关系 | requester/RM |
| counterparty_entity_id | ref | Entity A；不包含所有related entities | scope reviewer候选 |
| related_party_ids | ref[] | Entity B及相关Person refs | reported/verified各自状态 |
| business_purpose | text/code | 采购付款相关外汇风险管理 | client stated；不评估是否适合 |
| requested_product_ids | ref[] | authored FX forward product concept | request；不等于approved product |
| product_scope_status | enum | draft / needs_review / recorded | internal eligibility另记录 |
| product_eligibility_assessment_ref | ref/null | 初始null + assessment pending | 相应业务/规则Owner未知 |
| sales_location | jurisdiction/ref/null | 使用来源值；未知保持null | RM/内部context |
| booking_entity_id | ref/null | 初始待确认；后可引用合成entity | appropriate business role候选 |
| booking_jurisdiction | code/null | 与bank entity关联；不从UI地区推导 | booking context |
| service_jurisdictions | object[] | 按实际design context；不把所有地点合并 | scope evidence |
| dd_level | enum/null | 未形成适用评估则null | approved/demo rule + reviewer |
| dd_assessment_status | enum | not_assessed / under_review / recorded | 独立于scope及risk approval |
| scope_status | enum | draft / clarification_required / working_scope_recorded / superseded（候选） | 不映射为client approved |
| scope_confirmation_ref | ref/null | 所确认的是工作范围及权限依据 | authorised actor by demo config |
| scope_revision | integer | source-linked版本 | system |
| confirmation_purpose | code | working_scope，不是risk_acceptance | decision semantics |
| unresolved_context_refs | ref[] | booking/eligibility等明确问题 | generated + reviewed |

`working_scope_recorded`不是必须新建的实际enum。已有schema若用`confirmed`，必须有scope/type语义，确保不会被其他组件当作客户已获准入。

### 7.4 LegalEntity / PartyRelationship

| 字段候选 | Type | 验证或为空处理 |
|---|---|---|
| legal_entity_id | ref | Entity A/B分别存在 |
| legal_name | string/null | 与commercial/group label分开，reported值保留来源 |
| entity_type | code/null | 结构类别不等于regulatory client classification |
| incorporation_jurisdiction | code/null | 和booking/sales/UI地区分别保存 |
| identifiers | object[] | 每项scheme/value/source/status；demo key不假装ACN/LEI |
| lei | string/null | 未取得则null；不要求所有demo实体虚构LEI |
| identity_resolution_status | enum | unresolved / under_review / resolved_for_scope（候选语义） |
| verification_status | enum | not_started / in_review / established / unresolved；具体用途要说明 |
| identity_verification_ref | ref/null | 引用具体EvidenceUseAssessment或Decision |
| relationship_id | ref | 一条关系独立对象 |
| from_party_id / to_party_id | ref | Entity B → Entity A |
| relationship_type | enum | reported_parent等；不等同beneficial_owner |
| relationship_status | enum | reported / under_review / established / disputed |
| relationship_basis_refs | ref[] | 所有权声明、登记资料等独立来源 |
| effective_from / effective_to | date/null | 来源未给不编造 |

不在本组穷尽BO/所有权模型；下游按要求继续识别。GLEIF accounting parent关系不是自然人BO结论。[B02]

### 7.5 NaturalPerson / Representative / AuthorityRecord

| 字段候选 | Type | 语义/验证 |
|---|---|---|
| person_id | ref | Person T |
| display_name | string | 合成角色别名；可后续批准合成人名 |
| employer_entity_id | ref/null | Entity B，证据状态独立 |
| business_role_title | string/null | Group treasury role，不能授予权限 |
| representative_id | ref | person相对特定principal的关系 |
| principal_entity_id | ref | Entity A；不能用employer字段代替 |
| claimed_role | string/code | 本人声明角色，与验证结果分开 |
| authority_id | ref | 对指定主体/用途的授权评估 |
| action_type | code | coordinate_information / make_declarations / execute_agreement / issue_trade_instruction（演示分类） |
| authority_scope_id | ref | 特定Entity A和case/product范围 |
| authority_status | enum | not_assessed / evidence_required / in_review / established / not_established |
| authority_basis_type | code/null | claim/appointment/mandate/other，实际合格类型待policy |
| evidence_use_assessment_refs | ref[] | 必须针对相同principal/action/use |
| assessed_by_ref | ref/null | product user候选，必须区别Person T |
| assessment_permission_ref | ref/null | 银行人员对该评估的权限引用；未知不可最终确认 |
| authority_decision_ref | ref/null | 可回溯最终判断及其范围 |
| valid_from / valid_to | date/null | 来源不存在不编造期限 |
| evidence_scope_match | enum | matched / partial / mismatched / unknown；不是AI授权结果 |

### 7.6 Purpose-specific EvidenceUseAssessment / WorkItem

| 字段候选 | Type | 本轮示例/约束 |
|---|---|---|
| assessment_id | ref | 对EV-A03的一个使用评估 |
| evidence_id / evidence_revision | ref + integer | 原资料不可变 |
| subject_id | ref | 需要确定身份/权限的subject |
| principal_entity_id | ref | Entity A |
| purpose_code | code | authority_to_coordinate_for_entity_a等，映射既有词典 |
| requirement_id | ref/null | 要求尚未形成时允许provisional context gap；建立后关联，禁止伪造已确认要求 |
| sufficiency | enum | not_assessed / sufficient / insufficient / unknown |
| reason_code | code | principal_scope_not_established（候选） |
| basis_refs | ref[] | 指向原文具体内容和演示规则 |
| supersedes_assessment_ref | ref/null | 补件后生成新评估；保留历史 |
| work_item_id | ref | authority review / scope clarification task |
| work_type | code | 明确具体工作，不只Task |
| source_scene_id | ref | SCN-SCOPE/SCN-ENTITY |
| owner_role_id / assignee_id | ref/null | 无人承接显示Unassigned；不指派真实员工 |
| wait_reason_code | code/null | authority_evidence / booking_context / subject_identifier |
| required_input_refs | ref[] | 精确缺项 |
| blocked_action_refs | ref[] | 哪些动作受影响；不默认全案 |
| due_at | datetime/null | 无SLA则null，不伪造3日倒计时 |
| status | enum | draft / ready / in_progress / awaiting_input / awaiting_review / completed / cancelled |

## 8. 已编制快照与事件：让“生活化故事”不脱离数据

### 8.1 四个演示快照

| Snapshot alias | 已知事实 | 关键未决事项 | 工作状态 | 整体状态 |
|---|---|---|---|---|
| SNAP-A0 | 有关系请求、Group A、Person T、拟FX业务 | 实际counterparty/booking/authority未确定 | scope draft | Not ready / scope unresolved |
| SNAP-A1 | 原请求已澄清为Entity A；Entity B为related entity | booking或product eligibility未完成的部分 | scope clarification/review | Not ready |
| SNAP-A2 | 工作范围按合成fixture记录；Entity A资料可用于范围识别 | authority、全部ownership/CDD、专业条件尚未闭合 | requirements draft allowed for known context | Not ready |
| SNAP-A3 | EV-A03不足以建立Entity A的指定代表权限 | 精确authority证据/判断 | authority task awaiting input；其他ready work可准备 | Not ready，显示具体未决项 |

这些为pre-authored narrative snapshots，并非用户点击Next就执行的真实业务记录。实际产品模拟动作可以生成另一个session revision，不静默回滚到脚本快照。

### 8.2 事件种子

| Event alias | object变化 | 不得同时发生的错误变化 |
|---|---|---|
| relationship_request_received | Request created + source linked | Client approved |
| counterparty_scope_clarified | 新scope revision + clarification source | Entire group authorised |
| working_scope_recorded | Working scope record + open questions | All DD satisfied |
| entity_context_reviewed | 指定entity及用途的resolution/verification记录 | Entire ownership chain verified |
| representative_claim_recorded | Person/principal/action的claim | Authority established |
| evidence_use_assessed | EV-A03对Entity A用途评估版本 | 修改/删除原任命资料 |
| authority_gap_opened | task + required input + wait reason | New EDD or blanket freeze without reason |
| downstream_preparation_enabled | 仅符合前置/hold检查的任务ready | All branch results complete |

每个event需要 `event_id`、`case_id`、`object_refs`、`event_type`、`actor_ref`、`occurred_at`、`source_revision`、`expected_revision`、`causation_ref`、`synthetic`、`before_after_refs`。具体交易实现和事件存储技术留D3/Codex设计，不在本轮宣称已有生产架构。

## 9. Journey / Modal / Product 的内容与形式

### 9.1 两张Journey卡

| 位置 | EN-AU / EN-US | 中文 | 首层内容 |
|---|---|---|---|
| SCN-SCOPE卡 | Define the relationship | 明确本次关系范围 | Trading entity、Product、Booking；最多一行具体未决事项 |
| SCN-ENTITY卡 | Establish entity and authority | 确认主体与代表权限 | Entity A、Representative、Authority evidence required |

两种英语标题可共用；授权相关词在实际面板分别使用authorisation/authorization。品牌、ID、地点不随语言改变。

### 9.2 Scope Modal

- 固定位置条：Current/Target、S1、RM/Ops、SCN-SCOPE。
- 主体：合成请求卡，与其相邻的Scope结构化摘要；不展示一篇解释文章。
- Archify：请求来源 → group/target-entity分离 → scope与booking/product context → clarification/recording；图的边由上述work contract生成。
- Current：同样需要做这些工作；跨文件核对的负担标为hypothesis。
- Target：显示产品准备的候选值、来源与未知，人工记录范围澄清。
- 状态条：Scope pending / Scope recorded for planning；绝不是Client approved。
- 产品入口：Review scope；带上case、scene、scope revision及return token。

### 9.3 Entity Modal

- 主体为Entity A、Entity B、Person T三个对象；reported parent和employment/representation分别连线。
- 对比EV-A03的内容与其拟支持用途，突出“不足以建立对Entity A的该项权限”。
- 人物照片不是关系证据；关系状态由文字/线型/标签组合表达。
- 默认只显示选中对象的必要关系，避免扩大成全部企业图谱。
- 最底部只显示具体任务/等待/可继续事项。

### 9.4 Product workspace

沿用第二主入口的共享Case workspace，不另建复杂intake平台。本组可以先实现必要的scope摘要、party records与状态，将深入互动资源保留给筛查切片。

候选标题：**Case、Scope、Parties、Authority、Tasks、Activity**。

不出现：Experience the AI、Follow these steps、See how we improve KYC、Ready to unlock trading等解释性副标题。

`Scope`旁i仅解释“本次关系、主体、产品与booking context的工作定义”。`Authority`旁i解释“针对某一主体和动作的权限依据；职位名称本身不是完整权限”。关键待办和阻塞始终在页面可见，不藏在tooltip。

### 9.5 操作与实际效果

| 按钮 | 实际模拟行为 | Guard/错误路径 |
|---|---|---|
| Save draft | 保存对应字段的draft及revision | 未输入不代表unknown被删除；并发版本冲突不覆盖 |
| Request clarification | 创建具体scope/authority缺口草稿和责任 | 无发送配置不直接发送；recipient未知时保留draft |
| Record scope | 记录本次工作范围及source reference | 必要context/权限未知时不能声称全部scope已确认 |
| Refer for review | 建立指向明确subject/action的review task | 无配置角色时显示Unassigned，不默认赋给Ops |
| Record assessment | 保存特定证据用途评估与依据 | 原证据不变；不能同步将所有authority改为established |
| Return to scenario | 恢复Studio来源场景 | 有未保存编辑先处理Save/Discard/Stay |

没有做成真实保存/任务/记录前，不用Success Toast伪装完成。提前可交付只读工作摘要，实际能力按版本标记。

## 10. 播放、聚焦、返回与媒体

### 10.1 Archify制作合同

- `DG-SCOPE-A`：真实对象分离、Scope context、unknowns和human clarification。
- `DG-ENTITY-A`：Entity/Parent/Person/Authority的不同关系与来源状态。
- `DG-ENABLE-A`：Entity/Scope字段满足后，Requirements、Conflicts、Legal/Credit准备等按各自门槛出现。

上述名字仅为alias，先并入既有diagram registry。全部流程/架构/关系图由本机Archify制作；Codex已获知技能安装，集成由其读取本地版本处理，不需Christina重复确认安装。

### 10.2 聚焦和播放

- 聚焦“Person T”时，同时保留principal Entity A、employer Entity B和相关证据用途，不能只放大头像。
- 聚焦“Record Scope”时看scope version、必要未知和会受到影响的下游准备。
- 播放清楚显示received/clarified/assessed/task-opened，不同时让所有分支跑到Complete。
- 人工澄清/评估点暂停；可进入任务或只查看已审阅结果；后者不伪造用户曾作决定。
- Step计数、viewport与Case readiness分开。
- 不为了故事动效重新排布所有矩阵卡。

### 10.3 返回与编辑

保存return context：case、scope revision、scene、role、stage、comparison、trigger、route cursor、semantic viewport、zoom、dialog tab。

最新语言偏好独立存储；返回不能用旧快照覆盖新语言。Prototype操作产生的新session业务状态也不能被return token回滚。若来源scope在期间发生变化，返回保留原场景位置，同时显示新scope/旧来源版本差异，不静默换主体。

### 10.4 媒体预算

- 主人物：先一个Client treasury role、一个RM/Ops角色视觉，避免四五个无必要头像。
- 静态场景图：合成请求与资料背景，不烘焙关键文字。
- 核心动态：Archify对象聚焦、关系/等待揭示；没有实质协作变化不做视频。
- 本组不新增视频制作门槛；视频继续优先保留给未来关键协作场景。
- 打印：请求摘要、scope、三对象关系、权限缺口、可继续/等待与来源；不以最后一个动画画面取代全部信息。

## 11. 本组Benchmark：三张卡，直接连到字段和工作

### B01 — AUSTRAC Corporate CDD / persons acting on behalf

- Source: 官方corporate CDD guidance，核对日期2026-09-07。
- Supported fact: guidance区分客户身份、代表客户者及其authority、beneficial owners、关系性质与目的；对具体代表关系需要考虑实际权限依据。
- Adopt: 将entity、representative、principal、authority purpose与evidence分开。
- Adapt: 将资料充分性与scope/action关联，用有权review记录支撑；实际例外、门槛、适用性需银行确认。
- Avoid: 不按职位授予签约/交易权；不声称本文动作类型或资料清单就是法律必填schema。
- Mapped: SCN-SCOPE、SCN-ENTITY、AuthorityRecord、EvidenceUseAssessment。
- Source outcome: 本文不引用任何效率或收益数字。

### B02 — GLEIF Level 1 / Level 2 identity relationship data

- Source: GLEIF官方Who Owns Whom，核对日期2026-09-07。
- Supported fact: Level 1用于entity reference identity；Level 2记录direct/ultimate accounting consolidating parents。
- Adopt: 实体标识与组织关系是不同对象及来源。
- Adapt: 将parent relation与其type、status、basis一起显示。
- Avoid: LEI存在不等于KYC完成；accounting parent不等于natural person BO；本轮不假定企业已有vLEI。
- Mapped: LegalEntity、PartyRelationship、source_refs。

### B03 — EUROCONTROL A-CDM milestones

- Source: A-CDM specification publication page，2025-01-30，核对日期2026-09-07。
- Supported fact: 显著事件里程碑用于触发下游估计、提醒与通知更新。
- Adopt: 把“范围澄清”“主体context可用”“权限缺口产生”作为明确事件，而非仅拖动卡片。
- Adapt: 事件影响具体依赖和接手者；Story读取这些事件。
- Avoid: milestone不是银行批准；航空安全和监管授权不迁移；不推导银行SLA。
- Mapped: AuditEvent、TaskDependency、StoryScene、resume conditions。

展示位置：Studio场景的折叠依据或内部Assurance Lens；不把benchmark Logo/长文案塞进产品工作台。

## 12. Living Case Lab 与本组的关系

本组仅提供可读数据投影，不增加第二个Controlled Inject，不把“换交易实体”变成新的现场P1功能。

| Lens | 本组读取什么 | 必须得到的同一事实 |
|---|---|---|
| Outcome | scope与未决authority/其他条件 | 只为Entity A及选定scope评估；整体Not ready |
| Work | 请求、澄清、任务、等待与可继续分支 | 谁需要什么资料/判断；等待有具体对象 |
| Assurance | request source、entity source、任命资料及用途评估 | 职位证明并不单独建立对Entity A的所有权限；未知可追溯 |

复线继承同一个snapshot reference；Shadow State不写入主线。原有P1“证据用途不足”的inject仍按之前批准的范围单独孵化，具体选取哪份后续证据在D3确认。初始发现EV-A03不足是baseline story事实，不等于又新增一次动态P1。

## 13. Automated Experience Red Team — 本组必测验收

下面是执行前约定的测试，不声称已经通过。业务Oracle必须来自经审核的demo rules、字段与预期快照，而不是模型自己写一句解释。

| Test alias | 反例/操作 | 预期 |
|---|---|---|
| RT-A01 | Group A与Entity A有相似名称 | 不自动合并对象 |
| RT-A02 | Person T有母公司任命资料 | 不自动获得子公司签约/交易权限 |
| RT-A03 | 上传EV-A03 | 不等于authority established |
| RT-A04 | Booking entity为空 | draft可保存；需要booking的下游判断仍等待 |
| RT-A05 | UI从中文切en-US | 不改变booking、principal、业务地区或权限 |
| RT-A06 | Scope记录完成 | 不显示KYC complete或Clear-to-Trade |
| RT-A07 | 尚未确定全部beneficial owners | 不把Entity resolution等同完整CDD完成 |
| RT-A08 | early Conflicts准备完成 | 不认为其他conditions完成 |
| RT-A09 | 有未保存Scope字段时返回 | Save/Discard/Stay明确处理，不丢输入 |
| RT-A10 | Story点击Next到末帧 | 不产生审批或更改产品session状态 |
| RT-A11 | 重新进入同一缺口任务 | 不创建重复请求/矛盾评估 |
| RT-A12 | registry source暂不可用 | Unknown/awaiting source，不补写结果 |
| RT-A13 | 角色无评估权限 | 可读范围与动作按fixture；不能仅隐藏按钮当作生产安全证明 |
| RT-A14 | Scope/Party revision变化 | 下游标记需检查适用性，不继承旧绿色结果 |
| RT-A15 | Lab读取本组 | 三Lens和主线snapshot一致；Lab修改不能污染主线 |
| RT-A16 | 返回并切换语言/zoom | 回同一卡片和主体，最新语言保留 |

## 14. 对Codex已在执行内容的增量处理

本文件已获 Christina 批准用于本组演示制作；不是银行签核、代码完成证明或测试通过证明。

执行时只定向更新：

| 既有资产 | 增量 |
|---|---|
| scenario_registry / SCN-SCOPE、SCN-ENTITY | 本文work contracts及内容引用 |
| synthetic_case_fixture | 批准后的案件设定、别名与快照；不替换不相关case数据 |
| field_dictionary | 两幕字段及nullable/source/authority/revision约束 |
| dependency_catalog | 对现有DEP-01/02/03/09/10等补细开始/完成门槛 |
| story_routes | A-01至B-05事件/beat alias映射；不混入审批执行 |
| benchmark_pattern_library | B01–B03来源、字段映射、Adopt/Adapt/Avoid |
| diagram_manifest | Archify三张关系图的内容，不改全站导航 |
| product action contracts | Scope/Parties必要读写与对应任务；不增加全角色完整系统 |
| red_team_oracle | 本组具体预期与边界；所有结果待实际运行 |

不重写v0.4整份主基线；在其决策记录中链接本组审核结果。已有字段、ID与组件能用则复用，不能因为新附件重新生成一套不兼容数据。

## 15. 设计批准与仍待银行验证的边界

### 15.1 已确认的案件设计

Christina 已确认：**澳大利亚经营实体申请外汇远期业务，境外母公司资金人员提出协调资料，但交易主体与其代表权限须分别建立**，作为合成 Living Story 主案件。

本组的SCN-SCOPE、SCN-ENTITY、故事节奏、用途级权限、未决状态和本地模拟操作可进入制作。以后各组沿用本组案件；不将演示设定改写为银行真实需求。

### 15.2 本组不要求Christina代替银行确认

- 银行scope/product/booking审批角色与标准；
- 具体客户代表用途分类及权限证明；
- 哪项准备可在何种资料不足下继续；
- 该产品及客户的法定/内部分类；
- EDD、Legal、Credit最终适用性及条件；
- 外部发送与保密信息披露权限；
- 生产数据字段验证、保留与技术架构。

以上保留为业务验证问题，但不阻止编制有清楚边界的合成内容。

## 16. Sources and receipts

### Project / working-design sources

- [S01] `Sanitised Process Map(1).pptx`，slide 1 Current与slide 2 Target：M0.1–M0.4、M1.1–M1.5、M3.1–M3.5、M4.1–M4.4、M7从M1触发、C1/C2、M8。Current原本已包含范围确定与外部来源查询。本文不把这些写成Target新发明。
- [S02] `Clear_to_Trade_Discussion_2_Living_Story_Scenarios_Benchmark_Spec_v0.1.md`，§4、§6.1–6.2、§7–10：首组场景、事件/字段、依赖、Shared Case Spine与benchmark轨道。
- [S03] `Clear_to_Trade_Experience_Principles_IA_Baseline_v0.4.md`，§1–3及相关返回/原型原则：D1收口、真实产品行为、无教学型subtitle、两个主入口。
- [S04] `Living Case Parallel Module Integration Design`：主线稳定、复线隔离、共享业务基础、Mandatory Automated Experience Red Team与人工Promotion Gate。
- [S05] `Confidential_Banking_Clear_to_Trade_Workshop_Prework_P0_P1(1).md`：一合成案件、三个验证点、有限变化；局部条件/授权/发布区分。

### External primary references — 继承Review v0.1的核对记录（2026-09-07）

本版保留上述研究结论与来源，不新增监管事实，也不将设计批准视作再次完成银行合规复核。

- [B01] AUSTRAC — Initial CDD for body corporate, partnership or unincorporated association.
  https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/initial-customer-due-diligence/initial-customer-due-diligence-guides-customer-type/initial-cdd-body-corporate-partnership-or-unincorporated-association
- [B01a] AUSTRAC — Overview of initial customer due diligence.
  https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/initial-customer-due-diligence/overview-initial-customer-due-diligence
- [B02] GLEIF — Level 2 Data: Who Owns Whom.
  https://www.gleif.org/en/lei-data/access-and-use-lei-data/level-2-data-who-owns-whom
- [B03] EUROCONTROL — Specification for Airport Collaborative Decision Making (A-CDM), 30 January 2025.
  https://www.eurocontrol.int/publication/eurocontrol-specification-airport-collaborative-decision-making-cdm

研究只支撑所述机制和概念。未把这些sources用于识别本客户；未进行实时银行查询；未据此确认产品适用性或权限。

## 17. Change log

| Version | Date | Change | Approval |
|---|---|---|---|
| v0.1 | 2026-09-07 | 首两幕业务、字段、依赖、界面与测试讨论稿 | 历史版本，已由本版替代 |
| v1.0 | 2026-09-07 | 记录Christina批准；新增Codex执行范围、跨组合同、来源编号碰撞处理、媒体接口和分组交付规则 | 演示设计批准；未声称银行签核或实现通过 |

**发布状态：本组演示设计已批准，执行文档已整理；HTML、Archify输出、Schema实现、媒体和产品操作的实际完成度由Codex提供运行证据。**


---

## 18. 先处理来源编号碰撞，不让分组交付制造数据返工

本次核对发现：**主基线v0.4的DEP-01至DEP-12，与D2总规格v0.1的DEP-01至DEP-14不是逐号同义。**例如前者DEP-05是Legal前置工作，后者DEP-05是Evidence到Residual Request。它们都是设计文件中的局部引用，不可被作为唯一全局键直接合并。

这不是银行流程变更；是现有设计底稿的编号一致性问题。保留原文，新增source-qualified crosswalk，不强行覆盖任何一份源。

| 依赖语义 | 基线v0.4引用 | D2总规格v0.1引用 | 本组使用方式 |
|---|---|---|---|
| Intake context → Conflicts | DEP-01 | DEP-01 | 启动/等待门槛 |
| Entity context → Preliminary screening | DEP-02的一部分 | DEP-02 | 初步查询不等于完整筛查 |
| Population → Comprehensive screening | DEP-02的一部分 | DEP-06 | 本组只保留下游接口 |
| Scope → Requirements | DEP-03 | DEP-03 | 已知部分可draft；缺失context仍有理由 |
| Requirements → Source retrieval | DEP-04的一部分 | DEP-04 | 只准备有输入和权限的资料查询 |
| Evidence gap → Residual request | DEP-04的一部分 | DEP-05 | 不等于自动发送 |
| Scope → Legal preparation | DEP-05 | DEP-09 | 只表示适用范围内的准备 |
| Scope → Credit applicability/preparation | DEP-06 | DEP-10 | 不产生额度或批准 |
| Credit terms ↔ Legal agreement revision | DEP-07 | 无单独同义条目 | 保留基线源记录，后组细化 |
| Finding → Human review | DEP-08的一部分 | DEP-07 | 后组实现 |
| Independent risk reason → EDD | DEP-08的一部分 | DEP-08 | 不从母公司地区/职位资料缺口直接触发 |
| Continuous QA / final sign-off | DEP-09 | 无单独同义条目 | 保留基线源记录 |
| QA gap → Remediation | DEP-10 | DEP-11 | 后组实现 |
| Conditions → Readiness | DEP-11 | DEP-12 | 本组输出Not ready的准确原因 |
| Readiness/authority → Publication | DEP-12 | DEP-13 | 本组禁止发布 |
| Evidence adequacy change → Re-evaluation | 分散于状态/影响说明 | DEP-14 | 唯一P1变化，非本组新增功能 |

Codex在仓库中建立/扩展`source_ref + raw_id + semantic_relation + canonical_dependency_id`映射。若已存在canonical ID，继续使用。若有冲突，不猜哪一个“最新编号正确”：记录两个来源，按含义找到现有对象；只将受影响引用留待局部确认，其余内容继续。

## 19. Batch A的输入/输出合同与后续组接口

### 19.1 进入本组

使用已有case ID；显示别名可为DEMO-CTT-001。预编制初始输入包含：

- Synthetic Request：Group A发起的关系意图，Person T声明由集团资金团队协调。
- Entity A：澳大利亚经营实体，初始为请求中的拟定主体/待澄清值。
- Entity B：新加坡母公司背景，关系初始为reported。
- Person T：在Entity B任职的联系人；没有因此获得Entity A的权限。
- Requested product：FX forward；产品意图与资格/批准是两件事。
- EV-A01、EV-A02、EV-A03：分别为请求、集团结构、职位资料。

EV-A04只在预编制的“合成来源结果到达/资料取得”事件后进入相应快照，不在A0中凭空存在。EV-A05不在本组结尾显示为已取得。本组不发明真实企业登记标识、银行booking实体或名单记录。

### 19.2 必须冻结给后组的业务不变量

1. counterparty是Entity A，不是Group A或Entity B；related party不能自动成为guarantor。
2. employer=Entity B与principal=Entity A分别记录；资料协调声明不是协议签字权。
3. Requested product与eligibility status分离；booking未知继续为空并有明确issue。
4. 原证据不可被用途评估覆盖；一份证据对一项用途不足不等于所有用途均无效。
5. 已记录working scope不等于全部context已确定，更不等于CDD/准入完成。
6. 每个权限用途保留独立状态，不用一个`verified=true`授予所有动作。
7. Story navigation与Product session、Lab shadow、Workshop decision记录分离。
8. 任何task/branch/case hold均可限制下游；输入“足够”仍需具体定义，未知不能当true。

### 19.3 本组主线出口

本组结束时，后续Requirements/Evidence组应取得：

| 输出 | 必须包含 | 不允许暗示 |
|---|---|---|
| CaseScope revision | Entity A、FX意图、相关主体、已知/未知booking及context | 客户/产品已正式获批 |
| Party records | A、B、T分别存在；reported关系及来源 | 全部BO/所有权已穿透 |
| Authority claims | Person T对Entity A按动作的声明与状态 | 职位自动授予代表权 |
| EV-A03 use assessment | 对具体principal/action/use的不足原因、版本、依据 | 删除任命书或认定其对全部用途无效 |
| WorkItem / Request draft | 指定缺口、owner或Unassigned、所需输入、wait reason | 邮件已实际发送 |
| Branch preparation status | 对每项工作记录eligible/waiting/not-assessed/held及原因 | 所有分支都已开始/完成 |
| Case aggregate | Not ready，scope/authority及未评估条件可解释 | 只有一个authority缺口，解决后就全部ready |
| Publication | not_requested | 已发布或已交易 |
| Story pointer | 停在SCN-ENTITY并可进入SCN-REQUIREMENTS | 自动完成下一组 |

后组尚未发布时，在开发评审中标记“待接入下一批内容”；不得拿未实现屏幕伪装成完成。已在仓库实现的同义场景继续使用，不能为了本稿清空。

### 19.4 具体技术一致性约定

- 与已有schema比较后，输出字段alias mapping；共享名称不得由独立分支任意改变。
- 没有生产审批规则时，使用显式的`demo_rule_ref`、`demo_permission_profile`及`synthetic=true`；界面保持Demo environment，不伪造客户policy reference。
- 最小reducer命令语义：SaveDraft、RecordWorkingScope、AssessEvidenceUse、OpenGapTask、ReferForReview。具体函数名沿用仓库。
- Save draft后重新进入应读到保存值；仅有toast不算完成。
- RecordWorkingScope可记录已知范围与未决项，不同时将eligibility/DD/authority改成通过。
- AssessEvidenceUse只改变一项用途评估；EvidenceArtifact内容与hash不变。
- OpenGapTask重复提交同一scope、principal、purpose、gap不产生重复开放请求；必须有命令ID或等价防重语义。
- expected_revision不匹配时返回冲突并保留输入，不用最后写入静默覆盖。
- 无权限的模拟命令由action层拒绝，不仅隐藏按钮；这仍不构成生产鉴权。
- 无法确认适用性时用unknown，而不是not_required；Readiness条件集合尚未加载或为空不能判ready。

## 20. 图片、动效、动画与产品UI：本组最低制作合同

详细格式和独立打样Prompt见配套媒体Brief。这里给Codex的硬边界如下。

| 资产 | 最低可交付形态 | 位置 | 与事实/动作的关系 |
|---|---|---|---|
| Persona | 两个角色视觉占位或已审核合成图：Person T、Bank Ops | Persona区/场景弹窗 | 图片不证明真实角色、身份或权限 |
| Scope scene | 正常HTML请求卡 + Scope摘要；可配无文字背景图 | SCN-SCOPE Modal | 可读文字来自locale资源，不烘焙进图 |
| Entity/authority关系 | Archify图 + 可读对象/用途信息 | SCN-ENTITY Modal | 明确reported parent、employment、claimed representation的差别 |
| Meaningful motion | 一次聚焦/逐步揭示/暂停 | Studio，不挤入产品正文 | 只呈现已审阅故事；不改业务状态 |
| Product UI | Scope、Parties、Authority、Tasks、Activity的必要部分 | 第二主入口 | 有实际draft/assessment/task行为，不只是图片热点 |
| Optional film | 可选15–25秒说明性短片，未完成时用静态图 | Studio场景；非首页自动播放 | 不能替代核心字段、真实控件或正式状态 |
| Print fallback | Scope、关系、缺口、待办及来源的静态布局 | Print view | 独立于viewport、播放游标及外部视频 |

本组必须有静态可读版本；不因等待其他对话的图片/视频阻塞执行。不得引入生成式关系图去替代Archify。图示源码与静态输出跟随diagram registry保留。

媒体完成后由稳定`asset_id + content_revision + variant_id`接入，不由媒体作者改case/role/scene ID。角色长相、镜头、光照可探索，人物组织关系、权限和结果不可随画面改变。

## 21. Codex任务包：本组执行到可review的增量，不全站重做

本节是已批准内容与验收的执行合同；Codex须先在真实repo读取技术栈和文件路径，再制定局部实现计划，不能将下列资产名误当作已经存在的文件。既有工程和测试优先，不新搭并行应用。

### A-T00 — 对齐当前工程与内容版本

**读取：** 当前Master Handoff、基线v0.4、D2总规格v0.1、本文Final、媒体Brief、现有scenario/schema/diagram registry。

- [ ] 确认SCN-SCOPE、SCN-ENTITY对应现有canonical IDs及代码/数据文件位置。
- [ ] 读取本机Archify实际skill；安装已由Christina确认，不重复问安装。
- [ ] 按§18形成dependency crosswalk，指出无法自动判定的局部映射。
- [ ] 记录当前git/工作区状态；不覆盖Xiaoming/Coco的未提交调整。
- [ ] 输出`batch_a_file_map`和`batch_a_delta_plan`：修改什么、不修改什么、引用版本、预期测试。

**验收：** 没有裸DEP编号误覆盖；Shared Case Spine只使用一套；不存在第二个独立案例。

### A-T01 — 合成案件、字段映射与快照

**读取：** §2、§7、§8、§19。

- [ ] 先建立/扩展RT-A01至RT-A08和revision/null/permission的可执行断言。
- [ ] 记录变更前断言结果；未实现测试不能写成passed。
- [ ] 合并A/B/T、EV-A01至EV-A04按事件进入的fixture；保留EV-A05未取得状态。
- [ ] 实现字段alias、metadata、snapshot revisions与来源，不伪造registered identity。
- [ ] 验证四个快照均Not ready；字段出现与事件顺序一致。

**交付：** batch-A fixture、field delta、source mappings、snapshot evidence、测试结果。

### A-T02 — 两个场景的Current/Target与三种语言

**读取：** §3–6、§9。

- [ ] 填入两个scenario的trigger、goal、work、wait、output与Process refs。
- [ ] Story A-01至B-05映射到已有route；四个快照和实际session不混用。
- [ ] 中英与en-AU/en-US各面板、状态、alt、i-help和错误消息覆盖。
- [ ] 保留Source/Industry/Hypothesis/Synthetic分级；“client-confirmed”不能由用户批准设计自动得到。
- [ ] 将B01–B03放在折叠依据，不放产品教学区。

**验收：** Current不被故意写差；Target未授予未知权限；所有引用可以回到来源或明确fixture。

### A-T03 — Archify关系图和媒体插槽

**读取：** §10、§20、媒体Brief。

- [ ] 为DG-SCOPE-A、DG-ENTITY-A、DG-ENABLE-A生成当前适用的typed specs。
- [ ] 按本机skill生成/验证可嵌入图；Current/Target和language依共享节点含义切换。
- [ ] 初始使用静态可读图，增加focus/播放仅作用于表示层。
- [ ] 对未审阅媒体提供正确静态回退，不显示伪播放按钮。
- [ ] 输出图示源码、render receipt、截图、静态导出与asset bindings。

**验收：** Person T聚焦不丢principal/employer；Unknown不是pass；关键内容无需视频也能读懂。

### A-T04 — 最小真实产品操作

**读取：** §9.4–9.5、§19.4。

- [ ] 复用已有Case workspace，不另建复杂开户系统。
- [ ] 实现/复用Save draft、用途评估、缺口任务、移交的动作与显示。
- [ ] 未实现能力先呈现只读数据，不设置假Success。
- [ ] 屏幕标题保持Case/Scope/Parties/Authority/Tasks/Activity；不加推介、教学subtitle。
- [ ] i-help支持hover、focus、touch，阻塞/错误始终可见。
- [ ] 验证重复提交、旧版本写入、无权限、资料缺失。

**验收：** 保存后可重开；缺口任务可追溯；不产生外部消息、CDD通过或准入发布。

### A-T05 — 返回、播放、语言与打印

**读取：** §10.2–10.4和主基线return contract。

- [ ] 长矩阵任意位置打开scene/产品，再恢复semantic anchor、role、comparison与viewport。
- [ ] 有未保存编辑执行Save/Discard/Stay；后退/关闭不静默丢输入。
- [ ] 最新locale优先于return token旧值；业务session新版本不被返回覆盖。
- [ ] Play/Pause/Next/Replay不产生业务决定；restore narrative view不是Reset demo。
- [ ] Print生成所选scope的静态内容，关闭print回到原位置。

**验收：** 跨语言/Target/Prototype往返、媒体失败、reduced motion仍可完成本组。

### A-T06 — 增量整合与质量交接

- [ ] 执行§13与§24测试；区分测试失败、未运行、业务问题、技术阻塞。
- [ ] 记录主线未加载Lab/视频时仍可运行的证据。
- [ ] 核对后组输出合同；不实现未经确认的后组批准或全部Workspaces。
- [ ] 生成提交清单、before/after截图、已支持操作、未实现媒体、未决业务事项。
- [ ] 本地提交仅包含审阅过的本组改动；不自动push、发布或发送。

**交接后停止：** 等Christina review本组增量；后组已获批准的独立任务可继续，但不得自行把本组标成整个D2完成。

## 22. 一组一组交付，但共同合同集中管理

**推荐节奏：逐组批准、逐组实现、相邻组联调、最后D2总验收。**不等待全部D2结束，也不允许每组重新决定case/schema/navigation。

| 组别 | 拟覆盖场景 | 上游合同 | 可并行事项 | 本版批准状态 |
|---|---|---|---|---|
| A 范围/主体 | SCOPE、ENTITY | 已有Shared Case Spine与D1 | 媒体格式打样、后组研究 | **已批准执行** |
| B 要求/证据 | REQUIREMENTS、SOURCE、GAP、VALIDATE | A的scope、parties、authority gaps | Evidence source研究 | 讨论候选，不由A自动授权 |
| C 筛查/评估 | POPULATION、MATCH；EDD仅适用分支 | A主体/版本、B证据用途 | 一个筛查完整切片优先 | 后续批准 |
| D 并行专业工作 | CONFLICTS、LEGAL、CREDIT | A scope及相关B/C输入 | 可在A合同固定后细化，不必等C“全部结束” | 后续批准 |
| E 核验/准入 | QA、READINESS、PUBLISH | B/C/D条件、授权与版本 | 条件表接口可早准备 | 后续批准 |
| F 汇总/复线验证 | 全案story、Three Lenses、有限Inject、benchmarks/requirements | 稳定主线数据与事件 | Lab隔离孵化、红队贯穿全部组 | 单独门禁，不新增第八个Discussion |

这是D2内部制作分组，不是替代五阶段，也不是银行业务执行顺序。

### 22.1 先固定的共享合同

统一case/scene/object IDs；scope/entity/representative/authority语义；unknown/not-applicable；revision/provenance；Story/session/Lab隔离；locale/region/policy分离；return context；asset/content revision；readiness不由局部完成推定。

### 22.2 允许逐组扩展的内容

新增有明确来源的字段、场景、action、依赖或asset；扩展词典要写兼容映射。不得删除或重解释上组字段来迎合新画面。

### 22.3 需要停下做impact review的变化

新增交易主体；改变产品/booking scope的既有含义；合并代表权限；改变state enum含义；重新解释一个ID；让某局部完成自动放行；添加新外部发送；改变主导航或返回合同。

### 22.4 每批交付回执

`batch_id / approved_input_versions / case_fixture_revision / schema_delta / canonical_id_crosswalk / output_scene_ids / supported_actions / media_candidates / test_commands_and_results / unresolved_business_questions / next_batch_contract / rollback_or_restore_reference`。

如果主线开发与媒体对话都在推进，共享manifest指定每个资产当前正式版本。媒体候选不覆盖主线文件，只有批准版本进入host绑定。

## 23. 媒体与交互打样是独立生产轨，不是Living Case Lab

- **Media Sampling Track**研究视觉与叙事表达；输出图片、动效、视频/HTML样片与manifest。
- **Living Case Lab**检验业务结果、工作与控制；使用Shadow State和Candidate Delta。
- 二者都不能直接改主线，但用途不同，不能把每次改动画都当成业务Fork。
- 本组Lab只读CaseScope、Authority、WorkItem等已有数据；不加入新的“更换交易实体”Inject。
- 本组媒体有静态fallback，不以等待视频阻塞P0。

## 24. 补充发布验收：技术、内容、视觉分别有证据

原RT-A01至RT-A16继续必测，新增：

| Test alias | 动作/条件 | 确切预期 |
|---|---|---|
| RT-A17 | 初始快照A0 | 仅EV-A01/02/03可用；EV-A04有后续取得事件；EV-A05未收到 |
| RT-A18 | 空条件表或applicability unknown | 不判Ready，不标not_required |
| RT-A19 | 保存旧revision的Scope | 拒绝静默覆盖，显示冲突并保留用户输入 |
| RT-A20 | 同一authority gap双击创建任务 | 同一开放缺口不产生两个重复任务/请求 |
| RT-A21 | 独立媒体样片播放到最后 | 不更新Shared Case Spine、不记录审批 |
| RT-A22 | 从Current进入Target产品、切中文、保存draft、返回 | 回原Current位置；保留中文及新的draft，不回滚session |
| RT-A23 | 查看Authority旁i | 鼠标/键盘/触屏可读可关闭；未知/阻塞仍在主页面 |
| RT-A24 | 未提供媒体或播放失败 | 静态对象/关系/结果可读；无假播放或假success |
| RT-A25 | 打印时当前位置在中段且部分卡未渲染 | 打印选定完整scope，保留图例/定位/状态，不只截当前viewport |
| RT-A26 | 同一个DEP-05来自两文档 | 通过source-qualified mapping分辨Legal与Residual Request，不覆盖 |
| RT-A27 | Media candidate版本比approved版本新 | 不自动替换主线；必须有promotion记录 |
| RT-A28 | Lab不可加载 | Mainline与本组返回/操作仍正常 |

Codex报告实际执行命令/环境/结果与截图，不能以“测试用例已写”代替“测试通过”。业务规则不确定与产品实现缺陷分开记录。

## 25. 可以直接复制给Codex的执行指令

> 本次只执行已批准的D2 Batch A：SCN-SCOPE与SCN-ENTITY。先读取本Final v1.0、现有设计基线v0.4、D2总规格、媒体Brief以及仓库已做的内容。不要重写整站或重开Discussion 1。保持同一合成案件：澳大利亚Entity A申请FX forward，新加坡Entity B为reported parent，Person T任职于B并声称为A协调资料，具体authority尚未建立。
>
> 先输出简短file/delta map和source-qualified DEP crosswalk，沿用现有ID、schema、技术栈和本机Archify。然后执行A-T01至A-T06：数据/字段/事件→Current/Target场景→Archify静态/聚焦表达→最小真实产品动作→返回/双语/打印→红队回归。未知银行权限以显式demo config与业务问题处理，不补政策；媒体未收到不阻塞，用静态fallback。Play/Next、图片和视频不能写业务状态。
>
> 必须覆盖本组输入输出与RT-A01至RT-A28，按实际情况报告passed/failed/not-run与证据。本组完成后交付可review的增量、字段/依赖差异、样片接入状态和后组接口，不自动推进未批准组、不声称全部D2完成、不push或发布远程服务。

## 26. 本次发布记录

- Approval source：Christina在本轮明确确认Batch A Review增量稿，并要求制作Final交给Codex。
- Design scope：Batch A演示内容已批准；媒体格式要求为本轮制作约定，样片视觉需要单独选版。
- Business status：所有案件数据合成；银行实际规则、权限及产品资格仍待验证。
- Source preservation：Review中的work contracts、字段分组、快照、证据用途和16条测试保留；本版增加执行接口和明确变更说明。
- Source consistency：发现并记录DEP语义碰撞，不将它掩盖为“完全一致”。
- Runtime claim：本轮没有操作Christina本机Codex、没有生成Archify关系图、没有运行HTML，也没有创建媒体资产。
- Distribution：只给获授权的制作团队与工作区；媒体对话只需要配套的最小Brief，不携带未去识别原图或其他客户资料。

**End of Batch A Final v1.0 — approved demo design, not a production KYC specification.**
