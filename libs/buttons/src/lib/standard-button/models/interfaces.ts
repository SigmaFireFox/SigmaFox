import { ButtonSize, ButtonStyleClass } from './enums';

export interface StandardButtonConfig {
  buttonID: string;
  buttonSize?: ButtonSize;
  buttonTextContent: string;
  buttonStyleClass: ButtonStyleClass;
  isDisabled: boolean;
}
