import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable, map } from 'rxjs';
import { CandidatoData } from '../../modules/admin/pages/candidatos/interfaces/candidatos.interface';

@Injectable({
  providedIn: 'root',
})
export class CandidatosService extends BaseHttpService {
  getCandidatos(): Observable<CandidatoData[]> {
    return this.get<{ error: boolean; message: string; data: CandidatoData[] }>(
      'candidate'
    ).pipe(map((response) => response.data));
  }

  getCandidato(id: number): Observable<CandidatoData> {
    return this.get<{ error: boolean; message: string; data: CandidatoData }>(
      `candidate/${id}`
    ).pipe(map((response) => response.data));
  }

  createCandidato(data: CandidatoData): Observable<CandidatoData> {
    return this.post<{ error: boolean; message: string; data: CandidatoData }>(
      'candidate',
      data
    ).pipe(map((response) => response.data));
  }

  updateCandidato(id: number, data: CandidatoData): Observable<CandidatoData> {
    return this.put<{ error: boolean; message: string; data: CandidatoData }>(
      `candidate/${id}`,
      data
    ).pipe(map((response) => response.data));
  }

  deleteCandidato(id: number): Observable<boolean> {
    return this.delete<{ error: boolean; message: string }>(
      `candidate/${id}`
    ).pipe(map((response) => !response.error));
  }
}
