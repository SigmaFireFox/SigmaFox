export interface MenuOption {
  display: string;
  styling: OptionStyling;
  path?: string;
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
