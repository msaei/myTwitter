import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSTS } from '../posts/posts.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private _postId: number = 1;
  private _post: any;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._postId = +params['id'];
    })
    this._post = POSTS[this._postId];
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  get post() {
    return this._post;
  }

}
