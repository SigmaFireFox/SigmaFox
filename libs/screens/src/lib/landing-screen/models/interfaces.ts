import {
  ButtonSize,
  ButtonStyleClass,
  StandardButton,
} from '@sigmafox/buttons';
import { StandardButtonConfig } from 'libs/buttons/src/lib/standard-button/models/interfaces';
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
export interface FloatingCallToActionButton {
  buttonConfig: StandardButtonConfig;
  yLocation: number;
}

export interface NavigationPanel {
  [key: string]: NavigationButtonSize;
  nextScreen: NavigationButtonSize;
}

export interface StructuredPage {
  heading: string;
  imageTop?: string;
  subHeading?: string;
  bodyTextSpread?: string;
  bodyTextCondenced?: string[];
  authorNameText?: string;
  imageBottom?: string;
  actionButton?: StandardButtonConfig;
}

export interface StructuredPageSeries {
  screens: StructuredPage[];
  phaseTiming: number;
  imagesLocationPath?: string;
  backgroundColours?: string[];
  opacity?: number;
}
