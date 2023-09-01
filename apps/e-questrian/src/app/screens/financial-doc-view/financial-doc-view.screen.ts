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

  generalConfig = {} as PageConfig;

  ngOnInit() {
    this.setPageConfig();
  }

  private setPageConfig() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }
}
