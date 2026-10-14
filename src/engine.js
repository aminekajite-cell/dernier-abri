// Moteur du jeu : règles pures, sans DOM. Utilisé par le jeu (navigateur) et par tools/simulate.js (Node).
const Z=(()=>{
 const N=7,C=24,MAXS=10;let HPS=.1;
 const U={
  // défenses
  bar:{n:'Barricade',cat:'wall',hp:6,block:1,v:'6 PV',d:'Planches clouées : bloque les zombies, 6 PV'},
  car:{n:'Épave',cat:'wall',hp:12,block:1,v:'12 PV',d:'Carcasse de voiture : bloque, 12 PV'},
  fen:{n:'Clôture',cat:'wall',hp:5,block:1,thorns:1,v:'5 PV',d:'Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe'},
  sand:{n:'Sacs de sable',cat:'wall',hp:5,block:1,cap:1,v:'5 PV',d:'Bloque, 5 PV, ne perd jamais plus de 1 PV par coup'},
  door:{n:'Porte blindée',cat:'wall',hp:15,block:1,near:1,v:'15 PV',d:'Bloque, 15 PV, seulement sur une case collée à l’abri'},
  tire:{n:'Mur de pneus',cat:'wall',hp:8,block:1,tire:1,v:'8 PV',d:'Bloque, 8 PV, laisse une flaque d’essence en tombant'},
  // tireurs
  gun:{n:'Tireur',cat:'shoot',hp:3,block:1,rng:2,dmg:1,every:1,v:'1 · P2',d:'1 dégât par tour, portée 2'},
  snp:{n:'Sniper',cat:'shoot',hp:2,block:1,rng:9,dmg:3,every:2,v:'3 · P∞',d:'3 dégâts tous les 2 tours, portée illimitée'},
  sht:{n:'Fusil à pompe',cat:'shoot',hp:4,block:1,rng:1,dmg:2,every:1,aoe:1,v:'2 zone',d:'2 dégâts à tous les zombies autour de lui'},
  xbow:{n:'Arbalète',cat:'shoot',hp:3,block:1,rng:3,dmg:2,every:2,hits:2,distinct:1,v:'2 ×2 · P3',d:'Tous les 2 tours, 2 dégâts à 2 zombies différents, portée 3'},
  flame:{n:'Lance-flammes',cat:'shoot',hp:4,block:1,rng:1,dmg:1,every:1,ignite:3,v:'Feu',d:'1 dégât au contact et enflamme le zombie : 1 dégât par tour pendant 3 tours'},
  mg:{n:'Mitrailleuse',cat:'shoot',hp:3,block:1,rng:2,dmg:1,every:1,hits:3,jam:3,v:'1 ×3 · P2',d:'3 tirs de 1 dégât par tour, portée 2, s’enraye 1 tour sur 3'},
  molo:{n:'Cocktails',cat:'shoot',hp:2,block:1,rng:3,dmg:2,every:3,molo:1,v:'Zone · P3',d:'Tous les 3 tours, un cocktail sur le groupe le plus serré : 2 dégâts et feu, portée 3'},
  kid:{n:'Gamin',cat:'shoot',hp:1,block:1,rng:2,dmg:1,every:1,hits:2,v:'1 ×2 · P2',d:'Lance-pierre : 2 tirs de 1 dégât par tour, portée 2, mais 1 seul PV'},
  // corps à corps
  axe:{n:'Bûcheron',cat:'melee',hp:5,block:1,rng:1,dmg:2,every:1,v:'2 · P1',d:'2 dégâts par tour au corps à corps, 5 PV'},
  dog:{n:'Chien',cat:'melee',hp:3,block:1,rng:1,dmg:1,every:1,hits:2,v:'1 ×2',d:'Mord 2 fois par tour au corps à corps'},
  cop:{n:'Policier',cat:'melee',hp:4,block:1,rng:1,dmg:1,every:1,push:1,v:'1 · Recul',d:'1 dégât au contact et repousse le zombie d’une case'},
  butch:{n:'Boucher',cat:'melee',hp:4,block:1,rng:1,dmg:2,every:1,feed:1,v:'2 · Soin',d:'2 dégâts au contact, récupère 1 PV à chaque zombie tué'},
  monk:{n:'Moine',cat:'melee',hp:6,block:1,rng:1,dmg:1,every:1,aoe:1,v:'1 zone',d:'1 dégât à tous les zombies autour de lui, 6 PV'},
  // soutien
  med:{n:'Infirmière',cat:'help',hp:2,block:1,heal:1,v:'Soin',d:'Soigne 1 PV à une unité voisine tous les 2 tours'},
  lamp:{n:'Projecteur',cat:'help',hp:2,block:1,buff:1,v:'+1',d:'Les unités autour font +1 dégât'},
  radio:{n:'Radio',cat:'help',hp:2,block:1,v:'+1 carte',d:'Tant qu\'elle tient, tu pioches 1 carte de plus chaque jour'},
  cook:{n:'Cuisinier',cat:'help',hp:2,block:1,cook:1,v:'+1 abri',d:'À chaque aube, l’abri récupère 1 PV'},
  mech:{n:'Mécanicien',cat:'help',hp:3,block:1,mech:1,v:'Répare',d:'Répare 1 PV à une défense voisine à chaque tour'},
  siren:{n:'Sirène',cat:'help',hp:4,block:1,lure:2,v:'Attire',d:'Les zombies à 2 cases ou moins marchent vers elle au lieu de l’abri'},
  lead:{n:'Chef de groupe',cat:'help',hp:3,block:1,lead:1,v:'Rythme',d:'Tous les 3 tours, les unités autour attaquent une fois de plus'},
  solar:{n:'Panneau solaire',cat:'help',hp:2,block:1,solar:1,v:'Courant',d:'Projecteurs et clôtures marchent pendant une coupure, clôtures à 2 dégâts'},
  // pièges
  trap:{n:'Piège à loup',cat:'trap',hp:1,block:0,trap:5,v:'5',d:'Le premier zombie qui marche dessus subit 5 dégâts'},
  fire:{n:'Essence',cat:'trap',hp:1,block:0,burn:2,v:'2/tour',d:'Flaque enflammée : 2 dégâts par tour aux zombies dessus, s\'éteint à l\'aube'},
  mine:{n:'Mine',cat:'trap',hp:1,block:0,mine:6,v:'6 zone',d:'Explose au passage : 6 dégâts sur la case et autour'},
  wire:{n:'Barbelés',cat:'trap',hp:1,block:0,wire:1,v:'Ralentit',d:'Ne bloque pas : 1 dégât et ralentit chaque zombie qui passe, reste en place'},
  spike:{n:'Fosse à pieux',cat:'trap',hp:4,block:0,spike:3,v:'3 ×4',d:'3 dégâts à chaque zombie qui tombe dedans, casse après 4 zombies'},
  gas:{n:'Bonbonne de gaz',cat:'trap',hp:1,block:1,gas:5,v:'5 zone',d:'Bloque. Explose quand un zombie la frappe : 5 dégâts sur la case et autour'},
  smoke:{n:'Fumigène',cat:'trap',hp:1,block:0,smoke:3,v:'Étourdit',d:'Le premier zombie qui passe libère la fumée : les zombies autour sont perdus 3 tours'},
  bait:{n:'Appât',cat:'trap',hp:3,block:0,bait:3,v:'Retient',d:'Viande crue : 3 zombies s’arrêtent 3 tours pour manger'},
  dyn:{n:'Dynamite',cat:'trap',hp:1,block:0,dyn:8,v:'8 zone',d:'Explose au 8ᵉ tour de la nuit : 8 dégâts sur la case et autour'},
  // objets
  food:{n:'Conserves',cat:'item',instant:1,gain:3,v:'+3 abri',d:'Utilise-la sur l\'abri : +3 PV'},
  rep:{n:'Outils',cat:'item',instant:1,gain:3,v:'+3 PV',d:'Utilise-les sur l\'abri : toutes tes unités récupèrent 3 PV'},
  kit:{n:'Trousse de secours',cat:'item',instant:1,onUnit:1,v:'Soin total',d:'Utilise-la sur une de tes unités blessées : elle récupère tous ses PV'},
  coffee:{n:'Café',cat:'item',instant:1,v:'+1 carte',d:'Utilise-le sur l’abri : il ne compte pas, et tu joues 1 carte de plus aujourd’hui'},
  roadmap:{n:'Carte routière',cat:'item',instant:1,peek:3,v:'Fouille',d:'Utilise-la sur l’abri : regarde les 3 prochaines cartes de ta pioche et prends-en une'},
  flare:{n:'Fusée de détresse',cat:'item',instant:1,flare:1,v:'1 côté',d:'Utilise-la sur l’abri : la nuit prochaine, la horde n’arrive que d’un seul côté'}
 };
 const KEYS=Object.keys(U);
 const ZT={
  walk:{n:'Rôdeur',hp:3,spd:2,dmg:1,info:'lent'},
  run:{n:'Coureur',hp:2,spd:1,dmg:1,info:'rapide'},
  fat:{n:'Gonflé',hp:8,spd:3,dmg:2,info:'très lent, 2 dégâts par coup'},
  zdog:{n:'Chien zombie',hp:1,spd:1,dmg:1,info:'rapide et fragile'},
  crawl:{n:'Rampant',hp:2,spd:2,dmg:1,crawl:1,info:'passe sous les défenses (barricades, épaves…)'},
  spit:{n:'Cracheur',hp:3,spd:2,dmg:1,spit:1,info:'crache sur ce qui est à 2 cases devant lui'},
  armor:{n:'Blindé',hp:5,spd:2,dmg:1,armor:1,info:'encaisse 1 dégât de moins par coup, sauf le feu'},
  howl:{n:'Hurleur',hp:4,spd:2,dmg:1,howl:2,info:'appelle 2 rôdeurs en mourant'},
  boss:{n:'Le Colosse',hp:40,spd:3,dmg:2,boss:1,info:'boss de la nuit 10 : détruit une défense d’un coup et frappe l’abri sans mourir'}
 };
 const ZK=Object.keys(ZT);
 const EVENTS=[
  {id:'calme',n:'Nuit calme',d:'Aucun effet'},
  {id:'brume',n:'Brouillard',d:'Portée des tireurs −1'},
  {id:'lune',n:'Pleine lune',d:'+50 % de zombies'},
  {id:'pluie',n:'Pluie',d:'L\'essence ne brûle pas'},
  {id:'coupure',n:'Coupure de courant',d:'Projecteurs et clôtures inactifs'},
  {id:'sprint',n:'Horde affamée',d:'Les rôdeurs deviennent des coureurs'}
 ];
 let WAVES={
  walk: [3,4,5,6,6,7,7,7,8,8],
  run:  [0,0,1,2,2,2,3,3,3,4],
  fat:  [0,0,1,1,1,1,1,2,2,2],
  zdog: [0,0,0,1,1,1,2,2,2,3],
  crawl:[0,0,1,1,1,1,1,2,2,2],
  spit: [0,0,0,0,1,1,1,1,2,2],
  armor:[0,0,0,0,1,1,1,1,1,2],
  howl: [0,0,0,0,0,1,1,1,1,1],
  boss: [0,0,0,0,0,0,0,0,0,1]
 };
 const RELICS={
  lunette:{n:'Lunette de visée',d:'Tes tireurs ont +1 portée'},
  pieges:{n:'Manuel du trappeur',d:'Tes pièges font +2 dégâts'},
  soupe:{n:'Marmite de soupe',d:'À chaque aube, l’abri récupère 1 PV'},
  sac:{n:'Grand sac à dos',d:'Tu pioches 1 carte de plus chaque jour'},
  clous:{n:'Caisse de clous',d:'Tes défenses ont +3 PV'},
  rage:{n:'Adrénaline',d:'Tes unités au corps à corps font +1 dégât'},
  groupe:{n:'Groupe électrogène',d:'Plus de coupure de courant, clôtures à 2 dégâts'},
  aimant:{n:'Aimant',d:'+4 ferraille à chaque aube'}
 };
 const RELIC_NIGHTS=[3,6,8];
 const CHARS={
  surv:{n:'Le survivant',d:'Un deck équilibré, sans bonus. Idéal pour apprendre.',deck:['bar','bar','car','gun','gun','axe','trap','food'],relic:null},
  cop:{n:'La policière',d:'Tireurs. Commence avec la Lunette de visée (+1 portée).',deck:['bar','fen','gun','gun','snp','cop','lamp','food'],relic:'lunette'},
  farm:{n:'Le fermier',d:'Pièges. Commence avec le Manuel du trappeur (+2 dégâts).',deck:['bar','bar','trap','trap','mine','fire','spike','dog'],relic:'pieges'},
  nurse:{n:'L’infirmière',d:'Soins. Commence avec la Marmite de soupe (+1 PV à l’aube).',deck:['bar','car','gun','axe','med','food','rep','kit'],relic:'soupe'}
 };
 const SHOP={
  heal:{n:'Réparer l’abri',d:'+3 PV à l’abri',cost:6},
  buy:{n:'Acheter une carte',d:'Une carte au choix parmi 2, ajoutée au deck',cost:5},
  upgrade:{n:'Améliorer une carte',d:'Toutes tes cartes de ce type sont améliorées',cost:8},
  remove:{n:'Jeter une carte',d:'Retire une carte de ton deck',cost:4}
 };
 const SIDES=['le nord','le sud','l’ouest','l’est'];
 const rc=i=>[Math.floor(i/N),i%N],idx=(r,c)=>r*N+c;
 const isEdge=i=>{const[r,c]=rc(i);return r===0||r===N-1||c===0||c===N-1};
 const cheb=(a,b)=>{const[ar,ac]=rc(a),[br,bc]=rc(b);return Math.max(Math.abs(ar-br),Math.abs(ac-bc))};
 const around=i=>{const[r,c]=rc(i),o=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const R=r+dr,K=c+dc;if(R>=0&&R<N&&K>=0&&K<N)o.push(idx(R,K))}return o};
 const EDGES=[...Array(N*N).keys()].filter(isEdge);
 const INNER=[...Array(N*N).keys()].filter(i=>!isEdge(i)&&i!==C);
 const sideOf=i=>{const[r,c]=rc(i);return r===0?0:r===N-1?1:c===0?2:3};
 // un pas vers la cible (la maison par défaut) : réduit d'abord le plus grand écart
 function next(p,t=C){let[r,c]=rc(p);const[tr,tc]=rc(t),dr=tr-r,dc=tc-c;if(Math.abs(dr)>=Math.abs(dc))r+=Math.sign(dr);else c+=Math.sign(dc);return idx(r,c)}
 // un pas en s'éloignant de la maison (recul)
 function back(p){let[r,c]=rc(p);const dr=r-3,dc=c-3;if(Math.abs(dr)>=Math.abs(dc))r+=Math.sign(dr);else c+=Math.sign(dc);return idx(Math.max(0,Math.min(N-1,r)),Math.max(0,Math.min(N-1,c)))}
 function shuffle(a,rnd=Math.random){for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

 /* ---------- état d'une partie ---------- */
 function newState(ch){const st={grid:Array(N*N).fill(null),shelter:MAXS,night:1,event:EVENTS[0],z:[],pending:[],tick:0,zid:0,kills:0,scrap:0,relics:[],upg:{},extra:0,side:-1,char:CHARS[ch]?ch:'surv'};
  const r=CHARS[st.char].relic;if(r)st.relics.push(r);return st}
 function newDay(st,rnd){st.night++;st.extra=0;st.event=rnd()<.2?EVENTS[0]:EVENTS[1+Math.floor(rnd()*(EVENTS.length-1))]}
 const has=(st,t)=>st.grid.some(u=>u&&u.t===t);
 const playsPerDay=st=>2+(st.extra||0);
 const drawCount=st=>5+(has(st,'radio')?1:0)+(st.relics.includes('sac')?1:0);

 /* ---------- améliorations et reliques : statistiques réelles d'une carte ---------- */
 const TRAPF=['trap','mine','spike','gas','dyn'];
 function upgDesc(t){const b=U[t];
  if(b.dmg)return'+1 dégât';if(TRAPF.some(k=>b[k]))return'+2 dégâts';if(b.burn)return'+1 dégât de feu';
  if(b.smoke||b.bait)return'+1 tour';if(b.wire)return'+1 dégât';if(b.cat==='wall')return'+4 PV';
  if(b.buff)return'+1 au bonus';if(b.heal)return'soigne 2 PV';if(b.gain)return'+2 PV soignés';if(b.cat==='help')return'+2 PV';return null}
 const UPGRADABLE=KEYS.filter(upgDesc);
 const cache=new WeakMap();
 const touch=st=>cache.delete(st);
 function stat(st,t){const b=U[t];if(!st)return b;const R=st.relics||[],up=st.upg&&st.upg[t];if(!up&&!R.length)return b;
  let m=cache.get(st);if(!m){m={};cache.set(st,m)}if(m[t])return m[t];
  const d={...b};
  if(up){d.n=b.n+'+';d.up=1;
   if(b.dmg)d.dmg++;else if(TRAPF.some(k=>b[k]))TRAPF.forEach(k=>{if(b[k])d[k]+=2});else if(b.burn)d.burn++;
   else if(b.smoke)d.smoke++;else if(b.bait)d.bait++;else if(b.wire)d.wire++;else if(b.cat==='wall')d.hp+=4;
   else if(b.buff)d.buff++;else if(b.heal)d.heal++;else if(b.gain)d.gain+=2;else if(b.cat==='help')d.hp+=2}
  if(R.includes('lunette')&&b.cat==='shoot')d.rng++;
  if(R.includes('pieges'))TRAPF.forEach(k=>{if(b[k])d[k]+=2});
  if(R.includes('clous')&&b.cat==='wall')d.hp+=3;
  if(R.includes('rage')&&b.cat==='melee')d.dmg++;
  return m[t]=d}
 function upgrade(st,t){st.upg[t]=1;touch(st)}
 function addRelic(st,r){if(!st.relics.includes(r))st.relics.push(r);touch(st)}
 function relicChoices(st,rnd=Math.random,n=3){return shuffle(Object.keys(RELICS).filter(r=>!st.relics.includes(r)),rnd).slice(0,n)}
 function draftChoices(rnd=Math.random,n=3){return shuffle([...KEYS],rnd).slice(0,n)}
 function pay(st,k){const c=SHOP[k].cost;if(st.scrap<c)return false;st.scrap-=c;if(k==='heal')st.shelter=Math.min(MAXS,st.shelter+3);return true}

 /* ---------- pose des cartes ---------- */
 function canPlace(st,t,i){const D=U[t];
  if(D.onUnit)return !!(st.grid[i]&&U[st.grid[i].t].block&&st.grid[i].hp<stat(st,st.grid[i].t).hp);
  if(D.instant)return i===C;
  if(isEdge(i)||i===C)return false;
  if(D.near)return cheb(i,C)===1;
  return true}
 function place(st,t,i,rnd=Math.random){const D=stat(st,t);if(D.instant){applyItem(st,t,i,rnd);return}st.grid[i]={t,hp:D.hp}}
 function applyItem(st,t,i,rnd){const D=stat(st,t);
  if(t==='food')st.shelter=Math.min(MAXS,st.shelter+D.gain);
  if(t==='rep')st.grid.forEach(u=>{if(u&&U[u.t].block)u.hp=Math.min(stat(st,u.t).hp,u.hp+D.gain)});
  if(t==='kit'&&st.grid[i])st.grid[i].hp=stat(st,st.grid[i].t).hp;
  if(t==='coffee')st.extra=(st.extra||0)+2;
  if(t==='flare')st.side=Math.floor(rnd()*4)}

 /* ---------- la nuit ---------- */
 function waveList(st){const n=st.night-1,e=st.event.id,w={};
  for(const k of ZK){let v=(WAVES[k]||[])[n]||0;if(e==='lune'&&k!=='boss')v=Math.round(v*1.5);w[k]=v}
  if(e==='sprint'){w.run+=w.walk;w.walk=0}
  return w}
 function spawn(st,k,pos){const T=ZT[k],hp=Math.round(T.hp*(1+HPS*(st.night-1)));const z={id:++st.zid,k,pos,hp,max:hp,cd:T.spd};st.z.push(z);return z}
 function startNight(st,rnd){const w=waveList(st),list=[];
  for(const k of ZK)if(k!=='boss')for(let j=0;j<w[k];j++)list.push(k);
  shuffle(list,rnd);
  const edges=st.side>=0?EDGES.filter(i=>sideOf(i)===st.side):EDGES;
  st.pending=list.map((k,j)=>({k,at:1+Math.floor(j*1.3),pos:edges[Math.floor(rnd()*edges.length)]}));
  for(let j=0;j<w.boss;j++)st.pending.push({k:'boss',at:10,pos:edges[Math.floor(rnd()*edges.length)]});
  st.z=[];st.tick=0}
 const power=st=>st.event.id!=='coupure'||st.relics.includes('groupe')||has(st,'solar');
 const lampB=(st,i,pow)=>pow?around(i).reduce((s,j)=>s+(st.grid[j]&&st.grid[j].t==='lamp'?stat(st,'lamp').buff:0),0):0;
 function hit(st,z,d,ev,src,fire){if(!fire&&ZT[z.k].armor)d=Math.max(0,d-ZT[z.k].armor);const was=z.hp;z.hp-=d;ev.push({i:z.pos,txt:d?'−'+d:'0',k:'hit',zid:z.id,src});return was>0&&z.hp<=0}
 function explode(st,i,d,ev){st.z.filter(o=>o.hp>0&&cheb(o.pos,i)<=1).forEach(o=>hit(st,o,d,ev,i,1));ev.push({i,k:'boom'})}
 function lureTarget(st,p){let best=C,bd=99;for(let j=0;j<st.grid.length;j++){const u=st.grid[j];if(!u||u.t!=='siren')continue;const d=cheb(p,j);if(d<=U.siren.lure&&d<bd){bd=d;best=j}}return best}
 function attack(st,i,u,D,rng,dmg,ev){
  const inR=()=>st.z.filter(z=>z.hp>0&&cheb(z.pos,i)<=rng);
  if(D.aoe){const ts=inR();if(ts.length){ts.forEach(z=>hit(st,z,dmg,ev,i));ev.push({i,k:'fire'})}return}
  if(D.molo){const ts=inR();if(!ts.length)return;let best=null,bc=-1;
   for(const z of ts){const c=st.z.filter(o=>o.hp>0&&cheb(o.pos,z.pos)<=1).length;if(c>bc){bc=c;best=z}}
   const at=best.pos;ev.push({i,k:'fire'},{i:at,k:'molo',src:i});
   st.z.filter(o=>o.hp>0&&cheb(o.pos,at)<=1).forEach(o=>{hit(st,o,dmg,ev,i,1);o.burnT=Math.max(o.burnT||0,2)});return}
  const done=new Set();
  for(let h=0;h<(D.hits||1);h++){let ts=inR();if(D.distinct)ts=ts.filter(z=>!done.has(z.id));if(!ts.length)break;
   ts.sort((a,b)=>cheb(a.pos,C)-cheb(b.pos,C)||a.hp-b.hp);const z=ts[0];done.add(z.id);
   const killed=hit(st,z,dmg,ev,i);ev.push({i,k:'fire'});
   if(D.ignite&&z.hp>0)z.burnT=Math.max(z.burnT||0,D.ignite);
   if(D.push&&z.hp>0&&!ZT[z.k].boss){const b=back(z.pos),bu=st.grid[b];if(!(bu&&U[bu.t].block))z.pos=b}
   if(D.feed&&killed)u.hp=Math.min(D.hp,u.hp+1)}
 }
 // un zombie frappe une unité qui bloque (au contact, ou à distance pour le cracheur)
 function strike(st,z,n,u,ev,ranged,pow){const T=ZT[z.k],D=stat(st,u.t);let d=T.boss?u.hp:T.dmg;if(D.cap&&!T.boss)d=Math.min(d,D.cap);
  u.hp-=d;ev.push({i:n,txt:'−'+d,k:ranged?'spit':'bite',zid:z.id,from:z.pos});
  if(!ranged&&u.t==='fen'&&pow)hit(st,z,(st.relics.includes('groupe')||has(st,'solar'))?2:1,ev,n);
  if(D.gas){st.grid[n]=null;explode(st,n,D.gas,ev);return}
  if(u.hp<=0){st.grid[n]=null;ev.push({i:n,k:'lost',t:u.t});if(D.tire)st.grid[n]={t:'fire',hp:1}}}
 // un zombie entre sur une case sans obstacle
 function enter(st,z,n,u,ev){if(!u||U[u.t].block)return;const D=stat(st,u.t);
  if(D.trap){hit(st,z,D.trap,ev,n);st.grid[n]=null}
  if(D.mine){st.grid[n]=null;explode(st,n,D.mine,ev)}
  if(D.spike){hit(st,z,D.spike,ev,n);u.hp--;if(u.hp<=0)st.grid[n]=null}
  if(D.wire){hit(st,z,D.wire,ev,n);z.cd+=ZT[z.k].spd}
  if(D.smoke){st.z.filter(o=>o.hp>0&&cheb(o.pos,n)<=1).forEach(o=>o.cd+=D.smoke);ev.push({i:n,k:'smoke'});st.grid[n]=null}
  if(D.bait){z.cd+=D.bait;ev.push({i:n,k:'eat',zid:z.id});u.hp--;if(u.hp<=0)st.grid[n]=null}}
 function step(st){const ev=[];st.tick++;const e=st.event.id,pow=power(st);
  st.pending=st.pending.filter(p=>{if(p.at<=st.tick){spawn(st,p.k,p.pos);return false}return true});
  const alive=()=>st.z.filter(z=>z.hp>0);
  for(const z of alive())if(z.burnT>0){z.burnT--;hit(st,z,1,ev,-1,1)}
  for(let i=0;i<st.grid.length;i++){const u=st.grid[i];if(!u)continue;const D=stat(st,u.t);
   if(D.rng&&st.tick%D.every===0&&!(D.jam&&st.tick%D.jam===0)){
    const reps=1+(st.tick%3===0&&around(i).some(j=>st.grid[j]&&st.grid[j].t==='lead')?1:0);
    const rng=Math.max(1,D.rng-(e==='brume'&&D.cat==='shoot'?1:0)),dmg=D.dmg+lampB(st,i,pow);
    for(let r=0;r<reps;r++)attack(st,i,u,D,rng,dmg,ev)}
   if(D.heal&&st.tick%2===0){const ns=around(i).map(j=>st.grid[j]).filter(v=>v&&U[v.t].block&&v.hp<stat(st,v.t).hp);if(ns.length){ns.sort((a,b)=>(a.hp-stat(st,a.t).hp)-(b.hp-stat(st,b.t).hp));ns[0].hp=Math.min(stat(st,ns[0].t).hp,ns[0].hp+D.heal);ev.push({i,k:'heal'})}}
   if(D.mech){const ns=around(i).filter(j=>st.grid[j]&&U[st.grid[j].t].cat==='wall'&&st.grid[j].hp<stat(st,st.grid[j].t).hp);if(ns.length){st.grid[ns[0]].hp++;ev.push({i:ns[0],k:'heal'})}}
   if(D.burn&&e!=='pluie')alive().filter(z=>z.pos===i).forEach(z=>hit(st,z,D.burn,ev,i,1));
   if(D.dyn&&st.tick===8){st.grid[i]=null;explode(st,i,D.dyn,ev)}
  }
  for(const z of st.z){if(z.hp<=0)continue;z.cd--;if(z.cd>0)continue;const T=ZT[z.k];z.cd=T.spd;
   const tgt=lureTarget(st,z.pos),n=next(z.pos,tgt);
   if(n===C){st.shelter-=T.dmg;ev.push({i:C,txt:'−'+T.dmg,k:'bite',zid:z.id});if(!T.boss){z.hp=0;z.bit=1}continue}
   const u=st.grid[n];
   if(u&&U[u.t].block&&!(T.crawl&&U[u.t].cat==='wall')){strike(st,z,n,u,ev,false,pow);continue}
   if(T.spit){const n2=next(n,tgt);
    if(n2===C){st.shelter-=T.dmg;ev.push({i:C,txt:'−'+T.dmg,k:'spit',zid:z.id,from:z.pos});continue}
    const u2=st.grid[n2];if(u2&&U[u2.t].block){strike(st,z,n2,u2,ev,true,pow);continue}}
   z.pos=n;enter(st,z,n,u,ev)
  }
  for(const z of st.z)if(z.hp<=0&&!z.dead){z.dead=1;if(!z.bit){const T=ZT[z.k];st.kills++;st.scrap+=T.boss?15:1;
   if(T.howl){ev.push({i:z.pos,k:'howl'});for(let k=0;k<T.howl;k++)spawn(st,'walk',z.pos)}}}
  st.z=st.z.filter(z=>z.hp>0);
  const boss=st.z.some(z=>ZT[z.k].boss)||st.pending.some(p=>p.k==='boss');
  const done=(!st.pending.length&&!st.z.length)||st.shelter<=0||st.tick>(boss?200:90);
  return{ev,done};
 }
 // l'aube : l'essence s'éteint, les soins et la ferraille de l'aube s'appliquent
 function endNight(st){st.grid.forEach((u,i)=>{if(u&&u.t==='fire')st.grid[i]=null});st.z=[];st.side=-1;
  if(st.shelter<=0)return{heal:0,scrap:0};
  const h=st.grid.filter(u=>u&&u.t==='cook').length+(st.relics.includes('soupe')?1:0),before=st.shelter;
  st.shelter=Math.min(MAXS,st.shelter+h);const s=st.relics.includes('aimant')?4:0;st.scrap+=s;
  return{heal:st.shelter-before,scrap:s}}
 function runNight(st,rnd){startNight(st,rnd);let r;do{r=step(st)}while(!r.done)}
 return{N,C,MAXS,U,KEYS,ZT,ZK,EVENTS,RELICS,RELIC_NIGHTS,CHARS,SHOP,SIDES,UPGRADABLE,get HPS(){return HPS},set HPS(v){HPS=v},get WAVES(){return WAVES},set WAVES(v){WAVES=v},
  rc,isEdge,INNER,EDGES,around,cheb,newState,newDay,waveList,stat,upgDesc,upgrade,addRelic,relicChoices,draftChoices,shuffle,pay,touch,canPlace,place,startNight,step,endNight,runNight,drawCount,playsPerDay};
})();
if(typeof module!=='undefined')module.exports=Z;
