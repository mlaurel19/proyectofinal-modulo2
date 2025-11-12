import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.routes'),
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
