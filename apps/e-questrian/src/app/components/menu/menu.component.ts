/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from '../../interfaces/common-page-configs.interface';
import {
  OptionAction,
  OptionStyling,
  PathConfig,
  PathType,
} from '../../interfaces/menu-options.interface';
import { GeneralScreenHeaderComponent } from '../general-screen-header/general-screen-header.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, GeneralScreenHeaderComponent],
})
export class MenuComponent implements OnInit {
  @Input() config = {} as MenuPageConfig;
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() actionSelected = new EventEmitter<OptionAction>();

  optionStyling = OptionStyling;

  header = '';

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setPageHeader();
  }

  setPageHeader() {
    this.header = this.config.header;
  }

  onMenuOptionClicked(
    action: OptionAction | undefined,
    pathConfig: PathConfig | undefined,
    viewState: number | undefined
  ) {
    if (action !== undefined) {
      this.actionSelected.emit(action);
    }

    if (pathConfig) {
      if (pathConfig.type === PathType.Absolute) {
        this.router.navigate([pathConfig.path]);
        return;
      }
      if (pathConfig.type === PathType.Child) {
        this.router.navigate([`./${pathConfig.path}`], {
          relativeTo: this.activatedRoute,
        });
        return;
      }
      if (pathConfig.type === PathType.Parent) {
        this.router.navigate([`../../${pathConfig.path}`], {
          relativeTo: this.activatedRoute,
        });
        return;
      }
      if (pathConfig.type === PathType.Sibling) {
        this.router.navigate([`../${pathConfig.path}`], {
          relativeTo: this.activatedRoute,
        });
        return;
      }
    }

    if (viewState !== undefined) {
      this.viewStateSelected.emit(viewState);
    }
  }
}
