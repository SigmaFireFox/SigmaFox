/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralScreenHeaderComponent } from '../../components/general-screen-header/general-screen-header.component';
import {
  GeneralItemsListPageConfig,
  PageColumns,
  GeneralItemDetail,
} from '../../interfaces/common-page-configs.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-items-list-screen',
  templateUrl: './general-items-list.screen.html',
  styleUrls: ['./general-items-list.screen.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralScreenHeaderComponent,
    FormsModule,
    MatCheckboxModule,
  ],
})
export class GeneralItemsListScreen implements OnInit {
  @Input() config = {} as GeneralItemsListPageConfig;
  @Output() itemClicked = new EventEmitter<number>();

  header = '';
  listConfig = {
    columns: [] as PageColumns[],
    isVoidToggable: this.config.isVoidToggable,
    items: {},
  } as GeneralItemsListPageConfig;
  isViewingVoidedItems = false;

  ngOnInit() {
    this.setPageConfig();
    this.setListConfig();
  }

  onItemClicked(itemKey: string) {
    this.itemClicked.emit(parseInt(itemKey));
  }

  private setPageConfig() {
    this.header = this.config.header;
  }

  private setListConfig() {
    // Determine the column widths
    let totalFactor = 0;
    this.config.columns?.forEach((column) => {
      totalFactor = totalFactor + column.widthFactor;
    });
    this.config.columns?.forEach((column, index) => {
      this.listConfig.columns.push({
        content: column.content,
        widthFactor: column.widthFactor,
        widthPerc:
          Math.round(
            (this.config.columns[index].widthFactor / totalFactor) * 100
          ) + '%',
      });
    });

    // Determine the list of items to be displayed
    if (this.config.items) {
      Object.keys(this.config.items).forEach((itemKey) => {
        this.listConfig.items[parseInt(itemKey)] = {
          // Set empty listedDetails
          listedDetails: [],
          // Set void status
          voided: this.config.items[parseInt(itemKey)].voided,
        } as GeneralItemDetail;
        // Add listedDetails
        this.config.items[parseInt(itemKey)].listedDetails.forEach(
          (field, fieldIndex) => {
            this.listConfig.items[parseInt(itemKey)].listedDetails.push({
              content: field.content,
              widthPerc: this.listConfig.columns[fieldIndex].widthPerc,
            });
          }
        );
      });
    }
  }
}
