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
    this.setButtonStyle();
  }

  onClick() {
    this.clicked.emit();
  }

  setButtonStyle() {
    if (!this.config) {
      return console.log('StandardButton', 'Requires config to be provided');
    }

    // Style for buttonSize provided (if provided)
    switch (this.config.buttonSize) {
      case ButtonSize.Standard: {
        return (this.style = {
          height: '4vh',
          width: '25vh',
          'font-size': '1.5vh',
        });
      }
      case ButtonSize.Large: {
        return (this.style = {
          height: '7vh',
          width: '30vh',
          'font-size': '2.2vh',
        });
      }
    }

    // Default styling (if no buttonSize provided)
    return (this.style = {
      height: '4vh',
      width: '25vh',
      'font-size': '1.5vh',
    });
  }
}
