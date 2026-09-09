import {navigate} from './navigation.mjs';
const assets={'SCN-SCOPE':'DMO-A01','SCN-ENTITY':'DMO-A02'};
const times={'DMO-A01':[0,3,6,9.5,13],'DMO-A02':[0,3,6,9.5,13,16.5]};
export function sanitiseSnapshot(scene,value){
 const asset=Object.hasOwn(assets,scene)?assets[scene]:null;
 if(!asset||!value||value.asset!==asset||value.revision!=='r01'||!Number.isFinite(value.time))return null;
 const holdPassed=asset==='DMO-A02'&&value.holdPassed===true;
 const time=Math.max(0,Math.min(value.time,asset==='DMO-A01'?16:holdPassed?20:9.5));
 return {asset,revision:'r01',time,beat:times[asset].findLastIndex(t=>t<=time),holdPassed,playing:false};
}
export function previewNavigation(n,scene){
 if(!Object.hasOwn(assets,scene))return n;
 return {...navigate(n,{type:'SCENE',id:scene}),page:'studio',mode:n.mode==='print'?'print':n.mode,storyCursor:scene==='SCN-SCOPE'?0:1};
}
// Narrow presentation-only adapter: never receives a case/store/dispatch function.
export function createMediaHost({read,write,load=()=>import('./batch-a-media.mjs')}){
 let controller=null,ticket=0,activeScene=null,abort=null;
 const stop=()=>{if(controller){controller.pause();const safe=sanitiseSnapshot(activeScene,controller.snapshot());if(safe)write(activeScene,safe);controller.destroy();controller=null;}ticket++;abort?.abort();abort=null;activeScene=null;};
 return {
  stop,
  async mount(element,{scene,locale,comparison}){
   stop();if(!element||!Object.hasOwn(assets,scene))return;
   const own=++ticket;activeScene=scene;abort=new AbortController();const signal=abort.signal;const fallback=element.parentElement?.querySelector('.media-fallback');
   try{
    const module=await load();if(own!==ticket||!element.isConnected)return;
    const instance=await module.mountMedia(element,{scene,locale,comparison,signal,snapshot:sanitiseSnapshot(scene,read(scene)),onChange:value=>{
     if(own!==ticket||activeScene!==scene)return;const safe=sanitiseSnapshot(scene,value);if(safe)write(scene,safe);
    }});
    if(own!==ticket||!element.isConnected){instance.destroy();return;}
    controller=instance;element.dataset.mediaStatus='ready';if(fallback)fallback.open=false;
   }catch{
    if(own!==ticket)return;element.dataset.mediaStatus='fallback';
    const notice=locale==='zh-CN'?'播放器不可用；以下完整静态讲解仍可阅读与打印。':'Player unavailable; the complete static story below remains readable and printable.';
    (element.shadowRoot||element).textContent=notice;
    if(fallback)fallback.open=true;
   }
  }
 };
}
