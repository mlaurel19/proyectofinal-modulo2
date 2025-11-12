import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/product-list/product-list')
  },
  {
    path: 'product-user',
    loadComponent: () => import('./components/product-create/product-create')
  },
  {
    path: ':id',
    loadComponent: () => import('./components/product-by-id/product-by-id')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default productRoutes;
