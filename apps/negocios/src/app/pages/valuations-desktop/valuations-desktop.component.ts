import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valuations-desktop',
  templateUrl: './valuations-desktop.component.html',
  styleUrls: ['./valuations-desktop.component.css']
})
export class ValuationsDesktopComponent implements OnInit {
  // Set the date we're counting down to
  deadline = new Date('Sep 19, 2021 23:59:59').getTime();

  constructor() {}

  ngOnInit(): void {

}
}
