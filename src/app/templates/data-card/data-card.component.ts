import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';
import { DataCard } from 'src/app/models/data-card';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class DataCardComponent {
  cards = input<DataCard[]>([]);
}
