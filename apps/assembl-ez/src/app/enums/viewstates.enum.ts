export enum QuotePageViewState {
  PRODUCT_SELECT = 1,
  PRODUCT_MEASUREMENTS = 2,
  QUOTE_PARAMETERS = 3,
  RESULTS = 4,
}

export enum ProductsPageViewState {
  MENU = 1,
  PRODUCTS = 2,
  COMPONENTS = 3,
}

export enum MainPageViewState {
  SIGN_OUT = 1,
}

export enum SignInPageViewState {
  SIGN_IN = 1,
  REGISTER = 2,
  FORGOT_PASSWORD = 3,
}

export enum LeadsPageViewState {
  MENU = 1,
  ADD = 2,
  VIEW_ALL = 3,
  VIEW_LEAD = 4,
  EDIT = 5,
}

export enum RegisterScreenViewState {
  BASIC = 1,
  BUSINESS = 2,
  CONTACT = 3,
  SUCCESS = 4,
}

export enum AgentPageViewState {
  VIEW_AGENT = 1,
  VIEW = 2,
  ADD = 3,
  EDIT = 4,
  SET_AGENT_PASSWORD = 5,
}

export enum SettingsPageViewState {
  MENU = 1,
  VIEW_PROFILE = 2,
  PASSWORDS_MENU = 3,
  EDIT_BASICS = 4,
  EDIT_BUS_BASICS = 5,
  EDIT_BUS_CONTACTS = 6,
  EDIT_PERSONAL_PASSWORD = 7,
  EDIT_AGENT_PASSWORD = 8,
  FEATURE_FLAGS,
}
