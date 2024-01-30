/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageConfig } from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-screen-header-component',
  templateUrl: './general-screen-header.component.html',
  styleUrls: ['./general-screen-header.component.scss'],
  standalone: true,
})
export class GeneralScreenHeaderComponent {
  @Input() header = '';
  @Output() viewStateSelected = new EventEmitter<any>();
}
