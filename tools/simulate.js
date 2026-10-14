// Simulation d'équilibrage : un bot joue G parties en choisissant à chaque pose
// la carte et la case qui maximisent le résultat de la nuit (avec une graine différente de la vraie nuit).
// Usage : node tools/simulate.js [vagues_json] [poses_par_jour=2] [parties=150] [hausse_pv_par_nuit=0.1]
// Cible actuelle : environ 45-50 % de victoires pour le bot (un humain fait moins bien).
const Z=require('../src/engine.js');
if(process.argv[2])Z.WAVES=JSON.parse(process.argv[2]);
if(process.argv[5])Z.HPS=+process.argv[5];
const PLAYS=+(process.argv[3]||2),G=+(process.argv[4]||150);
const mk=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const sh=(a,r=Math.random)=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const clone=o=>JSON.parse(JSON.stringify(o));
const score=st=>st.shelter*10+st.grid.reduce((s,u)=>s+(u?u.hp:0),0);
function game(){
 const st=Z.newState();let draw=sh([...Z.KEYS]),disc=[];
 for(;st.night<=10;st.night++){
  st.event=st.night===1?Z.EVENTS[0]:(Math.random()<.2?Z.EVENTS[0]:Z.EVENTS[1+Math.floor(Math.random()*(Z.EVENTS.length-1))]);
  const hand=[];const n=5+Z.extraDraw(st);for(let k=0;k<n;k++){if(!draw.length){draw=sh(disc);disc=[]}if(draw.length)hand.push(draw.pop())}
  const seed=1+Math.floor(Math.random()*1e9);
  for(let p=0;p<PLAYS&&hand.length;p++){let best=null;
   for(let h=0;h<hand.length;h++){const t=hand[h];const cells=Z.U[t].instant?[Z.C]:Z.INNER;
    for(const i of cells){const c=clone(st);Z.place(c,t,i);Z.runNight(c,mk(seed));const v=score(c);if(!best||v>best.v)best={v,h,i}}}
   Z.place(st,hand[best.h],best.i);disc.push(hand[best.h]);hand.splice(best.h,1)}
  disc.push(...hand);
  Z.runNight(st,mk(1+Math.floor(Math.random()*1e9)));Z.endNight(st);
  if(st.shelter<=0)return st.night;
  disc.push(Z.KEYS[Math.floor(Math.random()*Z.KEYS.length)]);
 }
 return 11;
}
let w=0,s=0,hp=0;for(let k=0;k<G;k++){const r=game();if(r===11)w++;s+=Math.min(r,10)}
console.log('Victoires',(w/G*100).toFixed(0)+'%','Nuit moyenne atteinte',(s/G).toFixed(1));
