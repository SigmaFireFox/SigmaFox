import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-valuation-name-float',
  templateUrl: './new-valuation-name-float.component.html',
  styleUrls: ['./new-valuation-name-float.component.scss'],
})
export class NewValuationNameFloatComponent implements OnInit {
  @Output() newValuation = new EventEmitter<string>();
  @Output() cancelNewValuation = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  addValuation(valuationTitle: string) {
    this.newValuation.emit(valuationTitle);
  }

  cancel() {
    this.cancelNewValuation.emit(true);
  }
}
