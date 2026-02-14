import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class BackComponent {
  @Input() link: string[] = ['']; //route par défaut
}
