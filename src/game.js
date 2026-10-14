// Rendu canvas, interface et boucle de jeu. Dépend de src/engine.js (global Z).
const ICON={
 bar:'<path d="M4 6l16 4M4 14l16 4M7 4v17M17 4v17"/>',
 car:'<path d="M3 15l2-5h12l3 5v3H3zM6 10l1.5-3h8l1.5 3"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
 fen:'<path d="M5 4v16M12 4v16M19 4v16M5 9h14M5 15h14"/>',
 sand:'<path d="M4 19h16M5 19c0-3 3-4 7-4s7 1 7 4M7 15c0-3 2-4 5-4s5 1 5 4"/>',
 door:'<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M9 7h6M9 11h6M9 15h6"/>',
 tire:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
 gun:'<circle cx="12" cy="12" r="6.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
 snp:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 1v6M12 17v6M1 12h6M17 12h6"/>',
 sht:'<path d="M6 7h5v13H6zM13 7h5v13h-5zM6 11h5M13 11h5M7 4h3M14 4h3"/>',
 xbow:'<path d="M4 7c5 2.5 11 2.5 16 0M12 8v13M9 18l3 3 3-3M4 7l8 2 8-2"/>',
 flame:'<path d="M3 15h8l3-3h2M5 15v-4h5v4"/><path d="M18 8c1 1.5 3 2 3 4a2.5 2.5 0 0 1-5 0c0-1 .8-1.6 1.3-2.3z"/>',
 mg:'<path d="M3 10h14M3 14h14M17 9v6h3M7 14l-3 6M11 14l3 6"/>',
 molo:'<path d="M10 4h4v3l2 3v10H8V10l2-3z"/><path d="M12 1v3M8 14h8"/>',
 kid:'<path d="M8 3v6a4 4 0 0 0 8 0V3M12 13v8M8 3l4 6 4-6"/>',
 axe:'<path d="M13 4l7 7-4.5 1.5-4-4zM14.5 9.5 4 20"/>',
 dog:'<circle cx="6.5" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="17.5" cy="10" r="2"/><path d="M12 12c-3 0-5 3-5 5.5 0 1.5 1.5 2.5 5 2.5s5-1 5-2.5C17 15 15 12 12 12z"/>',
 cop:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
 butch:'<path d="M3 5h12v9H3zM15 9h6"/><circle cx="6" cy="8" r="1"/>',
 monk:'<circle cx="12" cy="6" r="3"/><path d="M5 21c0-5 3-9 7-9s7 4 7 9M3 14l5-2M21 14l-5-2"/>',
 med:'<path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z"/>',
 lamp:'<path d="M3 9l8-4v14l-8-4zM14 8l6-3M14 12h7M14 16l6 3"/>',
 radio:'<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M8 9l10-6M14 13h3M14 16h3"/><circle cx="9" cy="14.5" r="2"/>',
 cook:'<path d="M7 11a4 4 0 1 1 3-6 4 4 0 0 1 7 2 3 3 0 0 1 0 4zM7 11v8h10v-8"/>',
 mech:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
 siren:'<path d="M7 18v-6a5 5 0 0 1 10 0v6M5 18h14v3H5zM12 2v2M4 6l1.5 1.5M20 6l-1.5 1.5"/>',
 lead:'<path d="M5 21V4M5 4h12l-3 4 3 4H5"/>',
 solar:'<path d="M3 18l3-12h12l3 12zM4.5 12h15M9 6l-1 12M15 6l1 12"/>',
 trap:'<path d="M3 16h18M4 16l2-6 2 6 2-6 2 6 2-6 2 6 2-6 2 6"/>',
 fire:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2.5-5 .5 2 1.5 2.5 2.5 2.5C12 8 11.5 5.5 12 3z"/>',
 mine:'<circle cx="12" cy="14" r="5.5"/><path d="M12 8.5V5M9 4h6M16.5 9.5l1.8-1.8"/>',
 wire:'<path d="M3 12h18M5 9l2 6M10 9l2 6M15 9l2 6"/>',
 spike:'<path d="M3 20h18M6 20l2-12 2 12M12 20l2-14 2 14M17 20l1.5-8 1.5 8"/>',
 gas:'<rect x="7" y="6" width="10" height="15" rx="4"/><path d="M10 6V3h4v3"/>',
 smoke:'<path d="M8 21h8V11H8zM10 11V8h4v3M6 6c-2-2 0-4 2-3M12 4c0-2 3-2 3 0M18 6c2-1 3 1 1 3"/>',
 bait:'<path d="M6 9c2-4 9-5 12-1s0 9-5 9-8-4-7-8z"/><circle cx="16" cy="16" r="2.5"/><path d="M17.5 17.5L21 21"/>',
 dyn:'<path d="M5 9h4v12H5zM10 9h4v12h-4zM15 9h4v12h-4zM12 9c0-3 2-4 4-6"/>',
 food:'<path d="M6 5h12v15H6zM6 9h12M6 16h12"/>',
 rep:'<path d="M14.5 5.5a4 4 0 0 0-5 5L3 17l4 4 6.5-6.5a4 4 0 0 0 5-5l-2.5 2.5-3-1-1-3z"/>',
 kit:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M12 10v7M8.5 13.5h7"/>',
 coffee:'<path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 11h2a2 2 0 0 1 0 4h-2M8 3c-1 2 1 3 0 5M12 3c-1 2 1 3 0 5"/>',
 roadmap:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
 flare:'<path d="M10 21V11h4v10M12 11V8M12 3l1 3h-2zM6 6l2 2M18 6l-2 2"/>',
 grenade:'<circle cx="11" cy="14" r="6.5"/><path d="M9 7.5h4M11 7.5V5l5-2"/>',
 shot:'<path d="M4 20l7-7M11 13l2-6 6-2-2 6zM15 9l5-5"/>',
 patch:'<path d="M5 9l4-4 10 10-4 4zM9 9l2 2M12 6l2 2M9 12l2 2"/>',
 molotov:'<path d="M10 5h4v3l2 3v9H8v-9l2-3z"/><path d="M12 1c1 2 2 2.5 2 4"/>',
 horn:'<path d="M3 10h4l8-5v14l-8-5H3zM18 8c1.5 1 1.5 7 0 8M20.5 6c2.5 2 2.5 10 0 12"/>',
 rush:'<path d="M13 2L5 13h6l-1 9 8-12h-6z"/>',
 relic:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
 mut:'<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V3a6 6 0 0 1 5 9.5M14.2 13.2l5.6 3.3a6 6 0 0 1-10 0M9.8 13.2l-5.6 3.3A6 6 0 0 1 7 6"/>',
 scrap:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'
};
const svg=t=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[t]||ICON.relic}</svg>`;
const cc=t=>`var(--k-${Z.U[t].cat})`;
// à changer à chaque mise en ligne : permet de vérifier sur le téléphone qu'on a la dernière version
const VERSION='v23 · 14 oct.';
const TICK=430;let SPEED=1;const tickMs=()=>TICK/SPEED;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const $=s=>document.querySelector(s);
// hasard de la partie, à graine : la graine est sauvegardée, et le défi quotidien utilise la même pour tout le monde.
// Les effets visuels (particules, sang…) gardent Math.random.
let RS=1;function R(){RS=(RS*16807)%2147483647;return (RS-1)/2147483646}
const seedFrom=str=>{let h=2166136261;for(const c of str)h=Math.imul(h^c.charCodeAt(0),16777619);return (Math.abs(h)%2147483646)+1};
const shuffle=a=>Z.shuffle(a,R);
const plural=(n,s,p)=>n+' '+(n>1?p:s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ZN={walk:['rôdeur','rôdeurs'],run:['coureur','coureurs'],fat:['gonflé','gonflés'],zdog:['chien zombie','chiens zombies'],crawl:['rampant','rampants'],spit:['cracheur','cracheurs'],armor:['blindé','blindés'],howl:['hurleur','hurleurs'],boss:['Colosse','Colosses']};

/* ---------- state ---------- */
let S,G;
/* ---------- progression entre les parties (localStorage) ---------- */
function loadMeta(){let m={};try{m=JSON.parse(localStorage.getItem('abri-meta'))||{}}catch(e){}
 if(!m.best){try{m.best=+localStorage.getItem('abri-best-nuits')||0}catch(e){}}m.best=m.best||0;m.total=m.total||m.best||0;m.runs=m.runs||0;return m}
function saveMeta(m){try{localStorage.setItem('abri-meta',JSON.stringify(m))}catch(e){}}
let META=loadMeta();
// tutoriel de la première partie : une bulle d'aide par étape (0 à 4 ; 5 = terminé)
let TUTO=5;try{TUTO=+(localStorage.getItem('abri-tuto')??(META.runs||META.best?5:0))}catch(e){}
function tuto(n){if(TUTO===n){TUTO=n+1;try{localStorage.setItem('abri-tuto',TUTO)}catch(e){}}}
const TIPS=['👆 Touche une carte en bas pour la choisir. Le chiffre jaune est son coût en énergie.','Touche une case en pointillés jaunes pour la poser.','Bien ! Les points jaunes sous la carte sont ton énergie. Pose d’autres cartes, puis touche « Affronter la nuit ».','Tes survivants se défendent tout seuls. Touche le bouton du bas pour accélérer.'];
function newGame(ch,pl,daily,deck){
 RS=daily?seedFrom('abri-'+daily):1+Math.floor(Math.random()*2147483645);
 G=Z.newState(ch,pl,R,daily?Z.KEYS.slice():Z.unlocks(META).pool);if(daily)G.daily=daily;
 S={draw:shuffle([...(deck||META.decks[META.slot]||Z.STARTER_DECK)]),board:G.grid.filter(Boolean),discard:[],hand:[],sel:null,moveFrom:null,inspect:null,busy:false,next:null,phase:null,picks:null,dawn:null};
 V.clear();FX.length=0;PT.length=0;facing.fill(null);clearDecals();
 fillHand();
}
// la carte choisie à l'aube arrive d'office dans la main, le reste est pioché
// la main se garde d'un jour à l'autre : on la complète jusqu'au nombre de cartes du jour (au moins 1 nouvelle), sans dépasser HAND_MAX
function fillHand(){if(S.next){S.hand.push(S.next);S.next=null}drawCards(Math.min(Z.HAND_MAX-S.hand.length,Math.max(1,Z.drawCount(G)-S.hand.length)))}
function drawCards(n){for(let k=0;k<n;k++){if(!S.draw.length){S.draw=shuffle(S.discard);S.discard=[]}if(!S.draw.length)break;S.hand.push(S.draw.pop())}}
// le deck de la partie : pioche, défausse, main, et les unités posées (qui reviennent dans la défausse quand elles tombent)
const pileList=()=>[...S.draw,...S.discard,...S.hand];
const deckList=()=>[...pileList(),...(S.board||[]).filter(u=>!u.gen).map(u=>u.t)];
// une unité posée qui a disparu de la carte (détruite, piège déclenché, remplacée…) : sa carte revient dans la défausse
function syncBoard(){const live=new Set(G.grid.filter(Boolean));for(const u of S.board||[])if(!live.has(u)&&!u.gen)S.discard.push(u.t);S.board=[...live]}

/* ---------- sauvegarde (localStorage, marche aussi dans Electron/Tauri) ---------- */
const SAVE_KEY='abri-save',SAVE_V=2;
function save(){try{G.rs=RS;const g={...G,event:G.event.id,z:[],pending:[],tick:0};localStorage.setItem(SAVE_KEY,JSON.stringify({v:SAVE_V,g,s:{draw:S.draw,discard:S.discard,hand:S.hand,next:S.next,phase:S.phase,picks:S.picks}}))}catch(e){}}
function loadSave(){try{const d=JSON.parse(localStorage.getItem(SAVE_KEY));if(d&&d.v===SAVE_V&&d.g&&d.s)return d}catch(e){}return null}
function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}
function resume(d){
 newGame(d.g.char,d.g.place);
 Object.assign(G,d.g,{event:Z.EVENTS.find(e=>e.id===d.g.event)||Z.EVENTS[0]});Z.touch(G);
 RS=d.g.rs||RS;Object.assign(S,d.s,{sel:null,busy:false});S.board=G.grid.filter(Boolean);
 hide();render();
 if(S.phase)dawnStep(S.phase,S.picks);
}

/* ---------- canvas setup ---------- */
const T=64,L=T*Z.N,CEN={x:L/2,y:L/2};
if(!CanvasRenderingContext2D.prototype.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){r=Math.min(r,w/2,h/2);this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath()};
const cv=$('#map'),ctx=cv.getContext('2d');
const dark=document.createElement('canvas'),dctx=dark.getContext('2d');
let SC=1,DPR=1;
function fit(){const w=cv.clientWidth||320;DPR=Math.min(2,devicePixelRatio||1);const px=Math.round(w*DPR);if(cv.width!==px){cv.width=cv.height=px;dark.width=dark.height=px}SC=px/L}
const tc=i=>{const[r,c]=Z.rc(i);return{x:c*T+T/2,y:r*T+T/2}};
function rng(seed){return()=>(seed=(seed*16807)%2147483647)/2147483647}

/* ground, pre-rendered once */
const ground=document.createElement('canvas');ground.width=ground.height=L*2;
(function(){const g=ground.getContext('2d');g.scale(2,2);const r=rng(11);
 g.fillStyle='#34432a';g.fillRect(0,0,L,L);
 // taches de boue et d'herbe plus sombre
 for(let k=0;k<40;k++){const x=r()*L,y=r()*L;g.fillStyle=r()<.5?'rgba(40,32,20,.25)':'rgba(20,34,16,.3)';g.beginPath();g.ellipse(x,y,8+r()*18,5+r()*12,r()*3,0,7);g.fill()}
 for(let k=0;k<2600;k++){const x=r()*L,y=r()*L,s=1+r()*3;g.fillStyle=['#46583a','#34432a','#4d603c','#40422e','#525440'][Math.floor(r()*5)];g.globalAlpha=.55;g.fillRect(x,y,s,s)}
 g.globalAlpha=1;
 // touffes d'herbe
 for(let k=0;k<420;k++){const x=r()*L,y=r()*L;g.strokeStyle=r()<.5?'#526a3c':'#2c3a22';g.lineWidth=1;g.beginPath();g.moveTo(x,y);g.lineTo(x-1.5,y-3);g.moveTo(x,y);g.lineTo(x+1.5,y-3);g.stroke()}
 // dirt roads to the shelter
 g.strokeStyle='#6a5a3e';g.lineCap='round';g.lineWidth=26;g.beginPath();g.moveTo(L/2,0);g.lineTo(L/2,L);g.moveTo(0,L/2);g.lineTo(L,L/2);g.stroke();
 for(let k=0;k<900;k++){const along=r()*L,off=(r()-.5)*24,h=r()<.5;const x=h?along:L/2+off,y=h?L/2+off:along;g.fillStyle=r()<.5?'#7a6849':'#574a33';g.fillRect(x,y,2,2)}
 // tire ruts
 g.strokeStyle='rgba(30,24,16,.5)';g.lineWidth=2;g.beginPath();g.moveTo(L/2-6,0);g.lineTo(L/2-6,L);g.moveTo(L/2+6,0);g.lineTo(L/2+6,L);g.stroke();
 // rocks and debris on the inner area
 for(let k=0;k<26;k++){const x=T+r()*(L-2*T),y=T+r()*(L-2*T);if(Math.abs(x-L/2)<20||Math.abs(y-L/2)<20)continue;g.fillStyle='#4b4d44';g.beginPath();g.ellipse(x,y,2+r()*3,1.5+r()*2,r()*3,0,7);g.fill()}
 // outer ring: dark woods where the horde comes from
 g.fillStyle='rgba(8,10,6,.45)';g.fillRect(0,0,L,T);g.fillRect(0,L-T,L,T);g.fillRect(0,T,T,L-2*T);g.fillRect(L-T,T,T,L-2*T);
 const tree=(x,y,s)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(x+3,y+4,s,0,7);g.fill();
  [['#16200f',1],['#1d2a14',.75],['#25351a',.45]].forEach(([c,k])=>{g.fillStyle=c;g.beginPath();g.arc(x-s*(1-k)*.3,y-s*(1-k)*.3,s*k,0,7);g.fill()})};
 for(let k=0;k<170;k++){const side=Math.floor(r()*4),a=r()*L,d=r()*T*.55;let x,y;
  if(side===0){x=a;y=d}else if(side===1){x=a;y=L-d}else if(side===2){x=d;y=a}else{x=L-d;y=a}
  if(Math.abs(x-L/2)<18&&(y<T||y>L-T))continue;if(Math.abs(y-L/2)<18&&(x<T||x>L-T))continue;
  tree(x,y,7+r()*9)}
 // planches et débris abandonnés
 for(let k=0;k<9;k++){const x=T*1.2+r()*(L-2.4*T),y=T*1.2+r()*(L-2.4*T);if(Math.abs(x-L/2)<24||Math.abs(y-L/2)<24)continue;g.save();g.translate(x,y);g.rotate(r()*3);g.fillStyle='#0e110b';g.fillRect(-9.5,-2.5,19,5);g.fillStyle='#6b5236';g.fillRect(-8.5,-1.5,17,3);g.restore()}
 // inner border: broken fence line
 g.strokeStyle='rgba(120,100,70,.35)';g.lineWidth=1.5;g.setLineDash([7,6]);g.strokeRect(T+.5,T+.5,L-2*T-1,L-2*T-1);g.setLineDash([]);
})();
const decal=document.createElement('canvas');decal.width=decal.height=L*2;const gx=decal.getContext('2d');gx.scale(2,2);
function clearDecals(){gx.clearRect(0,0,L,L)}
function splat(x,y,big){const n=big?9:3;for(let k=0;k<n;k++){const a=Math.random()*7,d=Math.random()*(big?12:7);gx.fillStyle=Math.random()<.5?'rgba(110,14,18,.55)':'rgba(70,90,30,.45)';gx.beginPath();gx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,1+Math.random()*(big?4:2),0,7);gx.fill()}}

/* ---------- live visual state ---------- */
const V=new Map(),FX=[],PT=[],facing=Array(Z.N*Z.N).fill(null);
let nightAmt=0,nightTarget=0,shakeT=0,hurtT=0,last=performance.now();
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
function jit(id){const r=rng(id*977+13);return{x:(r()-.5)*26,y:(r()-.5)*26}}
function zpos(v,now){const p=clamp((now-v.t0)/v.dur,0,1);let x=v.from.x+(v.to.x-v.from.x)*p,y=v.from.y+(v.to.y-v.from.y)*p;
 if(v.lunge){const q=(now-v.lunge)/260;if(q<1){const k=Math.sin(Math.PI*q)*9,dx=v.lx-x,dy=v.ly-y,d=Math.hypot(dx,dy)||1;x+=dx/d*k;y+=dy/d*k}}
 return{x,y}}
function syncZ(now){const ids=new Set();
 for(const z of G.z){ids.add(z.id);let v=V.get(z.id);const j=jit(z.id),c=tc(z.pos),to={x:c.x+j.x,y:c.y+j.y};
  if(!v){const dx=c.x-CEN.x,dy=c.y-CEN.y,d=Math.hypot(dx,dy)||1;v={id:z.id,k:z.k,pos:z.pos,from:{x:to.x+dx/d*46,y:to.y+dy/d*46},to,t0:now,dur:Z.zspd(G,z.k)*tickMs(),hp:z.hp,max:z.max,born:now};V.set(z.id,v);if(Math.random()<.35)SFX.play('groan',.7)}
  else if(v.pos!==z.pos){v.from=zpos(v,now);v.to=to;v.t0=now;v.dur=Z.zspd(G,z.k)*tickMs();v.pos=z.pos}
  v.hp=z.hp;v.burn=z.burnT>0}
 for(const v of V.values())if(!ids.has(v.id)&&!v.dying){v.dying=now;const p=zpos(v,now);v.dx=p.x;v.dy=p.y;if(!v.bit)splat(p.x,p.y,true)}
}

/* ---------- dessin : un seul style pour tout le jeu (contour sombre, ombre portée, ombrage, petits détails) ---------- */
const INK='#0e110b';
function ell(x,y,rx,ry,c){if(!(rx>0&&ry>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fill()}
function circ(x,y,r,c){if(!(r>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
function line(x1,y1,x2,y2,c,w){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
// formes avec contour : la silhouette sombre un peu plus grande, puis la couleur par-dessus
function oEll(x,y,rx,ry,c,w=1.3){ell(x,y,rx+w,ry+w,INK);ell(x,y,rx,ry,c)}
function oCirc(x,y,r,c,w=1.3){circ(x,y,r+w,INK);circ(x,y,r,c)}
function oLine(x1,y1,x2,y2,c,w){line(x1,y1,x2,y2,INK,w+2.4);line(x1,y1,x2,y2,c,w)}
function oRect(x,y,w,h,c,lw=1.3){ctx.fillStyle=INK;ctx.fillRect(x-lw,y-lw,w+2*lw,h+2*lw);ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}
function rrect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function oRound(x,y,w,h,r,c,lw=1.3){ctx.fillStyle=INK;rrect(x-lw,y-lw,w+2*lw,h+2*lw,r+lw);ctx.fill();ctx.fillStyle=c;rrect(x,y,w,h,r);ctx.fill()}
const SHADE={};
function shade(c,k){const key=c+k;if(SHADE[key])return SHADE[key];const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(k<0?v*(1+k):v+(255-v)*k)));
 return SHADE[key]='#'+((1<<24)|(f(n>>16)<<16)|(f(n>>8&255)<<8)|f(n&255)).toString(16).slice(1)}

/* armes, dessinées vers la droite (+x), sous les mains */
const WEAP={
 pistol:()=>{oRect(9,3,7,2.6,'#2b2d30')},
 rifle:()=>{oRect(4,2.8,19,2.6,'#2a2c2e');oRect(3,2.2,6,3.8,'#5a4128');oRect(13,1.6,4,1.2,'#1a1a1a',.6)},
 sniper:()=>{oRect(2,3,27,2.2,'#24282a');oRect(10,1.2,7,1.8,'#111',.8);oRect(1,2.2,7,3.8,'#4b3a26')},
 shotgun:()=>{oRect(4,2.2,16,3.8,'#3a3a3c');oRect(3,1.8,6,4.6,'#6b4a2c');oRect(12,5.8,5,1.6,'#5a3a22',.6)},
 mg:()=>{oRect(2,1.8,23,4.6,'#2b2e2a');oRect(10,6.2,6,3.2,'#7a6a2a');line(12,9.5,8,12,'#b9a23a',1.4)},
 xbow:()=>{oRect(4,3,13,2.2,'#5a4128');ctx.strokeStyle=INK;ctx.lineWidth=3.4;ctx.beginPath();ctx.arc(14,4,7,-1.25,1.25);ctx.stroke();ctx.strokeStyle='#8a6a40';ctx.lineWidth=1.6;ctx.stroke();line(9,4,17,4,'#ddd',.8)},
 flame:()=>{oRect(4,2.3,15,3.6,'#5c6166');oRect(18,1.6,3,5,'#2b2b2b');circ(22,4,1.2,'#5aa0ff')},
 molo:now=>{oRect(8,2.6,7,3.6,'#3f7a3a',1);circ(16,4.4,1.6+Math.sin(now/60)*.5,'#ffb43a');circ(16.5,4.4,.8,'#fff2a0')},
 sling:()=>{oLine(8,4,13,4,'#7a5232',1.4);line(13,1.5,13,6.5,'#7a5232',1.4);line(13,1.5,16,4,'#c9b38a',.6);line(13,6.5,16,4,'#c9b38a',.6)},
 axe:()=>{oLine(3,5,18,5,'#6b4a2a',2.2);oRect(14,-.5,6,6,'#a9afb5',1);ctx.fillStyle='#e4e8ec';ctx.fillRect(19,-.5,1,6)},
 cleaver:()=>{oRect(10,1,8,6,'#b9bec3',1);oRect(6,3.4,4,1.8,'#3a2a1a',.8);circ(16,3,.8,'#7a2020')},
 baton:()=>{oLine(5,5,17,5,'#1b1d22',2)},
 wrench:()=>{oLine(6,5,15,5,'#8e959c',2);oCirc(16.5,5,2.3,'#8e959c',1);circ(17.5,5,1,'#4a4f54')},
 bag:()=>{oRound(6,3,8,6,1.5,'#e8e4d8',1);ctx.fillStyle='#d23b3b';ctx.fillRect(9.2,4.2,1.8,3.6);ctx.fillRect(8.2,5.2,3.8,1.6)},
 ladle:()=>{oLine(6,5,14,5,'#9aa0a6',1.4);oCirc(15.5,5,2.2,'#9aa0a6',1)},
 none:()=>{}
};
/* survivants : une silhouette commune vue de dessus, habillée selon le métier */
const SKINS=['#e8bf96','#c99067','#8d5a3b','#f0cfa8','#a87048','#6e4630'];
const LOOK={
 gun:{body:'#4f5d3a',w:'rifle',head:'cap',hc:'#2e3a22',pack:'#3a3a2a'},
 snp:{body:'#3b4734',w:'sniper',head:'hood',hc:'#2a3324'},
 sht:{body:'#6b4a2c',w:'shotgun',hc:'#2e2218',extra:'belt'},
 mg:{body:'#3e4a32',w:'mg',head:'helmet',hc:'#3a4430',extra:'belt'},
 xbow:{body:'#55603e',w:'xbow',hc:'#6b3b1e',pack:'#5a4128'},
 flame:{body:'#5d5f4a',w:'flame',head:'helmet',hc:'#4a4a3a',tank:'#9a2e2a'},
 molo:{body:'#5a3a2a',w:'molo',head:'hood',hc:'#3a2a20',one:1},
 kid:{body:'#c9a13a',w:'sling',head:'cap',hc:'#b33a3a',small:1,one:1},
 axe:{body:'#8c2f2a',w:'axe',hc:'#6b3b1e',one:1,plaid:1},
 cop:{body:'#2c3e66',w:'baton',head:'cap',hc:'#1d2945',extra:'vest',one:1},
 butch:{body:'#d8d2c4',w:'cleaver',head:'bald',extra:'apron',one:1},
 monk:{body:'#c8701e',w:'none',head:'bald'},
 med:{body:'#e8e4d8',w:'bag',hc:'#1d1a17',extra:'cross',one:1},
 cook:{body:'#f2f2f2',w:'ladle',head:'hat',one:1},
 mech:{body:'#2f5d8a',w:'wrench',head:'cap',hc:'#24476a',one:1,extra:'grease'},
 lead:{body:'#4b6b3a',w:'pistol',head:'cap',hc:'#2c3a22',extra:'belt',one:1},
 // chefs : tenue de leur faction, avec un insigne doré
 chief_police:{body:'#1f2f55',w:'pistol',head:'cap',hc:'#0f1a33',extra:'vest',one:1,chief:1},
 chief_mil:{body:'#3a4630',w:'mg',head:'helmet',hc:'#2e3826',extra:'belt',chief:1},
 chief_care:{body:'#f2efe6',w:'bag',hc:'#5a3a22',extra:'cross',one:1,chief:1},
 chief_pyro:{body:'#3a2a22',w:'flame',head:'helmet',hc:'#5a2a1a',tank:'#c0392b',chief:1},
 chief_trap:{body:'#4a5232',w:'xbow',head:'hood',hc:'#3a4026',pack:'#5a4128',chief:1},
 chief_farm:{body:'#7a3a26',w:'axe',hc:'#b88a4a',one:1,plaid:1,chief:1},
 chief_tech:{body:'#2a4f78',w:'wrench',head:'helmet',hc:'#e0b23a',one:1,extra:'grease',chief:1},
 chief_comm:{body:'#5a4a6a',w:'pistol',hc:'#d8d8d8',one:1,chief:1}
};
function person(x,y,a,o,now,skin){
 const br=Math.sin(now/650+x*.7)*.45;skin=skin||'#e8bf96';
 ctx.save();ctx.translate(x,y);ell(2.5,5,12.5,9.5,'rgba(0,0,0,.4)');ctx.rotate(a);if(o.small)ctx.scale(.8,.8);
 if(o.pack)oRound(-14,-6,6,12,2,o.pack,1.1);
 if(o.tank){oEll(-11,0,4,6.5,o.tank,1.1);ell(-12,-2,1.5,2.5,'rgba(255,255,255,.2)');line(-8,3,6,5,'#2a2a2a',1)}
 const hR=[10,5],hL=o.one?[3,-9.5]:[16,3.6];
 (WEAP[o.w]||WEAP.none)(now);
 oLine(-1,7.5,hR[0],hR[1],o.body,3.4);oLine(-1,-7.5,hL[0],hL[1],o.body,3.4);
 oCirc(hR[0],hR[1],2.1,skin,1);oCirc(hL[0],hL[1],2.1,skin,1);
 oEll(-1,0,7+br*.2,11.2+br*.25,o.body);
 if(o.plaid){ctx.save();ctx.beginPath();ctx.ellipse(-1,0,7,11,0,0,7);ctx.clip();ctx.fillStyle='rgba(0,0,0,.28)';for(let k=-12;k<12;k+=4)ctx.fillRect(-9,k,16,1.4);for(let k=-8;k<8;k+=4)ctx.fillRect(k,-12,1.4,24);ctx.restore()}
 ell(-3.6,0,3.4,8.6,'rgba(0,0,0,.22)');ell(1.2,-4,2.4,4,'rgba(255,255,255,.09)');
 if(o.extra==='cross'){ctx.fillStyle='#d23b3b';ctx.fillRect(-5.5,-1.1,5,2.2);ctx.fillRect(-4.1,-2.6,2.2,5.2)}
 if(o.extra==='apron'){ell(1,0,4,8.4,'#ece8dd');circ(2,3,1.7,'#9a2a2a');circ(-.5,-3.5,1.1,'#9a2a2a');circ(3,-1,.8,'#9a2a2a')}
 if(o.extra==='vest'){ctx.fillStyle='rgba(15,22,40,.6)';ctx.fillRect(-6,-8,7,16);ctx.fillStyle='#e8d36a';ctx.fillRect(-4.5,-1,3,2)}
 if(o.extra==='belt')line(-6,-9.5,3,9.5,'#7a6a2a',2);
 if(o.extra==='grease'){circ(-3,4,1.6,'rgba(0,0,0,.35)');circ(-1,-5,1,'rgba(0,0,0,.3)')}
 oCirc(1,0,5.3,skin,1.2);
 const hc=o.hc||'#2e2218';
 if(o.head==='helmet'){circ(.4,0,5.7,hc);ell(-.8,-1.8,2.4,1.8,'rgba(255,255,255,.14)');line(4.8,-3.5,4.8,3.5,shade(hc,-.4),1.2)}
 else if(o.head==='cap'){ctx.fillStyle=hc;ctx.beginPath();ctx.arc(0,0,5.6,Math.PI*.45,Math.PI*1.55);ctx.fill();ctx.fillRect(3,-3.4,3.8,6.8)}
 else if(o.head==='hat'){oCirc(-.6,0,5.2,'#f6f6f6',1);circ(-2.2,0,3.4,'#e2e2e2')}
 else if(o.head==='hood'){circ(-.3,0,6,hc);circ(2.2,0,3.4,skin);ell(.5,0,1.2,3.2,'rgba(0,0,0,.25)')}
 else if(o.head==='bald'){ell(-.6,-1.6,2,1.5,'rgba(255,255,255,.2)')}
 else{ctx.fillStyle=hc;ctx.beginPath();ctx.arc(.2,0,5.6,Math.PI*.55,Math.PI*1.45);ctx.fill();circ(-3,0,2.4,hc)}
 if(o.chief){ctx.save();ctx.rotate(-Math.PI/2);ctx.fillStyle=INK;ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?2.2:4.6,t=k/10*Math.PI*2;ctx.lineTo(Math.cos(t)*r,-9+Math.sin(t)*r)}ctx.fill();ctx.fillStyle='#f2c23d';ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?1.5:3.6,t=k/10*Math.PI*2;ctx.lineTo(Math.cos(t)*r,-9+Math.sin(t)*r)}ctx.fill();ctx.restore()}
 ctx.restore()}
function dogShape(skin,coat,dark,now,wag){
 line(-11,0,-17,Math.sin(now/(wag||90))*4,INK,4.4);line(-11,0,-17,Math.sin(now/(wag||90))*4,coat,2.6);
 oEll(-2,0,11,6,coat);ell(-3,-2,7,2.5,'rgba(255,255,255,.08)');ell(-4,2.5,7,2,'rgba(0,0,0,.2)');
 oCirc(9,0,5,coat);oEll(13.5,0,3,2.4,dark,1);circ(15.6,0,1,INK);
 oEll(8,-4.5,2,3,dark,1);oEll(8,4.5,2,3,dark,1)}
const CATC={wall:'#c9a27a',shoot:'#f2b33d',melee:'#ff7a59',help:'#7cc7ff',trap:'#e5484d',item:'#d6c2ff'};
let BARS=[],EYES=[],LABELS=[];
function hpBar(x,y,f,c){if(f>=1)return;BARS.push([x,y,f,c])}
function drawBars(){for(const[x,y,f,c]of BARS){ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(x-18,y-1,36,7);ctx.fillStyle=c;ctx.fillRect(x-17,y,34*clamp(f,0,1),5)}}
function drawUnit(i,u,now){
 const p0=tc(i),D0=Z.stat(G,u.t),cc=CATC[D0.cat];
 // socle : un disque discret de la couleur du rôle
 ctx.save();ctx.globalAlpha=D0.block?.16:.1;circ(p0.x,p0.y,26,cc);ctx.globalAlpha=.55;ctx.strokeStyle=cc;ctx.lineWidth=1.5;ctx.setLineDash([5,4]);ctx.beginPath();ctx.arc(p0.x,p0.y,26,0,7);ctx.stroke();ctx.setLineDash([]);ctx.restore();
 ctx.save();ctx.translate(p0.x,p0.y);ctx.scale(1.45,1.45);ctx.translate(-p0.x,-p0.y);
 drawUnitInner(i,u,now);ctx.restore();
 if(D0.up)safeTxt(p0.x+19,p0.y-17,'+','#f2b33d');
 const mx=Z.maxHp(G,u);if(D0.block)hpBar(p0.x,p0.y-31,u.hp/mx,u.hp/mx>.4?'#9fd86b':'#e5484d');
 if(u.name&&nightAmt<.5)LABELS.push([p0.x,p0.y+33,u.name.replace(/^(Le |La |L’)/,'')]);
}
function drawUnitInner(i,u,now){
 const{x,y}=tc(i),dx=x-CEN.x,dy=y-CEN.y,out=Math.atan2(dy,dx);const a=facing[i]??out,s=rng(i+3);
 const L0=LOOK[u.t];
 if(L0){const sk=SKINS[(i*7+(u.name||'').length)%SKINS.length],sw=L0.w==='axe'||L0.w==='cleaver'?Math.sin(now/280)*.12:0;person(x,y,a+sw,L0,now,sk);return}
 switch(u.t){
  case 'dog':{ctx.save();ctx.translate(x,y);ell(2,5,13,8,'rgba(0,0,0,.35)');ctx.rotate(a);dogShape('#7a5232','#7a5232','#4a2f1a',now,90);line(5,-3,5,3,'#c0392b',1.6);ctx.restore();break}
  case 'bar':{ctx.save();ctx.translate(x,y);ell(3,6,25,11,'rgba(0,0,0,.35)');[[-.45,-6,'#8a6a45'],[.4,4,'#7d5f3d'],[0,0,'#957552']].forEach(([r,o,c])=>{ctx.save();ctx.rotate(r+out+Math.PI/2);oRect(-24,o-4.5,48,9,c);ctx.fillStyle='rgba(0,0,0,.2)';for(let k=-20;k<24;k+=9)ctx.fillRect(k,o-4.5,1,9);ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(-24,o-4.5,48,2);circ(-18,o,1.3,'#cfcfcf');circ(18,o,1.3,'#cfcfcf');ctx.restore()});ctx.restore();break}
  case 'car':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2+(s()-.5)*.5);ell(3,6,29,18,'rgba(0,0,0,.4)');[[-18,-16],[11,-16],[-18,12],[11,12]].forEach(([a,b])=>oRect(a,b,7,4,'#151515',1));
   oRound(-26,-13,52,26,7,'#6e3426');oRound(-11,-11,23,22,4,'#55281e',.8);ctx.fillStyle='#2a343c';ctx.fillRect(12,-10,6,20);ctx.fillRect(-17,-10,4,20);
   ctx.fillStyle='rgba(160,200,220,.25)';ctx.fillRect(13,-9,2,8);[[-19,6,3.2],[5,-8,2.4],[-2,7,2],[20,8,1.6]].forEach(([a,b,r])=>circ(a,b,r,'rgba(150,80,35,.75)'));line(-26,0,26,0,'rgba(0,0,0,.25)',1);ctx.restore();break}
  case 'fen':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-20,0,20].forEach(p=>{circ(p+1,3,4,'rgba(0,0,0,.35)');oCirc(p,0,3.4,'#7a7a7a',1)});
   const on=powered();[-4,0,4].forEach(o=>{line(-20,o,20,o,INK,2.4);line(-20,o,20,o,on?'#9fb6c8':'#666',1.1)});
   if(on){circ(-20,0,1.2,'#bff3ff');if(nightAmt>.3&&Math.random()<.04)PT.push({x:x+(Math.random()-.5)*40,y:y+(Math.random()-.5)*10,vx:0,vy:-.02,t0:now,dur:180,c:'#9fe8ff',r:2,light:18})}ctx.restore();break}
  case 'sand':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);ell(2,6,25,11,'rgba(0,0,0,.35)');[[-13,-4],[0,-4],[13,-4],[-6.5,5],[6.5,5]].forEach(([a,b])=>{oEll(a,b,7.5,5,'#b09468',1.1);line(a-5,b,a+5,b,'rgba(0,0,0,.18)',1);ell(a-2,b-2,3,1.5,'rgba(255,255,255,.12)')});ctx.restore();break}
  case 'door':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);ell(3,6,27,11,'rgba(0,0,0,.4)');oRect(-25,-7.5,50,15,'#5d666e');ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(-25,-7.5,50,3);
   [-19,-7,5,17].forEach(p=>{circ(p,-3.5,1.3,'#a9b2ba');circ(p,3.5,1.3,'#a9b2ba')});[[-12,2,4],[10,-3,3]].forEach(([a,b,r])=>circ(a,b,r,'rgba(140,70,30,.55)'));line(-25,0,25,0,'rgba(0,0,0,.3)',1);ctx.restore();break}
  case 'tire':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-15,0,15].forEach(p=>{circ(p+1,3,9.5,'rgba(0,0,0,.35)');oCirc(p,0,9,'#1d1d1d',1.2);circ(p,0,4,'#3b4b2c');ctx.strokeStyle='#3a3a3a';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p,0,6.8,0,7);ctx.stroke();ell(p-3,-4,2.5,1.4,'rgba(255,255,255,.1)')});ctx.restore();break}
  case 'lamp':{ctx.save();ctx.translate(x,y);ell(2,5,11,7,'rgba(0,0,0,.35)');oLine(-8,8,0,0,'#555',2);oLine(8,8,0,0,'#555',2);oLine(0,-9,0,0,'#555',2);ctx.rotate(out);oRect(-6,-6,10,12,'#a8a8a8');ctx.fillStyle=powered()?'#ffe9a8':'#555';ctx.fillRect(4,-5,3,10);ctx.restore();break}
  case 'radio':{ctx.save();ctx.translate(x,y);ell(2,5,13,8,'rgba(0,0,0,.35)');oRound(-11,-7,22,14,2,'#3b4a3a');oCirc(-4,0,4,'#1e1e1e',.8);for(let k=0;k<3;k++)line(3,-3+k*3,8,-3+k*3,'#222',1);oLine(6,-7,14,-18,'#9a9a9a',1.2);if(Math.floor(now/500)%2)circ(8,4,1.8,'#ff4040');ctx.restore();break}
  case 'siren':{ctx.save();ctx.translate(x,y);ell(2,5,12,8,'rgba(0,0,0,.35)');oLine(-7,8,0,0,'#555',2);oLine(7,8,0,0,'#555',2);oRect(-7,-7,14,10,'#4f4f4f');const on=Math.floor(now/300)%2;oCirc(0,-3,4.5,on?'#ff3b3b':'#7a1d1d',1);if(on)circ(-1.5,-4.5,1.4,'#ffd0d0');ctx.restore();break}
  case 'solar':{ctx.save();ctx.translate(x,y);ctx.rotate(out);ell(3,5,16,12,'rgba(0,0,0,.35)');oRect(-14,-10,28,20,'#1e2f5a');[-7,0,7].forEach(k=>line(k,-10,k,10,'#8aa0c8',.8));line(-14,0,14,0,'#8aa0c8',.8);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(-14,-10,10,6);ctx.restore();break}
  case 'trap':{ctx.save();ctx.translate(x,y);circ(1,2,11,'rgba(0,0,0,.3)');ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.stroke();ctx.strokeStyle='#8b8f93';ctx.lineWidth=2;ctx.stroke();for(let k=0;k<10;k++){const t=k/10*Math.PI*2;line(Math.cos(t)*9,Math.sin(t)*9,Math.cos(t)*4.5,Math.sin(t)*4.5,'#c5c9cd',1.4)}oCirc(0,0,2.5,'#555',1);ctx.restore();break}
  case 'fire':{ell(x+1,y+2,23,16,'rgba(0,0,0,.25)');ell(x,y,22,15,'rgba(30,26,36,.85)');ell(x-6,y-4,9,4,'rgba(130,100,170,.28)');ell(x+7,y+5,5,2,'rgba(90,140,170,.22)');
   if(S.busy&&G.event.id!=='pluie'){for(let k=0;k<2;k++)PT.push({x:x+(Math.random()-.5)*34,y:y+(Math.random()-.5)*20,vx:(Math.random()-.5)*.01,vy:-.045,t0:now,dur:420,c:Math.random()<.5?'#ff9a2e':'#ffd25a',r:3+Math.random()*3,light:0})}break}
  case 'mine':{circ(x+1,y+3,10,'rgba(0,0,0,.3)');oCirc(x,y,8,'#3b3d33');ctx.strokeStyle='#5d604f';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,5,0,7);ctx.stroke();if(Math.floor(now/400)%2)circ(x,y,2,'#ff3b3b');break}
  case 'wire':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-24,24].forEach(p=>oLine(p,-8,p,8,'#5a4632',2.4));[-5,0,5].forEach(o=>{ctx.beginPath();for(let k=-24;k<=24;k+=4)ctx.lineTo(k,o+((k/4)%2?1.5:-1.5));ctx.strokeStyle=INK;ctx.lineWidth=2.6;ctx.stroke();ctx.strokeStyle='#9da1a6';ctx.lineWidth=1;ctx.stroke()});ctx.restore();break}
  case 'spike':{ell(x,y,21,15,INK);ell(x,y,19.5,13.5,'#1c140b');for(let k=0;k<u.hp+3;k++){const t=k/(u.hp+3)*7,px=x+Math.cos(t)*10,py=y+Math.sin(t)*6;oLine(px,py+3,px,py-6,'#a07a4a',1.6);circ(px,py-6,.8,'#d8c19a')}break}
  case 'gas':{ctx.save();ctx.translate(x,y);ell(2,5,10,8,'rgba(0,0,0,.35)');oCirc(0,0,8.5,'#b8332f');ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,5.5,0,7);ctx.stroke();ell(-3,-3,3,2,'rgba(255,255,255,.28)');oCirc(0,0,2.2,'#888',.8);ctx.fillStyle='#f2d24a';ctx.fillRect(-6,4,4,2);ctx.restore();break}
  case 'smoke':{circ(x+1,y+3,7,'rgba(0,0,0,.3)');oCirc(x,y,6,'#4f6b3f');ctx.fillStyle='#ddd';ctx.fillRect(x-4,y-1,8,2);circ(x+3,y-5,1.5,'#9a9a9a');break}
  case 'bait':{ell(x+1,y+3,12,8,'rgba(0,0,0,.3)');oEll(x,y,11,7,'#a8323a');ell(x-2,y-1,6,3.5,'#d36a6f');oCirc(x+8,y+3,3,'#f0ece4',1);circ(x-6,y+3,1,'#6a1418');break}
  case 'dyn':{ctx.save();ctx.translate(x,y);ell(1,4,12,8,'rgba(0,0,0,.3)');[-6,0,6].forEach(p=>oRect(p-2.5,-8,5,16,'#c0392b',1));ctx.fillStyle='#222';ctx.fillRect(-9,-2,18,3);oLine(0,-8,4,-14,'#ccc',.8);if(Math.floor(now/200)%2){circ(4,-14,2.4,'#ffcf4a');circ(4,-14,1,'#fff')}ctx.restore();break}
 }
}
function drawShelter(now){
 const x=CEN.x,y=CEN.y,f=G.shelter/Z.maxS(G);ctx.save();ctx.translate(x,y);
 ell(6,8,38,32,'rgba(0,0,0,.45)');
 oRect(-30,-26,60,52,'#5b4b39',1.6);
 // toit en tuiles, deux pans
 ctx.fillStyle=INK;ctx.fillRect(-35.5,-31.5,71,63);
 ctx.fillStyle='#7a3b2b';ctx.fillRect(-34,-30,68,30);ctx.fillStyle='#8e4632';ctx.fillRect(-34,0,68,30);
 for(let r=0;r<8;r++){const yy=-30+r*7.5;ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(-34,yy+6,68,1.2);for(let c=0;c<9;c++){const xx=-34+c*8+(r%2?4:0);ctx.fillStyle='rgba(0,0,0,.16)';ctx.fillRect(xx,yy,1,7.5)}}
 ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(-34,-30,68,4);
 oLine(-34,0,34,0,'#4a2016',2.4);
 // tuiles manquantes et planches selon les dégâts
 const miss=[[-22,-20],[10,12],[18,-12],[-8,18],[-26,8],[4,-24]];miss.slice(0,Math.round((1-f)*miss.length)).forEach(([a,b])=>{ctx.fillStyle='#2a1a12';ctx.fillRect(a,b,8,6)});
 if(f<.5){oLine(-24,-18,-6,-6,'#8a6a45',3);oLine(12,10,26,20,'#8a6a45',3)}
 // cheminée
 oRect(12,-24,9,10,'#4a4a4a',1.2);ctx.fillStyle='#2a2a2a';ctx.fillRect(14,-22,5,5);
 const lit=nightAmt>.2;[[-24,-8],[16,4]].forEach(([a,b])=>{oRect(a,b,8,6,lit?'#ffcf6b':'#2a3036',1);if(lit){ctx.globalAlpha=.25;circ(a+4,b+3,9,'#ffcf6b');ctx.globalAlpha=1}});
 ctx.restore();
 if(Math.random()<(nightAmt>.3?.06:.02))PT.push({x:x+16,y:y-26,vx:.004,vy:-.02,t0:now,dur:1300,c:'rgba(160,160,160,.35)',r:4,light:0});
}
/* zombies : silhouette commune, chaque type a sa taille, sa peau, ses vêtements et un détail qui le rend reconnaissable */
const ZL={walk:{sz:1,skin:'#8fa070',cloth:'#4a4a42'},run:{sz:.92,skin:'#a7b062',cloth:'#5a4836',lean:1},fat:{sz:1.35,skin:'#9c8aa8',cloth:'#4b3b4f',fat:1},
 zdog:{sz:.85,skin:'#6d7a4a',cloth:'#4a3b2a',dog:1},crawl:{sz:.85,skin:'#7f9c96',cloth:'#3a4646',low:1},spit:{sz:1,skin:'#b4c85a',cloth:'#4a5a22',spit:1},
 armor:{sz:1.08,skin:'#8fa070',cloth:'#2e3640',helm:'#6e7780',vest:1},howl:{sz:1,skin:'#c4a0b4',cloth:'#5a3a4a',howl:1},boss:{sz:2.2,skin:'#8a5a52',cloth:'#2e2020',boss:1}};
function drawZombie(v,now){
 const p=v.dying?{x:v.dx,y:v.dy}:zpos(v,now),k=v.k;let alpha=clamp((now-v.born)/350,0,1);
 if(v.dying){alpha=1-clamp((now-v.dying)/500,0,1);if(alpha<=0)return false}
 const Lk=ZL[k]||ZL.walk,a=Math.atan2(CEN.y-p.y,CEN.x-p.x),moving=now-v.t0<v.dur,wob=Math.sin(now/(Z.ZT[k].spd===1?90:200)+v.id)*(moving?.22:.06);
 const sz=Lk.sz*1.5,skin=Lk.skin,cloth=Lk.cloth;
 if(v.burn&&!v.dying&&Math.random()<.3)PT.push({x:p.x+(Math.random()-.5)*10,y:p.y-4,vx:0,vy:-.04,t0:now,dur:300,c:Math.random()<.5?'#ff9a2e':'#ffd25a',r:2.5,light:0});
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(p.x,p.y);ell(2,4,11*sz,8*sz,'rgba(0,0,0,.4)');ctx.rotate(a+wob);ctx.scale(sz,sz);
 if(v.dying)ctx.rotate(.6);
 if(Lk.dog){dogShape(skin,skin,cloth,now,70);circ(10,-2,1,'#d7262e');circ(10,2,1,'#d7262e');ell(-4,1,2.5,1.6,'#6a1418')}
 else{
  const sw=Math.sin(now/170+v.id)*2.4*(moving?1:.3),reach=v.dying?5:(Lk.low?11:Lk.lean?17:15);
  const h1=[reach+sw,-6.5+sw*.3],h2=[reach-sw,6.5-sw*.3];
  oLine(1,-6.5,h1[0],h1[1],skin,3.2);oLine(1,6.5,h2[0],h2[1],skin,3.2);
  oCirc(h1[0],h1[1],2,shade(skin,-.2),1);oCirc(h2[0],h2[1],2,shade(skin,-.2),1);
  if(Lk.low){oEll(-5,0,10,6,cloth);line(-14,-3,-10,0,shade(cloth,-.3),2)}
  else oEll(0,0,Lk.fat?9.5:7,Lk.fat?12.5:10.5,cloth);
  ell(-3,-4,3,2.5,shade(cloth,-.35));ell(-2,5,2.6,2,'#6a1418');ell(1,-2,1.5,3,'rgba(255,255,255,.07)');
  if(Lk.vest)oRect(-5.5,-7,6,14,'#2a3036',1);
  if(Lk.fat){circ(-2,4,2.3,'#6c5a7a');circ(2,-5,1.8,'#6c5a7a');circ(-4,-1,1.4,'#7a6a8a')}
  if(Lk.boss){[[-6,-8],[-8,0],[-6,8]].forEach(([a,b])=>oLine(a,b,a-5,b*1.3,'#e8e0cc',1.2));ell(-2,3,4,2.5,'#6a1418')}
  oCirc(3,0,5.2,skin,1.2);ell(1.2,0,2.4,4,'rgba(0,0,0,.2)');circ(2,-2.6,1.3,'#7a1a1a');
  if(Lk.helm){circ(2.4,0,5.7,Lk.helm);line(5.8,-4,5.8,4,'#1c2228',1.6);ell(1,-2,2,1.4,'rgba(255,255,255,.15)')}
  if(Lk.spit)oCirc(7.2,0,2.6,'#d8f05a',.8);
  if(Lk.howl){ell(7.6,0,2.1,1.5,'#2a0a0a');ctx.strokeStyle='#ffd0e8';ctx.lineWidth=1;ctx.beginPath();ctx.arc(10,0,3+Math.sin(now/120)*1.5,-.8,.8);ctx.stroke()}
  if(!Lk.helm){circ(6,-2,1.1,'#d7262e');circ(6,2,1.1,'#d7262e')}
 }
 if(v.flash&&now-v.flash<110){ctx.globalAlpha=alpha*.8;circ(0,0,11,'#fff')}
 ctx.restore();
 if(!v.dying){const ex=Math.cos(a+wob),ey=Math.sin(a+wob);EYES.push([p.x+ex*5.5*sz,p.y+ey*5.5*sz,-ey,ex,sz,alpha]);if(v.hp<v.max||k==='boss')hpBar(p.x,p.y-17*sz,v.hp/v.max,'#e5484d')}
 return true;
}

/* ---------- effects ---------- */
function addFX(f){f.t0=performance.now();FX.push(f)}
function burst(x,y,c,n,spd,r){const now=performance.now();for(let k=0;k<n;k++){const a=Math.random()*7,s=spd*(.4+Math.random());PT.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t0:now,dur:300+Math.random()*250,c,r:r||2,light:0})}}
function drawFX(now){
 for(let k=FX.length-1;k>=0;k--){const f=FX[k],p=Math.max(0,(now-f.t0)/f.dur);if(p>=1){FX.splice(k,1);continue}
  ctx.globalAlpha=1-p;
  if(f.type==='tracer')line(f.x1,f.y1,f.x1+(f.x2-f.x1)*Math.min(1,p*3),f.y1+(f.y2-f.y1)*Math.min(1,p*3),f.c,f.w);
  if(f.type==='flash')circ(f.x,f.y,f.r*(1-p*.5),f.c);
  if(f.type==='swing'){ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(f.x,f.y,18,f.a-1+p*1.6,f.a-.4+p*1.6);ctx.stroke()}
  if(f.type==='ring'&&p>0){ctx.strokeStyle=f.c;ctx.lineWidth=3*(1-p);ctx.beginPath();ctx.arc(f.x,f.y,f.r*p,0,7);ctx.stroke()}
  ctx.globalAlpha=1}
 for(let k=PT.length-1;k>=0;k--){const q=PT[k],p=Math.max(0,(now-q.t0)/q.dur);if(p>=1){PT.splice(k,1);continue}const dt=now-q.t0;
  ctx.globalAlpha=1-p;circ(q.x+q.vx*dt,q.y+q.vy*dt,q.r*(1-p*.5),q.c);ctx.globalAlpha=1}
}
const floats=[];
function floatTxt(x,y,txt,c){floats.push({x,y,txt,c,t0:performance.now()})}
function drawFloats(now){ctx.font='bold 13px "Atkinson Hyperlegible",system-ui,sans-serif';ctx.textAlign='center';
 for(let k=floats.length-1;k>=0;k--){const f=floats[k],p=(now-f.t0)/700;if(p>=1){floats.splice(k,1);continue}
  ctx.globalAlpha=1-p;ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillText(f.txt,f.x+1,f.y-18-p*18+1);ctx.fillStyle=f.c;ctx.fillText(f.txt,f.x,f.y-18-p*18);ctx.globalAlpha=1}}

function lights(now){
 const ls=[{x:CEN.x,y:CEN.y,r:T*2.1}];
 const pow=powered();
 G.grid.forEach((u,i)=>{if(!u)return;const p=tc(i);
  if(u.t==='lamp'&&pow){const d=Math.atan2(p.y-CEN.y,p.x-CEN.x);ls.push({x:p.x+Math.cos(d)*40,y:p.y+Math.sin(d)*40,r:T*1.5});ls.push({x:p.x,y:p.y,r:T*.8})}
  else if(u.t==='siren')ls.push({x:p.x,y:p.y,r:T*(Math.floor(now/300)%2?1.2:.9)});
  else if(u.t==='fire'&&S.busy&&G.event.id!=='pluie')ls.push({x:p.x,y:p.y,r:T*(1.05+Math.sin(now/80+i)*.08)});
  else ls.push({x:p.x,y:p.y,r:T*.95})});
 FX.forEach(f=>{if(f.light){const p=(now-f.t0)/f.dur;if(p<1)ls.push({x:f.x,y:f.y,r:f.light*(1-p)})}});
 PT.forEach(q=>{if(q.light)ls.push({x:q.x,y:q.y,r:q.light})});
 return ls;
}
function drawDark(now){
 if(nightAmt<.01)return;
 dctx.setTransform(1,0,0,1,0,0);dctx.globalCompositeOperation='source-over';dctx.clearRect(0,0,dark.width,dark.height);
 dctx.fillStyle=`rgba(4,7,18,${.66*nightAmt})`;dctx.fillRect(0,0,dark.width,dark.height);
 dctx.setTransform(SC,0,0,SC,0,0);dctx.globalCompositeOperation='destination-out';
 for(const l of lights(now)){const g=dctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.55,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');dctx.fillStyle=g;dctx.beginPath();dctx.arc(l.x,l.y,l.r,0,7);dctx.fill()}
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(dark,0,0);ctx.restore();
 ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(CEN.x,CEN.y,0,CEN.x,CEN.y,T*1.6);g.addColorStop(0,`rgba(255,170,60,${.12*nightAmt})`);g.addColorStop(1,'rgba(255,170,60,0)');ctx.fillStyle=g;ctx.fillRect(0,0,L,L);ctx.restore();
}
function frame(now){
 requestAnimationFrame(frame);
 try{frameInner(now)}catch(e){ctx.restore&&ctx.setTransform(1,0,0,1,0,0);if(!frame.err){frame.err=1;console.error(e)}}
}
// décor propre à chaque lieu, par-dessus le sol commun
function drawPlace(now){const pl=G.place;
 if(pl==='ferme'){ctx.fillStyle='#24465a';ctx.fillRect(0,0,L,T*.8);ctx.strokeStyle='rgba(160,200,220,.35)';ctx.lineWidth=1.5;for(let k=0;k<6;k++){const y=8+k*8,o=(now/40+k*30)%60;ctx.beginPath();for(let x=-60+o;x<L;x+=60){ctx.moveTo(x,y);ctx.lineTo(x+22,y)}ctx.stroke()}
  ctx.fillStyle='rgba(120,140,60,.18)';for(let r=1;r<6;r++)ctx.fillRect(T,r*T+T/2-2,L-2*T,4)}
 if(pl==='station'){ctx.fillStyle='rgba(120,120,115,.35)';ctx.fillRect(T,T,L-2*T,L-2*T);ctx.strokeStyle='rgba(230,200,60,.35)';ctx.lineWidth=2;ctx.setLineDash([10,8]);ctx.strokeRect(T*1.5,T*1.5,L-3*T,L-3*T);ctx.setLineDash([]);
  [[T*1.2,T*5.6],[T*5.4,T*1.2]].forEach(([x,y])=>{ctx.fillStyle='#8e2d2a';ctx.fillRect(x,y,14,20);ctx.fillStyle='#ddd';ctx.fillRect(x+3,y+3,8,6)})}
 if(pl==='mall'){ctx.fillStyle='rgba(90,95,100,.45)';ctx.fillRect(T,T,L-2*T,L-2*T);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1.5;for(let c=1;c<7;c++){ctx.beginPath();ctx.moveTo(c*T,T);ctx.lineTo(c*T,T*1.6);ctx.moveTo(c*T,L-T);ctx.lineTo(c*T,L-T*1.6);ctx.stroke()}}
}
function frameInner(now){
 const dt=Math.min(50,now-last);last=now;fit();
 nightAmt+=(nightTarget-nightAmt)*Math.min(1,dt/450);SFX.night(nightAmt);
 let sx=0,sy=0;if(now-shakeT<260&&!reduce){const k=(1-(now-shakeT)/260)*5;sx=(Math.random()-.5)*k;sy=(Math.random()-.5)*k}
 ctx.setTransform(SC,0,0,SC,sx*SC,sy*SC);
 BARS=[];EYES=[];LABELS=[];
 ctx.drawImage(ground,0,0,L,L);try{drawPlace(now)}catch(e){}ctx.drawImage(decal,0,0,L,L);
 if(!S.busy){
  const t=S.sel!==null?S.hand[S.sel]:null,mv=S.moveFrom;
  if(mv!==null){const p=tc(mv);ctx.strokeStyle='#7cc7ff';ctx.lineWidth=2.5;ctx.strokeRect(p.x-T/2+2,p.y-T/2+2,T-4,T-4)}
  for(const i of Z.INNER){const p=tc(i);if(mv!==null&&Z.canMove(G,mv,i)){ctx.strokeStyle='rgba(124,199,255,.75)';ctx.lineWidth=1.5;ctx.setLineDash([4,4])}else if(t&&Z.canPlace(G,t,i)){ctx.strokeStyle='rgba(242,179,61,.7)';ctx.lineWidth=t==='kit'?2:1;ctx.setLineDash([4,4])}else{ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1;ctx.setLineDash([])}ctx.strokeRect(p.x-T/2+2,p.y-T/2+2,T-4,T-4)}
  ctx.setLineDash([]);
  if(t&&Z.canPlace(G,t,Z.C)){ctx.strokeStyle='rgba(242,179,61,.8)';ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.strokeRect(CEN.x-T/2-4,CEN.y-T/2-4,T+8,T+8);ctx.setLineDash([])}
 }
 const safe=f=>{ctx.save();try{f()}catch(e){}ctx.restore()};
 safe(()=>drawShelter(now));
 G.grid.forEach((u,i)=>{if(u&&!Z.U[u.t].block)safe(()=>drawUnit(i,u,now))});
 const zs=[...V.values()].sort((a,b)=>zpos(a,now).y-zpos(b,now).y);
 zs.forEach(v=>safe(()=>{if(!drawZombie(v,now))V.delete(v.id)}));
 G.grid.forEach((u,i)=>{if(u&&Z.U[u.t].block)safe(()=>drawUnit(i,u,now))});
 drawFX(now);
 drawDark(now);
 if(nightAmt>.05){ctx.save();ctx.shadowColor='#ff2a2a';ctx.shadowBlur=6;for(const[x,y,nx,ny,sz,al]of EYES){ctx.globalAlpha=al*nightAmt;circ(x+nx*2*sz,y+ny*2*sz,1.3*sz,'#ff4a3a');circ(x-nx*2*sz,y-ny*2*sz,1.3*sz,'#ff4a3a')}ctx.restore()}
 drawBars();
 ctx.save();ctx.font='bold 10px "Atkinson Hyperlegible",system-ui,sans-serif';ctx.textAlign='center';for(const[x,y,n]of LABELS){ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillText(n,x+1,y+1);ctx.fillStyle='#ebe7da';ctx.fillText(n,x,y)}ctx.restore();
 drawFloats(now);
 if(now-hurtT<400){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(cv.width/2,cv.height/2,cv.width*.3,cv.width/2,cv.height/2,cv.width*.75);g.addColorStop(0,'rgba(229,72,77,0)');g.addColorStop(1,`rgba(229,72,77,${.45*(1-(now-hurtT)/400)})`);ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);ctx.restore()}
}

const powered=()=>G.event.id!=='coupure'||G.relics.includes('groupe')||G.grid.some(u=>u&&u.t==='solar');
function safeTxt(x,y,t,c){ctx.font='bold 14px system-ui,sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillText(t,x+1,y+1);ctx.fillStyle=c;ctx.fillText(t,x,y)}

/* ---------- combat events → visuals ---------- */
function playEvents(ev,types,now){
 const shots=new Set();
 const SND={gun:'shot',kid:'shot',snp:'snp',sht:'sht',mg:'mg',xbow:'bow',flame:'flame',axe:'melee',dog:'melee',cop:'melee',butch:'melee',monk:'melee'};
 for(const e of ev){
  try{if(e.k==='hit')SFX.play(SND[types[e.src]]||'hit');else if(e.k==='bite'||e.k==='spit')SFX.play(e.i===Z.C?'shelter':'bite');
   else if(e.k==='boom')SFX.play('boom');else if(e.k==='lost')SFX.play(e.name?'death':'lost',.3);else if(e.k==='molo')SFX.play('flame');else if(e.k==='howl')SFX.play('groan',.2)}catch(x){}
  if(e.k==='hit'){const v=V.get(e.zid);const tp=v?(v.dying?{x:v.dx,y:v.dy}:zpos(v,now)):tc(e.i);if(v)v.flash=now;
   floatTxt(tp.x,tp.y,e.txt,'#ffffff');burst(tp.x,tp.y,'rgba(140,20,24,.9)',4,.06,2);splat(tp.x,tp.y,false);
   const t=types[e.src],sp=tc(e.src);
   if(t)facing[e.src]=Math.atan2(tp.y-sp.y,tp.x-sp.x);
   const key=e.src+':'+e.zid;
   if(t==='gun'||t==='snp'||t==='mg'||t==='kid'){const a=facing[e.src],mx=sp.x+Math.cos(a)*(t==='snp'?26:18),my=sp.y+Math.sin(a)*(t==='snp'?26:18);
    addFX({type:'tracer',x1:mx,y1:my,x2:tp.x,y2:tp.y,c:t==='snp'?'#fff4c8':'#ffd27a',w:t==='snp'?1.6:1.2,dur:t==='snp'?260:160});
    addFX({type:'flash',x:mx,y:my,r:t==='snp'?7:5,c:'#ffe08a',dur:90,light:T*.9})}
   else if(t==='sht'){if(!shots.has(e.src)){shots.add(e.src);const a=facing[e.src],mx=sp.x+Math.cos(a)*15,my=sp.y+Math.sin(a)*15;addFX({type:'flash',x:mx,y:my,r:8,c:'#ffd27a',dur:110,light:T})}
    addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:tp.x+(Math.random()-.5)*10,y2:tp.y+(Math.random()-.5)*10,c:'#ffcf70',w:1,dur:140})}
   else if(t==='xbow'){addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:tp.x,y2:tp.y,c:'#d8c49a',w:1.8,dur:200})}
   else if(t==='flame'){for(let k=0;k<6;k++)PT.push({x:sp.x+(tp.x-sp.x)*k/6,y:sp.y+(tp.y-sp.y)*k/6,vx:(Math.random()-.5)*.02,vy:-.02,t0:now,dur:260,c:k%2?'#ff9a2e':'#ffd25a',r:3+k*.6,light:k===5?24:0})}
   else if(t==='cop'||t==='butch'||t==='monk')addFX({type:'swing',x:sp.x,y:sp.y,a:facing[e.src],dur:200});
   else if(t==='spike'||t==='wire')burst(tp.x,tp.y,'#a07a4a',4,.05,2);
   else if(t==='axe')addFX({type:'swing',x:sp.x,y:sp.y,a:facing[e.src],dur:220});
   else if(t==='dog')addFX({type:'flash',x:tp.x,y:tp.y,r:6,c:'rgba(255,255,255,.7)',dur:90});
   else if(t==='fen'){addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:tp.x,y2:tp.y,c:'#9fe8ff',w:2,dur:120});addFX({type:'flash',x:tp.x,y:tp.y,r:7,c:'#bff3ff',dur:120,light:T*.8})}
   else if(t==='trap')addFX({type:'ring',x:sp.x,y:sp.y,r:22,c:'#d9dde0',dur:250});
   else if(t==='fire')burst(tp.x,tp.y,'#ff9a2e',3,.04,3);
  }
  if(e.k==='boom'){const p=tc(e.i);addFX({type:'flash',x:p.x,y:p.y,r:46,c:'rgba(255,160,60,.9)',dur:380,light:T*2.2});addFX({type:'ring',x:p.x,y:p.y,r:70,c:'#ffb35c',dur:420});burst(p.x,p.y,'#ff9a2e',22,.2,3);burst(p.x,p.y,'#3a3a3a',14,.12,4);shakeT=now;gx.fillStyle='rgba(15,12,10,.6)';gx.beginPath();gx.arc(p.x,p.y,22,0,7);gx.fill()}
  if(e.k==='bite'){const v=V.get(e.zid),p=tc(e.i);
   if(e.i===Z.C){shakeT=now;hurtT=now;if(v){if(v.k==='boss'){v.lunge=now;v.lx=p.x;v.ly=p.y}else v.bit=1}floatTxt(p.x,p.y-8,e.txt,'#ff6b6b');burst(p.x,p.y,'rgba(140,20,24,.9)',8,.08,2)}
   else{if(v){v.lunge=now;v.lx=p.x;v.ly=p.y}floatTxt(p.x,p.y,e.txt,'#ff6b6b');burst(p.x,p.y,types[e.i]==='car'?'#9a9a9a':'#a07a4a',5,.07,2)}}
  if(e.k==='lost'){const p=tc(e.i);burst(p.x,p.y,'#8a6a45',16,.12,3);burst(p.x,p.y,'rgba(140,20,24,.9)',6,.08,2);splat(p.x,p.y,true)}
  if(e.k==='spit'){const v=V.get(e.zid),p=tc(e.i),f=v?zpos(v,now):tc(e.from);addFX({type:'tracer',x1:f.x,y1:f.y,x2:p.x,y2:p.y,c:'#c6e83a',w:3,dur:220});burst(p.x,p.y,'#b7d83a',6,.06,2);floatTxt(p.x,p.y,e.txt,'#c6e83a');if(e.i===Z.C){shakeT=now;hurtT=now}}
  if(e.k==='smoke'){const p=tc(e.i);for(let k=0;k<26;k++)PT.push({x:p.x+(Math.random()-.5)*90,y:p.y+(Math.random()-.5)*90,vx:(Math.random()-.5)*.01,vy:-.008,t0:now,dur:1800,c:'rgba(190,200,190,.35)',r:8+Math.random()*8,light:0})}
  if(e.k==='eat'){const p=tc(e.i);floatTxt(p.x,p.y,'miam','#ff9a9a');burst(p.x,p.y,'rgba(140,20,24,.9)',4,.04,2)}
  if(e.k==='molo'){const p=tc(e.i),sp=tc(e.src);addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:p.x,y2:p.y,c:'#3c7a3a',w:2,dur:200});addFX({type:'flash',x:p.x,y:p.y,r:30,c:'rgba(255,140,40,.8)',dur:320,light:T*1.6});burst(p.x,p.y,'#ff9a2e',16,.12,3)}
  if(e.k==='howl'){const p=tc(e.i);addFX({type:'ring',x:p.x,y:p.y,r:60,c:'#e0a0c0',dur:500});floatTxt(p.x,p.y-10,'HOOO !','#e0a0c0')}
  if(e.k==='saved'){const p=tc(e.i);floatTxt(p.x,p.y-10,'Increvable !','#f2b33d');addFX({type:'ring',x:p.x,y:p.y,r:40,c:'#f2b33d',dur:400})}
  if(e.k==='shot'){const v=V.get(e.zid),tp=v?zpos(v,now):CEN;addFX({type:'tracer',x1:CEN.x,y1:CEN.y-10,x2:tp.x,y2:tp.y,c:'#fff4c8',w:2,dur:260});addFX({type:'flash',x:CEN.x,y:CEN.y-10,r:8,c:'#ffe08a',dur:120,light:T})}
  if(e.k==='heal'){const p=tc(e.i);for(let k=0;k<3;k++)PT.push({x:p.x+(Math.random()-.5)*20,y:p.y,vx:0,vy:-.03,t0:now,dur:500,c:'#7ee08a',r:2.5,light:0})}
 }
}

/* ---------- UI ---------- */
function hordeHtml(){const w=Z.waveList(G);const parts=Z.ZK.filter(k=>w[k]).map(k=>`<span class="hz"><span class="dot" style="--zc:var(--z-${k})"></span>${plural(w[k],...ZN[k])}</span>`);
 return `<span>Cette nuit :</span>${parts.join('')}`}
const cardName=t=>Z.stat(G,t).n;
const famTag=t=>{const f=Z.famOf(t);return f?`<span class="ft">${Z.FAM[f].ic}</span>`:''};
const famLine=t=>{const f=Z.famOf(t);return f?` <em class="ce">${Z.FAM[f].ic} ${Z.FAM[f].n}</em>`:''};
const rar=t=>Z.RAR[t]||'com';
const rarTag=t=>rar(t)==='com'?'':`<span class="rt ${rar(t)}">${Z.RARITY[rar(t)].n}</span>`;
const left0=()=>Math.max(0,G.energy??0);
function render(){
 $('#round').innerHTML=S.busy?`Nuit ${G.night}`:`Jour ${G.night}`;
 $('#shelT').textContent=`${Math.max(0,G.shelter)}/${Z.maxS(G)}`;
 const sb=$('#shelB');sb.style.width=Math.max(0,G.shelter)/Z.maxS(G)*100+'%';sb.className=G.shelter<=3?'low':'';
 $('#event').innerHTML=`<b>${G.event.n}</b><span>${G.event.d}${G.side>=0?` · Fusée : ils viendront de ${Z.SIDES[G.side]}`:''}</span>`;
 const mN=G.muts.length,soon=Z.mutNight(G.night);
 $('#horde').innerHTML=(S.busy?'':hordeHtml())+`<span class="tags">${mN||soon?`<span class="mutc${soon?' soon':''}" title="Mutations de la horde">${svg('mut')}${mN}${soon?' · mute à l’aube':''}</span>`:''}<span class="scrap" title="Ferraille">${svg('scrap')}${G.scrap}</span></span>`;
 const left=G.energy??Z.ENERGY;
 const hand=$('#hand');hand.style.setProperty('--n',Math.max(5,Math.min(6,S.hand.length)));
 hand.innerHTML=S.hand.map((t,k)=>`<button type="button" class="card r-${rar(t)}${S.sel===k?' sel':''}${G.upg[t]?' up':''}" data-k="${k}" style="--cc:${cc(t)}" ${(S.busy?!Z.U[t].react:Z.U[t].react)||!Z.canPay(G,t)?'disabled':''}><span class="cost">${Z.costOf(G,t)}</span>${famTag(t)}${svg(t)}<span class="nm">${cardName(t)}</span><span class="v">${Z.U[t].react&&!S.busy?'Nuit':Z.U[t].v}</span></button>`).join('');
 const fc=Z.famCounts(G),fl=Z.famLevels(G);$('#fams').innerHTML=Object.keys(Z.FAM).filter(f=>fc[f]).map(f=>`<span class="fam l${fl[f]}" title="${Z.FAM[f].n}">${Z.FAM[f].ic} ${fc[f]}${fl[f]?' '+'★'.repeat(fl[f]):'/'+Z.FAM[f].lv[0]}</span>`).join('');
 const info=$('#info');info.className='info';
 if(S.busy&&S.sel!==null){const t=S.hand[S.sel];info.innerHTML=`<b>${cardName(t)}</b> : ${Z.U[t].d}. `+(Z.U[t].react==='unit'?'Touche une unité blessée.':'Touche une case de la carte.')}
 else if(S.busy){const left=G.z.length+G.pending.length,hasR=S.hand.some(t=>Z.U[t].react);info.innerHTML=`<b>${plural(left,'zombie','zombies')}</b> encore dehors.`+(hasR?` <span class="nrg">${'<i class="on"></i>'.repeat(Math.max(0,left0()))}</span> ${left0()} énergie pour tes réactions.`:'')}
 else if(S.sel!==null){const t=S.hand[S.sel],D=Z.U[t];info.innerHTML=`<b>${cardName(t)}</b> (${Z.costOf(G,t)} énergie) : ${D.d}.`+(D.onUnit?' Touche une unité blessée.':D.instant?' Touche l’abri.':D.near?' Touche une case collée à l’abri.':' Touche un emplacement.')}
 else if(S.moveFrom!==null&&G.grid[S.moveFrom])info.innerHTML=unitLine(G.grid[S.moveFrom])+' Touche une case libre en bleu pour le déplacer.';
 else if(S.inspect!==null&&G.grid[S.inspect])info.innerHTML=unitLine(G.grid[S.inspect])+(G.moved?' (déjà un déplacement aujourd’hui)':'');
 else info.innerHTML=`<span class="nrg">${'<i class="on"></i>'.repeat(Math.max(0,left))}${'<i></i>'.repeat(Math.max(0,Z.ENERGY-left))}</span> <b>${left}</b> énergie.`+(G.moved?'':' Touche une unité pour la déplacer (1 fois par jour).');
 const tip=$('#tip');if(TUTO<4&&ov.hidden&&(S.busy?TUTO===3:TUTO<3)){tip.hidden=false;tip.textContent=TIPS[TUTO]}else tip.hidden=true;
 const go=$('#go');go.disabled=false;go.textContent=S.busy?`Vitesse ×${SPEED} (toucher pour changer)`:'Affronter la nuit';go.classList.toggle('speed',S.busy);
}
$('#hand').addEventListener('click',e=>{const b=e.target.closest('.card');if(!b||b.disabled)return;SFX.play('ui');const k=+b.dataset.k;
 if(S.busy&&Z.U[S.hand[k]].react==='any'){playReact(k,Z.C);return}S.sel=S.sel===k?null:k;S.moveFrom=null;S.inspect=null;if(S.sel!==null)tuto(0);render()});
$('#round').addEventListener('click',()=>{if(!S.busy&&ov.hidden)runInfo()});
cv.addEventListener('click',e=>{
 const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*L,y=(e.clientY-r.top)/r.height*L;
 const i=Math.floor(y/T)*Z.N+Math.floor(x/T);tapCell(i);
});
// fiche d'une unité : prénom, métier, trait, victimes, PV
function unitLine(u){const tr=Z.TRAITS[u.trait];return u.name?`<b>${u.name}</b>, ${cardName(u.t)} · <b>${tr.n}</b> (${tr.d}) · ${plural(u.kills||0,'zombie tué','zombies tués')} · ${u.hp}/${Z.maxHp(G,u)} PV.`:`<b>${cardName(u.t)}</b> · ${u.hp}/${Z.maxHp(G,u)} PV.`}
// jouer une réaction pendant la nuit
function playReact(k,i){const t=S.hand[k];const types=G.grid.map(u=>u&&u.t);const ev=Z.react(G,t,i);if(!ev)return false;
 S.hand.splice(k,1);S.discard.push(t);syncBoard();S.sel=null;const now=performance.now();syncZ(now);playEvents(ev,types,now);
 const p=tc(i);if(t==='grenade')SFX.play('boom');else if(t==='shot')SFX.play('snp');else SFX.play('place');
 if(t==='horn'){addFX({type:'ring',x:CEN.x,y:CEN.y,r:200,c:'#f2b33d',dur:600});floatTxt(CEN.x,CEN.y-20,'Reculez !','#f2b33d')}
 if(t==='rush')floatTxt(CEN.x,CEN.y-20,'Adrénaline !','#ff7a59');
 if(t==='patch')floatTxt(p.x,p.y,'+5 PV','#9fd86b');
 render();return true}
function tapCell(i){
 if(S.busy){if(S.sel!==null&&Z.U[S.hand[S.sel]].react)playReact(S.sel,i);return}
 if(S.sel===null){
  // déplacement d'une unité : on la touche, puis on touche une case libre
  if(S.moveFrom!==null){const a=S.moveFrom;S.moveFrom=null;S.inspect=null;if(Z.move(G,a,i)){facing[i]=facing[a];facing[a]=null;const p=tc(i);addFX({type:'ring',x:p.x,y:p.y,r:34,c:'#7cc7ff',dur:350});save()}render();return}
  S.inspect=null;if(G.grid[i]){if(G.moved)S.inspect=i;else S.moveFrom=i}render();
  return}
 const t=S.hand[S.sel],D=Z.U[t];
 if(!Z.canPay(G,t)||!Z.canPlace(G,t,i))return;
 tuto(1);S.hand.splice(S.sel,1);Z.place(G,t,i,R);if(!D.instant)facing[i]=null;if(D.instant)S.discard.push(t);syncBoard();S.sel=null;S.moveFrom=null;S.inspect=null;
 if(G.grid[i]&&G.grid[i].name){const q=tc(i);floatTxt(q.x,q.y-14,`${G.grid[i].name} rejoint l’abri`,'#f2b33d')}
 const p=D.instant&&!D.onUnit?CEN:tc(i);addFX({type:'ring',x:p.x,y:p.y,r:34,c:'#f2b33d',dur:350});SFX.play('place');
 const St=Z.stat(G,t);
 if(t==='food')floatTxt(CEN.x,CEN.y,`+${St.gain} PV`,'#9fd86b');
 if(t==='rep')G.grid.forEach((u,j)=>{if(u&&Z.U[u.t].block){const q=tc(j);floatTxt(q.x,q.y,`+${St.gain}`,'#9fd86b')}});
 if(t==='kit')floatTxt(p.x,p.y,'Soigné','#9fd86b');
 if(t==='coffee')floatTxt(CEN.x,CEN.y,'+2 énergie','#f2b33d');
 if(t==='flare')floatTxt(CEN.x,CEN.y,'Fusée !','#ff8a5a');
 save();render();
 if(D.peek)peekScreen();
}
function peekScreen(){
 if(S.draw.length<3){S.draw=shuffle(S.discard).concat(S.draw);S.discard=[]}
 const top=S.draw.slice(-3).reverse();if(!top.length)return;
 show(`<h2 class="pw">Carte routière</h2><p>Les prochaines cartes de ta pioche. Prends-en une dans ta main.</p>
  <div class="picks">${top.map(t=>pickBtn(t,'peek',t)).join('')}</div>`);
}

async function night(){
 if(S.busy)return;S.busy=true;S.sel=null;
 S.moveFrom=null;S.inspect=null;save();
 const scrap0=G.scrap,kills0=G.kills;
 tuto(2);nightTarget=1;Z.startNight(G,R);render();await wait(900);
 let r;
 do{const types=G.grid.map(u=>u&&u.t);
  r=Z.step(G);syncBoard();const now=performance.now();
  syncZ(now);playEvents(r.ev,types,now);render();
  const lostEv=r.ev.filter(e=>e.k==='lost');
  if(lostEv.length){const info=$('#info');info.className='info warn';const ppl=lostEv.filter(e=>e.name),obj=lostEv.filter(e=>!e.name);
   info.innerHTML=[ppl.length?`✝ ${ppl.map(e=>`<b>${e.name}</b> (${Z.U[e.t].n})`).join(', ')} ${ppl.length>1?'sont tombés':'est tombé'}.`:'',obj.length?`${obj.map(e=>Z.U[e.t].n).join(', ')} détruit${obj.length>1?'s':''} !`:''].join(' ')}
  await wait(tickMs());
 }while(!r.done);
 await wait(700);
 const dawnInfo=Z.endNight(G);syncBoard();nightTarget=0;S.busy=false;render();await wait(900);
 if(G.shelter<=0)return end();
 const mut=Z.mutNight(G.night)?Z.mutate(G,R):null;
 const hero=G.grid.filter(u=>u&&u.name&&u.nk>0).sort((a,b)=>b.nk-a.nk)[0];
 const fallen=(G.fallen||[]).filter(f=>f.night===G.night);
 let rewardCard=null;if(dawnInfo.card){const pool=G.pool.filter(t=>Z.RAR[t]===dawnInfo.card);if(pool.length){rewardCard=pool[Math.floor(R()*pool.length)];S.discard.push(rewardCard)}}
 S.dawn={kills:G.kills-kills0,scrap:G.scrap-scrap0,heal:dawnInfo.heal,mut,rewardCard,relicReward:dawnInfo.relic,tier:dawnInfo.tier,hero:hero?{name:hero.name,t:hero.t,nk:hero.nk}:null,fallen};save();render();
 dawn();
}

/* ---------- l'aube : relique, carte pour demain, boutique ---------- */
const pickBtn=(t,a,v)=>`<button type="button" class="pick r-${rar(t)}${G.upg[t]?' up':''}" data-a="${a}" data-v="${v}" style="--cc:${cc(t)}"><span class="cost">${Z.costOf(G,t)}</span>${rarTag(t)}${svg(t)}<span class="nm">${cardName(t)}</span><span class="d">${Z.U[t].d}${famLine(t)}</span></button>`;
function dawn(){
 const d=S.dawn;if(d&&!d.chimed){d.chimed=1;SFX.play('dawn')}
 if(d&&d.mut&&!d.mutShown){d.mutShown=1;SFX.play('mutate');
  return show(`<h2 class="ko">La horde mute</h2>${dawnTxt()}<div class="relics"><div class="relic mutx">${svg('mut')}<span><b>${Z.MUTS[d.mut].n}</b>${Z.MUTS[d.mut].d}</span></div></div><p>C’est permanent. La prochaine mutation arrivera dans 4 nuits.</p><button type="button" class="go" data-a="dawn">Continuer</button>`)}
 if(Z.relicNight(G.night)||(d&&d.relicReward&&!d.relicDone)){if(d)d.relicDone=1;const r=Z.relicChoices(G,R);if(r.length)return dawnStep('relic',r)}
 afterRelic();
}
// un événement de l'aube (environ 1 aube sur 2), puis le choix de la carte
function afterRelic(){const ev=Z.dawnEvent(G,R);if(ev)return dawnStep('event',[ev]);dawnStep('draft')}
function dawnStep(ph,picks){
 S.phase=ph;
 if(ph==='relic'){S.picks=picks;save();
  return show(`<h2 class="ok">Nuit ${G.night} survécue</h2>${dawnTxt()}<p>Dans les décombres, tu trouves un objet rare. Choisis une <b>relique</b> : elle reste active toute la partie.</p>
   <div class="relics">${picks.map(r=>`<button type="button" class="relic" data-a="relic" data-v="${r}">${svg('relic')}<span><b>${Z.RELICS[r].n}</b>${Z.RELICS[r].d}</span></button>`).join('')}</div>`)}
 if(ph==='event'){S.picks=picks;save();const E=Z.DAWN[picks[0]];
  return show(`<h2 class="pw">${E.n}</h2>${dawnTxt()}<p>${E.d}</p><div class="relics">${E.ch.map((c,k)=>`<button type="button" class="relic evc" data-a="evc" data-v="${k}" ${c.ok&&!c.ok(G)?'disabled':''}><span><b>${c.n}</b>${c.d}</span></button>`).join('')}</div>`)}
 if(ph==='draft'){S.picks=picks||Z.draftChoices(R,3,G.pool);save();
  return show(`<h2 class="ok">Nuit ${G.night} survécue</h2>${dawnTxt()}<p>Choisis la carte que tu auras <b>en main demain</b>. Elle rejoint ensuite ton deck.</p>
   ${TUTO===3?(tuto(3),`<p class="tipin">💡 À chaque aube, tu choisis une carte : elle arrive dans ta main dès demain. Ensuite viendra le troc, où tu dépenses ta ferraille.</p>`):''}
   <div class="picks">${S.picks.map(t=>pickBtn(t,'draft',t)).join('')}</div>
   <button type="button" class="skip" data-a="draft" data-v="">Ne rien prendre</button>`)}
 if(ph==='night')return nightScreen(picks);
 if(ph==='buy'){S.picks=picks||Z.draftChoices(R,2,G.pool);save();
  return show(`<h2 class="pw">Acheter une carte</h2><p>Elle rejoint ton deck.</p><div class="picks two">${S.picks.map(t=>pickBtn(t,'bought',t)).join('')}</div>
   <button type="button" class="skip" data-a="shop">Ne rien prendre</button>`)}
 S.picks=null;save();shopScreen();
}
function dawnTxt(){const d=S.dawn;if(!d||d.txtShown)return '';d.txtShown=1;return (d.rewardCard?`<p>Butin de la ${(Z.TIERS[d.tier]||Z.TIERS.base).n.toLowerCase()} : <b>${Z.U[d.rewardCard].n}</b> rejoint ton deck.</p>`:'')+`<p>L’abri tient avec <b>${G.shelter}/${Z.maxS(G)} PV</b>. Cette nuit : <b>${plural(d.kills,'zombie éliminé','zombies éliminés')}</b>, <b>+${d.scrap} ferraille</b>${d.heal?`, <b>+${d.heal} PV</b> à l’aube`:''}.</p>`
 +(d.hero?`<p>Héros de la nuit : <b>${d.hero.name}</b> (${Z.U[d.hero.t].n}), ${plural(d.hero.nk,'zombie','zombies')}.</p>`:'')
 +(d.fallen&&d.fallen.length?`<p class="rip">✝ Tombés cette nuit : ${d.fallen.map(f=>`<b>${f.name}</b> (${Z.U[f.t].n}, ${plural(f.kills,'zombie','zombies')})`).join(', ')}.</p>`:'')}
function shopScreen(){
 S.phase='shop';S.picks=null;save();
 const row=(k,ex)=>{const o=Z.SHOP[k],c=Z.shopCost(G,k),ok=G.scrap>=c&&!ex;return `<button type="button" class="shopi" data-a="shop-${k}" ${ok?'':'disabled'}><span><b>${o.n}</b>${o.d}</span><span class="cost">${svg('scrap')}${c}</span></button>`};
 const upg=deckTypes().filter(t=>Z.UPGRADABLE.includes(t)&&!G.upg[t]);
 show(`<h2 class="pw">Le troc de l’aube</h2><p>Tu as <b>${G.scrap} ferraille</b>. Un zombie éliminé rapporte 1 ferraille, le Colosse 15. Économise pour ce qui compte.</p>
  <div class="shop">${row('heal',G.shelter>=Z.maxS(G))}${row('buy')}${row('upgrade',!upg.length)}${row('remove',deckList().length<=5)}</div>
  <button type="button" class="go" data-a="nightpick">Continuer</button>`);
}
const deckTypes=()=>[...new Set(deckList())];
const pileTypes=()=>[...new Set(pileList())];
function listScreen(title,txt,types,a){show(`<h2 class="pw">${title}</h2><p>${txt}</p><div class="deck pickable">${types.map(t=>`<button type="button" class="dk" data-a="${a}" data-v="${t}" style="--cc:${cc(t)}">${svg(t)}<span><b>${cardName(t)}${a==='up-pick'?` → ${Z.upgDesc(t)}`:''}</b>${Z.U[t].d}</span></button>`).join('')}</div><button type="button" class="skip" data-a="shop">Retour</button>`)}
function removeCard(t){for(const pile of[S.discard,S.draw,S.hand]){const k=pile.indexOf(t);if(k>=0){pile.splice(k,1);return true}}return false}
// choisir la nuit suivante : une prudente, une risquée qui rapporte
function nightScreen(offers){S.phase='night';S.picks=offers||Z.nightOffers(G,R);save();
 const ev=id=>Z.EVENTS.find(e=>e.id===id)||Z.EVENTS[0];
 show(`<h2 class="pw">Quelle nuit affronter ?</h2><p>Les éclaireurs ont repéré deux possibilités pour la nuit ${G.night+1}.</p>
  <div class="relics">${S.picks.map((o,k)=>{const T=Z.TIERS[o.tier],E=ev(o.event);return `<button type="button" class="relic nightc ${T.safe?'safe':'risk'}" data-a="nightgo" data-v="${k}"><span><b>${T.n}</b>${T.d}<em>Événement : ${E.n}${E.id!=='calme'?' ('+E.d+')':''}</em></span></button>`}).join('')}</div>`)}
function nextDay(offer){
 Z.newDay(G,R,offer);S.moveFrom=null;S.busy=false;S.phase=null;S.picks=null;S.dawn=null;V.clear();
 fillHand();save();hide();render();
}
function end(){
 SFX.play('death');
 clearSave();const nights=G.night-1;
 const before=Z.unlocks(META),newRec=nights>META.best&&nights>0;
 let pts=0;if(!G.daily){pts=Z.runPoints(nights,G.kills);META.points=(META.points||0)+pts;META.best=Math.max(META.best,nights);META.total+=nights;META.runs++;saveMeta(META)}
 const best=META.best,after=Z.unlocks(META);
 const fresh=[...after.chars.filter(k=>!before.chars.includes(k)).map(k=>'Personnage : '+Z.CHARS[k].n),...after.places.filter(k=>!before.places.includes(k)).map(k=>'Lieu : '+Z.PLACES[k].n),];
 const dailyTxt=G.daily?dailyEnd(nights):'';
 show(`<h2 class="ko">L’abri est tombé</h2><p>La horde est entrée pendant la nuit <b>${G.night}</b>.</p><div class="big">${plural(nights,'nuit survécue','nuits survécues')}</div><p><b>${G.kills}</b> zombies éliminés. Record : <b>${plural(best,'nuit','nuits')}</b>${newRec?' (nouveau record !)':''}.</p>${dailyTxt}${pts?`<p>+<b>${pts}</b> points de survie (total : ${META.points}). Débloque de nouvelles cartes dans la <b>Collection</b>.</p>`:''}${fresh.length?`<h3>Débloqué !</h3><ul>${fresh.map(f=>`<li><b>${f}</b></li>`).join('')}</ul>`:''}<h3>Mémorial</h3>${memorialHtml()}<button type="button" class="go" data-a="new">Rejouer</button><button type="button" class="skip" data-a="coll">Collection</button>`);
}
const CATN={wall:'Défenses',shoot:'Tireurs',melee:'Corps à corps',help:'Soutien',trap:'Pièges',item:'Objets'};
const deckHtml=()=>Object.keys(CATN).map(c=>`<h3>${CATN[c]}</h3><div class="deck">${Z.KEYS.filter(t=>Z.U[t].cat===c).map(t=>`<div class="dk" style="--cc:${cc(t)}">${svg(t)}<span><b>${Z.U[t].n}</b>${rarTag(t)}<em class="ce">${Z.cost(t)} énergie</em> · ${Z.U[t].d}${famLine(t)}</span></div>`).join('')}</div>`).join('');
const zedHtml=()=>`<div class="deck">${Object.entries(Z.ZT).map(([k,z])=>`<div class="dk" style="--cc:var(--z-${k})"><svg class="ic" viewBox="0 0 24 24"><circle class="f" cx="12" cy="12" r="7"/></svg><span><b>${z.n}</b>${z.hp} PV, ${z.dmg} dégât${z.dmg>1?'s':''} par coup, ${z.info}</span></div>`).join('')}</div>`;
const memorialHtml=()=>(G.fallen||[]).length?`<div class="deck">${G.fallen.map(f=>`<div class="dk" style="--cc:var(--muted)">${svg(f.t)}<span><b>✝ ${f.name}</b>${Z.U[f.t].n} · ${Z.TRAITS[f.trait]?Z.TRAITS[f.trait].n+' · ':''}${plural(f.kills,'zombie','zombies')} · tombé la nuit ${f.night}</span></div>`).join('')}</div>`:`<p>${G.shelter>0?'Personne n’est tombé. Pour l’instant.':'Aucun survivant n’est tombé au combat.'}</p>`;
function runInfo(){
 const counts={};deckList().forEach(t=>counts[t]=(counts[t]||0)+1);
 show(`<h2 class="pw">${Z.CHARS[G.char].n}</h2><p><b>${G.kills}</b> zombies éliminés · <b>${G.scrap}</b> ferraille</p>
  <h3>Reliques</h3>${G.relics.length?`<div class="deck">${G.relics.map(r=>`<div class="dk" style="--cc:var(--lantern)">${svg('relic')}<span><b>${Z.RELICS[r].n}</b>${Z.RELICS[r].d}</span></div>`).join('')}</div>`:'<p>Aucune pour l’instant. Tu en trouves une toutes les 5 nuits.</p>'}
  <h3>Mutations de la horde</h3>${G.muts.length?`<div class="deck">${G.muts.map(m=>`<div class="dk" style="--cc:var(--blood)">${svg('mut')}<span><b>${Z.MUTS[m].n}</b>${Z.MUTS[m].d}</span></div>`).join('')}</div>`:'<p>Aucune pour l’instant. La horde mute toutes les 4 nuits.</p>'}
  <h3>Factions</h3><div class="deck">${Object.keys(Z.FAM).map(f=>{const F=Z.FAM[f],c=Z.famCounts(G)[f]||0,l=Z.famLevels(G)[f];return `<div class="dk" style="--cc:${l?'var(--lantern)':'var(--muted)'}"><span style="font-size:20px">${F.ic}</span><span><b>${F.n} : ${c}</b>${l?'Actif : '+F.d.slice(0,l).join(' ; '):`Encore ${F.lv[0]-c} pour : ${F.d[0]}`}</span></div>`}).join('')}</div>
  <h3>Tes survivants</h3>${G.grid.some(u=>u&&u.name)?`<div class="deck">${G.grid.filter(u=>u&&u.name).map(u=>`<div class="dk" style="--cc:${cc(u.t)}">${svg(u.t)}<span><b>${u.name}</b>${cardName(u.t)} · ${Z.TRAITS[u.trait].n} (${Z.TRAITS[u.trait].d}) · ${plural(u.kills||0,'zombie','zombies')} · ${u.hp}/${Z.maxHp(G,u)} PV</span></div>`).join('')}</div>`:'<p>Aucun survivant posé.</p>'}
  <h3>Mémorial</h3>${memorialHtml()}
  <h3>Ton deck (${deckList().length} cartes)</h3><div class="deck">${Object.entries(counts).map(([t,n])=>`<div class="dk" style="--cc:${cc(t)}">${svg(t)}<span><b>${n>1?n+' × ':''}${cardName(t)}</b>${Z.U[t].d}${G.upg[t]?` (amélioré : ${Z.upgDesc(t)})`:''}</span></div>`).join('')}</div>
  <button type="button" class="go" data-a="close">Fermer</button>`);
}
function charScreen(){
 const ok=Z.unlocks(META).chars;
 show(`<h2 class="pw">Choisis ton survivant</h2><p>Chacun commence avec son propre deck de 8 cartes. Total de nuits survécues : <b>${META.total}</b>.</p>
  <div class="chars">${Object.entries(Z.CHARS).map(([k,c])=>ok.includes(k)?`<button type="button" class="char" data-a="char" data-v="${k}"><b>${c.n}</b><span>${c.d}</span><span class="mini">${c.deck.map(t=>`<i style="color:${cc(t)}">${svg(t)}</i>`).join('')}</span></button>`
   :`<button type="button" class="char" disabled><b>🔒 ${c.n}</b><span>Se débloque à ${Z.UNLOCK.chars[k]} nuits survécues au total.</span></button>`).join('')}</div>
  <button type="button" class="skip" data-a="title">Retour</button>`);
}
let pendingChar='surv';
function placeScreen(){
 const ok=Z.unlocks(META).places;if(ok.length===1){newGame(pendingChar,'bois');save();hide();render();return}
 show(`<h2 class="pw">Choisis ton lieu</h2><p>Ton record : <b>${plural(META.best,'nuit','nuits')}</b>.</p>
  <div class="chars">${Object.entries(Z.PLACES).map(([k,p])=>ok.includes(k)?`<button type="button" class="char" data-a="place" data-v="${k}"><b>${p.n}</b><span>${p.d}</span></button>`
   :`<button type="button" class="char" disabled><b>🔒 ${p.n}</b><span>Se débloque avec un record de ${Z.UNLOCK.places[k]} nuits.</span></button>`).join('')}</div>
  <button type="button" class="skip" data-a="new">Retour</button>`);
}
const ov=$('#ov'),panel=$('#panel');
function show(h,keep){const y=panel.scrollTop;panel.innerHTML=h;ov.hidden=false;panel.scrollTop=keep?y:0}
function hide(){ov.hidden=true}
/* ---------- collection, decks et préparation de la partie ---------- */
function ensureMeta(){if(!META.cards||!META.cards.length)META.cards=Z.STARTER_CARDS.slice();if(META.points==null)META.points=(META.total||0)*5;
 if(!META.decks)META.decks=[0,1,2].map(()=>Z.STARTER_DECK.slice());if(META.slot==null)META.slot=0;saveMeta(META)}
ensureMeta();
const PREP={ch:'surv',pl:'bois'};
const deckCount=d=>{const c={};d.forEach(t=>c[t]=(c[t]||0)+1);return c};
function prepScreen(){const u=Z.unlocks(META);if(!u.chars.includes(PREP.ch))PREP.ch='surv';if(!u.places.includes(PREP.pl))PREP.pl='bois';
 const d=META.decks[META.slot],err=Z.deckError(d,META.cards),fc={};d.forEach(t=>{const f=Z.famOf(t);if(f)fc[f]=(fc[f]||0)+1});
 show(`<h2 class="pw">Préparer la partie</h2>
  <h3>Ton deck</h3><div class="tabs">${META.decks.map((x,k)=>`<button type="button" class="tab${k===META.slot?' on':''}" data-a="prepdeck" data-v="${k}">Deck ${k+1}<small>${x.length} cartes</small></button>`).join('')}</div>
  <p>${err?`<span class="bad">${err}</span>`:`<b>${d.length}</b> cartes · ${Object.entries(fc).sort((a,b)=>b[1]-a[1]).map(([f,n])=>`${Z.FAM[f].ic} ${n}`).join(' ')||'aucune faction'}`}</p>
  <button type="button" class="skip" data-a="edit">Modifier le deck ${META.slot+1}</button>
  <h3>Ton survivant</h3><div class="tabs wrap">${Object.keys(Z.CHARS).map(k=>u.chars.includes(k)?`<button type="button" class="tab${k===PREP.ch?' on':''}" data-a="prepch" data-v="${k}">${Z.CHARS[k].n}</button>`:`<button type="button" class="tab" disabled>🔒 ${Z.CHARS[k].n}</button>`).join('')}</div>
  <p>${Z.CHARS[PREP.ch].d}</p>
  <h3>Ton lieu</h3><div class="tabs wrap">${Object.keys(Z.PLACES).map(k=>u.places.includes(k)?`<button type="button" class="tab${k===PREP.pl?' on':''}" data-a="preppl" data-v="${k}">${Z.PLACES[k].n}</button>`:`<button type="button" class="tab" disabled>🔒 ${Z.PLACES[k].n}</button>`).join('')}</div>
  <p>${Z.PLACES[PREP.pl].d}</p>
  <button type="button" class="go" data-a="start" ${err?'disabled':''}>Commencer</button>
  <button type="button" class="skip" data-a="coll">Collection (${META.points} points)</button><button type="button" class="skip" data-a="title">Retour</button>`)}
function deckEditor(keep){const d=META.decks[META.slot],cnt=deckCount(d),err=Z.deckError(d,META.cards);
 show(`<h2 class="pw">Deck ${META.slot+1}</h2><p><b>${d.length}</b> / ${Z.DECK_MAX} cartes (minimum ${Z.DECK_MIN}). ${err?`<span class="bad">${err}</span>`:'✓ Prêt.'} Commune ×3, rare ×2, épique ×1 au maximum.</p>
  ${Object.keys(CATN).map(c=>{const ts=META.cards.filter(t=>Z.U[t].cat===c);if(!ts.length)return'';return `<h3>${CATN[c]}</h3><div class="deck">${ts.map(t=>`<div class="dk ed${cnt[t]?' in':''}" style="--cc:${cc(t)}">${svg(t)}<span><b>${Z.U[t].n}</b>${rarTag(t)}<em class="ce">${Z.cost(t)} énergie</em>${famLine(t)}<br>${Z.U[t].d}</span><span class="qty"><button type="button" data-a="dkm" data-v="${t}" ${cnt[t]?'':'disabled'}>−</button><b>${cnt[t]||0}/${Z.copyMax(t)}</b><button type="button" data-a="dkp" data-v="${t}" ${(cnt[t]||0)>=Z.copyMax(t)||d.length>=Z.DECK_MAX?'disabled':''}>+</button></span></div>`).join('')}</div>`}).join('')}
  <button type="button" class="go" data-a="new">Terminé</button><button type="button" class="skip" data-a="dkreset">Remettre le deck de départ</button><button type="button" class="skip" data-a="coll">Collection</button>`,keep)}
function collectionScreen(keep){const own=META.cards;
 show(`<h2 class="pw">Collection</h2><p>Tu as <b>${META.points}</b> points de survie. Chaque partie en rapporte : 10 par nuit survécue, plus 1 tous les 4 zombies. Une carte débloquée l’est pour toujours.</p>
  ${Object.keys(CATN).map(c=>`<h3>${CATN[c]}</h3><div class="deck">${Z.KEYS.filter(t=>Z.U[t].cat===c).map(t=>{const has=own.includes(t),pr=Z.CARD_PRICE[Z.RAR[t]||'com'];return `<div class="dk ed${has?' in':' locked'}" style="--cc:${cc(t)}">${svg(t)}<span><b>${Z.U[t].n}</b>${rarTag(t)}<em class="ce">${Z.cost(t)} énergie</em>${famLine(t)}<br>${Z.U[t].d}</span><span class="qty">${has?'<b>✓</b>':`<button type="button" class="buy" data-a="unlock" data-v="${t}" ${META.points>=pr?'':'disabled'}>${pr} pts</button>`}</span></div>`}).join('')}</div>`).join('')}
  <button type="button" class="go" data-a="new">Préparer une partie</button><button type="button" class="skip" data-a="title">Accueil</button>`,keep)}
const ACT={
 new:()=>prepScreen(),
 prepdeck:v=>{META.slot=+v;saveMeta(META);prepScreen()},
 prepch:v=>{PREP.ch=v;prepScreen()},
 preppl:v=>{PREP.pl=v;prepScreen()},
 start:()=>{const d=META.decks[META.slot];if(Z.deckError(d,META.cards))return;newGame(PREP.ch,PREP.pl,null,d);save();hide();render()},
 edit:()=>deckEditor(),
 dkp:v=>{const d=META.decks[META.slot];if(d.length<Z.DECK_MAX&&(deckCount(d)[v]||0)<Z.copyMax(v)&&META.cards.includes(v)){d.push(v);saveMeta(META)}deckEditor(1)},
 dkm:v=>{const d=META.decks[META.slot],k=d.indexOf(v);if(k>=0){d.splice(k,1);saveMeta(META)}deckEditor(1)},
 dkreset:()=>{META.decks[META.slot]=Z.STARTER_DECK.slice();saveMeta(META);deckEditor()},
 coll:()=>collectionScreen(),
 unlock:v=>{const pr=Z.CARD_PRICE[Z.RAR[v]||'com'];if(!META.cards.includes(v)&&META.points>=pr){META.points-=pr;META.cards.push(v);saveMeta(META);SFX.play('dawn')}collectionScreen(1)},
 char:v=>{pendingChar=v;placeScreen()},
 place:v=>{newGame(pendingChar,v);save();hide();render()},
 load:()=>{const d=loadSave();if(d)resume(d);else prepScreen()},
 title:()=>title(),
 close:()=>hide(),
 deck:()=>show(`<h2 class="pw">Les cartes</h2><p>Tu prépares ton deck (20 à 30 cartes) avec les cartes de ta collection. Pendant la partie, des renforts s’ajoutent à l’aube et au troc. Les cartes rares et épiques sortent rarement.</p>${deckHtml()}<h2 class="pw">Les factions</h2><p>Plus tu as d’unités d’une même faction sur la carte, plus elles sont fortes. Le Chef d’une faction (carte légendaire) lui fait gagner un palier tant qu’il est en vie.</p><div class="deck">${Object.values(Z.FAM).map(f=>`<div class="dk" style="--cc:var(--lantern)"><span style="font-size:20px">${f.ic}</span><span><b>${f.n}</b>${f.lv[0]} unités : ${f.d[0]}. ${f.lv[1]} unités : ${f.d[1]}.</span></div>`).join('')}</div><h2 class="pw">La horde</h2><p>Chaque nuit, ils sont plus nombreux et plus résistants. Le Colosse attaque toutes les 10 nuits.</p>${zedHtml()}<h2 class="pw">Les mutations</h2><p>Toutes les 4 nuits, la horde gagne une de ces mutations, pour toute la partie.</p><div class="deck">${Object.values(Z.MUTS).map(m=>`<div class="dk" style="--cc:var(--blood)">${svg('mut')}<span><b>${m.n}</b>${m.d}</span></div>`).join('')}</div><button type="button" class="go" data-a="title">Retour</button>`),
 dawn:()=>dawn(),
 relic:v=>{Z.addRelic(G,v);afterRelic()},
 evc:v=>{const id=S.picks&&S.picks[0];if(!id)return dawnStep('draft');const r=Z.resolveDawn(G,id,+v,R,deckList());
  (r.cards||[]).forEach(t=>S.discard.push(t));syncBoard();S.phase='draft';S.picks=null;save();render();SFX.play('ui');
  show(`<h2 class="pw">${Z.DAWN[id].n}</h2><p>${r.txt}</p>${r.cards&&r.cards.length?`<p>Ajouté à ton deck : <b>${r.cards.map(t=>Z.U[t].n).join(', ')}</b>.</p>`:''}<button type="button" class="go" data-a="todraft">Continuer</button>`)},
 todraft:()=>dawnStep('draft'),
 draft:v=>{S.next=v||null;dawnStep('shop')},
 shop:()=>shopScreen(),
 'shop-heal':()=>{if(Z.pay(G,'heal'))render();shopScreen()},
 'shop-buy':()=>{if(Z.pay(G,'buy')){render();dawnStep('buy')}},
 'shop-upgrade':()=>listScreen('Améliorer une carte','Toutes les cartes de ce type seront améliorées, y compris celles déjà posées.',deckTypes().filter(t=>Z.UPGRADABLE.includes(t)&&!G.upg[t]),'up-pick'),
 'shop-remove':()=>listScreen('Jeter une carte','Une carte de ce type quitte ton deck pour cette partie (les unités posées ne comptent pas).',pileTypes(),'rm-pick'),
 bought:v=>{S.discard.push(v);shopScreen()},
 'up-pick':v=>{if(Z.pay(G,'upgrade'))Z.upgrade(G,v);render();shopScreen()},
 'rm-pick':v=>{if(pileList().includes(v)&&Z.pay(G,'remove'))removeCard(v);shopScreen()},
 day:()=>nextDay(),
 nightpick:()=>Z.nightChoice(G,R)?nightScreen():nextDay(),
 nightgo:v=>{const o=S.picks&&S.picks[+v];nextDay(o)},
 daily:()=>dailyScreen(),
 'daily-go':()=>{const day=today(),c=dailySetup(day),r=rng(seedFrom('deck-'+day)),d=[],ks=Z.KEYS.slice();while(d.length<24){const t=ks[Math.floor(r()*ks.length)];if(d.filter(x=>x===t).length<Z.copyMax(t))d.push(t)}newGame(c.ch,c.pl,day,d);save();hide();render()},
 peek:v=>{const k=S.draw.lastIndexOf(v);if(k>=0){S.draw.splice(k,1);S.hand.push(v)}save();hide();render()}
};
panel.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const f=ACT[b.dataset.a];if(f)f(b.dataset.v)});
$('#go').addEventListener('click',()=>{if(S.busy){SPEED=SPEED===1?2:1;render()}else night()});

function nextUnlockTxt(){const u=Z.unlocks(META),nx=[];
 for(const k in Z.UNLOCK.chars)if(!u.chars.includes(k))nx.push([Z.UNLOCK.chars[k]-META.total,`${Z.CHARS[k].n} dans ${Z.UNLOCK.chars[k]-META.total} nuits au total`]);
 for(const k in Z.UNLOCK.cards)if(!u.pool.includes(k))nx.push([Z.UNLOCK.cards[k]-META.total,`la carte ${Z.U[k].n} dans ${Z.UNLOCK.cards[k]-META.total} nuits au total`]);
 for(const k in Z.UNLOCK.places)if(!u.places.includes(k))nx.push([99,`${Z.PLACES[k].n} avec un record de ${Z.UNLOCK.places[k]} nuits`]);
 nx.sort((a,b)=>a[0]-b[0]);return nx.length?`<p>Prochain déblocage : ${nx[0][1]}.</p>`:''}
/* ---------- défi quotidien : même graine, même personnage et même lieu pour tout le monde ce jour-là ---------- */
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function dailySetup(day){const r=seedFrom('cfg-'+day),ch=Object.keys(Z.CHARS),pl=Object.keys(Z.PLACES);return{ch:ch[r%ch.length],pl:pl[Math.floor(r/7)%pl.length]}}
function dailyBest(day){try{const d=JSON.parse(localStorage.getItem('abri-daily'))||{};return d[day]??null}catch(e){return null}}
function dailyEnd(n){let prev=null;try{const d=JSON.parse(localStorage.getItem('abri-daily'))||{};prev=d[G.daily]??null;if(prev===null||n>prev){d[G.daily]=n;localStorage.setItem('abri-daily',JSON.stringify(d))}}catch(e){}
 return `<p>Défi du jour : <b>${plural(n,'nuit','nuits')}</b>${prev!==null?` (ton meilleur aujourd’hui : ${plural(Math.max(prev,n),'nuit','nuits')})`:''}. Compare ton score avec tes amis : tout le monde a la même partie aujourd’hui.</p>`}
function dailyScreen(){const day=today(),c=dailySetup(day),b=dailyBest(day);
 show(`<h2 class="pw">Défi du jour</h2><p>Aujourd’hui, tout le monde joue <b>la même partie</b> : même personnage, même lieu, mêmes cartes et mêmes nuits. Tu peux le rejouer autant que tu veux.</p>
  <ul><li>Personnage : <b>${Z.CHARS[c.ch].n}</b></li><li>Lieu : <b>${Z.PLACES[c.pl].n}</b></li><li>Toutes les cartes sont disponibles.</li></ul>
  ${b!==null?`<p>Ton meilleur score aujourd’hui : <b>${plural(b,'nuit','nuits')}</b>.</p>`:''}<p>Les défis ne comptent pas pour les déblocages.</p>
  <button type="button" class="go" data-a="daily-go">Jouer le défi</button><button type="button" class="skip" data-a="title">Retour</button>`)}
function title(){show(`<h2 class="pw">Dernier Abri</h2><p>Pas de secours. Pas de fin. Survis <b>une nuit de plus</b>, encore et encore : chaque nuit, la horde est plus nombreuse et plus coriace.</p>
<ul><li>Le jour, dépense tes <b>4 énergies</b> en cartes (chaque carte coûte 0 à 3) : défenses, survivants armés, pièges ou objets. Les cartes non jouées restent en main.</li>
<li>Chaque survivant a un <b>prénom</b> et un trait. S’il tombe, il est perdu pour de bon.</li>
<li>Une fois par jour, tu peux <b>déplacer</b> une de tes unités : touche-la, puis touche une case libre.</li>
<li>Garde de l’énergie pour la nuit : les cartes <b>Réaction</b> (grenade, tir de l’abri…) se jouent pendant l’attaque.</li>
<li>Regroupe les unités d’une même <b>faction</b> (👮 🎖️ ⛑️ 🔥 🪤 🐕 ⚡ 🏠) pour les renforcer ; leur <b>Chef</b> légendaire les renforce encore, et, certains soirs, choisis ta <b>nuit</b> : prudente ou risquée.</li>
<li>La nuit, les zombies sortent des <b>bois</b> et marchent vers la maison. Tes survivants se défendent tout seuls.</li>
<li>À l’aube, choisis la carte que tu auras <b>en main le lendemain</b>, puis échange ta <b>ferraille</b> au troc.</li>
<li>Toutes les 4 nuits, la horde <b>mute</b> pour de bon. Toutes les 5 nuits, trouve une <b>relique</b>. Toutes les 10 nuits, le <b>Colosse</b> arrive.</li></ul>
${META.best?`<p>Ton record : <b>${plural(META.best,'nuit survécue','nuits survécues')}</b> · total : <b>${META.total}</b> nuits sur ${plural(META.runs,'partie','parties')}.</p>`:''}${nextUnlockTxt()}
${(d=>d?`<button type="button" class="go" data-a="load">Continuer · ${d.s.phase?'Aube':'Jour'} ${d.g.night}</button><button type="button" class="skip" data-a="new">Nouvelle partie</button>`:'<button type="button" class="go" data-a="new">Jouer</button>')(loadSave())}
<button type="button" class="skip" data-a="coll">Collection et decks</button><button type="button" class="skip" data-a="daily">Défi du jour</button><button type="button" class="skip" data-a="deck">Voir les cartes et les zombies</button><p class="ver">${VERSION}</p>`)}
newGame();render();requestAnimationFrame(frame);title();

// bouton son
const muteBtn=$('#mute');
function muteIcon(){muteBtn.innerHTML=`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/>${SFX.muted?'<path d="M16 9l5 6M21 9l-5 6"/>':'<path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/>'}</svg>`;muteBtn.setAttribute('aria-label',SFX.muted?'Activer le son':'Couper le son')}
muteBtn.addEventListener('click',()=>{SFX.toggle();muteIcon()});muteIcon();
