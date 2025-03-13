export interface Solicitudes {
  error:   boolean;
  message: string;
  data:    SolicitudData[];
}

export interface SolicitudData {
  id:               number;
  candidato_id:     number;
  tipo_estudio_id:  number;
  estado:           string;
  fecha_solicitud:  Date;
  fecha_completado: null;
}
export interface SolicitudDataExtendida extends SolicitudData {
  candidatoNombre?: string;
  tipoEstudioNombre?: string;
}
