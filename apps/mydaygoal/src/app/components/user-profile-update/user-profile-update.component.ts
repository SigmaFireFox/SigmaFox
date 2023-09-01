/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthServiceResponse,
  AuthenticationService,
} from '../../services/authentication.service';
import {
  AppUserProfile,
  UserProfileService,
} from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss'],
})
export class UserProfileUpdateComponent implements OnInit {
  @Output() updateCanceled = new EventEmitter<void>();
  @Output() updateComplete = new EventEmitter<void>();

  updateProfile: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  loggedInUser = {} as AuthServiceResponse;
  userProfile = {} as AppUserProfile;
  displayErrorMessage = false;
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private userProfileService: UserProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initialiseSubscriptions();
  }

  private initialiseSubscriptions() {
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
      Object.keys(this.userProfile).length !== 0 ? this.initialisePage() : null;
    });
  }

  private async initialisePage() {
    this.setupForm();
  }

  onUpdateClick() {
    this.resetErrorMessage();
    if (this.findInvalidControls().length > 0) {
      this.errorMessage =
        'One or more of the inputs above have not been completed correctly. Please ensure email and password are correctly entered before attemptiong to signin';
      this.displayErrorMessage = true;
    } else {
      this.userProfile.basicDetail = {
        firstName: this.updateProfile.get('firstName')?.value,
        lastName: this.updateProfile.get('lastName')?.value,
        email: this.updateProfile.get('email')?.value,
      };
      this.userProfileService.updateUserProfile();
      this.authService.updateUserFirebaseProfile(this.userProfile.basicDetail);
      this.updateComplete.emit();
    }
  }

  onCancelClick() {
    this.updateCanceled.emit();
  }

  private async setupForm() {
    this.updateProfile
      .get('firstName')
      ?.setValue(this.userProfile.basicDetail.firstName);
    this.updateProfile
      .get('lastName')
      ?.setValue(this.userProfile.basicDetail.lastName);
    this.updateProfile
      .get('email')
      ?.setValue(this.userProfile.basicDetail.email);
  }

  private resetErrorMessage() {
    this.displayErrorMessage = false;
    this.errorMessage = '';
  }

  private findInvalidControls(): string[] {
    const invalid = [];
    const controls = this.updateProfile.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
