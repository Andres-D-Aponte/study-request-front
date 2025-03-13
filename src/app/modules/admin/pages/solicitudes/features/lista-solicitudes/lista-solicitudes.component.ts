import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SolicitudesService } from '../../../../../../core/services/solicitudes.service';
import { CandidatosService } from '../../../../../../core/services/candidatos.service';
import {
  SolicitudData,
  SolicitudDataExtendida,
} from '../../interfaces/solicitudes.interface';
import { Data as TipoEstudioData } from '../../interfaces/tipos-estudio.interface';
import { Router } from '@angular/router';
import {
  Column,
  TableComponent,
} from '../../../../components/table/table.component';
import { PrimeModule } from '../../../../../../shared/lib/prime-module';
import { CandidatoData } from '../../../candidatos/interfaces/candidatos.interface';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [PrimeModule, TableComponent],
  templateUrl: './lista-solicitudes.component.html',
  styles: [``],
  providers: [MessageService, ConfirmationService],
})
export default class ListaSolicitudesComponent implements OnInit {
  solicitudesSvc = inject(SolicitudesService);
  candidatosSvc = inject(CandidatosService);
  messageSvc = inject(MessageService);
  confirmationSvc = inject(ConfirmationService);
  router = inject(Router);

  solicitudes: SolicitudDataExtendida[] = [];
  candidatos: CandidatoData[] = [];
  tiposEstudio: TipoEstudioData[] = [];
  dialog: boolean = false;
  submitted: boolean = false;

  columns: Column[] = [
    { field: 'candidatoNombre', header: 'Candidato', sortable: true },
    { field: 'tipoEstudioNombre', header: 'Tipo Estudio', sortable: true },
    { field: 'fecha_solicitud', header: 'Fecha de Solicitud', sortable: true, type: 'date' },
    { field: 'fecha_completado', header: 'Completado', sortable: true, type: 'date' },
    { field: 'estado', header: 'Estado', sortable: true, type: 'status' },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.solicitudesSvc.getSolicitudes().subscribe({
      next: (solicitudes: SolicitudData[]) => {
        this.solicitudes = solicitudes;
        this.loadCandidatosYTipos();
      },
      error: (err: any) => {
        console.error('Error al obtener solicitudes:', err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener las solicitudes',
        });
      },
    });
  }

  loadCandidatosYTipos(): void {
    this.candidatosSvc.getCandidatos().subscribe({
      next: (candidatos: CandidatoData[]) => {
        this.candidatos = candidatos;
        this.solicitudes.forEach((solicitud) => {
          const candidato = this.candidatos.find(
            (c) => c.id === solicitud.candidato_id
          );
          solicitud['candidatoNombre'] = candidato
            ? `${candidato.nombre} ${candidato.apellido}`
            : 'Desconocido';
        });
      },
      error: () => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener candidatos',
        });
      },
    });

    this.solicitudesSvc.getTiposEstudio().subscribe({
      next: (tipos: TipoEstudioData[]) => {
        this.tiposEstudio = tipos;
        this.solicitudes.forEach((solicitud) => {
          const tipoEstudio = this.tiposEstudio.find(
            (t) => t.id === solicitud.tipo_estudio_id
          );
          solicitud['tipoEstudioNombre'] = tipoEstudio
            ? tipoEstudio.nombre
            : 'Desconocido';
        });
      },
      error: () => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener tipos de estudio',
        });
      },
    });
  }

  onEdit(solicitud: SolicitudData) {
    this.router.navigate(['/admin/solicitudes/editar'], {
      state: { solicitud },
    });
  }

  onDelete(solicitud: SolicitudData) {
    this.confirmationSvc.confirm({
      message: '¿Está seguro de eliminar esta solicitud?',
      accept: () => {
        this.solicitudesSvc.deleteSolicitud(solicitud.id).subscribe({
          next: () => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Solicitud eliminada correctamente',
            });
            this.loadData();
          },
          error: (err: any) => {
            console.error('Error al eliminar solicitud:', err);
            this.messageSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar la solicitud',
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }
}
