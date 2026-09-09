# Scope / Entity：panel-first/r01 主线接入

本次只接入已批准的 DMO-A01、DMO-A02；不展开其他 D2 场景、不改写整站、不 push、不发布远程服务。

## 主线预览

- [Scope · DMO-A01](http://127.0.0.1:8765/prototype/?scene=SCN-SCOPE&locale=zh-CN&focus=media)
- [Entity · DMO-A02](http://127.0.0.1:8765/prototype/?scene=SCN-ENTITY&locale=zh-CN&focus=media)
- [完整打印预览](http://127.0.0.1:8765/prototype/?mode=print&locale=zh-CN)

以上为本机主线入口，依赖原有 127.0.0.1:8765 静态服务器；不依赖小样的 4182 服务。`focus=media` 只定位讲解区，不改业务状态。语言选择支持 zh-CN / en-AU / en-US。

## 增量 / 边界

| 交付层 | 增量 |
| --- | --- |
| 素材 | 51 个来源文件按白名单复制到 `prototype/media/d2-batch-a/r01/`；5 个交接来源哈希与所有复制文件逐一验证。未编辑实验目录。 |
| 播放组件 | `batch-a-media.mjs` + CSS：Shadow DOM 隔离，复用冻结的 panel-first 视图、人物与 Archify SVG。默认暂停；Play、Previous、Next、Replay、键盘帮助、减少动态效果。 |
| 宿主 | `media-host.mjs`：窄接口，只接收媒体位置；独立会话键，不接收案件 store 或业务 dispatch。导航、隐藏/失焦与卸载停止播放，异步旧挂载被取消。 |
| 静态 / 打印 | `media-static.mjs` 与生成的故事文本：模块/媒体被阻断时仍有本地完整文本；打印包含 Scope 5 节点 + Entity 6 节点，不依赖当前帧。无 JavaScript 时提供 6 个本地静态页面入口。 |
| 原有主线 | 仅 Scope/Entity 媒体区与返回生命周期接线；既有 Product、Current/Target、dirty guard 和案件引擎保留。播放器不再重复吸顶，避免遮挡场景标题与语言选择。 |

同一 DEMO-CTT-001：Entity A / Australia / FX forward；Entity B / Singapore 为 reported parent；Person T 任职 B，A 的代表声明与具体用途权限独立。Group A 不是法人键；booking / eligibility 保持未知或未评估。播放 RM 澄清、EV-A04 到达、缺口或准备节点均不会提交对应业务事件。A02-C4 在 9.5 秒暂停，必须 Next 才到 13 秒的有限准备讲解；这不补证据、不授权、不发消息、不准入。

固定故事与实时记录分开：样片中的 EV-A05 “尚未取得”、Owner “尚未指派”为冻结叙事；若当前 Batch B 会话已有 EV-A05，实际会话区显示最新收件状态和用途评估，不能被故事快照覆盖。收到资料也不自动代表用途充分。

## 字段 / 依赖影响

- Shared Case Spine、字段 schema、业务事件、实体/场景/DEP 编号：**无新增或重编号**。
- 新增纯展示状态：`asset / revision / time / beat / holdPassed / playing`，存于 `ctt-media-panel-first-r01`。恢复时永不自动播放；原有 `navigation.batchBeats` 不被覆盖。
- Archify 同名图不是同一拓扑。保留原主线 workflow 图，媒体使用独立 r01 architecture 图，不互相覆盖。详见 [来源限定的图与状态映射](../00_governance/media-mainline/diagram-crosswalk.md)。
- 主线 media manifest 只提升两个已选人物资产与 DMO-A01/A02；DMO-A03、VID-A01 和未选静态资产保持原占位。来源历史测试不计入主线通过数。

## 验证证据

当前结果：最终代码重跑 100/100 Node 测试通过；21 项主线浏览器检查通过、0 失败、1 项环境验证未运行。另有 6 项专项检查通过：2 个直接预览入口、2 个组件打印可见性、2 个慢加载滚动竞态检查。组件独立复核、整体复核及最后的滚动修复限定范围复核均已通过，无未解决的集成发现。

- [宿主汇总](../00_governance/media-mainline/verification-results.json) / [完整单测输出](../00_governance/media-mainline/tests.tap)
- [逐项浏览器结果](../prototype/qa/media-mainline/browser-results.json) / [预览入口检查](../prototype/qa/media-mainline/preview-smoke.json) / [组件打印可见性](../prototype/qa/media-mainline/component-print-results.json)
- [慢加载滚动竞态](../prototype/qa/media-mainline/scroll-race-results.json)：当前挂载期间用户滚动保持 600→600；同场景旧挂载完成不覆盖新位置，120→120。第二项使用媒体插入点上方的稳定位置，隔离过期回调；不声称消除内容扩展时浏览器原生 scroll anchoring。
- [组件独立复核](../00_governance/media-mainline/component-review.md) / [整体独立复核](../00_governance/media-mainline/final-integration-review.md)
- [Scope 截图](../prototype/qa/media-mainline/preview.SCN-SCOPE.zh-CN.png) / [Entity 截图](../prototype/qa/media-mainline/preview.SCN-ENTITY.zh-CN.png)
- QA 打印样张：`prototype/qa/media-mainline/mainline-print.{zh-CN,en-AU,en-US}.pdf`，每份 15 页；全文提取确认所有 11 个 cue；新增故事页经渲染检查，关键状态与未解决条件完整可读。它们是测试证据，不是新增银行正式材料。

浏览器覆盖：Play/Pause/Previous/Next/Replay、9.5s hold、Current/Target 与三语言保位、Current→Target Product→原场景、Back to Journey、Continue Story、横向拖移后开关场景、Save/Discard/Stay、恶意/重复消息不写案件、受控模拟 blur / hidden 生命周期、帮助 Escape 与关闭、1440/1366/390/720 CSS-px 布局、播放器模块/所选媒体包/媒体图片与 SVG/播放器样式阻断、无 JS 静态入口、全量打印。

未运行：Safari、Firefox、原生浏览器 200% zoom、屏幕阅读器 / 完整辅助技术审核；720 CSS-px 只是 1440px 在 200% 下的布局等效检查，不冒充原生缩放测试。无生产权限、身份认证、真实文件安全扫描或系统集成认证。

## 后续接口 / 未决问题

SCN-ENTITY 仍通过主线控制进入 SCN-REQUIREMENTS，携带同案上下文；媒体不能自行跳转或完成下游任务。银行权限、booking、产品资格、收件/披露权限和最终准入发布仍沿用显式 demo config / 未决业务问题；本次没有新增银行政策假设。后续可改善 Journey 与场景的整体结构，但本次未扩展到该设计议题。
