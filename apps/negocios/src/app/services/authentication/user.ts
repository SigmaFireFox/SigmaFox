export interface AppUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface GoogleProfile {
  email: string;
  family_name: string;
  given_name: string;
  granted_scopes: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
