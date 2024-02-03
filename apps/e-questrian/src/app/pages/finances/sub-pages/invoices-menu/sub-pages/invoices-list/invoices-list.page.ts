import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FinancialDocListPageConfig,
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
  selector: 'app-invoices-view-page',
  templateUrl: './invoices-list.page.html',
  styleUrls: ['./invoices-list.page.scss'],
})
export class InvoicesListPage {
  pageConfig = {
    header: 'Invoices List',
    financialDocType: FinancialDocType.LIST,
    isVoidToggable: true,
    items: [],
  } as FinancialDocListPageConfig;

  menuConfig = {
    header: '',
    subHeader: '',
    menu: [
      {
        display: 'Back to Invoices Menu',
        pathConfig: {
          path: FinanceRoutePaths.InvoiceMenu,
          type: PathType.Parent,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoicesService
  ) {}

  ngOnInit() {
    this.pageConfig.items = this.invoiceService.setInvoiceDataForDisplay();
  }

  onInvoiceClicked(document: { docType: FinancialDocType; docNum: number }) {
    this.router.navigate([`../${FinanceRoutePaths.InvoiceDetail}`], {
      relativeTo: this.activatedRoute,
      queryParams: {
        invoiceID: document.docNum,
      },
    });
  }
}
