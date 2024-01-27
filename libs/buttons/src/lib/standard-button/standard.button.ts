import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSize } from './models/enums';
import { StandardButtonConfig } from './models/interfaces';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sigmafox-standard-button',
  templateUrl: './standard.button.html',
  styleUrls: ['./standard.button.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StandardButton implements OnInit {
  @Input() config: StandardButtonConfig | undefined;
  @Output() clicked = new EventEmitter<void>();

  style = {};

  ngOnInit() {
    if (!this.config) {
      console.log('StandardButton', 'Requires config to be provided');
      return;
    }

    if (this.config.buttonSize === ButtonSize.Standard) {
      this.style = {
        height: '4vh',
        width: '20vh',
        'font-size': '1.5vh',
      };
    }
    if (this.config.buttonSize === ButtonSize.Large) {
      this.style = {
        height: '7vh',
        width: '30vh',
        'font-size': '2vh',
      };
    }
  }

  onClick() {
    this.clicked.emit();
  }
}
