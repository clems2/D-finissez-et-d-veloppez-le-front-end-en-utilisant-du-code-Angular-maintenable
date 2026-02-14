import { NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { delay, filter, map, Subject, switchMap, takeUntil } from 'rxjs';
import { BackComponent } from 'src/app/components/back/back.component';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';
import { SpinnerComponent } from 'src/app/templates/spinner/spinner.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, BackComponent, NgIf, SpinnerComponent], 
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public dataCards : DataCard[] = [];
  //CHART PARAMS
  public years: number[] = [];
  public medals: number[] = [];
  //DestroyRef injection
  private destroyRef = inject(DestroyRef);
  // Stocke le state actuel pour adapter l'affichage HTML
  public state: LoadingStatus = 'loading';
  public stateError: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private dataService : DataService) {
  }


  ngOnInit() {

    //SNAPSHOT VERSION
    //SNAPSHOT of the param id
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.dataService.stateObservable.pipe(
//      delay(5000), //Simule un délai de chargement pour tester le spinner
      filter(state => state.status !=='loading'),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(state => {
        this.state = state.status;
        
        if(state.status === 'loaded'){
          const country = state.data?.find(o => o.id === id);
          if (!country) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.titlePage = country.country;
          const participations = country.participations;
          this.totalEntries = participations.length;
          this.years = participations.map(p => p.year);
          this.medals = participations.map(p => p.medalsCount);
          this.totalMedals = this.medals.reduce((acc,p) => acc + p, 0);
          const nbAthletes = participations.map(p => p.athleteCount);
          this.totalAthletes = nbAthletes.reduce((acc,p) => acc + p, 0);
          this.dataCards = [
            { label: 'Number of Entries', value: this.totalEntries },
            { label: 'Number of Medals', value: this.totalMedals },
            { label: 'Number of Athletes', value: this.totalAthletes }
          ];
        } 
        else {
          this.stateError = state.error || 'Unknown error';
          this.router.navigate(['/not-found']);
          return;
        }      
      }   
    )
  }
}