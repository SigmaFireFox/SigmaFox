export interface MenuOption {
  display: string;
  styling: OptionStyling;
  pathConfig?: PathConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewState?: any;
  action?: OptionAction;
}

export enum OptionStyling {
  Primary,
  Secondary,
}

export enum OptionAction {
  Log_Out,
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
