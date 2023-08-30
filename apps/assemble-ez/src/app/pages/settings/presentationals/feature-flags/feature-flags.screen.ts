/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { SettingsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-feature-flags-screen',
  templateUrl: './feature-flags.screen.html',
  styleUrls: ['./feature-flags.screen.scss'],
})
export class FeatureFlagsScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  featureFlagsFormConfig: FormConfig = {
    formTitle:
      'Add any of the avaliable features to your profile by toggling them on',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Product module',
        fieldName: 'products',
        fieldType: FormFieldType.SLIDE_TOGGLE,
        defaultValue: '',
      },
    ],
    proceedText: 'Save changes',
  };

  menuOptions: MenuOption[] = [
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
