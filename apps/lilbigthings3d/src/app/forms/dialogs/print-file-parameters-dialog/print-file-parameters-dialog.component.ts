import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface PrintFileParameters {
  materialLength: number;
  printDurationHours: number;
  printDurationMinutes: number;
}

export const PrintFileParametersMapping: Record<string, string> = {
  materialLength: 'Material length',
  printDurationHours: 'Hours',
  printDurationMinutes: 'Minutes',
};

@Component({
  selector: 'app-print-file-parameters-dialog',
  templateUrl: './print-file-parameters-dialog.component.html',
  styleUrls: ['./print-file-parameters-dialog.component.scss'],
})
export class PrintFileParametersDialogComponent {
  @Output() parametersSubmitted = new EventEmitter<PrintFileParameters>();

  printParametersForm = new FormGroup({
    materialLength: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    printDurationHours: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    printDurationMinutes: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
  });

  onSubmit() {
    this.parametersSubmitted.emit(
      this.printParametersForm.value as PrintFileParameters
    );
  }
}
