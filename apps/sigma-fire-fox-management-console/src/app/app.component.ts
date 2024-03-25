import { Component } from '@angular/core';
import { ButtonStyleClass, StandardButtonConfig } from '@sigmafox/buttons';

@Component({
  selector: 'sigmafox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sigma-fire-fox-management-console';

  navigationButtons: StandardButtonConfig[] = [
    {
      buttonID: 'home',
      buttonTextContent: 'Home',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: false,
    },
  ];
}
