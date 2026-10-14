// Moteur du jeu : règles pures, sans DOM. Utilisé par le jeu (navigateur) et par tools/simulate.js (Node).
const Z=(()=>{
 const N=7,C=24,MAXS=10;let HPS=.1;
 const U={
  bar:{n:'Barricade',cat:'wall',hp:6,block:1,v:'6 PV',d:'Planches clouées : bloque les zombies, 6 PV'},
  car:{n:'Épave',cat:'wall',hp:12,block:1,v:'12 PV',d:'Carcasse de voiture : bloque, 12 PV'},
  fen:{n:'Clôture',cat:'wall',hp:5,block:1,thorns:1,v:'5 PV',d:'Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe'},
  gun:{n:'Tireur',cat:'shoot',hp:3,block:1,rng:2,dmg:1,every:1,v:'1 · P2',d:'1 dégât par tour, portée 2'},
  snp:{n:'Sniper',cat:'shoot',hp:2,block:1,rng:9,dmg:3,every:2,v:'3 · P∞',d:'3 dégâts tous les 2 tours, portée illimitée'},
  axe:{n:'Bûcheron',cat:'melee',hp:5,block:1,rng:1,dmg:2,every:1,v:'2 · P1',d:'2 dégâts par tour au corps à corps, 5 PV'},
  sht:{n:'Fusil à pompe',cat:'shoot',hp:4,block:1,rng:1,dmg:2,every:1,aoe:1,v:'2 zone',d:'2 dégâts à tous les zombies autour de lui'},
  dog:{n:'Chien',cat:'melee',hp:3,block:1,rng:1,dmg:1,every:1,hits:2,v:'1 ×2',d:'Mord 2 fois par tour au corps à corps'},
  med:{n:'Infirmière',cat:'help',hp:2,block:1,heal:1,v:'Soin',d:'Soigne 1 PV à une unité voisine tous les 2 tours'},
  lamp:{n:'Projecteur',cat:'help',hp:2,block:1,buff:1,v:'+1',d:'Les unités autour font +1 dégât'},
  radio:{n:'Radio',cat:'help',hp:2,block:1,v:'+1 carte',d:'Tant qu\'elle tient, tu pioches 1 carte de plus chaque jour'},
  trap:{n:'Piège à loup',cat:'trap',hp:1,block:0,trap:5,v:'5',d:'Le premier zombie qui marche dessus subit 5 dégâts'},
  fire:{n:'Essence',cat:'trap',hp:1,block:0,burn:2,v:'2/tour',d:'Flaque enflammée : 2 dégâts par tour aux zombies dessus, s\'éteint à l\'aube'},
  mine:{n:'Mine',cat:'trap',hp:1,block:0,mine:6,v:'6 zone',d:'Explose au passage : 6 dégâts sur la case et autour'},
  food:{n:'Conserves',cat:'item',instant:1,v:'+3 abri',d:'Utilise-la sur l\'abri : +3 PV'},
  rep:{n:'Outils',cat:'item',instant:1,v:'+3 PV',d:'Utilise-les sur l\'abri : toutes tes unités récupèrent 3 PV'}
 };
 const KEYS=Object.keys(U);
 const ZT={walk:{n:'Rôdeur',hp:3,spd:2,dmg:1},run:{n:'Coureur',hp:2,spd:1,dmg:1},fat:{n:'Gonflé',hp:8,spd:3,dmg:2}};
 const EVENTS=[
  {id:'calme',n:'Nuit calme',d:'Aucun effet'},
  {id:'brume',n:'Brouillard',d:'Portée des tireurs −1'},
  {id:'lune',n:'Pleine lune',d:'+50 % de zombies'},
  {id:'pluie',n:'Pluie',d:'L\'essence ne brûle pas'},
  {id:'coupure',n:'Coupure de courant',d:'Projecteurs et clôtures inactifs'},
  {id:'sprint',n:'Horde affamée',d:'Les rôdeurs deviennent des coureurs'}
 ];
 let WAVES={walk:[3,5,7,8,10,11,12,14,15,17],run:[0,0,2,3,4,5,6,7,8,10],fat:[0,0,1,1,2,2,3,3,4,5]};
 const rc=i=>[Math.floor(i/N),i%N],idx=(r,c)=>r*N+c;
 const isEdge=i=>{const[r,c]=rc(i);return r===0||r===N-1||c===0||c===N-1};
 const cheb=(a,b)=>{const[ar,ac]=rc(a),[br,bc]=rc(b);return Math.max(Math.abs(ar-br),Math.abs(ac-bc))};
 const around=i=>{const[r,c]=rc(i),o=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const R=r+dr,K=c+dc;if(R>=0&&R<N&&K>=0&&K<N)o.push(idx(R,K))}return o};
 const EDGES=[...Array(N*N).keys()].filter(isEdge);
 const INNER=[...Array(N*N).keys()].filter(i=>!isEdge(i)&&i!==C);
 function next(p){let[r,c]=rc(p);const dr=3-r,dc=3-c;if(Math.abs(dr)>=Math.abs(dc))r+=Math.sign(dr);else c+=Math.sign(dc);return idx(r,c)}
 function newState(){return{grid:Array(N*N).fill(null),shelter:MAXS,night:1,event:EVENTS[0],z:[],pending:[],tick:0,zid:0}}
 function waveList(st){const n=st.night-1,e=st.event.id;let w=WAVES.walk[n],r=WAVES.run[n],f=WAVES.fat[n];
  if(e==='lune'){w=Math.round(w*1.5);r=Math.round(r*1.5);f=Math.round(f*1.5)}
  if(e==='sprint'){r+=w;w=0}
  return{walk:w,run:r,fat:f}}
 function place(st,t,i){if(U[t].instant){applyItem(st,t);return}st.grid[i]={t,hp:U[t].hp}}
 function applyItem(st,t){if(t==='food')st.shelter=Math.min(MAXS,st.shelter+3);if(t==='rep')st.grid.forEach(u=>{if(u&&U[u.t].block)u.hp=Math.min(U[u.t].hp,u.hp+3)})}
 function startNight(st,rnd){const w=waveList(st),list=[];
  for(const k of['walk','run','fat'])for(let j=0;j<w[k];j++)list.push(k);
  for(let i=list.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[list[i],list[j]]=[list[j],list[i]]}
  st.pending=list.map((k,j)=>({k,at:1+Math.floor(j*1.3),pos:EDGES[Math.floor(rnd()*EDGES.length)]}));
  st.z=[];st.tick=0}
 const lampB=(st,i)=>st.event.id==='coupure'?0:around(i).filter(j=>st.grid[j]&&st.grid[j].t==='lamp').length;
 function hit(st,z,d,ev,src){z.hp-=d;ev.push({i:z.pos,txt:'−'+d,k:'hit',zid:z.id,src})}
 function step(st){const ev=[];st.tick++;const e=st.event.id;
  st.pending=st.pending.filter(p=>{if(p.at<=st.tick){const T=ZT[p.k],hp=Math.round(T.hp*(1+HPS*(st.night-1)));st.z.push({id:++st.zid,k:p.k,pos:p.pos,hp,max:hp,cd:T.spd});return false}return true});
  const alive=()=>st.z.filter(z=>z.hp>0);
  for(let i=0;i<st.grid.length;i++){const u=st.grid[i];if(!u)continue;const D=U[u.t];
   if(D.rng&&st.tick%D.every===0){const rng=Math.max(1,D.rng-(e==='brume'&&D.cat==='shoot'?1:0)),dmg=D.dmg+lampB(st,i);
    if(D.aoe){const ts=alive().filter(z=>cheb(z.pos,i)<=rng);if(ts.length){ts.forEach(z=>hit(st,z,dmg,ev,i));ev.push({i,k:'fire'})}}
    else for(let h=0;h<(D.hits||1);h++){const ts=alive().filter(z=>cheb(z.pos,i)<=rng);if(!ts.length)break;ts.sort((a,b)=>cheb(a.pos,C)-cheb(b.pos,C)||a.hp-b.hp);hit(st,ts[0],dmg,ev,i);ev.push({i,k:'fire'})}}
   if(D.heal&&st.tick%2===0){const ns=around(i).map(j=>st.grid[j]).filter(v=>v&&U[v.t].block&&v.hp<U[v.t].hp);if(ns.length){ns.sort((a,b)=>(a.hp-U[a.t].hp)-(b.hp-U[b.t].hp));ns[0].hp++;ev.push({i,k:'heal'})}}
   if(D.burn&&e!=='pluie')alive().filter(z=>z.pos===i).forEach(z=>hit(st,z,D.burn,ev,i));
  }
  for(const z of st.z){if(z.hp<=0)continue;z.cd--;if(z.cd>0)continue;const T=ZT[z.k];z.cd=T.spd;const n=next(z.pos);
   if(n===C){st.shelter-=T.dmg;z.hp=0;z.bit=1;ev.push({i:C,txt:'−'+T.dmg,k:'bite',zid:z.id});continue}
   const u=st.grid[n];
   if(u&&U[u.t].block){u.hp-=T.dmg;ev.push({i:n,txt:'−'+T.dmg,k:'bite',zid:z.id});if(u.t==='fen'&&e!=='coupure')hit(st,z,1,ev,n);if(u.hp<=0){st.grid[n]=null;ev.push({i:n,k:'lost',t:u.t})}continue}
   z.pos=n;
   if(u&&u.t==='trap'){hit(st,z,U.trap.trap,ev,n);st.grid[n]=null}
   if(u&&u.t==='mine'){alive().filter(o=>cheb(o.pos,n)<=1).forEach(o=>hit(st,o,U.mine.mine,ev,n));st.grid[n]=null;ev.push({i:n,k:'boom'})}
  }
  const before=st.z.length;st.z=st.z.filter(z=>z.hp>0);const kills=st.z.length<before;
  const done=(!st.pending.length&&!st.z.length)||st.shelter<=0||st.tick>90;
  return{ev,done};
 }
 function endNight(st){st.grid.forEach((u,i)=>{if(u&&u.t==='fire')st.grid[i]=null});st.z=[]}
 function runNight(st,rnd){startNight(st,rnd);let r;do{r=step(st)}while(!r.done)}
 const extraDraw=st=>st.grid.some(u=>u&&u.t==='radio')?1:0;
 return{N,C,MAXS,U,KEYS,ZT,EVENTS,get HPS(){return HPS},set HPS(v){HPS=v},get WAVES(){return WAVES},set WAVES(v){WAVES=v},rc,isEdge,INNER,EDGES,around,newState,waveList,place,startNight,step,endNight,runNight,extraDraw};
})();
if(typeof module!=='undefined')module.exports=Z;
