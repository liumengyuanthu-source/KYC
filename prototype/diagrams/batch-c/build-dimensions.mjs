// Host layout metadata only: never edits Archify's canonical exports.
import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('./',import.meta.url),assets=JSON.parse(readFileSync(new URL('active-manifest.json',root)));
const dimensions={};
for(const asset of assets){
 const svg=readFileSync(new URL(asset.svg,root),'utf8').split('>')[0];
 const width=Number(svg.match(/\bwidth="(\d+)"/)?.[1]),height=Number(svg.match(/\bheight="(\d+)"/)?.[1]);
 if(!(width>0&&height>0))throw Error('Canonical dimensions missing: '+asset.svg);
 dimensions[asset.svg]={width,height};
}
writeFileSync(new URL('dimensions.mjs',root),'// Generated from active canonical SVG root dimensions.\nexport default '+JSON.stringify(dimensions,null,2)+';\n');
console.log({canonical_assets:Object.keys(dimensions).length});
