import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valuations-full',
  templateUrl: './valuations-full.component.html',
  styleUrls: ['./valuations-full.component.css']
})
export class ValuationsFullComponent implements OnInit {
  // Set the date we're counting down to
  deadline = new Date('Oct 31, 2021 23:59:59').getTime();

  constructor() {}

  ngOnInit(): void {

}
}
