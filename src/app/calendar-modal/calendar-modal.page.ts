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
  eventTemp;
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
    this.appServ.currentApp.subscribe(val => {
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
          // this.eventTemp={
          //   title: this.app.services,
          //   startTime: this.event.selectedTime,
          //   endTime:this.event.selectedTime
          // }
          //this.eventSource.push(this.eventTemp)
          //console.log(this.event);
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
