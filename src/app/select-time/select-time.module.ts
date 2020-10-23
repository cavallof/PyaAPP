import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTimePageRoutingModule } from './select-time-routing.module';

import { SelectTimePage } from './select-time.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTimePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [SelectTimePage]
})
export class SelectTimePageModule {}
