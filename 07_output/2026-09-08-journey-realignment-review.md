# Journey 重构评审包

日期：2026-09-08。范围：本次已批准的 Journey / 角色场景重构；不是对全部 D2–D6、生产产品或银行政策的验收。

主线预览：<http://127.0.0.1:8765/prototype/?studio=journey>。此入口打开现有案件的 Journey，不加载新业务结果、不重置案件。仅本地预览，无 push 或远程发布。

## 本次结果

- 以 PPT 的 M0–M8、C1、C2 为过程轴，8 个角色分别阅读；M7 明示从 intake 并行启动，Legal / Credit 保留并行与 Credit → Legal 的交接。
- 30 个角色活动入口复用现有 15 个 SCN 场景，不创建 30 套互相隔离的业务状态。点击链路为角色活动 → 共享场景 → 已有产品任务。
- 活动页包含角色目标、Current 工作及痛点、Target 变化、所需输入、预期输出和交接。编号和完整来源放在次级文字／默认折叠的来源明细中。
- Journey 角色视角与 Product 演示操作角色分离。阅读 Client / QA / Credit 视角不会获得对应业务权限；进入产品前显示实际演示角色。
- Current／Target、语言、横向位置、键盘焦点和 Product 返回继续使用同一案件；现有 Save / Discard / Stay 保留。
- 完整打印不受当前角色或 viewport 限制，包含全部角色、两种流程和全部源痛点；另保留单活动打印入口。

## 来源与编号

依据 `Sanitised Process Map.pptx`：第 1 页 Current、第 2 页 Target、第 4–5 页痛点。场景归组与痛点到角色的联系是设计映射，不是银行实测或政策结论。

| 保留项 | 数量／处理 |
|---|---|
| Current 编号实例 | 67 个实例、66 个不同编号；M3.3 在 RM 与 Ops 两个泳道分别保留 |
| Target 编号实例 | 72 个；重复 M0.1 按来源页／泳道区别，不重编 |
| Client 非编号触点 | 14 个上下文锚点；不虚构 M 编号 |
| 痛点 | 第 4 页 9 类＋第 5 页 6 类，共 15 类 |
| 相邻生命周期 | 持续监控、退出与报告仅作相邻情境，不扩展为可执行业务 |

Target M1.1／Credit 删除线不代表自动删除、自动化或授权；C2.5 仅 “Obtain” 的删除线单独说明。C1.3 从起草改为审查草案；M5.9–M5.10 与 M7.5–M7.7 的人工活动保留。不是 PPT 每一个未编号形状都单独做成活动：空白格表示“本视图未映射直接活动”，不宣称原图没有任务。

同一合成背景不变：Entity A（澳大利亚）申请 FX forward；Entity B（新加坡）为 reported parent；Person T 任职于 B、声称为 A 协调材料，但具体 authority 尚未建立。

## File / delta map

| 文件 | 增量 |
|---|---|
| `prototype/journey/model.mjs` | 过程、角色、来源步骤、活动、痛点的只读双语目录 |
| `prototype/journey/ui.mjs`、`journey.css` | 角色矩阵、活动阅读页、来源披露与全量／单活动打印 |
| `prototype/navigation.mjs` | 独立角色视角、活动与过程定位、返回上下文 |
| `prototype/app.mjs`、`index.html`、`glass.mjs` | 主线接入、原有场景保留、玻璃按钮标签与交互兼容 |
| `03_personas_journey/source-aligned-crosswalk.md` | 来源、角色、场景及歧义说明 |
| `03_personas_journey/source_aligned_activity_crosswalk.csv` | 30 条活动的 Current / Target、输入输出、痛点与 SCN 明细 |
| `prototype/tests/journey-*.test.mjs`、`audit/tests/journey-*.mjs` | 模型、导航、真实浏览器及 PDF 内容验证 |

未修改业务 engines、已批准 SCN ID、银行权限配置、真实系统集成或原 PPT。保留原有 Archify／媒体路径；本轮没有重新生成全部图，也未宣称旧图的既存图形验收缺口已解决。

## 实际验证

| 验证 | 结果 | 证据 |
|---|---|---|
| 全量 Node 自动化 | 528 passed / 0 failed / 0 skipped | `audit/journey-source-realignment/native-results.json`；原始日志 `/tmp/journey-realignment-final-native.tap` |
| Journey 浏览器 | 20 passed / 0 failed；浏览器错误 0 | `audit/journey-source-realignment/browser-results.json` |
| 其中：活动 → 共享场景 | 30 / 30 路径实际遍历 | 同上，独立的一项遍历检查 |
| 系统／快捷键／单活动打印 | 5 passed / 0 failed | `audit/journey-source-realignment/native-print-results.json`；修复前 RED 独立保留 |
| 现有 QA / Readiness 主线 | 22 passed / 0 failed | `prototype/qa/batch-e/journey-realignment-final/receipt.json` |
| 中文完整 PDF 内容 | 372 passed / 0 failed | `audit/journey-source-realignment/pdf-content-results.json` |
| 中文 PDF 视觉 | 27 页均已查看；无空白／编号独占页，活动标题与 SCN 不再拆开 | `journey-all-roles.zh-CN.pdf`；`final-print-contact-1.png` 至 `final-print-contact-5.png`，均在上述审计目录 |
| 自动可访问性检查 | Journey 与活动弹窗各 0 条已确定违规 | `journey-accessibility.json`、`activity-accessibility.json`；仍有需人工判断项，不等于 WCAG 认证 |

浏览器覆盖：8 个角色入口不改变产品权限、Current / Target 与中英文切换、横移后关闭返回原位、焦点和 Enter / Escape、Current → Target Product → 原 Current、最新语言保留、全量打印、390px 移动端、真实触摸事件横移与点击、Save / Discard / Stay，以及预览入口不重置保存案件。阅读／媒体／播放不写业务状态；本轮与既有引擎测试联合验证该边界。

PDF 校验读取实际导出文档而非 DOM，核对所有角色、30 活动的标题／Current／Target／输入／输出／交接、15 痛点及全部来源标题。Chrome 字体的 4 个 CJK 部首映射经过显式归一化；实际字形另以渲染页检查。

截图：`after-journey.en-AU.png`、`after-client-scenario.zh-CN.png`、`after-mobile-scenario.png`、`after-mobile-journey.png`、`after-touch.png`，均位于 `audit/journey-source-realignment/`。

## 审查与边界

Task 1 与 Task 2 独立审查已通过。最终跨任务复核发现的系统打印范围缺口已修复，新增 5 项真实浏览器检查通过；最终局部复核确认无新增 Critical / Important 问题。本地 Journey 增量验收通过。

本轮未另外导出并逐页检查英文完整 PDF；未验证 Safari／Edge 等其他浏览器；原有未批准后续范围、真实银行权限与生产集成仍未实施。中文打印允许长活动自然跨页，痛点章介绍与卡片可跨页，属于后续排版微调，不影响内容完整性。

执行中使用分任务实现、测试先行与独立复核，另外用 PDF 检查流程发现并修正导出后的孤立编号和留白页；不是仅凭 DOM 或截图通过就宣布打印完成。
