import { Component } from '@angular/core';

@Component({
  selector: 'e-questrian-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LandingPage {
  scrollToNextScreen(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
