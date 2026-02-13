# Projet 2 : Remarques sur l'architecture et le code de la solution


# Remarques globales
- Il y a des datas affichées sur le terminal du navigateur web.
- Certains éléments ne sont pas utilisés pour le moment comme les assets et certaines datas de l'API.
- Les URL ne correspondent pas à la spécification technique (ici /country/:countryName plutot que /country/:id).
- L'URL de base ne respecte pas la documentation de spécification. Le bouton retour est censé faire naviguer à '/' mais fait naviguer " ".
- Pas de gestion d'état de réception des datas alors que c'est prévu par la documentation de spécifications (Loading, Empty, Error).


# Country Component

## Remarques fonctionnelles
| Problème                       | Description                                                                                                                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chargement initial incorrect   | Au refresh, certains composants sont chargés en amont (Date, Go back) alors qu’il n’y a pas de header sur cet écran. Les valeurs affichées (cards country, number of medals, entries, athletes) sont incorrectes pendant les premières millisecondes, le temps qu'elles soient chargées. |
| Chart responsive mais peu logique | Le tableau est responsive mais son scope par défaut n’est pas cohérent (valeur max à 1). Les datas touchent les bords du scope aussi.                                                                                                                                                            |
| Rechargement du graphique      | Le graphique est recréé à chaque activation/désactivation du filtre. Il pourrait être conservé en mémoire si l’application n’est pas temps réel. Sinon, un pattern Observer pourrait être utilisé sur le flux de données pour être averti de mise à jour de données et d'un refresh du chart.                             |
| Spécification d'affichage des médailles      | La spécification d'affichage des médailles précise que c'est un total (gold + silver+ bronze). Ici, on considère juste que c'est une valeur entière sans calcul. Donc, il faut prévoir la possibilité de les calculer.                             |
| Responsiveness      | Comportement étrange en modifiant la taille. Certains composants deviennent plus grands (header) tandis que le Chart rétrécit en zoomant.                              |
## Remarques code TypeScript
| Ligne(s)        | Problème                                             | Remarque                                                 |
| --------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| 16              | Utilisation de `any`.                                 | Remplacer par `number`, comme les autres variables similaires. |
| 27, 30, 32, 34… | Utilisation de `any` pour le mapping des données API. | Utiliser un objet typé (`Record` ou interface dédiée). Créer les interfaces Participation et Olympic comme précisé dans la documentation spécifications.         |
| 27              | Appel HTTP dans le composant.                        | Créer un `DataService` pour gérer les appels API.           |
| 48              | Problème de typage medals en paramètre de buildChart()                            | Changer le string[] en number[].     |
| 48              | Duplication de code (création de chart).              | Factoriser via une `FactoryChart`.                             |
| 48              | Responsabilité excessive                             | Externaliser la création du chart dans un service dédié. `DataService` pourra servir à ça aussi.     |

## Remarques architecture HTML
| Élément                | Problème                                     | Remarque                       |
| ---------------------- | -------------------------------------------- | ------------------------------------ |
| ligne 6 `div.split`            | Blocs identiques (entries, medals, athletes) | Créer un `DataCardComponent`.        |
| ligne 3 `div.center.titlePage` | Structure identique au HomeComponent         | Factoriser dans un `TitleComponent` ou `HeaderComponent` qui encapsulerai un titre ainsi qu'un nombre i de DataCardComponent (précisé dans la documentation spécifications). |
| ligne 27 `div.center.go-back`   | Structure répétée dans le `Not-found` Component                           | Factoriser dans un `BackComponent`.  |



# Home Component

## Remarques fonctionnelles
| Problème            | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| Responsiveness      | Comportement étrange en modifiant la taille. Certains composants deviennent plus grands (header) tandis que le Chart rétrécit en zoomant.                              |
| Gestion des filtres | Possibilité de retirer tous les filtres (fonctionnel mais discutable UX). Par contre, il n'y a pas d'options de tris (comme précisé par la spécification) |
| Chargement initial  | Valeurs incorrectes au chargement (header, cards country et JO).          |

## Remarques code TypeScript
| Ligne(s)       | Problème                            | Remarque                              |
| -------------- | ----------------------------------- | -------------------------------------------- |
| 26, 27, 29, 30 | Utilisation de `any`                | Remplacer par un `Record` ou des interfaces. Créer les interfaces Participation et Olympic comme précisé dans la documentation spécifications. |
| 24, 35         | `console.log()` présents            | À supprimer après debug.                     |
| 22             | `subscribe` avec callbacks          | Utiliser un `Observer`.                      |
| 22             | Appels HTTP dans le composant       | Créer un `HomeService` ou un `DataService` comme précisé dans la documentation spécifications.                      |
| 41             | Duplication de code de chart        | Factoriser via une `FactoryChart`.           |
| 41             | Création du chart dans le composant | Externaliser dans un service.                |

## Remarques architecture HTML
| Élément                | Problème                                | Remarque                       |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| ligne 5 `div.center.titlePage` | Structure identique au CountryComponent | Factoriser dans un `TitleComponent`. |



# Not-found Component

## Remarques fonctionnelles
| Problème         | Description                        |
| ---------------- | ---------------------------------- |
| Responsiveness   | Le composant a l'air responsive mais j'ai la possibilité de scroll donc sûrement pas totalement adapté. |
| Contenu statique | Peu d’impact fonctionnel.          |

## Remarques code TypeScript
| Problème             | Description                                |
| -------------------- | ------------------------------------------ |
| Aucun point bloquant | Composant simple, pas de logique complexe. |

## Remarques architecture HTML
| Élément              | Problème          | Remarque                      |
| -------------------- | ----------------- | ----------------------------------- |
| ligne 1 `div.center.go-back` | Structure répétée | Factoriser dans un `BackComponent`. |



# Proposition de nouvelle implémentation d’architecture

## Remarques globales
  - Implémentation d'un State Pattern qui va être modifié par chaque composant Page qui vont faire appels au DataService.

## Models
- Une classe CountryData qui va mapper la réponse de l'API liée aux données d'un pays.
- Possiblement d'autres classes pour mapper si des évolutions ont lieu et que de nouvelles données sont renvoyés par des endpoints différents de l'API ou d'une autre API.

## Home Page

![Home Page](./ressources/HomePage.svg)

### HomePage
- Container principal de tous les composants de la page (Composant titre, HeaderComponent, ChartHandler)
- Peut fetch les données via un DataService que le composant va stocker
- Transmet les données à ses enfants en précisant un type de données

### HeaderComponent
- Container composé de :
  - Un div title ou TitleComponent
  - Un nombre n de DataCard
    - Correspond à une liste de DataModel stockée en champ
    - Les DataModel sont construits via une Factory prenant en paramètres un type et les datas
    - Permet de gérer plusieurs chemins d’API et des formats de données différents
- Il reçoit de son parent :
  - Un type et ses données pour générer les cards adaptées.

### DataCard
- Génère l’HTML à partir des données transmises par le HeaderComponent
- Généralement composé :
  - d’un titre
  - d’une donnée

### ChartHandler
- Container composé de :
  - D'un Chart et sa légende
  - Données reçues d’un parent (un type avec les datas) et fournie pour générer le Chart
  - Implémente un ChartAdapter
    - Permet l’utilisation d’autres librairies que Chart.js

## Country Page

![Country Page](./ressources/CountryPage.svg)

### CountryPage
- Container principal de tous les éléments de la CountryPage (Composant titre, HeaderComponent, ChartHandler, BackComponent)
- Peut fetch les données via un DataService que le composant va stocker
- Transmet les données à ses enfants en précisant un type de données

### HeaderComponent
- Container composé de :
  - Un div title ou TitleComponent
  - Un nombre n de DataCard
    - Correspond à une liste de DataModel stockée en champ
    - Les DataModel sont construits via une Factory prenant en paramètres un type et les datas
    - Permet de gérer plusieurs chemins d’API et des formats de données différents
  - Charge des données via son parent qui transmet les datas ainsi qu'un type.

### DataCard
- Génère l’HTML à partir des données transmises par le HeaderComponent
- Généralement composé :
  - d’un titre
  - d’une donnée

### ChartHandler
- Container composé de :
  - Chart qui affiche le chart et sa légende
  - Données reçues d’un parent (via une map associant un type avec les datas)
  - Implémente un ChartAdapter
    - Permet l’utilisation d’autres librairies que Chart.js

### BackComponent
- Composant contenant un bouton
- Permet de revenir à la route par défaut (HomePage)

## Not Found Page

![Not Found Page](./ressources/NotFoundPage.svg)

### NotFoundPage
- Container principal de tous les éléments de la NotFoundPage (Composant titre et BackComponent)

### BackComponent
- Composant contenant un bouton
- Permet de revenir à la route par défaut (HomePage)


## Arborescence du projet

```text
src/app/
├── components/
│   ├── header/
│   │   ├── header.component.ts
│   │   └── header.component.html
│   │
│   ├── chart-handler/
│   │   └── chart-handler.component.ts
│   │
│   └── back/
│       └── back.component.ts
│
├── pages/
│   ├── home/
│   │   ├── home.page.ts
│   │   └── home.page.html
│   │
│   ├── country/
│   │   ├── country.page.ts
│   │   └── country.page.html
│   │
│   └── not-found/
│       ├── not-found.page.ts
│       └── not-found.page.html
│
├── services/
│   └── data/
│       └── data.service.ts
│
├── models/
│   ├── data.model.ts
│   └── chart.model.ts
│
├── factories/
│   └── data.factory.ts
│
├── templates/
│   └── data-card/
│       ├── data-card.component.ts
│       └── data-card.component.html
│
├── adapters/
│   └── data-chart.adapter.ts
```
