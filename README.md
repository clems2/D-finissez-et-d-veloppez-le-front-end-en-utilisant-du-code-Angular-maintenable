# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

Don't forget to install your node_modules before starting (`npm install`).

## Table of Contents

* [Context](#context)
* [Technologies Used](#technologies-used)
* [Development server](#development-server)
* [Build](#build)
* [Architecture](#architecture)
* [Limitations](#limitations)
* [Possible improvements](#possible-improvements)
* [Author](#author)


## Context

Angular application to visualize Olympic Games statistics, including medal counts by country and participation history.

## Technologies Used

- Angular 18

- TypeScript

- RxJS

- Chart.js

- SCSS

- Angular Signals (for inputs)

- Standalone components architecture

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Or `ng serve --host IP_ADRESS_WIFI_DEVICE` if you want to be able to test the application on an other device than the local device (phone or tablet). You can find IP_ADRESS_WIFI_DEVICE by entering ifconfig or ipconfig (depending on the OS) in the terminal of the device running the application.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture

See ARCHITECTURE.md for more details and page screenshots (french version).

```text
src/app/
│
├── adapters/
│   └── chart-adapter.ts (NOT IMPLEMENTED)
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
│   └── chart.factory.service.ts (NOT IMPLEMENTED)
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

## Limitations
- Data loaded from a local JSON and not a real backend API.
- No authentification or user management.
- No unit tests or integration tests.
- Some classes are not implemented and mentionned as possible improvements.
- No language adaptation.

## Possible improvements
- Unit tests.
- Add API backend.
- Factory and Adapter implementation.
- Add languages adaptation and visual parameters (light/dark theme for example).

## Author
Clément Cirou - Student OpenClassrooms