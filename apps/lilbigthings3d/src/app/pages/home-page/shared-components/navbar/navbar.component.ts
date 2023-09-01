/* eslint-disable @nx/enforce-module-boundaries */
import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'apps/lilbigthings3d/src/app/services/authentication/authentication.service';
import {
  EventChannel,
  EventTopic,
} from 'apps/lilbigthings3d/src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'apps/lilbigthings3d/src/app/services/event-management/event-management.service';
import { LocalStorageItem } from 'apps/lilbigthings3d/src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'apps/lilbigthings3d/src/app/services/local-storage/local-storage.service';
import { AppUserProfile } from 'apps/lilbigthings3d/src/app/services/user/user.interface';
import { UserService } from 'apps/lilbigthings3d/src/app/services/user/user.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  basketCount = 0;
  displayMenu = false;
  isMobileView = false;
  userProfile: AppUserProfile | undefined;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly eventService: EventManagementService,
    private readonly localStorageService: LocalStorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.router.events.subscribe(() => {
      this.setBasketCounter();
    });
  }

  async ngOnInit() {
    this.determineView();
    this.setProfileDetails();
    this.setBasketCounter();
    this.registerSubscriptions();
  }

  onLogoClick() {
    this.router.navigate(['']);
  }

  onMenuClick() {
    this.displayMenu = !this.displayMenu;
  }

  onProfileClick() {
    this.displayMenu = !this.displayMenu;
  }

  onBasketClick() {
    this.router.navigate(['basket']);
  }

  onSignInClick() {
    this.router.navigate(['sign-in']);
  }

  onSignOutClick() {
    this.eventService.publish(
      EventChannel.Auth,
      EventTopic.SignOutAttempt,
      true
    );
  }

  private registerSubscriptions() {
    this.eventService.subscribe(
      EventChannel.Product,
      EventTopic.BasketContentAmended,
      () => {
        this.setBasketCounter();
      }
    );
  }

  private setBasketCounter() {
    const basket: string[] = this.localStorageService.get(
      LocalStorageItem.Basket
    );

    if (!basket) {
      this.basketCount = 0;
      return;
    }

    this.basketCount = basket.length;
    this.cd.detectChanges();
  }

  private async determineView() {
    this.isMobileView = window.innerWidth < 400;
  }

  private async setProfileDetails(): Promise<void> {
    const userID = await this.authService.userID;
    if (!userID) return;
    this.userProfile =
      (await this.userService.getUserProfileByID(userID)) || undefined;

    if (!this.userProfile) return;
    this.userProfile.profilePic = await this.userService.getUserImage();
  }
}
