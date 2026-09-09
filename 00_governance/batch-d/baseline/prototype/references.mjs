import data from './references/registry.mjs';
import {designReferences} from './references/design.mjs';
import {projectReferences} from './references/project.mjs';
export const registry=data;
export function selectReferences({scene=null,node=null,kind=null,query='',selected=null}={}){
 const q=query.trim().toLowerCase();
 return [...registry.bindings.map(binding=>({binding,source:registry.sources.find(s=>s.source_id===binding.source_ref),observation:registry.observations.find(o=>o.observation_id===binding.observation_ref),interpretation:registry.interpretations.find(i=>i.interpretation_id===binding.interpretation_ref)})),...designReferences,...projectReferences].filter(x=>(!scene||x.binding.scenario_refs.includes(scene))&&(!node||x.binding.semantic_node_refs.includes(node))&&(!kind||x.source.source_kind===kind)&&(!selected||x.observation.observation_id===selected)&&(!q||JSON.stringify(x).toLowerCase().includes(q)));
}
export function referenceProjection({role='Studio',...filters}={}){return role==='Studio'?selectReferences(filters):[];}
