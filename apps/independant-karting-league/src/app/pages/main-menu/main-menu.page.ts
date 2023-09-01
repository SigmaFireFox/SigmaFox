/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainMenuPageViewState as ViewState } from '../../enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from '../../interfaces/menu-screen.interface';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Sign out',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.SIGN_OUT,
    },
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.SIGN_OUT: {
        this.authenticationService.signOut();
        this.router.navigate(['sign-in']);
      }
    }
  }
}
