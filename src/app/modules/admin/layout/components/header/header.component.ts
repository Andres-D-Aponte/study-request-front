import { Component, inject, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../shared/lib/prime-module';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './header.component.html',
  styles: ``,
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  authSvc = inject(AuthService);
  router = inject(Router);
  messageSvc = inject(MessageService);

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/admin/dashboard',
      },
      {
        label: 'Candidatos',
        icon: 'pi pi-star',
        routerLink: '/admin/candidatos',
      },
      {
        label: 'Solicitudes',
        icon: 'pi pi-search',
        routerLink: '/admin/solicitudes',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-cog',
        routerLink: '/auth/login',
        command: () => {
          this.signOut();
        },
      },
    ];
  }

  signOut() {
    this.authSvc.logout();
  }
}
