import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonStyle {
  Primary,
  Secondary,
  Tertiarty,
}

export enum ButtonAction {
  PrimarySubmit,
  SecondarySubmit,
  Cancel,
}

export interface AppButtonConfig {
  action: ButtonAction;
  text: string;
  style: ButtonStyle;
  disabled: boolean;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() config: AppButtonConfig | undefined;
  @Input() formValid: boolean | undefined;

  @Output() buttonClicked = new EventEmitter<AppButtonConfig>();

  buttonStyle = ButtonStyle;

  onButtonClicked() {
    if (!this.config) return;
    this.buttonClicked.emit(this.config);
  }
}
