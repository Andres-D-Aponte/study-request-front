import { Component, Input } from '@angular/core';
import { PrimeModule } from '../../lib/prime-module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './button.component.html',
  styles: ``,
})
export class ButtonComponent {
  @Input({ required: true }) label: string = 'Text Button';
  @Input() color:
    | 'primary'
    | 'danger'
    | 'info'
    | 'success'
    | 'secondary'
    | 'warning'
    | 'contrast'
    | 'help' = 'primary';
  @Input() icon: string = '';
  @Input() rounded: boolean = false;
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
