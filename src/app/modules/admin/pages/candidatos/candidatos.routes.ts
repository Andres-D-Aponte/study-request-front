import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Candidatos | Lista',
        loadComponent: () =>
          import('./features/lista-candidatos/lista-candidatos.component'),
        pathMatch: 'full',
      },
      {
        path: 'crear',
        title: 'Candidatos | Crear',
        loadComponent: () =>
          import(
            './features/crear-actualizar-candidatos/crear-actualizar-candidatos.component'
          ),
      },
      {
        path: 'editar',
        title: 'Candidatos | Editar',
        loadComponent: () =>
          import(
            './features/crear-actualizar-candidatos/crear-actualizar-candidatos.component'
          ),
      },
    ],
  },
] as Routes;
