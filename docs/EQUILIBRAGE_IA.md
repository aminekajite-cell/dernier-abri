# Dernier Abri : dossier d'équilibrage

## Consigne pour l'IA

Tu es game designer spécialisé en équilibrage de roguelites et de tower defense.
Voici toutes les règles et toutes les valeurs du jeu « Dernier Abri ». Analyse-les et propose un équilibrage.

Objectifs du créateur :
- La survie est sans fin : le score est le nombre de nuits survécues.
- Les zombies doivent devenir de plus en plus puissants. Le joueur doit pouvoir suivre cette montée en construisant de bons combos (factions, voisins, niveaux, fusions), sans jamais la dépasser durablement. Il ne faut pas plafonner les combos.
- Les zombies doivent arriver jusqu'au corps à corps : les tirs ne doivent pas tout tuer avant.
- La construction (murs, pièges) doit être aussi importante que les troupes.
- Chaque carte doit avoir une raison d'être jouée ; aucune ne doit dominer.

Ce que j'attends de toi :
1. Les déséquilibres que tu repères (cartes trop fortes ou trop faibles, bonus qui s'emballent, courbe de difficulté), avec le calcul qui le montre (par exemple dégâts par tour et par énergie).
2. Des modifications chiffrées et précises (« Tireur : 2 → 1 dégât »), classées par priorité.
3. Pour chaque modification, l'effet attendu sur la partie.
4. Si tu proposes une nouvelle règle, décris-la en une ou deux phrases simples.

## Règles générales

- Plateau de 9×9 cases, l'abri au centre (10 PV). Le bord est une forêt infranchissable, sauf 4 routes au milieu de chaque bord : les zombies n'entrent que par ces routes.
- Chaque jour : 5 énergie, pioche de 5 cartes (main de 8 au maximum). On pose des cartes autour de l'abri, puis la nuit se joue toute seule en temps réel, tour par tour.
- Deck fermé de 20 à 30 cartes, construit avant la partie avec les cartes débloquées. Exemplaires max : commune 3, rare 2, épique 1, légendaire 1.
- Deck de départ : Barricade, Barricade, Barricade, Clôture, Épave, Tireur, Tireur, Tireur, Sniper, Bûcheron, Bûcheron, Chien, Infirmière, Piège à loup, Piège à loup, Mine, Conserves, Outils, Grenade, Grenade.
- À l'aube : choisir une carte du deck à avoir en main le lendemain, un événement à choix, et un troc contre de la ferraille.
- On peut déplacer une unité par jour.
- L'abri perd des PV quand un zombie l'atteint ; à 0 PV la partie est perdue.

### Constructions
- Cartes à tracer : Barricade, Clôture, Sacs de sable, Mur de pneus, Barrage de police, Mur modulaire, Barbelés. Une carte donne 4 cases pour la journée (3 pour Mur de pneus, Barrage de police, Mur modulaire), pour le prix de la carte. Les cases se posent une par une ou en ligne ; la carte part à la défausse une fois ses cases posées ou le soir.
- Les autres pièges restent en main la journée et se reposent à leur prix normal.
- Des murs voisins forment un rempart : chaque mur garde ses PV (le mur frappé encaisse) et gagne +1 PV max par mur voisin relié, jusqu’à +3.
- Les zombies calculent leur chemin : entrer sur une case libre coûte 1, sur un mur ou une unité coûte ses PV (pour un rempart, les PV de tout le rempart). Ils contournent si le détour coûte moins cher que de casser.

### Rôles
- Tank : les zombies à 3 cases ou moins le visent au lieu de l'abri ; il bloque 1 coup sur 3 ; les soins sur lui sont doublés.
- DPS : +1 dégât s'il a un Tank voisin.
- Escouade : une unité qui a, avec ses voisins, un Tank, un Soin et un DPS gagne +1 dégât (ou +1 soin).

### Bonus de dégâts (ils s'additionnent sans plafond)
Dégâts d'une attaque = dégâts de base + projecteur voisin (+1) + niveaux (+1 par niveau d'attaque) + étoiles de fusion (+1 par étoile) + trait (Précis +1, Aguerri +1 après 10 kills) + souvenir d'héritage (+1) + solidarité (+1 par paire de voisins de la même faction, sans limite) + faction au palier 1 (+1 pour Militaires, Bricoleurs, Soignants ; +1 au corps à corps pour Fermiers) + faction au palier 3 (+1 pour toute la faction) + alliance chasse (+1 au corps à corps) + Tank voisin pour un DPS (+1) + escouade (+1).
Pour une unité qui tire ou mord plusieurs fois, ce bonus total compte une fois par attaque et se répartit entre les coups.
Le Chef de groupe et le Maire donnent des attaques en plus ; la carte Adrénaline double les attaques pendant 3 tours.

### Progression des unités
- Niveaux : à 20 zombies tués, puis 25, 30, 35… de plus (sans plafond), une unité choisit +1 dégât ou +3 PV.
- Fusion : 3 unités identiques avec le même nombre d'étoiles fusionnent en une unité avec une étoile de plus (+120 % des PV de base et +1 dégât par étoile, sans plafond).
- Évolutions secrètes (deux cartes côte à côte → une unité unique) : Brigade canine = Policier + Chien ; Tireur de nuit = Sniper + Projecteur ; Lance-flammes lourd = Lance-flammes + Bonbonne de gaz ; Fortin = Épave + Bunker ; Tourelle automatique = Tireur + Mécanicien ; Équarrisseur = Bûcheron + Boucher ; Cantine de campagne = Infirmière + Cuisinier ; Bande de gamins = Gamin + Institutrice ; Le Saint = Moine + Prêtre ; Traqueur = Arbalète + Chasseur.
- Traits aléatoires des survivants : Costaud (+2 PV), Fragile (−1 PV), Précis (+1 dégât), Myope (−1 portée), Increvable (survit une fois à un coup fatal), Coriace (récupère 1 PV à chaque aube), Aguerri (+1 dégât après 10 zombies tués).

### Factions
Paliers : 4, 6 et 8 unités de la faction sur le plateau. Le Chef (carte légendaire) donne +1 palier tant qu'il est en vie (jusqu'au palier 3).
- Police (Agent anti-émeute, Chien policier, Barrage de police, Tireur d’élite du GIGN, Policier, Tireur, Projecteur, Sirène, Le Commissaire) : 4 unités → tes policiers perdent 1 PV de moins par coup ; 6 → tes policiers ont +1 portée ; 8 → +1 dégât pour toute la faction.
- Militaires (Mortier, Sentinelle automatique, Mine claymore, Bunker, Sniper, Mitrailleuse, Fusil à pompe, Mine, Dynamite, La Sergente) : 4 unités → tes militaires font +1 dégât ; 6 → mines et dynamite : +3 dégâts ; 8 → +1 dégât pour toute la faction.
- Soignants (Ambulancier, Médecin de garde, Infirmier costaud, Pharmacienne, Hôpital de campagne, Prêtre, Brancardier, Infirmière, Cuisinier, La Doctoresse) : 4 unités → soins +1 PV, tes soignants font +1 dégât ; 6 → à l’aube, toutes tes unités récupèrent 2 PV ; 8 → +1 dégât pour toute la faction.
- Pyromanes (Brasero, Fût piégé, Essence, Lance-flammes, Cocktails, Bonbonne de gaz, Mur de pneus, Le Pyromane) : 4 unités → le feu fait +1 dégât par tour ; 6 → les zombies qui meurent en brûlant explosent (2 dégâts autour) ; 8 → +1 dégât pour toute la faction.
- Trappeurs (Filet, Piège à ours, Chasseur, Piège à loup, Fosse à pieux, Barbelés, Fumigène, Appât, Arbalète, Le Braconnier) : 4 unités → pièges : +2 dégâts ; 6 → pièges : +4 dégâts au total ; 8 → +1 dégât pour toute la faction.
- Fermiers (Meute de chiens, Fermier à la fourche, Épouvantail, Chien, Bûcheron, Boucher, La Fermière) : 4 unités → corps à corps : +1 dégât ; 6 → corps à corps : +1 PV à chaque zombie tué ; 8 → +1 dégât pour toute la faction.
- Bricoleurs (Cloueur, Tourelle bricolée, Atelier, Mur modulaire, Bobine Tesla, Clôture, Panneau solaire, Mécanicien, Radio, L’Ingénieur) : 4 unités → tes bricoleurs font +1 dégât, clôtures +1 ; 6 → clôtures : étourdissent 1 tour, réparations +1 PV ; 8 → +1 dégât pour toute la faction.
- Communauté (Garde champêtre, Institutrice, Marché, Vigile, Charpentier, Chef de groupe, Moine, Gamin, Le Maire) : 4 unités → tes membres de la Communauté ont +1 portée, l’abri +1 PV à l’aube ; 6 → ta 1ʳᵉ carte de chaque jour coûte 1 énergie de moins ; 8 → +1 dégât pour toute la faction.

### Alliances (deux factions avec chacune au moins 3 unités)
- Loi martiale (Police + Militaires) : tes tireurs ont +1 portée.
- Pièges incendiaires (Pyromanes + Trappeurs) : tes pièges enflamment les zombies (3 tours).
- Médecine de campagne (Soignants + Fermiers) : ton corps à corps récupère 1 PV à chaque zombie tué.
- Arsenal (Militaires + Bricoleurs) : tes tirs traversent l’armure des Blindés.
- Entraide (Soignants + Communauté) : à l’aube, l’abri et toutes tes unités récupèrent 1 PV.
- Patrouille de quartier (Police + Communauté) : ton corps à corps repousse les zombies.
- Battue (Fermiers + Trappeurs) : ton corps à corps fait +1 dégât.
- Court-circuit (Pyromanes + Bricoleurs) : clôtures et bobines Tesla enflamment les zombies.

### Reliques (une toutes les 5 nuits)
- Lunette de visée : Tes tireurs ont +1 portée.
- Manuel du trappeur : Tes pièges font +2 dégâts.
- Marmite de soupe : À chaque aube, l’abri récupère 1 PV.
- Grand sac à dos : Tu pioches 1 carte de plus chaque jour.
- Caisse de clous : Tes défenses ont +3 PV.
- Adrénaline : Tes unités au corps à corps font +1 dégât.
- Groupe électrogène : Plus de coupure de courant, clôtures à 2 dégâts.
- Aimant : +3 ferraille à chaque aube.

## La horde

- Nombre de zombies par nuit (nuits 1 à 10), puis + croissance par nuit au-delà :
  - Rôdeur : 2, 2, 4, 4, 4, 4, 5, 5, 5, 5 ; ensuite +1,2 par nuit
  - Coureur : 0, 0, 1, 1, 1, 1, 2, 2, 2, 2 ; ensuite +0,72 par nuit
  - Gonflé : 0, 0, 1, 1, 1, 1, 1, 1, 1, 1 ; ensuite +0,48 par nuit
  - Chien zombie : 0, 0, 0, 1, 1, 1, 1, 1, 1, 1 ; ensuite +0,48 par nuit
  - Rampant : 0, 0, 1, 1, 1, 1, 1, 1, 1, 1 ; ensuite +0,48 par nuit
  - Cracheur : 0, 0, 0, 0, 1, 1, 1, 1, 1, 1 ; ensuite +0,36 par nuit
  - Blindé : 0, 0, 0, 0, 1, 1, 1, 1, 1, 1 ; ensuite +0,48 par nuit
  - Hurleur : 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ; ensuite +0,3 par nuit
  - Sapeur : 0, 0, 0, 1, 1, 1, 1, 2, 2, 2 ; ensuite +0,4 par nuit
- Le Colosse : 58 PV, 1 la nuit 10, 2 la nuit 20, etc. Les nuits du Colosse se jouent en 2 vagues avec une pause pour déplacer ses troupes. Munitions anti-Colosse : 3 en stock maximum.
- PV des zombies : PV de base jusqu'à la nuit 3, puis +8 % des PV de base par nuit (additif, arrondi au-dessus). Le Colosse : 58 PV à la nuit 10, puis +8 % par nuit.
- Dégâts des zombies : +1 toutes les 20 nuits.
- Nuits de pression : toutes les 5 nuits, +25 % de zombies. Brèche : quand un zombie blesse l'abri, tous les autres avancent aussitôt d'une case.
- Pas de frénésie ni de multiplicateur exponentiel. Munition anti-Colosse : 15 dégâts + 25 % des PV max du Colosse.
- Mutations : toutes les 5 nuits, la horde gagne une mutation permanente au hasard : Peau épaisse (Les zombies ont +15 % de PV (cumulable)) ; Horde nombreuse (+15 % de zombies chaque nuit (cumulable)) ; Enragés (Les rôdeurs et les coureurs font +1 dégât par coup (cumulable)) ; Carapace (Les rôdeurs encaissent 1 dégât de moins par coup, sauf le feu et les explosions (cumulable jusqu’à 3)) ; Régénération (Les zombies récupèrent 1 PV tous les 3 tours (cumulable : +2, +3…)) ; Putréfaction (En mourant, un zombie éclabousse les unités autour de lui : 1 dégât (cumulable)) ; Pas pressés (Les zombies lents et très lents avancent d’un cran plus vite (jusqu’à 1 case par tour)).
- Événements de nuit possibles : Nuit calme ; Brouillard (Portée des tireurs −1) ; Pleine lune (+50 % de zombies) ; Pluie (L'essence ne brûle pas) ; Coupure de courant (Projecteurs et clôtures inactifs) ; Horde affamée (Les rôdeurs deviennent des coureurs).
- Un tour de nuit : chaque unité attaque selon sa cadence, puis chaque zombie avance d'une case selon sa vitesse ou frappe ce qui le bloque.

### Zombies
| Zombie | PV de base | Dégâts | Vitesse | Capacité |
|---|---|---|---|---|
| Rôdeur | 17 | 1 | 1 case / 2 tours | lent |
| Coureur | 12 | 1 | 1 case / 1 tour | rapide |
| Gonflé | 45 | 2 | 1 case / 3 tours | très lent, 2 dégâts par coup |
| Chien zombie | 6 | 1 | 1 case / 1 tour | rapide et fragile |
| Rampant | 12 | 1 | 1 case / 2 tours | passe sous les défenses (barricades, épaves…) |
| Cracheur | 17 | 1 | 1 case / 2 tours | crache sur ce qui est à 2 cases devant lui |
| Blindé | 29 | 1 | 1 case / 2 tours | encaisse 1 dégât de moins par coup, sauf le feu |
| Hurleur | 23 | 1 | 1 case / 2 tours | appelle 2 rôdeurs en mourant |
| Sapeur | 18 | 3 | 1 case / 2 tours | fonce sur les murs et explose : 15 dégâts au rempart, 3 autour, même s’il est tué avant |
| Le Colosse | 58 | 2 | 1 case / 3 tours | boss de la nuit 10 : détruit une défense d’un coup et frappe l’abri sans mourir |

## Les cartes
Colonnes : coût en énergie, rareté, PV, dégâts par coup, portée (losange, en cases), cadence, rôle, faction, capacité. ✦ = évolution secrète (ne se joue pas, se forme sur le plateau).


### Défenses

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Barricade | 2 | commune | 7 | — | — | — | — | — | Planches clouées : bloque les zombies, 7 PV |
| Épave | 2 | rare | 14 | — | — | — | — | — | Carcasse de voiture : bloque, 14 PV |
| Clôture | 2 | commune | 5 | — | — | — | — | Bricoleurs | Clôture électrique : bloque, 5 PV, 1 dégât à chaque zombie qui la frappe |
| Sacs de sable | 2 | commune | 6 | — | — | — | — | — | Bloque, 6 PV, ne perd jamais plus de 1 PV par coup |
| Porte blindée | 3 | épique | 18 | — | — | — | — | — | Bloque, 18 PV, seulement sur une case collée à l’abri |
| Mur de pneus | 2 | rare | 8 | — | — | — | — | Pyromanes | Bloque, 8 PV, laisse une flaque d’essence en tombant |
| Barrage de police | 2 | commune | 7 | — | — | — | — | Police | Barrières de police : bloque, 7 PV |
| Bunker | 3 | rare | 16 | 1 | 1 | chaque tour | — | Militaires | Bloque, 16 PV, et tire sur les zombies au contact |
| Brasero | 2 | rare | 5 | — | — | — | — | Pyromanes | Bloque. Tous les 2 tours, 1 dégât et feu aux zombies collés à lui |
| Mur modulaire | 2 | commune | 9 | — | — | — | — | Bricoleurs | Panneaux de tôle : bloque, 9 PV |
| ✦ Fortin | — | — | 32 | 3 | 1 | chaque tour | — | — | Épave et bunker soudés : bloque, 32 PV, et frappe les zombies au contact (3 dégâts) |

### Tireurs (distance)

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Tireur | 2 | commune | 3 | 2 | 2 | chaque tour | DPS | Police | 2 dégâts par tour, portée 2 |
| Sniper | 3 | rare | 2 | 5 | 4 | 1 tour sur 2 | DPS | Militaires | 5 dégâts tous les 2 tours, portée 4 |
| Fusil à pompe | 3 | épique | 4 | 2 | 1 | chaque tour | DPS | Militaires | 2 dégâts aux 4 zombies les plus proches à 1 case |
| Arbalète | 3 | rare | 3 | 2 ×2 | 2 | chaque tour | DPS | Trappeurs | À chaque tour, 2 dégâts à 2 zombies différents, portée 2 |
| Lance-flammes | 2 | rare | 5 | 1 | 2 | chaque tour | DPS | Pyromanes | 1 dégât à 2 cases et enflamme le zombie : 1 dégât par tour pendant 3 tours, 5 PV |
| Mitrailleuse | 3 | épique | 3 | 2 ×3 | 2 | chaque tour | DPS | Militaires | 3 tirs de 2 dégâts par tour, portée 2, s’enraye 1 tour sur 3 |
| Cocktails | 3 | épique | 2 | 2 | 2 | 1 tour sur 3 | DPS | Pyromanes | Tous les 3 tours, un cocktail sur le groupe le plus serré : 2 dégâts et feu, portée 2 |
| Gamin | 1 | commune | 1 | 1 ×2 | 2 | chaque tour | DPS | Communauté | Lance-pierre : 2 tirs de 1 dégât par tour, portée 2, mais 1 seul PV |
| Tireur d’élite du GIGN | 3 | épique | 4 | 2 | 2 | chaque tour | DPS | Police | 2 dégâts par tour, portée 2 |
| Mortier | 3 | rare | 3 | 3 | 4 | 1 tour sur 3 | DPS | Militaires | Tous les 3 tours, un obus sur le groupe le plus serré : 3 dégâts sur la case et autour |
| Sentinelle automatique | 2 | rare | 6 | 1 ×2 | 2 | chaque tour | DPS | Militaires | Tourelle : 2 tirs de 1 dégât par tour, portée 2, 6 PV |
| Chasseur | 2 | commune | 3 | 2 | 2 | chaque tour | DPS | Trappeurs | 2 dégâts par tour, portée 2 |
| Tourelle bricolée | 2 | commune | 4 | 2 | 2 | chaque tour | DPS | Bricoleurs | 2 dégâts par tour, portée 2, 4 PV |
| Bobine Tesla | 3 | épique | 4 | 2 ×3 | 2 | 1 tour sur 2 | DPS | Bricoleurs | Tous les 2 tours, un arc frappe 3 zombies (2 dégâts). Inactive pendant une coupure |
| Vigile | 1 | commune | 4 | 1 | 2 | chaque tour | DPS | Communauté | 1 dégât par tour, portée 2, 4 PV |
| Médecin de garde | 2 | commune | 4 | 1 | 1 | chaque tour | Soin | Soignants | Pistolet : 1 dégât par tour, portée 1, et récupère 1 PV tous les 2 tours |
| Cloueur | 2 | commune | 4 | 1 ×2 | 2 | chaque tour | DPS | Bricoleurs | Cloueuse pneumatique : 2 tirs de 1 dégât par tour, portée 2 |
| Garde champêtre | 2 | commune | 4 | 2 | 2 | chaque tour | DPS | Communauté | Fusil de chasse : 2 dégâts par tour, portée 2 |
| Le Commissaire | 3 | légendaire | 5 | 2 | 2 | chaque tour | DPS | Police | Chef de la Police : 2 dégâts par tour, portée 2. La Police gagne un palier |
| La Sergente | 3 | légendaire | 5 | 1 ×3 | 2 | chaque tour | DPS | Militaires | Cheffe des Militaires : 3 tirs par tour, portée 2. Les Militaires gagnent un palier |
| Le Pyromane | 3 | légendaire | 5 | 1 | 2 | chaque tour | DPS | Pyromanes | Chef des Pyromanes : enflamme tous les zombies à 2 cases. Les Pyromanes gagnent un palier |
| Le Braconnier | 3 | légendaire | 4 | 3 | 3 | 1 tour sur 2 | DPS | Trappeurs | Chef des Trappeurs : 3 dégâts tous les 2 tours, portée 3. Les Trappeurs gagnent un palier |
| Lance-roquettes | 3 | épique | 4 | 2 | 2 | 1 tour sur 2 | DPS | — | Tous les 2 tours, une roquette : 2 dégâts, et 5 fois plus (10) contre le Colosse et les Gonflés. Portée 2 |
| ✦ Tireur de nuit | — | — | 4 | 3 | 4 | chaque tour | DPS | — | Un sniper et son projecteur : 3 dégâts à chaque tour, portée 4 |
| ✦ Lance-flammes lourd | — | — | 7 | 2 | 2 | chaque tour | DPS | — | 2 dégâts à 6 zombies au plus à 2 cases, qui brûlent ensuite 3 tours |
| ✦ Tourelle automatique | — | — | 7 | 1 ×3 | 2 | chaque tour | DPS | — | Montée par le mécanicien : 3 tirs de 1 dégât par tour, portée 2 |
| ✦ Bande de gamins | — | — | 5 | 1 ×4 | 2 | chaque tour | DPS | — | Toute la classe au lance-pierre : 4 tirs de 1 dégât par tour, portée 2 |
| ✦ Traqueur | — | — | 5 | 2 ×2 | 3 | chaque tour | DPS | — | À chaque tour, 2 dégâts à 2 zombies différents, portée 3 |

### Corps à corps

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Bûcheron | 2 | commune | 7 | 5 | 1 | chaque tour | DPS | Fermiers | 5 dégâts par tour au corps à corps, 7 PV |
| Chien | 2 | commune | 5 | 2 ×2 | 1 | chaque tour | DPS | Fermiers | Mord 2 fois par tour (2 dégâts) au corps à corps, 5 PV |
| Policier | 2 | commune | 9 | 2 | 1 | chaque tour | Tank | Police | 2 dégâts au contact et repousse le zombie d’une case, 9 PV |
| Boucher | 2 | rare | 6 | 5 | 1 | chaque tour | DPS | Fermiers | 5 dégâts au contact, récupère 1 PV à chaque zombie tué |
| Moine | 2 | rare | 11 | 2 | 1 | chaque tour | Tank | Communauté | 2 dégâts à tous les zombies autour de lui, 11 PV |
| Agent anti-émeute | 2 | rare | 14 | 2 | 1 | chaque tour | Tank | Police | Bouclier : 14 PV, ne perd jamais plus de 2 PV par coup, 2 dégâts et repousse |
| Chien policier | 1 | commune | 6 | 1 ×2 | 1 | chaque tour | DPS | Police | Mord 2 fois par tour (1 dégât) ; la 1ʳᵉ morsure du tour étourdit le zombie 1 tour |
| Meute de chiens | 3 | rare | 7 | 2 ×4 | 1 | chaque tour | DPS | Fermiers | 4 morsures de 2 dégâts par tour au corps à corps |
| Fermier à la fourche | 2 | commune | 10 | 3 | 1 | chaque tour | Tank | Fermiers | 3 dégâts au contact et repousse le zombie d’une case, 10 PV |
| Ambulancier | 2 | commune | 11 | 1 | 1 | chaque tour | Tank | Soignants | Bloque avec son brancard : 11 PV, 1 dégât au contact et repousse le zombie |
| Infirmier costaud | 2 | rare | 7 | 2 | 1 | chaque tour | Soin | Soignants | 2 dégâts au contact. À chaque zombie tué, ses voisins récupèrent 1 PV |
| La Fermière | 3 | légendaire | 14 | 2 ×2 | 1 | chaque tour | Tank | Fermiers | Cheffe des Fermiers : 2 coups de 2 dégâts par tour, 14 PV. Les Fermiers gagnent un palier |
| ✦ Brigade canine | — | — | 8 | 3 ×2 | 1 | chaque tour | DPS | — | Un policier et son chien : 2 morsures de 3 dégâts par tour, qui étourdissent et repoussent |
| ✦ Équarrisseur | — | — | 9 | 5 | 1 | chaque tour | DPS | — | 5 dégâts à tous les zombies autour, récupère 1 PV par zombie tué |
| ✦ Le Saint | — | — | 13 | 2 | 1 | chaque tour | Tank | — | 2 dégâts à tous les zombies autour, et ses voisins survivent une fois à un coup fatal |

### Soutien

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Infirmière | 1 | commune | 2 | soin +1 | — | — | Soin | Soignants | Soigne 1 PV à une unité voisine tous les 2 tours |
| Projecteur | 2 | rare | 2 | — | — | — | — | Police | Les unités autour font +1 dégât |
| Radio | 2 | rare | 2 | — | — | — | — | Bricoleurs | Tant qu'elle tient, tu pioches 1 carte de plus chaque jour |
| Cuisinier | 2 | rare | 2 | — | — | — | — | Soignants | À chaque aube, l’abri récupère 1 PV |
| Mécanicien | 2 | rare | 3 | — | — | — | — | Bricoleurs | Répare 1 PV à une défense voisine à chaque tour |
| Sirène | 3 | épique | 4 | — | — | — | — | Police | Les zombies à 2 cases ou moins marchent vers elle au lieu de l’abri |
| Chef de groupe | 3 | épique | 3 | — | — | — | — | Communauté | Tous les 3 tours, les unités autour attaquent une fois de plus |
| Panneau solaire | 3 | épique | 2 | — | — | — | — | Bricoleurs | Projecteurs et clôtures marchent pendant une coupure, clôtures à 2 dégâts |
| Pharmacienne | 2 | rare | 3 | soin +1 | — | — | Soin | Soignants | Soigne 1 PV à une unité voisine à chaque tour |
| Hôpital de campagne | 3 | épique | 6 | — | — | — | Soin | Soignants | Tous les 2 tours, toutes les unités voisines récupèrent 1 PV |
| Prêtre | 2 | rare | 3 | — | — | — | Soin | Soignants | Une fois chacune, les unités voisines qui devraient tomber restent à 1 PV |
| Brancardier | 1 | commune | 4 | soin +1 | — | — | Soin | Soignants | Soigne 1 PV à une unité voisine tous les 2 tours, 4 PV |
| Épouvantail | 1 | commune | 6 | — | — | — | — | Fermiers | Les zombies à 2 cases ou moins marchent vers lui au lieu de l’abri, 6 PV |
| Atelier | 3 | rare | 5 | — | — | — | — | Bricoleurs | Répare 1 PV à toutes les défenses voisines à chaque tour |
| Institutrice | 2 | rare | 3 | — | — | — | — | Communauté | Tant qu’elle tient, tu pioches 1 carte de plus chaque jour |
| Marché | 2 | commune | 4 | — | — | — | — | Communauté | À chaque aube, +2 ferraille |
| Charpentier | 2 | rare | 4 | — | — | — | — | Communauté | À chaque aube, les défenses voisines récupèrent 2 PV |
| La Doctoresse | 3 | légendaire | 5 | 2 | 1 | chaque tour | Soin | Soignants | Cheffe des Soignants : soigne 2 PV à chaque tour et frappe au scalpel (2 dégâts au contact). Les Soignants gagnent un palier |
| L’Ingénieur | 3 | légendaire | 6 | 1 ×2 | 1 | chaque tour | — | Bricoleurs | Chef des Bricoleurs : répare 2 PV aux défenses voisines à chaque tour et tire 2 clous par tour (portée 1). Les Bricoleurs gagnent un palier |
| Le Maire | 3 | légendaire | 5 | 2 | 1 | chaque tour | — | Communauté | Chef de la Communauté : les unités autour attaquent plus souvent, et il tire (2 dégâts, portée 1). La Communauté gagne un palier |
| ✦ Cantine de campagne | — | — | 6 | soin +2 | — | — | Soin | — | Soigne 2 PV à une unité voisine à chaque tour, et l’abri récupère 2 PV à chaque aube |

### Pièges

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Piège à loup | 1 | commune | — | — | — | — | — | Trappeurs | Le premier zombie qui marche dessus subit 5 dégâts |
| Essence | 1 | commune | — | — | — | — | — | Pyromanes | Flaque enflammée : 2 dégâts par tour aux zombies dessus, s'éteint à l'aube |
| Mine | 2 | rare | — | — | — | — | — | Militaires | Explose au passage : 6 dégâts sur la case et autour |
| Barbelés | 1 | commune | — | — | — | — | — | Trappeurs | Ne bloque pas : 1 dégât et ralentit chaque zombie qui passe, reste en place |
| Fosse à pieux | 2 | rare | — | — | — | — | — | Trappeurs | 3 dégâts à chaque zombie qui tombe dedans, casse après 4 zombies |
| Bonbonne de gaz | 2 | épique | 1 | — | — | — | — | Pyromanes | Bloque. Explose quand un zombie la frappe : 5 dégâts sur la case et autour |
| Fumigène | 1 | commune | — | — | — | — | — | Trappeurs | Le premier zombie qui passe libère la fumée : les zombies autour sont perdus 3 tours |
| Appât | 1 | commune | — | — | — | — | — | Trappeurs | Viande crue : 3 zombies s’arrêtent 3 tours pour manger |
| Dynamite | 3 | épique | — | — | — | — | — | Militaires | Explose au 8ᵉ tour de la nuit : 8 dégâts sur la case et autour |
| Mine claymore | 2 | commune | — | — | — | — | — | Militaires | Explose au passage : 4 dégâts sur toutes les cases à 2 cases ou moins |
| Fût piégé | 1 | commune | — | — | — | — | — | Pyromanes | Explose au passage : 4 dégâts autour et les zombies brûlent 3 tours |
| Filet | 1 | commune | — | — | — | — | — | Trappeurs | Le zombie qui passe est pris 4 tours, sert 2 fois |
| Piège à ours | 2 | rare | — | — | — | — | — | Trappeurs | Le premier zombie qui marche dessus subit 10 dégâts |

### Objets (jour)

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Conserves | 1 | commune | — | — | — | — | — | — | Utilise-la sur l'abri : +3 PV |
| Outils | 2 | commune | — | — | — | — | — | — | Utilise-les sur l'abri : toutes tes unités récupèrent 3 PV |
| Trousse de secours | 1 | rare | — | — | — | — | — | — | Utilise-la sur une de tes unités blessées : elle récupère tous ses PV |
| Café | 0 | épique | — | — | — | — | — | — | Utilise-le sur l’abri : gratuit, +2 énergie aujourd’hui |
| Carte routière | 1 | rare | — | — | — | — | — | — | Utilise-la sur l’abri : regarde les 3 prochaines cartes de ta pioche et prends-en une |
| Fusée de détresse | 1 | rare | — | — | — | — | — | — | Utilise-la sur l’abri : la nuit prochaine, la horde n’arrive que d’un seul côté |

### Réactions (nuit)

| Carte | Coût | Rareté | PV | Dégâts | Portée | Cadence | Rôle | Faction | Capacité |
|---|---|---|---|---|---|---|---|---|---|
| Gaz lacrymogène | 1 | commune | — | — | — | — | — | — | Pendant la nuit : les zombies sur la case visée et autour sont perdus 3 tours |
| Napalm | 2 | rare | — | — | — | — | — | — | Pendant la nuit : la case visée et autour s’embrasent (flaques de feu jusqu’à l’aube) |
| Frappe aérienne | 3 | épique | — | — | — | — | — | — | Pendant la nuit : 10 dégâts à tous les zombies à 2 cases ou moins de la case visée |
| Grenade | 1 | commune | — | — | — | — | — | — | Pendant la nuit : 5 dégâts sur la case visée et autour |
| Tir de l’abri | 1 | commune | — | — | — | — | — | — | Pendant la nuit : 6 dégâts au zombie le plus proche de l’abri |
| Réparation express | 1 | commune | — | — | — | — | — | — | Pendant la nuit : une de tes unités récupère 5 PV |
| Molotov | 2 | rare | — | — | — | — | — | — | Pendant la nuit : 2 dégâts sur la case visée et autour, et les zombies y brûlent 4 tours |
| Klaxon | 2 | rare | — | — | — | — | — | — | Pendant la nuit : tous les zombies reculent d’une case |
| Adrénaline | 2 | épique | — | — | — | — | — | — | Pendant la nuit : tes unités attaquent deux fois pendant 3 tours |

## Troc de l'aube (ferraille)
- Réparer l’abri : +3 PV à l’abri (15 ferraille).
- Munition anti-Colosse : Se tire pendant la nuit du Colosse : 30 dégâts. 3 en stock au maximum (20 ferraille).
- Améliorer une carte : Toutes tes cartes de ce type sont améliorées. Plus cher à chaque fois (25 ferraille, +15 à chaque achat).
- Jeter une carte : Retire une carte de ton deck (10 ferraille).

## Survivants de départ
- Le survivant : Aucun bonus. Idéal pour apprendre.
- La policière : Commence avec la Lunette de visée : tes tireurs ont +1 portée.
- Le fermier : Commence avec le Manuel du trappeur : tes pièges font +2 dégâts.
- L’infirmière : Commence avec la Marmite de soupe : +1 PV à l’abri à chaque aube.

## Lieux
- La maison des bois : Le lieu d’origine. Ni bonus, ni malus.
- La ferme : Une rivière protège le nord : la horde arrive par les 3 autres côtés. Deux bottes de paille (barricades) au départ.
- La station-service : Deux bonbonnes de gaz et 10 ferraille au départ, l’Essence ne coûte rien. Mais la horde est 15 % plus nombreuse.
- Le centre commercial : Murs épais : l’abri a 15 PV au lieu de 10. Mais les zombies ont 15 % de PV en plus.
