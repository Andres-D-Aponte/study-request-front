import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../../../shared/lib/prime-module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { UtilsService } from '../../../../core/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [MessageService],
})
export default class LoginComponent {
  formBuilder = inject(FormBuilder);
  authsvc = inject(AuthService);
  utilsSvc = inject(UtilsService);
  messageSvc = inject(MessageService);
  router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.messageSvc.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Formulario inválido, por favor revise que los campos estén completos',
      });
      return;
    }

    this.authsvc.login(this.form.value).subscribe({
      next: (res: any) => {
        this.utilsSvc.setLocalStorage('token', res.token);
        this.utilsSvc.setLocalStorage('user', res.user);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Bienvenido de nuevo ${res.user.name}`,
        });
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: (err: any) => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales incorrectas',
        });
      },
    });
  }
}
