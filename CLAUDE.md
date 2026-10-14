# Dernier Abri

Roguelite de cartes de survie zombie, pensé d'abord pour le téléphone, avec une sortie visée sur Steam et mobile.
Le jour, le joueur pose des cartes autour de sa maison. La nuit, la horde attaque en temps réel et la défense se joue toute seule.

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
- `src/style.css` : le style de l'interface.
- `tools/simulate.js` : la simulation d'équilibrage dans Node.
- `docs/GAME_DESIGN.md` : le document de conception, à tenir à jour.

## Règles de travail

- Garde la séparation moteur / rendu : une règle de jeu va dans `engine.js`, jamais dans `game.js`.
- Après toute modification de règles, de cartes, de zombies ou de vagues, lance `node tools/simulate.js` et donne le taux de victoire du bot. Cible actuelle : 45 à 50 % pour le bot.
- Après chaque changement visible, teste le jeu en largeur téléphone et vérifie qu'il n'y a aucune erreur dans la console.
- La boucle d'affichage ne doit jamais s'arrêter sur une erreur : chaque élément est dessiné dans un bloc protégé. Évite les API de canvas récentes sans solution de secours (exemple : `roundRect`, déjà remplacé si absent).
- Mets à jour `docs/GAME_DESIGN.md` quand une décision de conception change.
- Fais des commits petits, avec un message clair en français.

## Prochaines étapes (par ordre de priorité)

1. Mettre le jeu en ligne sur GitHub Pages pour pouvoir le tester sur téléphone depuis un lien.
2. Ajouter des sons : tirs, grognements, impacts, ambiance nocturne (packs libres de droits, par exemple Kenney.nl).
3. Remplacer les dessins en code par des sprites vus de dessus d'un pack libre de droits, en gardant les dessins actuels comme solution de secours.
4. Ajouter la profondeur roguelite : reliques permanentes pour la partie, boutique entre les nuits avec des ressources, boss la nuit 10.
5. Ajouter une progression entre les parties : nouvelles cartes et nouveaux lieux à débloquer.
6. Préparer la version Steam (Electron ou Tauri) et la version mobile.
