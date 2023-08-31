/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { LeadsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-lead-menu-screen',
  templateUrl: './lead-menu.screen.html',
  styleUrls: ['./lead-menu.screen.scss'],
})
export class LeadMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Add Lead',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.ADD,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'View Leads',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW_ALL,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
      link: '',
    },
  ];

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
