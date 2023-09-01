import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { Product } from '../models/product.interface';
import { ProductManagementService } from '../services/product-management.service';

export interface FieldLocationData {
  column: string;
  form: string;
  field?: string;
}

export const ProductFormFieldsToProductKeyMapping: Record<string, string> = {
  'design-file': 'fileDesign',
  dimentions: 'dimentions',
  'images-design': 'imagesDesignUrls',
  'images-product': 'imagesProductUrls',
  'long-description': 'longDesc',
  'primary-image-url': 'primaryImageUrl',
  'print-file-fast': 'filePrintFast',
  'print-file-optimised': 'filePrintOptimised',
  'print-file-standard': 'filePrintStandard',
  'short-description': 'shortDesc',
  title: 'title',
};

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productID = '';
  product: Product | undefined;
  formConfig = PRODUCT_FORM_CONFIG;
  isLoading = true;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly productService: ProductManagementService,
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.updateLoadingState(true);
    this.setProductID();
    await this.getProductData();
    if (!this.product) return;
    await this.setEditProductFormProductData();
    this.updateLoadingState(false);
  }

  // Child component call backs
  processFormResults(formResults: Record<string, unknown>): void {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productService.updateProduct(this.productID, formResults);
  }

  /********************************************** Set form content *********************************************/
  private async getProductData() {
    /*
    This method retreives the product from the DB based on the ID the 
    dispatches such to be unpacked. The product is required to be unpacked because
    of the complex and natured structure of the product from, so it is easier to make
    the properties to their from couter-part
    */
    if (!this.productID) return;
    this.product =
      (await this.fs.getProductDataByID(this.productID)) || undefined;
  }

  private setEditProductFormProductData(): void {
    /*
    The objective of this method/fuction to update the formConfig with 
    the data in the product object.
    */

    // For each property of the form config, determine the column, form and
    // field index of the field so it will be easier to assigned the reveived
    // values from the product data found on the DB
    const fieldsMap: Record<
      string,
      { columnIndex: number; formIndex: number; fieldIndex: number }
    > = {};
    for (const [columnIndex, column] of this.formConfig.columns.entries()) {
      for (const [formIndex, form] of column.forms.entries()) {
        for (const [fieldIndex, field] of form.fields.entries()) {
          if (field.name in ProductFormFieldsToProductKeyMapping) {
            fieldsMap[ProductFormFieldsToProductKeyMapping[field.name]] = {
              columnIndex,
              formIndex,
              fieldIndex,
            };
          }
        }
      }
    }

    // Now for each property in the product, assign the value as received
    // from the DB
    if (!this.product || !fieldsMap) return;
    Object.keys(this.product).forEach((productField) => {
      if (!this.product) return;
      const params = fieldsMap[productField];
      const formField =
        this.formConfig.columns[params.columnIndex].forms[params.formIndex]
          .fields[params.fieldIndex];
      // Application exceptions
      // Dimentions
      if (productField === 'dimentions') {
        if (!formField.multiColumnFieldSetting) return;
        // Dimention X
        const xSubFieldIndex = formField.multiColumnFieldSetting.findIndex(
          (subField) => {
            return subField.name === 'x';
          }
        );
        formField.multiColumnFieldSetting[xSubFieldIndex].value = (
          this.product[productField] as {
            x: number;
          }
        ).x;

        // Dimention Y
        const ySubFieldIndex = formField.multiColumnFieldSetting.findIndex(
          (subField) => {
            return subField.name === 'y';
          }
        );
        formField.multiColumnFieldSetting[ySubFieldIndex].value = (
          this.product[productField] as {
            y: number;
          }
        ).y;

        // Dimention Z
        const zSubFieldIndex = formField.multiColumnFieldSetting.findIndex(
          (subField) => {
            return subField.name === 'z';
          }
        );
        formField.multiColumnFieldSetting[zSubFieldIndex].value = (
          this.product[productField] as {
            z: number;
          }
        ).z;
      }

      // General 1 to 1 value applications
      formField.value = this.product[productField] as string;
    });

    //   for (const key of Object.keys(this.product)) {
    // }

    // const fieldLocationDataMap = this.generateMapOfFieldsLocationData();
    // Object.keys(fieldLocationDataMap).forEach((field) => {
    //   // Get requried column
    //   const requiredColumn = this.editProductFormConfig.columns.find(
    //     (column) => {
    //       return column.name === fieldLocationDataMap[field].column;
    //     }
    //   );

    //   // Get requried form
    //   if (!requiredColumn) return;
    //   const requiredForm = requiredColumn.forms.find((form) => {
    //     return form.name === fieldLocationDataMap[field].form;
    //   });

    //   // Get requried field
    //   if (!requiredForm) return;
    //   const requiredField = requiredForm.fields.find((_field) => {
    //     if (fieldLocationDataMap[field].field) {
    //       return _field.name === fieldLocationDataMap[field].field;
    //     }

    //     return _field.name === field;
    //   });

    //   if (!requiredField) return;
    //   // If field is not multi-column then assign value and return
    //   if (requiredField.type !== AppFieldType.InputMultiColumn) {
    //     requiredField.value = unpackedData[field] as string;
    //     return;
    //   }

    //   // Else get requried fieldColumn and assign value
    //   if (!requiredField.multiColumnFieldSetting) return;
    //   const requiredFieldColumn = requiredField.multiColumnFieldSetting.find(
    //     (fieldColumn) => {
    //       return fieldColumn.name === field;
    //     }
    //   );

    //   if (!requiredFieldColumn) return;
    //   requiredFieldColumn.value = unpackedData[field] as string;
    // });
  }

  private generateMapOfFieldsLocationData() {
    /*
    Objective of this method/function is to go through all the fields in the
    form and for each, record to which column and form that field belongs.
    If such field is a multi-column field then for each fieldColumn
    (and not the field in that case), to record the fieldColumn along with
    which Column, Form and Field it belongs to
    */
    const fieldLocationDataMap: Record<string, FieldLocationData> = {};
    this.formConfig.columns.forEach((column) => {
      column.forms.forEach((form) => {
        form.fields.forEach((field) => {
          if (field.type !== AppFieldType.InputMultiColumn) {
            fieldLocationDataMap[field.name] = {
              column: column.name,
              form: form.name,
            };
          } else {
            field.multiColumnFieldSetting?.forEach((fieldColumn) => {
              fieldLocationDataMap[fieldColumn.name] = {
                column: column.name,
                form: form.name,
                field: field.name,
              };
            });
          }
        });
      });
    });

    return fieldLocationDataMap;
  }

  /********************************************** Set form images *********************************************/
  private async setImagesForForm() {
    // if (!this.productID) return;
    // const imageUrls = (await this.productService.getImagesByID(
    //   this.productID
    // )) as Record<string, (string | ArrayBuffer | null)[]>;
    // this.unpackedData = { ...this.unpackedData, ...imageUrls };
  }

  /********************************************** Utility methods *********************************************/
  private updateLoadingState(state: boolean) {
    this.isLoading = state;
    this.eventService.publish(
      EventChannel.Product,
      EventTopic.Loading,
      this.isLoading
    );
    this.cd.detectChanges();
  }

  setProductID() {
    this.productID = this.route.snapshot.paramMap.get('productId') || '';
  }
}
