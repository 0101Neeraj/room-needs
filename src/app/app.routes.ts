// import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login';
// import { RegisterComponent } from './pages/register/register';
// import { LayoutComponent } from './layout/layout'
// import { DashboardComponent } from './pages/dashboard/dashboard';
// import { GroceriesComponent } from './pages/groceries/groceries';
// import { SplitComponent } from './pages/split/split';

// export const routes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   {path: 'layout',component:LayoutComponent},
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'groceries', component: GroceriesComponent },
//   { path: 'split', component: SplitComponent },
//   { path: '**', redirectTo: '' }
// ];



import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'groceries',
        loadComponent: () =>
          import('./pages/groceries/groceries').then((m) => m.GroceriesComponent),
      },
      {
        path: 'split',
        loadComponent: () =>
          import('./pages/split/split').then((m) => m.SplitComponent),
      },
      {
        path: 'rent-alerts',
        loadComponent: () =>
          import('./pages/rent-alerts/rent-alerts').then((m) => m.RentAlertsComponent),
      },
    ],
  },
];
