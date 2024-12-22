import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', title: 'Home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
  {
    path: 'products',
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: ':id',
        title: 'Product Details',
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'signup',
        title: 'signup',
        loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
      },
      {
        path: 'login',
        title: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'forget-password',
        title: 'forget password',
        loadComponent: () => import('./forget-password/forget-password.component').then(c => c.ForgetPasswordComponent)
      }
    ]
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
