import { Component, input, Input } from '@angular/core';
import { DataCard } from 'src/app/models/data-card';
import { DataCardComponent } from 'src/app/templates/data-card/data-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DataCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = input<string>();
  dataCards = input<DataCard[]>([]);
}
  