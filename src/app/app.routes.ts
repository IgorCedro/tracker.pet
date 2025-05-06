import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [noAuthGuard] // Só acessível se NÃO autenticado
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [noAuthGuard]
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage),
    canActivate: [authGuard] // Protege a rota
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'services-page',
    loadComponent: () => import('./services-page/services-page.page').then( m => m.ServicesPagePage),
    canActivate: [authGuard] // Só acessível se autenticado
  },
  {
    path: '**',
    redirectTo: 'home' // Qualquer rota inválida redireciona para home
  }
];
