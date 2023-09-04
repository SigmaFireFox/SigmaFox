/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValuationsFinancialHistory } from 'apps/negocios/src/app/~global-interfaces/valuations.interface';

@Component({
  selector: 'app-financial-history-view',
  templateUrl: './financial-history-view.component.html',
  styleUrls: ['./financial-history-view.component.scss'],
})
export class FinancialHistoryViewComponent {
  @Output() switchScreen = new EventEmitter<boolean>();

  @Input() valuationFinancialHistory: ValuationsFinancialHistory = {
    data: [],
  };

  switchScreenMode() {
    this.switchScreen.emit(false);
  }
}
