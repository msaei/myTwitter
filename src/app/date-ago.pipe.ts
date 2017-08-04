import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if(!value) 
      return null;
    let gap = Date.now() - value;
    let count = 0;
    const MIN = 60000;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = MONTH * 12;
   

     if (gap > YEAR) {
       count = Math.floor(gap/YEAR);
      return  count + " year" +  ((count > 1) ? 's' : '') + " ago.";
    } else if ( gap > MONTH ) {
      count = Math.floor(gap/MONTH);
      return count + " month" +  ((count > 1) ? 's' : '') + " ago.";
    } else if ( gap > WEEK ) {
      count = Math.floor(gap/WEEK);
      return count + " week" +  ((count > 1) ? 's' : '') + " ago.";
    } else if ( gap > DAY ) {
      count = Math.floor(gap/DAY);
      return count + " day" +  ((count > 1) ? 's' : '') + " ago";
    } else if ( gap > HOUR ) {
      count = Math.floor(gap/HOUR);
      return count + " hour" +  ((count > 1) ? 's' : '') + " ago";
    } else if ( gap > MIN ) {
      count = Math.floor(gap/MIN);
      return count + " min" +  ((count > 1) ? 's' : '') + " ago";
    }else {
      return "just now";
    } 
    
  }

}
