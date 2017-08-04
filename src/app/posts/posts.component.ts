import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase } from 'angularfire2/database';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  //private _posts: any[] = POSTS;
  private _posts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _sub: Subscription;
  public user: any;
  public posts;

  constructor(private _us: UserService, private db: AngularFireDatabase, private router: Router) {
    
   }

  ngOnInit() {
    /* firebase.database().ref('posts').on('child_added', (data: any) => {
      let twitt = data.val();
      let key = { 'key': data.key};
      Object.assign(twitt , key);
      //console.log(twitt);
      this._posts.value.push(twitt);
      //this._tools.next(snapshot.val());
    }); */
    //console.log(this.db.list('posts'));
    
    this.posts = this.db.list('posts');
    /* this.posts.subscribe(
      val => console.log(val)
    ) */
   // console.log (this.db.object('/posts'));

    this._sub = this._us.user.subscribe((value: any) =>  {
     console.log(value);
     this.user = value;

     /*this._zone.run(() => {
      this.user = value;
     })*/
   });
  }

  /* get posts(): Observable<any[]>{
    return this._posts.asObservable();
  } */

  public send_twitt(twt) {
    let author = {
      name: this.user.displayName,
      photo: this.user.photoURL,
      email: this.user.email
    };
    let twitt = {
      author: author,
      body: twt,
      likes: 0
    };
    //twt.value = '';
    let newTwitt = firebase.database().ref('posts').push();
    console.log(newTwitt.key);
    newTwitt.set(twitt);
    this.router.navigate(['/post', newTwitt.key]);
  }

  public favoriteChanged(fav) {
    console.log(fav);
    if(this.user){
     let userEmailId = (this.user.email) as string;
     userEmailId = userEmailId.split('.').join('___');
    
    //this.db .object('posts/' + fav.hostId ).update({likes: fav.count});
       let postRef = firebase.database().ref('posts/'+ fav.hostId);
     postRef.update({likes: fav.count}); 
    if (fav.status){
      postRef.child('likers/' + userEmailId).update({stats: true});
    }else{
      postRef.child('likers/' + userEmailId).remove();
    } 
    
   }
  }

  public isFavorite(likers: any): boolean{
    if(this.user){
    if(likers){
    let userEmailId = (this.user.email) as string;
     userEmailId = userEmailId.split('.').join('___');
    //console.log(likers[liker]);
    if (likers[userEmailId]){return true;}
    return false;}}
    return false;
  }

  get signedIn(): boolean {
    if (this.user){ return true};
    return false;
  }

  

}
