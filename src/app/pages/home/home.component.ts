import { AsyncPipe, NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import { delay, map} from 'rxjs';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, NgIf, SpinnerComponent, AsyncPipe],
  styleUrls: ['./home.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
  
})
export class HomeComponent {
  public totalJOs: number = 0
  public error!:string
  titlePage: string = "Medals per Country";

  //Data cards implementation
  public dataCards : DataCard[] = [];

  //Chart params
  public sumOfAllMedalsYears: number[] = [];
  public countries: string[] = [];
  public ids : number[] = [];

  //DestroyRef injection
  private destroyRef = inject(DestroyRef);

  //State courant pour l'affichage HTML
  public state: LoadingStatus = 'loading';
  public stateError: string = '';


  public homeDatas$ = this.dataservice.stateObservable$.pipe(
      // delay(5000), //Simule un délai de chargement pour voir le spinner
      map(
        state => {
          if(state.status === 'loading')return {state: 'loading' as LoadingStatus};
          if (state.status !== 'loaded') {
            return{
              state: state.status,
              error: state.error
            };
          }
          
          const olympics = state.data;
          if (!olympics || olympics.length === 0) {
            state.status = 'empty';
            return;
          }

          const totalJOs = Array.from(new Set(olympics.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
          const countries = olympics.map((olympic: Olympic) => olympic.country);
          const ids = olympics.map((olympic: Olympic) => olympic.id);
          const sumOfAllMedalsYears = olympics.map((olympic: Olympic) => olympic.participations.reduce((acc, p)=>acc+p.medalsCount,0));
          const dataCards :DataCard[] = [
            { label: 'Number of Countries', value: countries.length },
            { label: 'Number of JOs', value: totalJOs }
          ];
          return {
            state: 'loaded' as LoadingStatus,
            countries: countries,
            ids: ids,
            sumOfAllMedalsYears: sumOfAllMedalsYears,
            dataCards: dataCards
          }
        }
      ));   
  
  constructor(private dataservice:DataService) { }

}

