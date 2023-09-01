import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketItem } from '../../basket-view.component';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnInit {
  @Input() item: BasketItem | undefined;
  @Output() updatedQty: EventEmitter<number> = new EventEmitter();

  qty = 1;

  ngOnInit(): void {
    this.updatedQty.emit(this.qty);
  }

  onPlusClick() {
    this.qty += 1;
    this.updatedQty.emit(this.qty);
  }

  onMinusClick() {
    this.qty -= 1;
    this.updatedQty.emit(this.qty);
  }
}
