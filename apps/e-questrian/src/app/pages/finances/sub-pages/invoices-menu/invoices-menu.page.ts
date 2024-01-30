import { Component } from '@angular/core';
import { MenuPageConfig } from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { FinanceRoutePaths } from '../../models/routing.enums';

@Component({
  selector: 'app-invoices-menu-page',
  templateUrl: './invoices-menu.page.html',
  styleUrls: ['./invoices-menu.page.scss'],
})
export class InvoicesMenuPage {
  pageConfig = {
    header: 'Invoices Menu',
    menu: [
      {
        display: 'View Invoices',
        pathConfig: {
          path: FinanceRoutePaths.InvoicesView,
          type: PathType.Child,
        },
      },
      { display: 'Generate invoices' },
      {
        display: 'Back to Finance Menu',
        pathConfig: {
          path: FinanceRoutePaths.FinanceMenu,
          type: PathType.Sibling,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;
}
