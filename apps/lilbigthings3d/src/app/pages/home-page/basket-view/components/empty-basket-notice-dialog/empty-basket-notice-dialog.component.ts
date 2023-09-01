import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empty-basket-notice-dialog',
  templateUrl: './empty-basket-notice-dialog.component.html',
  styleUrls: ['./empty-basket-notice-dialog.component.scss'],
})
export class EmptyBasketNoticeDialogComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

  onCloseDialog() {
    this.closeDialog.emit();
  }
}
