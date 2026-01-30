import { NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { filter, map, Subject, switchMap, takeUntil } from 'rxjs';
import { BackComponent } from 'src/app/components/back/back.component';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { DataService } from 'src/app/services/data.service';
import { LoadingStatus } from 'src/app/state/loading-state';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent, BackComponent, NgIf], 
  styleUrls: ['./country.component.scss'],
//  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit {
  public lineChart!: Chart<"line", number[], number>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public dataCards : DataCard[] = [];
  //CHART PARAMS
  public years: number[] = [];
  public medals: number[] = [];
  //Unsubscribe signal Destroy with OnDestroy()
  //private destroy = new Subject<void>();
  //DestroyRef injection
  private destroyRef = inject(DestroyRef);
  // Stocké le state actuel pour adapter l'affichage HTML
  public state: LoadingStatus = 'loading';
  public stateError: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private dataService : DataService) {
  }


  ngOnInit() {
    //let countryName: string | null = null
    //this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName')); //Si j'ai bien compris, ce n'est pas bon d'avoir deux subscribe car ils ont une dépendance commune (countryName) et créent donc un état transitoire et lent car se base sur deux flux imbriqués.
    const subscription = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(id => !isNaN(id)), 
      //Ecoute le signal destroy, s'il émet une valeur, on se désabonne automatiquement
      takeUntilDestroyed(this.destroyRef),
      switchMap(id => // On utilise car le paramètre vient de la route qui peut changer et retourne un Observable
        this.dataService.stateObservable.pipe(
          filter(state => state.status !=='loading'),
          map(state => ({state, id}))
        ) 
      )
    ).subscribe(
      ({state, id})=>{
        this.state = state.status;
        if( state.status === 'error' || state.status === 'empty'){
          this.stateError = state.error || 'Unknown error';
          this.router.navigate(['/not-found']);
          return;
        }
        if(state.status === 'loaded'){
          const country = state.data?.find(o => o.id === id);
          if (!country) {
            this.router.navigate(['/not-found']);
            return;
          }
          console.log(`Données du pays : ${JSON.stringify(country)}`); //TODO A RETIRER PLUS TARD
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
       
//        this.buildChart(years, medals);
      }   
    )
  }
 
  //Méthode with Subject and signal and takeUntil
  // ngOnDestroy(): void {
  //   //Émet une valeur pour indiquer la destruction
  //   this.destroy.next();
  //   this.destroy.complete();
  // }
}
//Dans le cas actuel, étant un fichier JSON, on pourrait juste utiliser Rxjs take(1) pour ne prendre qu'une seule émission et éviter les fuites de mémoire. Mais dans le cas d'une API REST, on pourrait avoir des mises à jour régulières des données (via WebSocket par exemple) et il faudrait alors gérer la désinscription dans ngOnDestroy().
