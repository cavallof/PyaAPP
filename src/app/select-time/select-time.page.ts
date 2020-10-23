import { Component, OnInit, NgModule } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/ionic2-calendar';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { Apppointment } from '../shared/appointment.interface';
import { User } from '../shared/user.interface';


@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.page.html',
  styleUrls: ['./select-time.page.scss'],
})
export class SelectTimePage implements OnInit {

  constructor(private modalCtrl: ModalController, private appServ: AppointmentService,
     private authServ: AuthService, private router: Router, private navCtrl: NavController) { }
  private time;
  dateTemp: Date;
  myapp: Apppointment;
  appData;
  testing;
  year;
  month;
  day;
  hour;
  minutes;
  user: User = { uid : null, photoURL : null, email : null, emailVerified : null, displayName : null };
  private subscription: Subscription;
  ngOnInit() {
    this.testing = this.appServ.currentApp.subscribe(val => {
      this.myapp = val;
      return this.myapp;
    });
    // this.appServ.getTime().subscribe( data => {
    //   this.appData = data.map( e => {
    //     return {
    //       uid: e.payload.doc.data()['uid'],
    //       services: e.payload.doc.data()['services'],
    //       duration: e.payload.doc.data()['duration'],
    //       date: e.payload.doc.data()['date']
    //     }
    //   });
    
  //  this.appServ.getAppointment().subscribe( data => {
  //  console.log(data);
  //  });
   
}
async onClick(){
  try {
    this.subscription = await this.authServ.user$.subscribe(val => {
     this.user = val;
     this.dateTemp = new Date(this.myapp.date);
     this.year = this.dateTemp.getFullYear();
     this.month = this.dateTemp.getMonth();
     this.day = this.dateTemp.getDate();
     this.hour = this.time.slice(0,2);
     this.minutes = this.time.slice(3,5);
     this.myapp.date = new Date(this.year, this.month, this.day, this.hour, this.minutes).getTime();
     console.log(this.time);
     this.appServ.updateApp(this.myapp); 
     this.appServ.createAppointment();
     this.router.navigate(['/home']);
   });
      } catch (error) {
   console.log('Error->', error);
  }

}
  onChange(selectedValue) {
    this.time = selectedValue.detail.value;
  }
  goHome(){
    this.navCtrl.navigateBack('home');
  }
  async onLogout(){
    
   await this.authServ.logout().then(e=>{
    this.navCtrl.navigateRoot('login');
   });
  }
}
