import { Component, Input } from '@angular/core';
import { ProductForDisplay } from '../../models/product.interface';

@Component({
  selector: 'app-view-products-table',
  templateUrl: './view-products-table.component.html',
  styleUrls: ['./view-products-table.component.scss'],
})
export class ViewProductsTableComponent {
  @Input() products: ProductForDisplay[] = [];
  @Input() displayedColumns: string[] = ['title', 'description', 'edit'];
}
