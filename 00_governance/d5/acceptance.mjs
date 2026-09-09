// Controller-owned, source-qualified acceptance: a passed component is not an untested full workflow.
import fs from 'node:fs';
const root='prototype/qa/d5/',catalogue=JSON.parse(fs.readFileSync('00_governance/d5/acceptance-catalogue.json'));
const map=new Map(),put=(ids,evidence,note)=>ids.split(' ').forEach(id=>map.set(id,{execution_status:'PASSED',evidence:evidence.split(' '),note}));
const host=['host-browser','navigation-extra','modules-proof','preview-proof','safe-request-proof','resume-proof'];
for(const f of host){const p=root+'host/'+f+'.results.json';if(!fs.existsSync(p))continue;for(const r of JSON.parse(fs.readFileSync(p)).results)for(const id of r.ids||[]){const old=map.get(id);map.set(id,{execution_status:r.status==='passed'?'PASSED':'FAILED',evidence:[...(old?.evidence||[]),p+'#'+r.name],note:'实际本机浏览器断言；仅限本切片和所列测试条件。'});}}
put('D5-01 D5-02 D5-03 D5-37 D5-44 D5-47',root+'om-regression/host/product-return.results.json '+root+'regression-runs.json','D4→Product、Current/Target、来源/播放/未实现任务的现有宿主回归已重跑；不改变业务会话。');
put('D5-07 D5-08 D5-09 D5-10 D5-11 D5-15 D5-18 D5-20 D5-23 D5-25 D5-26 D5-27',root+'regression/c-regression/browser-results.json '+root+'regression/unit-results.json','实际 C/B 纵向流程：未知出生日期、独立用途、权限/理由、身份补件、接收/评估、双击去重、未决/移交及原场景返回。');
put('D5-16 D5-17 D5-21 D5-22',root+'regression/b-regression/browser-results.json '+root+'regression/unit-results.json','现有 B 宿主和业务单元回归：请求审阅与派发分离、grant 重验和代上传来源保留。');
put('D5-24 D5-33',root+'regression/unit-results.json','C 引擎查询失败/适用性未知的边界单元回归；不代表真实供应商或 EDD 完整产品流程。');
put('D5-28 D5-29',root+'regression-runs.json '+root+'regression/unit-results.json','现有 D 专家线浏览器/单元回归：Credit 批准条件不等于履行；Legal 消费旧版输入可辨。');
put('D5-32','prototype/qa/d5/host/host-browser.results.json prototype/qa/d5/regression/unit-results.json','当前缺少已确认完整 manifest 时保持 unknown/not_ready；未模拟生产加载服务。');
put('D5-48','00_governance/d5/source-crosswalk.json','对照原始 D4 全量文件验证229动作、94工作、15场景；有映射不等于全部产品动作已实现。');
put('D5U-06 D5U-07 D5U-08 D5U-09 D5U-10 D5U-11 D5U-12 D5U-13 D5U-14 D5U-15 D5U-16 D5U-17 D5U-29 D5U-33 D5U-40',root+'regression/unit-results.json '+root+'final.json','共享纯投影/时间组件验证；包含独立5小时算术、未开始为null、当前/历史时钟、条件预计及episode；不是银行时限或真实客户承诺。');
put('D5U-27 D5U-30',root+'regression/unit-results.json '+root+'host/navigation-extra.results.json','当前权限过滤先于历史搜索；有效既有grant只见本人回执，撤销后不可见；无跨案身份时联系RM。');
const pending={
 'D5-12':'没有可注入任意 AI 摘要的 runtime；界面不自动生成正式判断理由，但未执行该对抗输入场景。',
 'D5-13':'旧输入引擎拒绝已有单元证据；本轮未完整执行该特定宿主过期版本+草稿保留组合。',
 'D5-30':'QA缺评估→定点回流完整可操作切片未在本组展开。',
 'D5-31':'QA remediation后重审/signoff完整runtime未在本组展开。',
 'D5-34':'最终准入授权工作台不在本 Person T pilot；不虚构权限。',
 'D5-35':'最终准入确认时scope变化的可操作工作流未展开。',
 'D5-36':'无发布服务/重试runtime；没有伪造成功或交易执行。',
 'D5-45':'Living Case Lab Shadow未接入本组。',
 'D5-46':'只读快照机制已有验证，但三类真实历史业务结果fixture缺失，未完整验证结果冲突场景。',
 'D5U-05':'当前输入版本和plan revision已投影；运行中动态增删步骤及专门变更原因链未全面实现。',
 'D5U-18':'D5 pilot使用共享adapter；所有旧Tasks/Condition/RM界面的统一改造属于后续扩展，未声称全站完成。',
 'D5U-24':'没有归属当前操作者的已完成Person T work fixture；不凭Unassigned任务伪造My completed work。',
 'D5U-32':'OPT-EMAIL模板为可选延期项；未制作或发送邮件。',
 'D5U-34':'OPT-EMAIL编辑草稿与refresh流程未实现。',
 'D5U-35':'OPT-EMAIL Copy未实现；无发送API或sent事件。'
};
for(const [id,note] of Object.entries(pending))map.set(id,{execution_status:'NOT_RUN',evidence:map.get(id)?.evidence||[],note});
for(const f of host){const p=root+'host/'+f+'.results.json';if(!fs.existsSync(p))throw Error('Missing required host proof '+p);for(const r of JSON.parse(fs.readFileSync(p)).results)if(r.status!=='passed')throw Error('Open host failure '+p+'#'+r.name);}
const regression=JSON.parse(fs.readFileSync(root+'regression-runs.json'));if(regression.results.length!==16||regression.results.some(x=>x.exit!==0))throw Error('Regression suite incomplete or failed');
const results=catalogue.map(x=>({...x,...(map.get(x.id)||{execution_status:'NOT_RUN',evidence:[],note:'尚无覆盖此完整预期的执行证据，不从邻近检查推断通过。'})}));
for(const x of results)for(const e of x.evidence)if(!fs.existsSync(e.split('#')[0]))throw Error('Missing evidence '+e);
const counts=results.reduce((a,x)=>(a[x.execution_status]=(a[x.execution_status]||0)+1,a),{});
fs.writeFileSync('00_governance/d5/acceptance-results.json',JSON.stringify({at:new Date().toISOString(),scope:'D5U-T00–T06 Person T pilot, not full D5 rollout',counts,results},null,2));
fs.writeFileSync('00_governance/d5/acceptance-results.md',`# D5 acceptance ledger\n\n${JSON.stringify(counts)}. PASSED is bounded by each row's stated evidence; NOT_RUN includes partial implementation or unavailable fixtures. Source verification32checks was not counted as app testing.\n\n| ID | Status | Evidence / qualification |\n|---|---|---|\n`+results.map(x=>`| ${x.id} | ${x.execution_status} | ${x.note} ${x.evidence.map(e=>'`'+e+'`').join('; ')} |`).join('\n')+'\n');
console.log(counts);
