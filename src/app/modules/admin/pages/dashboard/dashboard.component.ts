import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../../core/services/solicitudes.service';
import { PrimeModule } from '../../../../shared/lib/prime-module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent implements OnInit {
  solicitudesPendientes: number = 0;
  solicitudesenProceso: number = 0;
  solicitudesCompletadas: number = 0;


  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit() {
    this.obtenerConteoSolicitudes();
  }

  obtenerConteoSolicitudes() {
    this.solicitudesService.getSolicitudes().subscribe((solicitudes) => {
      this.solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente').length;
      this.solicitudesenProceso = solicitudes.filter(s => s.estado === 'en_proceso').length;
      this.solicitudesCompletadas = solicitudes.filter(s => s.estado === 'completado').length;
    });
  }
}
