const entries={overview:['D4_04_operating_architecture',['OM-MATCH-G1','OM-MATCH-G2','OM-MATCH-G3','OM-MATCH-G4','OM-MATCH-G5','OM-MATCH-G6'],'Work and responsibility','工作与责任'],'execution-choice':['D4_01_agentic_suitability',['access','unknown','judgement','human','bounded','skill','context','agent'],'Execution checks and alternatives','执行检查与替代方案'],skills:['D4_02_agent_matrix',['SK-03','comparison','SK-06','reviewer','reuse','boundary'],'Reusable skills and responsibilities','复用能力与责任'],collaboration:['D4_03_human_agent_collaboration',['OM-F1','OM-F2','OM-F3','OM-F4','OM-F5','OM-F6'],'Authored collaboration moments','预编制协作时刻']};
export function operatingDiagram(view,locale='en-AU',actionRef=null){
 const entry=entries[view];if(!entry)return null;const lang=['zh-CN','en-AU','en-US'].includes(locale)?locale:'en-AU';
 const focus=view==='execution-choice'?({'D4A-MATCH-04-01':'skill','D4A-MATCH-03-01':'agent','D4A-MATCH-05-02':'human'}[actionRef]||null):null;
 return{id:entry[0]+'__MATCH',parentId:entry[0],src:`./diagrams/operating-model/${entry[0]}__MATCH.${lang}${focus?'.'+focus:''}.svg`,alt:lang==='zh-CN'?entry[3]:entry[2],nodeRefs:[...entry[1]],focus};
}
