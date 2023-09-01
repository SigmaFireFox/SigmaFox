/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProcessResultsPageConfig,
  PageConfig,
  ResultType,
} from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-process-results-screen',
  templateUrl: './process-results.screen.html',
  styleUrls: ['./process-results.screen.scss'],
})
export class ProcessResultsScreen implements OnInit {
  @Input() config = {} as ProcessResultsPageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();

  generalConfig = {} as PageConfig;
  resultsType = ResultType;

  constructor(public router: Router) {}

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
