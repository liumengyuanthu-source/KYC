import {selectReferences} from './references.mjs';
import {byId,txt} from './content.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function referenceHtml({locale='en-AU',scene=null,node=null,kind=null,query='',selected=null,print=false}={}){
 const zh=locale==='zh-CN',t=(a,b)=>zh?a:b;
 const sourceRecords=selected?selectReferences({}).filter(card=>card.source.source_id===selected):[];
 const cards=sourceRecords.length?sourceRecords:selectReferences({scene,node,kind,query,selected});
 const kindLabel=value=>({industry_reference:t('行业参考','Industry reference'),cross_industry_pattern:t('跨行业模式','Cross-industry pattern'),technical_design_reference:t('技术设计参考','Technical design reference'),design_interpretation:t('本项目设计','Project design'),project_source:t('项目来源','Project source')})[value]||value;
 const filters=print?'':`<div class="reference-filters"><label>${t('分类','Kind')}<select data-ref-kind><option value="">${t('全部','All')}</option>${['industry_reference','cross_industry_pattern','technical_design_reference','design_interpretation','project_source'].map(k=>`<option value="${k}" ${kind===k?'selected':''}>${esc(kindLabel(k))}</option>`).join('')}</select></label><label>${t('检索主题、场景、地区、版本或核验状态','Search topic, scene, region, version or status')}<input data-ref-query value="${esc(query)}"></label><button data-ref-search>${t('筛选','Filter')}</button><button data-ref-all>${t('全库','All references')}</button></div>`;
 const articles=cards.map(({source:s,observation:o,interpretation:i,binding:b})=>{
  const isDesign=s.source_kind==='design_interpretation',isProject=s.source_kind==='project_source',summary=zh?o.supported_statement:o.supported_statement_en;
  const provenance=o.verification_origin;
  const link=s.canonical_url?`<a href="${esc(s.canonical_url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${print?esc(s.canonical_url):t('打开官方来源 ↗','Open official source ↗')}</a>`:`<p>${t('本项目设计；不附受限内部原件。','Project design; no restricted internal original attached.')}</p>`;
  const original=!zh&&!isDesign&&!isProject?`<details${print?' open':''}><summary>Original research wording (Chinese; not an official translation)</summary><p lang="zh-CN">${esc(o.supported_statement)}</p><p lang="zh-CN">${esc(i.adopt)} ${esc(i.avoid)}</p><p lang="zh-CN">${esc(o.verification_status)}</p></details>`:'';
  return `<article class="reference-card" id="ref-${esc(o.observation_id)}" data-reference="${esc(o.observation_id)}">
   <p class="trace-meta">${esc(kindLabel(s.source_kind))} · ${esc(o.observation_id)}</p><h3>${esc(s.title)}</h3>
   <p>${esc(s.publisher)} · ${esc(s.source_version??t('版本未标注','Version not specified'))} · ${esc(s.publication_date??t('日期未标注','Date not specified'))}</p>
   <p>${esc(s.region_scope)}</p><h4>${t(isDesign?'设计判断':isProject?'已批准范围摘要':'来源观察',isDesign?'Design judgement':isProject?'Approved-scope summary':'Research summary — observation and limits')}</h4><p>${esc(summary)}</p>
   <h4>${t('本项目推导 · 不是银行政策','Our interpretation · not bank policy')}</h4>
   <p class="trace-meta">${esc(zh?i.why_it_matters:'Related work: '+(b.scenario_refs.map(id=>txt(byId(id).title,locale)).join(' / ')||'Studio interaction'))}</p><p class="trace-meta">${esc(b.scenario_refs.join(' / '))} · ${esc(b.semantic_node_refs.join(' / '))}</p>
   <dl><dt>${t('采用','Adopt')}</dt><dd>${esc(zh?i.adopt:isDesign?i.adopt:'Use the bounded mechanism described above as a design reference.')}</dd><dt>${t('调整','Adapt')}</dt><dd>${esc(zh?'使用本案对象、用途和版本；权限与银行适用性另行确认。':i.adapt)}</dd><dt>${t('避免','Avoid')}</dt><dd>${esc(zh?i.avoid:isDesign?i.avoid:'Do not transfer market-specific permissions, bank policy or unverified product capabilities. Retain the source limits above.')}</dd></dl>
   <p class="reference-status">${esc(zh?o.verification_status:isDesign?'Approved demo design only':isProject?o.verification_status:'Verification status inherited from research; see original wording')} · ${esc(provenance)} · ${t('无新增核验日期','No new verification date')}</p>
   ${!isDesign&&!isProject?`<p>${t('媒体未取得：不展示虚构截图。','Not captured: no fabricated screenshot preview.')}</p>`:''}${original}${link}
   ${!print&&b.scenario_refs[0]?`<button data-ref-scene="${esc(b.scenario_refs[0])}">${t('前往关联场景','Go to linked scenario')}</button>`:''}<small class="trace-meta">${esc(b.support_kind)} · ${esc(b.semantic_node_refs.join(' / '))}</small></article>`;
 }).join('');
 return `<section class="reference-library" aria-label="References"><p class="eyebrow">${t('研究依据 · 非案件证据','Research · not case evidence')}</p><p>${t('保留原研究状态；本次未重新核验外部页面。','Inherited research status; external pages have not been reverified in this batch.')}</p>${filters}<p>${cards.length} ${t('条来源／设计记录','source / design records')}</p>${articles||`<p>${t('当前筛选没有记录；项目原件未随此页面附带。','No records match this filter; internal originals are not bundled with this page.')}</p>`}</section>`;
}
