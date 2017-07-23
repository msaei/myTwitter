import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  //private _posts: any[] = POSTS;
  private _posts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  ngOnInit() {
    firebase.database().ref('twitt').on('child_added', (data: any) => {
      let twitt = data.val();
      let key = { 'key': data.key};
      Object.assign(twitt , key);
      console.log(twitt);
      this._posts.value.push(twitt);
      //this._tools.next(snapshot.val());
    });
  }

  get posts(): Observable<any[]>{
    return this._posts.asObservable();
  }

  public send_twitt(twt) {
    console.log(twt);
    let twitt = {
      body: twt
    };
    let newTwitt = firebase.database().ref('twitt').push();
    newTwitt.set(twitt);
  }

}
