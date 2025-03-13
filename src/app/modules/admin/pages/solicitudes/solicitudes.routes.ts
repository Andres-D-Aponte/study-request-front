import { Routes } from "@angular/router";

export default [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Solicitudes | Lista',
        loadComponent: () =>
          import('./features/lista-solicitudes/lista-solicitudes.component'),
        pathMatch: 'full',
      },
      {
        path: 'crear',
        title: 'Solicitudes | Crear',
        loadComponent: () =>
          import(
            './features/crear-actualizar-solicitudes/crear-actualizar-solicitudes.component'
          ),
      },
      {
        path: 'editar',
        title: 'Solicitudes | Editar',
        loadComponent: () =>
          import(
            './features/crear-actualizar-solicitudes/crear-actualizar-solicitudes.component'
          ),
      },
    ],
  },
] as Routes;
