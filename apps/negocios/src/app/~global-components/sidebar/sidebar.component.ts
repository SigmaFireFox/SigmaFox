import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidebarMenu: string[] = [];
  @Output() optionClicked = new EventEmitter<string>();

  opened = true;

  onMenuOptionClicked(optionClicked: string) {
    this.optionClicked.emit(optionClicked);
  }
}
