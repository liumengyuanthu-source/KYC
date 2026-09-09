import { chromium } from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const names = ['client-collaboration'].flatMap(k=>['en-AU','en-US','zh-CN'].map(l=>k+'.'+l));
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
const receipts=[];
try {
  for (const name of names) {
    await page.goto(pathToFileURL(path.join(dir,name+'.html')).href);
    await page.locator('#btn-export').click();
    const pending=page.waitForEvent('download');
    await page.locator('#export-menu button[data-format="svg"]').click();
    const download=await pending;
    await download.saveAs(path.join(dir,name+'.svg'));
    const svg=readFileSync(path.join(dir,name+'.svg'));
    const canonical=await page.locator('html').getAttribute('data-last-export-canonical');
    if(canonical!=='true' || /<script[\s>]/i.test(svg.toString())) throw new Error('Noncanonical export '+name);
    receipts.push({name,method:'Archify viewer Export → SVG',canonical:true,sourceSha256:createHash('sha256').update(readFileSync(path.join(dir,name+'.html'))).digest('hex'),svgSha256:createHash('sha256').update(svg).digest('hex'),bytes:svg.length});
  }
  writeFileSync(path.join(dir,'canonical-export-receipts.json'),JSON.stringify(receipts,null,2)+'\n');
  console.log(JSON.stringify(receipts,null,2));
} finally {await browser.close();}
