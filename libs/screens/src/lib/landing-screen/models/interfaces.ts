import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';
import { EffectType } from './enums';

export interface ImactHeaderBlock {
  content: string[];
  effect?: EffectType;
}

export interface ImactHeader {
  lines: ImactHeaderBlock[][];
  alternatingContentPhases: number;
}
export interface CallToActionButton {
  buttonSize: ButtonSize;
  text: string;
  buttonStyleClass: ButtonStyleClass;
}
