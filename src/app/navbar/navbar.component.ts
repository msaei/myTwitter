import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _sub: Subscription;
  public user: any;

  constructor(private _us: UserService) { }

  ngOnInit() {
    this._sub = this._us.user.subscribe((value: any) =>  {
     console.log(value);
     this.user = value;

     /*this._zone.run(() => {
      this.user = value;
     })*/
   });
  }

  public signInGoogle(): void {
     this._us.signInGoogle((error: any, success: any) => {
       console.log(error);
       console.log(success);
     });
   }

   public signOutGoogle(): void {
     this._us.signOut((error: any, success: any) => {
       console.log(error);
       console.log(success);
     });
   }

}
