import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { BackComponent } from './components/back/back.component';
import { DataCardComponent } from './components/data-card/data-card.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartContainerComponent } from './components/chart-container/chart-container.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, AppRoutingModule, BackComponent, HeaderComponent, DataCardComponent, HomeComponent, NotFoundComponent, CountryComponent, ChartContainerComponent, SpinnerComponent ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
