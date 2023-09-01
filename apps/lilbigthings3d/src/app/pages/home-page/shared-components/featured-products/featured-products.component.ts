import { Component, HostListener, OnInit } from '@angular/core';
import { ProductForDisplay } from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  productsForDisplay: {
    id: string;
    image: string;
    title: string;
    price: number;
    description: string;
  }[] = [];
  isMobileView = false;
  cardInFocusIndex = 0;
  dragPosition = { x: 0, y: 0 };
  isLoading = true;

  constructor(private readonly fs: FirestoreManagementService) {}

  async ngOnInit(): Promise<void> {
    this.determineView();
    await this.setFeaturedProducts();
    this.isLoading = false;
  }

  onCardSwipe(event: { distance: { x: number } }) {
    let toggleCard = false;
    const distanceDragged = Math.abs(event.distance.x);
    if (distanceDragged / window.innerWidth > 0.05) {
      toggleCard = true;
    }

    if (!toggleCard) return;

    // Swipe left
    this.isLoading = true;
    if (event.distance.x < 0) {
      if (this.cardInFocusIndex === this.productsForDisplay.length - 1) {
        // Last card
        this.cardInFocusIndex = 0;
      } else {
        this.cardInFocusIndex = this.cardInFocusIndex + 1;
      }
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 200);

    // Swipe right
    this.isLoading = true;
    if (event.distance.x > 0) {
      if (this.cardInFocusIndex === 0) {
        // First card
        this.isLoading = true;
        this.cardInFocusIndex = this.productsForDisplay.length - 1;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.cardInFocusIndex = this.cardInFocusIndex - 1;
      }
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 200);

    this.dragPosition = { x: 0, y: 0 };
  }

  private determineView() {
    this.isMobileView = window.innerWidth < 400;
  }

  private async setFeaturedProducts(): Promise<void> {
    const products: ProductForDisplay[] = await this.fs.getAllProducts();

    // for (let i = 0; i < products.length; i++) {
    //   this.productsForDisplay.push({
    //     id: products[i].id,
    //     title: products[i].data.title,
    //     image: products[i].data.primaryImageUrl,
    //     price: 10,
    //     description: products[i].data.shortDescription,
    //   });
    // }
  }
}
