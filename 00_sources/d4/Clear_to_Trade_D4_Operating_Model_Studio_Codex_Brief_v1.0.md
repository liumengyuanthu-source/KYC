# Clear-to-Trade — Operating Model Studio
## Codex 增量执行稿 v1.0｜工作分工、执行选择、Skills 与人机协作

**Owner：** Christina  
**客户称谓：** Confidential Australian Banking Client  
**状态：** 页面方向、展示范围及首个样板获准制作；继承分析的分值、业务假设和候选 Agent 不因此成为银行批准。  
**交付性质：** 本稿是 Codex 的内容与交互执行合同，不代表 HTML、Archify 成图或应用测试已经完成。

**Goal：** 在现有 Studio 内增加一张可独立访问的 Operating Model 页面，用具体 To-be 工作解释“为什么这样分工、需要哪些 Skills、人与产品怎样衔接”，并能直接进入同案目标产品任务、返回原位置。

**Architecture：** 复用 D3/D3A/D4 作者数据和既有 Shared Case Spine。新增的是一个只读解释与能力规划视图；真实的本地模拟任务仍在既有 Product Prototype 内处理。Studio、Product session、Story checkpoint、Lab Shadow State 分层保存。

**Tech Stack：** 沿用本机仓库已有 HTML、样式、路由、状态、测试及打印方式；所有流程、关系与架构图使用本机已安装的 Archify。不为本任务另选框架或安装 Agent 平台。

**Spec：** 用户本轮批准的 Operating Model 页面方案＋本稿；D4 v0.1、D3A v1.0 和 D2 已批准业务合同继续作为依赖。

> **Codex 先做页面与合成体验，不部署 Agent，不接真实模型，不新增真实银行接口。先完成 Person T 的一条完整样板，经过视觉与交互校准后，再复用到其他场景。**

---

## 1. 本轮做什么、不做什么

| 本轮必须制作 | 只作为设计依据保留 | 本轮不做 |
|---|---|---|
| Studio 内独立 Operating Model 子页面 | AgentTaskCharter、运行权限和停止条件 | Agent Runtime、自动规划引擎或多 Agent 对话 |
| 四个视角：Overview、Execution Choice、Skills & Reuse、Human Collaboration | 七维评分及其理由；候选 Agent／Skill 合同 | 真实模型调用、模型效果比较或成本实验 |
| 同一 To-be 工作的分工、输入输出、人的责任 | 未来生产访问、审计与恢复要求 | 真实 Screening、邮件、上传、身份或交易服务接入 |
| 预编制协作播放＋既有产品任务的双向入口 | 未来模型／Skill 评价方案 | 把播放动画当作真实执行日志 |
| Skill 合同卡、合成输入输出样例与跨场景复用 | Skill 的未来生产实现 | 为12个家族分别编写或安装生产 Skill |
| 返回、双语、减少动态效果、静态打印、References | 业务权限未决项及源歧义 | Priority Score Board、完整 Agent Builder、新银行业务场景 |

### 本稿与前一轮 D4 的关系

- **覆盖的只是当前制作范围与入口方式：** D4 的 Execution/Assessment 详情可进入本独立子页面，不必全部塞在场景弹窗中。
- D4 的运行合同和 A/B/C 方案实测仍是后续研究输入；本轮验收是页面、作者数据绑定、合成体验与回归，不要求真实 Agent 或模型试验。
- 业务工作与控制、原 PPT 来源、229项动作、评分和候选组合保持原批准状态。不能因为用户同意这张页面，就将它们全部改成 bank-confirmed。
- **旧文件中的“D3A结束后不自动进入D4”停点不阻止本轮明确获准的D4页面制作；但本轮完成后仍不能自行推进其他 Discussion。**
- 用户最新确认的“先呈现 To-be 与人机协作、不部署 Agent”优先约束本轮交付。

---

## 2. 输入与来源：读取现有文件，不再生成另一套分析

| 输入 | 用途 |
|---|---|
| `Clear_to_Trade_D4_AI_Operating_Model_and_Journey_Integration_v0.1.md` | Workflow／Skill／Agent／Human 定义、评分边界、四图与控制 |
| `Clear_to_Trade_D4_Action_Assessments_v0.1.json` | 场景、94条原工作、229项动作、12个Workflow、12个Skill家族及候选Agent的主数据 |
| `Clear_to_Trade_D4_All_Scenes_Action_Analysis_v0.1.md` | 逐动作理由、输入输出和控制说明 |
| `Clear_to_Trade_Discussion_3A_Process_Reconstruction_Studio_UX_Final_v1.0.md` | 两入口、12分支、四类变化、点击／返回／Reference合同 |
| D3 v0.2 MD／JSON、已批准D2 A–F及当前仓库 | PPT精确映射、现有Case／Task／Finding／Checkpoint和已实现能力 |
| 既有四张D4 Archify规格、Reference与媒体登记 | 优先复用，不要求从零重绘 |

本地路径由 Codex 在 OM-T00 实际定位。上表是文件身份，不是声称本机存在固定目录。

若实际输入版本不同，报告版本差异；数量用于完整性检查，不是强行把新版本回改为229。缺少某条动作或Prototype目标时明确显示缺项，不靠模型补出新的业务事实。

**追溯链保持：** PPT source occurrence → D3 change → Branch／Mapping → D4 Action → Workflow／Skill／Human／Agent候选 → 产品目标与验收。流程编号重复时保留页／shape／出现位置，不仅使用M0.1等文本作为键。

本稿没有追加行业调研。公共Reference、内部设计参考与源疑问均继承原核验状态；不自动更新为“本次已核验”。

---

## 3. 页面信息架构：一个独立子页面，四个深入视角

### 3.1 一级导航不变

- **Journey / Scenario Studio**
- **Product Prototype**

`Operating Model` 是 Studio 的次级入口，有自己的页面状态与深链，但不是第三个一级系统。推荐路由语义为 `studio / operating-model`；按现有路由框架实现，不要求采用新的URL方案。

从场景进入时关闭原场景模态、保存返回锚点，然后进入该页面；不把完整新页面嵌在多层弹窗里。

### 3.2 首屏

标题：**Operating Model／工作分工与能力规划**。  
Studio 可用一句简短说明：**How should this work run?／这件工作应该怎样完成？**  
这句不添加到 Product Prototype。

固定但克制的定位条显示：`Scenario · Selected work · To-be · 返回来源`。仅在需要时展开Case／Scope／Checkpoint／设计版本。

- 从全局入口来：选择或预览一个明确标识的合成示例；默认 Person T 的 Screening Review，显示“Authored example／预编制示例”，不偷偷挑选或重置当前操作案件。
- 从场景／节点来：保留来源Case、比较时点、Scenario与Action；自动选对应视角，不要求重选一遍。
- 场景选择器可以把15场景按既有主题分组；分组不创建新的Scenario。未完成展示的场景明确说明当前范围，不显示假运行按钮。

### 3.3 四个页面内视角

| View key | 英文／中文 | 默认主内容 | 不做什么 |
|---|---|---|---|
| `overview` | Operating Overview／分工总览 | 一条简短To-be工作链，每组显示主要执行组合、输出和人的介入点 | 不先放全部Agent列表或229行表格 |
| `execution-choice` | Execution Choice／执行选择 | 当前动作的建议、判断路径、简单替代方案、折叠的评分理由 | 不用一个总分自动选Agent |
| `skills` | Skills & Reuse／能力与复用 | 当前工作需要哪些Skills、输入输出、禁止动作、复用场景 | 不做Skill商城、安装器或部署控制台 |
| `collaboration` | Human Collaboration／人机协作 | 停止、决策包、人的动作、记录和恢复的受控播放 | 不演出机器人自主审批 |

一时只展示一个主要视角。视角切换保留Scene／Action／工作目的与返回来源；不要强制用户按四步向导全部完成。

References、字段、评估理由在同页选中区域展开，复用既有来源阅读组件，不追加第五个主视角或右侧抽屉。


---

## 4. 第一条样板：Person T 的 Screening Review

**Scene：** `SCN-MATCH`  
**Branch：** `BR-07`  
**Workflow：** `WF-05`（覆盖与命中复核；与`SCN-POPULATION`共享）  
**原工作：** `D3-MATCH-01` 至 `D3-MATCH-07`  
**原子动作：** 以下17项，读取原D4 JSON，不新编成另一套业务ID。  
**主比较时点：** 同一疑似命中、同一输入版本，相关身份信息尚不足；可切至已有且明确标识的“资料已补齐并审阅”故事检查点，不能暗中改变当前产品会话。

### 4.1 总览先显示六组


| 展示组 | 绑定动作 | 用户看到什么 |
|---|---|---|

| `OM-MATCH-G1`<br>Bind query context／绑定查询背景 | `D4A-MATCH-01-01`<br>`D4A-MATCH-01-02` | Rule / Workflow；绑定原始主体、查询和来源，不新增查询结果 |

| `OM-MATCH-G2`<br>Compare identifiers／比较识别信息 | `D4A-MATCH-02-01`<br>`D4A-MATCH-02-02` | 规则保留精度与未知；Skill准备有出处的比较，不判断是否同一人 |

| `OM-MATCH-G3`<br>Resolve the evidence gap／组织补证 | `D4A-MATCH-03-01`<br>`D4A-MATCH-03-02`<br>`D4A-MATCH-03-03` | 条件性Agent候选＋请求草稿Skill＋Human访问／披露确认；接既有B协作流程 |

| `OM-MATCH-G4`<br>Prepare the review pack／准备复核包 | `D4A-MATCH-04-01`<br>`D4A-MATCH-04-02`<br>`D4A-MATCH-05-01` | Skill编制、规则核对引用与版本；准备不是判断 |

| `OM-MATCH-G5`<br>Human review／人工判断 | `D4A-MATCH-05-02`<br>`D4A-MATCH-05-03`<br>`D4A-MATCH-06-01`<br>`D4A-MATCH-06-02` | 专业判断、限定hold、处置、按配置必要的独立批准；不强制每案增加审批 |

| `OM-MATCH-G6`<br>Record the local outcome／记录局部结果 | `D4A-MATCH-06-03`<br>`D4A-MATCH-07-01`<br>`D4A-MATCH-07-02` | 校验、记录、相关覆盖计算与允许投影；不关闭整个案件 |


六组只用于信息层级。真实等待、分支、并行、恢复按既有D2/D3的依赖与事件；不能把展示组顺序当作每次必经的运行顺序。G3没有缺口时不强行运行；G5额外审批仅在已有演示配置要求时出现。

首屏展开当前选择组，其他组保留摘要。选组下方可以查看原子动作和PPT来源，不需要另开页面。不要把组内Skill、Human和Rule压缩成一个“Agent-led”标签。

### 4.2 三项必须能看懂的执行选择


| 原Action | 原有七维 C/O/D/B/V/T/H | N／F | 页面结论及理由 |
|---|---|---|---|

| `D4A-MATCH-04-01`<br>编制带引用的事实、未知、矛盾和允许动作 | 4/2/2/4/4/3/3 | 8 / 7 | **Workflow + Semantic Skill**。固定范围的材料包有明确输入输出；不需要自主规划才能编制。 |

| `D4A-MATCH-03-01`<br>选择当前finding的获准取证途径与停止条件 | 4/4/4/3/4/3/3 | 12 / 6 | **Bounded Agent candidate**。仅当补证路径确实随返回变化时才值得验证；固定来源顺序足够时用Workflow。 |

| `D4A-MATCH-05-02`<br>判断模糊/重大事项与需升级的处理 | 5/3/3/2/3/2/5 | 11 / 4 | **Human + prepared evidence**。属于专业判断硬Gate；复杂度高不代表允许模型判断。 |


这些分值继承D4初评，不是新打分、模型实测或最终产品优先级。本稿不修改阈值和权重。

---

## 5. Execution Choice：结论、理由、替代方案分开

### 5.1 选中动作后显示

1. **建议执行组合：** 如 Workflow + Semantic Skill；带 Design proposal 状态。
2. **当前工作：** 目标、实际输入、限定输出，以及为什么找人或为什么不需要Agent。
3. **判断路径：** 使用 Archify 高亮相关判断；其他路径弱化，但仍可阅读。
4. **替代方案：** 规则／模板、Workflow + Skill、受限Agent候选、人工处理，按实际支持说明。
5. **Assessment details：** 原七维值、逐维理由、N/F、硬Gate、来源和版本；默认折叠、只读。

### 5.2 判断顺序

先检查资料访问、输入和控制是否明确；再判断这一个原子动作是否有必须由人承担的专业判断／正式权力。随后才比较确定性规则、定界Skill、固定Workflow和反馈驱动Agent候选。

**Workflow是承载层，不是与Skill／Agent并列的“第五个赢家”。**一个Workflow可以同时容纳Rule、Skill、Agent候选与人。

未知或源归属未确认时，显示“需要进一步确定”，允许只读工作设计；不能通过打分自动补齐权限。

### 5.3 本样板结论文案

**Prepare review context／准备复核材料：**

- 建议：Workflow + Semantic Skill。
- 原因：输入固定为当前Finding、资料用途评估、Comparison与允许动作；输出是带引用的复核包。
- Agent候选为何暂不需要：本动作不负责选择新的工作目标或反复决定取证路径。
- 人保留：后续专业判断与对应权限。

**Choose the next permitted evidence source／选择下一获准证据来源：**

- 固定来源与回退规则足够时：Workflow + Retrieval Skill。
- 依据结果多轮选择获准路径时：Bounded Agent candidate。
- 候选只提出或演示有限取证计划，不判断身份、证据充分性、外发授权或准入。

### 5.4 交互不能变成自动配置

替代方案是只读比较，不是可立即应用的运行选项。点击“Agent”只解释候选原因，不改ExecutionAssignment、Policy、Case或评分。首版不增加评分编辑器、Apply配置按钮、Run Agent或Connect Model。

缺某项分值时保留未评估，不填0、不计算百分比。N与F是分开的解释指标，不能相加为自动化总分；不平均整个场景的高风险判断来获得“可自动执行”。


---

## 6. Skills & Reuse：先规划能力，再展示复用

### 6.1 固定引用原12个Skill家族


| ID | 家族名称 | 当前呈现要求 |
|---|---|---|

| `SK-01` | Context & Approved Source Retrieval<br>上下文与获准来源检索 | 获准来源／context与返回状态；固定检索不自动变Agent。 |

| `SK-02` | Claim Extraction<br>声明与字段提取 | 候选Claims和原文位置；提取不是验证。 |

| `SK-03` | Entity / Attribute / Duplicate Comparison<br>主体、属性与重复比较 | similar / different / inconclusive / not_comparable；业务用途分别约束。 |

| `SK-04` | Scope & Policy Condition Evaluation<br>范围与政策条件核验 | 明确规则求值；适用性未知不补规则。 |

| `SK-05` | Evidence-use & Completeness Checks<br>证据用途与完整性检查 | 完整性、来源、用途检查准备；专业充分性仍独立。 |

| `SK-06` | Decision Pack / Explanation / Composition<br>决策包、解释与定界编写 | 材料包、解释与定界草稿；不审批、不派发。 |

| `SK-07` | Work Item & Routing<br>任务创建与责任路由 | 任务、路由与回点；Unknown owner不编造人名。 |

| `SK-08` | Client Collaboration<br>客户协作与请求 | 草稿、请求、响应；发送须独立入口与条件。 |

| `SK-09` | Approved External Operations & Intake<br>获准外部查询与文件接收 | 真实实现未连接时只显示合成适配结果，不伪称外部查询。 |

| `SK-10` | State / Dependency / Readiness Evaluation<br>状态、依赖与就绪计算 | 确定性状态／依赖／Readiness；不由模型改写准入。 |

| `SK-11` | Decision / Event / Provenance Recording<br>决定、事件与来源记录 | 记录已有有权结果，不创造批准。 |

| `SK-12` | Role Projection & Controlled Publication<br>角色投影与受控发布 | 角色可见内容及独立发布；投影与实际发送分开。 |


### 6.2 先看本动作，再看全局复用

从Action进入时只显示相关Skills；“See all skills／查看全部能力”才进入12家族目录。每张卡首先显示目标与输入输出，不先铺技术字段或使用数量。

选Skill后，同页下方显示：

| 字段 | 需要提供的内容 |
|---|---|
| Identity | 原Skill ID、名称、内容版本、家族／具体用途 |
| Purpose | 一个稳定工作目标，不用“提升智能化”代替 |
| Input | 来源对象、主体／用途、版本、允许读取范围 |
| Output | 具体产物、候选／草稿／事实记录的区别 |
| Boundaries | 不可执行的判断、批准、发信、数据访问或准入动作 |
| Stops | 输入不明、版本变化、无权限、资料不足时怎么办 |
| Human use | 谁消费输出、什么需要判断，是否只是支持人而不是执行人的动作 |
| Example | 明确标记的合成输入／输出对照；不生成新的Case事实 |
| Reuse | 已关联的Scenario／Action，以及该处用途和局部控制 |
| Status | 合同定义、合成样例、界面绑定、实际实现验证分别记录 |

复用关系必须来自`atomic_actions[].skill_refs`，同时解释`skill_relation`。`supports_human_action`显示“支持该人工动作”，不得变成“Skill自动执行该判断”。家族复用不是相同Prompt、相同访问Grant或相同专业标准。

### 6.3 SK-03 合成卡片内容

**Compare identifiers／比较识别信息**（属于 SK-03 家族）

- 输入：Person T的已选Claims、合成Record C01、各自出处及版本。
- 输出：属性对照、来源位置、未知／不可比较项。
- 规则：缺出生日期不能画成日期不一致；不同国籍或单字段差异不能自动排除。
- 不负责：命中排除、重大性判断、代表权确认、准入决定。
- 消费者：SK-06复核包，以及获授权的复核人员。
- 停止：资料／主体含糊、实际版本变化、读取范围不满足。
- 演示：加载预编制输入输出；标签为 Authored sample，不是 Running skill。

跨场景点击分两种：

- **Inspect usage／查看用法：** 在当前页显示另一个场景如何用此家族，不换Case或视野。
- **Open scenario／进入场景：** 显式跳到相关Operating Model场景，保存当前来源；不自动进入其他产品案件。

### 6.4 不用一根“Skill已完成”进度条

分别显示：`contract_status`、`sample_status`、`prototype_binding_status`、`implementation_evidence_status`。没有实测证据保持未验证，不因有卡片或有合成输出就标为已实现／已部署。

本轮只记录家族及必要用途合同，不创建12套安装包。不同权力的entrypoints继续隔离：准备请求≠发送请求；准备处置≠记录授权处置；解释Readiness≠计算Readiness。

### 6.5 Agent候选作为关联详情，不作为主入口

使用AG-CASE、AG-EVID、AG-REVIEW原名称和候选状态。点击候选可看目标、允许的Skills、输出、禁止动作、简单对照方案及人何时接手。

AG-REVIEW可能只是AG-EVID的隔离任务模式；不为了页面布局做成三个必须部署的服务。八个逻辑Agent名可在总览深层对照，但不得显示为八个在线运行体。


---

## 7. Human Collaboration：解释播放与实际任务分开

### 7.1 两个明确入口

- **Play collaboration／播放协作过程：** 只控制预编制Story／视图状态，不调用模型、不生成业务事件、不写Decision。
- **Try the task／进入任务体验：** 进入已经存在的Prototype任务，使用现有本地模拟命令处理输入和结果；不直接在本页面完成业务批准。

缺可用Prototype目标时显示 **Prototype not included in this version／本版尚未包含该任务体验**，保留完整解释；不能跳到通用Dashboard冒充集成，也不擅自开发另一个业务系统。

### 7.2 六个播放时刻

| Frame | 画面与定位 | 操作与不变量 |
|---|---|---|
| OM-F1 | 当前Finding、主体和原查询版本 | 只显示继承的输入；不添加Target独有资料 |
| OM-F2 | 比较信息并突出未知／矛盾 | 演示Skill产物；不据姓名或单字段差异作结论 |
| OM-F3 | 具体缺口与下一任务 | **自动暂停讲解**；提供查看工作或Try task；暂停不创建实际业务hold |
| OM-F4 | 人的决策包 | 显示为什么找人、原证据、未知、允许动作、范围和后果；这里再次暂停，不自动批准 |
| OM-F5 | 已有审阅故事中的一个决定及所允许的恢复 | 仅在用户明确“查看后续示例”时展示标记为Authored outcome的后续；不把它写为用户刚才作的决定 |
| OM-F6 | 本项结果与仍开放的其他条件 | 保留Ownership／Coverage／Legal等实际未决；局部结果不是Clear-to-Trade |

**Continue story／继续故事**只改变讲解检查点；**Resume workflow／恢复工作**是已有产品受控命令，二者不可共用处理函数。

预编制故事可说明请求补件、保持未决或移交的允许出口，但不新增多个独立Hero Case。人拒绝、权限不足或证据仍缺时，没有默认成功结局。

### 7.3 播放控制

支持Play／Pause／Previous／Next／Replay segment，起始不自动播放。切视角、选其他场景、打开References、进入产品都暂停；返回不自动重播。

减少动态效果时使用同一内容的编号静态帧。动效只表达选择、移交、未知与恢复，不用快慢假装效率提升，不做机器人聊天窗或假的实时Token流。

### 7.4 人处理后要说明的恢复逻辑

展示已有D4合同：重新核对Case／Scope／输入版本、相应权限和hold，再判断人的动作实际允许恢复哪个步骤。超时、已读、点Next、动画播放结束都不是批准。对非受影响工作是否继续，仍使用实际依赖与限制，不一律全停或全继续。

---

## 8. 点击、返回与上下文合同

### 8.1 主要路径

| 来源与动作 | 目标 | 必须保留 |
|---|---|---|
| Journey场景 → How this work runs／查看工作分工 | Operating Model，带Scene；默认Overview | Case、Scope、Checkpoint、主Branch与来源Journey位置 |
| 对照节点 → Why this execution／为什么这样分工 | Execution Choice，带精确D4 Action | 原Current／To-be／Compare、Mapping、所选节点、两侧视野 |
| 页面内选择Skill | Skills视角的同页合同 | Scenario、Action、原面板、故事位置 |
| 同页查看Reference | 既有来源组件的内联区域 | Action／Skill／Mapping锚点；暂停播放 |
| Try the task | 对应Target Product的真实合成任务 | 来源Operating Model视角、对象引用与返回锚点 |
| Product的Back to operating model | 原动作、视角和语义位置 | 已保存产品状态、最新语言；不回Dashboard |
| Back to scenario / comparison | 原场景模态及面板 | 原比较模式、Branch／Node／Mapping与视野 |
| Back to journey | 原Matrix卡片 | 原阶段、角色、Trigger、当前位置 |

保留从场景直接进入Prototype的快捷路径，不强迫用户先看选择过程、评分或Skills。

### 8.2 返回语义

- Operating Model固定解释**To-be设计**。从Current进入时显示来源信息，返回仍是原Current视图，不全局改为Target。
- Overview选择动作、放大、hover、动画帧不逐次压入history；产品跳转和有意义的面板导航才按既有合同记录。URL中的局部选择可替换当前状态，不形成Back陷阱。
- 单击节点只选择；展开标识只展开；来源按钮只读Reference；不叠在同一点击目标上。
- 离开未保存Product内容：Save draft／Discard changes／Stay。保存失败保留表单与错误，不导航且不伪报成功。
- 使用最新语言偏好，不用旧返回token回滚语言。地区语言不改变Case、Policy、名单、权限或适用性。
- 离开期间业务版本变化：返回同一语义位置并提示变化；原作者检查点与当前产品session可以不同，必须标识，不能重装旧Case来“保持一致”。
- 原Action被设计更新替换：说明映射已更新，回到来源Scene及可读旧引用；不默默选择相似Action。
- 深链无来源：给出Back to journey，定位该场景；无法识别场景则显示选择入口，不留失效Back。
- 场景选择器只浏览已批准示例或允许的上下文，不跨Case复制权力／数据。进入另一个场景要显式选择；其适用Checkpoint不存在时不伪造。

### 8.3 导航数据只存引用

继承D3A字段，新增/映射：

`operating_model_view, selected_action_ref, selected_skill_ref, selected_agent_candidate_ref, assessment_version_ref, collaboration_frame_ref, origin_panel, return_anchor_ref`。

Case／Scope、Scenario／Branch／Mapping、原比较状态、语义锚点、视野、Story cursor和operational_session／lab_variant保留引用。**不把整份Case、证据原文或业务状态塞进返回token／URL。**

---

## 9. 数据接入：作者投影，不新增运行服务

### 9.1 从原JSON读取什么

| 原字段 | 当前用途 |
|---|---|
| `scene_summary[]`、`workflows[]` | 场景与Workflow选择、工作目标／等待解释 |
| `parent_work_assessments[].source_change` | Current／After、四类变化与原工作语境 |
| `parent_work_assessments[].pain_hypothesis / opportunity / pain_status` | Pain／Opportunity入口；必要控制可无痛点，不补造 |
| `atomic_actions[].action_id / parent_change_id / branch_id / workflow_id` | 精确Action→工作→Branch／Workflow联动 |
| `primary_executor / skill_refs / skill_relation / agent_candidate_ref` | 主要执行方式、Skill使用关系与候选Agent |
| `reads / outputs / preconditions / stop_condition / resume_condition` | 具体工作合同与人机协作 |
| `formal_gate / human_decision_pack / forbidden_effects` | 不可被评分覆盖的控制与人工责任 |
| `score_values / score_rationale / adaptive_need / test_boundary / score_status` | 只读Assessment；保留N/F原定义和初评状态 |
| `current_source_refs / target_source_refs / transformation_type` | 精确PPT前后映射；Execution标签不替代四类变化 |
| `skills[] / agent_candidates[] / logical_agent_crosswalk[]` | Skill目录及原逻辑Agent与候选的解释 |
| `inherited_references / new_references / inherited_reconciliation_issues` | 原Reference与源疑问；不去掉历史状态 |

### 9.2 允许新增的轻量作者记录

- `OperatingViewBinding`：scenario、view、display_group、action_refs、diagram_ref/node_refs、prototype_target_ref、reference_refs。
- `SkillPresentation`：skill_ref、locale labels、use_variant、sample_input_ref、sample_output_ref、用途控制、内容／样例／界面绑定／验证状态。
- `CollaborationFrame`：frame_ref、checkpoint_ref、selected_action_refs、focus_refs、caption_i18n、pause_reason、permitted_navigation。
- `OperatingModelViewState`：第8节导航引用；与Case state和Lab state隔离。

已有等价记录优先复用，不为四种视角创建四份Case、Score或Skill。

### 9.3 有三项必须在导入时辨别

1. 部分D4语义Skill动作的旧`collaboration_pattern`写作`Agent-prepared`；当前页用`primary_executor`＋实际`skill_relation`展示“Skill prepares”，保留源字段与display mapping记录，**不能因此把它变为Agent调用或直接改原分析数据**。
2. Human动作关联SK-06通常表示Skill支持人准备材料，不表示该Skill替人作决定。图边要区分`executes`与`supports`。
3. D4数字是作者拆分单位；不据此展示“自动化百分比”“节省人力”或模型成功率。首屏无需总数KPI卡。

D4七维分值与候选Agent数量仍为评审材料。本轮只读展示不自动改为批准、已验证、已部署。


---

## 10. Archify与视觉：四图变成四个视角，不重复铺满页面

| 既有图ID | 本页使用 | 交互绑定 |
|---|---|---|
| `D4_04_operating_architecture` | Overview：具体Scenario的工作与执行分工 | 选工作组→关联Action和人的入口；整体架构仅按需展开 |
| `D4_01_agentic_suitability` | Execution Choice | 当前Action高亮对应判断路径，显示结论／未决及原因 |
| `D4_02_agent_matrix` | Skills & Reuse | 保留原图；新增Skill-first局部投影，原逻辑Agent矩阵在需要时查看 |
| `D4_03_human_agent_collaboration` | Human Collaboration | 绑定六个预编制时刻和暂停点；不连接业务写入 |

- 所有流程、关系和架构图由本机Archify编制。HTML负责页面、筛选、内容详情、导航和权限投影；本稿不假定某个Archify API或事件名。
- 保留原源规格、图ID和稳定节点锚点。需要场景投影时用明确派生后缀并保留父图引用，不覆盖原通用图。
- Archify动态回调不足时，先使用其静态SVG＋可访问的HTML节点列表联动定位；不另建画图库、不伪造可用Play。
- containment、业务dependency、D3 maps_to、执行者uses/supports是不同边类型；默认只显示当前阅读目的所需边。
- NTT DATA蓝白主色沿用已有token。导航可用克制玻璃感；正文、证据和表格实体浅底，圆角、spacing和alignment优先。
- 四类转型标签保持原语义；执行者用图标＋完整短标签。Human不是红色风险，Agent不是绿色完成；Reference用出处图标，避免R与Retained混淆。
- 正文16–18px、卡片内边距20–24px、8px间距节奏为继承的校准起点；不靠缩字放下229动作。
- 窄屏将多列转为单列/上下区域；图可聚焦/平移但页面正常纵向滚动。提供Fit selection、Previous/Next action与键盘操作，不仅靠拖动。
- Persona及工作场景图复用Person T已有资产，仅在语境区域出现。不新增视频制作依赖，不把关键字段写入不可编辑图片。
- 最终产品界面保留正常标题；可选解释放小i并支持hover/focus/tap，阻塞、权限不足和保存失败必须直接可见。

---

## 11. 语言、Reference、打印和发布

### 11.1 三个语言版本完整覆盖

所有导航、Action摘要、选择理由、Skill输入输出、停止条件、样例说明、Reference释义、按钮与空态都支持`zh-CN / en-AU / en-US`。

复用已有英文资料时由作者层提供翻译，原PPT/Reference原文单独保留。澳洲／美国拼写差异不自动改变产品地区、监管规则或案件输入。正式英文版按发布配置排除中文及内部说明，不只隐藏切换按钮。

### 11.2 Reference不作为第五个产品入口

先显示选中Action／Skill的实际来源，不自动把全库挂到每个节点。每条展示“来源观察—本案迁移—不能证明什么—原链接／出处”。

源PPT、行业指引、银行产品实例、跨行业模式、PHKL等内部设计和我们的推演保持类别。源重复码/删除线/权限歧义沿用问题记录，不因图画通了就变为已确认。

内部来源只在获准版本提供；客户版不打包内部文档或其私密链接。公开外链另开，不外传Case参数；页面演示不得以远端链接成功为运行前置。

### 11.3 打印的是选定内容，不是当前viewport

至少支持两种导出内容集合（复用现有打印机制）：

- **Scenario Operating Model：** 当前场景完整分工、选择理由、Skill用途、人工交接静态帧及来源。
- **Skill Brief：** 当前Skill合同、合成样例和已映射的场景用法。

A4横向为概览起点；复杂关系按主题拆页或用既有A3模板。每页保留场景／动作／检查点、To-be、版本、合成标识与图例。跨页使用编号锚点，不能只有一根断线。

作者版可含初评分值；客户版根据发布规则排除内部评估与受限信息。排除必须覆盖DOM、内嵌数据、JSON、References及打印，不能只用CSS隐藏。

---

## 12. 三个状态层：明确“做出来”指什么

| 层 | 本页显示/保存 | 不得误称 |
|---|---|---|
| 设计 | 建议分工、初评、Skill合同、合成样例及待确认项 | 银行已批准或方案已经最优 |
| 本地演示 | 已实现的页面/操作绑定及实际测试证据 | 真实Agent/模型已运行 |
| 真实实现与业务验证 | 未验证，除非另有可核查证据 | 卡片存在或合成结果正确就等于生产可用 |

本轮Operating Model不执行原D4的模型A/B/C性能测试，不新增EvaluationRun成功记录。已有原型保存/模拟任务若实际测试通过，只能标为Local simulation verified。

Operating Model的方案讨论、Product会话和Lab的Shadow注入保持隔离。未来修改执行选择也应产生作者设计修订，不直接修改正在演示的业务权限和状态。首版只读，不增加讨论投票、自动调参或新实验台。

---

## 13. Codex分批执行：一条样板先走通

OM-T00首先输出本地真实文件/组件/测试命令映射；以下是工作合同，不是假定仓库已有某个React文件。代码任务先写能证明目标行为的失败测试、确认失败，再最小实现与回归。原行为已通过时保留其证据，不人为造失败。

| Task | 消费输入与具体动作 | 产出／验证条件 |
|---|---|---|
| **OM-T00 — Inventory** | 读D4 JSON／MD、D3A、已实现场景及四图；核对路由、状态、测试、Prototype目标、语言与打印方式；列出实际文件路径和修改清单 | 基线可重现；无伪造路径/API；报告缺依赖和会影响业务的冲突，不因本稿更晚而覆盖A–F |
| **OM-T01 — Read-only projection** | 在作者层绑定Scenario→Work→Action→Skill／Agent／Human；导入六组17动作；保留评分与source精度；按skill_relation建复用边 | Action／Skill／Workflow／source引用检查通过；读取和切换不写Case；无第二份可编辑评分库 |
| **OM-T02 — Page shell & choice** | 创建Studio内独立子页面与四视角；全局与节点入口；完成三个执行选择示例和可折叠Assessment | 两个一级入口不变；从节点进入无需重选场景；Semantic Skill不误显示Agent；高分不越过Human Gate |
| **OM-T03 — Skills & collaboration** | SK-03／SK-06详细样例及12家族只读目录；复用关系；使用Archify派生场景图，完成六帧和两处暂停 | 点击Skill有具体输入输出与禁止项；播放无模型/银行调用、无Case或Decision写入；缺素材有静态可读路径 |
| **OM-T04 — Product round trip** | 将Try task绑定已存在Screening Review；补来源返回token、未保存处理和当前状态提示；不重写业务命令 | 保存后原位返回；无隐式Case重置；版本变化可见；无对应任务时诚实显示范围，不开发额外工作台 |
| **OM-T05 — Quality pass** | 完成References、三语、键盘／减少动态效果／响应式、打印与发布投影；执行第14节相关测试 | 实际截图、静态打印、命令与结果、缺项分列；合成与真实状态没有混用 |
| **OM-T06 — Pilot review gate** | 提交Person T完整路径、四视角、Skill样例、产品往返及测试证据 | **停下给Christina／Xiaoming／Coco校准。没有这一Gate批准，不批量生成其他场景。** |
| **OM-T07 — Reuse after approval** | 根据获准模式映射其余已有场景和Action；可以分小批，但不新增业务规则、Agent或Prototype工作台 | 15场景已有内容可访问；没有实现任务入口时有明确范围说明；场景差异不被复制成同一张Agent卡 |
| **OM-T08 — Final reconciliation** | 回归D3A、D2产品流程、本页导航/打印；检查主线独立于Lab；交付真实变更清单和测试报告 | 本轮页面范围交付完成后停止，不部署Agent、不自动进入后续Discussion或外部发布 |

**允许并行：** 内容绑定、Skill文案与来源映射可以在样板校准期间准备；不能提前批量扩展未批准的视觉布局。

**不需要等待：** 真实API、模型凭证、独立Agent运行体、GPU、额外视频或全部生产Schema。没有它们，页面与合成体验仍应成立。

---

## 14. 验收：下面均为Codex待实际执行的测试

| ID | 操作／条件 | 可观察预期 |
|---|---|---|
| OM-01 | 全局进入Operating Model | 属于Studio子页；只有两个一级入口；明确显示合成示例，不重置已存产品session |
| OM-02 | 从具体D3工作节点进入 | 自动定位正确Scene／Action／Checkpoint；来源Current/Compare保留 |
| OM-03 | 样板六组展开 | 17原子动作均有归属、无重复业务对象；显示组不自动定义执行顺序 |
| OM-04 | 点工作/展开/来源/拖动 | 四种动作不重叠；不误导航或误拖 |
| OM-05 | 选择复核包Action | 显示Workflow＋Semantic Skill，N/F为继承值8/7；不标已部署Agent |
| OM-06 | 选择正式风险判断Action | 即便N高，仍显示Human Gate；评分不允许更改角色或权限 |
| OM-07 | 选择补证规划Action | AG-REVIEW明确为候选，显示固定Workflow对照，不立即运行 |
| OM-08 | 选择Human关联Skill | `supports_human_action`显示支持关系，不替人判断 |
| OM-09 | 查看SK-03样例 | 缺日期为未知；有来源对照；不自动排除命中或赋予签约权限 |
| OM-10 | 查看跨场景Skill用法 | 引用原Action；用途/权限独立；Inspect不换案件，Open scenario显式导航 |
| OM-11 | 查看评分与缺失值 | 原理由和版本可见；缺失不填0；没有自动化百分比或编辑Apply按钮 |
| OM-12 | 打开每条PPT／Reference | 精确来源、格式疑问和观察/迁移/限制保持；无隐藏客户身份猜测 |
| OM-13 | 播放到信息不足 | 自动暂停；未增加资料、任务或Decision；可读静态替代 |
| OM-14 | 播放到人的判断 | 不自动确认；Next不是Approve；假设后续样例有显式标识 |
| OM-15 | Preview后续故事 | 只改变作者检查点/播放帧；Product与Lab状态保持原值 |
| OM-16 | 切视角／References／离开页面 | 播放暂停；返回原位置且不自动重播 |
| OM-17 | Try task，目标存在 | 进入同案正确Task／Finding与现有模拟状态，不进入通用Dashboard |
| OM-18 | Try task，目标缺失 | 明示本版未包含；不创建虚假工作台或借另一个Case替代 |
| OM-19 | 产品保存后返回 | 原Operating视角与Action恢复；保存状态和最新语言保留 |
| OM-20 | 未保存离开／保存失败 | Save／Discard／Stay；失败保留输入与错误，不导航、不伪报成功 |
| OM-21 | 返回期间版本已改变 | 语义位置恢复并提示版本；不用旧token覆盖新业务记录 |
| OM-22 | Back／Forward／深链 | 只走有意义层级；无pan/zoom/frame历史污染；无来源时有有效Journey回点 |
| OM-23 | 三语切换及英文发布 | 所有面板/样例/来源释义/打印可读；英文版可排除中文与内部资源；政策不变 |
| OM-24 | 窄屏、键盘、触屏、减少动态效果 | 字号可读、焦点明确、非拖动替代可用；无必须hover才能访问的关键内容 |
| OM-25 | 打印完整选定场景或Skill | 包含屏幕外内容与静态暂停点；重复定位/图例/版本；无敏感信息越权 |
| OM-26 | 检查网络与写入 | 作者页操作无模型、银行或发送请求；公共Reference只有显式点击；图中可见“执行”不产生业务命令 |
| OM-27 | 已有产品模拟Request／Record动作 | 仍使用已有本地权限/版本/副作用合同；不为动画绕过控制 |
| OM-28 | Lab有意Shadow差异 | 主线/作者检查点/产品会话不被覆盖；variant标记正确，不强制所有状态同值 |
| OM-29 | 旧collaboration_pattern为Agent-prepared | 展示按primary_executor/skill_relation正确分类，源值保留display映射记录 |
| OM-30 | 交付状态核对 | 图/卡/样例只按实际证据标状态；不存在Run Agent、真实模型已通过、银行已签核的虚假声明 |

**Critical 阻止主线交付：** 错Case/Scope/资料用途，解释性播放写业务决定，越权资料、伪造模型或银行执行，返回回滚已保存数据，False Ready／False Clear。模型性能试验未执行不阻塞本轮页面，但必须保持未执行状态。

报告每条为PASS／FAIL／NOT_RUN，并记录实际命令或人工步骤与证据。不得把本稿的验收文字当作测试已通过。

---

## 15. 交付清单与可直接粘贴的Codex指令

### 本轮交付清单

1. 一个Operating Model Studio子页面及四个视角，首批为Person T完整样板。
2. 原作者数据的绑定/局部投影、Skill样例和复用关系；不另建分析真相。
3. Archify源规格、实际嵌入输出、静态替代及稳定节点映射。
4. 一条可实际操作的来源场景→工作分工→Skill/协作→对应产品任务→原位返回路径。
5. 三语、Reference、静态打印和实测证据；实施缺陷与银行待验证问题分开。

### Codex启动指令

读取本稿、现有D4 MD/JSON、D3A、已批准D2 A–F和当前仓库。只制作 **Operating Model Studio展示与合成体验**，不部署Agent、不连接真实模型、银行查询、邮件或身份服务，不重做现有业务系统。

先执行OM-T00与OM-T01：报告真实路径、现有路由/状态/Prototype目标、Source/Action/Skill映射与会影响业务的冲突。保留D3四类变化、PPT原位置与D4评分的初评身份；Workflow承载工作，不能把整个场景统一标Agent。

接着实施OM-T02至OM-T05。样板限定 `SCN-MATCH / BR-07 / WF-05`：六个展示组覆盖原17动作；默认选复核包准备动作 `D4A-MATCH-04-01`，同时能比较 `D4A-MATCH-03-01` 的Agent候选与 `D4A-MATCH-05-02` 的Human Gate。显示Skills合同、预编制协作与现有Product任务的来回。

所有流程/关系/架构图用本机已安装Archify；HTML完成页面控制、来源、导航、访问投影和打印。播放、评分、Skill查看、语言及分支选择绝不直接写业务结果。产品保存后的状态不能被返回操作回滚。

完成Person T整条路径并执行相关OM-01至OM-30测试，提交真实预览、图规格、交互/打印证据、命令与结果、缺项和变更清单，然后停在OM-T06等待Christina及设计师校准。获准后再执行OM-T07/08扩展其他已有场景。完成后停止，不自动推进生产Agent、Priority Board、下一Discussion或外部发布。

---

## 附：来源与本文件边界

本稿将用户批准的上一轮页面提案落为执行合同。业务内容依据D4主稿第6–11节、D4 JSON的原Action／Skill记录，以及D3A第5–8、11–15节。未决规则、原评分和源歧义不因本稿成为确定事实。

本次读取的D4 JSON：`Clear_to_Trade_D4_Action_Assessments_v0.1.json`。  
SHA-256：`fdaa5d5c172645dd2f0409bbc929a016dd5d78ba0ea24d3b15f2fd79ba3852ad`。此哈希只用于识别本稿参照版本；Codex若有更新版本应记录差异，不强行降级。

本轮实际产出：这份MD及其文档/引用结构检查。**没有完成或声称完成本机仓库修改、Archify成图、页面实现、媒体、打印PDF、模型试验或上述应用验收。**
