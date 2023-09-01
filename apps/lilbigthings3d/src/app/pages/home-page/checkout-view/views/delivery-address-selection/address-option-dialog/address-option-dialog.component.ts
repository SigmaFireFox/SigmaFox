import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address-option-dialog',
  templateUrl: './address-option-dialog.component.html',
  styleUrls: ['./address-option-dialog.component.scss'],
})
export class AddressOptionDialogComponent {
  @Output() edit: EventEmitter<void> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

  showDeleteDialog = false;

  onEditClicked() {
    this.edit.emit();
  }

  onDeleteClicked() {
    this.showDeleteDialog = true;
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }

  deleteAddress() {
    this.delete.emit();
  }
}
