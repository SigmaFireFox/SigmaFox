import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-option-dialog',
  templateUrl: './order-option-dialog.component.html',
  styleUrls: ['./order-option-dialog.component.scss'],
})
export class OrderOptionDialogComponent {
  @Input() isArchived: boolean | undefined;
  @Output() archive: EventEmitter<void> = new EventEmitter();
  @Output() unarchive: EventEmitter<void> = new EventEmitter();
  @Output() repeat: EventEmitter<void> = new EventEmitter();
  @Output() view: EventEmitter<void> = new EventEmitter();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();

  showDeleteDialog = false;

  onArchiveClicked() {
    this.archive.emit();
  }

  onUnArchiveClicked() {
    this.unarchive.emit();
  }

  onRepeatClicked() {
    this.repeat.emit();
  }

  onViewClicked() {
    this.view.emit();
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }
}
