/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserOrder } from 'apps/lilbigthings3d/src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  @Input() order: UserOrder | undefined;
  @Output() back: EventEmitter<void> = new EventEmitter();

  onBackClick() {
    this.back.emit();
  }
}
