import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valuations-delta',
  templateUrl: './valuations-delta.component.html',
  styleUrls: ['./valuations-delta.component.css']
})
export class ValuationsDeltaComponent implements OnInit {
  // Set the date we're counting down to
  deadline = new Date('Dec 19, 2021 23:59:59').getTime();

  constructor() {}

  ngOnInit(): void {

}
}
