# E → F 本机增量交付

状态：E 业务／交互与 F 本机整合已完成并通过独立修复复核；图形验收仍有明确未通过项，因此不是完整 D2／Workshop-ready 声明。

## 预览入口

- [E：QA 场景](http://127.0.0.1:8765/prototype/?scene=SCN-QA&locale=zh-CN)
- [F：Product Definition](http://127.0.0.1:8765/prototype/?studio=product-definition)

入口本身不改变业务状态。E 的合成延续须显式查看、确认，并归档之前的会话。已有浏览器会话可能保留先前演示状态；不会自动覆盖它。

## 本次交付范围

E 增加 QA 缺口→整改→复核→单独签核，以及整体 Readiness、配置的演示授权确认、独立发布及失败重试。单项任务完成不等于整体 Ready，Ready 不等于 Clear，发布不执行交易。来源缺失或版本失效应阻断当前适用性，历史记录保留。

F 作为现有 Studio 的次级内容汇总20个阅读节点、15个已有场景、8个对象领域、10组能力／需求假设与12组验证问题。它复用 A–E 的案件与状态，不建立第二套运行时真相，不增加优先级分数，也不自动加载业务结果。

## 字段与依赖增量

- E 字段／候选 schema／动作合同／合成快照：`04_operating_model/batch-e/`。
- E 保留 B 的 ownership-control Requirement，以 `SRC-020` 限定原始别名 REQ-B05→EUA-05→QA-04→GAP-QA-01→RT-01；数值相同的 DEP 不跨来源合并。
- F 派生 Shared Case Spine、字段／状态／依赖／导航索引：`04_operating_model/batch-f/`。源数据仍由原有对象集合及 E evaluator 管理。
- F 来源、引用、主线、验证结果索引：`00_governance/batch-f/`；CAP／CTT-REQ沿用现有注册表。

## 验证记录的读法

最终整组审查在既有412项测试通过后，发现尚未覆盖的 E 前置复核来源完整性与 F 依赖／hold身份边界。本轮已修复并补回归：新增事件与输出版本／指纹关联，校验配置的演示复核人、权限、案件和范围；缺失来源在保存草稿后仍保持 Not Ready，不能确认放行。F 不再把跨案件关系或无明确目标的 hold 当作不受影响。

- 全量原生测试：506／506 通过，失败／跳过0，退出码0。
- 浏览器：E 主流程22／22、历史返回6／6、F宿主7／7；错误数组为空。
- 实际打印：E中文10页、F中文18页／英文22页，合计50页逐页检查；未观察到裁切或重叠。F01末项与限制标题分页问题已修复。
- 独立复核：1项 Critical、2项运行时 Important、5项文案／打印问题全部关闭；仅既有图形 Important 未通过。当前31项源码／原文件副本、42个测试文件哈希均核对一致。

最终状态与可追溯结果：[acceptance-status-final.json](../00_governance/batch-f/acceptance-status-final.json)。详细测试：[最终验证目录](../00_governance/batch-f/final-fix-verification/verification-inventory.json)。打印审查：[final-fix-visual-print-review.md](../00_governance/batch-f/final-fix-visual-print-review.md)。先前 E acceptance 和 F native-final（406项）作为历史保留，不是最终代码结论。

E 现有动作未增加生产权限；合同描述了新增 `output_bindings`、`review_event_ref`、QA rereview引用／版本等来源字段。生成10个状态快照、275个字段条目、17类动作，候选 schema 仍不是生产规范。

## 旧会话注意事项

没有自动迁移或补写来源记录。旧 E 会话缺少新关联时，将保守显示 Not Ready／需要复核。若已有 pre-E archive，可在 E Product 选择 **Review pre-E archive → Restore reviewed pre-E session**，再显式查看并加载 reviewed D → E entry，重新走批准的演示动作；旧 E 会话仍归档保留。没有 archive 时按钮禁用，不伪造可恢复的历史。入口链接本身不重置案件。

## 已知限制（不能用测试通过替代）

- English DG-E03、双语 DG-F02 是明确标注的语义静态降级，未通过所请求的图形验收。Archify 的有界修复已达上限。
- DG-F01／F03 的静态导出和宿主验证通过；独立 canonical viewer 的垂直容纳检查失败。两者不是同一个验收层级。
- 完整 JSON Schema meta-validation 未运行；只完成候选结构和针对性检查。
- 既有 D5 UX-010 权限配置变体问题仍单独保留，不宣称本次解决。
- 40个登记外部引用中39个取得匹配的官方页面／标题，1个 PDF 检索结果不确定；不等于重新验证政策、原站可用性或媒体内容。
- 银行权限、政策、真实适用性和下游系统仍须业务验证。无新视频／音频资产，静态内容不阻塞主线。

本轮仅本机 E→F，不继续 D6，不提交、push、部署远程服务或连接银行系统。完整 D2／Workshop-ready 暂不成立。
