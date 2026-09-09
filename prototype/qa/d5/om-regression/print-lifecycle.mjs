// D5 rerun of D4 contract; historical receipts preserved.
import assert from 'node:assert/strict';import {probe,finish} from './harness.mjs';
await probe(['OM-16','OM-25'],'native-print-pauses-narration',async h=>{
 await h.click('om-view','collaboration');await h.click('om-play');
 assert.equal((await h.state()).navigation.operating.playing,true);
 await h.page.pdf({format:'A4',landscape:true,preferCSSPageSize:true});
 await h.page.waitForSelector('.om-page');
 assert.equal((await h.state()).navigation.operating.playing,false,'Browser print return must stay paused');
 assert.deepEqual((await h.state()).data,h.before.data);
},{reduced:false});
await finish();
