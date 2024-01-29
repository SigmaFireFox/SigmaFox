/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from '../../interfaces/common-page-configs.interface';
import {
  OptionAction,
  OptionStyling,
} from '../../interfaces/menu-options.interface';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() config = {} as MenuPageConfig;
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() actionSelected = new EventEmitter<OptionAction>();

  optionStyling = OptionStyling;

  header = '';

  constructor(public router: Router) {}

  ngOnInit() {
    this.setPageHeader();
  }

  setPageHeader() {
    this.header = this.config.header;
  }

  onMenuOptionClicked(
    action: OptionAction | undefined,
    path: string | undefined,
    viewState: number | undefined
  ) {
    if (action !== undefined) {
      this.actionSelected.emit(action);
    }

    if (path) {
      this.router.navigateByUrl(path);
      return;
    }

    if (viewState !== undefined) {
      this.viewStateSelected.emit(viewState);
    }
  }
}
