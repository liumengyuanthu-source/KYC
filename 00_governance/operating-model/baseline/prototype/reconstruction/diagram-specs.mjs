// Authoring-only: contains relations are a reading taxonomy, never execution.
export function taxonomySpec({branch,title,side,locale,nodes}){
 const zh=locale==='zh-CN',aliases=nodes.map(n=>({nodeId:n.node_id,graphNodeId:n.node_id.replaceAll('.','-')}));
 if(new Set(aliases.map(a=>a.graphNodeId)).size!==aliases.length)throw Error('Graph alias collision');
 if(!nodes.length)throw Error('A taxonomy projection needs source or explicit context nodes');
 const root=`ROOT-${branch}-${side}`,height=Math.max(620,nodes.length*125+100),gap=nodes.length>1?(height-232)/(nodes.length-1):0;
 return {aliases,spec:{schema_version:1,diagram_type:'architecture',meta:{title:`${title} · ${side==='current'?'Current':'To-be'}`,locale:zh?'zh-CN':'en',quality_profile:'showcase',animation:'none',viewBox:[1380,height],legend:{mode:'hidden'}},components:[{id:root,type:'external',label:title,sublabel:zh?'工作归组 · 非执行顺序':'Work grouping · not execution',pos:[60,height/2-44],size:[400,88]},...nodes.map((n,i)=>({id:aliases[i].graphNodeId,type:'external',label:n.label,pos:[850,nodes.length===1?height/2-46:70+i*gap],size:[500,92]}))],connections:nodes.map((n,i)=>({id:`CONTAINS-${branch}-${side}-${i+1}`,from:root,to:aliases[i].graphNodeId,label:zh?'包含工作':'Contains work',variant:'default'}))}};
}
