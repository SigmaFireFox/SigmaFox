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
  generalConfig = {} as PageConfig;
  isViewingVoidedItems = false;

  constructor(public router: Router) {}

  ngOnInit() {
    this.setPageConfig();
  }

  onItemClicked(item: FinancialDocItem) {
    this.itemClicked.emit({ docType: item.docType, docNum: item.number });
  }

  private setPageConfig() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }
}
