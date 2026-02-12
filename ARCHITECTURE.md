# Projet 2 : Architecture de la solution Olympic Games App

## Arborescence du projet

```text
src/app/
│
├── adapters/
│   └── chart-adapter.ts (NON IMPLEMENTE)
│
├── components/
│   ├── header/
│   │   ├── header.component.ts
│   │   └── header.component.html
│   │
│   ├── chart-container/
│   │   ├── chart-container.component.ts
│   │   └── chart-container.component.html
│   │
│   └── back/
│       ├── back.component.ts
│       └── back.component.html 
│
├── factories/
│   └── chart.factory.service.ts (NON IMPLEMENTE)
│
├── models/
│   ├── data-card.ts
│   ├── olympic.ts
│   └── participation.ts
│
├── pages/
│   ├── country/
│   │   ├── country.component.ts
│   │   └── country.component.html
│   │
│   ├── home/
│   │   ├── home.component.ts
│   │   └── home.component.html
│   │
│   └── not-found/
│       ├── not-found.component.ts
│       └── not-found.component.html
│
├── services/
│   └── data/
│       └── data.service.ts
│
│
├── state/
│   └── loading-state.ts
│
├── templates/
│   ├── data-card/
│   │    ├── data-card.component.ts
│   │    └── data-card.component.html
│   │
│   └── spinner/
│        ├── spinner.component.ts
│        └── spinner.component.html
│
├── app.component.ts (App-root)
├── app.component.html
└── app.module.ts
```



# Proposition de nouvelle implémentation d’architecture

## Remarques globales
  - N'étant pas forcément dans le scope du projet, certains composants ont été implémentés dans des branches qui n'ont pas été merge à la main branch et sont considérés comme des évolutions possibles pour que le code respecte des principes SOLID.

## Adapters (Evolution)
### chart-adapter
Rôles : Classe permettant de réduire le lien entre la librairie CharJS et le composant qui affiche le chart. Si ChartJs ne prend pas tous les besoins graphiques que l'on souhaite, le ChartAdapter nous permet d'adapter nos nouveaux besoins graphiques dans une nouvelle version en appelant une autre librairie.


## Components
### back

### chart-container

### header

## Factories

### chart-factory

## Models

### data-card
- Une classe CountryData qui va mapper la réponse de l'API liée aux données d'un pays.
- Possiblement d'autres classes pour mapper si des évolutions ont lieu et que de nouvelles données sont renvoyés par des endpoints différents de l'API ou d'une autre API.

### olympic


### participation



## Pages


### HomePage

![Home Page](./ressources/HomePage.svg)

- Container principal de tous les composants de la page (Composant titre, HeaderComponent, ChartHandler)
- Peut fetch les données via un DataService que le composant va stocker
- Transmet les données à ses enfants en précisant un type de données


### Country Page

![Country Page](./ressources/CountryPage.svg)

- Container principal de tous les éléments de la CountryPage (Composant titre, HeaderComponent, ChartHandler, BackComponent)
- Peut fetch les données via un DataService que le composant va stocker
- Transmet les données à ses enfants en précisant un type de données


### Not Found Page

![Not Found Page](./ressources/NotFoundPage.svg)

- Container principal de tous les éléments de la NotFoundPage (Composant titre et BackComponent)


## Services
### dataService

## State

### loading-state


## Templates

### data-card

### spinner





