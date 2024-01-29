import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule],
  selector: 'sigmafox-two-state-icon-button',
  templateUrl: './two-state-icon.button.html',
  styleUrls: ['./two-state-icon.button.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TwoStateIconButton {
  @Input() conditionState = true;
  @Input() activeIcon = '';
  @Input() inactiveIcon = '';
  @Input() isDisabled = false;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
