# D3 source / conflict / presentation reconciliation

Status: content-and-presentation pilot only; no E/F implementation or D2-complete claim.

## Source identity

Supplied pack refers to Sanitised Process Map(1).pptx. The repository file has another filename, but SHA-256 matches exactly: 9ce02c70bdacabc3209208d82bb92efdf01352b2122caa2ba8dca175226f1f11. This proves byte identity; D3 source visual-inspection statements remain supplied provenance, not a new PPT visual audit.

## 1. Source ambiguities

- **D3-ISS-01 · 两页相同设计原则** — Dynamic requirements、早并行、continuous structured state同一句在两页均出现。
  建议（未作业务迁移）：不能仅凭此字幕声称Current静态且串行。以具体活动与泳道变化分析；问作者该句是否误复用。 需确认：Account team / process-map owner。

- **D3-ISS-02 · Target重复M0.1与划线M1.1** — RM新的M0.1 initiation与Agentic M0.1 booking不同；M1.1仍可读但被划线。
  建议（未作业务迁移）：保留source-qualified occurrence ID；意图是发起入口重命名还是流程变化需确认，不能删除实际申请动作。 需确认：Process-map owner。

- **D3-ISS-03 · 发送要求与向客户索取** — M2.5在Ops；M3.3同时位于Ops组和RM独立框。
  建议（未作业务迁移）：区分内容责任、对外沟通与派发执行；RM-assisted设计已批准，但所有发送是否RM审批未被PPT证实。 需确认：Raunaq / KYC operations。

- **D3-ISS-04 · Target Credit删除线** — C2.1/.2/.6/.7划线；C2.5只Obtain划线；C2.3/.4仍正常。
  建议（未作业务迁移）：保留这些控制目的；源记录格式不改。D3给出待确认执行归属，不宣称银行已取消信用数据、approval或最终协议检查。 需确认：Credit SME / process-map owner。

- **D3-ISS-05 · Legal草稿来源** — Draft required agreements → Review drafted agreements。
  建议（未作业务迁移）：可证实Legal动作词改变，不能证实AI从零起草。保留draft_origin和模板/人/自动化来源待确认。 需确认：Legal / product owner。

- **D3-ISS-06 · Agentic泳道里的判断与记录** — 目标自动执行组包含judgment/sign-off词，同时存在专门human判断和批准。
  建议（未作业务迁移）：分开准备/执行/判断/批准/记录；演示的保守权限fixture是提案，不能说PPT已经完全确认。 需确认：Risk / QA / Control Room / clearance authority owner。

- **D3-ISS-07 · Credit required?与Legal关系** — 菱形在图上指向Legal轨道；文字Credit required不充分说明所有Legal适用性。
  建议（未作业务迁移）：Legal与Credit各自适用性保留；无Credit不自动等于无需Legal。五阶段也不替代真实依赖。 需确认：Legal / Credit / process-map owner。

- **D3-ISS-15 · 全部after不得挂同一笼统benchmark标签** — 很多参考是标准/指南或内部设计，不是银行已实施案例。
  建议（未作业务迁移）：每条变更有source locator、参考观察、adaptation及不可推断范围；无直接案例就写OUR，不硬找背书。 需确认：Christina / research owner。

## 2. Cross-document conflicts

- **D3-ISS-08 · F applicability四值与B/C三值冲突** — F把review_required放进applicability；B/C明确把review workflow分开。
  建议（未作业务迁移）：建议保留required/not_required/unknown；review_state另存。列为具体冲突，Codex先报告映射，不无声重写历史数据。 需确认：Christina / Codex schema reconciliation。

- **D3-ISS-09 · Credit condition approved≠fulfilled** — 已批准条件输入Legal，不等于其约束已落实。当前示例条件仅说纳入批准条件，缺具体payload可能循环。
  建议（未作业务迁移）：保留approval_status与fulfilment_status；有condition_spec_ref和clause/version核对才可fulfilled。没有payload时只是结构演示，不能声称商业条款已验证。 需确认：Christina / Credit-Legal reviewer。

- **D3-ISS-10 · E最终关状态缺前置事件** — E列Conflicts、coverage、Legal execution、QA关闭，但未把全部上游关键依据写清。
  建议（未作业务迁移）：增加closure manifest：ownership评估→群体→required runs/复用依据→finding outcome；EDD适用性；booking/产品资格；signer权限；适用Credit最终检查；holds。缺项保持Not Ready。 需确认：Christina / scenario fixture reviewer。

- **D3-ISS-11 · 缺评估记录不等于资料无效** — 材料存在但充分性尚未建立，可能缺assessment，而不是source false或evidence invalid。
  建议（未作业务迁移）：QA observation先写assessment_missing_or_unconfirmed，关联原Gap。只有实际证据评估支持才写insufficient。 需确认：QA / Ops reviewer。

- **D3-ISS-12 · 同一spine不等于所有视图任何时刻完全相同** — Story checkpoint、操作session和Lab changed分支各有context；有意inject后差异应当存在。
  建议（未作业务迁移）：相同(case,scope,session,variant,checkpoint)下要求一致；Shadow变化保留明确delta，不强行覆盖Mainline或删除差异。 需确认：Christina / Codex。

- **D3-ISS-13 · 三段状态是呈现而非合并所有事实** — NOT_READY/READY_FOR_AUTHORISATION/CLEARED可作为摘要，但不能一个字段同时承担计算、决定和发布。
  建议（未作业务迁移）：底层分别保存ReadinessSnapshot、ClearanceDecision、PublicationEvent；derived display有明确映射且绑定current input。 需确认：Christina / Codex。

- **D3-ISS-14 · QA与Readiness不得循环依赖** — QA核验condition，最终readiness又依赖QA；若QA也依赖最终ready会死锁。
  建议（未作业务迁移）：采用业务事实/要求→QA checks→QA signoff→readiness；readiness可持续显示pending但不作为QA完成前提。 需确认：QA / product model reviewer。

All15 proposals remain open review items. Keep current B/C applicability and D state guards. Missing assessment is not invalid evidence; Credit approval is not fulfilment. E/F are not present as complete implementations. Closure manifest is a design checklist only, never an automatic completing event.

## 3. Added presentation fields

- change_id (stable string): 保留D3记录ID，映射到既有scenario，不替换业务ID。
- scenario_id / comparison_checkpoint (refs): 同一场景同一业务时点；不是播放耗时。
- common_input_manifest (versioned refs): 共同主体/证据/查询数据/政策context。新获取信息必须有双方可比来源与事件，不能隐藏增益。
- current_source_refs / target_source_refs (source occurrence refs[]): PPT页+shape+occurrence；无直接源对应时为空并写明extension reason。
- current_actor / target_actor_in_map (role refs / source labels): 保留PPT分配；演示角色分配与正式问责分开。
- after_proposal (localised rich text): 按动作、字段、判断、输出编制，不写空泛AI enhanced。
- change_type (enum): Retained / Reassigned / Enhanced / Proposed addition，非风险/证据标签。
- benchmark_refs (refs[]): 只关联真正支持的机制；无参考允许空。
- benchmark_observation / design_interpretation (separate text): 事实与迁移推论分开；各有来源和边界。
- human_or_rule_boundary (object/action guard refs): 具体谁做什么、何时停止、什么条件恢复。缺权限不执行。
- field_deltas / event_refs (typed field + event refs): 沿用D2模型；不假设Current系统完全没有这些字段。
- control_invariants (assertions[]): 输入/控制目标/决策/数据可见性不因比较切换而松动。
- wait_resume_contract (work/condition/owner refs): 等什么字段、哪份结果、谁确认、恢复事件与返回对象。
- value_hypothesis / validation_question (text): 用户少做什么或更清楚什么；无测量不填百分比。
- diagram_node_refs / media_refs (asset refs[]): Actual Archify节点/图/媒体版本与场景绑定；缺素材静态可用。
- approval_status (typed metadata): proposal / approved_for_demo / bank_validated分别凭真实确认记录；此稿为detailed-review。

The 333 unique field paths in the94 change records are candidate design metadata, not newly implemented business fields. UI imports15 existing scenario mappings but initially exposes only GAP and MATCH details (D3 §9.5). Source IDs remain exact in low-emphasis detail; no schema keys or primary objects renamed.

## Verification boundary

Raw pack has15 scenes,94 changes,144 source occurrences,20 reference aliases and15 reconciliation issues. The supplied receipt explicitly says application_tests NOT_RUN and diagrams NONE. Fresh importer/host/visual results will be recorded separately.
