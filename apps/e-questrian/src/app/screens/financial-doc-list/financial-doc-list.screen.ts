/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FinancialDocListPageConfig,
  DocID,
  FinancialDocType,
  PageConfig,
  FinancialDocItem,
} from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-financial-doc-list-screen',
  templateUrl: './financial-doc-list.screen.html',
  styleUrls: ['./financial-doc-list.screen.scss'],
})
export class FinancialDocListScreen implements OnInit {
  @Input() config = {} as FinancialDocListPageConfig;
  @Output() itemClicked = new EventEmitter<DocID>();

  financialDocType = FinancialDocType;
  header = '';
  isViewingVoidedItems = false;

  constructor(public router: Router) {}

  ngOnInit() {
    this.setPageHeader();
  }

  onItemClicked(item: FinancialDocItem) {
    this.itemClicked.emit({ docType: item.docType, docNum: item.number });
  }

  private setPageHeader() {
    this.header = this.config.header;
  }
}
