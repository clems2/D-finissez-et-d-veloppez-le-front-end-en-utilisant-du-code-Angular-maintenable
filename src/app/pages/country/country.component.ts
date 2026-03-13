import { AsyncPipe, NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { catchError, delay, map, of } from 'rxjs';
import { BackComponent } from 'src/app/components/back/back.component';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CountryViewModel } from 'src/app/models/country-view-model';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, BackComponent, NgIf, SpinnerComponent, AsyncPipe], 
  styleUrls: ['./country.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush

})
export class CountryComponent {
  private readonly countryId = Number(this.route.snapshot.paramMap.get('id'));

  public countryDatas$ = this.dataService.stateObservable$.pipe(
    // delay(5000), //Simule un délai de chargement pour voir le spinner
    map(
      state => {
        if(state.status !== 'loaded'|| !state.data) {
          return this.createEmptyCountryViewModel(state.status, state.error);
        }
        if(isNaN(this.countryId)) {
          this.router.navigate(['/not-found']);
          return this.createEmptyCountryViewModel('error','Invalid country id');
        }
        
        const country = state.data?.find(o => o.id === this.countryId);
        if (!country) {
          this.router.navigate(['/not-found']);
          return this.createEmptyCountryViewModel('error','Country not found');
        }
        const participations = country.participations;
        const totalEntries = participations.length;
        const years = participations.map(p => p.year);
        const medals = participations.map(p => p.medalsCount);
        const totalMedals = medals.reduce((acc,p) => acc + p, 0);
        const nbAthletes = participations.map(p => p.athleteCount);
        const totalAthletes = nbAthletes.reduce((acc,p) => acc + p, 0);
        const dataCards :DataCard[] = [
          { label: 'Number of Entries', value: totalEntries },
          { label: 'Number of Medals', value: totalMedals },
          { label: 'Number of Athletes', value: totalAthletes }
        ];
        return {
          state: state.status,
          titlePage : country.country,
          dataCards : dataCards,
          chartData: {
            labels: years,
            values: medals
          },
          error: state.error
        };
      }
    ),
    catchError(e => {
      return of(this.createEmptyCountryViewModel('error','Erreur lors de la préparation des données pour l\'affichage'));
    })
  );

  private createEmptyCountryViewModel(status: LoadingStatus, error?: string): CountryViewModel {
    return {
      state: status,
      titlePage: '',
      dataCards: [],
      chartData: {
        labels: [],
        values: []
      },
      error: error
    };
  }
  constructor(private route: ActivatedRoute, private router: Router, private dataService : DataService) {
  }

}