import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeModule } from '../../../shared/lib/prime-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, PrimeModule],
  templateUrl: './layout.component.html',
  styles: ``,
})
export default class LayoutComponent {}
