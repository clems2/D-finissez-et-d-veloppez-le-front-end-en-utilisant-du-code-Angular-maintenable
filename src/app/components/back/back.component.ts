import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  @Input() link: string[] = ['']; //route par défaut
//  @Input() text = 'Go back'; //TODO Remplacer par donnéee en dur HTML
}
//Le composant ne retrouve pas la route par défaut vu qu'il est encapsulé