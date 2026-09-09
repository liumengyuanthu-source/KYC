import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const task=process.argv[2]||'1',root=process.cwd(),base='00_governance/batch-d/baseline',out='.superpowers/sdd/2026-09-07-batch-d';
const model=['prototype/specialist-engine.mjs','prototype/tests/specialist-engine.test.mjs','04_operating_model/batch-d/build-contract.mjs'];
const graphs=['prototype/specialist-graph.mjs','prototype/tests/specialist-graph.test.mjs','prototype/tests/specialist-references.test.mjs','prototype/diagrams/batch-d/build.mjs','prototype/diagrams/batch-d/verify-export.mjs','prototype/diagrams/batch-d/verify-browser.mjs','prototype/references.mjs','00_governance/batch-d/bind-references.mjs'];
const ui=['prototype/specialist-ui.mjs','prototype/specialist.css','prototype/app.mjs','prototype/content.mjs','prototype/navigation.mjs','prototype/index.html','prototype/tests/specialist-ui.test.mjs','prototype/tests/specialist-navigation.test.mjs','prototype/tests/navigation.test.mjs'];
const verification=['prototype/qa/batch-d/mainline-browser.mjs','prototype/qa/batch-d/static-browser.mjs','prototype/qa/batch-d/return-browser.mjs','prototype/qa/batch-d/load-race-browser.mjs','prototype/qa/batch-d/scene-graph-browser.mjs','prototype/qa/batch-d/print-proof.mjs','prototype/qa/batch-d/run-unit-proof.mjs','00_governance/batch-d/build-acceptance.mjs'];
const files=task==='1'?model:task==='2'?graphs:task==='3'?ui:[...model,...graphs,...ui,...verification];
let text=`# Batch D exact owned-file review package\nBase: pre-D baseline copies (new files /dev/null); HEAD unchanged, no commits.\nScope: Task ${task}. Generated artifacts verified by separate receipts.\nNote: navigation.test.mjs lacked a pre-D copy; its full existing content is included for inspection, not claimed entirely newly authored. D adds route import and tests after the prior scroll-key test.\n`;
for(const file of files){if(!fs.existsSync(file))continue;const old=path.join(base,file),r=spawnSync('diff',['-u',fs.existsSync(old)?old:'/dev/null',file],{encoding:'utf8'});if(r.status>1)throw Error(r.stderr);text+=`\n## ${file}\n${r.stdout}`;}
const target=path.join(out,`task-${task}-review.diff`),previous=path.join(out,`task-${task}-review-before-fix.diff`);
if(fs.existsSync(target)&&!fs.existsSync(previous))fs.copyFileSync(target,previous);
fs.writeFileSync(target,text);
if(fs.existsSync(previous)){const r=spawnSync('diff',['-u',previous,target],{encoding:'utf8'});fs.writeFileSync(path.join(out,`task-${task}-fix.diff`),r.stdout);}
console.log(path.join(root,target));
