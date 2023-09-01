/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import {
  EventChannel,
  EventTopic,
} from '../../../services/event-management/event-management.enum';
import { EventManagementService } from '../../../services/event-management/event-management.service';

@Component({
  selector: 'app-sign-out-dialog',
  templateUrl: './sign-out-dialog.component.html',
  styleUrls: ['./sign-out-dialog.component.scss'],
})
export class SignOutDialogComponent {
  @Output() deleteAddress: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly eventService: EventManagementService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onCloseDialog() {
    this.eventService.publish(
      EventChannel.Auth,
      EventTopic.SignOutAttempt,
      false
    );
  }

  onSignOutSelect() {
    this.authService.signOutUser();
    this.router.navigate(['']);
    this.eventService.publish(
      EventChannel.Auth,
      EventTopic.SignOutAttempt,
      false
    );
    this._snackBar.open('Sign out successfully', '', {
      panelClass: 'standard-snackbar',
      duration: 3000,
    });
  }
}
