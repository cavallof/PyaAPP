import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }


  async loginGoogle(): Promise<User> {
    try{
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return user;
     } catch (error){
      console.log('Error:', error);
     }
 }

 async logout(): Promise<void> {
   try{
    await this.afAuth.signOut();
   } catch (error){
    console.log('Error:', error);
   }
 }

}


