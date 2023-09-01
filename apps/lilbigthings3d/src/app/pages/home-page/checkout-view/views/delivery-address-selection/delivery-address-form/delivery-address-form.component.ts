import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserAddress } from 'src/app/services/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';

export enum AddressType {
  House = 'House',
  Flat = 'Flat/Apartment',
  Farm = 'Farm/Small holding',
}

@Component({
  selector: 'app-delivery-address-form',
  templateUrl: './delivery-address-form.component.html',
  styleUrls: ['./delivery-address-form.component.scss'],
})
export class DeliveryAddressFormComponent implements OnInit {
  @Input() currentAddress: UserAddress | undefined;
  @Output() addressSubmitted: EventEmitter<UserAddress> = new EventEmitter();
  @Output() addressUpdated: EventEmitter<UserAddress> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  addressType = AddressType;

  deliveryAddressForm = new FormGroup({
    addressType: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    streetAddress1: new FormControl('', Validators.required),
    streetAddress2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (!this.currentAddress) {
      return;
    }

    this.deliveryAddressForm.controls['addressType'].setValue(
      this.currentAddress.addressType
    );
    this.deliveryAddressForm.controls['number'].setValue(
      this.currentAddress.number
    );
    this.deliveryAddressForm.controls['streetAddress1'].setValue(
      this.currentAddress.streetAddress1
    );
    this.deliveryAddressForm.controls['streetAddress2'].setValue(
      this.currentAddress.streetAddress2
    );
    this.deliveryAddressForm.controls['city'].setValue(
      this.currentAddress.city
    );
    this.deliveryAddressForm.controls['postalCode'].setValue(
      this.currentAddress.postalCode
    );
    this.deliveryAddressForm.controls['description'].setValue(
      this.currentAddress.description
    );
  }

  async onSubmit() {
    const userID = await this.authService.userID;

    if (!userID || this.deliveryAddressForm.invalid) return;

    if (!this.currentAddress) {
      await this.userService.addUserDeliveryAddress(
        userID,
        this.deliveryAddressForm.value as UserAddress
      );
      this.addressSubmitted.emit(this.deliveryAddressForm.value as UserAddress);
      return;
    }

    this.addressUpdated.emit(this.deliveryAddressForm.value as UserAddress);
  }
  onCancelClick() {
    this.cancel.emit();
  }
}
