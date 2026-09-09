import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import registry from '../../prototype/references/registry.mjs';

const sourceUrl=new URL('../../00_sources/d3/Clear_to_Trade_D3_Transformation_Traceability_v0.2.json',import.meta.url);
const outputUrl=new URL('../../prototype/transformations/data.mjs',import.meta.url);
const internalKinds=new Set(['internal_design_case','design_interpretation','project_source']);

const requiredArray=(value,label)=>{
  if(!Array.isArray(value))throw new TypeError(`${label} must be an array`);
  return value;
};

function aliasMapping(reference,referenceRegistry){
  const sources=requiredArray(referenceRegistry?.sources??[],'registry.sources');
  const assets=requiredArray(referenceRegistry?.assets??[],'registry.assets');
  const candidates=new Map();
  const add=(canonicalRef,basis)=>{
    if(!canonicalRef)return;
    if(!candidates.has(canonicalRef))candidates.set(canonicalRef,new Set());
    candidates.get(canonicalRef).add(basis);
  };
  for(const source of sources){
    const compatible=reference.kind!=='internal_design_case'||internalKinds.has(source.source_kind);
    if(!compatible)continue;
    if(reference.url&&source.canonical_url===reference.url)add(source.source_id,'canonical_url');
    if(source.title===reference.title)add(source.source_id,'title');
  }
  if(reference.kind!=='internal_design_case'&&reference.url){
    for(const asset of assets)if(asset.public_url===reference.url)add(asset.source_ref,'asset_public_url');
  }
  if(candidates.size>1)throw new Error(`Ambiguous registry identity for ${reference.id}: ${[...candidates.keys()].join(', ')}`);
  const [match]=candidates.entries();
  return {
    alias:reference.id,
    canonicalRef:match?.[0]??null,
    mappingStatus:match?'mapped':'unmapped',
    matchBasis:match?[...match[1]].sort():[],
    kind:reference.kind
  };
}

export function buildContent(raw,referenceRegistry=registry){
  if(!raw||typeof raw!=='object')throw new TypeError('D3 source must be an object');
  const scenarios=requiredArray(raw.scenarios,'scenarios');
  const occurrences=requiredArray(raw.source_occurrences,'source_occurrences');
  const references=requiredArray(raw.references,'references');
  requiredArray(raw.reconciliation_issues,'reconciliation_issues');
  requiredArray(raw.closure_manifest,'closure_manifest');

  const occurrenceIds=new Set();
  const locatorIds=new Map();
  for(const occurrence of occurrences){
    if(!occurrence?.source_id||occurrenceIds.has(occurrence.source_id))throw new Error(`Duplicate or missing source occurrence ${occurrence?.source_id??'(missing)'}`);
    occurrenceIds.add(occurrence.source_id);
    const sourceId=occurrence.source_id;
    if(typeof occurrence.deck_filename!=='string'||!occurrence.deck_filename.trim()||occurrence.deck_filename!==raw.metadata?.source_deck)throw new Error(`Invalid source locator deck_filename for ${sourceId}`);
    if(!Number.isSafeInteger(occurrence.slide_no)||occurrence.slide_no<1)throw new Error(`Invalid source locator slide_no for ${sourceId}`);
    if(!Number.isSafeInteger(occurrence.shape_id)||occurrence.shape_id<1)throw new Error(`Invalid source locator shape_id for ${sourceId}`);
    if(!Number.isSafeInteger(occurrence.occurrence_in_shape)||occurrence.occurrence_in_shape<1)throw new Error(`Invalid source locator occurrence_in_shape for ${sourceId}`);
    const sourceIdParts=/^PPT-S(\d+)-SH(\d+)-(?:A(\d+)|EX)$/.exec(sourceId);
    if(!sourceIdParts||Number(sourceIdParts[1])!==occurrence.slide_no||Number(sourceIdParts[2])!==occurrence.shape_id||(sourceIdParts[3]!==undefined?Number(sourceIdParts[3])!==occurrence.occurrence_in_shape:occurrence.occurrence_in_shape!==1))throw new Error(`Source locator fields do not match source_id ${sourceId}`);
    const locator=[occurrence.deck_filename,occurrence.slide_no,occurrence.shape_id,occurrence.occurrence_in_shape].join('|');
    if(locatorIds.has(locator))throw new Error(`Duplicate source locator ${locator}: ${locatorIds.get(locator)}, ${sourceId}`);
    locatorIds.set(locator,sourceId);
  }
  const changeIds=new Set();
  const usedOccurrences=new Set();
  for(const scenario of scenarios){
    for(const change of requiredArray(scenario.changes,`${scenario.scenario_id}.changes`)){
      if(!change?.change_id||changeIds.has(change.change_id))throw new Error(`Duplicate or missing change ID ${change?.change_id??'(missing)'}`);
      changeIds.add(change.change_id);
      for(const [field,label] of [['current_source_refs','current'],['target_source_refs','target']]){
        for(const sourceRef of requiredArray(change[field],`${change.change_id}.${field}`)){
          if(typeof sourceRef!=='string'||!occurrenceIds.has(sourceRef))throw new Error(`Unknown ${label} source reference ${String(sourceRef)} in ${change.change_id}`);
          usedOccurrences.add(sourceRef);
        }
      }
    }
  }
  const unreferenced=occurrences.filter(occurrence=>!usedOccurrences.has(occurrence.source_id));
  if(unreferenced.length)throw new Error(`Unreferenced source occurrences: ${unreferenced.map(item=>item.source_id).join(', ')}`);
  if(raw.metadata?.scenario_count!==undefined&&raw.metadata.scenario_count!==scenarios.length)throw new Error('Scenario count does not match metadata');
  if(raw.metadata?.change_count!==undefined&&raw.metadata.change_count!==changeIds.size)throw new Error('Change count does not match metadata');

  return {
    ...structuredClone(raw),
    reference_alias_mappings:references.map(reference=>aliasMapping(reference,referenceRegistry))
  };
}

export function serialiseContent(data){
  return `// Generated by 03_personas_journey/d3/build-content.mjs. Do not edit by hand.\nexport default ${JSON.stringify(data,null,2)};\n`;
}

export function buildFile(){
  const raw=JSON.parse(readFileSync(sourceUrl,'utf8'));
  const data=buildContent(raw,registry);
  writeFileSync(outputUrl,serialiseContent(data),'utf8');
  return data;
}

const invokedPath=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invokedPath===import.meta.url){
  const data=buildFile();
  process.stdout.write(`Generated ${fileURLToPath(outputUrl)} (${data.scenarios.length} scenarios, ${data.source_occurrences.length} source occurrences)\n`);
}
