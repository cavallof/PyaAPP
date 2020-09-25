import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
   };

   userdata: User;
  constructor(private authSvc: AuthService) {}

 async onLogin(){
    try{
      const user = await this.authSvc.loginGoogle();
      this.userdata = user;
    } catch (error){
      console.log('Error:', error);
    }

  }
}
