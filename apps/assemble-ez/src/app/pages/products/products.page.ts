/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ProductsPageViewState as ViewState } from '../../enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from '../../interfaces/menu-screen.interface';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.MENU;
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,

      display: 'Components',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.COMPONENTS,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
  }
}
