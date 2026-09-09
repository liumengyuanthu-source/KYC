import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {activities,journeyRoles,pains,sourceSteps} from '../../prototype/journey/model.mjs';

const root='audit/journey-source-realignment';
const pages=JSON.parse(execFileSync('/Users/christinaliu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',[
 '-c','import pypdf,json,sys; print(json.dumps([p.extract_text() for p in pypdf.PdfReader(sys.argv[1]).pages]))',
 `${root}/journey-all-roles.zh-CN.pdf`
],{encoding:'utf8'}));
// Chrome's embedded CJK font maps these four glyphs to supplemental radicals.
// They were visually inspected; unlike Kangxi radicals, NFKC leaves them intact.
const normalize=text=>text.normalize('NFKC').replace(/⻛/g,'风').replace(/⻅/g,'见').replace(/⻆/g,'角').replace(/⻬/g,'齐').replace(/\s/g,'');
const document=normalize(pages.join('\n'));
const checks=[];
function check(name,text){const passed=document.includes(normalize(text));checks.push({name,status:passed?'passed':'failed'});}
for(const role of journeyRoles)check(`Role ${role.id}`,role.title['zh-CN']);
for(const a of activities)for(const field of ['title','current','target','input','output','handoff'])check(`${a.id} ${field}`,a[field]['zh-CN']);
for(const pain of pains){check(`Pain ${pain.id}`,pain.title['zh-CN']);check(`Pain description ${pain.id}`,pain.description['zh-CN']);}
for(const source of sourceSteps)check(`Source ${source.key}`,source.title['zh-CN']);
const occupancy=pages.map((p,i)=>({page:i+1,characters:normalize(p).length}));
checks.push({name:'No blank or technical-label-only pages',status:occupancy.every(p=>p.characters>80)?'passed':'failed'});
const result={at:new Date().toISOString(),pdf:`${root}/journey-all-roles.zh-CN.pdf`,pages:pages.length,checks,occupancy,passed:checks.filter(c=>c.status==='passed').length,failed:checks.filter(c=>c.status==='failed')};
writeFileSync(`${root}/pdf-content-results.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({pages:result.pages,passed:result.passed,failed:result.failed},null,2));
assert.equal(result.failed.length,0,'PDF content must retain all catalog text');
