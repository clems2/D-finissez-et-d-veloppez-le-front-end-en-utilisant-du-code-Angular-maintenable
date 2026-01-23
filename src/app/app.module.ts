import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { BackComponent } from './components/back/back.component';
import { DataCardComponent } from './templates/data-card/data-card.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, AppRoutingModule, BackComponent, HeaderComponent, DataCardComponent, HomeComponent, NotFoundComponent, CountryComponent ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
