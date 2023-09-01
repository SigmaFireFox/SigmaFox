import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  constructor() {}

  getTodaysDateAsString() {
    let date = new Date();
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
}
