import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { DataCard } from 'src/app/models/data-card';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';
import { DataCardComponent } from 'src/app/templates/data-card/data-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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

  constructor(private router: Router, private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getOlympics().subscribe(
      olympics =>{
        console.log(`Liste des données : ${JSON.stringify(olympics)}`); //TODO A RETIRER PLUS TARD
        if (olympics && olympics.length > 0) {
          this.totalJOs = Array.from(new Set(olympics.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
          const countries: string[] = olympics.map((olympic: Olympic) => olympic.country);
          this.totalCountries = countries.length;
          const sumOfAllMedalsYears = olympics.map(olympic => olympic.participations.reduce((acc, p)=>acc+p.medalsCount,0));
          this.dataCards = [
            { label: 'Number of Countries', value: this.totalCountries },
            { label: 'Number of JOs', value: this.totalJOs }
          ];
          this.buildPieChart(countries, sumOfAllMedalsYears);
        }
      }
    )
  }

  buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}

