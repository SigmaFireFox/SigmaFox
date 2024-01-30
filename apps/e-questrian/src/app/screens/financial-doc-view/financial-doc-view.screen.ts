/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { GeneralScreenHeaderComponent } from '../../components/general-screen-header/general-screen-header.component';
import {
  DocView,
  PageConfig,
} from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-financial-doc-view-screen',
  templateUrl: './financial-doc-view.screen.html',
  styleUrls: ['./financial-doc-view.screen.scss'],
  standalone: true,
  imports: [CommonModule, GeneralScreenHeaderComponent],
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
