import { Component, EventEmitter, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from '../../../../../app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from '../../../../../app/enums/viewstates.enum';
import { UserInfoService } from '../../../../../app/services/user-info.service';
import { UserInfo } from '../../../../../app/interfaces/api.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-settings-menu-screen',
  templateUrl: './settings-menu.screen.html',
  styleUrls: ['./settings-menu.screen.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SettingsMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  constructor(private userInfoService: UserInfoService) {
    this.addFeatureFlagedMenuOptions();
  }

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'View profile',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW_PROFILE,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Passwords',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PASSWORDS_MENU,
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

  private addFeatureFlagedMenuOptions() {
    const profile: UserInfo = this.userInfoService.getUserInfo();
    if (profile.isAlphaUser) {
      this.menuOptions.splice(2, 0, {
        style: MenuOptionStyle.PRIMARY,
        display: 'Feature flags',
        optionType: MenuOptionType.VIEWSTATE,
        viewState: ViewState.FEATURE_FLAGS,
      });
    }
  }
}
