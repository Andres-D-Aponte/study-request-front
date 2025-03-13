import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../../modules/auth/interfaces/login.interface';
import { UtilsService } from './utils.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  private utilsSvc = inject(UtilsService);
  private router = inject(Router);

  constructor() {}

  login(login: Login) {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  logout() {
    const token = this.utilsSvc.getLocalStorage('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe({
      next: () => {
        this.utilsSvc.removeLocalStorage('token');
        this.utilsSvc.removeLocalStorage('user');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        this.utilsSvc.removeLocalStorage('token');
        this.utilsSvc.removeLocalStorage('user');
        this.router.navigate(['/auth/login']);
      },
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
