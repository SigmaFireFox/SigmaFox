import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../models/routing.enum';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export enum MenuItemType {
  Navigate,
  Scroll,
  Action,
}

export enum MenuAction {
  Login,
  Logout,
}

export enum MenuIcon {
  Menu,
  Profile,
  Login,
  Logout,
}
export interface MenuOption {
  display: string;
  itemType: MenuItemType;
  isOpenDisplay: boolean;
  path?: string;
  action?: MenuAction;
  scrollLocation?: string;
}

export interface IconMenuOption {
  icon: string;
  menuIcon: MenuIcon;
  lable: string;
}

@Component({
  selector: 'e-questrian-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuIcon = MenuIcon;
  isMobileView = false;
  isLoggedIn = false;
  showDropDown = false;
  iconMenu: IconMenuOption[] = [];
  menuOptions: MenuOption[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }
  @HostListener('document:click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickout(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropDown = false;
    }
  }

  constructor(
    private auth: AuthenticationService,
    private eRef: ElementRef,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.setIsLoggedIn();
    this.determineView();
  }

  onLogoClick() {
    this.isLoggedIn
      ? this.router.navigate([AppRoutePaths.Dashboard])
      : this.router.navigate([AppRoutePaths.LandingPage]);
  }

  onMenuOptionClicked(option: MenuOption) {
    this.showDropDown = false;
    switch (option.itemType) {
      case MenuItemType.Navigate: {
        this.router.navigate([option.path]);
        break;
      }
      case MenuItemType.Scroll: {
        // TODO
        break;
      }
      case MenuItemType.Action: {
        switch (option.action) {
          case MenuAction.Login: {
            this.router.navigate(['/signin']);
            break;
          }
          case MenuAction.Logout: {
            this.auth.UserSignOut();
            this.isLoggedIn = false;
            this.router.navigate(['/']);
            this.determineView();
            break;
          }
        }
        break;
      }
    }
  }

  onMenuIconClicked(icon: MenuIcon) {
    switch (icon) {
      case MenuIcon.Menu: {
        this.showDropDown = !this.showDropDown;
        break;
      }
      case MenuIcon.Profile: {
        // TODO
        break;
      }
      case MenuIcon.Login: {
        this.router.navigate(['/signin']);
        break;
      }
      case MenuIcon.Logout: {
        this.auth.UserSignOut();
        this.isLoggedIn = false;
        this.router.navigate(['/']);
        this.determineView();
        break;
      }
    }
  }

  private async setIsLoggedIn() {
    this.isLoggedIn = await this.auth.isAuthenticated();
  }

  private determineView() {
    this.isMobileView = window.innerWidth <= 450;
    this.setIconMenu();
    this.setMenuItems();
  }

  private setMenuItems() {
    this.menuOptions = [
      {
        display: 'Calendar',
        itemType: MenuItemType.Navigate,
        isOpenDisplay: true,
        path: '/calendar',
      },
      {
        display: 'Finances',
        itemType: MenuItemType.Navigate,
        isOpenDisplay: true,
        path: '/finances',
      },
      {
        display: 'Clients',
        itemType: MenuItemType.Navigate,
        isOpenDisplay: true,
        path: '/clients',
      },
    ];
    if (this.isLoggedIn) {
      this.menuOptions.push(
        {
          display: 'Profile',
          itemType: MenuItemType.Navigate,
          isOpenDisplay: false,
          path: '/',
        },
        {
          display: 'Logout',
          itemType: MenuItemType.Action,
          isOpenDisplay: false,
          action: MenuAction.Logout,
        }
      );
    }
    if (!this.isLoggedIn) {
      this.menuOptions.push({
        display: 'Login',
        itemType: MenuItemType.Action,
        isOpenDisplay: false,
        action: MenuAction.Login,
      });
    }
  }

  private async setIconMenu() {
    this.iconMenu = [];

    if (this.isMobileView)
      this.iconMenu.push({
        icon: 'menu',
        menuIcon: MenuIcon.Menu,
        lable: 'Menu',
      });
    if (!this.isMobileView && this.isLoggedIn)
      this.iconMenu.push({
        icon: 'account_circle',
        menuIcon: MenuIcon.Profile,
        lable: 'Profile',
      });
    if (!this.isMobileView && !this.isLoggedIn)
      this.iconMenu.push({
        icon: 'login',
        menuIcon: MenuIcon.Login,
        lable: 'Login',
      });
    if (!this.isMobileView && this.isLoggedIn)
      this.iconMenu.push({
        icon: 'logout',
        menuIcon: MenuIcon.Logout,
        lable: 'Logout',
      });
  }
}
