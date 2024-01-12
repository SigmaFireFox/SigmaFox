import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export interface MenuOption {
  display: string;
  path: string;
}

@Component({
  selector: 'e-questrian-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMobileView = false;
  displayMenu = true;
  isLoggedIn = true;

  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', path: '/calendar' },
    { display: 'Finances', path: '/finances' },
    { display: 'Clients', path: '/clients' },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  @HostListener('document:click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickout(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.isMobileView) {
        this.displayMenu = false;
      }
    }
  }

  get innerWidth() {
    return window.innerWidth;
  }

  constructor(
    public router: Router,
    private eRef: ElementRef,
    private auth: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.determineView();
    }, 100);
    this.isLoggedIn = await this.auth.isAuthenticated();
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onNavbarIconClick() {
    if (this.router.url === '/') {
      if (this.isLoggedIn) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/signin']);
      }
    } else {
      this.displayMenu = !this.displayMenu;
    }
  }

  onMenuOptionClicked(path: string) {
    if (this.isMobileView) {
      this.displayMenu = false;
    }
    this.router.navigate([path]);
  }

  private determineView() {
    this.isMobileView = this.innerWidth <= 450;
    this.displayMenu = !this.isMobileView;
  }
}
