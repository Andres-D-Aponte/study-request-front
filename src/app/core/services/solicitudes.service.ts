import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable, map } from 'rxjs';
import { SolicitudData } from '../../modules/admin/pages/solicitudes/interfaces/solicitudes.interface';
import { Data } from '../../modules/admin/pages/solicitudes/interfaces/tipos-estudio.interface';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService extends BaseHttpService {
  getSolicitudes(): Observable<SolicitudData[]> {
    return this.get<{ error: boolean; message: string; data: SolicitudData[] }>(
      'study-request'
    ).pipe(map((response) => response.data));
  }

  getTiposEstudio(): Observable<Data[]> {
    return this.get<{ error: boolean; message: string; data: Data[] }>(
      'study-type'
    ).pipe(map((response) => response.data));
  }

  getSolicitud(id: number): Observable<SolicitudData> {
    return this.get<{ error: boolean; message: string; data: SolicitudData }>(
      `study-request/${id}`
    ).pipe(map((response) => response.data));
  }

  markAsDoneSolicitud(id: number): Observable<SolicitudData> {
    return this.put<{ error: boolean; message: string; data: SolicitudData }>(
      `study-request/${id}/completado`,
      {}
    ).pipe(map((response) => response.data));
  }

  createSolicitud(data: SolicitudData): Observable<SolicitudData> {
    return this.post<{ error: boolean; message: string; data: SolicitudData }>(
      'study-request',
      data
    ).pipe(map((response) => response.data));
  }

  updateSolicitud(id: number, data: SolicitudData): Observable<SolicitudData> {
    return this.put<{ error: boolean; message: string; data: SolicitudData }>(
      `study-request/${id}`,
      data
    ).pipe(map((response) => response.data));
  }

  deleteSolicitud(id: number): Observable<boolean> {
    return this.delete<{ error: boolean; message: string }>(
      `study-request/${id}`
    ).pipe(map((response) => !response.error));
  }
}
