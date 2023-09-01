/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthServiceResponse,
  AuthenticationService,
} from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() displayMenu = new EventEmitter<void>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileDisplay();
  }

  user = {} as AuthServiceResponse;
  userSignIn = false;
  displaySignIn = false;
  displayName = '';
  screenWidth = 0;
  mobileDisplay = false;
  isMenuDisplayed = false;

  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isUserSignedIn();
    this.isMobileDisplay();
  }

  onLogoClick() {
    this.route.navigateByUrl('');
  }

  onDisplayNameClick() {
    this.userSignIn
      ? this.route.navigateByUrl('/user-profile')
      : (this.displaySignIn = true);
  }

  onProfileIconClick() {
    this.userSignIn
      ? (this.isMenuDisplayed = true)
      : (this.displaySignIn = true);
  }

  onUserSignedOut() {
    this.route.navigateByUrl('');
    this.isUserSignedIn();
  }

  closeSignIn() {
    this.displaySignIn = false;
    this.isUserSignedIn();
  }

  toggleMenu() {
    this.isMenuDisplayed = !this.isMenuDisplayed;
  }

  private async isUserSignedIn() {
    this.user = await this.authService.getSignedInUser();
    this.userSignIn = this.user.success;
    this.setDisplayName();
  }

  private isMobileDisplay() {
    window.innerWidth < 420
      ? (this.mobileDisplay = true)
      : (this.mobileDisplay = false);
  }

  private setDisplayName() {
    if (!this.userSignIn) {
      this.displayName = 'Log in';
      return;
    }
    if (!this.user.user.displayName) {
      this.displayName = 'My Profile';
    } else {
      this.displayName = this.user.user.displayName;
    }
  }
}
