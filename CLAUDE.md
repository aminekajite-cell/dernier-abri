# Dernier Abri

Roguelite de cartes de survie zombie, pensé d'abord pour le téléphone, avec une sortie visée sur Steam et mobile.
Le jour, le joueur pose des cartes autour de sa maison. La nuit, la horde attaque en temps réel et la défense se joue toute seule. La survie est sans fin : le score est le nombre de nuits survécues.

Le document de conception complet est dans `docs/GAME_DESIGN.md`. Lis-le avant toute modification de règles.

## Contexte du créateur

- Amine développe seul, sans expérience de programmation de jeu : c'est toi qui écris le code.
- Il communique en français et veut des réponses courtes et directes.
- Il teste surtout sur son téléphone : chaque changement doit rester jouable en portrait, à environ 390 px de large.
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
- `assets/sprites/` : les sprites (Kenney, CC0).
- `src/style.css` : le style de l'interface.
- `tools/simulate.js` : la simulation d'équilibrage dans Node.
- `docs/GAME_DESIGN.md` : le document de conception, à tenir à jour.

## Règles de travail

- Garde la séparation moteur / rendu : une règle de jeu va dans `engine.js`, jamais dans `game.js`.
- Amine teste lui-même le gameplay et l'équilibrage sur son téléphone. Ne lance pas `node tools/simulate.js` sauf s'il le demande : contente-toi de vérifier que le jeu tourne sans erreur. Le bot joue nettement moins bien que lui.
- Après chaque changement visible, teste le jeu en largeur téléphone et vérifie qu'il n'y a aucune erreur dans la console.
- La boucle d'affichage ne doit jamais s'arrêter sur une erreur : chaque élément est dessiné dans un bloc protégé. Évite les API de canvas récentes sans solution de secours (exemple : `roundRect`, déjà remplacé si absent).
- Mets à jour `docs/GAME_DESIGN.md` quand une décision de conception change.
- Fais des commits petits, avec un message clair en français.
- À chaque mise en ligne, change `VERSION` en haut de `src/game.js` (affichée sur l'écran d'accueil) et le numéro `?v=` des fichiers dans `index.html` (sinon le téléphone garde l'ancienne version en cache).

## Prochaines étapes (par ordre de priorité)

1. Compléter les sprites (défenses, pièges, chiens, abri, sol) : personnages et zombies sont faits avec le pack Kenney « Top-down Shooter ». Les sites de packs sont bloqués depuis l'environnement de Claude : Amine dépose les packs dans le dépôt, Claude les intègre dans `assets/`.
2. Remplacer les sons générés par des sons d'un pack libre de droits si besoin (même contrainte de téléchargement).
3. Classement en ligne du défi quotidien (serveur ou classements Steam).
4. Préparer la page Steam, une démo pour le Steam Next Fest, puis la version Steam (Electron ou Tauri) et la version mobile.
