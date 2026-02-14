# OlympicGamesStarter

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

N'oubliez pas d'installer les dépendances avant de démarrer (`npm install`).

## Table des matières

* [Contexte](#contexte)
* [Technologies utilisées](#technologies-utilisées)
* [Installation](#installation)
* [Serveur de développement](#serveur-de-développement)
* [Build](#build)
* [Architecture](#architecture)
* [Limites](#limites)
* [Améliorations possibles](#améliorations-possibles)
* [Auteur](#auteur)

---

## Contexte

Application Angular permettant de visualiser des statistiques sur les Jeux Olympiques, notamment le nombre de médailles par pays et l'historique des participations.

---

## Technologies utilisées

- Angular 18
- TypeScript
- RxJS
- Chart.js
- SCSS
- Angular Signals (pour les inputs)
- Architecture basée sur des composants standalone

---
## Installation

### Prérequis

Assurez-vous d'avoir installé les outils suivants :

- Git (pour cloner le repository) :
  https://git-scm.com/install/
- Node.js (version 18 ou supérieure recommandée)
  https://nodejs.org/

- npm (installé avec Node.js)

- Angular CLI (version 18)

Installez Angular CLI globalement si ce n'est pas déjà fait :

```bash
npm install -g @angular/cli
```

Vérifiez l'installation :

```bash
node -v
npm -v
ng version
```

---

### Cloner le projet

Clonez le repository Git :

```bash
git clone https://github.com/clems2/D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-Angular-maintenable.git
```

Accédez au dossier du projet :

```bash
cd olympic-games-app
```

---

### Installer les dépendances

Installez les dépendances nécessaires :

```bash
npm install
```

Cette commande installera automatiquement :

- Angular
- RxJS
- Chart.js
- TypeScript
- toutes les dépendances du projet

---

## Serveur de développement

Exécutez `ng serve` pour démarrer un serveur de développement. Accédez ensuite à `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

Ou utilisez :

`ng serve --host IP_ADRESS_WIFI_DEVICE`

si vous souhaitez tester l'application sur un autre appareil (téléphone ou tablette).

Vous pouvez trouver votre adresse IP en exécutant :

- `ipconfig` (Windows)
- `ifconfig` (Mac / Linux)

dans le terminal de l'appareil exécutant l'application.

---

## Build

Exécutez `ng build` pour construire le projet. Les fichiers générés seront stockés dans le dossier `dist/`.

---

## Architecture

Voir ARCHITECTURE.md pour plus de détails et des captures d'écran de l'application (version française).

```text
src/app/
│
├── components/
│   ├── spinner/
│   │   ├── spinner.component.ts
│   │   ├── spinner.component.html
│   │   └── spinner.component.scss
│   │
│   ├── header/
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   └── header.component.scss
│   │
│   ├── data-card/
│   │   ├── data-card.component.ts
│   │   ├── data-card.component.html
│   │   └── data-card.component.scss
│   │
│   ├── chart-container/
│   │   ├── chart-container.component.ts
│   │   ├── chart-container.component.html
│   │   └── chart-container.component.scss
│   │
│   └── back/
│       ├── back.component.ts
│       ├── back.component.html 
│       └── back.component.scss 
│
├── models/
│   ├── data-card.ts
│   ├── olympic.ts
│   └── participation.ts
│
├── pages/
│   ├── country/
│   │   ├── country.component.ts
│   │   ├── country.component.html
│   │   └── country.component.scss
│   │
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.scss
│   │
│   └── not-found/
│       ├── not-found.component.ts
│       ├── not-found.component.html
│       └── not-found.component.scss
│
├── services/
│   └── data/
│       └── data.service.ts
│
├── state/
│   └── loading-state.ts
│
├── app.component.ts (composant racine)
├── app.component.html
├── app.component.scss
└── app.module.ts
```

---

## Limites

- Les données sont chargées depuis un fichier JSON local et non depuis une API backend réelle.
- Pas de système d'authentification ni de gestion des utilisateurs.
- Aucun test unitaire ni test d'intégration.
- Pas de support multilingue.

---

## Améliorations possibles

- Ajouter des tests unitaires.
- Ajouter une API backend.
- Implémenter les patterns Factory et Adapter (pour les chart et retirer la dépendance à ChartJS).
- Ajouter la gestion des langues.
- Ajouter des paramètres visuels (thème clair/sombre par exemple).

---

## Auteur

Clément Cirou - Étudiant OpenClassrooms
