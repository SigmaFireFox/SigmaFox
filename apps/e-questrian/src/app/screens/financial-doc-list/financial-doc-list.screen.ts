/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralScreenHeaderComponent } from '../../components/general-screen-header/general-screen-header.component';
import {
  FinancialDocListPageConfig,
  DocID,
  FinancialDocType,
  FinancialDocItem,
} from '../../interfaces/common-page-configs.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial-doc-list-screen',
  templateUrl: './financial-doc-list.screen.html',
  styleUrls: ['./financial-doc-list.screen.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralScreenHeaderComponent,
    MatCheckboxModule,
    FormsModule,
  ],
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
    console.log(this.config);
    this.header = this.config.header;
  }
}
