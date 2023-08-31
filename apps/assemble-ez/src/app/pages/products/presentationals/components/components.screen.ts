/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Output, EventEmitter } from '@angular/core';
import { ExpansionPanelContentType } from 'apps/assemble-ez/src/app/enums/expansion-table.enum';
import { ProductsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import { ExpansionPanelConfig } from 'apps/assemble-ez/src/app/interfaces/expansion-table.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';
import {
  ComponentGroup,
  TestComponentList,
} from 'apps/assemble-ez/src/app/test-data/components.data';

@Component({
  selector: 'app-components-screen',
  templateUrl: './components.screen.html',
  styleUrls: ['./components.screen.scss'],
})
export class ComponentsPage {
  @Output() viewStateSelected = new EventEmitter<number>();

  expansionPanelConfig: ExpansionPanelConfig[] = [];
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to product menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  ngOnInit() {
    this.setExpansionPanelsConfigs();
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }

  private setExpansionPanelsConfigs() {
    const testData: ComponentGroup = TestComponentList;

    Object.keys(testData).forEach((productGroup) => {
      const fields: string[][] = [];
      testData[productGroup].forEach((product) => {
        fields.push([product.displayGeneral, product.price.toString()]);
      });
      this.expansionPanelConfig.push({
        panelName: productGroup,
        title: productGroup,
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: '',
          headers: [
            { content: 'Component', widthFactor: 3 },
            { content: 'Unit price', widthFactor: 2 },
          ],
          lines: fields,
        },
      });
    });
  }
}
