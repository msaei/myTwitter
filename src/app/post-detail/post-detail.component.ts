import { Component, OnInit } from '@angular/core';
import { POSTS } from '../posts/posts.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  private _postId: number = 1;
  private _post: any;
  constructor() { }

  ngOnInit() {
    this._post = POSTS[this._postId];
  }

  get post() {
    return this._post;
  }

}
