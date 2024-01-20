import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';
import {
  Alignment,
  EffectType,
  NavigationButtonSize,
  SidePadding,
} from './enums';

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
  yLocation: number;
}
export interface CallToActionButton {
  buttonSize: ButtonSize;
  text: string;
  buttonStyleClass: ButtonStyleClass;
  yLocation: number;
}

export interface NavigationPanel {
  [key: string]: NavigationButtonSize;
  nextScreen: NavigationButtonSize;
}
