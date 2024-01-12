import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum ButtonSize {
  Standard,
  Large,
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sigmafox-standard-button',
  templateUrl: './standard.button.html',
  styleUrls: ['./standard.button.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StandardButton implements OnInit {
  @Input() size = ButtonSize.Standard;
  @Input() copy = '';
  @Input() class = '';
  @Input() isDisabled = false;
  @Output() clicked = new EventEmitter<void>();

  style = {};

  ngOnInit() {
    if (this.size === ButtonSize.Standard) {
      this.style = { height: '25px', width: '150px' };
    }
    if (this.size === ButtonSize.Large) {
      this.style = { height: '50px', width: '250px' };
    }
  }

  onClick() {
    this.clicked.emit();
  }
}
