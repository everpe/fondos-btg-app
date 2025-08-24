import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/funds',
    pathMatch: 'full',
  },
  {
    path: 'funds',
    loadComponent: () =>
      import('./features/funds/funds-page/funds-page.component').then(
        (m) => m.FundsPageComponent
      ),
  },
];
