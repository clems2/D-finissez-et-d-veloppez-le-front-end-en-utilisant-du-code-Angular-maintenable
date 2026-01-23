import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [],
  templateUrl: './chart-container.component.html',
  styleUrl: './chart-container.component.scss'
})
export class ChartContainerComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() type!: ChartType;
  @Input() labels: (string | number)[] = [];
  @Input() values: number[] = [];
  @Input() legend: string = '';
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;

  constructor(private route: ActivatedRoute, private router: Router) { }
  ngAfterViewInit(): void { //TODO implements adapter and Factory
    this.buildChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Si les labels ou les valeurs changent et que la vue est prête
    if ((changes['labels'] || changes['values']) && this.canvas) {
      this.buildChart();
    }
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  private buildChart() {
    console.log('Labels:', this.labels);
    console.log('Values:', this.values);
    // Détruire le graphique existant s'il y en a un
    if (this.chart) {
      this.chart.destroy();
    }
    if(this.type == 'line'){
     const chart = new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "medals",
                data: this.values,
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
    else if(this.type == 'pie'){
      const pieChart = new Chart(this.canvas.nativeElement, {
            type: 'pie',
            data: {
              labels: this.labels,
              datasets: [{
                label: 'Medals',
                data: this.values,
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
        this.chart = pieChart;
    }
  }

}
