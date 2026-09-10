// Mechanical print-only colour derivative. Canonical Archify SVGs stay untouched.
import {readFileSync,writeFileSync} from 'node:fs';
const gray=(r,g,b)=>Math.round(.2126*r+.7152*g+.0722*b);
for(const folder of ['', 'batch-a/'])for(const name of (folder?['DG-SCOPE-A','DG-ENTITY-A','DG-ENABLE-A']:['current','target','screening']))for(const locale of ['en-AU','en-US','zh-CN']){
 const file=new URL(`${folder}${name}.${locale}.svg`,import.meta.url);
 let svg=readFileSync(file,'utf8');
 svg=svg.replace(/#[0-9a-fA-F]{3,8}\b/g,color=>{
  let h=color.slice(1);if(![3,4,6,8].includes(h.length))return color;if(h.length<5)h=[...h].map(c=>c+c).join('');
  const v=gray(parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)).toString(16).padStart(2,'0');return '#'+v.repeat(3)+h.slice(6);
 }).replace(/rgba?\(\s*(\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)([^)]*)\)/g,(m,r,g,b,end)=>{const v=gray(+r,+g,+b);return `${m.startsWith('rgba')?'rgba':'rgb'}(${v},${v},${v}${end})`;});
 writeFileSync(new URL(`${folder}${name}.${locale}.print.svg`,import.meta.url),'<!-- Print-only monochrome derivative; source geometry and labels unchanged. -->\n'+svg);
}
