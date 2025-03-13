import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: 'candidatos',
        loadChildren: () => import('./pages/candidatos/candidatos.routes'),
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./pages/solicitudes/solicitudes.routes'),
      },
    ],
  },
] as Routes;
