export const id=(kind,slug)=>`DEMO-CTT-001/${kind}/${slug}`;
export const find=(s,collection,key)=>s[collection].find(x=>x.id===key);
export function readiness(s){
 const conditions=s.clearanceConditions||[], scope=s.scopes?.[0];
 const unknown=conditions.filter(c=>c.applicability==='unknown'||c.status==='unknown').map(c=>c.id);
 const blocked=conditions.filter(c=>c.applicability==='required'&&(c.status!=='satisfied'||c.scope_revision!==scope?.revision)).map(c=>c.id);
 const invalid=!scope||scope.scope_status!=='confirmed_for_demo'||!scope.booking_entity_ref||!scope.policy_profile_ref||!scope.entity_ids?.length||!scope.product_scope_ids?.length||!conditions.length||!conditions.some(c=>c.applicability==='required');
 return {result:invalid||unknown.length||blocked.length?'not_ready':'candidate_ready',blocking_condition_ids:blocked,unknown_condition_ids:unknown,invalid_context:invalid};
}
export function act(input,a){
 if(!input.demoConfig.allowed_actions_by_role[a.role]?.includes(a.type))throw Error('Authority not configured for this action');
 const records=Object.values(input).flatMap(value=>Array.isArray(value)?value:value?.revision!==undefined?[value]:[]);
 if(records.some(record=>!Number.isSafeInteger(record.revision)||record.revision<1))throw Error('Invalid input revision');
 if(input.auditEvents.some(e=>e.correlation_id===a.key))return input;
 if(a.expectedRevision!==input.case.revision)throw Error('Input revision changed. Review current inputs before submitting.');
 if(!a.key)throw Error('Submission key required');
 if(input.screeningFindings[0]?.review_status==='resolved'&&['request_evidence','refer','pause'].includes(a.type))throw Error('Finding is resolved; reopening requires a new reviewed branch outside this slice');
 for(const [key,revision]of Object.entries(a.expectedInputRevisions||{}))if(records.find(record=>record.id===key)?.revision!==revision)throw Error('Input revision changed. Review current inputs before submitting.');
 const s=structuredClone(input),now=a.at||new Date().toISOString();
 const get=(collection,kind,slug)=>find(s,collection,id(kind,slug));
 const work=slug=>get('workItems','work',slug);
 const req=slug=>get('requirements','requirement',slug);
 const evid=slug=>get('evidence','evidence',slug);
 const use=slug=>get('evidenceUseAssessments','assessment',slug);
 const change=(obj,fields)=>{if(!obj||!Number.isSafeInteger(obj.revision)||obj.revision<1||obj.revision===Number.MAX_SAFE_INTEGER)throw Error('Invalid object revision');return Object.assign(obj,fields,{revision:obj.revision+1,updated_at:now});};
 const task=(slug,status,waiting=null)=>change(work(slug),{status,waiting_for:waiting,hold_scope:waiting?'task':'none',action_revision:work(slug).action_revision+1});
 const rationale=()=>{if(!a.rationale?.trim())throw Error('Rationale is required');};
 const permission=(slug)=>{const authority=get('authorities','authority',slug);if(!authority||authority.status!=='configured_for_demo'||authority.authority_status!=='demo_configured'||authority.demo_permission_ref!==s.demoConfig.id||authority.owner_role!==a.role||authority.bank_authority_ref!==null)throw Error('Authority reference is missing or does not cover this demo action');return authority;};
 const purpose=(slug)=>{const assessment=use(slug),evidence=s.evidence.find(e=>e.id===assessment?.evidence_id),requirement=s.requirements.find(r=>r.id===assessment?.requirement_id);if(!evidence||!requirement||assessment.evidence_revision!==evidence.evidence_revision)throw Error('Evidence revision is stale or missing');if(assessment.subject_id!==evidence.subject_id||assessment.subject_id!==requirement.subject_id||assessment.purpose_code!==requirement.purpose_code||assessment.case_scope_id!==s.scopes[0]?.id)throw Error('Evidence purpose or subject does not match current scope');return assessment;};
 const assess=(slug,sufficiency,reason)=>{const authority=permission('demo-kycops'),assessment=purpose(slug);return change(assessment,{sufficiency,reason_code:reason,basis_refs:[assessment.evidence_id],assessed_by_ref:a.role,authority_ref:authority.id,assessed_at:now,supersedes_assessment_ref:assessment.id});};
 switch(a.type){
 case 'confirm_requirements':
  if(s.demoConfig.batchA&&s.scopes[0].scope_status!=='working_scope_recorded')throw Error('Record working scope before requirements preparation');
  if(work('requirements').status==='completed')return input;
  s.requirements.forEach(r=>change(r,{status:'review_required',status_reason:'requirements_confirmed_for_demo'}));task('requirements','completed');task('reuse','ready');break;
 case 'reuse_identity':
  if(!['available','received'].includes(evid('registry').receipt_status))throw Error('Registry evidence has not been received');
  if(work('requirements').status!=='completed')throw Error('Confirm requirements before reusing evidence');
  if(work('reuse').status==='completed')return input;
  rationale();assess('identity','sufficient','synthetic_identity_review');assess('registry-screening','insufficient','distinguishing_identifier_missing');
  change(req('identity'),{status:'satisfied',status_reason:'identity_purpose_supported'});change(evid('registry'),{verification_status:'verified'});task('reuse','completed');task('residual-request','ready');break;
 case 'send_residual_request':
  if(work('reuse').status!=='completed')throw Error('Review existing evidence before requesting residual gaps');
  if(['awaiting_response','completed'].includes(work('residual-request').status))return input;
  rationale();task('residual-request','awaiting_response',id('evidence','supplement'));break;
 case 'receive_supplement':
  if(work('residual-request').status!=='awaiting_response'||!s.auditEvents.some(e=>e.event_type==='send_residual_request'))throw Error('A residual request must be recorded first');
  change(evid('supplement'),{receipt_status:'received',acquired_at:now,content_ref:'synthetic:inline:subject-identifier-response',status_reason:'received_pending_review'});
  if(s.demoConfig.batchA)evid('supplement').content_attributes={registration_reference:'SYN-A-104',incorporation_jurisdiction:'AU',entity_type:'synthetic_corporation'};
  task('residual-request','completed');task('review-receive','ready');break;
 case 'assess_supplement':
  if(evid('supplement').receipt_status!=='received')throw Error('Supplement evidence has not been received');
  if(work('review-receive').status==='completed')return input;
  rationale();assess('supplement-screening','sufficient','synthetic_purpose_review');change(evid('supplement'),{verification_status:'verified'});
  change(req('screening-purpose'),{status:'satisfied',status_reason:'screening_purpose_supported'});task('review-receive','completed');task('screening-review','ready');
  change(s.screeningFindings[0],{review_status:'awaiting_human'});
  change(get('clearanceConditions','condition','evidence'),{status:'satisfied',status_reason:'purpose_assessments_current'});break;
 case 'record_disposition':{
  const authority=permission('demo-reviewer');
  purpose('supplement-screening');
  if(use('supplement-screening').sufficiency!=='sufficient'||evid('supplement').receipt_status!=='received')throw Error('Sufficient purpose-linked evidence is required');
  rationale();if(s.screeningFindings[0].decision_ref)throw Error('Disposition already recorded; a new review is outside this slice');
  const d={...structuredClone(s.case),id:id('decision',`screening-${s.case.revision+1}`),revision:1,owner_role:a.role,authority_status:'demo_configured',decision_type:'screening_disposition',outcome:'not_a_match',record_status:'recorded',authority_ref:authority.id,bank_authority_ref:null,basis_refs:[use('supplement-screening').id],input_revisions:{[use('supplement-screening').id]:use('supplement-screening').revision,[evid('supplement').id]:evid('supplement').revision,[s.scopes[0].id]:s.scopes[0].revision},recorded_by:a.role,recorded_at:now,currency:'current',submission_key:a.key};
  for(const key of ['trigger_id','lifecycle','publication_status','transaction_status'])delete d[key];
  s.decisions.push(d);task('screening-review','completed');change(s.screeningFindings[0],{review_status:'resolved',decision_ref:d.id,materiality_status:'assessed_for_demo'});
  change(get('clearanceConditions','condition','screening'),{status:'satisfied',status_reason:'local_disposition_recorded',basis_refs:[d.id]});break;
 }
 case 'request_evidence':rationale();task('screening-review','awaiting_input',id('evidence','supplement'));break;
 case 'refer':rationale();task('screening-review','referred',id('authority','demo-reviewer'));change(work('screening-review'),{next_owner:'ROLE-FINCRIME'});break;
 case 'pause':task('screening-review','paused',id('finding','possible-match'));break;
 default:throw Error('Unsupported action');
 }
 const fulfilled={
  [id('dependency','d2-04-1')]:work('requirements').status==='completed',
  [id('dependency','d2-05-2')]:use('registry-screening').sufficiency==='insufficient',
  [id('dependency','d2-05-3')]:evid('supplement').receipt_status==='received',
  [id('dependency','d2-07-4')]:use('supplement-screening').sufficiency==='sufficient',
  [id('dependency','d2-12-5')]:get('clearanceConditions','condition','screening').status==='satisfied'
 };
 for(const dep of s.dependencies){const status=fulfilled[dep.id]?'satisfied':'pending';if(dep.status!==status){const source=Object.values(s).flatMap(v=>Array.isArray(v)?v:[]).find(v=>v.id===dep.from_ref);change(dep,{status,required_input_revision:source?.revision||dep.required_input_revision});}}
 const previous=s.case.revision;change(s.case,{});
 const event={...structuredClone(input.auditEvents[0]),id:id('event',`action-${s.case.revision}`),event_type:a.type,actor_ref:a.role,object_ref:s.case.id,from_revision:previous,to_revision:s.case.revision,correlation_id:a.key,occurred_at:now,created_at:now,updated_at:now,...(a.rationale?.trim()?{rationale:a.rationale.trim()}:{}),input_revisions:{[s.case.id]:previous}};
 s.auditEvents.push(event);
 const snapshot={...structuredClone(s.readinessSnapshots[0]),id:id('snapshot',`revision-${s.case.revision}`),revision:s.case.revision,supersedes_ref:s.readinessSnapshots.at(-1).id,scope_revision:s.scopes[0].revision,condition_revisions:Object.fromEntries(s.clearanceConditions.map(c=>[c.id,c.revision])),...readiness(s),evaluated_at:now,basis_event_refs:[event.id]};
 delete snapshot.invalid_context;s.readinessSnapshots.push(snapshot);return s;
}
