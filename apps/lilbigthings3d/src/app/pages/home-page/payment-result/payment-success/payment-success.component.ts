/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'apps/lilbigthings3d/src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'apps/lilbigthings3d/src/app/services/event-management/event-management.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent {
  constructor(
    private readonly router: Router,
    private readonly eventService: EventManagementService
  ) {}

  onViewOrdersClick() {
    this.router.navigate(['/orders']);
  }

  onViewProductsClick() {
    this.router.navigate(['']);
  }

  onSignOutsClick() {
    this.eventService.publish(
      EventChannel.Auth,
      EventTopic.SignOutAttempt,
      true
    );
  }
}
