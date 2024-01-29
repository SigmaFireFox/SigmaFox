import {
  ButtonSize,
  ButtonStyleClass,
  StandardButton,
} from 'libs/components/buttons/src';
import { StandardButtonConfig } from 'libs/components/buttons/src/lib/standard-button/models/interfaces';
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
export interface FloatingCallToActionButtons {
  yLocation: number;
  buttons: StandardButtonConfig[];
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
  actionButtons?: StandardButtonConfig[];
}

export interface StructuredPageSeries {
  screens: StructuredPage[];
  phaseTiming: number;
  imagesLocationPath?: string;
  backgroundColours?: string[];
  opacity?: number;
}
