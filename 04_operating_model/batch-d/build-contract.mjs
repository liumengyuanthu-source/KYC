/** Batch D additive candidate contract; generated artifacts are not a production schema. */
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createBatchD,specialistProjection,specialistAction,D_IDS} from '../../prototype/specialist-engine.mjs';
const here=new URL('./',import.meta.url), status='additive_candidate_not_production_merged_schema';
const models={
  ConflictReview:{collection:'conflictReviews',fields:'conflict_review_id case_scope_ref party_refs trigger_basis_ref search_scope_ref finding_refs review_status decision_ref clearance_status hold_refs revision',aliases:{conflict_review_id:'id'}},
  ConflictFinding:{collection:'conflictFindings',fields:'finding_id conflict_review_ref finding_type source_ref summary materiality_status assigned_role_ref resolution_status decision_ref restricted_detail_ref',aliases:{finding_id:'id'}},
  CreditAssessment:{collection:'creditAssessments',fields:'credit_assessment_id case_scope_ref counterparty_ref product_scope_ref applicability financial_data_refs exposure_data_refs assessment_status decision_ref condition_refs approval_ref revision',aliases:{credit_assessment_id:'id'}},
  CreditCondition:{collection:'creditConditions',fields:'credit_condition_id credit_assessment_ref condition_type condition_text applicability status effective_scope agreement_input_required satisfied_by_refs',aliases:{credit_condition_id:'id'}},
  LegalAgreement:{collection:'legalAgreements',fields:'agreement_id case_scope_ref agreement_type party_refs product_scope_refs agreement_revision credit_input_revision draft_status review_status approval_status execution_status signatory_authority_refs executed_document_ref',aliases:{agreement_id:'id'}},
  ProfessionalCondition:{collection:'clearanceConditions',fields:'condition_id domain case_scope_ref applicability condition_status blocking_scope owner_role_ref dependency_refs decision_refs evidence_refs last_changed_at',aliases:{condition_id:'id',case_scope_ref:'case_scope_id',condition_status:'status',owner_role_ref:'owner_role',last_changed_at:'updated_at'}},
  DependencyEdge:{collection:'dependencies',fields:'dependency_id from_object_ref from_revision to_object_ref to_revision dependency_type dependency_condition impact_scope status created_from_ref validation_status',aliases:{dependency_id:'id'}},
  Hold:{collection:'holds',fields:'hold_id case_scope_ref target_object_ref hold_scope reason_code trigger_ref owner_role_ref applied_at release_condition released_at release_decision_ref',aliases:{hold_id:'id'}},
  AgreementInput:{collection:'agreementInputs',fields:'id revision credit_decision_ref credit_decision_revision credit_condition_ref credit_condition_revision condition_text agreement_ref status',aliases:{}},
  Decision:{collection:'decisions',fields:'id decision_type outcome record_status approval_role_ref demo_role_ref bank_authority_ref input_revisions',aliases:{}}
};
const enums={applicability:['required','not_required','unknown'],hold_scope:['task','branch','case','unknown'],
  search_status:['complete','pending','unknown'],clearance_status:['pending','recorded','unknown'],
  assessment_status:['complete','pending','unknown'],approval_status:['approved_subject_to_condition','internally_approved','pending','unknown'],
  execution_status:['pending','executed','unknown'],validation_status:['reviewed_for_demo','unknown'],
  materiality_status:['unknown','under_review'],resolution_status:['open','resolved','unknown']};
export const literalOracle={source_ref:'SRC-019',status:'independently_authored_literal_expectations',expected:{
  entry:{case_id:'DEMO-CTT-001',conflicts_search:'complete',conflict_finding:'open',conflicts_clearance:'pending',credit_applicability:'required',
    credit_approval:'approved_subject_to_condition',legal_agreement_revision:3,legal_credit_input_revision:1,legal_input_currency:'current',legal_approval:'internally_approved',legal_execution:'pending',signatory_authority:'unknown',readiness:'not_ready'},
  credit_changed:{credit_revision:2,agreement_input_revision:2,legal_agreement_revision:3,legal_credit_input_revision:1,legal_input_currency:'superseded',readiness:'not_ready'},
  permission_unknown:{allowed:false},not_required:{credit_approved:false},applicability_unknown:{credit_approved:false},
  legal_dependency_unknown:{legal_drafting_allowed:false,legal_impact:'unknown',credit_assessment_allowed:true},
  incomplete_current_credit_terms:{incorporate_credit_allowed:false},legal_product_scope_missing:{legal_intake_allowed:false},
  restricted_views:{rm_conflict_detail:false,client_conflict_detail:false},hold:{task_is_case:false,branch_is_case:false,unknown_is_unaffected:false}}};

export function validateCandidate(s){
  const errors=[];
  for(const [object,model]of Object.entries(models)){
    const records=s[model.collection];
    if(!Array.isArray(records)){errors.push(`${model.collection}: array required`);continue;}
    for(const item of records.filter(x=>x.source_refs?.includes('SRC-019'))){
      for(const logical of model.fields.split(' ')){
        const field=model.aliases[logical]||logical;if(!Object.hasOwn(item,field))errors.push(`${item.id}.${field}: ${object} required field missing`);
        if(enums[field]&&Object.hasOwn(item,field)&&!enums[field].includes(item[field]))errors.push(`${item.id}.${field}: invalid enum`);
      }
      if(item.case_id!==s.case.id||item.case_scope_id!==s.scopes[0].id)errors.push(`${item.id}: case/scope mismatch`);
      if(!Number.isSafeInteger(item.revision)||item.revision<1)errors.push(`${item.id}: invalid revision`);
    }
  }
  const p=specialistProjection(s,{role:'ROLE-FACILITATOR'});
  if(!p.available)errors.push('Invalid D context');
  if(p.readiness?.result!=='not_ready')errors.push('Candidate must retain unresolved upstream readiness');
  const records=[s.case,...Object.values(s).filter(Array.isArray).flat()];
  for(const edge of s.dependencies.filter(x=>x.source_refs?.includes('SRC-019'))){
    for(const [ref,revision]of [[edge.from_object_ref,edge.from_revision],[edge.to_object_ref,edge.to_revision]])
      if(!records.some(x=>x.id===ref&&x.revision===revision)&&!(ref===s.case.id&&revision<=s.case.revision))errors.push(`${edge.id}: unresolved version ${ref}@${revision}`);
    if(edge.source_aliases.some(x=>x==='SRC-010:DEP-07'))errors.push(`${edge.id}: DEP namespace collision`);
  }
  return {status,valid:errors.length===0,errors};
}

export function buildArtifacts(){
  const upstream=JSON.parse(readFileSync(new URL('../batch-c/screening-snapshots.json',here),'utf8')).snapshots['C-referred'];
  const entry=createBatchD(upstream), command={type:'revise_credit',role:'ROLE-FACILITATOR',expectedRevision:entry.case.revision,
    expectedScopeRevision:entry.scopes[0].revision,expectedInputRevisions:specialistProjection(entry,{role:'ROLE-FACILITATOR'}).inputRevisions,
    key:'D-CONTRACT:CREDIT-REVISION-02',rationale:'Demonstrate current Legal agreement consuming superseded synthetic Credit input',at:'2026-09-07T12:01:00Z'};
  const changed=specialistAction(entry,command),snapshots={'D-entry':entry,'D-credit-changed':changed};
  const fields=[];
  for(const [object,model]of Object.entries(models)){
    const records=Object.values(snapshots).flatMap(s=>s[model.collection]).filter(x=>x.source_refs?.includes('SRC-019'));
    const logicalFields=new Set([...model.fields.split(' '),...records.flatMap(Object.keys)]);
    for(const field of logicalFields){
      const physical=model.aliases[field]||field,values=records.filter(x=>Object.hasOwn(x,physical)).map(x=>x[physical]);
      fields.push({object,collection:model.collection,field,physical_field:physical,
        definition:object==='ProfessionalCondition'?'Projection of existing condition ID; no independent readiness store':`${object} ${field.replaceAll('_',' ')} in the scoped synthetic extension`,
        type_format:[...new Set(values.map(v=>v===null?'null':Array.isArray(v)?'array':Number.isInteger(v)?'integer':typeof v))].join('|')||'reference|null',
        required:model.fields.split(' ').includes(field),nullable:values.includes(null),enum:enums[physical]||null,
        origin_provenance:'SRC-019 §5; explicit authored demo fixture or facilitator revision simulation',
        authority_basis:'Bank authority unknown; no approval/execution/clearance writer',
        editable_by:'Guarded ROLE-FACILITATOR revise_credit simulation only where affected; otherwise read-only',
        revision_behavior:object==='ProfessionalCondition'?'Retain prior physical revision in conditionHistory, update same condition ID':'Append revised Credit/AgreementInput/Decision records; prior versions unchanged',
        dependencies:['Current case/scope revision','Source-qualified dependencies','Configured demo permission','Applicable scoped holds'],
        visibility_sensitivity:object==='ConflictFinding'?'Detail allowlist ROLE-CONFLICTS / ROLE-FACILITATOR; progress only for other configured roles':'Read-only allowlisted projection; raw records are internal synthetic fixture data',
        ui_binding:object==='ProfessionalCondition'?'Shared Condition Detail / same projection in all lenses':object.includes('Conflict')?'SCN-CONFLICTS':'SCN-CREDIT / SCN-LEGAL / DG-D02',
        source_refs:['SRC-019:5'],synthetic_example:values.find(v=>v!==null)??null});
    }
  }
  const schema={$schema:'https://json-schema.org/draft/2020-12/schema',title:'Batch D additive candidate schema',status,type:'object',additionalProperties:true,
    required:[...new Set(Object.values(models).map(x=>x.collection))],properties:Object.fromEntries(Object.values(models).map(model=>[model.collection,{type:'array',items:{
      type:'object',if:{required:['source_refs'],properties:{source_refs:{contains:{const:'SRC-019'}}}},then:{
        required:[...new Set(['id','case_id','case_scope_id','revision',...model.fields.split(' ').map(f=>model.aliases[f]||f)])],additionalProperties:true,
        properties:{id:{type:'string'},case_id:{const:'DEMO-CTT-001'},revision:{type:'integer',minimum:1},
          ...Object.fromEntries(Object.entries(enums).map(([field,values])=>[field,{enum:values}]))}}}}]))};
  const crosswalk={source_ref:'SRC-019',relations:[
    {relation:'Conflicts start',aliases:['SRC-009:DEP-01','SRC-010:DEP-01']},
    {relation:'Legal preparation',aliases:['SRC-009:DEP-05','SRC-010:DEP-09']},
    {relation:'Credit preparation',aliases:['SRC-009:DEP-06','SRC-010:DEP-10']},
    {relation:'Credit to Legal',aliases:['SRC-009:DEP-07'],refined_by:'SRC-019:3/5',not_equivalent:'SRC-010:DEP-07 is screening review'},
    {relation:'Readiness contribution',aliases:['SRC-009:DEP-11','SRC-010:DEP-12']},
    {relation:'Scoped hold',aliases:['SRC-010:DEP-14'],refined_by:'SRC-019:4/5'}],
    compatibility_aliases:{'DependencyEdge.from_object_ref':'dependencies.from_ref','DependencyEdge.to_object_ref':'dependencies.to_ref',
      'Hold.target_object_ref':'holds.object_scope_refs[0]','Hold.hold_scope':'holds.scope','Hold.trigger_ref':'holds.basis_ref',
      'Hold.release_condition':'holds.release_condition_ref (source-qualified rule; text is separate)'},
    object_aliases:{'CD-01':D_IDS.creditDecision,'CC-01':D_IDS.creditCondition,'AI-01':D_IDS.agreementInput,'AGR-01':D_IDS.agreement}};
  const actionContract={source_ref:'SRC-019',supported_writers:['revise_credit'],role:'ROLE-FACILITATOR',
    host_guard:'After D fixture entry route only specialistAction; disable legacy A/B/C writers for the D session. Restore the archived C session before resuming upstream actions. Legacy case-engine.act updates all dependency statuses and is not D-aware.',
    prerequisite_rules:'Activity eligibility checks applicable source-qualified prerequisite edges as well as holds; unknown edge status/impact/validation stays unknown and unresolved edges block only affected work. Legal product references must be nonempty and within the current scope. Credit incorporation requires current scoped decision, condition and AgreementInput revisions with nonempty matching terms.',
    required_fields:['type','role','expectedRevision','expectedScopeRevision','expectedInputRevisions','key','rationale'],optional_fields:['at'],
    arbitrary_terms_amounts_policy:'rejected',approval_execution_clearance_writers:[],
    idempotency:'Same key and identical full command returns current input; changed payload rejected',
    concurrency:'Exact case/scope revisions and complete input revision/fingerprint map; changes including unversioned input/config/holds rejected',
    history:'Append CreditAssessment, CreditCondition, AgreementInput and Decision; retain Legal revision 03 consuming input 01',
    errors:'Stable Error.code; input unchanged on error',runtime_event_type:'revise_credit',authored_fixture_is_not_runtime_event:true};
  const eInterface={source_ref:'SRC-019:14',status:'interface_only_no_batch_e_implementation',case_id:'DEMO-CTT-001',
    condition_store:'clearanceConditions',condition_ids:[D_IDS.conflictsCondition,D_IDS.creditConditionResult,D_IDS.legalCondition],
    professional_condition_fields:models.ProfessionalCondition.fields.split(' '),readiness_derivation:'Existing case-engine.readiness; not_ready while upstream C/QA and specialist conditions remain unresolved',
    screening:'Scoped review recorded; population and coverage open',conflicts:'Specialist review pending',credit:'Condition approved; versioned Legal input available',
    legal:'Internal approval authored; execution pending; revision currency must be checked',qa:'Not final',bank_authority:'unknown',
    no_execution_signatory_inference:true,no_completion_percentage:true,no_automatic_clearance:true};
  const validations=Object.entries(snapshots).map(([snapshot,s])=>({snapshot,...validateCandidate(s)}));
  return {snapshots,actions:[{adapter:'specialistAction',command}],fields,schema,oracle:literalOracle,crosswalk,actionContract,eInterface,
    validation:{status,valid:validations.every(x=>x.valid),snapshots:validations},
    contract:{status,source_ref:'SRC-019',models:Object.fromEntries(Object.entries(models).map(([k,v])=>[k,v.collection])),
      entry_fixture:'Explicit authored extension of actual C-referred-compatible case; no A/B/C completion',
      unknowns:['Bank booking context remains unchanged and unknown','Bank approval role/policy unknown','Signatory authority unknown'],
      minimum_context:'SRC-019 approved synthetic starting-state basis permits preparation in demo only; actual booking_entity_ref and policy_profile_ref remain null',
      history:'Revision 03 Legal is authored entry. Earlier Legal revisions are not supplied and are not fabricated. Credit revision simulation retains prior inputs.',
      action_contract:actionContract}};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
  const a=buildArtifacts();if(!a.validation.valid)throw Error(JSON.stringify(a.validation));
  for(const [name,value]of Object.entries({'specialist-snapshots.json':{source_ref:'SRC-019',snapshots:a.snapshots,actions:a.actions},
    'field-dictionary.json':a.fields,'candidate-schema.json':a.schema,'literal-oracle.json':a.oracle,'source-alias-crosswalk.json':a.crosswalk,
    'action-contract.json':a.actionContract,'downstream-e-interface.json':a.eInterface,'specialist-contract.json':a.contract,'validation.json':a.validation}))
    writeFileSync(new URL(name,here),JSON.stringify(value,null,2)+'\n');
  writeFileSync(new URL('README.md',here),'# Batch D candidate operating model\n\nGenerated by `node 04_operating_model/batch-d/build-contract.mjs`. These are additive candidate artifacts, not a production schema or bank approvals.\n\nThe two snapshots extend the same C-referred case explicitly. D-entry has authored specialist starting states; D-credit-changed contains one guarded facilitator revision simulation. Credit input revision 01 remains consumed by Legal revision 03 after current input becomes revision 02. Earlier Legal revisions are not supplied.\n\nProfessionalCondition projects the three existing clearanceConditions IDs. Prior revisions are retained in conditionHistory. Holds preserve C-compatible scope and action fields. Unknown bank policy, booking and signatory authority stay unknown. E is an interface only.\n');
  console.log(JSON.stringify({valid:a.validation.valid,snapshots:Object.keys(a.snapshots).length,fields:a.fields.length,actions:a.actions.length}));
}
