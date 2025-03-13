export interface TiposEstudio {
  error:   boolean;
  message: string;
  data:    Data[];
}

export interface Data {
  id:          number;
  nombre:      string;
  descripcion: string;
  precio:      number;
}
