// Tests du moteur (Node, sans navigateur) : intégrité des données, pose de chaque carte, règles clés,
// et des centaines de nuits aléatoires qui ne doivent jamais planter ni produire de valeurs absurdes.
// Usage : node tools/test-engine.js   (code de sortie 1 si un test échoue)
const path=require('path'),fs=require('fs');
const Z=require(path.join(__dirname,'../src/engine.js'));
const ROOT=path.join(__dirname,'..');
let pass=0,fail=0;const fails=[];
function check(name,fn){try{const r=fn();if(r===false)throw new Error('faux');pass++}catch(e){fail++;fails.push(name+' : '+e.message)}}
const eq=(a,b,m)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw new Error((m||'')+` attendu ${JSON.stringify(b)}, obtenu ${JSON.stringify(a)}`)};
const ok=(c,m)=>{if(!c)throw new Error(m||'condition fausse')};
// petit générateur pseudo-aléatoire reproductible
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return((s>>>0)%1e9)/1e9}}
const fin=x=>typeof x==='number'&&Number.isFinite(x);
const KEYS=Object.keys(Z.U),PLAY=KEYS.filter(t=>!Z.U[t].evo);
const fresh=()=>{const st=Z.newState('surv','bois',rng(7));st.grid.fill(null);st.energy=99;return st};
const freeCells=st=>[...Array(Z.N*Z.N).keys()].filter(i=>!st.grid[i]&&!Z.isEdge(i)&&i!==Z.C);

/* ---------- 1. intégrité des données ---------- */
for(const t of KEYS){const D=Z.U[t];
 check(`carte ${t} : nom, type et texte`,()=>ok(D.n&&D.cat&&D.d,'champ manquant'));
 if(!D.evo)check(`carte ${t} : coût entre 0 et 3`,()=>{const c=Z.cost(t);ok(fin(c)&&c>=0&&c<=3,'coût '+c)});
 if(D.block)check(`carte ${t} : PV positifs`,()=>ok(fin(D.hp)&&D.hp>0,'PV '+D.hp));
 if(D.dmg!=null)check(`carte ${t} : dégâts et portée valides`,()=>ok(fin(D.dmg)&&D.dmg>=0&&(D.rng==null||D.rng>=1),'dmg '+D.dmg+' rng '+D.rng));
 check(`carte ${t} : illustration présente`,()=>ok(fs.existsSync(path.join(ROOT,'assets/cards',t+'.webp')),'assets/cards/'+t+'.webp manquant'));
}
for(const k of Object.keys(Z.ZT)){const T=Z.ZT[k];check(`zombie ${k} : stats valides`,()=>ok(T.n&&fin(T.hp)&&T.hp>0&&fin(T.dmg)&&fin(T.spd)&&T.spd>=1))}
for(const f of Object.keys(Z.FAM))check(`faction ${f} : cartes existantes, 3 paliers`,()=>{Z.FAM[f].cards.forEach(t=>ok(Z.U[t],t+' inconnue'));eq(Z.FAM[f].lv.length,3);eq(Z.FAM[f].d.length,3)});
for(const k of Z.EVO_KEYS)check(`évolution ${k} : recette valide`,()=>Z.EVO[k].forEach(t=>ok(Z.U[t],t+' inconnue')));
check('deck de départ valide',()=>eq(Z.deckError(Z.STARTER_DECK,Z.STARTER_CARDS),''));
check('les 4 routes sont au bord, hors forêt',()=>Z.ROADS.forEach(i=>ok(Z.isEdge(i)&&!Z.isForest(i))));

/* ---------- 2. pose de chaque carte ---------- */
for(const t of PLAY){const D=Z.U[t];if(D.react)continue;
 check(`pose de ${t}`,()=>{const st=fresh();st.grid[2*9+4]={t:'gun',hp:1};
  const i=D.onUnit?2*9+4:D.instant?Z.C:freeCells(st).find(j=>Z.canPlace(st,t,j));ok(i!=null,'aucune case valide');
  ok(Z.canPlace(st,t,i),'canPlace refuse');const e0=st.energy;Z.place(st,t,i,rng(3));
  ok(t==='coffee'||st.energy<=e0,'énergie augmentée');if(!D.instant){const u=st.grid[i];ok(u,'rien sur la case');if(D.block)ok(fin(u.hp)&&u.hp>0,'PV '+u.hp)}})}
for(const t of PLAY.filter(t=>Z.U[t].react))
 check(`réaction ${t}`,()=>{const st=fresh();st.grid[3*9+4]={t:'gun',hp:1};Z.startNight(st,rng(5));for(let k=0;k<6;k++)Z.step(st);
  const i=Z.U[t].react==='unit'?3*9+4:2*9+4;if(!Z.canReact(st,t,i))return;Z.react(st,t,i);st.z.forEach(z=>ok(fin(z.hp),'PV zombie '+z.hp))});

/* ---------- 3. règles clés ---------- */
check('murs reliés : +1 PV par voisin (8, 9, 8)',()=>{const st=fresh();[3,4,5].forEach(c=>Z.place(st,'bar',9+c,rng(1),true));eq([3,4,5].map(c=>st.grid[9+c].hp),[8,9,8])});
check('carte à tracer : 4 cases puis plus rien',()=>{const st=fresh();Z.placeLine(st,'bar',[10,11,12,13],rng(1));eq(Z.charges(st,'bar',true),0)});
check('pneus : 3 cases par carte',()=>eq(Z.chargesOf('tire'),3));
check('niveaux : 20, 45, 75, 110',()=>eq([1,2,3,4].map(Z.lvKills),[20,45,75,110]));
check('mutations plafonnées (Carapace 3, Pas pressés 2)',()=>{const st=fresh();const r=rng(11);for(let k=0;k<200;k++)Z.mutate(st,r);ok(Z.mc(st,'carapace')<=3&&Z.mc(st,'frenesie')<=2)});
check('PV zombies : linéaires, pas d’explosion',()=>{const a=Z.hpMult(20)-Z.hpMult(10),b=Z.hpMult(100)-Z.hpMult(90);ok(Math.abs(a-b)<1e-9,'croissance non linéaire')});
check('nuit de pression : plus de zombies que la nuit d’avant',()=>{const st=fresh();st.night=15;const a=Z.waveList(st).walk;st.night=14;ok(a>Z.waveList(st).walk)});
check('Communauté palier 2 : 1re carte moins chère une seule fois',()=>{const st=fresh();st.energy=10;['vigile','teacher','market','carp','lead','monk'].forEach((t,k)=>st.grid[2*9+1+k]={t,hp:3});
 const c1=Z.costOf(st,'gun');Z.place(st,'gun',6*9+4,rng(2));ok(Z.costOf(st,'gun')===c1+1,'remise appliquée deux fois')});

check('limite de 5 unités, murs et pièges illimités',()=>{const st=fresh();['gun','axe','med','snp','dog'].forEach((t,k)=>Z.place(st,t,2*9+2+k,rng(1)));
 eq(Z.unitCount(st),5);ok(!Z.canPlace(st,'cop',6*9+4),'6ᵉ unité acceptée');ok(Z.canPlace(st,'bar',6*9+4),'mur refusé');ok(Z.canPlace(st,'trap',6*9+4),'piège refusé')});
check('limite : +1 toutes les 10 nuits',()=>{const st=fresh();st.night=9;eq(Z.unitCap(st),5);st.night=10;eq(Z.unitCap(st),6);st.night=25;eq(Z.unitCap(st),7)});
check('limite : une pose qui fusionne reste permise',()=>{const st=fresh();['gun','gun','axe','med','snp'].forEach((t,k)=>Z.place(st,t,2*9+1+k*2,rng(1)));
 ok(Z.canPlace(st,'gun',6*9+4),'fusion refusée');Z.place(st,'gun',6*9+4,rng(1));eq(Z.unitCount(st),4)});
check('rappel : l’unité garde tout et se repose gratuitement',()=>{const st=fresh();Z.place(st,'gun',2*9+4,rng(1));const u=st.grid[2*9+4];u.kills=30;u.lvA=1;u.gold=1;
 ok(Z.recall(st,2*9+4));eq(Z.unitCount(st),0);eq(st.bench.length,1);const e=st.energy;ok(Z.placeBench(st,0,6*9+4));const v=st.grid[6*9+4];
 ok(v===u&&v.kills===30&&v.lvA===1&&v.gold===1,'unité modifiée');eq(st.energy,e);eq(st.bench.length,0)});
check('rappel : les murs ne se rappellent pas',()=>{const st=fresh();Z.place(st,'bar',2*9+4,rng(1),true);ok(!Z.canRecall(st,2*9+4))});
check('déplacement libre, plusieurs fois par jour, murs compris',()=>{const st=fresh();Z.place(st,'gun',2*9+4,rng(1));Z.place(st,'bar',3*9+3,rng(1),true);
 ok(Z.move(st,2*9+4,2*9+5));ok(Z.move(st,2*9+5,2*9+6));ok(Z.move(st,3*9+3,6*9+3),'mur non déplacé')});
check('déplacement à la limite d’unités permis',()=>{const st=fresh();['gun','axe','med','snp','dog'].forEach((t,k)=>Z.place(st,t,2*9+2+k,rng(1)));ok(Z.move(st,2*9+2,6*9+2))});
check('mur déplacé : bonus de liaison recalculé',()=>{const st=fresh();[3,4].forEach(c=>Z.place(st,'bar',9+c,rng(1),true));eq(st.grid[13].hp,8);Z.move(st,13,6*9+6);eq(st.grid[6*9+6].hp,7);eq(st.grid[12].hp,7)});
check('factions : paliers à 2, 3 et 5 unités ; murs et pièges ne comptent pas',()=>{const st=fresh();eq(Z.FAM.mil.lv,[2,3,5]);
 st.grid[10]={t:'mine',hp:1};st.grid[11]={t:'sentry',hp:3};eq(Z.famLevels(st).mil,0);st.grid[12]={t:'snp',hp:3};eq(Z.famLevels(st).mil,1)});
check('équipe complète : +2 PV',()=>{const st=fresh();['snp','mg','sht','mortar'].forEach((t,k)=>st.grid[10+k]={t,hp:3});const u={t:'snp',hp:3};const a=Z.maxHp(st,u);st.grid[20]=u;eq(Z.maxHp(st,u),a+2)});
check('frénésie : +12 % de PV par nuit dès la nuit 4, +1 dégât toutes les 10 nuits',()=>{ok(Math.abs(Z.hpMult(4)-1.12)<1e-9);eq(Z.dmgBonus(10),1);eq(Z.dmgBonus(9),0)});

check('zombie dans la forêt : intouchable',()=>{const st=fresh();st.grid[1*9+4]={t:'gun',hp:3};Z.startNight(st,rng(5));st.pending=[];
 st.z=[{id:1,k:'walk',pos:4,hp:5,max:5,cd:99}];for(let k=0;k<3;k++)Z.step(st);eq(st.z[0].hp,5)});

/* ---------- 4. nuits aléatoires ---------- */
const PLACE=PLAY.filter(t=>!Z.U[t].react&&!Z.U[t].instant&&!Z.U[t].onUnit);
const NIGHTS=+process.env.NIGHTS||300;let maxZ=0,slow=0,worst=0;
for(let g=0;g<NIGHTS;g++){const r=rng(1000+g);
 check(`nuit aléatoire n°${g}`,()=>{const st=Z.newState('surv',['bois','ferme','station','centre'][g%4]||'bois',r);st.night=1+Math.floor(r()*60);
  for(let k=0;k<Math.floor(st.night/5);k++)Z.mutate(st,r);
  const n=4+Math.floor(r()*20);for(let k=0;k<n;k++){const t=PLACE[Math.floor(r()*PLACE.length)],cs=freeCells(st).filter(j=>Z.canPlace(st,t,j));if(cs.length)Z.place(st,t,cs[Math.floor(r()*cs.length)],r,true)}
  if(r()<.5){const e=Z.EVENTS[Math.floor(r()*Z.EVENTS.length)];st.event=e}
  // une nuit sur deux, abri indestructible : la nuit va jusqu'au bout, même avec une grosse horde
  if(g%2)st.shelter=st.maxS=1e6;
  const t0=Date.now();Z.startNight(st,r);let res,ticks=0;
  do{res=Z.step(st);ticks++;if(res.pause)Z.nextWave(st);
   for(const z of st.z){if(z.hp<=0)continue;ok(fin(z.hp)&&fin(z.pos),'zombie invalide');ok(!Z.isForest(z.pos),`zombie ${z.k} dans la forêt (case ${z.pos})`)}
   ok(ticks<3000,'la nuit ne se termine pas')}while(!res.done);
  maxZ=Math.max(maxZ,st.spawned||0);const ms=Date.now()-t0;worst=Math.max(worst,ms);if(ms>2000)slow++;
  ok(fin(st.shelter),'PV abri '+st.shelter);st.grid.forEach(u=>{if(u&&Z.U[u.t].block)ok(fin(u.hp),u.t+' PV '+u.hp)});
  Z.endNight(st)})}
check('aucune nuit de plus de 2 s',()=>ok(slow===0,slow+' nuit(s) lente(s), pire '+worst+' ms'));

console.log(`Moteur : ${pass} tests réussis, ${fail} échoué(s). Nuits aléatoires : ${NIGHTS} (jusqu’à ${maxZ} zombies, la plus lente ${worst} ms).`);
if(fail){console.log(fails.slice(0,40).map(f=>'  ✗ '+f).join('\n'));process.exitCode=1}
