import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  protected readonly apiUrl = environment.API_URL;
  protected http = inject(HttpClient);
  utilsSvc = inject(UtilsService);

  constructor() {}

  private getHeaders(): HttpHeaders {
    const userData = this.utilsSvc.getLocalStorage('token');
    const token = userData || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  protected get<T>(endpoint: string) {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  protected post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  protected put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  protected delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}
