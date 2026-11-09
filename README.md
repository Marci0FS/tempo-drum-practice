# Tempo — ton atelier batterie

Application en français pour débuter avec des baguettes et un coussin, puis poursuivre sur une batterie électronique.

## Fonctionnalités

- 12 exercices progressifs : tenue, pulsation, croches, coordination, grooves, rudiments et mini-jam.
- Métronome Web Audio de 40 à 180 BPM, accent sur le premier temps.
- Motifs visuels, démonstration sonore et minuteur.
- Modes coussin et batterie électronique, jeu gaucher.
- Historique et notes sauvegardés dans le navigateur avec `localStorage`.

L’application guide la pratique ; elle ne mesure pas les frappes. Elle ne nécessite ni compte, ni microphone, ni connexion MIDI. Les données ne sont pas synchronisées entre appareils.

## Lancer en local

Node.js 22, sans dépendance à installer :

```sh
npm run dev
```

Ouvrir http://127.0.0.1:4174. `PORT` permet de choisir un autre port.

## Vérifier et construire

```sh
npm test
npm run build
```

Les tests couvrent les leçons, filtres, réglages, motifs en croches, minuteur et sauvegarde. Ils utilisent un environnement DOM simulé et ne remplacent pas une vérification visuelle et sonore dans un navigateur.

Le dossier `dist/` contient le site statique. `dist/Tempo.html` est également une version autonome que l’on peut ouvrir directement. Les polices de la version hébergée proviennent de Google Fonts avec repli sur les polices système.

## Déployer sur Vercel

Importer ce dépôt dans Vercel. Le fichier `vercel.json` configure le projet : framework Other, commande `npm run build`, dossier de sortie `dist`. Aucun secret ni variable d’environnement n’est nécessaire.

## Modifier

- `src/lessons.json` : contenu des exercices.
- `src/app.js` : interface, lecteur et sauvegarde locale.
- `src/tempo.css` : styles responsifs.
- `src/index.html` : page d’entrée.
- `build.mjs` : génération des fichiers déployables.

Les progrès de l’utilisateur ne font pas partie du dépôt.

