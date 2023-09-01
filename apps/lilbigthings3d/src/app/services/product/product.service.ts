import { Injectable } from '@angular/core';
import { ProductImageUrls } from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';
import { LocalStorageItem } from '../local-storage/local-storage.enum';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly fs: FirestoreManagementService
  ) {}

  addProductToBasket(product: BasketItem): Promise<void> {
    return new Promise((resolve) => {
      const currentBasket = this.localStorageService.get(
        LocalStorageItem.Basket
      );

      if (!currentBasket) {
        this.localStorageService.set(LocalStorageItem.Basket, [product]);
        resolve();
      }

      (currentBasket as BasketItem[]).push(product);
      this.localStorageService.set(LocalStorageItem.Basket, currentBasket);

      resolve();
    });
  }

  async getImagesByID(productID: string): Promise<ProductImageUrls> {
    return await this.fs.getProductImagesUrlByID(productID);
  }
}
