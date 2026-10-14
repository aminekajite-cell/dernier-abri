# Dernier Abri — Document de conception

## Le pitch

Un roguelite de cartes de survie zombie, **sans fin**. Le jour, tu fortifies ta maison avec des cartes : barricades, survivants armés, pièges, objets. La nuit, la horde sort des bois et attaque en temps réel. Il n'y a pas de secours : le but est de survivre une nuit de plus, encore et encore. Le joueur doit toujours se sentir en détresse.

Public visé : grand public, fans de survie zombie (Project Zomboid, They Are Billions) et de roguelites courts.
Plateformes visées : Steam (PC) puis mobile.

## La boucle de jeu

1. **Début** : tu prépares la partie : un de tes 3 decks (20 à 30 cartes, construits avec ta collection), un personnage (qui donne parfois une relique) et un lieu.
2. **Jour** : tu as **4 énergies**. Chaque carte coûte de 0 à 3 énergies selon sa puissance ; tu joues autant de cartes que ton énergie le permet (le Café, gratuit, donne +2 énergies). Les cartes non jouées **restent en main** pour les jours suivants. Chaque jour, la main est complétée jusqu'à 5 cartes (+1 avec une Radio en jeu, +1 avec le Grand sac à dos), avec au moins 1 nouvelle carte et 8 cartes au maximum. Une fois par jour, tu peux aussi **déplacer** une de tes unités vers une case libre.
3. **Nuit** : les zombies apparaissent sur l'anneau extérieur (les bois) et marchent vers la maison. Tes unités attaquent automatiquement. Les zombies frappent tout ce qui bloque leur chemin. Le bouton du bas passe la nuit en vitesse ×2.
4. **Aube** :
   - toutes les 4 nuits, la horde mute (bonus permanent pour les zombies) ;
   - toutes les 5 nuits, tu choisis 1 relique parmi 3 ;
   - tu choisis 1 carte parmi 3 (ou aucune), tirées selon leur rareté : elle arrive **d'office dans ta main du lendemain**, puis rejoint ton deck ;
   - au troc, tu dépenses ta ferraille (réparer, acheter, améliorer, jeter).
5. La partie continue jusqu'à ce que la maison tombe à 0 PV. Le Colosse attaque toutes les 10 nuits.

Score : nombre de nuits survécues, avec un record sauvegardé (et le nombre de zombies éliminés).

## La sauvegarde

- La partie en cours est sauvegardée automatiquement dans le navigateur (`localStorage`) : au début de chaque jour, après chaque carte jouée et à l'aube, avec le choix de cartes proposé.
- L'écran d'accueil propose « Continuer » si une partie est en cours. La sauvegarde est effacée à la victoire ou à la défaite.
- Recharger la page pendant la nuit ramène au jour, avec les cartes déjà posées. Recharger à l'aube garde les 3 mêmes cartes proposées.
- La sauvegarde porte un numéro de version, pour pouvoir gérer les anciennes sauvegardes lors des mises à jour (Steam).

## La carte

- Grille de 7 × 7 cases.
- L'anneau extérieur (24 cases) est la forêt : les zombies y apparaissent, le joueur ne peut rien y poser.
- La case centrale est la maison : 10 PV maximum.
- Les 24 cases intérieures restantes sont les emplacements du joueur.
- Les zombies avancent case par case vers la maison. Chacun a un style de marche : réduire d'abord l'écart en ligne, en colonne, ou couper en diagonale. Ils arrivent donc de tous les côtés et peuvent frapper l'abri depuis ses 8 cases voisines.
- Quand le pas préféré est bloqué par une unité, le zombie prend un autre pas libre qui le rapproche aussi de la maison. Il ne frappe que s'il est coincé. Les murs ralentissent et canalisent la horde ; pour la bloquer, il faut un anneau complet. Le Colosse fonce toujours tout droit.

## Les cartes

Il y a 40 cartes. Le deck de départ ne contient que les 8 cartes du personnage : les autres se gagnent à l'aube ou s'achètent au troc. Les unités posées restent en place d'une nuit à l'autre et gardent leurs dégâts. Poser une carte sur une case occupée remplace l'unité.

Coût en énergie :

- **0 énergie** : Café
- **1 énergie** : Barricade, Clôture, Sacs de sable, Gamin, Chien, Infirmière, Piège à loup, Essence, Barbelés, Fumigène, Appât, Conserves, Trousse de secours, Carte routière, Fusée de détresse
- **2 énergie** : Mur de pneus, Tireur, Arbalète, Lance-flammes, Bûcheron, Policier, Boucher, Moine, Projecteur, Radio, Cuisinier, Mécanicien, Mine, Fosse à pieux, Bonbonne de gaz, Outils
- **3 énergie** : Épave, Porte blindée, Sniper, Fusil à pompe, Mitrailleuse, Cocktails, Sirène, Chef de groupe, Panneau solaire, Dynamite

Rareté : à chaque tirage (aube, troc), une carte est commune à 67 %, rare à 27 %, épique à 6 %. Les cartes les plus puissantes sont épiques.

| Carte | Type | Rareté | PV | Effet |
|---|---|---|---|---|
| Barricade | Défense | Commune | 6 | Planches clouées : bloque les zombies, 6 PV |
| Épave | Défense | Rare | 12 | Carcasse de voiture : bloque, 12 PV |
| Clôture | Défense | Commune | 5 | Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe |
| Sacs de sable | Défense | Commune | 5 | Bloque, 5 PV, ne perd jamais plus de 1 PV par coup |
| Porte blindée | Défense | Épique | 15 | Bloque, 15 PV, seulement sur une case collée à l’abri |
| Mur de pneus | Défense | Rare | 8 | Bloque, 8 PV, laisse une flaque d’essence en tombant |
| Tireur | Tireur | Commune | 3 | 1 dégât par tour, portée 2 |
| Sniper | Tireur | Rare | 2 | 3 dégâts tous les 2 tours, portée illimitée |
| Fusil à pompe | Tireur | Épique | 4 | 2 dégâts à tous les zombies autour de lui |
| Arbalète | Tireur | Rare | 3 | Tous les 2 tours, 2 dégâts à 2 zombies différents, portée 3 |
| Lance-flammes | Tireur | Rare | 4 | 1 dégât au contact et enflamme le zombie : 1 dégât par tour pendant 3 tours |
| Mitrailleuse | Tireur | Épique | 3 | 3 tirs de 1 dégât par tour, portée 2, s’enraye 1 tour sur 3 |
| Cocktails | Tireur | Épique | 2 | Tous les 3 tours, un cocktail sur le groupe le plus serré : 2 dégâts et feu, portée 3 |
| Gamin | Tireur | Commune | 1 | Lance-pierre : 2 tirs de 1 dégât par tour, portée 2, mais 1 seul PV |
| Bûcheron | Corps à corps | Commune | 5 | 2 dégâts par tour au corps à corps, 5 PV |
| Chien | Corps à corps | Commune | 3 | Mord 2 fois par tour au corps à corps |
| Policier | Corps à corps | Commune | 4 | 1 dégât au contact et repousse le zombie d’une case |
| Boucher | Corps à corps | Rare | 4 | 2 dégâts au contact, récupère 1 PV à chaque zombie tué |
| Moine | Corps à corps | Rare | 6 | 1 dégât à tous les zombies autour de lui, 6 PV |
| Infirmière | Soutien | Commune | 2 | Soigne 1 PV à une unité voisine tous les 2 tours |
| Projecteur | Soutien | Rare | 2 | Les unités autour font +1 dégât |
| Radio | Soutien | Rare | 2 | Tant qu'elle tient, tu pioches 1 carte de plus chaque jour |
| Cuisinier | Soutien | Rare | 2 | À chaque aube, l’abri récupère 1 PV |
| Mécanicien | Soutien | Rare | 3 | Répare 1 PV à une défense voisine à chaque tour |
| Sirène | Soutien | Épique | 4 | Les zombies à 2 cases ou moins marchent vers elle au lieu de l’abri |
| Chef de groupe | Soutien | Épique | 3 | Tous les 3 tours, les unités autour attaquent une fois de plus |
| Panneau solaire | Soutien | Épique | 2 | Projecteurs et clôtures marchent pendant une coupure, clôtures à 2 dégâts |
| Piège à loup | Piège | Commune | 1 | Le premier zombie qui marche dessus subit 5 dégâts |
| Essence | Piège | Commune | 1 | Flaque enflammée : 2 dégâts par tour aux zombies dessus, s'éteint à l'aube |
| Mine | Piège | Rare | 1 | Explose au passage : 6 dégâts sur la case et autour |
| Barbelés | Piège | Commune | 1 | Ne bloque pas : 1 dégât et ralentit chaque zombie qui passe, reste en place |
| Fosse à pieux | Piège | Rare | 4 | 3 dégâts à chaque zombie qui tombe dedans, casse après 4 zombies |
| Bonbonne de gaz | Piège | Épique | 1 | Bloque. Explose quand un zombie la frappe : 5 dégâts sur la case et autour |
| Fumigène | Piège | Commune | 1 | Le premier zombie qui passe libère la fumée : les zombies autour sont perdus 3 tours |
| Appât | Piège | Commune | 3 | Viande crue : 3 zombies s’arrêtent 3 tours pour manger |
| Dynamite | Piège | Épique | 1 | Explose au 8ᵉ tour de la nuit : 8 dégâts sur la case et autour |
| Conserves | Objet | Commune | – | Utilise-la sur l'abri : +3 PV |
| Outils | Objet | Commune | – | Utilise-les sur l'abri : toutes tes unités récupèrent 3 PV |
| Trousse de secours | Objet | Rare | – | Utilise-la sur une de tes unités blessées : elle récupère tous ses PV |
| Café | Objet | Épique | – | Utilise-le sur l’abri : il ne compte pas, et tu joues 1 carte de plus aujourd’hui |
| Carte routière | Objet | Rare | – | Utilise-la sur l’abri : regarde les 3 prochaines cartes de ta pioche et prends-en une |
| Fusée de détresse | Objet | Rare | – | Utilise-la sur l’abri : la nuit prochaine, la horde n’arrive que d’un seul côté |

Règles détaillées :
- « Autour » désigne les 8 cases voisines.
- La portée est mesurée en cases, diagonales comprises.
- Les tireurs visent le zombie le plus proche de la maison, puis le plus blessé.
- Les pièges ne bloquent pas le passage, sauf la Bonbonne de gaz.
- L'essence disparaît à l'aube. Le piège, la mine, le fumigène et la dynamite disparaissent après usage. La fosse et l'appât s'usent.
- Les objets se jouent sur la maison (la Trousse sur une unité blessée) et ont un effet immédiat.
- Le feu (essence, lance-flammes, cocktails, explosions) ignore le blindage.

## Les réactions (agir pendant la nuit)

- Les cartes de la catégorie **Réaction** ne se jouent que pendant la nuit, avec l'énergie **gardée** du jour : chaque jour, il faut choisir entre construire et garder de quoi réagir.
- Grenade (1, commune) : 5 dégâts sur la case visée et autour. Tir de l'abri (1, commune) : 6 dégâts au zombie le plus proche de l'abri. Réparation express (1, commune) : une unité récupère 5 PV. Molotov (2, rare) : 2 dégâts en zone et les zombies brûlent 4 tours. Klaxon (2, rare) : tous les zombies (sauf le Colosse) reculent d'une case. Adrénaline (2, épique) : les unités attaquent deux fois pendant 3 tours.
- Chaque personnage commence avec une Grenade.

## Les factions et leurs chefs

Chaque unité appartient au plus à une faction. Plus il y a d'unités d'une même faction sur la carte, plus la faction est forte (2 paliers). Le **Chef** de la faction (carte légendaire : 1 exemplaire, 3 énergie, 100 points de survie, jamais proposé à l'aube ni au troc) lui fait gagner **un palier** tant qu'il est en vie. Les badges sous la horde montrent le nombre d'unités et les paliers atteints (★).

| Faction | Cartes | Palier 1 | Palier 2 | Chef |
|---|---|---|---|---|
| 👮 Police | Policier, Tireur, Projecteur, Sirène | 3 : les policiers perdent 1 PV de moins par coup | 5 : +1 portée | Le Commissaire (2 dégâts, portée 2) |
| 🎖️ Militaires | Sniper, Mitrailleuse, Fusil à pompe, Mine, Dynamite | 3 : +1 dégât | 5 : mines et dynamite +3 dégâts | La Sergente (3 tirs, portée 3) |
| ⛑️ Soignants | Infirmière, Cuisinier | 2 : soins +1 PV | 4 : toutes les unités +2 PV à l'aube | La Doctoresse (soigne 2 PV chaque tour) |
| 🔥 Pyromanes | Essence, Lance-flammes, Cocktails, Bonbonne, Pneus | 3 : feu +1 dégât par tour | 5 : les zombies qui meurent en brûlant explosent | Le Pyromane (enflamme tout à 2 cases) |
| 🪤 Trappeurs | Piège à loup, Fosse, Barbelés, Fumigène, Appât, Arbalète | 3 : pièges +2 dégâts | 5 : +4 au total | Le Braconnier (3 dégâts, portée 4) |
| 🐕 Fermiers | Chien, Bûcheron, Boucher | 2 : corps à corps +1 dégât | 4 : +1 PV par zombie tué | La Fermière (2 coups de 2, 8 PV) |
| ⚡ Bricoleurs | Clôture, Panneau solaire, Mécanicien, Radio | 3 : clôtures +1 dégât | 5 : clôtures étourdissantes, réparations +1 | L'Ingénieur (répare 2 PV par tour) |
| 🏠 Communauté | Chef de groupe, Moine, Gamin | 2 : l'abri +1 PV à l'aube | 4 : +1 énergie par jour | Le Maire (les voisins attaquent plus souvent) |

L'étape suivante ajoute de nouvelles cartes pour que chaque faction ait assez de cartes pour un deck complet.

## Le choix de la nuit

C'est un moment rare : environ 1 aube sur 4, à partir de la nuit 3. Après le troc, on choisit alors la nuit suivante entre deux propositions : une prudente et une risquée, chacune avec un événement différent. Les autres soirs, la nuit est normale, sans bonus.

| Nuit | Horde | Récompense à l'aube |
|---|---|---|
| Tranquille | −30 % | aucune |
| Ordinaire | normale | +6 ferraille |
| De pillage | +40 % | une carte rare |
| Sanglante | +70 % | une relique |

## La collection et les decks

- **Collection** (permanente) : les types de cartes débloqués. On commence avec 22 cartes de base. Chaque partie rapporte des **points de survie** : 10 par nuit survécue, plus 1 tous les 4 zombies. On débloque une carte pour toujours : commune 15 points, rare 35, épique 70. Les parties du défi quotidien ne rapportent pas de points.
- **Decks** : 3 emplacements sauvegardés. Un deck compte 20 à 30 cartes, avec au maximum 3 exemplaires d'une commune, 2 d'une rare, 1 d'une épique. Chaque emplacement commence avec le deck de départ (20 cartes équilibrées).
- **Pendant la partie** : on pioche dans son deck. Une unité posée quitte la pioche ; quand elle est détruite, qu'un piège se déclenche ou qu'elle est remplacée, sa carte revient dans la défausse et peut être repiochée. Les objets et les réactions vont dans la défausse après usage. Les unités offertes par le jeu (lieu, événements, pneus en feu) ne sont pas des cartes et ne reviennent pas.
- Les cartes gagnées à l'aube et au troc sont des **renforts temporaires** : elles ne valent que pour la partie en cours, et ne sont proposées que parmi les cartes de la collection.
- Le personnage ne fixe plus le deck : il donne seulement sa relique de départ.
- Défi quotidien : un deck de 24 cartes tiré au sort pour la journée, avec toutes les cartes.

## Les survivants nommés

C'est l'identité du jeu : on s'attache à ses survivants, et on les perd.

- Chaque humain posé (tireurs, corps à corps, infirmière, cuisinier, mécanicien, chef de groupe) et chaque chien reçoit un **prénom** et un **trait** tirés au hasard. Le prénom s'affiche sous l'unité pendant le jour.
- Chaque survivant compte ses zombies tués. Toucher une unité affiche sa fiche (prénom, métier, trait, victimes, PV).
- À l'aube : le **héros de la nuit** (celui qui a tué le plus) et les **survivants tombés** sont annoncés.
- Un survivant tombé est perdu pour de bon et rejoint le **mémorial** (visible en touchant « Jour X », et sur l'écran de fin).

| Trait | Effet |
|---|---|
| Costaud | +2 PV |
| Fragile | −1 PV |
| Précis | +1 dégât (seulement pour les unités qui attaquent) |
| Myope | −1 portée (seulement pour les tireurs à distance) |
| Increvable | survit une fois à un coup fatal |
| Coriace | récupère 1 PV à chaque aube |
| Aguerri | +1 dégât après 10 zombies tués (seulement pour les unités qui attaquent) |

## Les zombies

Les zombies sont peu nombreux mais coriaces : ils doivent arriver jusqu'aux défenses, pas mourir à la lisière du bois.

| Zombie | PV de base | Vitesse | Dégâts par coup | Particularité |
|---|---|---|---|---|
| Rôdeur | 11 | avance tous les 2 tours | 1 | lent |
| Coureur | 8 | avance chaque tour | 1 | rapide |
| Gonflé | 30 | avance tous les 3 tours | 2 | très lent, 2 dégâts par coup |
| Chien zombie | 4 | avance chaque tour | 1 | rapide et fragile |
| Rampant | 8 | avance tous les 2 tours | 1 | passe sous les défenses (barricades, épaves…) |
| Cracheur | 11 | avance tous les 2 tours | 1 | crache sur ce qui est à 2 cases devant lui |
| Blindé | 19 | avance tous les 2 tours | 1 | encaisse 1 dégât de moins par coup, sauf le feu |
| Hurleur | 15 | avance tous les 2 tours | 1 | appelle 2 rôdeurs en mourant |
| Le Colosse | 112 | avance tous les 3 tours | 2 | boss de la nuit 10 : détruit une défense d’un coup et frappe l’abri sans mourir |

Leurs PV restent stables jusqu'à la nuit 10, puis augmentent de 12 % par nuit (en plus des mutations).
Les zombies apparaissent de façon échelonnée pendant la nuit, à une position aléatoire de la forêt (d'un seul côté après une Fusée de détresse). Les Colosses arrivent à partir du 10ᵉ tour des nuits 10, 20, 30…

## Les vagues

Nuits 1 à 10 : table fixe. Ensuite, chaque nuit ajoute des zombies de chaque type (+0,6 rôdeur, +0,36 coureur, +0,24 gonflé, chien, rampant et blindé, +0,18 cracheur, +0,15 hurleur), et un Colosse de plus toutes les 10 nuits.

| Nuit | Rôdeur | Coureur | Gonflé | Chien zombie | Rampant | Cracheur | Blindé | Hurleur | Le Colosse | PV des zombies |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | ×1.00 |
| 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | ×1.00 |
| 3 | 4 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | ×1.00 |
| 4 | 4 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | ×1.00 |
| 5 | 4 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ×1.00 |
| 6 | 4 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | ×1.00 |
| 7 | 5 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | ×1.00 |
| 8 | 5 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | ×1.00 |
| 9 | 5 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | ×1.00 |
| 10 | 5 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ×1.00 |
| 15 | 8 | 4 | 2 | 2 | 2 | 2 | 2 | 2 | 0 | ×1.60 |
| 20 | 11 | 6 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | ×2.20 |
| 30 | 17 | 9 | 6 | 6 | 6 | 5 | 6 | 4 | 3 | ×3.40 |

## Les événements de l'aube

À partir de la nuit 2, environ une aube sur deux propose une petite histoire avec deux choix : un choix risqué qui peut rapporter gros, et un choix prudent. Ils arrivent après la relique éventuelle et avant le choix de la carte.

| Événement | Choix risqué | Choix prudent |
|---|---|---|
| Un inconnu à la porte | L'accueillir : un survivant gratuit, ou 30 % de risque qu'il soit mordu (abri −2 PV) | Fermer la porte |
| Des pillards | Les repousser : +6 ferraille, un défenseur perd 3 PV | Payer 8 ferraille |
| Le supermarché | Fouiller : 60 % une carte rare et +5 ferraille, sinon abri −2 PV | Rester à l'abri |
| Un message radio | Y aller : 2 cartes communes, −1 énergie demain | Ignorer |
| Un chien errant | L'adopter : un chien gratuit | Le chasser |
| Une caisse militaire | L'ouvrir : 50 % une amélioration gratuite, sinon une unité perd 4 PV | La laisser |
| Un mécanicien de passage | Payer 6 ferraille : toutes les unités récupèrent leurs PV | Refuser |
| Un blessé dans le fossé | Soigner : abri −1 PV, +1 Trousse de secours | Passer son chemin |

## Les mutations de la horde

Toutes les 4 nuits (nuits 4, 8, 12…), la horde gagne une mutation tirée au hasard, permanente pour toute la partie. Elle est annoncée à l'aube, et le bandeau du haut prévient la veille (« mute à l'aube »). Le but : casser les défenses qui semblaient sûres (par exemple une armée de tireurs) sans ajouter de mécanique à gérer pour le joueur.

| Mutation | Effet |
|---|---|
| Peau épaisse | Les zombies ont +20 % de PV (cumulable) |
| Horde nombreuse | +20 % de zombies chaque nuit (cumulable) |
| Enragés | Les rôdeurs et les coureurs font +1 dégât par coup |
| Carapace | Les rôdeurs encaissent 1 dégât de moins par coup (sauf le feu et les explosions) |
| Régénération | Les zombies récupèrent 1 PV tous les 3 tours |
| Putréfaction | En mourant, un zombie éclabousse les unités autour de lui : 1 dégât |
| Frénésie | Les zombies lents et très lents avancent plus vite |

## Les personnages

| Personnage | Deck de départ | Relique de départ |
|---|---|---|
| Le survivant | Barricade, Barricade, Épave, Tireur, Tireur, Bûcheron, Piège à loup, Conserves | aucune |
| La policière | Barricade, Clôture, Tireur, Tireur, Sniper, Policier, Projecteur, Conserves | Lunette de visée |
| Le fermier | Barricade, Barricade, Piège à loup, Piège à loup, Mine, Essence, Fosse à pieux, Chien | Manuel du trappeur |
| L’infirmière | Barricade, Épave, Tireur, Bûcheron, Infirmière, Conserves, Outils, Trousse de secours | Marmite de soupe |

## Les lieux

On choisit un lieu après le personnage. Chaque lieu change le départ et une règle.

| Lieu | Effet | Déblocage |
|---|---|---|
| La maison des bois | Ni bonus, ni malus | Dès le départ |
| La ferme | Rivière au nord : la horde arrive par 3 côtés. 2 barricades au départ | Record de 5 nuits |
| La station-service | 2 bonbonnes de gaz et 10 ferraille au départ, l'Essence est gratuite. Horde +15 % | Record de 8 nuits |
| Le centre commercial | Abri à 15 PV. Zombies +15 % de PV | Record de 12 nuits |

## La progression entre les parties

Sauvegardée dans le navigateur : meilleur record, total de nuits survécues, nombre de parties. Les parties du défi quotidien ne comptent pas.

- Personnages : la Policière à 8 nuits au total, le Fermier à 20, l'Infirmière à 35.
- Lieux : selon le record (voir ci-dessus).
- Les cartes se débloquent désormais dans la collection avec les points de survie (voir « La collection et les decks »).
- L'écran d'accueil indique le prochain déblocage ; l'écran de fin liste ce qui vient d'être débloqué.

## Les reliques

Une relique reste active toute la partie. On en choisit 1 parmi 3 toutes les 5 nuits : c'est rare et ça doit compter.

| Relique | Effet |
|---|---|
| Lunette de visée | Tes tireurs ont +1 portée |
| Manuel du trappeur | Tes pièges font +2 dégâts |
| Marmite de soupe | À chaque aube, l’abri récupère 1 PV |
| Grand sac à dos | Tu pioches 1 carte de plus chaque jour |
| Caisse de clous | Tes défenses ont +3 PV |
| Adrénaline | Tes unités au corps à corps font +1 dégât |
| Groupe électrogène | Plus de coupure de courant, clôtures à 2 dégâts |
| Aimant | +3 ferraille à chaque aube |

## La ferraille, le troc et les améliorations

- Chaque zombie éliminé rapporte 1 ferraille, le Colosse 15. Les prix sont élevés : il faut économiser plusieurs nuits pour un achat important.
- À chaque aube, le troc propose :

| Action | Coût | Effet |
|---|---|---|
| Réparer l’abri | 15 | +3 PV à l’abri |
| Acheter une carte | 12 | Une carte au choix parmi 2, ajoutée au deck |
| Améliorer une carte | 25 (+15 par amélioration déjà faite) | Toutes tes cartes de ce type sont améliorées. Plus cher à chaque fois |
| Jeter une carte | 10 | Retire une carte de ton deck |

- Une amélioration vaut pour toutes les cartes de ce type, y compris celles déjà posées, pour toute la partie. Le nom prend un « + ». Elle coûte 25, puis 40, 55… : c'est un investissement rare. Effet selon la carte : +1 dégât (unités qui attaquent), +2 dégâts (pièges qui explosent ou blessent), +4 PV (défenses), +2 PV (soutien), +1 tour (fumigène, appât), +2 PV soignés (Conserves, Outils).

## Les événements

Chaque nuit après la première a 80 % de chances d'avoir un événement (20 % de nuits calmes).

| Événement | Effet |
|---|---|
| Nuit calme | Aucun effet |
| Brouillard | Portée des tireurs −1 |
| Pleine lune | +50 % de zombies |
| Pluie | L'essence ne brûle pas |
| Coupure de courant | Projecteurs et clôtures inactifs |
| Horde affamée | Les rôdeurs deviennent des coureurs |

## L'équilibrage

L'équilibrage est vérifié par simulation (`node tools/simulate.js`). Un bot pose ses cartes en testant toutes les possibilités sur une nuit simulée, puis joue la vraie nuit avec un autre tirage aléatoire.

- Le bot joue le Survivant. À l'aube, il choisit comme un joueur : il teste chacune des 3 cartes sur la nuit suivante et garde la meilleure. Il prend une relique au hasard et dépense sa ferraille (réparer si l'abri est à 5 PV ou moins, sinon améliorer). Il joue jusqu'à la chute de l'abri. `HASARD=1 node tools/simulate.js` le fait choisir ses cartes au hasard.
- Cible : le bot tombe en moyenne vers la nuit 7-8, et environ 40 % des zombies arrivent au contact d'une unité ou de l'abri (la simulation affiche cette part).
- Résultat actuel (60 parties) : chute en moyenne à la nuit 4,1 ; 70 % des zombies arrivent au contact. Corrigé ensuite : avant, 22 des 24 trajets entraient dans l'abri par les 2 cases à gauche et à droite de la maison, donc deux murs solides suffisaient presque. Le bot place mieux qu'un débutant, mais Amine trouvait le jeu trop facile : la cible a été durcie.
- Les deux premières nuits sont volontairement plus faciles pour l'apprentissage.
- Un placement au hasard perd généralement dès la nuit 2 : le placement doit compter.

## La direction visuelle

- Vue de dessus, ambiance forêt la nuit, maison au toit rouge au centre.
- Le jour : carte lisible, emplacements visibles quand une carte est sélectionnée.
- La nuit : obscurité avec des sources de lumière (maison, projecteurs, flammes, tirs). Les zombies ont des yeux rouges lumineux pour rester visibles.
- Retours visuels : traînées de balles, éclairs de tir, coups de hache, explosions, taches de sang qui restent au sol, tremblement d'écran quand la maison est touchée.
- Unités sur un cercle de couleur selon leur rôle : bois (défense), jaune (tireur), rouge-orangé (corps à corps), bleu (soutien), rouge (piège), violet clair (objet).

## Le défi quotidien

- Chaque jour, tout le monde joue la même partie : même graine de hasard, même personnage et même lieu (tirés à partir de la date), toutes les cartes disponibles.
- Rejouable à volonté ; le meilleur score du jour est gardé dans le navigateur. Il ne compte pas pour les déblocages.
- Tout le hasard de la partie (pioche, nuits, aube, événements, mutations, prénoms) passe par un générateur à graine sauvegardé avec la partie. Les effets visuels gardent un hasard libre.
- Pas encore de classement en ligne : il faudra un serveur (ou les classements Steam).

## Le tutoriel

À la toute première partie, une bulle jaune guide les premiers gestes : choisir une carte, la poser, l'énergie, la nuit et l'accélération, puis le choix de la carte à l'aube. Elle ne revient plus ensuite.

## Le son

- Tous les sons sont générés en code (Web Audio, `src/audio.js`) : tirs différents selon l'arme, coups au corps à corps, morsures, coups sur l'abri, explosions, grognements, mort d'un survivant, carillon de l'aube, mutation.
- Ambiance de nuit : vent et grondement sourd dont le volume suit l'obscurité.
- Un bouton en haut coupe ou remet le son (choix mémorisé).
- Plus tard : remplacer par des sons d'un pack libre de droits si besoin.

## Le style graphique

- Tout est dessiné en code, dans un seul style : contour sombre autour de chaque forme, ombre portée, ombrage, petits détails (sang, rouille, coutures), palette sombre et désaturée.
- Survivants : une silhouette commune vue de dessus, habillée selon le métier (tenue, couvre-chef, arme, accessoire) avec une couleur de peau variable.
- Zombies : une silhouette commune, chaque type a sa taille, sa peau, ses vêtements et un détail reconnaissable (casque du blindé, pustules du gonflé, os du Colosse…).
- Décision : un pack Kenney a été essayé puis retiré (style trop « cartoon »). Aucun pack du marché ne couvre 16 survivants, 9 zombies, défenses, pièges et décors dans un même style. Pour la sortie Steam, un artiste pourra tout redessiner en partant de ce style.

## L'historique des décisions

- Premier concept « Blackout » (garder une ville alimentée en électricité) : abandonné, jugé pas assez intéressant.
- Le thème de survie zombie a été retenu.
- Une version en cartes et icônes a été jugée trop abstraite : passage à une carte visuelle avec une nuit animée en temps réel, en gardant les cartes pour la construction le jour.
- Le développement se fait à 100 % avec Claude Code.
- Deck de départ réduit à 8 cartes par personnage : avec 40 cartes, un deck complet dès le départ rendrait les parties toutes pareilles.
- La carte choisie à l'aube arrive d'office dans la main du lendemain (demande d'Amine).
- Une seule monnaie (la ferraille) pour le troc : plusieurs ressources seraient trop lourdes sur petit écran.
- Trajets variés et contournement des murs : avant, deux murs à gauche et à droite de la maison bloquaient presque toute la horde.
- Survivants nommés, avec trait et mort définitive : identité du jeu pour Steam (on s'attache, on raconte ses parties).
- Énergie (4 par jour, cartes à 0-3) à la place de « 2 cartes par jour », main conservée d'un jour à l'autre et déplacement d'une unité par jour (Amine : 2 cartes ne laissaient pas de vraie stratégie).
- 8 factions avec un Chef légendaire, à la place des 6 familles.
- Collection permanente et decks construits avant la partie (Amine : plus de stratégie de deck). Deck de 30 cartes au maximum plutôt que 40, pour que la stratégie ne se dilue pas.
- Réactions de nuit, familles et choix de la nuit (rejouabilité et décisions). PV des zombies −25 % (Amine : trop dur), puis +25 % et choix de la nuit rendu rare (1 aube sur 4).
- Amine teste lui-même l'équilibrage ; la simulation n'est plus lancée à chaque changement.
- PV des zombies doublés une seconde fois (Amine était invincible à la nuit 15). Le bot tombe alors vers la nuit 4 : il joue nettement moins bien qu'Amine, la simulation sert surtout à comparer.
- Zombies deux fois plus coriaces mais 40 % moins nombreux (Amine : « les zombies meurent avant d'atteindre mes unités »). Avant, seuls 26 % arrivaient au contact.
- Mutations de la horde toutes les 4 nuits plutôt qu'une gestion de nourriture ou de munitions (demande d'Amine : garder le jeu fun et simple). Elles répondent au problème de l'« armée de tireurs » invincible dès la nuit 5.
- Passage en survie sans fin (demande d'Amine : le jeu finissait trop vite et était trop facile). Ferraille plus rare à dépenser (prix ×2 à ×3), améliorations plus chères à chaque fois, reliques toutes les 5 nuits, rareté des cartes.

## Les questions ouvertes

- Prochaines étapes déjà proposées : lieux (ferme, station-service, centre commercial), déblocages entre les parties, niveaux de difficulté, défi quotidien, succès Steam, tutoriel, journal de fin de partie, expéditions, survivants qui demandent asile, choix entre deux nuits, synergies visibles.

- Lieux différents d'une partie à l'autre (ferme, station-service, centre commercial) ?
- Le nom définitif du jeu.
