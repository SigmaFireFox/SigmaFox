export interface MenuOption {
  display: string;
  styling: OptionStyling;
  pathConfig?: PathConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewState?: any;
  action?: OptionAction;
  backToReferrer?: boolean;
}

export enum OptionStyling {
  Primary,
  Secondary,
}

export enum OptionAction {
  LogOut = 'log-out',
  Void = 'void',
}

export interface PathConfig {
  path: string;
  type: PathType;
}

export enum PathType {
  Absolute,
  Child,
  Parent,
  Sibling,
}
