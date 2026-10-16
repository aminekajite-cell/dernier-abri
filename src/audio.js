// Sons du jeu : générés en code avec Web Audio, plus des grognements de zombies enregistrés (assets/sounds, licence CC0, voir CREDITS.md).
// Expose l'objet global SFX : SFX.play('shot'), SFX.night(0..1) (ambiance et musique de nuit), SFX.toggle().
// Tout est protégé : si l'audio n'est pas disponible, le jeu continue sans son.
const SFX=(()=>{
 let ac=null,master=null,noiseBuf=null,amb=null,muted=false;
 try{muted=localStorage.getItem('abri-mute')==='1'}catch(e){}
 const last={};
 function init(){
  if(ac)return ac;
  try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ac=new A();
   master=ac.createGain();master.gain.value=muted?0:.55;master.connect(ac.destination);
   noiseBuf=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  }catch(e){ac=null}
  return ac}
 // le navigateur n'autorise le son qu'après un geste du joueur
 const unlock=()=>{zLoad();if(init()&&ac.state==='suspended')ac.resume().catch(()=>{})};
 ['pointerdown','touchstart','keydown'].forEach(ev=>addEventListener(ev,unlock,{passive:true}));
 // grognements enregistrés : chargés au premier geste du joueur, joués avec une hauteur au hasard.
 // Si un fichier n'est pas encore chargé (ou manque), on retombe sur le son généré.
 const ZN=30,ZS=[];let zReady=false;
 function zLoad(){if(zReady)return;zReady=true;try{for(let k=1;k<=ZN;k++){const a=new Audio();a.preload='auto';a.src='assets/sounds/zombie-'+String(k).padStart(2,'0')+'.mp3';ZS.push(a)}}catch(e){}}
 function zombie(vol,rate){if(muted||!ZS.length)return false;const a0=ZS[Math.floor(Math.random()*ZS.length)];if(!a0||a0.readyState<2)return false;
  try{const a=a0.cloneNode();a.volume=Math.max(0,Math.min(1,vol));a.playbackRate=rate||(.8+Math.random()*.45);a.preservesPitch=a.mozPreservesPitch=a.webkitPreservesPitch=false;const p=a.play();if(p&&p.catch)p.catch(()=>{});return true}catch(e){return false}}
 function noise(t,dur,{f=1200,q=1,type='bandpass',vol=.5,attack=.002,f2}={}){
  const s=ac.createBufferSource();s.buffer=noiseBuf;s.loop=true;
  const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);fl.Q.value=q;
  const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+attack);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  s.connect(fl);fl.connect(g);g.connect(master);s.start(t,Math.random()*1.5);s.stop(t+dur+.05)}
 function tone(t,dur,{f=220,f2,type='sine',vol=.4,attack=.005}={}){
  const o=ac.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+attack);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05)}
 const S={
  shot:t=>{noise(t,.09,{f:2400,q:.8,vol:.35});tone(t,.06,{f:180,f2:60,vol:.25})},
  snp:t=>{noise(t,.25,{f:1600,q:.6,vol:.55});tone(t,.18,{f:140,f2:40,vol:.4})},
  sht:t=>{noise(t,.22,{f:900,q:.5,vol:.6,type:'lowpass'});tone(t,.12,{f:110,f2:40,vol:.4})},
  mg:t=>{for(let k=0;k<3;k++)noise(t+k*.05,.05,{f:2600,q:1,vol:.25})},
  bow:t=>{noise(t,.12,{f:500,f2:2500,q:2,vol:.25})},
  flame:t=>{noise(t,.3,{f:700,q:.4,vol:.3,type:'lowpass',attack:.03})},
  melee:t=>{noise(t,.07,{f:600,q:1.5,vol:.35});tone(t,.08,{f:90,f2:50,vol:.3})},
  hit:t=>{tone(t,.07,{f:120,f2:70,vol:.18});noise(t,.05,{f:400,q:1,vol:.12})},
  bite:t=>{noise(t,.12,{f:300,q:2,vol:.4});tone(t,.15,{f:70,f2:40,vol:.35,type:'triangle'})},
  shelter:t=>{tone(t,.35,{f:60,f2:30,vol:.6,type:'triangle'});noise(t,.25,{f:200,type:'lowpass',vol:.5})},
  boom:t=>{noise(t,1.1,{f:900,f2:80,type:'lowpass',vol:.9,attack:.005});tone(t,.8,{f:80,f2:25,vol:.7})},
  lost:t=>{noise(t,.25,{f:350,q:3,vol:.45});noise(t+.05,.2,{f:900,q:4,vol:.25})},
  zdie:t=>{zombie(.32,.95+Math.random()*.4)},
  groan:t=>{if(zombie(.5,.7+Math.random()*.35))return;const f=70+Math.random()*40;tone(t,.9,{f,f2:f*.7,type:'sawtooth',vol:.08,attack:.15});tone(t,.9,{f:f*1.01,f2:f*.69,type:'sawtooth',vol:.06,attack:.2})},
  place:t=>{tone(t,.08,{f:220,f2:140,vol:.25,type:'triangle'});noise(t,.04,{f:1500,vol:.1})},
  ui:t=>tone(t,.05,{f:660,vol:.12,type:'triangle'}),
  dawn:t=>{[392,494,587,784].forEach((f,k)=>tone(t+k*.12,.6,{f,vol:.12,type:'triangle'}))},
  mutate:t=>{tone(t,1.2,{f:110,f2:70,type:'sawtooth',vol:.12,attack:.2});tone(t,1.2,{f:117,f2:73,type:'sawtooth',vol:.1,attack:.2})},
  fuse:t=>{[330,440,554,660,880].forEach((f,k)=>tone(t+k*.06,.35,{f,vol:.13,type:'triangle'}));noise(t+.25,.4,{f:5000,q:2,vol:.08})},
  evo:t=>{[262,330,392].forEach(f=>{tone(t,1.1,{f,f2:f*2,vol:.09,type:'sawtooth',attack:.3});tone(t,1.1,{f:f*1.01,f2:f*2.02,vol:.07,type:'triangle',attack:.3})});noise(t+.8,.6,{f:6000,q:3,vol:.1})},
  lvl:t=>{[523,659,784,1047].forEach((f,k)=>tone(t+k*.09,.4,{f,vol:.13,type:'square'}))},
  death:t=>{[330,262,196].forEach((f,k)=>tone(t+k*.25,.5,{f,vol:.12,type:'triangle'}))}
 };
 function play(name,gap=.06){
  if(muted||!init()||!S[name])return;
  try{const t=ac.currentTime;if(last[name]&&t-last[name]<gap)return;last[name]=t;S[name](t+.01)}catch(e){}}
 // ambiance de nuit : vent filtré + grondement sourd + nappe musicale sombre, dont le volume suit l'obscurité ;
 // par-dessus, des bruits lointains au hasard : hiboux, loups, grognements de zombies, et quelques notes de musique.
 let music=null,nextEvt=0,nextNote=0;
 // un son qui glisse d'une fréquence à l'autre en suivant une courbe, avec un léger vibrato (loup, hibou)
 function glide(t,pts,{type='sine',vol=.08,vib=0,vibF=5,lp=1800}={}){
  const o=ac.createOscillator();o.type=type;o.frequency.setValueAtTime(pts[0][1],t);pts.slice(1).forEach(([dt,f])=>o.frequency.linearRampToValueAtTime(f,t+dt));
  const dur=pts[pts.length-1][0];let lfo=null;
  if(vib){lfo=ac.createOscillator();lfo.frequency.value=vibF;const lg=ac.createGain();lg.gain.value=vib;lfo.connect(lg);lg.connect(o.frequency);lfo.start(t);lfo.stop(t+dur+.1)}
  const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=lp;
  const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.25,dur*.2));g.gain.setValueAtTime(vol,t+dur*.75);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(fl);fl.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05)}
 const AMB={
  // hibou : « hou… hou-hou-houuu »
  owl:t=>{const f=360+Math.random()*40,v=.05;[[0,.45],[.75,.22],[1.02,.22],[1.3,.7]].forEach(([d,l])=>glide(t+d,[[0,f*1.04],[l*.3,f],[l,f*.9]],{vol:v,lp:900}))},
  // loup au loin : un long hurlement qui monte puis redescend, parfois deux loups
  wolf:t=>{const f=260+Math.random()*60;glide(t,[[0,f],[.6,f*1.9],[2.2,f*1.75],[3.2,f*1.3]],{type:'triangle',vol:.045,vib:9,vibF:5.5,lp:1300});
   if(Math.random()<.5){const g2=f*1.12;glide(t+1.1,[[0,g2],[.5,g2*1.8],[2,g2*1.6],[2.8,g2*1.2]],{type:'triangle',vol:.03,vib:8,vibF:6,lp:1100})}},
  // grognement de zombie lointain
  groan:t=>{if(zombie(.16,.6+Math.random()*.3))return;const f=60+Math.random()*35;glide(t,[[0,f],[.5,f*1.15],[1.4,f*.75]],{type:'sawtooth',vol:.035,vib:4,vibF:9,lp:420});glide(t+.08,[[0,f*1.5],[.6,f*1.6],[1.3,f*1.1]],{type:'sawtooth',vol:.02,lp:380})},
  // craquement de branche
  crack:t=>{noise(t,.06,{f:2200,q:3,vol:.08});noise(t+.07,.04,{f:1800,q:3,vol:.05})}
 };
 // notes de musique : gamme mineure grave, sons doux et longs (comme un piano étouffé)
 const SCALE=[110,123.5,130.8,146.8,164.8,174.6,196,220,246.9,261.6];
 function note(t,f,vol){tone(t,3.2,{f,vol,type:'sine',attack:.02});tone(t,2.4,{f:f*2,vol:vol*.25,type:'triangle',attack:.02})}
 function night(k){
  if(!ac||muted)return;
  try{if(!amb){const s=ac.createBufferSource();s.buffer=noiseBuf;s.loop=true;const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=380;
    const g=ac.createGain();g.gain.value=0;const o=ac.createOscillator();o.type='sine';o.frequency.value=48;const og=ac.createGain();og.gain.value=.5;
    s.connect(fl);fl.connect(g);o.connect(og);og.connect(g);g.connect(master);s.start();o.start();amb={g}}
   amb.g.gain.setTargetAtTime(.16*k,ac.currentTime,.3);
   // nappe : accord de la mineur très grave qui respire lentement
   if(!music){const g=ac.createGain();g.gain.value=0;const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=600;fl.connect(g);g.connect(master);
    [55,82.4,110,130.8].forEach((f,i)=>{const o=ac.createOscillator();o.type=i%2?'triangle':'sawtooth';o.frequency.value=f*(1+(i-1.5)*.002);
     const og=ac.createGain();og.gain.value=i===0?.35:.18;const l=ac.createOscillator();l.frequency.value=.05+i*.03;const lg=ac.createGain();lg.gain.value=og.gain.value*.6;l.connect(lg);lg.connect(og.gain);
     o.connect(og);og.connect(fl);o.start();l.start()});music={g}}
   music.g.gain.setTargetAtTime(.07*k,ac.currentTime,.8);
   const t=ac.currentTime;if(k<.6){nextEvt=t+3;nextNote=t+2;return}
   if(t>nextEvt){const r=Math.random(),e=r<.32?'owl':r<.55?'wolf':r<.9?'groan':'crack';AMB[e](t+.05);nextEvt=t+4+Math.random()*7}
   if(t>nextNote){const f=SCALE[Math.floor(Math.random()*SCALE.length)];note(t+.05,f,.035);if(Math.random()<.4)note(t+.9,SCALE[Math.floor(Math.random()*SCALE.length)],.025);nextNote=t+3.5+Math.random()*4}
  }catch(e){}}
 function toggle(){muted=!muted;try{localStorage.setItem('abri-mute',muted?'1':'0')}catch(e){}
  if(init()){master.gain.setTargetAtTime(muted?0:.55,ac.currentTime,.05);if(!muted)unlock()}return muted}
 return{play,night,toggle,get muted(){return muted}};
})();
