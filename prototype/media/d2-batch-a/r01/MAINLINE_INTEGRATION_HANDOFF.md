# D2 Batch A r01 → 主线接入交接

2026-09-07。用户在「制作小工具演示Demo」任务中表示「如何把这个小样，介入到主线任务中？可以了小样」。记录为 **r01 小样方向获用户认可，可准备主线接入**；不冒充宿主集成已经通过、银行业务批准或其他评审人的签核。

## 接收任务与范围

主线任务：**分析 Australia Bank workshop prework**。

源目录：`/Users/christinaliu/Documents/ChatGPT/Australia Bank/experiments/d2-batch-a-media/`

主线目录：`/Users/christinaliu/Documents/ChatGPT/Australia Bank/clear-to-trade-product/`

接入两个固定版本：

| 样片 | 版本 | 主线场景 | 内容 |
|---|---|---|---|
| DMO-A01 | panel-first / r01 | SCN-SCOPE | Group A 展示名与 Entity A 拟交易主体区分 |
| DMO-A02 | panel-first / r01 | SCN-ENTITY | Person T 在 Entity B 的职位资料与 Entity A 特定用途权限区分 |

依赖：MED-A-PER-T、MED-A-PER-OPS 的 editorial/r01 图像；DG-SCOPE-A、DG-ENTITY-A、DG-ENABLE-A 的 Archify 源、导出与 typed contract。不选入旧 `ctt-motion-lab` 四样片；不扩做 DMO-A03、完整产品、视频或额外故事。

## 当前已核对的主线接缝

- `prototype/batch-a-ui.mjs`：`batchScene` 已覆盖 SCN-SCOPE / SCN-ENTITY；`scene()` 已有 `batch-story-frame`、`batch-media` 上一步/下一步/重看、静态图、focus context、实时会话内容与下游导航。当前媒体说明仍为“尚未收到媒体样片”。
- `prototype/diagrams/batch-a/media-manifest.json`：DMO-A01/02、人物资产为 `not_received` / `not_selected` 占位。
- 主线已有自己的 `batch-a-engine.mjs`、`case-engine.mjs`、导航与 sessionStorage。它们是业务状态所有者。主线目前还在并行开发，接收者应重新读实际源后实施，不套用行号补丁。

## 建议实施方式

1. 用独立播放器组件替换这两个场景的故事展示占位，保留主线导航、布局壳层、实时工作区与返回规则。沿用主线蓝色/玻璃样式，复用样片内部的用途/证据面板和局部 focus；不要把整套实验室导航嵌进主产品。
2. 将被选中的运行资源按固定版本复制/打包至主线媒体目录（建议 `prototype/media/d2-batch-a/r01/`），用相对地址加载。不要依赖本次临时 `localhost:4182` 服务，也不要让生产主线随意扫描 experiments。保持源 manifest 的 revision 与文件哈希可追踪。
3. 将 source/cue-manifest.json 与主线叙事游标映射。主线的 scene、beat、Current/Target、ui_locale、motion preference 是宿主输入。样片旧播放器没有现成宿主 API；其 intent 数组只是本地诊断。由接收者实现并实测适配层，不能声称已经存在 iframe/postMessage 协议。
4. `src/content.js` 仅是已批准快照的只读叙事投影，不是新业务 store。不可导入它去替换主线 case schema 或回写 Shared Case Spine。播放/Next/Replay/切语言仅改变媒体状态；预编制 EV-A04/RM 事件仅用于故事，不提交真实会话动作。
5. 初始静态、用户 Play 才播放；切 scene、进产品、关闭媒体或失焦时暂停。保存每场景媒体 beat/time；返回恢复同一位置并暂停，最新 locale 和真实会话状态优先。A02-C4 9.5 秒证据任务处保留显式停留，Next 才继续有限准备。
6. 关系图继续使用 Archify。主线已经有同 alias 的静态图，不可只凭 ID 静默覆盖：核对 typed 节点/边/来源/状态，选择已验证的主线图或本次原生导出，并记录版本与映射。正文与状态进入主线 locale 资源，不烘焙到图片。
7. 主线 manifest 更新为实际接收/用户选择的 r01，区分素材测试与宿主集成测试；只有完成本次接入与验证才标记宿主可用。保留 fallback，清除已不适用的“尚未收到”说明。未生成的 optional 资产仍为 null，不一并标通过。

## 不可改变的业务含义

- Group A 不是法人 key；Entity A 是唯一拟交易主体；Entity B 是 reported 关联母公司背景，不自动成为担保人或交易对手。
- Person T 的 Entity B 任职资料不建立代表 Entity A 的全部权限。Coordinate information 仍需证据，其他用途按既定独立状态显示；EV-A05 未收到，任务 owner 为 Unassigned。
- FX forward 是意图；Booking 未提供、Eligibility 未评估、总体 Not ready；无批准、发布、报价、交易或邮件发送。
- 有限要求草稿准备只在既定输入充分/无适用 hold 门槛下表达；未知不当作可继续。

## 接入后必须实际验证

- 从 SCN-SCOPE / SCN-ENTITY 直接看到可播放样片，资源在主线 origin 加载，没有 4182 依赖和 404。
- Play/Pause/Previous/Next/Replay、A02 停留和末尾不循环；关闭、跨场景、进产品后停止；返回保持 scene/beat/Current-Target/语言/定位。
- 中/澳英/美英与 reduced-motion、i-help、键盘可用；1440×900、1366 宽、移动端和放大重排无关键截断。
- 播放和重复/恶意意图不改变主线业务状态，已有保存/未保存/丢弃流程不回归。不要把先前独立样片 14/14 PASS 写成这次宿主测试 PASS。
- 禁用/阻断媒体时完整静态对象、用途、未知与 Not ready 仍可读；打印包含完整静态故事，不只是当前帧。
- 更新主线测试报告、manifest 和直接可打开的主线入口，附实际结果与限制。

## 已有交付与证据

- `asset-manifest.json`、`DMO-A01__panel-first__r01__manifest.json`、`DMO-A02__panel-first__r01__manifest.json`
- `source/cue-manifest.json`、`source/diagram-contract.json`、`source/diagrams/`、`source/images/`
- `src/`、`styles/`、`locales/`、`assets/personas/`、`assets/diagrams/`、`assets/posters/`、`print/`
- `TEST_REPORT.md`：独立样片内容测试 7/7、浏览器红队修复后 14/14；66 组内容比较；6 份真实 PDF；失败记录和边界均保留。
- `integration-selection.json`：本次用户认可记录与选中版本/哈希。它不修改原样片的历史 candidate manifest，不代表已接入主线。

本交接包已准备；此任务未修改主线，也未向正在运行的主线任务自动发送指令。
