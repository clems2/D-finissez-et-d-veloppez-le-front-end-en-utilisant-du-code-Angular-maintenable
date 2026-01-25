import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { ChartContainerComponent } from 'src/app/components/chart-container/chart-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataCard } from 'src/app/models/data-card';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeaderComponent, ChartContainerComponent],
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

  //Signal to unsubscribe when destroying the component
  private destroy = new Subject<void>();

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getOlympics().pipe(takeUntil(this.destroy)).subscribe(
      olympics =>{
        console.log(`Liste des données : ${JSON.stringify(olympics)}`); //TODO A RETIRER PLUS TARD
        if (olympics && olympics.length > 0) {
          this.totalJOs = Array.from(new Set(olympics.map((olympic: Olympic) => olympic.participations.map((f: Participation) => f.year)).flat())).length;
          this.countries = olympics.map((olympic: Olympic) => olympic.country);
          this.sumOfAllMedalsYears = olympics.map(olympic => olympic.participations.reduce((acc, p)=>acc+p.medalsCount,0));
          this.dataCards = [
            { label: 'Number of Countries', value: this.countries.length },
            { label: 'Number of JOs', value: this.totalJOs }
          ];
//          this.buildPieChart(this.countries, this.sumOfAllMedalsYears); // TODO A RETirer et laisser la responsabilité au ChatContainer
        }
      }
    )
  }
  ngOnDestroy(): void {
    //Emit a value to indicate destruction
    this.destroy.next();
    this.destroy.complete();
  }

}

