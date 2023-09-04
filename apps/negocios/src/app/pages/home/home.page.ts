import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private auth: AuthService) {}

  onEstimateClick() {
    this.router.navigateByUrl('/estimates');
  }
  onNewDesktopClick() {
    this.navigateToDashboardOrSignIn();
  }
  onNewFullValuationClick() {
    this.navigateToDashboardOrSignIn();
  }

  private navigateToDashboardOrSignIn() {
    this.auth.isLoggedIn
      ? this.router.navigateByUrl('/dashboard')
      : this.router.navigateByUrl('/sign-in');
  }
}
