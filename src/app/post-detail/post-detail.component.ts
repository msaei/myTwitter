import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public postId: any;
  public twitt: any;
  private sub: any;
  private _sub: Subscription;
  public user: any;
  private _replys: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private route: ActivatedRoute, private _zone: NgZone, private _us: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.postId = params['id'];
      let postRef = firebase.database().ref('posts/' + this.postId );
      postRef.on('value', snapshot => {
        console.log(snapshot.val());
        this._zone.run(() => {
          this.twitt = snapshot.val();
          this.retirveReplys()
        });
       });
    });

    this._sub = this._us.user.subscribe((value: any) =>  {
     console.log(value);
     this.user = value;
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
    let author = {
      name: this.user.displayName,
      photo: this.user.photoURL,
      email: this.user.email
    };
    let comment = {
      body: reply,
      author: author
    };
    //reply.value = '';
    let newReply = firebase.database().ref('replys/'+ this.postId).push();
    //console.log(newTwitt.key);
    newReply.set(comment);
  }

}
