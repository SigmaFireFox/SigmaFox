import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from '../../../app/interfaces/menu-screen.interface';
import { AuthenticationService } from '../../../app/services/authentication-service.service';
import { MainPageViewState as ViewState } from '../../../app/enums/viewstates.enum';
import { FeatureFlagsService } from '../../../app/services/feature-flags.service';
import { FlagData } from '../../../app/interfaces/api.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MainPage {
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Leads',
      optionType: MenuOptionType.URL,
      link: 'leads',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Quotes',
      optionType: MenuOptionType.URL,
      link: 'quotes',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Agents',
      optionType: MenuOptionType.URL,
      link: 'agents',
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Settings',
      optionType: MenuOptionType.URL,
      link: 'settings',
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Sign out',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.SIGN_OUT,
    },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private featureFlagsService: FeatureFlagsService,
    private router: Router
  ) {
    this.addFeatureFlagedMenuOptions();
  }

  onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.SIGN_OUT: {
        this.authenticationService.signOut();
        this.router.navigate(['sign-in']);
      }
    }
  }

  private addFeatureFlagedMenuOptions() {
    const flags: FlagData = this.featureFlagsService.getFlags();
    if (flags.products) {
      this.menuOptions.splice(2, 0, {
        style: MenuOptionStyle.PRIMARY,
        display: 'Products',
        optionType: MenuOptionType.URL,
        link: 'products',
      });
    }
  }
}
