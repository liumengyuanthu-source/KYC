# D5 Product Experience — Person T pilot

状态：Person T pilot 可供 review；实现、独立验证与最终复审通过，停在 D5U-T06 审查门。仅 D5U-T00–T06；不是全部 D5 产品铺开。保留16条 NOT_RUN／待扩展项，不自动执行 T07。

## 本地主线入口

[打开中文 Product 预览](http://127.0.0.1:8765/prototype/index.html?workspace=screening&locale=zh-CN)

已有有效 C 会话时恢复当前 Person T 任务，不重置案件。全新会话显示明确的合成示例入口；按界面进入示例后，先在“筛查群体”准备并请求初步查询、接收模拟结果，再选择“复核”。不会为了打开预览而静默写入 QA fixture。可以使用语言菜单切换 en-AU／en-US。

本机服务仅监听 localhost；未 push、发布或连接银行、邮件、模型服务。本目录是内部合成 workshop 原型，角色切换不等于生产认证，不能把完整源码包当作客户隔离部署包。

## 可 review 的增量

- 任务优先布局：依据对照与人工处理表单并排；当前问题、下一步和局部结果在同一工作台。
- 五阶段锚点、六组 MATCH 步骤、并行专业条件；选择步骤只是阅读，不推进案件。未知完整性不显示“全部完成”。
- 实际事件时间与独立合成时间示例分开。驻留时长不是人工净工时；没有依据的预计保持未知，不编造 SLA、截止日或全案 ETA。
- 四个核心模块不可移除。可选模块支持增删、排序、折叠、预览、保存、取消与恢复默认；偏好只保存模块 ID，并按操作者／角色／工作区隔离。
- Cases 的获准快照、过滤和只读返回；当前输入经 Save／Discard／Stay 处理，历史不覆盖活跃案件。
- RM／客户仅显示获准请求进度；邮件是关系沟通默认渠道，敏感资料继续使用受限贡献任务。
- 当前黑／蓝／白和暖灰玻璃层级保留；编号与来源放入次级信息或 disclosure。玻璃为 CSS 背景模糊及渐变高光模拟，不是真实光学折射。

## 来源、字段与业务边界

原始 D5 pack 的 32 项检查只证明文档结构，不计为应用通过。已对原始 D4 全量文件核对 **229 动作／94 工作／15 场景**，保留其 ID、字段和 PPT 来源关系。

新增的是 presentation projection、时间 adapter、布局偏好、只读历史与宿主上下文；不替换五个业务引擎，不创造银行授权。详细见：

- `00_governance/d5/T00-inventory.md`
- `00_governance/d5/source-crosswalk.json`
- `00_governance/d5/field-dependency-delta.md`
- `.superpowers/sdd/2026-09-08-d5-product-experience/task-1-report.md`

同一案件中，Entity A 申请 FX forward，B 仍为 reported parent，Person T 的任职与协调声称不自动构成业务 authority。既有经过明确选择的 B 局部合成配置不扩展到签约、交易、身份充分性或最终准入。Person T 出生信息仍不足，不能凭年份差异自动排除命中。

## 验证证据

实际执行结果：

| 检查层 | 结果 | 证据 |
|---|---|---|
| 主单元测试 | 320／320 passed | `prototype/qa/d5/regression/unit-results.json` |
| 独立状态／时间检查 | 9／9 passed | `prototype/qa/d5/final.json` |
| 新增宿主检查 | 23／23 passed | `prototype/qa/d5/host/*.results.json` |
| A–D／D3A／D4 旧回归 | 16／16 组 passed | `prototype/qa/d5/regression-runs.json` |
| 打印 | 5 视图、26 物理页通过文字范围／内容／权限检查 | `prototype/qa/d5/print/physical-results.json` |
| 原始验收目录 | 72 PASSED、0 FAILED、16 NOT_RUN | `00_governance/d5/acceptance-results.md`／`.json` |

验收数与自动化断言数不是同一口径。每个验收条目附实际范围与证据；部分通过仅覆盖共享组件或本切片，未声称整站／生产流程都已执行。NOT_RUN 包含部分实现或缺少 fixture，不以相邻通过项替代。

最终 PDF 为 `output/pdf/d5-product-review-proof.pdf`。检查所有26页的文字边界；人工目视复核11个首／中／末页样张，三语言和安全角色视图无可见裁切、叠字或乱码。没有声称逐页人工审阅26页。截图见 `prototype/qa/d5/print/review-zh-CN.screen.png` 与 `prototype/qa/d5/host/narrow-touch-reduced-motion.png`。

五个业务引擎、原导航模块和既有样式 token 文件经 SHA-256 对照保持不变；来源 hash／最终新模块 hash 见 `00_governance/d5/final-audit.json`。

独立任务审查的三个问题已修复并经两轮复审关闭：安全请求入口不再提升为 Ops；Resume 保留当前分支／证据上下文；接收、用途评估、恢复和后续资料失效的进度／时间描述与原生守卫保持一致。整组最终独立审查未发现新的 Critical／Important，发现一个 Minor 布局偏好优先级问题，已修复并补充实际预览／取消／保存／重置／操作者隔离检查；最终 addendum 见 `.superpowers/sdd/2026-09-08-d5-product-experience/final-review.md`。

最后的布局微调后重新运行全套单元及受影响的新宿主检查。16组旧业务／返回回归为该微调前末轮结果，微调不涉及业务引擎；打印投影／内容未改动。

测试中的修正也保留记录：静态图片降级最初误拦截同目录的 JavaScript 模型文件，改为仅拦图片资源；回归副本的旧CSS定位改为兼容新工作台；依赖fixture的测试改为等待其生成；最终一次 Escape 焦点检查抢在既有 requestAnimationFrame 恢复前断言，补等待同一语义焦点后两次通过。未放宽业务预期，首次失败收据仍保留。

回归收据统一放在 `prototype/qa/d5/`，保留此前 D2–D4 的原始结果。本轮曾发现并修复的缺陷及测试边界会在最终结论列明，历史 RED 证据不删除。

## 明确未完成／后组接口

1. 三类历史业务结果样例未填充：缺少已确认 scope、结束结果、归档事件及当前操作者归属 fixture。只保留显式空槽，不伪造已获准或已结案案例。
2. OPT-EMAIL 模板、编辑刷新和 Copy 为可选延期项；没有失效按钮、发送 API 或伪造 sent 事件。RM 安全进度与受限贡献路径仍须可用。
3. 动态步骤计划的完整版本变更、所有旧工作台的共享语义改造、十五场景全面铺开未执行。
4. QA remediation、最终确认／发布、Living Case Lab Shadow 及生产权限／连接未扩展。现有业务守卫继续保留。
5. 可供下一组复用：`productProgress`、`temporalProjection`、`statusAdapter`、布局 preference API、当前权限过滤的 history API，以及现有 C/B command／return 合同。扩展前需确认历史 fixture、任务归属、事件起算点、estimate 来源与对外许可。

## 执行裁定（Rulings）

- 在现有未提交工作区增量实现，保留源快照，不迁移或提交：保护当前用户改动；代价是后续隔离分支需显式搬运未提交内容。
- 按用户授权决定任务优先 UX，并保留既有视觉 token：不重开风格讨论；代价是 review 后可能需要局部排版调整。
- 保留本组 ledger 与精确 diff/review 包：未提交代码不能仅靠 git 追踪；代价是增加本地证据存储。

Huashu Design 的可读性要求影响了字号、输入区和触控路径；SDD／测试技能要求把实现、独立宿主验证、任务审查和最终审查分开。Archify 本机 v2.17 已检查，本组复用既有静态图与文字降级，没有重新生成流程图或宣称新增可执行流程。
