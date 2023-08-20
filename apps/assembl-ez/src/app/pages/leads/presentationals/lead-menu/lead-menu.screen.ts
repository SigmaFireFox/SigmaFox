import { Component, EventEmitter, Output } from '@angular/core';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-lead-menu-screen',
  templateUrl: './lead-menu.screen.html',
  styleUrls: ['./lead-menu.screen.scss'],
})
export class LeadMenuScreen {
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Add Lead',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.ADD,
    },
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'View Leads',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW_ALL,
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
}
