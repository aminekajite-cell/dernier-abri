# Dernier Abri — Document de conception

## Le pitch

Un roguelite de cartes de survie zombie. Le jour, tu fortifies ta maison avec des cartes : barricades, survivants armés, pièges, objets. La nuit, la horde sort des bois et attaque en temps réel. Survis 10 nuits jusqu'à l'arrivée des secours.

Public visé : grand public, fans de survie zombie (Project Zomboid, They Are Billions) et de roguelites courts.
Plateformes visées : Steam (PC) puis mobile.

## La boucle de jeu

1. **Début** : tu choisis un personnage, qui donne un deck de départ de 8 cartes et parfois une relique.
2. **Jour** : tu pioches 5 cartes (+1 avec une Radio en jeu, +1 avec le Grand sac à dos) et tu en joues 2 (le Café en donne une de plus).
3. **Nuit** : les zombies apparaissent sur l'anneau extérieur (les bois) et marchent vers la maison. Tes unités attaquent automatiquement. Les zombies frappent tout ce qui bloque leur chemin. Le bouton du bas passe la nuit en vitesse ×2.
4. **Aube** :
   - après les nuits 3, 6 et 8, tu choisis 1 relique parmi 3 ;
   - tu choisis 1 carte parmi 3 (ou aucune) : elle arrive **d'office dans ta main du lendemain**, puis rejoint ton deck ;
   - au troc, tu dépenses ta ferraille (réparer, acheter, améliorer, jeter).
5. Après 10 nuits (la dernière avec le Colosse) : victoire. Si la maison tombe à 0 PV : défaite.

Score : nombre de zombies éliminés, avec un record sauvegardé.

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
- Les zombies avancent case par case vers la maison, en ligne droite (ils réduisent d'abord le plus grand écart, ligne ou colonne).

## Les cartes

Il y a 40 cartes. Le deck de départ ne contient que les 8 cartes du personnage : les autres se gagnent à l'aube ou s'achètent au troc. Les unités posées restent en place d'une nuit à l'autre et gardent leurs dégâts. Poser une carte sur une case occupée remplace l'unité.

| Carte | Type | PV | Effet |
|---|---|---|---|
| Barricade | Défense | 6 | Planches clouées : bloque les zombies, 6 PV |
| Épave | Défense | 12 | Carcasse de voiture : bloque, 12 PV |
| Clôture | Défense | 5 | Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe |
| Sacs de sable | Défense | 5 | Bloque, 5 PV, ne perd jamais plus de 1 PV par coup |
| Porte blindée | Défense | 15 | Bloque, 15 PV, seulement sur une case collée à l’abri |
| Mur de pneus | Défense | 8 | Bloque, 8 PV, laisse une flaque d’essence en tombant |
| Tireur | Tireur | 3 | 1 dégât par tour, portée 2 |
| Sniper | Tireur | 2 | 3 dégâts tous les 2 tours, portée illimitée |
| Fusil à pompe | Tireur | 4 | 2 dégâts à tous les zombies autour de lui |
| Arbalète | Tireur | 3 | Tous les 2 tours, 2 dégâts à 2 zombies différents, portée 3 |
| Lance-flammes | Tireur | 4 | 1 dégât au contact et enflamme le zombie : 1 dégât par tour pendant 3 tours |
| Mitrailleuse | Tireur | 3 | 3 tirs de 1 dégât par tour, portée 2, s’enraye 1 tour sur 3 |
| Cocktails | Tireur | 2 | Tous les 3 tours, un cocktail sur le groupe le plus serré : 2 dégâts et feu, portée 3 |
| Gamin | Tireur | 1 | Lance-pierre : 2 tirs de 1 dégât par tour, portée 2, mais 1 seul PV |
| Bûcheron | Corps à corps | 5 | 2 dégâts par tour au corps à corps, 5 PV |
| Chien | Corps à corps | 3 | Mord 2 fois par tour au corps à corps |
| Policier | Corps à corps | 4 | 1 dégât au contact et repousse le zombie d’une case |
| Boucher | Corps à corps | 4 | 2 dégâts au contact, récupère 1 PV à chaque zombie tué |
| Moine | Corps à corps | 6 | 1 dégât à tous les zombies autour de lui, 6 PV |
| Infirmière | Soutien | 2 | Soigne 1 PV à une unité voisine tous les 2 tours |
| Projecteur | Soutien | 2 | Les unités autour font +1 dégât |
| Radio | Soutien | 2 | Tant qu'elle tient, tu pioches 1 carte de plus chaque jour |
| Cuisinier | Soutien | 2 | À chaque aube, l’abri récupère 1 PV |
| Mécanicien | Soutien | 3 | Répare 1 PV à une défense voisine à chaque tour |
| Sirène | Soutien | 4 | Les zombies à 2 cases ou moins marchent vers elle au lieu de l’abri |
| Chef de groupe | Soutien | 3 | Tous les 3 tours, les unités autour attaquent une fois de plus |
| Panneau solaire | Soutien | 2 | Projecteurs et clôtures marchent pendant une coupure, clôtures à 2 dégâts |
| Piège à loup | Piège | 1 | Le premier zombie qui marche dessus subit 5 dégâts |
| Essence | Piège | 1 | Flaque enflammée : 2 dégâts par tour aux zombies dessus, s'éteint à l'aube |
| Mine | Piège | 1 | Explose au passage : 6 dégâts sur la case et autour |
| Barbelés | Piège | 1 | Ne bloque pas : 1 dégât et ralentit chaque zombie qui passe, reste en place |
| Fosse à pieux | Piège | 4 | 3 dégâts à chaque zombie qui tombe dedans, casse après 4 zombies |
| Bonbonne de gaz | Piège | 1 | Bloque. Explose quand un zombie la frappe : 5 dégâts sur la case et autour |
| Fumigène | Piège | 1 | Le premier zombie qui passe libère la fumée : les zombies autour sont perdus 3 tours |
| Appât | Piège | 3 | Viande crue : 3 zombies s’arrêtent 3 tours pour manger |
| Dynamite | Piège | 1 | Explose au 8ᵉ tour de la nuit : 8 dégâts sur la case et autour |
| Conserves | Objet | – | Utilise-la sur l'abri : +3 PV |
| Outils | Objet | – | Utilise-les sur l'abri : toutes tes unités récupèrent 3 PV |
| Trousse de secours | Objet | – | Utilise-la sur une de tes unités blessées : elle récupère tous ses PV |
| Café | Objet | – | Utilise-le sur l’abri : il ne compte pas, et tu joues 1 carte de plus aujourd’hui |
| Carte routière | Objet | – | Utilise-la sur l’abri : regarde les 3 prochaines cartes de ta pioche et prends-en une |
| Fusée de détresse | Objet | – | Utilise-la sur l’abri : la nuit prochaine, la horde n’arrive que d’un seul côté |

Règles détaillées :
- « Autour » désigne les 8 cases voisines.
- La portée est mesurée en cases, diagonales comprises.
- Les tireurs visent le zombie le plus proche de la maison, puis le plus blessé.
- Les pièges ne bloquent pas le passage, sauf la Bonbonne de gaz.
- L'essence disparaît à l'aube. Le piège, la mine, le fumigène et la dynamite disparaissent après usage. La fosse et l'appât s'usent.
- Les objets se jouent sur la maison (la Trousse sur une unité blessée) et ont un effet immédiat.
- Le feu (essence, lance-flammes, cocktails, explosions) ignore le blindage.

## Les zombies

| Zombie | PV de base | Vitesse | Dégâts par coup | Particularité |
|---|---|---|---|---|
| Rôdeur | 3 | avance tous les 2 tours | 1 | lent |
| Coureur | 2 | avance chaque tour | 1 | rapide |
| Gonflé | 8 | avance tous les 3 tours | 2 | très lent, 2 dégâts par coup |
| Chien zombie | 1 | avance chaque tour | 1 | rapide et fragile |
| Rampant | 2 | avance tous les 2 tours | 1 | passe sous les défenses (barricades, épaves…) |
| Cracheur | 3 | avance tous les 2 tours | 1 | crache sur ce qui est à 2 cases devant lui |
| Blindé | 5 | avance tous les 2 tours | 1 | encaisse 1 dégât de moins par coup, sauf le feu |
| Hurleur | 4 | avance tous les 2 tours | 1 | appelle 2 rôdeurs en mourant |
| Le Colosse | 40 | avance tous les 3 tours | 2 | boss de la nuit 10 : détruit une défense d’un coup et frappe l’abri sans mourir |

Les PV des zombies augmentent de 10 % par nuit (nuit 10 : +90 %).
Les zombies apparaissent de façon échelonnée pendant la nuit, à une position aléatoire de la forêt (d'un seul côté après une Fusée de détresse). Le Colosse arrive au 10ᵉ tour de la nuit 10.

## Les vagues

| Nuit | Rôdeur | Coureur | Gonflé | Chien zombie | Rampant | Cracheur | Blindé | Hurleur | Le Colosse |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | 5 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| 4 | 6 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 5 | 6 | 2 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 6 | 7 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 7 | 7 | 3 | 1 | 2 | 1 | 1 | 1 | 1 | 0 |
| 8 | 7 | 3 | 2 | 2 | 2 | 1 | 1 | 1 | 0 |
| 9 | 8 | 3 | 2 | 2 | 2 | 2 | 1 | 1 | 0 |
| 10 | 8 | 4 | 2 | 3 | 2 | 2 | 2 | 1 | 1 |

## Les personnages

| Personnage | Deck de départ | Relique de départ |
|---|---|---|
| Le survivant | Barricade, Barricade, Épave, Tireur, Tireur, Bûcheron, Piège à loup, Conserves | aucune |
| La policière | Barricade, Clôture, Tireur, Tireur, Sniper, Policier, Projecteur, Conserves | Lunette de visée |
| Le fermier | Barricade, Barricade, Piège à loup, Piège à loup, Mine, Essence, Fosse à pieux, Chien | Manuel du trappeur |
| L’infirmière | Barricade, Épave, Tireur, Bûcheron, Infirmière, Conserves, Outils, Trousse de secours | Marmite de soupe |

## Les reliques

Une relique reste active toute la partie. On en choisit 1 parmi 3 après les nuits 3, 6 et 8.

| Relique | Effet |
|---|---|
| Lunette de visée | Tes tireurs ont +1 portée |
| Manuel du trappeur | Tes pièges font +2 dégâts |
| Marmite de soupe | À chaque aube, l’abri récupère 1 PV |
| Grand sac à dos | Tu pioches 1 carte de plus chaque jour |
| Caisse de clous | Tes défenses ont +3 PV |
| Adrénaline | Tes unités au corps à corps font +1 dégât |
| Groupe électrogène | Plus de coupure de courant, clôtures à 2 dégâts |
| Aimant | +4 ferraille à chaque aube |

## La ferraille, le troc et les améliorations

- Chaque zombie éliminé rapporte 1 ferraille, le Colosse 15.
- À chaque aube, le troc propose :

| Action | Coût | Effet |
|---|---|---|
| Réparer l’abri | 6 | +3 PV à l’abri |
| Acheter une carte | 5 | Une carte au choix parmi 2, ajoutée au deck |
| Améliorer une carte | 8 | Toutes tes cartes de ce type sont améliorées |
| Jeter une carte | 4 | Retire une carte de ton deck |

- Une amélioration vaut pour toutes les cartes de ce type, y compris celles déjà posées. Le nom prend un « + ». Effet selon la carte : +1 dégât (unités qui attaquent), +2 dégâts (pièges qui explosent ou blessent), +4 PV (défenses), +2 PV (soutien), +1 tour (fumigène, appât), +2 PV soignés (Conserves, Outils).

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

- Le bot joue le Survivant, prend une carte au hasard à l'aube, une relique au hasard, et dépense sa ferraille (réparer si l'abri est à 6 PV ou moins, sinon améliorer).
- Résultat actuel : environ 45 à 50 % de victoires pour le bot (47 % sur 200 parties). Un humain fait moins bien.
- Les deux premières nuits sont volontairement plus faciles pour l'apprentissage.
- Un placement au hasard perd généralement dès la nuit 2 : le placement doit compter.

## La direction visuelle

- Vue de dessus, ambiance forêt la nuit, maison au toit rouge au centre.
- Le jour : carte lisible, emplacements visibles quand une carte est sélectionnée.
- La nuit : obscurité avec des sources de lumière (maison, projecteurs, flammes, tirs). Les zombies ont des yeux rouges lumineux pour rester visibles.
- Retours visuels : traînées de balles, éclairs de tir, coups de hache, explosions, taches de sang qui restent au sol, tremblement d'écran quand la maison est touchée.
- Unités sur un cercle de couleur selon leur rôle : bois (défense), jaune (tireur), rouge-orangé (corps à corps), bleu (soutien), rouge (piège), violet clair (objet).
- Pour la version commerciale : remplacer les dessins en code par des sprites d'un pack libre de droits (par exemple Kenney.nl).

## L'historique des décisions

- Premier concept « Blackout » (garder une ville alimentée en électricité) : abandonné, jugé pas assez intéressant.
- Le thème de survie zombie a été retenu.
- Une version en cartes et icônes a été jugée trop abstraite : passage à une carte visuelle avec une nuit animée en temps réel, en gardant les cartes pour la construction le jour.
- Le développement se fait à 100 % avec Claude Code.
- Deck de départ réduit à 8 cartes par personnage : avec 40 cartes, un deck complet dès le départ rendrait les parties toutes pareilles.
- La carte choisie à l'aube arrive d'office dans la main du lendemain (demande d'Amine).
- Une seule monnaie (la ferraille) pour le troc : plusieurs ressources seraient trop lourdes sur petit écran.

## Les questions ouvertes

- Prochaines étapes déjà proposées : lieux (ferme, station-service, centre commercial), déblocages entre les parties, niveaux de difficulté, défi quotidien, succès Steam, tutoriel, journal de fin de partie, expéditions, survivants qui demandent asile, choix entre deux nuits, synergies visibles.

- Lieux différents d'une partie à l'autre (ferme, station-service, centre commercial) ?
- Le nom définitif du jeu.
