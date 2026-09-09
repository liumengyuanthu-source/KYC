import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {productProgress} from '../product-experience/projection.mjs';
const ui=await import('../product-experience/ui.mjs').catch(()=>({}));
const seed=()=>JSON.parse(readFileSync(new URL('../qa/operating-model/host/c-live-session.json',import.meta.url))).data;
test('D5 required core, current Person T evidence and native command selectors survive custom layouts',()=>{
 assert.equal(typeof ui.productWorkspaceHtml,'function');const html=ui.productWorkspaceHtml({progress:productProgress(seed(),{role:'ROLE-KYCOPS'}),rationale:'Original human text',preference:{enabled:[],order:[],collapsed:[]}});
 for(const id of ['CORE-CONTEXT','CORE-PROGRESS','CORE-WORK','CORE-ACTION'])assert.ok(html.includes(`data-d5-core="${id}"`));
 assert.match(html,/id="screening-rationale"/);assert.match(html,/data-action="c-action"/);assert.match(html,/Original human text/);assert.match(html,/Birth date/);assert.doesNotMatch(html,/>date_of_birth</);assert.match(html,/Not provided/);assert.match(html,/Record disposition[\s\S]*disabled|disabled[\s\S]*Record disposition/);
});
test('D5 safe role HTML excludes review, dependencies, timing illustration and hidden internal inputs',()=>{
 assert.equal(typeof ui.productWorkspaceHtml,'function');for(const role of ['ROLE-RM','ROLE-CLIENT']){const html=ui.productWorkspaceHtml({progress:productProgress(seed(),{role}),role,preference:{enabled:['OPT-DEPENDENCIES'],order:['OPT-DEPENDENCIES'],collapsed:[]}});assert.doesNotMatch(html,/person-t-c01|SYNTHETIC-C|screening-rationale|data-action="c-action"|D5U-TIME-DEMO|Related dependencies/);assert.match(html,/Email/);}
});
test('D5 printing emits all selected scope timing and required evidence regardless of hidden modules',()=>{
 assert.equal(typeof ui.productWorkspaceHtml,'function');const html=ui.productWorkspaceHtml({progress:productProgress(seed(),{role:'ROLE-KYCOPS',asOf:'2026-09-08T00:00:00Z'}),print:true,preference:{enabled:[],order:[],collapsed:[]}});assert.match(html,/D5U-TIME-DEMO-01/);assert.match(html,/Scope revision/);assert.match(html,/Australia\/Sydney/);assert.match(html,/not client-shareable/);assert.doesNotMatch(html,/<textarea|data-action="c-action"/);
});
