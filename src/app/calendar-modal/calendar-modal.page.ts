import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ok } from 'assert';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { Apppointment } from '../shared/appointment.interface';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage implements AfterViewInit {
  modalReady = false;
  user$;
  app: Apppointment = {uid: null, services: [], duration: null, date: null};
  subscription1: Subscription;
  event;
  eventSource;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  private unavailableDays: Date;

  markDisabled = (date: Date) => {
    const current = new Date();
    console.log(current);
    return  ( date.getDay() === 1 || date.getDay() === 0
    ||  date.getTime() < current.getTime() - (24 * 60 * 60 * 1000)
    || date.getTime() > ((current.getTime()) + 30 * 24 * 60 * 60 * 1000) //|| 
    //(date.getDate() + date.getMonth() === this.unavailableDays.getDate() + this.unavailableDays.getMonth())
     ) ;
     
  }
  constructor(private modalCtrl: ModalController, public alertController: AlertController,
     private appServ: AppointmentService, private authServ: AuthService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    const dia = new Date(1603497600 * 1000);
    this.unavailableDays = dia;
    console.log(dia.getDate());
    this.subscription1 = this.appServ.currentApp.subscribe(val => {
      this.app = val;
      return this.app; });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }
  close() {
    this.modalCtrl.dismiss();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onCurrentDateChanged(event) {
      this.event = event;
      this.presentAlertConfirm();
  }
//   createRandomEvents() {
//     var events = [];
//     for (var i = 0; i < 50; i += 1) {
//         var date = new Date();
//         var eventType = Math.floor(Math.random() * 2);
//         var startDay = Math.floor(Math.random() * 90) - 45;
//         var endDay = Math.floor(Math.random() * 2) + startDay;
//         var startTime;
//         var endTime;
//         if (eventType === 0) {
//             startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
//             if (endDay === startDay) {
//                 endDay += 1;
//             }
//             endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
//             events.push({
//                 title: 'All Day - ' + i,
//                 startTime: startTime,
//                 endTime: endTime,
//                 allDay: true
//             });
//         } else {
//             var startMinute = Math.floor(Math.random() * 24 * 60);
//             var endMinute = Math.floor(Math.random() * 180) + startMinute;
//             startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
//             endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
//             events.push({
//                 title: 'Event - ' + i,
//                 startTime: startTime,
//                 endTime: endTime,
//                 allDay: false
//             });
//         }
//     }
//     return events;
// }
loadEvents() {
  //this.eventSource = this.createRandomEvents();
  this.eventSource = [{user:'123', title: 'Evento de Prueba', startTime: new Date(2020,9,15,15,30), endTime: new Date(2020,9,15,16,30)}]
  var test = JSON.stringify(this.eventSource);
  // this.eventSource = this.createStaticAllDayEvents();
  //  let eventSource = this.createStaticNormalDayEvents();
  //  let eventSource1 = this.createStaticNormalDayEvents2();
  //  let eventSource2 = this.createStaticNormalDayEvents3();
  //  this.eventSource = eventSource.concat(eventSource1).concat(eventSource2);
  //  this.eventSource = this.createStaticCrossDayEvents();
  console.log(this.eventSource);
  console.log(test);
  console.log(this.calendar.currentDate);
}
async presentAlertConfirm() {   
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'Message <strong>text</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
          
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log(this.event.selectedTime.getTime())
          // this.authServ.user$.subscribe( data => {
          //   this.app.uid = data.uid;
          // });
          this.app.date = this.event.selectedTime.getTime();
          //this.app.duration = 30;
          this.appServ.updateApp(this.app);
          console.log(this.event);
          console.log('Confirm Okay');
          this.router.navigate(['/select-time']);
        }
      }
    ]
  });
  await alert.present();
}
async onLogout(){
 await this.authServ.logout().then(e=>{
  this.navCtrl.navigateRoot('login');
 });
 
}
goHome(){
  this.navCtrl.navigateBack('home');
}
}
