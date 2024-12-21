import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './ui/login';
import { RegisterComponent } from './ui/register';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
  

];
