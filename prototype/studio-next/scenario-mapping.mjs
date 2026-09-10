import {scenarioMappings, sourceActions} from './scenario-source-data.mjs';

export {scenarioMappings};
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const getScenarioMapping = id => scenarioMappings.find(s => s.id === id) || null;
export const relatedRoles = {
  S1: {'M2.4':'Risk feedback into scope'},
  S2: {'M1.3':'Case context','M2.1':'Requirement applicability','M3.3':'Reuse clarification request','M3.4':'Evidence input'},
  S3: {'M0.4':'Booking-model input','M3.3':'Reuse clarification request'},
  S4: {'M3.2':'Residual-gap input','M3.4':'Validation input'},
  S5: {'M2.5':'Issued requirements input','M3.4':'Handoff to S6 · evidence assessment'},
  S6: {'M3.3':'Reuse clarification request'},
  S7: {'M4.7':'Downstream result dependency'},
  S8: {'M3.3':'Reuse clarification request','M3.4':'Reuse evidence validation','M8.1':'Downstream readiness use'},
  S9: {'M2.4':'Risk / EDD trigger'},
  S10: {'M1.1':'Early initiation input'},
  S11: {'C1.4':'Credit-to-Legal handoff','C1.6':'Legal review dependency'},
  S12: {'C2.6':'Credit agreement input','C2.7':'Credit review dependency'},
  S14: {'M6.1':'QA applicability input','M8.3':'Authorised confirmation boundary'},
};

export function getSourceDetail(scenarioId, code) {
  const scenario = getScenarioMapping(scenarioId);
  if (!scenario || ![...scenario.primary, ...scenario.related].includes(code)) return null;
  const occurrences = scenario.locators.filter(ref => ref.includes(`|${code}|`)).map(locator => {
    const [source, page, lane, shape, action, occurrence] = locator.split('|');
    return {source, page, lane, shape, action, occurrence, locator};
  });
  return {...sourceActions[code], code, occurrences, workItems: scenario.workSources[code] || [],
    relationship: scenario.primary.includes(code) ? 'primary' : 'related'};
}

export function filterScenarioMappings(stage = 'all', query = '') {
  const term = query.trim().toLowerCase();
  return scenarioMappings.filter(s => (stage === 'all' || s.stage === stage) &&
    `${s.number} ${s.id} ${s.title} ${s.titleZh} ${s.primary.join(' ')} ${s.related.join(' ')}`.toLowerCase().includes(term));
}

function sourceItem(s, code, related) {
  const d = getSourceDetail(s.id, code);
  const occurrences = d.occurrences.map(o => `<li><span>${o.page === 'p1' ? 'Current' : 'Target'}</span><span data-i18n-source>${escape(o.lane)}</span><code>${escape(o.action)}</code></li>`).join('');
  return `<details class="sm-source" data-source-code="${escape(code)}" data-source-role="${related ? 'related' : 'primary'}">
    <summary><code>${escape(code)}</code><span>${escape(d.title)}${related ? `<small class="sm-relation-semantic">${escape(relatedRoles[s.number]?.[code] || 'Context & dependencies')}</small>` : ''}</span><span class="sm-expand" aria-hidden="true">+</span></summary>
    <div class="sm-source-detail"><p class="sm-role">${related ? 'Related source · context, dependency or reuse' : 'Primary source · scenario backbone'}</p>
    ${d.currentLane === 'NOT_PRESENT' ? '<p class="sm-source-warning">Explicit in Target only. Do not infer that the responsibility was absent in Current.</p>' : ''}
    ${d.note ? `<p data-i18n-source>${escape(d.note)}</p>` : ''}
    ${occurrences ? `<ul class="sm-occurrences">${occurrences}</ul>` : '<p>Occurrence detail is not linked in the existing work records.</p>'}
    ${d.workItems.length ? `<div class="sm-linked-work"><p>Explore the existing work</p>${d.workItems.map(w => `<button type="button" data-sn="work" data-sn-value="${escape(w.id)}"><span>${escape(w.title)}</span><small class="sn-id">${escape(w.id)}</small><span aria-hidden="true">→</span></button>`).join('')}</div>` : ''}
    <p class="sm-provenance">Source wording is inherited from the existing process records. Technical locators remain internal.</p></div>
  </details>`;
}

export function scenarioMappingHtml(id) {
  const s = getScenarioMapping(id);
  if (!s) return '';
  return `<section class="sm-mapping" aria-labelledby="sm-mapping-title">
    <header class="sm-mapping-heading"><div><span class="sm-kicker">SCENARIO SCOPE</span><h3 id="sm-mapping-title">Source process mapping</h3><p>Select a source step to inspect its origin.</p></div><span class="sm-count"><b>${s.primary.length}</b> <span>primary</span><i> / </i><b>${s.related.length}</b> <span>related</span></span></header>
    <div class="sm-mapping-columns"><section class="sm-primary"><h4>Primary <span>Scenario backbone</span></h4><div class="sm-source-list">${s.primary.map(code => sourceItem(s, code, false)).join('')}</div></section>
    <aside class="sm-related"><h4>Related <span>Context & dependencies</span></h4>${s.related.length ? s.related.map(code => sourceItem(s, code, true)).join('') : '<p class="sm-none">No related actions specified.</p>'}<p class="sm-related-note">These are inputs, reuse links or handoffs. They are not additional serial steps.</p></aside></div>
    <details class="sm-reading-note"><summary>How these sources shape the scenario</summary><p>${escape(s.rationale)}</p><p>${escape(s.note)}</p><p>Source labels show provenance, not an execution order. Detailed workflow changes remain proposals for discussion.</p></details>
    <div class="sm-next"><p>Continue with the existing workflow and its work items.</p><button type="button" data-sm-preview>Explore workflow <span aria-hidden="true">↓</span></button></div>
  </section>`;
}

export function mappingDirectoryHtml(stage = 'all', query = '') {
  const hits = filterScenarioMappings(stage, query);
  const stages = ['Initiate','Determine','Assess','Resolve','Clear'];
  return `<section class="sm-directory" aria-label="Scenario source mapping directory">
    <div class="sm-directory-head"><div><h2>Your scenario map</h2><p>Choose a scenario to explore its primary steps and related sources.</p></div><label class="sm-search"><span class="sr-only">Search scenarios or source steps</span><input type="search" data-sm-search value="${escape(query)}" placeholder="Scenario, M0.1 or C2.7" aria-label="Search scenarios or source steps"></label></div>
    <nav class="sm-stage-list" aria-label="Filter scenarios by journey stage"><button type="button" data-sm-stage="all" aria-pressed="${stage === 'all'}"><b>15</b><span>All scenarios</span></button>${stages.map(v => `<button type="button" data-sm-stage="${v}" aria-pressed="${stage === v}"><b>${scenarioMappings.filter(s => s.stage === v).length}</b><span>${v==='Clear'?'Confirm readiness':v}</span></button>`).join('')}</nav>
    <div class="sm-directory-results"><p class="sm-results" role="status"><b>${hits.length}</b> <span>scenarios shown</span></p><div class="sm-table-wrap"><table class="sm-table"><thead><tr><th>Scenario</th><th>Primary source steps</th><th>Related sources</th><th><span class="sr-only">Open scenario</span></th></tr></thead><tbody>${hits.map(s => `<tr><th scope="row"><span class="sm-scenario-number">${s.number}</span><button type="button" data-sn="scene" data-sn-value="${s.id}">${escape(s.title)}</button><small>${s.stage==='Clear'?'Confirm readiness':s.stage}</small></th><td><span class="sm-mobile-label">Primary source steps</span>${s.primary.map(code => `<code>${code}</code>`).join(' ')}</td><td><span class="sm-mobile-label">Related sources</span>${s.related.length ? s.related.map(code => `<code>${code}</code>`).join(' ') : '—'}</td><td><button type="button" class="sm-open" data-sn="scene" data-sn-value="${s.id}" aria-label="${escape('Open '+s.number+' '+s.title)}">View mapping <span aria-hidden="true">→</span></button></td></tr>`).join('')}</tbody></table>${hits.length ? '' : '<p class="sm-empty">No scenarios match. Try another source step or select All scenarios.</p>'}</div></div>
  </section>`;
}

const processGroupNames = {
  M0: 'Booking model',
  M1: 'Client intake & triage',
  M2: 'Requirements determination',
  M3: 'Document sourcing',
  M4: 'Screening',
  M5: 'EDD assessment',
  M6: 'Quality assurance',
  M7: 'Conflicts check',
  M8: 'Clear-to-Trade',
  C1: 'Legal agreements',
  C2: 'Credit assessment',
};
const processGroup = code => code.match(/^[MC]\d+/)?.[0] || code;
const uniqueProcessGroups = codes => [...new Set(codes.map(processGroup))];
const processGroupChips = (codes, role) => codes.length ? `<div class="sm-four-level-group"><span>${role}</span>${uniqueProcessGroups(codes).map(code => `<span class="sm-process-chip"><b>${code}</b> ${processGroupNames[code] || ''}</span>`).join('')}</div>` : '';
const sourceActionChips = (codes, role) => codes.length ? `<div class="sm-four-level-group"><span>${role}</span><span class="sm-action-chips">${codes.map(code => `<code>${code}</code>`).join(' ')}</span></div>` : '';

export function scenarioJourneyProcessMatrixHtml() {
  return `<section class="sm-four-level" aria-labelledby="sm-four-level-title">
    <div class="sm-four-level-heading"><h3 id="sm-four-level-title">How the four levels map</h3><p>The journey stage shows when the scenario is discussed. Process groups show where the source work comes from. M/C actions provide exact traceability.</p></div>
    <div class="sm-table-wrap"><table class="sm-table sm-four-level-table"><thead><tr><th>Customer journey</th><th>Process group</th><th>Scenario</th><th>Source actions</th></tr></thead><tbody>
      ${scenarioMappings.map(s => `<tr data-four-level-scenario="${escape(s.id)}"><td><span class="sm-mobile-label">Customer journey</span><strong>${s.stage === 'Clear' ? 'Confirm readiness' : s.stage}</strong></td><td><span class="sm-mobile-label">Process group</span>${processGroupChips(s.primary,'Primary')}${processGroupChips(s.related,'Related')}</td><th scope="row"><span class="sm-mobile-label">Scenario</span><span class="sm-scenario-number">${s.number}</span><button type="button" data-sn="scene" data-sn-value="${escape(s.id)}">${escape(s.title)}</button></th><td><span class="sm-mobile-label">Source actions</span>${sourceActionChips(s.primary,'Primary')}${sourceActionChips(s.related,'Related')}</td></tr>`).join('')}
    </tbody></table></div>
  </section>`;
}

export function scenarioSourceIndexHtml() {
  return `<details class="sm-scenario-index-fold">
    <summary><span><strong>Scenario list & source mapping</strong><small>See how S1–S15 map to M/C source steps.</small></span><span class="sm-fold-count">15 scenarios <b aria-hidden="true">+</b></span></summary>
    <div class="sm-scenario-index-body">${scenarioJourneyProcessMatrixHtml()}<h3 class="sm-source-list-title">Scenario source details</h3><p class="sm-scenario-index-note">Primary steps form the scenario backbone. Related steps are inputs, reuse or handoffs.</p>
      <div class="sm-table-wrap"><table class="sm-table"><thead><tr><th>Scenario</th><th>Primary source steps</th><th>Related sources</th><th><span class="sr-only">Open scenario</span></th></tr></thead><tbody>
        ${scenarioMappings.map(s => `<tr data-scenario-id="${escape(s.id)}"><th scope="row"><span class="sm-scenario-number">${s.number}</span><button type="button" data-sn="scene" data-sn-value="${escape(s.id)}">${escape(s.title)}</button><small>${s.stage === 'Clear' ? 'Confirm readiness' : s.stage}</small></th><td><span class="sm-mobile-label">Primary source steps</span>${s.primary.map(code => `<code>${code}</code>`).join(' ')}</td><td><span class="sm-mobile-label">Related sources</span>${s.related.length ? s.related.map(code => `<code>${code}</code>`).join(' ') : '—'}</td><td><button type="button" class="sm-open" data-sn="scene" data-sn-value="${escape(s.id)}" aria-label="${escape(`Open ${s.number} ${s.title}`)}">Open mapping <span aria-hidden="true">→</span></button></td></tr>`).join('')}
      </tbody></table></div>
    </div>
  </details>`;
}
