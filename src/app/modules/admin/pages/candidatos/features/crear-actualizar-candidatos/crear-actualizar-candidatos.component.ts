import { Component, inject, Input, OnInit } from '@angular/core';
import { CandidatoData } from '../../interfaces/candidatos.interface';
import { CommonModule, Location } from '@angular/common';
import { CandidatosService } from '../../../../../../core/services/candidatos.service';
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

@Component({
  selector: 'app-crear-actualizar-candidatos',
  standalone: true,
  imports: [PrimeModule, ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './crear-actualizar-candidatos.component.html',
  styles: ``,
  providers: [MessageService],
})
export default class CrearActualizarCandidatosComponent implements OnInit {
  @Input() candidato?: CandidatoData;
  location = inject(Location);
  candidatosSvc = inject(CandidatosService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  messageSvc = inject(MessageService);

  form: FormGroup = this.formBuilder.group({
    documento_identidad: ['', [Validators.required, Validators.minLength(8)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.candidato = (
      this.location.getState() as { candidato: CandidatoData }
    ).candidato;
    if (this.candidato) {
      this.form.patchValue(this.candidato);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    (await this.candidato)
      ? this.updateCandidato(this.form.value)
      : this.createCandidato(this.form.value);
  }

  async createCandidato(candidato: CandidatoData) {
    await this.candidatosSvc.createCandidato(candidato).subscribe({
      next: () => {
        this.messageSvc?.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Candidato creado correctamente',
        });
        setTimeout(() => {
          this.router.navigate(['/admin/candidatos']);
        }, 1000);
      },
      error: (err: any) => {
        console.error('Error al crear candidato:', err);
        this.messageSvc?.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al crear el candidato',
        });
      },
    });
  }

  async updateCandidato(candidato: CandidatoData) {
    if (!this.candidato) return;

    await this.candidatosSvc
      .updateCandidato(this.candidato.id, candidato)
      .subscribe({
        next: () => {
          this.messageSvc?.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Candidato actualizado correctamente',
          });
          setTimeout(() => {
            this.router.navigate(['/admin/candidatos']);
          }, 1000);
        },
        error: (err: any) => {
          console.error('Error al actualizar candidato:', err);
          this.messageSvc?.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al actualizar el candidato',
          });
        },
      });
  }

  cleanForm() {
    this.form.reset();
  }
}
