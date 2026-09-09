# D5 acceptance ledger

{"PASSED":72,"NOT_RUN":16}. PASSED is bounded by each row's stated evidence; NOT_RUN includes partial implementation or unavailable fixtures. Source verification32checks was not counted as app testing.

| ID | Status | Evidence / qualification |
|---|---|---|
| D5-01 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-02 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-03 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-04 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#pilot-core-current-finding`; `prototype/qa/d5/host/navigation-extra.results.json#reload-keeps-current-saved-task`; `prototype/qa/d5/host/preview-proof.results.json#direct-preview-fresh-explicit-entry`; `prototype/qa/d5/host/preview-proof.results.json#direct-preview-restores-live-without-write` |
| D5-05 | NOT_RUN | 尚无覆盖此完整预期的执行证据，不从邻近检查推断通过。  |
| D5-06 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/navigation-extra.results.json#keyboard-control-keeps-semantic-focus` |
| D5-07 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-08 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-09 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-10 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-11 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-12 | NOT_RUN | 没有可注入任意 AI 摘要的 runtime；界面不自动生成正式判断理由，但未执行该对抗输入场景。  |
| D5-13 | NOT_RUN | 旧输入引擎拒绝已有单元证据；本轮未完整执行该特定宿主过期版本+草稿保留组合。  |
| D5-14 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#history-dirty-stay-failed-save-discard` |
| D5-15 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-16 | PASSED | 现有 B 宿主和业务单元回归：请求审阅与派发分离、grant 重验和代上传来源保留。 `prototype/qa/d5/regression/b-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-17 | PASSED | 现有 B 宿主和业务单元回归：请求审阅与派发分离、grant 重验和代上传来源保留。 `prototype/qa/d5/regression/b-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-18 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-19 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/safe-request-proof.results.json#rm-request-entry-retains-safe-audience`; `prototype/qa/d5/host/safe-request-proof.results.json#client-request-entry-retains-safe-audience` |
| D5-20 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-21 | PASSED | 现有 B 宿主和业务单元回归：请求审阅与派发分离、grant 重验和代上传来源保留。 `prototype/qa/d5/regression/b-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-22 | PASSED | 现有 B 宿主和业务单元回归：请求审阅与派发分离、grant 重验和代上传来源保留。 `prototype/qa/d5/regression/b-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-23 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-24 | PASSED | C 引擎查询失败/适用性未知的边界单元回归；不代表真实供应商或 EDD 完整产品流程。 `prototype/qa/d5/regression/unit-results.json` |
| D5-25 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-26 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-27 | PASSED | 实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。 `prototype/qa/d5/regression/c-regression/browser-results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-28 | PASSED | 现有 D 专家线浏览器/单元回归：Credit 批准条件不等于履行；Legal 消费旧版输入可辨。 `prototype/qa/d5/regression-runs.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-29 | PASSED | 现有 D 专家线浏览器/单元回归：Credit 批准条件不等于履行；Legal 消费旧版输入可辨。 `prototype/qa/d5/regression-runs.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-30 | NOT_RUN | QA缺评估→定点回流完整可操作切片未在本组展开。  |
| D5-31 | NOT_RUN | QA remediation后重审/signoff完整runtime未在本组展开。  |
| D5-32 | PASSED | 当前缺少已确认完整 manifest 时保持 unknown/not_ready；未模拟生产加载服务。 `prototype/qa/d5/host/host-browser.results.json`; `prototype/qa/d5/regression/unit-results.json` |
| D5-33 | PASSED | C 引擎查询失败/适用性未知的边界单元回归；不代表真实供应商或 EDD 完整产品流程。 `prototype/qa/d5/regression/unit-results.json` |
| D5-34 | NOT_RUN | 最终准入授权工作台不在本 Person T pilot；不虚构权限。  |
| D5-35 | NOT_RUN | 最终准入确认时scope变化的可操作工作流未展开。  |
| D5-36 | NOT_RUN | 无发布服务/重试runtime；没有伪造成功或交易执行。  |
| D5-37 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-38 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#history-dirty-stay-failed-save-discard` |
| D5-39 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#saved-review-history-language-roundtrip`; `prototype/qa/d5/host/host-browser.results.json#three-language-current-input`; `prototype/qa/d5/host/navigation-extra.results.json#step-and-language-preserve-open-reading-detail` |
| D5-40 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#safe-rm-client-projections`; `prototype/qa/d5/host/safe-request-proof.results.json#rm-request-entry-retains-safe-audience`; `prototype/qa/d5/host/safe-request-proof.results.json#client-request-entry-retains-safe-audience` |
| D5-41 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#safe-rm-client-projections`; `prototype/qa/d5/host/safe-request-proof.results.json#rm-request-entry-retains-safe-audience`; `prototype/qa/d5/host/safe-request-proof.results.json#client-request-entry-retains-safe-audience` |
| D5-42 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#narrow-touch-reduced-motion`; `prototype/qa/d5/host/navigation-extra.results.json#keyboard-control-keeps-semantic-focus` |
| D5-43 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#pilot-core-current-finding`; `prototype/qa/d5/host/modules-proof.results.json#static-dependency-missing-readable-fallback`; `prototype/qa/d5/host/preview-proof.results.json#direct-preview-fresh-explicit-entry` |
| D5-44 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-45 | NOT_RUN | Living Case Lab Shadow未接入本组。  |
| D5-46 | NOT_RUN | 只读快照机制已有验证，但三类真实历史业务结果fixture缺失，未完整验证结果冲突场景。  |
| D5-47 | PASSED | D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。 `prototype/qa/d5/om-regression/host/product-return.results.json`; `prototype/qa/d5/regression-runs.json` |
| D5-48 | PASSED | 对照原始 D4 全量文件验证229动作、94工作、15场景；有映射不等于全部产品动作已实现。 `00_governance/d5/source-crosswalk.json` |
| D5U-01 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#pilot-core-current-finding` |
| D5U-02 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#step-reading-does-not-execute`; `prototype/qa/d5/host/navigation-extra.results.json#step-and-language-preserve-open-reading-detail` |
| D5U-03 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#step-reading-does-not-execute` |
| D5U-04 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#step-reading-does-not-execute` |
| D5U-05 | NOT_RUN | 当前输入版本和plan revision已投影；运行中动态增删步骤及专门变更原因链未全面实现。  |
| D5U-06 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-07 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-08 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-09 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-10 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-11 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-12 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-13 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-14 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-15 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-16 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-17 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-18 | NOT_RUN | D5 pilot使用共享adapter；所有旧Tasks/Condition/RM界面的统一改造属于后续扩展，未声称全站完成。  |
| D5U-19 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#pilot-core-current-finding`; `prototype/qa/d5/host/modules-proof.results.json#layout-preview-cancel-move-collapse` |
| D5U-20 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#layout-save-reset-and-draft-isolation`; `prototype/qa/d5/host/modules-proof.results.json#layout-preview-cancel-move-collapse`; `prototype/qa/d5/host/modules-proof.results.json#layout-storage-error-keeps-task-input`; `prototype/qa/d5/host/modules-proof.results.json#layout-collapse-overrides-prior-reading-but-cancel-restores` |
| D5U-21 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#layout-save-reset-and-draft-isolation`; `prototype/qa/d5/host/navigation-extra.results.json#persona-preferences-and-dirty-input-do-not-cross` |
| D5U-22 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#safe-rm-client-projections` |
| D5U-23 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#layout-save-reset-and-draft-isolation`; `prototype/qa/d5/host/modules-proof.results.json#layout-preview-cancel-move-collapse` |
| D5U-24 | NOT_RUN | 没有归属当前操作者的已完成Person T work fixture；不凭Unassigned任务伪造My completed work。  |
| D5U-25 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/navigation-extra.results.json#readonly-record-and-zero-results`; `prototype/qa/d5/host/navigation-extra.results.json#unavailable-history-distinct-from-no-results` |
| D5U-26 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/navigation-extra.results.json#readonly-record-and-zero-results` |
| D5U-27 | PASSED | 当前权限过滤先于历史搜索；有效既有grant只见本人回执，撤销后不可见；无跨案身份时联系RM。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/host/navigation-extra.results.json` |
| D5U-28 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#history-dirty-stay-failed-save-discard`; `prototype/qa/d5/host/host-browser.results.json#saved-review-history-language-roundtrip`; `prototype/qa/d5/host/navigation-extra.results.json#persona-preferences-and-dirty-input-do-not-cross`; `prototype/qa/d5/host/navigation-extra.results.json#readonly-record-and-zero-results` |
| D5U-29 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-30 | PASSED | 当前权限过滤先于历史搜索；有效既有grant只见本人回执，撤销后不可见；无跨案身份时联系RM。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/host/navigation-extra.results.json` |
| D5U-31 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#safe-rm-client-projections`; `prototype/qa/d5/host/safe-request-proof.results.json#rm-request-entry-retains-safe-audience`; `prototype/qa/d5/host/safe-request-proof.results.json#client-request-entry-retains-safe-audience` |
| D5U-32 | NOT_RUN | OPT-EMAIL模板为可选延期项；未制作或发送邮件。  |
| D5U-33 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
| D5U-34 | NOT_RUN | OPT-EMAIL编辑草稿与refresh流程未实现。  |
| D5U-35 | NOT_RUN | OPT-EMAIL Copy未实现；无发送API或sent事件。  |
| D5U-36 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#layout-save-reset-and-draft-isolation` |
| D5U-37 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#step-reading-does-not-execute`; `prototype/qa/d5/host/host-browser.results.json#layout-save-reset-and-draft-isolation`; `prototype/qa/d5/host/host-browser.results.json#saved-review-history-language-roundtrip`; `prototype/qa/d5/host/navigation-extra.results.json#reload-keeps-current-saved-task`; `prototype/qa/d5/host/modules-proof.results.json#layout-preview-cancel-move-collapse`; `prototype/qa/d5/host/modules-proof.results.json#static-dependency-missing-readable-fallback`; `prototype/qa/d5/host/modules-proof.results.json#layout-collapse-overrides-prior-reading-but-cancel-restores`; `prototype/qa/d5/host/preview-proof.results.json#direct-preview-restores-live-without-write` |
| D5U-38 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#safe-rm-client-projections`; `prototype/qa/d5/host/safe-request-proof.results.json#rm-request-entry-retains-safe-audience`; `prototype/qa/d5/host/safe-request-proof.results.json#client-request-entry-retains-safe-audience` |
| D5U-39 | PASSED | 实际本机浏览器断言；仅限本切片和所列测试条件。 `prototype/qa/d5/host/host-browser.results.json#narrow-touch-reduced-motion`; `prototype/qa/d5/host/host-browser.results.json#three-language-current-input`; `prototype/qa/d5/host/navigation-extra.results.json#keyboard-control-keeps-semantic-focus`; `prototype/qa/d5/host/navigation-extra.results.json#step-and-language-preserve-open-reading-detail`; `prototype/qa/d5/host/modules-proof.results.json#layout-storage-error-keeps-task-input`; `prototype/qa/d5/host/modules-proof.results.json#static-dependency-missing-readable-fallback` |
| D5U-40 | PASSED | 共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。 `prototype/qa/d5/regression/unit-results.json`; `prototype/qa/d5/final.json` |
