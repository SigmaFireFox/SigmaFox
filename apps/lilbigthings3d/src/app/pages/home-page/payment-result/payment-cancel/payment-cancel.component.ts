import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.scss'],
})
export class PaymentCancelComponent {
  constructor(private readonly router: Router) {}

  onViewBasketClick() {
    this.router.navigate(['/basket']);
  }

  onViewOrdersClick() {
    this.router.navigate(['/orders']);
  }

  onViewProductsClick() {
    this.router.navigate(['']);
  }
}
