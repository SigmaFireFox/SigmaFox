import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css'],
})
export class EstimatesComponent implements OnInit {
  // Set the date we're counting down to
  deadline = new Date('Aug 21, 2021 23:59:59').getTime();

  constructor() {}

  ngOnInit(): void {

}
}
// test