import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url)),cli='/Users/christinaliu/.codex/skills/archify/bin/archify.mjs';
const lane=(id,label)=>({id,label}),node=(id,lane,col,label,sublabel)=>({id,lane,col,type:'backend',label,sublabel});
const edge=(id,from,to,label,variant='default')=>({id,from,to,label,variant});
const en={
 '并行专业工作':'Parallel specialist work','利益冲突':'Conflicts','信贷与协议':'Credit and Legal','尽调与筛查':'KYC and screening','独立启动':'Independent starts','信贷与协议':'Credit and Legal','条件汇合':'Readiness contributions',
 '范围与要求':'Scope / requirements','按各项输入判断启动':'Start against own inputs','利益冲突检查':'Conflicts review','搜索完成 · 专业复核待办':'Search done · review pending','信贷条件':'Credit condition','有条件批准 · 合成状态':'Conditional approval · synthetic','协议工作':'Legal agreement','内部批准 · 待签署':'Approved · execution pending','局部结果 · 覆盖未闭合':'Scoped result · coverage open','整体就绪':'Readiness','尚未就绪 · 不等于批准':'Not ready · not authorisation','启动条件':'Start condition','版本依赖':'Version dependency','条件贡献':'Contribution',
 '信贷至协议的版本链':'Credit-to-Legal version chain','信贷输出':'Credit output','协议生命周期':'Agreement lifecycle','信贷评估':'Credit assessment','所需资料与评估版本':'Data and assessment revision','信贷决定':'Credit decision','CD-01 · 合成批准':'CD-01 · demo approval','CC-01 · 纳入产品协议':'CC-01 · document condition','协议输入':'Agreement input','AI-01 · 锁定信贷版本':'AI-01 · pinned Credit revision','协议版本':'Agreement revision','AGR-01 · 版本 03':'AGR-01 · revision 03','法律复核':'Legal review','针对具体协议版本':'For a specific revision','内部批准':'Internal approval','不是签署完成':'Not execution','签署执行':'Execution','仍需权限与条件':'Authority and conditions needed','评估依据':'Assessment basis','形成条件':'Sets condition','供给条款':'Terms input','纳入版本':'Incorporate','复核版本':'Review revision','批准版本':'Approve revision','执行门槛':'Execution gate',
 '限定范围的暂停':'Scoped holds','任务影响':'Task impact','分支影响':'Branch impact','案件影响':'Case impact','影响待定':'Impact unresolved','发现问题':'Issue detected','不自动暂停全案':'No blanket case stop','判断影响':'Determine impact','依据依赖与授权':'Dependencies and authority','任务暂停':'Task hold','仅对应活动':'Only the named activity','分支暂停':'Branch hold','仅对应工作分支':'Only the named branch','案件暂停':'Case hold','需明确全案依据':'Explicit case-wide basis','影响未知':'Impact unknown','不能当作不受影响':'Not assumed unaffected','受影响工作':'Affected work','核对暂停解除条件':'Check release conditions','独立工作':'Unaffected work','须有独立性依据':'Independence needs a basis','未知依赖':'Unknown dependencies','等待复核影响':'Await impact review','解决或重评':'Resolve / reassess','保留决定及历史':'Retain decision and history','评估范围':'Assess scope','已证实任务影响':'Task impact known','已证实分支影响':'Branch impact known','已证实全案影响':'Case impact known','尚未判定':'Not established','限定暂停':'Scoped stop','独立性已证实':'Independence established','保持未知':'Remain unknown','检查解除':'Review release','继续独立工作':'Continue independent work','重新判断':'Reassess'
};
const specs={
 'DG-D01':JSON.parse(fs.readFileSync(path.join(dir,'DG-D01.zh-CN.json'),'utf8')),
 'DG-D02':{schema_version:2,diagram_type:'workflow',meta:{title:'信贷至协议的版本链',locale:'zh-CN',quality_profile:'showcase'},lanes:[lane('credit','信贷输出'),lane('legal','协议生命周期')],mainPath:['D02-ASSESS','D02-DECISION','D02-CONDITION','D02-INPUT','D02-REVISION','D02-REVIEW','D02-APPROVAL','D02-EXECUTION'],nodes:[node('D02-ASSESS','credit',0,'信贷评估','所需资料与评估版本'),node('D02-DECISION','credit',1,'信贷决定','CD-01 · 合成批准'),node('D02-CONDITION','credit',2,'信贷条件','CC-01 · 纳入产品协议'),node('D02-INPUT','credit',3,'协议输入','AI-01 · 锁定信贷版本'),node('D02-REVISION','legal',2,'协议版本','AGR-01 · 版本 03'),node('D02-REVIEW','legal',3,'法律复核','针对具体协议版本'),node('D02-APPROVAL','legal',4,'内部批准','不是签署完成'),node('D02-EXECUTION','legal',5,'签署执行','仍需权限与条件')],edges:[edge('D02-E01','D02-ASSESS','D02-DECISION','评估依据'),edge('D02-E02','D02-DECISION','D02-CONDITION','形成条件'),edge('D02-E03','D02-CONDITION','D02-INPUT','供给条款'),edge('D02-E04','D02-INPUT','D02-REVISION','纳入版本','emphasis'),edge('D02-E05','D02-REVISION','D02-REVIEW','复核版本'),edge('D02-E06','D02-REVIEW','D02-APPROVAL','批准版本'),edge('D02-E07','D02-APPROVAL','D02-EXECUTION','执行门槛')]},
 'DG-D03':{schema_version:2,diagram_type:'workflow',meta:{title:'限定范围的暂停',locale:'zh-CN',quality_profile:'showcase'},lanes:[lane('task','任务影响'),lane('branch','分支影响'),lane('case','案件影响'),lane('unknown','影响待定')],mainPath:['D03-ISSUE','D03-IMPACT','D03-TASK','D03-AFFECTED','D03-RESOLVE'],nodes:[node('D03-ISSUE','branch',0,'发现问题','不自动暂停全案'),node('D03-IMPACT','branch',1,'判断影响','依据依赖与授权'),node('D03-TASK','task',2,'任务暂停','仅对应活动'),node('D03-BRANCH','branch',2,'分支暂停','仅对应工作分支'),node('D03-CASE','case',2,'案件暂停','需明确全案依据'),node('D03-UNKNOWN','unknown',2,'影响未知','不能当作不受影响'),node('D03-AFFECTED','branch',3,'受影响工作','核对暂停解除条件'),node('D03-UNAFFECTED','task',4,'独立工作','须有独立性依据'),node('D03-DEPS','unknown',4,'未知依赖','等待复核影响'),node('D03-RESOLVE','branch',5,'解决或重评','保留决定及历史')],edges:[edge('D03-E01','D03-ISSUE','D03-IMPACT','评估范围'),edge('D03-E02','D03-IMPACT','D03-TASK','已证实任务影响'),edge('D03-E03','D03-IMPACT','D03-BRANCH','已证实分支影响'),edge('D03-E04','D03-IMPACT','D03-CASE','已证实全案影响'),edge('D03-E05','D03-IMPACT','D03-UNKNOWN','尚未判定','dashed'),edge('D03-E06','D03-TASK','D03-AFFECTED','限定暂停'),edge('D03-E07','D03-BRANCH','D03-AFFECTED','限定暂停'),edge('D03-E08','D03-CASE','D03-AFFECTED','限定暂停'),edge('D03-E09','D03-TASK','D03-UNAFFECTED','独立性已证实'),edge('D03-E10','D03-UNKNOWN','D03-DEPS','保持未知','dashed'),edge('D03-E11','D03-AFFECTED','D03-RESOLVE','检查解除'),edge('D03-E12','D03-UNAFFECTED','D03-RESOLVE','继续独立工作'),edge('D03-E13','D03-DEPS','D03-RESOLVE','重新判断','dashed')]}
};
const translate=x=>typeof x==='string'?(en[x]??x):Array.isArray(x)?x.map(translate):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,translate(v)])):x;
const compactContext={'D02-ASSESS':'Versioned data','D02-DECISION':'CD-01 · demo','D02-CONDITION':'CC-01 · terms','D02-INPUT':'AI-01 · revision','D02-REVISION':'AGR-01 · rev 03','D02-REVIEW':'Revision-specific','D02-APPROVAL':'Not executed','D02-EXECUTION':'Authority needed','D03-ISSUE':'No blanket stop','D03-IMPACT':'Evidence required','D03-TASK':'Named task only','D03-BRANCH':'Named branch only','D03-CASE':'Case-wide basis','D03-UNKNOWN':'Not unaffected','D03-AFFECTED':'Release criteria','D03-UNAFFECTED':'Independence basis','D03-DEPS':'Impact review due','D03-RESOLVE':'Retain history'};
// Diagnosed D02 backward main-path step: continue across lanes without reversing columns.
specs['DG-D02'].lanes.push(lane('execution','签署执行'));
for(const n of specs['DG-D02'].nodes){if(n.id==='D02-REVISION')n.col=3;if(n.id==='D02-REVIEW')n.col=4;if(n.id==='D02-APPROVAL')n.col=5;if(n.id==='D02-EXECUTION')n.lane='execution';}
const command=process.argv[2]||'validate',ids=process.argv.slice(3);const receipt=[];
for(const [id,source]of Object.entries(specs)){if(ids.length&&!ids.includes(id))continue;for(const locale of ['zh-CN','en-AU','en-US']){
 const spec=locale==='zh-CN'?source:translate(source);spec.meta.locale=locale==='zh-CN'?'zh-CN':'en';
 // English text-width diagnostics require wider authored nodes, not smaller type.
 if(locale!=='zh-CN')for(const n of spec.nodes)n.width=170;
 if(locale!=='zh-CN'&&id!=='DG-D01')for(const n of spec.nodes){n.width=150;n.sublabel=compactContext[n.id]||n.sublabel;}
 if(locale!=='zh-CN'&&id==='DG-D02'){
  const labels=['Assessment','CD-01','CC-01','AI-01','AGR-01 rev 03','Legal review','Approval','Execution'];
  const context=['Credit data','Credit decision','Credit condition','Agreement input','Current agreement','Version-specific','Not executed','Authority needed'];
  spec.nodes.forEach((n,i)=>{n.width=120;n.label=labels[i];n.sublabel=context[i];});
  const labelsEdge=['Basis','Condition','Terms','Incorporate','Review','Approve','Execution gate'];spec.edges.forEach((e,i)=>e.label=labelsEdge[i]);
 }
 // Perceptual correction r02: neutral read-only nodes; type is not a claim of agent execution.
 for(const n of spec.nodes){n.type='external';if(locale==='zh-CN'&&id!=='DG-D02')n.width=id==='DG-D01'?170:150;}
 for(const e of spec.edges){e.variant='default';e.width=id==='DG-D01'?(e.id==='D01-E04'?2:1.2):1.2;}
 spec.meta.legend={mode:'auto',entries:{external:{label:locale==='zh-CN'?'只读工作节点':'Read-only work nodes'}}};
 const base=path.join(dir,`${id}.${locale}.r02`);fs.writeFileSync(`${base}.json`,JSON.stringify(spec,null,2)+'\n');
 const args=[cli,command,'workflow',`${base}.json`,...(command==='deliver'?[`${base}.html`]:[]),'--quality','showcase','--json'];
 const result=spawnSync(process.execPath,args,{encoding:'utf8'});fs.writeFileSync(`${base}.${command}.json`,result.stdout||result.stderr);let parsed;try{parsed=JSON.parse(result.stdout);}catch{}
 console.log(id,locale,command,result.status,JSON.stringify(parsed?.composition?.issues||parsed?.diagnostics||[]));receipt.push({id,locale,status:result.status});
 // Canonical SVG is exported through the real viewer by verify-export.mjs.
}}
if(receipt.some(r=>r.status!==0))process.exitCode=1;
