import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserOrder } from 'src/app/services/orders/orders.service';

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
