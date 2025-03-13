import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeModule } from '../../../shared/lib/prime-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, PrimeModule],
  templateUrl: './layout.component.html',
  styles: [
    `
      .layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .header {
        width: 100%;
        background: var(--surface-50);
        box-shadow: var(--shadow-2);
        z-index: 10;
      }

      .content {
        flex-grow: 1;
        padding: 2rem;
      }

      .footer {
        width: 100%;
        background: var(--surface-100);
        text-align: center;
        padding: 1rem;
        box-shadow: var(--shadow-1);
      }
    `,
  ],
  providers: [MessageService],
})
export default class LayoutComponent implements OnInit {
  mV = inject(MessageService);

  ngOnInit() {
    this.sayHello();
  }

  sayHello() {
    this.mV.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Layout cargado correctamente',
    });
  }
}
