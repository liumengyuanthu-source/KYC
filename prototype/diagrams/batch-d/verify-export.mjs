import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const dir=new URL('./',import.meta.url),browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),page=await browser.newPage({viewport:{width:1440,height:900}}),receipts=[],model={};
try{for(const id of ['DG-D01','DG-D02','DG-D03'])for(const locale of ['zh-CN','en-AU','en-US']){
 const name=`${id}.${locale}.r02`;await page.goto(new URL(name+'.html',dir).href);await page.locator('#btn-export').click();const pending=page.waitForEvent('download');await page.locator('#export-menu button[data-format="svg"]').click();const download=await pending;await download.saveAs(fileURLToPath(new URL(name+'.svg',dir)));
 const svg=fs.readFileSync(new URL(name+'.svg',dir),'utf8');if(await page.locator('html').getAttribute('data-last-export-canonical')!=='true'||/<script[\s>]/i.test(svg))throw Error('Not a canonical export');
 const spec=JSON.parse(fs.readFileSync(new URL(name+'.json',dir)));const [,width,height]=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)||[];if(!width||!height)throw Error('Missing dimensions');
 model[`${id}.${locale}`]={id,locale,asset:name,title:spec.meta.title,nodes:spec.nodes,edges:spec.edges,width:+width,height:+height};
 receipts.push({name,method:'Archify viewer Export → SVG',canonical:true,artifactSha256:createHash('sha256').update(fs.readFileSync(new URL(name+'.html',dir))).digest('hex'),svgSha256:createHash('sha256').update(svg).digest('hex')});
 console.log('Canonical export',name);
}fs.writeFileSync(new URL('canonical-export-receipts.json',dir),JSON.stringify(receipts,null,2)+'\n');fs.writeFileSync(new URL('model.mjs',dir),'// Generated from delivered Archify specs; no business state.\nexport default '+JSON.stringify(model,null,2)+';\n');}finally{await browser.close();}
