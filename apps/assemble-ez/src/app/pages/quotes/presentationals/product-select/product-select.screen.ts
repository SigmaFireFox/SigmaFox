/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import {
  FormFieldOption,
  FormConfig,
} from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';
import {
  ProductGroup,
  TestProductList,
  Product,
} from 'apps/assemble-ez/src/app/test-data/products.data';

@Component({
  selector: 'app-product-select-screen',
  templateUrl: './product-select.screen.html',
  styleUrls: ['./product-select.screen.scss'],
})
export class ProductSelectScreen implements OnInit {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  private productGroupField = {
    fieldDisplay: 'Product Group:',
    fieldName: 'productGroup',
    fieldType: FormFieldType.SELECT,
    default: 0,
    options: [] as FormFieldOption[],
  };

  private productRangeField = {
    fieldDisplay: 'Product range:',
    fieldName: 'productRange',
    fieldType: FormFieldType.RADIO,
    default: 0,
    options: [
      { display: 'All', value: 1 },
      { display: 'Selected', value: 2 },
    ] as FormFieldOption[],
  };

  private productSelectField = {
    fieldDisplay: 'Products:',
    fieldName: 'productSelect',
    fieldType: FormFieldType.MULTI_SELECT,
    default: 0,
    options: [] as FormFieldOption[],
  };

  productSelectFormConfig: FormConfig = {
    formTitle: 'Production selection',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    proceedBlocked: false,
    fields: [this.productGroupField],
    proceedText: 'Proceed',
  };

  ngOnInit() {
    const productGroups: ProductGroup[] = TestProductList;
    const productsGroupsForSelection: FormFieldOption[] = [];
    productGroups.forEach((productGroup) => {
      productsGroupsForSelection.push({
        display: productGroup.productGroupName,
        value: productGroup.productGroupName,
      });
    });
    this.productSelectFormConfig.fields[0].options = productsGroupsForSelection;
  }

  onProductSelectFormChange(formValue: { [key: string]: string }) {
    if (this.productSelectFormConfig.fields.length === 1) {
      if (parseInt(formValue['productGroup']) != 0) {
        this.productSelectFormConfig.fields.push(this.productRangeField);
      } else {
        this.productSelectFormConfig.fields = [this.productGroupField];
      }
      return;
    }

    if (this.productSelectFormConfig.fields.length === 2) {
      if (parseInt(formValue['productRange']) === 2) {
        this.getProductsFromProductGroup(formValue['productGroup']);
        this.productSelectFormConfig.fields.push(this.productSelectField);
        this.productSelectFormConfig.canProceed = false;
      } else {
        this.productSelectFormConfig.fields = [
          this.productGroupField,
          this.productRangeField,
        ];
        this.productSelectFormConfig.canProceed = true;
      }
      return;
    }

    if (this.productSelectFormConfig.fields.length === 3) {
      if (parseInt(formValue['productRange']) === 1) {
        this.productSelectFormConfig.fields = [
          this.productGroupField,
          this.productRangeField,
        ];
        this.productSelectFormConfig.canProceed = true;
        return;
      }
      this.productSelectFormConfig.canProceed = false;
    }
  }

  private getProductsFromProductGroup(selectedProductGroupName: string) {
    const productGroups: ProductGroup[] = TestProductList;
    let selectedProductGroup = {} as ProductGroup;
    productGroups.forEach((productGroup) => {
      if (productGroup.productGroupName === selectedProductGroupName) {
        selectedProductGroup = productGroup;
      }
    });
    const productOptions: FormFieldOption[] = [];
    selectedProductGroup.products.forEach((product: Product) => {
      productOptions.push({
        display: product.productName,
        value: product.productName,
      });
    });
    this.productSelectField.options = productOptions;
  }

  onProductSelectFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
