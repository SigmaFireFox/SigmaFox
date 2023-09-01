/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import {
  UserOrder,
  OrdersService,
} from '../../../services/orders/orders.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent implements OnInit {
  userOrders: UserOrder[] = [];
  currentOrder: UserOrder | undefined;
  showOrderDetail = false;
  showOptions = false;
  showArchivedOrders = false;
  orderIndexInFocus = 0;

  constructor(
    private readonly orderService: OrdersService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const userID = await this.authService.userID;
    if (userID) {
      this.userOrders = await this.orderService.getUserOrdersByID(userID);
    } else {
      this.router.navigate(['sign-in']);
    }

    for (const order of this.userOrders) {
      order.date = (order.date as unknown as Timestamp).toDate();
    }

    this.cd.detectChanges();
  }

  onOrderClick(order: UserOrder) {
    this.currentOrder = order;
    this.showOrderDetail = true;
  }

  onDetailClose() {
    this.showOrderDetail = false;
  }

  onOrderOptionsClicked(event: Event, index: number) {
    event.stopPropagation();
    this.orderIndexInFocus = index;
    this.showOptions = true;
  }

  onShowArchivedOrdersClicked() {
    this.showArchivedOrders = !this.showArchivedOrders;
  }

  onArchiveOrderClicked() {
    this.userOrders[this.orderIndexInFocus].archived = true;
    this.orderService.archiveOrder(
      this.userOrders[this.orderIndexInFocus].orderNr as string
    );
    this.showOptions = false;
  }

  onUnArchiveOrderClicked() {
    this.userOrders[this.orderIndexInFocus].archived = false;
    this.orderService.unarchiveOrder(
      this.userOrders[this.orderIndexInFocus].orderNr as string
    );
    this.showOptions = false;
  }

  onOrderRepeatClicked() {
    // TODO
  }

  onViewOrderClicked() {
    this.currentOrder = this.userOrders[this.orderIndexInFocus];
    this.showOrderDetail = true;
    this.showOptions = false;
  }

  closeOptionDialog() {
    this.showOptions = false;
  }
}
