// Run only after root's actual view_image inspection of the listed rendered artifacts.
import fs from 'node:fs';
const dir='prototype/qa/operating-model/print/';
const manifest=JSON.parse(fs.readFileSync(dir+'sample-manifest.json'));
const inspected=['customer.en-AU','scenario.en-AU','scenario.en-US','scenario.zh-CN','skill.en-AU','skill.en-US','skill.zh-CN'];
if(manifest.length!==21||manifest.some(x=>!inspected.some(prefix=>x.image.includes('/'+prefix+'.page'))))throw Error('Unexpected unreviewed sample set');
for(const x of manifest)x.perceptualReview='passed — root visually inspected this rendered first/middle/last sample; not a claim to inspect every page';
fs.writeFileSync(dir+'sample-manifest.json',JSON.stringify(manifest,null,2));
const receipt=JSON.parse(fs.readFileSync(dir+'print.results.json'));
for(const p of receipt.results)p.visualStatus='passed — first/middle/last rendered samples inspected; all physical pages separately checked for content/bounds/context/legend';
fs.writeFileSync(dir+'print.results.json',JSON.stringify(receipt,null,2));
fs.writeFileSync(dir+'visual-final.json',JSON.stringify({status:'passed',sampleCount:21,reviewer:'root',scope:'First, middle and last physical pages of all seven proofs',observations:['Sharp titles and secondary metadata; no overlapping text in selected samples.','Single physical-page context and legend including nested reuse tables.','Complete offscreen action/assessment/source/skill/frame content is text-audited, not inferred from viewport.','Author print intentionally retains internal references; separate customer export excludes them.','Some final pages are sparse; full catalogue and source register are retained rather than truncated.'],limitations:['Chromium PDF proof only; Safari/Firefox/native200%zoom/screenreader not certified.','PDF parser reports FontBBox descriptor warnings; recorded in pdf-results.json, not hidden.']},null,2));
console.log({reviewedSamples:manifest.length,proofs:receipt.results.length});
