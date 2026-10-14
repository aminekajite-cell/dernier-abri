// Simulation d'équilibrage (survie sans fin) : un bot joue G parties en choisissant à chaque pose
// la carte et la case qui maximisent le résultat de la nuit (avec une graine différente de la vraie nuit).
// Il part avec le deck du survivant, et à chaque aube choisit comme un joueur la carte qui l'aide le plus
// (il teste chacune des 3 sur la nuit suivante ; elle arrive dans sa main du lendemain). La horde mute toutes les 3 nuits.
// une relique au hasard toutes les 5 nuits, et dépense sa ferraille (réparer si l'abri est bas, sinon améliorer).
// Il joue jusqu'à la chute de l'abri (au plus MAXN nuits) : on mesure la nuit où il tombe.
// Usage : node tools/simulate.js [vagues_json] [poses_par_jour=2] [parties=150] [hausse_pv_par_nuit=0.1] [personnage=surv]
// Cible actuelle : le bot tombe en moyenne vers la nuit 8-9, environ 5 % au-delà de la nuit 15 (un humain fait moins bien).
// HASARD=1 node tools/simulate.js : le bot choisit ses cartes de l'aube au hasard.
const Z=require('../src/engine.js');
if(process.argv[2])Z.WAVES=JSON.parse(process.argv[2]);
if(process.argv[5])Z.HPS=+process.argv[5];
const MAXN=40,BONUS=+(process.argv[3]||2)-2,G=+(process.argv[4]||150),CH=process.argv[6]||'surv';
const mk=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const sh=a=>Z.shuffle(a);
const clone=o=>JSON.parse(JSON.stringify(o));
const score=st=>st.shelter*10+st.grid.reduce((s,u)=>s+(u?u.hp:0),0);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const SMART=process.env.HASARD?0:1;
function bestCard(st,choices){const seed=1+Math.floor(Math.random()*1e9);let best=null;
 for(const t of choices){if(t==='roadmap')continue;const c0=clone(st);Z.newDay(c0,()=>.1);let bv=-1e9;
  for(let i=0;i<Z.N*Z.N;i++){if(!Z.canPlace(c0,t,i))continue;const c=clone(c0);Z.place(c,t,i,mk(seed));Z.runNight(c,mk(seed));bv=Math.max(bv,score(c))}
  if(!best||bv>best.v)best={t,v:bv}}
 return best?best.t:choices[0]}
function game(){
 const st=Z.newState(CH);let draw=sh([...Z.CHARS[CH].deck]),disc=[],nextCard=null;
 for(;;){
  const hand=[];if(nextCard){hand.push(nextCard);nextCard=null}
  const n=Z.drawCount(st);while(hand.length<n){if(!draw.length){draw=sh(disc);disc=[]}if(!draw.length)break;hand.push(draw.pop())}
  const seed=1+Math.floor(Math.random()*1e9);
  for(let p=0;p<Z.playsPerDay(st)+BONUS&&hand.length;p++){let best=null;
   for(let h=0;h<hand.length;h++){const t=hand[h];if(t==='roadmap')continue;
    for(let i=0;i<Z.N*Z.N;i++){if(!Z.canPlace(st,t,i))continue;const c=clone(st);Z.place(c,t,i,mk(seed));Z.runNight(c,mk(seed));const v=score(c);if(!best||v>best.v)best={v,h,i}}}
   if(!best)break;
   Z.place(st,hand[best.h],best.i);disc.push(hand[best.h]);hand.splice(best.h,1)}
  disc.push(...hand);
  Z.runNight(st,mk(1+Math.floor(Math.random()*1e9)));Z.endNight(st);
  if(st.shelter<=0||st.night>=MAXN)return st.night;
  if(Z.mutNight(st.night))Z.mutate(st);
  if(Z.relicNight(st.night)){const r=Z.relicChoices(st);if(r.length)Z.addRelic(st,pick(r))}
  {const ch=Z.draftChoices();nextCard=SMART?bestCard(st,ch):pick(ch)}
  for(;;){
   if(st.shelter<=5&&Z.pay(st,'heal'))continue;
   const deck=[...new Set([...draw,...disc])].filter(t=>Z.UPGRADABLE.includes(t)&&!st.upg[t]);
   if(deck.length&&st.scrap>=Z.shopCost(st,'upgrade')){Z.pay(st,'upgrade');Z.upgrade(st,pick(deck));continue}
   break}
  Z.newDay(st,Math.random);
 }
}
const R=[];for(let k=0;k<G;k++)R.push(game());R.sort((a,b)=>a-b);
const pct=n=>(R.filter(r=>r>=n).length/G*100).toFixed(0)+'%';
console.log('Nuit de la chute : moyenne',(R.reduce((a,b)=>a+b,0)/G).toFixed(1),'· médiane',R[G>>1],'· atteint la nuit 5 :',pct(5),'· nuit 10 :',pct(10),'· nuit 15 :',pct(15),'· nuit 20 :',pct(20));
