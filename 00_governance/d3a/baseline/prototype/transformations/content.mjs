import data from './data.mjs';
import {pilotEnglish,referenceEnglish} from './pilot-en.mjs';

const freeze=value=>{
  if(value&&typeof value==='object'&&!Object.isFrozen(value)){
    Object.freeze(value);
    for(const child of Object.values(value))freeze(child);
  }
  return value;
};
const occurrenceById=new Map(data.source_occurrences.map(source=>[source.source_id,source]));
const aliasById=new Map(data.reference_alias_mappings.map(mapping=>[mapping.alias,mapping]));
const publicUrl=reference=>reference.kind==='internal_design_case'?null:(/^https:\/\//.test(reference.url??'')?reference.url:null);

export const transformationSources=freeze(data.source_occurrences);
export const transformationIssues=freeze(data.reconciliation_issues);
export const closureManifest=freeze(data.closure_manifest);
export const transformationReferences=freeze(data.references.map(reference=>{
  const mapping=aliasById.get(reference.id);
  return {
    alias:reference.id,
    canonicalRef:mapping?.canonicalRef??null,
    title:reference.title,
    kind:reference.kind,
    observation:reference.observation,
    adaptation:reference.adaptation,
    limits:reference.limits,
    url:publicUrl(reference),
    sourceStatus:reference.verification_status,
    mappingStatus:mapping?.mappingStatus??'unmapped',
    matchBasis:mapping?.matchBasis??[]
  };
}));
const referenceByAlias=new Map(transformationReferences.map(reference=>[reference.alias,reference]));

const resolveChange=change=>({
  ...change,
  currentSources:change.current_source_refs.map(sourceRef=>occurrenceById.get(sourceRef)),
  targetSources:change.target_source_refs.map(sourceRef=>occurrenceById.get(sourceRef))
});

export const transformationIndex=freeze(Object.fromEntries(data.scenarios.map(scenario=>[
  scenario.scenario_id,
  {...scenario,changes:scenario.changes.map(resolveChange)}
])));

const localReference=(reference,locale)=>{
  if(locale==='zh-CN')return reference;
  const prose=referenceEnglish[reference.alias];
  if(!prose)throw new Error(`Missing English pilot reference localisation for ${reference.alias}`);
  return {...reference,...prose};
};

const project=(scenarioId,locale)=>{
  const raw=transformationIndex[scenarioId];
  if(!raw||!pilotEnglish[scenarioId])return null;
  const english=pilotEnglish[scenarioId];
  const zh=locale==='zh-CN';
  return freeze({
    id:raw.scenario_id,
    title:zh?raw.title_zh:english.title,
    checkpoint:zh?raw.comparison_checkpoint:english.checkpoint,
    inputManifest:zh?raw.common_input_manifest:english.inputManifest,
    waitResume:zh?raw.wait_resume_contract:english.waitResume,
    invariants:zh?raw.control_invariants:english.invariants,
    validationQuestion:zh?raw.validation_question:english.validationQuestion,
    currentSummary:zh?raw.current_source_scope:english.currentSummary,
    targetSummary:zh?raw.target_map_observation:english.targetSummary,
    changes:raw.changes.map(change=>{
      const copy=zh?{
        title:change.work,
        current:change.current_work,
        target:change.after_proposal,
        boundary:change.human_or_rule_boundary
      }:english.changes[change.change_id];
      if(!copy)throw new Error(`Missing English pilot change localisation for ${change.change_id}`);
      return {
        id:change.change_id,
        ...copy,
        type:change.change_type,
        fields:change.field_deltas,
        currentSources:change.currentSources,
        targetSources:change.targetSources,
        references:change.after_provenance.benchmark_refs.map(alias=>localReference(referenceByAlias.get(alias),locale))
      };
    })
  });
};

const pilots=freeze({
  'en-AU':Object.fromEntries(Object.keys(pilotEnglish).map(id=>[id,project(id,'en-AU')])),
  'en-US':Object.fromEntries(Object.keys(pilotEnglish).map(id=>[id,project(id,'en-US')])),
  'zh-CN':Object.fromEntries(Object.keys(pilotEnglish).map(id=>[id,project(id,'zh-CN')]))
});

export function transformationFor(scenarioId,locale='en-AU'){
  const selected=locale==='zh-CN'?'zh-CN':locale==='en-US'?'en-US':'en-AU';
  return pilots[selected][scenarioId]??null;
}
