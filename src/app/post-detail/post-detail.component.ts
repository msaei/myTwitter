import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{
  public postId: any;
  public twitt: any;
  private _sub: Subscription;
  public user: any;
  public replys;

  constructor(private route: ActivatedRoute, private _zone: NgZone, private _us: UserService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.replys = this.db.list('/replys/' + this.postId);
    this.twitt = this.db.object('/posts/' + this.postId);
   

    this._sub = this._us.user.subscribe((value: any) =>  {
     console.log(value);
     this.user = value;
   });

    
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
