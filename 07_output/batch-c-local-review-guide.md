# Batch C 本地主线评审入口

服务已经在本机运行时，打开：

[Population / 中文](http://127.0.0.1:8765/prototype/?scene=SCN-POPULATION&locale=zh-CN)

[Match / English AU](http://127.0.0.1:8765/prototype/?scene=SCN-MATCH&locale=en-AU)

[EDD / 中文](http://127.0.0.1:8765/prototype/?scene=SCN-EDD&locale=zh-CN)

这些 URL 只定位场景，不创建业务结果，也不自动载入测试快照。现有会话继续保留。

## 建议的评审顺序

1. 在 Population 场景切换 Current / Target，聚焦 P03/P04，查看获准初筛与完整群体确认的区别。节点 R 打开同一个中央容器中的依据，来源不是案件证据。
2. 打开产品任务。已有 B 组案件可以明确选择继续；需要固定演示起点时，明确选择“归档当前会话并打开已批准的部分状态样例”。该选择保留会话档案，载入 B-coordination-assessed，再建立 C 的附加结构。
3. 填写理由，准备并发起 Person T 的指定初筛。主持人选择的合成结果不是外部服务调用。切换到复核，观察名字相似、1970/1971 年精度和未知身份信息。
4. 保存草稿、创建精确身份缺口，并通过已有 Collaboration 工作台完成本地请求审阅、模拟发出、Person T 模拟认证/提交、接收放行和证据关联。原 B 组两项请求及旧 grant 不扩权。
5. 只将新资料评估为不足或未知。模拟 Financial Crime 角色可以记录获准的未决结果；Ops 可以在允许时转交。角色选择不是银行认证，排除结论仍不可运行。
6. 返回原场景、切换语言、查看完整打印，再检查 EDD 独立未知及整体 Not ready。导航、播放讲解、引用、图片和打印均不能记录业务决定。

## 明确边界

- 同一合成案件；AU Entity A 申请 FX forward，SG Entity B 是 reported parent，Person T 任职 B。协调权限不推导身份充分性、签字或交易权限。
- 主线只启用当前批准的部分状态、未决/转交路线。完整群体确认、已支持的排除结论、完整 EDD 批准、Legal/Credit 完成及 Lab inject 均不因此获准。
- 默认 EDD 理由表为空，必须保持 unknown。媒体为只读静态等价物或真实 HTML；没有假视频、假 Play、真实供应商或银行集成。
- 当前本地 sessionStorage 是演示状态，不是认证/授权边界或生产审计系统。仅适合本机合成数据评审。
- 原 B 演示 grant 保留既定到期时间（2026-09-08 UTC），不会自动延长为银行规则。更晚的 workshop 演示需先确认合成时间/授权样例配置。

最终已执行结果与未执行项以同目录 `2026-09-07-d2-batch-c-review.md` 及 `prototype/qa/batch-c/red-team-results.json` 为准。不要以本文的操作顺序替代测试通过证明。
