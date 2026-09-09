import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
const root=process.cwd(),src='04_operating_model/d4/diagrams',out='prototype/diagrams/operating-model',qa='prototype/qa/operating-model/diagrams';
for(const d of [src,out,qa])fs.mkdirSync(d,{recursive:true});
const definitions=[
 ['overview','D4_04_operating_architecture','Screening review · work and responsibility','筛查复核 · 工作与责任',[
 ['OM-MATCH-G1','Bind query context','绑定查询背景','Rule · same subject and source versions','规则 · 保持同一主体与来源版本'],
 ['OM-MATCH-G2','Compare identifiers','比较识别信息','Skill prepares · unknown stays unknown','能力准备对照 · 未知仍为未知'],
 ['OM-MATCH-G3','Resolve an evidence gap','组织补证','Conditional candidate · human access check','条件性候选 · 人确认访问范围'],
 ['OM-MATCH-G4','Prepare the review pack','准备复核包','Skill prepares · rule validates references','能力编制 · 规则校验引用'],
 ['OM-MATCH-G5','Human review','人工判断','Judgement and configured authority','专业判断与已配置权限'],
 ['OM-MATCH-G6','Record the local outcome','记录局部结果','Rule · other case conditions remain open','规则 · 其他案件条件仍未满足']],
 [['input context','输入背景'],['if evidence is needed','仅在需要补证时'],['authorised result','已有权结果']]],
 ['execution-choice','D4_01_agentic_suitability','Choose how this work runs','选择这项工作的执行方式',[
 ['access','Inputs and access','输入与访问范围','Check subject, source versions and permission','先核对主体、来源版本与权限'],
 ['unknown','Stop on an unknown','未知时停止','No score can supply a missing rule','评分不能补足未知规则'],
 ['judgement','Professional judgement?','需要专业判断？','Risk materiality or formal authority','重大性或正式权限'],
 ['human','Human + prepared evidence','人 + 已准备的证据','Hard gate · Skill only supports the person','人工硬门槛 · 能力仅支持人'],
 ['bounded','Fixed input and output','输入输出固定','A cited review pack is a bounded task','带引用的复核包是定界任务'],
 ['skill','Workflow + Semantic Skill','工作流 + 语义能力','Prepare context · do not authorise','准备语境 · 不作批准'],
 ['context','Paths change with feedback?','路径随反馈变化？','First compare a fixed source workflow','先比较固定来源工作流'],
 ['agent','Bounded Agent candidate','受限 Agent 候选','Permitted evidence plan only · not deployed','仅提出获准取证计划 · 未部署']],
 [['missing / unclear','缺失或不明'],['required','必须由人判断'],['bounded preparation','定界编制'],['only if necessary','仅在确有必要时']]],
 ['skills','D4_02_agent_matrix','Reusable skills · separate responsibilities','能力复用 · 责任仍然分开',[
 ['SK-03','Compare identifiers','比较识别信息','Claims + Record C01 + source versions','已选声明 + 合成记录 + 来源版本'],
 ['comparison','Cited attribute comparison','带出处的属性对照','Unknown date is not a date mismatch','缺出生日期不等于日期不同'],
 ['SK-06','Prepare a review pack','准备复核材料','Facts, unknowns, conflicts and allowed actions','事实、未知、矛盾与允许动作'],
 ['reviewer','Authorised reviewer','有权复核人员','Skill supports · person makes judgement','能力支持 · 人承担判断'],
 ['reuse','Reuse the family','复用能力家族','Use original action-to-skill references','沿用原动作与能力引用'],
 ['boundary','Keep each purpose separate','每项用途独立约束','Not a shared grant or professional standard','不是共享权限或相同专业标准']],
 [['produces','产出'],['supports','支持'],['constrained by','仍受约束']]],
 ['collaboration','D4_03_human_agent_collaboration','A prepared story · not an execution log','预编制故事 · 不是执行日志',[
 ['OM-F1','1 · Same finding and versions','1 · 同一命中与版本','Person T · original subject and query','Person T · 保持原主体与查询'],
 ['OM-F2','2 · Compare, preserve unknowns','2 · 对照并保留未知','Authored Skill sample · no identity decision','作者能力样例 · 不判断身份'],
 ['OM-F3','3 · Evidence gap — pause','3 · 资料缺口 — 暂停','Narration stops · no business hold created','讲解暂停 · 不创建业务限制'],
 ['OM-F4','4 · Human decision pack — pause','4 · 人的决策包 — 暂停','Next is not approval · permission still matters','下一步不是批准 · 权限仍须核对'],
 ['OM-F5','5 · Explicit later-example preview','5 · 显式预览后续示例','Authored continuation · not your decision','作者后续示例 · 不是你刚作的决定'],
 ['OM-F6','6 · Local outcome, open conditions','6 · 局部结果与未决条件','Ownership, coverage and Legal remain open','所有权、覆盖与法务仍有未决']],
 [['read context','阅读背景'],['review context','复核背景'],['authored only','仅为作者讲解']]]
];
const manifest=[];
for(const [view,parent,title,zh,items,labels]of definitions)for(const locale of ['en-AU','en-US','zh-CN']){
 const L=(en,cn)=>locale==='zh-CN'?cn:locale==='en-US'?en.replaceAll('authorised','authorized').replaceAll('Authorised','Authorized').replaceAll('authorise','authorize').replaceAll('judgement','judgment').replaceAll('Judgement','Judgment'):en;
 const height=items.length===8?800:640,width=items.length===8?1350:1080;
 const spec={schema_version:1,diagram_type:'architecture',meta:{title:L(title,zh),locale:locale==='zh-CN'?'zh-CN':'en',animation:'none',quality_profile:'showcase',viewBox:[width,height],legend:{mode:'hidden'}},components:items.map(([id,en,cn,sub,subzh],i)=>({id,type:'frontend',label:L(en,cn),sublabel:L(sub,subzh),pos:[i%2?width-415:60,95+Math.floor(i/2)*180],size:[355,96]})),connections:labels.map(([en,cn],i)=>({id:`relation-${i+1}`,from:items[i*2][0],to:items[i*2+1][0],label:L(en,cn)}))};
 const id=parent+'__MATCH',file=`${id}.${locale}`,input=`${src}/${file}.archify.json`,output=`${out}/${file}.archify.html`;
 // The first candidate has been checked; new locales and sibling projections are mechanical builds.
 fs.writeFileSync(input,JSON.stringify(spec,null,2)+'\n');
 for(const command of ['validate','deliver']){const args=['/Users/christinaliu/.codex/skills/archify/bin/archify.mjs',command,'architecture',input,...(command==='deliver'?[output]:[]),'--quality','showcase','--json'];const run=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:10e6});fs.writeFileSync(`${qa}/${file}.${command}.json`,run.stdout);if(run.status!==0){console.error({file,command,output:run.stdout,stderr:run.stderr});process.exit(run.status||1);}}
 manifest.push({view,id,parentId:parent,locale,input,output,src:`./diagrams/operating-model/${file}.svg`,nodeRefs:items.map(x=>x[0]),alt:L(title,zh),semantics:view==='overview'?'Selected input/output and responsibility relationships, not a compulsory six-stage execution order':view==='execution-choice'?'Checks are evaluated input/access first, human gates before simpler alternatives; rows are conditional judgments, not a running workflow':view==='skills'?'produces / supports / constrained-by are distinct; no new executes edge on human action':'Authored reading moments; separate pairs do not bypass information or human pause gates'});
}
fs.writeFileSync(`${qa}/build-manifest.json`,JSON.stringify({version:'Archify 2.17',at:new Date().toISOString(),manifest},null,2));console.log({diagrams:manifest.length,passed:manifest.length});
