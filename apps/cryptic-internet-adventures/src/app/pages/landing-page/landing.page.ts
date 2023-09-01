/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  userID: string | null = null;
  initComplete = false;
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    this.userID = await this.authService.userID;
    this.initComplete = true;
  }

  onEnterClick() {
    if (!this.userID) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['dashboard']);
  }
}
