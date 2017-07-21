import { Component, OnInit } from '@angular/core';

const POSTS = [
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
  private _posts: any[] = POSTS;

  constructor() { }

  ngOnInit() {
  }

  get posts(){
    return this._posts;
  }

}
