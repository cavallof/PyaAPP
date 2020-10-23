import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from '../shared/user.interface';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
   };
  private subscription: Subscription;

  private userdata: User = { uid : null, photoURL : null, email : null, emailVerified : null, displayName : null };
  constructor(private authSvc: AuthService, private router: Router) { }
  ngOnDestroy(): void {
  this.subscription.unsubscribe();
  this.authSvc.logout();
}
  ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
    this.getData();
 }
 async getData(){
   try {
     this.subscription = await this.authSvc.user$.subscribe(val => {
      this.userdata = val;
      console.log(val);
      console.log(val.displayName);
    });
       } catch (error) {
    console.log('Error->', error);
   }
 }
  onClick(){
  this.router.navigate(['/my-appointment']);
 }
}
