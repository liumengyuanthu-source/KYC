import source from './author-source.mjs';
export const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
export const DEFAULT_ACTION='D4A-MATCH-04-01';
export const VIEWS=['overview','execution-choice','skills','collaboration'];
export const GROUPS=[['01-01','01-02'],['02-01','02-02'],['03-01','03-02','03-03'],['04-01','04-02','05-01'],['05-02','05-03','06-01','06-02'],['06-03','07-01','07-02']].map((items,i)=>({id:`OM-MATCH-G${i+1}`,actions:items.map(x=>'D4A-MATCH-'+x)}));
export const authorAllowed=role=>['ROLE-KYCOPS','ROLE-CASEMGR','ROLE-FINCRIME','ROLE-REVIEWER','ROLE-DEMO-AUTHOR','ROLE-QA','ROLE-LEGAL','ROLE-CREDIT','ROLE-CONFLICTS'].includes(role);
export function projectOperating(input){
 const s=structuredClone(input),actions=(s.atomic_actions||[]).filter(a=>a.scenario_id==='SCN-MATCH').map(a=>{
  const scores=Object.fromEntries(['C','O','D','B','V','T','H'].map(k=>[k,Number.isInteger(a.score_values?.[k])&&a.score_values[k]>=1&&a.score_values[k]<=5?a.score_values[k]:null]));
  const sum=keys=>keys.every(k=>scores[k]!==null)?keys.reduce((n,k)=>n+scores[k],0):null;
  const parent=s.parent_work_assessments?.find(p=>p.change_id===a.parent_change_id);
  const lookup=refs=>(refs||[]).map(id=>s.source_occurrences?.find(x=>x.source_id===id)||{source_id:id,unavailable:true});
  return {...a,score_values:scores,adaptive_need:sum(['C','O','D']),test_boundary:sum(['B','T']),execution:a.formal_gate?.formal_judgement_or_authority?'HUMAN':a.primary_executor,display_mapping:{original:a.collaboration_pattern,derived_from:['primary_executor','skill_relation'],display:a.skill_relation==='supports_human_action'?'Skill supports human':a.primary_executor==='SEMANTIC_SKILL'?'Skill prepares':a.primary_executor==='BOUNDED_AGENT_CANDIDATE'?'Conditional planning candidate':'Rule within workflow'},currentSources:lookup(a.current_source_refs),targetSources:lookup(a.target_source_refs),parent,issue_refs:parent?.source_issue_refs||[]};
 });
 const reuse=(s.atomic_actions||[]).flatMap(a=>(a.skill_refs||[]).map(skill=>({skill_ref:skill,action_ref:a.action_id,scene_ref:a.scenario_id,workflow_ref:a.workflow_id,relation:a.skill_relation==='supports_human_action'?'supports':'executes',source_relation:a.skill_relation,reads:a.reads,outputs:a.outputs,primary_executor:a.primary_executor})));
 return freeze({version:s.metadata?.version||'unavailable',sha256:s.sha256,actions,groups:structuredClone(GROUPS),reuse,skills:s.skills||[],workflow:s.workflows?.find(w=>w.id==='WF-05'),references:s.inherited_references||[],issues:s.inherited_reconciliation_issues||[],candidates:s.agent_candidates||[],logical:s.logical_agent_crosswalk||[],rubric:s.rubric||{}});
}
const projection=projectOperating(source);
export function operatingProjection({role}={}){return authorAllowed(role)?projection:null;}
export const actionFor=id=>projection.actions.find(a=>a.action_id===id)||null;
// Exact D3 work entry anchors. The complete original decomposition remains in each group.
const changeAnchors={'D3-MATCH-01':'01-01','D3-MATCH-02':'02-02','D3-MATCH-03':'03-01','D3-MATCH-04':'04-01','D3-MATCH-05':'05-02','D3-MATCH-06':'06-01','D3-MATCH-07':'07-01'};
export const actionFromChange=id=>changeAnchors[id]?'D4A-MATCH-'+changeAnchors[id]:null;
