import { Component } from '@angular/core';
import { BackComponent } from 'src/app/components/back/back.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [BackComponent],
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

  constructor() { }

}
