# Prompts des illustrations et sprites

Fichier de travail pour faire générer toutes les images du jeu par une IA d'image (ChatGPT / DALL·E, Midjourney, Leonardo…).
Le jeu écrit lui-même tout le texte des cartes : **aucune image ne doit contenir de texte**.

## Ce qu'il faut savoir avant de commencer

- Aucune IA ne génère d'un coup un ZIP de plus de 200 images cohérentes. On procède **par lots de 5 à 8 images**, dans **une seule conversation**, en collant le **prompt maître** au début.
- ChatGPT (avec génération d'images et exécution de code) peut, à la fin, **rassembler les images déjà générées dans un ZIP** : c'est le dernier message ci-dessous.
- **Nom de fichier = identifiant** (colonne « Fichier »). C'est ce qui me permet de tout brancher dans le jeu sans rien renommer.
- Vérifie le **droit d'usage commercial** de l'outil, et pense à **déclarer le contenu IA sur Steam**.

## Prompt maître (à coller une seule fois, au début de la conversation)

```
You are the art department of a dark zombie survival card game called "Dernier Abri".
For the whole conversation, keep EXACTLY the same art direction:
- Painted semi-realistic digital illustration, thick dark outlines, strong shadows.
- Night scene: cold blue moonlight, warm orange rim light from fire, mist, dark forest.
- Muted, desaturated colors. Gritty, worn, survival mood. No cartoon, no pixel art, no anime.
- NEVER any text, letters, numbers, logo, watermark, frame or border in the image.

There are 3 kinds of images. Follow the spec of each kind:
1. CARD ILLUSTRATION: portrait 3:4 (768x1024). Subject centered in the upper-middle, plenty of margin, dark misty background.
2. ZOMBIE CARD: same as card illustration, the zombie is the subject, menacing.
3. SPRITE (for the game board): top-down view, seen from directly above, the character or object facing RIGHT,
   transparent background (PNG with alpha), 256x256, centered, no shadow on the ground, same colors and outline style.

I will send batches as lines "filename | kind | subject". Generate one image per line, save each one with EXACTLY that
filename (.png), and show them. Keep the style identical between batches. Do not ask questions, just generate.
```

## Rassembler en ZIP (dernier message, ChatGPT)

```
Put every image generated in this conversation in a single ZIP file named dernier-abri-assets.zip,
with folders cards/, zombies/ and sprites/, keeping the exact filenames. Give me the download link.
```

## Le cadre (une seule image)

```
frame.png | card illustration | an EMPTY worn card frame for a horror card game: dark weathered metal and black grunge border, the top window is solid black (empty), a large blank aged parchment panel in the bottom third, no illustration, no text, no symbols
```

## Cartes (illustrations)

Un lot = 5 à 8 lignes copiées d'un coup.

### Défenses

```
cards/bar.png | card illustration | a crude barricade of nailed wooden planks across a dark forest road
cards/car.png | card illustration | a burnt-out rusty car wreck pushed across a road as a barrier
cards/fen.png | card illustration | an improvised electric fence crackling with blue sparks, wires and car batteries
cards/sand.png | card illustration | a wall of stacked sandbags with a tarp
cards/door.png | card illustration | a heavy armored steel door bolted into a wall of debris
cards/tire.png | card illustration | a wall of stacked old tires soaked in fuel
cards/barrier.png | card illustration | red and white police barriers blocking a street
cards/bunker.png | card illustration | a small concrete bunker with a firing slit
cards/brasero.png | card illustration | a burning brazier in a metal barrel
cards/modwall.png | card illustration | modular sheet metal wall panels bolted together
```

### Tireurs

```
cards/gun.png | card illustration | a lone survivor in a worn olive jacket and cap with an old bolt-action rifle, crouched behind a barricade
cards/snp.png | card illustration | a hooded sniper lying on a rooftop with a long scoped rifle
cards/sht.png | card illustration | a grim survivor with a pump shotgun and a bandolier
cards/xbow.png | card illustration | a hunter aiming a crossbow from behind a tree
cards/flame.png | card illustration | a survivor in a gas mask with a homemade flamethrower and fuel tank, fire roaring
cards/mg.png | card illustration | a soldier with a heavy machine gun on a bipod behind sandbags
cards/molo.png | card illustration | a hooded figure about to throw a burning Molotov cocktail
cards/kid.png | card illustration | a fierce teenage kid with a slingshot and a red cap
cards/swat.png | card illustration | an elite tactical police marksman with a scoped rifle and helmet
cards/mortar.png | card illustration | a soldier loading a mortar shell into a tube
cards/sentry.png | card illustration | an automatic sentry gun turret on a tripod with an ammo belt
cards/hunter.png | card illustration | a hunter in an orange cap with a hunting rifle
cards/turret.png | card illustration | a rusty homemade turret built from scrap and a hunting rifle
cards/tesla.png | card illustration | a homemade tesla coil throwing lightning arcs
cards/vigile.png | card illustration | a security guard with a flashlight and a pistol
cards/doc.png | card illustration | a doctor on night duty with a pistol and a stethoscope
cards/nailer.png | card illustration | a handyman firing a pneumatic nail gun
cards/ranger.png | card illustration | a country game warden with a hunting rifle and a badge
cards/chief_police.png | card illustration | a grizzled police commissioner in a long coat with a revolver and a golden badge, heroic pose
cards/chief_mil.png | card illustration | a tough female army sergeant with a light machine gun, heroic pose
cards/chief_pyro.png | card illustration | a pyromaniac in a fire suit with a flamethrower, flames everywhere, heroic pose
cards/chief_trap.png | card illustration | an old poacher in a fur hat with a long hunting rifle and traps on his belt, heroic pose
cards/rocket.png | card illustration | a survivor aiming a rocket launcher, backblast smoke
```

### Corps à corps

```
cards/axe.png | card illustration | a burly lumberjack in a plaid shirt swinging a bloody axe
cards/dog.png | card illustration | a loyal scruffy dog baring its teeth, guarding a doorway
cards/cop.png | card illustration | a police officer in a torn uniform with a riot baton
cards/butch.png | card illustration | a butcher in a bloodstained apron holding a cleaver
cards/monk.png | card illustration | a calm monk in an orange robe with bare hands, standing firm against the horde
cards/riot.png | card illustration | a riot police officer with a big transparent shield and a helmet
cards/k9.png | card illustration | a police German shepherd in a vest, snarling
cards/dogs.png | card illustration | a pack of three farm dogs snarling
cards/pitch.png | card illustration | a farmer with a pitchfork in a plaid shirt
cards/amb.png | card illustration | an ambulance driver in a reflective jacket blocking with a stretcher
cards/orderly.png | card illustration | a burly hospital orderly in scrubs with taped fists
cards/chief_farm.png | card illustration | a strong female farmer with an axe and two dogs, heroic pose
```

### Soutien

```
cards/med.png | card illustration | a tired nurse with a medical bag and a red cross armband
cards/lamp.png | card illustration | a powerful floodlight on a tripod cutting through the fog
cards/radio.png | card illustration | an old military radio set with a glowing dial on a table
cards/cook.png | card illustration | a cook stirring a big pot of soup over a fire in a shelter
cards/mech.png | card illustration | a mechanic with a wrench and grease-stained overalls repairing a wall
cards/siren.png | card illustration | a rooftop alarm siren with a flashing red light
cards/lead.png | card illustration | a group leader raising a pistol and shouting orders
cards/solar.png | card illustration | a makeshift solar panel wired to car batteries
cards/pharma.png | card illustration | a pharmacist in a white coat holding pill bottles
cards/hospital.png | card illustration | a field hospital tent with a red cross
cards/priest.png | card illustration | a priest with a bible and a cross, praying amid the chaos
cards/stretch.png | card illustration | a stretcher bearer in a hi-vis vest carrying a stretcher
cards/scare.png | card illustration | a creepy scarecrow on a pole in a field
cards/workshop.png | card illustration | a cluttered workshop bench with tools and sparks
cards/teacher.png | card illustration | a schoolteacher holding a book and a lantern, children behind her
cards/market.png | card illustration | a makeshift barter market stall with scrap and supplies
cards/carp.png | card illustration | a carpenter with a hammer and planks
cards/chief_care.png | card illustration | a determined female doctor in a bloodstained coat with a scalpel, heroic pose
cards/chief_tech.png | card illustration | an engineer in a welding helmet with a giant wrench and nail gun, heroic pose
cards/chief_comm.png | card illustration | a small-town mayor in a sash rallying people with a pistol raised, heroic pose
```

### Pièges

```
cards/trap.png | card illustration | a steel wolf trap hidden in dead leaves
cards/fire.png | card illustration | a puddle of gasoline on a dark road, about to ignite
cards/mine.png | card illustration | a buried landmine with a blinking red light in the mud
cards/wire.png | card illustration | coils of barbed wire strung between wooden posts
cards/spike.png | card illustration | a pit of sharpened wooden stakes in the ground
cards/gas.png | card illustration | a red propane gas cylinder lying near a wall
cards/smoke.png | card illustration | a smoke grenade releasing thick grey smoke
cards/bait.png | card illustration | a slab of raw meat on a hook to lure the dead
cards/dyn.png | card illustration | bundled sticks of dynamite with a burning fuse
cards/clay.png | card illustration | a claymore mine on little legs with a tripwire
cards/firetrap.png | card illustration | a booby-trapped red fuel barrel with wires
cards/net.png | card illustration | a hunting net trap hanging between trees
cards/bear.png | card illustration | a huge rusty bear trap with jagged teeth
```

### Objets

```
cards/food.png | card illustration | a stack of dented canned food on a shelf
cards/rep.png | card illustration | a toolbox with hammers, nails and duct tape
cards/kit.png | card illustration | an open first aid kit with bandages
cards/coffee.png | card illustration | a steaming tin mug of black coffee by a lantern
cards/roadmap.png | card illustration | a worn road map with routes circled in red marker
cards/flare.png | card illustration | a red distress flare burning bright in the night sky
```

### Réactions

```
cards/tear.png | card illustration | a tear gas canister spewing white gas
cards/napalm.png | card illustration | a wall of napalm fire engulfing a road
cards/air.png | card illustration | a military jet dropping bombs, explosions lighting the night
cards/grenade.png | card illustration | a hand grenade in mid-air about to explode
cards/shot.png | card illustration | a rifle barrel poking out of a shelter window, muzzle flash
cards/patch.png | card illustration | hands quickly hammering planks over a broken wall
cards/molotov.png | card illustration | a Molotov cocktail shattering into flames
cards/horn.png | card illustration | a car horn blaring, sound waves pushing the dead back
cards/rush.png | card illustration | a survivor with dilated eyes, adrenaline syringe, intense
```

### Évolutions secrètes

```
cards/k9squad.png | card illustration | a police officer and his German shepherd charging together
cards/nightsnp.png | card illustration | a sniper lit by a floodlight beam on a rooftop
cards/heavyflame.png | card illustration | a heavily armored flamethrower trooper with twin fuel tanks
cards/fortin.png | card illustration | a fortified car wreck welded to a concrete bunker
cards/autogun.png | card illustration | an automatic gun turret built by a mechanic, multiple barrels
cards/slaughter.png | card illustration | a massive butcher-lumberjack with a cleaver and an axe
cards/canteen.png | card illustration | a field canteen with a nurse and a cook serving soup
cards/gang.png | card illustration | a gang of kids with slingshots on a rooftop
cards/saint.png | card illustration | a glowing monk-priest standing unhurt in the middle of the horde
cards/tracker.png | card illustration | a camouflaged tracker with a crossbow and a hunting rifle
```

## Cartes de zombies

Pour le bestiaire (écran « Voir les cartes et les zombies »).

```
zombies/walk.png | zombie card | a slow shambling zombie in torn clothes
zombies/run.png | zombie card | a fast lean zombie sprinting, mouth open
zombies/fat.png | zombie card | a huge bloated zombie, swollen and purple
zombies/zdog.png | zombie card | an undead dog with exposed ribs and red eyes
zombies/crawl.png | zombie card | a legless zombie crawling on the ground
zombies/spit.png | zombie card | a zombie with a swollen throat spitting green acid
zombies/armor.png | zombie card | a zombie wearing riot armor and a helmet
zombies/howl.png | zombie card | a pale zombie screaming to call the horde
zombies/sap.png | zombie card | a zombie with dynamite strapped to its back and a blinking red light
zombies/boss.png | zombie card | a gigantic colossus zombie, three meters tall, bone spikes, the boss
```

## Sprites du plateau

Vue du dessus, tournée vers la droite, fond transparent. Le jeu les fait pivoter et les anime lui-même.
**À faire en dernier** : aujourd'hui le plateau est dessiné en code ; brancher des sprites demande un travail de mon côté, et il vaut mieux tester d'abord 3 ou 4 sprites pour vérifier que la vue du dessus reste lisible.

### Unités, défenses et pièges
```
sprites/bar.png | sprite | top-down view of a crude barricade of nailed wooden planks across a dark forest road
sprites/car.png | sprite | top-down view of a burnt-out rusty car wreck pushed across a road as a barrier
sprites/fen.png | sprite | top-down view of an improvised electric fence crackling with blue sparks, wires and car batteries
sprites/sand.png | sprite | top-down view of a wall of stacked sandbags with a tarp
sprites/door.png | sprite | top-down view of a heavy armored steel door bolted into a wall of debris
sprites/tire.png | sprite | top-down view of a wall of stacked old tires soaked in fuel
sprites/gun.png | sprite | top-down view of a lone survivor in a worn olive jacket and cap with an old bolt-action rifle, crouched behind a barricade
sprites/snp.png | sprite | top-down view of a hooded sniper lying on a rooftop with a long scoped rifle
sprites/sht.png | sprite | top-down view of a grim survivor with a pump shotgun and a bandolier
sprites/xbow.png | sprite | top-down view of a hunter aiming a crossbow from behind a tree
sprites/flame.png | sprite | top-down view of a survivor in a gas mask with a homemade flamethrower and fuel tank, fire roaring
sprites/mg.png | sprite | top-down view of a soldier with a heavy machine gun on a bipod behind sandbags
sprites/molo.png | sprite | top-down view of a hooded figure about to throw a burning Molotov cocktail
sprites/kid.png | sprite | top-down view of a fierce teenage kid with a slingshot and a red cap
sprites/axe.png | sprite | top-down view of a burly lumberjack in a plaid shirt swinging a bloody axe
sprites/dog.png | sprite | top-down view of a loyal scruffy dog baring its teeth, guarding a doorway
sprites/cop.png | sprite | top-down view of a police officer in a torn uniform with a riot baton
sprites/butch.png | sprite | top-down view of a butcher in a bloodstained apron holding a cleaver
sprites/monk.png | sprite | top-down view of a calm monk in an orange robe with bare hands, standing firm against the horde
sprites/med.png | sprite | top-down view of a tired nurse with a medical bag and a red cross armband
sprites/lamp.png | sprite | top-down view of a powerful floodlight on a tripod cutting through the fog
sprites/radio.png | sprite | top-down view of an old military radio set with a glowing dial on a table
sprites/cook.png | sprite | top-down view of a cook stirring a big pot of soup over a fire in a shelter
sprites/mech.png | sprite | top-down view of a mechanic with a wrench and grease-stained overalls repairing a wall
sprites/siren.png | sprite | top-down view of a rooftop alarm siren with a flashing red light
sprites/lead.png | sprite | top-down view of a group leader raising a pistol and shouting orders
sprites/solar.png | sprite | top-down view of a makeshift solar panel wired to car batteries
sprites/trap.png | sprite | top-down view of a steel wolf trap hidden in dead leaves
sprites/fire.png | sprite | top-down view of a puddle of gasoline on a dark road, about to ignite
sprites/mine.png | sprite | top-down view of a buried landmine with a blinking red light in the mud
sprites/wire.png | sprite | top-down view of coils of barbed wire strung between wooden posts
sprites/spike.png | sprite | top-down view of a pit of sharpened wooden stakes in the ground
sprites/gas.png | sprite | top-down view of a red propane gas cylinder lying near a wall
sprites/smoke.png | sprite | top-down view of a smoke grenade releasing thick grey smoke
sprites/bait.png | sprite | top-down view of a slab of raw meat on a hook to lure the dead
sprites/dyn.png | sprite | top-down view of bundled sticks of dynamite with a burning fuse
sprites/riot.png | sprite | top-down view of a riot police officer with a big transparent shield and a helmet
sprites/k9.png | sprite | top-down view of a police German shepherd in a vest, snarling
sprites/barrier.png | sprite | top-down view of red and white police barriers blocking a street
sprites/swat.png | sprite | top-down view of an elite tactical police marksman with a scoped rifle and helmet
sprites/mortar.png | sprite | top-down view of a soldier loading a mortar shell into a tube
sprites/sentry.png | sprite | top-down view of an automatic sentry gun turret on a tripod with an ammo belt
sprites/clay.png | sprite | top-down view of a claymore mine on little legs with a tripwire
sprites/bunker.png | sprite | top-down view of a small concrete bunker with a firing slit
sprites/pharma.png | sprite | top-down view of a pharmacist in a white coat holding pill bottles
sprites/hospital.png | sprite | top-down view of a field hospital tent with a red cross
sprites/priest.png | sprite | top-down view of a priest with a bible and a cross, praying amid the chaos
sprites/stretch.png | sprite | top-down view of a stretcher bearer in a hi-vis vest carrying a stretcher
sprites/brasero.png | sprite | top-down view of a burning brazier in a metal barrel
sprites/firetrap.png | sprite | top-down view of a booby-trapped red fuel barrel with wires
sprites/net.png | sprite | top-down view of a hunting net trap hanging between trees
sprites/bear.png | sprite | top-down view of a huge rusty bear trap with jagged teeth
sprites/hunter.png | sprite | top-down view of a hunter in an orange cap with a hunting rifle
sprites/dogs.png | sprite | top-down view of a pack of three farm dogs snarling
sprites/pitch.png | sprite | top-down view of a farmer with a pitchfork in a plaid shirt
sprites/scare.png | sprite | top-down view of a creepy scarecrow on a pole in a field
sprites/turret.png | sprite | top-down view of a rusty homemade turret built from scrap and a hunting rifle
sprites/workshop.png | sprite | top-down view of a cluttered workshop bench with tools and sparks
sprites/modwall.png | sprite | top-down view of modular sheet metal wall panels bolted together
sprites/tesla.png | sprite | top-down view of a homemade tesla coil throwing lightning arcs
sprites/teacher.png | sprite | top-down view of a schoolteacher holding a book and a lantern, children behind her
sprites/market.png | sprite | top-down view of a makeshift barter market stall with scrap and supplies
sprites/vigile.png | sprite | top-down view of a security guard with a flashlight and a pistol
sprites/carp.png | sprite | top-down view of a carpenter with a hammer and planks
sprites/amb.png | sprite | top-down view of an ambulance driver in a reflective jacket blocking with a stretcher
sprites/doc.png | sprite | top-down view of a doctor on night duty with a pistol and a stethoscope
sprites/orderly.png | sprite | top-down view of a burly hospital orderly in scrubs with taped fists
sprites/nailer.png | sprite | top-down view of a handyman firing a pneumatic nail gun
sprites/ranger.png | sprite | top-down view of a country game warden with a hunting rifle and a badge
sprites/chief_police.png | sprite | top-down view of a grizzled police commissioner in a long coat with a revolver and a golden badge, heroic pose
sprites/chief_mil.png | sprite | top-down view of a tough female army sergeant with a light machine gun, heroic pose
sprites/chief_care.png | sprite | top-down view of a determined female doctor in a bloodstained coat with a scalpel, heroic pose
sprites/chief_pyro.png | sprite | top-down view of a pyromaniac in a fire suit with a flamethrower, flames everywhere, heroic pose
sprites/chief_trap.png | sprite | top-down view of an old poacher in a fur hat with a long hunting rifle and traps on his belt, heroic pose
sprites/chief_farm.png | sprite | top-down view of a strong female farmer with an axe and two dogs, heroic pose
sprites/chief_tech.png | sprite | top-down view of an engineer in a welding helmet with a giant wrench and nail gun, heroic pose
sprites/chief_comm.png | sprite | top-down view of a small-town mayor in a sash rallying people with a pistol raised, heroic pose
sprites/rocket.png | sprite | top-down view of a survivor aiming a rocket launcher, backblast smoke
sprites/k9squad.png | sprite | top-down view of a police officer and his German shepherd charging together
sprites/nightsnp.png | sprite | top-down view of a sniper lit by a floodlight beam on a rooftop
sprites/heavyflame.png | sprite | top-down view of a heavily armored flamethrower trooper with twin fuel tanks
sprites/fortin.png | sprite | top-down view of a fortified car wreck welded to a concrete bunker
sprites/autogun.png | sprite | top-down view of an automatic gun turret built by a mechanic, multiple barrels
sprites/slaughter.png | sprite | top-down view of a massive butcher-lumberjack with a cleaver and an axe
sprites/canteen.png | sprite | top-down view of a field canteen with a nurse and a cook serving soup
sprites/gang.png | sprite | top-down view of a gang of kids with slingshots on a rooftop
sprites/saint.png | sprite | top-down view of a glowing monk-priest standing unhurt in the middle of the horde
sprites/tracker.png | sprite | top-down view of a camouflaged tracker with a crossbow and a hunting rifle
```

### Zombies
```
sprites/z_walk.png | sprite | top-down view of a slow shambling zombie in torn clothes
sprites/z_run.png | sprite | top-down view of a fast lean zombie sprinting, mouth open
sprites/z_fat.png | sprite | top-down view of a huge bloated zombie, swollen and purple
sprites/z_zdog.png | sprite | top-down view of an undead dog with exposed ribs and red eyes
sprites/z_crawl.png | sprite | top-down view of a legless zombie crawling on the ground
sprites/z_spit.png | sprite | top-down view of a zombie with a swollen throat spitting green acid
sprites/z_armor.png | sprite | top-down view of a zombie wearing riot armor and a helmet
sprites/z_howl.png | sprite | top-down view of a pale zombie screaming to call the horde
sprites/z_sap.png | sprite | top-down view of a zombie with dynamite strapped to its back and a blinking red light
sprites/z_boss.png | sprite | top-down view of a gigantic colossus zombie, three meters tall, bone spikes, the boss
```

### Décor
```
sprites/shelter.png | sprite | top-down view of a small house with a red tiled roof, boarded windows, a chimney
sprites/ground.png | card illustration | seamless top-down texture of dark grass, mud and a dirt road crossing, night, no objects
```


---
Total : 1 cadre, 103 illustrations de cartes, 10 cartes de zombies, 100 sprites.
