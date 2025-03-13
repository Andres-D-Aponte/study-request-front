import { Component, inject, OnInit } from '@angular/core';
import { CandidatosService } from '../../../../../../core/services/candidatos.service';
import { Candidato, CandidatoData } from '../../interfaces/candidatos.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Column,
  TableComponent,
} from '../../../../components/table/table.component';
import { PrimeModule } from '../../../../../../shared/lib/prime-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-candidatos',
  standalone: true,
  imports: [TableComponent, PrimeModule],
  templateUrl: './lista-candidatos.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export default class ListaCandidatosComponent implements OnInit {
  candidatosSvc = inject(CandidatosService);
  candidatos: CandidatoData[] = [];
  messageSvc = inject(MessageService);
  confirmationSvc = inject(ConfirmationService);
  router = inject(Router);

  candidatoDialog: boolean = false;
  submitted: boolean = false;

  columns: Column[] = [
    { field: 'documento_identidad', header: 'Documento' },
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'apellido', header: 'Apellido', sortable: true },
    { field: 'correo', header: 'Correo' },
    { field: 'telefono', header: 'Teléfono' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.getCandidatos();
  }

  getCandidatos(): void {
    this.candidatosSvc.getCandidatos().subscribe({
      next: (candidatos: CandidatoData[]) => {
        this.candidatos = candidatos;
      },
      error: (err: any) => {
        console.error('Error al obtener candidatos:', err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener los candidatos',
        });
      },
    });
  }

  onEdit(candidato: CandidatoData) {
    this.router.navigateByUrl('/admin/candidatos/editar', {
      state: { candidato },
    });
  }

  onDelete(candidato: Candidato | CandidatoData) {
    let candidatoData: CandidatoData | null = null;

    if ('data' in candidato) {
      if (!candidato.data || candidato.data.length === 0) {
        console.error("El objeto candidato no contiene datos.");
        return;
      }
      candidatoData = candidato.data[0];
    } else {
      candidatoData = candidato;
    }

    if (!candidatoData) {
      console.error("El objeto candidato no es válido.");
      return;
    }

    this.confirmationSvc.confirm({
      message: `¿Estás seguro de que deseas eliminar a ${candidatoData.nombre} ${candidatoData.apellido}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.candidatosSvc.deleteCandidato(candidatoData!.id).subscribe({
          next: () => {
            this.getCandidatos();
            this.messageSvc.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Candidato eliminado con éxito',
            });
          },
          error: (err: any) => {
            console.error('Error al eliminar candidato:', err);
            this.messageSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar el candidato',
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.candidatoDialog = false;
    this.submitted = false;
  }
}
