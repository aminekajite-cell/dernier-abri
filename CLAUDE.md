# Dernier Abri

Roguelite de cartes de survie zombie, destiné d'abord à Steam (PC), avec une version mobile ensuite.
Le jour, le joueur pose des cartes autour de sa maison. La nuit, la horde attaque en temps réel et la défense se joue toute seule. La survie est sans fin : le score est le nombre de nuits survécues.

Le document de conception complet est dans `docs/GAME_DESIGN.md`. Lis-le avant toute modification de règles.

## Contexte du créateur

- Amine développe seul, sans expérience de programmation de jeu : c'est toi qui écris le code.
- Il communique en français et veut des réponses courtes et directes.
- Il teste souvent sur son téléphone : chaque changement doit rester jouable en portrait à environ 390 px de large, et bien tenir sur un écran d'ordinateur (1280 × 800).
- Challenge ses idées quand elles nuisent au jeu, et propose des options réalisables.

## Stack technique

- HTML, CSS et JavaScript sans framework ni étape de build. Ouvrir `index.html` suffit pour jouer.
- Rendu de la carte en Canvas 2D (`src/game.js`). Tous les graphismes sont dessinés en code pour l'instant.
- Polices : Special Elite (titres) et Atkinson Hyperlegible (texte), via Google Fonts.
- Interface entièrement en français.

## Structure

- `index.html` : la page et la structure de l'interface.
- `src/engine.js` : le moteur, avec les règles pures (cartes, zombies, vagues, événements, déroulé d'une nuit tour par tour). Aucun accès au DOM, il doit tourner dans Node comme dans le navigateur. Il expose l'objet global `Z`.
- `src/game.js` : le rendu canvas, les animations, les cartes en main, les écrans de fin de nuit et la boucle de jeu.
- `src/audio.js` : les sons, générés en code avec Web Audio (objet global `SFX`).
- `src/style.css` : le style de l'interface.
- `tools/simulate.js` : la simulation d'équilibrage dans Node.
- `docs/GAME_DESIGN.md` : le document de conception, à tenir à jour.

## Règles de travail

- Garde la séparation moteur / rendu : une règle de jeu va dans `engine.js`, jamais dans `game.js`.
- Amine teste lui-même le gameplay et l'équilibrage sur son téléphone. Ne lance pas `node tools/simulate.js` sauf s'il le demande : contente-toi de vérifier que le jeu tourne sans erreur. Le bot joue nettement moins bien que lui.
- Après chaque changement visible, teste le jeu en largeur téléphone et sur écran d'ordinateur, et vérifie qu'il n'y a aucune erreur dans la console.
- La boucle d'affichage ne doit jamais s'arrêter sur une erreur : chaque élément est dessiné dans un bloc protégé. Évite les API de canvas récentes sans solution de secours (exemple : `roundRect`, déjà remplacé si absent).
- Mets à jour `docs/GAME_DESIGN.md` quand une décision de conception change.
- Fais des commits petits, avec un message clair en français.
- Avant chaque mise en ligne, lance `node tools/test.js` et corrige tout ce qui échoue :
  - `tools/test-engine.js` (Node, ~3 s) : intégrité des cartes et zombies, pose de chaque carte, règles clés, et 300 nuits aléatoires (jusqu’à la nuit 60, avec mutations et événements) qui ne doivent jamais planter, produire de valeurs absurdes, laisser un zombie dans la forêt ou dépasser 2 s ;
  - `tools/test-browser.js` (Chromium, ~2 min) : le vrai jeu en 390 px et 1280 × 800, tous les écrans, pose des cartes de la main, plusieurs nuits complètes avec l’aube, la pause du Colosse et la reprise de sauvegarde ; vérifie l’absence d’erreur console, de fichier manquant et de défilement horizontal, et les images/s. Les captures sont dans `tools/test-out/` : regarde-les quand un changement est visuel.
  - Quand une règle change, ajoute ou adapte le test correspondant dans `tools/test-engine.js`.
- À chaque mise en ligne, change `VERSION` en haut de `src/game.js` (affichée sur l’écran d’accueil), le numéro `?v=` des fichiers dans `index.html` et le numéro dans `version.txt` (même numéro, ex. `v70`) : le jeu compare `version.txt` à sa version et se recharge tout seul s’il est en retard (cache du site ou du téléphone).

## Prochaines étapes (par ordre de priorité)

1. Graphismes : tout est dessiné en code dans un style unique (contours sombres, ombres, détails). Aucun pack du marché ne couvre tout le jeu de façon cohérente ; avant la sortie Steam, faire redessiner l'ensemble par un artiste en suivant ce style. Ne pas mélanger plusieurs packs.
2. Remplacer les sons générés par des sons d'un pack libre de droits si besoin (même contrainte de téléchargement).
3. Classement en ligne du défi quotidien (serveur ou classements Steam).
4. Préparer la page Steam, une démo pour le Steam Next Fest, puis la version Steam (Electron ou Tauri) et la version mobile.
