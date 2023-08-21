import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';

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
