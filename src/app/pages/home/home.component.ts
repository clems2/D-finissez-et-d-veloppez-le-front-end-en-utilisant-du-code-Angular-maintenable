import { NgIf } from '@angular/common';
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { delay, Subject, takeUntil } from 'rxjs';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from 'src/app/templates/spinner/spinner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, NgIf, SpinnerComponent],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  titlePage: string = "Medals per Country";

  //Data cards implementation
  public dataCards : DataCard[] = [];

  //Chart params
  public sumOfAllMedalsYears: number[] = [];
  public countries: string[] = [];
  public ids : number[] = [];
  //Signal to unsubscribe when destroying the component with takeUntilDestroyed()
  //  private destroy = new Subject<void>();
  //DestroyRef injection
  private destroyRef = inject(DestroyRef);
  //state courant pour l'affichage HTML
  public state: LoadingStatus = 'loading';
  public stateError: string = '';


  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.stateObservable.pipe(
//      delay(5000), //Simule un délai de chargement pour voir le spinner
      takeUntilDestroyed(this.destroyRef))
      .subscribe(
      state => {
        this.state = state.status;
        if (state.status !== 'loaded') {
          this.stateError = state.error || 'Unknown error';
          return;
        }
        
        const olympics = state.data;
        // console.log(`Liste des données : ${JSON.stringify(olympics)}`); //TODO A RETIRER PLUS TARD
        if (!olympics || olympics.length === 0) {
          this.state = 'empty';
          return;
        }

        this.totalJOs = Array.from(new Set(olympics.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
        this.countries = olympics.map((olympic: Olympic) => olympic.country);
        this.ids = olympics.map((olympic: Olympic) => olympic.id);
        this.sumOfAllMedalsYears = olympics.map(olympic => olympic.participations.reduce((acc, p)=>acc+p.medalsCount,0));
        this.dataCards = [
          { label: 'Number of Countries', value: this.countries.length },
          { label: 'Number of JOs', value: this.totalJOs }
        ];
//          this.buildPieChart(this.countries, this.sumOfAllMedalsYears); // TODO A RETirer et laisser la responsabilité au ChatContainer
      });   
  }

//Without DestroyRef and takeUntilDestroyed (using Subject)
  /*
  ngOnDestroy(): void {
    //Emit a value to indicate destruction
    this.destroy.next();
    this.destroy.complete();
  }
*/
}

