import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-basket-item-dialog',
  templateUrl: './delete-basket-item-dialog.component.html',
  styleUrls: ['./delete-basket-item-dialog.component.scss'],
})
export class DeleteBasketItemDialogComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();
  @Output() deleteItem: EventEmitter<void> = new EventEmitter();

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onDeleteItemSelect() {
    this.deleteItem.emit();
  }
}
