import test from 'node:test';
import assert from 'node:assert/strict';
import {preparePrintImages} from '../print-ready.mjs';
test('Print waits for every image, including offscreen Target, before invoking print',async()=>{
 let release,printed=false;const pending=new Promise(r=>release=r);
 const done=preparePrintImages([{decode:()=>Promise.resolve()},{decode:()=>pending}],()=>{printed=true});
 await Promise.resolve();assert.equal(printed,false);release();await done;assert.equal(printed,true);
});
test('Failed print image prevents a silent incomplete PDF',async()=>{
 let printed=false;await assert.rejects(preparePrintImages([{decode:()=>Promise.reject(new Error('missing source'))}],()=>{printed=true}),/missing source/);assert.equal(printed,false);
});
