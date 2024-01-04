/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  GeneralItemsListPageConfig,
  PageConfig,
  PageColumns,
  GeneralItemDetail,
} from '../../interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-items-list-screen',
  templateUrl: './general-items-list.screen.html',
  styleUrls: ['./general-items-list.screen.scss'],
})
export class GeneralItemsListScreen implements OnInit {
  @Input() config = {} as GeneralItemsListPageConfig;
  @Output() itemClicked = new EventEmitter<number>();

  generalConfig = {} as PageConfig;
  listConfig = {
    columns: [] as PageColumns[],
    items: {},
  } as GeneralItemsListPageConfig;

  ngOnInit() {
    this.setPageConfig();
    this.setListConfig();
    console.log(this.config.items);
  }

  onItemClicked(itemKey: string) {
    this.itemClicked.emit(parseInt(itemKey));
  }

  private setPageConfig() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
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
