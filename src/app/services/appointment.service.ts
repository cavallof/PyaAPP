import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apppointment } from '../shared/appointment.interface';
import { User } from '../shared/user.interface';
import { firestore } from 'firebase';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  myAppointment: Apppointment;
  constructor(private afs: AngularFirestore) { }
   public myapp = new BehaviorSubject(null);
   currentApp = this.myapp.asObservable();
   private date;
   private year;
   private month;
   private day;
  // private idField;
  updateApp(app: Apppointment){
     this.myapp.next(app);
     console.log(this.myapp);
   }
  createAppointment(){
    let tempDate = new Date();
    this.year = tempDate.getFullYear();
    this.month = tempDate.getMonth();
    this.day = tempDate.getDate();
    
    const dataApp = this.myapp.value;
    this.afs.collection('appointments').add(dataApp);
  }
  deleteAppointment(app){
    this.afs.doc(`appointments/${app}`).delete();
  }
  updateAppointment(){}
  getAppointment(user, time) {
    //return this.afs.collection<Apppointment>('appointments', ref => ref.where('date','>', time).where('uid', '==', user)).valueChanges();
    return this.afs.collection<Apppointment>('appointments', ref => ref.where('date','>', time).where('uid', '==', user)).snapshotChanges();
  }
  getTime(){
    
     return this.afs.collection<Apppointment>('appointments').snapshotChanges();
    }
}

