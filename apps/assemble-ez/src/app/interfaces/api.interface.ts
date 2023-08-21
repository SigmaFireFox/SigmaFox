export interface ClientData {
  profile: ProfileData;
  leads: LeadData;
  agents: AgentData;
}

export interface ProfileData {
  userInfo: UserInfo;
  flags: FlagData;
}

export interface UserInfo {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;

  // Business details
  entityType: string;
  tradingName: string;

  // Contact details
  isPrimaryContact: boolean;
  companyContactNumber: string;
  companyEmail: string;
  companyWebsite: string;

  // User settings
  agentDefaultPassword: string;
  principleAccount: string;
  isAlphaUser: boolean;
}

export interface LeadData {
  [key: string]: unknown;
}

export interface AgentData {
  [key: string]: unknown;
}

export interface FlagData {
  products: boolean;
}

export class FlagDataClass implements FlagData {
  products = false;
}

export interface UserRecord {
  disabled: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  uid: string;
}
