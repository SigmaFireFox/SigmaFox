import { Component } from '@angular/core';
import { ButtonStyleClass, StandardButtonConfig } from '@sigmafox/buttons';
import { AppRoutePaths } from './models/routing.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'sigmafox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sigma-fire-fox-management-console';

  navigationButtons: StandardButtonConfig[] = [
    {
      buttonID: AppRoutePaths.LandingPage,
      buttonTextContent: 'Home',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: false,
    },
    {
      buttonID: AppRoutePaths.Todos,
      buttonTextContent: 'To Dos',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: false,
    },
  ];

  constructor(private router: Router) {}

  onNavButtonClicked(buttonID: string) {
    this.router.navigate([buttonID]);
  }
}
