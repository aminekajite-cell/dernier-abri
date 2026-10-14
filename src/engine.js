// Moteur du jeu : règles pures, sans DOM. Utilisé par le jeu (navigateur) et par tools/simulate.js (Node).
const Z=(()=>{
 const N=7,C=24,MAXS=10;let HPS=0,HPS2=.12;
 // PV des zombies : stables jusqu'à la nuit 10 (ils sont déjà coriaces), puis +12 % par nuit
 const hpMult=n=>1+HPS*(Math.min(n,10)-1)+HPS2*Math.max(0,n-10);
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
  coffee:{n:'Café',cat:'item',instant:1,v:'+2 énergie',d:'Utilise-le sur l’abri : gratuit, +2 énergie aujourd’hui'},
  roadmap:{n:'Carte routière',cat:'item',instant:1,peek:3,v:'Fouille',d:'Utilise-la sur l’abri : regarde les 3 prochaines cartes de ta pioche et prends-en une'},
  // réactions : jouables seulement pendant la nuit, avec l'énergie gardée du jour
  grenade:{n:'Grenade',cat:'react',react:'cell',v:'5 zone',d:'Pendant la nuit : 5 dégâts sur la case visée et autour'},
  shot:{n:'Tir de l’abri',cat:'react',react:'any',v:'6',d:'Pendant la nuit : 6 dégâts au zombie le plus proche de l’abri'},
  patch:{n:'Réparation express',cat:'react',react:'unit',v:'+5 PV',d:'Pendant la nuit : une de tes unités récupère 5 PV'},
  molotov:{n:'Molotov',cat:'react',react:'cell',v:'Feu zone',d:'Pendant la nuit : 2 dégâts sur la case visée et autour, et les zombies y brûlent 4 tours'},
  horn:{n:'Klaxon',cat:'react',react:'any',v:'Recul',d:'Pendant la nuit : tous les zombies reculent d’une case'},
  rush:{n:'Adrénaline',cat:'react',react:'any',v:'×2',d:'Pendant la nuit : tes unités attaquent deux fois pendant 3 tours'},
  flare:{n:'Fusée de détresse',cat:'item',instant:1,flare:1,v:'1 côté',d:'Utilise-la sur l’abri : la nuit prochaine, la horde n’arrive que d’un seul côté'}
 };
 const KEYS=Object.keys(U);
 // survivants nommés : chaque humain ou chien posé reçoit un prénom et un trait, compte ses victimes, et meurt pour de bon
 const HUMANS='gun snp sht xbow flame mg molo kid axe cop butch monk med cook mech lead'.split(' ');
 const NAMES='Marco Léa Karim Sofia Hugo Nadia Bruno Inès Yanis Chloé Malik Julie Théo Amira Victor Lina Samir Emma Rachid Zoé Paul Yasmine Louis Clara Mehdi Sarah Hector Nora Igor Maya Omar Jade Gaston Lou Bilal Rose Kenji Alice Driss Margot'.split(' ');
 const DOG_NAMES='Rex Kira Brutus Lola Tyson Médor Nala Rocky'.split(' ');
 const TRAITS={
  costaud:{n:'Costaud',d:'+2 PV',hpB:2},
  fragile:{n:'Fragile',d:'−1 PV',hpB:-1},
  precis:{n:'Précis',d:'+1 dégât',dmgB:1,att:1},
  myope:{n:'Myope',d:'−1 portée',rngB:-1,far:1},
  increvable:{n:'Increvable',d:'survit une fois à un coup fatal'},
  coriace:{n:'Coriace',d:'récupère 1 PV à chaque aube',regen:1},
  aguerri:{n:'Aguerri',d:'+1 dégât après 10 zombies tués',att:1}
 };
 const named=t=>HUMANS.includes(t)||t==='dog';
 const maxHp=(st,u)=>Math.max(1,stat(st,u.t).hp+((TRAITS[u.trait]||{}).hpB||0));
 const unitDmg=u=>{const T=TRAITS[u.trait]||{};return (T.dmgB||0)+(u.trait==='aguerri'&&(u.kills||0)>=10?1:0)};
 // énergie : chaque jour on a ENERGY points, chaque carte coûte de 0 à 3 selon sa puissance
 const ENERGY=4,HAND_MAX=8;
 const COST={coffee:0,grenade:1,shot:1,patch:1,molotov:2,horn:2,rush:2};
 'bar fen sand trap fire wire smoke bait food kid dog med roadmap kit flare'.split(' ').forEach(t=>COST[t]=1);
 'gun axe cop tire spike mine lamp radio cook mech butch monk flame xbow rep gas'.split(' ').forEach(t=>COST[t]=2);
 'car door snp sht mg molo siren lead solar dyn'.split(' ').forEach(t=>COST[t]=3);
 const cost=t=>COST[t]??2;
 const ZT={
  walk:{n:'Rôdeur',hp:11,spd:2,dmg:1,info:'lent'},
  run:{n:'Coureur',hp:8,spd:1,dmg:1,info:'rapide'},
  fat:{n:'Gonflé',hp:30,spd:3,dmg:2,info:'très lent, 2 dégâts par coup'},
  zdog:{n:'Chien zombie',hp:4,spd:1,dmg:1,info:'rapide et fragile'},
  crawl:{n:'Rampant',hp:8,spd:2,dmg:1,crawl:1,info:'passe sous les défenses (barricades, épaves…)'},
  spit:{n:'Cracheur',hp:11,spd:2,dmg:1,spit:1,info:'crache sur ce qui est à 2 cases devant lui'},
  armor:{n:'Blindé',hp:19,spd:2,dmg:1,armor:1,info:'encaisse 1 dégât de moins par coup, sauf le feu'},
  howl:{n:'Hurleur',hp:15,spd:2,dmg:1,howl:2,info:'appelle 2 rôdeurs en mourant'},
  boss:{n:'Le Colosse',hp:112,spd:3,dmg:2,boss:1,info:'boss de la nuit 10 : détruit une défense d’un coup et frappe l’abri sans mourir'}
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
 // nuits 1 à 10, puis chaque nuit ajoute GROW zombies de chaque type (survie sans fin)
 let WAVES={
  walk: [2,2,4,4,4,4,5,5,5,5],
  run:  [0,0,1,1,1,1,2,2,2,2],
  fat:  [0,0,1,1,1,1,1,1,1,1],
  zdog: [0,0,0,1,1,1,1,1,1,1],
  crawl:[0,0,1,1,1,1,1,1,1,1],
  spit: [0,0,0,0,1,1,1,1,1,1],
  armor:[0,0,0,0,1,1,1,1,1,1],
  howl: [0,0,0,0,0,1,1,1,1,1]
 };
 let GROW={walk:.6,run:.36,fat:.24,zdog:.24,crawl:.24,spit:.18,armor:.24,howl:.15};
 // le Colosse arrive toutes les 10 nuits (1 la nuit 10, 2 la nuit 20…)
 const bossCount=n=>n%10===0?n/10:0;
 function waveCount(k,n){if(k==='boss')return bossCount(n);const t=WAVES[k]||[];if(n<=t.length)return t[n-1]||0;return Math.round((t[t.length-1]||0)+(GROW[k]||0)*(n-t.length))}
 const RELICS={
  lunette:{n:'Lunette de visée',d:'Tes tireurs ont +1 portée'},
  pieges:{n:'Manuel du trappeur',d:'Tes pièges font +2 dégâts'},
  soupe:{n:'Marmite de soupe',d:'À chaque aube, l’abri récupère 1 PV'},
  sac:{n:'Grand sac à dos',d:'Tu pioches 1 carte de plus chaque jour'},
  clous:{n:'Caisse de clous',d:'Tes défenses ont +3 PV'},
  rage:{n:'Adrénaline',d:'Tes unités au corps à corps font +1 dégât'},
  groupe:{n:'Groupe électrogène',d:'Plus de coupure de courant, clôtures à 2 dégâts'},
  aimant:{n:'Aimant',d:'+3 ferraille à chaque aube'}
 };
 // une relique toutes les 5 nuits
 const relicNight=n=>n%5===0;
 // familles : plus il y a d'unités d'une famille sur la carte, plus la famille est forte (2 paliers)
 const FAM={
  fire:{n:'Feu',ic:'🔥',cards:['fire','flame','molo','dyn','gas','tire'],lv:[3,5],d:['le feu fait +1 dégât par tour','les zombies qui meurent en brûlant explosent (2 dégâts autour)']},
  elec:{n:'Électricité',ic:'⚡',cards:['fen','lamp','solar','siren'],lv:[2,4],d:['clôtures : +1 dégât','clôtures : le zombie touché est étourdi 1 tour']},
  trap:{n:'Pièges',ic:'🪤',cards:['trap','mine','spike','wire','smoke','bait'],lv:[3,5],d:['pièges : +2 dégâts','pièges : +4 dégâts au total']},
  pack:{n:'Meute',ic:'🪓',cards:['axe','dog','cop','butch','monk'],lv:[3,5],d:['corps à corps : +1 dégât','corps à corps : +1 PV à chaque zombie tué']},
  guns:{n:'Armes à feu',ic:'🔫',cards:['gun','snp','sht','mg','xbow','kid'],lv:[4,6],d:['tireurs : +1 portée','tireurs : +1 dégât']},
  comm:{n:'Communauté',ic:'🏠',cards:['med','cook','mech','lead','radio'],lv:[3,5],d:['à l’aube, l’abri récupère 1 PV','à l’aube, toutes tes unités récupèrent 1 PV']}
 };
 const famOf=t=>Object.keys(FAM).find(f=>FAM[f].cards.includes(t));
 function famCounts(st){const c={};for(const u of st.grid)if(u){const f=famOf(u.t);if(f)c[f]=(c[f]||0)+1}return c}
 function famLevels(st){const c=famCounts(st),l={};for(const f in FAM)l[f]=(c[f]||0)>=FAM[f].lv[1]?2:(c[f]||0)>=FAM[f].lv[0]?1:0;return l}
 // choisir sa nuit : à l'aube, 2 nuits au choix, l'une prudente, l'autre risquée mais payante
 const TIERS={
  base:{n:'Nuit',d:'Horde normale.',count:1},
  calm:{n:'Nuit tranquille',d:'Horde −30 %. Aucun bonus.',count:.7,safe:1},
  normal:{n:'Nuit ordinaire',d:'Horde normale. +6 ferraille à l’aube.',count:1,scrap:6,safe:1},
  raid:{n:'Nuit de pillage',d:'Horde +40 %. Une carte rare à l’aube.',count:1.4,card:'rare'},
  blood:{n:'Nuit sanglante',d:'Horde +70 %. Une relique à l’aube.',count:1.7,relic:1}
 };
 // le choix de la nuit est rare : 1 aube sur 4 environ, à partir de la nuit 3
 const nightChoice=(st,rnd=Math.random)=>st.night>=3&&rnd()<.25;
 function nightOffers(st,rnd=Math.random){const ev=()=>(rnd()<.2?EVENTS[0]:EVENTS[1+Math.floor(rnd()*(EVENTS.length-1))]).id;
  const e1=ev();let e2=ev();for(let k=0;k<5&&e2===e1;k++)e2=ev();
  return[{tier:rnd()<.5?'calm':'normal',event:e1},{tier:rnd()<.6?'raid':'blood',event:e2}]}
 // événements de l'aube : une petite histoire et un choix. Chaque choix renvoie un texte et ses effets.
 // Les effets sur le deck (cartes gagnées) sont rendus dans res.cards : c'est le jeu qui les ajoute au deck.
 const freeCells=st=>INNER.filter(i=>!st.grid[i]);
 const randUnit=(st,rnd)=>{const us=st.grid.map((u,i)=>u&&U[u.t].block?i:-1).filter(i=>i>=0);return us.length?us[Math.floor(rnd()*us.length)]:-1};
 const pickR=(a,rnd)=>a[Math.floor(rnd()*a.length)];
 function hurt(st,j,d){const u=st.grid[j];if(!u)return'';u.hp-=d;const nm=u.name||U[u.t].n;if(u.hp<=0){lose(st,j,u,[]);return st.grid[j]?`${nm} s’en sort de justesse.`:`${nm} n’a pas survécu.`}return `${nm} perd ${d} PV.`}
 function recruit(st,t,rnd){const fc=freeCells(st);if(!fc.length)return null;const i=pickR(fc,rnd);place(st,t,i,rnd,true);st.grid[i].gen=1;return st.grid[i]}
 const DAWN={
  stranger:{n:'Un inconnu à la porte',d:'Quelqu’un frappe, à bout de forces. Son bras est caché sous sa veste.',ch:[
   {n:'L’accueillir',d:'Un survivant gratuit… s’il n’est pas mordu.',go:(st,rnd)=>{if(rnd()<.3){st.shelter=Math.max(1,st.shelter-2);return{txt:'L’inconnu était mordu. La transformation a lieu dans la nuit : l’abri perd 2 PV avant que tout soit fini.'}}
    const u=recruit(st,pickR(['gun','axe','cop','med'],rnd),rnd);return{txt:u?`${u.name} rejoint l’abri (${U[u.t].n}).`:'Il n’y a plus de place autour de l’abri. L’inconnu repart dans la nuit.'}}},
   {n:'Lui fermer la porte',d:'Pas de risque.',go:()=>({txt:'Ses coups contre la porte cessent au bout d’une heure.'})}]},
  raiders:{n:'Des pillards',d:'Trois hommes armés exigent ta ferraille.',ch:[
   {n:'Payer 8 ferraille',d:'Ils partent sans histoire.',ok:st=>st.scrap>=8,go:st=>{st.scrap-=8;return{txt:'Ils empochent la ferraille et disparaissent.'}}},
   {n:'Les repousser',d:'+6 ferraille, mais un de tes défenseurs est blessé.',go:(st,rnd)=>{st.scrap+=6;const j=randUnit(st,rnd);return{txt:'Tu récupères leurs affaires (+6 ferraille). '+(j>=0?hurt(st,j,3):'')}}}]},
  market:{n:'Le supermarché',d:'Un supermarché à moitié pillé, à dix minutes de marche.',ch:[
   {n:'Fouiller',d:'Une carte rare et de la ferraille… ou une embuscade.',go:(st,rnd)=>{if(rnd()<.6){st.scrap+=5;const c=pickR((st.pool||KEYS).filter(t=>RAR[t]==='rare'),rnd);return{txt:`Butin : ${U[c].n} et 5 ferraille.`,cards:[c]}}st.shelter=Math.max(1,st.shelter-2);return{txt:'Une embuscade ! Tu rentres en courant, la horde sur les talons : l’abri perd 2 PV.'}}},
   {n:'Rester à l’abri',d:'Pas de risque.',go:()=>({txt:'Tu passes la matinée à renforcer les planches.'})}]},
  radio:{n:'Un message radio',d:'Des survivants donnent leur position et demandent de l’aide.',ch:[
   {n:'Y aller',d:'2 cartes communes, mais −1 énergie demain (fatigue).',go:(st,rnd)=>{st.nextE=(st.nextE||0)-1;const cs=[pickR((st.pool||KEYS).filter(t=>RAR[t]==='com'),rnd),pickR((st.pool||KEYS).filter(t=>RAR[t]==='com'),rnd)];return{txt:`Ils te donnent ${U[cs[0]].n} et ${U[cs[1]].n}. Le retour est épuisant.`,cards:cs}}},
   {n:'Ignorer',d:'Pas de risque.',go:()=>({txt:'Le message se répète jusqu’au soir, puis plus rien.'})}]},
  dog:{n:'Un chien errant',d:'Un chien maigre rôde autour de l’abri.',ch:[
   {n:'L’adopter',d:'Un chien gratuit autour de l’abri.',go:(st,rnd)=>{const u=recruit(st,'dog',rnd);return{txt:u?`${u.name} monte la garde.`:'Pas de place pour lui. Il s’éloigne.'}}},
   {n:'Le chasser',d:'Rien ne se passe.',go:()=>({txt:'Il disparaît dans les bois.'})}]},
  cache:{n:'Une caisse militaire',d:'Une caisse scellée, peut-être piégée.',ch:[
   {n:'L’ouvrir',d:'Une amélioration gratuite… ou une explosion.',go:(st,rnd,deck)=>{if(rnd()<.5){const ts=[...new Set(deck||[])].filter(t=>UPGRADABLE.includes(t)&&!st.upg[t]);if(ts.length){const t=pickR(ts,rnd);upgrade(st,t);return{txt:`Du matériel de qualité : ${U[t].n} est amélioré.`}}st.scrap+=6;return{txt:'De la ferraille de qualité : +6.'}}
    const j=randUnit(st,rnd);return{txt:'Piégée ! '+(j>=0?hurt(st,j,4):'Personne n’était à côté.')}}},
   {n:'La laisser',d:'Pas de risque.',go:()=>({txt:'Tu la recouvres de branches et tu l’oublies.'})}]},
  mechanic:{n:'Un mécanicien de passage',d:'Il propose de réparer tes défenses contre de la ferraille.',ch:[
   {n:'Payer 6 ferraille',d:'Toutes tes unités récupèrent tous leurs PV.',ok:st=>st.scrap>=6,go:st=>{st.scrap-=6;st.grid.forEach(u=>{if(u&&U[u.t].block)u.hp=maxHp(st,u)});return{txt:'En une matinée, tout est comme neuf.'}}},
   {n:'Refuser',d:'Pas de risque.',go:()=>({txt:'Il hausse les épaules et reprend la route.'})}]},
  wounded:{n:'Un blessé dans le fossé',d:'Une personne blessée appelle à l’aide.',ch:[
   {n:'Soigner la personne',d:'L’abri perd 1 PV (provisions), tu gagnes une Trousse de secours.',go:st=>{st.shelter=Math.max(1,st.shelter-1);return{txt:'En remerciement, tu reçois sa trousse de secours.',cards:['kit']}}},
   {n:'Passer ton chemin',d:'Pas de risque.',go:()=>({txt:'Ses appels s’éteignent dans ton dos.'})}]}
 };
 const dawnEvent=(st,rnd=Math.random)=>st.night>=2&&rnd()<.45?pickR(Object.keys(DAWN),rnd):null;
 function resolveDawn(st,id,k,rnd=Math.random,deck){const c=DAWN[id].ch[k];if(c.ok&&!c.ok(st))return{txt:'Impossible.'};const r=c.go(st,rnd,deck)||{};touch(st);return r}
 // mutations : toutes les 4 nuits, la horde gagne un bonus permanent pour toute la partie
 const MUTS={
  peau:{n:'Peau épaisse',d:'Les zombies ont +20 % de PV',stack:1},
  nombre:{n:'Horde nombreuse',d:'+20 % de zombies chaque nuit',stack:1},
  enrage:{n:'Enragés',d:'Les rôdeurs et les coureurs font +1 dégât par coup'},
  carapace:{n:'Carapace',d:'Les rôdeurs encaissent 1 dégât de moins par coup (sauf le feu et les explosions)'},
  regen:{n:'Régénération',d:'Les zombies récupèrent 1 PV tous les 3 tours'},
  putride:{n:'Putréfaction',d:'En mourant, un zombie éclabousse les unités autour de lui : 1 dégât'},
  frenesie:{n:'Frénésie',d:'Les zombies lents et très lents avancent plus vite'}
 };
 const mutNight=n=>n%4===0;
 const mc=(st,m)=>(st.muts||[]).filter(x=>x===m).length;
 function mutate(st,rnd=Math.random){const pool=Object.keys(MUTS).filter(m=>MUTS[m].stack||!mc(st,m));const m=pool[Math.floor(rnd()*pool.length)];(st.muts=st.muts||[]).push(m);return m}
 const zspd=(st,k)=>{const s=ZT[k].spd;return mc(st,'frenesie')&&s>1&&!ZT[k].boss?s-1:s};
 const zdmg=(st,k)=>ZT[k].dmg+(mc(st,'enrage')&&(k==='walk'||k==='run')?1:0);
 const CHARS={
  surv:{n:'Le survivant',d:'Aucun bonus. Idéal pour apprendre.',deck:['bar','bar','car','gun','gun','axe','trap','food','grenade'],relic:null},
  cop:{n:'La policière',d:'Commence avec la Lunette de visée : tes tireurs ont +1 portée.',deck:['bar','fen','gun','gun','snp','cop','lamp','food','grenade'],relic:'lunette'},
  farm:{n:'Le fermier',d:'Commence avec le Manuel du trappeur : tes pièges font +2 dégâts.',deck:['bar','bar','trap','trap','mine','fire','spike','dog','grenade'],relic:'pieges'},
  nurse:{n:'L’infirmière',d:'Commence avec la Marmite de soupe : +1 PV à l’abri à chaque aube.',deck:['bar','car','gun','axe','med','food','rep','kit','grenade'],relic:'soupe'}
 };
 const SHOP={
  heal:{n:'Réparer l’abri',d:'+3 PV à l’abri',cost:15},
  buy:{n:'Acheter une carte',d:'Une carte au choix parmi 2, ajoutée au deck',cost:12},
  upgrade:{n:'Améliorer une carte',d:'Toutes tes cartes de ce type sont améliorées. Plus cher à chaque fois',cost:25,more:15},
  remove:{n:'Jeter une carte',d:'Retire une carte de ton deck',cost:10}
 };
 const shopCost=(st,k)=>SHOP[k].cost+(SHOP[k].more||0)*Object.keys(st.upg||{}).length;
 // rareté : les cartes puissantes sortent rarement à l'aube et au troc
 const RARITY={com:{n:'Commune',w:67},rare:{n:'Rare',w:27},epic:{n:'Épique',w:6}};
 const RAR={};
 'bar fen sand gun kid axe dog cop med trap fire wire smoke bait food rep'.split(' ').forEach(t=>RAR[t]='com');
 'car tire snp xbow flame butch monk lamp radio cook mech mine spike kit flare roadmap'.split(' ').forEach(t=>RAR[t]='rare');
 'door sht mg molo siren lead solar gas dyn coffee rush'.split(' ').forEach(t=>RAR[t]='epic');
 'grenade shot patch'.split(' ').forEach(t=>RAR[t]='com');'molotov horn'.split(' ').forEach(t=>RAR[t]='rare');
 const SIDES=['le nord','le sud','l’ouest','l’est'];
 const rc=i=>[Math.floor(i/N),i%N],idx=(r,c)=>r*N+c;
 const isEdge=i=>{const[r,c]=rc(i);return r===0||r===N-1||c===0||c===N-1};
 const cheb=(a,b)=>{const[ar,ac]=rc(a),[br,bc]=rc(b);return Math.max(Math.abs(ar-br),Math.abs(ac-bc))};
 const around=i=>{const[r,c]=rc(i),o=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const R=r+dr,K=c+dc;if(R>=0&&R<N&&K>=0&&K<N)o.push(idx(R,K))}return o};
 const EDGES=[...Array(N*N).keys()].filter(isEdge);
 const INNER=[...Array(N*N).keys()].filter(i=>!isEdge(i)&&i!==C);
 const sideOf=i=>{const[r,c]=rc(i);return r===0?0:r===N-1?1:c===0?2:3};
 // les pas possibles vers la cible (la maison par défaut), du préféré au moins préféré.
 // Chaque zombie a un style de marche (z.style) : 0 réduit d'abord l'écart en ligne, 1 l'écart en colonne, 2 coupe en diagonale.
 // Tous ces pas rapprochent de la cible ; les zombies arrivent ainsi de tous les côtés et par les 8 cases autour de l'abri.
 function moves(p,t=C,style=0){const[r,c]=rc(p),[tr,tc]=rc(t),sr=Math.sign(tr-r),sc=Math.sign(tc-c),ar=Math.abs(tr-r),ac=Math.abs(tc-c);
  const row=sr?idx(r+sr,c):-1,col=sc?idx(r,c+sc):-1,diag=sr&&sc?idx(r+sr,c+sc):-1;
  const order=style===2?[diag,ar>=ac?row:col,ar>=ac?col:row]:style===1?[ac>=ar?col:row,diag,ac>=ar?row:col]:[ar>=ac?row:col,diag,ar>=ac?col:row];
  return order.filter((m,k)=>m>=0&&order.indexOf(m)===k)}
 const next=(p,t,style)=>moves(p,t,style)[0];
 // un pas en s'éloignant de la maison (recul)
 function back(p){let[r,c]=rc(p);const dr=r-3,dc=c-3;if(Math.abs(dr)>=Math.abs(dc))r+=Math.sign(dr);else c+=Math.sign(dc);return idx(Math.max(0,Math.min(N-1,r)),Math.max(0,Math.min(N-1,c)))}
 function shuffle(a,rnd=Math.random){for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

 /* ---------- état d'une partie ---------- */
 function newState(ch,pl,rnd=Math.random,pool){const P=PLACES[pl]||PLACES.bois;const st={grid:Array(N*N).fill(null),shelter:P.maxS||MAXS,maxS:P.maxS||MAXS,place:PLACES[pl]?pl:'bois',pool:pool||KEYS.slice(),night:1,event:EVENTS[0],z:[],pending:[],tick:0,zid:0,kills:0,scrap:0,relics:[],upg:{},muts:[],energy:ENERGY,moved:0,side:-1,char:CHARS[ch]?ch:'surv'};
  const r=CHARS[st.char].relic;if(r)st.relics.push(r);
  st.scrap+=P.scrap||0;(P.start||[]).forEach(([t,i])=>{place(st,t,i,rnd,true);st.grid[i].gen=1});return st}
 const maxS=st=>st.maxS||MAXS;
 // les lieux : chacun change la carte de départ et une règle
 const PLACES={
  bois:{n:'La maison des bois',d:'Le lieu d’origine. Ni bonus, ni malus.'},
  ferme:{n:'La ferme',d:'Une rivière protège le nord : la horde arrive par les 3 autres côtés. Deux bottes de paille (barricades) au départ.',sides:[1,2,3],start:[['bar',16],['bar',18]]},
  station:{n:'La station-service',d:'Deux bonbonnes de gaz et 10 ferraille au départ, l’Essence ne coûte rien. Mais la horde est 15 % plus nombreuse.',start:[['gas',10],['gas',38]],scrap:10,free:['fire'],count:1.15},
  mall:{n:'Le centre commercial',d:'Murs épais : l’abri a 15 PV au lieu de 10. Mais les zombies ont 15 % de PV en plus.',maxS:15,hp:1.15}
 };
 // progression entre les parties : ce qui est débloqué selon le record (lieux) et le total de nuits survécues (personnages, cartes)
 const UNLOCK={
  chars:{surv:0,cop:8,farm:20,nurse:35},
  places:{bois:0,ferme:5,station:8,mall:12},
  cards:{}
 };
 function unlocks(meta){const m=meta||{},b=m.best||0,t=m.total||0;
  return{chars:Object.keys(UNLOCK.chars).filter(k=>t>=UNLOCK.chars[k]),places:Object.keys(UNLOCK.places).filter(k=>b>=UNLOCK.places[k]),
   pool:(m.cards&&m.cards.length?m.cards:STARTER_CARDS).filter(k=>U[k])}}
 /* ---------- collection et deck (entre les parties) ----------
    La collection : les types de cartes débloqués, pour toujours. On en débloque avec les points de survie gagnés en fin de partie.
    Le deck : préparé avant la partie, 20 à 30 cartes, avec un nombre limité d'exemplaires selon la rareté. */
 const DECK_MIN=20,DECK_MAX=30,COPY_MAX={com:3,rare:2,epic:1};
 const CARD_PRICE={com:15,rare:35,epic:70};
 const STARTER_CARDS='bar car fen sand gun snp kid axe dog cop med lamp trap fire mine wire spike food rep grenade shot patch'.split(' ');
 const STARTER_DECK=['bar','bar','bar','fen','car','gun','gun','gun','snp','axe','axe','dog','med','trap','trap','mine','food','rep','grenade','grenade'];
 const copyMax=t=>COPY_MAX[RAR[t]||'com'];
 const runPoints=(nights,kills)=>nights*10+Math.floor(kills/4);
 function deckError(deck,owned){if(deck.length<DECK_MIN)return`Il faut au moins ${DECK_MIN} cartes (${deck.length} pour l’instant).`;
  if(deck.length>DECK_MAX)return`${DECK_MAX} cartes au maximum.`;
  const c={};for(const t of deck){c[t]=(c[t]||0)+1;if(owned&&!owned.includes(t))return`${U[t].n} n’est pas dans ta collection.`;if(c[t]>copyMax(t))return`${U[t].n} : ${copyMax(t)} exemplaire(s) au maximum.`}
  return''}
 function newDay(st,rnd,offer){st.night++;st.energy=ENERGY+(st.nextE||0);st.nextE=0;st.moved=0;st.rushT=0;
  if(offer){st.event=EVENTS.find(e=>e.id===offer.event)||EVENTS[0];st.tier=offer.tier}else{st.event=rnd()<.2?EVENTS[0]:EVENTS[1+Math.floor(rnd()*(EVENTS.length-1))];st.tier='base'}}
 const has=(st,t)=>st.grid.some(u=>u&&u.t===t);
 const costOf=(st,t)=>(PLACES[st.place]||{}).free&&PLACES[st.place].free.includes(t)?0:cost(t);
 const canPay=(st,t)=>costOf(st,t)<=(st.energy??ENERGY);
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
 function draftChoices(rnd=Math.random,n=3,pool=KEYS){const out=[];
  while(out.length<n){let r=rnd()*100,rr='com';for(const k in RARITY){if(r<RARITY[k].w){rr=k;break}r-=RARITY[k].w}
   const cand=pool.filter(t=>RAR[t]===rr&&!out.includes(t));if(cand.length)out.push(cand[Math.floor(rnd()*cand.length)]);else if(!pool.some(t=>!out.includes(t)))break}
  return out}
 function pay(st,k){const c=shopCost(st,k);if(st.scrap<c)return false;st.scrap-=c;if(k==='heal')st.shelter=Math.min(maxS(st),st.shelter+3);return true}

 /* ---------- pose des cartes ---------- */
 // déplacer une de ses unités : une fois par jour, vers une case libre où elle pourrait être posée
 function canMove(st,a,b){const u=st.grid[a];return !st.moved&&!!u&&a!==b&&!st.grid[b]&&canPlace(st,u.t,b)}
 function move(st,a,b){if(!canMove(st,a,b))return false;st.grid[b]=st.grid[a];st.grid[a]=null;st.moved=1;return true}
 function canPlace(st,t,i){const D=U[t];if(D.react)return false;
  if(D.onUnit)return !!(st.grid[i]&&U[st.grid[i].t].block&&st.grid[i].hp<maxHp(st,st.grid[i]));
  if(D.instant)return i===C;
  if(isEdge(i)||i===C)return false;
  if(D.near)return cheb(i,C)===1;
  return true}
 function place(st,t,i,rnd=Math.random,free){const D=stat(st,t);if(!free)st.energy=(st.energy??ENERGY)-costOf(st,t);if(D.instant){applyItem(st,t,i,rnd);return}
  const u={t,hp:D.hp};
  if(named(t)){const used=new Set(st.grid.filter(Boolean).map(v=>v.name).concat((st.fallen||[]).map(f=>f.name)));
   const pool=(t==='dog'?DOG_NAMES:NAMES).filter(n=>!used.has(n));const list=pool.length?pool:(t==='dog'?DOG_NAMES:NAMES);
   u.name=list[Math.floor(rnd()*list.length)];
   const tr=Object.keys(TRAITS).filter(k=>(!TRAITS[k].att||D.dmg)&&(!TRAITS[k].far||(D.rng||0)>1));
   u.trait=tr[Math.floor(rnd()*tr.length)];u.kills=0;u.hp=maxHp(st,u)}
  st.grid[i]=u}
 // une unité tombe : un survivant nommé rejoint le mémorial (sauf s'il est Increvable et n'a pas encore utilisé sa chance)
 function lose(st,j,u,ev){if(u.trait==='increvable'&&!u.saved){u.hp=1;u.saved=1;ev.push({i:j,k:'saved',name:u.name});return false}
  st.grid[j]=null;ev.push({i:j,k:'lost',t:u.t,name:u.name});
  if(u.name)(st.fallen=st.fallen||[]).push({name:u.name,t:u.t,trait:u.trait,kills:u.kills||0,night:st.night});return true}
 function applyItem(st,t,i,rnd){const D=stat(st,t);
  if(t==='food')st.shelter=Math.min(maxS(st),st.shelter+D.gain);
  if(t==='rep')st.grid.forEach(u=>{if(u&&U[u.t].block)u.hp=Math.min(maxHp(st,u),u.hp+D.gain)});
  if(t==='kit'&&st.grid[i])st.grid[i].hp=maxHp(st,st.grid[i]);
  if(t==='coffee')st.energy+=2;
  if(t==='flare')st.side=Math.floor(rnd()*4)}

 /* ---------- la nuit ---------- */
 function waveList(st){const e=st.event.id,w={};
  for(const k of ZK){let v=waveCount(k,st.night);if(k!=='boss'){if(e==='lune')v*=1.5;v=Math.round(v*(1+.2*mc(st,'nombre'))*((PLACES[st.place]||{}).count||1)*((TIERS[st.tier]||TIERS.base).count))}w[k]=v}
  if(e==='sprint'){w.run+=w.walk;w.walk=0}
  return w}
 function spawn(st,k,pos){const T=ZT[k],hp=Math.round(T.hp*hpMult(st.night)*(1+.2*mc(st,'peau'))*((PLACES[st.place]||{}).hp||1));const z={id:++st.zid,k,pos,hp,max:hp,cd:zspd(st,k),style:st.zid%3};st.z.push(z);st.spawned=(st.spawned||0)+1;return z}
 function startNight(st,rnd){const w=waveList(st),list=[];st.grid.forEach(u=>{if(u)u.nk=0});
  for(const k of ZK)if(k!=='boss')for(let j=0;j<w[k];j++)list.push(k);
  shuffle(list,rnd);
  const ps=(PLACES[st.place]||{}).sides,edges=st.side>=0?EDGES.filter(i=>sideOf(i)===st.side):ps?EDGES.filter(i=>ps.includes(sideOf(i))&&!(ps.indexOf(0)<0&&rc(i)[0]===0)):EDGES;
  st.pending=list.map((k,j)=>({k,at:1+Math.floor(j*1.3),pos:edges[Math.floor(rnd()*edges.length)]}));
  for(let j=0;j<w.boss;j++)st.pending.push({k:'boss',at:10+j*12,pos:edges[Math.floor(rnd()*edges.length)]});
  st.cap=Math.max(90,st.pending.reduce((m,p)=>Math.max(m,p.at),0)+60);
  st.z=[];st.tick=0}
 const power=st=>st.event.id!=='coupure'||st.relics.includes('groupe')||has(st,'solar');
 const lampB=(st,i,pow)=>pow?around(i).reduce((s,j)=>s+(st.grid[j]&&st.grid[j].t==='lamp'?stat(st,'lamp').buff:0),0):0;
 function hit(st,z,d,ev,src,fire){if(!fire){const a=(ZT[z.k].armor||0)+(mc(st,'carapace')&&z.k==='walk'?1:0);if(a)d=Math.max(0,d-a)}const was=z.hp;z.hp-=d;ev.push({i:z.pos,txt:d?'−'+d:'0',k:'hit',zid:z.id,src});return was>0&&z.hp<=0}
 function explode(st,i,d,ev){st.z.filter(o=>o.hp>0&&cheb(o.pos,i)<=1).forEach(o=>hit(st,o,d,ev,i,1));ev.push({i,k:'boom'})}
 function lureTarget(st,p){let best=C,bd=99;for(let j=0;j<st.grid.length;j++){const u=st.grid[j];if(!u||u.t!=='siren')continue;const d=cheb(p,j);if(d<=U.siren.lure&&d<bd){bd=d;best=j}}return best}
 function attack(st,i,u,D,rng,dmg,ev){
  const inR=()=>st.z.filter(z=>z.hp>0&&cheb(z.pos,i)<=rng);
  const got=k=>{if(k){u.kills=(u.kills||0)+1;u.nk=(u.nk||0)+1}};
  if(D.aoe){const ts=inR();if(ts.length){ts.forEach(z=>got(hit(st,z,dmg,ev,i)));ev.push({i,k:'fire'})}return}
  if(D.molo){const ts=inR();if(!ts.length)return;let best=null,bc=-1;
   for(const z of ts){const c=st.z.filter(o=>o.hp>0&&cheb(o.pos,z.pos)<=1).length;if(c>bc){bc=c;best=z}}
   const at=best.pos;ev.push({i,k:'fire'},{i:at,k:'molo',src:i});
   st.z.filter(o=>o.hp>0&&cheb(o.pos,at)<=1).forEach(o=>{got(hit(st,o,dmg,ev,i,1));o.burnT=Math.max(o.burnT||0,2)});return}
  const done=new Set();
  for(let h=0;h<(D.hits||1);h++){let ts=inR();if(D.distinct)ts=ts.filter(z=>!done.has(z.id));if(!ts.length)break;
   ts.sort((a,b)=>cheb(a.pos,C)-cheb(b.pos,C)||a.hp-b.hp);const z=ts[0];done.add(z.id);
   const killed=hit(st,z,dmg,ev,i);ev.push({i,k:'fire'});got(killed);
   if(D.ignite&&z.hp>0)z.burnT=Math.max(z.burnT||0,D.ignite);
   if(D.push&&z.hp>0&&!ZT[z.k].boss){const b=back(z.pos),bu=st.grid[b];if(!(bu&&U[bu.t].block))z.pos=b}
   if((D.feed||(D.cat==='melee'&&(st._fl||{}).pack>=2))&&killed)u.hp=Math.min(maxHp(st,u),u.hp+1)}
 }
 // un zombie frappe une unité qui bloque (au contact, ou à distance pour le cracheur)
 function strike(st,z,n,u,ev,ranged,pow){if(!z.reach){z.reach=1;st.reached=(st.reached||0)+1}const T=ZT[z.k],D=stat(st,u.t);let d=T.boss?u.hp:zdmg(st,z.k);if(D.cap&&!T.boss)d=Math.min(d,D.cap);
  u.hp-=d;ev.push({i:n,txt:'−'+d,k:ranged?'spit':'bite',zid:z.id,from:z.pos});
  if(!ranged&&u.t==='fen'&&pow){const el=(st._fl||{}).elec||0;hit(st,z,((st.relics.includes('groupe')||has(st,'solar'))?2:1)+(el?1:0),ev,n);if(el>=2)z.cd+=1}
  if(D.gas){st.grid[n]=null;explode(st,n,D.gas,ev);return}
  if(u.hp<=0&&lose(st,n,u,ev)&&D.tire)st.grid[n]={t:'fire',hp:1,gen:1}}
 // un zombie entre sur une case sans obstacle
 function enter(st,z,n,u,ev){if(!u||U[u.t].block)return;const D=stat(st,u.t),tb=[0,2,4][(st._fl||{}).trap||0];
  if(D.trap){hit(st,z,D.trap+tb,ev,n);st.grid[n]=null}
  if(D.mine){st.grid[n]=null;explode(st,n,D.mine+tb,ev)}
  if(D.spike){hit(st,z,D.spike+tb,ev,n);u.hp--;if(u.hp<=0)st.grid[n]=null}
  if(D.wire){hit(st,z,D.wire+tb,ev,n);z.cd+=ZT[z.k].spd}
  if(D.smoke){st.z.filter(o=>o.hp>0&&cheb(o.pos,n)<=1).forEach(o=>o.cd+=D.smoke);ev.push({i:n,k:'smoke'});st.grid[n]=null}
  if(D.bait){z.cd+=D.bait;ev.push({i:n,k:'eat',zid:z.id});u.hp--;if(u.hp<=0)st.grid[n]=null}}
 function step(st){const ev=[];st.tick++;const e=st.event.id,pow=power(st),fl=st._fl=famLevels(st);if(st.rushT>0)st.rushT--;
  st.pending=st.pending.filter(p=>{if(p.at<=st.tick){spawn(st,p.k,p.pos);return false}return true});
  const alive=()=>st.z.filter(z=>z.hp>0);
  for(const z of alive()){z.inFire=0}
  for(const z of alive())if(z.burnT>0){z.burnT--;hit(st,z,1+(fl.fire?1:0),ev,-1,1)}
  if(mc(st,'regen')&&st.tick%3===0)for(const z of alive())if(z.hp<z.max)z.hp++;
  for(let i=0;i<st.grid.length;i++){const u=st.grid[i];if(!u)continue;const D=stat(st,u.t);
   if(D.rng&&st.tick%D.every===0&&!(D.jam&&st.tick%D.jam===0)){
    const reps=1+(st.tick%3===0&&around(i).some(j=>st.grid[j]&&st.grid[j].t==='lead')?1:0)+(st.rushT>0?1:0);
    const rng=Math.max(1,D.rng-(e==='brume'&&D.cat==='shoot'?1:0)+((TRAITS[u.trait]||{}).rngB||0)+(D.cat==='shoot'&&fl.guns?1:0)),dmg=D.dmg+lampB(st,i,pow)+unitDmg(u)+(D.cat==='shoot'&&fl.guns>=2?1:0)+(D.cat==='melee'&&fl.pack?1:0);
    for(let r=0;r<reps;r++)attack(st,i,u,D,rng,dmg,ev)}
   if(D.heal&&st.tick%2===0){const ns=around(i).map(j=>st.grid[j]).filter(v=>v&&U[v.t].block&&v.hp<maxHp(st,v));if(ns.length){ns.sort((a,b)=>(a.hp-maxHp(st,a))-(b.hp-maxHp(st,b)));ns[0].hp=Math.min(maxHp(st,ns[0]),ns[0].hp+D.heal);ev.push({i,k:'heal'})}}
   if(D.mech){const ns=around(i).filter(j=>st.grid[j]&&U[st.grid[j].t].cat==='wall'&&st.grid[j].hp<maxHp(st,st.grid[j]));if(ns.length){st.grid[ns[0]].hp++;ev.push({i:ns[0],k:'heal'})}}
   if(D.burn&&e!=='pluie')alive().filter(z=>z.pos===i).forEach(z=>{z.inFire=1;hit(st,z,D.burn+(fl.fire?1:0),ev,i,1)});
   if(D.dyn&&st.tick===8){st.grid[i]=null;explode(st,i,D.dyn,ev)}
  }
  for(const z of st.z){if(z.hp<=0)continue;z.cd--;if(z.cd>0)continue;const T=ZT[z.k],dm=zdmg(st,z.k);z.cd=zspd(st,z.k);
   const tgt=lureTarget(st,z.pos),ms=moves(z.pos,tgt,z.style),blocks=j=>{const v=st.grid[j];return !!(v&&U[v.t].block&&!(T.crawl&&U[v.t].cat==='wall'))};
   // contournement : si le pas préféré est bloqué, le zombie prend un autre pas libre (le Colosse fonce toujours tout droit)
   let n=ms[0];if(n!==C&&blocks(n)&&!T.boss){const alt=ms.find(j=>j===C||!blocks(j));if(alt!==undefined)n=alt}
   if(n===C){if(!z.reach){z.reach=1;st.reached=(st.reached||0)+1}st.shelter-=dm;ev.push({i:C,txt:'−'+dm,k:'bite',zid:z.id});if(!T.boss){z.hp=0;z.bit=1}continue}
   const u=st.grid[n];
   if(u&&U[u.t].block&&!(T.crawl&&U[u.t].cat==='wall')){strike(st,z,n,u,ev,false,pow);continue}
   if(T.spit){const n2=next(n,tgt,z.style);
    if(n2===C){if(!z.reach){z.reach=1;st.reached=(st.reached||0)+1}st.shelter-=dm;ev.push({i:C,txt:'−'+dm,k:'spit',zid:z.id,from:z.pos});continue}
    const u2=st.grid[n2];if(u2&&U[u2.t].block){strike(st,z,n2,u2,ev,true,pow);continue}}
   z.pos=n;enter(st,z,n,u,ev)
  }
  for(const z of st.z)if(z.hp<=0&&!z.dead){z.dead=1;if(!z.bit){const T=ZT[z.k];st.kills++;st.scrap+=T.boss?15:1;
   if(fl.fire>=2&&(z.burnT>0||z.inFire)){st.z.filter(o=>o.hp>0&&o!==z&&cheb(o.pos,z.pos)<=1).forEach(o=>hit(st,o,2,ev,-1,1));ev.push({i:z.pos,k:'boom'})}
   if(mc(st,'putride'))around(z.pos).forEach(j=>{const u=st.grid[j];if(u&&U[u.t].block){u.hp--;ev.push({i:j,txt:'−1',k:'bite',zid:z.id});if(u.hp<=0)lose(st,j,u,ev)}});
   if(T.howl){ev.push({i:z.pos,k:'howl'});for(let k=0;k<T.howl;k++)spawn(st,'walk',z.pos)}}}
  st.z=st.z.filter(z=>z.hp>0);
  const boss=st.z.some(z=>ZT[z.k].boss)||st.pending.some(p=>p.k==='boss');
  const done=(!st.pending.length&&!st.z.length)||st.shelter<=0||st.tick>(st.cap||90)+(boss?110:0);
  return{ev,done};
 }
 // l'aube : l'essence s'éteint, les soins et la ferraille de l'aube s'appliquent
 function endNight(st){st.grid.forEach((u,i)=>{if(u&&u.t==='fire')st.grid[i]=null;else if(u&&u.trait==='coriace'&&u.hp>0)u.hp=Math.min(maxHp(st,u),u.hp+1)});st.z=[];st.side=-1;
  if(st.shelter<=0)return{heal:0,scrap:0};
  const fl=famLevels(st),T=TIERS[st.tier]||TIERS.base;
  const h=st.grid.filter(u=>u&&u.t==='cook').length+(st.relics.includes('soupe')?1:0)+(fl.comm?1:0),before=st.shelter;
  st.shelter=Math.min(maxS(st),st.shelter+h);if(fl.comm>=2)st.grid.forEach(u=>{if(u&&U[u.t].block)u.hp=Math.min(maxHp(st,u),u.hp+1)});
  const s=(st.relics.includes('aimant')?3:0)+(T.scrap||0);st.scrap+=s;
  return{heal:st.shelter-before,scrap:s,card:T.card||null,relic:!!T.relic,tier:st.tier||'base'}}
 // réactions pendant la nuit
 function canReact(st,t,i){const D=U[t];if(!D||!D.react||!canPay(st,t))return false;
  if(D.react==='unit')return !!(st.grid[i]&&U[st.grid[i].t].block&&st.grid[i].hp<maxHp(st,st.grid[i]));return D.react==='any'||(i>=0&&i<N*N)}
 function react(st,t,i){if(!canReact(st,t,i))return null;const ev=[];st.energy-=costOf(st,t);const al=()=>st.z.filter(z=>z.hp>0);
  if(t==='grenade')explode(st,i,5,ev);
  if(t==='shot'){const z=al().sort((a,b)=>cheb(a.pos,C)-cheb(b.pos,C)||a.hp-b.hp)[0];if(z){hit(st,z,6,ev,-1,1);ev.push({i:C,k:'shot',zid:z.id})}}
  if(t==='patch'){const u=st.grid[i];u.hp=Math.min(maxHp(st,u),u.hp+5);ev.push({i,k:'heal'})}
  if(t==='molotov'){al().filter(z=>cheb(z.pos,i)<=1).forEach(z=>{hit(st,z,2,ev,-1,1);z.burnT=Math.max(z.burnT||0,4)});ev.push({i,k:'molo',src:C})}
  if(t==='horn'){al().forEach(z=>{if(ZT[z.k].boss)return;const b=back(z.pos),bu=st.grid[b];if(!(bu&&U[bu.t].block))z.pos=b});ev.push({i:C,k:'horn'})}
  if(t==='rush'){st.rushT=3;ev.push({i:C,k:'rush'})}
  for(const z of st.z)if(z.hp<=0&&!z.dead){z.dead=1;st.kills++;st.scrap+=ZT[z.k].boss?15:1}
  st.z=st.z.filter(z=>z.hp>0);return ev}
 function runNight(st,rnd){startNight(st,rnd);let r;do{r=step(st)}while(!r.done)}
 return{N,C,MAXS,maxS,PLACES,UNLOCK,unlocks,costOf,DECK_MIN,DECK_MAX,COPY_MAX,CARD_PRICE,STARTER_CARDS,STARTER_DECK,copyMax,runPoints,deckError,U,KEYS,ZT,ZK,EVENTS,RELICS,relicNight,MUTS,mutNight,mutate,zspd,mc,CHARS,SHOP,shopCost,RARITY,RAR,waveCount,SIDES,UPGRADABLE,get HPS(){return HPS},set HPS(v){HPS=v},hpMult,get WAVES(){return WAVES},set WAVES(v){WAVES=v},get GROW(){return GROW},set GROW(v){GROW=v},
  DAWN,dawnEvent,resolveDawn,rc,isEdge,INNER,EDGES,around,cheb,newState,newDay,waveList,stat,upgDesc,upgrade,addRelic,relicChoices,draftChoices,shuffle,pay,touch,canPlace,place,startNight,step,endNight,runNight,drawCount,FAM,famOf,famCounts,famLevels,TIERS,nightOffers,nightChoice,canReact,react,TRAITS,named,maxHp,ENERGY,HAND_MAX,cost,canPay,canMove,move};
})();
if(typeof module!=='undefined')module.exports=Z;
