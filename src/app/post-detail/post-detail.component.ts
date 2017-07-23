import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public postId: any;
  public twitt: any;
  private sub: any;
  constructor(private route: ActivatedRoute, private _zone: NgZone) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.postId = params['id'];
      let twittRef = firebase.database().ref('twitt/' + this.postId );
      twittRef.on('value', snapshot => {
        console.log(snapshot.val());
        this._zone.run(() => {
          this.twitt = snapshot.val();
        });
       });
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
