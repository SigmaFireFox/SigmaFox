import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-address-dialog',
  templateUrl: './delete-address-dialog.component.html',
  styleUrls: ['./delete-address-dialog.component.scss'],
})
export class DeleteAddressDialogComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();
  @Output() deleteAddress: EventEmitter<void> = new EventEmitter();

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onDeleteItemSelect() {
    this.deleteAddress.emit();
  }
}
