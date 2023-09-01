import { Component, OnInit } from '@angular/core';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductForDisplay } from '../models/product.interface';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent implements OnInit {
  products: ProductForDisplay[] = [];
  displayedColumns: string[] = ['title', 'description', 'edit'];

  constructor(private readonly fs: FirestoreManagementService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.fs.getAllProducts();
  }
}
