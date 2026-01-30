import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, input, OnDestroy, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [],
  templateUrl: './chart-container.component.html',
  styleUrl: './chart-container.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
  
})
export class ChartContainerComponent implements AfterViewInit, OnDestroy {
  type = input<ChartType>();
  ids = input<number[]>([]);
  labels = input<(string | number)[]>([]);
  values = input<number[]>([]);
  legend = input<string>(''); //Pas obligatoirement une input signal
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;
  // signal pour indiquer si les éléments sont prêts (notamment le canvas)
  //private canvasReady = signal(false);


  constructor(private router: Router) {
    //Une erreur Runtime m'oblige à utiliser effect() dans un contexte d'injection tel qu'un constructor
     effect(() => {
      const type = this.type();
      const labels = this.labels();
      const values = this.values();

      if (!type || !labels.length || !values.length) {
        return;
      }

      this.buildChart(type, labels, values);
    });
   }
  
  ngAfterViewInit(): void { //TODO implements adapter and Factory
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  private buildChart(
    type : ChartType,
    labels : (string | number)[],
    values : number[]
  ) {
    console.log('Labels:', this.labels());
    console.log('Values:', this.values());
    // Détruire le graphique existant s'il y en a un
    if (this.chart) {
      this.chart.destroy();
    }
    if(type == 'line'){
     const chart = new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: "medals",
                data: values,
                backgroundColor: '#0b868f'
              },
            ]
          },
          options: {
            aspectRatio: 2.5
          }
        });
        this.chart = chart;
  
    }
    else if(type == 'pie'){
      const pieChart = new Chart(this.canvas.nativeElement, { //Dans le code d'origine utiliser le nom de l'id donné dans l'HTML au canvas
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                label: 'Medals',
                data: values,
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
                    const index = firstPoint.index;
                    const ids = this.ids();
                    this.router.navigate(['country', ids[index]]);
                  }
                }
              }
            }
          });
        this.chart = pieChart;
    }
  }

}
