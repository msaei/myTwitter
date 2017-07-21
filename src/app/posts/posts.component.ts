import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export const POSTS = [
  {
    id: 1,
    body: 'this is my first twitt'
  },
  {
    id: 2,
    body: 'this is my second twitt'
  },
  {
    id: 3,
    body: 'this is my third twitt'
  },
]

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
    firebase.database().ref('posts').on('value', (snapshot: any) => {
      this._posts.next(snapshot.val());
    });
  }

  get posts(): Observable<any[]>{
    return this._posts.asObservable();
  }

}
