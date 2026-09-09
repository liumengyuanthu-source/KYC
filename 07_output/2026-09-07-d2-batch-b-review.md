# D2 Batch B — Client Collaboration review

本次是已批准的 B-CH00–05 本地增量，不是全部 D2 完成。沿用黑 / 蓝 / 白界面与现有技术栈；没有整站重写、远程发布、push 或真实外发。

## 怎么体验

打开 http://127.0.0.1:8765/prototype/?locale=zh-CN 。

1. 在 SCN-GAP（剩余缺口）或 SCN-REQUIREMENTS / SCN-VALIDATE 中打开“客户协作”。
2. 如果当前演示未走完 Batch A，可明确选择“存档当前会话并载入 A3”。原状态和草稿会存档，不静默重置。
3. Ops：Requirements → Requests，输入合成请求摘要，审阅请求与收件人，再单独派发模拟通知。
4. Workshop 工具区切换 RM，记录联系摘要；切换 Client / Person T，先定位请求，再单独模拟认证。
5. T 只能看到自己的协调权限项目。可保存或直接提交合成响应；另一贡献者的项目仍未完成。
6. Ops / Evidence：模拟接收释放 → 关联证据 → 输入理由并记录用途评估。只闭合协调资料用途，不建立签约或交易权限。
7. 返回原 Current / Target 场景或 Journey；切换 zh-CN / en-AU / en-US；客户端“打印此视图”只输出获准项目与自身回执。

## 本组交付

- 同一 DEMO-CTT-001，共享案件而非第二个 Portal Case；复用 authority_gap 请求，两个分别分配的项目。
- RM / Client / Ops 三个受控视图，Workshop 身份模拟区与正常客户任务导航分开。
- 认证、联系人审阅、请求访问、业务代表权限四个独立判断；审批 / 派发 / 送达 / 接收 / 充分性状态分开。
- 11 个新增集合，扩展既有请求、要求、证据、用途评估、任务和审计对象。
- 字段字典及四个可重放快照，见 ../04_operating_model/batch-b/；这是范围受控的原型字段合同，不宣称完整生产 Schema。
- Archify 2.17 三语言 typed specs、独立 HTML 和 canonical 静态 SVG，位于 ../prototype/diagrams/batch-b/。Host 只嵌入静态图，不让 Viewer 播放写业务状态。
- 浏览器截图、受限打印证明与逐项 CH-01–28 结果。

## 验证与审查

最终结果：85/85 原型自动测试、13/13 浏览器检查、18/18 原有治理测试通过。CH-01–28：26 passed、0 failed、2 not-run。客户打印 PDF 为 1 页 A4，已检查实际渲染和文本隔离。字段字典现有 429 个字段条目、11 个新增集合、4 个可重放状态快照。

最终数字和代码哈希以 ../00_governance/batch-b/verification-results.json 为准。逐项结果见 red-team-results.json；可重跑的脚本是 verify.mjs 和 prototype/qa/collaboration-browser.mjs。

独立审查发现并要求修正：混合 Grant 读权限、换收件人时的重新授权依据、旧范围证据重用、幂等 key 冲突、直接提交使用旧草稿、改版请求误显示旧派发状态。最终修复与复核结论见 ../00_governance/batch-b/review-resolution.md。

CH-06 未运行：Email adapter 未启用。CH-25 未运行：Living Case Lab 未实现；不能把“未启用”报告成 Shadow State 测试通过。其余通过项仅代表合成环境内的测试，不代表银行政策、安全或生产集成认证。

## 来源、缺口与后组接口

Source / file / DEP 差异见 ../00_governance/batch-b/file-delta-map.md；业务问题和后组接口见 decisions-and-interfaces.md。

未收到引用的 Client Channels Research v0.1 和视频样片，已用静态图及真实本地表单动作作为 fallback。没有虚构 research 结论、银行权限、KPI、渠道成功或文件扫描结果。

Booking、Ownership/CDD 适用性、Legal、Credit、EDD、QA 和发布权限仍未解决。即使本组所有局部任务完成，Case 仍 Not ready。

Journey 与 Scenario 的整体结构关系仍是已记录的待完善项，本轮只把已有场景与这条连续协作链连接，不擅自重新设计全部主线。

## 范围提醒

所有身份、联系人、文件接收、权限与通知都是 local_simulation。整个合成案件仍在本地 Workshop 宿主状态中；受限 projection 验证的是客户端渲染边界，不是服务器安全控制。真实认证、持久化访问控制、扫描、通信和银行授权都未接入。

本轮使用 Archify 技能生成并校验业务协作图；执行与测试技能要求独立代码审查及修复后复测，因而交付包含针对边界缺陷的新增回归，不只正常流程截图。
