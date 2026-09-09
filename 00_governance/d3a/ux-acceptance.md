# D3A UX 验证矩阵 — PC-01 范围

本表区分本地原型验证与银行验证。`passed` 仅指下列已实现范围，不扩大为完整 D3A 或真实业务批准。尚无动态 3A 播放、字段级证据钻取或 Lab；不能用静态页面通过代替这些能力的验证。最终汇总以 `07_output/2026-09-07-d3a-pc01-review.md` 为准。

证据均位于 `prototype/qa/d3a/`：H=`host/host-browser.results.json`；N=`host/navigation-edge.results.json`；P=`host/product-return.results.json`；C=`host/chain-preview.results.json`；PR=`print/results.json`、`print/pdf-audit.json` 与 `host/print-reentry.results.json`；U=`unit-results.json`。

| 编号 | 状态 | 实际覆盖及限制 | 证据 |
|---|---|---|---|
| UX-01 | passed | 四个场景先显示业务语境；入口保持场景与来源引用 | H、C |
| UX-02 | passed | 正确分支、默认映射与同案检查点；BR-04 明确 Source/Validate 选择 | H、C |
| UX-03 | passed | 一对多的全部实际成员在可读 HTML 工作列表中标记；静态 SVG 不伪称动态高亮 | H、U |
| UX-04 | passed | PC-01 多对一成员完整；不生成全对全执行边。多对多未编制 | H、U |
| UX-05 | passed | 两个新增提案无直接 Current 前身，只展示原始上下文 | H、U |
| UX-06 | not-run | 划线 Target/未知执行者集中于后续链路；原始来源格式与未决问题已保留，未做该链路应用测试 | U、T00 |
| UX-07 | passed | 人工充分性控制可无痛点；不生成机会分数 | H |
| UX-08 | passed | 屏幕与完整分支打印保留 hypothesis；未提供独立业务导出/评分功能 | H、PR |
| UX-09 | passed | 无结果明确空态；清除筛选恢复同分支、同案 | H |
| UX-10 | passed | References、跨分支返回保留上下文；全局 References Escape 回归。3A 无播放状态可自动重启 | H、C |
| UX-11 | passed | 明示进入既有 Target 产品；返回 Current/Compare 不被替换 | P |
| UX-12 | passed | 实际保存 request 后返回，保留最新业务数据与语言，不加载旧快照 | P |
| UX-13 | passed | 真实超长输入触发保存失败；输入、错误、Stay/Discard 均保留正确语义 | P |
| UX-14 | passed | Back/Forward、嵌套分支返回；模式/选择不增加历史记录 | H、C |
| UX-15 | passed | 临时 References 优先关闭，外层 Escape 恢复 Journey 焦点和横向位置；全局 References 单独回归 | N、C |
| UX-16 | passed | zh-CN/en-AU/en-US 阅读及最新语言返回，语义选择保留 | H、P |
| UX-17 | passed | 语言切换不写业务状态；不是政策地区/授权配置器 | H、U |
| UX-18 | passed | 旧版本节点失效显示旧引用与版本提示，回同分支概览 | N |
| UX-19 | not-run | 字段中的证据/依赖专用钻取尚未实现。用途定向进入既有 evidence workspace 已验证，但不冒充本项 | P 仅邻接证据 |
| UX-20 | not-run | 点击/键盘替代与 Journey 横向恢复已测；3A 图为静态，无图内拖动；原生 200% 缩放、文本选择及触屏手势未完整验证 | H、N；A MH-20 |
| UX-21 | passed | 390px 三语言无页面/模态横向溢出，正文不缩小；截图已抽样打开 | H |
| UX-22 | passed | 中止静态图请求后映射/工作/返回仍可用；无假 Play、无编造视频资源 | H |
| UX-23 | passed | 三分支×三语言全量打印，含屏幕外成员、输入/输出/控制、来源与未知；全页边界检测与代表页目视审查 | PR |
| UX-24 | passed | RM/Client 内部作者内容不进入 DOM/原生打印；已配置的受限协作工作区仍可安全返回 | N、B 回归 |
| UX-25 | passed | Continue Story、映射/模式/聚焦/引用操作不改业务数据及协作上下文；3A 无业务播放写入 | H、N、C |
| UX-26 | passed | 四场景及打印使用相同 A/FX、reported parent B、B 雇员 T 与两项未决缺口；无隐藏 Target 输入 | H、PR、U |
| UX-27 | not-run | Controlled Inject/Lab 不在 T04 前范围，未启用 | 范围边界 |
| UX-28 | passed | 12 分支/94 原始变化一一归属；全局目录可读，来源与 15 项问题保留 | U、N、T00 |
| UX-29 | not-run | 3A QA/Readiness 播放未建；原 D 只读图回归不等价于本项通过 | 范围边界 |
| UX-30 | passed | Source candidate-claim editor 明确本版未包含；不跳无关 dashboard 或自动建系统 | H、U |

Safari、Firefox、原生浏览器缩放、屏幕阅读器、真实触屏、银行用户/权限验证：not-run。T04 人工设计校准：尚未发生。
