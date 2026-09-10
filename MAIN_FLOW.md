# Xiaoming 2026-09-09 · Main flow 基线

Christina 于 2026-09-09 指定 Xiaoming 今日更新版为后续主流程。开发分支为 `codex/xiaoming-main-flow-20260909`。

## Scenario 映射纲领 · 2026-09-09 补充

后续 Scenario ↔ M/C steps 映射依据用户指定的 [Scenario Template ↔ Source Process Mapping](docs/scenario-mapping/Clear_to_Trade_Scenario_to_Source_Process_Mapping_for_Codex.md)。15 个 Scenario 为工作坊容器，71 个 M/C 来源编号为追溯层；Primary 与 Related 分开处理。

已完成 [映射与交互分析](docs/scenario-mapping/interaction-analysis.md)、[逐来源动作映射表](docs/scenario-mapping/scenario-source-steps.csv) 和 [结构化映射](docs/scenario-mapping/scenario-source-mapping.json)。现已接入场景目录、弹窗 Primary / Related 来源及既有工作入口，门户视觉向用户提供的参考图靠齐。按用户最新要求，Scenario Template 暂不修改；S1 现按用户最新要求接入M0.1 Version 2 打样，新标签页打开 Summary（#6）；详见 [本轮实施与验证](docs/scenario-mapping/implementation-20260909.md)。

## 来源与范围

完整导入 `AU_Bank_update.zip` 的 `prototype/` 与 `08_inspire/`，保留原始文件内容和相对路径，恢复 ZIP 内中文文件名，仅排除 macOS 元数据。`prototype/studio-next/` 是新版 CJ / Hero case 的主要开发位置。

本分支从原仓库提交 `1e202f5` 建立。压缩包外的业务数据、资料和验证脚本继承自 `clear-to-trade-product/` 当前本地工作文件，供原型读取；这些文件并非 Xiaoming 本次交付。文件来源及 SHA-256 记录见 [导入清单](baseline/xiaoming-20260909-manifest.json)。原工作目录与分支保持原状。

## 本地运行

在本目录运行：

```sh
python3 -m http.server 8899 --bind 127.0.0.1
```

- [主流程 CJ（中文）](http://127.0.0.1:8899/prototype/index.html?locale=zh-CN&studio=fulljourney&dimension=cj)
- [Hero case（中文）](http://127.0.0.1:8899/prototype/index.html?locale=zh-CN&studio=fulljourney&dimension=hero)
- [Scoreboard（中文）](http://127.0.0.1:8899/prototype/index.html?locale=zh-CN&studio=fulljourney&dimension=scoreboard)
- [主流程 CJ（英文）](http://127.0.0.1:8899/prototype/index.html?locale=en-US&studio=fulljourney&dimension=cj)
- Scenario 映射：从 Journey Map 的场景弹窗查看 Primary / Related 来源。
- [Workshop](http://127.0.0.1:8899/prototype/index.html?locale=zh-CN&studio=journey)
- [Demo](http://127.0.0.1:8899/08_inspire/app/index.html)

需从本目录提供 HTTP 服务，以保留 `prototype/` 与业务数据之间的相对路径。工作坊本地保存结果不会随 ZIP 转移，分享修改结果需导出 JSON。

## 后续工作约定

后续主流程工作以此分支为基础继续迭代。业务需求及画布细节保留此次交付内容；本次导入不自行重设计页面。Xiaoming 更新说明位于 [今日改动目录](08_inspire/20260909_今日改动目录.md)。附件中的历史执行指令和审批状态作为资料，不覆盖用户请求，也不自动授权附加任务。

该分支保留独立身份，尚未合并或推送至远程。

2026-09-09 入口调整：按用户反馈移除 Scenario Studio 欢迎横幅和介绍卡片；首次进入与主导航返回均直接展示 Journey Map。旧 `mapview=scenarios` 链接首次加载也归一到地图；后续已按用户要求移除独立目录切换，来源映射通过地图节点弹窗查看。

## Demo UI · 2026-09-09

2026-09-10 按用户最新要求，`08_inspire/app/` 已由 `Kimi_Agent_8阶段图标未显示.zip` 中的完整 `app/` 替换，作为后续逐步调优的新基线。仅将主角 Annette 改为 Morgan，并在五个页面加入返回 Scenario Studio 的按钮。详见 [Kimi Demo 替换与验证](docs/demo-kimi-replacement-20260910.md)。此前的 [Demo UI 实施记录](docs/demo-ui-20260909.md) 保留为历史。

2026-09-09 导航精简：用户进一步要求去掉 Journey map / Scenario mapping 切换。地图上方改为视图 Tab；2026-09-10 在 Customer journey / Hero case 后加入 Scoreboard。评分沿用现有五维工作坊，直接覆盖同一组 15 个场景，并保留本地保存、排名、Bundle、Portfolio 与 Roadmap。嵌入 Studio 后，Scoreboard 语言跟随系统设置，不再显示重复的语言控件；界面使用与 Kimi Demo 一致的深蓝、亮黄、浅蓝、白色及衬线标题体系。

2026-09-10 场景编号：Customer journey 与 Hero case 的每个场景入口节点直接显示对应的 `S1–S15` 标签。同一节点关联多个场景时并列显示全部编号；选中节点的编号以黄色强调，编号与弹窗所用映射保持一致。

2026-09-10 Hero case 业务故事：Hero case 的 15 个场景弹窗增加独立的业务叙事，说明 Entity A、Entity B、Person T、Morgan 及相关团队在该场景中处理的具体问题、阻塞点与预期结果。故事随场景选择和系统语言同步切换；Customer journey 保留通用来源映射视图。

2026-09-10 Scoreboard 场景标识：评分卡、详情、组合、Portfolio 与 Roadmap 对外统一显示 `S1–S15`；内部继续使用稳定的 `SCN-*` 标识保存评分和工作坊状态。原 “Hero Case Anchor” 改为 “Hero case”，表示该场景属于 Entity A / Person T 主线故事，不参与评分加权；页面同时明确 15 个场景共同组成 Hero case。

2026-09-10 Customer Journey 场景索引：地图下方增加默认收起的 “Scenario list & source mapping”。展开后按 `S1–S15` 列出场景阶段、Primary 主干来源与 Related 输入/复用/交接来源；点击场景直接打开同一份场景映射详情。清单复用地图弹窗的数据源，并随 Studio 语言切换。

## GitHub 准备 · 2026-09-09

目标仓库为 `liumengyuanthu-source/KYC`。站点入口、发布文件清单、运行脚本及手动 GitHub Pages 工作流已准备；独立发布副本生成于 `.release/KYC/`。完整部署状态与步骤见 [部署说明](docs/DEPLOYMENT.md)。尚未上传或公开发布。
