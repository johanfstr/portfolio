# Portfolio — prrojetBOOK

Site portfolio listant les projets présents dans `prrojetBOOK` (C, C++, OCaml, Flex/Bison, Web).

## Contenu

- **Accueil** : titre et lien vers la section Projets
- **Projets** : grille de cartes avec filtre par techno
- **Détails & démo** : modal avec description, technos, et selon le projet :
  - **Interface de test** : pour les projets web (Soduku, NthAfrcRp), la démo s’ouvre dans la modal (iframe) ou en plein écran
  - **Vidéo démo** : emplacement pour une vidéo YouTube/Vimeo (voir ci‑dessous)
- **Vue d’ensemble** : résumé des thématiques du dossier

## Ouvrir le portfolio

1. **Fichier local**
   Double-cliquer sur `index.html` pour l’ouvrir dans le navigateur.  
   La démo web (SITE_AMID) peut ne pas s’afficher en iframe (restrictions des URLs `file://`). Dans ce cas, utiliser **« Ouvrir en plein écran »**.

2. **Serveur local (recommandé pour les iframes)**

   Depuis la racine de `/home/aladin/wetransfer_prrojetbook_2026-03-17_0956` :
   ```bash
   python3 -m http.server 8080
   ```
   Puis aller sur `http://localhost:8080/portfolio/`  
   La démo web (SITE_AMID) s’affichera alors correctement dans la modal.

## Ajouter une vidéo démo

Pour un projet avec `demoType: 'video'`, vous pouvez afficher une vidéo YouTube ou Vimeo dans la modal.

1. Ouvrir `js/data.js`.
2. Trouver le projet concerné.
3. Renseigner `videoUrl` avec l’URL d’embed :
   - **YouTube** : `https://www.youtube.com/embed/VIDEO_ID`  
     (ex. pour `https://www.youtube.com/watch?v=abc123` → `https://www.youtube.com/embed/abc123`)
   - **Vimeo** : `https://player.vimeo.com/video/VIDEO_ID`

Exemple :

```js
{
  id: 'jpeg_compression',
  title: 'JPEG Compression (C++)',
  // ...
  demoType: 'video',
  videoUrl: 'https://www.youtube.com/embed/VOTRE_VIDEO_ID',
  codePath: '../prrojetBOOK/JPEG-Projet/',
},
```

Enregistrez une démo (écran ou terminal), uploadez-la sur YouTube ou Vimeo, puis collez l’URL d’embed dans `videoUrl`.

## Fichiers

- `index.html` — structure de la page
- `css/style.css` — mise en forme (thème sombre, cartes, modal)
- `js/data.js` — liste des projets (titres, descriptions, technos, chemins démo/code)
- `js/main.js` — filtres, modal, affichage démo (iframe ou vidéo)

Pour modifier les textes ou les liens des projets, éditer `js/data.js`.
