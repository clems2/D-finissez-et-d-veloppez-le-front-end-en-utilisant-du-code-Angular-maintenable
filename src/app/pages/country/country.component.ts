import { AsyncPipe, NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { delay, map } from 'rxjs';
import { BackComponent } from 'src/app/components/back/back.component';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, BackComponent, NgIf, SpinnerComponent, AsyncPipe], 
  styleUrls: ['./country.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush

})
export class CountryComponent {

  // Stocke le state actuel pour adapter l'affichage HTML
  public state: LoadingStatus = 'loading';
  public stateError: string = '';
  private readonly countryId = Number(this.route.snapshot.paramMap.get('id'));

  public countryDatas$ = this.dataService.stateObservable$.pipe(
    // delay(5000), //Simule un délai de chargement pour voir le spinner
    map(
      state => {
        if(isNaN(this.countryId)|| state.status === 'error'){
          this.router.navigate(['/not-found']);
          return {
            status: state.status,
            titlePage: '',
            years: [],
            medals: [],
            dataCards: [],
            error: state.error || 'Unknown error'
          };
        }
        if(state.status === 'loading' || state.status === 'empty'){
          return {
            status: state.status,
            titlePage: '',
            years: [],
            medals: [],
            dataCards: [],
            error: state.error
            };
        }
        
        const country = state.data?.find(o => o.id === this.countryId);
        if (!country) {
          this.router.navigate(['/not-found']);
          return {
            status: state.status,
            titlePage: '',
            years: [],
            medals: [],
            dataCards: [],
            error: state.error
          };
        }
        const titlePage = country.country;
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
          status: state.status,
          titlePage : titlePage,
          years : years,
          medals :medals,
          dataCards : dataCards,
          error: state.error
        };
      }
    )
  );

  constructor(private route: ActivatedRoute, private router: Router, private dataService : DataService) {
  }

}