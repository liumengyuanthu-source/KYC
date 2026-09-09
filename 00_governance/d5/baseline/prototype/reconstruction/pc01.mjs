import {nodeCopy,pc01Copy} from './copy.mjs';

export const pc01ChangeIds=[
  'D3-REQUIREMENTS-01',
  'D3-REQUIREMENTS-03',
  'D3-SOURCE-03',
  'D3-GAP-01',
  'D3-GAP-03',
  'D3-GAP-05',
  'D3-VALIDATE-04'
];

export const pc01SceneDefaults={
  'SCN-REQUIREMENTS':'MAP-D3-REQUIREMENTS-01',
  'SCN-SOURCE':'MAP-D3-SOURCE-03',
  'SCN-GAP':'MAP-D3-GAP-01',
  'SCN-VALIDATE':'MAP-D3-VALIDATE-04'
};

const node=(node_id,{side,branch_ref,topic_ref,sources=[],changes=[],actors=[],outputs=[],dependencies=[],controls=[],pain_refs=[]})=>({
  node_id,
  side,
  branch_ref,
  topic_ref,
  label_i18n:nodeCopy[node_id].label,
  explanation_i18n:nodeCopy[node_id].explanation,
  source_occurrence_refs:sources,
  change_refs:changes,
  actor_refs:actors,
  input_refs:['PC01-SHARED-INPUT-01'],
  output_refs:outputs,
  decision_refs:[],
  wait_refs:[],
  dependency_refs:dependencies,
  control_invariants:controls,
  pain_refs,
  evidence_status:side==='current'?'source_observed':'design_hypothesis_not_bank_validated'
});

export const pc01Nodes=[
  node('CURRENT-BR03-M2.1-DETERMINE-REQUIREMENTS',{
    side:'current',branch_ref:'BR-03',topic_ref:'TOPIC-BR03-APPLICABILITY',sources:['PPT-S1-SH18-A1'],changes:['D3-REQUIREMENTS-01'],actors:['CLIENT FULFILMENT / KYC OPS'],outputs:['requirements-and-reliefs'],controls:['Applicability judgement is retained; the source does not define its detailed rules.']
  }),
  node('CURRENT-BR03-M2.3-CONSOLIDATE-REQUIREMENTS',{
    side:'current',branch_ref:'BR-03',topic_ref:'TOPIC-BR03-REQUIREMENT-SET',sources:['PPT-S1-SH18-A3'],changes:['D3-REQUIREMENTS-03'],actors:['CLIENT FULFILMENT / KYC OPS'],outputs:['consolidated-requirements']
  }),
  node('CURRENT-BR04-M3.1-SOURCE-INFORMATION',{
    side:'current',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-SOURCING',sources:['PPT-S1-SH292-A1'],actors:['CLIENT FULFILMENT / KYC OPS'],outputs:['sourced-information'],controls:['Only actually permitted and available sources may be used.']
  }),
  node('CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE',{
    side:'current',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-USE-ASSESSMENT',sources:['PPT-S1-SH292-A4'],changes:['D3-GAP-05','D3-VALIDATE-04'],actors:['CLIENT FULFILMENT / KYC OPS'],outputs:['captured-and-validated-evidence'],controls:['Complex sufficiency remains a human judgement where criteria or authority are unresolved.']
  }),
  node('CURRENT-BR05-M3.2-IDENTIFY-RESIDUAL-GAPS',{
    side:'current',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-GAPS',sources:['PPT-S1-SH292-A2'],changes:['D3-GAP-01'],actors:['CLIENT FULFILMENT / KYC OPS'],outputs:['residual-gaps']
  }),
  node('CURRENT-BR05-M3.3-REQUEST-INFORMATION',{
    side:'current',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-RESPONSES',sources:['PPT-S1-SH292-A3','PPT-S1-SH9-A1'],changes:['D3-GAP-05'],actors:['CLIENT FULFILMENT / KYC OPS','SALES / RM (Front Office)'],outputs:['client-information-response']
  }),
  node('TOBE-D3-REQUIREMENTS-01-RULE',{
    side:'target',branch_ref:'BR-03',topic_ref:'TOPIC-BR03-APPLICABILITY',sources:['PPT-S2-SH18-A1'],changes:['D3-REQUIREMENTS-01'],actors:['Agentic execution'],outputs:['purpose-bound-requirement'],controls:['No rule means no apparently authoritative requirement.'],pain_refs:['PAIN-PC01-CONTEXT-REWORK']
  }),
  node('TOBE-D3-REQUIREMENTS-01-REVIEW',{
    side:'target',branch_ref:'BR-03',topic_ref:'TOPIC-BR03-APPLICABILITY',sources:['PPT-S2-SH18-A1'],changes:['D3-REQUIREMENTS-01'],actors:['Agentic execution'],outputs:['applicability-review-work'],controls:['Unresolved applicability is reviewed rather than inferred.']
  }),
  node('TOBE-D3-REQUIREMENTS-03-REQUIREMENT-SET',{
    side:'target',branch_ref:'BR-03',topic_ref:'TOPIC-BR03-REQUIREMENT-SET',sources:['PPT-S2-SH18-A3'],changes:['D3-REQUIREMENTS-03'],actors:['Agentic execution'],outputs:['versioned-requirement-set'],dependencies:['TOBE-D3-REQUIREMENTS-01-RULE'],pain_refs:['PAIN-PC01-CONTEXT-REWORK']
  }),
  node('TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS',{
    side:'target',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-CLAIMS',sources:['PPT-S2-SH292-A1','PPT-S2-SH292-A4'],changes:['D3-SOURCE-03'],actors:['Agentic execution'],outputs:['candidate-evidence-claims'],controls:['Extraction confidence is not identity or sufficiency.'],pain_refs:['PAIN-PC01-PURPOSE-CLARITY']
  }),
  node('TOBE-D3-SOURCE-03-CONFIRMED-VALUES',{
    side:'target',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-CLAIMS',sources:['PPT-S2-SH292-A1','PPT-S2-SH292-A4'],changes:['D3-SOURCE-03'],actors:['Agentic execution'],outputs:['confirmed-usable-values'],dependencies:['TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS'],controls:['Only appropriately confirmed claims become downstream values.']
  }),
  node('TOBE-D3-GAP-01-SPECIFIC-GAP',{
    side:'target',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-GAPS',sources:['PPT-S2-SH292-A2'],changes:['D3-GAP-01'],actors:['Agentic execution'],outputs:['specific-residual-gap'],dependencies:['TOBE-D3-VALIDATE-04-USE-ASSESSMENT'],pain_refs:['PAIN-PC01-PURPOSE-CLARITY']
  }),
  node('TOBE-D3-GAP-03-RECIPIENT',{
    side:'target',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-RECIPIENTS',sources:['PPT-S2-SH292-A3'],changes:['D3-GAP-03'],actors:['Agentic execution'],outputs:['reviewed-recipient'],controls:['Coordination authority does not grant signing or trading authority.'],pain_refs:['PAIN-PC01-PURPOSE-CLARITY']
  }),
  node('TOBE-D3-GAP-03-LIMITED-GRANT',{
    side:'target',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-RECIPIENTS',sources:['PPT-S2-SH292-A3'],changes:['D3-GAP-03'],actors:['Agentic execution'],outputs:['candidate-limited-access'],dependencies:['TOBE-D3-GAP-03-RECIPIENT'],controls:['Forwarding does not transfer access; actual provisioning authority remains unresolved.']
  }),
  node('TOBE-D3-GAP-05-PARTIAL-RESPONSE',{
    side:'target',branch_ref:'BR-05',topic_ref:'TOPIC-BR05-RESPONSES',sources:['PPT-S2-SH292-A3','PPT-S2-SH292-A4'],changes:['D3-GAP-05'],actors:['Agentic execution'],outputs:['item-response-and-receipt'],dependencies:['TOBE-D3-GAP-03-LIMITED-GRANT'],controls:['Submitting one item does not close another open gap.'],pain_refs:['PAIN-PC01-CONTEXT-REWORK']
  }),
  node('TOBE-D3-VALIDATE-04-USE-ASSESSMENT',{
    side:'target',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-USE-ASSESSMENT',sources:['PPT-S2-SH292-A4'],changes:['D3-VALIDATE-04'],actors:['Agentic execution'],outputs:['purpose-specific-use-assessment'],dependencies:['TOBE-D3-SOURCE-03-CONFIRMED-VALUES'],pain_refs:['PAIN-PC01-PURPOSE-CLARITY']
  }),
  node('TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY',{
    side:'target',branch_ref:'BR-04',topic_ref:'TOPIC-BR04-USE-ASSESSMENT',sources:['PPT-S2-SH281-EX','PPT-S2-SH392-EX'],changes:['D3-VALIDATE-04'],actors:['CLIENT FULFILMENT / KYC OPS — Human in the Loop'],outputs:['bounded-sufficiency-judgement'],dependencies:['TOBE-D3-VALIDATE-04-USE-ASSESSMENT'],controls:['Complex sufficiency and exceptions remain with an appropriately authorised person.']
  })
];

export const pc01MappingMembers={
  'D3-REQUIREMENTS-01':{before_node_refs:['CURRENT-BR03-M2.1-DETERMINE-REQUIREMENTS'],after_node_refs:['TOBE-D3-REQUIREMENTS-01-RULE','TOBE-D3-REQUIREMENTS-01-REVIEW'],relation_cardinality:'1_to_many'},
  'D3-REQUIREMENTS-03':{before_node_refs:['CURRENT-BR03-M2.3-CONSOLIDATE-REQUIREMENTS'],after_node_refs:['TOBE-D3-REQUIREMENTS-03-REQUIREMENT-SET'],relation_cardinality:'1_to_1'},
  'D3-SOURCE-03':{before_node_refs:[],after_node_refs:['TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS','TOBE-D3-SOURCE-03-CONFIRMED-VALUES'],relation_cardinality:'0_to_many'},
  'D3-GAP-01':{before_node_refs:['CURRENT-BR05-M3.2-IDENTIFY-RESIDUAL-GAPS'],after_node_refs:['TOBE-D3-GAP-01-SPECIFIC-GAP'],relation_cardinality:'1_to_1'},
  'D3-GAP-03':{before_node_refs:[],after_node_refs:['TOBE-D3-GAP-03-RECIPIENT','TOBE-D3-GAP-03-LIMITED-GRANT'],relation_cardinality:'0_to_many'},
  'D3-GAP-05':{before_node_refs:['CURRENT-BR05-M3.3-REQUEST-INFORMATION','CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],after_node_refs:['TOBE-D3-GAP-05-PARTIAL-RESPONSE'],relation_cardinality:'many_to_1'},
  'D3-VALIDATE-04':{before_node_refs:['CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],after_node_refs:['TOBE-D3-VALIDATE-04-USE-ASSESSMENT','TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY'],relation_cardinality:'1_to_many'}
};

const i18n=(zh,en)=>({'zh-CN':zh,'en-AU':en,'en-US':en});

export const pc01Checkpoint={
  checkpoint_id:'PC01-CHECKPOINT-01',
  case_fixture_ref:null,
  scope_revision:'D3A-PC01-AUTHOR-R1',
  scenario_ref:'PC-01',
  scene_refs:Object.keys(pc01SceneDefaults),
  shared_input_manifest_ref:'PC01-SHARED-INPUT-01',
  unknown_refs:['UNKNOWN-PERSON-T-COORDINATION-AUTHORITY','UNKNOWN-ENTITY-A-OWNERSHIP-CONTROL'],
  compared_work_goal_i18n:pc01Copy.checkpoint.workGoal,
  description_i18n:pc01Copy.checkpoint.description,
  input_manifest_i18n:pc01Copy.checkpoint.inputManifest,
  current_projection_ref:'PC01-CURRENT-AUTHOR-PROJECTION',
  target_projection_ref:'PC01-TOBE-AUTHOR-PROJECTION'
};

const support={
  painContext:{pain_id:'PAIN-PC01-CONTEXT-REWORK',statement_i18n:i18n('工作假设：Ops/RM 可能重复组织要求与补件语境；重复率尚未测量。','Working hypothesis: Ops/RM may repeatedly organise requirements and remediation context; no repetition rate has been measured.'),evidence_status:'hypothesis'},
  painPurpose:{pain_id:'PAIN-PC01-PURPOSE-CLARITY',statement_i18n:i18n('工作假设：主体与用途缺口可能不易在同一任务中读懂；尚未用银行用户验证。','Working hypothesis: subject- and purpose-specific gaps may be hard to understand in one task; this has not been validated with bank users.'),evidence_status:'hypothesis'},
  opportunity:{opportunity_id:'OPPORTUNITY-PC01-EXPLAIN-FIRST',statement_i18n:i18n('先解释哪项要求未被哪种用途证据满足，再形成有限任务，减少不必要补件。','Explain which requirement is unmet by evidence for which purpose before forming bounded tasks, reducing unnecessary remediation.')},
  solution:{solution_id:'SOLUTION-PC01-BOUNDED-CHAIN',statement_i18n:i18n('连接版本化 RequirementSet、候选 Claim、用途评估、具体 Gap 与局部响应，同时保留人工判断。','Connect a versioned RequirementSet, candidate claims, purpose assessment, specific gaps and partial responses while retaining human judgement.')},
  capability:{capability_id:'CAPABILITY-PC01-TRACEABLE-USE',statement_i18n:i18n('按主体、用途和输入版本追溯要求、资料用途与请求。','Trace requirements, evidence use and requests by subject, purpose and input revision.')},
  requirement:{requirement_id:'REQUIREMENT-PC01-SAME-INPUT',statement_i18n:i18n('Current 与 To-be 必须使用同一可访问输入，且提案不得生成隐藏资料或权限。','Current and To-be must use the same accessible inputs, and proposals must not create hidden evidence or authority.')},
  acceptance:{acceptance_id:'ACCEPTANCE-PC01-BOUNDARIES',statement_i18n:i18n('观察是否能区分协调与签约权限、提交一项后另一项保持 open，且切换视图不补齐数据。','Observe whether coordination and signing authority remain distinct, another item stays open after one submission, and switching views never fills missing data.'),status:'not_run'}
};

const trace=(id,mappingIds,sceneRefs,currentIds,targetIds,pains)=>({
  trace_id:id,
  mapping_refs:mappingIds,
  scene_refs:sceneRefs,
  current_node_refs:currentIds,
  target_node_refs:targetIds,
  pain_refs:pains.map(pain=>pain.pain_id),
  opportunity_refs:[support.opportunity.opportunity_id],
  solution_refs:[support.solution.solution_id],
  capability_refs:[support.capability.capability_id],
  requirement_refs:[support.requirement.requirement_id],
  acceptance_refs:[support.acceptance.acceptance_id],
  benchmark_use_refs:[],
  pains,
  opportunities:[support.opportunity],
  solutions:[support.solution],
  capabilities:[support.capability],
  requirements:[support.requirement],
  acceptances:[support.acceptance]
});

export const pc01Traces=[
  trace('TRACE-PC01-REQUIREMENTS',['MAP-D3-REQUIREMENTS-01','MAP-D3-REQUIREMENTS-03'],['SCN-REQUIREMENTS'],['CURRENT-BR03-M2.1-DETERMINE-REQUIREMENTS','CURRENT-BR03-M2.3-CONSOLIDATE-REQUIREMENTS'],['TOBE-D3-REQUIREMENTS-01-RULE','TOBE-D3-REQUIREMENTS-01-REVIEW','TOBE-D3-REQUIREMENTS-03-REQUIREMENT-SET'],[support.painContext]),
  trace('TRACE-PC01-EVIDENCE',['MAP-D3-SOURCE-03','MAP-D3-GAP-01','MAP-D3-VALIDATE-04'],['SCN-SOURCE','SCN-GAP','SCN-VALIDATE'],['CURRENT-BR05-M3.2-IDENTIFY-RESIDUAL-GAPS','CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],['TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS','TOBE-D3-SOURCE-03-CONFIRMED-VALUES','TOBE-D3-GAP-01-SPECIFIC-GAP','TOBE-D3-VALIDATE-04-USE-ASSESSMENT','TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY'],[support.painPurpose]),
  trace('TRACE-PC01-COLLABORATION',['MAP-D3-GAP-03','MAP-D3-GAP-05'],['SCN-GAP'],['CURRENT-BR05-M3.3-REQUEST-INFORMATION','CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE'],['TOBE-D3-GAP-03-RECIPIENT','TOBE-D3-GAP-03-LIMITED-GRANT','TOBE-D3-GAP-05-PARTIAL-RESPONSE'],[support.painContext,support.painPurpose])
];
