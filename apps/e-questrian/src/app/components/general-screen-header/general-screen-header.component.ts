import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageConfig } from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-screen-header-component',
  templateUrl: './general-screen-header.component.html',
  styleUrls: ['./general-screen-header.component.scss'],
})
export class GeneralScreenHeaderComponent {
  @Input() generalConfig = {} as PageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();
}
