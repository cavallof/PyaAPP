import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { Apppointment } from '../shared/appointment.interface';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.page.html',
  styleUrls: ['./select-service.page.scss'],
})
export class SelectServicePage implements OnInit {
  private listServices: Array<number> = new Array();
  private index = 0;
  private tempDuration;
  private test: Apppointment = {uid: null, services: [], duration: null, date: null};
  private user: User = { uid : null, photoURL : null, email : null, emailVerified : null, displayName : null };
   services: any[] = [{
    id: 1,
    name: 'Corte',
    duration: 30
  },
  {
    id: 2,
    name: 'Brushing',
    duration: 20
  },
  {
    id: 3,
    name: 'Color',
    duration: 45
  },
  {
    id: 4,
    name: 'Alisado',
    duration: 45
  }
];
  constructor(private appServ: AppointmentService, private router: Router, private authServ: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
    this.authServ.user$.subscribe(val =>{
      this.user = val;
    });
  }
  onChange(selectedValue){
    this.tempDuration = 0;
    console.log(selectedValue.detail.value);
    selectedValue.detail.value.forEach(element => {
      this.tempDuration += this.services[element - 1 ].duration;
      this.test.duration += this.services[element - 1 ].duration;
      this.test.services.push(this.services[element - 1 ].name);
      //this.test.date = new Date().getTime();
      this.test.uid = this.user.uid;
     });
    //console.log(acum);
    //console.log(this.test.services);
    this.appServ.updateApp(this.test);    
    //this.router.navigate(['/select-time']);
    this.router.navigate(['/calendar-modal'])
  }


  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWith = this.compareWithFn;

  goHome(){
    this.navCtrl.navigateBack('home');
  }
  async onLogout(){
    
   await this.authServ.logout().then(e=>{
    this.navCtrl.navigateRoot('login');
   });
  }
}
