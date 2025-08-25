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
    {
    path: 'subscriptions',
    loadComponent: () =>
      import('./features/subscriptions/subscriptions-list/subscriptions-list.component').then(
        (m) => m.SubscriptionsListComponent
      ),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transactions/historial/historial.component').then(
        (m) => m.HistorialComponent
      ),
  }
];
