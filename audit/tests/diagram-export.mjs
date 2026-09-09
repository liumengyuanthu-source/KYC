// Canonical viewer SVG export followed by an explicitly labelled monochrome host derivative.
import {chromium} from '../tooling/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
export async function exportDiagrams({root,names}) {
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const receipts=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
 for(const name of names){
  const html=new URL(name+'.html',root);
  await page.goto(html.href+'?openExport=1');
  const downloadWait=page.waitForEvent('download');
  await page.locator('[data-format="svg"]').click();
  const download=await downloadWait,svgFile=new URL(name+'.svg',root);
  await download.saveAs(fileURLToPath(svgFile));
  const original=readFileSync(svgFile,'utf8');
  assert.match(original,/<svg/);assert.doesNotMatch(original,/data-viewer-focus="true"/);
  // Geometry and labels are unchanged. Explicit host palette; not a new Archify validation claim.
  const theme='<style>svg[data-preset]{--text:#142030;--text-muted:#465466;--text-dim:#637084;--text-faint:#526073;--bg:#fff;--mask:#fff;--lane-fill:#f7f8fa;--lane-stroke:#c8ced7;--frontend-fill:#f2f4f7;--frontend-stroke:#53677f;--arrow:#64748b;--arrow-emphasis:#234d7b;--database-stroke:#53677f;font-family:Arial,"PingFang SC",sans-serif} .arrow-dashed{stroke:#53677f}</style>';
  const styled=original.replace('</svg>',theme+'</svg>');
  assert.equal((styled.match(/<text\b/g)||[]).length,(original.match(/<text\b/g)||[]).length);
  writeFileSync(new URL(name+'.host.svg',root),styled);
  writeFileSync(new URL(name+'.print.svg',root),styled);
  // Capture the HTML-embedded host presentation. Chrome's standalone SVG document
  // screenshot stalls; the same exported geometry renders normally inside HTML.
  await page.setContent('<!doctype html><html><body style="margin:0;background:white">'+styled+'</body></html>');
  assert.equal(await page.locator('rect.c-frontend').first().evaluate(node=>getComputedStyle(node).fill),'rgb(242, 244, 247)','Host node palette must remain neutral, not inherit mint/cyan viewer defaults');
  await page.screenshot({path:fileURLToPath(new URL(name+'.host.png',root)),fullPage:true});
  receipts.push({name,canonical_export:'SVG viewer download',html_sha256:createHash('sha256').update(readFileSync(html)).digest('hex'),svg_sha256:createHash('sha256').update(original).digest('hex'),host_derivative:'Neutral black/blue/white palette and sans-serif font; geometry/text unchanged',state_writes:false});
 }
}finally{await browser.close();}
writeFileSync(new URL('export-receipts.json',root),JSON.stringify(receipts,null,2)+'\n');
return {exports:receipts.length,status:'passed',receipts};
}
