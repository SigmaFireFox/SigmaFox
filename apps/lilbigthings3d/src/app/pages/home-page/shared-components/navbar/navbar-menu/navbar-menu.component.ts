/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'apps/lilbigthings3d/src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'apps/lilbigthings3d/src/app/services/event-management/event-management.service';
import { AppUserProfile } from 'apps/lilbigthings3d/src/app/services/user/user.interface';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent {
  @Input() userProfile: AppUserProfile | undefined;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly router: Router
  ) {}

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

  onViewOrdersClick() {
    this.router.navigate(['/orders']);
  }
}
