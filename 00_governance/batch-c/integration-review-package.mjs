import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const files=[
 'prototype/app.mjs','prototype/content.mjs','prototype/navigation.mjs','prototype/index.html','prototype/collaboration-ui.mjs',
 'prototype/screening-ui.mjs','prototype/screening.css','prototype/tests/screening-ui.test.mjs','prototype/tests/navigation.test.mjs','prototype/tests/collaboration-ui.test.mjs',
 'prototype/screening-graph.mjs','prototype/references.mjs','prototype/reference-ui.mjs','prototype/references/design.mjs','prototype/references/project.mjs','prototype/reference.css',
 'prototype/diagrams/batch-c/build.mjs','prototype/diagrams/batch-c/english.mjs','prototype/diagrams/batch-c/build-dimensions.mjs','prototype/diagrams/batch-c/dimensions.mjs','00_governance/batch-c/build-references.mjs',
 'prototype/tests/references.test.mjs','prototype/tests/screening-diagrams.test.mjs','prototype/tests/screening-contract-integration.test.mjs',
 'prototype/qa/batch-c/mainline-browser.mjs','prototype/qa/batch-c/edge-browser.mjs','prototype/qa/batch-c/print-proof.mjs','prototype/qa/batch-c/review-regressions.mjs','prototype/qa/batch-c/build-receipt.mjs'
];
let diff='Exact incremental review boundary: captured pre-C files versus current owned files; new files versus /dev/null. Dirty unrelated HEAD content is excluded. Model/reducer approved separately; only inspect it as needed for actual host contracts. Generated graph/reference assets are reviewed via generators and receipts.\n';
const hashes={};
for(const file of files){
 if(!existsSync(file))throw Error('Missing review target '+file);
 const baseline='00_governance/batch-c/baseline/'+file;
 const result=spawnSync('diff',['-U','6',existsSync(baseline)?baseline:'/dev/null',file],{encoding:'utf8'});
 if(![0,1].includes(result.status))throw Error(result.stderr);
 diff+='\n'+result.stdout;
 hashes[file]=createHash('sha256').update(readFileSync(file)).digest('hex');
}
const dir='.superpowers/sdd/2026-09-07-batch-c/';
const label=process.argv[2]||'integration-review';if(!/^[a-z0-9-]+$/.test(label))throw Error('Invalid review label');
writeFileSync(dir+label+'.diff',diff);
writeFileSync(dir+label+'-hashes.json',JSON.stringify(hashes,null,2)+'\n');
if(label!=='integration-review'){
 const from=process.argv[3]||'integration-review';if(!/^[a-z0-9-]+$/.test(from))throw Error('Invalid baseline label');
 const result=spawnSync('diff',['-U','3',dir+from+'.diff',dir+label+'.diff'],{encoding:'utf8'});
 if(![0,1].includes(result.status))throw Error(result.stderr);
 writeFileSync(dir+label+'-delta.diff',result.stdout);
}
console.log({files:files.length,characters:diff.length,target:dir+label+'.diff'});
