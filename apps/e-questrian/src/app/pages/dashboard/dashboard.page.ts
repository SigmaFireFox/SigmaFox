/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from '../../interfaces/common-page-configs.interface';
import {
  OptionAction,
  OptionStyling,
} from '../../interfaces/menu-options.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'e-questrian-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  config: MenuPageConfig | undefined;
  generalConfig = { header: 'e-Questrian', subHeader: '' } as PageConfig;
  panelOpenState = false;

  constructor(
    public router: Router,
    public authService: AuthenticationService
  ) {}

  // ngOnInit() {
  //   this.setConfig();
  // }

  onActionSelected(action: OptionAction): void {
    switch (action) {
      case OptionAction.LogOut: {
        this.authService.UserSignOut();
      }
    }
  }

  // private setConfig() {
  //   this.config = {
  //     header: '',
  //     subHeader: 'Main menu',
  //     menu: [
  //       {
  //         display: 'Calendar',
  //         styling: OptionStyling.Primary,
  //         path: '/calendar',
  //       },
  //       {
  //         display: 'Finances',
  //         styling: OptionStyling.Primary,
  //         path: '/finances',
  //       },
  //       {
  //         display: 'Clients',
  //         styling: OptionStyling.Primary,
  //         path: '/clients',
  //       },
  //       {
  //         display: 'Log out',
  //         styling: OptionStyling.Secondary,
  //         path: '/signin',
  //         action: OptionAction.Log_Out,
  //       },
  //     ],
  //   };
  // }
}
