/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  EventChannel,
  EventTopic,
} from 'apps/lilbigthings3d/src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'apps/lilbigthings3d/src/app/services/event-management/event-management.service';

import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  formConfig = PRODUCT_FORM_CONFIG;

  constructor(
    private readonly productService: ProductManagementService,
    private readonly eventService: EventManagementService
  ) {
    this.clearFormValues();
  }

  processFormResults(formResults: Record<string, unknown>): void {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productService.addNewProduct(formResults);
  }

  private clearFormValues() {
    this.formConfig.columns.forEach((column) => {
      column.forms.forEach((form) => {
        form.fields.forEach((field) => {
          field.value = '';
        });
      });
    });
  }
}
