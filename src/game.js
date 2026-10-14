// Rendu canvas, interface et boucle de jeu. Dépend de src/engine.js (global Z).
const ICON={
 bar:'<path d="M4 6l16 4M4 14l16 4M7 4v17M17 4v17"/>',
 car:'<path d="M3 15l2-5h12l3 5v3H3zM6 10l1.5-3h8l1.5 3"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
 fen:'<path d="M5 4v16M12 4v16M19 4v16M5 9h14M5 15h14"/>',
 gun:'<circle cx="12" cy="12" r="6.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
 snp:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 1v6M12 17v6M1 12h6M17 12h6"/>',
 axe:'<path d="M13 4l7 7-4.5 1.5-4-4zM14.5 9.5 4 20"/>',
 sht:'<path d="M6 7h5v13H6zM13 7h5v13h-5zM6 11h5M13 11h5M7 4h3M14 4h3"/>',
 dog:'<circle cx="6.5" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="17.5" cy="10" r="2"/><path d="M12 12c-3 0-5 3-5 5.5 0 1.5 1.5 2.5 5 2.5s5-1 5-2.5C17 15 15 12 12 12z"/>',
 med:'<path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z"/>',
 lamp:'<path d="M3 9l8-4v14l-8-4zM14 8l6-3M14 12h7M14 16l6 3"/>',
 radio:'<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M8 9l10-6M14 13h3M14 16h3"/><circle cx="9" cy="14.5" r="2"/>',
 trap:'<path d="M3 16h18M4 16l2-6 2 6 2-6 2 6 2-6 2 6 2-6 2 6"/>',
 fire:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2.5-5 .5 2 1.5 2.5 2.5 2.5C12 8 11.5 5.5 12 3z"/>',
 mine:'<circle cx="12" cy="14" r="5.5"/><path d="M12 8.5V5M9 4h6M16.5 9.5l1.8-1.8"/>',
 food:'<path d="M6 5h12v15H6zM6 9h12M6 16h12"/>',
 rep:'<path d="M14.5 5.5a4 4 0 0 0-5 5L3 17l4 4 6.5-6.5a4 4 0 0 0 5-5l-2.5 2.5-3-1-1-3z"/>'
};
const svg=t=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[t]}</svg>`;
const cc=t=>`var(--k-${Z.U[t].cat})`;
const PLAYS=2,NIGHTS=10,TICK=430;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const $=s=>document.querySelector(s);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const plural=(n,s,p)=>n+' '+(n>1?p:s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- state ---------- */
let S,G;
function newGame(){
 G=Z.newState();
 S={draw:shuffle([...Z.KEYS]),discard:[],hand:[],sel:null,placed:0,busy:false,kills:0};
 V.clear();FX.length=0;PT.length=0;facing.fill(null);clearDecals();
 drawCards(5+Z.extraDraw(G));
}
/* ---------- sauvegarde (localStorage, marche aussi dans Electron/Tauri) ---------- */
const SAVE_KEY='abri-save',SAVE_V=1;
function save(draftPicks){try{localStorage.setItem(SAVE_KEY,JSON.stringify({v:SAVE_V,g:{grid:G.grid,shelter:G.shelter,night:G.night,event:G.event.id,zid:G.zid},s:{draw:S.draw,discard:S.discard,hand:S.hand,placed:S.placed,kills:S.kills},draft:draftPicks||null}))}catch(e){}}
function loadSave(){try{const d=JSON.parse(localStorage.getItem(SAVE_KEY));if(d&&d.v===SAVE_V&&d.g&&d.s)return d}catch(e){}return null}
function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}
function resume(d){
 newGame();
 Object.assign(G,d.g,{event:Z.EVENTS.find(e=>e.id===d.g.event)||Z.EVENTS[0]});
 Object.assign(S,d.s,{sel:null,busy:false});
 hide();render();
 if(d.draft)draft(d.draft);
}
function drawCards(n){for(let k=0;k<n;k++){if(!S.draw.length){S.draw=shuffle(S.discard);S.discard=[]}if(!S.draw.length)break;S.hand.push(S.draw.pop())}}

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
  if(!v){const dx=c.x-CEN.x,dy=c.y-CEN.y,d=Math.hypot(dx,dy)||1;v={id:z.id,k:z.k,pos:z.pos,from:{x:to.x+dx/d*46,y:to.y+dy/d*46},to,t0:now,dur:Z.ZT[z.k].spd*TICK,hp:z.hp,max:z.max,born:now};V.set(z.id,v)}
  else if(v.pos!==z.pos){v.from=zpos(v,now);v.to=to;v.t0=now;v.dur=Z.ZT[z.k].spd*TICK;v.pos=z.pos}
  v.hp=z.hp}
 for(const v of V.values())if(!ids.has(v.id)&&!v.dying){v.dying=now;const p=zpos(v,now);v.dx=p.x;v.dy=p.y;if(!v.bit)splat(p.x,p.y,true)}
}

/* ---------- drawing helpers ---------- */
function ell(x,y,rx,ry,c){if(!(rx>0&&ry>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fill()}
function circ(x,y,r,c){if(!(r>0))return;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
function line(x1,y1,x2,y2,c,w){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function person(x,y,a,o,now){
 const br=Math.sin(now/600+x)*.6;ctx.save();ctx.translate(x,y);ell(2,4,12,9,'rgba(0,0,0,.35)');ctx.rotate(a);
 if(o.gun)line(2,4,2+o.gun,4,'#151515',o.gw||3);
 if(o.axe){line(2,5,16,5,'#6b4a2a',2.5);ctx.fillStyle='#9aa0a6';ctx.fillRect(13,1,6,5)}
 ell(0,0,8+br*.2,11+br*.3,o.j);
 if(o.cross){ctx.fillStyle='#d23b3b';ctx.fillRect(-4,-1.2,6,2.4);ctx.fillRect(-2.2,-3,2.4,6)}
 circ(7,4,2.6,o.skin||'#d6a479');circ(5,-6,2.6,o.skin||'#d6a479');
 circ(1,0,5.6,o.skin||'#d6a479');ctx.fillStyle=o.hair||'#3a2a1c';ctx.beginPath();ctx.arc(.2,0,5.8,Math.PI*.55,Math.PI*1.45);ctx.fill();
 if(o.cap){ctx.fillStyle=o.cap;ctx.beginPath();ctx.arc(0,0,5.4,Math.PI*.5,Math.PI*1.5);ctx.fill();ctx.fillRect(3,-3,3,6)}
 ctx.restore()}
let BARS=[],EYES=[];
function hpBar(x,y,f,c){if(f>=1)return;BARS.push([x,y,f,c])}
function drawBars(){for(const[x,y,f,c]of BARS){ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(x-17,y,34,5);ctx.fillStyle=c;ctx.fillRect(x-17,y,34*clamp(f,0,1),5)}}
const CATC={wall:'#c9a27a',shoot:'#f2b33d',melee:'#ff7a59',help:'#7cc7ff',trap:'#e5484d',item:'#d6c2ff'};
function drawUnit(i,u,now){
 const p0=tc(i),D0=Z.U[u.t];
 ctx.save();ctx.globalAlpha=D0.block?.22:.16;circ(p0.x,p0.y,25,CATC[D0.cat]);ctx.globalAlpha=1;ctx.strokeStyle=CATC[D0.cat];ctx.globalAlpha=.6;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p0.x,p0.y,25,0,7);ctx.stroke();ctx.restore();
 ctx.save();ctx.translate(p0.x,p0.y);ctx.scale(1.45,1.45);ctx.translate(-p0.x,-p0.y);
 drawUnitInner(i,u,now);ctx.restore();
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
   const on=G.event.id!=='coupure';[-4,0,4].forEach(o=>line(-20,o,20,o,on?'#9fb6c8':'#666',1.2));
   if(on&&nightAmt>.3&&Math.random()<.04)PT.push({x:x+(Math.random()-.5)*40,y:y+(Math.random()-.5)*10,vx:0,vy:-.02,t0:now,dur:180,c:'#9fe8ff',r:2,light:18});ctx.restore();break}
  case 'gun':person(x,y,a,{j:'#55603c',gun:16},now);break;
  case 'snp':person(x,y,a,{j:'#2f3a2c',gun:25,gw:2.5,cap:'#26301f'},now);break;
  case 'axe':person(x,y,a+Math.sin(now/300)*.1,{j:'#8c2f2a',axe:1,hair:'#6b3b1e'},now);break;
  case 'sht':person(x,y,a,{j:'#6b4a2c',gun:13,gw:4.5},now);break;
  case 'med':person(x,y,a,{j:'#e8e4d8',cross:1,hair:'#1d1a17'},now);break;
  case 'dog':{ctx.save();ctx.translate(x,y);ell(2,4,13,7,'rgba(0,0,0,.3)');ctx.rotate(a);line(-11,0,-17,Math.sin(now/90)*4,'#5a3b22',3);ell(-2,0,11,6,'#7a5232');circ(9,0,5,'#7a5232');circ(13,0,2.4,'#5a3b22');ell(8,-4,2,3,'#4a2f1a');ell(8,4,2,3,'#4a2f1a');ctx.restore();break}
  case 'lamp':{ctx.save();ctx.translate(x,y);line(-8,8,0,0,'#555',2);line(8,8,0,0,'#555',2);line(0,-9,0,0,'#555',2);ctx.rotate(out);ctx.fillStyle='#bbb';ctx.fillRect(-6,-6,10,12);ctx.fillStyle=G.event.id==='coupure'?'#555':'#ffe9a8';ctx.fillRect(4,-5,3,10);ctx.restore();break}
  case 'radio':{ctx.save();ctx.translate(x,y);ell(2,4,13,8,'rgba(0,0,0,.3)');ctx.fillStyle='#3b4a3a';ctx.fillRect(-11,-7,22,14);ctx.strokeStyle='#222';ctx.strokeRect(-11,-7,22,14);circ(-4,0,4,'#222');line(6,-7,14,-18,'#999',1.5);if(Math.floor(now/500)%2)circ(7,-3,1.8,'#ff4040');ctx.restore();break}
  case 'trap':{ctx.save();ctx.translate(x,y);ctx.strokeStyle='#8b8f93';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.stroke();for(let k=0;k<10;k++){const t=k/10*Math.PI*2;line(Math.cos(t)*9,Math.sin(t)*9,Math.cos(t)*5,Math.sin(t)*5,'#b5b9bd',1.5)}circ(0,0,2.5,'#555');ctx.restore();break}
  case 'fire':{ell(x,y,22,15,'rgba(40,36,50,.75)');ell(x-5,y-3,8,4,'rgba(120,90,160,.25)');
   if(S.busy&&G.event.id!=='pluie'){for(let k=0;k<2;k++)PT.push({x:x+(Math.random()-.5)*34,y:y+(Math.random()-.5)*20,vx:(Math.random()-.5)*.01,vy:-.045,t0:now,dur:420,c:Math.random()<.5?'#ff9a2e':'#ffd25a',r:3+Math.random()*3,light:0})}break}
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
function drawZombie(v,now){
 const p=v.dying?{x:v.dx,y:v.dy}:zpos(v,now),k=v.k;let alpha=clamp((now-v.born)/350,0,1);
 if(v.dying){alpha=1-clamp((now-v.dying)/500,0,1);if(alpha<=0)return false}
 const a=Math.atan2(CEN.y-p.y,CEN.x-p.x),moving=now-v.t0<v.dur,wob=Math.sin(now/(k==='run'?90:200)+v.id)*(moving?.22:.06);
 const sz=(k==='fat'?1.35:k==='run'?.9:1)*1.5,skin=k==='fat'?'#8f7aa8':k==='run'?'#a7b062':'#7f9a5e',cloth=k==='fat'?'#4b3b4f':k==='run'?'#5a4836':'#45463f';
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(p.x,p.y);ell(2,4,11*sz,8*sz,'rgba(0,0,0,.35)');ctx.rotate(a+wob);ctx.scale(sz,sz);
 if(v.dying){ctx.rotate(.6);}
 const reach=v.dying?6:14+Math.sin(now/150+v.id)*2;line(2,-6,reach,-5,skin,3.5);line(2,6,reach,5,skin,3.5);
 ell(0,0,7,10.5,cloth);if(k==='fat'){circ(-2,3,2,'#6c5a7a');circ(1,-4,1.6,'#6c5a7a')}
 circ(3,0,5.4,skin);circ(5.5,-2,1.1,'#d7262e');circ(5.5,2,1.1,'#d7262e');
 if(v.flash&&now-v.flash<110){ctx.globalAlpha=alpha*.8;circ(0,0,11,'#fff')}
 ctx.restore();
 if(!v.dying){const ex=Math.cos(a+wob),ey=Math.sin(a+wob);EYES.push([p.x+ex*5.5*sz,p.y+ey*5.5*sz,-ey,ex,sz,alpha]);if(v.hp<v.max)hpBar(p.x,p.y-17*sz,v.hp/v.max,'#e5484d')}
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
 const pow=G.event.id!=='coupure';
 G.grid.forEach((u,i)=>{if(!u)return;const p=tc(i);
  if(u.t==='lamp'&&pow){const d=Math.atan2(p.y-CEN.y,p.x-CEN.x);ls.push({x:p.x+Math.cos(d)*40,y:p.y+Math.sin(d)*40,r:T*1.5});ls.push({x:p.x,y:p.y,r:T*.8})}
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
  const instSel=S.sel!==null&&Z.U[S.hand[S.sel]].instant;
  ctx.lineWidth=1;
  for(const i of Z.INNER){const p=tc(i);if(S.sel!==null&&!instSel){ctx.strokeStyle='rgba(242,179,61,.55)';ctx.setLineDash([4,4])}else{ctx.strokeStyle='rgba(255,255,255,.05)';ctx.setLineDash([])}ctx.strokeRect(p.x-T/2+2,p.y-T/2+2,T-4,T-4)}
  ctx.setLineDash([]);
  if(instSel){ctx.strokeStyle='rgba(242,179,61,.8)';ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.strokeRect(CEN.x-T/2-4,CEN.y-T/2-4,T+8,T+8);ctx.setLineDash([])}
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

/* ---------- combat events → visuals ---------- */
function playEvents(ev,types,now){
 const shots=new Set();
 for(const e of ev){
  if(e.k==='hit'){const v=V.get(e.zid);const tp=v?(v.dying?{x:v.dx,y:v.dy}:zpos(v,now)):tc(e.i);if(v)v.flash=now;
   floatTxt(tp.x,tp.y,e.txt,'#ffffff');burst(tp.x,tp.y,'rgba(140,20,24,.9)',4,.06,2);splat(tp.x,tp.y,false);
   const t=types[e.src],sp=tc(e.src);
   if(t)facing[e.src]=Math.atan2(tp.y-sp.y,tp.x-sp.x);
   const key=e.src+':'+e.zid;
   if(t==='gun'||t==='snp'){const a=facing[e.src],mx=sp.x+Math.cos(a)*(t==='snp'?26:18),my=sp.y+Math.sin(a)*(t==='snp'?26:18);
    addFX({type:'tracer',x1:mx,y1:my,x2:tp.x,y2:tp.y,c:t==='snp'?'#fff4c8':'#ffd27a',w:t==='snp'?1.6:1.2,dur:t==='snp'?260:160});
    addFX({type:'flash',x:mx,y:my,r:t==='snp'?7:5,c:'#ffe08a',dur:90,light:T*.9})}
   else if(t==='sht'){if(!shots.has(e.src)){shots.add(e.src);const a=facing[e.src],mx=sp.x+Math.cos(a)*15,my=sp.y+Math.sin(a)*15;addFX({type:'flash',x:mx,y:my,r:8,c:'#ffd27a',dur:110,light:T})}
    addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:tp.x+(Math.random()-.5)*10,y2:tp.y+(Math.random()-.5)*10,c:'#ffcf70',w:1,dur:140})}
   else if(t==='axe')addFX({type:'swing',x:sp.x,y:sp.y,a:facing[e.src],dur:220});
   else if(t==='dog')addFX({type:'flash',x:tp.x,y:tp.y,r:6,c:'rgba(255,255,255,.7)',dur:90});
   else if(t==='fen'){addFX({type:'tracer',x1:sp.x,y1:sp.y,x2:tp.x,y2:tp.y,c:'#9fe8ff',w:2,dur:120});addFX({type:'flash',x:tp.x,y:tp.y,r:7,c:'#bff3ff',dur:120,light:T*.8})}
   else if(t==='trap')addFX({type:'ring',x:sp.x,y:sp.y,r:22,c:'#d9dde0',dur:250});
   else if(t==='fire')burst(tp.x,tp.y,'#ff9a2e',3,.04,3);
  }
  if(e.k==='boom'){const p=tc(e.i);addFX({type:'flash',x:p.x,y:p.y,r:46,c:'rgba(255,160,60,.9)',dur:380,light:T*2.2});addFX({type:'ring',x:p.x,y:p.y,r:70,c:'#ffb35c',dur:420});burst(p.x,p.y,'#ff9a2e',22,.2,3);burst(p.x,p.y,'#3a3a3a',14,.12,4);shakeT=now;gx.fillStyle='rgba(15,12,10,.6)';gx.beginPath();gx.arc(p.x,p.y,22,0,7);gx.fill()}
  if(e.k==='bite'){const v=V.get(e.zid),p=tc(e.i);
   if(e.i===Z.C){shakeT=now;hurtT=now;if(v){v.bit=1}floatTxt(p.x,p.y-8,e.txt,'#ff6b6b');burst(p.x,p.y,'rgba(140,20,24,.9)',8,.08,2)}
   else{if(v){v.lunge=now;v.lx=p.x;v.ly=p.y}floatTxt(p.x,p.y,e.txt,'#ff6b6b');burst(p.x,p.y,types[e.i]==='car'?'#9a9a9a':'#a07a4a',5,.07,2)}}
  if(e.k==='lost'){const p=tc(e.i);burst(p.x,p.y,'#8a6a45',16,.12,3);burst(p.x,p.y,'rgba(140,20,24,.9)',6,.08,2);splat(p.x,p.y,true)}
  if(e.k==='heal'){const p=tc(e.i);for(let k=0;k<3;k++)PT.push({x:p.x+(Math.random()-.5)*20,y:p.y,vx:0,vy:-.03,t0:now,dur:500,c:'#7ee08a',r:2.5,light:0})}
 }
}

/* ---------- UI ---------- */
function hordeHtml(){const w=Z.waveList(G);const parts=[['walk','rôdeur','rôdeurs'],['run','coureur','coureurs'],['fat','gonflé','gonflés']].filter(([k])=>w[k]).map(([k,s,p])=>`<span class="hz"><span class="dot" style="--zc:var(--z-${k})"></span>${plural(w[k],s,p)}</span>`);
 return `<span>Cette nuit :</span>${parts.join('')}`}
function render(){
 $('#round').innerHTML=S.busy?`Nuit ${G.night}<span>/${NIGHTS}</span>`:`Jour ${G.night}<span>/${NIGHTS}</span>`;
 $('#shelT').textContent=`${Math.max(0,G.shelter)}/${Z.MAXS}`;
 const sb=$('#shelB');sb.style.width=Math.max(0,G.shelter)/Z.MAXS*100+'%';sb.className=G.shelter<=3?'low':'';
 $('#event').innerHTML=`<b>${G.event.n}</b><span>${G.event.d}</span>`;
 if(!S.busy)$('#horde').innerHTML=hordeHtml();
 const hand=$('#hand');hand.style.setProperty('--n',Math.max(5,S.hand.length));
 hand.innerHTML=S.hand.map((t,k)=>`<button type="button" class="card${S.sel===k?' sel':''}" data-k="${k}" style="--cc:${cc(t)}" ${S.busy||S.placed>=PLAYS?'disabled':''}>${svg(t)}<span class="nm">${Z.U[t].n}</span><span class="v">${Z.U[t].v}</span></button>`).join('');
 const info=$('#info');info.className='info';
 if(S.busy){const left=G.z.length+G.pending.length;info.innerHTML=`<b>${plural(left,'zombie','zombies')}</b> encore dehors.`}
 else if(S.sel!==null){const t=S.hand[S.sel];info.innerHTML=`<b>${Z.U[t].n}</b> : ${Z.U[t].d}.`+(Z.U[t].instant?' Touche l’abri.':' Touche un emplacement.')}
 else if(S.placed<PLAYS)info.innerHTML=`Prépare l’abri avant la nuit. <b>${PLAYS-S.placed}</b> carte${PLAYS-S.placed>1?'s':''} à jouer.`;
 else info.textContent='Prêt. Affronte la nuit.';
 $('#go').disabled=S.busy;
}
$('#hand').addEventListener('click',e=>{const b=e.target.closest('.card');if(!b||b.disabled)return;const k=+b.dataset.k;S.sel=S.sel===k?null:k;render()});
cv.addEventListener('click',e=>{
 const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*L,y=(e.clientY-r.top)/r.height*L;
 const i=Math.floor(y/T)*Z.N+Math.floor(x/T);tapCell(i);
});
function tapCell(i){
 if(S.busy||S.sel===null||S.placed>=PLAYS)return;
 const t=S.hand[S.sel],D=Z.U[t];
 if(D.instant?i!==Z.C:(Z.isEdge(i)||i===Z.C))return;
 S.hand.splice(S.sel,1);Z.place(G,t,i);facing[i]=null;S.discard.push(t);S.placed++;S.sel=null;
 const p=D.instant?CEN:tc(i);addFX({type:'ring',x:p.x,y:p.y,r:34,c:'#f2b33d',dur:350});
 if(t==='food')floatTxt(CEN.x,CEN.y,'+3 PV','#9fd86b');if(t==='rep')G.grid.forEach((u,j)=>{if(u&&Z.U[u.t].block){const q=tc(j);floatTxt(q.x,q.y,'+3','#9fd86b')}});
 save();render();
}

async function night(){
 if(S.busy)return;S.busy=true;S.sel=null;
 S.discard.push(...S.hand);S.hand=[];
 nightTarget=1;Z.startNight(G,Math.random);render();await wait(900);
 let r;
 do{const before=G.z.length+G.pending.length,types=G.grid.map(u=>u&&u.t);
  r=Z.step(G);const now=performance.now();
  const bitHome=r.ev.filter(e=>e.k==='bite'&&e.i===Z.C).length;
  S.kills+=Math.max(0,before-(G.z.length+G.pending.length)-bitHome);
  syncZ(now);playEvents(r.ev,types,now);render();
  const lost=r.ev.filter(e=>e.k==='lost').map(e=>Z.U[e.t].n);
  if(lost.length){const info=$('#info');info.className='info warn';info.textContent=`${lost.join(', ')} détruit${lost.length>1?'s':''} !`}
  await wait(TICK);
 }while(!r.done);
 await wait(700);
 Z.endNight(G);nightTarget=0;render();await wait(900);
 if(G.shelter<=0)return end(false);
 if(G.night>=NIGHTS)return end(true);
 draft();
}
function draft(saved){
 const picks=saved||shuffle([...Z.KEYS]).slice(0,3);
 save(picks);
 show(`<h2 class="ok">Nuit ${G.night} survécue</h2><p>L’abri tient encore avec <b>${G.shelter}/${Z.MAXS} PV</b>. Zombies éliminés depuis le début : <b>${S.kills}</b>.</p><p>Au lever du jour, tu trouves de quoi renforcer ton deck :</p>
  <div class="picks">${picks.map(t=>`<button type="button" class="pick" data-t="${t}" style="--cc:${cc(t)}">${svg(t)}<span class="nm">${Z.U[t].n}</span><span class="d">${Z.U[t].d}</span></button>`).join('')}</div>
  <button type="button" class="skip" data-t="">Ne rien prendre</button>`);
}
function nextDay(){
 G.night++;S.placed=0;S.busy=false;V.clear();
 G.event=Math.random()<.2?Z.EVENTS[0]:Z.EVENTS[1+Math.floor(Math.random()*(Z.EVENTS.length-1))];
 drawCards(5+Z.extraDraw(G));save();hide();render();
}
function end(win){
 clearSave();
 let best=0;try{best=+localStorage.getItem('abri-best')||0;if(S.kills>best){localStorage.setItem('abri-best',S.kills);best=S.kills}}catch(e){best=Math.max(best,S.kills)}
 show(win?`<h2 class="ok">Les secours arrivent</h2><p>Tu as tenu ${NIGHTS} nuits. Un hélicoptère se pose au milieu des ruines.</p><div class="big">${S.kills} zombies</div><p>Record : <b>${best}</b>.</p><button type="button" class="go" data-a="new">Rejouer</button>`
  :`<h2 class="ko">L’abri est tombé</h2><p>La horde est entrée pendant la nuit <b>${G.night}</b>.</p><div class="big">${S.kills} zombies</div><p>Record : <b>${best}</b>.</p><button type="button" class="go" data-a="new">Rejouer</button>`);
}
const deckHtml=()=>`<div class="deck">${Z.KEYS.map(t=>`<div class="dk" style="--cc:${cc(t)}">${svg(t)}<span><b>${Z.U[t].n}</b>${Z.U[t].d}</span></div>`).join('')}</div>`;
const zedHtml=()=>`<div class="deck">${Object.entries(Z.ZT).map(([k,z])=>`<div class="dk" style="--cc:var(--z-${k})"><svg class="ic" viewBox="0 0 24 24"><circle class="f" cx="12" cy="12" r="7"/></svg><span><b>${z.n}</b>${z.hp} PV, ${z.spd===1?'rapide':z.spd===2?'lent':'très lent'}, ${z.dmg} dégât${z.dmg>1?'s':''} par coup</span></div>`).join('')}</div>`;
const ov=$('#ov'),panel=$('#panel');
function show(h){panel.innerHTML=h;ov.hidden=false;panel.scrollTop=0}
function hide(){ov.hidden=true}
panel.addEventListener('click',e=>{
 const p=e.target.closest('[data-t]');if(p){if(p.dataset.t)S.discard.push(p.dataset.t);nextDay();return}
 const a=e.target.closest('[data-a]');if(!a)return;
 if(a.dataset.a==='new'){newGame();save();hide();render()}
 if(a.dataset.a==='load'){const d=loadSave();if(d)resume(d);else{newGame();save();hide();render()}}
 if(a.dataset.a==='deck')show(`<h2 class="pw">Ton deck</h2><p>Tu commences avec une carte de chaque.</p>${deckHtml()}<h2 class="pw">La horde</h2><p>Les zombies deviennent plus résistants chaque nuit.</p>${zedHtml()}<button type="button" class="go" data-a="title">Retour</button>`);
 if(a.dataset.a==='title')title();
});
$('#go').addEventListener('click',night);

function title(){show(`<h2 class="pw">Dernier Abri</h2><p>Survis <b>10 nuits</b> à l’apocalypse. Chaque nuit, la horde est plus nombreuse et plus coriace.</p>
<ul><li>Le jour, joue <b>2 cartes</b> autour de ta maison : barricades, survivants armés, pièges ou objets.</li>
<li>La nuit, les zombies sortent des <b>bois</b> et marchent vers la maison.</li>
<li>Tes survivants tirent tout seuls. Les zombies frappent tout ce qui bloque leur chemin.</li>
<li>Si l’abri tombe à 0 PV, c’est fini. Après chaque nuit, ajoute une carte à ton deck.</li></ul>
${(d=>d?`<button type="button" class="go" data-a="load">Continuer · ${d.draft?'Aube':'Jour'} ${d.g.night}</button><button type="button" class="skip" data-a="new">Nouvelle partie</button>`:'<button type="button" class="go" data-a="new">Jouer</button>')(loadSave())}
<button type="button" class="skip" data-a="deck">Voir les cartes et les zombies</button>`)}
newGame();render();requestAnimationFrame(frame);title();
