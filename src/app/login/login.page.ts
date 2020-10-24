import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  userdata: User;
  constructor(private authSvc: AuthService, private router: Router) {}

 async onLogin(){
    try{
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.redirectUser(); 
      }
    } catch (error){
      console.log('Error:', error);
    }

  }
 private redirectUser(){
  this.router.navigate(['home']);
}

}
