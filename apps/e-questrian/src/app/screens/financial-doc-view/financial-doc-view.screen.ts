/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input } from '@angular/core';
import {
  DocView,
  PageConfig,
} from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-financial-doc-view-screen',
  templateUrl: './financial-doc-view.screen.html',
  styleUrls: ['./financial-doc-view.screen.scss'],
})
export class FinancialDocViewScreen implements OnInit {
  @Input() config = {} as DocView;

  header = '';

  ngOnInit() {
    this.setPageHeader();
  }

  private setPageHeader() {
    this.header = this.config.header;
  }
}
