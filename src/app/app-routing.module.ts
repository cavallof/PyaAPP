import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'my-appointment',
    loadChildren: () => import('./my-appointment/my-appointment.module').then( m => m.MyAppointmentPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'select-service',
    loadChildren: () => import('./select-service/select-service.module').then( m => m.SelectServicePageModule), canActivate: [AuthGuard],
  },
  {
    path: 'select-time',
    loadChildren: () => import('./select-time/select-time.module').then( m => m.SelectTimePageModule), canActivate: [AuthGuard],
  },
  {
    path: 'calendar-modal',
    loadChildren: () => import('./calendar-modal/calendar-modal.module').then( m => m.CalendarModalPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'create-appointment',
    loadChildren: () => import('./create-appointment/create-appointment.module').then( m => m.CreateAppointmentPageModule), canActivate: [AuthGuard],
  },
   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
