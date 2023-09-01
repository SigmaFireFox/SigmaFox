import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product:
    | {
        id: string;
        image: string;
        title: string;
        price: number;
        description: string;
      }
    | undefined;

  constructor(private readonly router: Router) {}

  onProductcardClicked() {
    this.router.navigate(['../product', this.product?.id]);
  }
}
