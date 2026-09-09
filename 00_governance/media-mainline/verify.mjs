import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='00_governance/media-mainline/',pkg='prototype/media/d2-batch-a/r01/';
const tests=readdirSync('prototype/tests').filter(f=>f.endsWith('.test.mjs')).map(f=>'prototype/tests/'+f);
const run=spawnSync(process.execPath,['--test',...tests],{encoding:'utf8'});
writeFileSync(root+'tests.tap',run.stdout+run.stderr);
const counts=Object.fromEntries(['tests','pass','fail','skipped'].map(k=>[k,Number(run.stdout.match(new RegExp('# '+k+' (\\d+)'))?.[1]||0)]));
const browser=JSON.parse(readFileSync('prototype/qa/media-mainline/browser-results.json'));
const report={at:new Date().toISOString(),command:'node --test prototype/tests/*.test.mjs',exit_code:run.status,counts,browser:{passed:browser.results.filter(r=>r.status==='passed').length,failed:browser.results.filter(r=>r.status==='failed').length,not_run:browser.results.filter(r=>r.status==='not-run').length,version:browser.browser},scope:'Fresh local mainline host checks; separate from historical standalone sample checks.',files:Object.fromEntries(['prototype/app.mjs','prototype/batch-a-ui.mjs','prototype/media-host.mjs','prototype/media-static.mjs','prototype/batch-a-media.mjs','prototype/batch-a-media.css','prototype/batch-a-engine.mjs','prototype/collaboration-engine.mjs','prototype/case-engine.mjs'].map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')]))};
writeFileSync(root+'verification-results.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(run.status!==0||report.browser.failed||browser.errors.length){process.exitCode=1;}else{
 const source=JSON.parse(readFileSync(pkg+'asset-manifest.json')).assets;
 const provenance=JSON.parse(readFileSync(pkg+'package-provenance.json'));
 const manifestPath='prototype/diagrams/batch-a/media-manifest.json';
 const manifest=JSON.parse(readFileSync(manifestPath));
 for(const item of manifest){
  if(!['MED-A-PER-T','MED-A-PER-OPS','DMO-A01','DMO-A02'].includes(item.asset_id))continue;
  const approved=source.find(x=>x.asset_id===item.asset_id);if(!approved)throw Error('Source metadata missing '+item.asset_id);
  const demo=item.asset_id.startsWith('DMO-'),scene=item.asset_id==='DMO-A02'?'SCN-ENTITY':'SCN-SCOPE';
  Object.assign(item,{variant_id:demo?'panel-first':'editorial',asset_revision:'r01',case_fixture_revision:approved.case_fixture_revision,source_snapshot_ref:pkg+approved.source_snapshot_ref,file_format:approved.file_format,dimensions:approved.dimensions,duration:demo?approved.duration:null,fps:null,source_files:provenance.files.filter(f=>demo?['src/content.js','src/views.js','styles/media.css','source/cue-manifest.json'].includes(f.path):f.path.startsWith('assets/personas/'+item.asset_id+'__')).map(f=>({...f,path:pkg+f.path})),scenario_refs:demo?[scene]:['SCN-SCOPE','SCN-ENTITY'],beat_refs:approved.beat_refs||[],diagram_refs:approved.diagram_refs||[],preview_file:demo?`prototype/?scene=${scene}&locale=zh-CN`:pkg+approved.preview_file,poster_file:approved.poster_file?pkg+approved.poster_file:null,static_fallback:'prototype/media-static.mjs (all frozen cues) + mainline live records',locale:['zh-CN','en-AU','en-US'],alt_text_refs:approved.alt_text_refs||[],motion_mode:demo?'opt_in_controlled_or_static':'static',controls_supported:demo?['play','pause','previous','next','replay','static','help']:[],allowed_intents:[],data_mutation_scope:'none',licence_or_generation_provenance:pkg+'source/image-generation.md',content_status:'approved_sample_direction; synthetic_not_bank_policy',visual_status:'received_user_selected',promotion_status:'integrated_locally_for_review',test_status:{host:root+'verification-results.json',browser:'prototype/qa/media-mainline/browser-results.json',source_tests:'Historical sample results in packaged source manifest; not counted as host evidence'},review_ref:'User approval + experiments/d2-batch-a-media/MAINLINE_INTEGRATION_HANDOFF.md',known_limitations:['No iframe/postMessage host command API; callback is sanitized media state only','Frozen story is not the latest live case record','Safari/Firefox, native zoom and full assistive-technology audit not run','No encoded video/audio, production system integration or remote publication']});
  item.file_size=item.source_files.reduce((n,f)=>n+f.bytes,0);item.file_size_scope='Listed source files only; shared dependencies in package-provenance.json';
 }
 writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
}
