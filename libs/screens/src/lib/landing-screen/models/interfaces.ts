import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';
import { Alignment, EffectType, SidePadding } from './enums';

export interface ImactHeaderBlock {
  content: string[];
  effect?: EffectType;
}

export interface ImactHeader {
  lines: ImactHeaderBlock[][];
  alternatingContentPhases: number;
  sidePadding: SidePadding;
  phaseTiming: number;
  alignment: Alignment;
}
export interface CallToActionButton {
  buttonSize: ButtonSize;
  text: string;
  buttonStyleClass: ButtonStyleClass;
}
