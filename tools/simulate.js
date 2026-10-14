// Simulation d'équilibrage : un bot joue G parties en choisissant à chaque pose
// la carte et la case qui maximisent le résultat de la nuit (avec une graine différente de la vraie nuit).
// Il part avec le deck du survivant, prend une carte au hasard à chaque aube (elle arrive dans sa main du lendemain),
// une relique au hasard aux nuits prévues, et dépense sa ferraille (réparer si l'abri est bas, sinon améliorer).
// Usage : node tools/simulate.js [vagues_json] [poses_par_jour=2] [parties=150] [hausse_pv_par_nuit=0.1] [personnage=surv]
// Cible actuelle : environ 45-50 % de victoires pour le bot (un humain fait moins bien).
const Z=require('../src/engine.js');
if(process.argv[2])Z.WAVES=JSON.parse(process.argv[2]);
if(process.argv[5])Z.HPS=+process.argv[5];
const BONUS=+(process.argv[3]||2)-2,G=+(process.argv[4]||150),CH=process.argv[6]||'surv';
const mk=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const sh=a=>Z.shuffle(a);
const clone=o=>JSON.parse(JSON.stringify(o));
const score=st=>st.shelter*10+st.grid.reduce((s,u)=>s+(u?u.hp:0),0);
const pick=a=>a[Math.floor(Math.random()*a.length)];
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
  if(st.shelter<=0)return st.night;
  if(st.night>=10)return 11;
  if(Z.RELIC_NIGHTS.includes(st.night)){const r=Z.relicChoices(st);if(r.length)Z.addRelic(st,pick(r))}
  nextCard=pick(Z.draftChoices());
  for(;;){
   if(st.shelter<=6&&Z.pay(st,'heal'))continue;
   const deck=[...new Set([...draw,...disc])].filter(t=>Z.UPGRADABLE.includes(t)&&!st.upg[t]);
   if(deck.length&&st.scrap>=Z.SHOP.upgrade.cost){Z.pay(st,'upgrade');Z.upgrade(st,pick(deck));continue}
   break}
  Z.newDay(st,Math.random);
 }
}
let w=0,s=0;for(let k=0;k<G;k++){const r=game();if(r===11)w++;s+=Math.min(r,10)}
console.log('Victoires',(w/G*100).toFixed(0)+'%','Nuit moyenne atteinte',(s/G).toFixed(1));
