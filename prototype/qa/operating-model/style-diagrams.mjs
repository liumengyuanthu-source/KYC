import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const {manifest}=JSON.parse(fs.readFileSync('prototype/qa/operating-model/diagrams/build-manifest.json'));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),results=[];
const css=`svg{font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif!important;background:white}.semantic-sigil{display:none}.c-mask{fill:white}.c-frontend{fill:#f7f9fc;stroke:#b1c0d2}.t-primary{fill:#122d49}.t-muted,.t-frontend{fill:#435970}.a-default{stroke:#7289a3}.c-bg{fill:white}`;
try{for(const asset of manifest){const svg=asset.output.replace('.archify.html','.svg'),canonical=svg.replace('.svg','.canonical.svg'),page=await browser.newPage({viewport:{width:1440,height:1100}}),raw=fs.readFileSync(svg,'utf8');fs.writeFileSync(canonical,raw);
 await page.setContent(raw);const output=await page.evaluate(({css})=>{
  const svg=document.querySelector('svg'),geometry=()=>[...svg.querySelectorAll('[data-node-id] rect,[data-edge-id] path')].map(x=>[x.tagName,...['x','y','width','height','d'].map(a=>x.getAttribute(a))]);const before=JSON.stringify(geometry());
  svg.setAttribute('data-theme','light');svg.removeAttribute('style');
  // Publication styling only: retain every authored node, label and relationship path.
  for(const rect of svg.querySelectorAll(':scope > rect')){rect.setAttribute('fill','white');}
  const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent=css;svg.append(style);
  for(const g of svg.querySelectorAll('[data-node-id]')){const r=g.querySelector('rect'),y=Number(r?.getAttribute('y')),h=Number(r?.getAttribute('height'));for(const [i,t]of [...g.querySelectorAll(':scope > text')].entries()){t.setAttribute('font-size',i?'15':'19');t.setAttribute('y',String(y+h/2+(i?21:-5)));}}
  for(const t of svg.querySelectorAll('[data-edge-id] text'))t.setAttribute('font-size','13');
  const overflow=[...svg.querySelectorAll('[data-node-id]')].flatMap(g=>{const rect=g.querySelector('rect').getBBox();return[...g.querySelectorAll(':scope > text')].filter(t=>{const b=t.getBBox();return b.x<rect.x+5||b.x+b.width>rect.x+rect.width-5||b.y<rect.y||b.y+b.height>rect.y+rect.height;}).map(t=>({node:g.getAttribute('data-node-id'),text:t.textContent}));});
  return {svg:svg.outerHTML,geometryPreserved:before===JSON.stringify(geometry()),overflow};
 },{css});
 assert.ok(output.geometryPreserved);assert.deepEqual(output.overflow,[]);fs.writeFileSync(svg,output.svg);await page.screenshot({path:`prototype/qa/operating-model/diagrams/${asset.id}.${asset.locale}.styled.png`,fullPage:true});results.push({id:asset.id,locale:asset.locale,geometry_preserved:true,text_bounds:'passed',canonical,styled:svg,sha256:crypto.createHash('sha256').update(output.svg).digest('hex')});await page.close();
}}finally{fs.writeFileSync('prototype/qa/operating-model/diagrams/publication-style.json',JSON.stringify({at:new Date().toISOString(),results},null,2));await browser.close();}console.log({checks:results.length,passed:results.length});
