import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd(),out=path.join(root,'00_governance/d3a/baseline');
if(fs.existsSync(out))throw new Error('Preserve existing D3A baseline; refusing overwrite');
const records=[];
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory()){if(!['qa','media','diagrams'].includes(ent.name))walk(p);}else if(/\.(mjs|css|html|json)$/.test(ent.name)){const rel=path.relative(root,p),bytes=fs.readFileSync(p),dest=path.join(out,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);records.push({path:rel,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}}}
walk(path.join(root,'prototype'));
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(records,null,2));
console.log(`Captured ${records.length} source files without modifying originals`);
