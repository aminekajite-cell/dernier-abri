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
 relic:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
 scrap:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'
};
const svg=t=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[t]||ICON.relic}</svg>`;
const cc=t=>`var(--k-${Z.U[t].cat})`;
const TICK=430;let SPEED=1;const tickMs=()=>TICK/SPEED;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const $=s=>document.querySelector(s);
const shuffle=a=>Z.shuffle(a);
const plural=(n,s,p)=>n+' '+(n>1?p:s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ZN={walk:['rôdeur','rôdeurs'],run:['coureur','coureurs'],fat:['gonflé','gonflés'],zdog:['chien zombie','chiens zombies'],crawl:['rampant','rampants'],spit:['cracheur','cracheurs'],armor:['blindé','blindés'],howl:['hurleur','hurleurs'],boss:['Colosse','Colosses']};

/* ---------- state ---------- */
let S,G;
function newGame(ch){
 G=Z.newState(ch);
 S={draw:shuffle([...Z.CHARS[G.char].deck]),discard:[],hand:[],sel:null,placed:0,busy:false,next:null,phase:null,picks:null,dawn:null};
 V.clear();FX.length=0;PT.length=0;facing.fill(null);clearDecals();
 fillHand();
}
// la carte choisie à l'aube arrive d'office dans la main, le reste est pioché
function fillHand(){if(S.next){S.hand.push(S.next);S.next=null}drawCards(Z.drawCount(G)-S.hand.length)}
function drawCards(n){for(let k=0;k<n;k++){if(!S.draw.length){S.draw=shuffle(S.discard);S.discard=[]}if(!S.draw.length)break;S.hand.push(S.draw.pop())}}
const deckList=()=>[...S.draw,...S.discard,...S.hand];

/* ---------- sauvegarde (localStorage, marche aussi dans Electron/Tauri) ---------- */
const SAVE_KEY='abri-save',SAVE_V=2;
function save(){try{const g={...G,event:G.event.id,z:[],pending:[],tick:0};localStorage.setItem(SAVE_KEY,JSON.stringify({v:SAVE_V,g,s:{draw:S.draw,discard:S.discard,hand:S.hand,placed:S.placed,next:S.next,phase:S.phase,picks:S.picks}}))}catch(e){}}
function loadSave(){try{const d=JSON.parse(localStorage.getItem(SAVE_KEY));if(d&&d.v===SAVE_V&&d.g&&d.s)return d}catch(e){}return null}
function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}
function resume(d){
 newGame(d.g.char);
 Object.assign(G,d.g,{event:Z.EVENTS.find(e=>e.id===d.g.event)||Z.EVENTS[0]});Z.touch(G);
 Object.assign(S,d.s,{sel:null,busy:false});
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
 g.fillStyle='#3b4b2c';g.fillRect(0,0,L,L);
 for(let k=0;k<2600;k++){const x=r()*L,y=r()*L,s=1+r()*3;g.fillStyle=['#46583a','#34432a','#4d603c','#40422e','#525440'][Math.floor(r()*5)];g.globalAlpha=.55;g.fillRect(x,y,s,s)}
 g.globalAlpha=1;
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
  if(!v){const dx=c.x-CEN.x,dy=c.y-CEN.y,d=Math.hypot(dx,dy)||1;v={id:z.id,k:z.k,pos:z.pos,from:{x:to.x+dx/d*46,y:to.y+dy/d*46},to,t0:now,dur:Z.ZT[z.k].spd*tickMs(),hp:z.hp,max:z.max,born:now};V.set(z.id,v)}
  else if(v.pos!==z.pos){v.from=zpos(v,now);v.to=to;v.t0=now;v.dur=Z.ZT[z.k].spd*tickMs();v.pos=z.pos}
  v.hp=z.hp;v.burn=z.burnT>0}
 for(const v of V.values())if(!ids.has(v.id)&&!v.dying){v.dying=now;const p=zpos(v,now);v.dx=p.x;v.dy=p.y;if(!v.bit)splat(p.x,p.y,true)}
}

/* ---------- drawing helpers ---------- */
function ell(x,y,rx,ry,c){if(!(rx>0&&ry>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fill()}
function circ(x,y,r,c){if(!(r>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
function line(x1,y1,x2,y2,c,w){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function person(x,y,a,o,now){
 const br=Math.sin(now/600+x)*.6;ctx.save();ctx.translate(x,y);ell(2,4,12,9,'rgba(0,0,0,.35)');ctx.rotate(a);
 if(o.small)ctx.scale(.8,.8);
 if(o.tank){circ(-8,0,4.5,o.tank);circ(-8,-1,1.5,'rgba(255,255,255,.3)')}
 if(o.gun)line(2,4,2+o.gun,4,o.gc||'#151515',o.gw||3);
 if(o.xbow)line(2+o.gun-3,-3,2+o.gun-3,11,'#6b4a2a',2);
 if(o.bottle){line(4,5,12,6,'#3c7a3a',4);circ(13,6,1.6,(Math.floor(now/120)%2)?'#ffcf4a':'#ff7a2a')}
 if(o.axe){line(2,5,16,5,'#6b4a2a',2.5);ctx.fillStyle='#9aa0a6';ctx.fillRect(13,1,6,5)}
 ell(0,0,8+br*.2,11+br*.3,o.j);
 if(o.cross){ctx.fillStyle='#d23b3b';ctx.fillRect(-4,-1.2,6,2.4);ctx.fillRect(-2.2,-3,2.4,6)}
 circ(7,4,2.6,o.skin||'#d6a479');circ(5,-6,2.6,o.skin||'#d6a479');
 circ(1,0,5.6,o.skin||'#d6a479');ctx.fillStyle=o.hair||'#3a2a1c';ctx.beginPath();ctx.arc(.2,0,5.8,Math.PI*.55,Math.PI*1.45);ctx.fill();
 if(o.blood)circ(-2,3,2.2,'#a3252b');
 if(o.hat){circ(-1,0,5,'#f4f4f4');circ(-3,0,3.5,'#e2e2e2')}
 if(o.cap){ctx.fillStyle=o.cap;ctx.beginPath();ctx.arc(0,0,5.4,Math.PI*.5,Math.PI*1.5);ctx.fill();ctx.fillRect(3,-3,3,6)}
 ctx.restore()}
let BARS=[],EYES=[];
function hpBar(x,y,f,c){if(f>=1)return;BARS.push([x,y,f,c])}
function drawBars(){for(const[x,y,f,c]of BARS){ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(x-17,y,34,5);ctx.fillStyle=c;ctx.fillRect(x-17,y,34*clamp(f,0,1),5)}}
const CATC={wall:'#c9a27a',shoot:'#f2b33d',melee:'#ff7a59',help:'#7cc7ff',trap:'#e5484d',item:'#d6c2ff'};
function drawUnit(i,u,now){
 const p0=tc(i),D0=Z.stat(G,u.t);
 ctx.save();ctx.globalAlpha=D0.block?.22:.16;circ(p0.x,p0.y,25,CATC[D0.cat]);ctx.globalAlpha=1;ctx.strokeStyle=CATC[D0.cat];ctx.globalAlpha=.6;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p0.x,p0.y,25,0,7);ctx.stroke();ctx.restore();
 ctx.save();ctx.translate(p0.x,p0.y);ctx.scale(1.45,1.45);ctx.translate(-p0.x,-p0.y);
 drawUnitInner(i,u,now);ctx.restore();
 if(D0.up)safeTxt(p0.x+19,p0.y-17,'+','#f2b33d');
 if(D0.block)hpBar(p0.x,p0.y-31,u.hp/D0.hp,u.hp/D0.hp>.4?'#9fd86b':'#e5484d');
}
function drawUnitInner(i,u,now){
 const{x,y}=tc(i),D=Z.U[u.t],dx=x-CEN.x,dy=y-CEN.y,out=Math.atan2(dy,dx);const a=facing[i]??out,s=rng(i+3);
 switch(u.t){
  case 'bar':{ctx.save();ctx.translate(x,y);ell(2,5,24,10,'rgba(0,0,0,.3)');[[-.45,-6],[.4,4],[0,0]].forEach(([r,o])=>{ctx.save();ctx.rotate(r+out+Math.PI/2);ctx.fillStyle='#8a6a45';ctx.fillRect(-24,o-4.5,48,9);ctx.strokeStyle='#4d3a24';ctx.lineWidth=1.2;ctx.strokeRect(-24,o-4.5,48,9);circ(-18,o,1.2,'#c8c8c8');circ(18,o,1.2,'#c8c8c8');ctx.restore()});ctx.restore();break}
  case 'car':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2+(s()-.5)*.5);ell(3,5,28,17,'rgba(0,0,0,.35)');ctx.fillStyle='#111';[[-17,-15],[11,-15],[-17,11],[11,11]].forEach(([a,b])=>ctx.fillRect(a,b,7,4));
   ctx.fillStyle='#7b3a2a';ctx.beginPath();ctx.roundRect(-25,-13,50,26,7);ctx.fill();ctx.fillStyle='#5e2c20';ctx.beginPath();ctx.roundRect(-10,-11,22,22,4);ctx.fill();
   ctx.fillStyle='#253038';ctx.fillRect(12,-10,6,20);ctx.fillRect(-16,-10,4,20);ctx.fillStyle='rgba(160,90,40,.6)';circ(-18,6,3,'rgba(150,80,35,.7)');circ(5,-8,2.2,'rgba(150,80,35,.7)');ctx.restore();break}
  case 'fen':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-20,0,20].forEach(p=>{circ(p+1,2,4,'rgba(0,0,0,.35)');circ(p,0,3.5,'#777')});
   const on=powered();[-4,0,4].forEach(o=>line(-20,o,20,o,on?'#9fb6c8':'#666',1.2));
   if(on&&nightAmt>.3&&Math.random()<.04)PT.push({x:x+(Math.random()-.5)*40,y:y+(Math.random()-.5)*10,vx:0,vy:-.02,t0:now,dur:180,c:'#9fe8ff',r:2,light:18});ctx.restore();break}
  case 'gun':person(x,y,a,{j:'#55603c',gun:16},now);break;
  case 'snp':person(x,y,a,{j:'#2f3a2c',gun:25,gw:2.5,cap:'#26301f'},now);break;
  case 'axe':person(x,y,a+Math.sin(now/300)*.1,{j:'#8c2f2a',axe:1,hair:'#6b3b1e'},now);break;
  case 'sht':person(x,y,a,{j:'#6b4a2c',gun:13,gw:4.5},now);break;
  case 'med':person(x,y,a,{j:'#e8e4d8',cross:1,hair:'#1d1a17'},now);break;
  case 'dog':{ctx.save();ctx.translate(x,y);ell(2,4,13,7,'rgba(0,0,0,.3)');ctx.rotate(a);line(-11,0,-17,Math.sin(now/90)*4,'#5a3b22',3);ell(-2,0,11,6,'#7a5232');circ(9,0,5,'#7a5232');circ(13,0,2.4,'#5a3b22');ell(8,-4,2,3,'#4a2f1a');ell(8,4,2,3,'#4a2f1a');ctx.restore();break}
  case 'lamp':{ctx.save();ctx.translate(x,y);line(-8,8,0,0,'#555',2);line(8,8,0,0,'#555',2);line(0,-9,0,0,'#555',2);ctx.rotate(out);ctx.fillStyle='#bbb';ctx.fillRect(-6,-6,10,12);ctx.fillStyle=powered()?'#ffe9a8':'#555';ctx.fillRect(4,-5,3,10);ctx.restore();break}
  case 'radio':{ctx.save();ctx.translate(x,y);ell(2,4,13,8,'rgba(0,0,0,.3)');ctx.fillStyle='#3b4a3a';ctx.fillRect(-11,-7,22,14);ctx.strokeStyle='#222';ctx.strokeRect(-11,-7,22,14);circ(-4,0,4,'#222');line(6,-7,14,-18,'#999',1.5);if(Math.floor(now/500)%2)circ(7,-3,1.8,'#ff4040');ctx.restore();break}
  case 'trap':{ctx.save();ctx.translate(x,y);ctx.strokeStyle='#8b8f93';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.stroke();for(let k=0;k<10;k++){const t=k/10*Math.PI*2;line(Math.cos(t)*9,Math.sin(t)*9,Math.cos(t)*5,Math.sin(t)*5,'#b5b9bd',1.5)}circ(0,0,2.5,'#555');ctx.restore();break}
  case 'fire':{ell(x,y,22,15,'rgba(40,36,50,.75)');ell(x-5,y-3,8,4,'rgba(120,90,160,.25)');
   if(S.busy&&G.event.id!=='pluie'){for(let k=0;k<2;k++)PT.push({x:x+(Math.random()-.5)*34,y:y+(Math.random()-.5)*20,vx:(Math.random()-.5)*.01,vy:-.045,t0:now,dur:420,c:Math.random()<.5?'#ff9a2e':'#ffd25a',r:3+Math.random()*3,light:0})}break}
  case 'sand':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);ell(2,5,24,10,'rgba(0,0,0,.3)');[[-13,-4],[0,-4],[13,-4],[-6.5,5],[6.5,5]].forEach(([a,b])=>{ell(a,b,7.5,5,'#b59a6a');ctx.strokeStyle='#7d6844';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(a,b,7.5,5,0,0,7);ctx.stroke()});ctx.restore();break}
  case 'door':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);ell(2,5,26,10,'rgba(0,0,0,.35)');ctx.fillStyle='#5d666e';ctx.fillRect(-24,-7,48,14);ctx.strokeStyle='#2d3338';ctx.lineWidth=1.5;ctx.strokeRect(-24,-7,48,14);[-18,-6,6,18].forEach(p=>{circ(p,-3,1.3,'#9aa3ab');circ(p,3,1.3,'#9aa3ab')});ctx.restore();break}
  case 'tire':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-15,0,15].forEach(p=>{circ(p+1,2,9,'rgba(0,0,0,.3)');circ(p,0,9,'#1c1c1c');circ(p,0,4,'#3b4b2c');ctx.strokeStyle='#3a3a3a';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p,0,7,0,7);ctx.stroke()});ctx.restore();break}
  case 'wire':{ctx.save();ctx.translate(x,y);ctx.rotate(out+Math.PI/2);[-5,0,5].forEach(o=>{ctx.strokeStyle='#8d9196';ctx.lineWidth=1;ctx.beginPath();for(let k=-24;k<=24;k+=4)ctx.lineTo(k,o+((k/4)%2?1.5:-1.5));ctx.stroke()});[-24,24].forEach(p=>line(p,-8,p,8,'#5a4632',2.5));ctx.restore();break}
  case 'spike':{ell(x,y,20,14,'rgba(20,14,8,.8)');for(let k=0;k<u.hp+3;k++){const t=k/(u.hp+3)*7,px=x+Math.cos(t)*10,py=y+Math.sin(t)*6;line(px,py+3,px,py-6,'#a07a4a',2)}break}
  case 'gas':{ctx.save();ctx.translate(x,y);ell(2,4,9,7,'rgba(0,0,0,.35)');circ(0,0,8,'#b8332f');circ(-2,-2,3,'rgba(255,255,255,.25)');circ(0,0,2.5,'#777');ctx.restore();break}
  case 'smoke':{circ(x+1,y+2,6,'rgba(0,0,0,.3)');circ(x,y,6,'#4f6b3f');circ(x,y,2,'#ddd');break}
  case 'bait':{ell(x+1,y+2,11,7,'rgba(0,0,0,.3)');ell(x,y,11,7,'#a8323a');ell(x-2,y-1,6,3.5,'#d36a6f');circ(x+8,y+3,3,'#eee');break}
  case 'dyn':{ctx.save();ctx.translate(x,y);ell(1,3,11,8,'rgba(0,0,0,.3)');[-6,0,6].forEach(p=>{ctx.fillStyle='#c0392b';ctx.fillRect(p-2.5,-8,5,16)});ctx.fillStyle='#222';ctx.fillRect(-9,-2,18,3);line(0,-8,4,-14,'#ccc',1);if(Math.floor(now/200)%2)circ(4,-14,2,'#ffcf4a');ctx.restore();break}
  case 'siren':{ctx.save();ctx.translate(x,y);ell(2,4,12,8,'rgba(0,0,0,.3)');line(-7,8,0,0,'#555',2);line(7,8,0,0,'#555',2);ctx.fillStyle='#555';ctx.fillRect(-7,-7,14,10);circ(0,-3,4.5,Math.floor(now/300)%2?'#ff3b3b':'#7a1d1d');ctx.restore();break}
  case 'solar':{ctx.save();ctx.translate(x,y);ctx.rotate(out);ell(2,4,16,12,'rgba(0,0,0,.3)');ctx.fillStyle='#1e2f5a';ctx.fillRect(-14,-10,28,20);[-7,0,7].forEach(k=>line(k,-10,k,10,'#8aa0c8',.8));line(-14,0,14,0,'#8aa0c8',.8);ctx.restore();break}
  case 'xbow':person(x,y,a,{j:'#4a5a3a',gun:16,gw:2,gc:'#6b4a2a',xbow:1},now);break;
  case 'flame':person(x,y,a,{j:'#6b6b4a',gun:13,gw:4,gc:'#444',tank:'#b8332f'},now);break;
  case 'mg':person(x,y,a,{j:'#3e4a32',gun:20,gw:4.5,cap:'#2c3424'},now);break;
  case 'molo':person(x,y,a,{j:'#5a3a2a',bottle:1,hair:'#2a1a10'},now);break;
  case 'kid':person(x,y,a,{j:'#c9a13a',gun:8,gw:1.5,gc:'#6b4a2a',small:1,cap:'#b33a3a'},now);break;
  case 'cop':person(x,y,a,{j:'#2c3e66',cap:'#1d2945',gun:10,gw:2.5},now);break;
  case 'butch':person(x,y,a+Math.sin(now/280)*.1,{j:'#ddd8cc',axe:1,blood:1,hair:'#555'},now);break;
  case 'monk':person(x,y,a,{j:'#d9822b',hair:'#d6a479'},now);break;
  case 'cook':person(x,y,a,{j:'#f2f2f2',hat:1},now);break;
  case 'mech':person(x,y,a,{j:'#2f5d8a',cap:'#2f5d8a',gun:8,gw:2.5,gc:'#9aa0a6'},now);break;
  case 'lead':person(x,y,a,{j:'#4b6b3a',cap:'#2c3a22'},now);break;
  case 'mine':{circ(x+1,y+2,9,'rgba(0,0,0,.3)');circ(x,y,8,'#3b3d33');ctx.strokeStyle='#5d604f';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,8,0,7);ctx.stroke();if(Math.floor(now/400)%2)circ(x,y,2,'#ff3b3b');break}
 }
}
function drawShelter(now){
 const x=CEN.x,y=CEN.y;ctx.save();ctx.translate(x,y);
 ell(5,7,36,30,'rgba(0,0,0,.4)');ctx.fillStyle='#5b4b39';ctx.fillRect(-30,-26,60,52);
 ctx.fillStyle='#7a3b2b';ctx.beginPath();ctx.moveTo(-34,-30);ctx.lineTo(34,-30);ctx.lineTo(34,0);ctx.lineTo(-34,0);ctx.fill();
 ctx.fillStyle='#8e4632';ctx.beginPath();ctx.moveTo(-34,0);ctx.lineTo(34,0);ctx.lineTo(34,30);ctx.lineTo(-34,30);ctx.fill();
 ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=1;for(let k=-26;k<30;k+=7){line(-34,k,34,k,'rgba(0,0,0,.18)',1)}
 line(-34,0,34,0,'#4a2016',3);
 ctx.fillStyle='#3b3b3b';ctx.fillRect(12,-24,8,10);
 const lit=nightAmt>.2;ctx.fillStyle=lit?'#ffcf6b':'#2a3036';ctx.fillRect(-24,-8,8,6);ctx.fillRect(16,4,8,6);
 if(G.shelter<Z.MAXS*.5){circ(-14,16,4,'rgba(20,20,20,.7)');line(-20,-18,-8,-8,'rgba(20,20,20,.6)',2)}
 ctx.restore();
 if(nightAmt>.3&&Math.random()<.05)PT.push({x:x+16,y:y-26,vx:.004,vy:-.02,t0:now,dur:1200,c:'rgba(160,160,160,.35)',r:4,light:0});
}
const ZL={walk:{sz:1,skin:'#7f9a5e',cloth:'#45463f'},run:{sz:.9,skin:'#a7b062',cloth:'#5a4836'},fat:{sz:1.35,skin:'#8f7aa8',cloth:'#4b3b4f'},
 zdog:{sz:.85,skin:'#6d7a4a',cloth:'#4a3b2a',dog:1},crawl:{sz:.85,skin:'#6f8f8f',cloth:'#3a4646',low:1},spit:{sz:1,skin:'#b7cf3a',cloth:'#4a5a22'},
 armor:{sz:1.1,skin:'#7f9a5e',cloth:'#6e7780',helm:'#8d969e'},howl:{sz:1,skin:'#c49ab0',cloth:'#5a3a4a'},boss:{sz:2.3,skin:'#8a5a5a',cloth:'#3a2626'}};
function drawZombie(v,now){
 const p=v.dying?{x:v.dx,y:v.dy}:zpos(v,now),k=v.k;let alpha=clamp((now-v.born)/350,0,1);
 if(v.dying){alpha=1-clamp((now-v.dying)/500,0,1);if(alpha<=0)return false}
 const Lk=ZL[k]||ZL.walk,a=Math.atan2(CEN.y-p.y,CEN.x-p.x),moving=now-v.t0<v.dur,wob=Math.sin(now/(Z.ZT[k].spd===1?90:200)+v.id)*(moving?.22:.06);
 const sz=Lk.sz*1.5,skin=Lk.skin,cloth=Lk.cloth;
 if(v.burn&&!v.dying&&Math.random()<.3)PT.push({x:p.x+(Math.random()-.5)*10,y:p.y-4,vx:0,vy:-.04,t0:now,dur:300,c:Math.random()<.5?'#ff9a2e':'#ffd25a',r:2.5,light:0});
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(p.x,p.y);ell(2,4,11*sz,8*sz,'rgba(0,0,0,.35)');ctx.rotate(a+wob);ctx.scale(sz,sz);
 if(v.dying){ctx.rotate(.6);}
 if(Lk.dog){line(-10,0,-15,Math.sin(now/70)*3,skin,2.5);ell(-2,0,10,5,cloth);circ(8,0,4.5,skin);ell(7,-3.5,1.8,2.5,cloth);ell(7,3.5,1.8,2.5,cloth)}
 else{const reach=v.dying?6:(Lk.low?10:14)+Math.sin(now/150+v.id)*2;line(2,-6,reach,-5,skin,3.5);line(2,6,reach,5,skin,3.5);
  ell(Lk.low?-3:0,0,Lk.low?10:7,Lk.low?6:10.5,cloth);if(k==='fat'||k==='boss'){circ(-2,3,2,'#6c5a7a');circ(1,-4,1.6,'#6c5a7a')}
  if(k==='spit')circ(6,0,2.5,'#d8f05a');
  circ(3,0,5.4,skin);if(Lk.helm){ctx.fillStyle=Lk.helm;ctx.beginPath();ctx.arc(2.5,0,5.8,Math.PI*.5,Math.PI*1.5);ctx.fill()}
  if(k==='howl'){ctx.strokeStyle='#ffd0e8';ctx.lineWidth=1;ctx.beginPath();ctx.arc(9,0,3+Math.sin(now/120)*1.5,-.8,.8);ctx.stroke()}
  circ(5.5,-2,1.1,'#d7262e');circ(5.5,2,1.1,'#d7262e')}
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
function frameInner(now){
 const dt=Math.min(50,now-last);last=now;fit();
 nightAmt+=(nightTarget-nightAmt)*Math.min(1,dt/450);
 let sx=0,sy=0;if(now-shakeT<260&&!reduce){const k=(1-(now-shakeT)/260)*5;sx=(Math.random()-.5)*k;sy=(Math.random()-.5)*k}
 ctx.setTransform(SC,0,0,SC,sx*SC,sy*SC);
 BARS=[];EYES=[];
 ctx.drawImage(ground,0,0,L,L);ctx.drawImage(decal,0,0,L,L);
 if(!S.busy){
  const t=S.sel!==null?S.hand[S.sel]:null;
  for(const i of Z.INNER){const p=tc(i);if(t&&Z.canPlace(G,t,i)){ctx.strokeStyle='rgba(242,179,61,.7)';ctx.lineWidth=t==='kit'?2:1;ctx.setLineDash([4,4])}else{ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1;ctx.setLineDash([])}ctx.strokeRect(p.x-T/2+2,p.y-T/2+2,T-4,T-4)}
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
 drawFloats(now);
 if(now-hurtT<400){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(cv.width/2,cv.height/2,cv.width*.3,cv.width/2,cv.height/2,cv.width*.75);g.addColorStop(0,'rgba(229,72,77,0)');g.addColorStop(1,`rgba(229,72,77,${.45*(1-(now-hurtT)/400)})`);ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);ctx.restore()}
}

const powered=()=>G.event.id!=='coupure'||G.relics.includes('groupe')||G.grid.some(u=>u&&u.t==='solar');
function safeTxt(x,y,t,c){ctx.font='bold 14px system-ui,sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillText(t,x+1,y+1);ctx.fillStyle=c;ctx.fillText(t,x,y)}

/* ---------- combat events → visuals ---------- */
function playEvents(ev,types,now){
 const shots=new Set();
 for(const e of ev){
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
  if(e.k==='heal'){const p=tc(e.i);for(let k=0;k<3;k++)PT.push({x:p.x+(Math.random()-.5)*20,y:p.y,vx:0,vy:-.03,t0:now,dur:500,c:'#7ee08a',r:2.5,light:0})}
 }
}

/* ---------- UI ---------- */
function hordeHtml(){const w=Z.waveList(G);const parts=Z.ZK.filter(k=>w[k]).map(k=>`<span class="hz"><span class="dot" style="--zc:var(--z-${k})"></span>${plural(w[k],...ZN[k])}</span>`);
 return `<span>Cette nuit :</span>${parts.join('')}`}
const cardName=t=>Z.stat(G,t).n;
const rar=t=>Z.RAR[t]||'com';
const rarTag=t=>rar(t)==='com'?'':`<span class="rt ${rar(t)}">${Z.RARITY[rar(t)].n}</span>`;
function render(){
 $('#round').innerHTML=S.busy?`Nuit ${G.night}`:`Jour ${G.night}`;
 $('#shelT').textContent=`${Math.max(0,G.shelter)}/${Z.MAXS}`;
 const sb=$('#shelB');sb.style.width=Math.max(0,G.shelter)/Z.MAXS*100+'%';sb.className=G.shelter<=3?'low':'';
 $('#event').innerHTML=`<b>${G.event.n}</b><span>${G.event.d}${G.side>=0?` · Fusée : ils viendront de ${Z.SIDES[G.side]}`:''}</span>`;
 $('#horde').innerHTML=(S.busy?'':hordeHtml())+`<span class="scrap" title="Ferraille">${svg('scrap')}${G.scrap}</span>`;
 const plays=Z.playsPerDay(G),left=plays-S.placed;
 const hand=$('#hand');hand.style.setProperty('--n',Math.max(5,S.hand.length));
 hand.innerHTML=S.hand.map((t,k)=>`<button type="button" class="card r-${rar(t)}${S.sel===k?' sel':''}${G.upg[t]?' up':''}" data-k="${k}" style="--cc:${cc(t)}" ${S.busy||left<=0?'disabled':''}>${svg(t)}<span class="nm">${cardName(t)}</span><span class="v">${Z.U[t].v}</span></button>`).join('');
 const info=$('#info');info.className='info';
 if(S.busy){const left=G.z.length+G.pending.length;info.innerHTML=`<b>${plural(left,'zombie','zombies')}</b> encore dehors.`}
 else if(S.sel!==null){const t=S.hand[S.sel],D=Z.U[t];info.innerHTML=`<b>${cardName(t)}</b> : ${D.d}.`+(D.onUnit?' Touche une unité blessée.':D.instant?' Touche l’abri.':D.near?' Touche une case collée à l’abri.':' Touche un emplacement.')}
 else if(left>0)info.innerHTML=`Prépare l’abri avant la nuit. <b>${left}</b> carte${left>1?'s':''} à jouer.`;
 else info.textContent='Prêt. Affronte la nuit.';
 const go=$('#go');go.disabled=false;go.textContent=S.busy?`Vitesse ×${SPEED} (toucher pour changer)`:'Affronter la nuit';go.classList.toggle('speed',S.busy);
}
$('#hand').addEventListener('click',e=>{const b=e.target.closest('.card');if(!b||b.disabled)return;const k=+b.dataset.k;S.sel=S.sel===k?null:k;render()});
$('#round').addEventListener('click',()=>{if(!S.busy&&ov.hidden)runInfo()});
cv.addEventListener('click',e=>{
 const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*L,y=(e.clientY-r.top)/r.height*L;
 const i=Math.floor(y/T)*Z.N+Math.floor(x/T);tapCell(i);
});
function tapCell(i){
 if(S.busy||S.sel===null||S.placed>=Z.playsPerDay(G))return;
 const t=S.hand[S.sel],D=Z.U[t];
 if(!Z.canPlace(G,t,i))return;
 S.hand.splice(S.sel,1);Z.place(G,t,i);if(!D.instant)facing[i]=null;S.discard.push(t);S.placed++;S.sel=null;
 const p=D.instant&&!D.onUnit?CEN:tc(i);addFX({type:'ring',x:p.x,y:p.y,r:34,c:'#f2b33d',dur:350});
 const St=Z.stat(G,t);
 if(t==='food')floatTxt(CEN.x,CEN.y,`+${St.gain} PV`,'#9fd86b');
 if(t==='rep')G.grid.forEach((u,j)=>{if(u&&Z.U[u.t].block){const q=tc(j);floatTxt(q.x,q.y,`+${St.gain}`,'#9fd86b')}});
 if(t==='kit')floatTxt(p.x,p.y,'Soigné','#9fd86b');
 if(t==='coffee')floatTxt(CEN.x,CEN.y,'+1 carte','#f2b33d');
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
 S.discard.push(...S.hand);S.hand=[];save();
 const scrap0=G.scrap,kills0=G.kills;
 nightTarget=1;Z.startNight(G,Math.random);render();await wait(900);
 let r;
 do{const types=G.grid.map(u=>u&&u.t);
  r=Z.step(G);const now=performance.now();
  syncZ(now);playEvents(r.ev,types,now);render();
  const lost=r.ev.filter(e=>e.k==='lost').map(e=>Z.U[e.t].n);
  if(lost.length){const info=$('#info');info.className='info warn';info.textContent=`${lost.join(', ')} détruit${lost.length>1?'s':''} !`}
  await wait(tickMs());
 }while(!r.done);
 await wait(700);
 const dawnInfo=Z.endNight(G);nightTarget=0;S.busy=false;render();await wait(900);
 if(G.shelter<=0)return end();
 S.dawn={kills:G.kills-kills0,scrap:G.scrap-scrap0,heal:dawnInfo.heal};
 dawn();
}

/* ---------- l'aube : relique, carte pour demain, boutique ---------- */
const pickBtn=(t,a,v)=>`<button type="button" class="pick r-${rar(t)}${G.upg[t]?' up':''}" data-a="${a}" data-v="${v}" style="--cc:${cc(t)}">${rarTag(t)}${svg(t)}<span class="nm">${cardName(t)}</span><span class="d">${Z.U[t].d}</span></button>`;
function dawn(){
 if(Z.relicNight(G.night)){const r=Z.relicChoices(G);if(r.length)return dawnStep('relic',r)}
 dawnStep('draft');
}
function dawnStep(ph,picks){
 S.phase=ph;
 if(ph==='relic'){S.picks=picks;save();
  return show(`<h2 class="ok">Nuit ${G.night} survécue</h2>${dawnTxt()}<p>Dans les décombres, tu trouves un objet rare. Choisis une <b>relique</b> : elle reste active toute la partie.</p>
   <div class="relics">${picks.map(r=>`<button type="button" class="relic" data-a="relic" data-v="${r}">${svg('relic')}<span><b>${Z.RELICS[r].n}</b>${Z.RELICS[r].d}</span></button>`).join('')}</div>`)}
 if(ph==='draft'){S.picks=picks||Z.draftChoices();save();
  return show(`<h2 class="ok">Nuit ${G.night} survécue</h2>${S.phase==='draft'&&!Z.relicNight(G.night)?dawnTxt():''}<p>Choisis la carte que tu auras <b>en main demain</b>. Elle rejoint ensuite ton deck.</p>
   <div class="picks">${S.picks.map(t=>pickBtn(t,'draft',t)).join('')}</div>
   <button type="button" class="skip" data-a="draft" data-v="">Ne rien prendre</button>`)}
 if(ph==='buy'){S.picks=picks||Z.draftChoices(Math.random,2);save();
  return show(`<h2 class="pw">Acheter une carte</h2><p>Elle rejoint ton deck.</p><div class="picks two">${S.picks.map(t=>pickBtn(t,'bought',t)).join('')}</div>
   <button type="button" class="skip" data-a="shop">Ne rien prendre</button>`)}
 S.picks=null;save();shopScreen();
}
function dawnTxt(){const d=S.dawn;if(!d)return '';return `<p>L’abri tient avec <b>${G.shelter}/${Z.MAXS} PV</b>. Cette nuit : <b>${plural(d.kills,'zombie éliminé','zombies éliminés')}</b>, <b>+${d.scrap} ferraille</b>${d.heal?`, <b>+${d.heal} PV</b> à l’aube`:''}.</p>`}
function shopScreen(){
 S.phase='shop';S.picks=null;save();
 const row=(k,ex)=>{const o=Z.SHOP[k],c=Z.shopCost(G,k),ok=G.scrap>=c&&!ex;return `<button type="button" class="shopi" data-a="shop-${k}" ${ok?'':'disabled'}><span><b>${o.n}</b>${o.d}</span><span class="cost">${svg('scrap')}${c}</span></button>`};
 const upg=deckTypes().filter(t=>Z.UPGRADABLE.includes(t)&&!G.upg[t]);
 show(`<h2 class="pw">Le troc de l’aube</h2><p>Tu as <b>${G.scrap} ferraille</b>. Un zombie éliminé rapporte 1 ferraille, le Colosse 15. Économise pour ce qui compte.</p>
  <div class="shop">${row('heal',G.shelter>=Z.MAXS)}${row('buy')}${row('upgrade',!upg.length)}${row('remove',deckList().length<=5)}</div>
  <button type="button" class="go" data-a="day">Commencer le jour ${G.night+1}</button>`);
}
const deckTypes=()=>[...new Set(deckList())];
function listScreen(title,txt,types,a){show(`<h2 class="pw">${title}</h2><p>${txt}</p><div class="deck pickable">${types.map(t=>`<button type="button" class="dk" data-a="${a}" data-v="${t}" style="--cc:${cc(t)}">${svg(t)}<span><b>${cardName(t)}${a==='up-pick'?` → ${Z.upgDesc(t)}`:''}</b>${Z.U[t].d}</span></button>`).join('')}</div><button type="button" class="skip" data-a="shop">Retour</button>`)}
function removeCard(t){for(const pile of[S.discard,S.draw,S.hand]){const k=pile.indexOf(t);if(k>=0){pile.splice(k,1);return true}}return false}
function nextDay(){
 Z.newDay(G,Math.random);S.placed=0;S.busy=false;S.phase=null;S.picks=null;S.dawn=null;V.clear();
 fillHand();save();hide();render();
}
function end(){
 clearSave();const nights=G.night-1;
 let best=0;try{best=+localStorage.getItem('abri-best-nuits')||0;if(nights>best){localStorage.setItem('abri-best-nuits',nights);best=nights}}catch(e){best=Math.max(best,nights)}
 show(`<h2 class="ko">L’abri est tombé</h2><p>La horde est entrée pendant la nuit <b>${G.night}</b>.</p><div class="big">${plural(nights,'nuit survécue','nuits survécues')}</div><p><b>${G.kills}</b> zombies éliminés. Record : <b>${plural(best,'nuit','nuits')}</b>${nights>=best&&nights>0?' (nouveau record !)':''}.</p><button type="button" class="go" data-a="new">Rejouer</button>`);
}
const CATN={wall:'Défenses',shoot:'Tireurs',melee:'Corps à corps',help:'Soutien',trap:'Pièges',item:'Objets'};
const deckHtml=()=>Object.keys(CATN).map(c=>`<h3>${CATN[c]}</h3><div class="deck">${Z.KEYS.filter(t=>Z.U[t].cat===c).map(t=>`<div class="dk" style="--cc:${cc(t)}">${svg(t)}<span><b>${Z.U[t].n}</b>${rarTag(t)}${Z.U[t].d}</span></div>`).join('')}</div>`).join('');
const zedHtml=()=>`<div class="deck">${Object.entries(Z.ZT).map(([k,z])=>`<div class="dk" style="--cc:var(--z-${k})"><svg class="ic" viewBox="0 0 24 24"><circle class="f" cx="12" cy="12" r="7"/></svg><span><b>${z.n}</b>${z.hp} PV, ${z.dmg} dégât${z.dmg>1?'s':''} par coup, ${z.info}</span></div>`).join('')}</div>`;
function runInfo(){
 const counts={};deckList().forEach(t=>counts[t]=(counts[t]||0)+1);
 show(`<h2 class="pw">${Z.CHARS[G.char].n}</h2><p><b>${G.kills}</b> zombies éliminés · <b>${G.scrap}</b> ferraille</p>
  <h3>Reliques</h3>${G.relics.length?`<div class="deck">${G.relics.map(r=>`<div class="dk" style="--cc:var(--lantern)">${svg('relic')}<span><b>${Z.RELICS[r].n}</b>${Z.RELICS[r].d}</span></div>`).join('')}</div>`:'<p>Aucune pour l’instant. Tu en trouves une toutes les 5 nuits.</p>'}
  <h3>Ton deck (${deckList().length} cartes)</h3><div class="deck">${Object.entries(counts).map(([t,n])=>`<div class="dk" style="--cc:${cc(t)}">${svg(t)}<span><b>${n>1?n+' × ':''}${cardName(t)}</b>${Z.U[t].d}${G.upg[t]?` (amélioré : ${Z.upgDesc(t)})`:''}</span></div>`).join('')}</div>
  <button type="button" class="go" data-a="close">Fermer</button>`);
}
function charScreen(){
 show(`<h2 class="pw">Choisis ton survivant</h2><p>Chacun commence avec son propre deck de 8 cartes.</p>
  <div class="chars">${Object.entries(Z.CHARS).map(([k,c])=>`<button type="button" class="char" data-a="char" data-v="${k}"><b>${c.n}</b><span>${c.d}</span><span class="mini">${c.deck.map(t=>`<i style="color:${cc(t)}">${svg(t)}</i>`).join('')}</span></button>`).join('')}</div>
  <button type="button" class="skip" data-a="title">Retour</button>`);
}
const ov=$('#ov'),panel=$('#panel');
function show(h){panel.innerHTML=h;ov.hidden=false;panel.scrollTop=0}
function hide(){ov.hidden=true}
const ACT={
 new:()=>charScreen(),
 char:v=>{newGame(v);save();hide();render()},
 load:()=>{const d=loadSave();if(d)resume(d);else charScreen()},
 title:()=>title(),
 close:()=>hide(),
 deck:()=>show(`<h2 class="pw">Les cartes</h2><p>Tu commences avec 8 cartes. Les autres se gagnent à l’aube ou s’achètent au troc. Les cartes rares et épiques sortent rarement.</p>${deckHtml()}<h2 class="pw">La horde</h2><p>Chaque nuit, ils sont plus nombreux et plus résistants. Le Colosse attaque toutes les 10 nuits.</p>${zedHtml()}<button type="button" class="go" data-a="title">Retour</button>`),
 relic:v=>{Z.addRelic(G,v);dawnStep('draft')},
 draft:v=>{S.next=v||null;dawnStep('shop')},
 shop:()=>shopScreen(),
 'shop-heal':()=>{if(Z.pay(G,'heal'))render();shopScreen()},
 'shop-buy':()=>{if(Z.pay(G,'buy')){render();dawnStep('buy')}},
 'shop-upgrade':()=>listScreen('Améliorer une carte','Toutes les cartes de ce type seront améliorées, y compris celles déjà posées.',deckTypes().filter(t=>Z.UPGRADABLE.includes(t)&&!G.upg[t]),'up-pick'),
 'shop-remove':()=>listScreen('Jeter une carte','Une carte de ce type quitte ton deck.',deckTypes(),'rm-pick'),
 bought:v=>{S.discard.push(v);shopScreen()},
 'up-pick':v=>{if(Z.pay(G,'upgrade'))Z.upgrade(G,v);render();shopScreen()},
 'rm-pick':v=>{if(Z.pay(G,'remove'))removeCard(v);shopScreen()},
 day:()=>nextDay(),
 peek:v=>{const k=S.draw.lastIndexOf(v);if(k>=0){S.draw.splice(k,1);S.hand.push(v)}save();hide();render()}
};
panel.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const f=ACT[b.dataset.a];if(f)f(b.dataset.v)});
$('#go').addEventListener('click',()=>{if(S.busy){SPEED=SPEED===1?2:1;render()}else night()});

function title(){show(`<h2 class="pw">Dernier Abri</h2><p>Pas de secours. Pas de fin. Survis <b>une nuit de plus</b>, encore et encore : chaque nuit, la horde est plus nombreuse et plus coriace.</p>
<ul><li>Le jour, joue <b>2 cartes</b> autour de ta maison : défenses, survivants armés, pièges ou objets.</li>
<li>La nuit, les zombies sortent des <b>bois</b> et marchent vers la maison. Tes survivants se défendent tout seuls.</li>
<li>À l’aube, choisis la carte que tu auras <b>en main le lendemain</b>, puis échange ta <b>ferraille</b> au troc.</li>
<li>Toutes les 5 nuits, trouve une <b>relique</b>. Toutes les 10 nuits, le <b>Colosse</b> arrive.</li></ul>
${(b=>b?`<p>Ton record : <b>${plural(b,'nuit survécue','nuits survécues')}</b>.</p>`:'')((()=>{try{return +localStorage.getItem('abri-best-nuits')||0}catch(e){return 0}})())}
${(d=>d?`<button type="button" class="go" data-a="load">Continuer · ${d.s.phase?'Aube':'Jour'} ${d.g.night}</button><button type="button" class="skip" data-a="new">Nouvelle partie</button>`:'<button type="button" class="go" data-a="new">Jouer</button>')(loadSave())}
<button type="button" class="skip" data-a="deck">Voir les cartes et les zombies</button>`)}
newGame();render();requestAnimationFrame(frame);title();
