const REVISION = 'r01';
const SCENE_ASSET = Object.freeze({
  'SCN-SCOPE': 'DMO-A01',
  'SCN-ENTITY': 'DMO-A02'
});
const TIMELINES = Object.freeze({
  'DMO-A01': Object.freeze([
    Object.freeze({start: 0, end: 3}),
    Object.freeze({start: 3, end: 6}),
    Object.freeze({start: 6, end: 9.5}),
    Object.freeze({start: 9.5, end: 13}),
    Object.freeze({start: 13, end: 16})
  ]),
  'DMO-A02': Object.freeze([
    Object.freeze({start: 0, end: 3}),
    Object.freeze({start: 3, end: 6}),
    Object.freeze({start: 6, end: 9.5}),
    Object.freeze({start: 9.5, end: 13, hold: true}),
    Object.freeze({start: 13, end: 16.5}),
    Object.freeze({start: 16.5, end: 20})
  ])
});

const finiteNumber = value => typeof value === 'number' && Number.isFinite(value);
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const durationFor = asset => TIMELINES[asset].at(-1).end;
const beatFor = (asset, time) => {
  const timeline = TIMELINES[asset];
  const found = timeline.findIndex(cue => time < cue.end);
  return found < 0 ? timeline.length - 1 : found;
};
const snapshotFrom = (asset, time, holdPassed, playing) => ({
  asset,
  revision: REVISION,
  time,
  beat: beatFor(asset, time),
  holdPassed,
  playing
});
const normaliseState = input => {
  const asset = input?.asset === 'DMO-A02' ? 'DMO-A02' : 'DMO-A01';
  const duration = durationFor(asset);
  const holdPassed = asset === 'DMO-A02' && input?.holdPassed === true;
  let time = finiteNumber(input?.time) ? clamp(input.time, 0, duration) : 0;
  if (asset === 'DMO-A02' && !holdPassed) time = Math.min(time, 9.5);
  const playing = input?.playing === true && time < duration &&
    !(asset === 'DMO-A02' && !holdPassed && time >= 9.5);
  return snapshotFrom(asset, time, holdPassed, playing);
};

export function initialMediaState(scene, saved) {
  const asset = SCENE_ASSET[scene] || 'DMO-A01';
  const usable = saved?.asset === asset && saved?.revision === REVISION ? saved : null;
  const state = normaliseState({asset, ...usable, playing: false});
  return {...state, playing: false};
}

export function reduceMedia(input, intent) {
  const state = normaliseState(input);
  if (!intent || typeof intent !== 'object' || typeof intent.type !== 'string') return state;
  const timeline = TIMELINES[state.asset];
  const duration = durationFor(state.asset);

  if (intent.type === 'pause') return {...state, playing: false};
  if (intent.type === 'play') {
    const blocked = state.asset === 'DMO-A02' && !state.holdPassed && state.time >= 9.5;
    return {...state, playing: state.time < duration && !blocked};
  }
  if (intent.type === 'replay') return snapshotFrom(state.asset, 0, false, false);
  if (intent.type === 'seek') {
    if (!finiteNumber(intent.time)) return state;
    let time = clamp(intent.time, 0, duration);
    if (state.asset === 'DMO-A02' && !state.holdPassed) time = Math.min(time, 9.5);
    return snapshotFrom(state.asset, time, state.holdPassed, false);
  }
  if (intent.type === 'tick') {
    if (!state.playing || !finiteNumber(intent.seconds) || intent.seconds <= 0) return state;
    let time = Math.min(duration, state.time + intent.seconds);
    if (state.asset === 'DMO-A02' && !state.holdPassed) time = Math.min(time, 9.5);
    const playing = time < duration &&
      !(state.asset === 'DMO-A02' && !state.holdPassed && time >= 9.5);
    return snapshotFrom(state.asset, time, state.holdPassed, playing);
  }
  if (intent.type === 'next') {
    if (state.beat === timeline.length - 1) return {...state, playing: false};
    const nextBeat = Math.min(timeline.length - 1, state.beat + 1);
    let holdPassed = state.holdPassed;
    let time = timeline[nextBeat].start;
    if (state.asset === 'DMO-A02' && state.beat === 3 && !holdPassed) {
      holdPassed = true;
      time = 13;
    }
    return snapshotFrom(state.asset, time, holdPassed, false);
  }
  if (intent.type === 'previous') {
    const previousBeat = Math.max(0, state.beat - 1);
    return snapshotFrom(state.asset, timeline[previousBeat].start, state.holdPassed, false);
  }
  return state;
}

const SUPPORTED_LOCALES = new Set(['zh-CN', 'en-AU', 'en-US']);
const BUNDLE_ROOT = new URL('./media/d2-batch-a/r01/', import.meta.url);
const EMERGENCY_CSS = `:host{display:block;min-width:0;color:#172b4d;font:14px/1.45 Arial,sans-serif}*,.media-shell,.stage,.stage-body,.work-surface{box-sizing:border-box;min-width:0}[hidden]{display:none!important}.media-shell{overflow-wrap:anywhere;border:1px solid #c9d8e4;border-radius:12px;background:#fff;padding:18px}.transport,.cue-controls{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}button{font:inherit;padding:8px 12px}.stage-body{display:grid;grid-template-columns:180px minmax(0,1fr);gap:18px}.diagram-host img,.portrait img,.ops img{display:block;max-width:100%;height:auto}.case-result{margin-top:12px;padding:12px;border-top:1px solid #c9d8e4}.case-result strong{color:#b42318}@media(max-width:680px){.stage-body{grid-template-columns:1fr}}`;
const mounted = new WeakMap();
const cloneSnapshot = state => ({
  asset: state.asset,
  revision: REVISION,
  time: state.time,
  beat: state.beat,
  holdPassed: state.holdPassed,
  playing: state.playing
});
const humanize = key => String(key).replaceAll('_', ' ');

export async function mountMedia(element, options = {}) {
  if (!element || typeof element.attachShadow !== 'function') {
    throw new TypeError('mountMedia requires a Shadow DOM host element');
  }
  mounted.get(element)?.destroy();

  const locale = SUPPORTED_LOCALES.has(options.locale) ? options.locale : 'en-AU';
  const comparison = String(options.comparison).toLowerCase() === 'current' ? 'current' : 'target';
  let state = initialMediaState(options.scene, options.snapshot);
  let alive = true;
  let raf = 0;
  let lastFrame = null;
  let lastRenderedBeat = -1;
  let lastNotified = null;
  let helpPinned = false;
  let suppressHelpFocus = false;
  let mediaQuery = null;
  let reduced = false;
  const requests = new AbortController();
  const events = new AbortController();
  const shadow = element.shadowRoot || element.attachShadow({mode: 'open'});
  const style = document.createElement('style');
  style.textContent = EMERGENCY_CSS;
  const loading = document.createElement('section');
  loading.className = 'media-shell media-loading';
  loading.textContent = 'Loading read-only story…';
  shadow.replaceChildren(style, loading);

  const api = Object.freeze({
    pause,
    destroy,
    snapshot: () => cloneSnapshot(state)
  });
  mounted.set(element, api);
  const externalSignal = options.signal && typeof options.signal.addEventListener === 'function' ? options.signal : null;
  externalSignal?.addEventListener('abort', destroy, {once: true});
  if (externalSignal?.aborted) {
    destroy();
    throw new DOMException('Media mount aborted', 'AbortError');
  }

  const readText = async url => {
    const response = await fetch(url, {signal: requests.signal});
    if (!response.ok) throw new Error(`Media resource unavailable (${response.status})`);
    return response.text();
  };
  const readJson = async url => JSON.parse(await readText(url));
  const [contentResult, viewsResult, localeResult, sourceCssResult, bridgeCssResult] = await Promise.allSettled([
    import(new URL('src/content.js', BUNDLE_ROOT).href),
    import(new URL('src/views.js', BUNDLE_ROOT).href),
    readJson(new URL(`locales/${locale}.json`, BUNDLE_ROOT)),
    readText(new URL('styles/media.css', BUNDLE_ROOT)),
    readText(new URL('./batch-a-media.css', import.meta.url))
  ]);
  if (!alive || externalSignal?.aborted || !element.isConnected) {
    destroy();
    throw new DOMException('Media mount cancelled', 'AbortError');
  }
  const requiredResults = [contentResult, viewsResult, localeResult];
  const failedRequired = requiredResults.find(result => result.status === 'rejected');
  const content = contentResult.status === 'fulfilled' ? contentResult.value : null;
  const views = viewsResult.status === 'fulfilled' ? viewsResult.value : null;
  const messages = localeResult.status === 'fulfilled' ? localeResult.value : null;
  if (failedRequired || !content?.projection || !Array.isArray(content?.cues?.[state.asset]) ||
      typeof views?.scopeView !== 'function' || typeof views?.authorityView !== 'function' ||
      typeof views?.relationRecords !== 'function' || !messages || typeof messages !== 'object') {
    const cause = failedRequired?.reason;
    destroy();
    throw new Error('Required r01 media content, views, or locale unavailable', {cause});
  }
  const t = key => messages[key] ?? humanize(key);
  const cues = content.cues[state.asset];
  const sourceCss = sourceCssResult.status === 'fulfilled' ? sourceCssResult.value : '';
  const bridgeCss = bridgeCssResult.status === 'fulfilled' ? bridgeCssResult.value : '';
  style.textContent = sourceCss || bridgeCss ? `${sourceCss}\n${bridgeCss}` : EMERGENCY_CSS;

  const markup = `<section class="media-shell" aria-label="${t('read_only')}">
    <header class="media-heading">
      <div><span class="eyebrow">${state.asset} / ${SCENE_ASSET['SCN-ENTITY'] === state.asset ? 'SCN-ENTITY' : 'SCN-SCOPE'} / r01</span><h2 data-story-title></h2></div>
      <div class="comparison" aria-label="${t('comparison')}"><span class="comparison-option" data-comparison="current">${t('current')}</span><span class="comparison-option" data-comparison="target">${t('target')}</span></div>
    </header>
    <div class="transport" data-media-controls>
      <button type="button" class="primary" data-action="play"><span data-play-symbol>▶</span> <span data-play-label>${t('play')}</span></button>
      <button type="button" data-action="previous">${t('previous')}</button>
      <button type="button" data-action="next">${t('next')}</button>
      <button type="button" data-action="replay">${t('replay')}</button>
      <output data-time>00:00 / 00:${String(durationFor(state.asset)).padStart(2, '0')}</output>
      <small>${t('duration_note')}</small>
    </div>
    <section class="stage">
      <header class="case-strip"><div><span>DEMO-CTT-001</span><b>Entity A <small>/ FX forward</small></b></div><span class="read-only">${t('read_only')}</span><span class="status readiness-head">${t('not_ready')}</span><div><span>${t('booking')}</span><b>${t('not_provided')}</b></div><div><span>${t('eligibility')}</span><b>${t('not_assessed')}</b></div></header>
      <div class="stage-body">
        <aside class="people"><div class="portrait"><img src="${new URL('assets/personas/MED-A-PER-T__editorial__r01__4x5.webp', BUNDLE_ROOT).href}" alt="${t('portrait_t_alt')}"><span class="photo-label">SYNTHETIC</span></div><div class="person-identity"><h3>Person T</h3><p>${t('person_role')}</p><small>${t('person_claim')}</small></div><div class="ops"><img src="${new URL('assets/personas/MED-A-PER-OPS__editorial__r01__1x1.webp', BUNDLE_ROOT).href}" alt="${t('portrait_ops_alt')}"><div><b>${t('ops')}</b><small>${t('ops_note')}</small></div></div></aside>
        <div class="work-surface"><div class="surface-heading"><div class="surface-title"><h3 id="media-surface-title" data-surface-title></h3><span class="help-wrap"><button type="button" data-help aria-label="${t('help_label')}" aria-expanded="false" aria-controls="media-help-dialog">i</button><span id="media-help-dialog" class="help-content" data-help-content hidden role="dialog" aria-labelledby="media-surface-title" aria-describedby="media-help-text"><span id="media-help-text" data-help-text></span><button type="button" data-help-close>${t('close_help')}</button></span></span></div><span class="status" data-scope-badge></span></div><div data-business-view></div></div>
      </div>
      <footer class="case-result"><div><span class="blocked-dot"></span><strong>${t('not_ready')}</strong><span data-result-reason></span></div><small>${t('publication')}</small></footer>
    </section>
    <section class="story-panel"><nav class="cue-controls" data-media-controls aria-label="${t('cue')}">${cues.map((cue, index) => `<button type="button" data-beat-index="${index}" aria-label="${cue.id}: ${t(cue.title)}">${String(index + 1).padStart(2, '0')} · ${t(cue.title)}</button>`).join('')}</nav><div class="story-commentary"><div><span data-cue-id></span><b data-cue-title></b><p data-cue-description></p></div><div class="actor"><span data-actor-label></span><small data-actor-note></small></div></div><div class="focus-chips" data-focus-chips aria-label="${t('cue')}"></div><p class="notice" data-notice role="status"></p></section>
    <details class="diagram-section" open><summary>${t('relations')} <small data-diagram-id></small></summary><p data-diagram-description></p><div class="diagram-host"><img data-diagram alt=""></div><div class="diagram-fallback" data-diagram-fallback hidden><p>${t('diagram_fallback')}</p><div data-fallback-records></div></div></details>
    <section class="static-story" aria-labelledby="static-story-heading"><h3 id="static-story-heading">${t('overview')}</h3><div class="static-grid">${cues.map(cue => `<article><b>${cue.id} · ${t(cue.title)}</b><p>${t(cue.description)}</p></article>`).join('')}</div><p><strong>${t('not_ready')}</strong> · ${state.asset === 'DMO-A01' ? t('result_scope') : t('result_authority')}</p><p>${t('synthetic')} · ${t('publication')}</p></section>
  </section>`;
  const template = document.createElement('template');
  template.innerHTML = markup;
  shadow.replaceChildren(style, template.content.cloneNode(true));

  const $ = selector => shadow.querySelector(selector);
  const $$ = selector => [...shadow.querySelectorAll(selector)];
  mediaQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  reduced = mediaQuery?.matches === true;

  function renderBusiness() {
    const host = $('[data-business-view]');
    if (!host) return;
    const projection = content.projection(state.asset, state.beat);
    host.innerHTML = state.asset === 'DMO-A01'
      ? views.scopeView(projection, t, state.beat)
      : views.authorityView(projection, t, state.beat);
    const focus = cues[state.beat]?.focus || [];
    $$('[data-focus-object]').forEach(node => node.classList.toggle('selected', focus.includes(node.dataset.focusObject)));
  }

  function render(force = false) {
    if (!alive) return;
    element.dataset.mediaAsset = state.asset;
    element.dataset.mediaTime = String(Math.round(state.time * 1000) / 1000);
    element.dataset.mediaBeat = String(state.beat);
    element.dataset.mediaPlaying = String(state.playing);
    $('[data-time]').textContent = `00:${String(Math.floor(state.time)).padStart(2, '0')} / 00:${String(durationFor(state.asset)).padStart(2, '0')}`;
    $('[data-play-symbol]').textContent = state.playing ? 'Ⅱ' : '▶';
    $('[data-play-label]').textContent = t(state.playing ? 'pause' : 'play');
    $('[data-action="previous"]').disabled = state.beat === 0;
    $('[data-action="next"]').disabled = state.beat === cues.length - 1;
    $$('[data-beat-index]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.beatIndex) === state.beat)));
    $('[data-notice]').textContent = state.asset === 'DMO-A02' && state.time >= 9.5 && !state.holdPassed
      ? t('hold_notice') : state.time >= durationFor(state.asset) ? t('ended')
        : state.time === 0 && !state.playing ? t('poster_notice') : '';
    if (!force && lastRenderedBeat === state.beat) return;
    lastRenderedBeat = state.beat;
    const cue = cues[state.beat] || cues[0];
    $('[data-story-title]').textContent = t(state.asset === 'DMO-A01' ? 'a01_title' : 'a02_title');
    $('[data-surface-title]').textContent = t(state.asset === 'DMO-A01' ? 'scope' : 'authority');
    $('[data-help-text]').textContent = t(state.asset === 'DMO-A01' ? 'scope_help' : 'authority_help');
    $('[data-scope-badge]').textContent = state.asset === 'DMO-A01'
      ? t(state.beat >= 3 ? 'scope_recorded' : state.beat >= 2 ? 'scope_clarified' : 'scope_draft')
      : t('evidence_required');
    $('[data-result-reason]').textContent = t(state.asset === 'DMO-A01' ? 'result_scope' : 'result_authority');
    $('[data-cue-id]').textContent = cue.id;
    $('[data-cue-title]').textContent = t(cue.title);
    $('[data-cue-description]').textContent = t(cue.description);
    $('[data-actor-label]').textContent = t(comparison === 'current' ? 'current_actor' : 'target_actor');
    $('[data-actor-note]').textContent = t(comparison === 'current' ? 'current_note' : 'target_note');
    $('[data-focus-chips]').innerHTML = cue.focus.map(name => `<span>${humanize(name)}</span>`).join('');
    $$('[data-comparison]').forEach(node => node.setAttribute('aria-current', String(node.dataset.comparison === comparison)));
    renderBusiness();
    renderDiagram(cue);
  }

  function renderDiagram(cue) {
    const language = locale === 'zh-CN' ? 'zh-CN' : 'en-AU';
    const image = $('[data-diagram]');
    const fallback = $('[data-diagram-fallback]');
    const descriptionKey = cue.diagram === 'DG-SCOPE-A' ? 'diagram_alt_scope'
      : cue.diagram === 'DG-ENTITY-A' ? 'diagram_alt_entity' : 'diagram_alt_enable';
    image.hidden = false;
    fallback.hidden = true;
    image.alt = t(descriptionKey);
    image.src = new URL(`assets/diagrams/${cue.diagram}__r01__${language}.svg`, BUNDLE_ROOT).href;
    $('[data-diagram-id]').textContent = `${cue.diagram} · Archify 2.17 · r01`;
    $('[data-diagram-description]').textContent = t(descriptionKey);
    $('[data-fallback-records]').innerHTML = views.relationRecords(state.asset, t);
  }

  function emit(force = false) {
    if (typeof options.onChange !== 'function') return;
    const next = cloneSnapshot(state);
    const shouldSend = force || !lastNotified || next.beat !== lastNotified.beat ||
      next.playing !== lastNotified.playing || next.holdPassed !== lastNotified.holdPassed ||
      Math.abs(next.time - lastNotified.time) >= 0.25;
    if (!shouldSend) return;
    lastNotified = next;
    try { options.onChange({...next}); } catch { /* Media callbacks cannot break playback. */ }
  }

  function apply(intent, forceNotify = true) {
    const previous = state;
    state = reduceMedia(state, intent);
    render(previous.beat !== state.beat);
    emit(forceNotify);
    if (!state.playing && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      lastFrame = null;
    }
  }

  function frame(now) {
    if (!alive || !state.playing) return;
    if (lastFrame !== null) apply({type: 'tick', seconds: Math.min(0.25, Math.max(0, (now - lastFrame) / 1000))}, false);
    lastFrame = now;
    if (state.playing) raf = requestAnimationFrame(frame);
    else emit(true);
  }

  function play() {
    if (reduced) {
      const armed = reduceMedia(state, {type: 'play'});
      if (armed.playing) apply({type: 'next'});
      else apply({type: 'play'});
      return;
    }
    apply({type: 'play'});
    if (state.playing && !raf) {
      lastFrame = null;
      raf = requestAnimationFrame(frame);
    }
  }

  function pause() {
    if (!alive) return;
    apply({type: 'pause'});
  }

  function closeHelp(restoreFocus = false) {
    const trigger = $('[data-help]');
    const panel = $('[data-help-content]');
    if (!trigger || !panel) return;
    helpPinned = false;
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      suppressHelpFocus = true;
      trigger.focus();
      queueMicrotask(() => { suppressHelpFocus = false; });
    }
  }

  function openHelp(pin = false) {
    helpPinned = pin || helpPinned;
    $('[data-help-content]').hidden = false;
    $('[data-help]').setAttribute('aria-expanded', 'true');
  }

  function destroy() {
    if (!alive) return;
    if (state.playing) {
      state = reduceMedia(state, {type: 'pause'});
      emit(true);
    }
    alive = false;
    requests.abort();
    events.abort();
    externalSignal?.removeEventListener('abort', destroy);
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastFrame = null;
    mediaQuery?.removeEventListener?.('change', onMotionChange);
    shadow.replaceChildren();
    delete element.dataset.mediaAsset;
    delete element.dataset.mediaTime;
    delete element.dataset.mediaBeat;
    delete element.dataset.mediaPlaying;
    if (mounted.get(element) === api) mounted.delete(element);
  }

  function onMotionChange(event) {
    reduced = event.matches;
    if (reduced) pause();
  }

  shadow.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'play') state.playing ? pause() : play();
    else if (action) apply({type: action});
    const beat = event.target.closest('[data-beat-index]');
    if (beat) apply({type: 'seek', time: TIMELINES[state.asset][Number(beat.dataset.beatIndex)]?.start});
    if (event.target.closest('[data-help-close]')) closeHelp(true);
    else if (event.target.closest('[data-help]')) {
      const isOpen = !$('[data-help-content]').hidden;
      isOpen && helpPinned ? closeHelp() : openHelp(true);
    }
  }, {signal: events.signal});
  shadow.addEventListener('focusin', event => {
    if (!suppressHelpFocus && event.target.closest('[data-help]')) openHelp();
  }, {signal: events.signal});
  shadow.addEventListener('focusout', event => {
    if (event.target.closest('.help-wrap') && !event.relatedTarget?.closest?.('.help-wrap') && !helpPinned) closeHelp();
    if (!event.relatedTarget || !shadow.contains(event.relatedTarget)) pause();
  }, {signal: events.signal});
  shadow.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('[data-help-content]').hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeHelp(true);
      return;
    }
    if (!event.target.closest('[data-media-controls]')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      apply({type: 'next'});
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      apply({type: 'previous'});
    }
  }, {capture: true, signal: events.signal});
  $('[data-diagram]').addEventListener('error', () => {
    $('[data-diagram]').hidden = true;
    $('[data-diagram-fallback]').hidden = false;
  }, {signal: events.signal});
  $$('img:not([data-diagram])').forEach(image => image.addEventListener('error', () => {
    if (!image.isConnected) return;
    const fallback = document.createElement('span');
    fallback.className = 'image-error';
    fallback.textContent = t('portrait_missing');
    image.replaceWith(fallback);
  }, {signal: events.signal, once: true}));
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); }, {signal: events.signal});
  window.addEventListener('blur', pause, {signal: events.signal});
  mediaQuery?.addEventListener?.('change', onMotionChange);

  try {
    render(true);
    emit(true);
    return api;
  } catch (error) {
    destroy();
    throw error;
  }
}
