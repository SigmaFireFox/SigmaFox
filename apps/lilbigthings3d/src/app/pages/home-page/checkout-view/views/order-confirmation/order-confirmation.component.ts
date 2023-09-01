/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { PayFastParms } from 'apps/lilbigthings3d/src/app/services/checkout/checkout.service';
import { UserAddress } from 'apps/lilbigthings3d/src/app/services/user/user.interface';
import { BasketItem } from '../../../basket-view/basket-view.component';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  @Input() payFastParms: PayFastParms | undefined;
  @Input() selectedAddress: UserAddress | undefined;
  @Input() basketContent: BasketItem[] = [];

  confirmed = false;

  onConfirmClick() {
    this.confirmed = !this.confirmed;
  }
}
