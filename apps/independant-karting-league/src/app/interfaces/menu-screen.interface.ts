export enum MenuOptionType {
  HOME,
  URL,
  VIEWSTATE,
}

export enum MenuOptionStyle {
  PRIMARY,
  SECONDARY,
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
