/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { SettingsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-passwords-menu-screen',
  templateUrl: './passwords-menu.screen.html',
  styleUrls: ['./passwords-menu.screen.scss'],
})
export class PasswordsMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Personal password',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.EDIT_PERSONAL_PASSWORD,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'New agents password',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.EDIT_AGENT_PASSWORD,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to settings menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
