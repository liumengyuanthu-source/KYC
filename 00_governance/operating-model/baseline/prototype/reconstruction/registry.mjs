import {
  transformationIndex,
  transformationIssues,
  transformationReferences,
  transformationSources
} from '../transformations/content.mjs';
import {
  branchTitles,
  localeValue,
  mappingCopy,
  pc01Copy,
  referenceCopy,
  topicTitles
} from './copy.mjs';
import {
  pc01ChangeIds,
  pc01Checkpoint,
  pc01MappingMembers,
  pc01Nodes,
  pc01SceneDefaults,
  pc01Traces
} from './pc01.mjs';

export {pc01ChangeIds};

const deepFreeze=value=>{
  if(value&&typeof value==='object'&&!Object.isFrozen(value)){
    Object.freeze(value);
    for(const child of Object.values(value))deepFreeze(child);
  }
  return value;
};

deepFreeze(pc01ChangeIds);

const branchDefinitions=[
  ['BR-01',['S1'],['SCN-SCOPE'],['TOPIC-BR01-SCOPE']],
  ['BR-02',['S1','S2'],['SCN-ENTITY'],['TOPIC-BR02-ENTITY']],
  ['BR-03',['S2'],['SCN-REQUIREMENTS'],['TOPIC-BR03-APPLICABILITY','TOPIC-BR03-REQUIREMENT-SET']],
  ['BR-04',['S2'],['SCN-SOURCE','SCN-VALIDATE'],['TOPIC-BR04-SOURCING','TOPIC-BR04-CLAIMS','TOPIC-BR04-USE-ASSESSMENT']],
  ['BR-05',['S2'],['SCN-GAP'],['TOPIC-BR05-GAPS','TOPIC-BR05-RECIPIENTS','TOPIC-BR05-RESPONSES']],
  ['BR-06',['S3'],['SCN-POPULATION'],['TOPIC-BR06-POPULATION']],
  ['BR-07',['S3'],['SCN-MATCH'],['TOPIC-BR07-MATCH']],
  ['BR-08',['S3','S4'],['SCN-EDD'],['TOPIC-BR08-EDD']],
  ['BR-09',['S1','S2','S3','S4'],['SCN-CONFLICTS'],['TOPIC-BR09-CONFLICTS']],
  ['BR-10',['S2','S3','S4'],['SCN-CREDIT'],['TOPIC-BR10-CREDIT']],
  ['BR-11',['S2','S3','S4','S5'],['SCN-LEGAL'],['TOPIC-BR11-LEGAL']],
  ['BR-12',['S4','S5'],['SCN-QA','SCN-READINESS','SCN-PUBLISH'],['TOPIC-BR12-QA','TOPIC-BR12-REMEDIATION','TOPIC-BR12-READINESS','TOPIC-BR12-AUTHORISATION-PUBLICATION']]
];

const sceneToBranch=Object.fromEntries(branchDefinitions.flatMap(([branchId,,sceneIds])=>sceneIds.map(sceneId=>[sceneId,branchId])));
const allChanges=Object.values(transformationIndex).flatMap(scene=>scene.changes.map(change=>({...change,scenario_id:scene.scenario_id})));
const sourceChangeById=new Map(allChanges.map(change=>[change.change_id,change]));
const pc01Set=new Set(pc01ChangeIds);

const issuesFor=change=>{
  const ids=[];
  if(change.change_id.startsWith('D3-SCOPE-'))ids.push('D3-ISS-02');
  if(change.change_id.startsWith('D3-REQUIREMENTS-'))ids.push('D3-ISS-08');
  if(change.change_id.startsWith('D3-GAP-'))ids.push('D3-ISS-03');
  if(change.change_id.startsWith('D3-VALIDATE-'))ids.push('D3-ISS-11');
  if(/^D3-(MATCH|EDD|CONFLICTS|QA)-/.test(change.change_id))ids.push('D3-ISS-06');
  if(change.change_id.startsWith('D3-CREDIT-'))ids.push('D3-ISS-04','D3-ISS-07','D3-ISS-09');
  if(change.change_id.startsWith('D3-LEGAL-'))ids.push('D3-ISS-05','D3-ISS-07','D3-ISS-09');
  if(/^D3-(QA|READINESS|PUBLISH)-/.test(change.change_id))ids.push('D3-ISS-10','D3-ISS-13','D3-ISS-14');
  return [...new Set(ids)];
};

const genericNodes=[];
for(const change of allChanges){
  if(pc01Set.has(change.change_id))continue;
  const branchRef=sceneToBranch[change.scenario_id];
  const topicRef=branchDefinitions.find(([id])=>id===branchRef)[3][0];
  if(change.change_type!=='Proposed addition')genericNodes.push({
    node_id:`CURRENT-${change.change_id}`,
    side:'current',
    branch_ref:branchRef,
    topic_ref:topicRef,
    label_i18n:{'zh-CN':change.work,'en-AU':`${change.current_process_codes.join('/')} Current work`,'en-US':`${change.current_process_codes.join('/')} Current work`},
    explanation_i18n:{'zh-CN':change.current_work,'en-AU':change.current_work,'en-US':change.current_work},
    source_occurrence_refs:[...change.current_source_refs],
    change_refs:[change.change_id],
    actor_refs:[...change.current_actors],
    input_refs:[],output_refs:[],decision_refs:[],wait_refs:[],dependency_refs:[],
    control_invariants:[change.human_or_rule_boundary],
    pain_refs:[],
    evidence_status:'source_observed'
  });
  genericNodes.push({
    node_id:`TOBE-${change.change_id}`,
    side:'target',
    branch_ref:branchRef,
    topic_ref:topicRef,
    label_i18n:{'zh-CN':change.work,'en-AU':`${change.target_process_codes.join('/')} To-be work`,'en-US':`${change.target_process_codes.join('/')} To-be work`},
    explanation_i18n:{'zh-CN':change.after_proposal,'en-AU':change.after_proposal,'en-US':change.after_proposal},
    source_occurrence_refs:[...change.target_source_refs],
    change_refs:[change.change_id],
    actor_refs:[...change.target_actors_in_map],
    input_refs:[],output_refs:[],decision_refs:[],wait_refs:[],dependency_refs:[],
    control_invariants:[change.human_or_rule_boundary],
    pain_refs:[],
    evidence_status:'provisional_author_mapping_not_bank_validated'
  });
}

export const nodes=deepFreeze([...genericNodes,...pc01Nodes]);

const mappingFor=change=>{
  const proposed=change.change_type==='Proposed addition';
  const custom=pc01MappingMembers[change.change_id];
  const branchRef=sceneToBranch[change.scenario_id];
  const copy=mappingCopy[change.change_id];
  return {
    mapping_id:`MAP-${change.change_id}`,
    branch_ref:branchRef,
    scene_refs:[change.scenario_id],
    change_refs:[change.change_id],
    before_node_refs:custom?.before_node_refs??(proposed?[]:[`CURRENT-${change.change_id}`]),
    after_node_refs:custom?.after_node_refs??[`TOBE-${change.change_id}`],
    relation_cardinality:custom?.relation_cardinality??(proposed?'0_to_1':'1_to_1'),
    primary_change_type:change.change_type,
    secondary_change_types:[],
    rationale_i18n:copy?.rationale??{
      'zh-CN':`D3原始变化 ${change.change_id} 的暂定作者映射；保留来源疑问，未作银行验证。`,
      'en-AU':`Provisional author mapping for original D3 change ${change.change_id}; source questions remain unresolved and this is not bank validation.`,
      'en-US':`Provisional author mapping for original D3 change ${change.change_id}; source questions remain unresolved and this is not bank validation.`
    },
    change_summary_i18n:copy?.change??{
      'zh-CN':change.after_proposal,
      'en-AU':change.after_proposal,
      'en-US':change.after_proposal
    },
    mapping_status:pc01Set.has(change.change_id)?'pc01_author_approved':'provisional_author_mapping',
    pc01:pc01Set.has(change.change_id),
    context_source_refs:proposed?[...change.current_source_refs]:[],
    reconciliation_issue_refs:issuesFor(change),
    current_source_refs:[...change.current_source_refs],
    target_source_refs:[...change.target_source_refs],
    current_actor_refs:[...change.current_actors],
    target_actor_refs:[...change.target_actors_in_map],
    source_format_flags:[...change.source_format_flags],
    field_deltas:[...change.field_deltas],
    human_or_rule_boundary:change.human_or_rule_boundary,
    after_provenance:{...change.after_provenance,benchmark_refs:[...change.after_provenance.benchmark_refs]},
    bank_questions:[...change.bank_questions],
    bank_validated:false
  };
};

export const mappings=deepFreeze(allChanges.map(mappingFor));

export const branches=deepFreeze(branchDefinitions.map(([branch_id,stage_refs,scenario_refs,topic_refs],index)=>{
  const primary_change_refs=mappings.filter(mapping=>mapping.branch_ref===branch_id).flatMap(mapping=>mapping.change_refs);
  const source_refs=[...new Set(mappings.filter(mapping=>mapping.branch_ref===branch_id).flatMap(mapping=>[...mapping.current_source_refs,...mapping.target_source_refs]))];
  return {
    branch_id,
    title_i18n:branchTitles[branch_id],
    stage_refs,
    scenario_refs,
    primary_change_refs,
    topic_refs,
    source_refs,
    display_order:index+1,
    registry_status:primary_change_refs.every(id=>pc01Set.has(id))?'pc01_author_approved':'provisional_author_taxonomy',
    bank_validated:false
  };
}));

const branchById=new Map(branches.map(branch=>[branch.branch_id,branch]));
const nodeById=new Map(nodes.map(workNode=>[workNode.node_id,workNode]));
const referenceById=new Map(transformationReferences.map(reference=>[reference.alias,reference]));
const issueIds=new Set(transformationIssues.map(issue=>issue.issue_id));
const sourceIds=new Set(transformationSources.map(source=>source.source_id));
const sourceRefPattern=/^PPT-S[12]-SH\d+-(?:A\d+|EX)$/;

const same=(left,right)=>JSON.stringify(left)===JSON.stringify(right);

export function validateRegistry(registry={branches,mappings,nodes}){
  const registryBranches=registry.branches??[];
  const registryMappings=registry.mappings??[];
  const registryNodes=registry.nodes??[];
  const branchIds=new Set(registryBranches.map(branch=>branch.branch_id));
  if(branchIds.size!==registryBranches.length)throw new Error('duplicate branch id');
  const registryNodeIds=new Set(registryNodes.map(workNode=>workNode.node_id));
  if(registryNodeIds.size!==registryNodes.length)throw new Error('duplicate node id');
  const mappingIds=new Set(registryMappings.map(mapping=>mapping.mapping_id));
  if(mappingIds.size!==registryMappings.length)throw new Error('duplicate mapping id');
  if(registryBranches.length!==branchDefinitions.length)throw new Error('registry does not contain the prescribed branch set');
  for(const [branchId,stageRefs,scenarioRefs,topicRefs] of branchDefinitions){
    const branch=registryBranches.find(candidate=>candidate.branch_id===branchId);
    if(!branch)throw new Error(`missing prescribed branch ${branchId}`);
    if(!same(branch.stage_refs,stageRefs))throw new Error(`${branchId} changed prescribed stage_refs`);
    if(!same(branch.scenario_refs,scenarioRefs))throw new Error(`${branchId} changed prescribed scenario_refs`);
    if(!same(branch.topic_refs,topicRefs))throw new Error(`${branchId} changed prescribed topic_refs`);
  }

  const validateSources=refs=>{
    for(const ref of refs){
      if(!sourceRefPattern.test(ref))throw new Error(`invalid source ref ${ref}`);
      if(!sourceIds.has(ref))throw new Error(`unknown source ref ${ref}`);
    }
  };
  for(const workNode of registryNodes){
    if(!branchIds.has(workNode.branch_ref))throw new Error(`unknown branch ${workNode.branch_ref}`);
    validateSources(workNode.source_occurrence_refs??[]);
  }

  const assignments=new Map();
  for(const mapping of registryMappings){
    if(!branchIds.has(mapping.branch_ref))throw new Error(`unknown branch ${mapping.branch_ref}`);
    for(const ref of [...mapping.before_node_refs,...mapping.after_node_refs])if(!registryNodeIds.has(ref))throw new Error(`unknown node ${ref}`);
    validateSources([...(mapping.current_source_refs??[]),...(mapping.target_source_refs??[]),...(mapping.context_source_refs??[])]);
    for(const issueRef of mapping.reconciliation_issue_refs??[])if(!issueIds.has(issueRef))throw new Error(`unknown reconciliation issue ${issueRef}`);
    for(const changeRef of mapping.change_refs){
      if(!sourceChangeById.has(changeRef))throw new Error(`unknown change ${changeRef}`);
      if(assignments.has(changeRef))throw new Error(`${changeRef} assigned more than once`);
      assignments.set(changeRef,mapping.branch_ref);
      const source=sourceChangeById.get(changeRef);
      const canonicalBranch=sceneToBranch[source.scenario_id];
      if(mapping.branch_ref!==canonicalBranch)throw new Error(`${changeRef} moved from canonical branch ${canonicalBranch}`);
      if(!same(mapping.scene_refs,[source.scenario_id]))throw new Error(`${changeRef} changed canonical scene assignment`);
      if(mapping.primary_change_type!==source.change_type)throw new Error(`${changeRef} changed source classification`);
      if(!same(mapping.source_format_flags,source.source_format_flags)||!same(mapping.current_actor_refs,source.current_actors)||!same(mapping.target_actor_refs,source.target_actors_in_map))throw new Error(`${changeRef} changed source flags or actors`);
      if(!same(mapping.current_source_refs,source.current_source_refs)||!same(mapping.target_source_refs,source.target_source_refs))throw new Error(`${changeRef} changed exact source references`);
      if(source.change_type==='Proposed addition'){
        if(mapping.before_node_refs.length)throw new Error(`${changeRef} proposed addition has a fabricated Current predecessor`);
        if(!mapping.relation_cardinality.startsWith('0_to_'))throw new Error(`${changeRef} has invalid proposal cardinality`);
        if(!same(mapping.context_source_refs,source.current_source_refs))throw new Error(`${changeRef} did not separate Current context refs`);
      }
    }
  }
  if(assignments.size!==sourceChangeById.size)throw new Error(`registry covers ${assignments.size} of ${sourceChangeById.size} source changes`);
  for(const branch of registryBranches){
    const assigned=registryMappings.filter(mapping=>mapping.branch_ref===branch.branch_id).flatMap(mapping=>mapping.change_refs);
    if(!same(branch.primary_change_refs,assigned))throw new Error(`${branch.branch_id} primary changes disagree with mappings`);
  }
  return true;
}

validateRegistry();

export function branchForScene(id){
  return branchById.get(sceneToBranch[id])??null;
}

const localiseRecord=(record,locale,idKey)=>({
  [idKey]:record[idKey],
  statement:localeValue(record.statement_i18n,locale),
  ...(record.evidence_status?{evidence_status:record.evidence_status}:{}),
  ...(record.status?{status:record.status}:{})
});

const projectTrace=(trace,locale,sceneId,localMappingIds,localNodeIds)=>({
  trace_id:trace.trace_id,
  mapping_refs:trace.mapping_refs.filter(ref=>localMappingIds.has(ref)),
  scene_refs:trace.scene_refs.filter(ref=>ref===sceneId),
  current_node_refs:trace.current_node_refs.filter(ref=>localNodeIds.has(ref)),
  target_node_refs:trace.target_node_refs.filter(ref=>localNodeIds.has(ref)),
  external_refs:{
    lookup_scope:'registry',
    mapping_key:'mapping_id',
    node_key:'node_id',
    scene_key:'sceneId',
    mapping_refs:trace.mapping_refs.filter(ref=>!localMappingIds.has(ref)),
    scene_refs:trace.scene_refs.filter(ref=>ref!==sceneId),
    current_node_refs:trace.current_node_refs.filter(ref=>!localNodeIds.has(ref)),
    target_node_refs:trace.target_node_refs.filter(ref=>!localNodeIds.has(ref))
  },
  pain_refs:trace.pain_refs,
  opportunity_refs:trace.opportunity_refs,
  solution_refs:trace.solution_refs,
  capability_refs:trace.capability_refs,
  requirement_refs:trace.requirement_refs,
  acceptance_refs:trace.acceptance_refs,
  benchmark_use_refs:trace.benchmark_use_refs,
  pains:trace.pains.map(record=>localiseRecord(record,locale,'pain_id')),
  opportunities:trace.opportunities.map(record=>localiseRecord(record,locale,'opportunity_id')),
  solutions:trace.solutions.map(record=>localiseRecord(record,locale,'solution_id')),
  capabilities:trace.capabilities.map(record=>localiseRecord(record,locale,'capability_id')),
  requirements:trace.requirements.map(record=>localiseRecord(record,locale,'requirement_id')),
  acceptances:trace.acceptances.map(record=>localiseRecord(record,locale,'acceptance_id')),
  summary:{
    painNeed:localeValue(pc01Copy.painNeed,locale),
    opportunitySolution:localeValue(pc01Copy.opportunitySolution,locale),
    basisNext:localeValue(pc01Copy.basisNext,locale)
  }
});

export function comparisonFor(sceneId,requestedLocale='en-AU'){
  const defaultMappingId=pc01SceneDefaults[sceneId];
  if(!defaultMappingId)return null;
  const locale=requestedLocale==='zh-CN'?'zh-CN':requestedLocale==='en-US'?'en-US':'en-AU';
  const branch=branchForScene(sceneId);
  const selectedMappings=mappings.filter(mapping=>mapping.pc01&&mapping.scene_refs.includes(sceneId));
  const memberNodeIds=new Set(selectedMappings.flatMap(mapping=>[...mapping.before_node_refs,...mapping.after_node_refs]));
  const contextSources=new Set(selectedMappings.flatMap(mapping=>mapping.context_source_refs));
  for(const workNode of pc01Nodes){
    if(workNode.side==='current'&&workNode.source_occurrence_refs.some(ref=>contextSources.has(ref)))memberNodeIds.add(workNode.node_id);
  }
  const selectedNodes=nodes.filter(workNode=>memberNodeIds.has(workNode.node_id));
  const selectedMappingIds=new Set(selectedMappings.map(mapping=>mapping.mapping_id));
  const selectedTraces=pc01Traces.filter(trace=>trace.mapping_refs.some(ref=>selectedMappingIds.has(ref)));
  const benchmarkRefs=[...new Set(selectedMappings.flatMap(mapping=>mapping.after_provenance.benchmark_refs))];
  const projected=deepFreeze({
    branch:{...branch,title:localeValue(branch.title_i18n,locale)},
    sceneId,
    defaultMappingId,
    checkpoint:{
      ...pc01Checkpoint,
      description:localeValue(pc01Checkpoint.description_i18n,locale),
      input_manifest:localeValue(pc01Checkpoint.input_manifest_i18n,locale),
      compared_work_goal:localeValue(pc01Checkpoint.compared_work_goal_i18n,locale)
    },
    topics:branch.topic_refs.map(topicId=>({topicId,title:localeValue(topicTitles[topicId],locale)})),
    nodes:selectedNodes.map(workNode=>({...workNode,label:localeValue(workNode.label_i18n,locale),explanation:localeValue(workNode.explanation_i18n,locale)})),
    mappings:selectedMappings.map(mapping=>({...mapping,rationale:localeValue(mapping.rationale_i18n,locale),changeSummary:localeValue(mapping.change_summary_i18n,locale)})),
    traces:selectedTraces.map(trace=>projectTrace(trace,locale,sceneId,selectedMappingIds,memberNodeIds)),
    references:benchmarkRefs.map(referenceRef=>{
      const raw=referenceById.get(referenceRef);
      const displayCopy=referenceCopy[referenceRef];
      return {
        reference_ref:referenceRef,
        raw,
        display:{
          title:raw.title,
          observation:localeValue(displayCopy?.observation??{'zh-CN':raw.observation,'en-AU':raw.observation,'en-US':raw.observation},locale),
          adaptation:localeValue(displayCopy?.adaptation??{'zh-CN':raw.adaptation,'en-AU':raw.adaptation,'en-US':raw.adaptation},locale),
          limits:localeValue(displayCopy?.limits??{'zh-CN':raw.limits,'en-AU':raw.limits,'en-US':raw.limits},locale)
        },
        inherited_verification_status:raw.sourceStatus,
        release_visibility:raw.url?'public_reference':'internal_design_reference'
      };
    }),
    revision:{
      contentVersion:'d3a-pc01-author-r1',
      sourceVersion:'D3-v0.2',
      locale,
      authorStatus:'approved_pc01_direction',
      mappingClassificationIsBusinessState:false,
      bankValidated:false,
      implementationExecuted:false
    }
  });
  return projected;
}
