import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() isFavorite: boolean;
  @Output() change = new EventEmitter();
  @Input() favoriteCount: number = 0;
  @Input() hostId: string;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  public toggleFavorite() {
    if(!this.disabled){
    this.isFavorite = !this.isFavorite;
    this.favoriteCount += this.isFavorite? +1 : -1;
    let favorite = {
      status: this.isFavorite,
      count: this.favoriteCount,
      hostId: this.hostId
    };
    this.change.emit(favorite);}
  }

}
