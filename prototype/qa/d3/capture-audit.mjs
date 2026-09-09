import {chromium} from '/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const phase=process.argv[2]||'before',dir=`prototype/qa/d3/${phase}`;fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),records=[];
const targets=[['01-studio',null],['02-gap','SCN-GAP'],['03-match','SCN-MATCH'],['04-scope','SCN-SCOPE'],['05-condition','SCN-CONFLICTS'],['06-references','SCN-MATCH'],['07-client','SCN-GAP'],['08-mobile','SCN-GAP']];
try{for(const [name,scene]of targets){const context=await browser.newContext({viewport:{width:name.includes('mobile')?390:1440,height:1000}}),page=await context.newPage(),errors=[];page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 try{await page.goto('http://127.0.0.1:8765/prototype/'+(scene?`?scene=${scene}&locale=zh-CN`:'?locale=zh-CN'));await page.waitForSelector('.storyrail');
 const click=async(action,value)=>{const q=`[data-action="${action}"]${value?`[data-value="${value}"]`:''}`;await page.locator(q).filter({visible:true}).first().click();};
 if(scene&&!await page.locator('#scenario-dialog[open]').count())await click('scene',scene);
 if(name.includes('scope'))await click('product','scope');
 if(name.includes('condition')){await click('d-start');await page.waitForFunction(()=>!!JSON.parse(sessionStorage.getItem('ctt-round-a-v1'))?.data?.demoConfig?.batchD);await click('product','condition');}
 if(name.includes('references')){await click('close');await click('reference-global');}
 if(name.includes('client')){await click('collab-open');await click('collab-init','snapshot');await page.waitForSelector('.collab-tabs');await page.locator('#collab-audience').selectOption('client');}
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await Promise.all(document.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));});await page.screenshot({path:`${dir}/${name}.png`,fullPage:false});
 const metrics=await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,headings:[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.getClientRects().length).map(e=>e.innerText),technical:[...document.querySelectorAll('.mono,.eyebrow,.num,.scene-kicker')].filter(e=>e.getClientRects().length).slice(0,25).map(e=>({text:e.innerText.slice(0,120),size:getComputedStyle(e).fontSize,color:getComputedStyle(e).color}))}));
 records.push({name,status:'captured',scene,errors,metrics,screenshot:`${dir}/${name}.png`});
 }catch(e){records.push({name,status:'failed',error:e.message,errors});await page.screenshot({path:`${dir}/${name}.failure.png`});}finally{await context.close();}
}}finally{await browser.close();}
fs.writeFileSync(`${dir}/capture-results.json`,JSON.stringify(records,null,2)+'\n');console.log(records.map(({name,status,error})=>({name,status,error})));if(records.some(r=>r.status==='failed'))process.exitCode=1;
