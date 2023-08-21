import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuOption,
  MenuOptionType,
} from '../../../app/interfaces/menu-screen.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuOptions: MenuOption[] = [];
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() actionSelected = new EventEmitter<number>();

  constructor(private router: Router) {}

  onOptionClicked(option: MenuOption) {
    switch (option.optionType) {
      case MenuOptionType.HOME: {
        this.router.navigateByUrl('');
        break;
      }
      case MenuOptionType.URL: {
        if (!option.link) return;
        this.router.navigateByUrl(option.link);
        break;
      }
      case MenuOptionType.VIEWSTATE: {
        if (!option.viewState) return;
        this.viewStateSelected.emit(option.viewState);
        break;
      }
      case MenuOptionType.ACTION: {
        if (!option.action) return;
        this.actionSelected.emit(option.action);
      }
    }
  }
}
