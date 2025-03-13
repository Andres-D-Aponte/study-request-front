import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component'),
      },
    ],
  },
] as Routes;
