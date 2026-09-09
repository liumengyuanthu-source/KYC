# D4 Operating Model — Person T pilot review

范围：执行新版 Brief 的 OM-T00–T06。**本次不是全部 D4 场景或生产 Agent 的实现。** 最终证据与独立复核结果见下方，未通过的检查不能以设计批准替代。

## 本机预览

- [中文 Operating Model](http://127.0.0.1:8765/prototype/?studio=operating-model&scene=SCN-MATCH&view=overview&locale=zh-CN)
- [English AU](http://127.0.0.1:8765/prototype/?studio=operating-model&scene=SCN-MATCH&view=overview&locale=en-AU)
- [独立英文客户说明包](http://127.0.0.1:8765/07_output/operating-model-customer-en/)

这些入口均为 localhost，不是远程发布。主应用是作者开发环境；角色选择只是本地显示投影，不是身份认证。只有独立英文包经过物理白名单导出，不能把整个开发目录作为客户资源分享。

## 可 review 的增量

Studio 内增加工作分工子页，保留 Studio / Product 两个一级入口。四视角为 Operating Overview、Execution Choice、Skills & Reuse、Human Collaboration。六组覆盖既有17动作，默认进入复核包准备；未批量展开其他场景。

| 执行选择 | 本次表达 | 不代表什么 |
|---|---|---|
| 复核包准备 | Workflow + Semantic Skill；沿用 N8 / F7 初评 | 不是 Agent 执行，也不是筛查决定 |
| 证据缺口处理 | 有边界的 Agent 候选；沿用 N12 / F6，并列固定 Workflow + retrieval 替代 | 未部署、未调用模型、未建立新权限 |
| 重大性与升级判断 | Human gate；沿用 N11 / F4，Skill 仅支持 | 高分不移交专业判断或权限 |

能力目录保留原12家族，仅 SK-03 / SK-06 有详细合成样例。复用关系来自原 `skill_refs`，区分供执行使用与支持人工。四种状态分别说明合同、样例、界面绑定和真实实施证据，不以“完成进度条”混合。

协作说明为预编制六帧，信息缺口与人工关卡分别暂停。继续播放不是批准；后续例子须显式 Preview，并采用既有 **C-unresolved 未决说明**，没有编造成功排除。F5/F6 未授权预览前不进入屏幕 DOM；减少动态效果不绕过该边界。

## 真实任务入口与返回

Operating Model 本身不载入案件、查询或 fixture。新的 A 会话通常没有当前 Person T 命中，所以会诚实显示任务尚不可用。要体验：从既有筛查准备打开 C 合成会话，准备初步查询、请求并接收结果，再进入 Person T 场景的工作分工说明。已有当前 C 命中时，Try the task 连接同案、同命中、当前主体与范围版本的既有筛查工作台。

保存草稿、请求限定身份资料继续使用原 C / B 命令。记录 disposition 的既有权限/fixture 限制没有被放宽。保存或返回不使整个案件 Clear-to-Trade；保持 Current 来源、所选动作、最新语言和当前已存案件。作者检查点不是产品数据快照。

## File / delta map 与来源

| 路径 | 增量 |
|---|---|
| `prototype/operating-model/` | 不可变来源投影、翻译、关系/来源映射、静态图清单、完整打印 |
| `prototype/operating-model-state.mjs`、`operating-model-ui.mjs`、`operating-model.css` | 只读页面状态、四视角与局部样式 |
| `prototype/app.mjs`、`navigation.mjs`、`index.html`、`transformation-ui.mjs` | 最小宿主入口、原工作节点映射、返回/语言/打印接入 |
| `04_operating_model/d4/` | 本机 Archify typed specs 与生成器 |
| `prototype/diagrams/operating-model/` | 三语静态图、经典交付 HTML、保留的 canonical SVG、三类聚焦图 |
| `00_governance/operating-model/` | OM-T00 实际清单、原始哈希、来源 crosswalk、导出器、验收表 |
| `07_output/operating-model-customer-en/` | 独立英文只读说明包，物理排除中文及内部评估资源 |
| `prototype/qa/operating-model/` | 新浏览器、打印、图与旧主线回归证据；不覆盖旧 D2/D3A 目录 |

原 D4 JSON SHA256：`fdaa5d5c172645dd2f0409bbc929a016dd5d78ba0ea24d3b15f2fd79ba3852ad`。保留229动作/94工作/12能力/12工作流的来源身份，页面只展开 MATCH17动作。`00_governance/operating-model/action-source-crosswalk.json` 为逐动作精确 crosswalk，包含原 PPT 页/shape/occurrence、D3四类变化与未决问题。D4细分动作不被说成 PPT 原文活动。继承来源核验日期，不声称本轮重新外部验证。

五个业务引擎与实施前快照逐字节哈希比对；未新增业务 schema、fixture、写入器、grant、银行政策、KPI、真实集成或模型运行服务。已有 E / F 内容不被本次扩展为未经实现的业务能力。

## 图与视觉

Archify 本机 v2.17；保留四个原父图，使用 `__MATCH` 派生身份。12个三语 typed specs，通过实际 validate / deliver。Canonical HTML 保持交付内容；嵌入 SVG 的黑蓝白字体/颜色为出版层样式，不声称是原生 Archify 材质。三种执行选择使用固定几何的焦点版本，语义内容仍由可访问 HTML 承担。缺图不影响动作、来源和返回。

初版 Execution Choice 原生图高度超出视口，已通过比例/布局修正，未用 overflow 隐藏内容。原失败与修正后检查分开保留。原生图自动浏览器检查、确定性结构检查、人工视觉抽查是三类不同证据。

主界面保持黑/蓝/白，代码和编号为次级信息。没有紫罗兰/薄荷青。现有玻璃是背景模糊与渐变高光模拟，并非真实光学折射。

## 实际验证状态

| 验证 | 实际结果 | 证据 |
|---|---|---|
| 全部 Node 单元/合同回归 | **299 passed / 0 failed** | `prototype/qa/operating-model/regression/unit-results.json`、`.tap` |
| D4 宿主浏览器检查 | **23 passed / 0 failed** | `host/*.results.json`；含真实 C/B 动作、最新角色、失败保存、原生打印暂停 |
| 既有主线浏览器回归 | **94 passed / 0 failed / 1 not-run** | `regression/`：A21、B13、C18、D13、D3A29；未执行项为 Safari/Firefox/原生200%缩放/辅助技术认证 |
| OM-01–30 合同清单 | **29 PASS / 0 FAIL / 1 NOT_RUN** | `00_governance/operating-model/acceptance.md`、`prototype/qa/operating-model/acceptance.json` |
| 三语场景 + 三语 Skill + 独立英文包打印 | **7/7通过**，共131物理页 | `print/print.results.json`、`pdf-results.json`；场景25/25/22页、SK06各7页、完整英文说明包38页 |
| 打印视觉检查 | **21张首/中/末页样本通过** | `print/sample-manifest.json`、`print/visual-final.json`；不是声称逐张目视全部131页 |
| Archify 原生浏览器校验 | **12/12通过** | `diagrams/visual-summary.json`排除旧choice失败项，合并`visual-summary-execution-choice.json`修正记录 |
| 业务引擎 / 原父图 | **5个引擎、4个父图未变** | `acceptance.json`、`final-snapshot.json` |

独立任务审查发现的角色恢复、所见/所打印能力不一致、未编制能力误标样例、旧引用提示未清除均已修复并复核。最终集成审查另发现原生浏览器打印返回后可能继续播放；实际 Chrome 复现后补暂停，RED/GREEN证据保留。两轮独立审查无未关闭发现，仅可据此进入本次试点评审，不代表生产就绪。

PDF 技能要求的物理页检查促成了专用打印投影、共享内容去重和页边距页眉；每页定位/版本/合成标签/图例已实际提取验证。解析器记录285条缺少 FontBBox descriptor 的警告；没有页外文字或空白页失败，选定渲染样本可读。没有把解析警告隐瞒为“零警告”。

本轮命令、源码范围与最终汇总位于 `prototype/qa/operating-model/final-snapshot.json`。实施前78文件快照中只有4个批准宿主文件发生变化，其余新增功能集中在新模块；工作树原有更改已保留，HEAD没有移动。

已执行但必须明确排除的能力：没有真实模型/Agent 试验、银行连接、授权验证或交易。OM-28 的 Living Case Lab / Shadow 运行时未实现，因此为 **NOT_RUN**；没有伪造 Shadow 结果。

## 待校准问题 / 后组接口

1. 由谁对当前命中作重大性判断、何时需要独立批准？来源中的职责重叠仍未解决，不能用分数填补。
2. 候选证据检索的允许来源、读权限、循环/成本/超时边界尚待业务与技术确认；当前没有可运行候选。
3. Person T 的代表权限与完整身份信息仍未建立；资料协调不扩展为签署、发出交易指令或代表实体的权限。
4. 局部筛查工作完成与全案 readiness / 其他未决条件保持分离；本次没有生产准入结论。
5. 图谱密度、六组顺序和能力命名请由 Christina / Xiaoming / Coco 在真实界面校准后，再决定其他场景的复用方式。

停止边界：停在 **OM-T06 Pilot review gate**。未自动执行 OM-T07/08，未展开其他14场景或下一 Discussion；没有 push、部署或发布远程服务。
