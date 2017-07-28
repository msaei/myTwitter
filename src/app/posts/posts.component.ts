import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';



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

  constructor(private _us: UserService) { }

  ngOnInit() {
    firebase.database().ref('posts').on('child_added', (data: any) => {
      let twitt = data.val();
      let key = { 'key': data.key};
      Object.assign(twitt , key);
      //console.log(twitt);
      this._posts.value.push(twitt);
      //this._tools.next(snapshot.val());
    });

    this._sub = this._us.user.subscribe((value: any) =>  {
     console.log(value);
     this.user = value;

     /*this._zone.run(() => {
      this.user = value;
     })*/
   });
  }

  get posts(): Observable<any[]>{
    return this._posts.asObservable();
  }

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
  }

  public favoriteChanged(fav) {
    console.log(fav);
  }

  

}
