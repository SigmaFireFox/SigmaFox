import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUserProfile } from 'src/app/services/user/user.interface';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnInit {
  @Input() currentProfile: AppUserProfile | null | undefined;
  @Output() updatedProfile: EventEmitter<AppUserProfile> = new EventEmitter();

  userProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cellNumber: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (!this.currentProfile) return;

    this.userProfileForm.controls['firstName'].setValue(
      this.currentProfile.firstName
    );
    this.userProfileForm.controls['lastName'].setValue(
      this.currentProfile.lastName
    );
    this.userProfileForm.controls['email'].setValue(this.currentProfile.email);
    this.userProfileForm.controls['cellNumber'].setValue(
      this.currentProfile.cellNumber
    );
  }
  onSubmit() {
    this.updatedProfile.emit(this.userProfileForm.value as AppUserProfile);
  }
}
