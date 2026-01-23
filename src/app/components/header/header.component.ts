import { Component, Input } from '@angular/core';
import { DataCard } from 'src/app/models/data-card';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() dataCards : DataCard[] = [];
  


}
  