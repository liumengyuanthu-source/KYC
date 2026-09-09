import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {screeningProjection,screeningAction} from '../screening-engine.mjs';
const module=await import('../product-experience/command-intent.mjs').catch(()=>({}));
test('D5 stationary double click reuses one original intent after the first result revises the case',()=>{
 assert.equal(typeof module.commandIntent,'function');let s=JSON.parse(readFileSync(new URL('../qa/operating-model/host/c-live-session.json',import.meta.url))).data;
 const build=key=>()=>({type:'record_unresolved',role:'ROLE-REVIEWER',key,rationale:'Identity remains unresolved; actual reviewer records no exclusion.',expectedRevision:s.case.revision,expectedScopeRevision:s.scopes[0].revision,expectedInputRevisions:screeningProjection(s,{role:'ROLE-REVIEWER'}).inputRevisions,at:'2026-09-08T00:00:00Z'});
 const one=module.commandIntent(null,'reviewer:unresolved:person-t',build('one'),100);s=screeningAction(s,one.command);const firstRevision=s.case.revision;
 const two=module.commandIntent(one,'reviewer:unresolved:person-t',build('two'),300);s=screeningAction(s,two.command);
 assert.equal(s.screeningReviewDecisions.length,1);assert.equal(s.case.revision,firstRevision);assert.equal(two.command.key,'one');
 const edited=module.commandIntent(null,'reviewer:unresolved:person-t',build('edited'),400);assert.equal(edited.command.key,'edited');
 const later=module.commandIntent(one,'reviewer:unresolved:person-t',build('later'),1500);assert.equal(later.command.key,'later');
});
