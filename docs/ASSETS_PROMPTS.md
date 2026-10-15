# Prompts des illustrations et sprites

Fichier de travail pour faire générer les images du jeu par une IA d'image (ChatGPT, Midjourney, Leonardo…).
Le jeu écrit lui-même tout le texte des cartes : **aucune image ne doit contenir de texte**.

## Où on en est

- Cadre, 10 cartes de zombies et 77 illustrations de cartes : faits, en bonne résolution.
- 26 illustrations sont en basse résolution (découpées dans un collage) : **à refaire**, voir les parties A et B.
- Les 18 cartes qui sortent du cadre (8 chefs, 10 évolutions) sont **à refaire avec une nouvelle posture** : partie A.
- Sprites : 4 faits (Tireur, Barricade, Piège à loup, Rôdeur), **94 à faire** : partie C.

## Méthode

1. Une conversation par partie (A, B, C). Colle le **prompt maître** de la partie en premier message.
2. Ensuite **une seule ligne par message**. Une image par message, c'est ce qui garde la pleine résolution (pas de collage).
3. Garde l'**ordre de la liste**. Envoie-moi les images par lots de 10, en me disant le nom de la première (exemple : « C, à partir de car »).
4. Si l'IA refuse une image (« trop violent ») : recolle le rappel en bas de page, ou passe sur Leonardo.ai ou Midjourney avec le même prompt maître.

---

## A. Chefs et évolutions : cartes qui sortent du cadre (18 images)

Le jeu détoure le personnage et fait déborder **sa tête et ses épaules au-dessus du cadre**, et ses armes sur les côtés. Pour que ça marche :
- la tête doit être **haute dans l'image**, mais **jamais coupée** par le bord ;
- le bas de l'image (le dernier cinquième) est caché par le parchemin : rien d'important dessous ;
- le fond doit être **simple et sombre**, sans fumée ni flammes devant la silhouette (sinon le détourage rate).

### Prompt maître A

```
You are the art department of a dark survival horror card game about an infection outbreak, called "Dernier Abri".
Keep EXACTLY the same art direction for the whole conversation:
- Painted semi-realistic digital illustration, thick dark outlines, strong shadows, muted desaturated colors,
  gritty worn survival mood. No cartoon, no pixel art, no anime.
- Stylized PG-13 horror like a board game: no blood, no gore, no wounds.
- NEVER any text, letters, numbers, logo, watermark, frame or border.

These are HERO CARDS: the character will be cut out by software and will BREAK OUT OF THE CARD FRAME.
Follow this composition EXACTLY for every image:
- Portrait 3:4 (1024x1365 or larger). ONE image per message, never a collage or grid.
- Upper-body shot (waist up), the character BIG and close, filling about 85% of the width.
- The top of the head sits about 8% below the top edge: a small empty margin above the head, the head is NEVER cut.
  The eyes are at about one quarter of the image height.
- The character leans toward the viewer and looks straight into the camera (breaks the fourth wall), intense expression.
- Weapons, tools and arms stretch out sideways toward the left and right edges, coming very close to the edges but NOT cut.
  One hand or weapon may come toward the camera, foreshortened.
- The bottom fifth of the image will be hidden: keep nothing important there.
- Background: plain, dark, blurred night fog (deep blue-grey), very simple, clearly darker than the character.
  NO smoke, flames, sparks, particles, branches or objects in front of or touching the silhouette.
  Fire, if any, stays far behind the character, small and blurred.
- Strong warm rim light all around the silhouette so its outline is crisp and easy to cut out.

I will send one line per message: "filename | subject". Generate the image, name it with that filename, do not ask questions.
```

### Lignes A (une par message)

```
chief_police.png | a grizzled police commissioner in a long dark coat, revolver held out to the right, golden badge raised toward the viewer in his left hand
chief_mil.png | a tough female army sergeant, light machine gun held across her chest, barrel pointing to the right edge, helmet strap undone
chief_pyro.png | a pyromaniac in a scorched fire suit and goggles pushed on the forehead, flamethrower nozzle pointing to the left edge, fuel tank on the back
chief_trap.png | an old poacher in a fur hat, long hunting rifle across the shoulders held with both hands, steel traps hanging from his belt
chief_farm.png | a strong female farmer raising an axe to the right, two farm dogs' heads beside her at shoulder level on the left
chief_care.png | a determined female doctor in a long white coat, scalpel raised in one hand, a medical bag held out to the left
chief_tech.png | an engineer with a welding helmet flipped up, giant wrench on one shoulder, nail gun pointed to the left edge
chief_comm.png | a small-town mayor in a tricolor sash, shouting, pistol raised high to the right, other arm stretched out to the left rallying people
k9squad.png | a police officer leaning forward with his German shepherd, the dog's head in front of his chest, both staring at the viewer
nightsnp.png | a hooded sniper holding a long scoped rifle diagonally across the image, scope near the right edge, a small floodlight glow far behind
heavyflame.png | a heavily armored flamethrower trooper in a gas mask, twin fuel tanks over the shoulders, nozzle pointing to the left edge
fortin.png | a wrecked car welded to a concrete bunker, seen from the front, low and wide, a gun barrel sticking out of the firing slit toward the viewer
autogun.png | a homemade automatic turret with several barrels pointing at the viewer, ammo belts hanging left and right, seen from the front
slaughter.png | a massive butcher-lumberjack, a cleaver raised on the left and an axe raised on the right, wide intimidating stance
canteen.png | a field canteen cook-nurse with a red cross armband, holding a steaming ladle toward the viewer, a big pot in the other arm
gang.png | three teenage kids side by side, heads at the same height, slingshots stretched toward the viewer, red, blue and green caps
saint.png | a calm monk-priest in an orange robe with a wooden cross, arms spread wide to the left and right edges, soft light around him
tracker.png | a camouflaged tracker with face paint, crossbow aimed to the right, hunting rifle slung on the back, its barrel above the left shoulder
```

---

## B. Cartes à refaire en pleine résolution (16 images)

Pas d'effet de sortie du cadre ici : composition classique.

### Prompt maître B

```
You are the art department of a dark survival horror card game about an infection outbreak, called "Dernier Abri".
Keep EXACTLY the same art direction for the whole conversation:
- Painted semi-realistic digital illustration, thick dark outlines, strong shadows.
- Night scene: cold blue moonlight, warm orange rim light from fire, mist, dark forest.
- Muted, desaturated colors. Gritty, worn, survival mood. No cartoon, no pixel art, no anime.
- Objects and traps are shown close-up, facing the viewer, as if pushed toward the camera.
  Characters look straight into the camera.
- Stylized PG-13 horror like a board game: no blood, no gore, no wounds. The infected are pale with glowing eyes.
- NEVER any text, letters, numbers, logo, watermark, frame or border.
- Portrait 3:4 (1024x1365 or larger). ONE image per message, never a collage or grid.
- Subject centered in the upper-middle; the bottom fifth of the image will be hidden.

I will send one line per message: "filename | subject". Generate the image, name it with that filename, do not ask questions.
```

### Lignes B (une par message)

```
trap.png | an old rusty steel jaw trap lying open in dead leaves on a forest path
fire.png | a puddle of gasoline on a dark road, a lit match falling into it
mine.png | a round metal landmine half buried in mud with a small blinking red light
wire.png | coils of barbed wire strung between wooden posts across a road
spike.png | a camouflaged pit of sharpened wooden stakes in the forest ground, seen from its edge
gas.png | a red propane cylinder lying near a wall, valve hissing
smoke.png | a smoke grenade on the ground releasing thick grey smoke
bait.png | a hunting lure hanging from a rope on a tree branch in the fog
dyn.png | bundled sticks of dynamite with a sparkling fuse on a wooden crate
clay.png | a small green military device on little legs with a thin tripwire, in tall grass
firetrap.png | a red fuel barrel with wires and a small detonator in the fog
net.png | a big rope net trap hanging between two trees above a path
bear.png | a huge old rusty hunting trap lying open on the ground, autumn leaves, chain staked to the ground
horn.png | a car's front seen at night, headlights on, sound waves pushing pale shadowy figures back into the fog
rush.png | a survivor with intense focused eyes holding a syringe, glowing with energy
molotov.png | a Molotov cocktail shattering on the ground into a burst of flames
```

---

## C. Sprites du plateau (94 images)

Le style de tes 4 premiers sprites est le bon : on garde exactement ça.

### Prompt maître C

```
You are the art department of a dark survival horror card game about an infection outbreak, called "Dernier Abri".
We make SPRITES for the game board. Keep EXACTLY the same style for the whole conversation:
- Painted semi-realistic style, thick dark outlines, strong shading, muted desaturated colors, gritty and worn.
- Stylized PG-13: no blood, no gore, no wounds. The infected are pale and sickly with glowing eyes.
- Seen from DIRECTLY ABOVE (top-down, bird's-eye view), like a top-down shooter game.
- TRANSPARENT background (PNG with alpha). No ground, no grass, no floor, no cast shadow, no scenery around the subject.
- Square image, ONE subject only, centered, filling about 85% of the image. ONE image per message, never a collage.
- People and animals FACE RIGHT: head and weapon pointing to the right side of the image.
- Walls and barricades: the long side is VERTICAL, from the top to the bottom of the image.
- NEVER any text, letters, numbers, logo, watermark or border.

I will send one line per message: "filename | subject". Generate the image, name it with that filename, do not ask questions.
```

### Défenses (le côté long à la verticale)

```
car.png | a burnt-out rusty car wreck, seen from above, lying vertically
fen.png | an improvised electric fence: three posts in a vertical line with wires between them, small blue sparks
sand.png | a wall of stacked sandbags in a vertical line
door.png | a heavy armored steel door lying vertically, riveted
tire.png | three old tires stacked in a vertical line
barrier.png | a red and white police barrier, vertical
bunker.png | a small concrete bunker roof seen from above, a dark firing slit on the right side
brasero.png | a burning brazier in a metal barrel, seen from above, glowing embers
modwall.png | modular sheet metal wall panels bolted together in a vertical line
fortin.png | a car wreck welded to a concrete bunker, seen from above, vertical, a gun barrel pointing right
```

### Tireurs (tournés vers la droite)

```
snp.png | a hooded sniper with a long scoped rifle pointing right
sht.png | a grim survivor with a pump shotgun pointing right, bandolier across the chest
xbow.png | a hunter aiming a crossbow to the right
flame.png | a survivor in a gas mask with a flamethrower pointing right, fuel tank on the back
mg.png | a soldier with a heavy machine gun on a bipod pointing right
molo.png | a hooded figure holding a burning Molotov cocktail, arm stretched to the right
kid.png | a teenage kid in a red cap with a slingshot aimed to the right
swat.png | a tactical police marksman with a helmet and a scoped rifle pointing right
mortar.png | a soldier crouched next to a mortar tube tilted to the right
sentry.png | an automatic sentry gun on a tripod, barrel pointing right, ammo belt
hunter.png | a hunter in an orange cap with a hunting rifle pointing right
turret.png | a rusty homemade turret built from scrap metal, a hunting rifle barrel pointing right
tesla.png | a homemade tesla coil seen from above, copper rings, small lightning arcs around it
vigile.png | a security guard with a flashlight and a pistol pointing right
doc.png | a doctor in a white coat with a stethoscope and a pistol pointing right
nailer.png | a handyman with a pneumatic nail gun pointing right
ranger.png | a game warden in a ranger hat with a hunting rifle pointing right
rocket.png | a survivor with a rocket launcher on the shoulder pointing right
chief_police.png | a police commissioner in a long dark coat with a revolver pointing right, golden badge
chief_mil.png | a female army sergeant in a helmet with a light machine gun pointing right
chief_pyro.png | a pyromaniac in a fire suit with a flamethrower pointing right
chief_trap.png | an old poacher in a fur hat with a long hunting rifle pointing right, traps on the belt
nightsnp.png | a hooded sniper with a long scoped rifle pointing right and a small floodlight beside him
heavyflame.png | a heavily armored flamethrower trooper with twin fuel tanks on the back, nozzle pointing right
autogun.png | a homemade multi-barrel automatic turret, barrels pointing right
gang.png | three kids in red, blue and green caps side by side, slingshots aimed to the right
tracker.png | a camouflaged tracker with a crossbow aimed to the right
```

### Corps à corps (tournés vers la droite)

```
axe.png | a burly lumberjack in a plaid shirt holding a big axe to the right
dog.png | a scruffy brown dog with a red collar facing right
cop.png | a police officer with a riot baton held to the right
butch.png | a butcher in an apron holding a cleaver to the right
monk.png | a monk in an orange robe, bare hands raised to the right
riot.png | a riot police officer with a big transparent shield on the right side and a helmet
k9.png | a police German shepherd in a vest facing right
dogs.png | two farm dogs side by side facing right
pitch.png | a farmer in a plaid shirt with a pitchfork pointing right
amb.png | an ambulance driver in a reflective jacket pushing a stretcher to the right
orderly.png | a burly hospital orderly in green scrubs with taped fists, facing right
chief_farm.png | a strong female farmer with an axe to the right and a dog at her side
k9squad.png | a police officer and his German shepherd side by side, facing right
slaughter.png | a massive man with a cleaver and an axe, both held to the right
saint.png | a monk-priest in an orange robe with a wooden cross, soft light around him, facing right
```

### Soutien

```
med.png | a nurse with a medical bag and a red cross armband, facing right
lamp.png | a floodlight on a tripod seen from above, light pointing right
radio.png | an old military radio set seen from above, glowing dial, antenna
cook.png | a cook stirring a big pot of soup, seen from above, facing right
mech.png | a mechanic in overalls with a big wrench, facing right
siren.png | an alarm siren on a small stand seen from above, red light
lead.png | a group leader raising a pistol, facing right
solar.png | a makeshift solar panel seen from above, wired to a car battery
pharma.png | a pharmacist in a white coat holding pill bottles, facing right
hospital.png | a field hospital tent seen from above, white roof with a red cross
priest.png | a priest in black holding a bible and a cross, facing right
stretch.png | a stretcher bearer in a hi-vis vest carrying a folded stretcher, facing right
scare.png | a scarecrow seen from above, arms spread wide, straw hat
workshop.png | a cluttered workbench with tools seen from above
teacher.png | a schoolteacher holding a book and a lantern, facing right
market.png | a barter market stall seen from above, striped awning, crates of supplies
carp.png | a carpenter with a hammer and planks under the arm, facing right
chief_care.png | a female doctor in a long white coat holding a scalpel, facing right
chief_tech.png | an engineer in a welding helmet with a giant wrench, facing right
chief_comm.png | a mayor in a tricolor sash with a pistol raised, facing right
canteen.png | a field canteen seen from above: a big soup pot on a stove and a small table
```

### Pièges (vus du dessus, centrés)

```
fire.png | a puddle of gasoline seen from above, iridescent, small flames at the edge
mine.png | a round metal landmine seen from above, small red light
wire.png | a coil of barbed wire between two wooden posts, vertical
spike.png | a pit of sharpened wooden stakes seen from above
gas.png | a red propane cylinder lying on its side, seen from above
smoke.png | a smoke grenade seen from above, grey smoke puffing out
bait.png | a chunk of raw meat bait on the ground, seen from above
dyn.png | three sticks of dynamite tied together with a lit fuse, seen from above
clay.png | a small green military device on little legs, seen from above
firetrap.png | a red fuel barrel seen from above, wires and a detonator on its lid
net.png | a rope net spread flat on the ground, seen from above
bear.png | a big open rusty hunting trap seen from above, teeth all around, chain
```

### Zombies (tournés vers la droite, bras tendus vers la droite)

```
z_run.png | a lean pale infected person running to the right, arms reaching forward
z_fat.png | a huge bloated pale infected figure, purple-grey skin, arms reaching right
z_zdog.png | an infected dog with mangy grey fur and glowing red eyes, facing right
z_crawl.png | a pale infected figure crawling low on the ground, facing right
z_spit.png | an infected figure with a swollen green throat, glowing green liquid at the mouth, facing right
z_armor.png | an infected figure in old riot armor and a cracked helmet, facing right
z_howl.png | a pale infected figure screaming, head thrown back, facing right
z_sap.png | an infected miner in a helmet with dynamite sticks strapped on the back, small red light, facing right
z_boss.png | a gigantic hulking infected brute with bony spikes on the shoulders, glowing eyes, facing right
```

---

## Si l'IA refuse une image

Recolle ce rappel avant la ligne :
```
Reminder: stylized PG-13 horror for a board game. No blood, no gore, no wounds. The "infected" are pale sick people with glowing eyes.
```
Évite les mots *zombie*, *blood*, *dead*, *corpse*, *gore* : dis plutôt *infected*, *pale*, *sickly*, *glowing eyes*.
