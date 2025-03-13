export interface Candidato {
  error: boolean;
  message: string;
  data: CandidatoData[];
}

export interface CandidatoData {
  id: number;
  nombre: string;
  apellido: string;
  documento_identidad: string;
  correo: string;
  telefono: string;
}
