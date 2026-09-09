import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {applicableScreeningHolds} from '../screening-predicates.mjs';
const api = await import('../specialist-engine.mjs').catch(() => ({}));
const snapshots = JSON.parse(readFileSync(new URL('../../04_operating_model/batch-c/screening-snapshots.json',import.meta.url))).snapshots;
const base = () => structuredClone(snapshots['C-referred']);
const seed = () => { assert.equal(typeof api.createBatchD,'function','Explicit D fixture builder is required'); return api.createBatchD(base()); };
const projection = s => api.specialistProjection(s,{role:'ROLE-FACILITATOR'});
const pred = (s,activity,extra={}) => api.specialistPredicates(s,{role:'ROLE-FACILITATOR',activity,...extra});
const command = (s,extra={}) => ({type:'revise_credit',role:'ROLE-FACILITATOR',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:projection(s).inputRevisions,key:'D-CHANGE-01',rationale:'Demonstrate a new synthetic Credit input revision',at:'2026-09-07T12:01:00Z',...extra});
const code = wanted => error => error.code===wanted;

// Break caught: implicit entry overwrites upstream records or authors outcomes for a different case.
test('D entry preserves A/B/C and requires scoped unresolved C context',()=>{
  const upstream=base(), before=structuredClone(upstream), s=seed();
  assert.deepEqual(upstream,before);
  for(const name of ['scopes','entities','naturalPersons','authorities','screeningFindings','screeningReviewDecisions','requestItems','evidence','accessGrants'])assert.deepEqual(s[name],upstream[name]);
  assert.equal(s.clearanceConditions.length,7); assert.equal(s.professionalConditions,undefined);
  assert.equal(s.conditionHistory.filter(x=>x.revision===1).length,3);
  assert.equal(api.createBatchD(s),s);
  for(const mutate of [x=>x.case.id='OTHER',x=>x.scopes[0].entity_ids=['OTHER'],x=>x.screeningReviewDecisions=[],x=>x.screeningFindings.find(f=>f.id.endsWith('person-t-c01')).subject_ref='OTHER']){
    const bad=base();mutate(bad);assert.throws(()=>api.createBatchD(bad),code('D_C_CONTEXT_REQUIRED'));
  }
});
// Break caught: serial KYC gate wrongly stops independent preparation, or search implies clearance.
test('RT-D01/02/03: specialist preparation progresses with open screening and a potential conflict',()=>{
  const s=seed(), p=projection(s);
  assert.equal(p.conflict.search_status,'complete');assert.equal(p.conflict.finding_status,'open');assert.equal(p.conflict.clearance_status,'pending');
  for(const activity of ['credit_applicability','credit_assessment','legal_intake','legal_drafting'])assert.equal(pred(s,activity).allowed,true,activity);
  assert.equal(pred(s,'conflict_clearance').allowed,false);
  assert.equal(p.conditions.find(c=>c.domain==='conflicts').status,'pending');
  assert.equal(p.readiness.result,'not_ready');
});
// Break caught: assessment, applicability, approval and documentation are collapsed into one complete flag.
test('RT-D04/05/06: Credit approval remains distinct from assessment and applicability',()=>{
  const s=seed();let p=projection(s);
  assert.equal(p.credit.applicability,'required');assert.equal(p.credit.assessment_status,'complete');assert.equal(p.credit.approval_status,'approved_subject_to_condition');
  assert.equal(p.credit.documentation_status,'incorporated_not_executed');assert.equal(p.legal.execution_status,'pending');
  s.creditAssessments.at(-1).applicability='not_required';p=projection(s);
  assert.equal(p.credit.approval_status,'not_required');assert.equal(p.credit.approved,false);
  s.creditAssessments.at(-1).applicability='unknown';p=projection(s);
  assert.equal(p.credit.approval_status,'unknown');assert.equal(p.credit.approved,false);
  assert.equal(pred(s,'credit_assessment').allowed,false);
});
// Break caught: legal draft/internal approval or executed status infers signatory authority.
test('RT-D08/09/10/11: Legal execution and authority remain unmet despite internal approval',()=>{
  const s=seed(), p=projection(s);
  assert.equal(p.legal.draft_status,'complete');assert.equal(p.legal.approval_status,'internally_approved');
  assert.equal(p.legal.execution_status,'pending');assert.equal(p.legal.signatory_authority_status,'unknown');
  assert.equal(p.conditions.find(c=>c.domain==='legal').status,'pending');
  s.legalAgreements.at(-1).execution_status='executed';
  assert.equal(projection(s).legal.signatory_authority_status,'unknown');assert.equal(pred(s,'legal_execution').allowed,false);
  assert.equal(projection(s).readiness.result,'not_ready');
  for(const type of ['execute_agreement','approve_legal','approve_credit','record_conflict_clearance','clear_to_trade'])assert.throws(()=>api.specialistAction(s,command(s,{type})),code('D_ACTION_NOT_SUPPORTED'));
});
// Break caught: permissions are inferred from role names or mutable runtime configuration.
test('D unconfigured roles fail closed and only facilitator has revision simulation permission',()=>{
  const s=seed();
  for(const role of ['ROLE-RM','ROLE-CLIENT','ROLE-CREDIT','ROLE-LEGAL','ROLE-UNKNOWN',undefined]){
    assert.equal(pred(s,'revise_credit',{role}).allowed,false);
    assert.throws(()=>api.specialistAction(s,command(s,{role})),code('D_PERMISSION_REQUIRED'));
  }
  assert.equal(api.specialistProjection(s,{role:'ROLE-UNKNOWN'}).available,false);
  assert.equal(api.specialistProjection(s,{role:'ROLE-RM'}).available,true);
});
// Break caught: raw finding, audit rationale, or config fingerprints leak to public views.
test('RT-D12: RM and client get safe progress without restricted conflict detail or audit text',()=>{
  const s=seed();s.conflictFindings[0].summary='RESTRICTED-SENTINEL';s.conflictFindings[0].restricted_detail_ref='secret://SENTINEL';
  const changed=api.specialistAction(s,command(s,{rationale:'RESTRICTED-AUDIT-SENTINEL'}));
  for(const role of ['ROLE-RM','ROLE-CLIENT','ROLE-KYCOPS','ROLE-LEGAL','ROLE-CREDIT']){
    const p=api.specialistProjection(changed,{role});assert.equal(JSON.stringify(p).includes('SENTINEL'),false,role);
    assert.equal(p.conflict.finding_status,'open');assert.equal(p.conflict.detail,undefined);
  }
  assert.equal(api.specialistProjection(changed,{role:'ROLE-CONFLICTS'}).conflict.detail.summary,'RESTRICTED-SENTINEL');
});
// Break caught: a separate lens invents condition state or mutates the input.
test('RT-D13: readonly lenses share case, scope and condition revisions with mainline',()=>{
  const s=seed(), before=structuredClone(s), p=projection(s), lenses=api.specialistLenses(s,{role:'ROLE-FACILITATOR'});
  for(const lens of Object.values(lenses)){
    assert.equal(lens.caseId,'DEMO-CTT-001');assert.equal(lens.scopeId,'DEMO-CTT-001/scope/institutional');
    assert.deepEqual(lens.conditions,p.conditions);assert.deepEqual(lens.conditionRevisions,p.conditionRevisions);
  }
  assert.deepEqual(s,before);
});
// Break caught: task/branch hold broadens into case stop; unknown is treated as unaffected.
test('RT-D16/17: holds retain scope and unknown impact blocks only known affected work or remains unknown',()=>{
  const s=seed();assert.equal(applicableScreeningHolds(s,{action:'prepare_preliminary'}).length,0);
  assert.equal(pred(s,'legal_drafting').allowed,true);
  const branch={id:'DEMO-CTT-001/hold/test-branch',status:'active',hold_scope:'branch',object_scope_refs:[api.D_IDS.agreement],action_scope:['legal_drafting'],reason_code:'review'};
  s.holds.push(branch);assert.equal(pred(s,'legal_drafting').allowed,false);assert.equal(pred(s,'credit_assessment').allowed,true);
  assert.equal(projection(s).holds.at(-1).hold_scope,'branch');
  s.holds.push({id:'DEMO-CTT-001/hold/unknown',status:'unknown',hold_scope:'unknown',object_scope_refs:[],action_scope:[]});
  assert.equal(pred(s,'credit_assessment').impact,'unknown');assert.equal(pred(s,'credit_assessment').allowed,false);
  assert.equal(projection(s).holds.at(-1).hold_scope,'unknown');
});
// Break caught: changed Credit silently overwrites consumed revision or the legal agreement.
test('RT-D07/18: Credit revision makes existing legal dependency stale and retains immutable input chain',()=>{
  const s=seed(), before=structuredClone(s), next=api.specialistAction(s,command(s)), p=projection(next);
  assert.deepEqual(s,before);assert.deepEqual(next.legalAgreements,s.legalAgreements);
  assert.equal(p.legal.agreement_revision,3);assert.equal(p.legal.credit_input_revision,1);assert.equal(p.legal.current_credit_input_revision,2);assert.equal(p.legal.input_currency,'superseded');
  for(const collection of ['creditAssessments','creditConditions','agreementInputs']){
    assert.deepEqual(next[collection][0],s[collection][0]);assert.equal(next[collection].at(-1).revision,2);
  }
  assert.deepEqual(next.decisions.slice(0,s.decisions.length),s.decisions);
  assert.equal(p.dependencies.some(d=>d.dependency_type==='credit_to_legal'&&d.status==='stale'),true);
  assert.equal(p.readiness.result,'not_ready');assert.equal(p.actionEligibility.legal_execution.allowed,false);
  assert.equal(api.specialistAction(next,command(s)),next);
  assert.throws(()=>api.specialistAction(next,command(s,{rationale:'Different payload'})),code('D_IDEMPOTENCY_CONFLICT'));
});
// Break caught: missing or stale case/scope/input tokens, arbitrary terms, or hold bypass mutates state.
test('D revision simulation rejects stale, missing and expanded commands without mutation',()=>{
  const s=seed(), before=structuredClone(s);
  for(const [extra,error] of [[{key:''},'D_KEY_REQUIRED'],[{rationale:' '},'D_RATIONALE_REQUIRED'],[{expectedRevision:0},'D_STALE_CASE'],[{expectedScopeRevision:0},'D_STALE_SCOPE'],[{expectedInputRevisions:{}},'D_STALE_INPUT'],[{amount:10},'D_COMMAND_FIELD_NOT_ALLOWED'],[{conditionText:'arbitrary policy'},'D_COMMAND_FIELD_NOT_ALLOWED']])assert.throws(()=>api.specialistAction(s,command(s,extra)),code(error));
  const pending=command(s);s.creditConditions[0].condition_text='unversioned changed input';assert.throws(()=>api.specialistAction(s,pending),code('D_STALE_INPUT'));
  s.creditConditions[0].condition_text=before.creditConditions[0].condition_text;assert.deepEqual(s,before);
  s.holds.push({id:'DEMO-CTT-001/hold/all',status:'active',hold_scope:'case',object_scope_refs:[],action_scope:[]});
  assert.throws(()=>api.specialistAction(s,command(s)),code('D_ACTIVITY_HELD'));
});
// Break caught: global DEP number collision or unversioned Credit-Legal reference.
test('D dependencies use source-qualified aliases and scoped version-addressed objects',()=>{
  const s=seed(), edges=projection(s).dependencies;
  assert.equal(edges.some(x=>x.source_aliases.includes('SRC-010:DEP-07')),false);
  assert.equal(edges.some(x=>x.source_aliases.includes('SRC-009:DEP-07')),true);
  for(const edge of edges){assert.match(edge.id,/^DEMO-CTT-001\/dependency\/d-/);assert.ok(Number.isSafeInteger(edge.from_revision));assert.ok(Number.isSafeInteger(edge.to_revision));}
  assert.deepEqual(s.dependencies.slice(0,base().dependencies.length),base().dependencies);
});
// Break caught: preparation eligibility ignores missing required records or uses a mismatched revision.
test('D prerequisites fail closed for missing financial, party or agreement context',()=>{
  for(const [mutate,activity] of [[s=>s.creditAssessments[0].financial_data_refs=[],'credit_assessment'],
    [s=>s.legalAgreements[0].agreement_type=null,'legal_drafting'],
    [s=>s.legalAgreements[0].party_refs=['OTHER'],'legal_intake'],
    [s=>s.creditAssessments[0].counterparty_ref='OTHER','credit_assessment']]){
    const s=seed();mutate(s);assert.equal(pred(s,activity).allowed,false,activity);
  }
  const s=seed();s.legalAgreements[0].agreement_input_ref='OTHER';assert.equal(projection(s).legal.input_currency,'unknown');
});
// Break caught: consumers cannot retrieve superseded input without accessing unrestricted raw store.
test('D version history exposes both revision-addressed chains and immutable consumer provenance',()=>{
  const s=seed(), next=api.specialistAction(s,command(s)), p=projection(next);
  assert.equal(Array.isArray(p.versionHistory),true,'Version history must be available through the safe projection');
  const inputs=p.versionHistory.filter(x=>x.id==='DEMO-CTT-001/agreement-input/d-01');
  assert.deepEqual(inputs.map(x=>[x.revision,x.status]),[[1,'superseded'],[2,'current']]);
  assert.deepEqual(inputs[0].upstream,[{id:'DEMO-CTT-001/credit-condition/d-01',revision:1}]);
  assert.deepEqual(inputs[0].downstream,[{id:'DEMO-CTT-001/agreement/d-01',revision:3}]);
});
// Break caught: a hold matched to case/scope IDs silently disappears in D's predicate adapter.
test('D honors inherited case/scope hold targets and unknown object input',()=>{
  for(const ref of ['DEMO-CTT-001','DEMO-CTT-001/scope/institutional']){
    const s=seed();s.holds.push({id:'DEMO-CTT-001/hold/scoped',status:'active',hold_scope:'case',object_scope_refs:[ref],action_scope:[]});
    assert.equal(pred(s,'legal_drafting').allowed,false);
  }
  const s=seed();assert.equal(pred(s,'legal_drafting',{objectRef:'OTHER'}).allowed,false);
  s.scopes[0].revision++;assert.throws(()=>api.specialistAction(s,command(s)),code('D_CONTEXT_REQUIRED'));
});
const contract = await import('../../04_operating_model/batch-d/build-contract.mjs').catch(()=>({}));
// Break caught: generated candidate contract omits minimum fields, entry/changed snapshots or literal independent oracle.
test('D contract generates complete aliases, independently stated oracle and candidate snapshots',()=>{
  assert.equal(typeof contract.buildArtifacts,'function','Candidate generator must exist');
  const built=contract.buildArtifacts();
  assert.deepEqual(Object.keys(built.snapshots),['D-entry','D-credit-changed']);
  assert.equal(built.validation.valid,true);assert.equal(built.oracle.expected.entry.readiness,'not_ready');
  assert.equal(built.oracle.expected.credit_changed.legal_credit_input_revision,1);
  for(const [object,field,physical] of [['ConflictReview','conflict_review_id','id'],['CreditCondition','credit_condition_id','id'],['ProfessionalCondition','condition_status','status'],['Hold','hold_id','id'],['DependencyEdge','dependency_id','id']]){
    assert.equal(built.fields.find(x=>x.object===object&&x.field===field)?.physical_field,physical);
  }
  assert.equal(built.fields.some(x=>x.object==='LegalAgreement'&&x.field==='signatory_authority_refs'),true);
  const broken=structuredClone(built.snapshots['D-entry']);delete broken.legalAgreements[0].execution_status;
  assert.equal(contract.validateCandidate(broken).valid,false);
});
// Break caught: arbitrary review text piggybacks on ostensibly safe hold/dependency/activity labels.
test('D safe progress strips free-text hold, dependency and audit strings',()=>{
  let s=seed();s=api.specialistAction(s,command(s));
  s.holds[0].reason_code='RESTRICTED-HOLD-SENTINEL';
  s.dependencies.find(x=>x.source_refs.includes('SRC-019')).dependency_condition='RESTRICTED-DEPENDENCY-SENTINEL';
  s.clearanceConditions.find(x=>x.domain==='conflicts').next_action='RESTRICTED-ACTIVITY-SENTINEL';
  s.auditEvents.at(-1).event_type='RESTRICTED-EVENT-SENTINEL';
  for(const role of ['ROLE-RM','ROLE-CLIENT','ROLE-LEGAL','ROLE-KYCOPS'])assert.equal(JSON.stringify(api.specialistProjection(s,{role})).includes('SENTINEL'),false);
});
// Review break caught: an unresolved prerequisite edge is ignored when no Hold was authored.
test('D review fix: unknown Legal dependency blocks affected preparation without stopping Credit',()=>{
  for(const change of [{status:'unknown'},{impact_scope:'unknown'},{validation_status:'unknown'},{status:'pending'}]){
    const s=seed(), dep=s.dependencies.find(x=>x.id==='DEMO-CTT-001/dependency/d-legal-start');Object.assign(dep,change);
    const p=pred(s,'legal_drafting');assert.equal(p.allowed,false);
    assert.equal(p.impact,change.status==='pending'?'affected':'unknown');
    assert.equal(pred(s,'credit_assessment').allowed,true);assert.equal(pred(s,'credit_assessment').impact,'unaffected');
    Object.assign(dep,{status:'satisfied',impact_scope:'task',validation_status:'reviewed_for_demo'});
    assert.equal(pred(s,'legal_drafting').allowed,true);
  }
});
// Review break caught: missing, wrong or empty Legal product references permit intake/drafting.
test('D review fix: Legal requires nonempty current scoped product references',()=>{
  for(const products of [[],['OTHER'],null]){
    const s=seed();s.legalAgreements[0].product_scope_refs=products;
    for(const activity of ['legal_intake','legal_drafting','incorporate_credit'])assert.equal(pred(s,activity).allowed,false,activity);
  }
});
// Review break caught: a truthy decision reference substitutes for complete current scoped Credit terms.
test('D review fix: incorporation validates current decision condition input and required terms',()=>{
  const cases=[
    s=>s.creditConditions.at(-1).condition_text='',s=>s.agreementInputs.at(-1).condition_text='   ',
    s=>s.agreementInputs.at(-1).condition_text='Different terms',
    s=>s.creditAssessments.at(-1).decision_ref='MISSING',
    s=>s.creditAssessments.at(-1).condition_refs=[],
    s=>s.creditConditions.at(-1).decision_ref='MISSING',
    s=>s.creditConditions.at(-1).status='pending',
    s=>s.creditConditions.at(-1).effective_scope='OTHER',
    s=>s.agreementInputs.at(-1).credit_decision_ref='MISSING',
    s=>s.agreementInputs.at(-1).credit_condition_revision=99,
    s=>s.agreementInputs.at(-1).agreement_ref='OTHER'
  ];
  for(const mutate of cases){const s=seed();mutate(s);assert.equal(pred(s,'incorporate_credit').allowed,false);}
  const current=seed();assert.equal(pred(current,'incorporate_credit').allowed,true);
  const changed=api.specialistAction(current,command(current));assert.equal(pred(changed,'incorporate_credit').allowed,true);
  changed.agreementInputs.at(-1).credit_condition_revision=1;
  assert.equal(pred(changed,'incorporate_credit').allowed,false);
});
