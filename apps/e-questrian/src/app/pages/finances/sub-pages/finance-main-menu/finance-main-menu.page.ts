import { Component } from '@angular/core';
import { MenuComponent } from 'apps/e-questrian/src/app/components/menu/menu.component';
import { MenuPageConfig } from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { AppRoutePaths } from 'apps/e-questrian/src/app/models/routing.enum';
import { FinanceRoutePaths } from '../../models/routing.enums';

@Component({
  selector: 'app-finance-main-menu-page',
  templateUrl: './finance-main-menu.page.html',
  styleUrls: ['./finance-main-menu.page.scss'],
})
export class FinanceMainMenuPage {
  financeMenuPageConfig = {
    header: 'Finance Menu',
    menu: [
      {
        display: 'Invoices',
        pathConfig: {
          path: FinanceRoutePaths.InvoiceMenu,
          type: PathType.Child,
        },
      },
      {
        display: 'Payments',
        pathConfig: {
          path: FinanceRoutePaths.PaymentsMenu,
          type: PathType.Child,
        },
      },
      {
        display: 'Statements',
        pathConfig: {
          path: `${FinanceRoutePaths.Statements}/${FinanceRoutePaths.StatementsGenerate}`,
          type: PathType.Child,
        },
      },
      {
        display: 'Dashboard',
        pathConfig: { path: AppRoutePaths.Dashboard, type: PathType.Sibling },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;
}
