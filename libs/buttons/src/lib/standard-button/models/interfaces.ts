import { ButtonSize, ButtonStyleClass } from './enums';

export interface StandardButtonConfig {
  buttonID: string;
  buttonLabel?: string;
  buttonSize?: ButtonSize;
  buttonTextContent: string;
  buttonStyleClass: ButtonStyleClass;
  isDisabled: boolean;
}
