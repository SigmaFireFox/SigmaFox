import { UserOrder } from '../orders/orders.service';

export interface AppUserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  deliveryAddresses: UserAddress[];
  profilePic?: string;
  orders?: UserOrder[];
}

export interface UserAddress {
  description: string;
  addressType: string;
  number: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
}
