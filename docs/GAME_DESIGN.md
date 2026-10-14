# Dernier Abri — Document de conception

## Le pitch

Un roguelite de cartes de survie zombie. Le jour, tu fortifies ta maison avec des cartes : barricades, survivants armés, pièges, objets. La nuit, la horde sort des bois et attaque en temps réel. Survis 10 nuits jusqu'à l'arrivée des secours.

Public visé : grand public, fans de survie zombie (Project Zomboid, They Are Billions) et de roguelites courts.
Plateformes visées : Steam (PC) puis mobile.

## La boucle de jeu

1. **Jour** : tu pioches 5 cartes (6 avec une Radio en jeu) et tu en joues 2.
2. **Nuit** : les zombies apparaissent sur l'anneau extérieur (les bois) et marchent vers la maison au centre. Tes unités attaquent automatiquement. Les zombies frappent tout ce qui bloque leur chemin.
3. **Aube** : si la maison tient, tu choisis 1 carte parmi 3 à ajouter à ton deck (ou aucune).
4. Après 10 nuits : victoire. Si la maison tombe à 0 PV : défaite.

Score : nombre de zombies éliminés, avec un record sauvegardé.

## La carte

- Grille de 7 × 7 cases.
- L'anneau extérieur (24 cases) est la forêt : les zombies y apparaissent, le joueur ne peut rien y poser.
- La case centrale est la maison : 10 PV maximum.
- Les 24 cases intérieures restantes sont les emplacements du joueur.
- Les zombies avancent case par case vers la maison, en ligne droite (ils réduisent d'abord le plus grand écart, ligne ou colonne).

## Les cartes

Le deck de départ contient une carte de chaque type (16 cartes). Les unités posées restent en place d'une nuit à l'autre et gardent leurs dégâts. Poser une carte sur une case occupée remplace l'unité.

| Carte | Type | PV | Effet |
|---|---|---|---|
| Barricade | Défense | 6 | Planches clouées : bloque les zombies, 6 PV |
| Épave | Défense | 12 | Carcasse de voiture : bloque, 12 PV |
| Clôture | Défense | 5 | Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe |
| Tireur | Tireur | 3 | 1 dégât par tour, portée 2 |
| Sniper | Tireur | 2 | 3 dégâts tous les 2 tours, portée illimitée |
| Bûcheron | Corps à corps | 5 | 2 dégâts par tour au corps à corps, 5 PV |
| Fusil à pompe | Tireur | 4 | 2 dégâts à tous les zombies autour de lui |
| Chien | Corps à corps | 3 | Mord 2 fois par tour au corps à corps |
| Infirmière | Soutien | 2 | Soigne 1 PV à une unité voisine tous les 2 tours |
| Projecteur | Soutien | 2 | Les unités autour font +1 dégât |
| Radio | Soutien | 2 | Tant qu'elle tient, tu pioches 1 carte de plus chaque jour |
| Piège à loup | Piège | 1 | Le premier zombie qui marche dessus subit 5 dégâts |
| Essence | Piège | 1 | Flaque enflammée : 2 dégâts par tour aux zombies dessus, s'éteint à l'aube |
| Mine | Piège | 1 | Explose au passage : 6 dégâts sur la case et autour |
| Conserves | Objet | – | Utilise-la sur l'abri : +3 PV |
| Outils | Objet | – | Utilise-les sur l'abri : toutes tes unités récupèrent 3 PV |

Règles détaillées :
- « Autour » désigne les 8 cases voisines.
- La portée est mesurée en cases, diagonales comprises.
- Les tireurs visent le zombie le plus proche de la maison, puis le plus blessé.
- Les pièges, l'essence et les mines ne bloquent pas le passage.
- L'essence disparaît à l'aube. Le piège et la mine disparaissent après usage.
- Les objets (Conserves, Outils) se jouent sur la maison et ont un effet immédiat.

## Les zombies

| Zombie | PV de base | Vitesse | Dégâts par coup |
|---|---|---|---|
| Rôdeur | 3 | avance tous les 2 tours | 1 |
| Coureur | 2 | avance chaque tour | 1 |
| Gonflé | 8 | avance tous les 3 tours | 2 |

Les PV des zombies augmentent de 10 % par nuit (nuit 10 : +90 %).
Les zombies apparaissent de façon échelonnée pendant la nuit, à une position aléatoire de la forêt.

## Les vagues

| Nuit | Rôdeurs | Coureurs | Gonflés |
|---|---|---|---|
| 1 | 3 | 0 | 0 |
| 2 | 5 | 0 | 0 |
| 3 | 7 | 2 | 1 |
| 4 | 8 | 3 | 1 |
| 5 | 10 | 4 | 2 |
| 6 | 11 | 5 | 2 |
| 7 | 12 | 6 | 3 |
| 8 | 14 | 7 | 3 |
| 9 | 15 | 8 | 4 |
| 10 | 17 | 10 | 5 |

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

- Résultat actuel : environ 45 à 50 % de victoires pour le bot (un humain fait moins bien).
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

## Les questions ouvertes

- Reliques permanentes pour la partie, du type « les tireurs ont +1 portée » ?
- Ressources récoltées le jour (bois, munitions, nourriture) et boutique entre les nuits ?
- Boss de la nuit 10 ?
- Lieux différents d'une partie à l'autre (ferme, station-service, centre commercial) ?
- Personnages de départ avec un bonus différent ?
- Le nom définitif du jeu.
