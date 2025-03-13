import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/modules.routes'),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/page-not-found/page-not-found.component'),
  },
];
