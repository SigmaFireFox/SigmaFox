export interface MenuOption {
  display: string;
  styling: OptionStyling
  path?: string;
  viewState?: any;
  action?: OptionAction
}

export enum OptionStyling {
  Primary,
  Secondary,
}

export enum OptionAction {
  Log_Out
}
