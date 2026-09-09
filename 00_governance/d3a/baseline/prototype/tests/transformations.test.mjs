import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const rawUrl=new URL('../../00_sources/d3/Clear_to_Trade_D3_Transformation_Traceability_v0.2.json',import.meta.url);
const fixtureUrl=new URL('../../04_operating_model/round-a/synthetic-case-fixture.json',import.meta.url);
const fixtureBytesBefore=readFileSync(fixtureUrl,'utf8');
const raw=JSON.parse(readFileSync(rawUrl,'utf8'));
const content=await import('../transformations/content.mjs');
const {buildContent}=await import('../../03_personas_journey/d3/build-content.mjs');

const {
  transformationFor,
  transformationIndex,
  transformationIssues,
  transformationReferences,
  transformationSources,
  closureManifest
}=content;
const han=/[\u3400-\u9fff]/u;

test('all 94 stable change IDs resolve every one of the 144 source-qualified occurrences',()=>{
  const scenarios=Object.values(transformationIndex);
  const changes=scenarios.flatMap(scenario=>scenario.changes);
  const occurrences=new Set(changes.flatMap(change=>[
    ...change.currentSources,
    ...change.targetSources
  ]).map(source=>source.source_id));

  assert.equal(scenarios.length,15);
  assert.equal(changes.length,94);
  assert.equal(new Set(changes.map(change=>change.change_id)).size,94);
  assert.equal(transformationSources.length,144);
  assert.equal(occurrences.size,144);
});

test('the two Target M0.1 source occurrences retain separate locators and meanings',()=>{
  const targetM01=transformationSources.filter(source=>source.slide_no===2&&source.process_code==='M0.1');
  assert.deepEqual(targetM01.map(source=>source.source_id),[
    'PPT-S2-SH283-A1',
    'PPT-S2-SH279-A1'
  ]);
  assert.notEqual(targetM01[0].verbatim_text,targetM01[1].verbatim_text);
});

test('only the GAP and MATCH pilots project to UI, with six and seven work changes',()=>{
  assert.equal(transformationFor('SCN-GAP','en-AU').changes.length,6);
  assert.equal(transformationFor('SCN-MATCH','en-US').changes.length,7);
  assert.equal(transformationFor('SCN-SCOPE','en-AU'),null);
  assert.equal(transformationFor('SCN-UNKNOWN','zh-CN'),null);
});

test('English pilot projections contain no Chinese prose',()=>{
  for(const locale of ['en-AU','en-US']){
    assert.equal(han.test(JSON.stringify(transformationFor('SCN-GAP',locale))),false);
    assert.equal(han.test(JSON.stringify(transformationFor('SCN-MATCH',locale))),false);
  }
});

test('Chinese pilot prose preserves every supplied context and all 13 change statements',()=>{
  let checkedChanges=0;
  for(const scenarioId of ['SCN-GAP','SCN-MATCH']){
    const projection=transformationFor(scenarioId,'zh-CN');
    const source=raw.scenarios.find(scenario=>scenario.scenario_id===scenarioId);
    assert.equal(projection.title,source.title_zh);
    assert.equal(projection.checkpoint,source.comparison_checkpoint);
    assert.equal(projection.inputManifest,source.common_input_manifest);
    assert.equal(projection.waitResume,source.wait_resume_contract);
    assert.equal(projection.invariants,source.control_invariants);
    assert.equal(projection.validationQuestion,source.validation_question);
    assert.equal(projection.currentSummary,source.current_source_scope);
    assert.equal(projection.targetSummary,source.target_map_observation);
    for(const [index,change] of projection.changes.entries()){
      const sourceChange=source.changes[index];
      assert.equal(change.id,sourceChange.change_id);
      assert.equal(change.title,sourceChange.work);
      assert.equal(change.current,sourceChange.current_work);
      assert.equal(change.target,sourceChange.after_proposal);
      assert.equal(change.boundary,sourceChange.human_or_rule_boundary);
      checkedChanges+=1;
    }
  }
  assert.equal(checkedChanges,13);
});

test('reference aliases reuse exact registry identities and keep missing mappings explicit',()=>{
  assert.equal(transformationReferences.length,20);
  assert.ok(transformationReferences.every(reference=>['mapped','unmapped'].includes(reference.mappingStatus)));
  assert.equal(transformationReferences.find(reference=>reference.alias==='IB-ANZ-SECURE').canonicalRef,'REFSRC-3f0c51e665c8');
  assert.equal(transformationReferences.find(reference=>reference.alias==='XB-GS1').canonicalRef,'REFSRC-3e10e7311eba');
  assert.deepEqual(
    transformationReferences.filter(reference=>reference.mappingStatus==='unmapped').map(reference=>reference.alias),
    ['IB-ISDA-CREATE','XB-ACDM','IC-PHKL']
  );
  const internal=transformationReferences.find(reference=>reference.alias==='IC-PHKL');
  assert.equal(internal.kind,'internal_design_case');
  assert.equal(internal.canonicalRef,null);
});

test('public reference projections exclude internal paths and expose inherited status only',()=>{
  for(const scene of ['SCN-GAP','SCN-MATCH']){
    const projection=transformationFor(scene,'en-AU');
    for(const reference of projection.changes.flatMap(change=>change.references)){
      if(reference.url!==null)assert.match(reference.url,/^https:\/\//);
      assert.doesNotMatch(JSON.stringify(reference),/\/Users\/|a9d5e073|\.md\b/);
      assert.ok(reference.sourceStatus);
    }
  }
  const internal=transformationFor('SCN-GAP','en-AU').changes.at(-1).references[0];
  assert.equal(internal.alias,'IC-PHKL');
  assert.equal(internal.url,null);
  assert.match(internal.sourceStatus,/not_public/);
});

test('source work, target proposal and reference observation remain separate projections',()=>{
  const change=transformationFor('SCN-GAP','en-AU').changes[1];
  assert.equal(change.current,'Issue requirements to the client and clarify their response.');
  assert.equal(change.target,'Group related gaps into response-ready items while retaining each requirement, subject and purpose link, accepted response options and reasons.');
  assert.equal(change.references[0].observation,'An RM can arrange access for KYC representatives, who can enter information, upload material, save and resume in InsideBusiness; multiple representatives do not imply simultaneous editing.');
  assert.notEqual(change.current,change.target);
  assert.notEqual(change.target,change.references[0].observation);
  assert.notEqual(change.references[0].observation,change.references[0].adaptation);
});

test('loading and reading D3 metadata never changes the synthetic business fixture',()=>{
  const fixture=JSON.parse(fixtureBytesBefore);
  transformationFor('SCN-GAP','en-AU');
  transformationFor('SCN-MATCH','zh-CN');
  assert.equal(readFileSync(fixtureUrl,'utf8'),fixtureBytesBefore);
  assert.equal(fixture.case.id,'DEMO-CTT-001');
  assert.equal(fixture.entities[0].id,'DEMO-CTT-001/entity/harbour');
  assert.equal(fixture.case.publication_status,'not_requested');
});

test('the generated adapter preserves issues and the full closure manifest',()=>{
  assert.equal(transformationIssues.length,15);
  assert.equal(closureManifest.length,10);
  assert.equal(closureManifest[0].id,'CL-01');
  assert.equal(closureManifest.at(-1).id,'CL-10');
});

test('builder rejects a malformed source reference instead of dropping traceability',()=>{
  const malformed=structuredClone(raw);
  malformed.scenarios[0].changes[0].current_source_refs[0]='PPT-S9-MISSING';
  assert.throws(
    ()=>buildContent(malformed,{sources:[],assets:[]}),
    /Unknown current source reference PPT-S9-MISSING in D3-SCOPE-01/
  );
});

test('builder rejects incomplete or inconsistent source locator fields',()=>{
  const cases=[
    ['deck_filename','unexpected-source.pptx'],
    ['slide_no',0],
    ['shape_id','283'],
    ['occurrence_in_shape',0]
  ];
  for(const [field,value] of cases){
    const malformed=structuredClone(raw);
    malformed.source_occurrences[0][field]=value;
    assert.throws(
      ()=>buildContent(malformed,{sources:[],assets:[]}),
      new RegExp(`Invalid source locator ${field} for PPT-S1-SH283-A1`)
    );
  }
});

test('builder rejects duplicate physical locator tuples even when source IDs differ',()=>{
  const duplicate=structuredClone(raw);
  duplicate.source_occurrences[1]={
    ...duplicate.source_occurrences[1],
    source_id:'PPT-S1-SH283-EX',
    deck_filename:duplicate.source_occurrences[0].deck_filename,
    slide_no:duplicate.source_occurrences[0].slide_no,
    shape_id:duplicate.source_occurrences[0].shape_id,
    occurrence_in_shape:duplicate.source_occurrences[0].occurrence_in_shape
  };
  assert.throws(
    ()=>buildContent(duplicate,{sources:[],assets:[]}),
    /Duplicate source locator Sanitised Process Map\(1\)\.pptx\|1\|283\|1/
  );
});
