/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPageConfig } from '../../interfaces/common-page-configs.interface';
import {
  OptionAction,
  OptionStyling,
} from '../../interfaces/menu-options.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  config: MenuPageConfig | undefined;

  constructor(
    public router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.setConfig();
  }

  onActionSelected(action: OptionAction): void {
    switch (action) {
      case OptionAction.Log_Out: {
        this.authService.UserSignOut();
      }
    }
  }

  private setConfig() {
    this.config = {
      header: '',
      subHeader: 'Main menu',
      menu: [
        {
          display: 'Calendar',
          styling: OptionStyling.Primary,
          path: '/calendar',
        },
        {
          display: 'Finances',
          styling: OptionStyling.Primary,
          path: '/finances',
        },
        {
          display: 'Clients',
          styling: OptionStyling.Primary,
          path: '/clients',
        },
        {
          display: 'Log out',
          styling: OptionStyling.Secondary,
          path: '/signin',
          action: OptionAction.Log_Out,
        },
      ],
    };
  }
}
