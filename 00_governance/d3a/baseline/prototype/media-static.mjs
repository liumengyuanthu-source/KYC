import {story} from './batch-a-media-story.mjs';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function staticMediaStory(scene,locale='en-AU'){
 const asset=scene==='SCN-SCOPE'?'DMO-A01':scene==='SCN-ENTITY'?'DMO-A02':null;if(!asset)return '';
 const t=story.locales[locale]||story.locales['en-AU'];
 const facts=[`Entity A · Australia / FX forward`,`Group A · ${t.group_not_key}`,`Entity B · Singapore / ${t.reported} / Person T · ${t.employer}: Entity B`,`${t.booking}: ${t.not_provided} / ${t.eligibility}: ${t.not_assessed}`,`${t.principal}: Entity A / ${t.coordinate}: ${t.evidence_required}`,`${t.declarations}: ${t.not_established} / ${t.agreements}: ${t.not_established} / ${t.trading}: ${t.not_assessed}`,`EV-A05: ${t.not_received} / ${t.owner}: ${t.unassigned}`,t.prep_gate,t.no_send,t.publication];
 return `<section class="media-static-story" data-static-asset="${asset}" lang="${esc(locale)}"><h3>${asset} · panel-first / r01 · ${esc(t.read_only)}</h3><p>${esc(locale==='zh-CN'?'固定合成叙事，非当前案件记录；播放不更新业务状态。':'Frozen synthetic narrative, not the live case record; playback never updates business state.')}</p><ol>${story.cues[asset].map(c=>`<li data-media-cue="${c.id}"><h4>${c.id} · ${esc(t[c.title])}</h4><p>${esc(t[c.description])}</p><small>${esc(c.beat)} · ${esc(c.diagram)} · ${c.start}–${c.end}s</small></li>`).join('')}</ol><h4>${esc(t.not_ready)}</h4><ul>${facts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`;
}
export function mediaSlot(scene,locale){
 const zh=locale==='zh-CN';return `<section class="mainline-media" aria-label="${zh?'已批准只读讲解':'Approved read-only story'}"><p class="media-boundary">${zh?'已批准样片 · 只读故事层。下方「实际会话」独立保留最新业务记录。':'Approved sample · read-only story layer. The live session below retains its latest business records.'}</p><div class="media-player-slot" data-media-scene="${scene}" aria-label="${zh?'只读播放器':'Read-only player'}"></div><details class="media-fallback" open><summary>${zh?'完整静态讲解（所有节点）':'Complete static story (all cues)'}</summary>${staticMediaStory(scene,locale)}</details></section>`;
}
