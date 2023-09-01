/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from '../../../services/event-management/event-management.enum';
import { EventManagementService } from '../../../services/event-management/event-management.service';
import { LocalStorageItem } from '../../../services/local-storage/local-storage.enum';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

export interface BasketItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-basket-view',
  templateUrl: './basket-view.component.html',
  styleUrls: ['./basket-view.component.scss'],
})
export class BasketViewComponent implements OnInit {
  basketContent: BasketItem[] = [];
  showDeleteDialog = false;
  showEmptyBasketDialog = false;
  itemForDeletionIndex = 0;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly eventService: EventManagementService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.showEmptyBasketDialog = this.basketContent.length === 0;
    this.cd.detectChanges();
  }

  onCheckoutClick() {
    this.localStorageService.set(LocalStorageItem.Basket, this.basketContent);
    this.router.navigate(['checkout']);
  }

  onQtyUpdate(newQty: number, itemIndex: number) {
    this.basketContent[itemIndex].qty = newQty;
    this.showDeleteDialog = !newQty;
    if (this.showDeleteDialog) {
      this.itemForDeletionIndex = itemIndex;
    }
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  closeEmptyBasketNoticeDialog() {
    this.showEmptyBasketDialog = false;
  }

  deleteItem() {
    this.showDeleteDialog = false;
    this.basketContent.splice(this.itemForDeletionIndex, 1);
    this.localStorageService.set(LocalStorageItem.Basket, this.basketContent);
    this.eventService.publish(
      EventChannel.Product,
      EventTopic.BasketContentAmended
    );
    this.showEmptyBasketDialog = this.basketContent.length === 0;

    this._snackBar.open('Item removed from your basket', '', {
      panelClass: 'standard-snackbar',
      duration: 3000,
    });
  }

  onViewProductsClick() {
    this.router.navigate(['']);
  }
}
