// Descriptions markdown des projets
// Utilise String.raw ou des variables séparées pour éviter les conflits de backticks

export const descriptions: Record<string, string> = {
  "1": `Premier portfolio personnel conçu from scratch avec **React** et **Tailwind CSS**.

- Design responsive avec animations au scroll
- Composants UI custom : cartes projets, timeline d'expérience
- Déployé sur **GitHub Pages**`,

  "2": `Jeu de tower defense complet développé en **C** avec **SDL2**.

- Génération procédurale de chemins aléatoires
- Placement de tours avec portée, dégâts et cadence variables
- Gestion des vagues d'ennemis et système de score
- Rendu graphique 2D avec SDL2`,

  "3": `Outil d'analyse et d'exploitation de fuites de données web, développé en **OCaml**.

- Parsing et traitement de fichiers de credentials leakés
- Détection de patterns et statistiques sur les mots de passe
- Interface en ligne de commande avec filtres paramétrables`,

  "4": `Simulation de chaîne de production avec **C#**, réalisée en binôme.

- Gestion de ressources via **files** et **piles**
- Événements en temps réel (pannes, réapprovisionnements)
- Suivi des coûts et statistiques de production
- Interface en menus console`,

  "5": `Simulation de lignes de bus avec visualisation graphique en **C** / **SDL2**.

- Structures de données : \`Tstation\` (ARRET / TRONCON) en **liste doublement chaînée**
- Tri fusion paramétrable par coût ou date, avec filtres
- Sauvegarde et chargement d'une ligne depuis fichier
- Animation des bus en temps réel avec SDL2`,

  "6": `Jeu de casse-briques développé en **OCaml** avec interface graphique **Labltk**.

- Plusieurs types de briques : *simple*, *double*, *bloc*, *bonus*
- Gestion des collisions avec la raquette, les murs et les coins
- Contrôle de la raquette au clavier
- Architecture fonctionnelle pure`,
}
