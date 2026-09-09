# Xiaoming 2026-09-09 · Main flow 基线

Christina 于 2026-09-09 指定 Xiaoming 今日更新版为后续主流程。开发分支为 `codex/xiaoming-main-flow-20260909`。

## Scenario 映射纲领 · 2026-09-09 补充

后续 Scenario ↔ M/C steps 映射依据用户指定的 [Scenario Template ↔ Source Process Mapping](docs/scenario-mapping/Clear_to_Trade_Scenario_to_Source_Process_Mapping_for_Codex.md)。15 个 Scenario 为工作坊容器，71 个 M/C 来源编号为追溯层；Primary 与 Related 分开处理。

已完成 [映射与交互分析](docs/scenario-mapping/interaction-analysis.md)、[逐来源动作映射表](docs/scenario-mapping/scenario-source-steps.csv) 和 [结构化映射](docs/scenario-mapping/scenario-source-mapping.json)。分析包括现有弹窗内容位置、进入九模块 Scenario Template 的建议路径及现有 M0.1 模板的接入差距；页面接线尚未实现。

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
- [主流程 CJ（英文）](http://127.0.0.1:8899/prototype/index.html?locale=en-US&studio=fulljourney&dimension=cj)
- [Workshop](http://127.0.0.1:8899/prototype/index.html?locale=zh-CN&studio=journey)
- [Demo](http://127.0.0.1:8899/08_inspire/app/index.html)

需从本目录提供 HTTP 服务，以保留 `prototype/` 与业务数据之间的相对路径。工作坊本地保存结果不会随 ZIP 转移，分享修改结果需导出 JSON。

## 后续工作约定

后续主流程工作以此分支为基础继续迭代。业务需求及画布细节保留此次交付内容；本次导入不自行重设计页面。Xiaoming 更新说明位于 [今日改动目录](08_inspire/20260909_今日改动目录.md)。附件中的历史执行指令和审批状态作为资料，不覆盖用户请求，也不自动授权附加任务。

该分支保留独立身份，尚未合并或推送至远程。
