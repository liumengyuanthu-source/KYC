import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {diagramAssets} from '../../reconstruction/diagram-manifest.mjs';
import {nodes} from '../../reconstruction/registry.mjs';
const results=[];
for(const asset of diagramAssets){
 const specPath='prototype/'+asset.html.replace(/\.html$/,'.architecture.json');
 const spec=JSON.parse(fs.readFileSync(specPath));
 assert.equal(spec.meta.animation,'none');assert.equal(asset.businessStateWritable,false);
 for(const ref of asset.nodeRefs){const node=nodes.find(n=>n.node_id===ref.nodeId);assert.ok(node);assert.equal(spec.components.find(c=>c.id===ref.graphNodeId)?.label,node.label_i18n[asset.locale]);}
 for(const kind of ['html','svg']){const path='prototype/'+asset[kind],bytes=fs.readFileSync(path);results.push({path,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),status:'passed'});}
}
fs.writeFileSync('prototype/qa/d3a/asset-integrity.json',JSON.stringify({at:new Date().toISOString(),results},null,2));console.log({assets:results.length,status:'passed'});
