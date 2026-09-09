import assert from 'node:assert/strict';
import test from 'node:test';

import {
  transformationIndex,
  transformationSources
} from '../transformations/content.mjs';

const moduleUrl=new URL('../reconstruction/registry.mjs',import.meta.url);
const loadRegistry=()=>import(moduleUrl);

const allSourceChanges=Object.values(transformationIndex).flatMap(scene=>scene.changes);
const sourceChangeById=new Map(allSourceChanges.map(change=>[change.change_id,change]));

test('exports the bounded reconstruction author registry',async()=>{
  const registry=await loadRegistry().catch(()=>null);
  assert.ok(registry,'prototype/reconstruction/registry.mjs must exist and load');
  for(const name of ['branches','mappings','nodes','pc01ChangeIds','branchForScene','comparisonFor','validateRegistry']){
    assert.ok(name in registry,`missing ${name} export`);
  }
});

test('assigns all 94 source changes exactly once to the prescribed 12 primary branches',async()=>{
  const {branches,mappings,validateRegistry}=await loadRegistry();
  assert.equal(branches.length,12);
  assert.equal(mappings.length,94);
  assert.equal(new Set(mappings.flatMap(mapping=>mapping.change_refs)).size,94);
  assert.equal(validateRegistry({branches,mappings,nodes:(await loadRegistry()).nodes}),true);

  const expected={
    'BR-01':['D3-SCOPE-01','D3-SCOPE-02','D3-SCOPE-03','D3-SCOPE-04','D3-SCOPE-05'],
    'BR-02':['D3-ENTITY-01','D3-ENTITY-02','D3-ENTITY-03','D3-ENTITY-04','D3-ENTITY-05','D3-ENTITY-06'],
    'BR-03':['D3-REQUIREMENTS-01','D3-REQUIREMENTS-02','D3-REQUIREMENTS-03','D3-REQUIREMENTS-04','D3-REQUIREMENTS-05','D3-REQUIREMENTS-06'],
    'BR-04':['D3-SOURCE-01','D3-SOURCE-02','D3-SOURCE-03','D3-SOURCE-04','D3-SOURCE-05','D3-SOURCE-06','D3-VALIDATE-01','D3-VALIDATE-02','D3-VALIDATE-03','D3-VALIDATE-04','D3-VALIDATE-05','D3-VALIDATE-06'],
    'BR-05':['D3-GAP-01','D3-GAP-02','D3-GAP-03','D3-GAP-04','D3-GAP-05','D3-GAP-06'],
    'BR-06':['D3-POPULATION-01','D3-POPULATION-02','D3-POPULATION-03','D3-POPULATION-04','D3-POPULATION-05','D3-POPULATION-06'],
    'BR-07':['D3-MATCH-01','D3-MATCH-02','D3-MATCH-03','D3-MATCH-04','D3-MATCH-05','D3-MATCH-06','D3-MATCH-07'],
    'BR-08':['D3-EDD-01','D3-EDD-02','D3-EDD-03','D3-EDD-04','D3-EDD-05','D3-EDD-06','D3-EDD-07','D3-EDD-08'],
    'BR-09':['D3-CONFLICTS-01','D3-CONFLICTS-02','D3-CONFLICTS-03','D3-CONFLICTS-04','D3-CONFLICTS-05'],
    'BR-10':['D3-CREDIT-01','D3-CREDIT-02','D3-CREDIT-03','D3-CREDIT-04','D3-CREDIT-05','D3-CREDIT-06','D3-CREDIT-07'],
    'BR-11':['D3-LEGAL-01','D3-LEGAL-02','D3-LEGAL-03','D3-LEGAL-04','D3-LEGAL-05','D3-LEGAL-06','D3-LEGAL-07','D3-LEGAL-08'],
    'BR-12':['D3-QA-01','D3-QA-02','D3-QA-03','D3-QA-04','D3-QA-05','D3-QA-06','D3-QA-07','D3-QA-08','D3-READINESS-01','D3-READINESS-02','D3-READINESS-03','D3-READINESS-04','D3-READINESS-05','D3-PUBLISH-01','D3-PUBLISH-02','D3-PUBLISH-03','D3-PUBLISH-04','D3-PUBLISH-05']
  };
  for(const [branchId,changeIds] of Object.entries(expected)){
    assert.deepEqual(mappings.filter(mapping=>mapping.branch_ref===branchId).flatMap(mapping=>mapping.change_refs),changeIds);
  }
});

test('maps S1-S5 scene aliases and keeps BR-12 taxonomy subroots independent',async()=>{
  const {branches,branchForScene}=await loadRegistry();
  const expected={
    'SCN-SCOPE':'BR-01','SCN-ENTITY':'BR-02','SCN-REQUIREMENTS':'BR-03',
    'SCN-SOURCE':'BR-04','SCN-VALIDATE':'BR-04','SCN-GAP':'BR-05',
    'SCN-POPULATION':'BR-06','SCN-MATCH':'BR-07','SCN-EDD':'BR-08',
    'SCN-CONFLICTS':'BR-09','SCN-CREDIT':'BR-10','SCN-LEGAL':'BR-11',
    'SCN-QA':'BR-12','SCN-READINESS':'BR-12','SCN-PUBLISH':'BR-12'
  };
  for(const [sceneId,branchId] of Object.entries(expected))assert.equal(branchForScene(sceneId)?.branch_id,branchId);
  assert.equal(branchForScene('SCN-NOT-AUTHORED'),null);
  assert.deepEqual(branches.find(branch=>branch.branch_id==='BR-12').topic_refs,[
    'TOPIC-BR12-QA','TOPIC-BR12-REMEDIATION','TOPIC-BR12-READINESS','TOPIC-BR12-AUTHORISATION-PUBLICATION'
  ]);
  assert.deepEqual(branches.map(branch=>branch.stage_refs),[
    ['S1'],['S1','S2'],['S2'],['S2'],['S2'],['S3'],['S3'],['S3','S4'],
    ['S1','S2','S3','S4'],['S2','S3','S4'],['S2','S3','S4','S5'],['S4','S5']
  ]);
});

test('retains source classification, flags, actors and exact occurrence references without claiming bank validation',async()=>{
  const {mappings}=await loadRegistry();
  for(const mapping of mappings){
    const source=sourceChangeById.get(mapping.change_refs[0]);
    assert.equal(mapping.primary_change_type,source.change_type);
    assert.deepEqual(mapping.source_format_flags,source.source_format_flags);
    assert.deepEqual(mapping.current_actor_refs,source.current_actors);
    assert.deepEqual(mapping.target_actor_refs,source.target_actors_in_map);
    assert.deepEqual(mapping.current_source_refs,source.current_source_refs);
    assert.deepEqual(mapping.target_source_refs,source.target_source_refs);
    assert.equal(mapping.bank_validated,false);
    assert.equal(mapping.mapping_status,mapping.pc01?'pc01_author_approved':'provisional_author_mapping');
  }
});

test('keeps every proposed addition predecessor-free and separates readable Current context',async()=>{
  const {mappings}=await loadRegistry();
  const proposed=mappings.filter(mapping=>mapping.primary_change_type==='Proposed addition');
  assert.ok(proposed.length>0);
  for(const mapping of proposed){
    assert.deepEqual(mapping.before_node_refs,[]);
    assert.ok(mapping.context_source_refs.length>0);
    assert.match(mapping.relation_cardinality,/^0_to_/);
  }
  const accessGrant=mappings.find(mapping=>mapping.mapping_id==='MAP-D3-GAP-03');
  assert.deepEqual(accessGrant.before_node_refs,[]);
  assert.deepEqual(accessGrant.context_source_refs,['PPT-S1-SH292-A3','PPT-S1-SH9-A1']);
});

test('uses exact PC-01 mapping groups with shared Current activities and distinct design subnodes',async()=>{
  const {mappings,pc01ChangeIds}=await loadRegistry();
  assert.deepEqual(pc01ChangeIds,[
    'D3-REQUIREMENTS-01','D3-REQUIREMENTS-03','D3-SOURCE-03','D3-GAP-01','D3-GAP-03','D3-GAP-05','D3-VALIDATE-04'
  ]);
  const members=Object.fromEntries(mappings.filter(mapping=>mapping.pc01).map(mapping=>[
    mapping.mapping_id,{before:mapping.before_node_refs,after:mapping.after_node_refs,cardinality:mapping.relation_cardinality}
  ]));
  assert.deepEqual(members,{
    'MAP-D3-REQUIREMENTS-01':{before:['CURRENT-BR03-M2.1-DETERMINE-REQUIREMENTS'],after:['TOBE-D3-REQUIREMENTS-01-RULE','TOBE-D3-REQUIREMENTS-01-REVIEW'],cardinality:'1_to_many'},
    'MAP-D3-REQUIREMENTS-03':{before:['CURRENT-BR03-M2.3-CONSOLIDATE-REQUIREMENTS'],after:['TOBE-D3-REQUIREMENTS-03-REQUIREMENT-SET'],cardinality:'1_to_1'},
    'MAP-D3-SOURCE-03':{before:[],after:['TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS','TOBE-D3-SOURCE-03-CONFIRMED-VALUES'],cardinality:'0_to_many'},
    'MAP-D3-GAP-01':{before:['CURRENT-BR05-M3.2-IDENTIFY-RESIDUAL-GAPS'],after:['TOBE-D3-GAP-01-SPECIFIC-GAP'],cardinality:'1_to_1'},
    'MAP-D3-GAP-03':{before:[],after:['TOBE-D3-GAP-03-RECIPIENT','TOBE-D3-GAP-03-LIMITED-GRANT'],cardinality:'0_to_many'},
    'MAP-D3-GAP-05':{before:['CURRENT-BR05-M3.3-REQUEST-INFORMATION','CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],after:['TOBE-D3-GAP-05-PARTIAL-RESPONSE'],cardinality:'many_to_1'},
    'MAP-D3-VALIDATE-04':{before:['CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],after:['TOBE-D3-VALIDATE-04-USE-ASSESSMENT','TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY'],cardinality:'1_to_many'}
  });
});

test('projects only four PC-01 scenes with one shared input, defaults and complete locale copy',async()=>{
  const {comparisonFor}=await loadRegistry();
  const defaults={
    'SCN-REQUIREMENTS':'MAP-D3-REQUIREMENTS-01',
    'SCN-SOURCE':'MAP-D3-SOURCE-03',
    'SCN-GAP':'MAP-D3-GAP-01',
    'SCN-VALIDATE':'MAP-D3-VALIDATE-04'
  };
  const checkpointIds=new Set();
  const manifestRefs=new Set();
  for(const locale of ['zh-CN','en-AU','en-US']){
    for(const [sceneId,defaultMappingId] of Object.entries(defaults)){
      const comparison=comparisonFor(sceneId,locale);
      assert.equal(comparison.sceneId,sceneId);
      assert.equal(comparison.defaultMappingId,defaultMappingId);
      assert.equal(comparison.revision.locale,locale);
      checkpointIds.add(comparison.checkpoint.checkpoint_id);
      manifestRefs.add(comparison.checkpoint.shared_input_manifest_ref);
      assert.ok(comparison.checkpoint.description.length>20);
      assert.ok(comparison.checkpoint.input_manifest.length>20);
      assert.ok(comparison.topics.length>0);
      assert.ok(comparison.nodes.every(node=>node.label.length>2&&node.explanation.length>15));
      assert.ok(comparison.mappings.every(mapping=>mapping.rationale.length>15));
      assert.ok(comparison.traces.every(trace=>trace.summary.painNeed.length>15));
      assert.ok(comparison.references.every(reference=>reference.display.observation.length>15&&reference.raw.observation));
      assert.equal(comparison.checkpoint.case_fixture_ref,null);
    }
  }
  assert.deepEqual([...checkpointIds],['PC01-CHECKPOINT-01']);
  assert.deepEqual([...manifestRefs],['PC01-SHARED-INPUT-01']);
  assert.equal(comparisonFor('SCN-MATCH','en-AU'),null);
});

test('preserves the approved same-case facts and separates employment from authority in every locale',async()=>{
  const {comparisonFor}=await loadRegistry();
  const expected={
    'zh-CN':['FX forward','报告的母公司 Entity B','Person T 受雇于 Entity B','受雇关系不等于协调、签约或交易权限'],
    'en-AU':['FX forward','reported parent Entity B','Person T is employed by Entity B','Employment does not establish coordination, signing or trading authority'],
    'en-US':['FX forward','reported parent Entity B','Person T is employed by Entity B','Employment does not establish coordination, signing or trading authority']
  };
  for(const [locale,facts] of Object.entries(expected)){
    const comparison=comparisonFor('SCN-GAP',locale);
    const recipient=comparison.nodes.find(node=>node.node_id==='TOBE-D3-GAP-03-RECIPIENT');
    for(const fact of facts.slice(0,3))assert.match(comparison.checkpoint.description,new RegExp(fact));
    assert.match(recipient.explanation,new RegExp(facts[3]));
  }
});

test('keeps every projected trace reference locally resolvable and identifies wider-chain refs for registry lookup',async()=>{
  const {comparisonFor}=await loadRegistry();
  for(const sceneId of ['SCN-REQUIREMENTS','SCN-SOURCE','SCN-GAP','SCN-VALIDATE']){
    const comparison=comparisonFor(sceneId,'en-AU');
    const mappingIds=new Set(comparison.mappings.map(mapping=>mapping.mapping_id));
    const nodeIds=new Set(comparison.nodes.map(node=>node.node_id));
    for(const trace of comparison.traces){
      assert.ok(trace.mapping_refs.every(ref=>mappingIds.has(ref)));
      assert.ok(trace.current_node_refs.every(ref=>nodeIds.has(ref)));
      assert.ok(trace.target_node_refs.every(ref=>nodeIds.has(ref)));
      assert.equal(trace.external_refs.lookup_scope,'registry');
      assert.ok(trace.external_refs.mapping_refs.every(ref=>!mappingIds.has(ref)));
      assert.ok(trace.external_refs.current_node_refs.every(ref=>!nodeIds.has(ref)));
      assert.ok(trace.external_refs.target_node_refs.every(ref=>!nodeIds.has(ref)));
    }
  }
  const sourceTrace=comparisonFor('SCN-SOURCE','en-AU').traces[0];
  assert.deepEqual(sourceTrace.mapping_refs,['MAP-D3-SOURCE-03']);
  assert.deepEqual(sourceTrace.external_refs.mapping_refs,['MAP-D3-GAP-01','MAP-D3-VALIDATE-04']);
});

test('links explicit hypothetical pain to opportunity and support while preserving null pain for controls',async()=>{
  const {comparisonFor}=await loadRegistry();
  const comparison=comparisonFor('SCN-VALIDATE','en-AU');
  assert.ok(comparison.traces.some(trace=>trace.pains.some(pain=>pain.evidence_status==='hypothesis')));
  assert.ok(comparison.traces.every(trace=>trace.opportunities.length&&trace.capabilities.length&&trace.requirements.length&&trace.acceptances.length));
  assert.ok(comparison.nodes.some(node=>node.control_invariants.length>0&&node.pain_refs.length===0));
  for(const trace of comparison.traces){
    assert.ok(trace.mapping_refs.length);
    assert.ok(trace.scene_refs.length);
    assert.ok(trace.target_node_refs.length);
  }
});

test('freezes author data and rejects duplicate changes, dangling refs and malformed source IDs',async()=>{
  const {branches,mappings,nodes,pc01ChangeIds,comparisonFor,validateRegistry}=await loadRegistry();
  assert.ok(Object.isFrozen(branches)&&Object.isFrozen(branches[0]));
  assert.ok(Object.isFrozen(mappings)&&Object.isFrozen(mappings[0].change_refs));
  assert.ok(Object.isFrozen(nodes)&&Object.isFrozen(comparisonFor('SCN-GAP','en-AU')));
  assert.ok(Object.isFrozen(pc01ChangeIds));

  const duplicate={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
  duplicate.mappings.push({...duplicate.mappings[0],mapping_id:'MAP-DUPLICATE'});
  assert.throws(()=>validateRegistry(duplicate),/assigned more than once/);

  const dangling={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
  dangling.mappings[0].after_node_refs=['TOBE-NOT-THERE'];
  assert.throws(()=>validateRegistry(dangling),/unknown node/);

  const malformed={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
  malformed.mappings[0].current_source_refs=['NOT-A-PPT-SOURCE'];
  assert.throws(()=>validateRegistry(malformed),/invalid source ref/);

  const missing={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
  missing.mappings[0].current_source_refs=['PPT-S1-SH999-A1'];
  assert.throws(()=>validateRegistry(missing),/unknown source ref/);
  assert.equal(transformationSources.some(source=>source.source_id==='PPT-S1-SH999-A1'),false);
});

test('rejects joint branch-ownership corruption and changes to the prescribed branch contract',async()=>{
  const {branches,mappings,nodes,validateRegistry}=await loadRegistry();
  const moved={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
  moved.mappings.find(mapping=>mapping.mapping_id==='MAP-D3-REQUIREMENTS-01').branch_ref='BR-04';
  for(const branch of moved.branches){
    branch.primary_change_refs=moved.mappings.filter(mapping=>mapping.branch_ref===branch.branch_id).flatMap(mapping=>mapping.change_refs);
  }
  assert.throws(()=>validateRegistry(moved),/canonical branch/);

  for(const [field,value] of [
    ['scenario_refs',['SCN-SCOPE','SCN-ENTITY']],
    ['stage_refs',['S2']],
    ['topic_refs',['TOPIC-BR99-INVENTED']]
  ]){
    const changed={branches:structuredClone(branches),mappings:structuredClone(mappings),nodes:structuredClone(nodes)};
    changed.branches[0][field]=value;
    assert.throws(()=>validateRegistry(changed),new RegExp(`prescribed ${field}`));
  }
});
