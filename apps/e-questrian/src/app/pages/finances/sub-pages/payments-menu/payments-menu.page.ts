import { Component } from '@angular/core';
import { MenuPageConfig } from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { FinanceRoutePaths } from '../../models/routing.enums';

@Component({
  selector: 'app-payments-menu-page',
  templateUrl: './payments-menu.page.html',
  styleUrls: ['./payments-menu.page.scss'],
})
export class PaymentsMenuPage {
  pageConfig = {
    header: 'Invoices Menu',
    menu: [
      {
        display: 'View Payments',
        pathConfig: {
          path: FinanceRoutePaths.PaymentsList,
          type: PathType.Child,
        },
      },
      {
        display: 'Record Payments',
        pathConfig: {
          path: FinanceRoutePaths.PaymentsRecord,
          type: PathType.Child,
        },
      },
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
