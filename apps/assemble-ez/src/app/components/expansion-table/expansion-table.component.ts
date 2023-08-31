/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpansionPanelContentType } from '../../enums/expansion-table.enum';
import { ExpansionPanelConfig } from '../../interfaces/expansion-table.interface';

@Component({
  selector: 'app-expansion-table-component',
  templateUrl: './expansion-table.component.html',
  styleUrls: ['./expansion-table.component.scss'],
})
export class ExpansionTableComponent {
  @Input() expansionPanelConfig: ExpansionPanelConfig[] = [];
  @Output() requestToEdit = new EventEmitter<string>();

  contentType = ExpansionPanelContentType;

  onEditClicked(panelName: string) {
    this.requestToEdit.emit(panelName);
  }
}
