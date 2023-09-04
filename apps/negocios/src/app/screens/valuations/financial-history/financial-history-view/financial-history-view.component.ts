import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ValuationsFinancialHistory,
  ValuationsFinancialHistoryYear,
} from 'app/~global-interfaces/valuations.interface';

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
