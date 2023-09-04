import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-valuations-list',
  templateUrl: './valuations-list.component.html',
  styleUrls: ['./valuations-list.component.scss'],
})
export class ValuationsListComponent {
  @Input() valuations: any[] = [];
  @Output() newValuation = new EventEmitter<boolean>();
  @Output() deleteValuationID = new EventEmitter<string>();
  @Output() viewValuationID = new EventEmitter<string>();

  constructor() {}

  addNewValuation() {
    this.newValuation.emit(true);
  }

  deleteValuation(valuationID: any) {
    this.deleteValuationID.emit(valuationID);
  }

  viewValuation(valuationID: any) {
    this.viewValuationID.emit(valuationID);
  }
}
