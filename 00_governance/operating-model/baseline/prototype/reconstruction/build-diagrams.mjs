// Authoring tool only. The generated manifest has no business-state dependency.
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {branches,comparisonFor} from './registry.mjs';
import {taxonomySpec} from './diagram-specs.mjs';
const archify='/Users/christinaliu/.codex/skills/archify/bin/archify.mjs';
const folder='prototype/reconstruction/diagrams',assets=[],receipts=[];
fs.mkdirSync(folder,{recursive:true});
for(const branch of branches.filter(b=>['BR-03','BR-04','BR-05'].includes(b.branch_id))){
 for(const locale of ['zh-CN','en-AU']){
  const projections=branch.scenario_refs.map(id=>comparisonFor(id,locale)).filter(Boolean);
  const members=[...new Map(projections.flatMap(p=>p.nodes).map(n=>[n.node_id,n])).values()];
  for(const side of ['current','target']){
   const sideNodes=members.filter(n=>n.side===side);
   const {spec,aliases}=taxonomySpec({branch:branch.branch_id,title:projections[0].branch.title,side,locale,nodes:sideNodes});
   const stem=`${branch.branch_id.toLowerCase()}-${side}-${locale}-r3`,json=`${folder}/${stem}.architecture.json`,html=`${folder}/${stem}.html`;
   // Keep already delivered specification bytes frozen on a resumed authoring run.
   if(fs.existsSync(html))Object.assign(spec,JSON.parse(fs.readFileSync(json,'utf8')));
   else fs.writeFileSync(json,JSON.stringify(spec,null,2)+'\n');
   let best=Infinity,stale=0;
   for(;;){
    const validation=spawnSync(process.execPath,[archify,'validate','architecture',json,'--quality','showcase','--json'],{encoding:'utf8'});
    receipts.push({stem,phase:'validate',exitCode:validation.status,receipt:validation.stdout,stderr:validation.stderr});
    fs.writeFileSync('prototype/qa/d3a/diagram-build.json',JSON.stringify(receipts,null,2));
    if(validation.status===0)break;
    const diagnostics=JSON.parse(validation.stdout).diagnostics??[];
    if(diagnostics.length<best){best=diagnostics.length;stale=0;}else stale++;
    const diagnostic=diagnostics.find(d=>d.code==='composition/label-route-clearance');
    if(fs.existsSync(html)||!diagnostic||stale>=2)throw Error(`Validation failed: ${stem}\n${validation.stdout}`);
    const index=diagnostic.subject.index;
    // Supported fix only on the diagnosed subject; preserve its meaningful label.
    spec.connections[index].labelAt=[755,spec.components[index+1].pos[1]+46];
    fs.writeFileSync(json,JSON.stringify(spec,null,2)+'\n');
   }
   const delivery=spawnSync(process.execPath,[archify,'deliver','architecture',json,html,'--quality','showcase','--json'],{encoding:'utf8'});
   receipts.push({stem,phase:'deliver',exitCode:delivery.status,receipt:delivery.stdout,stderr:delivery.stderr});
   fs.writeFileSync('prototype/qa/d3a/diagram-build.json',JSON.stringify(receipts,null,2));
   if(delivery.status!==0)throw Error(`Delivery failed: ${stem}\n${delivery.stdout}`);
   assets.push({branchId:branch.branch_id,side,locale,html:html.replace(/^prototype\//,''),svg:html.replace(/^prototype\//,'').replace(/\.html$/,'.svg'),nodeRefs:aliases,relationship:'contains',businessStateWritable:false});
  }
 }
}
fs.writeFileSync('prototype/reconstruction/diagram-manifest.mjs',`// Generated from frozen, Archify-validated taxonomy specs; static reading assets only.\nexport const diagramAssets=${JSON.stringify(assets,null,2)};\nexport function diagramFor(branchId,side,locale){return diagramAssets.find(a=>a.branchId===branchId&&a.side===side&&a.locale===(locale==='zh-CN'?'zh-CN':'en-AU'))??null;}\n`);
console.log({assets:assets.length,validationAndDeliveryChecks:receipts.length});
