import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { filter, map, switchMap } from 'rxjs';
import { BackComponent } from 'src/app/components/back/back.component';
import { Olympic } from 'src/app/models/olympic';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
//  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit {
  private olympicUrl = './assets/mock/olympic.json';
  public lineChart!: Chart<"line", number[], number>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    //let countryName: string | null = null
    //this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName')); //Si j'ai bien compris, ce n'est pas bon d'avoir deux subscribe car ils ont une dépendance commune (countryName) et créent donc un état transitoire et lent car se base sur deux flux imbriqués.
    this.route.paramMap.pipe(
      map(params => params.get('countryName')),
      filter((countryName): countryName is string => !!countryName), //pareil que countryName !==null
      switchMap(countryName => // On utilise car le paramètre vient de la route qui peut changer et retourne un Observable
        this.http.get<Olympic[]>(this.olympicUrl).pipe(
          map(data => {
            const country = data.find(c => c.country === countryName);
            if (!country) {
              throw new Error('Country not found');
            }
            return country;
          })
        )
      )
    ).subscribe(
      (country)=>{
        this.titlePage = country.country;
        const participations = country.participations;
        this.totalEntries = participations.length;
        const years = participations.map(p => p.year);
        const medals = participations.map(p => p.medalsCount);
        this.totalMedals = medals.reduce((acc,p) => acc + p, 0);
        const nbAthletes = participations.map(p => p.athleteCount);
        this.totalAthletes = nbAthletes.reduce((acc,p) => acc + p, 0);
        this.buildChart(years, medals);
      }
        
    )
  }

  buildChart(years: number[], medals: number[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
