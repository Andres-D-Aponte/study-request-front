import { Component, inject, Input, OnInit } from '@angular/core';
import { SolicitudData } from '../../interfaces/solicitudes.interface';
import { CommonModule, Location } from '@angular/common';
import { SolicitudesService } from '../../../../../../core/services/solicitudes.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeModule } from '../../../../../../shared/lib/prime-module';
import { MessageService } from 'primeng/api';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { CandidatosService } from '../../../../../../core/services/candidatos.service';

@Component({
  selector: 'app-crear-actualizar-solicitudes',
  standalone: true,
  imports: [PrimeModule, ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './crear-actualizar-solicitudes.component.html',
  styles: ``,
  providers: [MessageService],
})
export default class CrearActualizarSolicitudesComponent implements OnInit {
  @Input() solicitud?: SolicitudData;
  location = inject(Location);
  solicitudesSvc = inject(SolicitudesService);
  usuariosSvc = inject(CandidatosService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  messageSvc = inject(MessageService);

  estados: string [] = ["pendiente", "en_proceso", "completado"];
  estadosDropdown: { label: string; value: string }[] = [];
  usuarios: { label: string; value: number }[] = [];
  estudios: { label: string; value: number }[] = [];

  form: FormGroup = this.formBuilder.group({
    candidato_id: [null, [Validators.required]],
    tipo_estudio_id: [null, [Validators.required]],
    estado: ['pendiente', [Validators.required]],
    fecha_solicitud: [
      new Date().toISOString(),
      [Validators.required],
    ],
    fecha_completado: [null],
  });

  ngOnInit(): void {
    this.usuariosSvc.getCandidatos().subscribe((users) => {
      this.usuarios = users.map((u) => ({
        label: `${u.nombre} ${u.apellido}`,
        value: u.id,
      }));
      this.setFormValues();
    });

    this.solicitudesSvc.getTiposEstudio().subscribe((estudios) => {
      this.estudios = estudios.map((e) => ({ label: e.nombre, value: e.id }));
      this.setFormValues();
    });

    this.solicitud = (
      this.location.getState() as { solicitud: SolicitudData }
    ).solicitud;
    this.setFormValues();
  }

  setFormValues() {
    if (this.solicitud && this.usuarios.length && this.estudios.length) {
      this.form.patchValue(this.solicitud);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const solicitudData: SolicitudData = {
      ...this.form.value,
      estado: String(this.form.value.estado),
      fecha_completado:
        this.form.value.estado === 'completado' ? new Date() : null,
    };

    this.solicitud
      ? this.updateSolicitud(solicitudData)
      : this.createSolicitud(solicitudData);
  }

  async createSolicitud(solicitud: SolicitudData) {
    await this.solicitudesSvc.createSolicitud(solicitud).subscribe({
      next: () => {
        this.messageSvc?.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Solicitud creada correctamente',
        });
        setTimeout(() => {
          this.router.navigate(['/admin/solicitudes']);
        }, 1000);
      },
      error: (err: any) => {
        console.error('Error al crear solicitud:', err);
        this.messageSvc?.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al crear la solicitud',
        });
      },
    });
  }

  async updateSolicitud(solicitud: SolicitudData) {
    if (!this.solicitud) return;

    await this.solicitudesSvc
      .updateSolicitud(this.solicitud.id, solicitud)
      .subscribe({
        next: () => {
          this.messageSvc?.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Solicitud actualizada correctamente',
          });
          setTimeout(() => {
            this.router.navigate(['/admin/solicitudes']);
          }, 1000);
        },
        error: (err: any) => {
          console.error('Error al actualizar solicitud:', err);
          this.messageSvc?.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al actualizar la solicitud',
          });
        },
      });
  }

  cleanForm() {
    this.form.reset();
  }

  async markAsDone(solicitud: SolicitudData | undefined) {
    if (!solicitud) return;

    await this.solicitudesSvc.markAsDoneSolicitud(solicitud.id).subscribe({
      next: () => {
        this.messageSvc?.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Solicitud marcada como completada',
        });
        this.router.navigate(['/admin/solicitudes']);
      }
    });

  }
}
