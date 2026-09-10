export class StoryPlayer{
 constructor(update){this.time=0;this.duration=16;this.playing=false;this.last=null;this.frame=0;this.update=update;this.limit=()=>this.duration}
 play(){if(this.playing)return;this.playing=true;this.last=null;this.frame=requestAnimationFrame(t=>this.tick(t));this.update()}
 tick(now){if(!this.playing)return;const end=Math.min(this.duration,this.limit());if(this.last!==null)this.time=Math.min(end,this.time+(now-this.last)/1000);this.last=now;if(this.time>=end){this.playing=false;this.last=null;this.frame=0;this.update();return}this.update();this.frame=requestAnimationFrame(t=>this.tick(t))}
 pause(){cancelAnimationFrame(this.frame);this.frame=0;this.playing=false;this.last=null;this.update()}
 seek(t){this.time=Math.max(0,Math.min(this.duration,t));this.last=null;this.update()}
 reset(duration){cancelAnimationFrame(this.frame);this.frame=0;this.time=0;this.last=null;this.duration=duration;this.playing=false}
}
