import { Component } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { MainMenuPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';

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
