import { Routes } from '@angular/router';
import { authRoutes } from './auth';
// import { tokenGuard } from './auth/infrastructure/guards/token.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => authRoutes,
        
    },
    {
        path:'**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
    // {
    //     path: 'session',
    //     loadComponent: ()=>import('./session/session.component').then((m) => m.SessionsComponent)
    //     canActivate: [tokenGuard]
    // }
];
