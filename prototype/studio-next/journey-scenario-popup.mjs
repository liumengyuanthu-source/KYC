import {scenarioMappings, getSourceDetail, relatedRoles} from './scenario-mapping.mjs';
import {heroCaseStory} from './hero-case-stories.mjs';

// A journey node is a reading entry point. Its scenarios keep the guideline's
// complete scope; source codes are not reassigned to individual canvas shapes.
export const nodeScenarios = {
  trigger:['SCOPE'], booking:['SCOPE'], intake:['SCOPE','ENTITY'],
  requirements:['REQUIREMENTS'], evidence:['SOURCE','GAP'], screening:['POPULATION','MATCH'],
  'edd-applies':['EDD'], qa:['QA'], readiness:['READINESS','PUBLISH'],
  'client-intake':['SCOPE','ENTITY'], 'client-evidence':['SOURCE','GAP'],
  'client-screening':['MATCH'], 'client-edd':['EDD'], 'client-qa':['QA'],
  'client-outcome':['PUBLISH'], 'rm-context':['SCOPE','ENTITY'], 'rm-requests':['GAP','SOURCE'],
  'rm-outcome':['PUBLISH'], sufficiency:['VALIDATE'], 'screen-decision':['MATCH'],
  'edd-judgement':['EDD'], assurance:['QA'], systems:['READINESS','PUBLISH'],
  'conflicts-start':['CONFLICTS'], 'conflicts-end':['CONFLICTS'],
  'credit-start':['CREDIT'], 'credit-work':['CREDIT'], 'credit-end':['CREDIT'],
  'legal-start':['LEGAL'], 'legal-work':['LEGAL'], 'legal-end':['LEGAL'],
};
export function scenariosForNode(nodeId) {
  return (nodeScenarios[nodeId] || []).map(id => scenarioMappings.find(s => s.id === `SCN-${id}`)).filter(Boolean);
}
export function scenarioNumbersForNode(nodeId) {
  return scenariosForNode(nodeId).map(scenario => scenario.number).join(' · ');
}
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const SVG_NS = 'http://www.w3.org/2000/svg';
export function installScenarioBadges(svg) {
  for (const node of svg.querySelectorAll('[data-node-id]')) {
    const scenarios = scenariosForNode(node.getAttribute('data-node-id'));
    if (!scenarios.length || node.querySelector('.jsp-node-scenario-badge')) continue;
    let sourceBox;
    try { sourceBox = JSON.parse(node.getAttribute('data-source-box')); } catch { continue; }
    if (!Array.isArray(sourceBox) || sourceBox.length < 4) continue;
    const [x,y,width] = sourceBox.map(Number);
    if (![x,y,width].every(Number.isFinite)) continue;
    let cursor = x + width + 4;
    for (const scenario of [...scenarios].reverse()) {
      const badgeWidth = scenario.number.length > 2 ? 34 : 30;
      cursor -= badgeWidth;
      const badge = document.createElementNS(SVG_NS,'g');
      badge.setAttribute('class','jsp-node-scenario-badge');
      badge.setAttribute('data-scenario-number',scenario.number);
      badge.setAttribute('aria-hidden','true');
      const rect = document.createElementNS(SVG_NS,'rect');
      rect.setAttribute('x',String(cursor));
      rect.setAttribute('y',String(y - 8));
      rect.setAttribute('width',String(badgeWidth));
      rect.setAttribute('height','18');
      rect.setAttribute('rx','9');
      const text = document.createElementNS(SVG_NS,'text');
      text.setAttribute('x',String(cursor + badgeWidth / 2));
      text.setAttribute('y',String(y + 4));
      text.setAttribute('text-anchor','middle');
      text.textContent = scenario.number;
      badge.append(rect,text);
      node.append(badge);
      cursor -= 3;
    }
    const existingLabel = node.getAttribute('aria-label') || node.getAttribute('data-node-label') || '';
    node.setAttribute('aria-label',`${existingLabel}. Scenarios ${scenarios.map(scenario => scenario.number).join(', ')}`);
  }
}

// S1 currently opens the approved M0.1 Version 2 workshop sample. Other scenarios retain
// their existing detail until their own workshop templates are available.
export function scenarioCtaHtml(id) {
  const scenario = scenarioMappings.find(s => s.id === id);
  if (!scenario) return '';
  const attrs = `class="jsp-cta" data-scenario-id="${id}" aria-label="View scenario detail: ${esc(scenario.number)} · ${esc(scenario.title)}"`;
  const label = '<span>View scenario detail</span><span aria-hidden="true">↗</span>';
  return id === 'SCN-SCOPE'
    ? `<a ${attrs} href="../scenario-samples/m0-1-v2/index.html#6" target="_blank" rel="noopener noreferrer">${label}</a>`
    : `<button type="button" ${attrs}><span>View scenario detail</span><span aria-hidden="true">→</span></button>`;
}

function sourceRow(s, code, related) {
  const d = getSourceDetail(s.id, code);
  const target = d.occurrences.filter(o => o.page === 'p2');
  return `<details class="jsp-source" data-source-code="${code}" data-source-role="${d.relationship}">
    <summary><code>${code}</code><span>${esc(d.title)}</span><span class="jsp-expand" aria-hidden="true">+</span></summary>
    <div class="jsp-source-body"><p><span>${s.number}</span> · <span>${related ? esc(relatedRoles[s.number]?.[code] || 'Context & dependencies') : `Primary source · scenario backbone`}</span></p>
    ${d.note ? `<p data-i18n-source>${esc(d.note)}</p>` : ''}
    ${d.currentLane === 'NOT_PRESENT' ? '<p>Explicit in Target only. Do not infer that the responsibility was absent in Current.</p>' : ''}
    <details class="jsp-origins"><summary>Source locations</summary><dl><dt>Current</dt><dd data-i18n-source>${esc(d.currentLane)}</dd><dt>Target</dt><dd data-i18n-source>${esc(d.targetLane)}</dd></dl>
    ${target.length > 1 ? `<p class="jsp-occurrence-note">Multiple Target occurrences share this code; each source location is retained.</p>` : ''}
    <ul class="jsp-occurrences">${d.occurrences.map(o => `<li><span>${o.page === 'p1' ? 'Current' : 'Target'}</span><span data-i18n-source>${esc(o.lane)}</span><code>${esc(o.action)}</code></li>`).join('')}</ul></details>
    </div></details>`;
}

export function scenarioSourceRowHtml(id, code) {
  const scenario = scenarioMappings.find(s => s.id === id);
  if (!scenario || ![...scenario.primary,...scenario.related].includes(code)) return '';
  return sourceRow(scenario,code,scenario.related.includes(code));
}

export function scenarioPopupHtml(id,{heroCase=false,locale='en-US'}={}) {
  const s = scenarioMappings.find(s => s.id === id);
  if (!s) return '';
  const chips = (codes, related) => codes.map(code => `<button type="button" data-jsp-source="${code}" data-source-role="${related ? 'related' : 'primary'}" aria-label="${code} · ${esc(getSourceDetail(s.id, code).title)}" aria-pressed="false" aria-controls="jsp-source-preview"><code>${code}</code></button>`).join('');
  const story = heroCase ? heroCaseStory(id,locale) : '';
  const storyLabel = locale === 'zh-CN' ? 'HERO CASE · 业务故事' : 'HERO CASE · BUSINESS STORY';
  return `<article class="jsp-scenario" data-scenario-id="${s.id}" aria-labelledby="jsp-scenario-title">
    <div class="jsp-meta"><span>${s.number}</span><span>${s.stage === 'Clear' ? 'Confirm readiness' : s.stage}</span></div>
    <h2 id="jsp-scenario-title">${esc(s.title)}</h2>
    ${story ? `<section class="jsp-hero-story"><strong>${storyLabel}</strong><p data-hero-case-story>${esc(story)}</p></section>` : ''}
    <section class="jsp-primary"><h3>Primary source steps <span>${s.primary.length}</span></h3><p class="jsp-caption">These steps form this scenario’s backbone.</p><div class="jsp-source-chips">${chips(s.primary,false)}</div></section>
    <section class="jsp-related"><h3>Related source steps <span>${s.related.length}</span></h3><div class="jsp-source-chips">${chips(s.related,true)}</div>${!s.related.length ? '<p>No related actions specified.</p>' : '<p class="jsp-caption">Inputs, reuse and handoffs; not extra steps in sequence.</p>'}</section>
    <div id="jsp-source-preview" class="jsp-source-preview" aria-live="polite"><p class="jsp-caption">Select a source step to see its role and origin.</p></div>
    <details class="jsp-notes jsp-rationale"><summary>How these steps connect</summary><p>${esc(s.rationale)}</p></details>
    <details class="jsp-notes"><summary>Mapping notes</summary><p>${esc(s.note)}</p><p>Source labels show provenance, not an execution order.</p></details>
  </article>`;
}

export function installScenarioPopup() {
  const inspector = document.getElementById('focus-chip');
  const svg = document.querySelector('svg[data-focus-active]') || document.querySelector('.diagram-container svg');
  if (!inspector || !svg) return;
  installScenarioBadges(svg);
  inspector.classList.add('jsp-inspector');
  document.querySelector('.ctt-node-detail')?.remove();
  const scroll = document.createElement('div');
  scroll.className = 'jsp-scroll';
  const picker = document.createElement('div');
  picker.className = 'jsp-picker';
  const content = document.createElement('div');
  const connections = document.createElement('details');
  connections.className = 'jsp-connections';
  connections.innerHTML = '<summary>Map connections</summary>';
  // Retain the existing reachability and relationship controls and their listeners.
  for (const id of ['focus-summary','focus-reach','relationship-lens-list']) {
    const el = document.getElementById(id);
    if (el) connections.append(el);
  }
  scroll.append(picker, content, connections);
  const footer = document.createElement('footer');
  footer.className = 'jsp-footer';

  inspector.append(scroll, footer);
  const eyebrow = inspector.querySelector('.relationship-lens-eyebrow');
  eyebrow.textContent = 'JOURNEY STEP';
  const closeButton = document.getElementById('btn-focus-clear');
  closeButton.setAttribute('aria-label','Close scenario preview');
  let activeNode = null;
  let activeScenario = null;
  const isHeroCase = location.pathname.includes('hero-journey');
  const currentLocale = () => window.CTTLanguage?.locale || new URLSearchParams(location.search).get('locale') || 'en-US';
  const translate = () => window.CTTLanguage?.refresh();
  content.addEventListener('click', event => {
    const button = event.target.closest('[data-jsp-source]');
    if (!button) return;
    const s = scenarioMappings.find(s => s.id === activeScenario);
    const code = button.dataset.jspSource;
    if (!s || ![...s.primary,...s.related].includes(code)) return;
    content.querySelectorAll('[data-jsp-source]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
    const preview = content.querySelector('#jsp-source-preview');
    preview.innerHTML = scenarioSourceRowHtml(s.id,code);
    preview.querySelector('details').open = true;
    translate();
    preview.scrollIntoView({block:'nearest'});
  });
  const renderScenario = (id, resetScroll = true,locale = currentLocale()) => {
    activeScenario = id;
    content.innerHTML = scenarioPopupHtml(id,{heroCase:isHeroCase,locale});
    footer.innerHTML = scenarioCtaHtml(id);
    if (resetScroll) scroll.scrollTop = 0;
    translate();
  };
  const sync = () => {
    const selected = svg.querySelectorAll('[data-node-id][data-focus-selected]');
    if (selected.length !== 1) { activeNode = null; return; }
    const nodeId = selected[0].getAttribute('data-node-id');
    if (nodeId === activeNode) return;
    activeNode = nodeId;
    const scenarios = scenariosForNode(nodeId);
    inspector.classList.toggle('jsp-has-scenario', scenarios.length > 0);
    picker.replaceChildren();
    content.replaceChildren();
    footer.hidden = !scenarios.length;
    connections.open = !scenarios.length;
    if (!scenarios.length) { activeScenario = null; return; }
    if (scenarios.length > 1) {
      const label = document.createElement('label');
      label.innerHTML = '<span>Scenarios at this step</span>';
      const select = document.createElement('select');
      select.setAttribute('aria-label','Scenarios at this step');
      for (const s of scenarios) {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = `${s.number} · ${s.title}`;
        select.append(option);
      }
      select.addEventListener('change', () => renderScenario(select.value));
      label.append(select);
      picker.append(label);
    }
    renderScenario(scenarios[0].id);
  };
  const open = () => {
    if (!activeScenario) return;
    if (parent === window) {
      const url = new URL('../index.html', location.href);
      url.search = new URLSearchParams({studio:'fulljourney',dimension:location.pathname.includes('hero-journey')?'hero':'cj',locale:window.CTTLanguage?.locale || 'en-US',scenario:activeScenario});
      location.href = url.href;
    } else parent.postMessage({channel:'ctt-approved-map',type:'select',kind:'scene',id:activeScenario},location.origin);
  };
  footer.addEventListener('click', event => {
    if (event.target.closest('button.jsp-cta')) open();
  });
  new MutationObserver(sync).observe(svg, {subtree:true,attributes:true,attributeFilter:['data-focus-selected']});
  // Keyboard, hash links, story focus and mouse selection share the same state.
  sync();
  addEventListener('message', e => {
    if (e.source !== parent || e.origin !== location.origin) return;
    if (e.data?.channel === 'ctt-approved-map' && e.data.type === 'focus') footer.querySelector('.jsp-cta')?.focus();
    if (e.data?.channel === 'ctt-locale' && activeScenario) renderScenario(activeScenario,false,e.data.locale);
  });
  parent.postMessage({channel:'ctt-approved-map',type:'height',height:950},location.origin);
  parent.postMessage({channel:'ctt-approved-map',type:'ready'},location.origin);
}

if (typeof document !== 'undefined') installScenarioPopup();
