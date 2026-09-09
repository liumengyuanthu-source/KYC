import data from './references/registry.mjs';
import {designReferences} from './references/design.mjs';
import {projectReferences} from './references/project.mjs';
export const registry=data;
const dNodes=['D01-SCOPE','D01-CONFLICTS','D01-CREDIT','D01-LEGAL','D01-KYC','D01-READY','D02-ASSESS','D02-DECISION','D02-CONDITION','D02-INPUT','D02-REVISION','D02-REVIEW','D02-APPROVAL','D02-EXECUTION','D03-ISSUE','D03-IMPACT','D03-TASK','D03-BRANCH','D03-CASE','D03-UNKNOWN','D03-AFFECTED','D03-UNAFFECTED','D03-DEPS','D03-RESOLVE'];
const projectCards=projectReferences.map(x=>x.source.source_id!=='SRC-007'?x:{...x,
 source:{...x.source,title:'Process context: screening and parallel specialist work',title_zh:'流程背景：筛查与并行专业工作'},
 observation:{...x.observation,supported_statement:'源流程包含 M1→M7、Credit C2 和 Legal C1 并行工作；D 图节点为已批准演示推导，不是银行规则逐字重现。',supported_statement_en:'The source process includes M1→M7, Credit C2 and Legal C1 parallel work. Batch D graph nodes are approved demo interpretations, not verbatim bank rules.'},
 binding:{...x.binding,scenario_refs:[...x.binding.scenario_refs,'SCN-CONFLICTS','SCN-CREDIT','SCN-LEGAL'],semantic_node_refs:[...x.binding.semantic_node_refs,...dNodes.filter(n=>!n.startsWith('D03'))]}});
export function selectReferences({scene=null,node=null,kind=null,query='',selected=null}={}){
 const q=query.trim().toLowerCase();
 return [...registry.bindings.map(binding=>({binding,source:registry.sources.find(s=>s.source_id===binding.source_ref),observation:registry.observations.find(o=>o.observation_id===binding.observation_ref),interpretation:registry.interpretations.find(i=>i.interpretation_id===binding.interpretation_ref)})),...designReferences,...projectCards].filter(x=>(!scene||x.binding.scenario_refs.includes(scene))&&(!node||x.binding.semantic_node_refs.includes(node))&&(!kind||x.source.source_kind===kind)&&(!selected||x.observation.observation_id===selected)&&(!q||JSON.stringify(x).toLowerCase().includes(q)));
}
export function referenceProjection({role='Studio',...filters}={}){return role==='Studio'?selectReferences(filters):[];}
