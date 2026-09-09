# Clear-to-Trade — Discussion 5 · Product Experience
## To-be 产品体验：透明进度、时间预估、角色历史与可配置工作台

- **版本：** v0.2 · 2026-09-07
- **Owner：** Christina
- **客户称谓：** Confidential Australian Banking Client
- **性质：** D5 详细设计评审稿；不是 Codex 已完成页面、银行签核或生产实施报告。
- **延续：** D1 信息架构；D2 A–F 业务场景；D3/3A 前后映射与分支；D4 Operating Model 子页。
- **本轮更新：** 依用户新反馈补充逐步进度/时间、RM邮件沟通默认值、历史案件、固定核心/用户可选模块、统一工作标识。具体字段与交互为本稿细化；银行规则与未决问题仍未签核。

> **D4 解释工作应该如何分配；D5 让使用者真正完成自己负责的那部分工作。**
> 不重建银行业务体系，不部署 Agent，不把 229 个动作变成 229 个按钮。

## 0. 阅读方式与设计边界

先读本节更新表和第18–25节，了解此次增量；第1–17节保留并定向修订v0.1业务体验基础。第26节是Codex可直接使用的执行指令，第27节是新增验收。不要只实现新增模块而忽略旧任务的权限、版本与返回合同。

配套 `Clear_to_Trade_D5_Product_Experience_Bindings_v0.2.json` 是作者层映射：15场景、94原工作、229动作 → 建议产品呈现位置。它不是新的业务数据库、实际路由或银行权限配置。

### 0.0 本轮优先级、变化范围与记忆边界

| 新反馈 | v0.2决定 | 对旧稿的影响 |
|---|---|---|
| 颜色已由Codex修改 | **当前Codex工作区最新token/组件为视觉基线** | 覆盖旧稿的具体配色建议，不回滚用户改动；本轮未查看该源码，实际路径/commit由Codex记录 |
| 每步进度透明 | 案件视图＋当前工作步骤＋进度明细共用同一投影 | 不是新的进度百分比，也不是按229动作计数的完成条 |
| 谁做、何时进入、预计多久 | 每步有Owner、下一责任方、时间事实和预估依据；无法预计必须解释 | 原“不虚构SLA”继续保留；现在允许明确配置的合成时长演示 |
| RM默认邮件 | 邮件为关系沟通默认入口；保留有限安全提交 | 草稿辅助为nice to have，不接邮箱/不自动发送 |
| 每角色历史/归档 | 统一Cases入口下的Active、My completed work、Archived；客户仅本人历史请求/回执 | 允许轻量新列表，不建设生产归档/保留/销毁平台 |
| 核心固定＋模块自选 | 核心工作不可隐藏，可选模块可添加/移除/排列并保存个人偏好 | module可选不意味着业务控制可选；同一数据，不另建Dashboard真相 |
| 下一动作/预警/顺利/block统一 | 工作状态、时间健康、下一行动、数据时效分层；用统一图标/标签 | 不让颜色同时承担演员、转型类型和业务结果 |

用户明确授权了本次更新方向。本文的具体字段、图标、模板与模块名属于本轮设计细化，不等于银行政策已确认。

**关于“畅想”里的module：**本次记忆与文件检索未找回其固定/可选模块的完整旧清单，不冒充已经记住原清单。采用用户这次明确的“核心固定、其他可自选”作为当前规则；第21节是本轮提出的具体清单。Codex若找到已有可用模块配置，先做语义映射，不新造第二套模块。主线模块化工作台与Living Case Lab/Three Lenses仍是不同内容。

本稿是v0.2整合稿，不需要同时逐条执行v0.1与v0.2两套命令。v0.1仍保留作历史来源；原D3业务未决问题与D4模型初评分值不因此次UI更新被批准。

### 0.1 已确认且继续保留

- 两个一级入口：Journey / Scenario Studio；Product Prototype。
- Operating Model 是 Studio 内的独立子页；不把选择评分和 Skill 目录搬进银行工作界面。
- 同一合成案件：Entity A、Entity B、Person T、FX forward 产品意图及既有未决事项。
- Screening Review 是主要深入操作切片；RM/客户资料协作、用途评估、专业条件、QA/准入采用既有最小模式。
- 产品没有教学型副标题；必要概念放小 i，关键阻塞、错误和权限不足直接可见。
- **默认客户通过邮件与RM沟通**；必要的敏感资料提交继续使用已批准的有限安全任务/辅助提交路径。邮件沟通不等于改成邮件附件作为唯一证据库。RM回复草稿为nice to have，不连接真实邮件。
- 流程、关系与架构图使用本机 Archify；普通字段、表单、按钮和列表由 HTML 制作。
- 导航、播放、比较与语言切换不得写入业务决定；只读解释、产品会话、Lab Shadow 分开。

### 0.2 本轮不承诺

不承诺已存在生产身份服务、服务端权限、真实扫描/筛查/邮件/电子签署、实时模型输出、稳定自动化效果或任何银行政策。已有 Codex 页面是否完成，必须读取当前仓库及实际验证证据后才可判断。

### 0.3 不把既有缺口静默修掉

继续保留 Target 重号/删除线、Legal 草稿来源、实际 QA/准入权限、Applicability 枚举、Credit 条件定义及履行、最终 Closure Manifest 等 D3 问题。D5 可显示其后果和未决状态，但不授权自行解决。

尤其：D5 的“记录中缺少充分性评估”不等于“证据无效”；“可以阅读一个来源链接”不等于“本案已经具备使用权”。

## 1. 产品设计单元：以任务和工作对象为核心，而不是以 Agent 为核心

### 1.1 三种组织方式的取舍

| 方式 | 本案问题 | 采用程度 |
|---|---|---|
| 按系统功能堆 Dashboard | 用户要自行寻找同案资料和下一步，容易变成卡片墙 | 不采用新的总控 Dashboard |
| 按每个流程步骤建一页 | 229动作被误变229屏；频繁跳转，职责与状态被割裂 | 不采用 |
| 按 Case/Task/Object 进入，按角色提供内容 | 在正确案件中直接进入眼前工作，完成后看限定结果 | 推荐；复用既有页面与组件 |

**最小可操作单元 = 谁要在当前任务中，对哪个对象做什么，依据什么，保存后改变什么。**

D4 的 Rule、Skill、Agent 与 Human 仍是底层分工。产品用户通常看到“待补信息、已准备材料、待审阅、已记录”，而不是先从Agent列表选择执行者。

### 1.2 三种环境严格分开

| 环境 | 用户动作 | 可变状态 | 本轮身份 |
|---|---|---|---|
| Studio / Operating Model | 看方法、比较、查看Skill、播放 | 作者选择、视野、讲解检查点 | 只读方案解释 |
| Product Prototype | 保存、提交、补件、移交、记录 | 已获准本地命令改变当前合成会话 | 可操作模拟 |
| Living Case Lab | 已定义的受控条件变化 | 独立Shadow/Delta | 副线验证，不覆盖主线 |

进入产品不是“执行了Agent”；角色切换不是生产登录。模型输出使用已审阅样例时明确标注来源为合成材料，不能在Activity中伪造实时Skill调用。

## 2. 谁先进入、看到什么、不能做什么

以下是演示视角与权限投影候选，不是确认银行组织架构。Case Manager / KYC Operations 继续保留组合优先视角，具体岗位边界留原问题。

| 视角 | 最先要回答 | 默认入口 | 不得默认获得 |
|---|---|---|---|
| Case Manager / KYC Operations | 我现在可处理什么，哪些需等别人？ | 已有Tasks或同案Overview的可行动作 | 所有专业决定权、全案准入权 |
| Relationship Manager | 客户还需做什么，我应该解释/协调什么？ | Client requests投影 | 受限名单叙事、完整冲突调查、豁免要求的权力 |
| Client contributor | 为什么找我、只需提交哪项内容？ | Your tasks有限任务入口 | 整案内部状态、其他人的私人资料、签约权 |
| Screening reviewer | 当前需要判断什么，资料是否够，权限是否允许？ | 指定Finding的Screening Review | 无限来源读取、永久客户白名单、全案准入 |
| QA reviewer | 哪个检查有问题，补正是否真正被重审？ | QA Remediation Detail | 通过QA自动完成所有领域条件 |
| Clearance reviewer | 当前范围是否有完整依据可确认？ | Clearance的限定确认任务 | 没有配置的最终权限、自动交易执行 |
| Legal/Credit/Conflicts/EDD | 我负责的条件、版本和等待是什么？ | 共用Condition Detail，只展开本轮已有切片 | 本轮新建完整专业审批或交易系统 |

“分配给我”与“我有权决定”分别检查。任务归属不是权限证据；无有权角色配置时保持只读与明确缺权原因。

### 2.1 产品入口也有两种，不强迫用户看首页

- **从Studio或Operating Model进入：** 带Case/Scope/Task/Finding/输入版本与ReturnAnchor，直接进目标工作。
- **直接打开Prototype：** 优先恢复已有有效会话；不存在时让用户明确打开合成示例，不静默重置。

本轮允许增加轻量Cases/History入口：当前案件、本人处理记录及获准查看的归档。优先复用已有列表；不建设企业级搜索、管理报表、排班或生产档案平台。逐步时间是透明度设计，不构成未确认的银行SLA。

## 3. 一个产品外框，少量可复用工作模式

### 3.1 外层演示工具与产品导航分离

外层可有：Demo environment、查看角色、返回Studio/Operating Model、显式选择已编制示例、语言。

产品内沿用正常业务名称：Cases、Overview、Parties、Requirements、Evidence、Requests、Screening、Tasks、Activity、Clearance；History/Archived属于产品内部列表视图。保留仓库已有可用导航，本稿不要求重建整个菜单。

角色、恢复基线、故事播放、D4分数、Agent/Skill目录不出现在客户的正常业务导航中。

### 3.2 持续定位，只放当前必要信息

每项任务最少持续显示：
- 当前工作标题与Task/Finding引用，Entity及Subject；
- 案件总览定位与当前本地步骤，二者不能混同；
- 状态、Owner、下一责任方和明确下一动作；
- 进入当前步骤的时间、当前等待及有依据的预计时长/未能预计原因；
- 关键预警/阻塞与返回来源。
采用紧凑固定摘要，不将所有历史明细钉满页头。

Product、Booking context、Scope revision、证据/查询版本可展开查看，但关键版本过时必须直接提示。不能为了完整把所有ID堆成三排密集页眉。

### 3.3 三层内容

1. **当前要解决什么：** 工作状态、确切问题、下一责任方。
2. **根据什么解决：** 必要事实、原始依据、候选分析、未知项。
3. **我能执行什么：** 明确动作、输入校验、有限后果；结果后留在同一任务。

所有字段齐全不代表全部同屏。默认看当前任务必要资料，再展开相关证据、历史、依赖。

## 4. 全场景到产品的映射

`PX-*`是D5作者视图别名，不是新的业务ID、强制路由或12套系统。具体对象/动作ID继承原JSON。首版所有可运行范围以已有批准切片和实现盘点为准。

| Pattern | 产品内容 | 深度 |
|---|---|---|
| PX-01 | Case Overview与已有Tasks投影 | 薄入口；阻塞、责任、允许的下一动作 |
| PX-02 | Scope / Parties / Authority | 共享对象摘要、已获准必要编辑；不完整重建实体平台 |
| PX-03 | Requirements / Evidence关联清单 | Requirement-first，选择要求后看资料与缺口 |
| PX-04 | Requests：项目、收件人、审阅、派发 | 延续B最小可运行协作 |
| PX-05 | RM Client requests / Contacts / Activity | 关系沟通与客户可理解进展 |
| PX-06 | Client Your tasks / Submission | 有限贡献者可保存、提交、查看本人回执 |
| PX-07 | Evidence Review | 相应主体/用途的必要评估切片 |
| PX-08 | Screening Population / Coverage | 最小范围与覆盖摘要，不建全量名单管理 |
| PX-09 | Screening Review | 主要完整交互切片 |
| PX-10 | Condition Detail | Conflicts/Credit/Legal/EDD共用；专业过程主要只读 |
| PX-11 | QA Remediation Detail | 一次精确补正与重审，不建完整QA平台 |
| PX-12 | Clearance | 当前依据、限定确认、独立模拟发布 |

| Scenario | PPT范围（精确原位置继续继承） | 主产品位置 | 用户应能完成或理解 |
|---|---|---|---|
| SCN-SCOPE | M0、M1.1–.3 | PX-02 | 请求与实际Scope/产品资格分开；缺项可见 |
| SCN-ENTITY | M1.4–.5、M2/M3上下文 | PX-02 | Entity、雇主、Principal、动作权限分别有据 |
| SCN-REQUIREMENTS | M2.1–.5 | PX-03 | 要求针对谁、为何适用、还缺什么 |
| SCN-SOURCE | M3.1/.2/.4/.5 | PX-03→PX-07 | 找到的资料、来源、用途及未评估状态 |
| SCN-GAP | M2.5、M3.2/.3及回应 | PX-04→PX-05/PX-06 | 客户可理解请求、有限响应和回执 |
| SCN-VALIDATE | M3.4/.5 | PX-07 | 记录特定用途的评估，而非修改资料真伪标签 |
| SCN-POPULATION | M4.1–.4、M4.7接口 | PX-08 | 已知主体与完整适用覆盖的区别 |
| SCN-MATCH | M4.5–.7及Target人工节点 | PX-09 | 看证据、补件/移交/有权处置、看局部结果 |
| SCN-EDD | M2.4、M5及人工节点 | PX-10 | 独立适用性与风险问题，不能因没演示就不适用 |
| SCN-CONFLICTS | M1→M7 | PX-10 | Search、专业判断、clearance与hold分层 |
| SCN-CREDIT | C2.1–.7 | PX-10 | 批准条件、具体条件内容、履行/Legal采用版本分开 |
| SCN-LEGAL | C1.1–.8 | PX-10 | 协议、Credit输入、批准和签署版本分别有据 |
| SCN-QA | M6.1–.8 | PX-11 | 精确缺口、补正、独立重审及签核范围 |
| SCN-READINESS | M8.1 | PX-12 | 完整条件清单、当前阻塞、owner与下一动作 |
| SCN-PUBLISH | M8.2–.5 | PX-12 | 确认、记录、发布与沟通分开，未执行交易 |

这张表不授权为每个Human专业动作新增一个Approve按钮。没有批准的可操作切片时，以真实的合成输入/状态只读呈现；将其可运行性登记为未包含。

## 5. 主操作链：从复核任务出发，而不是把全部A–E又演一遍

### 5.1 推荐首条D5产品样板

| 时刻 | 用户看到/执行 | 真实本地效果 | 不能顺带改变 |
|---|---|---|---|
| P1 打开Finding | Person T疑似命中、身份资料不足、Scope与原查询 | 只读读取当前任务 | 不从Story导入新批准 |
| P2 检查依据 | 对比属性、原资料、用途评估及未知 | 选中/阅读，不写判断 | 已查看不是已审阅或已批准 |
| P3 提出补件 | 从具体缺口建立Request draft，检查收件与可披露内容 | B的原Request/Item机制，保留旧请求 | 不覆盖初始授权/ownership项目 |
| P4 客户回应 | 通过有效有限Grant提交指定合成资料 | Submission、Artifact、收到状态 | 不自动变Sufficient |
| P5 Ops评估 | 对身份区分用途审阅新资料并记录 | 当前EvidenceUseAssessment新版本 | 不赋予签约权限 |
| P6 复核者处理 | 重新读取当前资料；记录有依据处置或转交/未决 | 配置允许时产生Decision与限定更新 | 不永久white-list Person T |
| P7 回到案件 | 原Finding结果、Coverage与其他条件 | 从当前对象投影实际影响 | 不自动把Legal/ownership/QA全部关掉 |
| P8 返回Studio | 回到原Scenario/Action/模式 | 仅导航；保留产品保存结果 | 不回滚Case或最新语言 |

P4/P5并非点击Next自动发生。需要进入相应角色的本地模拟任务操作，或由外层明确打开独立的已编制示例会话。后者必须标明，不能记为当前用户刚完成的业务事件。

### 5.2 四个受控状态样例

- **CHK-01 资料不足：** 合成包不支持结论；补件/转交可用，正式处置不可无依据完成。
- **CHK-02 新资料已到、未评估：** 文件存在，但不能直接录正式结论；链接到相应用途评估。
- **CHK-03 当前用途已审阅：** 有权复核者可根据材料决定；不是必须排除，也可继续未决。
- **CHK-04 局部决定已记录：** 原处置与时间可查，其他Case条件按事实保持。

这些是作者检查点别名。与已批准fixtures先映射，不增添幕后证据、权限或成功结果。当前操作session、独立示例和Lab分别标识。

## 6. Screening Review：第一张需要做到专业可用感的页面

### 6.1 信息布局

- **头部：** Screening Review；Finding、Entity A、Person T、当前任务状态与责任。
- **问题条：** 当前确切阻塞，如 Identity evidence required；不添加教学口号。
- **主体：** 约三分之二宽度为对照/证据，余下为当前复核输入；这是稳定内容分区，不是弹出侧边栏。窄屏上下排列。
- **动作区：** 随当前角色/阶段显示一个主要动作及少量次动作。
- **结果区：** 保存或处置后原位显示记录、所审版本、受影响与仍未完成条件。

比例是待Xiaoming/Coco校准的布局提案，不要求死锁像素。资料较长时正文滚动，当前任务标题与动作定位保留；不能截断关键警告。

### 6.2 字段级呈现合同

| 字段/内容 | 来源 | 呈现及编辑 | 缺失/异常 |
|---|---|---|---|
| Case / Entity | CaseScope.counterparty_ref | 只读链接，保持当前Scope | 无有效对象不进入别案替代 |
| Subject | Finding.subject_snapshot_ref | Person T，明确与Entity A的关系 | 不从display name猜主体 |
| Finding / Run | finding_id、run_ref | 精确记录入口 | 缺原Run显示来源缺口 |
| Review state | Finding.triage_status | prepared/awaiting information/under review等映射 | 未定义映射保留Unknown |
| Owner | assigned_role/assignee refs | 当前负责人；真实无分配则Unassigned | 不造人名和到期时间 |
| Input revision | subject/provider/scope/evidence refs | 默认摘要，过时直接提示 | Stale时保留草稿，阻止旧输入正式记录 |
| Attribute | AttributeComparison.attribute_code | Name、Birth date等存在的属性 | 不按模板补造缺失事实 |
| Subject / Record value | 两方claim refs | 并排，保持多值、精度、原始文字 | 未知/不可比较明确，无值不写Different |
| Comparison result | similar/different/inconclusive/not_comparable | 计算/准备结果，不作正式处置 | 原文不支持时标争议待复核 |
| Source locator | 原Claim出处/页/版本 | 点击在同任务来源阅读区定位 | 无出处不冒充verified |
| Evidence use | assessment.requirement/subject/purpose | 显示本用途及评估状态 | Coordination与身份/签约用途不混同 |
| Prepared content | 既有合成ReviewPack | 独立区分事实、未知、候选摘要 | 外层/元数据标Authored sample；不伪实时生成 |
| Decision option | 配置允许的disposition | 初始不预选；按权限及输入决定可用项 | 证据不足不是选择排除的捷径 |
| Rationale | 当前review draft | 有权用户输入/修订；不预置有利结论 | 正式记录前按合同校验；草稿可不完整 |
| Evidence used | 当前合适EvidenceUse refs | 精确选择/引用，不是每读一份就自动入选 | 版本变化提示复核，不能继承旧选择含义 |
| Additional approval | 配置要求及实际批准ref | 仅适用时显示独立状态 | 不强制所有案件再加一层批准 |
| Recorded outcome | Decision引用/时间/依据 | 成功写入后只读，可看历史 | 失败不生成“已记录”与时间 |

### 6.3 产品动作：一项动作不能暗含所有后续批准

| 动作 | 可用条件 | 保存/执行结果 | 失败或无权限 |
|---|---|---|---|
| Save draft | 当前用户可编辑该任务 | 保存草稿与所用输入引用 | 失败留表单；版本冲突不丢输入 |
| Request information | 有精确Gap；可以准备请求 | 打开已有B请求草稿并携带Subject/Purpose/Finding | 缺收件/披露仍可保留合法草稿；不能自动发信 |
| Refer | 允许移交，具备目标/理由规则 | 关联Referral/Task；去向明确才表示已路由 | 无目标显示Unassigned或待配置，不发到虚构人 |
| Record disposition | 当前输入、有依据、权限、理由及适用批准齐备 | 创建有范围Decision＋事件，更新显式相关状态 | 版本/权限/证据不足时解释具体原因，不能只给灰按钮 |
| Open related condition | 当前投影允许，目标属于本Case/Scope | 导航到对应Condition | 无权时安全提示，不泄露受限标题/数量 |
| Back to task/Studio | 已保存或处理未保存输入 | 回语义来源位置 | 保存失败不离开；不重装旧Case快照 |

在CHK-01优先显示补件/转交路径；在CHK-03可以准备处置并记录。不是每个动作都一张全屏确认页；高影响操作在同一Review区明确范围、结果与后果，再执行。

### 6.4 AI在这里如何“出现”

通过产物而非角色表演体现：已组织的证据、带出处的比较、未解决问题、可审阅的请求草稿。

不显示Agent头像轮流说话、虚假Token流、无来源置信度仪表或“AI认为你应该批准”。正式rationale不自动填成有利结论。准备失败时仍可看原始资料并采用允许的人工路径，缺信息就保持未决。

## 7. Requirements与Evidence：从控制问题进入，不从文档堆进入

### 7.1 Requirements清单

首层每行控制在：**Requirement、Applies to、Current status、Remaining gap、Owner、Action**。Basis、Evidence、版本与详细依赖在选中行内展开，不一次铺十几列。

Applicability与Review状态分列：required/not_required/unknown；是否在review是另一事实。Unknown不可过滤到消失。

选“Person T协调资料权限”时看到：
- Principal=Entity A；动作用途=coordination；
- Entity B职位资料能够支持的事实；
- 当前仍缺哪项用途依据；
- 对应Request Item与客户可读解释；
- 关联Evidence Review入口。

“Link evidence”只建立关联/评估准备，不改变原文件，也不自动Satisfied。

### 7.2 Evidence Review

继续复用屏幕主体的“依据＋当前任务＋输入＋动作”模板，但业务表单不同于Screening：
- 当前Requirement/Subject/Purpose固定；
- Artifact原件/原始来源、Submitted by、On behalf of、staff uploader分别显示；
- 安全接收状态、源信息、候选Claims、充分性评估分别显示；
- 只允许对当前用途Record assessment；
- 四值sufficiency保留，部分coverage显示明细，不创造第五值；
- 正式结果必须由实际演示配置允许的角色/规则形成，不能让一个Attach按钮创建。

文件被隔离或拒收，不进入业务充分性复核。文件不存在不能用生成截图替代原件。示例只用合成文件；不让用户上传真实客户证件测试。

## 8. RM与客户：同一请求，两种完全不同的信息投影

### 8.1 RM — Client requests

首层：客户/实体、本次请求目的、待客户/待银行项目、最近联系、下一动作和Owner。

最小动作继续为Add interaction note、Open request、Refer question。客户与RM默认邮件沟通；本轮可选增加Prepare email reply，输出可审阅/复制的草稿。邮件线程和联系内容均为合成，不真实拨打、读取邮箱或发信。

示例客户可读表达：“授权资料已提交，银行正在复核；ownership/control资料仍需由适当联系人补充。”是否显示另一项目及其状态，取决于RM投影；不能套用于每个Client贡献者。

RM不能编辑内部screening disposition、豁免Requirement、点击自己没有权限的最终确认。内部风险叙事不以Tooltip、隐藏列、导出或网络payload泄漏。

### 8.2 Requests — 内部准备

内容分成三组：**需要什么、发给谁、当前处于什么阶段。**

- Item：Requirement/Gap、Subject、Purpose、可接受响应形式、客户可读理由。
- Recipient：经审阅的联系人、资源/动作范围、披露状态。
- State：Draft/Review与派发/送达分开，版本及Activity可查。

Save draft只存草稿。Review只存审阅。Dispatch仅使用本地获准适配结果，并且成功/失败分别可见。修改已审阅披露内容后，不能套用旧批准。

### 8.3 Client — Your tasks

只展示本人获准项目：Entity A、简短请求、为何需要、允许的响应、已提交文件和本人回执。

用户行为：Open item → Save draft → 预览将提交的内容 → Submit response → 回执与下一步。Ask a question关联当前Item，不另建无上下文聊天系统。

重要边界：
- Reference是定位，不是身份或Grant。
- 认证与访问采用明确mock；不输入真实手机/OTP。
- Person T可按有限Grant提交权限证明，但不自动具备业务签字权。
- 不向一个贡献者显示另一人的私人证据，也不通过“另有2个受限项目”等计数泄漏范围。
- Submitted/Under review不等于Accepted或Requirement Satisfied。
- 一项提交后只更新相应项目，整个Case可以继续Not Ready。
- 客户上传按钮保持正常产品文案；外层明确只使用提供的合成资料。实际写入本地模拟对象，不声称真实安全扫描。

### 8.4 新的筛查补件不扩大旧Grant

从Screening创建身份区分请求时，仍指向当前Finding的目的；原coordination项目不被重命名，旧Grant不自动扩展到私人身份资料。没有批准的接入范围，新的项目不能因故事继续就对Person T开放。

## 9. 专业条件、QA与Clearance

### 9.1 Condition Detail：共用容器，保留专业差异

默认只显示：**Condition、Status、Owner、Waiting for、Next action**。

展开内容按领域变化：
- Conflicts：search、finding、专业结果与hold；受限叙事按角色过滤。
- Credit：批准决定、具体条件定义、履行状态、Legal采用的输入版本。
- Legal：协议/条款、Credit输入、批准、签字权限、执行原件。
- EDD：独立适用性、风险问题、材料包、结果/批准与未履行条件。

不得四个领域都使用一个含义不明的“Approved”。Condition查看本身不修改任何状态。专业判断与签署主要呈现有据的合成结果/未决；本轮不做四个新的专业工作台。

来源/依赖图复用Archify；点击在同一个详情容器切到依赖阅读，再回Condition。不要层层打开modal。复杂依赖需空间时，先关闭短modal、保存ReturnAnchor、进入已有全屏阅读容器。

### 9.2 QA Remediation Detail

本案默认观察：“资料存在，充分性评估尚未建立”，先检查缺评估还是缺资料。

展示：Check、Requirement、Subject/Purpose、当前资料与评估、观察、Required action、Owner、Remediation status、Re-review status。

- 需要补评估时回PX-07，不自动创建客户补件。
- Remediation完成只提交其解决依据；QA仍待重审。
- 重审对具体输入版本完成，最终签核单独按原配置。
- QA检查范围未知不能默认全面替代Legal/Credit专业审查。

### 9.3 Clearance：一项结论，四层依据

1. **Scope**：Entity A、FX产品意图/资格、booking、当前scope revision。
2. **Current result**：Not ready / Ready for authorised confirmation / scoped clearance recorded；表层摘要不合并底层事实。
3. **Conditions**：实际完整清单、适用性、阻塞、未知、过时结果、owner与可行动作。
4. **Decision / Publication**：决定、记录、发布目标与回执分别显示。

优先呈现阻塞和“谁的下一步”；已满足内容可折叠，但完整性信息不能隐藏。Required条件列表加载失败或为空，显示Unable to determine readiness，不作绿色成功。

Confirm clearance只有原演示配置允许且当前snapshot仍有效时可用。点击时重校Scope/输入/权限，不能依据按钮加载时的旧检查。

发布失败时，保留有权决定，显示具体目标待发/失败和允许的重试；不删批准，也不显示Trade executed。不要新增真实电子签署、SMR提交或交易动作。

### 9.4 最终成功必须有Closure Manifest

D3已列明的十项依据继续有效：Scope/产品/booking；ownership；完整筛查与处置；EDD适用；Conflicts；Credit条件；协议/签字；QA；整体清单/hold；授权与发布。

这是检查清单，不授权制造缺失证据。现有成功fixture不足时保留Not Ready和待验证问题；D5不通过视觉收尾绕过未确认的业务更改。

## 10. 共同动作语义：不要给用户虚假的完成感

| 用户意图 | 结果含义 | 明确不等于 |
|---|---|---|
| 查看资料 | 阅读位置/选择变化 | 已审阅、已采信 |
| Save draft | 可继续编辑的草稿已保存 | 业务结果已记录 |
| Submit response | 客户回应被接收 | 资料已充分 |
| Link evidence | 资料与用途候选关联 | 所有用途都满足 |
| Request information | 指定缺口的请求准备/审阅 | 已发送、已收到回复 |
| Record assessment | 指定输入/用途评估记录 | 无限期复用或整体准入 |
| Refer | 特定任务的移交 | 有权人已决定 |
| Record disposition | 当前Finding的限定决定 | 全population完成或永久白名单 |
| Submit remediation | 解决依据交回检查项 | QA复核通过 |
| Record QA sign-off | 指定QA范围和版本确认 | 全部前置条件满足 |
| Confirm clearance | 对指定snapshot的有权决定 | 下游已收到或交易已执行 |
| Retry publication | 同一获准意图的一次重试 | 新的Clearance或新的Trade |

### 10.1 本地命令的最少语义

每项写动作绑定：对象/版本、角色/权限fixture、当前输入、用户意图、payload、意图键、允许后果。成功后返回实际本地记录引用与版本；失败保留用户输入及可恢复原因。

代码/Rule自动完成一条确定性记录，不意味着它拥有专业判断权。模型候选或播放帧没有权力触发写命令。

### 10.2 不把所有Human动作都强制做成按钮

D4标Human只是责任分析。Legal谈判、签署、复杂信用判断可以在本轮以已有合成记录和边界呈现；只有原批准的交互切片暴露动作。

把尚未实现的动作标为“未包含”在外层说明，不用假的成功Toast、无对象的Dashboard或预制视频充当运行。

## 11. 异常体验：与Happy Path同等重要

| 情况 | 产品行为 | 用户如何继续 |
|---|---|---|
| 没有可处理任务 | 区分无任务与加载失败；不自动创建新案件 | 回到已有Case或明确示例入口 |
| 输入/权限缺失 | 指出缺哪项、谁可处理；只显示获准信息 | 保存合法草稿、补充、转交或返回 |
| 分配给我但无决定权 | 保留准备/阅读能力，不提供正式决定 | 转到配置允许的角色/队列 |
| 新证据到达 | 提示有更新，不覆盖正在写的rationale或自动跳屏 | 明确刷新/比较版本后再记录 |
| 保存失败 | 留原位置、输入不丢、无Saved文案 | 安全重试或Stay |
| 旧版本提交 | 拒绝正式写入，保留草稿及差异说明 | 重审当前版本，不自动合并专业判断 |
| 重复点击/刷新 | 原意图去重，不生成两次提交/批准 | 显示已存在的记录 |
| Grant过期/撤销 | 后续读取/提交停下，关闭受限展示并清理不应保留的临时投影 | 由原适当渠道恢复，不把旧Grant当有效 |
| 查源失败 | Unknown/Failed，未运行不当No match | 在允许范围内重试或请求人工 |
| 准备材料不可用 | 显示准备失败与原资料入口，不假造AI解释 | 人工路径若获准可继续；否则等待 |
| 已记录结果 | 显示只读事实和当前适用性；没有随意Undo批准 | 有明确修订流程才新建版本 |
| 无效深链 | 不进入其他相似案件代替 | 安全消息与返回当前允许入口 |
| 网络恢复/浏览器重开 | 恢复可恢复的本地草稿，重校状态与来源版本 | 明确恢复而不重发动作 |

本地权限模拟可验证语义，不能声称提供生产服务端隔离。演示角色投影在提供给组件前过滤，避免隐藏DOM、导出、Tooltip、引用计数泄漏。

## 12. Studio → Product → Studio的完整返回

| 来源 | 进入产品 | 返回规则 |
|---|---|---|
| Journey场景摘要 | 同案目标任务 | 回原Scenario、Stage、角色与viewport |
| Current/To-be对照节点 | 明确目标产品，原比较模式不变 | 回原MappingGroup及Current/Compare |
| Operating Model动作 | 同Action对应任务/对象 | 回原view、Action、Skill选择与播放位置，播放暂停 |
| Condition依赖 | 同案关联对象 | 回原Condition及当前版本，不回大首页 |
| Requirement证据 | 同一用途的Evidence Review | 回原Requirement行与筛选 |
| 客户任务项目 | 有效Grant内的Item | 回本人列表及回执，不进内部Case |

### 12.1 导航只保留引用

继承D3A/D4 ReturnAnchor；补充或映射task_ref、object_ref、object_revision、surface_ref、section、selected_evidence_use_ref和draft_ref。

不把业务快照塞进返回token，不用URL role当身份，不带证件/私密资料或秘密。最新语言优先；返回不能回滚业务事件。旧节点已变更时说明变化并回语义父级。

### 12.2 未保存内容

离开可编辑工作时：Save draft / Discard changes / Stay。这里Discard只丢未保存草稿，不撤销已提交评估或历史决定。保存失败不能导航。不同角色的未保存输入不在角色切换后继承给新用户。

### 12.3 示例检查点与当前会话不同

Studio在CHK-01，当前产品会话可能已经到CHK-04。进入时显式提供：继续当前会话，或打开独立的已编制示例会话。默认不能静默回退；保存后的结果只属于实际操作的session。不是每次进入都问，只有有实质差异且需选择时提示。

## 13. 视觉、文字、媒体、语言与打印

### 13.1 正常产品，不是教学页面

保留普通标题：Screening Review、Evidence、Requests、Condition、Clearance。不要用“体验AI如何…”或“下一步点击…”副标题。操作提示、校验错误、当前阻塞不是教学字幕，必须提供。

小i解释：如Scope revision、Evidence use等非关键概念；hover/focus/tap均可，按Esc关闭并恢复焦点。不能只通过hover才能知道为何不能提交。

### 13.2 信息密度

**颜色、字体及既有视觉组件以Christina让Codex调整后的最新工作区版本为准。**不得使用本稿或旧D3/D4文档里的颜色覆盖最新设计，不新增硬编码色值。本稿仅规定语义和可读性；正文、间距、圆角、玻璃效果均优先继承最新token/组件，必要的结构调整单独说明。

一项任务首屏只突出：当前问题、必要依据、一个主要行动。避免十个KPI、229动作计数或虚假效率仪表。屏幕宽度不足时上下排列，不缩字，不隐藏必要字段。

业务状态色、变更类型、执行者和源可信性独立。Human不自动红，Agent不自动绿。对照用标签和文字，不只靠颜色。

### 13.3 媒体

- Persona/生活工作场景图主要在Studio，复用同一Person T；产品工作区不用大照片抢占证据阅读空间。
- 产品内容、原字段和rationale用HTML，关系/依赖必要时Archify。
- 动效只用于焦点、展开、保存/状态反馈，不假装真实Agent调用、实时服务或性能提升。
- 产品录屏必须来自实际可运行切片；另做解释视频时明确是预编制演示。
- 不增加12页各配一条视频的交付要求；无视频可完成全部工作。
- 动效可暂停/关闭，减少动态效果不损失信息；普通点击不触发无关自动滚动。

### 13.4 语言与地区

所有产品字段名、错误、状态、空态、按钮、说明、回执、打印支持zh-CN/en-AU/en-US。实体身份、已提交原文、字段值、政策、名单和权限不随语言变动。

用户书写的rationale不因换语言被模型自动翻译/改写；有译文需求另存并保留原文。日期可本地格式化，但准确事件时点与时区保留；相对时间不代替可查的原时点。银行业务地区另有context，不能从en-US推导美国规则。

### 13.5 打印

复用现有Print机制，按授权导出：Review record、Request/本人回执、Condition、QA记录、Scoped clearance。包含精确对象/输入版本、状态时点、来源和合成标识；折叠/屏幕外必要内容仍在导出中。

作者评分和跨行业参考不混入客户正式式回执；正式英文发布按配置排除内部中文和受限资源，不能只CSS隐藏。归档和时间导出必须显示所用as-of与历史状态；隐藏可选模块不能隐藏打印必需的证据或关键警告。

## 14. D5字段与动作绑定：不是另建业务Schema

| 作者层对象 | 最小字段 | 用途 |
|---|---|---|
| ProductSurfaceSpec | id、title、purpose、role_projection_refs、scenario_refs、content_sections、interaction_depth、design_status | 一个可复用工作模式 |
| FieldPresentation | field_ref、source_object_ref、label_i18n、control_kind、visibility_rule_ref、editable_when、required_when、null/unknown_copy、revision_policy | 数据怎样显示/编辑/验证 |
| CommandBinding | user_intent、action_refs、command_ref、required_context、guard_refs、input_fields、expected_records、failure_behaviour、return_anchor | 用户一次操作怎样落到多项执行/记录 |
| PreparedArtifactView | artifact_ref、preparation_kind、input_revision_refs、source_locators、unknown_refs、content_status、fidelity_label | AI/规则准备产物与事实区分 |
| ProductEntryBinding | sourceScene/Mapping/Action、targetSurface、objectSelectionRule、sessionPolicy、returnAnchor | 同案正确入口 |
| ProductCoverageRecord | action_ref、surface_ref、presentation_kind、interaction_depth、implementation_evidence_ref、design_status | 覆盖不等于功能已完成 |

### 14.1 一个操作可以覆盖多个D4动作

例如Record disposition可绑定：已有人的选择/相应批准 → 提交时确定性检查 → 记录决定 → 更新局部coverage → 刷新允许投影。它们仍是不同责任和数据事实，不要求用户连点五个机械按钮。

相反，专业判断和不属于该角色的批准，不能因为“简化点击”合成一个动作。是否有额外批准继续看明确配置，不自行增加或删除。

### 14.2 全量229动作的展示归类

- visible human command / controlled task；
- read-only specialist record / boundary；
- prepared sample output；
- deterministic validation / state result；
- local mock adapter receipt；
- recorded event/history；
- candidate plan read-only；
- role-filtered status projection。

这些是呈现方式，不覆盖原`primary_executor`、Skill关系、评分或批准状态。JSON中每个Action保留原ID、PPT source refs、变更类型、parent work和禁区；相应页面还未做时implementation保持NOT_VERIFIED。

## 15. 验收：必须测试真实的产品行为，不只检查截图

以下全部为后续待执行测试。

| ID | 测试 | 正确结果 |
|---|---|---|
| D5-01 | 从OM的Finding动作进入 | 同Case/Scope/Finding，无需再找案件 |
| D5-02 | 从Current对照进产品并返回 | 产品为Target，回原Current/Mapping |
| D5-03 | Story检查点与操作session不同 | 不静默重置；明确当前会话或独立示例 |
| D5-04 | 产品直接打开且有已有session | 可恢复已保存工作，不生成重复Case |
| D5-05 | 任务已分配但无决定权限 | 可准备/阅读获准内容，不能正式记录 |
| D5-06 | 字段点击/展开/来源/拖动 | 动作目标不重叠，焦点可辨 |
| D5-07 | 资料缺出生日期或精度不同 | 未知/不可比较，不自动Different/排除 |
| D5-08 | 文件已收到、用途尚未评估 | 不能让Finding依据自动充分 |
| D5-09 | Coordination资料关联身份用途 | 独立评估，不自动继承 |
| D5-10 | Reviewer无权限或资料不足 | 不能Record；直接说明相关原因 |
| D5-11 | Rationale为空 | 草稿可保留；正式记录按规则校验 |
| D5-12 | AI准备摘要含不支持的结论 | 不成为默认rationale或决定；可查原依据 |
| D5-13 | 旧输入版本提交 | 保留草稿、提示差异、不写旧版新决定 |
| D5-14 | 保存失败 | 表单和错误保留，无假Saved |
| D5-15 | 双击提交/刷新 | 不重复创建逻辑Submission/Decision |
| D5-16 | Request草稿修改 | 旧审阅不自动覆盖新内容/收件范围 |
| D5-17 | Request approved | 不自动显示已派发/已送达 |
| D5-18 | 新身份补件 | 原两个请求项保留，Grant独立核验 |
| D5-19 | 客户正确Reference无Grant | 不能读取任务资料 |
| D5-20 | Client部分提交 | 只有本人Item更新，不显露他人文件 |
| D5-21 | 客户Grant撤销 | 后续读写阻止，不靠旧页面状态继续 |
| D5-22 | 代上传 | 原提供人与代上传者可辨，不伪造客户操作 |
| D5-23 | 技术接收released | 不写业务Sufficient/identity verified |
| D5-24 | 来源不可用/查询失败 | 不显示No match或零风险 |
| D5-25 | 人选择补件/移交/未决 | 不自动当批准，不继续全部路径 |
| D5-26 | 移交目标未知 | Unassigned/待配置，不虚构已送达人员 |
| D5-27 | 处置成功 | 回原任务看限定结果，其他条件真实保留 |
| D5-28 | Credit已批准条件 | 不等同条件已履行或Legal已执行 |
| D5-29 | Agreement用旧Credit输入 | 显示版本问题，不以新页面掩盖 |
| D5-30 | QA缺评估 | 回到缺评估工作，不自动判资料无效或全案重做 |
| D5-31 | Remediation completed | QA仍需对应重审，不自动signoff |
| D5-32 | Clearance manifest未知/空/加载失败 | 不Ready；清楚显示无法完整核对 |
| D5-33 | EDD或其他适用性unknown | 不当not_required隐藏 |
| D5-34 | Ready但无最终权限 | 可看依据，不可确认；分配不能代替权限 |
| D5-35 | 确认时scope/证据版本改变 | 拒绝旧依据确认，保留待处理内容 |
| D5-36 | Publication失败/重试 | 原决定保留，各目标独立，不执行Trade |
| D5-37 | 来源/证据详情返回 | 回原Requirement/Finding/版本与筛选 |
| D5-38 | 未保存离开 | Save/Discard/Stay；Discard不撤销已存决定 |
| D5-39 | 语言切换后返回 | 最新语言与输入原文保持，不改Policy |
| D5-40 | Role切换 | 旧未保存输入处理；新投影无他人受限数据 |
| D5-41 | Print/Tooltip/搜索计数/导出 | 不含未经允许资料或内部评分 |
| D5-42 | 长内容/窄屏/键盘/减少动画 | 全部必要信息可读，非拖动路径可用 |
| D5-43 | 模型/银行网络未连接 | 样例明确，保存等本地动作仍可测试；无假远程成功 |
| D5-44 | Play/Next/Skill查看/评分 | Case事件日志不变，不产生批准 |
| D5-45 | Lab Shadow变化 | 正确variant，退出不覆盖产品主会话 |
| D5-46 | 当前结果与历史记录不同 | 历史保留，当前适用性可辨，不悄悄删除 |
| D5-47 | 没有对应产品任务 | 明确本版范围，不跳无关Dashboard |
| D5-48 | 全场景覆盖核对 | 15场景/94原工作/229动作均有位置或范围说明，不强制造按钮 |

错误Scope、受限资料泄漏、未经动作生成决定、False Ready/False Clear、返回回滚已保存状态是阻断问题。测试记录必须区分PASS/FAIL/NOT_RUN；本稿不是通过证据。

## 16. 制作建议与下一轮确认重点

### 16.1 不同时做十二个精修页面

1. 盘点现有A–F与OM已实现目标、对象和命令；不因规格存在就标“已做”。
2. 先把PX-09 Screening Review的当前问题/依据/动作/结果布局做准，包含缺资料与资料到达两个状态。
3. 连接必要PX-04/PX-06/PX-07已有协作与用途评估，再接PX-01/PX-12当前影响。
4. 对同一条交互做返回、错误、语言、来源与Print校准。
5. 通过后复用到薄Scope、专业Condition与QA模式；不以D5为理由部署Agents或扩大真实接口。

D4 Operating Model的样板视觉Gate继续存在。本轮是D5分析，不自动批准其批量扩展，也不说明其已通过。

### 16.2 本轮建议确认的设计核心

**采用“任务问题在前、依据在中、动作明确、结果原位保留”的产品模板；先用Screening Review做一条可回到客户请求和用途评估的闭环。**

D6继续处理媒体与视觉深化；D7处理优先级和最终Workshop编排。D5不重复打分或把所有Scenario升级为独立Workbench。v0.2另允许轻量历史与可选模块，但不是新的流程平台。

## 17. 来源、继承与评审状态

本轮主要依据：

| 来源 | 使用范围 | 继承限制 |
|---|---|---|
| D4 Operating Model Studio Codex Brief v1.0，§1、4、7–12 | 只读解释/本地操作分离；17动作样板；返回与权限投影 | 未部署Agent；评分/真实权限未验证 |
| D4 AI Operating Model主稿及Action Assessments v0.1 | 15场景、94工作、229动作、Skill、人机边界 | 原子动作是设计评审，不是229个已实现能力 |
| D2 Batch B Client Collaboration Approved Addendum v1.0，§1–9 | RM、客户、请求、用途评估、有限Grant | 请求级访问是设计假设，真实认证/渠道未定 |
| D2 Batch C Final，§10–12 | Population/Finding/Decision字段、主Screening切片和投影 | 专业权限与规则按fixture，不作现实合规结论 |
| D2 Batch D/E Final | Condition、QA、Clearance的原定最小工作模式 | 不建完整专业系统；最终闭合不能缺依据 |
| D3 Detailed Transformation v0.2，§3、5、7 | Source歧义、业务调整、十项Closure Manifest | 不静默改枚举、删除控制或补造最终事实 |
| D3A Final，§5–8、11–15 | 点击顺序、Compare、返回、可读性和打印 | 不复制新的Case或无依据映射 |

本次不追加行业/法律调研，不将继承的Reference核验日期改为今天重新研究。Industry与Cross-industry参考仍放Studio的来源层；产品中的Evidence指该Case实际资料，二者不能混同。

v0.1的分析基础在本稿保留；v0.2新增内容见下文。此次实际交付为更新MD、继承229动作的映射JSON、文件级验证与README。没有读取本机Codex最新源码/截图、修改仓库、生成HTML/Archify成图、连接模型/邮箱，或执行产品验收。


---

# v0.2 增量：透明进度与可配置工作台

## 18. 透明进度：案件全景、本地步骤、每步责任与时间

### 18.1 先分清用户在问哪一层

| 层 | 必须回答 | 呈现 |
|---|---|---|
| Case progress | 本案需要哪些工作？哪些已完成、在做、在等、尚未确定？ | 保留五阶段锚点，显示相关并行工作；不是严格顺序的“已到第4步” |
| Workflow progress | 我正在做的这一件事共有何种步骤、当前位置和下一步是什么？ | 当前任务上方紧凑步骤条；常见4–8个显示组，深层动作按需展开 |
| Step detail | 谁负责、谁接手、何时进入、预计多久、为何不能继续？ | 点击步骤后在同页展开责任/时间/依据/依赖/允许动作 |

**当前位置分成 `viewing_step` 和 `actual_work_state`。**查看后续步骤、点击完成节点、拖动进度图，不把案件推进到那里。串行箭头只表达确有依赖的局部工作；Legal、Credit、Conflicts等并行轨道不伪装成排队。

每个页面保留一个紧凑 `Progress summary`；完整步骤通过 **View all steps／查看全部步骤** 展开到同页现有容器。普通列表由HTML实现；需要解释并行/判断时复用Archify的依赖图，不要求每一步重新画图。

### 18.2 每一步最低展示合同

| 内容 | 默认首层 | 展开明细 |
|---|---|---|
| Step / work | 名称、当前位置、工作状态 | Workflow实例、展示组/原Action、PPT引用（Studio中） |
| Accountability | 处理Owner；当前需要谁行动 | assignee/角色、移交历史、权限与责任不混同 |
| Entered | 进入当前处理步骤的准确时间 | queued、started、waiting、resumed、completed各事件 |
| Time so far | 已停留多久；在等客户/银行时突出waiting_since | 不重叠状态时段、原episode与重审episode |
| Expected | 有依据的剩余时长/目标窗口，或“待X后确认” | 来源、起算条件、工作日历、as-of、输入版本、是否可对客户引用 |
| Next | 当前角色可做什么；轮到谁接手 | 输入/判断/恢复条件、为什么现在不可执行 |
| Overall implication | 本步骤结果意味着什么 | 仍开放条件；不能以局部完成推导Cleared |

没有具体人员时显示角色＋Unassigned；Owner仍是处理责任，不是每次等待时就变成客户。以 `next_actor` 和 `waiting_on` 表达此刻谁需要行动。

### 18.3 “一共需要哪些步骤”不能成为固定数量骗局

- 以当前CaseScope与已定义要求/依赖的**适用步骤清单**为依据，不以UI卡片数量或229个作者动作作分母。
- 展示已知的适用步骤；条件性步骤标注Conditional，适用性未知保留Unknown及所需判断。有依据的不适用可折叠，但不能写作完成。
- 清单完整性未确认时显示“Required steps still being confirmed”，可给已知范围，不报“全部X步已完成”。
- 要求变化或QA重审会新增/重开相应工作。显示清单版本与变化原因，不为了维护一个漂亮进度条删除历史。
- 一对多动作可归为一个易读步骤；DisplayGroup不提供执行业务规则，真实状态从其有据的子工作聚合。任意孩子完成不能让父组自动完成。
- 可显示“本复核流程6个展示步骤中2个已完成”，须限定范围/清单版本；默认不使用百分比，不用步骤数估算剩余时间。
- Client只看其获准请求路径，RM看客户可解释的案件阶段/下一步；完整内部清单不能通过步骤数、标题或时间泄漏。

### 18.4 15场景的进度展示绑定

下面是阅读分组，不是新增的强制运行顺序；每组映射原Workflow/Action/Dependency。无适用性或无实际事件时显示Unknown/Not started，而不是填满进度。

| 场景 | 本地可读步骤主题 | Owner/接手方 | 时间起点 | 不变控制 |
|---|---|---|---|---|
| SCN-SCOPE | 请求接收 → 范围澄清 → booking/产品资格 → 尽调context → 范围版本 | RM／Ops；适用专业确认人 | 请求收到；具体任务分配不等于开始处理 | 范围/产品/booking仍未知的任务保持未决；后续独立工作按自身前置继续 |
| SCN-ENTITY | 主体候选 → 分类 → 关系 → 指定权限 → 有限访问 | Ops／代表权限复核者／适当客户贡献者 | 各子任务实际创建/进入事件 | 协调权限、签约权限和系统访问各自状态；不合成一个Verified |
| SCN-REQUIREMENTS | 上下文 → 适用性 → 要求集 → 例外审阅 → 可披露请求 | Ops；相关领域/例外决定人 | 可用Scope触发要求工作 | unknown要求不静默排除；例外等待单独显示 |
| SCN-SOURCE | 来源资格 → 取得资料 → 候选Claims → 资料关联 → 剩余缺口 | 产品/工具准备；Ops推进 | 获准查询或取证任务进入 | 查源失败不是无匹配；来源重试期间其他工作是否继续按依赖 |
| SCN-GAP | 准备请求 → 收件/披露审阅 → 模拟派发 → 客户回应 → 交回评估 | Ops → RM → 指定贡献者 → Ops | 请求每阶段的真实合成事件 | 对客户与对银行等待分别标识；发送、收到、评估分开 |
| SCN-VALIDATE | 接收 → 技术释放 → 主体/来源 → 用途评估 → 记录/反馈 | 接收适配器／Ops／必要的专业复核者 | 资料到达与进入可审阅队列分别计时 | received不等于sufficient；缺评估时不自动再次索取材料 |
| SCN-POPULATION | 定义范围 → 确认主体 → 查询计划 → 查询返回 → 覆盖复核 | Ops／相关范围决定人／获准工具 | 计划及各查询实际开始 | 群体不完整时显示范围未定；不能只数查过名字 |
| SCN-MATCH | 绑定查询 → 比较信息 → 按需补证 → 复核包 → 人判断 → 记录局部结果 | Ops／RM协同／客户贡献者／筛查复核者 | Finding进入队列、开始复核、转等待分别计时 | 无缺口不强制补证；人可能转交/未决；局部完成不关全案 |
| SCN-EDD | 适用性 → 风险问题 → 证据包 → 专业判断 → 批准/条件 → 交接 | Financial Crime／合适专家；Ops/RM协同 | required适用性与启动事件 | 未确认适用性显示unknown；未展开不是not_required；时长需独立依据 |
| SCN-CONFLICTS | 早发起 → 搜索 → 相关性复核 → 按需升级 → 记录结果 | Control Room／适用有权人 | M1足够信息触发；搜索与调查分别计时 | 只能显示获准状态与预计，不泄漏受限背景；hold范围独立 |
| SCN-CREDIT | 适用性 → 数据 → 风险评估 → 条件 → 初次批准 → Legal交接 → 适用最终核对 | Credit；Legal为下游消费者 | 实际输入进入对应工作；并行不等于已开始 | 条件批准不等于履行；初次批准和最终协议核对不同节点 |
| SCN-LEGAL | Intake → 协议要求 → 草稿/审阅 → Credit输入 → 协商 → 批准 → 签署 → 保存 | Legal／Credit／有权签字方 | draft、review、execution各自进入事件 | 草稿可继续但执行可能等签字/条件；显示具体等待对象，不只Pending |
| SCN-QA | 检查范围 → 各项核验 → 具体缺口 → 补正 → 重审 → 签核 | QA／被派发的Ops或专业Owner | QA进入、补正交回、重审开始分别计时 | 重审使用新一轮episode；补正完成不自动QA通过 |
| SCN-READINESS | 清单完整性 → 适用结果 → 当前版本/hold → 阻塞/下一步 → 就绪快照 | Case Manager／确定性服务；各条件Owner | 当前scope的评估事件；不是浏览页面开始 | 缺全案依赖时间不报全案完成日；没有条件不能空集Ready |
| SCN-PUBLISH | 确认输入 → 有权确认 → 记录 → 发布回执 → RM沟通 | 准入确认角色／本地适配器／RM | 决定记录与各目标发布/回执/沟通时间独立 | 发布失败不删决定；邮件草稿/复制不是已发送；Trade不在范围 |

### 18.5 Person T的首个进度样例

**仅用于时间/交互演示的合成事件，不是本客户真实记录或SLA。**固定as-of：2026-09-07 14:00，Australia/Sydney。真实页面仍使用当前会话实际事件；不能通过进入本例覆盖当前Case。

| 时间 | 已发生的合成事实 | 显示 |
|---|---|---|
| 07 Sep 09:00 | Finding进入复核队列 | Entered review queue |
| 07 Sep 09:30 | 复核任务开始 | Review started |
| 07 Sep 10:00 | 指定请求已按fixture派发，转等待客户资料 | Waiting for requested information |
| 07 Sep 14:00 | 示例观察时点，无新资料 | 已经过5小时；其中等待客户4小时 |

队列0.5小时、处理中状态0.5小时、等待4小时总计5小时。**0.5小时“处理中”是状态驻留，不是人工净工时。**没有真实工作计时就不显示“审阅人员工作了30分钟”。

当前Owner可为KYC Operations角色（未配具体人则Unassigned），下一责任方为当前获准的客户贡献者，RM负责关系协调。允许展示的预计：**资料完整后预计复核1–2个工作日（合成制作参数，非银行SLA）**。因为资料何时到齐未知，不给确定日历完成日，也不推断全案准入日期。

预编制进度每个状态与其下一动作一致。用户实际提交后，只改变收到/待评估阶段；不能即刻跳到“复核完成”。

## 19. 时间透明：事实、预计、承诺分开

### 19.1 五种时间不能混用

1. **事实时间：** entered/started/waited/resumed/completed，由实际已保存事件产生。
2. **状态驻留：** 在特定状态的区间长度；不是员工净工时或效率考核。
3. **Estimated duration / window：** 明确依据下的预计区间，可条件化、可更新；不承诺必达。
4. **Target / SLA：** 仅在已配置有效规则或明确目标时出现，注明内部目标、客户承诺或正式SLA。当前银行SLA未知。
5. **Next update：** 下次沟通/跟进时点，不是完成承诺；由RM明确保存才存在。

必须让用户看到“预计多久”这个字段，包括 **Not yet estimable—awaiting client information** 或 **Timing to be confirmed by Legal**，不能为了填字段虚构数值。

### 19.2 预计值的最低来源规则

| 依据类型 | 本轮做法 | 是否默认可对外 |
|---|---|---|
| 已明确规则/服务目标 | 原规则有版本才可引用；没有就未配置 | 否，需确认对外口径 |
| Owner明确给出的估计 | 保存人、时间、条件、区间 | 仅经RM/披露检查后的版本 |
| 既有历史样本模型 | 本轮不实现；无样本不能假称历史均值 | 否 |
| 合成展示配置 | 可为样板设1–2工作日等数值，标synthetic/内部 | **否**；不能复制成真实银行承诺 |
| 无依据 | 显示未知及需要确认什么 | 只可表达仍待确认，不能给日期 |

未来如有样本推算，也要记录样本范围/更新时间/限制；本轮不建设预测引擎。

### 19.3 时间计算与变化规则

- 存储事件时点与IANA时区引用；locale只控制显示格式，不改变业务日历或倒计时依据。
- `entered_at`、`started_at`和`waiting_since`分别保存；第一次打开页面不创建其中任一个。
- 经过时长可用已发生事件计算；业务日历或节假日未知时不将“工作日”换算为一个伪准确日期。
- 条件式估计的起点如“完整材料已具备可复核状态”，必须有对应事件/判定；仅收到一个附件不满足。
- 等待客户期间整体经过时间持续可见；内部承诺计时是否暂停只能依据已配置规则，不能自动停表美化时长。
- 若采用区间，经过下限不能自动制造预警；超出预计上限叫Estimate exceeded，只有明确目标/SLA才分别叫Target overdue/SLA breach。
- 估计过时、范围变化、依赖改变，保留旧估计和reason；新估计不修改历史，也不自动改写已发给客户的承诺。
- 重审建立新的step episode，保留原进入和原完成记录；显示“重审开始”及必要累计时长，不从头清零历史。
- **不简单相加并行时长。**本轮主要显示各分支窗口；全案日期只有经完整依赖核对的依据才可显示。Unknown分支意味着不能给无条件全案日期。
- 人工判断、授权、hold解除都不能由预计计时结束触发。
- History中的时长以当时完成/归档快照冻结；不对已结束任务显示不断增长的“等待X天”。

## 20. 统一标识：工作状态、健康度、下一动作各自清晰

统一的是**语义adapter、图标名、文字、位置和交互规则**；不是强行换配色。图标复用仓库已有图标库的等价图形，不为本轮安装新图标包。

| 显示语义 | 建议文字 | 图标语义（映射现有库） | 条件 | 不表示 |
|---|---|---|---|---|
| action_required | 需要你处理 / Action needed | arrow-right-circle | 可执行的本角色当前下一动作 | 不代表其他工作已完成 |
| in_progress | 处理中 / In progress | circle-dot | 已发生开始处理事件；当前工作仍在推进 | 不等于预计按期 |
| waiting | 等待资料/他人 / Waiting | clock | 在等明确输入/责任方；列明等待对象 | 正常等待不自动判block或逾期 |
| on_track | 按当前计划推进 / On track | route-check | 有有效目标/估时或明确检查点，且当前证据未表明偏离 | 不是Completed或Cleared |
| at_risk | 需关注 / At risk | triangle-alert | 有明确风险原因，或获准reviewer标注；可仍继续部分工作 | 没有基线不得凭感觉自动判延迟 |
| blocked | 当前动作受阻 / Blocked | octagon-pause | 具体目标动作前置不满足或受有效hold限制 | 不等于整案全部暂停 |
| overdue | 超过已确认时限 / Overdue | clock-alert | 仅当已有明确承诺/SLA/内部目标且时钟规则有效；显示目标类型 | 超过预测区间只叫Estimate exceeded，不冒充SLA breach |
| completed | 本步骤已完成 / Step complete | circle-check | 相应业务完成事件/输出存在 | 不是整案清除 |
| unknown | 待确认/无法确定 / Not yet established | circle-help | 适用性、责任、日期或数据缺失 | 不能用0、空白或绿色代替 |
| not_applicable | 本案不适用 / Not required for this scope | minus-circle | 有依据的不适用记录 | 不是Completed、Approved或隐藏未定要求 |

### 20.1 四个维度不合成一个枚举

- `work_state`：not_started/ready/in_progress/waiting/blocked/completed等映射既有状态。
- `health_state`：on_track/at_risk/overdue/unknown；有依据才评价时限或计划。
- `next_action`：本角色要做什么、下一责任方、是否可执行及原因。
- `freshness_state`：current/stale/unknown，避免旧Snapshot继续显示“顺利”。

一个任务可以“等待客户，仍在其已确认目标范围内”；一个已完成任务可以“历史上曾超出目标”。一个工作组可以有部分步骤继续、某项Record动作受阻。因此不要把等待、警告和block都编码为红色failed。

屏幕上先显示当前最相关的严重问题＋1个主要动作，其他告警可展开。严重提醒/版本失效/保存失败属于CORE-ACTION，不能被可选模块开关移除。无配置就显示进行中/未能判断时间健康，不显示无根据的On track。

所有Tasks、步骤条、Condition Detail、Cases列表、历史记录、RM摘要与允许的客户视图使用同一映射。客户可有更简短词汇，但不能把内部未完成改写成已完成或“无需处理”。权限过滤在数据投影时完成，不靠CSS。

### 20.2 下一动作是可操作信息

每项显示：**动词＋对象＋责任方＋当前限制/预期结果**。例如“Review submitted identity information — KYC Operations”，而不是只写Next。本人无权时显示“Await specialist review”或“Refer to configured reviewer”，不能让全员看同一个Approve按钮。

点击下一动作进入同案精确对象，包含ReturnAnchor；返回保留当前状态。一次点击可触发已有受控命令的完整记录链，但不合并不同人的专业判断和批准。

## 21. 核心固定、可选模块灵活：定制视图，不定制合规义务

### 21.1 四组核心模块

核心位置稳定、不可移除、不可被可选卡片遮挡；内容按当前角色/任务必要性变化，而不是所有角色看到同样内部资料。

| 模块 | 内容 | 约束 |
|---|---|---|
| 案件与任务定位 / Case and task context | Case/Scope/主体、当前任务、角色与返回来源；按角色过滤，不可隐藏 | Fixed / Required |
| 当前进度与时间 / Progress and timing | 总览锚点、本地步骤、Owner/下一责任、进入时间、等待、预计/未能预计原因、查看全部步骤；不可移除 | Fixed / Required |
| 当前任务与必要依据 / Current work and required evidence | 本动作必须阅读/填写/校验的内容不可移除；Screening对照、客户本项资料等依角色实例化 | Fixed / Required |
| 下一动作与关键提醒 / Next action and critical notices | 主要动作、阻塞/预警、版本过时、未保存与错误、局部结果始终可达；不可用Customize关闭 | Fixed / Required |

CORE-WORK里的“必要依据”是上下文强制项。用户可以隐藏非必要资料概览，但不能在Record disposition前隐藏这个判断所依赖的必须内容。若关键block发生，固定区域直接提示，不要求用户先添加Warnings模块。

### 21.2 可选模块目录

| 模块 | 可选含义与边界 |
|---|---|
| 完整处理时间线 / Activity timeline | 可折叠/移除详细时间线；固定摘要和History入口保留 |
| 相关依赖图 / Related dependencies | Archify图可选；当前阻塞原因与必要依赖摘要不可隐藏 |
| 相关资料概览 / Related evidence | 非必需资料概览可选；决定所必需的原依据始终在CORE-WORK |
| 联系人与沟通历史 / Contacts and communications | 仅获准联系人与邮件记录；不提供角色切换到全量资料 |
| RM邮件回复草稿 / RM email reply | RM模板草稿/编辑/保存/复制；审阅后供用户自行发出；不得真实发送 |
| 最近查看的历史记录 / Recent history | 个人快捷模块可选；产品Cases/History入口是固定可达的导航 |
| 工作备注 / Work notes | 仅记录明确范围的备注；不以备注替代正式决定/通知；不执行提醒自动化 |

这些是本轮模块建议，不声称完全复原“畅想”旧目录。先映射Codex现有实现；同一Timeline或Evidence数据不能在可选模块中成为另一份可编辑真相。

### 21.3 用户自选的具体交互

**Customize workspace／自定义工作台 → 选择允许模块 → 上移/下移或拖动排序 → 预览 → Save layout。**

- 固定模块显示Locked/Required，不能取消；可选模块只列当前角色获准的内容，不泄漏禁用模块的敏感标题/数量。
- 本轮仅提供添加/移除、预定义位置内排序、折叠和恢复角色默认。不要做任意网格编辑器、用户脚本或插件商城。
- 保留非拖动的Move up/down键盘操作。排序不改变工作先后或Priority，不改变Case/Task事实。
- 未保存布局与未保存业务表单分别跟踪；退出布局编辑可取消布局，不撤销业务草稿。
- 保存作用域：`user/persona fixture + role projection + workspace type + layout schema version`。同角色不同人不共享偏好；客户本人列表与内部工作台分别存。
- 默认3个左右可选模块即可，其他从目录选择；初版数量是布局起点，不是不可变业务规则。
- 深链进必须的任务时，必需内容自动可用；旧偏好不应令任务无法完成。模块依赖失效给安全空态，不显示旧Case缓存。
- 恢复默认仅恢复布局，不重置业务会话/示例/语言/历史。
- 权限收回后即使布局中仍选着模块也不提供数据；布局偏好不是access grant。

### 21.4 角色默认组合（仅建议）

| 角色 | 固定核心的任务内容 | 可选默认 | 保持可添加 |
|---|---|---|---|
| Case Manager / Ops | 当前阻塞、要求/证据任务和下一责任 | Timeline、Dependencies、Related evidence | Contacts、Notes、Recent history |
| RM | 允许的案件进展、客户待办和跟进 | Contacts/communications、Timeline | Email reply（nice to have）、Recent history、Notes |
| Screening reviewer | 当前Finding、对照与必要证据、判断动作 | Related evidence、Timeline | Dependencies、Notes、Recent history |
| QA | 检查/补正/重审及必要依据 | Timeline、Related evidence | Dependencies、Recent history |
| Legal / Credit / Conflicts / EDD | 所负责Condition与受控内容 | Dependencies、Timeline | Related evidence、Notes、Recent history |
| Clearance reviewer | 完整条件与当前授权任务 | Dependencies、Timeline | Related evidence、Recent history |
| Client contributor | 本人请求、提交/等待进度、资料与帮助 | 本人Timeline或通信摘要（有权限时） | 本人历史回执；不显示内部依赖或RM草稿 |

UI module、Skill family、Workflow、Agent候选不是同一个对象。选择“邮件模块”不部署Skill；隐藏一个模块不关闭其Workflow。Living Case Lab不列入银行用户的可选工作台目录。

## 22. 历史案件与归档：所有角色可用，但看到的范围不同

### 22.1 产品内部入口

在现有Product内添加/复用 **Cases／案件**，包含：

- **Active／进行中：** 当前获准处理/查看的案件和任务。
- **My completed work／我的处理历史：** 本人已完成的工作，即使全案仍active。
- **Archived／已归档：** 当前获准查看的历史案件/请求及结果快照。

三者是筛选视图，不是三个新系统；归档入口固定可达，可选Recent history只是快捷模块。每个内部角色用同一组件和不同projection，不能将role switch当作可查看所有团队案件的权限。

客户对应名称可以是 **Current requests／Request history**，只包含本人获准的请求/回执；有限单次Grant不自动产生全企业历史查询权。未配置持续历史访问时，由RM提供获准资料/回执，不能开放一个无验证的客户全库搜索。

### 22.2 列表的最小字段与过滤

内部获准列表：Case display ref、Entity、产品/范围摘要、与我的关系/所处理工作、Outcome/工作状态、最后事件、归档时点（如有）。按Case ref、获准实体、相关产品、处理时间范围、本人参与/分配、业务结果过滤。所有计数、排序、搜索索引与分页先过滤权限再呈现。

不能用Archived取代业务结果：已清除、申请未继续、已取消等结果与归档储存状态分别保存。本稿不自动新增银行关闭/拒绝政策。

### 22.3 进入历史记录的体验

**Cases → History筛选 → 选择记录 → 只读历史概览 → 某次处理/当时版本/结果 → 返回原列表。**

- 顶部持续显示Archived/Read-only、历史Scope/版本与as-of。不同于当前同一实体的新案件。
- 只显示当前权限可看的历史信息；曾经处理过不等于永久获得访问权。
- 默认没有Record/Approve/Dispatch等当前写按钮。浏览历史不得重新打开案件、创建新Operational session或加载旧Case覆盖当前工作。
- 历史决定保留原时间/输入/责任；当时Cleared仅对当时Scope说明，不适用于当前新产品/资料。
- 从active切history前先处理未保存业务草稿；返回恢复active当前已保存状态，不重新装历史版本。列表筛选/滚动和角色偏好分别保留。
- “Reuse historical evidence”不在本次快捷操作内；如将来支持，必须重新验证访问、用途、版本和适用性，不能按Copy复制批准。
- 本轮不实现法律保留、删除、冻结取证、批量销毁或自动reopen。归档读取是UI能力，不声称满足生产记录保留要求。

### 22.4 最小演示数据

保留当前Hero Case作为active；额外使用**三个只读历史记录样例**验证列表/权限，不扩展Living Story：

1. 有明确历史Scope、决定与归档时间的已完成记录。
2. 有不同业务结果的结束记录，证明Archived不等于Cleared。
3. 本人已完成的某项工作但Case仍active，证明My completed work不等于全案归档。

全部与既有可用fixture映射；不得凭本表制造当前Hero Case已经获得的额外批准。历史访问不可用的角色通过明确安全空态测试，不编造授权。

## 23. RM邮件回复：默认邮件沟通，草稿辅助是nice to have

### 23.1 不改变既有安全提交模型

客户默认用Email与RM问进度、解释需求、协调下一步。敏感资料仍可由获准安全任务提交，邮件附件只能按已批准的辅助提交路径记录来源，不变成自动验证入口。

本轮不读取真实邮箱、不接SMTP/邮件API、不发送真实邮件、不制作WhatsApp或原生App。开发不因缺模型或邮箱而等待；草稿可使用确定性模板与合成事实。

### 23.2 模块怎样用

**RM打开Case/进度 → Prepare email reply → 选已存在的合成来信或更新目的 → 查看允许对外的事实/时间依据 → 预览并编辑 → Save draft或Copy email。**

正文只用客户获准的信息：当前可解释阶段、已收到/仍需提供的资料、下一责任/行动、可公开的估计或下次沟通。内部名单、风险叙事、其他贡献者资料、内部初评分值及未获准源链接不得送给草稿函数，也不得存在其隐藏payload。

未提供来信时称“Status update draft”，不伪称已读客户邮件或伪造Reply thread。已有thread_id是模拟引用，不连接个人邮箱。

### 23.3 时间承诺的安全表达

- 只有 `client_communication_allowed` 且当前/有依据/已经审阅的估计才可进入对外稿。
- 合成1–2工作日参数默认为内部不可对外；展示邮件也不能误称银行SLA。
- 无预计依据时写“we will confirm the expected timing once …”，不能补任意完成日。
- `next_update_at`只有RM明确选择保存后才能写“I will update you by …”；这仍是更新承诺，不是完成承诺。
- 不需要把所有内部步骤透露给客户，也不能为了语气好听写成“一切顺利”而隐瞒仍阻止结果的事项。
- 阶段/资料/估计发生变化后，草稿显示Needs refresh/review；保留人工编辑，不静默重写。客户沟通动作本身不改变Case状态。

### 23.4 三份模板（合成文案，具体填值来自获准投影）

**A. 等客户补充｜无可引用完成日期**

Subject: Re: Entity A — onboarding update

Hi [Contact first name],

Thank you for checking in. Your onboarding review is still open, and the next step is for us to receive the information listed in our most recent request.

Please use the agreed secure submission route for those documents. Once the requested information is available for review, we will confirm the next steps and the expected timing for the remaining review.

Please let me know if anything in the request is unclear. I’m happy to help coordinate with the appropriate colleague.

Kind regards,
[RM name]

**B. 客户已提交，银行待复核｜不暗示资料已通过**

Subject: Re: Entity A — documents received

Hi [Contact first name],

Thank you for providing the requested information. We have received your submission, and it is awaiting the next review step.

The submission is not yet a confirmation that the onboarding requirements have been completed. I will let you know if any further information is needed and share the expected timing once it has been confirmed.

Thank you for your patience.

Kind regards,
[RM name]

**C. 预计发生变化｜仅使用已确认可披露原因**

Subject: Entity A — onboarding progress update

Hi [Contact first name],

I wanted to keep you updated: the remaining review is taking longer than previously expected. We are confirming the outstanding items and the revised timing with the relevant team.

[Insert only an approved, client-safe action or clarification, if one is required.]

I appreciate your patience and will share a further update when the revised timing is confirmed.

Kind regards,
[RM name]

模板中的方括号是类型化输入占位，不是输出给客户的成品。缺联系人/RM姓名时在编辑界面提示补充；无法填入的可选段落应删除，不让占位文本作为ready-to-copy正文。C仅在确有先前预计及真实偏离信息时使用，不能作为普通等待的默认稿。

### 23.5 草稿状态

`prepared / edited / needs_refresh / reviewed / copied`与 `sent / delivered`完全不同。Copy成功只是剪贴板结果；保存草稿只是草稿，不在Activity里记为邮件已发。剪贴板不可用时提供选中文本和安全提示，不假称复制成功。

此模块不存在也不妨碍用户看进度、处理Case或查询历史。模板准备属于SK-06/SK-08的呈现方式，角色安全投影属于SK-12；不重新部署这些Skill。

## 24. 数据与Studio联动：新增投影，不重建229动作

### 24.1 轻量记录合同

| 对象/投影 | 最少字段（实际名沿用repo） | 关键约束 |
|---|---|---|
| ProgressPlan | case/scope_ref, plan_revision, step_refs, completeness_status, dependency_refs, source_ref | 步骤清单来自业务依据，包含线不创造执行序列 |
| StepProgress | step_ref, workitem_refs, episode_ref, state, owner_role, assignee_ref, next_actor_ref, waiting_on_refs, next_action_ref, last_event_ref | 一个UI步骤可聚合多个动作，但有明确完成/等待判据 |
| StepTiming | entered_at, queued_at, started_at, waiting_since, resumed_at, completed_at, as_of, event_interval_refs | 从事件派生；未知null；历史冻结；不计为人净工时 |
| DurationEstimate | target_step, estimate_type, lower/upper, unit, anchor_condition_ref, calendar_ref, timezone, source_kind, source_ref, authored_by, estimated_at, based_on_versions, review_status, client_communication_allowed | estimate != target != SLA；条件未满足不生成无条件finish date |
| HealthProjection | target_ref, state, reason_ref, evaluated_at, baseline_ref, source_freshness | 无基线可unknown；不能复用演员色表 |
| ModuleDefinition | module_id, tier, allowed_roles, required_when, data_projection_ref, permitted_actions, layout_slots | 必需模块不因用户偏好消失；权限不是布局配置 |
| WorkspacePreference | user_ref, role_projection_ref, workspace_type, schema_version, enabled_optional_modules, order, collapsed, updated_at | 只存ID/布局，不存证据或临时表单；reset不reset Case |
| CaseHistoryIndex | case_ref, relevant_work_refs, permitted_summary, involvement_basis, outcome_ref, closed_at, archived_at, snapshot_ref | 当前ACL先过滤再索引/分页；业务结果与archive分开 |
| EmailReplyDraft | case_ref, optional_thread_ref, recipient_ref, template_ref, safe_fact_refs, estimate_ref, snapshot_ref, body, edited_by, review_status, copied_at | 手工编辑保留；无真实sent_at；受限事实不得进入 |
| FollowUpNote | case_ref, owner_ref, next_update_at, reason, saved_at | 用户明确保存，不运行背景提醒或自动承诺 |

这些是设计字段与本地fixture，不是生产数据库架构。优先复用WorkItem、AuditEvent、InformationRequest、ReadinessSnapshot、已有layout preference和history记录。

### 24.2 Studio与Product的分工

- Journey/Operating Model能显示当前步骤组、执行者、等待、时间**展示依据**，并深链到对应产品任务；不在Journey另算一套ETA。
- Studio的讲解检查点可有合成日期；Product继续当前会话事件；History读取历史快照；Lab读取Shadow。相同完整上下文一致，有意不同上下文明确标识。
- 模块配置只适用于Product工作台；不把Living Case Lab、AI评分、Skill目录变成客户能选择的生产模块。
- 来源/Reference仍在Studio；产品里的证据仍是Case原始资料，不用行业文献作为某客户已通过的证据。
- 不新增用户必须按“Journey→Operating Model→Progress→History→Product”逐页走完的流程。直接工作入口继续可用。

### 24.3 新增命令只允许有限副作用

| 命令/动作 | 本轮允许写 | 不允许写 |
|---|---|---|
| Save layout / Reset layout | 个人布局偏好 | Case/Policy/Grant/Step完成 |
| View all steps / Inspect time | 视图定位 | Started/Completed事件 |
| Open historical case | 导航/只读历史上下文 | 重开案件、覆盖当前session |
| Prepare/save email draft | 合成草稿及版本 | 发送邮件、标记客户已读或Requirement完成 |
| Copy email | 当前用户剪贴板结果/本地copy状态 | sent/delivered/approval |
| Save next update note | 用户明确选择的跟进记录 | 自动后台任务/替人承诺未选日期 |

## 25. Codex实施顺序与审阅Gate

本轮仍是本地合成产品/Studio更新。**不等待真实Agent、邮箱、历史数据仓库或ETA模型。**新增必须范围是进度、时间字段及unknown处理、统一标识、模块配置、角色历史；邮件草稿nice to have。

| Task | 工作与输入 | 可审阅产物/测试 |
|---|---|---|
| D5U-T00 | 读本稿/旧D5/D4/D3A、当前repo；记录最新视觉token路径/commit/截图、已有模块/状态/事件/列表；保护用户未提交修改 | 真实映射清单、视觉变更保护清单、baseline命令与结果；不重置repo或用旧颜色替换 |
| D5U-T01 | 建共享Progress/Status投影，绑定既有WorkItem/事件；先用SCN-MATCH的本地步骤与Case并行摘要 | Step状态、Owner/next actor、Unknown/blocked/complete；查看/播放无业务写入 |
| D5U-T02 | 时间字段、状态区间、条件式合成估计、基线/as-of；不自动推全案ETA | 本稿合成时间样例可复算，缺依据有原因，时区/重审/历史时间正确 |
| D5U-T03 | 固定四核心＋可选目录；添加/移除/排序/保存/恢复个人布局 | 必需依据/预警不可藏，权限过滤、角色切换/布局与草稿隔离 |
| D5U-T04 | Cases列表的Active/My completed work/Archived及三条最小历史样例 | 全角色在获准范围查询，只读历史、freeze时间、返回active不回滚 |
| D5U-T05 | RM的客户安全进度投影；Email为默认沟通元数据；可选模板回复/保存/复制 | 无真实邮箱；无受限原因/伪承诺；copy!=sent；不做此模块也可通过核心Gate |
| D5U-T06 | 一条样板：进入复核→看步骤/时间→打开依赖→改可选布局→切历史并返回→RM看可解释进度 | 实际截图/录屏、三语/窄屏/打印/返回和下节测试；提交Christina/Xiaoming/Coco校准 |
| D5U-T07 | 样板模式获准后复用至15场景及PX-01…12，复用已有D4图/状态/Case对象 | 完整映射，无每角色新建系统，无色值回滚，回归原D5-01…48 |

每个改动先写具体失败测试，确认缺口，再最小实现与回归。已有行为有通过证据就保留，不人为打坏。确切路径/框架/命令由T00在本机发现，不在本稿虚构。

样板Gate通过前可并行整理其他场景的进度/模块文案，**不能批量推广未校准布局**。进度与时间均不需要D4真实运行实验。

## 26. 可直接粘贴给Codex的启动指令

读取 `Clear_to_Trade_D5_Product_Experience_Review_v0.2.md` 和同版本Bindings JSON，结合D4 Operating Model、D3A及当前仓库。制作D5透明进度/时间、角色历史、核心固定/用户可选模块、统一标识的增量，不部署Agent或接真实邮箱/银行服务。

**配色和现有视觉基线以Christina在Codex里最新改过的版本为主。**先记录实际token/组件/commit与当前工作区变动；不得用旧D3/D4/D5配色覆盖，不回滚用户未提交改动。本稿没有新的hex配色。

先执行D5U-T00到T04，样板为SCN-MATCH/Person T；每一步显示本地步骤/Case位置、谁处理与谁接手、真实合成进入/等待时间、预计依据或未能预计原因。保持并行分支和未知条件，不用进度百分比推导准入。不把作者时间或页面打开写成业务开始。

核心四模块不可隐藏；可选模块仅改个人布局。Cases/History是所有角色可达的产品内入口，查询范围必须按实际fixture权限过滤；My completed work不等于Case Archived。历史只读，不覆盖active会话。

D5U-T05的RM邮件草稿是nice to have：默认客户与RM邮件沟通，但只做模板预览/编辑/保存/复制，不真实发送。内部初估或合成1–2日不自动成为客户承诺；客户安全提交路径保留。

完成T06样板、测试和交互证据后停下校准。原D4视觉Gate仍保留；两个一级入口不变。允许的图仍用本机Archify；普通进度/表单/模块用现有HTML组件。通过后才按T07覆盖其余场景。停止在本轮交付，不自动做D6/D7、生产预测、档案删除或外部发布。

## 27. 新增验收（全部待Codex实际执行）

原D5-01至D5-48继续有效。以下为新增合同测试，与原测试重叠的部分应引用同一实际测试，不以重复计数宣称覆盖更高。

| ID | 情境 | 预期结果 |
|---|---|---|
| D5U-01 | 最新颜色 | 使用当前repo token/组件；无旧蓝白/hex覆盖，无视觉回滚 |
| D5U-02 | 总览与本地进度 | 五阶段锚点可见；本任务步骤可展开；浏览步骤不改变业务阶段 |
| D5U-03 | 并行工作 | Credit/Legal/Conflicts可同时显示；选中一阶段不强制其他未开始 |
| D5U-04 | 步骤全集 | 对获准scope列出适用/条件/未定/不适用；空manifest不显示全部完成 |
| D5U-05 | 动态步骤调整 | 新增要求/重审创建版本和原因；历史步骤不丢失，count变化可解释 |
| D5U-06 | Owner与下一责任方 | 处理Owner和待客户/待专家分别显示；无assignee为Unassigned |
| D5U-07 | 进入/开始/等待 | 三个时间由对应事件产生，不用页面打开时间填充 |
| D5U-08 | 状态时长 | 状态区间不重复累计；不把in_progress驻留时长当人工净工时 |
| D5U-09 | 无预计依据 | 明确未能预计的原因与所需确认；不填0或随意两天 |
| D5U-10 | 有条件的预计 | 显示起算条件与区间；前置未满足时不假造日历完成日期 |
| D5U-11 | 时区/日历 | UTC事实+IANA zone；locale只格式化；未知节假日/日历不计算business-day日期 |
| D5U-12 | 预估更新 | 保留估计来源、as-of、输入版本；变化说明原因，旧客户承诺不被自动改写 |
| D5U-13 | 预估超时 | 预测窗口超出不伪报SLA breach；有确认目标才显示相应Overdue类型 |
| D5U-14 | 审批预计 | 预计时长结束不批准、不解除hold，不创建业务完成事件 |
| D5U-15 | 全案预计 | 不简单求和并行时长；依赖未知时无确定全案日期 |
| D5U-16 | 等待与block | waiting客户可以只是等待；指定Record动作blocked；不一律全案暂停 |
| D5U-17 | 顺利与完成 | On track需依据，不替代Step complete；completed不等于clearance |
| D5U-18 | 标识一致 | Tasks/Progress/Condition/History/RM使用相同语义adapter与图标标签，不硬编码颜色 |
| D5U-19 | 核心模块 | 不能移除/覆盖固定定位、进度、必需依据与关键提醒/动作 |
| D5U-20 | 可选模块 | 添加/移除/排序/保存/恢复默认只写布局偏好，不改Case、Grant或Workflow |
| D5U-21 | 个性化隔离 | 偏好按用户+角色+工作区类型；切角色/案件不继承他人草稿/敏感缓存 |
| D5U-22 | 模块无权限 | 未获准模块不下发数据或暴露名称/计数；旧布局失去权限仍重验 |
| D5U-23 | 布局深链 | 任务必须模块缺失或被旧偏好隐藏时自动恢复必要视图，不要求用户重新组装 |
| D5U-24 | My completed work | 我的Screening任务完成但Case仍active：进本人历史，不把Case归档/清除 |
| D5U-25 | 归档筛选 | 只对获准记录搜索/计数/分页；零结果与请求失败不同，不能列出他人案件 |
| D5U-26 | 归档只读 | 历史时间与结果按当时版本；浏览不新开session、不修改active案、无解锁审批按钮 |
| D5U-27 | 归档当前权限 | 以当前授权控制历史查看；当时处理过不等于永久访问 |
| D5U-28 | 归档切换返回 | 处理未保存输入；回active恢复其当前已保存状态与列表筛选 |
| D5U-29 | 历史估时 | 归档的相对时长冻结到完成/最后快照，不随今天增长或显示仍等待 |
| D5U-30 | 客户历史 | 仅本人获准请求/回执；无有效跨案身份时提示RM协助，不开放整案搜索 |
| D5U-31 | 邮件默认 | 默认RM邮件联系；安全提交路径保留；不把附件自动当作验证通过 |
| D5U-32 | 邮件模板 | 只用允许对外的当前事实；受限screening/conflict原因不进入草稿/DOM/导出 |
| D5U-33 | 邮件时间 | 内部合成估时不自动对外；无依据则无完成日期；已审阅承诺与预计分开 |
| D5U-34 | 邮件状态改变 | 草稿绑定snapshot，数据改变时标needs refresh/review且不覆盖人工编辑 |
| D5U-35 | 复制邮件 | Copy只是复制；不写sent/delivered；无真实邮箱API、smtp或发送动作 |
| D5U-36 | 可选草稿关闭 | 移除/不实现OPT-EMAIL仍可完整处理核心场景与进度 |
| D5U-37 | 播放/布局/筛选 | Case/Decision/Grant事件不变；归档/Current/语言/模块选取非审批 |
| D5U-38 | 角色投影 | RM/客户只看允许phase与真实可披露信息；必要限制不泄漏但不谎称全案无阻塞 |
| D5U-39 | Print与可访问性 | 完整所选步骤、时间依据、状态/版本；不只屏幕截图；键盘替代拖拽，图标附文字 |
| D5U-40 | 重审周期 | 新episode保留原入列时间与累计等待；不擦掉既往时长改善报表 |

**Critical：** 错Case/Scope/角色资料、布局/播放/时间推进造成业务写入、False Ready/Clear、归档覆盖当前会话、复制邮件误报已发、内部/合成预计伪装客户承诺、关键警告被隐藏、最新视觉改动被回滚。

每条报告PASS/FAIL/NOT_RUN＋实际命令/人工步骤/截图。此文档与JSON的结构检查不等于上述应用测试通过。

## 28. 本轮交付状态

本轮交付一份整合MD、一份继承原229动作/15场景的Bindings JSON、README及文件级校验结果。原v0.1保留，没有写回用户Library或Codex源码。此次未查看最新Codex配色，未生成HTML/图/视频，未接邮件、模型、银行系统，也未进行应用或生产安全验证。

本轮未追加网络/行业调研；时间/模块/归档/邮件模板是用户需求下的产品提案，不作为行业事实或银行政策。旧“畅想”具体模块名单未检索到，不能补记为旧决策；实际repo已有内容由Codex优先对齐。
