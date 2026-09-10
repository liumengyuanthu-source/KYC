# Clear-to-Trade — 图片、动效与动画打样要求
## D2 Batch A / SCN-SCOPE + SCN-ENTITY — Independent Media Sampling Brief

- Version: v1.0
- Date: 2026-09-07
- Content owner: Christina
- Intended users: 独立媒体探索对话、Xiaoming、Coco、负责整合的Codex。
- Client label: Confidential Australian Banking Client。
- Classification: 受限制作材料；只使用本文最小合成背景。
- Business baseline: `Clear_to_Trade_D2_Batch_A_Scope_Entity_Final_v1.0.md`。
- Status: **业务案例及两场景已批准；以下为制作/打样要求，具体视觉候选尚未选定。**
- Output boundary: 本文规定图片、动态表现与演示格式；不声称任何图像、视频、HTML样片、Archify图已经生成或测试。

> 目标不是“把银行流程拍得更酷”，而是让观众快速看清：为谁建立关系、谁代表谁、资料支持什么、什么仍然未知，以及下一步能做什么。

## 0. 给另一个对话的使用方法

本Brief已经包含首批媒体所需的最小业务信息，可以单独交给另一个对话。它不需要知道银行身份、不需要拿到未去识别原PPT，也不需要复制全部项目历史。

收到后先做**有限打样**，不要生成整套Journey网站：

1. 确认下述三类表达：人物/场景静态资产、业务关系的受控动态、真实产品操作的视觉表现。
2. 优先完成两个独立内容题目：Scope对象区分、代表权限的用途缺口。
3. 同一题目最多提交两个风格候选，所有候选保持完全相同的业务数据和结束状态。
4. 初次不需要长视频、口型表演、大量旁白或全流程渲染。
5. 使用本文的asset ID、格式、故事表和manifest交付；具体资源路径以实际生成的文件为准。
6. 候选资产只进入sandbox/样片区，不替换Codex主工程的已批准资产。

如果另一对话没有Archify可执行环境，它应交付符合业务合同的diagram brief、节点/边语义及播放cue，由Christina本机已安装Archify的Codex生成；不能用图片模型或手写其他流程引擎冒充Archify。

## 1. 已批准合成案件：所有样片必须保持一致

| 元素 | 固定的故事信息 | 不可以补写的内容 |
|---|---|---|
| Case | 同一合成Clear-to-Trade案件；沿用主工程ID，展示别名DEMO-CTT-001 | 真实银行客户或真实案件 |
| Group A | 商业/集团展示名 | 直接作为法人唯一标识 |
| Entity A | 澳大利亚经营公司；本次唯一拟准入交易法人 | 已获批、已交易或担保角色 |
| Entity B | 新加坡母公司背景；A/B关系初始为reported | 自动视为交易对手/担保人/已验证所有权链 |
| Person T | 在Entity B任职的集团资金负责人；提出协调Entity A申请资料 | 自动取得A的声明、签字或交易权限 |
| 产品意图 | FX forward，用于未来美元采购付款相关的汇率风险管理 | 交易金额、报价、银行额度、产品资格结论 |
| Booking | 未确认时保持未提供 | 由澳大利亚界面自动生成某银行booking实体 |
| 初始证据 | 关系请求、集团结构概览、集团职位/任命资料 | 逼真官方证件、签章、ACN/LEI/护照号 |
| 后续合成来源 | Entity A的登记资料在对应来源结果事件后出现 | 让尚未收到的资料提前存在 |
| 授权材料 | 针对Entity A具体用途的额外材料尚待取得/评估 | 用职位证明替代全部授权 |
| 两幕结束 | Scope和对象更清楚；authority缺口明确；全案仍Not ready | 绿色全案Complete、交易执行、自动批准 |

**母公司、交易主体、任职组织、被代表主体是四种关系语义。**它们可能指向同一或不同对象，但本案不能随画面合并。

### 1.1 合成请求内容

英文业务内容：

> We would like to set up FX forward access for our Australian operating company. Our group treasury team will coordinate the documentation.

中文业务内容：

> 我们想为澳大利亚经营公司申请外汇远期业务，由集团资金团队协调资料。

它是Studio里的合成业务输入，不是首页口号，也不是Prototype的教学subtitle。不要增加交易收益、风险分数或合规结论。

## 2. 格式选择：图片、动效、动画、视频不是同一种产物

| 类别 | 回答的问题 | 推荐载体 | 是否写业务状态 | 首批优先级 |
|---|---|---|---|---|
| Persona image | 谁在参与 | 无文字PNG/WebP，必要时透明底 | 否 | 必需可替换资产；先两人 |
| Scenario still | 工作环境和业务冲突是什么 | 无关键文字的场景图，文字由HTML叠加 | 否 | 可选增强；不能替代业务信息 |
| Relationship / flow diagram | 谁关联谁、依赖什么、哪里等待 | Archify输出，保留typed source和静态版本 | 否 | 必需；不可用生成图替代 |
| Micro-interaction | 我点了什么、状态展示有何变化 | HTML/CSS/已有动画机制 | 只反馈已发生动作，不创建它 | 必需、克制 |
| Story animation | 工作/关系如何逐步揭示 | Archify图+受控播放cue+HTML标签 | 否，只读已审阅故事 | 首批核心；静态成立后再加动态 |
| Product behaviour sample | 实际操作怎样保存、报错、返回 | 独立HTML小样或主工程的隔离demo session | 可改变其明确隔离的合成会话 | 需能检查真实行为，不只热点 |
| Short concept film | 同一场景怎样更快理解 | 可选MP4短片+poster+字幕/文本 | 否 | 非关键路径，后选用 |

**媒体轨与Living Case Lab不是一回事。**媒体轨探索表达，Lab检验业务逻辑。样片不能替Lab创建政策或Case Fork，也不能写Mainline。

## 3. 视觉语言与图文分工

### 3.1 总体方向

NTT DATA蓝色方向，浅色内容底，克制而清楚。真实机构业务工作的严谨感优先于科技大片感。

- 正文/数据在实体底上阅读；玻璃质感仅用于轻量导航和控制。
- 圆角、阴影、icon线重、基线与spacing必须统一。
- 一次只突出一项业务差异，不让所有节点、线和标签同时发光。
- 不用阴暗杂乱办公室代表Current、豪华未来办公室代表Target；两者差异是工作方法，不是审美贬低。
- 不加入客户银行logo、可识别分行、专属楼宇、未经批准系统截图或真实人物。
- 不新增真实人物姓名、职位级别和履历；Person T仍为合成角色。

### 3.2 建议首批两个视觉候选

| 候选 | 风格 | 用法 |
|---|---|---|
| A：Editorial realism | 自然光、平视、真实但简洁的资金/运营办公场景 | 人物、少量场景背景 |
| B：Restrained editorial illustration | 细节克制的现代编辑插画，不做卡通机器人 | 人物或抽象工作场景替代 |

选择一套作为人物/环境主风格；不要每个场景换一套。交互关系和产品文字无论哪种风格都保留HTML/Archify的精确结构。

### 3.3 颜色的四类语义

| 意义 | 表达 | 禁止混用 |
|---|---|---|
| 导航/选中 | 统一蓝色强调、边框和位置标记 | 蓝色不等于已通过 |
| 执行者 | Human / Agentic / Rule / Tool图标+文字 | Human不等于警告 |
| 业务状态 | 明确文字+必要状态色 | Target不自动变绿色 |
| 证据状态 | Reported / Hypothesis / Synthetic等中性标签 | Hypothesis不等于高风险 |

工作色仅沿用主工程已批准tokens；如果缺少官方token，使用工作候选并标注，不称官方品牌色：action #0067B1，heading #003B71，body #172B4D，surface #FFFFFF，canvas #F3F7FB；Agent accent #5B4BB7少量；Review #9A5B00、Blocked #B42318、Complete #166534按实际意义使用。所有对比度需在实际页面检查。

### 3.4 文字层级与subtitle规则

| 位置 | 可放什么 | 不放什么 |
|---|---|---|
| Studio方法/故事 | 简短场景问题、事件、上下文 | 每幕重复方法论长文 |
| Journey主卡 | 标题、对象/问题摘要、process和状态 | 完整work contract或priority score |
| Scenario弹窗 | 图文结合的事实、差异、依据和结果 | 大段“AI将如何提升效率” |
| Product工作界面 | Case / Scope / Parties / Authority / Tasks / Activity，字段、状态、错误、按钮 | 引导性、营销性、教学型subtitle |
| 视频无障碍字幕 | 旁白/有信息的声音对应文本，单独轨道 | 烘焙为只能一种语言的大字幕墙 |
| 说明性i-help | 简短语义说明，hover/focus/tap可读可关闭 | 将关键阻塞、错误或权限限制藏进去 |

“Prototype不加引导subtitle”不等于“视频不能有无障碍字幕”。两种字幕含义务必区分。

## 4. 各类资产的Format Manner

下列尺寸与性能预算是首轮制作约定，不是声称某模型或浏览器已验证的上限。确有质量需要可报告超额理由，经批准后调整。

| 类型 | 原始/可编辑交付 | 上线/嵌入交付 | 构图要求 | 起始预算 |
|---|---|---|---|---|
| Persona | PNG母版；生成说明与asset reference | WebP或PNG；4:5建议1200×1500，另出1:1缩略图 | 胸像/半身、表情自然、留安全边距；背景与角色保持一致 | 网页单图目标≤250KB；高清母版单独存放 |
| Scenario still | 无文字母版，建议1920×1080或更高 | 16:9 WebP/PNG，建议1600×900 | 主要信息处于中央安全区，预留HTML文字区；不依赖图中文字 | 网页单图目标≤600KB |
| Icon | 同一已选图标体系的SVG | 本地可加载SVG或组件 | 24px基准、相近stroke；关键动作配文字 | 不引入另一套大型icon库 |
| Archify diagram | typed spec、实际skill版本、节点/边/scene引用 | 可嵌入输出+静态SVG/原生支持的等价静态输出 | 对象标签清楚，关系状态不只靠颜色；viewBox自适应 | 无需多余嵌入base64照片；截图不能代替源spec |
| Motion sample | 独立HTML/CSS/JS或主工程兼容组件+cue manifest | 可播放、暂停、逐步、重播的本地demo | 保持壳层定位不动，只改变必要的focus/关系 | 一幕建议12–20秒，可暂停，不设业务时限 |
| Product action sample | 可检查源码、固定synthetic fixture、行为说明 | HTML真实表单/动作/状态 | 1440×900评审，同时检查1366宽与放大 | 不导入整平台，不要求新框架 |
| Video | 原始导出/编辑来源或生产说明 | 推荐MP4/H.264候选，1920×1080，24/30fps，实际浏览器测试；WebM为可选版本 | 15–25秒，16:9，一场景一冲突，正文UI不由生成视频重画 | 短片目标≤10MB；依清晰度调整并报告 |
| Captions | zh-CN / en-AU / en-US文本源 | 每种语言独立WebVTT轨道；相同语言版本可复用但须说明 | 不遮挡按钮/关键数据 | 文案与scene revision一致 |
| Print fallback | 完整静态状态、局部关键帧和对应文字 | SVG或清晰PNG，按A4/A3视图独立排版 | 不只拿最后一帧；保留未知、依赖和角色 | 不依赖屏幕viewport或媒体下载成功 |

SVG涉及关系的部分必须由Archify产生；普通icon、进度定位框、focus ring属于宿主UI，不是另一套业务流程图。

## 5. 首批资产清单：先集中，不铺满全部Journey

以下asset ID是媒体别名；Codex映射现有registry，不更改业务ID。每个asset有独立版本。

| Asset alias | 内容 | 所属场景 | 首批状态要求 |
|---|---|---|---|
| MED-A-PER-T | Person T，集团资金联系人 | SCOPE / ENTITY | 打样一套形象，两种构图；不写真实姓名 |
| MED-A-PER-OPS | 银行运营分析人员合成形象 | SCOPE / ENTITY | 与前者风格一致；不把Ops头像标成RM实际岗位 |
| MED-A-STILL-SCOPE | 请求与经营业务环境的简洁背景 | SCOPE | 可选，不盖过scope数据 |
| MED-A-STILL-ENTITY | 资料复核工作环境 | ENTITY | 可选；公司/人员之间的正式关系仍由Archify表达 |
| DG-SCOPE-A | 请求、Group A、Entity A和scope context | SCOPE | 本机Archify生成；有静态版 |
| DG-ENTITY-A | A/B/T与任职、母子、claimed authority | ENTITY | 本机Archify生成；关系与来源有状态 |
| DG-ENABLE-A | 哪些准备可继续、哪些具体等待 | ENTITY出口 | 只按已定义门槛显示 |
| DMO-A01 | Scope clarification focus演示 | SCOPE | 第一轮核心样片 |
| DMO-A02 | Authority purpose gap演示 | ENTITY | 第一轮核心样片 |
| DMO-A03 | Save / unsaved edit / return演示 | 两场景与共享产品 | 第二轮，在交互合同一致时做 |
| VID-A01 | 两幕精简的连续短片 | Studio | 可选，静态/HTML成立后再做 |

不必把所有图片做完才开始DMO-A01/02。两张人物图、必要Archify关系、两个受控动画已经足以判断方向。

## 6. 打样一：DMO-A01 — 请求中的“集团”不等于交易法人

### 6.1 目的

看清商业请求如何转成工作范围；不把提取结果拍成银行自动批准。

### 6.2 内容和镜头表

| Cue | 对应Story beat | 建议展示时长 | 内容 | 动态方式 | 业务状态约束 |
|---|---|---:|---|---|---|
| A01-C1 | A-01 Request received | 2–3s | 合成请求与Group A标签 | 请求卡轻入场，其余稳定 | 仅有请求，不是Verified |
| A01-C2 | A-02 Scope ambiguity | 3–4s | Group A与Entity A是不同对象 | Archify聚焦/连线揭示；保留两者标签 | Entity A仍需澄清，不做绿色勾 |
| A01-C3 | A-03 Trading entity clarified | 3–4s | 预编制的RM澄清记录，Entity A成为拟交易主体 | 新的来源/范围标签出现；可暂停 | 这是演示事件；不是观众已确认客户 |
| A01-C4 | A-04 Working scope recorded | 3–4s | Requested product=FX forward；Booking=Not provided；Eligibility=Not assessed | 聚焦缺口而非全部填满 | Working scope记录，不等于Clear-to-Trade |
| A01-C5 | A出口 | 用户决定继续 | 两项下一步：Requirements draft、Authority review | 静态收束+返回/继续 | 不自动推进其他条件完成 |

总时长为镜头节奏建议，不是业务处理SLA。暂停读内容不影响业务或倒计时。

### 6.3 对照要求

Current和Target使用相同业务请求、对象和未决结果。Current展示人组织这些输入；Target展示产品准备候选值、来源和缺口。不用杂乱/灰暗Current与明亮Target伪造业务收益。

### 6.4 三个必须通过的理解检查

- 观众能指出真正拟交易主体是Entity A。
- 观众不会认为Entity B自动成为担保人或交易对手。
- 观众能说出booking/eligibility等仍有未决事项，没有发生准入发布。

## 7. 打样二：DMO-A02 — 岗位证明不等于对特定主体的全部权限

### 7.1 目的

让“Person T任职于Entity B”和“Person T声称代表Entity A”同时清楚可见。视觉不暗示资料造假、不暗示全部权限已建立。

### 7.2 内容和镜头表

| Cue | 对应Story beat | 建议展示时长 | 内容 | 表现 | 禁止变化 |
|---|---|---:|---|---|---|
| A02-C1 | B-01 Records separated | 2–3s | Entity A、Entity B、Person T | 三对象稳定展开；保持标签和来源 | 不合并A/B |
| A02-C2 | B-02 Entity source reviewed | 2–3s | 合成Entity A登记来源出现 | 来源卡与其支持的对象关联 | 不把全部ownership/authority同时认证 |
| A02-C3 | B-03 Authority gap | 3–4s | EV-A03支持岗位声明，未明确A的该用途 | 人物/任职边正常；A的代表边显示claimed/待证据 | 不把人物变红或显示criminal risk |
| A02-C4 | B-04 Targeted work opened | 3–4s | Principal=Entity A；Purpose=Coordinate information；Status=Evidence required | 具体用途行与任务出现；停止在需输入处 | 不自动发送客户邮件 |
| A02-C5 | B-05 Preparation can continue | 3–4s | 某些输入充分且无hold的准备项，与待授权动作并列 | 仅高亮已审阅的ready-for-preparation项 | 不让所有分支跑到Complete |
| A02-C6 | B出口 | 用户决定继续 | Scope记录、Authority缺口、总体Not ready | 静态结果，保留定位/返回 | 不出现“Client approved” |

### 7.3 终止画面必须可读

至少保留：Entity A、Person T、authority具体用途、Evidence required/Not established、工作项责任或Unassigned、哪些动作仍等待。Person T不能只有头像，没有对象角色标签。

### 7.4 打样比较

可提交“Archify图为主”和“产品用途对照面板为主”两种表现；两者不能改变节点、证据与状态，只比较阅读和镜头组织。正式关系部分仍使用Archify。

## 8. 打样三：DMO-A03 — 正常产品动作与可靠返回

这个小样不加入新的业务故事，用于验证真实产品观感与操作可信度。

固定路径：从SCN-ENTITY进入Authority相关界面；编辑一个草稿；尝试返回；出现Save draft / Discard changes / Stay；保存后返回同一scene与原Journey位置。

产品标题保持Scope / Parties / Authority / Tasks / Activity。不出现“Click here to experience AI”或逐步教学subtitle。解释仅在标题旁i-help；字段错误、未保存状态、权限或缺口直接可见。

可以制作真实小HTML并在隔离demo session中执行保存；也可以录制已实现界面。只生成一段假光标视频不能证明动作已实现，交付时必须标`video-only demonstration`。

检查：

- 返回没有丢失stage、role、scene、Current/Target与缩放。
- 切中文后返回仍保持中文，不由旧token恢复英文。
- 保存值可重新打开；Discard只丢弃未保存内容，不回滚已保存历史。
- 关闭媒体/切换版本不触发任何业务批准。

## 9. 运动语法：必须有意义，也必须可停

| 行为 | 表现约定 | 静态等价 |
|---|---|---|
| 用户选中对象 | 边框/轻强调，必要时平滑focus；不能无提示跳走 | 相同选中边框 |
| 展示依赖 | 前置、当前动作、下游各自有标签；非当前边弱化但不删除语义 | 完整局部图 |
| 业务输入到达 | 仅已审阅事件的对应记录/版本出现 | 事件列表及before/after |
| 需人工判断 | 暂停在任务和依据处，不继续自动“批准” | Review required及owner |
| 有可继续工作 | 标出具体任务与前置满足原因，不把未知默认启用 | Eligible / Awaiting / Not assessed |
| Current/Target切换 | 同一scene位置与对象锚点稳定；差异短暂强调 | 成对版本 |
| 返回 | 回来源场景卡并短暂标记，不回首页 | 恢复位置和focus |

初始参数：微交互160–240ms；场景dialog约220–320ms；focus移动建议280–420ms且可停/跳过。它们是视觉起点，不是强制标准；reduced motion时移除镜头移动，用直接定位/静态强调保留理解。

默认不自动播音、不循环播放、不让多部动画同时运行。hover仅显示辅助说明，不自动启动长故事或提交动作。

播放计时、业务事件时间、任务SLA、Stage进度、Case Readiness分开。动画12秒不代表银行处理只需12秒。

## 10. 嵌入合同：对另一个对话可实现，不假设现有API

这是候选组件接口语义，**不是Archify已存在的API声明**。Codex按照本机版本及既有宿主实现适配，不依赖猜测参数。

### 10.1 传入的只读上下文

`asset_id、asset_revision、content_revision、case_fixture_revision、scene_id、beat_id、comparison、ui_locale、english_variant、region_context、motion_preference、source_snapshot_ref、synthetic`。

### 10.2 样片允许向宿主发出的意图

- media_started / media_paused / media_finished：只更新媒体状态。
- focus_requested(node_ref)：宿主验证当前scene的合法对象，再定位。
- story_beat_requested(beat_ref)：只改变叙事游标。
- open_product_requested(scene_ref, task_ref)：宿主验证后保存return context并导航。
- return_requested(destination)：由宿主处理保存确认与返回。

不允许样片发`approve_client`、`set_ready`、`publish_clearance`或直接写业务store。产品操作样片的可变数据只在明确隔离的local demo session，不能更新主工程的基线。

若使用iframe/postMessage：由Codex核对origin、message type、asset/scene白名单与版本；不写任意脚本，不把广播消息当可信操作。若本地打开方式无法安全通信，优先静态嵌入或同源受控wrapper，而不是依赖不受控通配消息。

### 10.3 生命周期

初始显示poster/静态图。用户Play才播放；离开scene暂停；打开产品前保存beat但不自动resume。返回后停在同一beat，由用户继续。加载失败显示静态替代，不留空白，不伪造render成功。

## 11. Asset Manifest：每份交付都要有，不能只有一个视频链接

每个候选asset至少记录：

| 字段 | 用途 |
|---|---|
| asset_id / variant_id / asset_revision | 唯一资产与候选版本 |
| source_batch / source_document_revision | 固定业务来源，Batch A Final v1.0 |
| scenario_refs / beat_refs / diagram_refs | 对应场景、故事时点与Archify资产 |
| case_fixture_revision / source_snapshot_ref | 使用哪个合成数据快照 |
| asset_type / file_format / dimensions / duration / fps / file_size | 技术规格 |
| source_files / preview_file / poster_file / static_fallback | 真实生成路径，不虚构存在 |
| locale / caption_tracks / alt_text_refs | 语言与无障碍资产 |
| motion_mode / controls_supported | 是否可停、逐步、重播及静态替代 |
| allowed_intents / data_mutation_scope | 只读媒体或隔离产品session |
| licence_or_generation_provenance | 素材来源、生成工具与使用限制 |
| content_status / visual_status / test_status / promotion_status | 内容、视觉、测试、上线选用分别记录 |
| known_limitations / review_owner | 仍未支持或待确认内容 |

缺失optional文件用null和原因，不填写一个不存在的路径。生产项目不加载候选媒体目录；只有manifest标记approved_for_mainline且关联已审核版本才接入。

## 12. 每轮独立打样的交付包

最少交付四类内容：

1. **预览**：静态图或本地HTML/短视频，明确它是哪一类样片。
2. **可维护源**：图像母版/生成说明，HTML/CSS/JS，Archify spec，或视频生产说明；不声称不可导出的编辑项目已交付。
3. **Manifest**：准确ID、版本、场景/beat映射、语言、来源和缺失项。
4. **Review note**：表达的业务问题、与另一候选的差别、已检查项、真实限制、建议采用/不采用理由。

命名示例：`DMO-A02__archify-first__r01__en-AU.html`、`DMO-A02__archify-first__r01__poster.png`、`MED-A-PER-T__editorial__r01__4x5.webp`。所有英文UI版本使用相同业务对象，不换一套公司/角色。

源字体文件不分发；使用项目已有许可字体或系统fallback。主线不依赖外部CDN、远程视频播放或需要登录的临时链接。

## 13. 质量与Promotion Gate

### 13.1 一票否决项

- 暴露或暗示未知客户身份、真实PII、真实名单命中或专属系统资料。
- 把Group A、Entity A、Entity B混成同一主体。
- 把职位/任职关系变成Entity A的签字/交易权限。
- Target动画默认变成Ready/Approved，或让视频结束触发Case状态。
- 没有可暂停/静态回退，关键内容只在瞬间动画中存在。
- 伪造产品保存/审核结果；尚未生成素材却交付假下载路径。
- 图中关系错误，即使画面美观也不得进入主线。

### 13.2 定性评审表

| 维度 | 核对问题 |
|---|---|
| 业务准确性 | 同一case、对象关系、缺口和未决状态是否一致？ |
| 叙事清晰度 | 不额外解释时能否理解“主体不同/权限按用途评估”？ |
| 阅读性 | 文字、状态、contrast、留白、alignment是否成立？ |
| 定位/返回 | stage/scene位置持续可见，结束知道回哪里？ |
| 运动克制 | 每一个动效是否解释变化，而不是抢注意力？ |
| 语言与打印 | 中英不截断；静态版能否表达完整结论？ |
| 可维护性 | 有源码、版本、manifest、字段映射，能被后组复用吗？ |
| 性能 | 实际设备/浏览器播放是否稳定；没有媒体是否仍可读？ |

只用Accept / Revise / Keep as sample / Reject，不在这里提前给银行Feature优先分数。

### 13.3 从候选到主线

媒体作者提供candidate → Christina确认业务含义 → Xiaoming/Coco确认表达与结构 → Codex验证嵌入/返回/locale/print → 必需红队检查 → Christina选择具体asset revision → 主线manifest定向引用。

媒体作者不能因“效果更好”自行改schema、权限、场景结论或主导航。业务变更进入change request，视觉候选可以独立继续。

## 14. 有限探索节奏

| 波次 | 做什么 | 不做什么 |
|---|---|---|
| Wave 1 | 同一场景静态构图/角色风格；DMO-A01/02分镜与关键帧 | 不同时生成十种风格 |
| Wave 2 | 对通过的样式做Archify focus/播放、真实产品返回小样 | 不把所有模块加入大动画 |
| Wave 3 | 从通过的样式挑一个可选短片；补字幕与print | 不因电影效果延期P0 |
| Reuse | 将通过的颜色/icon/图文/控制模式带入D2 B/C等组 | 不自动复制未验证业务关系 |

如果时间紧：静态完整内容与局部Archify图优先，缩短或删除短片，不取消返回、角色/状态区分或红队。

## 15. 给另一个对话的启动Prompt

> 本轮只为Confidential Australian Banking Client的Clear-to-Trade D2 Batch A做图片/动效/动画打样，不开发完整银行产品。严格沿用本Brief里的合成Entity A、Entity B、Person T、FX forward意图、缺口与Not ready结果。Scope/Entity业务内容已批准，不在媒体设计时改变主体、权限、状态和规则。
>
> 先做DMO-A01“集团名与交易法人区分”和DMO-A02“职位证明与特定主体权限区分”。可以对同一个内容提出最多两个表现候选，但不要扩张故事。场景图片无关键文字，角色风格一致；正文/状态由HTML及locale资源提供。全部关系/流程图走Archify，缺少本机Archify就交付typed diagram brief与播放cue，由本机Codex渲染，不用图像生成代替精确关系。
>
> 每份样片带asset manifest、实际预览/源文件、poster/静态fallback、中文与地区英文说明、controls和限制。动效可以Play/Pause/Next/Replay，只读故事，不写Shared Case Spine；Product动作样片必须标明使用隔离demo session。Prototype不加教学型subtitle，必要说明用i-help，关键阻塞直接可见。保留NTT DATA蓝色方向、克制玻璃导航、圆角、spacing/alignment，不做霓虹/机器人/全图循环效果。未生成或未测试的资源不要声称已存在或通过。

## 16. 技术与可访问性参考（2026-09-07核对）

这些参考支撑表现与可访问性，不确认本地Archify或银行产品已经通过测试。

- W3C SC 2.2.2 Pause, Stop, Hide：自动开始并持续的运动/更新需要相应控制；本项目更进一步默认用户主动Play。
  https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- W3C SC 2.3.3 Animation from Interactions：非必要交互动效可关闭，尊重减少动态效果偏好；该条为AAA，不将采用单条要求写成整产品认证。
  https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- W3C SC 1.4.13 Content on Hover or Focus：i-help应可关闭、可移入阅读且保持可见。
  https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
- MDN HTML video：可使用controls、poster及字幕track；实际文件/codec/浏览器组合需要测试。
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video
- MDN WebVTT：独立的定时文本轨道可用于不同语言字幕。
  https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API/Web_Video_Text_Tracks_Format
- MDN Web video codec guide：导出候选必须按实际运行环境验证，不宣称任何格式覆盖所有设备。
  https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs

## 17. 本轮与执行稿关系

本Brief不重新批准银行政策，不接触真实资料，不自行扩大原型。不替代Batch A Final的工作/字段/状态合同。

**图片让人物与工作具象，动效解释变化，动画解释协作，产品动作产生受控的模拟结果；四者不能互相冒充。**
