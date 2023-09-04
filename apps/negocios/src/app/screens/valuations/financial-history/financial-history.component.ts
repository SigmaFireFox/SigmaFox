/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ValuationsFinancialHistory,
  ValuationsFinancialHistoryYear,
} from '../../../~global-interfaces/valuations.interface';

import { ScreenMode } from '../../screen-mode.enum';

@Component({
  selector: 'app-financial-history',
  templateUrl: './financial-history.component.html',
  styleUrls: ['./financial-history.component.scss'],
})
export class FinancialHistoryComponent {
  @Input() valuationFinancialHistory: ValuationsFinancialHistory = {
    data: [],
  };
  @Output() updatedFinancialHistory =
    new EventEmitter<ValuationsFinancialHistoryYear>();

  formDataRequired: Subject<void> = new Subject<void>();
  ScreenMode = ScreenMode;
  currentScreenMode = ScreenMode.VIEW;

  toggleScreenMode() {
    if (this.currentScreenMode === ScreenMode.VIEW) {
      this.currentScreenMode = ScreenMode.FORM;
    } else {
      this.callFormData();
      this.currentScreenMode = ScreenMode.VIEW;
    }
  }

  private callFormData() {
    this.formDataRequired.next();
  }

  updateFinancialHistory(
    updatedFinancialHistory: ValuationsFinancialHistoryYear
  ) {
    this.updatedFinancialHistory.emit(updatedFinancialHistory);
  }
}
