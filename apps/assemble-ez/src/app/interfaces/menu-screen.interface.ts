export enum MenuOptionType {
  HOME,
  URL,
  VIEWSTATE,
  ACTION,
}

export enum MenuOptionStyle {
  PRIMARY,
  SECONDARY,
  WARNING,
}

export enum MenuAction {
  EDIT = 1,
}

export interface MenuOption {
  style: MenuOptionStyle;
  display: string;
  optionType: MenuOptionType;
  link?: string;
  viewState?: number;
  action?: MenuAction;
}
