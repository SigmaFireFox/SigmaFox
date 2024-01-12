import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sigmafox-standard-button',
  templateUrl: './standard.button.html',
  styleUrls: ['./standard.button.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StandardButton {
  @Input() copy = '';
  @Input() class = '';
  @Input() isDisabled = false;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
