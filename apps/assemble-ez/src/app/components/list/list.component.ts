/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListConfig } from '../../interfaces/list-screen.interface';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };
  @Output() itemClicked = new EventEmitter<number>();

  columnWidths: number[] = [];

  ngOnInit() {
    this.setColumnWidths();
  }

  onItemClicked(index: number) {
    this.itemClicked.emit(index);
  }

  private setColumnWidths() {
    let total = 0;
    this.listConfig.headers.forEach((header) => {
      total = total + header.widthFactor;
    });
    this.listConfig.headers.forEach((header) => {
      this.columnWidths.push((header.widthFactor / total) * 100);
    });
  }
}
