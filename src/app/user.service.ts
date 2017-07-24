import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { Observable } from 'rxjs/Observable';
 import * as firebase from 'firebase';
 
 @Injectable()
 export class UserService {
   private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   //private _dbRef = firebase.database().ref().child('users/7/username');
 
   constructor() {
     this._watchAuthState();
   }
 
   get user(): Observable<any> {
     return this._user.asObservable();
   }

   getTest(): any {
     
    // return this._dbRef;
   }

   /*writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email, 
    profile_picture : imageUrl
  });
}*/
 
   private _signIn(provider: any, callback: any): void {
     firebase.auth().signInWithPopup(provider).then((result: any) => {
       callback(null, result);
     }).catch((error: any) => {
       callback(error, null);
     });
   }
 
   public signInGoogle(callback?: any): void {
     const provider = new firebase.auth.GoogleAuthProvider();
     this._signIn(provider, (error: any, result: any) => {
       (callback) ? callback(error, result) : null;
     });
   }
 
   public signOut(callback?: any): void {
     firebase.auth().signOut().then((result: any) => {
       callback(null, result);
     }).catch((error: any) => {
       callback(error, null);
     });
   }
 
   private _watchAuthState(): void {
     firebase.auth().onAuthStateChanged((user: any) => {
       console.log(user);
       (user) ? this._user.next(user) : this._user.next(null);
     });
   }
 }
