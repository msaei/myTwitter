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
  private _replys: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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
          this.retirveReplys()
        });
       });
    });

    
  }

  private retirveReplys(){
    firebase.database().ref('replys/'+ this.postId).on('child_added', (data: any) => {
      let reply = data.val();
      let key = { 'key': data.key};
      Object.assign(reply , key);
      //console.log(twitt);
      this._replys.value.push(reply);
      //this._tools.next(snapshot.val());
    });
  }

  get replys(): Observable<any[]>{
    return this._replys.asObservable();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  public sendReply(reply) {
    console.log(reply);
    let comment = {
      body: reply
    };
    let newReply = firebase.database().ref('replys/'+ this.postId).push();
    //console.log(newTwitt.key);
    newReply.set(comment);
  }

}
