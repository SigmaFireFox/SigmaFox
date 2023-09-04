import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estimates-introduction-screen',
  templateUrl: './estimates-introduction.screen.html',
  styleUrls: ['./estimates-introduction.screen.scss'],
})
export class EstimatesIntroductionScreen implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
