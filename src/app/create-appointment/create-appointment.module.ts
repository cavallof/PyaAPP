import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAppointmentPageRoutingModule } from './create-appointment-routing.module';

import { CreateAppointmentPage } from './create-appointment.page';
import { NgCalendarModule } from 'ionic2-calendar';

import localAR from '@angular/common/locales/es-AR';
import { CalendarModalPageModule } from '../calendar-modal/calendar-modal.module';

registerLocaleData(localAR);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAppointmentPageRoutingModule,
    NgCalendarModule,
    CalendarModalPageModule
  ],
  declarations: [CreateAppointmentPage],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-AR' }
  ]
})
export class CreateAppointmentPageModule {}
