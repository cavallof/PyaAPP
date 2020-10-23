import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAppointmentPage } from './my-appointment.page';
import { AuthGuard } from '../shared/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: MyAppointmentPage
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentPageRoutingModule {}
