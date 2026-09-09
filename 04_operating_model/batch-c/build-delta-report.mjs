import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const b=read('../batch-b/collaboration-snapshots.json').snapshots['B-coordination-assessed'];
const c=read('./screening-snapshots.json');
const entry=c.snapshots['C-entry'],fields=read('./field-dictionary.json');
const rows=fields.map(f=>{
 const before=Array.isArray(b[f.collection])?b[f.collection]:[];
 return {object:f.object,collection:f.collection,field:f.field,change:!(f.collection in b)?'new_collection':before.some(r=>Object.hasOwn(r,f.field))?'existing_field_reused':'additive_field_on_C_records',definition_ref:'field-dictionary.json',ui_binding:f.ui_binding};
});
const preserved={};
for(const key of ['scopes','entities','naturalPersons','authorities','requestItems','requestRecipients','accessGrants','screeningFindings','clearanceConditions']){
 const before=b[key]||[],after=entry[key]||[];
 preserved[key]={old_record_count:before.length,unchanged_at_C_entry:before.every(r=>JSON.stringify(after.find(x=>x.id===r.id))===JSON.stringify(r))};
}
const report={source:'SRC-016 Final 1.0',status:'candidate_field_delta_not_production_migration',baseline:'B-coordination-assessed',entry:'C-entry',
 snapshots_sha256:createHash('sha256').update(JSON.stringify(c)).digest('hex'),
 field_rows:rows.length,counts:Object.fromEntries(['new_collection','existing_field_reused','additive_field_on_C_records'].map(k=>[k,rows.filter(r=>r.change===k).length])),
 preserved_at_entry:preserved,fields:rows,
 dependency_crosswalk:[
 {source:'SRC-009:DEP-02',targets:['SRC-010:DEP-02','SRC-010:DEP-06'],meaning:'Separate preliminary and comprehensive query gates'},
 {source:'SRC-009:DEP-08',targets:['SRC-010:DEP-07','SRC-010:DEP-08'],meaning:'Separate finding review and independent EDD applicability'},
 {source:'SRC-009:DEP-07',targets:[],meaning:'Credit to Legal; not the D2 screening dependency'},
 {source:'SRC-010:DEP-12',targets:['Person T coverage projection','Independent EDD projection'],meaning:'C synthetic not-ready overlay; no new clearanceCondition writer'},
 {source:'SRC-010:DEP-14',targets:['read-only same-revision lenses','disabled shadow inject'],meaning:'Interface only; no Lab write-back'}
 ],
 downstream_interfaces:{identity:'New purpose-scoped B request; EV-ID-C01 allocated only on submission',population:'Upstream confirmed-inventory adapter unconfigured',disposition:'Disabled until separately reviewed exclusion fixture and oracle',edd:'Reviewed applicability and pack interfaces; approval writer not supplied',readiness:'Preserved legacy conditions plus explicit C profile overlay',media:'Read-only static views; video asset missing does not block task',lab:'No approved live inject; mainline independent'},
 limitations:['Candidate dictionary metadata is not a production schema certification.','No independent third-party JSON Schema runtime was available.','Counts describe physical demo fields, not approved bank requirements.']};
writeFileSync(new URL('./field-dependency-delta.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log({rows:rows.length,counts:report.counts,preserved});
