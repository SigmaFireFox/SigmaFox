import { Injectable } from '@angular/core';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';
import { UserAddress, AppUserProfile } from '../user/user.interface';

export enum OrderStatus {
  // Default
  Pending = 'Pending',
  // Pre-production
  Paid = 'Paid',
  Cancelled = 'Cancelled',
  // Production
  ProductionToCommense = 'Production to commense',
  Production = 'In production',
  ProductionCompletePendingDispatched = 'Production complete, pending dispatch',
  Dispatched = 'Dispatched',
  Complete = 'Complete',
}

export interface UserOrder {
  orderNr?: string;
  date: Date;
  userID: string;
  items: BasketItem[];
  deliveryAddress: UserAddress;
  status: OrderStatus;
  orderTotal: number;
  archived: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly fs: FirestoreManagementService) {}

  async generateOrder(
    basketContent: BasketItem[],
    userProfile: AppUserProfile,
    deliveryAddress: UserAddress,
    orderTotal: number
  ): Promise<string> {
    if (!userProfile.id) return '';
    const order: UserOrder = {
      date: new Date(),
      userID: userProfile.id,
      items: basketContent,
      deliveryAddress,
      status: OrderStatus.Pending,
      orderTotal,
      archived: false,
    };
    return await this.fs.addOrder(order);
  }

  getOrderTotal(basketContent: BasketItem[]): number {
    let total = 0;
    for (const item of basketContent) {
      total = total + item.price * item.qty;
    }
    return total;
  }

  async getUserOrdersByID(id: string): Promise<UserOrder[]> {
    const userProfile = await this.fs.getUserProfile(id);
    return userProfile.orders ? userProfile.orders : [];
  }

  async archiveOrder(orderNumber: string) {
    const order = await this.fs.getOrderByID(orderNumber);
    const userOrders = await this.getUserOrdersByID(order.userID);
    const userOrderIndex = userOrders.findIndex((focusOrder) => {
      return focusOrder.orderNr === orderNumber;
    });
    order.archived = true;
    userOrders[userOrderIndex].archived = true;
    this.fs.updateUserOrders(order.userID, userOrders);
    this.fs.updateOrder(orderNumber, order);
  }

  async unarchiveOrder(orderNumber: string) {
    const order = await this.fs.getOrderByID(orderNumber);
    const userOrders = await this.getUserOrdersByID(order.userID);
    const userOrderIndex = userOrders.findIndex((focusOrder) => {
      return focusOrder.orderNr === orderNumber;
    });
    order.archived = false;
    userOrders[userOrderIndex].archived = false;
    this.fs.updateUserOrders(order.userID, userOrders);
    this.fs.updateOrder(orderNumber, order);
  }
}
