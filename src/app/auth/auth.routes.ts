import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './ui/login';
import { RegisterComponent } from './ui/register';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { 
        path: 'login',
        loadComponent: () => import('./ui/login').then(m => m.LoginComponent)
      },
      { 
        path: 'register',
        loadComponent: () => import('./ui/register').then(m => m.RegisterComponent)
      },
      {   
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ],
  },
  

];
