import { Component, EventEmitter, Output } from '@angular/core';
import { ExpansionPanelContentType } from 'app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'app/interfaces/expansion-table.interface';
import { ProductsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import {
  ComponentGroup,
  TestComponentList,
} from 'app/test-data/components.data';

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
      let fields: string[][] = [];
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
