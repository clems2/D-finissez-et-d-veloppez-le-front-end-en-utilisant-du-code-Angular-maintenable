import { AsyncPipe, NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { catchError, delay, map, Observable, of} from 'rxjs';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { HomeViewModel } from 'src/app/models/home-view-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, NgIf, SpinnerComponent, AsyncPipe],
  styleUrls: ['./home.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
  
})
export class HomeComponent {
  titlePage: string = "Medals per Country";


  public homeDatas$:Observable<HomeViewModel> = this.dataservice.stateObservable$.pipe(
      // delay(5000), //Simule un délai de chargement pour voir le spinner
      map(
        state => {
          if(state.status != 'loaded' || !state.data) {
            return this.createEmptyHomeViewModel(state.status,state.error); 
          }  
          const olympics : Olympic[] = state.data;
          const totalJOs = Array.from(new Set(olympics.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
          const countries = olympics.map((olympic: Olympic) => olympic.country);
          const ids = olympics.map((olympic: Olympic) => olympic.id);
          const sumOfAllMedalsYears = olympics.map((olympic: Olympic) => olympic.participations.reduce((acc, p)=>acc+p.medalsCount,0));
          const dataCards :DataCard[] = [
            { label: 'Number of Countries', value: countries.length },
            { label: 'Number of JOs', value: totalJOs }
          ];
          return {
            state: state.status,
            dataCards: dataCards,
            chartData: {
              ids: ids,
              labels: countries,
              values: sumOfAllMedalsYears
            }
          }
        }
      ),
      catchError(e => {
        return of(this.createEmptyHomeViewModel('error','Erreur lors de la préparation des données pour l\'affichage'));
      })
    );   
  
  private createEmptyHomeViewModel(status: LoadingStatus, error?: string): HomeViewModel {
    return {
      state: status,
      dataCards: [],
      chartData: {
        ids: [],
        labels: [],
        values: []
      },
      error: error
    };
  }

  constructor(private dataservice:DataService) { }

}

