import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MasurementBasisMapping,
  MaterialColour,
  MaterialColourMapping,
  MaterialDiameters,
  MaterialDiametersMapping,
  MaterialInput,
  MaterialInputStatus,
  MaterialInputStatusMapping,
  MaterialType,
  MaterialTypeMapping,
  MeasurementBasis,
} from '../material-schedule.component';

@Component({
  selector: 'app-new-material-input-dialog',
  templateUrl: './new-material-input-dialog.component.html',
  styleUrls: ['./new-material-input-dialog.component.scss'],
})
export class NewMaterialInputDialogComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() newMaterialInput = new EventEmitter<MaterialInput>();

  materialType = Object.values(MaterialType);
  materialTypeMapping = MaterialTypeMapping;

  materialDiameter = Object.values(MaterialDiameters);
  materialDiameterMapping = MaterialDiametersMapping;

  materialColour = Object.values(MaterialColour);
  materialColourMapping = MaterialColourMapping;

  MeasurementBasis = MeasurementBasis;
  measurementBasis = Object.values(MeasurementBasis);
  measurementBasisMapping = MasurementBasisMapping;

  materialInputStatus = Object.values(MaterialInputStatus);
  materialInputStatusMapping = MaterialInputStatusMapping;

  newMaterialInputForm = new FormGroup({
    purchaseDate: new FormControl(new Date(), Validators.required),
    supplier: new FormControl('', Validators.required),
    materialType: new FormControl('', Validators.required),
    materialDiameter: new FormControl(0, Validators.required),
    materialColour: new FormControl('', Validators.required),
    measurementBasis: new FormControl('', Validators.required),
    qtyPerUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    qtyUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    costPerUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    status: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.newMaterialInputForm.markAllAsTouched();
    if (this.newMaterialInputForm.invalid) return;
    this.newMaterialInput.emit(
      this.newMaterialInputForm.value as MaterialInput
    );
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
