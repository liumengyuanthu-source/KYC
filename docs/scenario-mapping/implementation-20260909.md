# Scenario mapping 实施记录

日期：2026-09-09。分支：`codex/xiaoming-main-flow-20260909`。

本轮依据用户指定纲领实施 map，并向两张 Clear-to-Trade Portal 截图的视觉方向靠齐。Scenario Template 暂缓，保留原文件与交互。

## 可查看的结果

- 主流程保留 CJ / Hero 旅程画布，增加 Journey map / Scenario mapping 切换。
- 场景目录展示 S1–S15，支持五个旅程阶段筛选与名称、M/C 编号搜索。
- 场景弹窗在流程图之前展示 Primary 与 Related，保留来源动作、关联原因、Current / Target 的页、泳道、shape 与 occurrence。
- 展开来源可进入同一场景已有的 D3 工作；Explore workflow 定位原流程。此入口不跳进 Scenario Template。
- S11 Credit 与 S12 Legal 按稳定 SCN ID 编号；S14 readiness 与 S15 confirmation / publication 分开呈现。
- 顶栏、蓝色欢迎区、浅蓝提示区、黄色主按钮、衬线标题和表格层级呼应参考图。手机宽度将目录改为卡片。

入口更新：`/prototype/index.html?locale=en-US&studio=fulljourney` 直接显示 Journey Map；通过 “Scenario mapping” 查看目录。用户后续要求去掉欢迎横幅和介绍卡片，现已移除，旧目录链接首次打开也先展示地图。

## 数据维护

纲领映射来自 `docs/scenario-mapping/scenario-source-mapping.json`；来源信息来自 `01_process/node_dictionary.csv`；既有工作追溯来自 `prototype/studio-next/parent-ledger.en.json`。

执行 `python3 scripts/build_scenario_mapping.py` 重新生成 `prototype/studio-next/scenario-source-data.mjs`。CJ、Hero 场景名称、目录和弹窗使用同一份映射。保留 15 个场景、71 个不同来源编号与 73 次 Primary 关联；Primary 清单不等同于串行执行顺序。

## 验证

- `node --test prototype/tests/*.test.mjs`：534 项通过，0 项失败。
- 新增六项映射测试，涵盖 Primary / Related、S11/S12、M0.1 多实例、编号搜索、就绪边界及来源对应的既有工作。
- 浏览器核对英文目录、中文弹窗、编号搜索、阶段筛选、S1/M0.1 来源实例、S12、S14/S15、关闭弹窗焦点及返回旅程。
- 390 px 宽度下核对弹窗与目录卡片，文档宽度为 390 px，无页面横向溢出。
- CJ / Hero 内嵌 SVG 与实施前完全一致；独立 Kimi Template 的 15 个文件哈希保持不变。
- 最后新增的“来源 → 既有工作”入口已通过自动检查；补做浏览器点击时电脑锁定，未完成这一条最后的人工式点击复核。

本轮未实施 Template 参数化、九模块内容、Template 进出路由或新的业务审批行为。原有场景打印页仍使用既有内容。
