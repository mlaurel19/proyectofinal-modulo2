import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'reactive',
    loadComponent: () => import('./pages/reactive-forms/reactive-forms')
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/user/user.routes'),
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
