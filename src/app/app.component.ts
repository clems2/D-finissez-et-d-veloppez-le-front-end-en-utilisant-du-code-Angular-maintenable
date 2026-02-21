import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dataService : DataService){
  }
  
  title = 'Olympic Games App';

  ngOnInit() {
    this.dataService.loadOlympics().pipe(take(1)).subscribe();
  }
}
