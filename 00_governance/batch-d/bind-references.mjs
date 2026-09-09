import fs from 'node:fs';
const root='00_governance/batch-d/baseline/';
const r=JSON.parse(fs.readFileSync(root+'prototype/references/registry.json'));
const scenes=['SCN-CONFLICTS','SCN-CREDIT','SCN-LEGAL'];
const all=['D01-SCOPE','D01-CONFLICTS','D01-CREDIT','D01-LEGAL','D01-KYC','D01-READY','D02-ASSESS','D02-DECISION','D02-CONDITION','D02-INPUT','D02-REVISION','D02-REVIEW','D02-APPROVAL','D02-EXECUTION','D03-ISSUE','D03-IMPACT','D03-TASK','D03-BRANCH','D03-CASE','D03-UNKNOWN','D03-AFFECTED','D03-UNAFFECTED','D03-DEPS','D03-RESOLVE'];
for(const [alias,nodes]of [['SRC-017:R19',all.filter(n=>/^D02/.test(n)||['D03-UNKNOWN','D03-DEPS','D03-RESOLVE','D03-CASE'].includes(n))],['SRC-017:R29',all.filter(n=>n.startsWith('D02')||['D01-CREDIT','D01-LEGAL'].includes(n))],['SRC-017:R16',['D01-READY','D02-INPUT','D02-REVISION']]]){
 const b=r.bindings.find(x=>x.observation_ref===alias);if(!b)throw Error(`Missing inherited binding ${alias}`);
 b.scenario_refs=[...new Set([...b.scenario_refs,...scenes])];b.semantic_node_refs=[...new Set([...b.semantic_node_refs,...nodes])];
 b.binding_rationale+=' Batch D source-qualified binding (SRC-019): version/dependency or downstream-update design inspiration; not bank policy.';
}
fs.writeFileSync('prototype/references/registry.json',JSON.stringify(r,null,2)+'\n');fs.writeFileSync('prototype/references/registry.mjs','// Inherited research; Batch D adds bindings only, no network re-verification.\nexport default '+JSON.stringify(r,null,2)+';\n');
fs.writeFileSync('00_governance/batch-d/reference-delta.json',JSON.stringify({sourceCount:r.sources.length,observationCount:r.observations.length,changedBindings:['SRC-017:R19','SRC-017:R29','SRC-017:R16'],newResearch:0,verificationStatus:'inherited_unchanged'},null,2)+'\n');
console.log('Bound 3 existing research observations; no duplicate source records.');
