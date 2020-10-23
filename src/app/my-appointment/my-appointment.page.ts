import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { Apppointment } from '../shared/appointment.interface';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.page.html',
  styleUrls: ['./my-appointment.page.scss'],
})
export class MyAppointmentPage implements OnInit {
private user;
private time;

myapp: Array<Apppointment> = [];

  constructor(private appServ: AppointmentService, private navCtrl: NavController, private authServ: AuthService) { }

  ngOnInit() {
    this.authServ.user$.subscribe(e =>{
      this.user  = e.uid;
      this.time = new Date().getTime();
      this.appServ.getAppointment(this.user, this.time).subscribe( data  => {
        this.myapp = data.map( e =>({
          date: new Date(e.date),
          uid: e.uid,
          duration: e.duration,
          services: e.services
        }));
        data.forEach(e=>{
          return new Date(e.date);
        })
            //console.log(this.myapp);
        });
            
    })

  }
  onClick(){
this.navCtrl.navigateForward('select-service');
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
