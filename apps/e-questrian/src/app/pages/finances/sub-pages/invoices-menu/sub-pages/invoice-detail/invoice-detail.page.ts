import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DocView,
  FinancialDocType,
  MenuPageConfig,
} from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { InvoicesService } from 'apps/e-questrian/src/app/services/invoices/invoices.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

@Component({
  selector: 'app-invoice-detail-page',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage {
  menuConfig = {
    header: '',
    menu: [
      {
        display: 'Back to Invoices List',
        pathConfig: {
          path: FinanceRoutePaths.InvoicesList,
          type: PathType.Sibling,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;

  invoiceDocViewConfig: DocView = {} as DocView;
  showDocument = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoicesService
  ) {}

  async ngOnInit() {
    const invoiceID = this.activatedRoute.snapshot.queryParams['invoiceID'];
    const returnTo = this.activatedRoute.snapshot.queryParams['returnTo'];

    if (invoiceID === null || Number.isNaN(parseInt(invoiceID))) return;

    this.invoiceDocViewConfig =
      await this.invoiceService.setInvoiceDocForDisplay(parseInt(invoiceID));
    this.showDocument = true;

    if (returnTo != null) {
      this.menuConfig.menu[0] = {
        display: `Back to ${returnTo}`,
        backToReferrer: true,
        styling: OptionStyling.Secondary,
      };
    }
  }
}
