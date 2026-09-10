// Presentation bindings to existing, validated Archify assets. No graph creates case state.
const gap=[['requirements'],['request-items'],['grant'],['request-items'],['submission','intake'],['submission']];
const match=[['context',['M01','M02']],['evidence',['M03','M04']],['evidence',['M05']],['evidence',['M03','M04']],['decision',['M06','M07']],['decision',['M08','M09','M10']],['impact',['M11','M12']]];
const bindings=Object.fromEntries([
 ...gap.map((nodes,i)=>[`D3-GAP-0${i+1}`,{scene:'SCN-GAP',diagram:'client-collaboration',archifyNodes:nodes,semanticNodes:nodes,asset:'./diagrams/batch-b/client-collaboration.en-AU.svg'}]),
 ...match.map(([node,semanticNodes],i)=>[`D3-MATCH-0${i+1}`,{scene:'SCN-MATCH',diagram:'DG-C-MATCH',archifyNodes:i===5?[node,'referral']:[node],semanticNodes,asset:'./diagrams/batch-c/DG-C-MATCH.Target.en-AU.r02.svg'}])
]);
export function transformationBinding(id){return bindings[id]?structuredClone(bindings[id]):null;}
